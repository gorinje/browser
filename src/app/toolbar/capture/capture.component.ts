import { Component } from '@angular/core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

declare global {
  interface Window {
    require: any;
  }
}

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent {
  faCapture = faFloppyDisk;

  private ipcRenderer: any;

  constructor() {
    if (window.require) {
      try {
        this.ipcRenderer = window.require('electron').ipcRenderer;
      } catch (error) {
        throw new Error('Could not load electron ipcRenderer');
      }
    } else {
      console.warn('Electron IPC not available');
    }
  }

  capturePage() {
    const rect = { x: 0, y: 0, width: 800, height: 600 };
    const opts = { stayHidden: false, stayAwake: false };

    if (this.ipcRenderer) {
      this.ipcRenderer.send('capture-page', rect, opts);
      this.ipcRenderer.once('capture-page-reply', (event: any, response: string) => {
        console.log(response);
      });
    } else {
      console.error('ipcRenderer is not available');
    }
  }
}