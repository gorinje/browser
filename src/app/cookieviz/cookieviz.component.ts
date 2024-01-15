import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { BrowsingService } from '../services/browsing.service';
import { Observable } from 'rxjs';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  standalone: true,
  selector: 'app-cookieviz',
  templateUrl: './cookieviz.component.html',
  styleUrls: ['./cookieviz.component.css'],
  imports: [HighchartsChartModule],
})
export class CookievizComponent {
  public cookies: Observable<Map<String, String[]>> | undefined;
  @ViewChild('container') container: ElementRef | undefined;
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  data = [1, 2, 3, 4];

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'line',
        data: this.data,
      },
    ],
  };

  log() {
    console.log('cookie refresh');
    console.log(this.cookies);
  }

  constructor(public browsingService: BrowsingService) {
    this.cookies = browsingService.getCookies();
  }
}
