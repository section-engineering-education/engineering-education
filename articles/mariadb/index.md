## Creating, Connecting, Storing, and fetching data from MariaDatabase using PHP 

[MariaDatabase](https://mariadb.org/) is one of the most popular relational database management system (DBMS). It is the open source version of MySQL database. It is based on Structured Query Language (SQL). SQL is a standard language for creating, storing, and fetching data in databases. In this tutorial, we are going to learn how to use MariaDatabase and PHP in Ubuntu. 

## Prerequisites

To follow along with this tutorial you need:

- Some knowledge of `HTML` and `CSS`
- A code editor. You can get Visual Studio Code [here](https://code.visualstudio.com/download).

In this tutorial you will learn how to:

- Install Xampp
- Create  tables in a database using SQL commands
- Create a registration form using PHP
- Store form data into the database
- Fetch the stored data from the database using PHP

### Step 1 -- Installing Xampp

Xampp comes along with PhpMyAdmin when downloaded into a machine. 
PhpMyAdmin is the tool to help manage the database.

Download Xampp [here](https://www.apachefriends.org/download.html).

Move to where your package was downloaded and open in terminal.

<<<<<<< HEAD
To install the package, you'll need to make it executable using the `chmod` command. Execute the command below in the terminal.
=======
- create a registration form using 

- store data from the registration form into the database

- fetch the saved data from the Database  

## Step 1: Installing Xampp

Xampp comes along with PhpMyAdmin when downloaded into a machine.  PhpMyAdmin is the MariaDatabase that we will be working on within this article.

To install Xampp you need to;

## . Download the package to be installed.

Downloading the package is always the first step you need to do when installing Xampp. You can download the package [here](https://www.apachefriends.org/download.html). Download the latest version of Xampp for Linux and start the installation. Very easy.

## . Give the package permission so that it can be executable

To make this package executable, you need to open the terminal (Ctrl+alt+T) and follow the following:

1. Move to where your package is located. In my case,  it is in the Downloads folder and so I will navigate to the Downloads folder using this command:

```bash

$ cd /home/[username]/Downloads

```

2. Run the Chmod command (sudo chmod 755 [package name] )to make the package file executable.

The  Xampp version may differ. In my case I have then following:
>>>>>>> e1aa8e4a4d9709652fa76ad40a09b5b78a96b994

```bash
$ sudo chmod 755 xampp-linux-x64-7.4.10-0-installer.run
```

The command executes with no output. Verify that we have executed the permission by running below the command below:

```bash
$  ls -l xampp-linux-x64-7.4.10-0-installer.run

-rwxrwxrwx 1 erastus erastus 157293721 Sep 12 22:23 xampp-linux-x64-7.4.10-0-installer.run
```

<<<<<<< HEAD
Then run the installer by executing the command below.
=======
Here, this is the output you will get.

```bash

-rwxrwxrwx 1 [username] [username] 157293721 Sep 12 22:23 xampp-linux-x64-7.4.10-0-installer.run

```

The username above is the user who can execute the file.

## . Launch  Setup Wizard

1. It's now time to run the installer and launch the setup wizard. To do this, use the following command:
>>>>>>> e1aa8e4a4d9709652fa76ad40a09b5b78a96b994

```bash
$ sudo ./xampp-linux-x64-7.4.10-0-installer.run
```

<<<<<<< HEAD
![XAMPP Setup Wizard](/engineering-education/mariadb/img1.png)
=======
2. When you click enter in the above command, you should have XAMPP Setup Wizard opens as the image below:

 ![XAMPP Setup Wizard](/engineering-education/mariadb/img1.png)


## . Select Components dialogue

1. You should click ``Next`` in the above image and Select Components dialogue. You should choose either XAMPP Core Files or Xampp Developer Files and install. You may keep the default setting and proceed with `Next`

2. The Setup will show you where the software will be installed. The location should be `/opt/lampp`. Click `Next` to proceed.

3. After clicking next, you should see a dialogue box installing applications. Uncheck  `Learn more about Bitnami for XAMPP` to deny and click `Next`.

4. Xampp is now ready to be installed by the Wizard. Start the installation by clicking `Next`.

5. The Installation process should start immediately as in the figure below.
>>>>>>> e1aa8e4a4d9709652fa76ad40a09b5b78a96b994

Click **Next** until the installation process is finished.


<<<<<<< HEAD
![XAMPP Setup Wizard](/engineering-education/mariadb/img2.png)
=======
## . Launching Xampp
>>>>>>> e1aa8e4a4d9709652fa76ad40a09b5b78a96b994

Once the installation is finished, move to the Manage Servers tab and click **Start** to start all the services.

![XAMPP Start Services](/engineering-education/mariadb/img3.png)

<<<<<<< HEAD
To verify your installation open your browser at http://localhost/dashboard. You should see something like this.
=======

In the Manage Serves tab, click `Start` to start all the services.

## . Verifying that XAMPP is running

Here we are going to verify that we have installed two things. The `localhost` and the `MariaDB`

1. For localhost enter the following URL in a browser: http://localhost/dashboard

If You see an image like the one below, the Xampp is installed in your machine.
>>>>>>> e1aa8e4a4d9709652fa76ad40a09b5b78a96b994

![XAMPP Setup Wizard](/engineering-education/mariadb/img4.png)

You can also open http://localhost/phpmyadmin/ to access PhpMyAdmin. You should see something like this.
![localhost phpmyadmin](/engineering-education/mariadb/phpmyadmin.png)

### Step 2 -- Creating tables in MariaDB using SQL commands.

Now that we have our environment working, we can start working with MariaDB. 

Open a terminal and run the following command.

```bash
$ /opt/lampp/bin/mysql -u root -p
```

The terminal will ask you for a password, press Enter as we have not set any password.

When you press Enter you should have the following output:

![MariaDB in terminal](/engineering-education/mariadb/maria.png)

The next thing to do is to create a Database. Let's create a Database called `school`. execute the following sql command:

```sql
$ create database school;

Query OK, 1 row affected (0.000 sec)
```
To confirm that you have created a Database `school`, execute the command below. A database `school` should be among the output.
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

Now, let us create a table `students`. Execute the SQL below.

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
So far, we have created a database `school` and  a table `students` inside it. Now, let's view this database school and its tables in PhpMyAdmin. Open your browser and navigate  to http://localhost/phpmyadmin/. You should see something like this.

![phpmyadmin database](/engineering-education/mariadb/database.png)

### Step 3 -- Creating a registration form

Here, we will create a form and store the data collected from it in our  `school` database.

Xampp serves files located under `/opt/lampp/htdocs`. Let us create a folder `school` in this directory to host our form. Execute the following commands in a terminal.

```bash
$ cd /opt/lampp/htdocs
$ sudo mkdir school
$ cd school
```
Create two files `index.php` and `connect.php`. To do this, execute the following command in the terminal.
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

To style, the HTML form you have created above add the following code after `</form>` tag.

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

![form](/engineering-education/mariadb/form.png)

Now, let us connect our form with the database. Inside `connect.php` add this code:

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
### Step 4 -- Storing data into the database
Let us fill our form in the browser with the  details below. 
```
Firstname: Peter
Lastname: James
Email: peterjames@gmail.com
Phone: 0700000067
```
When you hit **Save**, the details above should be saved in our database.

When we open http://localhost/phpmyadmin/ on the browser we should have something like this in our database.

![Saved form data](/engineering-education/mariadb/database2.png)

### Step 5 -- Fetching data from the Database

To fetch data that we have saved, add the code below into `index.php` right under`</form>` tag.

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
On refreshing the page, we have;
![database2](/engineering-education/mariadb/img5.png)

The data at the bottom of the page has been fetched from the database.

## Conclusion

In this tuorial we have:
- Installed xampp
- Created a simple form using a `PHP` code
- Stored data into the database
- Fetched data from the database