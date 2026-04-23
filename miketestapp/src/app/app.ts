import { Component, signal, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
  type: 'work' | 'education';
}

interface Education {
  degree: string;
  institution: string;
  thesis?: string;
  gpa?: string;
  period: string;
  location?: string;
  description?: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  logo?: string;
}

interface Skill {
  name: string;
  icon: string;
  iconType?: 'devicon' | 'emoji';
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'aitools';
  color: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  protected readonly name = signal('Michele Scarciglia');
  protected readonly role = signal('Full Stack Developer & Software Engineer');
  protected readonly environment = signal(this.getEnvironment());
  protected scrollY = signal(0);
  protected mobileMenuOpen = signal(false);
  protected activeSection = signal('home');
  protected displayedRole = signal('');
  protected showCvPreview = signal(false);

  protected readonly professionalSummary = signal(
    'Bachelor\u2019s Degree in Software Engineering. Previously worked independently for small businesses, primarily as an IT instructor and Front-end Developer. Currently working as a Full Stack Developer.'
  );

  private typewriterTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly roleTexts = [
    'Full Stack Developer',
    'Software Engineer',
    'Cloud Engineer',
  ];

  protected readonly codeSymbols = [
    '{ }', '[ ]', '< >', '( )', '/>', '</>',
    'const', 'let', 'function', '=>', 'async',
    'class', 'import', 'export', 'return',
    '===', '!==', '&&', '||', '++', '--',
    '@Component', '@Injectable', 'interface',
    'Angular', 'React', 'Node.js', 'TypeScript',
    'Git', 'Docker', 'CI/CD', 'API', 'REST',
    'null', 'undefined', 'void', 'any', 'string',
    '0101', '1010', '1100', '0011', 'true', 'false',
  ];

  protected readonly projects = signal<Project[]>([
    {
      title: 'Daisy App',
      description:
        'Smart Task & Expense Manager - Daily task management application with Open Banking integration for automatic expense tracking and real-time financial insights. Features multi-device synchronization and customizable notifications.',
      technologies: ['TypeScript', 'React Native', 'Node.js', 'MongoDB', 'Express', 'Open Banking API'],
      github: 'https://github.com/Mikes-not-found/daisy_app',
      image: 'https://raw.githubusercontent.com/Mikes-not-found/daisy_app/main/frontend/assets/dashboard.jpg',
    },
    {
      title: 'Social App',
      description:
        'WhatsApp Clone - Real-time messaging application with scalable architecture featuring separate API backend, client frontend, and WebSocket communication layer for instant message delivery.',
      technologies: ['JavaScript', 'WebSocket', 'CSS', 'HTML', 'Node.js'],
      github: 'https://github.com/ProjectN23/SocialApp',
      image: '💬',
    },
    {
      title: 'Boat User',
      description:
        'Angular Boat Management Application - Modular frontend application with component-based architecture, integrated testing framework, and modern user interface for boat management operations.',
      technologies: ['Angular 15', 'TypeScript', 'SCSS', 'HTML', 'Karma'],
      github: 'https://github.com/ProjectN7/boat-user',
      image: '⛵',
    },
  ]);

