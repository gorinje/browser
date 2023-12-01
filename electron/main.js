const { app, BrowserView, BrowserWindow, ipcMain, dialog } = require('electron');
const { initEventsHandler } = require('./handleEvents');
const isDev = require("electron-is-dev");
const path = require("path");
const fs = require('fs');

app.whenReady().then(() => {
    const browserWindow = new BrowserWindow({
        width: 800,
        height: 800, 
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            webSecurity: false
        }
    });

    const browserView = new BrowserView();
    initEventsHandler(browserWindow, browserView);
    
    browserWindow.once('ready-to-show', () => {
        browserWindow.setBrowserView(browserView);
        const winSize = browserWindow.getBounds();
        browserView.setBounds({ x: 0, y: 55, width: winSize.width, height: winSize.height - 55 });
        browserView.webContents.loadURL('https://amiens.unilasalle.fr');
    });
    
    browserWindow.on('resized', () => {
        const winSize = browserWindow.getBounds();
        browserView.setBounds({ x: 0, y: 55, width: winSize.width, height: winSize.height - 55 });
    });

    ipcMain.on('capture-page', (event, rect, opts) => {
        rect = rect || {};
        opts = opts || {};

        browserView.webContents.capturePage(rect, opts).then(image => {
            dialog.showSaveDialog({
                title: 'Enregistrer la capture d\'écran',
                defaultPath: path.join(app.getPath('pictures'), 'capture.png'),
                buttonLabel: 'Enregistrer',
                filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }]
            }).then(file => {
                if (!file.canceled) {
                    fs.writeFile(file.filePath.toString(), image.toPNG(), (err) => {
                        if (err) {
                            event.reply('capture-page-reply', 'Error: Unable to save the image');
                            return;
                        }
                        event.reply('capture-page-reply', `Saved capture to ${file.filePath}`);
                    });
                } else {
                    event.reply('capture-page-reply', 'Save dialog was canceled');
                }
            }).catch(err => {
                event.reply('capture-page-reply', `Error: ${err.message}`);
            });
        });
    });

    if (isDev) {
        browserWindow.loadURL("http://localhost:4200/");
    } else {
        browserWindow.loadFile('dist/browser/index.html');
    }
});
