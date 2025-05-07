const express = require('express');
const cors = require('cors');
const sequelize = require('./db/conn');
const UserRoutes = require('./routes/UserRoutes');
const IgrejaRouter = require('./routes/IgrejaRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

const app = express();
const port = 2000;

// Configurar JSON response
app.use(express.json());

// Habilitar CORS para o front-end
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Pasta pública para imagens
app.use(express.static('public'));

// Rotas de API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/v1/users', UserRoutes);
app.use('/v1/igrejas', IgrejaRouter);

// Conexão com o banco de dados
sequelize;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Swagger disponível em http://localhost:${port}/api-docs`);
});
