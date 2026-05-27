import { Component, signal, computed, OnInit, inject } from '@angular/core'; // Añadido inject
import { CommonModule, UpperCasePipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TicketService, Entrada } from '../services/ticket.service'; // 👈 Importamos nuestro servicio

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, UpperCasePipe, DatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private ticketService = inject(TicketService); // 👈 Inyectamos el servicio con Angular 21
  private fb = inject(FormBuilder);

  filterForm: FormGroup;

  // El signal ahora empieza vacío esperando los datos del servidor
  entradas = signal<Entrada[]>([]);

  searchQuery = signal('');
  maxPrice = signal<number | null>(null);
  statusQuery = signal('todos');
  activeCarouselIndex = signal(0);

  entradasFiltradas = computed(() => {
    return this.entradas().filter(entrada => {
      const matchNombre = entrada.evento.toLowerCase().includes(this.searchQuery().toLowerCase());
      const matchPrecio = this.maxPrice() === null || entrada.precio <= (this.maxPrice() ?? Infinity);
      const matchDispo = this.statusQuery() === 'todos' || entrada.disponibilidad === this.statusQuery();
      return matchNombre && matchPrecio && matchDispo;
    });
  });

  constructor() {
    this.filterForm = this.fb.group({
      nombre: [''],
      precioMax: [''],
      disponibilidad: ['todos']
    });
  }

 ngOnInit(): void {
    // 1. Intentamos conectar con la API de Spring Boot usando el Observable
    this.ticketService.getEntradas().subscribe({
      next: (datosDesdeSpring) => {
        console.log('¡Conectado con el Backend con éxito! Data recibida:', datosDesdeSpring);

        if (datosDesdeSpring && datosDesdeSpring.length > 0) {
          // Mapeamos los datos reales añadiéndoles la imagen para el carrusel
          const datosConImagen = datosDesdeSpring.map((ent, index) => ({
            ...ent,
            precio: ent.precio || 45.00, // Por si acaso la BBDD solo guardó precioTotal
            imagen: `https://picsum.photos/800/400?random=${index + 1}`
          }));
          this.entradas.set(datosConImagen);
        } else {
          // Si la API responde pero la BBDD está vacía, cargamos los datos por defecto
          this.cargarDatosFallback();
        }
      },
      error: (err) => {
        console.warn('Backend desconectado o error de CORS. Activando datos locales de reserva...');
        // 👈 ¡SALVAVIDAS!: Si el backend falla, la web sigue funcionando con estos datos
        this.cargarDatosFallback();
      }
    });

    // Escucha del formulario reactivo para los filtros en tiempo real
    this.filterForm.valueChanges.subscribe(values => {
      this.searchQuery.set(values.nombre || '');
      this.maxPrice.set(values.precioMax ? Number(values.precioMax) : null);
      this.statusQuery.set(values.disponibilidad || 'todos');
    });

    // Movimiento automático del carrusel
    setInterval(() => { this.nextSlide(); }, 5000);
  }

  // Método auxiliar para no duplicar código de datos locales
  private cargarDatosFallback() {
    this.entradas.set([
      {
        evento: 'Concierto Rock 2026',
        precio: 45.00,
        precioTotal: 90.00,
        disponibilidad: 'disponible',
        fecha: new Date('2026-06-15'),
        cantidadEntradas: 2,
        imagen: 'https://picsum.photos/800/400?random=1'
      },
      {
        evento: 'Festival Pop Primavera',
        precio: 60.00,
        precioTotal: 60.00,
        disponibilidad: 'disponible',
        fecha: new Date('2026-07-20'),
        cantidadEntradas: 1,
        imagen: 'https://picsum.photos/800/400?random=2'
      },
      {
        evento: 'Ópera Magna Nocturna',
        precio: 85.00,
        precioTotal: 170.00,
        disponibilidad: 'agotado',
        fecha: new Date('2026-08-05'),
        cantidadEntradas: 2,
        imagen: 'https://picsum.photos/800/400?random=3'
      }
    ]);
  }

  nextSlide() { this.activeCarouselIndex.update(idx => this.entradas().length ? (idx + 1) % this.entradas().length : 0); }
  prevSlide() { this.activeCarouselIndex.update(idx => this.entradas().length ? (idx - 1 + this.entradas().length) % this.entradas().length : 0); }
}
