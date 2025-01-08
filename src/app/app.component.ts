import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ImageLoaderComponent } from './components/image-loader/image-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ImageLoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./styles/app.css'] 
})
export class AppComponent {
  searchQuery = '';

  handleSearch(newQuery: string) {
    this.searchQuery = newQuery;
  }
}