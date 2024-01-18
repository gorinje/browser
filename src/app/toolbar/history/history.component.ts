import { Component } from '@angular/core';
import { BrowsingService } from 'src/app/services/browsing.service';
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";
import dialog = Electron.dialog;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  constructor(
    public browsingService: BrowsingService
  ) { }
  showHistory() {
    // Afficher l'historique comme tu le souhaites (par exemple, une boîte de dialogue, un panneau latéral, etc.)
    console.log('Historique :', this.browsingService.history);
    const historyText = this.browsingService.history.join('\n');
    // Afficher l'historique dans sur le côté de l'application
    alert(historyText);


  }

  protected readonly faClockRotateLeft = faClockRotateLeft;
}
