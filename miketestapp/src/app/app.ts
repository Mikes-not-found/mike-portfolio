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
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  color: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly name = signal('Michele Scarciglia');
  protected readonly role = signal('Full Stack Developer & Software Engineer');
  protected readonly environment = signal(this.getEnvironment());
  protected scrollY = signal(0);
  protected mobileMenuOpen = signal(false);
  protected readonly professionalSummary = signal('Bachelor’s Degree in Software Engineering. Previously worked independently for small businesses, primarily as an IT instructor and Front-end Developer. Currently working as a Full Stack Developer.');

  // Dynamic code symbols for background animation
  protected readonly codeSymbols = [
    '{ }', '[ ]', '< >', '( )', '/>', '</>',
    'const', 'let', 'function', '=>', 'async',
    'class', 'import', 'export', 'return',
    '===', '!==', '&&', '||', '++', '--',
    '@Component', '@Injectable', 'interface',
    'Angular', 'React', 'Node.js', 'TypeScript',
    'Git', 'Docker', 'CI/CD', 'API', 'REST',
    'null', 'undefined', 'void', 'any', 'string',
    '0101', '1010', '1100', '0011', 'true', 'false'
  ];

  protected readonly projects = signal<Project[]>([
    {
      title: 'Daisy App',
      description: 'Smart Task & Expense Manager - Daily task management application with Open Banking integration for automatic expense tracking and real-time financial insights. Features multi-device synchronization and customizable notifications.',
      technologies: ['TypeScript', 'React Native', 'Node.js', 'MongoDB', 'Express', 'Open Banking API'],
      github: 'https://github.com/Mikes-not-found/daisy_app',
      image: 'https://raw.githubusercontent.com/Mikes-not-found/daisy_app/main/frontend/assets/dashboard.jpg'
    },
    {
      title: 'Social App',
      description: 'WhatsApp Clone - Real-time messaging application with scalable architecture featuring separate API backend, client frontend, and WebSocket communication layer for instant message delivery.',
      technologies: ['JavaScript', 'WebSocket', 'CSS', 'HTML', 'Node.js'],
      github: 'https://github.com/ProjectN23/SocialApp',
      image: '💬'
    },
    {
      title: 'Boat User',
      description: 'Angular Boat Management Application - Modular frontend application with component-based architecture, integrated testing framework, and modern user interface for boat management operations.',
      technologies: ['Angular 15', 'TypeScript', 'SCSS', 'HTML', 'Karma'],
      github: 'https://github.com/ProjectN7/boat-user',
      image: '⛵'
    }
  ]);

  protected readonly skills = signal<Skill[]>([
    // Frontend
    { name: 'Angular', icon: 'devicon-angularjs-plain', category: 'frontend', color: '#DD0031' },
    { name: 'React', icon: 'devicon-react-original', category: 'frontend', color: '#61DAFB' },
    { name: 'React Native', icon: 'devicon-react-original', category: 'frontend', color: '#61DAFB' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain', category: 'frontend', color: '#F7DF1E' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain', category: 'frontend', color: '#3178C6' },

    // Backend
    { name: 'Java', icon: 'devicon-java-plain', category: 'backend', color: '#EA2D2E' },
    { name: 'Spring Boot', icon: 'devicon-spring-plain', category: 'backend', color: '#6DB33F' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain', category: 'backend', color: '#339933' },
    { name: 'Express.js', icon: 'devicon-express-original', category: 'backend', color: '#000000' },

    // Database
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', category: 'database', color: '#4169E1' },
    { name: 'MySQL', icon: 'devicon-mysql-plain', category: 'database', color: '#4479A1' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain', category: 'database', color: '#47A248' },

    // DevOps & Tools
    { name: 'Docker', icon: 'devicon-docker-plain', category: 'devops', color: '#2496ED' },
    { name: 'Kubernetes', icon: 'devicon-kubernetes-plain', category: 'devops', color: '#326CE5' },
    { name: 'Git', icon: 'devicon-git-plain', category: 'tools', color: '#F05032' },
    { name: 'GitHub Actions', icon: 'devicon-github-original', category: 'devops', color: '#2088FF' },
    { name: 'Keycloak', icon: 'devicon-oauth-plain', category: 'tools', color: '#4D4D4D' }
  ]);

  protected readonly profileImage = '/1758729543920.jpg';

  protected readonly experiences = signal<Experience[]>([
    {
      role: 'Consultant',
      company: 'Deloitte',
      period: 'September 2025 - Present',
      location: 'Bari, Italy',
      description: 'Working on enterprise-level software solutions, implementing modern architectures and best practices. Developing full-stack applications using Java, JavaScript, React, and Spring Framework. Collaborating with international teams to deliver high-quality software products.',
      skills: ['Java', 'JavaScript', 'React', 'React Native', 'Spring Framework', 'Spring Boot', 'SQL', 'Agile'],
      type: 'work'
    },
    {
      role: 'Custom Software Engineering Analyst',
      company: 'Accenture',
      period: 'June 2023 - September 2025',
      location: 'Bari, Puglia, Italy',
      description: 'Developed and maintained enterprise applications using modern tech stack. Implemented authentication and authorization systems using Keycloak. Built RESTful APIs with Java Spring Framework and Node.js. Worked with PostgreSQL databases and TypeScript for type-safe development.',
      skills: ['TypeScript', 'JavaScript', 'Java', 'Spring Framework', 'Node.js', 'Keycloak', 'PostgreSQL', 'REST API'],
      type: 'work'
    },
    {
      role: 'IT Instructor - Erasmus+ Program',
      company: 'Cultura e Dintorni',
      period: 'April 2021 - May 2021',
      location: 'Martina Franca, Puglia, Italy',
      description: 'Conducted international mobility course entirely in English, preparing students for web development and programming. Taught CMS platforms, web development fundamentals (PHP, HTML, CSS), network protocols, troubleshooting, malware analysis, spyware detection, and cybersecurity best practices.',
      skills: ['JavaScript', 'Node.js', 'Angular', 'PHP', 'HTML', 'CSS', 'Network Security', 'CMS', 'Teaching'],
      type: 'education'
    },
    {
      role: 'IT Instructor - Youth Guarantee Program',
      company: 'WOOVI Italia',
      period: 'Oct 2020 - Nov 2020',
      location: 'Martina Franca, Puglia, Italy',
      description: 'Led specialized training course preparing students for national IT certification (Youth Guarantee Program). Covered Microsoft Office suite, CMS website creation, web programming fundamentals (PHP, HTML, CSS), network troubleshooting, routing protocols, malware analysis, and information security.',
      skills: ['Network Architecture', 'Routing Protocols', 'HTML5', 'CSS3', 'JavaScript', 'PHP', 'IT Security', 'Training'],
      type: 'education'
    },
    {
      role: 'IT Instructor - Erasmus+ Program',
      company: 'Cultura e Dintorni',
      period: 'Sep 2020 - Oct 2020',
      location: 'Martina Franca, Puglia, Italy',
      description: 'Delivered international mobility training program in English, focusing on web development and programming skills. Topics included CMS platforms, fundamental web programming (PHP, HTML, CSS), network troubleshooting, routing protocols, malware studies, and cybersecurity practices.',
      skills: ['JavaScript', 'Node.js', 'Angular', 'Routing Protocols', 'CMS', 'Cybersecurity', 'English Teaching'],
      type: 'education'
    },
    {
      role: 'Web Master',
      company: 'Crea il tuo Business',
      period: 'Jan 2019 - Feb 2020',
      location: 'Crispiano, Italy',
      description: 'Managed end-to-end web solutions for clients. Created cost estimates and proposals, designed small to medium-scale social media marketing campaigns, developed and maintained client websites, designed user retention strategies to build customer loyalty, and produced promotional video content.',
      skills: ['JavaScript', 'Web Design', 'Digital Marketing', 'Social Media', 'Video Production', 'Client Management'],
      type: 'work'
    },
    {
      role: 'eCommerce Manager',
      company: 'Boutique Max1960',
      period: 'Jan 2017 - Feb 2018',
      location: 'Conversano, Puglia, Italy',
      description: 'Managed and administered the eCommerce platform. Key responsibilities included MySQL database management, Magento platform script development, product and magazine catalog management, newsletter creation and distribution, and customer loyalty program management through social media channels.',
      skills: ['MySQL', 'Magento', 'eCommerce', 'Database Management', 'Email Marketing', 'Social Media Management'],
      type: 'work'
    }
  ]);

  protected readonly education = signal<Education[]>([
    {
      degree: 'Bachelor of Science in Software Engineering and Computer Science',
      gpa: '3.7/4.0',
      institution: 'POLYTECHNIC UNIVERSITY - Bari',
      period: '2020 - 2024',
      location: 'Bary, Italy',
      thesis: 'Analysis of the Doppler Effect and Compensation Methods in Terrestrial/Non-Terrestrial Network Architectures (NTN)',
      description: 'I achieved top grades in key technical subjects, including Information Systems Security and Privacy (GPA 4.0), Computer Science for Engineering (GPA 4.0), and Software Engineering and Web Fundamentals (GPA 3.7).'
    },
    {
      degree: 'High School Diploma in Computer Science',
      institution: 'IISS "Majorana" - Martina Franca',
      period: '2011 - 2016',
      location: 'Martina Franca, Italy',
      description: 'Specialized in Computer Science and Information Technology'
    }
  ]);

  protected readonly certifications = signal<Certification[]>([
    {
      name: 'Oracle Cloud Infrastructure 2024 Generative AI Certified Professional',
      issuer: 'Oracle',
      date: '2024',
      credentialUrl: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=DEB88DD2B4B5DD265CC10B5D85CCCFEDE6831BF4FEC737808135F9C055AC72BB',
      logo: '🎓'
    }
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
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
