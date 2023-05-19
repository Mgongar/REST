
const { Router } = require('express');
const { check } = require('express-validator');

const {esRoleValido,
  emailExiste,
  existeUsuarioPorID}= require('../helpers/db-validators');


const { validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole} = require('../middlewares');

const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
     } = require('../controllers/usuarios');




const router = Router();


router.get('/',usuariosGet);

  router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),//Aquí observamos si el id existe
    check('rol').custom(esRoleValido),
    validarCampos
  ],usuariosPut);

  router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener 6 caracteres').isLength({ min: 6 }),
    //check('correo','El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),//por esta parte del código me comunico con la BBDD
    validarCampos
  ],usuariosPost );//el segundo argumento es un middleware lo mandamos en forma de arreglo para poder mandar más de uno

  router.patch('/', usuariosPatch);

  router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
  ],usuariosDelete);

  module.exports=router;