import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Photo {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  activeFilter = 'all';
  selectedPhoto: Photo | null = null;

  photos: Photo[] = [
    { id: 1, title: 'Our First Date', description: 'Coffee and endless conversation', category: 'everyday', date: 'March 2019' },
    { id: 2, title: 'Engagement Photos', description: 'Professional engagement shoot', category: 'engagement', date: 'June 2024' },
    { id: 3, title: 'Paris Adventure', description: 'Romantic getaway to the City of Light', category: 'travel', date: 'September 2022' },
    { id: 4, title: 'Hiking Together', description: 'Exploring nature trails', category: 'everyday', date: 'May 2023' },
    { id: 5, title: 'The Proposal', description: 'The moment that changed everything', category: 'engagement', date: 'December 2024' },
    { id: 6, title: 'Beach Vacation', description: 'Sunset walks on the beach', category: 'travel', date: 'July 2023' },
    { id: 7, title: 'Cooking Together', description: 'Sunday morning pancakes', category: 'everyday', date: 'January 2024' },
    { id: 8, title: 'Ring Shopping', description: 'Finding the perfect ring', category: 'engagement', date: 'November 2024' },
    { id: 9, title: 'Mountain Trip', description: 'Weekend getaway to the mountains', category: 'travel', date: 'October 2023' }
  ];

  get filteredPhotos(): Photo[] {
    if (this.activeFilter === 'all') {
      return this.photos;
    }
    return this.photos.filter(photo => photo.category === this.activeFilter);
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  openLightbox(photo: Photo): void {
    this.selectedPhoto = photo;
  }

  closeLightbox(): void {
    this.selectedPhoto = null;
  }

  addToCalendar(type: string): void {
    const eventDetails = {
      title: 'John & Jane Wedding',
      start: '20250815T150000Z',
      end: '20250815T230000Z',
      description: 'Join us for our wedding celebration!',
      location: 'Beautiful Garden Venue, City'
    };

    let url = '';
    
    switch(type) {
      case 'google':
        url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
        break;
      case 'outlook':
        url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventDetails.title)}&startdt=${eventDetails.start}&enddt=${eventDetails.end}&body=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
        break;
      case 'apple':
        // For Apple Calendar, we'll create an ICS file
        this.downloadICSFile(eventDetails);
        return;
    }
    
    if (url) {
      window.open(url, '_blank');
    }
  }

  private downloadICSFile(event: any): void {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//Wedding Calendar//EN
BEGIN:VEVENT
UID:${Date.now()}@wedding.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
