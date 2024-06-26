<?php

class controller_home
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
        // echo 'hola view desde el home';
        common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
    }

    function carrouselAct()
    {
        // echo json_encode("carrouselAct");
        echo json_encode(common::load_model('home_model', 'get_carrusel'));
    }

    function listCategory()
    {
        // echo json_encode("listCategory");
        echo json_encode(common::load_model('home_model', 'get_category'));
    }

    function listCity()
    {
        echo json_encode(common::load_model('home_model', 'get_city'));
    }

    function listType()
    {
        echo json_encode(common::load_model('home_model', 'get_type'));
    }

    function listExtra()
    {
        echo json_encode(common::load_model('home_model', 'get_extra'));
    }

    function listSuggest()
    {
        echo json_encode(common::load_model('home_model', 'get_suggest'));
    }

    function listlastvisit()
    {
        echo json_encode(common::load_model('home_model', 'get_lastvisit'));
    }

}
?>