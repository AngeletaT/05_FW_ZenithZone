<?php
class profile_dao
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

    public function select_data_user($db, $username)
    {
        // return 'hola dao';
        $sql = "SELECT * 
        FROM users 
        WHERE username = '$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_user_name($db, $username, $name)
    {
        $sql = "UPDATE users 
        SET name = '$name' 
        WHERE username = '$username'";

        $db->ejecutar($sql);
    }

    public function update_user_surname($db, $username, $surname)
    {
        $sql = "UPDATE users 
        SET surname = '$surname' 
        WHERE username = '$username'";

        $db->ejecutar($sql);
    }

    public function update_user_phone($db, $username, $phone)
    {
        $sql = "UPDATE users 
        SET phone_number = '$phone' 
        WHERE username = '$username'";

        $db->ejecutar($sql);
    }

    public function update_user_city($db, $username, $city)
    {
        $sql = "UPDATE users 
        SET city = '$city' 
        WHERE username = '$username'";

        $db->ejecutar($sql);
    }

}