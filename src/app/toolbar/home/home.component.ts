import { Component } from '@angular/core';
import {BrowsingService} from "../../services/browsing.service";
import { faHomeUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faHomeUser = faHomeUser;

  constructor(
    private browsingService : BrowsingService
  ) {
  }

  goHome() {
    this.browsingService.goToPage("https://amiens.unilasalle.fr");
  }
}
