<?php
include("c:/xampp/htdocs/angela/ZenithZoneRE/model/connect.php");

class DAOProp
{
    function select_activity()
    {
        $sql = "SELECT * FROM activity";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

    function select_type()
    {
        $sql = "SELECT * FROM `type`";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

    function select_category()
    {
        $sql = "SELECT * FROM category";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

    function select_city()
    {
        $sql = "SELECT * FROM city";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

    function select_extra()
    {
        $sql = "SELECT * FROM extra";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

    function select_suggest()
    {
        $sql = "SELECT p.name_prop, i.img_prop, p.description, p.code_prop, v.visits
                FROM property p, images i, visited v
                WHERE p.code_prop=i.code_prop
                AND p.code_prop=v.code_prop
                AND i.img_prop LIKE '%.1.webp'
                ORDER BY v.visits DESC
                LIMIT 5";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }

    function select_lastvisit()
    {
        $sql = "SELECT p.name_prop, i.img_prop, p.description, p.code_prop, p.last_visit
                FROM property p, images i
                WHERE p.code_prop=i.code_prop
                AND i.img_prop LIKE '%.1.webp'
                ORDER BY p.last_visit DESC
                LIMIT 5";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);

        $retrArray = array();
        if (mysqli_num_rows($res) > 0) {
            while ($row = mysqli_fetch_assoc($res)) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }




}