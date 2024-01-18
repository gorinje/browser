import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookievizBtnComponent } from './cookieviz-btn.component';

describe('CookievizBtnComponent', () => {
  let component: CookievizBtnComponent;
  let fixture: ComponentFixture<CookievizBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookievizBtnComponent]
    });
    fixture = TestBed.createComponent(CookievizBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
