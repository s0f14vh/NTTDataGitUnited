package com.nttdata.proyecto.controller;
import com.nttdata.proyecto.model.Compra;
import com.nttdata.proyecto.model.Usuario;
import com.nttdata.proyecto.repository.CompraRepository;
import com.nttdata.proyecto.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {
    @Autowired private CompraRepository compraRepository;
    @Autowired private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Compra> obtenerTodas() { return compraRepository.findAll(); }

    @PostMapping
    public ResponseEntity<Compra> realizarCompra(@RequestBody Compra nuevaCompra) {
        if (nuevaCompra.getUsuario() == null || nuevaCompra.getUsuario().getId() == null) return ResponseEntity.badRequest().build();
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(nuevaCompra.getUsuario().getId());
        if (!usuarioOpt.isPresent()) return ResponseEntity.notFound().build();
        nuevaCompra.setUsuario(usuarioOpt.get());
        return ResponseEntity.ok(compraRepository.save(nuevaCompra));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compra> obtenerDetalleCompra(@PathVariable Long id) {
        return compraRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Compra> obtenerComprasPorUsuario(@PathVariable Long usuarioId) {
        return compraRepository.findByUsuarioId(usuarioId);
    }
}
