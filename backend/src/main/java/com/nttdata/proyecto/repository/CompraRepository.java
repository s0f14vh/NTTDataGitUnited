package com.nttdata.proyecto.repository;

import com.nttdata.proyecto.model.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// JpaRepository necesita saber la Entidad (Compra) y el tipo de su ID (Long)
public interface CompraRepository extends JpaRepository<Compra, Long> {
    
    // Este método cumple el requisito obligatorio de "Consultar la relación entre entidad principal e hija".
    // Buscará automáticamente todas las compras que pertenezcan al ID del usuario que le pasemos.
    List<Compra> findByUsuarioId(Long usuarioId);
}