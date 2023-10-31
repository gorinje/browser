import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { DebugComponent } from './debug.component';

describe('DebugComponent', () => {
  let component: DebugComponent;
  let fixture: ComponentFixture<DebugComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebugComponent],
      imports:      [ FontAwesomeModule ]
    });
    fixture = TestBed.createComponent(DebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
