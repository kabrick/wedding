import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { weddingDate } from '../constants/constants';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.scss'
})
export class Maintenance implements OnInit, OnDestroy {
  protected readonly timeLeft = signal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  private intervalId?: number;

  ngOnInit() {
    this.updateCountdown();
    this.intervalId = window.setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const wedding = weddingDate().getTime();
    const difference = wedding - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      this.timeLeft.set({ days, hours, minutes, seconds });
    } else {
      this.timeLeft.set({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }
}