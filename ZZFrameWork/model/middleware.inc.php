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
        return $rt_token["username"];
    }

    public static function create_token($username)
    {
        $jwt = parse_ini_file(UTILS . "constantes.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        $payload = '{"iat":"' . time() . '","exp":"' . time() + (600) . '","username":"' . $username . '"}';

        $JWT = new JWT;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }

    public static function create_refresh_token($username)
    {
        $jwt = parse_ini_file(UTILS . "constantes.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        $payload = '{"iat":"' . time() . '","exp":"' . time() + (800) . '","username":"' . $username . '"}';

        $JWT = new JWT;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }

    public static function create_token_email($email)
    {
        $jwt = parse_ini_file(UTILS . "constantes.ini");
        $header = $jwt['JWT_HEADER'];
        $secret = $jwt['JWT_SECRET'];
        $payload = '{"iat":"' . time() . '","exp":"' . time() + (600) . '","email":"' . $email . '"}';
        $JWT = new JWT;
        $token = $JWT->encode($header, $payload, $secret);
        return $token;
    }
}