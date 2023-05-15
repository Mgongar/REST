const {response, request}= require('express');//con esta desestructuración conseguimos que el re. salgan las obciones dentro de la función 

const usuariosGet = (req=request, res=response)=> {

  const {q,nombre,apikey}= req.query;
  
    res.status(403).json({
        msg:'get API- Controlador',
        q,
        nombre,
        apikey
    });
  }

  const usuariosPut= (req, res)=> {
    const id=req.params.id;
    res.status(201).json({//con esta desestructuración consigo recibir unicamente los datos que paso sin opción a que entren más
        msg:'put API- Controlador',
        id
    });
  }

  const usuariosPost=(req, res)=> {
    const {nombre,edad} = req.body;
    res.json({
        msg:'post API- Controlador',
        nombre,
        edad
    });
  }

  const usuariosPatch=(req, res)=> {
    res.json({
        msg:'patch API- Controlador'
    });
  }

  const usuariosDelete= (req, res)=> {
    res.status(201).json({
        msg:'delete API- Controlador' 
    });
  }



  module.exports={usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete

};