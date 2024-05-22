<?php
require __DIR__ . '/vendor/autoload.php';
class mail
{
    public static function send_email($message)
    {
        switch ($message['type']) {
            case 'validate';
                $message['inputMatter'] = 'Email verification';
                $message['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/angela/ZZFrameWork/login/verify/$message[token]'>Click here for verify your email.</a>";
                break;
            case 'recover';
                $message['inputMatter'] = 'Recover password';
                $message['inputMessage'] = "<a href='http://localhost/angela/ZZFrameWork/login/recover/$message[token]'>Click here for recover your password.</a>";
                break;
        }
        return self::send_resend($message);
    }

    public static function send_resend($values)
    {
        $resend = parse_ini_file(UTILS . "constantes.ini");
        $api_key = $resend['MAIL_API_KEY'];

        $resendClient = Resend::client($api_key);

        try {
            $result = $resendClient->emails->send([
                'from' => $resend['MAIL_FROM'],
                'to' => $resend['MAIL_TO'],
                'subject' => $values['inputMatter'],
                'html' => $values['inputMessage'],
            ]);
        } catch (\Exception $e) {
            exit('Error: ' . $e->getMessage());
        }

        return $result->toJson();
    }
}


