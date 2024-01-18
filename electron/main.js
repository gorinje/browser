const { app, BrowserView, BrowserWindow } = require("electron");
const { initEventsHandler } = require("./handleEvents");
const isDev = require("electron-is-dev");

app.whenReady().then(() => {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  const cookieWindow = new BrowserWindow({
    parent: browserWindow,
    title: "COOKIEVIZ 2.0",
    width: 720,
    height: 720,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
    resizable: true,
    show: false,
    closable: true,
  });

  if (isDev) {
    browserWindow.loadURL("http://localhost:4200/");
  } else {
    browserWindow.loadFile("dist/browser/index.html");
  }

  const browserView = new BrowserView();
  initEventsHandler(browserWindow, browserView, cookieWindow);

  browserWindow.once("ready-to-show", () => {
    browserWindow.setBrowserView(browserView);
    const winSize = browserWindow.webContents
      .getOwnerBrowserWindow()
      .getBounds();
    browserView.setBounds({
      x: 0,
      y: 55,
      width: winSize.width,
      height: winSize.height,
    });
    browserView.webContents.loadURL("https://amiens.unilasalle.fr");
  });

  browserWindow.on("resized", () => {
    const winSize = browserWindow.webContents
      .getOwnerBrowserWindow()
      .getBounds();
    browserView.setBounds({
      x: 0,
      y: 55,
      width: winSize.width,
      height: winSize.height,
    });
  });
});
