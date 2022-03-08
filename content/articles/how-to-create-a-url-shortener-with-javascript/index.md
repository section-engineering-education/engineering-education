---
layout: engineering-education
status: publish
published: true
url: /how-to-create-a-url-shortener-with-javascript/
title: How to Create a URL Shortener Using Javascript
description: This tutorial explains how URL shorteners function and how to create one using PHP and MySQL.
author: judy-nduati
date: 2021-10-26T00:00:00-03:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-create-a-url-shortener-with-javascript/hero.jpg
    alt: How to Create a URL Shortener in Javascript Hero Image
---
In this project, we are going to build a Uniform Resource Locator (URL) shortener service. I am pretty sure that most of you have heard of [bit.ly](https://bitly.com/), [goo.gl](https://developers.googleblog.com/2018/03/transitioning-google-url-shortener.html), and other URL shorteners.
<!--more-->
With URL shorteners, you can shorten long URLs to make them easy to share.

In this tutorial, you will build a service that does this. We will be building the API that shortens long links using JavaScript, PHP, and MySQL databases.

Without further ado, Let's get started.

### Table of contents
- [URL shortener](#url-shortener)
- [How does a URL shortener work?](#how-does-a-url-shortener-work)
- [Building a URL shortener](#building-a-url-shortener)

### Prerequisites
A basic understanding of HTML, CSS, JavaScript, and PHP is needed. Have a text editor installed on your computer, preferably Visual Studio Code.

We will use the MySQL database. Make sure you have [WAMP](https://www.wampserver.com/en/) or [XAMPP](https://www.apachefriends.org/index.html) servers installed on your computer.

### URL shortener
A [URL shortener](https://en.wikipedia.org/wiki/URL_shortening) is a tool that takes a long and complex URL and compresses it to a short and clear link that is easier to share. Users are redirected to the primary URL when they click these short links.

For example, you may want to share a post and include a link to Twitter, but you face the characters limit. Twitter limits up to 280 characters. To solve this problem, you use a URL shortener to lessen the link. It is not only useful with Twitter but also in any other situation where long links are unmanageable.

Short links save a lot of space when exhibited as they are small and clear. Also, it is difficult for users to mistype shorter links.

### How does a URL shortener work?
The process of URL shortening is pretty simple. URL shorteners generate a random string, map the main URL to the shortcode and provide a new URL. The two URLs are put in the database.

When you hit the shortened URL, the database checks the shortcode and redirects you to the main URL. The URL shortener gets a long URL and returns a short URL.

In this scenario, we will create an input area to enter the long (original) URL. Upon hitting the button, the system will generate the short URL. Also, it will be possible to edit and save the shortened URL. The delete function will also be available.

You can build a URL shortener with any programming language and database. In this tutorial, we will use HTML, JavaScript, PHP, and MySQL.

### Building a URL shortener
To create a URL shortener, we'll need a database and a server. In this guide, we'll use a WAMP server, which means we will host the API in the Windows operating system.

WAMP (Windows, Apache, MySQL, and PHP) can be explained as follows:
- **Windows** - specifies that the system is compatible with Windows devices.
- **Apache** - this is the program that hosts applications.
- **MySQL** - provides a database for your application's content.
- **PHP** - a language that creates dynamic content.

#### Step 1: Navigate to the WAMP server
Navigate to the WAMP server. The directory is automatically created during installation, and is located in local disk C (c:\\wamp\\www). In the www directory, folders referred to as projects are created. These come in handy in storing HTML, CSS, JavaScript, and PHP files.

To begin creating the project, create a folder and name it `shorten-url`.

#### Step 2: Create a PHP file
To create a URL shortener, we'll need a text input area and a button, then add the script tag. Create the `index.php` file inside the `shorten-url` directory and open it using VS code.

To create the text input area and the button, we will use the code below:

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <title>URL Shortener</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="wrapper">
        <form action="#">
            <i class="url-icon uil uil-link"></i>
            <input type="text"placeholder="Enter the long url" required>
            <button>Shorten the URL</button>
        </form>
        <div class="count">
            <span>Total Links: <span>10</span> & Total Clicks</span>
        </div>
        <div class="url-area">
            <div class="title">
                <li>Shorten URL</li>
                <li>Original URL</li>
                <li>Clicks</li>
                <li>Actions</li>
            </div>

    </div>
    <script src="script.js"></script>
</body>
</html>
```

Below is the input area:

![Input area](/engineering-education/how-to-create-a-url-shortener-with-javascript/input-area.jpg)

In folder `shorten-url`, we will also add `script.js`, `connect.php`, `controller.php`, `save-url.php`, `delete.php`, and `style.css` files.

#### Step 3: Configuring MySQL and creating a database and table
In this section, we will configure the MySQL database by opening the phpMyAdmin panel. The admin username by default sets to `root`, and the password is a blank field.

Create a database, and name it `shorten-url`. Then create a table `url`. Table `url` attributes include (id, short_url, original_url, and clicks). The `shorten-url` database stores the URL data (id, original url, short url, and clicks).

![Database](/engineering-education/how-to-create-a-url-shortener-with-javascript/database.jpg)

#### Step 4: Database configuration
Create a file `connect.php` and add database credentials in it.

```PHP
<?php
$domain = "localhost/url/";
$servername = "localhost";
$username = "root";
$password = "";
$dbname='shorten-url';
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
```

#### Step 5: Create a short URL with PHP
In the input area, we enter the long URL, and after hitting the button, the short URL is generated.

The following code creates a short URL using PHP and MySQL.

```PHP
<?php
  include "php/connect.php";
  $new_url = "";
  if(isset($_GET)){
    foreach($_GET as $key=>$val){
      $u = mysqli_real_escape_string($conn, $key);
      $new_url = str_replace('/', '', $u);
    }
      $sql = mysqli_query($conn, "SELECT original_url FROM url WHERE short_url = '{$new_url}'");
      if(mysqli_num_rows($sql) > 0){
        $sql2 = mysqli_query($conn, "UPDATE url SET clicks = clicks + 1 WHERE short_url = '{$new_url}'");
        if($sql2){
            $original_url = mysqli_fetch_assoc($sql);
            header("Location:".$original_url['original_url']);
          }
      }
  }
?>

<?php
      $sql2 = mysqli_query($conn, "SELECT * FROM url ORDER BY id DESC");
      if(mysqli_num_rows($sql2) > 0){;
        ?>
        <div class="url-area">
          <div class="title">
            <li>Shorten URL</li>
            <li>Original URL</li>
            <li>Clicks</li>
            <li>Action</li>
          </div>
          <?php
            while($row = mysqli_fetch_assoc($sql2)){
              ?>
                <div class="data">
                <li>
                  <a href="<?php echo $domain.$row['short_url'] ?>" target="_blank">
                  <?php
                    if($domain.strlen($row['short_url']) > 50){
                      echo $domain.substr($row['short_url'], 0, 50) . '...';
                    }else{
                      echo $domain.$row['short_url'];
                    }
                  ?>
                  </a>
                </li>
                <li>
                  <?php
                    if(strlen($row['original_url']) > 60){
                      echo substr($row['original_url'], 0, 60) . '...';
                    }else{
                      echo $row['original_url'];
                    }
                  ?>
                </li>
              </li>
              </div>
              <?php
            }
          ?>
      </div>
        <?php
      }
    ?>
  </div>

```

![Shorten URL](/engineering-education/how-to-create-a-url-shortener-with-javascript/shorten-url.jpg)

#### Step 6: Generate a unique random number
We created a file `controller.php`, which generates a unique id and inserts the original URL into the table with the short URL.

The following code generates a unique random id for the long URLs. This is how we can generate the unique id:

```PHP
<?php
    include "connect.php";
    $original_url = mysqli_real_escape_string($conn, $_POST['original_url']);

    if(!empty($original_url) && filter_var($original_url, FILTER_VALIDATE_URL)){
        $ran_url = substr(md5(microtime()), rand(0, 26), 5);////generating a random number, 5 characters

        //checking that random generated url exists in the database or not
        $sql = mysqli_query($conn, "SELECT * FROM url WHERE short_url = '{$ran_url}'");
        if(mysqli_num_rows($sql) > 0){
            echo "Something went wrong. Please generate again!";
        }else{
            //insert typed url into the table with short url
            $sql2 = mysqli_query($conn, "INSERT INTO url (original_url, short_url, clicks)
                                         VALUES ('{$original_url}', '{$ran_url}', '0')");
            if($sql2){
                $sql3 = mysqli_query($conn, "SELECT short_url FROM url WHERE short_url = '{$ran_url}'");
                if(mysqli_num_rows($sql3) > 0){
                    $short_url = mysqli_fetch_assoc($sql3);
                    echo $short_url['short_url'];
                }
            }
        }
    }
    ?>
```

#### Step 7: Redirect to long URL
The short URL should redirect to the long URL. The following code redirects a user from short URL to the long URL.

```JavaScript
 let domain = "localhost/url/";
                shortenURL.value = domain + data;
                copyIcon.onclick = ()=>{
                    shortenURL.select();
                    document.execCommand("copy");
                }
```

```PHP
 <div class="data">
                <li>
                  <a href="<?php echo $domain.$row['short_url'] ?>" target="_blank">
                  <?php
                    if($domain.strlen($row['short_url']) > 50){
                      echo $domain.substr($row['short_url'], 0, 50) . '...';
                    }else{
                      echo $domain.$row['short_url'];
                    }
                  ?>
                  </a>
                </li>
```

#### Step 8: Function save URL
After creating the short url that generates a unique id. The unique id can be edited and saved. Create `save-url.php` file then copy and paste the code below:

```PHP
<?php
    include "connect.php";
    $og_url = mysqli_real_escape_string($conn, $_POST['short_url']);
    $short_url = str_replace(' ', '', $og_url);
    $hidden_url = mysqli_real_escape_string($conn, $_POST['hidden_url']);

    if(!empty($short_url)){
        if(preg_match("/\//i", $short_url)){
            $explodeURL = explode('/', $short_url);
            $shortURL = end($explodeURL);
            if($shortURL != ""){
                $sql = mysqli_query($conn, "SELECT short_url FROM url WHERE short_url = '{$shortURL}' && short_url != '{$hidden_url}'");
                if(mysqli_num_rows($sql) == 0){
                    $sql2 = mysqli_query($conn, "UPDATE url SET short_url = '{$shortURL}' WHERE short_url = '{$hidden_url}'");
                    if($sql2){
                        echo "success";
                    }else{
                        echo "Error - Failed to update link!";
                    }
                }else{
                    echo "The short url that you've entered already exist. Please enter another one!";
                }
            }else{
                echo "Required - You have to enter short url!";
            }
        }else{
            echo "Invalid URL - You can't edit domain name!";
        }
    }else{
        echo "Error- You have to enter short url!";
    }
?>
```

Below is how the save functionality works:

![Save URL](/engineering-education/how-to-create-a-url-shortener-with-javascript/save-url.gif)

#### Step 9: Function delete URL
It is also possible to delete a shortened URL that is saved in the database. Create `delete.php` file, then copy and paste the code below:

```PHP
<?php
    include "connect.php";
    if(isset($_GET['id'])){
        $delete_id = mysqli_real_escape_string($conn, $_GET['id']);
        $sql = mysqli_query($conn, "DELETE FROM url WHERE short_url = '{$delete_id}'");
        if($sql){
            header("Location: ../");
        }else{
            header("Location: ../");
        }
    }elseif(isset($_GET['delete'])){
        $sql3 = mysqli_query($conn, "DELETE FROM url");
        if($sql3){
            header("Location: ../");
        }else{
            header("Location: ../");
        }
    }else{
        header("Location: ../");
    }
?>
```

Below is how delete functionality works:

![Delete URL](/engineering-education/how-to-create-a-url-shortener-with-javascript/delete-url.gif)

This is how the URL Shortener system works:

![URL shortener](/engineering-education/how-to-create-a-url-shortener-with-javascript/url-shortener.gif)

You can find the source code of the project on [GitHub](https://github.com/JudyNduati/How-to-create-a-URL-shortener-with-Javascript-).

### Wrapping up
Congratulations! You have finally created a URL shortener using JavaScript, PHP, and MySQL. The system generates a unique random id, and once saved, it is stored in the database.

To summarize, we have learned:
- What is a URL shortener?
- How a URL shortener works.
- How to build a URL shortener using JavaScript, PHP, and MySQL.

You can also go through [how to build a URL shortener using Node.js, Express, and Mongo DB](https://www.section.io/engineering-education/nodejs-url-shortener/).

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul)
