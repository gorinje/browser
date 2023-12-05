import { Component } from '@angular/core';
import { BrowsingService } from '../services/browsing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cookieviz',
  templateUrl: './cookieviz.component.html',
  styleUrls: ['./cookieviz.component.css'],
})
export class CookievizComponent {
  cookies: Observable<Map<String, String[]>>;
  log() {
    console.log('cookie refresh');
    console.log(this.cookies);
  }

  constructor(public browsingService: BrowsingService) {
    this.cookies = browsingService.getCookies();
  }
}
