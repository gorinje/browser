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

  constructor(
    public browsingService :BrowsingService
  ) {
    this.browsingService.updateUrl.subscribe(() => {
        this.searchElement.nativeElement.value = this.browsingService.url;
    });

  }

  onKeyDownEvent(e: any) {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
      this.browsingService.setToCurrentUrl();
    } else if (e.key === 'Enter') {
      let value = e.currentTarget.value;
      e.currentTarget.blur();

      // Vérifier si l'URL contient déjà un protocole
      if (!/^https?:\/\//i.test(value)) {
        // Ajouter le protocole http s'il est absent
        value = 'http://' + value;
      }

      this.goToPage(value);
    }
  }

  onMouseDown(e: any) {
    this.searchElement.nativeElement.select();
  };

  goToPage(url: string) {
    this.browsingService.goToPage(url);
  }
}
