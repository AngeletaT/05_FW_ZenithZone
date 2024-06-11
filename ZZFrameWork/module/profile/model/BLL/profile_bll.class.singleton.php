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

    public function update_avatar_BLL($args)
    {
        // return $args;
        $username = middleware::decode_token($args[0]);
        // return $username;
        $avatar = $args[1];

        $this->dao->update_user_avatar($this->db, $username['username'], $avatar);

        return 'update';

    }

    public function likes_profile_BLL($args)
    {
        // return $args;
        $username = middleware::decode_token($args);
        // return $username;

        $likes = $this->dao->select_likes($this->db, $username['username']);
        foreach ($likes as $item) {
            // sacar $item['code_prop'] para usarlo en select_prop_likes y construir un array con cada propiedad
            $property = $this->dao->select_prop_likes($this->db, $item['code_prop']);
            $props[] = $property;
        }
        if (empty($props)) {
            return 'No likes';
        }
        return $props;
    }

    public function like_BLL($args)
    {
        // return $args;
        $username = middleware::decode_token($args[0]);
        // return $username;

        return $this->dao->select_data_like($this->db, $args[1], $username["username"]);
    }

    public function orders_profile_BLL($args)
    {
        $username = middleware::decode_token($args);

        $orders = $this->dao->select_orders($this->db, $username['username']);

        foreach ($orders as &$order) {
            $order['lineas'] = $this->dao->select_order_products($this->db, $order['code_purchase']);
            foreach ($order['lineas'] as &$linea) {
                $linea['producto'] = $this->dao->select_products($this->db, $linea['code_prod']);
                $linea['property'] = $this->dao->select_property($this->db, $linea['code_prop']);
            }
            $order['userdata'] = $this->dao->select_data_user($this->db, $order['name_user']);
        }

        if (empty($orders)) {
            return 'No orders';
        }
        return $orders;
    }

    public function generate_pdf_BLL($args)
    {
        // return $args;
        $username = middleware::decode_token($args[0]);
        // return $username;

        $userData = $this->dao->select_data_user($this->db, $username['username']);
        $order = $this->dao->select_order_products($this->db, $args[1]);
        $products = [];
        $property = [];
        foreach ($order as &$linea) {
            $product = $this->dao->select_products($this->db, $linea['code_prod']);
            $prop = $this->dao->select_property($this->db, $linea['code_prop']);

            if (!empty($product)) {
                $products[] = $product;
            }
            if (!empty($prop)) {
                $property[] = $prop;
            }
        }

        $invoice = [];
        $invoice['order'] = $args[1];
        $invoice['cliente'] = $userData;
        $invoice['propiedad'] = $property;
        $invoice['productos'] = $products;

        return $invoice;
    }


}