<?php
// Lê o arquivo .env
$dotenv = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

// Carrega as variáveis de ambiente
foreach ($dotenv as $line) {
    putenv(trim($line));
}

// Obtém as variáveis
$host = getenv('HOST') ?: 'localhost';
$port = getenv('PORT') ?: '5000';

// Inicia o servidor embutido do PHP
echo "Iniciando o servidor em http://$host:$port\n";
exec("php -S $host:$port");
