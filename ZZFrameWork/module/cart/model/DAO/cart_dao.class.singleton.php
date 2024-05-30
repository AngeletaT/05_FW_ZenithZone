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
    // BASICS
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
    public function count_products($db, $username)
    {
        // return "hola dao";
        $sql = "SELECT COUNT(*) as 'count'
        FROM `cart` 
        WHERE `name_user`='$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    // CONSTRUIR CARRITO
    public function check_product($db, $code_prod, $username)
    {
        $sql = "SELECT * 
        FROM `cart` 
        WHERE `name_user`='$username' 
        AND `code_prod`='$code_prod'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function update_product($db, $code_prod, $username)
    {
        $sql = "UPDATE `cart` 
        SET `quantity`=`quantity`+1 
        WHERE `name_user`='$username' 
        AND `code_prod`='$code_prod'";

        $stmt = $db->ejecutar($sql);
        return 'updated';
    }
    public function add_product($db, $code_prod, $username)
    {
        $sql = "INSERT INTO `cart`(`name_user`, `code_prod`, `quantity`) VALUES 
        ('$username','$code_prod','1')";

        $stmt = $db->ejecutar($sql);
        return 'added';
    }

    public function remove_product($db, $code_prod, $username)
    {
        $sql = "UPDATE `cart` 
        SET `quantity`=`quantity`-1 
        WHERE `name_user`='$username' 
        AND `code_prod`='$code_prod'";

        $stmt = $db->ejecutar($sql);
        return 'deleted';
    }

}
?>