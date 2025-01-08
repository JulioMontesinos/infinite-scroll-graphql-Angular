import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCardComponent } from '../image-card/image-card.component';
import { Image } from '../../models/image.models';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [CommonModule, ImageCardComponent],
  templateUrl: './image-grid.component.html',
  styleUrls: ['../../styles/imageGrid.css']
})
export class ImageGridComponent {
  @Input() images: Image[] = [];
}