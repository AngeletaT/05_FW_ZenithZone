<?php

class controller_login
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
        common::load_view('top_page_login.html', VIEW_PATH_HOME . 'login-register.html');
    }

    function carrouselAct()
    {
        // echo json_encode("carrouselAct");
        echo json_encode(common::load_model('login_model', 'get_'));
    }
}