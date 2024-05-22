import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ScrollService } from '../../shared/services/scroll.service';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let scrollService: ScrollService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideAnimations(),
        { provide: ScrollService, useValue: scrollService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  scrollService = {
    scrollToSection: jest.fn()
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call scrollToSection to header on button click', () => {
    const button = fixture.debugElement.query(By.css('.btn-scroll-to-header'));
    button.triggerEventHandler('click');

    expect(scrollService.scrollToSection).toHaveBeenCalledWith('header');
  });

  it('should call scrollToSection to form on button click', () => {
    const button = fixture.debugElement.query(By.css('.btn-start-scroll-to-form'));
    button.triggerEventHandler('click');

    expect(scrollService.scrollToSection).toHaveBeenCalledWith('form-container');
  });
});
