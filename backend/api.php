<?php

require_once 'connection.php';

header("Access-Control-Allow-Origin: *"); // Allow all origins (you can specify a domain instead of "*")
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers (you can add more if needed)
header("Content-Type: application/json");

function getFullCV($id_curriculum) {
    $mysqli = connectMariaDB();
    $data = [];

    $query = "SELECT * FROM cv_info WHERE id_curriculum = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $id_curriculum);
    $stmt->execute();
    $result = $stmt->get_result();
    $data['cv_info'] = $result->fetch_assoc();

    $tables = ['interests', 'languages', 'habilities', 'certifications', 'education', 'experiences'];
    foreach ($tables as $table) {
        $query = "SELECT * FROM $table WHERE id_curriculum = ?";
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("i", $id_curriculum);
        $stmt->execute();
        $result = $stmt->get_result();
        $data[$table] = $result->fetch_all(MYSQLI_ASSOC);
    }

    $stmt->close();
    $mysqli->close();

    return $data;
}

function updateCV($data) {
    $mysqli = connectMariaDB();
    $id_curriculum = $data['id_curriculum'];

    // Actualizar información básica del CV
    $query = "UPDATE cv_info SET name = ?, email = ?, phone = ?, location = ? WHERE id_curriculum = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("ssssi", $data['name'], $data['email'], $data['phone'], $data['location'], $id_curriculum);
    $stmt->execute();

    // Actualizar intereses
    updateTable($mysqli, 'interests', $id_curriculum, $data['interests']);

    // Actualizar idiomas
    updateTable($mysqli, 'languages', $id_curriculum, $data['languages']);

    // Actualizar habilidades
    updateTable($mysqli, 'habilities', $id_curriculum, $data['habilities']);

    // Actualizar certificaciones
    updateTable($mysqli, 'certifications', $id_curriculum, $data['certifications']);

    // Actualizar educación
    updateTable($mysqli, 'education', $id_curriculum, $data['education']);

    // Actualizar experiencias
    updateTable($mysqli, 'experiences', $id_curriculum, $data['experiences']);

    $stmt->close();
    $mysqli->close();

    return ["success" => true];
}

function updateTable($mysqli, $table, $id_curriculum, $data) {
    // Eliminar datos antiguos
    $query = "DELETE FROM $table WHERE id_curriculum = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $id_curriculum);
    $stmt->execute();

    // Insertar nuevos datos
    $items = explode(',', $data);
    foreach ($items as $item) {
        $item = trim($item);
        if ($item != '') {
            $query = "INSERT INTO $table (id_curriculum, name) VALUES (?, ?)";
            $stmt = $mysqli->prepare($query);
            $stmt->bind_param("is", $id_curriculum, $item);
            $stmt->execute();
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id_curriculum'])) {
        $id_curriculum = intval($_GET['id_curriculum']);
        echo json_encode(getFullCV($id_curriculum));
    } else {
        echo json_encode(["error" => "Falta el parámetro id_curriculum"]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($data) {
        echo json_encode(updateCV($data));
    } else {
        echo json_encode(["error" => "Datos incompletos o incorrectos"]);
    }
}
?>
