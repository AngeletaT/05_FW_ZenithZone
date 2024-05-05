<?php
class home_model
{

    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = home_bll::getInstance();
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

    public function get_category()
    {
        // echo json_encode("listCategory");
        return $this->bll->get_category_BLL();
    }

    public function get_city()
    {
        return $this->bll->get_city_BLL();
    }

    public function get_type()
    {
        return $this->bll->get_type_BLL();
    }

    public function get_extra()
    {
        return $this->bll->get_extra_BLL();
    }

    public function get_suggest()
    {
        return $this->bll->get_suggest_BLL();
    }

    public function get_lastvisit()
    {
        return $this->bll->get_lastvisit_BLL();
    }


}
?>