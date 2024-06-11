<?php

class controller_profile
{
    static $_instance;

    public static function getInstance()
    {  /// Crea el constructor si no exixte
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function view()
    {
        // echo 'hola view desde el profile';
        common::load_view('top_page_profile.html', VIEW_PATH_PROFILE . 'profile.html');
    }

    function list_profile()
    {
        // echo json_encode("list_profile");
        echo json_encode(common::load_model('profile_model', 'list_profile', $_POST['access_token']));
    }

    function update_profile()
    {
        // echo json_encode("update_profile");
        echo json_encode(common::load_model('profile_model', 'update_profile', [$_POST['access_token'], $_POST['name'], $_POST['surname'], $_POST['phone'], $_POST['city']]));
    }

    function update_avatar()
    {
        // echo json_encode("update_avatar");
        echo json_encode(common::load_model('profile_model', 'update_avatar', [$_POST['access_token'], $_POST['avatar']]));
    }

    function likes_profile()
    {
        // echo json_encode("likes_profile");
        echo json_encode(common::load_model('profile_model', 'likes_profile', $_POST['access_token']));
    }

    function like()
    {
        // echo json_encode("like");
        echo json_encode(common::load_model('profile_model', 'like', [$_POST['access_token'], $_POST['code_prop']]));
    }

    function orders_profile()
    {
        // echo json_encode("orders_profile");
        echo json_encode(common::load_model('profile_model', 'orders_profile', $_POST['access_token']));
    }

    function generate_pdf()
    {
        // echo json_encode("generate_pdf");
        echo json_encode(common::load_model('profile_model', 'generate_pdf', [$_POST['access_token'], $_POST['code_purchase']]));
    }

    function generate_qr()
    {
        // echo json_encode("generate_qr");
        echo json_encode(QR::createQR($_POST['pdf_url']));
    }

    function invoice_data()
    {
        // echo json_encode("invoice_data");
        echo json_encode(pdf::generatePDF($_POST['data']));
    }


}
?>