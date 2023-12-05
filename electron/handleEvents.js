const { ipcMain, session, ipcRenderer } = require("electron");

function initEventsHandler(mainWin, browserView) {
  const winContent = mainWin.webContents;
  const browserContent = browserView.webContents;
  let cookieViz = new Map();

  browserContent.on("did-navigate", async (event, url) => {
    console.log("URL changed:", url);
    let cookies = await session.defaultSession.cookies.get({});
    let parsedcookies = new Array();
    cookies.forEach((cookie) => {
      parsedcookies.push(cookie.domain);
    });
    cookieViz.set(url, parsedcookies);
    winContent.send("cookies", "ping");
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
