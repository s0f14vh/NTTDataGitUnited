import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core'; // 👈 Cambiado aquí
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // 👈 Y cambiado aquí
    provideRouter(routes)
  ]
};