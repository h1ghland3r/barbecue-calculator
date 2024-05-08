import { CommonModule } from '@angular/common';
import { Component, Inject, LOCALE_ID, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ScrollService } from '../../shared/services/scroll.service';
import { FormsModule } from '@angular/forms';
import { PriceCalculationComponent } from '../../price-calculation/price-calculation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, PriceCalculationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  numeros = [1, 2, 3, 4, 5];

  ativo: boolean = false;
  sectionThreeHidden: boolean = true;
  sectionFourHidden: boolean = true;

  scrollService = inject(ScrollService);

  welcomeMessage = 'Welcome to the Barbecue Calculator!';
  name = 'Railan';

  hasUser = true;

  adaUrl = 'https://ada.tech';

  displayButtonOutput = false;

  // constructor(private scrollService: ScrollService) { }

  username = '';

  hoje = new Date();

  isPriceCalculationStarted = false;

  getName() {
    return this.name;
  }

  scrollToSection(id: string): void {
    if (id === 'section-3') {
      this.sectionThreeHidden = false;
    } else if (id === 'section-4') {
      this.sectionFourHidden = false;
    }

    this.scrollService.scrollToSection(id);
  }

  onClick(): string {
    this.displayButtonOutput = true;
    return 'Você clicou no botão!';
  }

  startPriceCalculatioN(): void {
    this.isPriceCalculationStarted = true;
  }

}
