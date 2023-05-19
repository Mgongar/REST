const { response } = require("express");
const usuario = require("../models/usuario");



const esAdminRole = (req, res=response,next) =>{
    if (!req.usuario) {
        res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }
    
    const{rol, nombre}= req.usuario;

    if (rol!=='ADMIN_ROLE') {
        res.status(401).json({
            msg: `${rol} no es administrador - No puede hacer esto`
        })
    }

    next();
}
const tieneRole =(...role)=>{

    return (req, res=response,next) => {
        console.log(role, req.usuario.rol,req.usuario.nombre);

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if ( !role.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ role }`
            });
        }

        next();
    }
}


module.exports={
    esAdminRole,
    tieneRole
}