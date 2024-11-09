// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Importar rutas de los diferentes módulos
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const resetPassRoutes = require('./routes/restPass');
const infUsuario = require('./routes/userRoutes');

const app = express();

// Configuración de CORS
app.use(cors());

// Configurar para que Express use JSON en las peticiones
app.use(express.json());

// Cargar las variables de entorno
dotenv.config();

// Rutas de la API
app.use('/api', registerRoutes);
app.use('/api', loginRoutes);       // Asegúrate de que loginRoutes esté correctamente configurado
app.use('/api', resetPassRoutes);
app.use('/api', infUsuario);        // Ruta para la gestión de usuarios

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
