<?php
class cart_dao
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

    public function select_products($db, $code_prop)
    {
        // return "hola dao";

        $sql = "SELECT * 
        FROM products p JOIN property_product pp JOIN property prop
        WHERE p.code_prod=pp.code_prod
        AND pp.code_prop=prop.code_prop
        AND prop.code_prop=$code_prop;";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

}
?>