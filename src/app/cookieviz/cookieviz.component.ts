import { Component, ElementRef, ViewChild } from '@angular/core';
import { BrowsingService } from '../services/browsing.service';
import { Observable } from 'rxjs';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';
HighchartsNetworkgraph(Highcharts);

@Component({
  standalone: true,
  selector: 'app-cookieviz',
  templateUrl: './cookieviz.component.html',
  styleUrls: ['./cookieviz.component.css'],
  imports: [HighchartsChartModule],
})
export class CookievizComponent {
  public cookies: Observable<Map<String, String[]>> | undefined;
  data: Array<Array<String>> = [];
  @ViewChild('container') container: ElementRef | undefined;
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'CookieVis 2.0',
    },
    chart: {
      type: 'networkgraph',
    },
    plotOptions: {
      networkgraph: {
        layoutAlgorithm: {
          enableSimulation: true,
          integration: 'verlet',
          linkLength: 100,
        },
        link: {
          color: 'red',
        },
      },
    },
    series: [
      {
        marker: {
          radius: 15,
        },
        dataLabels: {
          enabled: true,
          textPath: {
            enabled: true,
          },
          linkFormat: '',
        },
        type: 'networkgraph',
        data: this.data,
      },
    ],
  };

  log() {
    console.log('cookie refresh');
    this.updateFlag = true;
  }

  constructor(public browsingService: BrowsingService) {
    this.cookies = browsingService.getCookies();
    this.cookies?.subscribe((d) => {
      this.data = [];
      console.log(d);
      d.forEach((v, k) => {
        v.forEach((e) => {
          this.data.push([e, k]);
        });
      });

      this.chartOptions.series = [
        {
          marker: {
            radius: 10,
          },
          type: 'networkgraph',
          data: this.data,
        },
      ];
      this.updateFlag = true;
    });
  }
}
