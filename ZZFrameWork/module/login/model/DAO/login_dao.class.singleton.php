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
    public function insert_user($db, $username, $email, $hashed_pass, $avatar)
    {
        // return 'hola dao insert_user';
        $sql = "INSERT INTO `users`(`username`, `password`, `email`, `type_user`, `avatar`, `isActive`) 
        VALUES ('$username','$hashed_pass','$email','client','$avatar','0');";


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

    // RECOVER PASSWORD
    public function select_recover_password($db, $email)
    {
        $sql = "SELECT email 
        FROM users 
        WHERE email = '$email' AND password NOT LIKE ('')";

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
