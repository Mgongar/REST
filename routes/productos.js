const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
 } = require('../controllers/productos');

const { existeCategoriasPorID,existeProductoPorID } = require('../helpers/db-validators');

const router = Router();


//Obtener todas las categorías - publico
router.get('/',obtenerProductos);

//Obtener uan categoría por id - publico
router.get('/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
],obtenerProducto);

//Crear producto - privado - cualquier persona con un toke válido
router.post('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo válido').isMongoId(),
    check('categoria').custom(existeCategoriasPorID),
    validarCampos   
],crearProducto);

//Actualizar - privado - cualquier persona con un toke válido
router.put('/:id',[
    validarJWT,
    //check('categoria','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
],actualizarProducto);

//Borrar categoría - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
],borrarProducto);

module.exports = router;
