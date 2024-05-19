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
    // REGISTER
    public function register_user($args)
    {
        // echo json_encode("register_user Model");
        return $this->bll->register_user_BLL($args);
    }
    public function verify_email($args)
    {
        // echo json_encode("verify_email Model");
        return $this->bll->verify_email_BLL($args);
    }
    
    // LOGIN
    public function login_user($args)
    {
        // echo json_encode("login_user Model");
        return $this->bll->login_user_BLL($args);
    }
    public function get_data_user()
    {
        // echo json_encode("get_data_user Model");
        return $this->bll->get_data_user_BLL();
    }

    // RECOVER PASSWORD
    public function send_recover_email($args)
    {
        // echo json_encode("send_recover_email Model");
        return $this->bll->send_recover_email_BLL($args);
    }

    public function verify_token($args)
    {
        // echo json_encode("verify_token Model");
        return $this->bll->verify_token_BLL($args);
    }

    public function new_password($args)
    {
        // echo json_encode("new_password Model");
        return $this->bll->new_password_BLL($args);
    }
}