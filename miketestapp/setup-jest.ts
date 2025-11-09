import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

// Initialize modern zoneless test environment (for Angular 20+)
setupZonelessTestEnv();

// Opzionale: impostazioni globali
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});
