import { Component, signal } from '@angular/core'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service'; 

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

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Creamos esta función por si tu HTML busca "onSubmit"
  onSubmit() {
    console.log('-> El botón HTML llamó a onSubmit()');
    this.ejecutarLogin();
  }

  // Creamos esta función por si tu HTML busca "onLogin"
  onLogin() {
    console.log('-> El botón HTML llamó a onLogin()');
    this.ejecutarLogin();
  }

  // Aquí dentro va la lógica real que limpia y redirige
  private ejecutarLogin() {
    console.log('Formulario válido?:', this.loginForm.valid);
    
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Intentando login con:', email);

      const loginExitoso = this.authService.loginMock(email, password);
      console.log('¿El servicio dice que el login es correcto?:', loginExitoso);

      if (loginExitoso) {
        this.errorSignal.set(''); 
        console.log('¡TODO OK! Intentando saltar a /home ahora mismo...');
        
        // Forzamos la redirección
        this.router.navigate(['/home']).then(nav => {
          console.log('¿La navegación a /home tuvo éxito?:', nav);
        }).catch(err => {
          console.error('Error al intentar navegar a /home:', err);
        });

      } else {
        this.errorSignal.set('Usuario o contraseña incorrectos');
        console.warn('Login fallido en el servicio.');
      }
    } else {
      this.errorSignal.set('Credenciales inválidas o incompletas');
      console.warn('El formulario no es válido. Revisa los campos.');
    }
  }
}