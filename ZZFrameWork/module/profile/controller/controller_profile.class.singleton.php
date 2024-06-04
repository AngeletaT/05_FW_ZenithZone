<?php

class controller_profile
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
        // echo 'hola view desde el profile';
        common::load_view('top_page_profile.html', VIEW_PATH_PROFILE . 'profile.html');
    }

}
?>