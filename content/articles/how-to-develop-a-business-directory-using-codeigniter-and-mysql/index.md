### Introduction
[CodeIgniter](https://codeigniter.com/userguide3/tutorial/index.html) is a PHP [MVC framework](https://www.guru99.com/mvc-tutorial.html) which developers use to build web applications rapidly. It provides out-of-box libraries for connecting to the database such as MySQL and performing various tasks such as sending emails, uploading files, and managing sessions.

In this article, we will be using CodeIgniter and MySQL to build a simple business directory. Since CodeIgniter is an MVC framework, the Model will be related to the database, View will be the HTML part seen on the web browser, and Controller will be the logic that connects our Models with the Views.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation and setup](#installation-and-setup)
- [Database setup](#database-setup)
- [Coding the application](#coding-the-application)
- [Routing](#routing)
- [Wrapping up](#wrapping-up)

### Prerequisites
- [Code Igniter](https://codeigniter.com/download) installed
- [XAMPP](https://www.apachefriends.org/download.html) installed
- Working knowledge of [PHP](https://www.php.net/) and [MySQL](https://www.mysql.com/)
- A web browser, we will be using [Google Chrome](https://www.google.com/chrome/)

### Installation and setup
First, we will install XAMPP software in our development environment. The software package comes preinstalled with Apache, MySQL, and PHP. A developer can decide to install them separately, but in our case, we will use XAMPP to provide an environment for developing PHP and MySQL applications.

We will also set up CodeIgniter. We visit their download page and get the latest version. Then we will follow the installation instructions provided in their documentation. 

We will unzip the folder and place it in our server's root directory, which in XAMPP is `htdocs`, and rename it to `bizdir`.

To verify that everything is working as expected, we will start up our Apache server, launch our web browser, and access the link http://localhost/bizdir.

![code igniter](/engineering-education/how-to-develop-a-business-directory-using-codeigniter-and-mysql/codeigniter-start-page.PNG)

### Database setup
We will create a database named `bizdir` by running the below command in the MySQL Console terminal:

```sql
create database bizdir;
```

Inside the database created, we will create a table by the name `business_dir` by executing the below command:

```sql
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

Back to our project directory, we go to `application/config/database.php` and edit the desired configuration for our database by setting the value in `$db[‘default’]` array. We will need to edit the database username, password and name as shown below:

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
As mentioned earlier, CodeIgniter is an MVC framework, meaning we have models, views, and controllers. In our case, models are database-related. The view is the application's front end, the `HTML` part is seen in the web browser, and the controller is the logic that connects our models with views. The controller forms the business logic of the application.

#### Model
We will first define our models. We create a file named `Bizdir_model.php` inside `application/models` and add the below code:

```php
<?php
class Bizdir_model extends CI_Model {
    public function __construct()
    {
        $this->load->database();
    }
}
```

In the above code snippet, we have created a class by the name `Bizdir_model` which inherits the properties of `CI_Model` class prebuilt in the CodeIgniter framework. Then the constructor loads the database using `$this->db` to access the database.

Next, we have to insert and retrieve data into our database. We will achieve this by adding a method `get_bizdir()` to retrieve data as below:

```php
public function get_bizdir()
    {
        $query = $this->db->get('business_dir');
        return $query->result_array();
    }
```

Inside the function `get_bizdir`, we are fetching all the data stored inside our directory table. The function is the same as running the `SELECT * FROM business_dir;` query.

We will insert dummy data into our table via `PHPMyAdmin` or even `MySQL` console window by running the below command:

```sql
INSERT INTO `business_dir` (`id`, `biz_name`, `cat`, `addr`, `tel`, `website`, `email`) VALUES
(1, 'VILLA ROSA KEMPINSKI', 'Hotels', 'Waiyaki Way, Nairobi', '+254 703 049 000', 'https://www.kempinski.com/en/nairobi/hotel-villa-rosa/', 'info@kempinski.com'),
(2, 'COOPERATIVE BANK OF KENYA', 'Financial Institution', 'Moi Avenue, Nairobi', '+254 701 255 265', 'https://www.coop-net.com', 'info@coop-net.com'),
(3, 'CHESTER HOTEL', 'Hotels', 'Kariba, Nakuru', '+254 705 442 636', 'https://www.chester.co.ke', 'info@chester.co.ke'),
(4, 'JAJOS FAST FOODS', 'Cafe', 'Freehold, Nakuru', '+254 708 699 536', 'https://www.jajos.co.ke', 'info@jajos.co.ke'),
(5, 'THIKA MOTOR HUB', 'Car Bazaar', 'Kenyatta Avenue, Thika', '+254 721 639 856', 'https://www.thika-hub.com', 'admin@thika-hub.com');
```

#### Controller
Next, we will create a controller that fetches the data from the earlier model and pass it to our view. We will create a file named `Bizdir.php` inside the `application/controllers` directory and add the below code:

```php
<?php
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

The `Bizdir` class inherits the `CI_Controller` class. Inside the constructor, we call `CI_Controller` our parent class. Then next line loads the model by making it accessible using `$this->load->model('bizdir_model');`. 

We fetched all the data in the index method and stored it in `$data['directories']`. Then, another key named `title` is added to the variable `$data`, and in the rest of the code, we pass the variable and render the views.

The key `$data` will be accessible to our views as same as `$title` and `$directories`. The `any()` method redirects any other URL that is not matched.

#### View
Next, we will create the views for our application. We will create a new directory called `templates` inside the `application/views` folder, then create two files, `header.php` and `footer.php`, inside the `templates` folder.

The `application/views/templates/header.php` file will appear as below:

```php
<html>
<head>
   <title><?php echo $title; ?>: This is a business directory</title>
</head>
<body>
<h1 style="text-align: center"><?php echo $title; ?></h1>
```

And the `application/views/templates/footer.php` file will have the below code:

```php
<p style="text-align: center; margin-top: 15px">&copy; 2021 Business Directory. All rights reserved.</p>
</body>
</html>
```

Then we can proceed create a new directory name `bizdir` and code the file `index.php` inside `application/views/bizdir/index.php` as below:

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

In the header section, we are displaying the `title` we defined in the controller. Inside the `index.php` file, we have created a loop that iterates through the list of businesses that are stored in our database. On each loop, a new `<tr>` is created and all values are displayed inside `<td>`.

We will create `any.php` file inside `application/views/bizdir` and add the below `HTML`:

```php
<div style="text-align: center; margin-top: 50px; padding-top: 50px;">
   <h2>Error</h2>
   <p>Click <a href="">here</a> to go to home page</p>
</div>
```

### Routing
We are now done setting up our MVC, next is to create the routes to the specific views. We start by opening the `application/config/router.php` file and edit the code as below:

```php
$route['dir'] = 'bizdir';
$route['dir/(:any)'] = 'bizdir/any';
$route['default_controller'] = 'welcome';
```

In the above code snippet, the key of `$route` appears in the browser URL. Then the value on the right points to which method from the controller to call. If only the controller's name is given, such as `bizdir` in our case, it will call the `index()` method. Also, if the URL contains anything after `dir/`, it will call the `any()` method.

Now we can visit http://localhost/bizdir/index.php/dir to verify if everything works as expected. The results will be as shown below:

![Business Directory](/engineering-education/how-to-develop-a-business-directory-using-codeigniter-and-mysql/biz-dir.PNG)

As it can be seen, data is fetched from the database and rendered on the browser.

### Wrapping up
Much functionality can be added and implemented in the application. However, that goes beyond the purpose of this tutorial as its primary purpose was to show the learners how to get started with CodeIgniter as the MVC framework.

The code snippets used in this tutorial can be found at my [GitHub Repo](https://github.com/kerubo-tech/business_directory/).
