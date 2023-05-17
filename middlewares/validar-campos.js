const { validationResult } = require('express-validator');

const validarCampos =  (req,res,next)=>{
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();// Esto dice que si llega a este punto por favor continue al siguiente middleware, sino va al controlador
}


module.exports={validarCampos};