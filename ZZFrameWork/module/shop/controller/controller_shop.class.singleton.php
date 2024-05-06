<?php

class controller_shop
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
        // echo 'hola view desde el shop';
        common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
    }

    function dynamic_filters_type()
    {
        // echo json_encode("dynamic_filters_type");
        echo json_encode(common::load_model('shop_model', 'get_filters_type'));
    }

    function dynamic_filters_city()
    {
        // echo json_encode("dynamic_filters_city");
        echo json_encode(common::load_model('shop_model', 'get_filters_city'));
    }

    function dynamic_filters_category()
    {
        // echo json_encode("dynamic_filters_category");
        echo json_encode(common::load_model('shop_model', 'get_filters_category'));
    }

    function dynamic_filters_activity()
    {
        // echo json_encode("dynamic_filters_activity");
        echo json_encode(common::load_model('shop_model', 'get_filters_activity'));
    }


}
?>