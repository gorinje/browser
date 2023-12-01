import { Component } from '@angular/core';
import { BrowsingService } from 'src/app/services/browsing.service';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.css']
})
export class ScreenshotComponent {
  constructor(private browsingService: BrowsingService) {}

  async onCaptureClick() {
    try {
      const filePath = await this.browsingService.capturePage();
      if (filePath) {
        console.log('Capture enregistrée à :', filePath);
      } else {
        console.log('Capture annulée');
      }
    } catch (error) {
      console.error('Erreur lors de la capture de la page', error);
    }
  }
}