const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery(`SELECT * FROM usuarios`)
};

const getById = (id) => {
    return executeQueryOne(`SELECT * FROM usuarios where id = ?`, [id]);
};

const getByUsername = (username) => {
    return executeQuery(`SELECT * FROM usuarios WHERE username LIKE ?`, [`%${username}%`])
};

const getStrictUsername = (username) => {
    return executeQueryOne(`SELECT * FROM usuarios WHERE username = ?`, [username])
}

const getByEmail = (email) => {
    return executeQuery(`SELECT * FROM usuarios WHERE email LIKE ?`, [`%${email}%`]);
};

const getStrictEmail = (email) => {
    return executeQueryOne(`SELECT * FROM usuarios WHERE email = ?`, [email]);
};

const getByNombre = (nombre) => {
    return executeQuery(`SELECT * FROM usuarios WHERE nombre LIKE ?`, [`%${nombre}%`])
};

const getByTrust = (trusted) => {
    return executeQuery(`SELECT * FROM usuarios WHERE trusted = ?`, [trusted])
}

const getRandomTrusted = () => {
    return executeQuery(`SELECT * FROM usuarios WHERE trusted = 1 ORDER BY rand() LIMIT 1`)
}

const getProductosByUser = (id) => {
    return executeQuery(`SELECT productos.*, usuarios.username as username FROM productos, usuarios  WHERE productos.usuario_id = usuarios.id AND productos.usuario_id = ?`, [id])
}

const create = ({ username, email, password, direccion, nombre, apellidos, fecha_nacimiento }) => {
    return executeQuery(
        `INSERT INTO usuarios (username, email, password, direccion, nombre, apellidos, fecha_nacimiento, trusted)
         VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
        [username, email, password, direccion, nombre, apellidos, fecha_nacimiento]);
};

const update = (userId, { discord, nombre, apellidos, avatar }) => {
    return executeQuery(`UPDATE usuarios SET discord = ?, nombre = ?, apellidos = ?,  avatar = ? WHERE id = ?`, [discord, nombre, apellidos, avatar, userId])
}

const updateLoginInfo = (userId, { username, email, password }) => {
    return executeQuery(`UPDATE usuarios SET username = ?, email = ?, password = ? WHERE id = ?`, [username, email, password, userId])
}

const deleteById = (userId) => {
    return executeQueryOne(`DELETE FROM usuarios WHERE id = ?`, [userId]);
}


module.exports = { getAll, getById, getByUsername, getStrictUsername, getByEmail, getStrictEmail, getByNombre, getByTrust, create, update, updateLoginInfo, deleteById, getRandomTrusted, getProductosByUser };