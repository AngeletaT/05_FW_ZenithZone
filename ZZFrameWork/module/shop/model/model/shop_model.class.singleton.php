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

    // FILTROS DINAMICOS
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

    // CARGAR PROPIEDADES
    public function get_all_prop($args)
    {
        // echo json_encode("all_prop Model");
        return $this->bll->get_all_prop_BLL($args);
    }

    public function get_filters_home($args)
    {
        // echo json_encode("filters_home Model");
        return $this->bll->get_filters_home_BLL($args);
    }

    public function get_filters_shop($args)
    {
        // echo json_encode("filters_shop Model");
        return $this->bll->get_filters_shop_BLL($args);
    }

    // DETAILS PROPIEDADES
    public function get_details_prop($args)
    {
        // echo json_encode("get_details Model");
        return $this->bll->get_details_BLL($args);
    }

    public function get_scroll_details($args)
    {
        // echo json_encode("scroll_details Model");
        return $this->bll->get_scroll_details_BLL($args);
    }

    // PAGINACION
    public function get_count()
    {
        return $this->bll->get_count_BLL();
    }

    public function get_count_home($args)
    {
        return $this->bll->get_count_home_BLL($args);
    }

    public function get_count_shop($args)
    {
        return $this->bll->get_count_shop_BLL($args);
    }

    // ORDER BY
    public function get_order_by($args)
    {
        return $this->bll->get_order_by_BLL($args);
    }

    // LIKE
    public function get_like($args)
    {
        return $this->bll->get_like_BLL($args);
    }

    public function get_checklike($args)
    {
        // echo json_encode("get_checklike Model");
        return $this->bll->get_checklike_BLL($args);
    }

}
?>