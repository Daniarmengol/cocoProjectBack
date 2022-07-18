const router = require('express').Router();
const { body, validationResult } = require('express-validator');

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