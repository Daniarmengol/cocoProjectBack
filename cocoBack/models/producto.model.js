const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery(`SELECT * FROM productos`)
}

/* me trae la informacion del usuario (username, email,trusted) a traves del producto */
const getProductosVenta = () => {
    return executeQuery(`select productos.*, usuarios.username, usuarios.trusted
    from productos, usuarios
    where productos.usuario_id = usuarios.id
    and productos.precio is not null`)
}

const getProductosVentaFiltred = () => {
    return executeQuery()
}

const getById = (id) => {
    return executeQueryOne(`SELECT * FROM productos WHERE id = ?`, [id])
}

const getByCategoria = (categoria) => {
    return executeQuery(`SELECT * FROM productos WHERE categoria = ?`, [categoria])
}

const getByEstado = (estado) => {
    return executeQuery(`SELECT * FROM productos WHERE estado = ?`, [estado])
}

/* https://github.com/sidorares/node-mysql2/issues/969 - GETBYMARCA -sidorares es PAPÁ */
const getByMarca = (marca) => {
    return executeQuery(`SELECT * FROM productos WHERE marca LIKE ?`, [`%${marca}%`])
}

const getByNombre = (nombre) => {
    return executeQuery(`SELECT * FROM productos WHERE marca LIKE ?`, [`%${nombre}%`])
}

const getByUsuarioId = (usuario_id) => {
    return executeQuery(`SELECT * FROM productos WHERE usuario_id = ?`, [usuario_id])
}

const getSearch = ({ nombre, categoria, marca, precioMax, precioMin, estado }) => {
    return executeQuery(`SELECT * FROM productos WHERE nombre LIKE ? AND categoria LIKE ? AND marca LIKE ? AND precio <= ? AND precio >= ? AND estado = ?`, [`%${nombre}%`, categoria, `%${marca}%`, precioMax, precioMin, estado])
}


const create = ({ nombre, precio = null, categoria, imagen = `https://i.imgur.com/b90NgSA.png`, marca, estado, usuario_id }) => {
    return executeQuery(`INSERT INTO productos (nombre, precio, categoria, imagen, marca, estado, usuario_id)
    VALUES (?,?,?,?,?,?,?);`, [nombre, precio, categoria, imagen, marca, estado, usuario_id]);
}

const deleteById = (id) => {
    return executeQuery(`DELETE FROM productos WHERE id = ?`, [id])
}

const edit = (id, { nombre, precio, categoria, imagen, marca, estado }) => {

    return executeQuery(`UPDATE productos SET nombre = ?, precio = ?, categoria = ?, imagen = ?, marca = ?, estado = ? WHERE id = ?`, [nombre, precio, categoria, imagen, marca, estado, id])
}

module.exports = {
    getAll, getById, getByCategoria, getByEstado, getByMarca, getByNombre, getByUsuarioId, edit, create, deleteById, getSearch, getProductosVenta
}