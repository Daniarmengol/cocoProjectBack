const router = require('express').Router();


router.get('/', (req, res) => {
    Coleccion.getAll()
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/:id', (req, res) => {
    Coleccion.getById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/colecciones/:colecciones', (req, res) => {
    Coleccion.getByCategoria(req.params.categoria)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/nombre/:nombre', (req, res) => {
    Coleccion.getByName(req.params.nombre)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/usuario/:usuario_id', (req, res) => {
    Coleccion.getByUsuarioId(req.user.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.patch('/editar/:id', (req, res) => {
    Coleccion.edit(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.post('/nuevo',
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json(errors.array())
        }
        Coleccion.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    });

router.delete('/eliminar/:id', (req, res) => {
    Producto.deleteById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});




module.exports = router;
