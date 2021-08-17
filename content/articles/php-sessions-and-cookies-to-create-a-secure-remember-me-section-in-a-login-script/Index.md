### Introduction

---

In the Login Script, the 'Remember Me' functionality allows users who have logged in to keep their status.A user's logged-in status is serialized in PHP sessions, cookies, or other similar storage when they select the Remember Me option.
It's important to be aware of security flaws that could compromise the application's authentication system when storing user login data in a session or a cookie. Cookie storage of plain passwords should be avoided, as this will allow application hacking.
You will learn how to create a persistent PHP web application by reading this article. When a user attempts to log in to the program, their credentials are validated against the database.
Before redirecting the user to their dashboard, the PHP session and cookies are used to preserve the user's logged-in state. Session IDs are created when users successfully log in.
The cookies are then set to save the login name and password for a given length of time. To prevent hacking, a random password and token are produced and kept in the cookie instead of the users' plain password.
While accessing application pages, a check is made to see if the user is currently logged in, and if not, the page is not displayed. After checking if the session is empty, a cookie check will be performed to determine if the user is logged in. This happens when both the session and cookies do not contain any information about a remembered login.
With a 1 month expiration date, authentication cookies can be used to authenticate a user. It will be possible to store random passwords and tokens in a database along with their expiration date and time. When logging in, the cookie-based logged-in state validation is performed by checking the database for cookie expiration and availability.

**Prerequisites**

- PHP and MSQL
- PHP cookies
- PHP sessions

#### Table of contents

