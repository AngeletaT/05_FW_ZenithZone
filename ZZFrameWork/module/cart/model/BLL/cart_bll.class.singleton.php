<?php
class cart_bll
{
    private $dao;
    private $db;
    static $_instance;

    function __construct()
    {
        $this->dao = cart_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_products_BLL($args)
    {
        return $this->dao->select_products($this->db, $args[0]);
    }
    public function count_cart_BLL($args)
    {
        $username = middleware::decode_token($args);
        // return $username['username'];

        return $this->dao->count_products($this->db, $username['username']);
    }

    public function modify_cart_BLL($args)
    {
        $username = middleware::decode_token($args[2]);

        if ($args[1] === 'add') {
            if ($this->dao->check_product($this->db, $args[0], $username['username'])) {
                $this->dao->update_product($this->db, $args[0], $username['username']);
                return 'updated';
            } else {
                $this->dao->add_product($this->db, $args[0], $username['username']);
                return 'added';
            }
        } else if ($args[1] === 'del') {
            $this->dao->remove_product($this->db, $args[0], $username['username']);
            return 'removed';
        } else {
            return 'error';
        }
    }

}
?>