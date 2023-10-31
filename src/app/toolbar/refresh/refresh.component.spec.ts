import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { RefreshComponent } from './refresh.component';

describe('RefreshComponent', () => {
  let component: RefreshComponent;
  let fixture: ComponentFixture<RefreshComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefreshComponent],
      imports:      [ FontAwesomeModule ]
    });
    fixture = TestBed.createComponent(RefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
