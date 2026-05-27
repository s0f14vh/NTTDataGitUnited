import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // 1. IMPORTA EL ROUTER

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',  
  styleUrls: ['./login.css']    
})
export class LoginComponent {
  loginForm: FormGroup;
  errorSignal = signal<string>(''); 

  // 2. INYECTA EL ROUTER EN EL CONSTRUCTOR
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Simulación de acceso correcto para probar la tienda de entradas
      if (email === 'admin@tickets.com' && password === '123456') {
        this.errorSignal.set(''); // Limpiamos errores si los hubiera
        console.log('Login correcto, redirigiendo...');
        
        // 3. SE EJECUTA LA NAVEGACIÓN A LA COMPRA DE ENTRADAS
        this.router.navigate(['/tickets']); 
      } else {
        this.errorSignal.set('Usuario o contraseña incorrectos');
      }
    } else {
      this.errorSignal.set('Credenciales inválidas o incompletas');
    }
  }
}