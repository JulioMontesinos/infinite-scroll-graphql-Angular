import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { Image } from '../../models/image.models';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [CommonModule, LikeButtonComponent],
  templateUrl: './image-card.component.html',
  styleUrls: ['../../styles/imageCard.css']
})
export class ImageCardComponent {
  @Input() image!: Image;

  constructor(private imageService: ImageService) {}

  handleLikeToggle() {
    if (!this.image) return;
    this.imageService.likeImage(this.image.id).subscribe({

      next: (res) => {
        this.image = {
          ...this.image,
          liked: res.liked,
          likesCount: res.likesCount
        };
  
      },
      error: (err) => {
        console.error('Error while liking the image:', err);
      }
    });
  }
}