import { MatButtonModule } from '@angular/material/button';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-price-calculation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule],
  templateUrl: './price-calculation.component.html',
  styleUrl: './price-calculation.component.scss'
})
export class PriceCalculationComponent {
  formPeople!: FormGroup;
  formFoods!: FormGroup;
  formDrinks!: FormGroup;

  formBuilder = inject(FormBuilder);

  // constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formPeople = this.formBuilder.group({
      adults: [null],
      children: [null]
    });
  }
}
