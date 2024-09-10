const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware para procesar JSON
app.use(express.json());

// Configuración de CORS
app.use(cors());

// Usar las rutas CRUD
app.use('/', itemRoutes);

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
