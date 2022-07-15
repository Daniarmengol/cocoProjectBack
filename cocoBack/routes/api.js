const router = require('express').Router();

const { checkToken } = require('../helpers/middlewares');

const apiUsuariosRouter = require('./api/usuarios');
const apiProductosRouter = require('./api/productos');

router.use('/usuarios', apiUsuariosRouter);
router.use('/productos', checkToken, apiProductosRouter);

module.exports = router;