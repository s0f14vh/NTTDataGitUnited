import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',  // <--- Debes poner el nombre exacto que tienes
  styleUrls: ['./login.css']    // <--- Debes poner el nombre exacto que tienes
})
export class LoginComponent {
  loginForm: FormGroup;
  // Requisito: Uso de Signals para manejar estado
  errorSignal = signal<string>(''); 

  constructor(private fb: FormBuilder) {
    // Requisito: Formularios reactivos
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Lógica de navegación pendiente de integrar con el Router
    } else {
      this.errorSignal.set('Credenciales inválidas o incompletas');
    }
  }
}