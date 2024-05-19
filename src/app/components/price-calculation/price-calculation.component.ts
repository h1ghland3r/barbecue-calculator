import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { BarbecueService } from '../../shared/services/barbecue.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-price-calculation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatStepperModule],
  templateUrl: './price-calculation.component.html',
  styleUrl: './price-calculation.component.scss'
})
export class PriceCalculationComponent implements OnInit {
  // forms

  formPeople: FormGroup;
  formFoods: FormGroup;
  formDrinks: FormGroup;

  foodsList = [
    { value: 'picanha', label: 'Picanha' },
    { value: 'costela', label: 'Costela' },
    { value: 'linguica', label: 'Linguiça' },
    { value: 'frango', label: 'Frango' }
  ];

  drinksList = [
    { value: 'cerveja', label: 'Cerveja' },
    { value: 'refrigerante', label: 'Refrigerante' },
    { value: 'agua', label: 'Água' },
    { value: 'suco', label: 'Suco' }
  ];

  // valores referência

  preco_picanha = 0;
  preco_costela = 0;
  preco_linguica = 0;
  preco_frango = 0;

  consumo_adulto_picanha = 0;
  consumo_crianca_picanha = 0;
  consumo_adulto_costela = 0;
  consumo_crianca_costela = 0;
  consumo_adulto_linguica = 0;
  consumo_crianca_linguica = 0;
  consumo_adulto_frango = 0;
  consumo_crianca_frango = 0;

  preco_cerveja = 0;
  preco_refrigerante = 0;
  preco_agua = 0;
  preco_suco = 0;

  // resultados

  adultos_total = 0;
  criancas_total = 0;

  consumo_adulto_cerveja = 0;
  consumo_adulto_refrigerante = 0;
  consumo_crianca_refrigerante = 0;
  consumo_adulto_agua = 0;
  consumo_crianca_agua = 0;
  consumo_adulto_suco = 0;
  consumo_crianca_suco = 0;

  valor_total_picanha = 0;
  valor_total_costela = 0;
  valor_total_linguica = 0;
  valor_total_frango = 0;

  consumo_total_picanha = 0;
  consumo_total_costela = 0;
  consumo_total_linguica = 0;
  consumo_total_frango = 0;

  valor_total_cerveja = 0;
  valor_total_refrigerante = 0;
  valor_total_agua = 0;
  valor_total_suco = 0;

  consumo_total_cerveja = 0;
  consumo_total_refrigerante = 0;
  consumo_total_agua = 0;
  consumo_total_suco = 0;

  valor_total = 0;

  exibirSpinner = false;
  exibirResultados = false;

  formBuilder = inject(FormBuilder);
  barbecueService = inject(BarbecueService);

