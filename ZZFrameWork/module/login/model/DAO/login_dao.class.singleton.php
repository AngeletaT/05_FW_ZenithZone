<?php
class login_dao
{
    static $_instance;

    private function __construct()
    {
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    // REGISTER
    public function insert_user($db, $id_user, $username, $email, $hashed_pass, $avatar)
    {
        // return 'hola dao insert_user';
        $sql = "INSERT INTO `users`(`id_user`, `username`, `password`, `email`, `type_user`, `avatar`, `isActive`) 
        VALUES ('$id_user','$username','$hashed_pass','$email','client','$avatar','0');";


        $stmt = $db->ejecutar($sql);
        return "insert";
    }

    public function select_verify_email($db, $email)
    {
        $sql = "SELECT email 
        FROM users 
        WHERE email = '$email' AND isActive = '0'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_verify_email($db, $email)
    {
        $sql = "UPDATE `users` 
        SET `isActive` = '1'
        WHERE `email` = '$email'";

        $stmt = $db->ejecutar($sql);
        return "update";
    }

    // LOGIN
    public function select_data_user($db, $username)
    {
        $sql = "SELECT * 
        FROM users 
        WHERE username = '$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_login_attempts($db, $username)
    {
        $sql = "SELECT * 
        FROM users 
        WHERE username = '$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_login_attempts($db, $username)
    {
        $sql = "UPDATE `users` 
        SET `login_attempts` = login_attempts + 1
        WHERE `username` = '$username'";

        $stmt = $db->ejecutar($sql);
        return "update";
    }

    // OTP
    public function insert_otp_token($db, $username, $otp_token)
    {
        $sql = "UPDATE `users` 
        SET `token_otp` = '$otp_token'
        WHERE `username` = '$username'";

        $stmt = $db->ejecutar($sql);
        return "update";
    }

    public function select_otp_token($db, $username, $otp_token)
    {
        $sql = "SELECT * 
        FROM users 
        WHERE username = '$username' AND token_otp = '$otp_token'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_otp_token($db, $username)
    {
        $sql = "UPDATE `users` 
        SET `token_otp` = '', login_attempts = 0
        WHERE `username` = '$username'";

        $stmt = $db->ejecutar($sql);
        return "update";
    }

    // SOCIAL LOGIN
    public function select_user($db, $username, $email)
    {
        $sql = "SELECT * 
        FROM users 
        WHERE username = '$username' OR email = '$email'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    // SOCIAL LOGIN

    public function insert_social_login($db, $id_user, $username, $email, $login_type, $avatar)
    {
        $sql = "INSERT INTO `users`(`id_user`, `username`, `password`, `email`, `type_user`, `avatar`, `phone_number`, `login_attempts`, `token_email`, `token_otp`, `isActive`, `login_type`) 
        VALUES ('$id_user','$username','','$email','client','$avatar','','','','','0','$login_type');";

        $stmt = $db->ejecutar($sql);
        return "insert";

    }

    public function select_user_social($db, $username, $email, $login_type)
    {
        $sql = "SELECT * 
        FROM users 
        WHERE username = '$username' 
        OR email = '$email' 
        AND login_type LIKE ('$login_type')";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    // RECOVER PASSWORD
    public function select_recover_password($db, $email)
    {
        $sql = "SELECT email 
        FROM users 
        WHERE email = '$email' AND password NOT LIKE ('') AND isActive = '1'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_recover_password($db, $email, $token_email)
    {
        $sql = "UPDATE `users` 
        SET `token_email` = '$token_email', `isActive` = '0'
        WHERE `email` = '$email'";

        $stmt = $db->ejecutar($sql);
        return "update";
    }

    public function update_new_password($db, $email, $hashed_pass)
    {
        $sql = "UPDATE `users` 
        SET `password` = '$hashed_pass', `isActive` = '1', `token_email` = ''
        WHERE `email` = '$email'";

        $stmt = $db->ejecutar($sql);
        return "update";
    }
}
