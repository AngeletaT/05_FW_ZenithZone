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
}
?>