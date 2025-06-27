const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  agregarInsumo,
  obtenerInsumos,
  actualizarInsumo,
  eliminarInsumo
} = require('../controllers/inventarioController');

router.post('/', authMiddleware, agregarInsumo);
router.get('/', authMiddleware, obtenerInsumos);
router.put('/:id', authMiddleware, actualizarInsumo);
router.delete('/:id', authMiddleware, eliminarInsumo);

module.exports = router;
