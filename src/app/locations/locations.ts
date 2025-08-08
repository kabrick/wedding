import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-locations',
  imports: [CommonModule],
  templateUrl: './locations.html',
  styleUrl: './locations.scss'
})

export class Locations {
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

  private getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}