import { Routes } from '@angular/router';
import { authGuard } from './auth.guard'; // 1. Importa tu nuevo Guard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard] // 2. ¡AÑADE ESTA LÍNEA AQUÍ! Ahora 'home' está blindado.
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];