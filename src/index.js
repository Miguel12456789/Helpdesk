const express = require('express');
const app = express();
const path = require('path');
const router = require('./router/router');

// Configura o EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // Garante o caminho correto para as views

// Static file
app.use(express.static("public")); // Serve static files from the public folder
app.use(express.static("src")); // Serve static files from the src folder

// Usa o roteador
app.use('/', router);

// Middleware para erro 404
app.use((req, res) => {
    res.status(404).render("components/404"); // Renderiza a página 404.ejs
});

module.exports = app;