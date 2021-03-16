Almost no web application can function without a user registration and authentication system. A user is usually authenticated by entering a username or email address and password and then being given access to various resources or services. By its very existence, authentication relies on maintaining the user's state. This seems to go against HTTP's fundamental property of being a stateless protocol.  

JSON Web Tokens (JWTs) are one solution to this problem. Your Angular app will communicate with a backend that generates tokens. The Angular app can then send the token to the backend as an Authorization header to show they're authenticated. The JWT should be checked by the backend, and access should be granted based on its validity.  

This tutorial will walk you through the process of developing and implementing JWT-based authentication in an Angular 11 application step by step.  
 
### Implement a JWT Server and Client with PHP and Angular 11
In this part, I'll show you how to use PHP in conjunction with an Angular 11 client to implement JWT authentication. Even though the principle is clear, the implementation necessitates familiarity with security best practices.  

The example provided here is incomplete, and it lacks a number of features that a production server would have. I'd therefore not recommend the source code in this tutorial for production purposes.    

I'll presume you're familiar with MySQL, Angular and PHP and have installed [composer](https://www.composer.org) installed in the development environment.     


### Building a JWT authentication 
To begin implementing the server that authenticates users using JSON Web Tokens, open a terminal and create a directory called `jwt-server` that will contain the server application.  

### Step 1: Create the Database
Let's get started by building a MySQL database if you have the prerequisites. The MySQL client that came with the server will be used. To invoke the client, open a terminal and type the following command:  

```bash 
    $ mysql -u root -p
```
Depending on your MySQL configurations, enter password when promted.  
On the window presented, run the following command to create a database.  

```bash
    mysql> create database jwt-database;
```
> It's important to note that we're assuming you have a MySQL user named root. This must be replaced with the name of an existing MySQL user. To build the database and SQL tables, you can use phpMyAdmin or any other MySQL client that you are familiar with.

Let's now pick the `jwt-database` we created earlier and create a users table to store our application's users:  

```bash 
mysql> use jwt-database;
mysql> CREATE  TABLE IF NOT EXISTS `jwt-users` (
  `user_id` INT  AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(150) NOT NULL ,
  `last_name` VARCHAR(150) NOT NULL ,
  `username` VARCHAR(150) NOT NULL ,
  `email_address` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,

```

Now, `cd` into the directory we created earlier by running the following command:  

```bash
    cd jwt-server
```
> NOTE: This path may vary depending on your development environment.  

### COnnecting to your database

In your working directory, create a folder `config` inside `api` directory.  

```bash 
cd api
````
Then,

```bash 
cd config
```

```php
<?php
// used to get mysql database connection
class DB_Connection{

    private $db_host     = "localhost"; //change to your  host
    private $db_name     = "jwt-database";//change to your db
    private $db_username = "root"; //change to your db username
    private $db_password = ""; //enter your password

    private $conn;// db connection

    public function db_connect(){

        $this->conn = null;

        try
        {
            $this->connection = new PDO("mysql:host=" . $this->db_host . ";dbname=" . $this->db_name, $this->db_user, $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

           //echo "connected";

        }
        catch(PDOException $e){
            echo "Error while establishing db connection " . $e->getMessage();
        }

        return $this->connect;
    }
}
?>
```
### Step 2: Install `php-jwt` package




