import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DrawerModule } from 'primeng/drawer';
import { TagModule } from 'primeng/tag';
import { AnimatedTextComponent } from '../../components/animated-text/animated-text.component';
import { SocialAppsComponent } from '../../components/social-apps/social-apps.component';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { TopBarNavComponent } from '../../components/top-bar-nav/top-bar-nav.component';

@Component({
  selector: 'app-work',
  imports: [
    DrawerModule,
    AnimateOnScrollModule,
    ButtonModule,
        TopBarNavComponent,
    RouterModule,
    CommonModule,
    ChipModule,
    TagModule,
  ],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css',
})
export class WorkComponent {
  ModeIcon!: string;
  isDarkMode!: boolean;
  visible: boolean = false;
  constructor(private router: Router) {}
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
