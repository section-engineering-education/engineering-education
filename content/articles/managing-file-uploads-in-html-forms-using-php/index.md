---
layout: engineering-education
status: publish
published: true
url: /managing-file-uploads-in-html-forms-using-php/
title: Managing File Uploads in HTML Forms using PHP
description: In this article we will look at how we handle file uploads in HTML forms with PHP. It is an easy and efficient way of handling multipart form submissions. 
author: felix-vaati
date: 2021-04-09T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/managing-file-uploads-in-html-forms-using-php/hero.jpg
    alt: Managing File uploads in HTML forms using PHP
---
In today’s world, files are exchanged daily, especially over the internet.  Websites use these files for various purposes such as user profile pictures and exchange of information among users. These range from images, videos to pdf documents.
<!--more-->
### Introduction
In this tutorial, we will look at how to use HTML forms and PHP to upload files to a website.

### Prerequisites
Before starting this tutorial, make sure you have prior knowledge on how to create HTML forms and databases in MySQL. You can check out a simple guide on how to create forms in HTML [here](/working-with-forms-in-php/).

Since we will be using PHP, make sure you have installed `Xampp` to help in running the PHP code. You can download it [here](https://www.apachefriends.org/download.html).

> **NOTE: In this tutorial, we will be using Windows.**

Once the installation is complete, start the Xampp control panel and activate Apache by clicking the start button as highlighted below.

![Apache image](/engineering-education/managing-file-uploads-in-html-forms-using-php/apachestart.jpg)

After a few seconds, the Apache header should change to a green background to indicate the apache server is running. Check the image below for reference.

![Apache running image ](/engineering-education/managing-file-uploads-in-html-forms-using-php/apachesuccess.jpg)

### Step 1 — Creating the PHP files
Navigate to `C:\xampp\htdocs\` (the driver location will depend on where you installed your Xampp app) and create a new folder `test`.

We shall move to create a new file `(index.php)` under the `test` folder, this is where we will be writing all the code for this tutorial.

In the `index.php` file insert the following code:

```php
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>HTML Form</title>
  </head>
  <body>
    <h1>Form</h1>
    <form method="POST" action="index.php" enctype="multipart/form-data" >
      <label  class="form-label">Name</label>
      <input type="text" class="form-control" id="exampleInputEmail1" name="name" required > <br><br>
      file : <input type="file" name="file"><br><br>
      <br/>
      <input type="submit" value="submit"  name="submit">
    </form>
  </body>
</html>
```

To view the output of this code, head to your browser at http://localhost/test. Here we append our folder name `test` to the base URL of our Apache server `http://localhost/`

From the browser, you should have something like this.

![form output](/engineering-education/managing-file-uploads-in-html-forms-using-php/formlayout.jpg)

### Step 1 — Creating the PHP logic to handle the file uploads
In the form we created above, once we click the submit button an action seems to be taking place. Although the file we choose to upload seems to have been uploaded, we cannot locate them.

To make this form save the uploaded file on our preferred location, we will be creating a PHP script to handle the submission process.

There are usually two common ways of handling the above situation.
1. **Saving a file on a table record** - In this way, we save the files in a folder and then save the reference on the database.
2. **Saving the file directly on the database** - In this way, we save the files as binary files (BLOB). However, this way is not efficient especially in situations where large files are to be uploaded. This is because it will slow the database access as records increase.

#### Saving the file on a table record
When saving files on a table record, we follow these steps.

1. **Create a database** -> Head to the `xampp` control panel and start MySQL. Click the admin button to access the `phpMyAdmin` dashboard; this is where we will create our database.

![mysql button](/engineering-education/managing-file-uploads-in-html-forms-using-php/mysqlbutton.jpg).

The admin button on the MySQL row should take you to your browser and display this.

[Phpmyadmin dashboard](/managing-file-uploads-in-html-forms-using-php/Phpmyadmin.jpg)

2.  **Connecting to a database** -> For this tutorial we will be using mysqli. In our `index.php` file , under the closing html tag lets add the following php script.

```PHP
<?php
$server = 'localhost';
$user = "root";
$password = "";
$dbname = "tutorial";
$conn = mysqli_connect($server, $user, $password, $dbname) or die("could not connect to the database");
?>
```

The code above allows us to connect to our database. The `$server` variable stores the name of the server where our database is located. 

The `$user` and `$password` variables store data about the user. `$password` is empty in our case because in our Apache server we have not set any. `$dbname` stores our database name.

We will use the `$conn` variable to connect to the database. To ensure the connection is working we use the `die` function to end the connection and give us feedback in case the connection fails.

3. **Getting the file from the form** -> when a user uploads a file in our form, we need to get the file and store it in our preferred location. To perform this, add a new folder inside the test folder and name it uploads.

This code will get the file from the forms. Insert it in our PHP script just below `$conn`.

```PHP
if(isset($_POST['submit'])){
   $name = $_FILES['file']['name'];
   //the directory to upload to
   $targetDir = "uploads/";
   //the file being upload
   $targetFile = $targetDir.basename($\_FILES['file']['name']);
   //select the file type - file extension
   $fileType = strtolower(pathinfo($targetFile,PATHINFO_EXTENSION));
}
```

We use an if statement to check whether the user has clicked the submit button. If true the file name will be stored in `$name`.Since we created our preferred storage location, we use `$targetDir` to indicate where will store our file.

In some cases, we might want to restrict the type of files uploaded. Different files have different extensions which enable us to filter the files.

Insert the following code below `$fileType`.

```PHP
//valid file extensions we will allow
$extensions_arr= array("jpg","jpeg","png");
//checking the extension of our uploaded file
if(in_array($fileType,$extensions_arr)){
   // Insert record
   $query = " INSERT into `files` (`filename`) values('$name')";
   mysqli_query($conn,$query);
   // Upload file
   move_uploaded_file($_FILES['file']['tmp_name'],$targetDir.$name);
} else echo " wrong file type ";
```

In this tutorial we will limit the type to only photos. `$extensions_arr` stores the file types we will allow.

Let's check whether our file has any of the above extensions. The `in_array` function checks if a value exists in an array. 

If it exists, we shall create a query to insert the file's name into our database. This acts as a reference to our file which will be stored in the `uploads` folder.

In case the file type does not match the extensions in our array, we will return an error message using the `echo` function.

#### Retrieving the file
To retrieve the file we stored in our database, we need to query the database for the file's name .

Since we only stored the file name and not the file name itself, the result from the query is matched to the files in our `uploads` folder.

```bash
php $sql = "SELECT `filename` FROM `files` WHERE `filename`= '$name'"; $result = mysqli_query($conn,$sql); $row = mysqli_fetch_array($result); $image = $row['filename']; $image_src = "uploads/".$image 
```

Since our files are images, we will add an image tag after the closing tag of our PHP script. This code will display the image we have uploaded in our database.

```bash
php <img src='<?php echo $image_src; ?>' > 
```

Our final code will be as shown below.

```PHP
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>HTML Form</title>
  </head>
  <body>
    <h1>Form</h1>
    <form method="POST" action="index.php" enctype="multipart/form-data">
      <label for="exampleInputEmail1" class="form-label">Name</label>
      <input type="text" class="form-control" id="exampleInputEmail1" name="name" required aria-describedby="emailHelp"> <br><br>
      File : <input type="file" name="file"><br><br>
      <br/>
      <input type="submit" value="submit"  name= "submit">
    </form>
  </body>
</html>
<?php
  $server='localhost';
  $user= "root";
  $password ="";
  $dbname="tutorial";
  $conn= mysqli_connect($server,$user,$password, $dbname) or die ("could not connect to the database");

  if(isset($_POST['submit'])){
     $fileName = $_POST['name'];
     $name = $_FILES['file']['name'];
     $targetDir = "uploads/";
     $targetFile = $targetDir.basename($_FILES['file']['name']);
     $fileType = strtolower(pathinfo($targetFile,PATHINFO_EXTENSION));
     $extensions_arr= array("jpg","jpeg","png");
     if( in_array($fileType,$extensions_arr) ){
     // Insert record
     $query = " INSERT into `files` (`filename`) values('$name')";
     mysqli_query($conn,$query);
     // Upload file
     move_uploaded_file($_FILES['file']['tmp_name'],$targetDir.$name);
     } else echo " wrong file type ";

     }
     $sql = "SELECT  `filename` FROM `files` WHERE `filename`= '$name'";
     $result = mysqli_query($conn,$sql);
     $row = mysqli_fetch_array($result);
     $image = $row['filename'];
     $image_src = "uploads/".$image;
  ?>
<img src='<?php echo $image_src; ?>' >
```

### Conclusion
That is how we handle file uploads in HTML forms with PHP. It is an easy and efficient way of handling multipart form submissions. 

You can go ahead and try handling video or pdf uploads. 

Happy coding!

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
