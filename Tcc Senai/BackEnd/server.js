const express = require('express');
const cors = require('cors');  // Adicionado
const app = express();
const port = 3000;

// Middleware
app.use(cors());  // Permite requisições de origens diferentes
app.use(express.json());

// Suas rotas existentes
const clientsRoutes = require('./routes/clients');
app.use('/clients', clientsRoutes);

// Rota raiz e o resto do código...
app.get('/', (req, res) => {
  res.json({ message: 'Servidor de API funcionando' });
});

app.listen(port, () => {
  console.log(`Server funcionando em http://localhost:${port}`);
  console.log(`API de clientes em http://localhost:${port}/clients`);
});

module.exports = app;