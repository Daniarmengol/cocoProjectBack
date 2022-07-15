const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery(`SELECT * FROM usuarios`)
};

const getById = (id) => {
    return executeQueryOne(`SELECT * FROM usuarios where id = ?`, [id]);
};

const getByUsername = (username) => {
    return executeQueryOne(`SELECT * FROM usuarios WHERE username = ?`, [username])
};

const getByEmail = (email) => {
    return executeQueryOne(`SELECT * FROM usuarios WHERE email = ?`, [email]);
};

const getByNombre = (nombre) => {
    return executeQuery(`SELECT * FROM usuarios WHERE nombre LIKE '%?%'`, [nombre])
};

const create = ({ username, email, password, direccion, nombre, apellidos, fecha_nacimiento, trusted }) => {
    return executeQuery(
        `INSERT INTO usuarios (username, email, password, direccion, nombre, apellidos, fecha_nacimiento, trusted)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [username, email, password, direccion, nombre, apellidos, fecha_nacimiento, trusted]);
};

const deleteById = (clienteId) => {
    return executeQueryOne(`DELETE FROM usuarios WHERE id = ?`, [clienteId]);
}


module.exports = { getAll, getById, getByUsername, getByEmail, getByNombre, create, deleteById };