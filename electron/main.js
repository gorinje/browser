const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const { initEventsHandler } = require('./handleEvents');
const isDev = require("electron-is-dev");
const path = require("path");
const axios = require('axios');
const DEEPL_API_KEY = 'c48168fe-3f1d-c7a2-34cb-3625a5f84d5d:fx';

let browserWindow;
let browserView;

app.whenReady().then(() => {
    browserWindow = new BrowserWindow({
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
    } else {
        browserWindow.loadFile('dist/browser/index.html');
    }

    browserView = new BrowserView();
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

    // Ajouter l'écouteur d'événements IPC pour la capture d'écran
    ipcMain.on('capture-page', async (event) => {
        try {
            const image = await browserView.webContents.capturePage();
            const buffer = image.toPNG(); // Convertit en PNG
            event.reply('capture-page-reply', buffer);
        } catch (error) {
            console.error('Erreur lors de la capture de la page :', error);
        }
    });

    ipcMain.on('extract-text', (event) => {
        browserView.webContents.executeJavaScript(`document.body.innerText;`)
        .then(result => {
          event.reply('extract-text-reply', result);
        })
        .catch(error => {
          console.error('Erreur lors de lextrac du texte', error);
          event.reply('extract-text-reply', '');
        });
    });

    ipcMain.on('translate-text', async (event, text, targetLang) => {
        try {
          const response = await axios.post(`https://api.deepl.com/v2/translate`, querystring.stringify({
            auth_key: DEEPL_API_KEY,
            text: text,
            target_lang: targetLang
          }), {
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded' 
            }
          });
      
          event.reply('translate-text-reply', response.data.translations[0].text);
        } catch (error) {
          console.error('Erreur de traduction :', error);
          event.reply('translate-text-reply', '');
        }
    });


});






