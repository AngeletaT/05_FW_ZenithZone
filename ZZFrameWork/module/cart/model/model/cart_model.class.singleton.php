<?php
class cart_model
{

    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = cart_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    // BASICOS
    public function get_products($args)
    {
        // echo json_encode("get_products model");
        return $this->bll->get_products_BLL($args);
    }
    public function count_cart($args)
    {
        // echo json_encode("count_cart model");
        return $this->bll->count_cart_BLL($args);
    }

    // CONSTRUIR CARRITO
    public function add_prop($args)
    {
        // echo json_encode("add_prop model");
        return $this->bll->add_prop_BLL($args);
    }
    public function modify_cart($args)
    {
        // echo json_encode("modify_cart model");
        return $this->bll->modify_cart_BLL($args);
    }

    // CART
    public function fill_cart($args)
    {
        // echo json_encode("fill_cart model");
        return $this->bll->fill_cart_BLL($args);
    }
    public function get_property($args)
    {
        // echo json_encode("get_property model");
        return $this->bll->get_property_BLL($args);
    }
    public function checkout($args)
    {
        // echo json_encode("checkout model");
        return $this->bll->checkout_BLL($args);
    }
    public function discard_cart($args)
    {
        // echo json_encode("discard_cart model");
        return $this->bll->discard_cart_BLL($args);
    }
}
?>