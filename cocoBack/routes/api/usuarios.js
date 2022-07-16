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

router.get('/:id', async (req, res) => {
    try {
        const result = await Usuario.getById(req.params.id);
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err })
    };
});

router.get('/username/:username', async (req, res) => {
    try {
        const result = await Usuario.getByUsername(req.params.username);
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err });
    };
});

router.get('/email/:email', async (req, res) => {
    try {
        const result = await Usuario.getByEmail(req.params.email);
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err });
    };
});

router.get('/nombre/:nombre', async (req, res) => {
    try {
        const result = await Usuario.getByNombre(req.params.nombre);
        res.json(result)
    } catch (err) {
        res.json({ msg: err.message, error: err })
    };
});

router.get('/trust/:trust', async (req, res) => {
    // type of req.params es STRING
    // el if rechaza TODO lo que no sean trusts aceptados en la DB.
    if (req.params.trust !== '1' && req.params.trust !== '0') {
        return res.json({ error: 'Trust debe ser 1=true o 0=false.' });
    };

    try {
        const result = await Usuario.getByTrust(req.params.trust);
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err });
    };
});

router.post('/registro',
    body('username')
        .exists()
        .withMessage('El campo de username es obligatorio.')
        .isLength({ min: 4, max: 15 })
        .withMessage('El campo username debe tener una longitud entre 4 y 15 caracteres.'),
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
    const user = await Usuario.getStrictUsername(username);
    if (!user) {
        return res.json({ error: 'Username y/o contraseña incorrectos. USER ERROR' });
    };

    // Comparamos la password hasheada con la de la db con el bcrypt.compareSync
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

router.patch('/editar/:userId/user-info', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await Usuario.update(userId, req.body);
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err })
    }
});

router.patch('/editar/:userId/login-info', async (req, res) => {
    const { userId } = req.params;
    const user = await Usuario.getById(userId);
    const { username, email } = req.body;
    let { password } = req.body;


    const userCheck = await Usuario.getStrictUsername(username);
    console.log(userCheck);
    console.log(username);
    if (username !== user.username && userCheck) return res.json({ error: 'El usuario ya existe' });

    const emailCheck = await Usuario.getStrictEmail(email);
    console.log(email);
    console.log(emailCheck);
    if (email !== user.email && emailCheck) return res.json({ error: 'El email ya existe' });

    const passCheck = bcrypt.compareSync(password, user.password);

    if (passCheck) {
        console.log('passCheck okay, misma password, no la cambio');
        try {
            const result = await Usuario.updateLoginInfo(userId, req.body);
            res.json(result);
        } catch (err) {
            res.json({ msg: err.message, error: err });
        };
    } else {
        console.log(user.password, password);
        console.log('passCheck else, CAMBIO la password');
        password = bcrypt.hashSync(password, 13);
        console.log(user.password, password);

        try {
            const result = await Usuario.updateLoginInfo(userId, req.body);
            res.json(result);
        } catch (err) {
            res.json({ msg: err.message, error: err });
        };

    };
    console.log(user.password);
});

module.exports = router;