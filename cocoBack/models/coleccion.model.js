const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery(`SELECT * FROM colecciones`)
}

const getById = (id) => {
    return executeQueryOne(`SELECT * FROM colecciones WHERE id = ? AND `, [id])
}

const getByCategoria = (categoria) => {
    return executeQuery(`SELECT * FROM colecciones WHERE categorias = ?`, [categoria])
}

const getByNombre = (nombre) => {
    return executeQuery(`SELECT * FROM colecciones WHERE colecciones LIKE ?`, [`%${nombre}%`])
}

const getByUsuarioId = (usuario_id) => {
    return executeQuery(`SELECT * FROM colecciones WHERE usuario_id = ?`, [usuario_id])
}

const deleteById = (id) => {
    return executeQuery(`DELETE FROM productos WHERE id = ?`, [id])
}

const create = ({ nombre, categoria, imagen = `https://imgur.com/OdaDtxa`, usuario_id, fecha_creacion }) => {
    return executeQuery(`INSERT INTO productos (nombre, precio, categoria, imagen, marca, estado, usuario_id)
    VALUES (?,?,?,?,?,?,?);`, [nombre, precio, categoria, imagen, usuario_id, fecha_creacion]);
}

const edit = (id, { nombre, precio, categoria, imagen, marca, estado }) => {

    return executeQuery(`UPDATE productos SET nombre = ?, categoria = ?, imagen = ?, estado = ? WHERE id = ?`, [nombre, precio, categoria, imagen, marca, estado, id])
}





module.exports = { getAll, getById, getByCategoria, getByNombre, getByUsuarioId, deleteById, create, edit }