import { Component, inject } from '@angular/core';
import { PwaPromptService } from '../services/pwa-prompt';

@Component({
  selector: 'app-pwa-prompt',
  imports: [],
  templateUrl: './pwa-prompt.html',
  styleUrl: './pwa-prompt.scss'
})
export class PwaPrompt {
  protected readonly pwaService = inject(PwaPromptService);

  install(): void {
    this.pwaService.installPwa();
  }

  dismiss(): void {
    this.pwaService.dismissPrompt();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.dismiss();
    }
  }
}
