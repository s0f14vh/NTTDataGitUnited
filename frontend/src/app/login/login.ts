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
  /*
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
*/

    // modificaciones  ---- ver si funciona 
  // Tienen que importar HttpClient y hacer la llamada así:
  
  onLogin() {
    if (this.loginForm.valid) {
      const datosLogin = this.loginForm.value;

      // ESTO ES LO QUE TIENEN QUE AÑADIR ELLOS: Llamada a tu Spring Boot
      this.http.post('http://localhost:8080/api/usuarios/login', datosLogin).subscribe({
        next: (respuestaBackend) => {
          this.errorSignal.set(''); 
          this.router.navigate(['/tickets']); 
        },
        error: (error) => {
          // Mostrará los mensajes que tú configuraste ("Contraseña incorrecta", etc)
          this.errorSignal.set(error.error.mensaje || 'Error al iniciar sesión');
        }
      });
    } else {
      this.errorSignal.set('Debes rellenar todos los campos (mínimo 6 caracteres)');
    }
  }
}