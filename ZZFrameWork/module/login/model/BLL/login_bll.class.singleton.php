<?php
class login_bll
{
    private $dao;
    private $db;
    static $_instance;

    function __construct()
    {
        $this->dao = login_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_data_user_BLL()
    {
        return $this->dao->select_data_user($this->db);
    }

    public function register_user_BLL($args)
    {
        $hashed_pass = password_hash($args[2], PASSWORD_DEFAULT, ['cost' => 12]);
        $hashavatar = md5(strtolower(trim($args[1])));
        $avatar = "https://i.pravatar.cc/500?u=$hashavatar";

        $token_email = common::generate_Token_secure(20);

        if (!empty($this->dao->select_user($this->db, $args[0], $args[1]))) {
            return 'error';
        } else {
            $this->dao->insert_user($this->db, $args[0], $args[1], $hashed_pass, $avatar, $token_email);
            $message = [
                'type' => 'validate',
                'token' => $token_email,
                'toEmail' => $args[1]
            ];
            $email = json_decode(mail::send_email($message), true);
            if (!empty($email)) {
                return;
            }
        }
    }

    public function login_user_BLL($args)
    {

    }

    public function verify_email_BLL($args)
    {
        // return $args;
        if ($this->dao->select_verify_email($this->db, $args)) {
            $this->dao->update_verify_email($this->db, $args);
            return 'verify';
        } else {
            return 'fail';
        }
    }
}