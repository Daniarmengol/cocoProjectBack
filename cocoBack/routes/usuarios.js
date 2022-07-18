const express = require('express');
const { body, validationResult } = require('express-validator');
const { createToken } = require('../helpers/utils');
const router = express.Router();
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
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

module.exports = router;
