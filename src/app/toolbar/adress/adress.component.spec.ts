import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { AdressComponent } from './adress.component';
import { FormsModule } from '@angular/forms';

describe('AdressComponent', () => {
  let component: AdressComponent;
  let fixture: ComponentFixture<AdressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdressComponent],
      imports:      [ FontAwesomeModule, FormsModule ]
    });
    fixture = TestBed.createComponent(AdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
