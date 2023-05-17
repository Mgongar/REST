const Role = require('../models/role');

const Usuario = require('../models/usuario');//La u mayúscula no es obligatoria pero es un estandar



const esRoleValido =async(rol='') =>{
    const existeRol= await Role.findOne({rol});
    if (!existeRol) {
      throw new Error(`El rol ${ rol } no está registrado en la base de datos`);
    }
  }

const emailExiste = async(correo='') => {
  const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email: ${ correo }, ya existe en la base de datos`);
    }
}

const existeUsuarioPorID = async(id='') => {
  const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${ id } no existe `);
    }
}

  module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorID
};

