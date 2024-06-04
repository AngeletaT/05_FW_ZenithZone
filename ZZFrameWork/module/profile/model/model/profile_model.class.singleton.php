<?php
class profile_model
{

    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = profile_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function list_profile($args)
    {
        // return $args;
        return $this->bll->list_profile_BLL($args);
    }

    function update_profile($args)
    {
        // return $args;
        return $this->bll->update_profile_BLL($args);
    }
}
?>