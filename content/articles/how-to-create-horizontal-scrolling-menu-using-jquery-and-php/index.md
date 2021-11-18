### Introduction
A site's menu is a crucial component. It's the passage that customers will see on the pages. Therefore, the header requires an essential menu, one of the most visible components that immediately attract the customer's attention.
When there is a wide range of categories for these reasons pages, it becomes challenging to create a menu that allows customers to find them.
For implementing horizontal scrolling menu highlights for your application, many outsider modules or libraries are available.
Nothing compares to our unique code. In this tutorial, we'll look at how a model may be used to create a simple flat horizontal scrolling menu but before that, let us learn the following.

### Table of content:
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Significance of utilizing flat menu](#significance-of-utilizing-flat-menu)
- [Concerning Menu model](#concerning-menu-model)
- [Advantages of exploitation custom code to execute flat scrolling over](#advantages-of-exploitation-custom-code-to-execute-flat-looking-over)
- [Hypertext markup language to show menu and result](#hypertext-markup-language-to-show-menu-and-result)
- [Available modules and libraries to make navigation menus](#available-modules-and-libraries-to-make-navigation-menus)
- [jQuery script to address horizontal scrolling](#jquery-script-to-address-horizontal-scrolling)
- [Bring menu objects from db through hypertext preprocessor and mysql](#bring-menu-objects-from-db-through-hypertext-preprocessor-and-mysql)
- [Creating database](#creating-database)
- [File-structure](#file-structure)
- [Final menu result](#final-menu-result)
- [Conclusion](#conclusion)

### Prerequisites 
This project requires less or no knowledge in creating menu bars, but a little knowledge will be an added advantage but don't you worry, as I will take you through every step. First, ensure you have a text editor installed on your computer. 

You can choose any text editor you wish with notepad, visual studio code, Atom, Sublime Text, etc.
Also, you need a web server installed. In our case, we will use XAMP(Apache HTTP Server), but you can choose to download your own choice, such as WAMP server, Nginx Web Server, Lighttpd Web Server, etc.

###  Significance of utilizing the flat menu
1. They limit time spent looking over what clients should perform to arrive at their ideal substance/content.
1. Using horizontal scrolling menus saves vertical page space by setting a unique component.
1. It keeps the menu thing list from wrapping to the accompanying line, which will be acceptable while thinking about vertical dividing and style.
1. The best strategy for showing a rundown menu of things in a solitary way without using a scrollbar.
1. It will be reasonable to make a responsive menu interface viable with web and versatile ports.

### Available modules and libraries to make navigation menus
There are a lot of available libraries and modules out on the web; nonetheless, in this article, we will utilize Jquery with the blend of PHP and HTML to make our menu bar that intermediate and beginner web developers will understand.

### Advantages of exploitation custom code to execute flat looking over
1. Own customization will consistently work on the code and limit the quantity of documents size.
1. Contrasted with the devoted third-party modules, the custom code stream will be straightforward.
1. The menus are adjusted in focus with the utilization of CSS text-align highlight

### Concerning Menu model
Our example code will be straightforward and fundamental to make a unique parchment menu to create our unique model. JQuery techniques are utilized to deal with flat scrolling and movement.
On the snap occasion of these controls, the jQuery vivify() technique is called to move the menu things to and fro.

### Code execution to call attention to Menu with flat scrolling
Navigation symbols :
 Rightward squiggle & leftward squiggle arrows will be employed in our tutorial.
We will employ the above symbols to maneuver over the menu, but you can always use any other direction symbols of your choice. With a click, each opposite arrow will help in scrolling over the menu to and fro, thus assisting visitors in fetching menu items quickly on the page.


### Hypertext markup language to show menu and result
This html code includes right and left-way route symbols to assist clients in accessing the information base diverse menu items. The menu items are taken from the table information in our menu2 database.A simple navigation menu with four divs will be used in our HTML code. The first two divs include our user interface arrows, labeled &#8669 and &#8668, respectively.

We'll use their Ids to style the UI arrows in CSS. The third and fourth divs will let us work with and decorate our database table items. The PHP foreach construct allows us to show and iterate over the contents of our SQL database in our menu model.
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> horizontal scrolling menu</title>
    <!--linkig page with css file -->
    <link rel="stylesheet" type="text/css" href="./css/style.css">
</head>
    <body>
        <!-- creating navigation menu -->
        <nav id="mnu-wrap" class="black">
        <div id="prior-items">&#8669;</div>
         <div id="next-items">&#8668;</div>  
             <div class="inner-contents">
                 <div class="menu">
                     <!--fetching menu items from the database and diplaying them as list-->
                    <?php foreach($result as $res){ ?>
                        <a class="mnu-items" href="#"><?php echo $res['table_data']; ?></a>
                        <?php  } ?>
                    </div>
                </div>        
        </nav>
        <div class="content">
            <h1>Creative Designs KE.</h1>
        </div>
         <!--integrating jquery source file jquery-3.6..min.js-->
        <script src="./jquery-3.6.0.min.js"></script>
        <!--jquery functions to manupulate the direction off menu items-->
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
In a nutshell, our menu is shown horizontally with optimal visibility. Our menu's UI arrow symbols are located on the left and right sides. A hover effect is added to help visualize as we move over the menu. Example of our menu at a glance. 

![Demo-picture](./img/Demo1.png) 


As you have observed, the menu items from our database are indexed like an array and are displayed horizontally. They're embedded in a navigation bar and fetched via a click of the two opposite arrows.

### jQuery script to address horizontal scrolling
The jquery code that follows suggests how the menu contents are displayed horizontally. The CSS scrollleft assets are applied to aid the direction of the menu(s) and to make a liveliness impact with the help of the jQuery animate() technique.By use of the click function the menu items are displayed horizontally  in the direction the user wants to move.
``` javascript
// integrating jquery source file jquery-3.6.0.min.js
        <script src="./jquery-3.6.0.min.js"></script>
        <!--jquery functions to manupulate the direction off menu items-->
    <script>
        $('#prior-items').click(function(){
            $(".inner-contents").animate({scrollLeft: "-=300px"});
        });
        $('#next-items').click(function(){
            $(".inner-contents").animate({scrollLeft: "+=300px"});
        });
    </script>
```
### Bring menu objects from db through hypertext preprocessor and mysql
We begin by setting up our connection to our menu2 database. 
I've selected PDO as it is effortlessly convertible to different languages. We first create variables to address our server name, username, password, and database name.

The next step is to make a connection by generating a new PDO object with the following statement (mysql:host=$servernme;dbname=menu2", $usernme, $pword) inside the try() function. If the connection fails, an error is raised, and the flow of execution shifts to our catch method, which repeats the message "no established connection."

Following the establishment of a connection, we create a query to retrieve menu information from the database table ("menu_items") and save it in the result variable, after which the data is printed as an array.
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
The php code included in our html code fetches the information and display it as an array of list items in the web page header region.
``` php
<?php foreach($result as $res){ ?>
                        <a class="mnu-items" href="#"><?php echo $res['table_data']; ?></a>
```

### Creating database
To create a horizontal menu list, we'll need to create a database and store menu items, which will then be accessed and presented on our page. We'll create a simple SQL database called ' menu2 ' with one table called ' menu_items ' and two columns: 'Items_id' (our primary key) and 'items_name' (where we'll store dummy menu items). We can now embed information into our data set after it has been made. When adding new data to the database, the items id column is set to auto-increment.

When practicing, you can also create arbitrary names for your database, table, and columns. For example, take a look at the SQL code below.
  ``` sql
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
INSERT INTO `menu_items` (`item_id`, `table_data`) VALUES
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

### File-structure
Ensure you save your files in the htdocs folder in the XAMP installation directory as shown.![Demo-picture](./img/filestructure.png)

### Final menu result
Our scrolling menu will look like this.
![Demo-picture](./img/Demo2.png)

### Conclusion
Menus are essential factors in web-designs as they portray all that websites accommodate. They're consequently beneficial in imparting guides when going via a web page and categorizing additives in the web page. So my hope is you locate this information helpful.
