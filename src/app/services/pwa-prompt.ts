import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PwaPromptService {
  private deferredPrompt: any = null;
  private isPromptShown = signal(false);
  private canInstall = signal(false);

  readonly showPrompt = this.isPromptShown.asReadonly();
  readonly installable = this.canInstall.asReadonly();

  constructor() {
    this.setupBeforeInstallPrompt();
    this.checkIfAlreadyInstalled();
  }

  private setupBeforeInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.canInstall.set(true);

      // Show prompt after a delay if not already shown
      setTimeout(() => {
        if (!this.hasPromptBeenDismissed()) {
          this.isPromptShown.set(true);
        }
      }, 3000); // Show after 3 seconds
    });

    window.addEventListener('appinstalled', () => {
      this.canInstall.set(false);
      this.isPromptShown.set(false);
      this.deferredPrompt = null;
      localStorage.setItem('pwa-installed', 'true');
    });
  }

  private checkIfAlreadyInstalled(): void {
    // Check if app is already installed
    if (this.isRunningStandalone() || localStorage.getItem('pwa-installed') === 'true') {
      this.canInstall.set(false);
      this.isPromptShown.set(false);
      return;
    }
  }

  private isRunningStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://');
  }

  private hasPromptBeenDismissed(): boolean {
    const dismissedTime = localStorage.getItem('pwa-prompt-dismissed');
    if (!dismissedTime) return false;

    const dismissedDate = new Date(dismissedTime);
    const now = new Date();
    const daysSinceDismissed = Math.floor((now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24));

    // Show again after 7 days
    return daysSinceDismissed < 7;
  }

  async installPwa(): Promise<void> {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      localStorage.setItem('pwa-installed', 'true');
    } else {
      this.dismissPrompt();
    }

    this.deferredPrompt = null;
    this.isPromptShown.set(false);
  }

  dismissPrompt(): void {
    this.isPromptShown.set(false);
    localStorage.setItem('pwa-prompt-dismissed', new Date().toISOString());
  }

  showPromptManually(): void {
    if (this.canInstall() && !this.isRunningStandalone()) {
      this.isPromptShown.set(true);
    }
  }
}