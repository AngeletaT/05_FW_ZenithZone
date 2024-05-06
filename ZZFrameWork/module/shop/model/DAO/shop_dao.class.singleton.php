<?php
class shop_dao
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

    public function select_data_filters_type($db)
    {
        // return "hola dao";

        $sql = "SELECT *
                FROM type";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_filters_city($db)
    {
        // return "hola dao";

        $sql = "SELECT *
                FROM city";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_filters_category($db)
    {
        // return "hola dao";

        $sql = "SELECT *
                FROM category";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_filters_activity($db)
    {
        // return "hola dao";

        $sql = "SELECT *
                FROM activity";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
}
?>