const Role = require('../models/role');

const {Usuario,Categoria,Producto} = require('../models');//La u mayúscula no es obligatoria pero es un estandar



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

const existeCategoriasPorID = async(id='') => {
  const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id ${ id } no existe `);
    }
}

const existeProductoPorID = async(id='') => {
  const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id ${ id } no existe `);
    }
}

//Validar las colecciones permitidas
const coleccionesPermitidas = (coleccion='', colecciones=[])=>{
  const incluida= colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error (`La coleccion ${ coleccion }  no es permitida, ${colecciones}`);
  }
  return  true;
}

  module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriasPorID,
    existeProductoPorID,
    coleccionesPermitidas
};

