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

  preco_picanha = 0;
  preco_costela = 0;
  preco_linguica = 0;
  preco_frango = 0;
  preco_cerveja = 0;
  preco_refrigerante = 0;
  preco_agua = 0;
  preco_suco = 0;

  scrollService = inject(ScrollService);
  barbecueService = inject(BarbecueService);

  ngOnInit(): void {
    this.barbecueService.getPrecoCarneByName('picanha')
      .subscribe(
        {
          next: (result) => {
            console.log(result);
          },

          error: (err: any) => {
            console.log(err);
          }
        }
      )

    this.barbecueService.getPrecoPicanha()
      .subscribe(
        {
          next: (preco) => {
            this.preco_picanha = preco;
            console.log('O kg da Picanha custa: ' + this.preco_picanha);
          },

          error: (err: any) => {
            console.log(err);
          }
        }
      )

    this.barbecueService.getPrecoCerveja()
      .subscribe(
        {
          next: (preco) => {
            this.preco_cerveja = preco;
            console.log('Cada cerveja custa: ' + this.preco_cerveja);
          },

          error: (err: any) => {
            console.log(err);
          }
        }
      )
  }

  scrollToSection(id: string): void {
    this.scrollService.scrollToSection(id);
  }

  startPriceCalculation(): void {
    this.isPriceCalculationStarted = true;
  }
}
