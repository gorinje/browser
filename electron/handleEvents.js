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
            // Extraire les éléments textuels des éléments spécifiques
            const textElements = await browserView.webContents.executeJavaScript(`
                [...document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, button, span, a')]
                    .filter(element => element.textContent.trim().length > 0)
                    .map(element => element.textContent.trim());
            `);
    
            console.log('Text elements:', textElements);

            // Traduire les éléments textuels un par un

            for (let i = 0; i < textElements.length; i++) {
                const text = textElements[i];

                const response = await axios.post('https://translation.googleapis.com/language/translate/v2?key=AIzaSyCwkGQA9Lodaa9zi1azzsX6dNdXx8tR05w', {
                    q: text,
                    target: 'fr' // Remplacez par la langue cibl
                });

                const translatedText = response.data.data.translations[0].translatedText;
                textElements[i] = translatedText;
            }

            // Injecter les éléments textuels traduits dans la page à leur élément d'origine
            await browserView.webContents.executeJavaScript(`
                const textElements = ${JSON.stringify(textElements)};
                const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, button, span, a');
                elements.forEach((element, index) => {
                    const textNodes = [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE);
                    if (textNodes.length > 0 && textElements[index]) {
                        textNodes.forEach(node => node.textContent = textElements[index]);
                    }
                });
            `);

            console.log("Translation ended");
    
            // Signaler la fin de la traduction
            event.reply('translate-page-reply', 'Translation completed');
        } catch (error) {
            console.error('Error translating page:', error);
            event.reply('translate-page-reply', `Error: ${error.message}`);
        }
    });
    

}

module.exports = { initEventsHandler };