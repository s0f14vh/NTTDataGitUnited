import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.LoginComponent)
  },
  {
    path: 'compra',
    loadComponent: () => import('./compra/compra.component').then(m => m.CompraComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
