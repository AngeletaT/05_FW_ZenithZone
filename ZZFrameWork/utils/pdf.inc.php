<?php
require __DIR__ . '/vendor/autoload.php';

use Dompdf\Dompdf;

class pdf
{

    public static function create_pdf()
    {
        return new Dompdf();
    }

    public static function generatePDF($invoiceData)
    {

        // return 'hola desde pdf.inc.php';
        $save_path = 'C:/xampp/htdocs/angela/ZZFrameWork/view/uploads/pdfs/';
        $html = self::create_html($invoiceData);
        $dompdf = self::create_pdf();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $output = $dompdf->output();
        $name_pdf = 'ZenithZone_Invoice_' . $invoiceData['order'] . '.pdf';
        $file_path = $save_path . $name_pdf;
        file_put_contents($file_path, $output);
        return ['invoice' => 'view/uploads/pdfs/' . $name_pdf];
    }

    public static function create_html($invoiceData)
    {
        $order = $invoiceData['order'];
        $clientData = $invoiceData['cliente'][0];
        $products = $invoiceData['productos'];
        $propertyData = $invoiceData['propiedad'][0][0];

        $html = '<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Factura</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    table th {
                        background-color: #f2f2f2;
                    }
                    table th, table td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                </style>
                </head>
                <body>
                    <img src="/view/img/logo/LogoZZREBlack.png/logo/LogoZZREBlack.png" alt="ZenithZone">
                    <h1>Factura</h1>
                    <h2>Cliente: ' . $clientData['name'] . $clientData['surname'] . '</h2>
                    <h3>Dirección: ' . $clientData['city'] . '</h3>
                    <h3>Teléfono: ' . $clientData['phone_number'] . '</h3>
                    <h3>Email: ' . $clientData['email'] . '</h3>
                    <h3>Orden: ' . $order . '</h3>
                    <br>
                    <h3>Propiedad: ' . $propertyData['name_prop'] . '</h3>
                    <h4>Descripción: ' . $propertyData['description'] . '</h4>
                    <h3>Precio: ' . $propertyData['price'] . '€</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>';

        foreach ($products as $product) {
            $html .= '<tr>
                            <td>' . $product[0]['name_prod'] . '</td>
                            <td>' . $product[0]['price_prod'] . '€</td>
                          </tr>';
        }

        $html .= '</tbody>
                        </table>
                        <br>
                        <h3>Resumen</h3>
                        <br>';
        $total = 0;
        foreach ($products as $product) {
            $price = $product[0]['price_prod'];
            $total += $price;
        }

        $html .= '<table>
                                <tr>
                                    <td><b>Subtotal</b></td>
                                    <td>' . $total . '€</td>
                                </tr>
                                <tr>
                                    <td>IVA</td>
                                    <td>' . $total * 0.21 . '€</td>
                                </tr>
                                <tr>
                                    <td><b>Total</b></td>
                                    <td><b>' . $total * 1.21 . '€<b></td>
                                </tr>
                        </table>
                    </body>
                </html>';

        return $html;
    }
}