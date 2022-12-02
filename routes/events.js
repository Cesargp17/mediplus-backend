const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { getEventos, crearEventos, actualizarEvento, eliminarEvento, obtenerUsuarios, obtenerCitas } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/usuarios', obtenerUsuarios);
router.use( validarJWT );

router.get('/', getEventos);
router.get('/citas', validarJWT, obtenerCitas);

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ]
    ,crearEventos
    );

router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento);

router.delete('/:id' ,eliminarEvento);

module.exports = router;