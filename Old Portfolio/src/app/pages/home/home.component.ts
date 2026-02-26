import { Component, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { AnimatedTextComponent } from '../../components/animated-text/animated-text.component';
import { SocialAppsComponent } from '../../components/social-apps/social-apps.component';
import { Route, Router, RouterModule } from '@angular/router';
import { TopBarNavComponent } from '../../components/top-bar-nav/top-bar-nav.component';
@Component({
  selector: 'app-home',
  imports: [
    DrawerModule,
    ButtonModule,
    RouterModule,
    TopBarNavComponent,
    CommonModule,
    ChipModule,
    TagModule,
    AnimatedTextComponent,
    SocialAppsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ModeIcon!: string;
  isDarkMode!: boolean;
  visible: boolean = false;
  constructor(public router: Router) {}
  toggleDarkMode() {
    const element = document.querySelector('html')!;
    console.log(element);
    element.classList.toggle('my-app-dark');
  }
  ngOnInit(): void {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.ModeIcon = this.isDarkMode ? 'pi pi-moon' : 'pi pi-sun';
  }

  public routeNavigator(path: string | undefined) {
    this.router.navigate([`/${path}`]);
  }
}
