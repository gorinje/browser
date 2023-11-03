import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { BackComponent } from './back/back.component';
import { ForwardComponent } from './forward/forward.component';
import { RefreshComponent } from './refresh/refresh.component';
import { AdressComponent } from './adress/adress.component';
import { DebugComponent } from './debug/debug.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        BackComponent,
        ForwardComponent,
        RefreshComponent,
        DebugComponent,
        AdressComponent
      ],
      imports:      [ FontAwesomeModule, FormsModule ]
    });
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
