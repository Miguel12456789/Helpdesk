const express = require('express');
const app = express();
const path = require('path');
const router = require('./router/router');

// Configura o EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // Updated path to the views directory

// Static file
app.use(express.static("src")); // Serve static files from the src folder

// Usa o roteador
app.use('/', router);

module.exports = app;