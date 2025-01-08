import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent],
  template: `
    <header class="header">
      <div class="logo">
        <button>LOGO</button>
      </div>
      <app-search-bar
        [query]="query"
        (onSearch)="onSearch.emit($event)"
      ></app-search-bar>
    </header>
  `,
  styleUrls: ['../../styles/header.css']
})
export class HeaderComponent {
  @Input() query = '';
  @Output() onSearch = new EventEmitter<string>();
}