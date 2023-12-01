import { EventEmitter, Injectable } from '@angular/core';
import { IpcRenderer, ipcMain } from 'electron';
import { BrowserWindow } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class BrowsingService {
  private ipcRenderer: IpcRenderer;
  private history: string[] = [];
  private currentIndex: number = -1;

  url = 'https://amiens.unilasalle.fr';
  canGoBack =false;
  canGoForward = false;
  
  getHistory(): string[] {
    return this.history;
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }
  toogleDevTool() {
    this.ipcRenderer.invoke('toogle-dev-tool');
  }

  goBack() {
    this.ipcRenderer.invoke('go-back')
    this.updateHistory();
  }

  goForward() {
    this.ipcRenderer.invoke('go-forward')
    this.updateHistory();
  }

  refresh() {
    this.ipcRenderer.invoke('refresh');
  }

  goToPage(url: string) {
    this.ipcRenderer.invoke('go-to-page', url)
    .then(() =>this.updateHistory());
  }

  setToCurrentUrl() {
    this.ipcRenderer.invoke('current-url')
    .then((url)=>{
      this.url = url;
    });
  }
  openHistoryWindow(history: string[]): void {
    const historyWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });

    const historyHtml = `<ul>${history.map(url => `<li>${url}</li>`).join('')}</ul>`;
    historyWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(historyHtml)}`);

    // ... autres configurations

    // Écoutez l'événement pour amener la fenêtre principale au premier plan
    ipcMain.on('bring-to-front', () => {
      historyWindow.show();
    });
  }

  capturePage(): Promise<string> {
    return this.ipcRenderer.invoke('capture-page');
  }
  private navigateTo(url: string) {
    this.ipcRenderer.invoke('go-to-page', url)
      .then(() => this.updateHistory());
  }

  updateHistory() {
    this.setToCurrentUrl();

    this.ipcRenderer.invoke('can-go-back')
      .then((canGoBack) => this.canGoBack = canGoBack);

    this.ipcRenderer.invoke('can-go-forward')
      .then((canGoForward) => this.canGoForward = canGoForward);

    // Ajouter la page actuelle à l'historique
    if (this.currentIndex < this.history.length - 1) {
      // Si nous naviguons en arrière, tronquer l'historique
      this.history = this.history.slice(0, this.currentIndex + 1);
    }
    this.history.push(this.url);
    this.currentIndex = this.history.length - 1;
  }

  public updateUrl: EventEmitter<any> = new EventEmitter();
  constructor() {
    if (window.require) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    } else {
      // Seulement pour les tests en dehors d'electron
      const ipc = {} as IpcRenderer;
      this.ipcRenderer = ipc;
    }
    this.ipcRenderer.on('update-url', (event, url, isMainFrame) => {
      if (isMainFrame) {
        this.url = url;
        this.updateUrl.emit();
      }
    });
  }
}