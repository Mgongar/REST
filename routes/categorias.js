const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
 } = require('../controllers/categorias');

const { existeCategoriasPorID } = require('../helpers/db-validators');

const router = Router();


//Obtener todas las categorías - publico
router.get('/',obtenerCategorias);

//Obtener uan categoría por id - publico
router.get('/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriasPorID),
    validarCampos
],obtenerCategoria);

//Crear categoría - privado - cualquier persona con un toke válido
router.post('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    
],crearCategoria);

//Actualizar - privado - cualquier persona con un toke válido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriasPorID),
    validarCampos
],actualizarCategoria);

//Borrar categoría - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriasPorID),
    validarCampos
],borrarCategoria);

module.exports = router;
