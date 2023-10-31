import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { BackComponent } from './back.component';

describe('BackComponent', () => {
  let component: BackComponent;
  let fixture: ComponentFixture<BackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackComponent],
      imports:      [ FontAwesomeModule ]
    });
    fixture = TestBed.createComponent(BackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
