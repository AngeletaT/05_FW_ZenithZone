<?php
class search_dao
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

    public function select_search_type($db)
    {
        // return "hola dao";

        $sql = "SELECT *
                FROM type";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_search_activity_null($db)
    {
        // return "hola dao";

        $sql = "SELECT * 
                FROM activity";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_search_activity($db, $type)
    {
        // return "hola dao";

        $sql = "SELECT DISTINCT a.*
                FROM Property p
                INNER JOIN Property_Type pt ON p.code_prop = pt.code_prop
                INNER JOIN Type t ON pt.code_type = t.code_type
                INNER JOIN Property_Activity pa ON p.code_prop = pa.code_prop
                INNER JOIN Activity a ON pa.code_act = a.code_act
                WHERE t.code_type = $type";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_autocomplete($db, $search)
    {
        // return "hola dao";

        $complete = $search['complete'];
        $type = $search['type'];
        $activity = $search['activity'];

        // error_log($complete, 3, "debug.txt");
        // error_log($type, 3, "debug.txt");
        // error_log($activity, 3, "debug.txt");

        // El valor de $type y $activity existen
        if (!empty($type) && !empty($activity)) {
            $sql = "SELECT DISTINCT c.*
                    FROM city c
                    INNER JOIN property p ON p.code_city = c.code_city
                    INNER JOIN property_type pt ON p.code_prop = pt.code_prop
                    INNER JOIN type t ON pt.code_type = t.code_type
                    INNER JOIN property_activity pa ON p.code_prop = pa.code_prop
                    INNER JOIN activity a ON pa.code_act = a.code_act
                    WHERE c.name_city LIKE '%$complete%' 
                    AND t.code_type = '$type'
                    AND a.code_act = '$activity'";

        }
        // El valor de $type y $activity NO existen
        else if (empty($type) && empty($activity)) {
            $sql = "SELECT DISTINCT c.* 
                    FROM city c 
                    WHERE c.name_city LIKE '%$complete%'";
        }
        // El valor de $type existe y el valor de $activity no existe
        else if (!empty($type) && empty($activity)) {
            $sql = "SELECT DISTINCT c.*
                    FROM city c
                    INNER JOIN property p ON p.code_city = c.code_city
                    INNER JOIN property_type pt ON p.code_prop = pt.code_prop
                    INNER JOIN type t ON pt.code_type = t.code_type
                    WHERE c.name_city LIKE '%$complete%' 
                    AND t.code_type = '$type'";
        }
        // El valor de $type no existe y el valor de $activity existe
        else if (empty($type) && !empty($activity)) {
            $sql = "SELECT DISTINCT c.*
                    FROM city c
                    INNER JOIN property p ON p.code_city = c.code_city
                    INNER JOIN property_activity pa ON p.code_prop = pa.code_prop
                    INNER JOIN activity a ON pa.code_act = a.code_act
                    WHERE c.name_city LIKE '%$complete%' 
                    AND a.code_act = '$activity'";
        }

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
}
