const { response, request } = require('express');

const esAdminRol = (req = request, res = response, next) =>{
    // validacion previa del usuario autenticado
    if(!req.usuarioAutenticado){
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token primero'
        });
    }
    // validacion del rol del usuario es administraor y puede realizar la accion
    const {rol, nombre} = req.usuarioAutenticado;
    if ('ADMIN_ROL'!==rol) {
        return res.status(401).json({
            msg: `Usuario ${nombre} no es Administrador - Usuario su Rol : No es permitido`
        });
    }

    next();
}


module.exports={
    esAdminRol,
}