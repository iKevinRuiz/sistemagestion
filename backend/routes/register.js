const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/conection'); // Importar la conexión a la base de datos

const router = express.Router();

// Endpoint para registrar un nuevo usuario
router.post('/users/register', async (req, res) => {
    const { cedula, nombre, apellido, email, password, phone, direccion, idRole, municipio } = req.body;

    // Verificar los datos recibidos
    console.log('Datos recibidos en el backend:', { cedula, nombre, apellido, email, phone, direccion, idRole, municipio });

    // Validar campos obligatorios
    if (!cedula || !nombre || !apellido || !email || !password || !phone || !direccion || !municipio) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Consulta SQL para insertar el nuevo usuario, ahora incluyendo el campo 'municipio'
        const query = `INSERT INTO usuarios (idRole, cedula, nombre, apellido, email, pass, phone, direccion, municipio, createdAt, updatedAt) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;

        const values = [idRole, cedula, nombre, apellido, email, hashedPassword, phone, direccion, municipio];

        // Ejecutar la consulta de inserción utilizando Promesas con mysql2
        const [result] = await db.promise().execute(query, values);

        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
    } catch (err) {
        console.error('Error al crear el usuario:', err);
        res.status(500).json({ message: 'Error al procesar la solicitud', error: err.message });
    }
});

module.exports = router;
