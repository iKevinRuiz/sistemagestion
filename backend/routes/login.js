const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/conection');  // Asegúrate de que la conexión con la base de datos esté correcta

const router = express.Router();

router.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;

    // Validación de parámetros requeridos
    if (!email || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ?';

    db.query(query, [email], async (err, result) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        // Verificar si el usuario existe
        if (result.length === 0) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        const user = result[0];

        // Verificar si el usuario está inhabilitado
        if (user.estado.toLowerCase() === 'inhabilitado') {
            return res.status(403).json({ message: 'Usuario inhabilitado. Contacte al administrador.' });
        }

        // Verificar la contraseña usando bcrypt
        const isMatch = await bcrypt.compare(password, user.pass);
        if (!isMatch) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Crear el token JWT
        const token = jwt.sign(
            { userId: user.idUser, role: user.idRole, firstName: user.firstName },
            process.env.JWT_SECRET,  // Asegúrate de que el JWT_SECRET esté configurado correctamente
            { expiresIn: '1h' }  // Expiración del token
        );

        // Devolver el token y datos adicionales si es necesario
        return res.json({
            token,
            role: user.idRole,
            firstName: user.firstName,  // Asegúrate de incluir este campo en la respuesta
            email: user.email,
            idUser: user.idUser
        });
    });
});

module.exports = router;
