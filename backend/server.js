const express = require('express');
const cors = require ('cors');

//inicio de import de rutas
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const resetPassRoutes = require('./routes/restPass');
// fin de import rutas

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

// inicio rutas de los endpoint
app.use('/api', registerRoutes);
app.use(loginRoutes);
app.use(resetPassRoutes); // Asegúrate de usar el prefijo '/api' aquí también
//fin de rutas

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server iniciado en http://localhost:${PORT}`);
});