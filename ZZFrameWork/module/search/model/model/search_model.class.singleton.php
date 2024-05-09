<?php
class search_model
{

    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = search_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function search_type()
    {
        // echo json_encode("search_type Model");
        return $this->bll->get_search_type_BLL();
    }

    public function search_activity_null()
    {
        // echo json_encode("search_activity_null Model");
        return $this->bll->get_search_activity_null_BLL();
    }

    public function search_activity($args)
    {
        // echo json_encode("search_activity Model");
        return $this->bll->get_search_activity_BLL($args);
    }

    public function autocomplete($args)
    {
        // echo json_encode("autocomplete Model");
        return $this->bll->get_autocomplete_BLL($args);
    }
}