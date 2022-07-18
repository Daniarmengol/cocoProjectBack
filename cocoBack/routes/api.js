const router = require('express').Router();


const apiUsuariosRouter = require('./api/usuarios');
const apiProductosRouter = require('./api/productos');

router.use('/usuarios', apiUsuariosRouter);
router.use('/productos', apiProductosRouter);

module.exports = router;