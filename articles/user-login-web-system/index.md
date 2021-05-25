---
layout: engineering-education
status: publish
published: true
url: /engineering-education/user-login-web-system/
title: How to Create a User Login Web System in Python
description: How to create a user login system to protect the website from unauthorized access using Python on Ubuntu Server 18.04.
author: gregory-manley
date: 2020-05-04T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/user-login-web-system/hero.jpg
    alt: User Login Web System
---
Recently, I started work on a project where I had to figure out how to create a user login system to protect the website from unauthorized access. In this tutorial, I will show you how to make the same system using **Python on Ubuntu Server 18.04**.
<!--more-->

### Setting up prerequisite software
To begin, we recommend, regardless of the project or end goal, to start by running the following command:
```python
sudo apt-get update && sudo apt-get upgrade -y
```
and
```python
sudo apt-get install cmake build-essential -y
```

After this, you will need to install the Python Development software and a MySQL development client by running the following:
```python
sudo apt-get install python python-pip python-dev libmysqlclient-dev python-mysql.connector python3-mysql.connector -y
```

Now we install MariaDB as our database where we will store our usernames and hashed passwords:
```python
sudo apt-get install mariadb-server -y
```
Once installed, run the following command to set up a user, database, and table to connect our Python code to:
```python
sudo mysql
```

Now run:
```python
CREATE USER 'chooseAUserName'@'localhost' IDENTIFIED BY 'chooseAPassword';
```

Then run:
```python
GRANT ALL PRIVILEGES ON *.* TO 'chooseAUserName'@'localhost' WITH GRANT OPTION;
exit
```

Now we will install some Python libraries that we will need.
```python
pip install flask
pip install flask-sqlalchemy
pip install flask-login
pip install passlib
```

### Setting up users
Now, we are going to set up the user database and add a few users. First, connect to MariaDB by running:
```python
sudo mysql
```

Next, create a new database named `Login`:
```python
CREATE DATABASE Login;
```
Then, enter the database so that we can add a table that will hold the users:
```python
USE Login;
```
And to create the table:
```python
CREATE TABLE Login (uid INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100), password VARCHAR(200), email VARCHAR(200));
exit
```
Now, to create users, we will actually create a small Python program to add users to the database.

