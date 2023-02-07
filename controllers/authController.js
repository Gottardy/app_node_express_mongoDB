const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const loginAuth = async (req = request, res = response) => {
    console.log('POST sended login');

    const {correo, password} = req.body;

    try {
        // verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'El usuario / password no son correctos - correo'
            });
        }

        // El usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'El usuario / password no son correctos - usuario'
            }); 
        }

        // Verificar la costraseña
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg:'El usuario / password no son correctos - password'
            }); 
        }

        // Generar el Token JWT

        res.json({
            msg:'Login Ok'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Contacte al administrador del Login'
        });
    }
}


module.exports = {
    loginAuth,
}