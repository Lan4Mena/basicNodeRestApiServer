const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getMethod, postMethod, putMethod, deleteMethod } = require('../controllers/user.controller');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getMethod);
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe ser mínimo de 6 carateres').isLength({ min: 6 }),
        check('correo', 'Formato de correo invalido').isEmail(),
        check('correo').custom(emailExiste),
        // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom(esRoleValido),
        validarCampos
    ], postMethod);
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], putMethod);
router.delete('/:id', deleteMethod);

module.exports = router;