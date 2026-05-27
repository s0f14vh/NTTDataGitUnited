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
@CrossOrigin(origins = "*") // Crucial para la integración front-back
public class CompraController {

    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // REQUISITO: Crear nuevos registros (Comprar entradas vinculadas a un usuario)
    @PostMapping
    public ResponseEntity<Compra> realizarCompra(@RequestBody Compra nuevaCompra) {
        // Validación básica: comprobar que nos mandan un usuario con ID
        if (nuevaCompra.getUsuario() == null || nuevaCompra.getUsuario().getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        
        // Comprobar si el usuario que compra realmente existe en la BBDD
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(nuevaCompra.getUsuario().getId());
        if (!usuarioOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        // Asignamos el usuario encontrado a la compra y la guardamos
        nuevaCompra.setUsuario(usuarioOpt.get());
        Compra compraGuardada = compraRepository.save(nuevaCompra);
        return ResponseEntity.ok(compraGuardada);
    }

    // REQUISITO: Ver detalle de un elemento (Ver una entrada/ticket específica)
    @GetMapping("/{id}")
    public ResponseEntity<Compra> obtenerDetalleCompra(@PathVariable Long id) {
        Optional<Compra> compra = compraRepository.findById(id);
        return compra.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // REQUISITO MÁXIMO: Consultar la relación entre entidad principal (Usuario) y entidad hija (Compra)
    // Obtiene todas las compras hechas por un usuario en concreto
    @GetMapping("/usuario/{usuarioId}")
    public List<Compra> obtenerComprasPorUsuario(@PathVariable Long usuarioId) {
        return compraRepository.findByUsuarioId(usuarioId);
    }
}