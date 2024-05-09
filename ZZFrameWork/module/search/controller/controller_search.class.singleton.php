<?php

class controller_search
{
    static $_instance;

    public static function getInstance()
    {  /// Crea el constructor si no exixte
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function search_type()
    {
        // echo json_encode("search_type");
        echo json_encode(common::load_model('search_model', 'search_type'));
    }

    function search_activity_null()
    {
        // echo json_encode("search_activity_null");
        echo json_encode(common::load_model('search_model', 'search_activity_null'));
    }

    function search_activity()
    {
        // echo json_encode("search_activity");
        echo json_encode(common::load_model('search_model', 'search_activity', [$_POST['type']]));
    }

    function autocomplete()
    {
        // echo json_encode("autocomplete");
        echo json_encode(common::load_model('search_model', 'autocomplete', [$_POST['search']]));
    }
}