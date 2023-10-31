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
    this.browsingService.goToPage(url);
  }
}
