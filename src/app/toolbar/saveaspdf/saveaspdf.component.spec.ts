import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveaspdfComponent } from './saveaspdf.component';

describe('SaveaspdfComponent', () => {
  let component: SaveaspdfComponent;
  let fixture: ComponentFixture<SaveaspdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveaspdfComponent]
    });
    fixture = TestBed.createComponent(SaveaspdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
