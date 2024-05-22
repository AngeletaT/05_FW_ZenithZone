<?php
@session_start();
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

    // REGISTER
    public function register_user_BLL($args)
    {
        $hashed_pass = password_hash($args[2], PASSWORD_DEFAULT, ['cost' => 12]);
        $hashavatar = md5(strtolower(trim($args[1])));
        $avatar = "https://i.pravatar.cc/500?u=$hashavatar";

        $token_email = middleware::create_token_email($args[1]);


        if (!empty($this->dao->select_user($this->db, $args[0], $args[1]))) {
            return 'error';
        } else {
            $this->dao->insert_user($this->db, $args[0], $args[1], $hashed_pass, $avatar);
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
    public function verify_email_BLL($args)
    {
        $email = middleware::decode_token_email($args);

        // return $email;
        // return $args;
        if ($email['exp'] > time()) {
            echo json_encode("Email caducado");
            exit();
        } else {
            // return $args;
            if ($this->dao->select_verify_email($this->db, $email['email'])) {
                $this->dao->update_verify_email($this->db, $email['email']);
                return 'verify';
            } else {
                return 'fail';
            }
        }
    }

    // LOGIN
    public function login_user_BLL($args)
    {
        $attempts = $this->dao->select_login_attempts($this->db, $args[0]);
        $otp_token = common::generate_token_secure(5);
        if ($attempts[0]['login_attempts'] >= 3) {
            if ($this->dao->insert_otp_token($this->db, $args[0], $otp_token)) {
                $message = [
                    'type' => 'fail_login',
                    'token' => $otp_token,
                    'toPhone' => $attempts[0]['phone_number']
                ];
                $phone_code = json_decode(otp::send_message($message));
                if (!empty($phone_code)) {
                    return 'otp';
                } else {
                    return 'error_attempts';
                }

            } else {
                return 'error_attempts';
            }
        } else {
            if (!empty($this->dao->select_user($this->db, $args[0], $args[0]))) {
                $user = $this->dao->select_user($this->db, $args[0], $args[0]);
                // return $user;
                if (password_verify($args[1], $user[0]['password']) && $user[0]['isActive'] == 1) {
                    $access_token = middleware::create_token($user[0]["username"]);
                    $refresh_token = middleware::create_refresh_token($user[0]["username"]);
                    $_SESSION['username'] = $user[0]['username'];
                    $_SESSION['tiempo'] = time();

                    return json_encode([$access_token, $refresh_token]);
                } else if (password_verify($args[1], $user[0]['password']) && $user[0]['isActive'] == 0) {
                    return 'inactive_user';
                } else {
                    $this->dao->update_login_attempts($this->db, $args[0]);
                    return 'error_passwd';
                }
            } else {
                return 'error_username';
            }
        }
    }

    public function validate_otp_BLL($args)
    {
        // return $args;
        if ($this->dao->select_user($this->db, $args[0], $args[0])) {
            if ($this->dao->select_otp_token($this->db, $args[0], $args[1])) {
                $this->dao->update_otp_token($this->db, $args[0]);
                return 'valid';
            } else {
                return 'error_otp';
            }
        } else {
            return 'error_username_otp';
        }
    }

    public function get_data_user_BLL($args)
    {
        $username = middleware::decode_token($args);
        // return $username;

        return $this->dao->select_data_user($this->db, $username['username']);
    }
    public function logout_user_BLL()
    {
        unset($_SESSION['username']);
        unset($_SESSION['tiempo']);
        return 'logout';
    }

    // RECOVER PASSWORD
    public function send_recover_email_BLL($args)
    {
        $user = $this->dao->select_recover_password($this->db, $args);
        $token_email = middleware::create_token_email($args);

        if (!empty($user)) {
            $this->dao->update_recover_password($this->db, $args, $token_email);
            $message = [
                'type' => 'recover',
                'token' => $token_email,
                'toEmail' => $args
            ];
            $email = json_decode(mail::send_email($message), true);
            if (!empty($email)) {
                return;
            }
        } else {
            return 'error';
        }
    }
    public function verify_token_BLL($args)
    {
        $email = middleware::decode_token_email($args);

        if ($email['exp'] < time()) {
            echo json_encode("Email caducado");
            exit();
        } else {
            if ($this->dao->select_verify_email($this->db, $email['email'])) {
                return 'verify';
            } else {
                return 'fail';
            }
        }
    }
    public function new_password_BLL($args)
    {
        $email = middleware::decode_token_email($args[0]);
        $hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);

        if ($email['exp'] < time()) {
            echo json_encode("Email caducado");
            exit();
        } else {
            if ($this->dao->update_new_password($this->db, $email['email'], $hashed_pass)) {
                return 'update';
            } else {
                return 'fail';
            }
        }
    }

    // ACTIVITY USER
    public function control_user_BLL($args)
    {
        $access_token = middleware::decode_token($args[0]);
        $refresh_token = middleware::decode_token($args[1]);

        if ($access_token['exp'] < time()) {
            if ($refresh_token['exp'] < time()) {
                echo json_encode("Wrong_User");
                exit();
            } else {
                $old_access_token = middleware::decode_token($args[0]);
                $new_access_token = middleware::create_token($old_access_token['username']);
                echo json_encode($new_access_token);
                exit();
            }
        }

        if (isset($_SESSION['username']) && ($_SESSION['username']) == $access_token['username']) {
            echo json_encode("Correct_User");
            exit();
        } else {
            echo json_encode("Wrong_User");

        }
    }
    public function actividad_BLL()
    {
        if (!isset($_SESSION["tiempo"])) {
            echo json_encode("inactivo");
            exit();
        } else {
            if ((time() - $_SESSION["tiempo"]) >= 1800) { //1800s=30min
                echo json_encode("inactivo");
                exit();
            } else {
                echo json_encode("activo");

            }
        }
    }
    public function refresh_cookie_BLL()
    {
        session_regenerate_id();
        echo json_encode("Done");
    }
}