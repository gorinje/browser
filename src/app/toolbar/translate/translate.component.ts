import { Component } from '@angular/core';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

declare global {
  interface Window {
    require: any;
  }
}

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent {
  faLanguage = faLanguage;
  private ipcRenderer: any;
  isTranslating: boolean = false;

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

  async translatePage() {
    if (this.ipcRenderer) {
      try {
        this.isTranslating = true;
        this.ipcRenderer.send('translate-page');
        this.ipcRenderer.once('translate-page-reply', (event: any, translatedText: any) => {
          console.log('Texte traduit :', translatedText);
          this.isTranslating = false;
        });
      } catch (error) {
        console.error('Error triggering translation:', error);
        this.isTranslating = false;
      }
    } else {
      console.warn('Electron IPC not available');
    }
  }
}
