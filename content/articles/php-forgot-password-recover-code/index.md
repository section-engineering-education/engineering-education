### Introduction
We'll study the case about how to restore a forgotten password in this post.
we will create a forgot password form that collects the username or email address in order to recover the password.
Going to follow submission of the application, we will send the user an email showing a password reset link.
The Password Reset email contains a link to a page where we can reset the password.
### Table of content
- [Introduction](#introduction)
- [Forgot password code](#forgot-password-code)
- [Password reset](#password-reset)
- [Reset password form](#reset-password-form)
- [Recover password database structure](#recover-password-database-structure)
- [Forgot password recovery email](#forgot-password-recovery-email)
### Forgot password code

```php
<?php


if (! empty($_POST["forgot-btn"])) {
    require_once __DIR__ . '/Model/Member.php';
    $member = new Member();
    $displayMessage = $member->handleForgot();
}
?>
<HTML>
<HEAD>
<TITLE>Forgot Password</TITLE>
<link href="assets/css/folder-style.css" type="text/css"
	rel="stylesheet" />
<link href="assets/css/user-registration.css" type="text/css"
	rel="stylesheet" />
<script src="vendor/jquery/jquery-3.3.1.js" type="text/javascript"></script>
</HEAD>
<BODY>
	<div class="phppot-container">
		<div class="sign-up-container">
			<div class="signup-align">
				<form name="login" action="" method="post"
					onsubmit="return loginValidation()">
					<div class="signup-heading">Forgot Password</div>
<?php
if (! empty($displayMessage["status"])) {
    if ($displayMessage["status"] == "error") {
        ?>
				    <div class="server-response error-msg"><?php echo $displayMessage["message"]; ?></div>
<?php
    } else if ($displayMessage["status"] == "success") {
        ?>
                    <div class="server-response success-msg"><?php echo $displayMessage["message"]; ?></div>
<?php
    }
}
?>
				<div class="row">
						<div class="inline-block">
							<div class="form-label">
								Username<span class="required error" id="username-info"></span>
							</div>
							<input class="input-box-330" type="text" name="username"
								id="username">
						</div>
					</div>
					<div class="row">
						<input class="btn" type="submit" name="forgot-btn" id="forgot-btn"
							value="Forgot Password">
					</div>
				</form>
			</div>
		</div>
	</div>

	<script>
function loginValidation() {
	var valid = true;
	$("#username").removeClass("error-field");
	var UserName = $("#username").val();
	$("#username-info").html("").hide();

	if (UserName.trim() == "") {
		$("#username-info").html("required.").css("color", "#ee0000").show();
		$("#username").addClass("error-field");
		valid = false;
	}
	if (valid == false) {
		$('.error-field').first().focus();
		valid = false;
	}
	return valid;
}
</script>
</BODY>
</HTML>
```

member.php
```php
<?php


class Member
{

    private $ds;

    private $applicationUrl = 'http://localhost/forgot-password-reset/';

    function __construct()
    {
        require_once __DIR__ . '/../lib/DataSource.php';
        $this->ds = new DataSource();
    }

    /**
     * to get member record by username
     *
     * @param string $username
     * @return array
     */
    public function getMember($username)
    {
        $query = 'SELECT * FROM tbl_member where username = ?';
        $paramType = 's';
        $paramValue = array(
            $username
        );
        $memberRecord = $this->ds->select($query, $paramType, $paramValue);
        return $memberRecord;
    }

    /**
     * main function that handles the forgot password
     *
     * @return string[]
     */
    public function handleForgot()
    {
        if (! empty($_POST["username"])) {
            $memberRecord = $this->getMember($_POST["username"]);
            require_once __DIR__ . "/PasswordReset.php";
            $passwordReset = new PasswordReset();
            $token = $this->generateRandomString(97);
            if (! empty($memberRecord)) {
                $passwordReset->insert($memberRecord[0]['id'], $token);
                $this->sendResetPasswordEmail($memberRecord, $token);
            } else {
                
                sleep(2);
            }
        }
        
        $displayMessage = array(
            "status" => "success",
            "message" => "Check your email to reset password."
        );
        return $displayMessage;
    }

    
    public function sendResetPasswordEmail($memberListAry, $token)
    {
        $resetUrl = '<a href="' . $this->applicationUrl . 'reset-password.php?token=' . $token . '">reset</a>';
        $emailBody = 'Hi, </br>To reset your password, click this link ' . $resetUrl;
        $to = $memberListAry[0]["email"];
        $subject = 'Reset password';
        mail($to, $subject, $emailBody);
    }

    public function updatePassword($id, $password)
    {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $query = 'UPDATE tbl_member SET password = ? WHERE id = ?';
        $paramType = 'si';
        $paramValue = array(
            $hashedPassword,
            $id
        );
        $this->ds->execute($query, $paramType, $paramValue);

        $displayMessage = array(
            "status" => "success",
            "message" => "Password reset successfully."
        );
        return $displayMessage;
    }

    /**
     * use this function if you have PHP version 7 or greater
     * else use the below fuction generateRandomString
     *
     * @param int $length
     * @param string $keyspace
     * @throws \RangeException
     * @return string
     */
    function getRandomString(int $length = 64, string $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'): string
    {
        if ($length < 1) {
            throw new \RangeException("Length must be a positive integer");
        }
        $pieces = [];
        $max = mb_strlen($keyspace, '8bit') - 1;
        for ($i = 0; $i < $length; ++ $i) {
            $pieces[] = $keyspace[random_int(0, $max)];
        }
        return implode('', $pieces);
    }

  
    function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i ++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
```

### Password reset
passwordReset.php
```php
<?php


class PasswordReset
{

    private $ds;

    function __construct()
    {
        require_once __DIR__ . '/../lib/DataSource.php';
        $this->ds = new DataSource();
    }

    public function insert($memberId, $token)
    {
        $query = 'INSERT INTO tbl_password_reset (member_id, password_recovery_token, expire_at, is_valid) VALUES (?, ?, ?, ?)';
        $paramType = 'sssi';
        $time = date('Y-m-d H:i:s');
        
        $RESET_TOKEN_LIFE = '12 hours';
        $expireAt = date('Y-m-d H:i:s', strtotime($time . ' + ' . $RESET_TOKEN_LIFE));

        $paramValue = array(
            $memberId,
            $token,
            $expireAt,
            1
        );
        $memberId = $this->ds->insert($query, $paramType, $paramValue);
    }

    public function getMemberForgotByResetToken($recoveryToken)
    {
        $query = 'SELECT * FROM tbl_password_reset where password_recovery_token = ? AND is_valid = 1 AND expire_at >= now()';
        $paramType = 's';
        $paramValue = array(
            $recoveryToken
        );
        $memberRecord = $this->ds->select($query, $paramType, $paramValue);
        return $memberRecord;
    }

    public function expireToken($recoveryToken)
    {
        $query = 'UPDATE tbl_password_reset SET is_valid = 0, expired_at = now() WHERE password_recovery_token = ?';
        $paramType = 's';
        $paramValue = array(
            $recoveryToken
        );
        $this->ds->execute($query, $paramType, $paramValue);
    }
}
```
### Reset password form
password.php
```php
<?php


require_once __DIR__ . '/Model/PasswordReset.php';
$passwordReset = new PasswordReset();

if (empty($_GET["token"])) {
    
    echo 'Invalid request!';
    exit();
} else {
    $token = $_GET["token"];
   
    $memberRecord = $passwordReset->getMemberForgotByResetToken($token);
    if (empty($memberRecord)) {
        
        echo 'Invalid request!';
        exit();
    }
}
if (! empty($_POST["reset-btn"])) {
    $passwordReset->expireToken($token);
    require_once __DIR__ . '/Model/Member.php';
    $member = new Member();
    $displayMessage = $member->updatePassword($memberRecord[0]['member_id'], $_POST["password"]);
}
?>
<HTML>
<HEAD>
<TITLE>Reset Password</TITLE>
<link href="assets/css/phppot-style.css" type="text/css"
	rel="stylesheet" />
<link href="assets/css/user-registration.css" type="text/css"
	rel="stylesheet" />
<script src="vendor/jquery/jquery-3.3.1.js" type="text/javascript"></script>
</HEAD>
<BODY>
	<div class="phppot-container">
		<div class="sign-up-container">
			<div class="">
				<form name="reset-password" action="" method="post"
					onsubmit="return resetPasswordValidation()">
					<div class="signup-heading">Reset Password</div>
<?php
if (! empty($displayMessage["status"])) {
    if ($displayMessage["status"] == "error") {
        ?>
				    <div class="server-response error-msg"><?php echo $displayMessage["message"]; ?></div>
<?php
    } else if ($displayMessage["status"] == "success") {
        ?>
                    <div class="server-response success-msg"><?php echo $displayMessage["message"]; ?></div>
<?php
    }
}
?>
				<div class="error-msg" id="error-msg"></div>
					<div class="row">
						<div class="inline-block">
							<div class="form-label">
								Password<span class="required error" id="forgot-password-info"></span>
							</div>
							<input class="input-box-330" type="password" name="password"
								id="password">
						</div>
					</div>
					<div class="row">
						<div class="inline-block">
							<div class="form-label">
								Confirm Password<span class="required error"
									id="confirm-password-info"></span>
							</div>
							<input class="input-box-330" type="password"
								name="confirm-password" id="confirm-password">
						</div>
					</div>
					<div class="row">
						<input class="btn" type="submit" name="reset-btn" id="reset-btn"
							value="Reset Password">
					</div>
				</form>
			</div>
		</div>
	</div>

	<script>
function resetPasswordValidation() {
	var valid = true;
	$("#password").removeClass("error-field");
	$("#confirm-password").removeClass("error-field");

	var Password = $('#password').val();
    var ConfirmPassword = $('#confirm-password').val();

	if (Password.trim() == "") {
		$("#forgot-password-info").html("required.").css("color", "#ee0000").show();
		$("#password").addClass("error-field");
		valid = false;
	}
	if (ConfirmPassword.trim() == "") {
		$("#confirm-password-info").html("required.").css("color", "#ee0000").show();
		$("#confirm-password").addClass("error-field");
		valid = false;
	}
	if(Password != ConfirmPassword){
        $("#error-msg").html("Both passwords must be same.").show();
        valid=false;
    }
	if (valid == false) {
		$('.error-field').first().focus();
		valid = false;
	}
	return valid;
}
</script>
</BODY>
</HTML>

```
### Recover password database structure
structure.sql
```php
-- phpMyAdmin SQL Dump
-- version 5.0.2
--
-- Host: localhost
-- Generation Time: Sep 17, 2020 at 04:16 PM
-- Server version: 8.0.17
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forgot-password-reset`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_member`
--

CREATE TABLE `tbl_member` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_password_reset`
--

CREATE TABLE `tbl_password_reset` (
  `id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `password_recovery_token` varchar(255) NOT NULL,
  `expire_at` timestamp NULL DEFAULT NULL,
  `is_valid` tinyint(4) NOT NULL,
  `expired_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_member`
--
ALTER TABLE `tbl_member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_password_reset`
--
ALTER TABLE `tbl_password_reset`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_member`
--
ALTER TABLE `tbl_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `tbl_password_reset`
--
ALTER TABLE `tbl_password_reset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

```
### Forgot password recovery email
If the username is found in the database, a recovery mail is sent to the user’s email. The recovery mail will have a link. The link’s essential part is a hashed random secure token. This is designed in such a way that the user will not be able to mimic it.

A record against that member will be done in the table tbl_password_reset with a generated hash secure token. When the user clicks the link with the token, it will be validated for expiry time.

In this example project, for brevity, Php’s mail() function is used. If you wish you can substitute it with PHPMailer based SMTP email.