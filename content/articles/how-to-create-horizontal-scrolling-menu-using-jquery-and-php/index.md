### Introduction
A site's menu is a crucial component. It's the passage that customers will see on the pages. The header requires an essential menu, which is one of the most visible components that attracts the customer's attention immediately.
When there is a wide range of categories for these reason pages, it becomes difficult to create a menu that allows customers to find them.
For implementing horizontal scrolling menu highlights for your application, a variety of outsider modules or libraries are available.
Nothing compares to our unique code. In this tutorial, we'll look at how a model may be used to create a simple flat horizontal scrolling menu but before that let us learn the following:

### Table of content:
- [Introduction](#introduction)
- [Significance of utilizing flat menu](#significance-of-utilizing-flat-menu)
- [Concerning Menu model](#concerning-menu-model)
- [Advantages of exploitation custom code to execute flat scrolling over](#advantages-of-exploitation-custom-code-to-execute-flat-looking-over)
- [Hypertext markup language to show menu and css code](#hypertext-markup-language-to-show-menu-and-css-code)
- [Available modules and libraries to modify flat looking over](#available-modules-and-libraries-to-modify-flat-looking-over)
- [jQuery script to address horizontal scrolling](#jquery-script-to-address-horizontal-scrolling)
- [Bring menu objects from db through hypertext preprocessor and mysql](#bring-menu-objects-from-db-through-hypertext-preprocessor-and-mysql)
- [Creating database](#creating-database)
- [Demo picture](#demo-picture)
- [Conclusion](#conclusion)
###  Significance of utilizing flat menu
1. They limit time spent looking over what clients should perform to arrive at their ideal substance/content.
1. The use of horizontal scrolling menus saves vertical page space by setting a unique component.
1. It keeps the menu thing list from wrapping to the accompanying line, which will be acceptable while thinking about vertical dividing and style.
1. The best strategy for showing a rundown menu of things in a solitary way without using a scrollbar.
1. It will be reasonable for making a responsive menu interface viable with web and versatile ports.
### Available modules and libraries to modify flat looking over
There are a lot of known libraries and modules out on the web; however, in this article, we will utilize Jquery with the mix of CSS and HTML component object to apply level looking over property on our menu bar.
### Advantages of exploitation custom code to execute flat looking over
1. Own customization will consistently work on the code and limit the quantity of documents size.
1. Contrasted with the devoted third-party modules, the custom code stream will be straightforward.
1. The menus are adjusted in focus with the utilization of CSS text-align highlight
### Concerning Menu model
Our example code will be straightforward and fundamental to make a unique parchment menu to create our unique model. JQuery techniques are utilized to deal with flat scrolling and movement.
On the snap occasion of these controls, the jQuery vivify() technique is called to move the menu things to and fro.
### Code execution to call attention to Menu with flat scrolling
Navigation symbols 
 Rightward squiggle & leftward squiggle arrows will be employed
We will employ the above symbols to maneuver over the menu. With a click, each oposite arrow will help in scrolling over the menu to and fro.
### Hypertext markup language to show menu and css code
This html code includes right and left way route symbols to assist clients in accessing the information base diverse menu items. The menu items are taken from the table information in our menu2 database.A simple navigation menu with four divs will be used in our HTML code. The first two divs include our user interface arrows, which are labeled &#8669 and &#8668, respectively. We'll use their Ids to style the UI arrows in CSS. The third and fourth divs will let us work with and decorate our database table items. The PHP foreach construct allows us to show and iterate over the contents of our SQL database in our menu model.
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
We'll need the following CSS attributes and values to style our menu model. When styling elements with Id's  and classes, remember to include(#)and (.) selectors.You can also look at the comments in the CSS code to help you remember which class or id you're styling. In a nutshell, the CSS code below allows our menu to be shown horizontally with optimal visibility. Our menu's UI arrow symbols are located on the left and right sides of our menu in addition  we will include a hover effect to help in visualizing as we move over the menu. 
``` css
/* body and backgrouns styling*/
*{  font-family:sans-serif;
    max-width: 850px;
    margin: 1px auto;
    box-sizing: border-box;
}
.content{
      font-size: 10px;
      left: 0px;
      border-left:8px solid #1989;
      position:absolute;
      justify-items: end;
}
/*navigation */
nav#mnu-wrap { 
    background:#198997;
    width:100%;
    height: 56px;
    top: 6%;
    position:absolute;}
/*Rightward squiggle arrow styling */
#prior-items{
    text-align: center;
    color: rgb(252, 249, 249);
    cursor: pointer;
    font-size: 44px;
    left: 0px;
    position: absolute;
    padding:0 10px;
    background: #560ae2;}
/*leftward squiggle arrow styling*/
#next-items {
    text-align: center;
    color: white;
    cursor: pointer;
    font-size: 44px;
    position: absolute;
    right:0px;
    padding: 0 10px ;
    background: #560ae2;}
/*class inner-contents*/
.inner-contents{ 
    width: 100%;
    white-space:nowrap;
    margin: 0 auto;
    overflow:hidden;
    padding: 0px 54px;
    box-sizing:border-box;}
/* menu class styling*/
.menu{ padding: 0;
      margin: 0;
      list-style-type: none;
      display:block;
      text-align:center;
      text-transform: uppercase;}
/* styling menu items from the database(MYSQL)*/
.mnu-items{height:100%;
           padding:0 15px;
           color:#fff;
           display:inline;
           margin: 0 auto;
           line-height:60px;
           text-align:center;
           text-decoration: none;
           white-space:no-wrap;}
/* making of a hover effect to menu items*/
.mnu-items:hover {
    background-color: black;
    height:50%;
    padding:15px;
    border-radius:25px;}
``` 
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
We begging by setting up our connection to our menu2 database. I've selected pdo as it is effortlessly convertible to different languages. after a connection, we establish a query to fetch menu statistics from the database table ("menu_items") and store them in the end result variable after which the statistics are printed as an array.
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
The php code included in our html code fetches the information and display it as an array of list items.
``` php
<?php foreach($result as $res){ ?>
                        <a class="mnu-items" href="#"><?php echo $res['table_data']; ?></a>
```
  ### Creating database
 We'll make our menu2 database and populate it with the following information:
'Items_id'(which is our main key) and 'items_name' will be the only columns in our database.
When data is added to the table, our item_id is set to auto increment.
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
### Demo picture
![Demo-picture](./img/Demo2.png)
### Conclusion
Menus are essecial factors in web-designs as they potray all that a web sites accommodates.They're consequently beneficial in imparting guide when going via a web page and also helpful in categorizing additives in web page. My hope is you locate this information helpful.Thank you.
