import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ScrollService } from '../../shared/services/scroll.service';
import { FormsModule } from '@angular/forms';
import { BarbecueService } from '../../shared/services/barbecue.service';
import { PriceCalculationComponent } from '../price-calculation/price-calculation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, PriceCalculationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  ativo: boolean = false;
  sectionThreeHidden: boolean = true;
  sectionFourHidden: boolean = true;

  welcomeMessage = 'Welcome to the Barbecue Calculator!';
  isPriceCalculationStarted = false;

  scrollService = inject(ScrollService);

  ngOnInit(): void {

  }

  scrollToSection(id: string): void {
    this.scrollService.scrollToSection(id);
  }

  startPriceCalculation(): void {
    this.isPriceCalculationStarted = true;
  }
}
