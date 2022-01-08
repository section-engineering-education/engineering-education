---
layout: engineering-education
status: publish
published: true
url: /how-to-create-horizontal-scrolling-menu-using-jquery-and-php/
title: How to Create Horizontal Scrolling Menu using jQuery and PHP
description: In this tutorial, we will create a simple horizontal scrollable menu using a simple model in jQuery and PHP.
author: bernard-njenga
date: 2022-01-05T00:00:00-05:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-create-horizontal-scrolling-menu-using-jquery-and-php/hero.png
    alt: scrolling bar php image
---
A website menu is a crucial component. This is the snippet your customers will see on your page.

As a result, the header should have the necessary menu, one of the most prominent components immediately catching the visitor's attention.
<!--more-->
In this tutorial, we will create a simple horizontal scrollable menu using a simple model in jQuery and PHP.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Significance of utilizing menu](#significance-of-utilizing-flat-menu)
- [Concerning Menu model](#concerning-menu-model)
- [Advantages of exploiting custom code to execute flat scrolling menu](#advantages-of-exploiting-custom-code-to-execute-flat-scrolling-menu)
- [Available modules and libraries to make navigation menus](#available-modules-and-libraries-to-make-navigation-menus)
- [Navigation and direction of menu items](#navigation-and-direction-of-menu-items)
- [Hypertext markup language to show menu and result](#hypertext-markup-language-to-show-menu-and-result)
- [jQuery script to address horizontal scrolling](#jquery-script-to-address-horizontal-scrolling)
- [Bring menu objects from db through hypertext preprocessor (PHP) and mysql](#bring-menu-objects-from-db-through-hypertext-preprocessor-(PHP)-and-mysql)
- [Creating database](#creating-database)
- [Importing database and runnig code](#importing-database-and-runnig-code)
- [Output](#output)
- [Conclusion](#conclusion)

### Prerequisites
- Basic knowledge of HTML, CSS, PHP, and jQuery.
- A text editor (ideally Visual Studio Code) and a web server installed on your computer. XAMPP will be used in this tutorial.
- jQuery CDN link inclusion in our code from [jQuery.com](https://code.jquery.com/)

In this article, we use the following file structure:

![files-structure](/engineering-education/how-to-create-horizontal-scrolling-menu-using-jquery-and-php/file-structure.png)

> Note the HTML for the menu is included in the `index.php` file. The `connection.php` file is used to establish a connection with database `menu2` and to get data for the scrollable menu from the database.

### Objectives
By the end of this tutorial, learners should be able to:
- Understand the concept of a horizontal scrolling menu after reading this article.
- Make a menu models.
- Learn how to use php to build, connect, and join MySQL databases.
- Appreciate the importance of menus in web development.

### Significance of utilizing a flat menu
- They limit time spent looking over what clients should perform to arrive at their ideal content.
- Using horizontal scrolling menus saves vertical page space by setting a unique component.
- The best strategy for showing a rundown menu of things in a solitary way without using a scrollbar.

### Available modules and libraries to make navigation menus
There are a several libraries and modules out on the web; nonetheless, in this article, we will utilize jQuery with the blend of PHP and HTML to make a menu bar.

### Advantages of exploiting custom code to execute flat scrolling menu
- Own customization will consistently work on the code and limit the quantity of file size.
- Contrasted with the devoted third-party modules, the custom code stream will be straightforward.
- The menus are adjusted in focus with the utilization of CSS text-align center.

### Concerning menu model
Our example code will be straightforward and fundamental to make a unique parchment menu to create our unique model.

jQuery techniques are utilized to deal with flat scrolling and movement.

On the snap occasion of these controls, the jQuery function() is called to move the menu items to and fro, that is, in the left and right direction.

### Navigation and direction of menu items
Rightward squiggle & leftward squiggle arrows (⇝ and ⇜) will be employed in our tutorial.

We will employ the above symbols to maneuver over the menu, but you can always use any other direction symbols of your choice.

With a click, each opposite arrow will help in scrolling over the menu to and fro (left to right direction), thus assisting visitors in fetching menu items quickly on the page.

### Hypertext markup language to show menu and result
We begin by linking our basic HTML (to be saved as `index.php`) code with our `connection.php` file, and then we define our title "horizontal scrolling menu".

Then, in the script tags, we include a link to the jQuery CDN, followed by an external CSS file.

Right, and left-way route symbols are used in the body of our html code to help clients access menu items.

The menu items are obtained from our `menu2` database's table information.

We'll use a simple navigation menu with four divs in our HTML code. Our user interface arrows ( ⇝ and ⇜ ) labeled `&#8669` and `&#8668` respectively, are located in the first two divs.

We'll use our defined arrows' CSS styling IDs (prior-items & next-items). The third and fourth divs contain classes that will assist us in working with and styling our menu items and their inner contents from the database table `table_items.`

In our menu model, the PHP ``foreach` construct allows us to display and loop over the contents of our SQL database.

```html
<!-- linking connection.php file with index.php file-->
<?php include "connection.php"?>  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> horizontal scrolling menu</title>
    <!--linking page with css file and jQuery CDN file link -->
    <script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="./css/style.css">
</head>
    <body>
        <!-- creating navigation menu -->
        <nav id="mnu-wrap" class="black">
        <div id="prior-items">&#8669;</div>
         <div id="next-items">&#8668;</div>  
             <div class="inner-contents">
                 <div class="menu">
                     <!--fetching menu items from the database and diplaying them as a list-->
                    <?php foreach($result as $res){ ?>
                        <a class="mnu-items" href="#"><?php echo $res['table_data']; ?></a>
                        <?php  } ?>
                    </div>
                </div>        
        </nav>
        <div class="content">
            <h1>Creative Designs KE.</h1>
        </div>
        <!--jQuery functions to manupulate the direction off menu items-->
    <script>
        $('#prior-items').click(function(){
            $(".inner-contents").animate({scrollLeft: "-=300px"});
        });
        $('#next-items').click(function(){
            $(".inner-contents").animate({scrollLeft: "+=300px"});
        });
     </script>
</body>
</html>
```

In a nutshell, our menu is shown horizontally with optimal visibility.

Our menu's UI arrow symbols are located on the left and right sides. A hover effect is added to help visualize as we move over the menu.

Example of our menu at a glance.

![demo1-picture](/engineering-education/how-to-create-horizontal-scrolling-menu-using-jquery-and-php/demo1.png)

As you have observed, the menu items from our database are indexed like an array and are displayed horizontally.

They're embedded in a navigation bar and fetched via a click of the two opposite arrows.

### jQuery script to address horizontal scrolling
The jQuery code (included in HTML) suggests horizontally the menu contents.

The CSS scroll left property is applied to aid the direction of the menu(s) and make a liveliness impact with the help of the jQuery animate() method.

Finally, by use of the click function the menu items are displayed horizontally  in the direction the user wants to move.

``` javascript
// integrating jQuery source file jquery-3.6.0.min.js
        <script src="./jquery-3.6.0.min.js"></script>
        <!--jQuery functions to manupulate the direction off menu items-->
    <script>
        $('#prior-items').click(function(){
            $(".inner-contents").animate({scrollLeft: "-=300px"});
        });
        $('#next-items').click(function(){
            $(".inner-contents").animate({scrollLeft: "+=300px"});
        });
    </script>
```

### Bring menu objects from db through hypertext preprocessor (PHP) and MySQL
We begin by setting up our connection to our `menu2` database.  

Firstly, create variables to address our server name, username, password, and database credentials.

The next step is to connect by generating a new `PDO` object with the following statement.

```php
<?php
try{
mysql:host=$servernme;dbname=menu2", $username, $password)
} catch(Exception $e){
 // echo $e->getMessage();
}
```

If the connection fails, an error is raised, and the flow of execution shifts to our ```catch method```, which displays the message "no established connection."

Following the establishment of a connection, we create a query to retrieve menu information from the database table ```menu_items```.

The output is then saved in the `$result`, after which the data is printed as an array.

Remember to save it approriately as `connection.php` or any other way you may like.

``` php
<?php
$servernme= "localhost";
$usernme = "root";
$pword = "";
$dbname ="menu2";
try {
  $conn = new PDO("mysql:host=$servernme;dbname=menu2", $usernme, $pword);
  //   error mode exception
} catch(PDOException $e) {
  echo "no established connection: ";
}
// Create connection
$conn = new mysqli($servernme, $usernme, $pword,$dbname);
// Check connection
if ($conn->connect_error) {
  die("no established connection: ". $conn->connect_error);
}
$sql = "SELECT table_data FROM menu_items";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
  }
} else {
  echo "no results found";
}
```

The PHP code included in our previous HTML code above fetches the information and display it as an array of list items in the web page header region.

```php
<?php 
foreach($result as $res){ ?>
    <a class="mnu-items" href="#">
        <?php echo $res['table_data']; ?>
    </a>
```

### Creating database
To create a horizontal menu list, we'll need to create a database and store menu items, which will be accessed and presented on our page.

First, we'll create a simple SQL database called `menu2` which must be saved with`.sql` extension.

The database has `menu_items` and two columns: `Items_id` (our primary key) and `items_name` (where we'll store dummy menu items).

We can now embed information into our data set after it has been made.

The items id column is set to auto-increment when adding new data to the database.

Take a look at the SQL code below:

```sql
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

SET time_zone = "+00:00";
-- Database: `menu2`
-- Table structure for table `menu_items`
CREATE Database`menu2`;
USE menu2;

CREATE TABLE `menu_items` (
  `item_id` int(11) NOT NULL,
  `table_data` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
-- keying data for table `menu_items`

INSERT INTO `menu_items` (`item_id`, `table_data`) 
VALUES
(0, 'home'),
(1, 'about'),
(2, 'contact'),
(3, 'Info'),
(4, 'services '),
(5, 'Help'),
(6, 'countries'),
(7, 'Cities'),
(8, 'jobs'),
(9, 'calendar '),
(10, 'feed'),
(11, 'dashboard '),
(12, 'login'),
(13, 'clients'),
(15, 'support '),
(16, 'donate ');

-- Indexes for table `menu_items`
ALTER TABLE `menu_items`

  ADD PRIMARY KEY (`item_id`);
-- AUTO_INCREMENT for table `menu_items`

ALTER TABLE `menu_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;
  ```

### Importing database and running code
After saving all of our files in the XAMPP htdocs folder, the last step is to import our database 'menu2' as follows:

**First  step**
Launch XAMPP. Under then`Actions` tab, click on `Start Apache` and `MySQL`.  

![start_xampp](/engineering-education/how-to-create-horizontal-scrolling-menu-using-jquery-and-php/start_xampp.png)

**Second step**
After you've started both Apache and MySQL, go to the admin under MySQL and do the following (click admin):

![open_in_browser](/engineering-education/how-to-create-horizontal-scrolling-menu-using-jquery-and-php/open_in_browser.png)

In your default browser, a new window will appear like this:-

![import-menu2](/engineering-education/how-to-create-horizontal-scrolling-menu-using-jquery-and-php/import-menu2.png)

Navigate to the database import section and import your 'menu2' database from the XAMPP htdocs folder (where you saved your project files).

After picking your database file one by one, click `GO` and you're done.

**Third step**

This is the last step.

Click to view the horizontal menu by opening a new tab in your browser and typing the following in the address bar:

```bash
http://localhost/how-to-create-horizontal-scrolling-menu-using-jquery-and-php/
```

### Result

![demo2-picture](/engineering-education/how-to-create-horizontal-scrolling-menu-using-jquery-and-php/demo2.png)

### Conclusion
Menus are essential elements in web design because they represent all a website can do.

As a result, they help provide directions when browsing a website and categorizing its components.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
