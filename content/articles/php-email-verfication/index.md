Registration of new users with a valid email address has been a big challenge in most online service applications.
 For the email verification process, an activation link is provided. The user will receive an email with a link that they should be able to click to activate their account. After the user clicks the link in their email, it should redirect them to the login page; otherwise, if the user gives an invalid email address, their account will not be activated and they will be unable to log in.

In this tutorial, we will design a simple user registration form, and fill it with data and a register button which when clicked will submit data to the database. And for a user to be allowed to log in he/she must click the email verification link sent to their email address which he/she has entered in during registration to validate their account in the database. 

### Prerequisites
- Clear understanding of PHP.
- The user should have a basic knowledge of HTML, CSS, and Bootstrap.
- The user should be able to use XAMPP and VS code.

#### Goals
By the end of this tutorial, the reader will be able to:
- Configure Xammp to allow sending of email in the localhost.
- Create a registration form.
- Design a database table for storing the user details.
- Send the user an email including a confirmation link.
- Create an email verification token.
- Create a page for email verification.
- Design a login form.
- Only allow users to log in after their email addresses have been validated.

### Step 1 - Download and extract bootstrap
- Download the bootstrap zip file of the latest version and extract the file in a folder and copy JS and CSS links.

### Step 2 - Creating our project
- First, you create a folder inside the "htdocs" in xampp and give it a name of your choice e.g.  `email_verication`.

### Step 3 - Designing our simple registration interface and saving the data to the database
- In this step, we will design a user interface that will request the user to enter his/her username, email, and password, and confirm the password in the respective input field and a register button.
- First, open Visual Studio and click file then open the folder you created above and create a file inside and give the name e.g. `index.php`.
- Secondly, Open the browser and search bootstrap with the same version as the one we downloaded above.
- Click get started with bootstrap on the left-hand side and copy the link for CSS and JS and paste it inside `index.php` file.
- Inside the `index.php` we now design an interface that will prompt the user to enter his/her username, email, password, and confirm_password in the input fields.

- There are different ways of getting the user input which can either be using `GET` or `POST` methods, but in this tutorial, we shall use the `POST` method since the details cannot be displayed in URL unlike `GET` whereby all the details are displayed on the URL when the user click the register button hence making it insecure.
- Instead of using the PHP mailer API we shall use the mail function provided in PHP for us to send an email to a user who has registered but verification is still pending.

- Copy the following code and paste it into your `index.php` file.

```php
<?php
	$msg = "";
	if( isset($_POST['submit']) ) {
		$con = new mysqli('localhost', 'root', '', 'email_verify');

		$u_name =$_POST['username'];
		$email =$_POST['email'];
		$pwd = $_POST['password'];
		$confirm_pwd =$_POST['confirm_password'];

		if($pwd !== $confirm_pwd) {
			$msg = "Please check your password.";
		}
		else {
			$sql = $con->query("SELECT id FROM register WHERE email='$email'");
			if($sql->num_rows > 0) {
				$msg = "This email already exists.";
			}
			else {
				$pwd = md5($pwd);
				// generate token
				$token = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!*()$";

				$token = str_shuffle($token);
				$token = substr($token, 0, 10);

				$con->query("INSERT INTO register (username, email, password, is_confirm, token) VALUES ('$u_name', '$email', '$pwd', 0, '$token')");


				// The Content-type heading must be specified in order to  allow sending of HTML mail.
			    $heading  = 'MIME-Version: 1.0';
			    $heading .= 'Content-type: text/html; charset=iso-8859-1';

				// email headers
                 $heading .= 'From: '.$email."\r\n".
                 'Reply-To: '.$email."\r\n" .
                  'X-Mailer: PHP/' . phpversion();

				$subject = "Verify your email";
				$message = '<h4>Hello '.$u_name.',<br>Please <a href="http://localhost/email_verification/confirm.php?email='.$email.'&token='.$token.'">click here</a> to confirm your email address.</h4>';

				if(mail($email, $subject, $message,$heading)
				){

				   $msg="You have been registered. Please confirm your email address.";
				}
				else{
                    echo '<script>alert("Fail to check the correct format of an email.")</script>';
				}


			}
		}

	}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

	<!-- <link rel="stylesheet" type="text/css" href="style.css"> -->

	<title>Register Form </title>
 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</head>
<body>
	<div class="register-form" style ="width:400px;
    min-height:600px;background: #cc4f4f;text-align: center; margin-left: 35%;margin-top: 50px;padding-top:30px;">
		<div class="container">
			<div class="row justify-content-md-center">
				<div class="col-md-6 text-center">
					<h2>Registration form</h2>
					<?php
						if($msg != "") {
							echo '<div class="alert alert-success">'.$msg.'</div>';
						}
					?>
					<form action="index.php" method="post">

						<input type="text" name="username" placeholder="Name" class="form-control">
						<br>
						<input type="text" name="email" placeholder="Email" class="form-control">
						<br>
						<input type="password" name="password" placeholder="Password" class="form-control">
						<br>
						<input type="password" name="confirm_password" placeholder="Confirm Password" class="form-control">
						<br>

						<input type="submit" name="submit" value="Register" class="btn btn-primary">

					</form>
				</div>
			</div>
		</div>

	</div>
</body>
</html>

```

