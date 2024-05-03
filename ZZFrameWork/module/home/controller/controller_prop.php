<?php
include ("c:/xampp/htdocs/angela/ZenithZoneRE/module/home/model/DAOprop.php");
@session_start();
if (isset($_SESSION["tiempo"])) {
    $_SESSION["tiempo"] = time(); //Devuelve la fecha actual
}

switch ($_GET['op']) {
    case 'list';
        include ('module/home/view/home.html');
        break;

    case 'carrouselAct';
        try {
            $DAOProp = new DAOProp();
            $selectType = $DAOProp->select_activity();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($selectType)) {
            echo json_encode($selectType);
        } else {
            echo json_encode("error");
        }
        break;

    case 'listCategory';
        // echo json_encode("hola");
        // break;
        try {
            $DAOProp = new DAOProp();
            $selectCategory = $DAOProp->select_category();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($selectCategory)) {
            echo json_encode($selectCategory);
        } else {
            echo json_encode("error");
        }
        break;

    case "listCity";
        // echo json_encode("hola");
        // break;
        try {
            $DAOProp = new DAOProp();
            $selectCity = $DAOProp->select_city();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        if (!empty($selectCity)) {
            echo json_encode($selectCity);
        } else {
            echo json_encode("error");
        }
        break;

    case "listType";
        // echo json_encode("hola");
        // break;
        try {
            $DAOProp = new DAOProp();
            $selectCity = $DAOProp->select_type();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        if (!empty($selectCity)) {
            echo json_encode($selectCity);
        } else {
            echo json_encode("error");
        }
        break;

    case "listExtra";
        // echo json_encode("hola");
        // break;
        try {
            $DAOProp = new DAOProp();
            $selectCity = $DAOProp->select_extra();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        if (!empty($selectCity)) {
            echo json_encode($selectCity);
        } else {
            echo json_encode("error");
        }
        break;

    case "listSuggest";
        // echo json_encode("hola");
        // break;
        try {
            $DAOProp = new DAOProp();
            $selectCity = $DAOProp->select_suggest();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        if (!empty($selectCity)) {
            echo json_encode($selectCity);
        } else {
            echo json_encode("error");
        }
        break;

    case "listlastvisit";
        // echo json_encode("hola");
        // break;
        try {
            $DAOProp = new DAOProp();
            $selectCity = $DAOProp->select_lastvisit();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        if (!empty($selectCity)) {
            echo json_encode($selectCity);
        } else {
            echo json_encode("error");
        }
        break;

    default;
        include ("view/inc/error404.php");
        break;
}
?>