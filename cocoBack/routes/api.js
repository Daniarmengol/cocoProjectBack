const router = require('express').Router();


const apiUsuariosRouter = require('./api/usuarios');
const apiProductosRouter = require('./api/productos');
const apiColeccionesRouter = require('./api/colecciones.js');

router.use('/usuarios', apiUsuariosRouter);
router.use('/productos', apiProductosRouter);
router.use('/colecciones', apiColeccionesRouter);

module.exports = router;