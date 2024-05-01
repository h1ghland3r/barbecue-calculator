import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  numeros = [1, 2, 3, 4, 5];

  ativo: boolean = false;
  sectionThreeHidden: boolean = true;
  sectionFourHidden: boolean = true;

  scrollService = inject(ScrollService);

  // constructor(private scrollService: ScrollService) { }

  scrollToSection(id: string): void {
    this.scrollService.scrollToSection(id);

    if (id === 'section-3') {
      this.sectionThreeHidden = false;
    } else if (id === 'section-4') {
      this.sectionFourHidden = false;
    }
  }
}
