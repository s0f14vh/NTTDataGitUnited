package com.nttdata.proyecto.controller;

import com.nttdata.proyecto.model.Usuario;
import com.nttdata.proyecto.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Crucial: Permite que Angular (puerto 4200) conecte con Spring (puerto 8080)
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // REQUISITO: Listar datos (Obtener todos los usuarios)
    @GetMapping
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    // REQUISITO: Ver detalle de un elemento (Obtener un usuario por su ID)
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // REQUISITO: Crear nuevos registros (Registrar usuario desde formulario de Angular)
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // FUNCIONALIDAD MÍNIMA: Conexión de usuario (Login Simulado)
    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario loginData) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(loginData.getEmail());
        
        // Comprobamos si existe el email y si la contraseña coincide
        if (usuarioOpt.isPresent() && usuarioOpt.get().getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok(usuarioOpt.get()); // Devuelve el usuario conectado
        }
        return ResponseEntity.status(401).build(); // Error de credenciales (No autorizado)
    }
}