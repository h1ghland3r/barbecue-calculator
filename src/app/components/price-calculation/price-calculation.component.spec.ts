import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCalculationComponent } from './price-calculation.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('PriceCalculationComponent', () => {
  let component: PriceCalculationComponent;
  let fixture: ComponentFixture<PriceCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceCalculationComponent],
      providers: [provideHttpClient(), provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PriceCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
