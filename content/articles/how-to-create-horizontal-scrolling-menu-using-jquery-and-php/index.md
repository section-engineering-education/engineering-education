### Introduction
A site's menu is a crucial component. It's the passage that customers will see on the pages. The header requires an essential menu, which is one of the most visible components that attracts the customer's attention immediately.
When there is a wide range of categories for these reason pages, it becomes difficult to create a menu that allows customers to find them.
For implementing horizontal scrolling menu highlights for your application, a variety of outsider modules or libraries are available.
Nothing compares to our unique code. In this tutorial, we'll look at how a model may be used to create a simple flat horizontal scrolling menu.
The menu is as follows:

### Table of content:
- [Introduction](#introduction)
- [Table of content:](#table-of-content)
- [significance of utilizing flat menu](#significance-of-utilizing-flat-menu)
- [Available modules and libraries to modify flat looking over](#available-modules-and-libraries-to-modify-flat-looking-over)
- [Advantages of exploitation custom code to execute flat looking over](#advantages-of-exploitation-custom-code-to-execute-flat-looking-over)
- [concerning Menu model](#concerning-menu-model)
- [Code execution to call attention to Menu with flat scrolling](#code-execution-to-call-attention-to-menu-with-flat-scrolling)
- [hypertext markup language code to show menu](#hypertext-markup-language-code-to-show-menu)
- [jQuery script to address horizontal scrolling](#jquery-script-to-address-horizontal-scrolling)
- [Bring menu objects from db through hypertext preprocessor and mysql](#bring-menu-objects-from-db-through-hypertext-preprocessor-and-mysql)
- [Database creation Guide](#database-creation-guide)
- [Demo picture](#demo-picture)
- [Conclusion](#conclusion)
###  significance of utilizing flat menu
They limit time spent looking over what clients should perform to arrive at their ideal substance/content.
The use of horizontal scrolling menus saves vertical page space by setting a unique component.
It keeps the menu thing list from wrapping to the accompanying line, which will be acceptable while thinking about vertical dividing and style.
The best strategy for showing a rundown menu of things in a solitary way without using a scrollbar.
It keeps the menu things list from wrapping to the accompanying line, which will be acceptable while thinking about vertical dividing and style.
It will be reasonable for making a responsive menu to make the menu interface viable with web and versatile ports.
### Available modules and libraries to modify flat looking over
There are a lot of known libraries and modules out on the web; however, in this article, we will utilize Jquery with the mix of CSS and HTML component object to apply level looking over property on our menu bar.
### Advantages of exploitation custom code to execute flat looking over
1. Own customization will consistently work on the code and limit the quantity of documents size.
1. Contrasted with the devoted third-party modules, the custom code stream will be straightforward.
1. The menus are adjusted in focus with the utilization of CSS text-align highlight
### concerning Menu model
Our example code will be straightforward and fundamental to make a unique parchment menu to create our unique model. JQuery techniques are utilized to deal with flat scrolling and movement.
On the snap occasion of these controls, the jQuery vivify() technique is called to move the menu things to and fro.
### Code execution to call attention to Menu with flat scrolling
Navigation symbols 
- Rightward squiggle & leftward squiggle arrows.

We will employ the above symbols to maneuver over the menu. With a click, each of them will help to scroll over the menu to and fro.
### hypertext markup language code to show menu
This html code includes right and left way route symbols to assist clients in accessing the information base diverse menu items. The menu items are taken from the table information in our menu2 database.
``` html
<!-- linking connection.php file with index.php file-->
<?php include "connection.php"?>
<!--  Basic html code-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--page title -->
    <title> horizontal scrolling menu</title>
    <!--linkig page with css file -->
    <link rel="stylesheet" type="text/css" href="./css/style.css">
</head>
<body>
</body>
</html>
    <body>
        <!-- creating navigation menue -->
        <nav id="mnu-wrap" class="black">
         <div id="prior-items">&#8669;</div>
            <div id="next-items">&#8668;</div>  
             <div class="inner-contents">
                 <div class="menu">
 
                     <!--fetching menu items from the database and diplaying them as list-->

                    <?php foreach($result as $res){ ?>
                        <a class="mnu-items" href="#"><?php echo $res['table_data']; ?></a>
<div class="paragraph">
    <h1>Dummy text</h1>
    <p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet cupiditate culpa alias optio nesciunt maiores voluptatibus temporibus architecto minima ducimus quis similique nobis sint odio possimus quas facilis, esse cum
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur pariatur fugit suscipit! Temporibus, incidunt sunt eum consequuntur ratione illum, nisi nobis nemo nulla magni ipsum veniam maxime quasi tenetur porro distinctio voluptatum. Eaque voluptates itaque ipsum pariatur temporibus inventore animi in debitis. Recusandae molestiae odio commodi exercitationem amet cumque numquam nesciunt voluptate aut repellendus explicabo molestias laborum ratione, at maxime quisquam tenetur eveniet ut voluptatum! Amet accusantium, iste quo quibusdam doloribus natus veniam sequi ut quasi dicta minima quisquam, ad quidem nisi dolores provident, molestiae fugiat maiores eligendi? Voluptates saepe perferendis tempora tenetur expedita porro, atque eligendi nesciunt sequi ipsa soluta natus facilis at, odio quis eos magni a, quo iste distinctio unde accusamus officiis beatae? Ut reiciendis eveniet ipsum architecto fugiat corrupti sed saepe deleniti labore? Ut officia laudantium natus nisi enim? Voluptates dolorum voluptatem eveniet accusantium dicta explicabo, aperiam dolores cupiditate expedita minima quia, harum alias, placeat unde dolorem aliquam autem! Sapiente vero eos, dolores autem quae quo consequuntur eaque modi. Veniam libero tempore nemo ab illum impedit officiis delectus aperiam sapiente laborum, modi fugiat recusandae! Quae at ullam illo, error dicta consequatur est natus libero esse architecto! Error et illum quisquam soluta suscipit dolores tempora quae dolore debitis tempore asperiores facere odio nisi, pariatur iste, aliquam quasi commodi reprehenderit? Neque unde dolor debitis voluptas molestiae dolorem enim recusandae commodi quia ea cupiditate animi ab, corrupti porro magnam ad distinctio nisi numquam illo? Omnis maiores aperiam hic impedit unde dolorem perspiciatis optio <h1>Dummy text</h1>quia, laudantium ullam, nulla ipsum consequuntur ea adipisci ipsam quo magni debitis nobis nihil accusantium officiis sint molestiae. Aliquam nesciunt quaerat voluptates voluptatum atque commodi facilis neque reprehenderit accusantium nisi ut et magnam aperiam modi odit, possimus, ab maxime voluptatibus at. Eius explicabo repudiandae enim necessitatibus tempora mollitia dolorem hic aliquid facilis voluptate suscipit, architecto optio error molestias accusantium in laborum odit rem provident dolorum harum nisi numquam? Accusantium possimus a tempora quos voluptas vel porro cumque, facere fugiat ut omnis. Ducimus doloremque sit quam eligendi maiores ab provident velit, dignissimos aliquid beatae explicabo nobis odit delectus deleniti quod qui corporis dolores eum voluptatibus laborum quia harum aperiam? Facilis nobis eaque consequatur exercitationem facere nostrum reiciendis culpa doloremque officiis atque maxime natus corrupti, sunt optio eos quisquam accusamus necessitatibus ipsum commodi aperiam esse at libero veritatis blanditiis! Numquam, quas, quaerat excepturi porro voluptates exercitationem minus, repudiandae quae similique reiciendis facere fugiat itaque deleniti tenetur mollitia ullam incidunt sequi laboriosam quos commodi deserunt. Amet commodi similique sapiente nobis dolor, ipsa dolore ducimus necessitatibus recusandae, nisi optio porro atque perferendis tempore nemo. Asperiores quas est molestias nihil minus ipsum, suscipit aliquid impedit accusamus distinctio fugiat sed commodi modi ut, dignissimos dolore ducimus ipsam officia maxime iste ex. Tempore voluptate voluptatibus autem corporis est accusantium, inventore deserunt rem, cumque quae id ipsum facere a quaerat quas sint eligendi, labore explicabo totam vero rerum quos et omnis ratione? Inventore, ut nulla! Sed impedit voluptas, omnis alias blanditiis sequi quod id amet labore veniam, repudiandae ullam! Magnam, culpa natus. Voluptatem, perferendis.
       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores nemo nulla deleniti excepturi atque qui voluptatem ipsa labore cumque animi? Error accusantium reprehenderit cupiditate reiciendis quo asperiores nulla tenetur odio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae iusto qui at omnis aliquam ut odit consequatur libero aspernatur excepturi possimus laudantium non, illum assumenda a tenetur ipsa, rem laboriosam.
    </p>
                    </div>
                </div>        
        </nav>
<p class="content">
    
         </body>
         </html> 
``` 
``` css
/* body and backgrouns styling*/
body {
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    max-width: 996px;
    margin:20px auto;
    background-image:url(../img/b1.jpg) ;
    background-attachment: fixed;
    background-size: cover;
}
/*navigation */
nav#mnu-wrap {
    background:#198997;
    top: 0;
    width:100%;
    height: 56px;
}

/*Rightward squiggle arrow styling */
#prior-items{
    text-align: center;
    color: white;
    cursor: pointer;
    font-size: 42px;
    position: absolute;
    left: 0px;
    padding: 10 10px;
    background: #560ae2;
}
/*leftward squiggle arrow styling*/
#next-items {
    text-align: center;
    color: white;
    cursor: pointer;
    font-size: 42px;
    position: absolute;
    right:0px;
    padding: 10 10px;
    background: #560ae2;
}
/*class inner-contents*/
.inner-contents{ 
    width: 100%;
    white-space:nowrap;
    margin: 0 auto;
    overflow:hidden;
    padding: 0px 54px;
    box-sizing:border-box;
}
/* menu class styling*/
.menu{
    list-style-type: none;
    display:block;
    text-align:center;
    text-transform: uppercase;
}
/* styling menu items from the database(MYSQL)*/
.mnu-items
{
    height:100%;
    padding:0 15px;
    color:#fff;
    display:inline-flexbox;
    line-height:60px;
    text-align:center;
    text-decoration-line: none;
    white-space:no-wrap;
}
/* making of a hover effect to menu items*/
.mnu-items:hover {
    background-color: black;
    height:50%;
    padding:15px;
    border-radius:25px;
}
p{
    text-transform: uppercase;
}
/*styling contents display with regard to different screen roslutions*/
@media only screen and (max-width: 480px) {
  #prior-items {
    display:none;
  }
  #next-items {
    display:none;
  }
    .inner-contents
    { 
        width:100%;
        overflow-x:auto;
    }
}  
```
### jQuery script to address horizontal scrolling
The jquery code that follows suggests how the menu gadgets are proven horizontally. The CSS scrollleft assets are applied to aid the direction of the menu and to make a liveliness impact with the help of the jQuery animate() technique. in addition, we are able to encompass a javascript document.getElementById characteristic with a combination of CSS role sticky assets to help the menu stick on top of the web page throughout scrolling.
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
        let nav = document.getElementById("mnu-wrap")
        nav.style.position = "sticky"

    </script>
```
### Bring menu objects from db through hypertext preprocessor and mysql
We begging by setting up our connection to our menu2 database. I've selected pdo as it is effortlessly convertible to different languages. after a connection, we establish a query to fetch menu statistics from the database table ("menu_items") and store them in the end result variable after which the statistics are printed as an array.
``` php
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname ="menu2";
$conn = mysqli_connect($servername,$username,$password,$dbname);
if(!$conn){

    echo "Cannont establish connection to the database" . mysqli_connect_error();
}

//select query to fetch all items  from  menue_items table
$query = "SELECT * FROM menu_items";
$result = mysqli_query($conn query);
$fetch = mysqli_num_rows($result);
if($fetch > 0){
 while($row = $fetch.MYSQLI_FETCH_ASSOC){

 }else{
     echo "No valid results found";
 }
}
?>
```
The php code included in our html code fetches the information and display it as an array of list items.
``` php
<?php foreach($result as $res){ ?>
                        <a class="mnu-items" href="#"><?php echo $res['table_data']; ?></a>
```
  ### Database creation Guide 
  we shall create our menu2 database  and insert data as follows :
  ``` sql
 --creating  and using database menu2
  CREATE DATABASE menu2;
USE menu2;
--creating table'menu_items' with two rows ; item_id and items_name
CREATE TABLE `menu2`.`menu_items` ( `items_id` INT NOT NULL AUTO_INCREMENT , `items_name` VARCHAR(255) NOT NULL
 , PRIMARY KEY (`items_id`)) ENGINE = InnoDB;
 --inerting data into the menu_items table
INSERT INTO `menu_items` (`item_id`, `table_data`) VALUES 
(1, 'about'), (2, 'contact'), (3, 'info'), (4, 'services'),
('help'),('coutries'),('cities'),('jobs'),
('calender'),('feed'),('dashboard'),('login'),
('clients'),('supports',('donates'));
```    
### Demo picture
![Demo-picture](./img/Demo.png)
### Conclusion
Menus are essecial factors in net-designs as they potray all that a web sites accommodates.They're consequently beneficial in imparting guide when going via a web page.they're also helpful in categorizing additives in web page. My hope is you locate this information helpful.