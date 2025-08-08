import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Announcement {
  id: number;
  type: string;
  title: string;
  content: string;
  date: string;
  actionText?: string;
  actionUrl?: string;
}

@Component({
  selector: 'app-announcements',
  imports: [CommonModule],
  templateUrl: './announcements.html',
  styleUrl: './announcements.scss'
})
export class Announcements {

  protected readonly lastUpdated = 'January 15, 2025';

  protected readonly featuredAnnouncements = signal<Announcement[]>([
    {
      id: 1,
      type: 'IMPORTANT',
      title: 'Wedding Ceremony Time Update',
      content: 'Please note that our wedding ceremony will now begin at 2:30 PM instead of 2:00 PM. This change allows for better coordination with vendors and ensures we stay on schedule throughout the day. All other timeline events remain the same.',
      date: 'January 15, 2025',
      actionText: 'View Full Timeline',
      actionUrl: '/timeline'
    }
  ]);

  protected readonly regularAnnouncements = signal<Announcement[]>([
    {
      id: 2,
      type: 'Update',
      title: 'Weather Forecast Looking Great!',
      content: 'The latest weather forecast shows sunny skies and perfect 75°F weather for our wedding day. Don\'t forget to bring sunglasses for the outdoor cocktail hour!',
      date: 'January 12, 2025'
    },
    {
      id: 3,
      type: 'Reminder',
      title: 'RSVP Deadline Approaching',
      content: 'Just a friendly reminder that RSVPs are due by February 1st, 2025. We\'re excited to celebrate with you and need final headcounts for catering. Please submit your RSVP if you haven\'t already!',
      date: 'January 10, 2025',
      actionText: 'Submit RSVP',
      actionUrl: '/rsvp'
    },
    {
      id: 4,
      type: 'Update',
      title: 'Hotel Room Block Extended',
      content: 'Great news! We\'ve extended our hotel room block at the Grand Plaza Hotel through February 15th due to popular demand. Use code "MITCHDOUGLAS2025" when booking.',
      date: 'January 8, 2025',
      actionText: 'Book Now',
      actionUrl: 'https://www.grandplaza.com/booking'
    },
    {
      id: 5,
      type: 'Reminder',
      title: 'Shuttle Service Details',
      content: 'Complimentary shuttle service will run between the ceremony venue and reception hall every 15 minutes starting at 4:00 PM. The last shuttle back to hotels departs at 11:00 PM.',
      date: 'January 5, 2025'
    },
    {
      id: 6,
      type: 'Update',
      title: 'Menu Preview Available',
      content: 'Curious about what we\'ll be serving? We\'ve added a sneak peek of our wedding menu to the website. We can\'t wait for you to try the signature cocktails we\'ve created!',
      date: 'January 3, 2025',
      actionText: 'See Menu',
      actionUrl: '/menu'
    }
  ]);
}
