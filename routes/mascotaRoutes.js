const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  crearMascota,
  obtenerMisMascotas,
  eliminarMascota
} = require('../controllers/mascotaController');

router.post('/', authMiddleware, crearMascota);
router.get('/', authMiddleware, obtenerMisMascotas);
router.delete('/:id', authMiddleware, eliminarMascota);

module.exports = router;
