import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BackComponent } from './toolbar/back/back.component';
import { ForwardComponent } from './toolbar/forward/forward.component';
import { RefreshComponent } from './toolbar/refresh/refresh.component';
import { AdressComponent } from './toolbar/adress/adress.component';
import { DebugComponent } from './toolbar/debug/debug.component';
import { HomeComponent } from './toolbar/home/home.component';
import { ScreenshotComponent } from './toolbar/screenshot/screenshot.component';
import { AdressBarComponent } from './toolbar/adress-bar/adress-bar.component';
import { FavorisBarComponent } from './toolbar/favoris-bar/favoris-bar.component';
import { HistoryComponent } from './toolbar/history/history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    BackComponent,
    ForwardComponent,
    RefreshComponent,
    AdressComponent,
    DebugComponent,
    HomeComponent,
    ScreenshotComponent,
    AdressBarComponent,
    FavorisBarComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
