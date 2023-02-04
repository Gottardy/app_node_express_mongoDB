const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const usersGet = (req = request, res = response) => {
    // const query = req.query
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

const usersPut = (req = request, res = response) => {
    // Recibiendo el parametro 'id' de la ruta y utilizandolo
    const id = req.params.id;

    res.json({
    msg: 'put API - Controller',
    id
  });
}

const usersPost = async (req, res = response) => {
  
    // const body = req.body;
    // const usuario = new Usuario(body);
    // Desesctruturando el body
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    //Verificar si el correo existe

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(12);
    usuario.password = await bcrypt.hashSync(password, salt);

    // Guardar en la BD
    await usuario.save();

    res.json({
      msg: 'post API - Controller POST',
    //   body que se recibe 
    // nombre,
    // correo
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