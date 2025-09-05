import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contributions',
  imports: [CommonModule, FormsModule],
  templateUrl: './contributions.html',
  styleUrl: './contributions.scss'
})

export class Contributions {
  selectedPaymentMethod: string | null = null;
  showPledgeModal = false;
  showMessageModal = false;
  isNetlifySubmission = false;
  isSubmitting = false;

  // Pledge form data
  pledgeForm = {
    name: '',
    phone: '',
    amount: '',
    message: ''
  };

  // Message form data
  messageForm = {
    name: '',
    phone: '',
    message: ''
  };

  // Submitted pledges and messages (in real app, this would come from a service)
  submittedPledges: any[] = [];
  submittedMessages: any[] = [];

  openPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }

  closeModal(): void {
    this.selectedPaymentMethod = null;
  }

  openPledgeModal(): void {
    this.showPledgeModal = true;
  }

  closePledgeModal(): void {
    this.showPledgeModal = false;
    this.resetPledgeForm();
  }

  openMessageModal(): void {
    this.showMessageModal = true;
  }

  closeMessageModal(): void {
    this.showMessageModal = false;
    this.resetMessageForm();
  }

  submitPledge(): void {
    if (this.pledgeForm.name && this.pledgeForm.phone && this.pledgeForm.amount) {
      this.isSubmitting = true;
      
      // Check if we should use Netlify submission
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        this.isNetlifySubmission = true;
        // Let the form submit naturally to Netlify
        return;
      }
      
      // Development/local submission
      const pledge = {
        ...this.pledgeForm,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      };
      this.submittedPledges.push(pledge);
      this.closePledgeModal();
      this.isSubmitting = false;
      alert('Thank you for your pledge! We\'ll be in touch with more details.');
    }
  }

  submitMessage(): void {
    if (this.messageForm.name && this.messageForm.message) {
      this.isSubmitting = true;
      
      // Check if we should use Netlify submission
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        this.isNetlifySubmission = true;
        // Let the form submit naturally to Netlify
        return;
      }
      
      // Development/local submission
      const message = {
        ...this.messageForm,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      };
      this.submittedMessages.push(message);
      this.closeMessageModal();
      this.isSubmitting = false;
      alert('Thank you for your beautiful message!');
    }
  }

  private resetPledgeForm(): void {
    this.pledgeForm = {
      name: '',
      phone: '',
      amount: '',
      message: ''
    };
  }

  private resetMessageForm(): void {
    this.messageForm = {
      name: '',
      phone: '',
      message: ''
    };
  }
}
