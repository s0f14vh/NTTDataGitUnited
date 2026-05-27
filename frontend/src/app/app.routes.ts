import { Routes } from '@angular/router';
import { authGuard } from './auth.guard'; 
import { LoginComponent } from './login/login'; 
import { HomeComponent } from './home/home.component'; // 👈 1. IMPORTACIÓN ESTÁTICA

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'home',
    component: HomeComponent, // 👈 2. CAMBIADO: Usamos 'component' en lugar de 'loadComponent'
    canActivate: [authGuard] 
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];