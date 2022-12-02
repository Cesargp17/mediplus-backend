const { Router } = require('express');
const { getAreas, crearArea, eliminarArea } = require('../controllers/areas');
const router = Router();


router.get('/', getAreas)

router.post('/', crearArea)

router.delete('/:id', eliminarArea)

module.exports = router;