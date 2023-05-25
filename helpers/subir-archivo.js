const path = require('path');


const { v4: uuidv4 } = require('uuid');



const subirArchivo = (files,ExtensionesValidas= ['png','jpg','jpeg','gif'],carpeta='') =>{
    return new Promise((resolve, reject)=>{

        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length -1];
      
        //Validar la extensión
        if (!ExtensionesValidas.includes( extension )) {
            return reject(`La extensión ${extension} no es permitida, son permitidas las extensiones ${ExtensionesValidas}`);

        }
        
        const nombreTemp= uuidv4() + '.' + extension;
        
      
        const uploadPath = path.join(__dirname, '../uploads/',carpeta,nombreTemp);
      
        archivo.mv(uploadPath,(err) => {
          if (err) {
            return reject(err);
          }
      
          resolve(nombreTemp);
        });
    })

  
}

module.exports={
    subirArchivo
}