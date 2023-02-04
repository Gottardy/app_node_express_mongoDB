const Role = require('../models/role');
const usuario = require('../models/usuario');

    //Verificar si el rol existe
    const  esUnRolValido = async (rol = '')=>{
        const existeRol = await Role.findOne({ rol });
        if( !existeRol){
            throw new Error (`El rol ${rol} no esta registrado en la BD`);
        }
    }

    //Verificar si el correo existe
    const existeCorreo = async (correo) =>{
        const correoPresent = await usuario.findOne({correo});
        if (correoPresent){
            throw new Error (`El correo {${correo}} enviado ya esta registrado, por favor cambielo`);
         }
   }
    

module.exports = {
    esUnRolValido,
    existeCorreo
}