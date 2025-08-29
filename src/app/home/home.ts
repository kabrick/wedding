import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {weddingDate} from "../constants/constants";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home implements OnInit, OnDestroy {
  weddingDate = weddingDate();
  private intervalId?: number;
  hasBackgroundImage = false;
  
  timeRemaining: TimeRemaining = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  ngOnInit(): void {
    this.updateCountdown();
    this.checkBackgroundImage();
    // Update every second
    this.intervalId = window.setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  private checkBackgroundImage(): void {
    const img = new Image();
    img.onload = () => {
      this.hasBackgroundImage = true;
    };
    img.onerror = () => {
      this.hasBackgroundImage = false;
    };
    img.src = '/images/couple-hero.webp';
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCountdown(): void {
    const now = new Date().getTime();
    const weddingTime = this.weddingDate.getTime();
    const timeDiff = weddingTime - now;

    if (timeDiff > 0) {
      this.timeRemaining = {
        days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDiff % (1000 * 60)) / 1000)
      };
    } else {
      // Wedding day has arrived!
      this.timeRemaining = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
  }
}
