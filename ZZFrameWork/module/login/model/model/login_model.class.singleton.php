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

    public function get_carrusel()
    {
        // echo json_encode("carrouselAct Model");
        return $this->bll->get_carrusel_BLL();
    }
}