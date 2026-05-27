import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Comprobamos si existe el token en el almacenamiento del navegador
  // (Cuando hagáis el login real, guardaréis el token aquí)
  const token = localStorage.getItem('token');

  if (token) {
    // ¡Tiene token! Le dejamos pasar a la ruta
    return true;
  } else {
    // No está logueado: lo redirigimos al login con un aviso
    console.warn('Acceso denegado. Redirigiendo al login...');
    router.navigate(['/login']);
    return false;
  }
};