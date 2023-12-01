import { Component } from '@angular/core';

declare const window: any;
const ipcRenderer = window.require('electron').ipcRenderer;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  captureScreen() {
    ipcRenderer.send('capture-page');
  }

  downloadImage(url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captured-image.png'; // Nom du fichier à télécharger
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    // Libérer l'URL du Blob après le téléchargement
    URL.revokeObjectURL(url);
  }
  

  ngOnInit() {
    ipcRenderer.on('capture-page-reply', (event: any, buffer: BlobPart) => {
      // Traiter l'image reçue, par exemple l'afficher ou la sauvegarder
      // Par exemple, convertir le buffer en Blob et créer un URL pour l'afficher dans un élément <img>
      const blob = new Blob([buffer], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      // Appeler la fonction pour télécharger l'image
      this.downloadImage(url);
    });
  }
 
}
