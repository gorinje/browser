const { ipcMain } = require('electron');
const { dialog } = require('electron');

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
        /* FONCTION CAPTURE D'ECRAN */
        ipcMain.handle('capture-page', async (event) => {
            const image = await browserContent.capturePage();
            const imageBuffer = image.toPNG();
          
            // Ouvrir le dialogue pour enregistrer le fichier
            const { filePath } = await dialog.showSaveDialog({
              title: 'Enregistrer la capture d\'écran',
              defaultPath: 'capture.png',
              buttonLabel: 'Enregistrer',
              filters: [
                { name: 'Images', extensions: ['png'] }
              ]
            });
          
            if (filePath) {
              // Écrire le fichier sur le disque
              require('fs').writeFileSync(filePath, imageBuffer);
            }
          
            return filePath;
          });
          /****************************/
}

module.exports = { initEventsHandler };