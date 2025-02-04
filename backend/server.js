const express = require('express');
const cors = require('cors');

// Importa las rutas
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const resetPassRoutes = require('./routes/restPass');
const userRoutes = require('./routes/userRouter'); // Asegúrate de importar las rutas de usuarios correctamente

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

// Rutas de los endpoints
app.use('/api', registerRoutes);
app.use(loginRoutes);
app.use(resetPassRoutes);
app.use('/api', userRoutes); // Aquí estamos usando el prefijo "/api" para las rutas de usuarios

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server iniciado en http://localhost:${PORT}`);
});
