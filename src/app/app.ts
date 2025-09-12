import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './navigation/navigation';
import { PwaPrompt } from './pwa-prompt/pwa-prompt';
import { Maintenance } from './maintenance/maintenance';
import { maintenanceMode } from './constants/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, PwaPrompt, Maintenance],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('wedding-pwa');
  protected readonly isMaintenanceMode = maintenanceMode;
}
