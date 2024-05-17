<?php
class middleware
{

    public static function decode_token($token)
    {
        $jwt = parse_ini_file(UTILS . "constantes.ini");
        $secret = $jwt['JWT_SECRET'];

        $JWT = new JWT;
        $token_dec = $JWT->decode($token, $secret);

        $rt_token = json_decode($token_dec, TRUE);
        return $rt_token;
    }

    public static function decode_token_email($token)
    {
        $jwt = parse_ini_file(UTILS . "constantes.ini");
        $secret = $jwt['JWT_SECRET'];

        $JWT = new JWT;
        $token_dec = $JWT->decode($token, $secret);

        $rt_token = json_decode($token_dec, TRUE);
        return $rt_token;
    }

    public static function create_token($username)
    {
        $jwt = parse_ini_file(UTILS . "constantes.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        $payload = '{"iat":"' . time() . '","exp":"' . time() + (6000) . '","username":"' . $username . '"}';

        $JWT = new JWT;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }

    public static function create_refresh_token($username)
    {
        $jwt = parse_ini_file(UTILS . "constantes.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        $payload = '{"iat":"' . time() . '","exp":"' . time() + (8000) . '","username":"' . $username . '"}';

        $JWT = new JWT;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }

    public static function create_token_email($email)
    {
        $jwt = parse_ini_file(UTILS . "constantes.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        $payload = '{"iat":"' . time() . '","exp":"' . time() + (6000) . '","email":"' . $email . '"}';
        $JWT = new JWT;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }
}