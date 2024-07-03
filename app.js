const express = require('express');
const dogsRouter = require('./routes/dogs');
const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());

app.use('/', indexRouter);
app.use('/dogs', dogsRouter);

module.exports = app;
