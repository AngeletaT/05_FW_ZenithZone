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
}