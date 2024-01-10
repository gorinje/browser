const { ipcMain } = require('electron');
const axios = require('axios'); // Utilisez axios pour faire des requêtes HTTP

function escapeStringForJavaScript(str) {
    return str.replace(/\\/g, '\\\\')
              .replace(/'/g, "\\'")
              .replace(/"/g, '\\"')
              .replace(/\n/g, '\\n')
              .replace(/\r/g, '\\r');
}

function initEventsHandler(mainWin, browserView) {
    const winContent = mainWin.webContents;
    const browserContent = browserView.webContents;

    browserContent.on('did-start-navigation', (event)=>{
        winContent.send('update-url', event.url, event.isMainFrame);
    })

    ipcMain.handle('toogle-dev-tool', () => {
        if (winContent.isDevToolsOpened()) {
            winContent.closeDevTools();
        } else {
            winContent.openDevTools({ mode: 'detach' });
        }
    });

    ipcMain.handle('go-back', () => {
        browserContent.goBack();
    });

    ipcMain.handle('can-go-back', () => {
        return browserContent.canGoBack();
    });

    ipcMain.handle('go-forward', () => {
        browserContent.goForward();
    });
    
    ipcMain.handle('refresh', () => {
        browserContent.reload();
    });

    ipcMain.handle('can-go-forward', () => {
        return browserContent.canGoForward();
    });

    ipcMain.handle('go-to-page', (event, url) => {
        return browserContent.loadURL(url);
    });

    ipcMain.handle('current-url', () => {
        return browserContent.getURL();
    });

ipcMain.on('translate-page', async (event) => {
    try {
        // Extraire le code HTML de la page entière
        const htmlContent = await browserView.webContents.executeJavaScript('document.documentElement.outerHTML');

        // Diviser le HTML en segments de 50 lignes
        const lines = htmlContent.split('\n');
        const segments = [];
        while (lines.length) {
            segments.push(lines.splice(0, 10).join('\n'));
        }

        // Traduire chaque segment
        let translatedSegments = [];
        var response;
        for (const segment of segments) {

            try {

            response = await axios.post('https://translation.googleapis.com/language/translate/v2?key=AIzaSyCvRNLC-Z-U3e-E2PClF5aDCFy99sPYJo4',
                {
                    q: segment,
                    target: 'fr',
                    format: 'html'
                }
            );

            } catch (error) {
                console.error('Error translating segment:', error);
                event.reply('translate-page-reply', `Error: ${error.message}`);
            }

            const translatedSegment = response.data.data.translations[0].translatedText;
            translatedSegments.push(translatedSegment);
        }

        // Reconstituer le HTML traduit
        const translatedHtml = translatedSegments.join('\n');

        console.log('Translated HTML:', translatedHtml);

        // Remplacer le contenu de la page par le HTML traduit
        await browserView.webContents.executeJavaScript(`
            document.body.innerHTML = ${JSON.stringify(translatedHtml)};
        `);

        console.log("Translation completed");
        event.reply('translate-page-reply', 'Translation completed');
    } catch (error) {
        console.error('Error translating page:', error);
        event.reply('translate-page-reply', `Error: ${error.message}`);
    }
});

}

module.exports = { initEventsHandler };