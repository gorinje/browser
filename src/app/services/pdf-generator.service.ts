import { Injectable } from '@angular/core';
import {IpcRenderer} from 'electron';


@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  private ipcRenderer: IpcRenderer;
  private options = {
    marginsType: 0,
    pageSize: 'A4',
    printBackground: true,
    printSelectionOnly: false,
    landscape: false
  };

  constructor() {
    if (window.require){
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }else{
      const ipc = {} as IpcRenderer;
      this.ipcRenderer = ipc;
    }
  }

  generatePDF(options: any): Promise<string> {
    return new Promise((resolve, reject) => {
      this.ipcRenderer.send('generate-pdf', { options });

      this.ipcRenderer.once('pdf-generated', (event, data) => {
        if (data !== false) {
          resolve(data);
        } else {
          reject('Error generating PDF');
        }
      });
    });

}

}
