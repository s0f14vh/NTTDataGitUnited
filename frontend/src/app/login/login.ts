import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup;
  errorSignal = signal<string>('');

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const datosLogin = this.loginForm.value;

      this.http.post('http://localhost:8080/api/usuarios/login', datosLogin).subscribe({
        next: (respuestaBackend: any) => {
          this.errorSignal.set('');
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          this.errorSignal.set(error.error?.mensaje || 'Usuario o contraseña incorrectos');
        }
      });
    } else {
      this.errorSignal.set('Debes rellenar todos los campos (mínimo 6 caracteres)');
    }
  }
}
