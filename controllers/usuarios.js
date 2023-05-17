const bcryptjs= require('bcryptjs');



const {response, request}= require('express');//con esta desestructuración conseguimos que el re. salgan las obciones dentro de la función 
const Usuario = require('../models/usuario');//La u mayúscula no es obligatoria pero es un estandar


//GET
const usuariosGet = async(req=request, res=response)=> {

  const query={estado:true};
  const {limite= 5, desde=0 }= req.query;
  // const usuarios = await Usuario.find(query)//Aqui hacemos la paginación de la Base de datos
  // .skip(Number(desde))//con skip indicamos desde donde queremos que empiece
  // .limit(Number(limite));//Con limit indicamos cual es el número máximo de registros que queremos que aparezcan
  // //fíjate que los dos llevan un Number porque reciben el argumento como String desde la url y estos comandos trabajan con number

 // const total=await Usuario.countDocuments(query);

 //hace lo mismo que el código comentado pero es mucho más óptima la ejecución

 const[total,usuarios]= await Promise.all([
  Usuario.countDocuments(query),
  Usuario.find(query)
  .skip(Number(desde))
  .limit(Number(limite))
 ]);
  
  res.status(403).json({
    total,
    usuarios
  });
}


  //PUT
  const usuariosPut= async (req, res)=> {
    const {id}=req.params;
    const { _id,password,google,correo,...resto }=req.body;

    //TODO validar contra base de datos
    if ( password ) {
      const salt=bcryptjs.genSaltSync();
      resto.password=bcryptjs.hashSync(password,salt);
    }
   const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.status(201).json({//con esta desestructuración consigo recibir unicamente los datos que paso sin opción a que entren más
        usuario
    });
  }


  //POST
  const usuariosPost=async (req, res)=> {
 
    const { nombre, correo , password, role} = req.body;
    const usuario = new Usuario({ nombre, correo , password, role}) ;// AQUÍ SE CREA LA INSTANCIA PERO NO GRABA EL REGISTRO

    //Verificar si el correo existe
    
    //Encryptar la contraseña
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password,salt);

    //Guardar en BD

    await usuario.save();//con este comando dejamos grabados los datos en la BBDD


    res.json({
        usuario
    });
  }

  //PATCH
  const usuariosPatch=(req, res)=> {
    res.json({
        msg:'patch API- Controlador'
    });
  }

  //DELETE
  const usuariosDelete= async(req, res)=> {

    const { id } = req.params;
    //Fisicamente lo borramos
    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false});


    res.json(usuario);
  }



  module.exports={usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete

};