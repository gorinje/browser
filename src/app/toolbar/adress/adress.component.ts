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
      const value = e.currentTarget.value;
      e.currentTarget.blur();
      this.goToPage(value);
    }
  }

  onMouseDown(e: any) {
    this.searchElement.nativeElement.select();
  };

  goToPage(url: string) {
    // Si l'URL ne commence ni par 'http://' ni par 'https://', ajoutez 'https://'
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      this.tryLoadUrl('https://' + url, (success) => {
        if (!success) {
          // Si le chargement en HTTPS échoue, essayez en HTTP
          this.tryLoadUrl('http://' + url);
        }
      });
    } else {
      this.browsingService.goToPage(url);
    }
  }

  tryLoadUrl(url: string, callback?: (success: boolean) => void) {

    fetch(url, { mode: 'no-cors' })
      .then(response => {
        if (response.ok || response.type === 'opaque') {
          this.browsingService.goToPage(url);
          callback?.(true);
        } else {
          callback?.(false);
        }
      })
      .catch(() => {
        callback?.(false);
      });
  }
}
