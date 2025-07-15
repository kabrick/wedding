import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Gallery } from './gallery/gallery';
import { Rsvp } from './rsvp/rsvp';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'gallery', component: Gallery },
  { path: 'rsvp', component: Rsvp },
  { path: '**', redirectTo: '' }
];