Your final output should be something similar to this

![Demo1](/engineering-education/How-to-Send-an-email-to verify-the-registration-of-a-new-user-in-PHP/demo1.png)

- After entering the details and clicking the register button the output should look like this:

  ![Demo2](/engineering-education/How-to-Send-an-email-to verify-the-registration-of-a-new-user-in-PHP/demo2.png)

### Step 4- Designing the database
- Open xampp, click Apache and MYSQL start button and on the second column of MYSQL, click on admin to open the browser.
After opening the browser click on the database to create a new database then give the name of your own choice.
- Create a database table that contains the following five columns: `username`, `email`, `password`, `is_confirm`, `token`.
- For this case, we will name the database as `email_verify` and the table as `register`.

#### Explanation

- `username` -This is any name of the user.
- `email_` -This is the email address that will receive the link for account verification.
- `password` -Unique password created by the user.
- `is_confirm` -Check whether the email is verified or not if not it will insert "0" and if verified it will insert "1".
- `token`- This holds the token number generated randomly which when an account is verified automatically changes from the database.

- `str_shuffle()` - function/method that randomly shuffles all the characters of a string to generate a unique number.
- `substr($token, 0, 10)`- technique for extracting a substring from a string that starts from characters in the token, a given character position between 0 to 10 and finishes before the string's end.

### Step 5- Designing a confirmation interface for email

We now create another PHP file - `confirm.php` that will contain a code that will verify the email stored in the database so that the user is allowed to log in.

- If the user has registered and has not verified their email, they will not be allowed to log in.

- Copy the following code and paste it into your `confirm.php` file.

```PHP


<?php

$email=$_GET['email'];
$token=$_GET['token'];
$con = new mysqli('localhost', 'root', '', 'email_verify');

$sql=$con->query("SELECT id FROM register WHERE email='$email' AND token='$token' AND is_confirm=0");
if($sql->num_rows >0)
{
    $con->query("UPDATE register SET is_confirm=1,token='' WHERE email='$email'");
    echo 'Email address verified. You can  click here to <a href="http://localhost/email_verification/login.php">login </a>';
}
else{
    echo ' please <a href="http://localhost/email_verification/login.php">login</a>';
}

?>

```

- If you log in with your unverified email address the output should look like the one below.

![Demo3](/engineering-education/How-to-Send-an-email-to verify-the-registration-of-a-new-user-in-PHP/demo3.png)

- But after clicking the confirmation link sent to your email the output should look like the one below:

![Demo6](/engineering-education/How-to-Send-an-email-to verify-the-registration-of-a-new-user-in-PHP/demo6.png)