  constructor() {
    this.formPeople = this.formBuilder.group({
      adultos: new FormControl(0, [Validators.required, Validators.min(0)]),
      criancas: new FormControl(0),
    });

    this.formFoods = this.formBuilder.group({
      picanha: new FormControl(null),
      costela: new FormControl(null),
      linguica: new FormControl(null),
      frango: new FormControl(null),
    });

    this.formDrinks = this.formBuilder.group({
      cerveja: new FormControl(null),
      refrigerante: new FormControl(null),
      agua: new FormControl(null),
      suco: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  submit() {
    if (this.formPeople.valid && this.formFoods.valid && this.formDrinks.valid) {
      this.exibirSpinner = true;
      this.exibirResultados = false;

      const peopleValues = this.formPeople.value;
      const foodsValues = this.formFoods.value;
      const drinksValues = this.formDrinks.value;

      const adultos = peopleValues.adultos;
      const criancas = peopleValues.criancas;
      const picanha = foodsValues.picanha;
      const costela = foodsValues.costela;
      const linguica = foodsValues.linguica;
      const frango = foodsValues.frango;
      const cerveja = drinksValues.cerveja;
      const refrigerante = drinksValues.refrigerante;
      const agua = drinksValues.agua;
      const suco = drinksValues.suco;

      if (adultos) {
        this.adultos_total = adultos;
      }

      if (criancas) {
        this.criancas_total = criancas;
      }

      // foods
      if (picanha) {
        this.consumo_total_picanha = (adultos * this.consumo_adulto_picanha) + (criancas * this.consumo_crianca_picanha);
        this.valor_total_picanha = (this.consumo_total_picanha / 1000) * this.preco_picanha;
      }

      if (costela) {
        this.consumo_total_costela = (adultos * this.consumo_adulto_costela) + (criancas * this.consumo_crianca_costela);
        this.valor_total_costela = (this.consumo_total_costela / 1000) * this.preco_costela;
      }

      if (linguica) {
        this.consumo_total_linguica = (adultos * this.consumo_adulto_linguica) + (criancas * this.consumo_crianca_linguica);
        this.valor_total_linguica = (this.consumo_total_linguica / 1000) * this.preco_linguica;
      }

      if (frango) {
        this.consumo_total_frango = (adultos * this.consumo_adulto_frango) + (criancas * this.consumo_crianca_frango);
        this.valor_total_frango = (this.consumo_total_frango / 1000) * this.preco_frango;
      }

      // drinks
      if (cerveja) {
        this.consumo_total_cerveja = adultos * 500;
        this.valor_total_cerveja = (this.consumo_total_cerveja / 1000) * this.preco_cerveja;
      }

      if (refrigerante) {
        this.consumo_total_refrigerante = (adultos * 300) + (criancas * 200);
        this.valor_total_refrigerante = (this.consumo_total_refrigerante / 1000) * this.preco_refrigerante;
      }

      if (agua) {
        this.consumo_total_agua = (adultos * 500) + (criancas * 300);
        this.valor_total_agua = (this.consumo_total_agua / 1000) * this.preco_agua;
      }

      if (suco) {
        this.consumo_total_suco = (adultos * 500) + (criancas * 300);
        this.valor_total_suco = (this.consumo_total_suco / 1000) * this.preco_suco;
      }

      this.valor_total = this.valor_total_picanha + this.valor_total_costela + this.valor_total_linguica + this.valor_total_frango +
        this.valor_total_cerveja + this.valor_total_refrigerante + this.valor_total_agua + this.valor_total_suco;

      setTimeout(() => {
        this.exibirSpinner = false;
        this.exibirResultados = true;
      }, 1000);
    }
  }

  private initializeValues(): void {
    this.barbecueService.getCarnes().pipe(
      map(carnes => {
        carnes.forEach(carne => {
          switch (carne.nome) {
            case 'picanha':
              this.preco_picanha = carne.preco_kg;
              this.consumo_adulto_picanha = carne.consumo_medio_adulto_g;
              this.consumo_crianca_picanha = carne.consumo_medio_crianca_g;
              break;
            case 'costela':
              this.preco_costela = carne.preco_kg;
              this.consumo_adulto_costela = carne.consumo_medio_adulto_g;
              this.consumo_crianca_costela = carne.consumo_medio_crianca_g;
              break;
            case 'linguiça':
              this.preco_linguica = carne.preco_kg;
              this.consumo_adulto_linguica = carne.consumo_medio_adulto_g;
              this.consumo_crianca_linguica = carne.consumo_medio_crianca_g;
              break;
            case 'frango':
              this.preco_frango = carne.preco_kg;
              this.consumo_adulto_frango = carne.consumo_medio_adulto_g;
              this.consumo_crianca_frango = carne.consumo_medio_crianca_g;
              break;
          }
        });
      })
    ).subscribe();

    this.barbecueService.getBebidas().pipe(
      map(bebidas => {
        bebidas.forEach(bebida => {
          switch (bebida.nome) {
            case 'cerveja':
              this.preco_cerveja = bebida.preco_unidade;
              this.consumo_adulto_cerveja = bebida.consumo_medio_adulto_ml;
              break;
            case 'refrigerante':
              this.preco_refrigerante = bebida.preco_unidade;
              this.consumo_adulto_refrigerante = bebida.consumo_medio_adulto_ml;
              this.consumo_crianca_refrigerante = bebida.consumo_medio_crianca_ml;
              break;
            case 'água':
              this.preco_agua = bebida.preco_unidade;
              this.consumo_adulto_agua = bebida.consumo_medio_adulto_ml;
              this.consumo_crianca_agua = bebida.consumo_medio_crianca_ml;
              break;
            case 'suco':
              this.preco_suco = bebida.preco_unidade;
              this.consumo_adulto_suco = bebida.consumo_medio_adulto_ml;
              this.consumo_crianca_suco = bebida.consumo_medio_crianca_ml;
              break;
          }
        });
      })
    ).subscribe();



    // this.barbecueService.getPrecoCarneByName('picanha')
    //   .subscribe(
    //     {
    //       next: (result) => {
    //         console.log(result);
    //       },

    //       error: (err: any) => {
    //         console.log(err);
    //       }
    //     }
    //   )

    // this.barbecueService.getPrecoPicanha()
    //   .subscribe(
    //     {
    //       next: (preco) => {
    //         this.preco_picanha = preco;
    //         console.log('O kg da Picanha custa: ' + this.preco_picanha);
    //       },

    //       error: (err: any) => {
    //         console.log(err);
    //       }
    //     }
    //   )

    // this.barbecueService.getPrecoCerveja()
    //   .subscribe(
    //     {
    //       next: (preco) => {
    //         this.preco_cerveja = preco;
    //         console.log('Cada cerveja custa: ' + this.preco_cerveja);
    //       },

    //       error: (err: any) => {
    //         console.log(err);
    //       }
    //     }
    //   )
  }
}
