const express = require('express');
const dogsRouter = require('./routes/dogs');
const indexRouter = require('./routes/index');
const swagger = require('./swagger');

const app = express();


app.use(express.json());

app.use('/', indexRouter);
app.use('/dogs', dogsRouter);
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs));

module.exports = app;
