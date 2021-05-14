---
layout: engineering-education
status: publish
published: true
url: /creating-countdown-in-php-javascript-mysql/
title: Creating Dynamic Countdown In PHP, JavaScript, and MySQL
description: This tutorial will walk the reader through the process of creating a dynamic countdown. You can make a static clock utilizing JavaScript. To achieve a dynamic time countdown, we'll use both PHP and a database.
author: miller-juma
date: 2021-03-12T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/creating-countdown-in-php-javascript-mysql/hero.jpg
   alt: Dynamic Countdown PHP Images example image
---

### Introduction
One of the most useful modules for upcoming events is the countdown timer. Using JavaScript, PHP, and a MySQL database, you can make a countdown timer. A countdown timer allows you to display the time of an upcoming event on a web page. You can display when the event will begin and when it will end. 
<!--more-->
You can also make a countdown timer with JavaScript, but the timer will reset if you refresh the tab. You can make the counter timer run indefinitely by using PHP. If you refresh the page, the timer continues to run. 

This tutorial will take you through the process of building a dynamic countdown.  

### Prerequisites  
The following are the key fundamental aspects that will help you learn dynamic countdown in JavaScript, PHP, and MySQL:  
- Object Oriented Programming (OOP) in PHP.
- Basic JavaScript introduction and web in general.
- Structured Query Language (SQL) and ability to use MySQL database.
- PHP Data Objects (PDO) Application Programming Interface (API).
- Integrated development environment, [PhpStorm](https://www.jetbrains.com/phpstorm/) is strongly recommended.

### PHP dynamic countdown timer
You can make a static clock utilizing JavaScript. To achieve a dynamic time countdown, we'll use both PHP and a database. 

The PHP update activity assists with refreshing the MySQL data set. Users can refresh the time as needed.

First we create a MySQL data set table for the countdown timer. The information base table will contain the date, hours, minutes, seconds as follows: 

### Create countdown database table
There are several databases on a MySQL database server (or schemas). One or more tables make up each database. Columns (also called fields) and rows make up a table (records). 

The case of the SQL keywords and commands does not matter. They're written in capital letters for emphasis. 

To create a table, run the following command on the console.
You may also add them to your SQL file and import them into your MySQL database. 

```bash

create table timer_tbl(

 `timer_id`INT(11) NOT NULL,

 `date` DATE NOT NULL,

 `hour` INT(50) NOT NULL,

 `minutes` INT(50) NOT NULL,

 `seconds` INT(50) NOT NULL

);

```

Now that we've got a timer model ready, the next step involves connecting to our MySQL database. 

### Connecting to database
As a rule, PHP includes three MySQL APIs: MySQL, MySQLi, and PDO by default.
For more information, [see](https://devjunky.com/Choosing-between-MySQL-MySQLi-and-PDO/) 
We'll use the PDO API in this tutorial but you're free to use any of the three. 

Create a `db_credentials.php` file in your server and add MySQL credentials as shown below. 

```php

/**

* @author Miller Juma

*/

$server_name = 'localhost';//replace with your host

$db_name = 'countdown'; //replace with your db name

$db_username = 'MyDBUsername';//replace with your username

$db_password = 'MyDBPassword';//replace with your password

define("SERVER_NAME",$server_name);

define("DB_NAME",$db_name);

define("DB_USERNAME",$db_username);

define("DB_PASSWORD",$db_password);

```

Next, create a `db_configuration.class.php` file and add the following: 

```php

<?php

require_once "db_credentials.php";

class DB_Configuration

{

 public function db_connect()

 {

 try

 {

 $host = SERVER_NAME;

 $db_name= DB_NAME;

 $connection= new PDO("mysql:host=$host;dbname=$db_name",DB_USERNAME,DB_PASSWORD);

 $connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

 //echo "connection established";

 return $connection;

 }

 catch(PDOException $e)

 {

 return $e->getMessage();

 }

 }

}

//$db=new DB_Configuration();

//$db->db_connect();

```

In the above PHP file, we established a connection to our database. You may have also noticed that we have imported the `db_credentials.php` file. This file provides us with the constants that we have used in our PDO instance. 

Now that a connection to our database is set, let's create a method to insert into the `timer_tbl` table. 

Create a new file called `query.class.php` and add the following: 

```php

<?php

/**

* @author Miller Juma

*/

require_once "./db_configuration.class.php";

class Query

{

 public function get_timer()

 {

 try

 {

 $query="

 SELECT 

 date,

 hour,

 minutes,

 seconds 

 FROM

 timer_tbl";

 /**

 * create db_connection instance

 */

 $db= new DB_Configuration();

 $conn= $db->db_connect();

 /**

 * prepare the statement

 */

 $stmt=$conn->prepare($query);

 /**

 * execute the query

 */

 $stmt->execute();

 $timers=$stmt->rowCount();

 /**

 * use the if statement

 * to confirm if the row==1 or not

 * NOTE: timer_id is unique

 */

 if($timers==1)

 {

 /**

 * assign the details to

 * @var $row

 */

 $row=$stmt->fetch(PDO::FETCH_ASSOC);

 /**

 * assign each 

 * property a value

 * @var $result

 */

 $result=[

 "date" =>$row['date'],

 "hr" =>$row['hour'],

 "min" =>$row['minutes'],

 "sec" =>$row['seconds'],

 ];

 }

 http_response_code(200);

 return json_encode($result);

 }

 catch (Exception $e)

 {

 return $e->getMessage();

 }

 }

 public function update_timer(array $data)

 {

 $date =$data['date'];

 $hour =$data['hour'];

 $minutes=$data['minutes'];

 $seconds=$data['seconds'];

 $timer_id=1;

 //update timer

 $query=

 "

 UPDATE 

 timer_tbl

 SET 

 date ='$date',

 hour ='$hour',

 minutes ='$minutes',

 seconds ='$seconds'

 WHERE

 timer_id='$timer_id'

 ";

 //connect to the database and save user

 $db=new DB_Configuration();

 $connection=$db->db_connect();

 $statement=$connection->prepare($query);

 $statement->execute();

 }

 public function insert_timer(array $data)

 {

 try

 {

 $sql=

 "

 INSERT

 INTO

 timer_tbl(

 date,

 hour,

 minutes,

 seconds, 

 )

 VALUES(

 :date,

 :hr,

 :min,

 :sec, 

 )

 ";

 $db= new DB_Configuration();

 $connection= $db->db_connect();

 $statement=$connection->prepare($sql);

 $statement->bindParam(":date",$data['date']);

 $statement->bindParam(":hr",$data['hr']);

 $statement->bindParam(":min",$data['min']);

 $statement->bindParam(":sec",$data['sec']);

 if($statement->execute())

 {

 return json_encode(['data'=>'success']);

 }

 else

 {

 return json_encode(['data'=>'fail']);

 }

 }

 catch (Exception $e)

 {

 return $e->getMessage();

 }

 }

}

```

This is the file we'll use to access our data in the database. We'll use it to add, update, and create timer details. 
Next, let's create a file, `timer.class.php` (to create timer details), and add the following. 

```php

 <?php

/**

* @author Miller Juma

*/

require_once "./query.class.php";

class Timer

{

 public static function create()

 {

 try

 {

 //get API data from postman

 $data=json_decode(file_get_contents("php://input"),JSON_OBJECT_AS_ARRAY);

 $query=new Query();

 //call this method to add data

 $success=$query->insert_timer($data);

 if($success)

 {

 return json_encode([

 "data" =>"You have successfully added timer dates"

 ]);

 }

 else

 {

 return json_encode([

 "data" =>"Failed to add timer"

 ]);

 }

 }

 catch (Exception $exception)

 {

 return json_encode([

 "data" =>[

 "errorCode" =>$exception->getCode(),

 "errorMsg" =>$exception->getMessage()

 ]

 ]);

 }

 }

}

Timer::create();

```

This file has a method `create()` declared as static. Declaring class methods as static allows for their access without class instantiation. 

This method gets data from an API, in this case, Postman in a JSON format. This data is then converted to object arrays for manipulation. 

If you have made it this far? 

Congratulations, let's now test if our code works: 

As seen in the screenshot below, open your Postman application and add requests.  

### Fig 1: Postman Requests

![request](/engineering-education/creating-countdown-in-php-javascript-mysql/timer.png)  

Hit the send button to add timer details in the `timer_tbl` table. 

### Fetch timer details from database
>NOTE: It's recommended to proceed with this section if you have timer details in your database. 

Now, from the previous part, we created a file `query.class.php` and defined a method, `get_timer()`. 

We'll use this method to query timer details from our database as follows. 

Create a new file `get_timer_details.class.php` and add the following: 

```php

 <?php

/**

* @author Miller Juma

* query timer

*/

require_once "./query.class.php";

class TimerQuery

{

 public static function get()

 {

 try

 {

 //get_timer() method returns query result as json

 $query=new Query();

 $timerQueryDetails=$query-> get_timer();

 //test your result

 var_dump($timerQueryDetails)

 }

 catch (Exception $exception)

 {

 return json_encode([

 "data" =>[

 "errorCode" =>$exception->getCode(),

 "errorMsg" =>$exception->getMessage()

 ]

 ]);

 }

 }

}

TimerQuery::get();

```

Run this script in your Postman or preferred browser to test whether it returns results. 

The best way to debug your script is by logging in to check for any errors. In this case, a database connection may cause an error, be sure to use the correct configurations. 

At this stage, we have timer access in our database, let's now create a countdown. 

### Create a countdown using JavaScript and PHP
Whatever the data we fetched from the previous section, we'll use it here. 

Create a JavaScript script, `timer.js`, and add the following code: 

```js

<script>

//task: get timer details from the previous section and assign them to variables. 
//tip, these are associative arrays accessed as $myArray['data'] 

const countDownDate = <?php 

 echo strtotime("$date $hour:$minutes:$seconds" ) ?> * 1000;

const timeNow = <?php print(time()) ?> * 1000;

// Every second, the countdown will be updated.

let i = setInterval(function() {

timeNow = timeNow + 1000;

// Calculate the time between now and the end of the countdown.  

let dist = countDownDate - timeNow;

// Calculate the number of days, hours, minutes, and seconds in days, hours, minutes, and seconds.

let numOfDays = Math.floor(dist / (1000 * 60 * 60 * 24));

let hr = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

let min = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));

let sec = Math.floor((dist % (1000 * 60)) / 1000);

// Put the result in an element with the id="timer" attribute.  

document.getElementById("timer").innerHTML = numOfDays + "d " + hr + "h " +

min + "m " + sec + "s ";

// When the countdown is over, type some text. 

if (dist < 0) {

clearInterval(i);

document.getElementById("timer").innerHTML = "TIMER EXPIRED";

}

}, 1000);

</script>

```

Now that we've got a working static countdown script, let's now make it dynamic. 

### Creating dynamic countdown by a database update
In this section, we will build a dynamic countdown by updating our database records to set a new time.
To update the database, create an HTML form in `timer.html` with a POST request action. 

Add the input fields as shown below. 

```HTML

<!DOCTYPE html>

<html>

 <head><title> Countdown</title></head>

 <body>
 <div id="timer">
   
 </div>

 <div>

 <form method="POST" action="update.php">

 <div class="form-group">

 <label>Date</label>

 <input type="date" name="date" value="<?php echo $date;?>">

 </div>

 <div class="form-group">

 <label>Hour</label>

 <input type="number" name="h" value="<?php echo $h;?>">

 </div>

 <div class="form-group">

 <label>Minutes</label>

 <input type="number" name="m" value="<?php echo $m;?>">

 </div>

 <div class="form-group">

 <label>Seconds</label>

 <input type="number" name="s" value="<?php echo $s;?>">

 </div>

 <button type="submit" name="update">Update Timer</button>

 </form>

 </div>

 </body>

</html>

```

In the form above, the action is set to `update.php` script, let's proceed and create this file to update these details. Make a copy of this file and paste the following snippets into it.  

```php

<?php

/**

* @author Miller Juma

* query timer

*/

require_once "./query.class.php";

class UpdateTimer

{

 public static function timer_update()

 {

 try

 {

 //call the update_timer() method from Query class

 // pass this method the timer data to update

 //get the post request from the HTML form above

 $date = $_POST['date'];

 $hour = $_POST['hour'];

 $min = $_POST['minutes'];

 $sec = $_POST['seconds'];

 //an array of the timer to update

 $data = [

 "date" =>$date,

 "hour" =>$hour,

 "min" =>$min,

 "sec" =>$sec,

 ];

 //pass this array to method update_timer();

 //start by creating an instance of Query class

 $query=new Query();

 $timerQueryUpdateDetails=$query->update_timer();

 if($timerQueryUpdateDetails)

 {

 echo "updated timer successful, a new event countdown will start immediately";

 }

 else

 {

 echo "Timer update failed, try again";

 }

 }

 catch(Exception $exception)

 {

 echo $exception->getMessage();

 }

 }

}

UpdateTimer::timer_update();

```

Visit your URL to update the timer, you should be able to see something like this depending on your styling. 

![result](/engineering-education/creating-countdown-in-php-javascript-mysql/timer_update.png)

Now, set your preferred countdown dates and refresh the page. 

You'll notice that the countdown starts from the set time. 

### Conclusion
We've seen that JavaScript creates a static countdown. With PHP and database, we can make this action dynamic. Users can then proceed to set their countdown dates.

Happy coding!

---

Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