You will need to open a [tmux](https://en.wikipedia.org/wiki/Tmux) instance so that we can edit the file and still have the Python program running in the background. To do that, follow this series of commands:
```python
tmux
```
```python
mkdir pythonlogin
```
```python
nano newUser.py
```
With this file open, copy, and paste the following code:

```Python
from flask import Flask, render_template, request
from passlib.hash import sha256_crypt
import mysql.connector as mariadb
app = Flask(__name__)
maraidb_connection = mariadb.connect(user='chooseAUserName', password='chooseAPassword', database='Login')
@app.route('/')
def index():
  username = "newUserName"
  password = sha256_crypt.encrypt("newPassword")
  email = "what@ever.com"

  cur = mariadb_connection.cursor()
  cur.execute('INSERT INTO Login (username, password, email) VALUES (%s, %s, %s)', (username, password, email))
  mariadb_connection.commit()
  cur.close()

  return "New user added"
if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port='5000')
```
Now, close and save the file by pressing `control x`, `y`, `enter`, `enter`.

Now, while still in tmux run:

```python
newUser.py
```
Then exit tmux for the time being by pressing `control b`, then `d`.

Now run:

```python
curl ipinfo.io/ip
```
and enter the resulting IP into another computer's browser by typing yourIP:5000/
You have now added your first user. To add another run:

```python
nano newUser.py
```
and change the username, password, and email fields. Now save and exit like above. Then refresh the webpage on the other computer, and you have successfully added another user. You can add as many users as you wish by repeating this process.

Once you have added all the users that you wish, run:

```python
tmux attach
```
Then, press `control c`, followed by `control d`.

### Python programming
Now that we have set up a few users, let's write the Python code for the Login System and go through what it does.

First, create a new file by running:
```python
nano main.py
```
With the file open, you can copy and paste or type the following code:
```Python
from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session, abort
from passlib.hash import sha256_crypt
import mysql.connector as mariadb
import os
import operator
app = Flask(__name__)
mariadb_connect = mariadb.connect(user='chooseAUserName', password='chooseAPassword', databse='Login')
@app.route('/')
def home():
  if not session.get('logged_in'):
    return render_template('login.html')
  else:
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def do_admin_login():
  login = request.form

  userName = login['username']
  password = login['password']

  cur = mariadb_connect.cursor(buffered=True)
  data = cur.execute('SELECT * FROM Login WHERE username=%s', (userName))
  data = cur.fetchone()[2]

  if sha256_crypt.verify(password, data):
    account = True

  if account:
    session['logged_in'] = True
  else:
    flash('wrong password!')
  return home()

@app.route('logout')
def logout():
  session['logged_in'] = False
  return home()

if __name__ == "__main__":
  app.secret_key = os.urandom(12)
  app.run(debug=False,host='0.0.0.0', port=5000)
```
In this file, we will first import the Python libraries that we will need. Then we will connect to the database itself. The first function determines if a user is logged in, and if not, show them the login page.

Then, in the `do_admin_login` function we get the user's input from the web form, hash their password, and verify it against the hashed password in our database. If this returns true, the user is now logged in and redirects to `index.html` (our homepage).

We have also included a logout function that allows for users to logout by clicking a link. Finally, we set the host to `0.0.0.0`, meaning that we are hosting to outside users (not on the same computer) at port 5000.

### HTML and CSS
We now need to create the login webpage with HTML and CSS.

First run:
```HTML
mkdir templates
```
Then:
```HTML
nano login.html
```
With that file open, copy and paste the following:
```HTML
 <style>
 * {
box-sizing: border-box;
}
*:focus {
outline: none;
}
body {
font-family: Arial;
background-color: #E55423;
padding: 50px;
}
.login {
margin: 20px auto;
width: 300px;
}
.login-screen {
background-color: #FFF;
padding: 20px;
border-radius: 5px
}
.app-title {
text-align: center;
color: #777;
}
.login-form {
text-align: center;
}
.control-group {
margin-bottom: 10px;
}
input {
text-align: center;
background-color: #ECF0F1;
border: 2px solid transparent;
border-radius: 3px;
font-size: 16px;
font-weight: 200;
padding: 10px 0;
width: 250px;
transition: border .5s;
}
input:focus {
border: 2px solid #3498DB;
box-shadow: none;
}
.btn {
border: 2px solid transparent;
background: #E55423;
color: #ffffff;
font-size: 16px;
line-height: 25px;
padding: 10px 0;
text-decoration: none;
text-shadow: none;
border-radius: 3px;
box-shadow: none;
transition: 0.25s;
display: block;
width: 250px;
margin: 0 auto;
}
.btn:hover {
background-color: #E55423;
}
.login-link {
font-size: 12px;
color: #444;
display: block;
margin-top: 12px;
}  
 </style>
 <title>Login</title>
{% block body %}
<form action="/lgoin" method="POST">
<div class="login">
  <div class="login-screen">
    <div class="app-title">
      <h1>Login</h1>
    </div>
  <div class="login-form">
    <div class="control-group">
        <input type="text" class="login-field" value="" placeholder="username" name="username">
        <label class="login-field-icon fui-user" for="login-name"></label>
    </div>
    <div class="control-group">
        <input type="password" class="login-field" value="" placeholder="password" name="password">
        <label class="login-field-icon fui-lock" for="login-pass"></label>
    </div>
     <input type="submit" value="Log in" class="btn btn-primary btn-large btn-block">
   </div>
  </div>
 </div>
</form>
{% endblock %}
```

Now that we have the login page done, let's create a simple homepage.

Create and open a new file in the same location:
```HTML
nano index.html
```
Copy and paste the following code:

```HTML
<!DOCTYPE html>
<html>

<head>
  <title>Welcome</title>  
</head>

<body>
  <div class="welcome">
    <center>
      <h1>
        <font size="13" color="black">
           Welcome
        </font>
      </h1>
    </center>
  </div>

  <center>
    <hr>
  </center>

  <center>
    <a href="/logout">Logout</a>
  </center>

  <div class="breaker">
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>

  <div class="footer">
    <footer style="position: fixed; left: 2; right: 2; width: 95%; bottom: 0;">
      <center>
        This webpage is only accessible behind a User Web Login System written in Python
      </center>
    </footer>
  </div>
</body>

</html>
```

We can now exit out of the templates folder by typing ```cd ../```, and we are ready to run!

### Testing your code
Now that you have the code written, we can run it and try it in our browser. To do this, run:
```python
main.py
```

Now you can access the system by visiting the same link used when we were creating users: `yourIP:5000/`

Congratulations! You have now created a user login system for a website in Python! You can now create your own website with private webpages, where you may do things like keep a private journal, store your notes or other files, and much more. Let your imagination go wild and create something amazing.
