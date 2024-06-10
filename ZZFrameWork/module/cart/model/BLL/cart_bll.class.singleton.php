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
        $property_cart = $this->dao->select_property_cart($this->db, $username['username']);

        if (empty($property_cart) || is_null($property_cart)) {
            return 'empty prop_cart';
        } else {
            $property = $this->dao->select_property($this->db, $property_cart[0]['code_prop']);
            if (empty($property) || is_null($property)) {
                return 'empty prop';
            } else {
                if ($property[0]['available'] === '0') {
                    return 'error prop';
                } else {
                    return $property_cart;
                }
            }
        }


    }
    public function checkout_BLL($args)
    {
        $username = middleware::decode_token($args);
        $code_purchase = common::generate_token_secure(6);

        $property_cart = $this->dao->select_property_cart($this->db, $username['username']);
        $property = $this->dao->select_property($this->db, $property_cart[0]['code_prop']);

        if ($property[0]['available'] === '1') {

            $cart = $this->dao->select_cart($this->db, $username['username']);
            // return $cart;
            foreach ($cart as $item) {
                if ($item['quantity'] > $item['stock']) {
                    return 'error stock';
                } else {
                    $this->dao->create_order($this->db, $code_purchase, $item['code_prod'], $username['username'], $item['quantity'], $item['price_prod']);
                    $this->dao->update_stock($this->db, $item['code_prod'], $item['quantity']);
                }
            }

            $this->dao->update_property($this->db, $property_cart[0]['code_prop']);
            $this->dao->property_order($this->db, $code_purchase, $property_cart[0]['code_prop'], $username['username'], $property[0]['price']);
            $this->dao->delete_cart($this->db, $username['username']);
            $this->dao->delete_cart_prop($this->db, $username['username']);
            return 'done';
        } else {
            return 'error';
        }
    }
    public function discard_cart_BLL($args)
    {
        $username = middleware::decode_token($args);

        $this->dao->delete_cart($this->db, $username['username']);
        $this->dao->delete_cart_prop($this->db, $username['username']);

        return 'done';
    }

}
?>