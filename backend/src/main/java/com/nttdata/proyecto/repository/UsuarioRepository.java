package com.nttdata.proyecto.repository;

import com.nttdata.proyecto.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// JpaRepository necesita saber la Entidad (Usuario) y el tipo de su ID (Long)
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Este método mágico busca en la base de datos si existe un usuario con ese email.
    // Lo usaremos en el controlador para simular la "conexión de usuario" (Login).
    Optional<Usuario> findByEmail(String email);
}