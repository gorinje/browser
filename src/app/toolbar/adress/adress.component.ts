import { Component, ElementRef, ViewChild } from '@angular/core';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
import { BrowsingService } from 'src/app/services/browsing.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent {
  faGlobeEurope = faGlobeEurope;
  @ViewChild('search') searchElement: ElementRef = new ElementRef({});

  constructor(
    public browsingService :BrowsingService
  ) {
    
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

  async goToPage(url: string) {
    let fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url;
  
    try {
      let response = await fetch(fullUrl);
      if (!response.ok) throw new Error('Essai avec HTTP');
      this.browsingService.goToPage(fullUrl);
    } catch (error) {
      if (fullUrl.startsWith('https://')) {
        // Réessayer avec HTTP
        fullUrl = 'http://' + url;
        fetch(fullUrl).then(response => {
          if (response.ok) {
            this.browsingService.goToPage(fullUrl);
          } else {
            console.error('Erreur : Impossible de charger l\'URL');
          }
        }).catch(() => {
          console.error('Erreur : Impossible de charger l\'URL');
        });
      } else {
        console.error('Erreur : Impossible de charger l\'URL');
      }
    }
  }
  
}
