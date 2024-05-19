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

    // REGISTER
    function register()
    {
        // echo json_encode("register");
        echo json_encode(common::load_model('login_model', 'register_user', [$_POST['username'], $_POST['email'], $_POST['password']]));
    }

    function verify_email()
    {
        // echo json_encode("verify_email");
        echo json_encode(common::load_model('login_model', 'verify_email', $_POST['token_email']));

    }

    // LOGIN
    function login()
    {
        // echo json_encode("login");
        echo json_encode(common::load_model('login_model', 'login_user', [$_POST['username'], $_POST['password']]));
    }
    function data_user()
    {
        // echo json_encode("data_user");
        echo json_encode(common::load_model('login_model', 'get_data_user'));
    }

    // RECOVER PASSWORD
    function send_recover_email()
    {
        // echo json_encode("send_recover_email");
        echo json_encode(common::load_model('login_model', 'send_recover_email', $_POST['email']));
    }

    function recover_view()
    {
        // echo 'hola view desde el recover';
        common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'recover_pass.html');
    }

    function verify_token()
    {
        // echo json_encode("verify_token");
        echo json_encode(common::load_model('login_model', 'verify_token', $_POST['token_email']));
    }

    function new_password()
    {
        // echo json_encode("new_password");
        echo json_encode(common::load_model('login_model', 'new_password', [$_POST['token_email'], $_POST['password']]));
    }

}
