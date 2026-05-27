import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketService, Entrada } from '../services/ticket.service';
import { SafeUrlPipe } from '../shared/safe-url.pipe';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, DatePipe, SafeUrlPipe],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  private router = inject(Router);
  private ticketService = inject(TicketService);
  private fb = inject(FormBuilder);

  entrada = signal<Entrada | null>(null);
  cantidad = signal(1);
  compraRealizada = signal(false);
  cargando = signal(false);

  compraForm: FormGroup;

  descripcionesEvento: Record<string, string> = {
    'Concierto Rock 2026': 'Una noche épica con los mejores grupos de rock del panorama nacional e internacional. Espera guitarras eléctricas, baterías ensordecedoras y una multitud apasionada. El evento contará con 3 escenarios simultáneos y más de 10 horas de música ininterrumpida.',
    'Festival Pop Primavera': 'El festival de pop más esperado del año llega con una lineup increíble. Desde los artistas más emergentes hasta los consagrados del panorama pop mundial. Una experiencia sensorial única con luces, efectos visuales y sonido de primer nivel.',
    'Ópera Magna Nocturna': 'Una velada de lujo en el Gran Teatro con la mejor ópera clásica interpretada por cantantes de talla mundial. Dress code elegante recomendado. Incluye servicio de guardarropa y cóctel de bienvenida.'
  };

  venuesEvento: Record<string, { nombre: string; direccion: string; lat: number; lng: number }> = {
    'Concierto Rock 2026': { nombre: 'Palacio de los Deportes', direccion: 'Av. Felipe II, s/n, Madrid', lat: 40.4350, lng: -3.6553 },
    'Festival Pop Primavera': { nombre: 'Parc del Fòrum', direccion: 'Rambla del Prim, Barcelona', lat: 41.4100, lng: 2.2218 },
    'Ópera Magna Nocturna': { nombre: 'Gran Teatre del Liceu', direccion: 'La Rambla, 51-59, Barcelona', lat: 41.3800, lng: 2.1738 }
  };

  constructor() {
    this.compraForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      caducidad: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]]
    });
  }

  ngOnInit(): void {
    const state = history.state as { entrada: Entrada };
    if (state?.entrada) {
      this.entrada.set(state.entrada);
    } else {
      this.router.navigate(['/']);
    }
  }

  get precioTotal(): number {
    const e = this.entrada();
    if (!e) return 0;
    return e.precio * this.cantidad();
  }

  get descripcion(): string {
    const e = this.entrada();
    if (!e) return '';
    return this.descripcionesEvento[e.evento] || 'Evento de primer nivel con artistas de renombre. Una experiencia única e irrepetible que no querrás perderte.';
  }

  get venue() {
    const e = this.entrada();
    if (!e) return null;
    return this.venuesEvento[e.evento] || { nombre: 'Venue Principal', direccion: 'Madrid, España', lat: 40.4168, lng: -3.7038 };
  }

  get mapaUrl(): string {
    const v = this.venue;
    if (!v) return '';
    return `https://www.openstreetmap.org/export/embed.html?bbox=${v.lng - 0.01},${v.lat - 0.005},${v.lng + 0.01},${v.lat + 0.005}&layer=mapnik&marker=${v.lat},${v.lng}`;
  }

  incrementar() {
    if (this.cantidad() < 10) this.cantidad.update(c => c + 1);
  }

  decrementar() {
    if (this.cantidad() > 1) this.cantidad.update(c => c - 1);
  }

  confirmarCompra() {
    if (this.compraForm.invalid) {
      this.compraForm.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const e = this.entrada()!;

    const compra = {
      evento: e.evento,
      cantidad: this.cantidad(),
      precioTotal: this.precioTotal,
      nombreComprador: `${this.compraForm.value.nombre} ${this.compraForm.value.apellidos}`,
      email: this.compraForm.value.email
    };

    this.ticketService.comprarEntrada(compra).subscribe({
      next: () => { this.cargando.set(false); this.compraRealizada.set(true); },
      error: () => { this.cargando.set(false); this.compraRealizada.set(true); }
    });
  }

  campoInvalido(campo: string): boolean {
    const ctrl = this.compraForm.get(campo);
    return !!(ctrl?.invalid && ctrl?.touched);
  }
}
