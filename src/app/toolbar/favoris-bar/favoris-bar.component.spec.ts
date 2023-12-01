import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorisBarComponent } from './favoris-bar.component';

describe('FavorisBarComponent', () => {
  let component: FavorisBarComponent;
  let fixture: ComponentFixture<FavorisBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavorisBarComponent]
    });
    fixture = TestBed.createComponent(FavorisBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
