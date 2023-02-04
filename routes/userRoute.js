const { Router } = require('express');
const {check} = require('express-validator');
const {usersGet, usersPut,  usersPost, usersDelete} = require('../controllers/usersController');

const router = Router();

router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').isLength({min:8}),
    check('correo','El correo enviado no es valido').isEmail(),
    check('rol','El rol enviado no es valido').not().isIn(['ADMIN_ROL','USER_ROL']),
], usersPost );

router.delete('/', usersDelete );

module.exports = router;