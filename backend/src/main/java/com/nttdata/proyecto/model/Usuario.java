
package com.nttdata.proyecto.model;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;

    // AQUÍ ESTÁ EL CAMBIO PARA ARREGLAR EL ERROR:
    @Column(name = "clave", nullable = false)
    private String password;

    // Relación 1:M - Un usuario tiene muchas compras
    // JsonManagedReference evita bucles infinitos al serializar a JSON
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Compra> compras = new ArrayList<>();

    // Constructores
    public Usuario() {}

    public Usuario(String nombre, String email, String password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public List<Compra> getCompras() { return compras; }
    public void setCompras(List<Compra> compras) { this.compras = compras; }
}
