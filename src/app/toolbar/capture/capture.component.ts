import { Component } from '@angular/core';
import BrowserWindow = Electron.BrowserWindow;
import {faCamera, faHomeUser} from "@fortawesome/free-solid-svg-icons";
import {BrowsingService} from "../../services/browsing.service";

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent {
  faCapture = faCamera;
  private contents: any;
  private rect: any;
  private opts: any;

  constructor(
    private browsingService: BrowsingService
  ) {
  }

  capture(){
    this.contents.capturePage([this.rect, this.opts])
  }
}