- [Introduction](#introduction)

- [Preserve Logged in State](#create-cookies-to-preserve-the-logged-in-state)
- [validate remembered login](#validate-remembered-login-with-php-session-and-cookies)
- [Clear Remembered Login](#clear-remembered-login-with-session-and-cookies-on-logout)
- [Controller Classes](#auth-and-dbcontroller-classes)
- [conclusion](#conclusion)

### Create Cookies to Preserve the Logged-In State

---

To obtain the username and password, I've created a login form. This form has a 'Remember Me' checkbox for the user's convenience, which allows the user to keep his logged-in state. When a user provides their login information, PHP receives it and compares it to the database of members.

On successful login, if the user selected ‘Remember Me’ then the logged-in status is stored in PHP session and cookies.

Because storing the plain password in the cookie is a security flaw, the authentication keys are produced using random integers. These keys are hashed and saved in a database with a one-month expiration time. When the timer runs out, the expiration flag is set to 0 and the keys are turned off.

```php
<?php
session_start();

require_once "Auth.php";
require_once "Util.php";

$auth = new Auth();
$db_handle = new DBController();
$util = new Util();

require_once "authCookieSessionValidate.php";

if ($isLoggedIn) {
    $util->redirect("dashboard.php");
}

if (! empty($_POST["login"])) {
    $isAuthenticated = false;

    $username = $_POST["member_name"];
    $password = $_POST["member_password"];

    $user = $auth->getMemberByUsername($username);
    if (password_verify($password, $user[0]["member_password"])) {
        $isAuthenticated = true;
    }

    if ($isAuthenticated) {
        $_SESSION["member_id"] = $user[0]["member_id"];

        // Set Auth Cookies if 'Remember Me' checked
        if (! empty($_POST["remember"])) {
            setcookie("member_login", $username, $cookie_expiration_time);

            $random_password = $util->getToken(16);
            setcookie("random_password", $random_password, $cookie_expiration_time);

            $random_selector = $util->getToken(32);
            setcookie("random_selector", $random_selector, $cookie_expiration_time);

            $random_password_hash = password_hash($random_password, PASSWORD_DEFAULT);
            $random_selector_hash = password_hash($random_selector, PASSWORD_DEFAULT);

            $expiry_date = date("Y-m-d H:i:s", $cookie_expiration_time);

            // mark existing token as expired
            $userToken = $auth->getTokenByUsername($username, 0);
            if (! empty($userToken[0]["id"])) {
                $auth->markAsExpired($userToken[0]["id"]);
            }
            // Insert new token
            $auth->insertToken($username, $random_password_hash, $random_selector_hash, $expiry_date);
        } else {
            $util->clearAuthCookie();
        }
        $util->redirect("dashboard.php");
    } else {
        $message = "Invalid Login";
    }
}
?>
```

- HTML code to display login form with a "Remember Me" option.

```html
<form action="" method="post" id="frmLogin">
    <div class="error-message"><?php if(isset($message)) { echo $message; } ?></div>
    <div class="field-group">
        <div>
            <label for="login">Username</label>
        </div>
        <div>
            <input name="member_name" type="text"
                value="<?php if(isset($_COOKIE["member_login"])) { echo $_COOKIE["member_login"]; } ?>"
                class="input-field">
        </div>
    </div>
    <div class="field-group">
        <div>
            <label for="password">Password</label>
        </div>
        <div>
            <input name="member_password" type="password"
                value="<?php if(isset($_COOKIE["member_password"])) { echo $_COOKIE["member_password"]; } ?>"
                class="input-field">
        </div>
    </div>
    <div class="field-group">
        <div>
            <input type="checkbox" name="remember" id="remember"
                <?php if(isset($_COOKIE["member_login"])) { ?> checked
                <?php } ?> /> <label for="remember-me">Remember me</label>
        </div>
    </div>
    <div class="field-group">
        <div>
            <input type="submit" name="login" value="Login"
                class="form-submit-button"></span>
        </div>
    </div>
</form>
```

### Validate Remembered Login with PHP Session and Cookies

---

authCookieSessionValidate.php, a PHP page, contains code for validating the logged-in state based on session and cookie data. For applications that require user authentication, it appears at the beginning of the application page.

$loggedIn is set to true if it's present in the session or cookie array. It is determined by this boolean value whether or not the user can proceed or be redirected back to the login page.

First, the PHP session is used to check the remembered login. If it returns false, the function will look in the cookies for the authentication keys. If the keys aren't empty, they'll be hashed and checked against the database.

When a match is identified, the expiration date is checked against the current date and time. The user will be sent to the dashboard once the code has passed all of the validation checks.

```php
<?php
require_once "Auth.php";
require_once "Util.php";

$auth = new Auth();
$db_handle = new DBController();
$util = new Util();
$current_time = time();
$current_date = date("Y-m-d H:i:s", $current_time);
$cookie_expiration_time = $current_time + (30 * 24 * 60 * 60);
$isLoggedIn = false;
if (! empty($_SESSION["member_id"])) {
    $isLoggedIn = true;
}
else if (! empty($_COOKIE["member_login"]) && ! empty($_COOKIE["random_password"]) && ! empty($_COOKIE["random_selector"])) {
    $isPasswordVerified = false;
    $isSelectorVerified = false;
    $isExpiryDateVerified = false;
    $userToken = $auth->getTokenByUsername($_COOKIE["member_login"],0);

    if (password_verify($_COOKIE["random_password"], $userToken[0]["password_hash"])) {
        $isPasswordVerified = true;
    }

    if (password_verify($_COOKIE["random_selector"], $userToken[0]["selector_hash"])) {
        $isSelectorVerified = true;
    }

    if($userToken[0]["expiry_date"] >= $current_date) {
        $isExpiryDateVerified = true;
    }
    if (!empty($userToken[0]["id"]) && $isPasswordVerified && $isSelectorVerified && $isExpiryDateVerified) {
        $isLoggedIn = true;
    } else {
        if(!empty($userToken[0]["id"])) {
            $auth->markAsExpired($userToken[0]["id"]);
        }
        $util->clearAuthCookie();
    }
}
?>
```

### Clear Remembered Login with Session and Cookies on Logout

---

On the dashboard panel, the logout link is featured in the welcome text.The saved login status is erased from the PHP session and cookies when you click the logout link.

```php
<?php
session_start();

require "Util.php";
$util = new Util();
$_SESSION["member_id"] = "";
session_destroy();
$util->clearAuthCookie();
header("Location: ./");
?>
```

#### Database Script

Test the example on your own system by importing the SQL script below. Log in with username admin and password admin to access the site.

```sql
--
-- Database: `db_auth`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `member_id` int(8) NOT NULL,
  `member_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `member_password` varchar(64) NOT NULL,
  `member_email` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `member_name`, `member_password`, `member_email`) VALUES
(1, 'admin', '$2a$10$0FHEQ5/cplO3eEKillHvh.y009Wsf4WCKvQHsZntLamTUToIBe.fG', 'user@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_token_auth`
--

CREATE TABLE `tbl_token_auth` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `selector_hash` varchar(255) NOT NULL,
  `is_expired` int(11) NOT NULL DEFAULT '0',
  `expiry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `tbl_token_auth`
--
ALTER TABLE `tbl_token_auth`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_token_auth`
--
ALTER TABLE `tbl_token_auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;
```

### Auth and DBController Classes

---

#### Auth.php

These are the classes used to trigger and handle database operations. The database querying is performed efficiently with the MySQLi prepared statement

```php
<?php
require "DBController.php";
class Auth {
    function getMemberByUsername($username) {
        $db_handle = new DBController();
        $query = "Select * from members where member_name = ?";
        $result = $db_handle->runQuery($query, 's', array($username));
        return $result;
    }

	function getTokenByUsername($username,$expired) {
	    $db_handle = new DBController();
	    $query = "Select * from tbl_token_auth where username = ? and is_expired = ?";
	    $result = $db_handle->runQuery($query, 'si', array($username, $expired));
	    return $result;
    }

    function markAsExpired($tokenId) {
        $db_handle = new DBController();
        $query = "UPDATE tbl_token_auth SET is_expired = ? WHERE id = ?";
        $expired = 1;
        $result = $db_handle->update($query, 'ii', array($expired, $tokenId));
        return $result;
    }

    function insertToken($username, $random_password_hash, $random_selector_hash, $expiry_date) {
        $db_handle = new DBController();
        $query = "INSERT INTO tbl_token_auth (username, password_hash, selector_hash, expiry_date) values (?, ?, ?,?)";
        $result = $db_handle->insert($query, 'ssss', array($username, $random_password_hash, $random_selector_hash, $expiry_date));
        return $result;
    }

    function update($query) {
        mysqli_query($this->conn,$query);
    }
}
?>
```

#### DataBase Controller.php

```php
<?php
class DBController {
	private $host = "localhost";
	private $user = "root";
	private $password = "test";
	private $database = "db_auth";
	private $conn;

    function __construct() {
        $this->conn = $this->connectDB();
	}

	function connectDB() {
		$conn = mysqli_connect($this->host,$this->user,$this->password,$this->database);
		return $conn;
	}

    function runBaseQuery($query) {
                $result = mysqli_query($this->conn,$query);
                while($row=mysqli_fetch_assoc($result)) {
                $resultset[] = $row;
                }
                if(!empty($resultset))
                return $resultset;
    }



    function runQuery($query, $param_type, $param_value_array) {

        $sql = $this->conn->prepare($query);
        $this->bindQueryParams($sql, $param_type, $param_value_array);
        $sql->execute();
        $result = $sql->get_result();

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $resultset[] = $row;
            }
        }

        if(!empty($resultset)) {
            return $resultset;
        }
    }

    function bindQueryParams($sql, $param_type, $param_value_array) {
        $param_value_reference[] = & $param_type;
        for($i=0; $i<count($param_value_array); $i++) {
            $param_value_reference[] = & $param_value_array[$i];
        }
        call_user_func_array(array(
            $sql,
            'bind_param'
        ), $param_value_reference);
    }

    function insert($query, $param_type, $param_value_array) {
        $sql = $this->conn->prepare($query);
        $this->bindQueryParams($sql, $param_type, $param_value_array);
        $sql->execute();
    }

    function update($query, $param_type, $param_value_array) {
        $sql = $this->conn->prepare($query);
        $this->bindQueryParams($sql, $param_type, $param_value_array);
        $sql->execute();
    }
}
?>

```

### Conclusion

---

If you check the "Remember Me" box, your browser will save a cookie so that if you exit the site window without signing out, you will be immediately logged back in the next time you visit.Otherwise, this will not work unless you set your browser to remember cookies.

If you select the "Remember Me" option, your browser will save a cookie so that if you close the site window without signing out, you will be automatically logged in the next time you visit. Otherwise, unless you set your browser to remember cookies, this will not work.

**Further Reading**

- How to store User log-in details using javascript cookies.

Happy Coding !
