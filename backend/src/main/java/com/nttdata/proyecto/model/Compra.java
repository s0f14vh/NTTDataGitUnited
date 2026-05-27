package com.nttdata.proyecto.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.time.LocalDate;

@Entity
@Table(name = "compras")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String evento;

    @Column(nullable = false)
    private LocalDate fechaCompra;

    @Column(nullable = false)
    private Double precioTotal;

    @Column(nullable = false)
    private Integer cantidadEntradas;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    public Compra() {
        this.fechaCompra = LocalDate.now();
    }

    public Compra(String evento, Double precioTotal, Integer cantidadEntradas, Usuario usuario) {
        this.evento = evento;
        this.fechaCompra = LocalDate.now();
        this.precioTotal = precioTotal;
        this.cantidadEntradas = cantidadEntradas;
        this.usuario = usuario;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEvento() { return evento; }
    public void setEvento(String evento) { this.evento = evento; }

    public LocalDate getFechaCompra() { return fechaCompra; }
    public void setFechaCompra(LocalDate fechaCompra) { this.fechaCompra = fechaCompra; }

    public Double getPrecioTotal() { return precioTotal; }
    public void setPrecioTotal(Double precioTotal) { this.precioTotal = precioTotal; }

    public Integer getCantidadEntradas() { return cantidadEntradas; }
    public void setCantidadEntradas(Integer cantidadEntradas) { this.cantidadEntradas = cantidadEntradas; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}
