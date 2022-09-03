const router = require('express').Router();
const { checkToken } = require('../../helpers/middlewares');
const Coleccion = require('../../models/coleccion.model');


router.get('/', checkToken, (req, res) => {
    Coleccion.getAll()
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/ultimasColecciones', checkToken, (req, res) => {
    Coleccion.getLastCollections()
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/:id', checkToken, (req, res) => {
    Coleccion.getById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/codigo/:codigo', checkToken, (req, res) => {
    Coleccion.getByCodigo(req.params.codigo)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/nombre/:nombre', checkToken, (req, res) => {
    Coleccion.getByName(req.params.nombre)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.get('/usuario/:usuario_id', checkToken, (req, res) => {
    Coleccion.getCollectionByUserId(req.user.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.patch('/editar/:id', checkToken, (req, res) => {
    Coleccion.edit(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

router.post('/nuevo', checkToken, (req, res) => {
    /*   const errors = validationResult(req)
      if (!errors.isEmpty()) {
          return res.json(errors.array())
      } */
    Coleccion.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))

});

router.delete('/eliminar/:id', checkToken, (req, res) => {
    Producto.deleteById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});




module.exports = router;
