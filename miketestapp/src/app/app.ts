import { Component, signal, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly name = signal('Michele Scarciglia');
  protected readonly role = signal('Full Stack Developer');
  protected readonly environment = signal(this.getEnvironment());
  protected scrollY = signal(0);

  protected readonly projects = signal<Project[]>([
    {
      title: 'Daisy App',
      description: 'Smart Task & Expense Manager - Gestione task quotidiani con integrazione Open Banking per tracciamento automatico delle spese e insights finanziari in tempo reale.',
      technologies: ['TypeScript', 'React Native', 'Node.js', 'MongoDB', 'Express', 'Open Banking API'],
      github: 'https://github.com/Mikes-not-found/daisy_app',
      image: 'https://raw.githubusercontent.com/Mikes-not-found/daisy_app/main/frontend/assets/dashboard.jpg'
    },
    {
      title: 'Social App',
      description: 'Clone di WhatsApp - Applicazione di messaggistica con comunicazione real-time, architettura scalabile con API backend, client frontend e layer WebSocket.',
      technologies: ['JavaScript', 'WebSocket', 'CSS', 'HTML', 'Node.js'],
      github: 'https://github.com/ProjectN23/SocialApp',
      image: '💬'
    },
    {
      title: 'Boat User',
      description: 'Applicazione Angular per la gestione barche - Frontend modulare con architettura component-based, testing integrato e interfaccia utente moderna.',
      technologies: ['Angular 15', 'TypeScript', 'SCSS', 'HTML', 'Karma'],
      github: 'https://github.com/ProjectN7/boat-user',
      image: '⛵'
    }
  ]);

  protected readonly skills = signal([
    'Angular', 'React', 'TypeScript', 'JavaScript',
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
    'Git', 'GitHub Actions', 'Docker', 'CI/CD'
  ]);

  ngOnInit(): void {
    this.setupParallax();
    this.setupScrollAnimations();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollY.set(window.scrollY);
    this.updateParallaxElements();
  }

  private setupParallax(): void {
    // Initial setup
    this.updateParallaxElements();
  }

  private updateParallaxElements(): void {
    const scrolled = this.scrollY();

    // Update parallax backgrounds
    const hero = document.querySelector('.hero-bg') as HTMLElement;
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Reveal animations on scroll
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.75;
      if (isVisible) {
        el.classList.add('active');
      }
    });
  }

  private setupScrollAnimations(): void {
    // Intersection Observer for smooth reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);
  }

  private getEnvironment(): 'production' | 'development' {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '';
    return baseHref.includes('/dev/') ? 'development' : 'production';
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}
