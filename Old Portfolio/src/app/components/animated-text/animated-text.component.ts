import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-animated-text',
  templateUrl: './animated-text.component.html',
  styleUrl: './animated-text.component.css',
  standalone: true,
})
export class AnimatedTextComponent {
  ngOnInit() {
    this.setupAnimation();
  }

  setupAnimation() {
    const words = [
      'architects scalable system 🧱',
      'crafts intuitive interfaces 🎨',
      'engineers seamless APIs ⚡️',
      'drives impactful solution 🌍',
    ];

    gsap.to('#cursor', {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: 'power2.inOut',
    });

    let tlMaster = gsap.timeline({ repeat: -1 });

    words.forEach((word) => {
      let tlText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
      tlText.to('#animated-text', { duration: 1, text: word });
      tlMaster.add(tlText);
    });
  }
}
