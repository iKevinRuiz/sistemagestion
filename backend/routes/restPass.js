const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/conection');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Función para enviar el correo de recuperación
const sendRecoveryEmail = (email, token) => {
    const recoveryLink = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace para restablecer tu contraseña:\n\n${recoveryLink}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error al enviar el correo:', err);
                reject('Error al enviar el correo');
            } else {
                console.log('Correo de recuperación enviado:', info.response);
                resolve('Correo de recuperación enviado');
            }
        });
    });
};


// Endpoint para solicitar la recuperación de la contraseña
router.post('/api/users/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Por favor, ingrese un correo válido' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], async (err, user) => {
        if (err) {
            console.error('Error al verificar el correo:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (user.length === 0) {
            return res.status(400).json({ message: 'Correo no encontrado' });
        }

        const token = jwt.sign({ userId: user[0].idUser }, process.env.JWT_SECRET, { expiresIn: '1h' });

        try {
            await sendRecoveryEmail(email, token);
            return res.json({ message: 'Correo de recuperación enviado, revisa tu bandeja de entrada.' });
        } catch (error) {
            return res.status(500).json({ message: 'Hubo un error al enviar el correo. Verifique si el correo es válido.' });
        }
    });
});

// Endpoint para restablecer la contraseña
router.post('/api/users/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ message: 'Por favor ingrese una nueva contraseña' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const query = 'UPDATE usuarios SET pass = ? WHERE idUser = ?';
        db.query(query, [hashedPassword, decoded.userId], (err, result) => {
            if (err) {
                console.error('Error al actualizar la contraseña:', err);
                return res.status(500).json({ message: 'Error al actualizar la contraseña' });
            }

            return res.json({ message: 'Contraseña actualizada correctamente' });
        });
    } catch (err) {
        console.error('Token inválido o expirado', err);
        return res.status(400).json({ message: 'Token inválido o expirado' });
    }
});

module.exports = router;
