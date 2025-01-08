import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['../../styles/searchBar.css']
})
export class SearchBarComponent {
  @Input() query = '';
  @Output() onSearch = new EventEmitter<string>();

  handleInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.onSearch.emit(val);
  }
}