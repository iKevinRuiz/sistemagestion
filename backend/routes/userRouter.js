const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/conection'); // Asegúrate de que la conexión sea correcta

const router = express.Router(); 

// Middleware para autenticar el token JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extrae el token
    if (!token) return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido.' });
        req.user = decoded; // Almacena los datos del usuario en req.user
        next();
    });
} 

// Ruta para obtener todos los usuarios
router.get('/users/all', authenticateToken, (req, res) => {
    const query = 'SELECT idUser, nombre AS firstName, apellido AS lastName, email, idRole, cedula, phone, direccion, municipio, estado FROM usuarios';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al recuperar los datos de los usuarios:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        return res.json(results); // Devuelve todos los datos de los usuarios
    });
});

// Ruta para obtener un usuario por ID
router.get('/users/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    const query = 'SELECT idUser, nombre AS firstName, apellido AS lastName, email, idRole, cedula, phone, direccion, municipio, estado FROM usuarios WHERE idUser = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al recuperar los datos del usuario:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.json(results[0]); // Devuelve los datos del usuario
    });
});

// Ruta para actualizar un usuario
router.put('/users/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, direccion, municipio, estado } = req.body;

    const query = `UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, phone = ?, direccion = ?, municipio = ?, estado = ? WHERE idUser = ?`;

    db.query(query, [firstName, lastName, email, phone, direccion, municipio, estado, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar los datos del usuario:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.json({ message: 'Usuario actualizado correctamente' });
    });
});

// Ruta para inhabilitar un usuario
router.put('/users/inhabilitar/:id', authenticateToken, (req, res) => {
    const { id } = req.params;

    const query = `UPDATE usuarios SET estado = 'inhabilitado' WHERE idUser = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al inhabilitar el usuario:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.json({ message: 'Usuario inhabilitado correctamente' });
    });
});

module.exports = router;
