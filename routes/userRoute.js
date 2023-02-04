const { Router } = require('express');
const {check} = require('express-validator');
const {usersGet, usersPut,  usersPost, usersDelete} = require('../controllers/usersController');
const { esUnRolValido } = require('../DB/validators.db');


const { validarParametros } = require('../middlewares/validarCampos');

const router = Router();

router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y debe ser más de 8 letras').isLength({min:8}),
    check('correo','El correo enviado no es valido').isEmail(),
    // check('rol','El rol enviado no es valido').isIn(['ADMIN_ROL','USER_ROL']),
    check('rol').custom( esUnRolValido ),
    validarParametros
], usersPost );

router.delete('/', usersDelete );

module.exports = router;