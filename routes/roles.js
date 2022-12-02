const { Router } = require('express');
const { getRoles, crearRol, eliminarRol } = require('../controllers/roles');
const router = Router();


router.get('/', getRoles)

router.post('/', crearRol)

router.delete('/:id', eliminarRol)

module.exports = router;