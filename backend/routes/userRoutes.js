const express = require('express');
const router = express.Router();
const db = require('../config/conection');  // Conexión a la base de datos MySQL

// Ruta para obtener todos los usuarios
router.get('/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    res.json(results); // Devolver los resultados en formato JSON
  });
});

// Ruta para editar un usuario
router.put('/usuarios/editar/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, phone, direccion, municipio } = req.body;

  console.log('Datos recibidos para actualizar:', { id, nombre, apellido, email, phone, direccion, municipio });

  const query = `
    UPDATE usuarios
    SET nombre = ?, apellido = ?, email = ?, phone = ?, direccion = ?, municipio = ?
    WHERE idUser = ?
  `;
  
  db.query(query, [nombre, apellido, email, phone, direccion, municipio, id], (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta de actualización:', err);
      return res.status(500).json({ error: 'Error al editar el usuario' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

// Ruta para consultar un usuario por ID
router.get('/usuarios/consultar/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM usuarios WHERE idUser = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta de consulta:', err);
      return res.status(500).json({ error: 'Error al consultar el usuario' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result[0]); // Devolver los datos del usuario
  });
});

// Ruta para inhabilitar un usuario
router.put('/usuarios/inhabilitar/:id', (req, res) => {
  const { id } = req.params;

  const query = 'UPDATE usuarios SET estado = "inhabilitado" WHERE idUser = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta de inhabilitación:', err);
      return res.status(500).json({ error: 'Error al inhabilitar el usuario' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario inhabilitado correctamente' });
  });
});

module.exports = router;
