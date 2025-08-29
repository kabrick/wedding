import { Component, computed, signal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

interface Photo {
  id: number;
  category: 'visitation' | 'ceremony' | 'reception' | 'introduction' | 'couple';
  caption: string;
  thumbnail: string;
  fullSize: string;
  date?: string;
}

type CategoryFilter = 'all' | 'visitation' | 'ceremony' | 'reception' | 'introduction' | 'couple';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  protected readonly activeCategory = signal<CategoryFilter>('all');
  protected readonly lightboxPhoto = signal<Photo | null>(null);
  protected currentPhotoIndex = 0;

  protected readonly photos = signal<Photo[]>([
    // visitation Photos
    {
      id: 1,
      category: 'visitation',
      caption: 'The moment he proposed on the beach at sunset',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
      date: 'December 2023'
    },
    {
      id: 2,
      category: 'visitation',
      caption: 'Our engagement celebration with champagne',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=800&fit=crop',
      date: 'December 2023'
    },
    {
      id: 3,
      category: 'visitation',
      caption: 'Showing off the perfect ring',
      thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1200&h=800&fit=crop',
      date: 'December 2023'
    },

    // Ceremony Photos  
    {
      id: 4,
      category: 'ceremony',
      caption: 'Walking down the aisle with pure joy',
      thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=800&fit=crop',
      date: 'October 26, 2025'
    },
    {
      id: 5,
      category: 'ceremony',
      caption: 'Exchanging vows under the perfect sky',
      thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop',
      date: 'October 26, 2025'
    },
    {
      id: 6,
      category: 'ceremony',
      caption: 'The first kiss as a married couple',
      thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=800&fit=crop',
      date: 'October 26, 2025'
    },

    // Reception Photos
    {
      id: 7,
      category: 'reception',
      caption: 'Our magical first dance',
      thumbnail: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&h=800&fit=crop',
      date: 'October 26, 2025'
    },
    {
      id: 8,
      category: 'reception',
      caption: 'Cutting the beautiful wedding cake',
      thumbnail: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&h=800&fit=crop',
      date: 'October 26, 2025'
    },
    {
      id: 9,
      category: 'reception',
      caption: 'Dancing the night away with our guests',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
      date: 'October 26, 2025'
    },

    // Travel & Adventures
    {
      id: 10,
      category: 'introduction',
      caption: 'Exploring Paris during our honeymoon',
      thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1200&h=800&fit=crop',
      date: 'November 2025'
    },
    {
      id: 11,
      category: 'introduction',
      caption: 'Romantic dinner in Rome',
      thumbnail: 'https://images.unsplash.com/photo-1555992336-03a23c87b9da?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1555992336-03a23c87b9da?w=1200&h=800&fit=crop',
      date: 'November 2025'
    },

    // Just Us Two
    {
      id: 12,
      category: 'couple',
      caption: 'Cozy morning coffee together',
      thumbnail: 'https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=1200&h=800&fit=crop'
    },
    {
      id: 13,
      category: 'couple',
      caption: 'Sunset walk on our favorite trail',
      thumbnail: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop',
      fullSize: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&h=800&fit=crop'
    }
  ]);

  protected readonly filteredPhotos = computed(() => {
    const category = this.activeCategory();
    if (category === 'all') {
      return this.photos();
    }
    return this.photos().filter(photo => photo.category === category);
  });

  setCategory(category: CategoryFilter): void {
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

  showUploadModal(): void {
    alert('Photo upload feature coming soon! For now, please email your photos to mitch.douglas@wedding.com');
  }
}
