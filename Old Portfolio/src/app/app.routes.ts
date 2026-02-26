import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { WorkComponent } from './pages/work/work.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home | My Portfolio',
  },
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'home',
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    title: 'About Me | My Portfolio',
  },
  {
    path: 'work',
    component: WorkComponent,
    title: 'Work | My Portfolio',
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    title: 'Contact Us | My Portfolio',
  },
];
