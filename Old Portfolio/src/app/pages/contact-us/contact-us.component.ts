import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { QueryEmailService } from '../../s../../services/query-email.service'
import { SocialLinksRoundComponent } from '../../components/social-links-round/social-links-round.component';
import { TopBarNavComponent } from '../../components/top-bar-nav/top-bar-nav.component';

@Component({
  selector: 'app-contact-us',
  imports: [
    DrawerModule,
    ButtonModule,
    RouterModule,
        TopBarNavComponent,
    CommonModule,
    SocialLinksRoundComponent,
    AvatarModule,
    AvatarGroupModule,
    ChipModule,
    TagModule,
    PanelModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
  providers: [QueryEmailService],
})
export class ContactUsComponent {
  ModeIcon!: string;
  isDarkMode!: boolean;
  visible: boolean = false;
  message: string = '';
  emailForm!: FormGroup;
  status: string = '';
  error: boolean = false;

  constructor(
    private router: Router,
    private emailService: QueryEmailService,
  ) {}
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

  async sendEmail() {
    if (true) {
      try {
        this.status = 'Sending email...';
        // await this.emailService.sendEmail('agsgxharmony@gmail.com', 'Test Subject', 'Hello, this is a test email!');
        this.status = 'Email sent successfully!';
        this.emailForm.reset();
        console.log(this.status);
      } catch (error) {
        this.status = 'Failed to send email. Please try again.';
        console.log(this.status, error);
      }
    } else {
      this.status = 'Please fill out the form correctly.';
      console.log(this.status);
    }
  }
}
