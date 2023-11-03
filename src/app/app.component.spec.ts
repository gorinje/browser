import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BackComponent } from './toolbar/back/back.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { ForwardComponent } from './toolbar/forward/forward.component';
import { RefreshComponent } from './toolbar/refresh/refresh.component';
import { DebugComponent } from './toolbar/debug/debug.component';
import { AdressComponent } from './toolbar/adress/adress.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      ToolbarComponent,
      BackComponent,
      ForwardComponent,
      RefreshComponent,
      DebugComponent,
      AdressComponent
    ],
    imports:      [ FontAwesomeModule, FormsModule]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
