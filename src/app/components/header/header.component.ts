import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() headerTitle!: string;

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
