-- #####################################

-- SELECT * FROM usuarios;

INSERT INTO usuarios (username, email, password, direccion, nombre, apellidos, fecha_nacimiento, trusted)
VALUES ('J1Loop', 'jorge.ua.1996@gmail.com', 'J12345', 'Juan II 13 Pinto Madrid 28320', 'Jorge', 'Utrera Alarcón', '1996-01-12', true);

INSERT INTO usuarios (username, email, password, direccion, nombre, apellidos, fecha_nacimiento, trusted) 
VALUES ('Pitagorax', 'pbustamantebud@gmail.com', 'P12345', 'Avda Bruselas 2 Algeciras Cádiz 11205', 'Pedro Ángel', 'Bustamante Budiño', '1995-10-06', false);

INSERT INTO usuarios (username, email, password, direccion, nombre, apellidos, fecha_nacimiento, trusted) 
VALUES ('Gtuni', 'danielito486@gmail.com', 'D12345', 'Avda América Urb Triana 22 11204', 'Daniel', 'Fernández Armengol', '1996-09-05', true);

-- #####################################

-- SELECT * FROM productos;

INSERT INTO productos (nombre, precio, categoria, marca, estado, usuario_id) VALUES ('Kingdom Hearts 1', 5.42, 'videojuegos', 'SQ Soft', 'desperfectos', 3);
INSERT INTO productos (nombre, precio, categoria, marca, estado, usuario_id) VALUES ('Malenia Figure', 300, 'figuras', 'Bandai Namco', 'usado', 2);
INSERT INTO productos (nombre, categoria, marca, estado, usuario_id) VALUES ('Bugged Tal-Rasha Chestpiece DII', 'videojuegos', 'Blizzard North', 'usado', 1);
INSERT INTO productos (nombre, precio, categoria, marca, estado, usuario_id) VALUES ('Spyro 1 PS1', 30, 'videojuegos', 'Insomniac', 'desperfectos', 2);
INSERT INTO productos (nombre, categoria, marca, estado, usuario_id) VALUES ("Camiseta Romario Barça '92", 'deportes', 'Kappa', 'nuevo', 3);
INSERT INTO productos (nombre, precio, categoria, estado, usuario_id) VALUES ('Vinilo Beat It MJ', 50, 'musica', 'usado', 1 );

-- #####################################

-- SELECT * FROM coleccion;

-- QUITAR LOS GUIONES DE DELANTE Y LANZAR PARA LEER ORDENADO:
-- SELECT c.usuario_id as u_id, u.username as user, c.producto_id as p_id, p.nombre as producto, c.precio, c.en_venta 
-- FROM coleccion as c, usuarios as u, productos as p
-- WHERE u.id = c.usuario_id
-- AND p.id = c.producto_id
-- ORDER BY u.id;

INSERT INTO coleccion (usuario_id, producto_id, precio, en_venta) VALUES (3, 1, 5.42, true);
INSERT INTO coleccion (usuario_id, producto_id, precio, en_venta) VALUES (2, 2, 300, true);
INSERT INTO coleccion (usuario_id, producto_id, en_venta) VALUES (1, 3, false);
INSERT INTO coleccion (usuario_id, producto_id, precio, en_venta) VALUES (1, 6, 50, true);
INSERT INTO coleccion (usuario_id, producto_id, precio, en_venta) VALUES (2, 4, 30, true);
INSERT INTO coleccion (usuario_id, producto_id, en_venta) VALUES (3, 5, false);

-- #####################################
