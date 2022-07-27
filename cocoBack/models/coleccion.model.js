const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery(`SELECT * FROM colecciones`)
}

const getLastCollections = () => {
    return executeQuery(`SELECT group_concat(colecciones.producto_id SEPARATOR '/') AS id_productos_coleccion, colecciones.*, usuarios.* FROM colecciones, usuarios WHERE colecciones.usuario_id = usuarios.id AND colecciones.usuario_id = usuarios.id GROUP BY codigo ORDER BY fecha_creacion DESC LIMIT 6 `)
}

const getById = (id) => {
    return executeQueryOne(`SELECT * FROM colecciones WHERE id = ?`, [id])
}

const getByCategoria = (categoria) => {
    return executeQuery(`SELECT * FROM colecciones WHERE categorias = ?`, [categoria])
}

const getByNombre = (nombre) => {
    return executeQuery(`SELECT * FROM colecciones WHERE colecciones LIKE ?`, [`%${nombre}%`])
}

const getByCodigo = (codigo) => {

    return executeQuery(`SELECT productos.*,colecciones.titulo FROM productos, colecciones WHERE productos.id = colecciones.producto_id AND colecciones.codigo = ?`, [codigo])
}

const getCollectionByUserId = (id) => {
    return executeQuery(`SELECT group_concat(colecciones.producto_id SEPARATOR '/') AS id_productos_coleccion, colecciones.*, usuarios.* FROM colecciones, usuarios WHERE colecciones.usuario_id = usuarios.id AND colecciones.usuario_id = ? GROUP BY codigo`, [id])
}

//Comprobar primero que el usuario_id de la coleeción coincide con el usuario logueado del token
const deleteById = (id) => {
    return executeQuery(`DELETE FROM productos WHERE id = ?`, [id])
}

// El usuario_id no debe pasarse por body, debe sacarse del token
const create = ({ nombre, categoria, imagen = `https://imgur.com/OdaDtxa`, usuario_id, fecha_creacion }) => {
    return executeQuery(`INSERT INTO productos (nombre, precio, categoria, imagen, marca, estado, usuario_id)
    VALUES (?,?,?,?,?,?,?);`, [nombre, precio, categoria, imagen, usuario_id, fecha_creacion]);
}

//Comprobar primero que el usuario_id de la coleeción coincide con el usuario logueado del token
const edit = (id, { nombre, precio, categoria, imagen, marca, estado }) => {

    return executeQuery(`UPDATE productos SET nombre = ?, categoria = ?, imagen = ?, estado = ? WHERE id = ?`, [nombre, precio, categoria, imagen, marca, estado, id])
}





module.exports = { getAll, getById, getByCategoria, getByNombre, getByCodigo, deleteById, create, edit, getCollectionByUserId, getLastCollections }