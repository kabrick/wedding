import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss']
})
export class Timeline {
  selectedFilter: 'all' | 'ceremony' | 'reception' = 'all';
  
  ceremonyEvents = [
    {
      time: '2:00 PM',
      title: 'Guest Arrival',
      description: 'Welcome and seating for the ceremony',
      icon: '👋',
      category: 'ceremony'
    },
    {
      time: '2:30 PM',
      title: 'Wedding Ceremony Begins',
      description: 'Exchange of vows in the beautiful church setting',
      icon: '💍',
      category: 'ceremony'
    },
    {
      time: '3:00 PM',
      title: 'Ceremony Conclusion',
      description: 'Recessional and congratulations',
      icon: '🎉',
      category: 'ceremony'
    },
    {
      time: '3:15 PM',
      title: 'Photography Session',
      description: 'Couple and family photos at the church',
      icon: '📸',
      category: 'ceremony'
    }
  ];
  
  receptionEvents = [
    {
      time: '5:00 PM',
      title: 'Cocktail Hour',
      description: 'Welcome drinks and hors d\'oeuvres at the reception venue',
      icon: '🥂',
      category: 'reception'
    },
    {
      time: '6:00 PM',
      title: 'Reception Begins',
      description: 'Dinner service and celebration begin',
      icon: '🍽️',
      category: 'reception'
    },
    {
      time: '7:30 PM',
      title: 'First Dance',
      description: 'The newlyweds take their first dance',
      icon: '💃',
      category: 'reception'
    },
    {
      time: '8:00 PM',
      title: 'Speeches & Toasts',
      description: 'Family and friends share their love and well wishes',
      icon: '🎤',
      category: 'reception'
    },
    {
      time: '8:30 PM',
      title: 'Open Dancing',
      description: 'Dance floor opens for all guests',
      icon: '🕺',
      category: 'reception'
    },
    {
      time: '10:00 PM',
      title: 'Cake Cutting',
      description: 'Traditional cake cutting ceremony',
      icon: '🎂',
      category: 'reception'
    },
    {
      time: '11:00 PM',
      title: 'Last Dance & Send-Off',
      description: 'Final dance and sparkler send-off',
      icon: '✨',
      category: 'reception'
    }
  ];
  
  get timelineEvents() {
    const allEvents = [...this.ceremonyEvents, ...this.receptionEvents];
    
    switch (this.selectedFilter) {
      case 'ceremony':
        return this.ceremonyEvents;
      case 'reception':
        return this.receptionEvents;
      default:
        return allEvents;
    }
  }
  
  setFilter(filter: 'all' | 'ceremony' | 'reception') {
    this.selectedFilter = filter;
  }
  
  get filterButtonText() {
    switch (this.selectedFilter) {
      case 'ceremony':
        return 'Ceremony Only';
      case 'reception':
        return 'Reception Only';
      default:
        return 'Full Day';
    }
  }
  
  // Legacy events array for backward compatibility
  oldTimelineEvents = [
    {
      time: '2:00 PM',
      title: 'Guest Arrival & Cocktail Hour',
      description: 'Welcome drinks and light refreshments as guests arrive',
      icon: '🥂'
    },
    {
      time: '3:00 PM',
      title: 'Wedding Ceremony',
      description: 'Exchange of vows in the beautiful garden setting',
      icon: '💍'
    },
    {
      time: '3:30 PM',
      title: 'Photography Session',
      description: 'Couple and family photos in the garden',
      icon: '📸'
    },
    {
      time: '4:30 PM',
      title: 'Reception Begins',
      description: 'Dinner service and celebration begin',
      icon: '🍽️'
    },
    {
      time: '6:00 PM',
      title: 'First Dance',
      description: 'The newlyweds take their first dance',
      icon: '💃'
    },
    {
      time: '6:30 PM',
      title: 'Speeches & Toasts',
      description: 'Family and friends share their love and well wishes',
      icon: '🎤'
    },
    {
      time: '7:00 PM',
      title: 'Open Dancing',
      description: 'Dance floor opens for all guests',
      icon: '🕺'
    },
    {
      time: '9:00 PM',
      title: 'Cake Cutting',
      description: 'Traditional cake cutting ceremony',
      icon: '🎂'
    },
    {
      time: '10:00 PM',
      title: 'Last Dance & Send-Off',
      description: 'Final dance and sparkler send-off',
      icon: '✨'
    }
  ];
}