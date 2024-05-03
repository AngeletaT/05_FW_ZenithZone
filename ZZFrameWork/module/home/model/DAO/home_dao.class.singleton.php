<?php
class home_dao
{
    static $_instance;

    private function __construct()
    {
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_data_carrusel($db)
    {
        return "hola dao carrusel";

        // $sql = "SELECT * FROM activity";

        // $stmt = $db->ejecutar($sql);
        // return $db->listar($stmt);
    }

    public function select_data_category($db)
    {

        // $sql = "SELECT * FROM category";

        // $stmt = $db->ejecutar($sql);
        // return $db->listar($stmt);
    }

    public function select_data_city($db)
    {

        // $sql = "SELECT * FROM city";

        // $stmt = $db->ejecutar($sql);
        // return $db->listar($stmt);
    }

    public function select_data_type($db)
    {

        // $sql = "SELECT * FROM `type`";

        // $stmt = $db->ejecutar($sql);
        // return $db->listar($stmt);
    }

    public function select_data_extra($db)
    {

        // $sql = "SELECT * FROM extra";

        // $stmt = $db->ejecutar($sql);
        // return $db->listar($stmt);
    }

    public function select_data_suggest($db)
    {

        // $sql = "SELECT p.name_prop, i.img_prop, p.description, p.code_prop, v.visits
        //         FROM property p, images i, visited v
        //         WHERE p.code_prop=i.code_prop
        //         AND p.code_prop=v.code_prop
        //         AND i.img_prop LIKE '%.1.webp'
        //         ORDER BY v.visits DESC
        //         LIMIT 5";

        // $stmt = $db->ejecutar($sql);
        // return $db->listar($stmt);
    }

    public function select_data_lastvisit($db)
    {

        // $sql = "SELECT p.name_prop, i.img_prop, p.description, p.code_prop, p.last_visit
        //         FROM property p, images i
        //         WHERE p.code_prop=i.code_prop
        //         AND i.img_prop LIKE '%.1.webp'
        //         ORDER BY p.last_visit DESC
        //         LIMIT 5";

        // $stmt = $db->ejecutar($sql);
        // return $db->listar($stmt);
    }


}
?>