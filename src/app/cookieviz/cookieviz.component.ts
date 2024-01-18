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
  nodes: Array<any> = [];
  @ViewChild('container') container: ElementRef | undefined;
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  // chart custom config
  chartOptions: Highcharts.Options = {
    title: {
      text: 'CookieVis 2.0',
    },
    chart: {
      type: 'networkgraph',
      width: 690,
      height: 670,
    },
    plotOptions: {
      networkgraph: {
        layoutAlgorithm: {
          enableSimulation: true,
          integration: 'verlet',
          linkLength: 100,
        },
      },
    },
    series: [
      {
        type: 'networkgraph',
        data: this.data,
      },
    ],
  };

  constructor(public browsingService: BrowsingService) {
    this.cookies = browsingService.getCookies();
    this.cookies?.subscribe((d) => {
      // clear old nodes
      this.data = [];
      this.nodes = [];
      d.forEach((v, k) => {
        // add child nodes
        v.forEach((e) => {
          this.data.push([e, k]);
        });
        // add parent nodes
        this.nodes.push({
          id: k,
          dataLabels: {
            enabled: true,
            linkFormat: '',
            style: {
              fontSize: '1em',
              fontWeight: 'normal',
            },
            crop: true,
          },
          marker: {
            radius: 7,
            fillColor: 'red',
          },
        });
      });
      // update network graph
      this.chartOptions.series = [
        {
          type: 'networkgraph',
          nodes: this.nodes,
          data: this.data,
          marker: {
            radius: 5,
            fillColor: 'black',
          },
        },
      ];
      this.updateFlag = true;
    });
  }
}
