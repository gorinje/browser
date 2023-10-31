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

    const browserView = new BrowserView();

    if (isDev){
        browserWindow.loadURL("http://localhost:4200/");
    }else {
        browserWindow.loadFile('dist/browser/index.html');
    }


    browserWindow.once('ready-to-show', ()=>{
        browserWindow.setBrowserView(browserView)
        const winSize = browserWindow.webContents.getOwnerBrowserWindow().getBounds();
        browserView.setBounds({ x: 0, y: 55, width: winSize.width, height: winSize.height });
        browserView.webContents.loadURL('https://amiens.unilasalle.fr');
        initEventsHandler(browserWindow, browserView);
    });
    browserWindow.on('resized', ()=>{
        const winSize = browserWindow.webContents.getOwnerBrowserWindow().getBounds();
        browserView.setBounds({ x: 0, y: 55, width: winSize.width, height: winSize.height });
    });
})

