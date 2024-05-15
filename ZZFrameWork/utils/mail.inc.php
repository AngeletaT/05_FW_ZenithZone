<?php
require __DIR__ . '/vendor/autoload.php';
class mail
{
    public static function send_email($email)
    {
        switch ($email['type']) {
            case 'validate';
                $email['inputMatter'] = 'Email verification';
                $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/angela/ZZFrameWork/login/verify/$email[token]'>Click here for verify your email.</a>";
                break;
            case 'recover';
                $email['inputMatter'] = 'Recover password';
                $email['inputMessage'] = "<a href='http://localhost/angela/ZZFrameWork/login/recover/$email[token]'>Click here for recover your password.</a>";
                break;
        }
        return self::send_resend($email);
    }

    public static function send_resend($values)
    {
        $resend = parse_ini_file(UTILS . "constantes.ini");
        $api_key = $resend['MAIL_API_KEY'];

        $resendClient = Resend::client($api_key);

        try {
            $result = $resendClient->emails->send([
                'from' => $values['fromEmail'],
                'to' => [$values['toEmail']],
                'subject' => $values['inputMatter'],
                'html' => $values['inputMessage'],
            ]);
        } catch (\Exception $e) {
            exit('Error: ' . $e->getMessage());
        }

        return $result->toJson();
    }
}


