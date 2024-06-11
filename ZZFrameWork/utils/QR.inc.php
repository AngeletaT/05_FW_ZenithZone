<?php

require __DIR__ . '/vendor/autoload.php';

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\Label\Font\NotoSans;
use Endroid\QrCode\Writer\PngWriter;

class QR
{
     public static function createQR($pdf_url)
     {
          // return $pdf_url;
          $pdfurl = 'localhost/ZZFrameWork/' . $pdf_url;
          $qrCode = Builder::create()->writer(new PngWriter());
          $qrCode = $qrCode->writerOptions([]);
          $qrCode = $qrCode->data($pdfurl);
          $qrCode = $qrCode->encoding(new Encoding('UTF-8'));
          $qrCode = $qrCode->size(300);
          $qrCode = $qrCode->margin(10);
          $qrCode = $qrCode->labelText('Scan the code');
          $qrCode = $qrCode->labelFont(new NotoSans(20));
          $qrCode = $qrCode->build();
          $filename = pathinfo($pdf_url, PATHINFO_FILENAME);
          $savePath = SITE_ROOT . 'view/uploads/qrs/' . basename($filename) . '.png';
          if (!file_exists($savePath)) {
               $qrCode->saveToFile($savePath);
          }
          $QrPath = 'http://localhost/angela/ZZFrameWork/view/uploads/qrs/' . basename($filename) . '.png';
          return $QrPath;
     }
}