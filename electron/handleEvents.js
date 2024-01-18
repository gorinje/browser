const { ipcMain, session } = require("electron");

function initEventsHandler(mainWin, browserView, cookieWin) {
  const winContent = mainWin.webContents;
  const browserContent = browserView.webContents;
  const cookieContent = cookieWin.webContents;
  let lastHost = "";

  browserContent.on("did-navigate", async (event, url) => {
    let host = new URL(url).host;
    if (lastHost !== host) {
      lastHost = host;
      await session.defaultSession.clearStorageData({ storages: ["cookies"] });
    }
    let cookies = await session.defaultSession.cookies.get({});
    let parsedcookies = new Array();
    cookies.forEach((cookie) => {
      parsedcookies.push(cookie.domain);
    });
    cookieContent.send("cookies", { url: url, cookies: parsedcookies });
  });

  ipcMain.handle("open-cookie-win", () => {
    cookieWin.loadURL("http://localhost:4200/index.html#cookies");
    cookieWin.show();
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
