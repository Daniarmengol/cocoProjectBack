const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Usuario = require('../../models/usuario.model');
const { createToken } = require('../../helpers/utils');
const { checkToken } = require('../../helpers/middlewares');

router.get('/', checkToken, async (req, res) => {
    try {
        const result = await Usuario.getAll();
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err })
    };
});

router.get('/:id', checkToken, async (req, res) => {
    try {
        const result = await Usuario.getById(req.params.id);
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err })
    };
});

router.get('/username/:username', checkToken, async (req, res) => {
    try {
        const result = await Usuario.getByUsername(req.params.username);
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err });
    };
});

router.get('/username/strict/:username', checkToken, async (req, res) => {
    try {
        const result = await Usuario.getStrictUsername(req.params.username);
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err });
    };
});

router.get('/email/:email', checkToken, async (req, res) => {
    try {
        const result = await Usuario.getByEmail(req.params.email);
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err });
    };
});

router.get('/email/strict/:email', checkToken, async (req, res) => {
    try {
        const result = await Usuario.getStrictEmail(req.params.email);
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err });
    };
});

router.get('/nombre/:nombre', checkToken, async (req, res) => {
    try {
        const result = await Usuario.getByNombre(req.params.nombre);
        res.json(result)
    } catch (err) {
        res.json({ msg: err.message, error: err })
    };
});

router.get('/trust/:trust', checkToken, async (req, res) => {
    // type of req.params es STRING
    // el if rechaza TODO lo que no sean trusts aceptados en la DB.
    /* parseInt req.params.trust */
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

router.get('/rand/trusted', checkToken, (req, res) => {
    console.log(req.user)
    Usuario.getRandomTrusted()
        .then(result => {
            res.json(result)
        })
        .catch(err => res.json(err))
});

router.post('/registro', async (req, res) => {
    const user = await Usuario.getStrictUsername(req.body.id);
    const user2 = await Usuario.getByEmail(req.body.email);

    if (user.username !== req.body.username || user2.email !== req.body.email) {
        // require bcrypt para encriptar la password
        // try encriptado + creación del usuario
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 13);
            await Usuario.create(req.body);
            res.json({ success: 'Usuario registrado correctamente.', user: req.body });
        } catch (err) {
            res.json({ error: err.message });
        };
    } else {
        res.json({ error: 'Usuario duplicado.' });
    }


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

router.post('/emailduplicado', async (req, res) => {

    try {
        const result = await Usuario.getStrictEmail(req.body.email);
        if (result) {
            return res.json({ response: true })
        } else {
            return res.json({ response: false })
        }

    } catch (err) {
        res.json({ error: err.message });
    };


})

router.patch('/editar/:userId/user-info', checkToken, async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await Usuario.update(userId, req.body);
        res.json(result);
    } catch (err) {
        res.json({ msg: err.message, error: err })
    };
});

router.patch('/editar/:userId/login-info', checkToken, async (req, res) => {
    const { userId } = req.params;
    const user = await Usuario.getById(userId);
    const { username, email } = req.body;
    let { password } = req.body;

    const userCheck = await Usuario.getStrictUsername(username);
    if (username !== user.username && userCheck) return res.json({ error: 'El usuario ya existe' });

    const emailCheck = await Usuario.getStrictEmail(email);
    if (email !== user.email && emailCheck) return res.json({ error: 'El email ya existe' });

    req.body.password = bcrypt.hashSync(password, 13);

    try {
        const result = await Usuario.updateLoginInfo(userId, req.body);
        res.json({ success: 'Usuario editado correctamente!', result });
    } catch (err) {
        res.json({ msg: err.message, error: err });
    };
});

router.delete('/:userId', checkToken, async (req, res) => {
    const { userId } = req.params;
    const user = await Usuario.getById(userId);
    try {
        await Usuario.deleteById(userId);
        res.json({ success: 'Usuario borrado correctamente.', user });
    } catch (err) {
        res.json({ msg: err.message, error: err });
    };
});

module.exports = router;