<?php
class profile_dao
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
    // INFORMACION DEL USUARIO
    public function select_data_user($db, $username)
    {
        // return 'hola dao';
        $sql = "SELECT * 
        FROM users 
        WHERE username = '$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    // ACTUALIZAR DATOS DEL USUARIO
    public function update_user_name($db, $username, $name)
    {
        $sql = "UPDATE users 
        SET name = '$name' 
        WHERE username = '$username'";

        $db->ejecutar($sql);
    }

    public function update_user_surname($db, $username, $surname)
    {
        $sql = "UPDATE users 
        SET surname = '$surname' 
        WHERE username = '$username'";

        $db->ejecutar($sql);
    }

    public function update_user_phone($db, $username, $phone)
    {
        $sql = "UPDATE users 
        SET phone_number = '$phone' 
        WHERE username = '$username'";

        $db->ejecutar($sql);
    }

    public function update_user_city($db, $username, $city)
    {
        $sql = "UPDATE users 
        SET city = '$city' 
        WHERE username = '$username'";

        $db->ejecutar($sql);
    }

    // LIKES DEL USUARIO
    public function select_likes($db, $username)
    {
        $sql = "SELECT * 
        FROM likes 
        WHERE username = '$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_prop_likes($db, $code_prop)
    {
        $sql = "SELECT *
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa
        WHERE p.code_prop = '$code_prop'
        AND p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act
        ";


        $stmt = $db->ejecutar($sql);
        $retrArray = $db->listar($stmt);

        foreach ($retrArray as &$row) {
            $images_sql = "SELECT img_prop FROM images WHERE code_prop = '" . $row['code_prop'] . "'";
            $images_stmt = $db->ejecutar($images_sql);
            $images = $db->listar($images_stmt);
            $row['images'] = array_column($images, 'img_prop');
        }

        return $retrArray;


    }

}