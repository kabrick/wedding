import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Gallery } from './gallery/gallery';
import { Rsvp } from './rsvp/rsvp';
import { Contributions } from './contributions/contributions';
import { Timeline } from './timeline/timeline';
import { Locations } from './locations/locations';
import { Announcements } from './announcements/announcements';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'timeline', component: Timeline },
  { path: 'locations', component: Locations },
  { path: 'announcements', component: Announcements },
  { path: 'gallery', component: Gallery },
  { path: 'contributions', component: Contributions },
  { path: 'rsvp', component: Rsvp },
  { path: '**', redirectTo: '' }
];
