---
layout: engineering-education
status: publish
published: true
url: /maria-data-base/
title: Creating and Connecting Maria Database to a PHP Registration Form 
description: A tutorial that provides a detailed guide on how to create and connect a Maria database to a PHP registration form.
author: erastus-muriithi
date: 2021-01-23T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/maria-data-base/hero.jpg
    alt: MariaDB example image
---
A database is a critical tool when it comes to software development. It helps you manage different information or records. A database such as MYSQL is used by numerous developers worldwide. This tutorial shows you how to use Maria database in PHP.
<!--more-->
### Introduction
[Maria Database](https://mariadb.com/) is one of the most popular relational database management system (DBMS). It is an open source version of MySQL database. Maria Database is based on Structured Query Language (SQL). SQL is a standard language for creating, storing, and fetching data in databases. In this tutorial, we are going to learn how to use MariaDatabase and PHP in Ubuntu. 

### Prerequisites
To follow along with this tutorial you will need:
- Some knowledge of `HTML`, `PHP`, and `CSS`
- A code editor. You can download Visual Studio Code from [here](https://code.visualstudio.com/download).

#### In this tutorial you will learn how to:
- Install Xampp.
- Create  tables in a database using SQL commands.
- Create a registration form using PHP.
- Store form data into the database.
- Fetch the stored data from the database using PHP.

### Step 1 -- Installing Xampp
Xampp comes along with PhpMyAdmin when downloaded into a machine.  PhpMyAdmin is the tool to help manage the database.

Download Xampp [here](https://www.apachefriends.org/download.html).

Navigate to where your package was downloaded and open in terminal.

To install the package, you'll need to make it executable using the `chmod` command. Execute the command below in the terminal.

```bash
$ sudo chmod 755 xampp-linux-x64-7.4.10-0-installer.run
```

The command executes with no output. Verify that we have executed the permission by running the command below:

```bash
$  ls -l xampp-linux-x64-7.4.10-0-installer.run

-rwxrwxrwx 1 erastus erastus 157293721 Sep 12 22:23 xampp-linux-x64-7.4.10-0-installer.run
```

Then run the installer by executing the command below.

```bash
$ sudo ./xampp-linux-x64-7.4.10-0-installer.run
```

![XAMPP Setup Wizard](/engineering-education/maria-data-base/img1.png)

Click **Next** until the installation process is finished.

![XAMPP Setup Wizard](/engineering-education/maria-data-base/img2.png)

Once the installation is finished, move to the Manage Servers tab and click **Start** to start all the services.

![XAMPP Start Services](/engineering-education/maria-data-base/img3.png)

To verify your installation open your browser at http://localhost/dashboard. You should see something like this.

![XAMPP Setup Wizard](/engineering-education/maria-data-base/img4.png)

You can also open http://localhost/phpmyadmin/ to access PhpMyAdmin. You should see something like this.

![localhost phpmyadmin](/engineering-education/maria-data-base/phpmyadmin.png)

### Step 2 -- Creating tables in MariaDB using SQL commands.
Now that we have our environment working, we can start working with MariaDB. 

Open a terminal and run the following command.

```bash
$ /opt/lampp/bin/mysql -u root -p
```

The terminal will ask you for a password, press Enter as we have not set any password.

When you press Enter you should have the following output:

![MariaDB in terminal](/engineering-education/maria-data-base/maria.png)

The next thing to do is to create a Database. Let's create a Database called `school`. By executing the following sql command:

```sql  
$ create database school;

Query OK, 1 row affected (0.000 sec)
```

To confirm that you have created a Database named `school`, execute the command below. The database `school` should be among the output.

```sql
show databases;
MariaDB [(none)]> show databases;
+---------------------------+
| Database                  |
+---------------------------+
| information_schema        |
| login                     |
| mysql                     |
| performance_schema        |
| phpmyadmin                |
| school                    |
| sudos                     |
| test                      |
+---------------------------+
8 rows in set (0.067 sec)
```

Now let's create tables in our `school` database. To do this, let us use the `use` SQL command to select our database.

```sql
$ use school;

Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
```

Now, let's create a table named `students`. 

Let's execute the SQL below.

```sql

$ create table students(

   id int(11) not null AUTO_INCREMENT primary key,

   firstname varchar(50) not null,

   lastname varchar(20) not null,

   email varchar(56) not null,

   phone varchar(15) not null);
```

To see the created table, execute this command:
```sql
$ desc students;

+-----------+-------------+------+-----+---------+----------------+
| Field     | Type        | Null | Key | Default | Extra          |
+-----------+-------------+------+-----+---------+----------------+
| id        | int(11)     | NO   | PRI | NULL    | auto_increment |
| firstname | varchar(50) | NO   |     | NULL    |                |
| lastname  | varchar(20) | NO   |     | NULL    |                |
| email     | varchar(56) | NO   |     | NULL    |                |
| phone     | varchar(34) | NO   |     | NULL    |                |
+-----------+-------------+------+-----+---------+----------------+
5 rows in set (0.023 sec)
```

So far, we have created a database `school` and a table `students` inside it. Now, let's view this database school and its tables in PhpMyAdmin. Open your browser and navigate to http://localhost/phpmyadmin/. You should see something like this.

![phpmyadmin database](/engineering-education/maria-data-base/database.png)

### Step 3 -- Creating a registration form
Here, we will create a form and store the data collected from it in our `school` database.

Xampp serves files located under `/opt/lampp/htdocs`. Let us create a folder named `school` in this directory to host our form. Execute the following commands in a terminal.

```bash
$ cd /opt/lampp/htdocs
$ sudo mkdir school
$ cd school
```

Create two files, `index.php` and `connect.php`. To do this, execute the following command in the terminal.

```bash
$ sudo touch index.php connect.php
```

The file `index.php` will carry the form HTML code, while `connect.php` connects the form with the database.

Then open `index.php` using [Gedit](https://help.gnome.org/users/gedit/stable/) by running the command below.

```bash
$ sudo gedit index.php
```

Then add the following code inside.
```html
<!DOCTYPE html>
<html>
<head>
  <title>Working with the database </title>
</head>
<body>
  <h1>Registration Form</h1>
  <h3>Saving Data into the database</h3>
  <form action="connect.php" method="POST">
    <label>Firstname</label>
    <input type="text" placeholder="Enter firstname" name="firstname" required ="true">
    <br>
    <label>Lastname</label>
    <input type="text" placeholder="Enter lastname" name="lastname" required ="true">
    <br>
    <label>Email</label>
    <input type="email" placeholder="Enter email" name="email" required ="true">
    <br>
    <label>Phone</label>
    <input type="phone" placeholder="Enter Phone" name="phone" required ="true">
    <br> 
    <button type="submit">Save</button>
  </form> 
</body>
</html>
```

To view the form, open http://localhost/school 

To style, the HTML form you have created above add the following code after the `</form>` tag.

```css
<style>
body {
   text-align: center;
   padding-top: 20px;
   background-color: blue;
 }

h3 {
  color: white;
}
</style>
```

The page should now look like this:

![form](/engineering-education/maria-data-base/form.png)

Now, let's connect our form with the database. 

Inside `connect.php` add this code:
```php
<?php

//Database records.The records we have in the database

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$phone = $_POST['phone'];

//Making DataBase connection

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'school';
$conn = new mysqli("localhost","root",'',"school");

//Checking for errors and inserting data into the database

if ($conn-> connect_error) {
       die('connection failed :' .$conn-> $connect_error);
}

else {
       $sql = ("INSERT INTO students(firstname,lastname,email,phone)
       VALUES ('$firstname','$lastname','$email','$phone')");
}

$sql = mysqli_query($conn, $sql);

// $sql conditions which will be displayed after clicking the save button

if ($sql == true) {
       echo "Records saved";
} else {
       echo "Records not saved  ";
}

?> 
```

### Step 4 -- Storing data in the database
Let's fill out our form in the browser with the  details below. 

```bash
Firstname: Peter
Lastname: James
Email: peterjames@gmail.com
Phone: 0700000067
```

When you hit **Save**, the details above should be saved in our database.

When we open http://localhost/phpmyadmin/ on the browser we should have something like this in our database.

![Saved form data](/engineering-education/maria-data-base/database2.png)

### Step 5 -- Fetching data from the Database
To fetch the data that we just saved, add the code below into `index.php` right under the `</form>` tag.

```php

<br>

//Creating a table where data from the database will be stored

<h3>Fetching Data from database</h3>
<table align="center" style="width:300px;">
<tr>
    <th>id</th>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Email</th>
    <th>Phone</th>
</tr>

<?php
//database connection
$conn = new mysqli("localhost","root",'',"school");
//checking for errors
if($conn->connect_error) {
       die("Error in DB connection: ".$conn->connect_errno." : ".$conn->connect_error);    

}

$select = "SELECT * FROM `students` ORDER BY id";

$result = $conn->query($select);

//displaying data from MariaDB on a browser using while loop

while($row = mysqli_fetch_array($result)) {  
         ?> 
         <tr>  
              <td><?php echo $row["id"]; ?></td>  
              <td><?php echo $row["firstname"]; ?></td>  
              <td><?php echo $row["lastname"]; ?></td> 
              <td><?php echo $row["email"]; ?></td> 
              <td><?php echo $row["phone"]; ?></td> 
         </tr>  
         <?php  
         }  
         ?> 
    </table>
```

On refreshing the page, we should see:

![database2](/engineering-education/maria-data-base/img5.png)

The data at the bottom of the page has been fetched from the database.

### Conclusion
In this tuorial we have:
- Installed xampp.
- Created a database using terminal.
- Created a simple form using a `PHP` code.
- Stored data into the database.
- Fetched data from the database. 

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)