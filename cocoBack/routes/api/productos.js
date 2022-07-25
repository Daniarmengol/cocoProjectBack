const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const Producto = require('../../models/producto.model')

router.get('/', (req, res) => {
    Producto.getAll()
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/productos_venta', (req, res) => {
    Producto.getProductosVenta()
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/producto/:id', (req, res) => {
    Producto.getById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/categoria/:categoria', (req, res) => {
    Producto.getByCategoria(req.params.categoria)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/estado/:estado', (req, res) => {
    Producto.getByEstado(req.params.estado)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/marca/:marca', (req, res) => {
    Producto.getByMarca(req.params.marca)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/nombre/:nombre', (req, res) => {
    Producto.getByName(req.params.nombre)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/usuario/:usuario_id', (req, res) => {
    Producto.getByUsuarioId(req.user.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.post('/productos_venta/busqueda', (req, res) => {

    let busqueda = new Object({
        nombre: (req.body.nombre === undefined) ? "" : req.body.nombre,
        username: (req.body.username === undefined) ? "" : req.body.username,
        categoria: (req.body.categoria === undefined) ? "" : req.body.categoria,
        marca: (req.body.marca === undefined) ? "" : req.body.marca,
        precioMax: (req.body.precioMax === undefined || req.body.precioMax === "") ? 99999 : parseInt(req.body.precioMax),
        precioMin: (req.body.precioMin === undefined || req.body.precioMin === "") ? 0 : parseInt(req.body.precioMin),
        estado: (req.body.estado === undefined) ? "" : req.body.estado,
    })

    Producto.getSearch(busqueda)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.patch('/editar/:id', (req, res) => {
    Producto.edit(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.post('/nuevo',
    body(['nombre', 'categoria', 'estado'])
        .exists()
        .withMessage('el campo es obligatorio')
    , (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json(errors.array())
        }
        Producto.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    });

router.delete('/eliminar/:id', (req, res) => {
    Producto.deleteById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

module.exports = router;