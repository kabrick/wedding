import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface RSVPFormData {
  guestName: string;
  email: string;
  phone: string;
  attending: string;
  guestCount: string;
  additionalGuests: string;
  message: string;
}

@Component({
  selector: 'app-rsvp',
  imports: [FormsModule, CommonModule],
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.scss'
})
export class Rsvp {
  isSubmitting = false;
  showSuccessMessage = false;
  isNetlifySubmission = false;

  formData: RSVPFormData = {
    guestName: '',
    email: '',
    phone: '',
    attending: '',
    guestCount: '',
    additionalGuests: '',
    message: ''
  };

  parseInt = parseInt; // Make parseInt available in template

  onSubmit(): void {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Check if we're on Netlify (production)
    if (this.isNetlifyEnvironment()) {
      // Let Netlify handle the form submission
      this.isNetlifySubmission = true;
      // Form will submit naturally via HTML form submission
      return;
    }
    
    // Development/local submission
    this.submitLocally();
  }

  private isNetlifyEnvironment(): boolean {
    // Check if we're in production on Netlify
      alert(window.location.hostname)
      alert(typeof window)
    return typeof window !== 'undefined' &&
           (window.location.hostname.includes('netlify.app') || 
            window.location.hostname !== 'localhost');
  }

  private submitLocally(): void {
    // Simulate form submission for local development
    setTimeout(() => {
      console.log('RSVP Form Data:', this.formData);
      this.isSubmitting = false;
      this.showSuccessMessage = true;
      
      // Hide success message after 5 seconds and reset form
      setTimeout(() => {
        this.showSuccessMessage = false;
        this.resetForm();
      }, 5000);
    }, 2000);
  }

  private resetForm(): void {
    this.formData = {
      guestName: '',
      email: '',
      phone: '',
      attending: '',
      guestCount: '',
      additionalGuests: '',
      message: ''
    };
  }
}
