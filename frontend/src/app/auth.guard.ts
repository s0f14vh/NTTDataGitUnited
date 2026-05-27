import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Asegúrate de que la ruta sea correcta

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService); // Inyectamos el servicio moderno

  // Comprobamos el Signal del servicio para ver si está logueado
  if (authService.isLoggedInSignal()) {
    return true; // Tiene permiso, adelante
  } else {
    // ¡No está logueado! Lo mandamos al login
    console.warn('Acceso denegado. Redirigiendo al login...');
    router.navigate(['/login']);
    return false; // Bloqueamos el acceso
  }
};