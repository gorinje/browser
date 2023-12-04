import { Component } from '@angular/core';
import { faHomeUser } from '@fortawesome/free-solid-svg-icons';
import {BrowsingService} from "../../services/browsing.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faHomeUser = faHomeUser;
  constructor(
    private browserService : BrowsingService
  ) {
  }

  goHome() {
    this.browserService.goToPage("https://amiens.unilasalle.fr/");
  }
}
