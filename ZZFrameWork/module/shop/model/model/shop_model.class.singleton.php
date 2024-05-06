<?php
class shop_model
{

    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = shop_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_filters_type()
    {
        // echo json_encode("filters_type Model");
        return $this->bll->get_filters_type_BLL();
    }

    public function get_filters_city()
    {
        // echo json_encode("filters_city Model");
        return $this->bll->get_filters_city_BLL();
    }

    public function get_filters_category()
    {
        // echo json_encode("filters_category Model");
        return $this->bll->get_filters_category_BLL();
    }

    public function get_filters_activity()
    {
        // echo json_encode("filters_activity Model");
        return $this->bll->get_filters_activity_BLL();
    }
}
?>