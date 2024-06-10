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

    function invoice()
    {
        // echo 'hola view desde el profile';
        common::load_view('top_page_profile.html', VIEW_PATH_PROFILE . 'invoice.html');
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

    function upload_avatar()
    {
        // echo json_encode("upload_avatar");
        echo json_encode(common::load_model('profile_model', 'upload_avatar', [$_FILES['file'], $_POST['access_token']]));
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

}
?>