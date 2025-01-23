<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (you can specify a domain instead of "*")
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers (you can add more if needed)
header("Content-Type: application/json");

// Conexión a la base de datos
function connectMariaDB() {
    $host = '127.0.0.1';
    $user = 'cv_user';
    $password = 'password';
    $dbname = 'cv_db';

    $mysqli = new mysqli($host, $user, $password, $dbname);
    if ($mysqli->connect_error) {
        die("Error de conexión: " . $mysqli->connect_error);
    }
    return $mysqli;
}
?>
