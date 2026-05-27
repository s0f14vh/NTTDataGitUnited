import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea accesible en toda la app
})
export class AuthService {
  // Creamos un Signal para saber en todo momento si el usuario está logueado o no
  // Inicialmente mira si ya hay un token guardado en el navegador
  isLoggedInSignal = signal<boolean>(!!localStorage.getItem('token'));

  constructor() {}

  // Este método simula la petición al Backend
  loginMock(email: string, password: string): boolean {
    if (email === 'admin@tickets.com' && password === '123456') {
      // 1. Guardamos el token en el navegador
      localStorage.setItem('token', 'un-token-falso-de-prueba-jwt');
      
      // 2. Actualizamos el Signal a 'true' (¡toda la app se entera de que estás dentro!)
      this.isLoggedInSignal.set(true);
      
      return true;
    }
    return false;
  }

  // Método para cerrar sesión (súper útil para el futuro)
  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSignal.set(false);
  }
}