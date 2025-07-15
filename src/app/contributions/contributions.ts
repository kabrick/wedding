import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contributions',
  imports: [CommonModule],
  templateUrl: './contributions.html',
  styleUrl: './contributions.scss'
})
export class Contributions {
  selectedPaymentMethod: string | null = null;

  openPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }

  closeModal(): void {
    this.selectedPaymentMethod = null;
  }
}
