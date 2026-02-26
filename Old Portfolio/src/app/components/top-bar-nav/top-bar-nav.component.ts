import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-top-bar-nav',
  imports: [
      DrawerModule,
      ButtonModule,
      RouterModule,
      CommonModule,
      AvatarModule,
      AvatarGroupModule,
      ChipModule,
      TagModule,
      PanelModule,
    ],
  templateUrl: './top-bar-nav.component.html',
  styleUrl: './top-bar-nav.component.css'
})
export class TopBarNavComponent {
  ModeIcon!: string;
  isDarkMode!: boolean;
  visible: boolean = false;
  constructor(private router: Router) { }
  toggleDarkMode() {
    const element = document.querySelector('html')!;
    console.log(element);
    element.classList.toggle('my-app-dark');
  }
  ngOnInit(): void {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.ModeIcon = 'pi-cog';
  }

  public routeNavigator(path: string | undefined) {
    this.router.navigate([`/${path}`]);
  }

  isDarkTheme: boolean = false; // Tracks the current theme
  buttonIcon: string = "pi pi-cog" // Initial icon for light theme

  

  
}
