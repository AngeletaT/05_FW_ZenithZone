<?php
class shop_bll
{
    private $dao;
    private $db;
    static $_instance;

    function __construct()
    {
        $this->dao = shop_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    // FILTROS DINAMICOS
    public function get_filters_type_BLL()
    {
        return $this->dao->select_data_filters_type($this->db);
    }

    public function get_filters_city_BLL()
    {
        return $this->dao->select_data_filters_city($this->db);
    }

    public function get_filters_category_BLL()
    {
        return $this->dao->select_data_filters_category($this->db);
    }

    public function get_filters_activity_BLL()
    {
        return $this->dao->select_data_filters_activity($this->db);
    }

    // CARGAR PROPIEDADES
    public function get_all_prop_BLL($args)
    {
        return $this->dao->select_data_all_prop($this->db, $args[0], $args[1]);
    }

    public function get_filters_home_BLL($args)
    {
        return $this->dao->select_data_filters_home($this->db, $args[0], $args[1], $args[2]);
    }

    public function get_filters_shop_BLL($args)
    {
        return $this->dao->select_data_filters_shop($this->db, $args[0], $args[1], $args[2]);
    }

    // DETAILS PROPIEDADES
    public function get_details_BLL($args)
    {
        return $this->dao->select_data_details($this->db, $args[0]);
    }
    public function get_scroll_details_BLL($args)
    {
        return $this->dao->select_data_scroll_details($this->db, $args[0], $args[1]);
    }

    // PAGINACION
    public function get_count_BLL()
    {
        return $this->dao->select_data_count($this->db);
    }

    public function get_count_home_BLL($args)
    {
        return $this->dao->select_data_count_home($this->db, $args[0]);
    }

    public function get_count_shop_BLL($args)
    {
        return $this->dao->select_data_count_shop($this->db, $args[0]);
    }

    // ORDER BY
    public function get_order_by_BLL($args)
    {
        return $this->dao->select_data_order_by($this->db, $args[0]);
    }

    // LIKE
    public function get_like_BLL($args)
    {
        return $this->dao->select_data_like($this->db, $args[0], $args[1]);
    }

    public function get_checklike_BLL($args)
    {
        return $this->dao->select_data_checklike($this->db, $args[0], $args[1]);
    }
}
?>