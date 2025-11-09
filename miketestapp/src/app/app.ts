import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('miketestapp');
  protected readonly environment = signal(this.getEnvironment());

  private getEnvironment(): 'production' | 'development' {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '';
    return baseHref.includes('/dev/') ? 'development' : 'production';
  }
}
