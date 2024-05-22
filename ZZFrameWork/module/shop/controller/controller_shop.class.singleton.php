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

    // FILTROS DINAMICOS
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

    // CARGAR PROPIEDADES
    function all_prop()
    {
        // echo json_encode("all_prop");
        echo json_encode(common::load_model('shop_model', 'get_all_prop', [$_POST['offset'], $_POST['items_page']]));
    }

    function filters_home()
    {
        // echo json_encode("filters_home");
        echo json_encode(common::load_model('shop_model', 'get_filters_home', [$_POST['filters_home'], $_POST['offset'], $_POST['items_page']]));
    }

    function filters_shop()
    {
        // echo json_encode("filters_shop");
        echo json_encode(common::load_model('shop_model', 'get_filters_shop', [$_POST['filters_shop'], $_POST['offset'], $_POST['items_page']]));
    }

    // DETAILS PROPIEDADES
    function details_prop()
    {
        // echo json_encode("details_prop");
        echo json_encode(common::load_model('shop_model', 'get_details_prop', [$_POST['code_prop']]));
    }

    function scroll_details()
    {
        // echo json_encode("scroll_details");
        echo json_encode(common::load_model('shop_model', 'get_scroll_details', [$_POST['code_prop'], $_POST['limit']]));
    }

    // PAGINACION
    function count()
    {
        // echo json_encode("count");
        echo json_encode(common::load_model('shop_model', 'get_count'));
    }

    function count_home()
    {
        // echo json_encode("count_home");
        echo json_encode(common::load_model('shop_model', 'get_count_home', [$_POST['filters_home']]));
    }

    function count_shop()
    {
        // echo json_encode("count_shop");
        echo json_encode(common::load_model('shop_model', 'get_count_shop', [$_POST['filters_shop']]));
    }

    // ORDER BY
    function orderby()
    {
        // echo json_encode("orderby");
        echo json_encode(common::load_model('shop_model', 'get_order_by', [$_POST['orderby']]));
    }

    // LIKE
    function like()
    {
        // echo json_encode("like");
        echo json_encode(common::load_model('shop_model', 'get_like', [$_POST['code_prop'], $_POST['access_token']]));
    }

    function checklike()
    {
        // echo json_encode("checklike");
        echo json_encode(common::load_model('shop_model', 'get_checklike', [$_POST['code_prop'], $_POST['access_token']]));
    }
}
?>