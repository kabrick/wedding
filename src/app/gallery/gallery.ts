import { Component, computed, signal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

type Category = 'kukyala' | 'engagement' | 'pre_shoot' | 'introduction' | 'church' | 'reception'

interface Photo {
  id: number;
  category: Category;
  thumbnail: string;
  fullSize: string;
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})

export class Gallery {
  protected readonly activeCategory = signal<Category>('kukyala');
  protected readonly lightboxPhoto = signal<Photo | null>(null);
  protected currentPhotoIndex = 0;
  
  // Track how many photos to show per category (initially 6)
  private readonly photosPerCategory = signal<Record<Category, number>>({
    kukyala: 6,
    engagement: 6,
    pre_shoot: 6,
    introduction: 6,
    church: 6,
    reception: 6
  });

  // Total available photos per category
  private readonly totalPhotosPerCategory = {
    kukyala: 27,
    engagement: 15,
    pre_shoot: 6,
    introduction: 6,
    church: 6,
    reception: 6
  };

  // Generate photo names for a given category
  generatePhotoNames(category: Category, numberOfPhotos: number): Photo[] {
    const photos: Photo[] = [];
    
    for (let i = 1; i <= numberOfPhotos; i++) {
      photos.push({
        id: Date.now() + i, // Generate unique ID
        category: category,
        thumbnail: `/images/${category}/thumbs/${category}${i}_thumb.webp`, // Optimized thumbnail
        fullSize: `/images/${category}/${category}${i}.webp` // Original full size
      });
    }
    
    return photos;
  }

  // Generate all available photos
  private readonly allPhotos = signal<Photo[]>([
    ...this.generatePhotoNames('kukyala', this.totalPhotosPerCategory.kukyala),
    ...this.generatePhotoNames('engagement', this.totalPhotosPerCategory.engagement),
  ]);

  // Computed signal that returns limited photos based on photosPerCategory
  protected readonly photos = computed(() => {
    const allPhotos = this.allPhotos();
    const limits = this.photosPerCategory();
    
    const limitedPhotos: Photo[] = [];
    
    Object.entries(limits).forEach(([category, limit]) => {
      const categoryPhotos = allPhotos
        .filter(photo => photo.category === category)
        .slice(0, limit);
      limitedPhotos.push(...categoryPhotos);
    });
    
    return limitedPhotos;
  });

  protected readonly filteredPhotos = computed(() => {
    const category = this.activeCategory();
    return this.photos().filter(photo => photo.category === category);
  });

  setCategory(category: Category): void {
    this.activeCategory.set(category);
  }

  openLightbox(photo: Photo): void {
    this.lightboxPhoto.set(photo);
    this.currentPhotoIndex = this.filteredPhotos().findIndex(p => p.id === photo.id);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxPhoto.set(null);
    document.body.style.overflow = 'auto';
  }

  previousPhoto(): void {
    const photos = this.filteredPhotos();
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
      this.lightboxPhoto.set(photos[this.currentPhotoIndex]);
    }
  }

  nextPhoto(): void {
    const photos = this.filteredPhotos();
    if (this.currentPhotoIndex < photos.length - 1) {
      this.currentPhotoIndex++;
      this.lightboxPhoto.set(photos[this.currentPhotoIndex]);
    }
  }

  hasPreviousPhoto(): boolean {
    return this.currentPhotoIndex > 0;
  }

  hasNextPhoto(): boolean {
    return this.currentPhotoIndex < this.filteredPhotos().length - 1;
  }

  // Load more photos for a specific category
  loadMorePhotos(category: Category): void {
    const currentLimits = this.photosPerCategory();
    const currentLimit = currentLimits[category];
    const totalAvailable = this.totalPhotosPerCategory[category];
    
    if (currentLimit < totalAvailable) {
      const newLimit = Math.min(currentLimit + 6, totalAvailable);
      this.photosPerCategory.set({
        ...currentLimits,
        [category]: newLimit
      });
    }
  }

  // Check if more photos are available for a category
  hasMorePhotos(category: Category): boolean {
    const currentLimit = this.photosPerCategory()[category];
    const totalAvailable = this.totalPhotosPerCategory[category];
    return currentLimit < totalAvailable;
  }

  // Get remaining photo count for a category
  getRemainingPhotoCount(category: Category): number {
    const currentLimit = this.photosPerCategory()[category];
    const totalAvailable = this.totalPhotosPerCategory[category];
    return Math.max(0, totalAvailable - currentLimit);
  }
}
