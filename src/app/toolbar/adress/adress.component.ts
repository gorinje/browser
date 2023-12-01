// adress.component.ts

import { Component, ElementRef, ViewChild } from '@angular/core';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
import { BrowsingService } from 'src/app/services/browsing.service';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent {
  faGlobeEurope = faGlobeEurope;
  @ViewChild('search') searchElement: ElementRef = new ElementRef({});

  constructor(public browsingService: BrowsingService) {
    this.browsingService.updateUrl.subscribe(() => {
      this.searchElement.nativeElement.value = this.browsingService.url;
    });
  }

  onKeyDownEvent(e: any) {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
      this.browsingService.setToCurrentUrl();
    } else if (e.key === 'Enter') {
      const value = e.currentTarget.value;
      e.currentTarget.blur();
      this.goToPage(value);
    }
  }

  onMouseDown(e: any) {
    this.searchElement.nativeElement.select();
  };

  async testHttps(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });

      if (response.ok) {
        console.log('L\'URL HTTPS fonctionne correctement.');
        return true; // Indique que l'URL est valide
      } else {
        console.log(`L\'URL HTTPS a retourné le code d'erreur : ${response.status}`);
        return false; // Indique que l'URL est invalide
      }
    } catch (error) {
      console.error('Erreur lors du test de l\'URL HTTPS :', error);
      return false; // Indique que l'URL est invalide en cas d'erreur
    }
  }

  async goToPage(url: string): Promise<void> {
    // Ajoutez le préfixe "http://" si l'URL ne commence pas par "http" ou "https"
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }

    // Testez si l'URL est accessible en HTTPS
    const isHttpsValid = await this.testHttps(url);

    // Continuez avec la navigation seulement si l'URL est valide
    if (isHttpsValid) {
      this.browsingService.goToPage(url);
    } else {
      console.log('L\'URL n\'est pas valide. Ne pas accéder au site.');
      // Ajoutez ici la logique que vous souhaitez exécuter lorsque l'URL n'est pas valide.
    }
  }
}
