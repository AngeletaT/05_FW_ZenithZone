<?php
class profile_bll
{
    private $dao;
    private $db;
    static $_instance;

    function __construct()
    {
        $this->dao = profile_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function list_profile_BLL($args)
    {
        // return $args;
        $username = middleware::decode_token($args);
        // return $username;

        return $this->dao->select_data_user($this->db, $username['username']);
    }
}