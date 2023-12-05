import { Component } from '@angular/core';
import { faCookie } from '@fortawesome/free-solid-svg-icons';
import { BrowsingService } from 'src/app/services/browsing.service';

@Component({
  selector: 'app-cookieviz-btn',
  templateUrl: './cookieviz-btn.component.html',
  styleUrls: ['./cookieviz-btn.component.css'],
})
export class CookievizBtnComponent {
  faCookie = faCookie;
  log() {
    console.log(this.browsingService.getCookies());
  }
  constructor(public browsingService: BrowsingService) {}
}
