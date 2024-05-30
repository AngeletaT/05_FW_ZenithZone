<?php

class controller_cart
{
    static $_instance;

    public static function getInstance()
    {  /// Crea el constructor si no exixte
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function view()
    {
        // echo 'hola view desde el cart';
        common::load_view('top_page_cart.html', VIEW_PATH_CART . 'cart.html');
    }

    // FILTROS DINAMICOS
    function cart_products()
    {
        // echo json_encode("get_products");
        echo json_encode(common::load_model('cart_model', 'get_products', $_POST['code_prop']));

    }

}
?>