  protected readonly skills = signal<Skill[]>([
    // Frontend
    { name: 'Vue.js', icon: 'devicon-vuejs-plain', category: 'frontend', color: '#42B883' },
    { name: 'React', icon: 'devicon-react-original', category: 'frontend', color: '#61DAFB' },
    { name: 'React Native', icon: 'devicon-react-original', category: 'frontend', color: '#61DAFB' },
    { name: 'Angular', icon: 'devicon-angular-plain', category: 'frontend', color: '#DD0031' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain', category: 'frontend', color: '#3178C6' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain', category: 'frontend', color: '#F7DF1E' },
    { name: 'Tailwind', icon: 'devicon-tailwindcss-plain', category: 'frontend', color: '#06B6D4' },
    { name: 'Bootstrap', icon: 'devicon-bootstrap-plain', category: 'frontend', color: '#7952B3' },
    // Backend
    { name: 'Java', icon: 'devicon-java-plain', category: 'backend', color: '#EA2D2E' },
    { name: 'Spring Boot', icon: 'devicon-spring-plain', category: 'backend', color: '#6DB33F' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain', category: 'backend', color: '#339933' },
    { name: 'Express.js', icon: 'devicon-express-original', category: 'backend', color: '#888888' },
    // Database
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', category: 'database', color: '#4169E1' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain', category: 'database', color: '#47A248' },
    // DevOps & Tools
    { name: 'Docker', icon: 'devicon-docker-plain', category: 'devops', color: '#2496ED' },
    { name: 'Kubernetes', icon: 'devicon-kubernetes-plain', category: 'devops', color: '#326CE5' },
    { name: 'NGINX', icon: 'devicon-nginx-plain', category: 'devops', color: '#009639' },
    { name: 'Git', icon: 'devicon-git-plain', category: 'tools', color: '#F05032' },
    { name: 'Postman', icon: 'devicon-postman-plain', category: 'tools', color: '#FF6C37' },
    { name: 'Keycloak', icon: '🔑', iconType: 'emoji', category: 'tools', color: '#4D9DE0' },
    // AI Tools
    { name: 'Claude Code', icon: '🤖', iconType: 'emoji', category: 'aitools', color: '#CC785C' },
    { name: 'Cursor', icon: 'devicon-vscode-plain', category: 'aitools', color: '#0078D4' },
    { name: 'Cline', icon: 'devicon-vscode-plain', category: 'aitools', color: '#6366f1' },
    { name: 'Ollama', icon: 'devicon-ollama-plain', category: 'aitools', color: '#0F0F0F' },
  ]);

  protected readonly profileImage = '/1758729543920.jpg';

  protected readonly experiences = signal<Experience[]>([
    {
      role: 'Consultant',
      company: 'Deloitte NextHub',
      period: 'September 2025 – Present',
      location: 'Bari, Italy',
      description:
        'Frontend development of a management system for an insurance company using Angular, supported by AI-assisted coding. Writing requirement documents, performing functional analysis, and preparing technical documentation for public tenders. Management and monitoring of subcontractors, plus analysis and estimation of effort, timelines, and complexity.',
      skills: ['Angular', 'TypeScript', 'Bootstrap', 'Mockoon', 'Git', 'Cline', 'Claude Code', 'Vertex AI', 'PowerPoint', 'Excel'],
      type: 'work',
    },
    {
      role: 'Custom Software Engineering Analyst',
      company: 'Accenture Technology Solutions',
      period: 'June 2023 – August 2025',
      location: 'Bari, Italy',
      description:
        'Development of a management system for a public organization, including frontend with Vue.js (TypeScript, Bootstrap) and backend RESTful APIs using Java and Spring Boot. Design, implementation, and maintenance of PostgreSQL and MongoDB databases. Integration of Keycloak with JWT for authentication/authorization, and configuration of NGINX and Apache as reverse proxies for microservices and load balancing.',
      skills: ['Vue.js', 'TypeScript', 'Bootstrap', 'Java', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Keycloak', 'NGINX', 'Docker', 'Postman', 'Mockoon', 'Git'],
      type: 'work',
    },
    {
      role: 'IT Instructor (Garanzia Giovani Program)',
      company: 'Woom Italia',
      period: 'October 2020 – November 2020',
      location: 'Remote',
      description:
        'Management and delivery of an IT certification training course, providing fundamental and advanced technical skills required for national certification. Teaching web development and programming with a focus on CMS (WordPress), JavaScript, HTML, and CSS. Practical training on networking, cybersecurity, and IT troubleshooting, including malware analysis, firewall configuration, and system diagnostics.',
      skills: ['WordPress', 'JavaScript', 'HTML', 'CSS', 'TCP/IP', 'IPv4/IPv6', 'Firewall', 'Microsoft Office'],
      type: 'work',
    },
  ]);

  protected readonly education = signal<Education[]>([
    {
      degree: 'Bachelor\'s Degree in Computer Engineering and Automation (L-8)',
      institution: 'Polytechnic University of Bari',
      period: '2020 – 2024',
      location: 'Bari, Italy',
      thesis:
        'Analysis of the Doppler Effect and Compensation Methods in Terrestrial and Non-Terrestrial Network Architectures (NTN)',
      description:
        'Focused on software engineering, computer architecture, networking, and information systems security. Strong academic performance in technical subjects.',
    },
  ]);

  protected readonly certifications = signal<Certification[]>([
    {
      name: 'Oracle Cloud Infrastructure 2024 Generative AI Certified Professional',
      issuer: 'Oracle',
      date: '2024',
      credentialUrl:
        'https://catalog-education.oracle.com/pls/certview/sharebadge?id=DEB88DD2B4B5DD265CC10B5D85CCCFEDE6831BF4FEC737808135F9C055AC72BB',
      logo: '🎓',
    },
  ]);

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.startTypewriter();
  }

  ngAfterViewInit(): void {
    this.setupGSAPAnimations();
  }

  ngOnDestroy(): void {
    if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
    ScrollTrigger.killAll();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.showCvPreview()) this.closeCvPreview();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollY.set(window.scrollY);
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const sections = ['contact', 'projects', 'experience', 'about', 'home'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 150) {
        this.activeSection.set(id);
        break;
      }
    }
  }