### Step 6 - Configuring the xampp setting to allow sending of email from our local machine.

- Open xampp in your local disk C, then navigate to the PHP folder, open it and find the PHP file with an extension of `php.ini`, right-click on it, and open it with your preferred editor.

- When you open it find [mail function] and comment on everything by inserting a semicolon at the beginning of each line.

- Then after successfully inserting comments at the beginning of every statement copy the following statements and paste it inside it:

```php

SMTP=smtp.gmail.com
smtp_port=587
sendmail_from = johndoe@gmail.com
sendmail_path = "\"C:\xampp\sendmail\sendmail.exe\" -t"

```

### Explanation

- `sendmail_from ` -This is your email that is used to send mail to the receiver.
- `sendmail_path` -This is the part that contains the `sendemail.ini` file.
- `smtp_port`- This is the port number that supports the sending of emails.

- Open the xampp again, find the folder for Sendmail open it and find a file `sendmail.ini`. Right-click and open it with your editor and find [sendmail]. Comment every line by inserting the semicolon at the beginning of each statement.

- After successfully placing comments copy and paste these lines inside it.

```PHP
smtp_server=smtp.gmail.com
smtp_port=587
error_logfile=error.log
debug_logfile=debug.log
auth_username=myemail@gmail.com
auth_password=your email password
force_sender=myemail@gmail.com
```

### Explanation

- `smpt_port` -This is another SMTP submission port that is supported by the vast majority of servers and will significantly minimize the number of messages that are refused in Port 25.
- `smpt_port` -We change it to `smtp.gmail.com` because we want to send email using our Gmail account.

- `auth_password`- You enter your email password
- `force_sender`- Your email address(Sender email address).

### Step 7 - Design a login interface

- Here we will create a login interface that will ask the user to enter their email and password as stored in the database.

- Give it a name of your choice e.g. `login.php`.

- Also we will verify the user who wants to log in to confirm whether his/her details exist in the database.

- Copy the following code and paste it into your `login.php` file.

```php

<?php
    $msg = "";
    if( isset($_POST['login']) ) {
        $con = new mysqli('localhost', 'root', '', 'email_verify');
        $email = $con->real_escape_string($_POST['email']);
       $pass = $con->real_escape_string($_POST['password']);
       $pass = md5($pass);

        $sql = $con->query("SELECT * FROM register WHERE email='$email' AND password='$pass'");

        if($sql->num_rows > 0) {
            $results = $sql->fetch_array();
            if($results['is_confirm'] == 0) {
                $msg = "Please verify your email.";
            } else {
                $msg = "You have logged in successfully.";
            }
        } else {
            $msg = "Please check your inputs.";
        }
    }
?>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</head>
<body>
    <div class="login-form" style ="width:400px;
    min-height:600px;background: #cc4f4f;text-align: center; margin-left: 35%;margin-top: 50px;padding-top:30px;">
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-6 text-center">
                   <h2> Login  Form</h2>
                    <?php
                        if($msg != "") {
                            echo '<div class="alert alert-success">'.$msg.'</div>';
                        }
                    ?>
                    <form action="verifyLogin.php" method="post">

                        <input type="text" name="email" placeholder="Email" class="form-control">
                        <br>
                        <input type="password" name="password" placeholder="Password" class="form-control">
                        <br>

                        <input type="submit" name="login" value="Login" class="btn btn-primary">

                    </form>
                </div>

            </div>
        </div>

    </div>
</body>
</html>




```

![Demo4](/engineering-education/How-to-Send-an-email-to verify-the-registration-of-a-new-user-in-PHP/demo4.png)

### Conclusion
In this tutorial we have learned how to Configure Xammp to allow sending of email via localhost, design a form for registration, design a database table for storing the user details, send an email to the user containing a link for confirmation, generate a token for email verification, designed an email verification page, created a login form and learned how to allow users to log in only once their emails have been verified.

### Further reading
- PHP documentation Mail function.
