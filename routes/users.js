const { Router } = require('express');
const { editarUsuarios, eliminarUsuario } = require('../controllers/users');
const router = Router();


router.put('/:id', editarUsuarios)
router.delete('/:id', eliminarUsuario)

module.exports = router;