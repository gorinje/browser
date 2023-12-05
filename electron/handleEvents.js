const { ipcMain, session, ipcRenderer, BrowserWindow } = require("electron");

function initEventsHandler(mainWin, browserView) {
  const winContent = mainWin.webContents;
  const browserContent = browserView.webContents;

  browserContent.on("did-navigate", async (event, url) => {
    console.log("URL changed:", url);
    let cookies = await session.defaultSession.cookies.get({});
    let parsedcookies = new Array();
    cookies.forEach((cookie) => {
      parsedcookies.push(cookie.domain);
    });
    winContent.send("cookies", { url: url, cookies: parsedcookies });
  });

  ipcMain.handle("open-cookie-win", () => {
    const cookieWindow = new BrowserWindow({
      title: "COOKIEVIZ 2.0",
      width: 640,
      height: 360,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        webSecurity: false,
      },
      backgroundColor: "gray",
      resizable: false,
    });
    cookieWindow.loadURL("http://localhost:4200/index.html#cookies");
  });

  ipcMain.handle("toogle-dev-tool", () => {
    if (winContent.isDevToolsOpened()) {
      winContent.closeDevTools();
    } else {
      winContent.openDevTools({ mode: "detach" });
    }
  });

  ipcMain.handle("go-back", () => {
    browserContent.goBack();
  });

  ipcMain.handle("can-go-back", () => {
    return browserContent.canGoBack();
  });

  ipcMain.handle("go-forward", () => {
    browserContent.goForward();
  });

  ipcMain.handle("refresh", () => {
    browserContent.reload();
  });

  ipcMain.handle("can-go-forward", () => {
    return browserContent.canGoForward();
  });

  ipcMain.handle("go-to-page", (event, url) => {
    return browserContent.loadURL(url);
  });

  ipcMain.handle("current-url", () => {
    return browserContent.getURL();
  });
}

module.exports = { initEventsHandler };
