const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Usuario = require('../../models/usuario.model');
const { createToken } = require('../../helpers/utils');

router.get('/', async (req, res) => {
    try {
        const result = await Usuario.getAll();
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err })
    };
});

router.get('/:nombre', async (req, res) => {
    try {
        const result = await Usuario.getByNombre(req.params.nombre);
        res.json(result)
    } catch (err) {
        res.json({ msg: err.message, error: err })
    }
});

router.post('/registro',
    body('username')
        .exists()
        .withMessage('El campo de username es obligatorio.')
        .isLength({ min: 4, max: 15 })
        .withMessage('El campo username debe tener una longitud entre x y z caracteres.'),
    body('email')
        .isEmail()
        .withMessage('El formato del email es incorrecto.'),
    body('password')
        .exists()
        .withMessage('Debes introducir una contraseña.')
    , async (req, res) => {
        // Comprobar errores de las validaciones.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json(errors.array());
        };

        // require bcrypt para encriptar la password
        // try encriptado + creación del usuario
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 13);
            const result = await Usuario.create(req.body);
            console.log(result);
            res.json(result);
        } catch (err) {
            res.json({ error: err.message });
        };
    }
);

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Chequeamos en la DB si el user existe.
    const user = await Usuario.getByUsername(username);
    if (!user) {
        return res.json({ error: 'Username y/o contraseña incorrectos. USER ERROR' });
    };

    // Comparamos la password hasheada con la de la db con el bcrypt method bcrypt.compareSync
    const samePass = bcrypt.compareSync(password, user.password);
    if (!samePass) {
        return res.json({ error: 'Username y/o contraseña incorrectos. PASS ERROR' });
    };

    // Creación de token. createToken --> helpers/utils.js

    res.json({
        success: 'Login correcto.',
        token: createToken(user)
    });
});

module.exports = router;