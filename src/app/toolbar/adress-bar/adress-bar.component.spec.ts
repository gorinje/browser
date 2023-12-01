import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressBarComponent } from './adress-bar.component';

describe('AdressBarComponent', () => {
  let component: AdressBarComponent;
  let fixture: ComponentFixture<AdressBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdressBarComponent]
    });
    fixture = TestBed.createComponent(AdressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
