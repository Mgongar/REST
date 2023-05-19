//Extraemos de mongoose el esquema y el modelo
const {Schema,model } = require('mongoose');

const UsuarioSchema= Schema({
    nombre:{
        type: String,
        require:[true,'El nombre es obligatorio']
    },
    correo:{
        type: String,
        require:[true,'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require:[true,'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        require:true,
        emun:['ADMIN_ROLE', 'USER_ROLE']

    },
    estado:{
        type: Boolean,
        default:true,

    },
    google:{
        type: Boolean,
        default: false
    },
    


});
UsuarioSchema.methods.toJSON = function(){// CON ESTA FUNCIÓN OCULTAMOS A NIVEL VISUAL LOS CAMPOS QUE SELECCIONAMOS
    const { __v,password,_id, ...usuario}= this.toObject();
    usuario.uid = _id;
    //Llamamos concretamente a dos apartados y a través de los puntos englobamos el resto en usuario
    return usuario;
}

module.exports= model('Usuario',UsuarioSchema);
