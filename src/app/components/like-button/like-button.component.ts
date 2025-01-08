import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like-button.component.html',
  styleUrls: ['../../styles/imageCard.css']
})
export class LikeButtonComponent implements OnChanges {
  @Input() initialLiked = false;
  @Input() likes = 0;
  @Output() likeToggle = new EventEmitter<void>(); // We will notify the parent.
  @Input('data-testid') dataTestId?: string;

  liked = false;
  likesCount = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialLiked']) {
      this.liked = this.initialLiked;
    }
    if (changes['likes']) {
      this.likesCount = this.likes;
    }
  }

  toggleLike() {
    // We only emit the event. The parent is the one making the mutation.
    this.likeToggle.emit();
  }
}