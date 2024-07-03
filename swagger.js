const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0', 
        info: {
            title: 'Dog Breeds API',
            version: '1.4.2',
            description: "This is a small read-only API which stores different dog breeds register by the FCI and it's base data was recovered from Pavel Ivashkov's repository containing a CSV with dog breeds data scrapped from the official FCI website.",
        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
