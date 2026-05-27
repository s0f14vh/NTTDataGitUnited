import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para tipar los datos que vienen del backend
export interface Entrada {
  id?: number;
  evento: string;
  precio: number;
  precioTotal: number;
  disponibilidad: 'disponible' | 'agotado';
  fecha: Date;
  cantidadEntradas: number;
  imagen?: string; // Atributo visual para el front
}

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación standalone
})
export class TicketService {

  // URL base donde está corriendo tu backend de Spring Boot
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // REQUISITO: Llamada API REST usando Observables para listar las entradas/compras
  getEntradas(): Observable<Entrada[]> {
    return this.http.get<Entrada[]>(`${this.apiUrl}/compras`);
  }

  // REQUISITO: Formulario Reactivo enviando datos a la API para crear un registro (Comprar)
  comprarEntrada(nuevaCompra: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/compras`, nuevaCompra);
  }

  // FUNCIONALIDAD MÍNIMA: Conexión enviando credenciales al endpoint de login
  loginUsuario(credenciales: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/login`, credenciales);
  }
}
