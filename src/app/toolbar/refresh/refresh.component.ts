import { Component } from '@angular/core';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { BrowsingService } from 'src/app/services/browsing.service';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent {
  faRefresh=faRefresh;

  constructor(
    public browsingService :BrowsingService
  ) {

  }
}
