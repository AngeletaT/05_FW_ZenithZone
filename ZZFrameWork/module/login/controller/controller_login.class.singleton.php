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
        echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['access_token']));
    }
    function logout()
    {
        // echo json_encode("logout");
        echo json_encode(common::load_model('login_model', 'logout_user'));
    }

    function validate_otp()
    {
        // echo json_encode("validate_otp");
        echo json_encode(common::load_model('login_model', 'validate_otp', [$_POST['username'], $_POST['otp']]));
    }
    // SOCIAL LOGIN
    function social_login()
    {
        // echo json_encode("social_login");
        echo json_encode(common::load_model('login_model', 'social_login', $_POST['social_user']));
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

    // ACTIVITY USER
    function controluser()
    {
        // echo json_encode("controluser");
        echo json_encode(common::load_model('login_model', 'control_user', [$_POST['access_token'], $_POST['refresh_token']]));
    }
    function actividad()
    {
        // echo json_encode("controluser");
        echo json_encode(common::load_model('login_model', 'actividad'));
    }
    function refresh_cookie()
    {
        // echo json_encode("refresh_cookie");
        echo json_encode(common::load_model('login_model', 'refresh_cookie'));
    }
}
