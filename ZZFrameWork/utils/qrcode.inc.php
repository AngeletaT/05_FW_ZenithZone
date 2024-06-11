<?php
require 'vendor/autoload.php';

use Endroid\QrCode\Builder\Builder;

function generateInvoiceQR($invoiceData)
{
    $qrContent = 'Factura para ' . $invoiceData['cliente'] . ' con total de ' . $invoiceData['total'];

    // Genera el QR
    $result = Builder::create()
        ->data($qrContent)
        ->size(300)
        ->build();

    // Guarda la imagen del QR en un archivo
    $result->saveToFile('factura_qr.png');

    // Muestra el QR en el navegador
    header('Content-Type: ' . $result->getMimeType());
    echo $result->getString();
}

// Datos de ejemplo para la factura
$invoiceData = [
    'cliente' => 'John Doe',
    'fecha' => '2023-06-01',
    'total' => '25.00'
];

// Genera el código QR de la factura
generateInvoiceQR($invoiceData);
?>