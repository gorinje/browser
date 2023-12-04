const { ipcMain, ipcRenderer, dialog} = require('electron');

function initEventsHandler(mainWin, browserView) {
    const winContent = mainWin.webContents;
    const browserContent = browserView.webContents;

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


    ipcMain.on('generate-pdf', (event, { options }) => {
      browserContent.printToPDF(options).then(data => {
        event.sender.send('pdf-generated', data.toString('base64'));
      }).catch(error => {
        console.log(error);
        event.sender.send('pdf-generated', false);
      });
    });


    browserContent.on('did-start-navigation', (event)=>{
      winContent.send('update-url', event.url, event.isMainFrame);
    })

}

module.exports = { initEventsHandler };
