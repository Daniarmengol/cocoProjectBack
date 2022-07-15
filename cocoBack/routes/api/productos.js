const router = require('express').Router();

const Producto = require('../../models/producto.model')

router.get('/', (req, res) => {
    Producto.getAll()
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/:id', (req, res) => {
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
    Producto.getByUsuarioId(req.params.usuario_id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});




module.exports = router;