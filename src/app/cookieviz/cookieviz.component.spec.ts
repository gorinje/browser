import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookievizComponent } from './cookieviz.component';

describe('CookievizComponent', () => {
  let component: CookievizComponent;
  let fixture: ComponentFixture<CookievizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookievizComponent]
    });
    fixture = TestBed.createComponent(CookievizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
