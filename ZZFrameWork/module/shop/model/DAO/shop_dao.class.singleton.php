<?php
class shop_dao
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

    // FILTROS DINAMICOS
    public function select_data_filters_type($db)
    {
        // return "hola dao";

        $sql = "SELECT *
                FROM type";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_filters_city($db)
    {
        // return "hola dao";

        $sql = "SELECT *
                FROM city";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_filters_category($db)
    {
        // return "hola dao";

        $sql = "SELECT *
                FROM category";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_filters_activity($db)
    {
        // return "hola dao";

        $sql = "SELECT *
                FROM activity";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    // CARGAR PROPIEDADES
    public function select_data_all_prop($db, $offset, $items_page)
    {
        // return "hola dao";

        $sql = "SELECT DISTINCT *
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.available = 1
        ORDER BY p.code_prop ASC
        LIMIT $offset, $items_page";


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

    public function select_data_filters_home($db, $filters_home, $offset, $items_page)
    {
        // return "hola dao";

        $sql = "SELECT DISTINCT *
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act
        AND p.available = 1";

        if (isset($filters_home[0]['type'])) {
            $filtro = $filters_home[0]['type'][0];
            $sql .= " AND t.code_type = '$filtro'";
        } else if (isset($filters_home[0]['category'])) {
            $filtro = $filters_home[0]['category'][0];
            $sql .= " AND c.code_cat = '$filtro'";
        } else if (isset($filters_home[0]['city'])) {
            $filtro = $filters_home[0]['city'][0];
            $sql .= " AND ct.code_city = '$filtro'";
        } else if (isset($filters_home[0]['extra'])) {
            $filtro = $filters_home[0]['extra'][0];
            $sql .= " AND e.code_extra = '$filtro'";
        } else if (isset($filters_home[0]['activity'])) {
            $filtro = $filters_home[0]['activity'][0];
            $sql .= " AND a.code_act = '$filtro'";
        }
        $sql .= " ORDER BY p.code_prop ASC
        LIMIT $offset, $items_page";

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

    public function select_data_filters_shop($db, $filters_shop, $offset, $items_page)
    {
        // return "hola dao";

        $sql = "SELECT DISTINCT *
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act
        AND p.available = 1";

        foreach ($filters_shop as $filter) {

            $filterColumn = $filter[0];
            $filterValue = $filter[1];

            if ($filterColumn == 'code_type') {
                $sql .= " AND t.$filterColumn = $filterValue";
            } else if ($filterColumn == 'code_city') {
                $sql .= " AND ct.$filterColumn = $filterValue";
            } else if ($filterColumn == 'code_cat') {
                $sql .= " AND c.$filterColumn = $filterValue";
            } else if ($filterColumn == 'rooms') {
                $sql .= " AND p.$filterColumn >= $filterValue";
            } else if ($filterColumn == 'baths') {
                $sql .= " AND p.$filterColumn >= $filterValue";
            } else if ($filterColumn == 'm2') {
                $sql .= " AND p.$filterColumn <= $filterValue";
            } else if ($filterColumn == 'price') {
                $sql .= " AND p.$filterColumn <= $filterValue";
            } else if ($filterColumn == 'code_extra') {
                if (is_array($filterValue)) {
                    $extra = implode(",", $filterValue);
                    $sql .= " AND e.$filterColumn IN ($extra)";
                } else {
                    $sql .= " AND e.$filterColumn = $filterValue";
                }
            } else if ($filterColumn == 'code_act') {
                $sql .= " AND a.$filterColumn = $filterValue";
            }
        }
        $sql .= " LIMIT $offset, $items_page";

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

    // DETAILS PROPIEDADES
    public function select_data_details($db, $id)
    {
        // return "hola dao";

        $sql = "SELECT *
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa
        WHERE p.code_prop = '$id'
        AND p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act";


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

    public function select_data_scroll_details($db, $code_prop, $limit)
    {
        // return "hola dao";

        $sql = "SELECT *
            FROM property p1
            INNER JOIN property_type pt1 ON p1.code_prop = pt1.code_prop
            INNER JOIN images i ON p1.code_prop = i.code_prop
            WHERE i.img_prop LIKE '%.1.webp'
            AND pt1.code_type = (SELECT pt2.code_type
                        FROM property p2
                        INNER JOIN property_type pt2 ON p2.code_prop = pt2.code_prop
                        WHERE p2.code_prop = $code_prop)
            AND p1.code_prop != $code_prop
            AND p1.available = 1
            LIMIT $limit;";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_visited($db, $id)
    {
        $sql = "UPDATE visited 
        SET visited.visits = (visited.visits + 1) 
        WHERE visited.code_prop = '$id'";

        $db->ejecutar($sql);

    }

    public function update_datetimevisit($db, $id)
    {
        $sql = "UPDATE property p
        SET p.last_visit = NOW()
        WHERE p.code_prop = '$id'";

        $db->ejecutar($sql);

    }

    // PAGINACION
    public function select_data_count($db)
    {
        // return "hola dao";

        $sql = "SELECT COUNT(*) contador
        FROM property";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_count_home($db, $filters_home)
    {
        // return "hola dao";

        $sql = "SELECT COUNT(*) contador
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act
        AND p.available = 1";

        if (isset($filters_home[0]['type'])) {
            $filtro = $filters_home[0]['type'][0];
            $sql .= " AND t.code_type = '$filtro'";
        } else if (isset($filters_home[0]['category'])) {
            $filtro = $filters_home[0]['categoty'][0];
            $sql .= " AND c.code_cat = '$filtro'";
        } else if (isset($filters_home[0]['city'])) {
            $filtro = $filters_home[0]['city'][0];
            $sql .= " AND ct.code_city = '$filtro'";
        } else if (isset($filters_home[0]['extra'])) {
            $filtro = $filters_home[0]['extra'][0];
            $sql .= " AND e.code_extra = '$filtro'";
        } else if (isset($filters_home[0]['activity'])) {
            $filtro = $filters_home[0]['activity'][0];
            $sql .= " AND a.code_act = '$filtro'";
        }
        $sql .= " ORDER BY p.code_prop ASC";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_count_shop($db, $filters_shop)
    {
        // return "hola dao";

        $sql = "SELECT COUNT(*) contador
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act
        AND p.available = 1";

        foreach ($filters_shop as $filter) {

            $filterColumn = $filter[0];
            $filterValue = $filter[1];

            if ($filterColumn == 'code_type') {
                $sql .= " AND t.$filterColumn = $filterValue";
            } else if ($filterColumn == 'code_city') {
                $sql .= " AND ct.$filterColumn = $filterValue";
            } else if ($filterColumn == 'code_cat') {
                $sql .= " AND c.$filterColumn = $filterValue";
            } else if ($filterColumn == 'rooms') {
                $sql .= " AND p.$filterColumn >= $filterValue";
            } else if ($filterColumn == 'baths') {
                $sql .= " AND p.$filterColumn >= $filterValue";
            } else if ($filterColumn == 'm2') {
                $sql .= " AND p.$filterColumn <= $filterValue";
            } else if ($filterColumn == 'price') {
                $sql .= " AND p.$filterColumn <= $filterValue";
            } else if ($filterColumn == 'code_extra') {
                if (is_array($filterValue)) {
                    $extra = implode(",", $filterValue);
                    $sql .= " AND e.$filterColumn IN ($extra)";
                } else {
                    $sql .= " AND e.$filterColumn = $filterValue";
                }
            } else if ($filterColumn == 'code_act') {
                $sql .= " AND a.$filterColumn = $filterValue";
            }
        }

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    // ORDER BY
    public function select_data_order_by($db, $orderby)
    {
        // return "hola dao";

        switch ($orderby) {
            case 1:
                $orderby = "ORDER BY p.publication ASC";
                break;
            case 2:
                $orderby = "ORDER BY v.visits DESC";
                break;
            case 3:
                $orderby = "ORDER BY p.price ASC";
                break;
            case 4:
                $orderby = "ORDER BY p.price DESC";
                break;
            case 5:
                $orderby = "ORDER BY p.m2 DESC";
                break;
            case 6:
                $orderby = "ORDER BY p.m2 ASC";
                break;
            default:
                $orderby = "ORDER BY p.code_prop ASC";
        }

        $sql = "SELECT DISTINCT *
        FROM property p, property_type pt, type t, property_extras pe, extra e, property_category pc, category c, city ct, activity a, property_activity pa, visited v
        WHERE p.code_prop=pt.code_prop
        AND pt.code_type=t.code_type
        AND p.code_prop=pe.code_prop
        AND pe.code_extra=e.code_extra
        AND p.code_prop=pc.code_prop
        AND pc.code_cat=c.code_cat
        AND p.code_city=ct.code_city
        AND p.code_prop=pa.code_prop
        AND pa.code_act=a.code_act 
        AND p.code_prop=v.code_prop
        AND p.available = 1
        $orderby";

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

    // LIKE
    public function select_data_like($db, $code_prop, $username)
    {
        // return "hola dao";

        $sql = "CALL UpdateLikes('$username', '$code_prop')";

        $stmt = $db->ejecutar($sql);
        return;
    }

    public function select_data_checklike($db, $code_prop, $username)
    {
        // return $code_prop . $username;

        $sql = "SELECT * 
        FROM `likes` 
        WHERE `username` = '$username' AND `code_prop` = '$code_prop'";

        $stmt = $db->ejecutar($sql);
        $row = $db->listar($stmt);

        if ($row) {
            $result = "ExisteLike";
        } else {
            $result = "NoExisteLike";
        }

        return $result;

    }
}

?>