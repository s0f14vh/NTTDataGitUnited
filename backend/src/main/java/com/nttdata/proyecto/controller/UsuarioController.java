package com.nttdata.proyecto.controller;
import com.nttdata.proyecto.model.Usuario;
import com.nttdata.proyecto.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> obtenerTodos() { return usuarioRepository.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) { return usuarioRepository.save(usuario); }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginData) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(loginData.getEmail());
        if (usuarioOpt.isEmpty()) return ResponseEntity.status(401).body(Map.of("mensaje", "El email no está registrado"));
        if (!usuarioOpt.get().getPassword().equals(loginData.getPassword())) return ResponseEntity.status(401).body(Map.of("mensaje", "Contraseña incorrecta"));
        return ResponseEntity.ok(usuarioOpt.get());
    }
}
