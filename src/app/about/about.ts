import { Component } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})

export class About {
  churchLocation: any;
  receptionLocation: any;

  constructor(private sanitizer: DomSanitizer) {
    // Initialize locations in constructor after sanitizer is available
    this.churchLocation = {
      name: 'St. Mary\'s Cathedral',
      address: '123 Cathedral Street, City, State 12345',
      time: '3:00 PM',
      description: 'Wedding Ceremony',
      mapUrl: this.getSafeUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.5273!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890')
    };

    this.receptionLocation = {
      name: 'Beautiful Garden Venue',
      address: '456 Garden Lane, City, State 12345',
      time: '5:00 PM',
      description: 'Wedding Reception',
      mapUrl: this.getSafeUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.5273!2d-74.0050!3d40.7118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQwLjEiTiA3NMKwMDAnMTguNiJX!5e0!3m2!1sen!2sus!4v1234567891')
    };
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

  private getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
