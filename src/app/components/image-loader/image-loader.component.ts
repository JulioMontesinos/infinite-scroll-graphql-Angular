import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGridComponent } from '../image-grid/image-grid.component';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image.models';

@Component({
  selector: 'app-image-loader',
  standalone: true,
  imports: [CommonModule, ImageGridComponent],
  templateUrl: './image-loader.component.html',
  styleUrls: ['../../styles/app.css']
})
export class ImageLoaderComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() searchQuery = '';

  allImages: Image[] = [];
  cursor: string | null = null;
  hasNextPage = true;
  loading = false;
  error: any;

  private observer: IntersectionObserver | null = null;
  private batchSize = 10;
  private downloadedImages: Image[] = [];

  @ViewChild('infiniteScrollTarget') sentinelRef!: ElementRef;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    // The first image load (without a filter or with the initial empty query).
    this.fetchImages(true);
  }

  /**
   * Each time `searchQuery` changes, we restart the search.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery'] && !changes['searchQuery'].firstChange) {
      this.fetchImages(true);
    }
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.loading) {
          if (this.hasNextPage) {
            this.fetchImages(false);
          } else {
            this.appendRandomImages(5);
          }
        }
      },
      { root: null, rootMargin: '300px' }
    );

    if (this.sentinelRef?.nativeElement && this.observer) {
      this.observer.observe(this.sentinelRef.nativeElement);
    }
  }

  fetchImages(reset: boolean) {
    if (reset) {
      this.cursor = null;
      this.allImages = [];
      this.downloadedImages = [];
      this.hasNextPage = true;
    }
    if (!this.hasNextPage) return;

    this.loading = true;
    this.imageService
      .getImages(this.batchSize, this.cursor, this.searchQuery)
      .subscribe({
        next: (data) => {
          const edges = data.images.edges;
          const newImages = edges.map((e) => e.node);

          // Merge without duplicates in downloadedImages.
          const mergedAll = [
            ...this.downloadedImages,
            ...newImages.filter(
              (img) => !this.downloadedImages.some((a) => a.id === img.id)
            )
          ];
          this.downloadedImages = mergedAll;

          // We add the new images to the visible array.
          this.allImages = [...this.allImages, ...newImages];

          this.cursor = data.images.pageInfo.endCursor;
          this.hasNextPage = data.images.pageInfo.hasNextPage;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Error';
          this.loading = false;
        }
      });
  }

  private appendRandomImages(count: number) {
    if (this.downloadedImages.length === 0) return;
    const randomSubset = this.getRandomSubset(this.downloadedImages, count);
    this.allImages = [...this.allImages, ...randomSubset];
  }

  private getRandomSubset(arr: Image[], count: number): Image[] {
    const shuffled = [...arr];
    shuffled.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}