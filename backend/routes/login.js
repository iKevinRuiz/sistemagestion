// routes/login.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/conection'); // Asegúrate de que la conexión a la base de datos esté correcta

const router = express.Router();

// Ruta de login
router.post('/users/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ?';

    db.query(query, [email], async (err, user) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (user.length === 0) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        const isMatch = await bcrypt.compare(password, user[0].pass);
        if (!isMatch) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Crear el token JWT
        const token = jwt.sign(
            { userId: user[0].idUser, role: user[0].idRole },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Devolver el token y el rol
        return res.json({
            token,
            role: user[0].idRole, // Incluir el idRole en la respuesta
        });
    });
});

module.exports = router;
