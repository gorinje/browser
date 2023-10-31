import { Component } from '@angular/core';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { BrowsingService } from 'src/app/services/browsing.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent {
  faBug = faBug;

  constructor(
    public browsingService :BrowsingService
  ) {

  }
}
