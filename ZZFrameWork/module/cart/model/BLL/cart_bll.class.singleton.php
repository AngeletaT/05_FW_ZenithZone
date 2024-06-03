<?php
class cart_bll
{
    private $dao;
    private $db;
    static $_instance;

    function __construct()
    {
        $this->dao = cart_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    // BASICOS
    public function get_products_BLL($args)
    {
        return $this->dao->select_products($this->db, $args[0]);
    }
    public function count_cart_BLL($args)
    {
        $username = middleware::decode_token($args);
        // return $username['username'];

        return $this->dao->count_products($this->db, $username['username']);
    }
    // CONSTRUIR CARRITO
    public function add_prop_BLL($args)
    {

        // return $args;
        $username = middleware::decode_token($args[1]);

        if ($this->dao->check_property($this->db, $args[0], $username['username'])) {
            return 'done';
        } else {
            if ($this->dao->check_property_cart($this->db, $username['username'])) {
                return 'error';
            } else {
                $property = $this->dao->select_property($this->db, $args[0]);
                // return $property[0]['name_prop'];
                $this->dao->addcart_property($this->db, $args[0], $username['username'], $property[0]['name_prop'], $property[0]['price']);
                return 'added';
            }
        }
    }
    public function modify_cart_BLL($args)
    {
        $username = middleware::decode_token($args[2]);

        if ($args[1] === 'add') {
            if ($this->dao->check_product($this->db, $args[0], $username['username'])) {
                $this->dao->update_product($this->db, $args[0], $username['username']);
                return 'updated';
            } else {
                $this->dao->add_product($this->db, $args[0], $username['username']);
                return 'added';
            }
        } else if ($args[1] === 'del') {
            $this->dao->remove_product($this->db, $args[0], $username['username']);
            return 'removed';
        } else {
            return 'error';
        }
    }
    // CART
    public function fill_cart_BLL($args)
    {
        $username = middleware::decode_token($args);

        $cart = $this->dao->select_cart($this->db, $username['username']);
        // return $cart;

        $updatedCart = [];

        foreach ($cart as $item) {
            $stock = $this->dao->check_stock($this->db, $item['code_prod'], $item['quantity']);
            $item['remaining_stock'] = $stock;
            $updatedCart[] = $item;
        }
        return $updatedCart;
    }

    public function get_property_BLL($args)
    {
        $username = middleware::decode_token($args);

        return $this->dao->select_property_cart($this->db, $username['username']);
    }

}
?>