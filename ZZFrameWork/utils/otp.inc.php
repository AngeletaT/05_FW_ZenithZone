<?php
require __DIR__ . '/vendor/autoload.php';
class otp
{
    public static function send_message($message)
    {
        switch ($message['type']) {
            case 'validate_pass';
                $message['inputMessage'] = "Use the following code to verify your email: $message[token]. Remember not to share this information with anyone.";
                break;
            case 'fail_login';
                $message['inputMessage'] = "Use the following code to verify your identity: $message[token]. Remember not to share this information with anyone.";
                break;
        }
        return self::send_otp($message);
    }

    public static function send_otp($values)
    {
        $otp = parse_ini_file(UTILS . "constantes.ini");
        $ultramsg_token = $otp['OTP_TOKEN'];
        $instance_id = $otp['OTP_INSTANCE'];
        $client = new UltraMsg\WhatsAppApi($ultramsg_token, $instance_id);

        $to = $otp['OTP_PHONE'];
        $body = $values['inputMessage'];
        $api = $client->sendChatMessage($to, $body);
        return json_encode($api);
    }
}