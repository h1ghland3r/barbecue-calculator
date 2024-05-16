import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { BarbecueService } from '../../shared/services/barbecue.service';

@Component({
  selector: 'app-price-calculation',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatStepperModule],
  templateUrl: './price-calculation.component.html',
  styleUrl: './price-calculation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceCalculationComponent implements OnInit {
  formPeople: FormGroup;
  formFoods: FormGroup;
  formDrinks: FormGroup;

  preco_picanha = 0;
  preco_costela = 0;
  preco_linguica = 0;
  preco_frango = 0;
  preco_cerveja = 0;
  preco_refrigerante = 0;
  preco_agua = 0;
  preco_suco = 0;

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

  formBuilder = inject(FormBuilder);
  barbecueService = inject(BarbecueService);

  // template driven
  nome: string = '';

  onSubmit() {
    console.log('Nome submetido:', this.nome);
  }

  constructor() {
    // reactive
    this.formPeople = this.formBuilder.group({
      adults: new FormControl(0, [Validators.required, Validators.min(0)]),
      children: new FormControl(0),
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
    const formPeopleValues = this.formPeople.value;
    const formFoodsValues = this.formFoods.value;
    const formDrinksValues = this.formDrinks.value;

    console.log('Formulário de pessoas:', formPeopleValues);
    console.log('Formulário de alimentos:', formFoodsValues);
    console.log('Formulário de bebidas:', formDrinksValues);

    this.formPeople.reset();
    this.formFoods.reset();
    this.formDrinks.reset();
  }

  private initializeValues(): void {
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
}
