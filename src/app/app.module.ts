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
import { CookievizBtnComponent } from './toolbar/cookieviz-btn/cookieviz-btn.component';
import { Routes, RouterModule } from '@angular/router';
import { CookievizComponent } from './cookieviz/cookieviz.component';
import { HighchartsChartModule } from 'highcharts-angular';

const routes: Routes = [
  { path: '', component: ToolbarComponent },
  { path: 'cookies', component: CookievizComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    BackComponent,
    ForwardComponent,
    RefreshComponent,
    AdressComponent,
    DebugComponent,
    CookievizBtnComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HighchartsChartModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
