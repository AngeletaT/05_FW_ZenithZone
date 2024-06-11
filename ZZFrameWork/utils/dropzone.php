<?php
$targetDir = "../view/uploads/avatar/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

$response = array();

if (isset($_FILES['file'])) {
    $name = basename($_FILES['file']['name']);
    $targetFilePath = $targetDir . $name;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
        $response['filePath'] = "/angela/ZZFrameWork" . $targetFilePath;
    } else {
        $response['error'] = "Error al subir el archivo: " . $name;
    }
} else {
    $response['error'] = "No se recibió ningún archivo.";
}

echo json_encode($response);
?>