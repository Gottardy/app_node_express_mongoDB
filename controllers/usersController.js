const { request, response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');

const usersGet = (req = request, res = response) => {
    // Desesctruturando el query
    const { id, nombre,apellido = 'No Present', edad } = req.query;

    res.json({
    msg: 'get API - Controller',
    // query
    id,
    nombre,
    apellido,
    edad
  });
}

const usersPut = async (req = request, res = response) => {
    // Recibiendo el parametro 'id' de la ruta y utilizandolo
    const id = req.params.id;

    const { password, google, correo, ...restoDatos} = req.body;

    // Encriptar de nuevo la nueva contraseña 
    if (password) {
      const salt = bcrypt.genSaltSync(12);
      restoDatos.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, restoDatos);

    res.json({
    msg: 'put API - Controller',
    id,
    usuario
  });
}

const usersPost = async (req, res = response) => {
  
    // Desesctruturando el body
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(12);
    usuario.password = await bcrypt.hashSync(password, salt);

    // Guardar en la BD
    await usuario.save();

    res.json({
      msg: 'post API - Controller POST',
      usuario
    });
  }

const usersDelete = (req, res = response) => {
    res.json({
    msg: 'delete API - Controller'
  });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}