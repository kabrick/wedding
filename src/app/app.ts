import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './navigation/navigation';
import { PwaPrompt } from './pwa-prompt/pwa-prompt';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, PwaPrompt],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('wedding-pwa');
}
