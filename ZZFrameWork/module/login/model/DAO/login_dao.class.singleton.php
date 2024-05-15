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
}
