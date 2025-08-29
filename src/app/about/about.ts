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
      name: 'Bunga SDA Central Church',
      address: 'Gaba Road Off Soya Stage, Kampala',
      time: '10:00 AM',
      description: 'Wedding Ceremony',
      mapUrl: this.getSafeUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.5316300372397!2d32.61672854925081!3d0.2779481470714677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbdf6872ccff1%3A0x292e85d5291c9df0!2sBunga%20SDA%20Central%20Church!5e0!3m2!1sen!2sug!4v1756263341664!5m2!1sen!2sug')
    };

    this.receptionLocation = {
      name: 'Silver Springs Hotel',
      address: 'Port Bell Road, Bugolobi Kampala,',
      time: '2:30 PM',
      description: 'Wedding Reception',
      mapUrl: this.getSafeUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7569247357637!2d32.627040799999996!3d0.31785589999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbbfe390edf3d%3A0xc3bcaf50aa421559!2sSilver%20Springs%20Hotel%2C%20Bugolobi!5e0!3m2!1sen!2sug!4v1756263779987!5m2!1sen!2sug')
    };
  }

  addToCalendar(type: string): void {
    const eventDetails = {
      title: 'Michwe & Douglas\' Wedding',
      start: '20251026T100000Z',
      end: '20251026T200000Z',
      description: 'Join us for our wedding celebration!',
      location: 'Silver Springs Bugolobi, Kampala'
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
