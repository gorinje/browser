// toolbar.component.ts

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowsingService } from 'src/app/services/browsing.service';
import { HistoryComponent } from './history/history.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(public browsingService: BrowsingService, private dialog: MatDialog) {}

  showHistory(): void {
    const dialogRef = this.dialog.open(HistoryComponent, {
      width: '400px',
      data: { history: this.browsingService.getHistory() }
    });
  }
}
