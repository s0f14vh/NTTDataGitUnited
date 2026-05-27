import { Component, signal } from '@angular/core'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (email === 'admin@tickets.com' && password === '123456') {
        this.errorSignal.set(''); 
        console.log('Login correcto, creando token de sesión...');
        
        // 1. GUARDAMOS UN TOKEN FALSO PARA QUE EL GUARD NOS DEJE ENTRAR
        localStorage.setItem('token', 'un-token-falso-de-prueba-jwt');
        
        // 2. REDIRIGIMOS AL HOME DE TU COMPAÑERO
        this.router.navigate(['/home']); 
      } else {
        this.errorSignal.set('Usuario o contraseña incorrectos');
      }
    } else {
      this.errorSignal.set('Credenciales inválidas o incompletas');
    }
  }
}