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

    public function select_data_user($db)
    {
        $sql = 'SELECT * FROM users';

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_user($db, $username, $email)
    {
        $sql = "SELECT * 
        FROM users 
        WHERE username = '$username' OR email = '$email'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function insert_user($db, $username, $email, $hashed_pass, $avatar, $token_email)
    {
        // return 'hola dao insert_user';
        $sql = "INSERT INTO `users`(`username`, `password`, `email`, `type_user`, `avatar`, `token_email`, `isActive`) 
        VALUES ('$username','$hashed_pass','$email','client','$avatar','$token_email','0');";


        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_verify_email($db, $token_email)
    {
        $sql = "SELECT * 
        FROM users 
        WHERE token_email = '$token_email'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_verify_email($db, $token_email)
    {
        $sql = "UPDATE `users` 
        SET `isActive` = '1' 
        WHERE `token_email` = '$token_email'";

        $stmt = $db->ejecutar($sql);
        return "update";
    }
}