  private startTypewriter(): void {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentText = this.roleTexts[textIndex];

      if (isDeleting) {
        this.displayedRole.set(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        this.displayedRole.set(currentText.substring(0, charIndex + 1));
        charIndex++;
      }

      let delay = isDeleting ? 55 : 95;

      if (!isDeleting && charIndex === currentText.length) {
        delay = 2600;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % this.roleTexts.length;
        delay = 400;
      }

      this.typewriterTimeout = setTimeout(type, delay);
    };

    setTimeout(type, 1100);
  }

  private setupGSAPAnimations(): void {
    // Scroll progress bar
    gsap.to('.scroll-bar-fill', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    // Hero entrance sequence
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
      .from('.available-badge', { opacity: 0, y: -24, duration: 0.55, ease: 'power2.out' })
      .from('.profile-image', { scale: 0.65, opacity: 0, duration: 0.85, ease: 'back.out(1.7)' }, '-=0.25')
      .from('.hero-name', { opacity: 0, y: 44, duration: 0.75, ease: 'power3.out' }, '-=0.45')
      .from('.hero-role-wrap', { opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.hero-bio', { opacity: 0, y: 22, duration: 0.6, ease: 'power2.out' }, '-=0.2')
      .from('.cta-buttons', { opacity: 0, y: 22, duration: 0.55, ease: 'power2.out' }, '-=0.3')
      .from('.scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.1');

    // Section headers
    gsap.utils.toArray<HTMLElement>('.section-header').forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 45,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    // Skill cards staggered reveal
    ScrollTrigger.create({
      trigger: '.skills-grid',
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.from('.skill-card', {
          opacity: 0,
          y: 35,
          scale: 0.82,
          duration: 0.5,
          stagger: { each: 0.045, from: 'start' },
          ease: 'back.out(1.5)',
        });
      },
    });

    // Timeline items slide from alternating sides
    gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item, i) => {
      const xFrom = i % 2 === 0 ? -65 : 65;
      gsap.from(item, {
        opacity: 0,
        x: xFrom,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      });
    });

    // Cert and education cards
    gsap.utils.toArray<HTMLElement>('.cert-card, .education-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      });
    });

    // Project cards
    gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 65,
        duration: 0.7,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#projects', start: 'top 72%', once: true },
      });
    });

    // Contact
    gsap.from('.contact-inner', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#contact', start: 'top 75%', once: true },
    });

    // 3D tilt on skill cards
    this.setupCardTilt();
  }

  private setupCardTilt(): void {
    document.querySelectorAll<HTMLElement>('.skill-card').forEach((el) => {
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = ((e.clientY - cy) / (rect.height / 2)) * -12;
        const ry = ((e.clientX - cx) / (rect.width / 2)) * 12;
        gsap.to(el, { rotateX: rx, rotateY: ry, transformPerspective: 500, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.65, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  private getEnvironment(): 'production' | 'development' {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '';
    return baseHref.includes('/dev/') ? 'development' : 'production';
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  openCvPreview(): void {
    this.showCvPreview.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeCvPreview(): void {
    this.showCvPreview.set(false);
    document.body.style.overflow = '';
  }

  readonly cvPath = '/CV_SCARCIGLIA_MICHELE_EN.pdf';
}
