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
        WHERE `name_user`='$username'
        AND `quantity`>0;";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    // CONSTRUIR CARRITO
    public function check_property($db, $code_prop, $username)
    {
        $sql = "SELECT * 
        FROM `cart_prop` 
        WHERE `name_user`='$username' 
        AND `code_prop`='$code_prop'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function check_property_cart($db, $username)
    {
        $sql = "SELECT * 
        FROM `cart_prop` 
        WHERE `name_user`='$username'";


        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_property($db, $code_prop)
    {
        $sql = "SELECT * 
        FROM `property` 
        WHERE `code_prop`='$code_prop'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function addcart_property($db, $code_prop, $username, $name_prop, $price)
    {
        $sql = "INSERT INTO `cart_prop`(`code_prop`, `name_user`, `name_prop`, `price`) VALUES 
        ('$code_prop', '$username', '$name_prop', '$price')";

        $stmt = $db->ejecutar($sql);
        return 'added';
    }
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

    // CART
    public function select_cart($db, $username)
    {
        $sql = "SELECT * 
        FROM products p JOIN cart c
        WHERE p.code_prod=c.code_prod
        AND c.name_user='$username'
        AND c.quantity>0;";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function check_stock($db, $code_prod, $quantity)
    {
        $sql = "SELECT stock - $quantity AS remaining_stock
        FROM products
        WHERE code_prod='$code_prod'
        AND stock>=$quantity;";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_property_cart($db, $username)
    {
        $sql = "SELECT * 
        FROM `cart_prop` 
        WHERE `name_user`='$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    // CHECKOUT
    public function update_property($db, $code_prop)
    {
        $sql = "UPDATE `property` 
        SET `available`= 0 
        WHERE `code_prop`='$code_prop'";

        $stmt = $db->ejecutar($sql);
        return 'updated';
    }
    public function create_order($db, $code_purchase, $code_prod, $username, $quantity, $price)
    {
        $sql = "INSERT INTO `purchase`(`code_purchase`, `code_prod`, `name_user`, `quantity`, `price`) VALUES 
        ('$code_purchase','$code_prod','$username','$quantity',($price*$quantity))";

        $stmt = $db->ejecutar($sql);

    }

    public function property_order($db, $code_purchase, $code_prop, $username, $price)
    {
        $sql = "INSERT INTO `purchase`(`code_purchase`, `code_prop`, `name_user`, `quantity`, `price`) VALUES 
        ('$code_purchase','$code_prop','$username','1','$price')";

        $stmt = $db->ejecutar($sql);

    }
    public function update_stock($db, $code_prod, $quantity)
    {
        $sql = "UPDATE `products` 
        SET `stock`= stock - $quantity 
        WHERE `code_prod`='$code_prod'";

        $stmt = $db->ejecutar($sql);

    }
    public function delete_cart($db, $username)
    {
        $sql = "UPDATE `cart`
        SET `quantity`= 0
        WHERE `name_user`='$username'";

        $stmt = $db->ejecutar($sql);

    }
    public function delete_cart_prop($db, $username)
    {
        $sql = "DELETE FROM `cart_prop`
        WHERE `name_user`='$username'";

        $stmt = $db->ejecutar($sql);

    }




}
?>