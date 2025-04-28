const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Financeiro',
            version: '1.0.1',
            description: 'Documentação da API para gerenciamento financeiro Swagger',
        },
        servers: [
            {
                url: 'http://localhost:2000/',
                description: 'Servidor local'
            }
        ],
        components: {
            securitySchemes: {
                api_key: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [], 
            }
        ]
    },
    apis: ['./routes/*.js'], // Define onde estão as rotas documentadas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
