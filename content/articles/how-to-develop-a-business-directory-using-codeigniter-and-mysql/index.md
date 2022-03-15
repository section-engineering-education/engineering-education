---
layout: engineering-education
status: publish
published: true
url: /how-to-develop-a-business-directory-using-codeigniter-and-mysql/
title: Developing a Business Directory Using CodeIgniter and MySQL
description: In this article, we will use CodeIgniter and MySQL to build a simple business directory. CodeIgniter is a PHP MVC framework used to build web applications rapidly.
author: lilian-kerubo
date: 2021-09-03T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-develop-a-business-directory-using-codeigniter-and-mysql/hero.png
    alt: Codeigniter and mysql business directory image
---
[CodeIgniter](https://codeigniter.com/userguide3/tutorial/index.html) is a PHP [MVC framework](https://www.guru99.com/mvc-tutorial.html) used to build web applications rapidly. It provides out-of-box libraries for connecting to databases such as MySQL, and performing various tasks such as sending emails, uploading files, and managing sessions.
<!--more-->
In this article, we will be using CodeIgniter and MySQL to build a simple business directory. Since CodeIgniter is an MVC framework, the `model` will be related to the database, `view` will be the HTML part seen on the web browser, and `controller` will be the logic that connects our models to the views.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation and setup](#installation-and-setup)
- [Database setup](#database-setup)
- [Coding the application](#coding-the-application)
- [Routing](#routing)
- [Wrapping up](#wrapping-up)

### Prerequisites
To follow through this article, you will need to have:
- [CodeIgniter](https://codeigniter.com/download) installed
- [XAMPP](https://www.apachefriends.org/download.html) installed
- Working knowledge of [PHP](https://www.php.net/) and [MySQL](https://www.mysql.com/)
- A web browser, we will be using [Google Chrome](https://www.google.com/chrome/)

### Installation and setup
First, we will install XAMPP software in our development environment. The software package comes preinstalled with Apache, MySQL, and PHP.

You can decide to install them separately, but in our case, we will use XAMPP to provide an environment for developing PHP and MySQL applications.

We will also set up CodeIgniter. First visit their download page to get the latest version, then follow the installation instructions provided in their documentation.

We will unzip the folder and place it in our server's root directory, which in XAMPP is `htdocs`, and rename it to `bizdir`.

To verify that everything is working as expected, we will start up our Apache server, launch our web browser, and access the link [http://localhost/bizdir](http://localhost/bizdir).

![code igniter](/engineering-education/how-to-develop-a-business-directory-using-codeigniter-and-mysql/codeigniter-start-page.png)

### Database setup
We will create a database named `bizdir` by running the command below in the MySQL Console terminal:

```SQL
create database bizdir;
```

Inside the database created, we will create a table by the name `business_dir` by executing the command below:

```SQL
create table business_dir
(
   id int auto_increment primary key,
   biz_name varchar(255) not null,
   cat varchar(255) not null,
   addr varchar(255) not null,
   tel varchar(255),
   website varchar(255),
   email varchar(255)
);
```

Back to our project directory, go to `application/config/database.php` and edit the desired configuration for our database by setting the value in `$db[‘default’]` array. We will need to edit the database username, password, and name as shown below:

```php
$db['default'] = array(
    'dsn' => '',
    'hostname' => 'localhost',
    'username' => 'root',       	// <-- your username
    'password' => '',               // <-- your password
    'database' => 'bizdir',         // <-- your database
    ...
    ...
    'save_queries' => TRUE
);
```

### Coding the application
As mentioned earlier, CodeIgniter is an MVC framework, meaning we have models, views, and controllers. In our case, models are database-related.

The view is the application's front end; the `HTML` part seen in the web browser. The controller is the logic that connects our models with views. The controller forms the business logic of the application.

#### Model
We will first define our models. We create a file named `Bizdir_model.php` inside `application/models` and add the code below:

```php
<?php
class Bizdir_model extends CI_Model {
    public function __construct()
    {
        $this->load->database();
    }
}
```

In the code snippet above, we have created a class named `Bizdir_model`, which inherits the properties of `CI_Model` class prebuilt in the CodeIgniter framework. The constructor loads the database using `$this->db`.

Next, we have to insert and retrieve data into our database. We will achieve this by adding a method `get_bizdir()` to retrieve data as shown below:

```php
public function get_bizdir()
    {
        $query = $this->db->get('business_dir');
        return $query->result_array();
    }
```

Inside the function `get_bizdir`, we are fetching all the data stored inside our directory table. The function does the same purpose as the query `SELECT * FROM business_dir;`.

We will insert dummy data into our table via `PHPMyAdmin` or even `MySQL` console window by running the command below:

```SQL
INSERT INTO `business_dir` (`id`, `biz_name`, `cat`, `addr`, `tel`, `website`, `email`) VALUES
(1, 'VILLA ROSA KEMPINSKI', 'Hotels', 'Waiyaki Way, Nairobi', '+254 703 049 000', 'https://www.kempinski.com/en/nairobi/hotel-villa-rosa/', 'info@kempinski.com'),
(2, 'COOPERATIVE BANK OF KENYA', 'Financial Institution', 'Moi Avenue, Nairobi', '+254 701 255 265', 'https://www.coop-net.com', 'info@coop-net.com'),
(3, 'CHESTER HOTEL', 'Hotels', 'Kariba, Nakuru', '+254 705 442 636', 'https://www.chester.co.ke', 'info@chester.co.ke'),
(4, 'JAJOS FAST FOODS', 'Cafe', 'Freehold, Nakuru', '+254 708 699 536', 'https://www.jajos.co.ke', 'info@jajos.co.ke'),
(5, 'THIKA MOTOR HUB', 'Car Bazaar', 'Kenyatta Avenue, Thika', '+254 721 639 856', 'https://www.thika-hub.com', 'admin@thika-hub.com');
```

#### Controller
Next, we will create a controller that fetches the data from the model and passes it to our view. We will create a file named `Bizdir.php` inside the `application/controllers` directory and add the code below:

```php
<?PHP
class Bizdir extends CI_Controller {

   public function __construct()
   {
      parent::__construct();
      $this->load->model('bizdir_model');
   }

   public function index()
   {
      $data['directories'] = $this->bizdir_model->get_bizdir();
      $data['title'] = 'Business Directory';

      $this->load->view('templates/header', $data);
      $this->load->view('bizdir/index', $data);
      $this->load->view('templates/footer');
   }

   public function any()
   {
      $data['title'] = 'Business Directory: Any Page';
      $this->load->view('bizdir/any', $data);
   }
}
```

The `Bizdir` class inherits the `CI_Controller` class. Inside the constructor, we call `CI_Controller`; our parent class. Then next line loads the model by making it accessible using `$this->load->model('bizdir_model');`.

We fetched all the data in the index method and stored it in `$data['directories']`. Then, another key named `title` is added to the variable `$data`, and in the rest of the code, we pass the variable and render the views.

The key `$data` will be accessible to our views like `$title` and `$directories`. The `any()` method redirects any other URL that is not matched.

#### View
Next, we will create the views for our application. First create a new directory called `templates` inside the `application/views` folder, then create two files, `header.php` and `footer.php`, inside the `templates` folder.

The `application/views/templates/header.php` file will appear as shown below:

```php
<html>
<head>
   <title><?php echo $title; ?>: This is a business directory</title>
</head>
<body>
<h1 style="text-align: center"><?php echo $title; ?></h1>
```

And the `application/views/templates/footer.php` file will have the code below:

```php
<p style="text-align: center; margin-top: 15px">&copy; 2021 Business Directory. All rights reserved.</p>
</body>
</html>
```

Then we can proceed to create a new directory named `bizdir` and write the code below in the file `index.php` located inside `application/views/bizdir/index.php`:

```php
<table>
<style>
table {
  border-collapse: collapse;
  width: 100%;
  font-family: arial, sans-serif;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
   <thead>
   <tr>
      <th>Business Name</th>
      <th>Category</th>
      <th>Address</th>
      <th>Phone</th>
      <th>Website</th>
      <th>Email</th>
   </tr>
   </thead>
   <tbody>
   <?php foreach ($directories as $dir): ?>
      <tr>
         <td><?php echo $dir['biz_name']; ?></td>
         <td><?php echo $dir['cat']; ?></td>
         <td><?php echo $dir['addr']; ?></td>
         <td><?php echo $dir['tel']; ?></td>
         <td><?php echo $dir['website']; ?></td>
         <td><?php echo $dir['email']; ?></td>
      </tr>
   <?php endforeach; ?>
   </tbody>
</table>
```

In the header section, we are displaying the `title` that we defined in the controller. Inside the `index.php` file, we have created a loop that iterates through the list of businesses stored in our database.

A new `<tr>` is created on each loop, and all values are displayed inside `<td>`.

We will create `any.php` file inside `application/views/bizdir` and add the code below:

```php
<div style="text-align: center; margin-top: 50px; padding-top: 50px;">
   <h2>Error</h2>
   <p>Click <a href="">here</a> to go to home page</p>
</div>
```

### Routing
We are now done setting up our MVC, next step is to create the routes to the specific views. We start by opening the `application/config/router.php` file and edding the code below:

```php
$route['dir'] = 'bizdir';
$route['dir/(:any)'] = 'bizdir/any';
$route['default_controller'] = 'welcome';
```

In the code snippet above, the key `$route` appears in the browser URL. Then the value on the right points the method from the controller that will be called.

If only the controller's name is given, such as `bizdir` in our case, it will call the `index()` method. Also, if the URL contains anything after `dir/`, it will call the `any()` method.

Now we can visit [http://localhost/bizdir/index.php/dir](http://localhost/bizdir/index.php/dir) to verify if everything works as expected.

The results will be as shown below:

![Business Directory](/engineering-education/how-to-develop-a-business-directory-using-codeigniter-and-mysql/biz-dir.png)

As you can seen, data is fetched from the database and rendered on the browser.

### Conclusion
Much functionality can be added and implemented in the application. However, that goes beyond the purpose of this tutorial.

The primary goal of this tutorial was to show you how to get started with CodeIgniter.

The code snippets used in this tutorial can be found at this [GitHub Repository](https://github.com/kerubo-tech/business_directory/).

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
