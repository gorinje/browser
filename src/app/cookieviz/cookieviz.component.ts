import { Component } from '@angular/core';
import { BrowsingService } from '../services/browsing.service';

@Component({
  selector: 'app-cookieviz',
  templateUrl: './cookieviz.component.html',
  styleUrls: ['./cookieviz.component.css'],
})
export class CookievizComponent {
  constructor(public browsingService: BrowsingService) {}
}
