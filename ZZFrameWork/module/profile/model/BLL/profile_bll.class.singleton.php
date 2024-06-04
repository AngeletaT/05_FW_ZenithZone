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

    public function update_profile_BLL($args)
    {
        // return $args;
        $username = middleware::decode_token($args[0]);
        // return $username;
        $name = $args[1];
        $surname = $args[2];
        $phone = $args[3];
        $city = $args[4];

        if (!empty($name)) {
            $this->dao->update_user_name($this->db, $username['username'], $name);
        }
        if (!empty($surname)) {
            $this->dao->update_user_surname($this->db, $username['username'], $surname);
        }
        if (!empty($phone)) {
            $this->dao->update_user_phone($this->db, $username['username'], $phone);
        }
        if (!empty($city)) {
            $this->dao->update_user_city($this->db, $username['username'], $city);
        }

        return 'update';

    }
}