import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {

  title: string = 'Churrascômetro';

  constructor() {
    console.log('HeaderComponent constructor()');
  }

  public ngOnInit(): void {
    console.log('HeaderComponent ngOnInit()');
  }

  public ngOnChanges(): void {
    console.log('HeaderComponent ngOnChanges()');
  }

  public ngOnDestroy(): void {
    console.log('HeaderComponent ngOnDestroy()');
  }
}
