import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Gallery } from './gallery/gallery';
import { Rsvp } from './rsvp/rsvp';
import { Contributions } from './contributions/contributions';
import { Timeline } from './timeline/timeline';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'timeline', component: Timeline },
  { path: 'gallery', component: Gallery },
  { path: 'contributions', component: Contributions },
  { path: 'rsvp', component: Rsvp },
  { path: '**', redirectTo: '' }
];
