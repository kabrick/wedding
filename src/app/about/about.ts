import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
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
