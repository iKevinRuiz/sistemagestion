// usuarios.js
const express = require('express');
const db = require('../config/conection'); // Importar la conexión a la base de datos

const router = express.Router();

// Endpoint para obtener todos los usuarios
router.get('/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    res.json(results);
  });
});

module.exports = router;
