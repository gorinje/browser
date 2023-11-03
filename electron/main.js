const { app, BrowserView, BrowserWindow, ipcMain} = require('electron');
const{initEventsHandler} = require('./handleEvents');
const isDev = require("electron-is-dev");
const path = require("path");

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

    if (isDev){
        browserWindow.loadURL("http://localhost:4200/");
    }else {
        browserWindow.loadFile('dist/browser/index.html');
    }

    const browserView = new BrowserView();
    initEventsHandler(browserWindow, browserView);
    
    browserWindow.once('ready-to-show', ()=>{
        browserWindow.setBrowserView(browserView)
        const winSize = browserWindow.webContents.getOwnerBrowserWindow().getBounds();
        browserView.setBounds({ x: 0, y: 55, width: winSize.width, height: winSize.height });
        browserView.webContents.loadURL('https://amiens.unilasalle.fr');
    });
    
    browserWindow.on('resized', ()=>{
        const winSize = browserWindow.webContents.getOwnerBrowserWindow().getBounds();
        browserView.setBounds({ x: 0, y: 55, width: winSize.width, height: winSize.height });
    });
})

