import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { BrowsingService } from '../services/browsing.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-cookieviz',
  templateUrl: './cookieviz.component.html',
  styleUrls: ['./cookieviz.component.css'],
})
export class CookievizComponent {
  public cookies: Observable<Map<String, String[]>> | undefined;
  @ViewChild('container') container: ElementRef | undefined;

  log() {
    console.log('cookie refresh');
    console.log(this.cookies);
  }

  constructor(public browsingService: BrowsingService) {
    this.cookies = browsingService.getCookies();
  }
}
