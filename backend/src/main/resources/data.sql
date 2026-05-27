-- 1. Insertar Usuarios iniciales de prueba (Entidad Principal)
INSERT INTO usuarios (nombre, email, clave) VALUES ('Ana López', 'ana@email.com', '123456');
INSERT INTO usuarios (nombre, email, clave) VALUES ('Juan Martínez', 'juan@email.com', 'qwerty');
-- 2. Insertar Compras asociadas (Entidad Hija - Relación 1:M)
-- Compra 1: Vinculada a Ana (usuario_id = 1)
INSERT INTO compras (evento, fecha_compra, precio_total, cantidad_entradas, usuario_id) 
VALUES ('Festival de Verano 2026', '2026-05-27', 120.00, 2, 1);

-- Compra 2: Vinculada a Juan (usuario_id = 2)
INSERT INTO compras (evento, fecha_compra, precio_total, cantidad_entradas, usuario_id) 
VALUES ('Obra de Teatro Clásica', '2026-05-28', 35.00, 1, 2);

-- Compra 3: Otra compra para Ana (usuario_id = 1, demostrando el 1:M)
INSERT INTO compras (evento, fecha_compra, precio_total, cantidad_entradas, usuario_id) 
VALUES ('Concierto Rock Urbano', '2026-05-29', 90.00, 2, 1);