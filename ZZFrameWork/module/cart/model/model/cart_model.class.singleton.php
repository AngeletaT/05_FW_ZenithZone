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

    public function get_products($args)
    {
        // echo json_encode("get_products model");
        return $this->bll->get_products_BLL($args);
    }

    public function modify_cart($args)
    {
        // echo json_encode("modify_cart model");
        return $this->bll->modify_cart_BLL($args);
    }
}
?>