<?php
class login_model
{

    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = login_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_data_user()
    {
        // echo json_encode("get_data_user Model");
        return $this->bll->get_data_user_BLL();
    }

    public function register_user($args)
    {
        // echo json_encode("register_user Model");
        return $this->bll->register_user_BLL($args);
    }

    public function login_user($args)
    {
        // echo json_encode("login_user Model");
        return $this->bll->login_user_BLL($args);
    }

    public function verify_email($args)
    {
        // echo json_encode("verify_email Model");
        return $this->bll->verify_email_BLL($args);
    }
}