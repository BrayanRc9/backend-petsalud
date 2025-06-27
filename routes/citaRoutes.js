const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  crearCita,
  obtenerCitas,
  eliminarCita
} = require('../controllers/citaController');

router.post('/', authMiddleware, crearCita);
router.get('/', authMiddleware, obtenerCitas);
router.delete('/:id', authMiddleware, eliminarCita);

module.exports = router;
