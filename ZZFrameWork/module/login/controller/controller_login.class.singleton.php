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
        // echo 'hola view desde el login';
        common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'login-register.html');
    }

    function data_user()
    {
        // echo json_encode("data_user");
        echo json_encode(common::load_model('login_model', 'get_data_user'));
    }
}