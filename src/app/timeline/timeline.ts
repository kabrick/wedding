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
  timelineEvents = [
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