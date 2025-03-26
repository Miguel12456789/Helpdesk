const express = require('express');
const app = express();
const path = require('path');
const router = require('./router/router');

// Configura o EJS como motor de visualização
app.set('view engine', 'ejs');

// Static file
app.use(express.static("public")); // Serve static files from the public folder
app.use(express.static("src")); // Serve static files from the src folder



// Usa o roteador
app.use('/', router);

module.exports = app;