---
layout: engineering-education
status: publish
published: true
url: /working-with-forms-in-php/
title: Working with Forms in PHP
description: This article will show you how to implement forms using PHP and HTML. The reader will also understand the GET and POST methods. POST creates data, GET reads data from the server, and PUT update data in the server.
author: judy-nduati
date: 2021-03-08T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/working-with-forms-in-php/hero.jpg
    alt: Working with Forms in PHP
---
We mainly use HTML forms when collecting user input in web-based applications. They range from contact forms, login forms, and also registration forms. Forms are the fundamental interface between the user and the server. Creating a form on a web application is achieved using HTML. PHP connects the web application with the database server.
<!--more-->
Through this article, you will learn how to:
- Create an HTML form.
- Learn about Hypertext Transfer Protocol (HTTP) request methods (GET, POST, and PUT).
- Understand PHP [POST and GET methods](https://www.w3schools.com/tags/ref_httpmethods.asp). 

### Prerequisites
Before we begin you should have prior knowledge of HTML, PHP, and MySQL.

### Overview of forms
A [form](https://www.tutorialspoint.com/php/php_form_introduction.htm) is a document with blank fields for a user to insert or update data. The user's data is stored in the database and retrieved anytime.

Using forms to collect data in a web application is a simple task. 

Some of the popular forms include:
- Contact Forms
- Search Forms
- Login Forms
- Registration Forms

The form is presented to the user who inserts data and submits the form using a `submit` button. Most of the time, the form data is sent to the server for processing. Processing user input involves validating inputs, database operations, and providing feedback to the user. There are four database operations involved, these being create, read, update, and delete. This pattern is commonly known by the acronym `CRUD` operations.

Hypertext Transfer Protocol (HTTP) enables communication between the client (browser) and the server. An HTTP request is sent by a client to the server which then returns a response. Though HTTP supports several methods, we will focus on `GET`, `POST`, and `PUT`. Data is processed based on the selected method.

The `GET` method fetches data from the server. The `POST` method sends data from the HTML form to the server to create a resource. `PUT` method sends data to the server to create or update a resource. Some developers are unable to differentiate between the POST and PUT methods. 

The PUT method is `idempotent`. This means calling a PUT method multiple times will not affect the database because data is already updated. In contrast, calling a `POST` method affects the database because you create multiple objects. 

### How to create HTML forms
HTML forms can contain special elements such as [buttons](https://www.w3schools.com/tags/att_button_form.asp), [radio buttons](https://www.w3schools.com/tags/att_input_type_radio.asp), and [checkboxes](https://www.w3schools.com/tags/att_input_type_checkbox.asp). It, therefore, becomes easy for the user to interact with the webpage. Forms should be user-friendly. This means that a user with no technical skills should be able to use it.

Forms are defined by the `<form><\form>` tags. The `form` tag surrounds all the inputs. It also gives instructions about how and where to submit the form. The HTML form sends data to your PHP script using either `POST` or `GET` methods.

Here is an example of a form that submits data to a file named `index.php`. To have a complete source code, use this HTML code and change the method to either POST or GET where necessary.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>HTML Form</title>
</head>
<body>
    <h1>HTML Form</h1>
    <form method="" action="index.php">
        Name: <input type="text" name="name"><br><br/>
        Email: <input type="text" name="email"><br/>
        <br/>
        <input type="submit" value="submit" >
    </form>
</body>
</html>
```

The output for the above code is as shown in the screenshot below.

![HMTL Form](/engineering-education/working-with-forms-in-php/form.png)

The `action` identifies the page where the form input is submitted. Data can be submitted on the same page as the form or on a different page. The `method` specifies how data is processed. This can be `POST`, `GET`, or `PUT`. The `GET` method collects data from the server and sends it in the URL. The data submitted via the `POST` method is stored in the HTTP request body and cannot be seen on the URL.

### POST method
`POST` is a superglobal method, which collects form data and submits it to the HTTP server. The data entered is encoded, and the content is hidden. POST method has a global scope, and data is accessed from any script.

The POST method is preferred because data sent through it is not visible in the URL. The POST method is also important because data cannot be decoded by looking into web server logs. 

POST does not have a limitation on the amount of data sent from the form. This is because data is submitted via the body of the HTTP request. The `POST` method is appropriate for a `login` form.

### Processing the form data (PHP script)
The PHP code below can be used to process input from an HTML form with the POST method. The code should be put in the script, which is the form target. 

It can be in the same script where the HTML form is, or it can be on a different script. In this case, we will have the PHP code in the same script as the HTML form.

```php
<?php
    # Check if name and email fileds are empty
    if(empty($_POST['name']) && empty($_POST['email'])){
        # If the fields are empty, display a message to the user
        echo " <br/> Please fill in the fields";
    # Process the form data if the input fields are not empty
    }else{
        $name= $_POST['name'];
        $email= $_POST['email'];
        echo ('Your Name is:     '. $name. '<br/>');
        echo ('Your Email is:'   . $email. '<br/>');
    }
?>
```

The output of the code above is as shown in the animation below.

<iframe width="478" height="269" src="https://www.youtube.com/embed/JeaM8ZOfLA4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### GET method
`GET` is the default super global method that collects or retrieves data from the server. It has a global scope. Thus, data is accessed from any script in the program. The GET method submits data in the URL. 

Data transferred via this method is visible on the URL of the HTTP request. The HTTP request can be cached and saved in the browser history. The disadvantage of the GET method is that it should not be used with sensitive data such as passwords because it is not secure.

The GET method has a limitation of the amount of data sent from the form. The data being sent on the URL depends on the web server's operating system and the type of browser. 

Most systems have a limit of `255` characters. The best example of using the GET method is with the search engine forms. The code below can be used to process an HTML form with a method set as `GET`.

```php  
<?php
    # Check if name and email fileds are empty
    if(empty($_GET['name']) && empty($_GET['email'])){
        # If the fields are empty, display a message to the user
        echo "Please fill in the fields";
    # Process the form data if the input fields are not empty
    }else{
        $name= $_GET['name'];
        $email= $_GET['email'];
        echo ('Welcome:     '. $name. '<br/>');
        echo ('This is your email address:'   . $email. '<br/>');
    }
?>
```

Here is the output of the GET method example.

<iframe width="478" height="269" src="https://www.youtube.com/embed/9JnxwdvsiDM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Tabular comparison of GET and POST methods
| POST Method | GET Method |
| --- | --- |
| Bookmarking the results is not possible. | Results can be bookmarked. |
| Data do not remain in the browser history. It's hidden. | Data remain in browser history. |
| The performance is low because POST cannot decode the data. | The performance is high because of the simple nature of displaying data. |
| It is more secure | It is less secure |
| Do not limit the amount of data sent to the server. | Limit the amount of data sent to the server. |
| It works with sensitive data. | It cannot work with sensitive data. |

### HTML forms and MySQL database CRUD operations
We will learn how to perform CRUD operations on a MySQL database using HTML forms. We will learn how to use HTML forms to create, read, update and delete data from the MySQL database.

First, create a MySQL database and name it `crud`. Create a table with `three `columns, name it `user`. 

The columns are:
1. id
2. name
3. email

### Create a database server connection
After creating the database and tables, we need a PHP script that connects to the MySQL database server. Create a file named `connect.php` and place in it the following code. The scripts make a connection to the MySQL database server.

```php
<?php 
    $servername = "localhost";
    $username = "root"; # MySQL user
    $password = ""; # MySQL Server root password
    $dbname='crud'; # Database name
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        # Display an error mesage if the connection fails
        die("Connection failed: " . $conn->connect_error);
    }
?>
```

We will later include this file using the `include()` function.

```php
include("connect.php")
```

### Create
To create a record in the database, use the code below. Once the form is submitted via the `POST` method, it is processed, and a record is created in the table `user`.

```php
<?php
// Include script to make a database connection
include("connect.php");
// Check if input fileds are empty
if(empty($_POST['name']) && empty($_POST['email'])){
    // If the fields are empty, display a message to the user
    echo "Please fill in the fields";
// Process the form data if the input fields are not empty
}else{
    $name= $_POST['name'];
    $email= $_POST['email'];
    echo ('Your Name is:     '. $name. '<br/>');
    echo ('Your Email is:'   . $email. '<br/>');
    # Insert into the database
    $query = "INSERT INTO user(name,email) VALUES ('$name','$email')";
    if (mysqli_query($conn, $query)) {
        echo "New record created successfully !";
    } else {
         echo "Error inserting record: " . $conn->error;
    }
}
?>
```

Here is the form. 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>FORMS</title>
</head>
<body>
    <h1>Form</h1>
    <form method="post" action="form-post.php">
        Name: <input type="text" name="name"><br><br/>
        Email: <input type="text" name="email"><br/>
        <br/>
        <input type="submit" name="save" value="submit" >
    </form>
</body>
</html>
```

The video below shows how the code above works.

>Note: After we submit the form input, a new record is created in the database and displayed in a table.

<iframe width="478" height="269" src="https://www.youtube.com/embed/MIfVUyi_594" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Read
The code below retrieves the inserted data and displays it in an HTML table.

```php
<?php
# Include script to make a database connection
include("connect.php")
$ Read From the database and display in the table
$query2 = "SELECT * FROM user";
$result = $conn->query($query2);
if ($result->num_rows > 0) {
    # Output data for each row
    echo "<table id='tsa' border='1' id='example' class='table table-striped responsive-utilities table-hover'>
              <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action 1</th>
                <th>Action 2</th>
                </tr>
              </thead>
              ";
    while($row = $result->fetch_assoc()) {
       echo "<tr id='green' ",">",
            "<td>", $row["id"],"</td>",
            "<td>", $row["name"],"</td>",
            "<td>", $row["email"],"</td>",
            "<td>",
                "<form action='update.php' method='post'>
                 <input name='id' value='",$row["id"],"' hidden>
                 <button type='submit' name='update' value='update'>Edit</button>
                </form>",
            "</td>",
            "<td>",
                "<form action='form-post.php' method='post'>
                 <input name='id' value='",$row["id"],"' hidden>
                 <button type='submit' name='delete' value='delete'>Delete</button>
                </form>",
            "</td>",
            "</tr>";
    }
    echo  "</table>";
}else {
 echo "No Records!";
}
?>
```

Below is an animation of how the read operation works.

<iframe width="478" height="269" src="https://www.youtube.com/embed/iD9qF3mRsDo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Update
HTML forms are used to update existing data in the database. In this case, we will implement the update functionality. The `update form` is displayed when we click the `edit` button in the table cell. 

Take note of the code used to create the edit button on the table. The `update` button is a `submit` button for a form with hidden input fields. 

Once the `edit` button is clicked, the `id` of the item to be edited is sent to the script `update.php`. Either the `GET` or `POST` method can be used.

```html
    <td>
        <form action='update.php' method='post'>
            <input name='id' value='",$row["id"],"' hidden>
            <button type='submit' name='update' value='update'>Edit</button>
        </form>
    </td>
```

In the `update.php` script, a form with data matching the submitted information is displayed for editing. Once the edit is complete, the updated data is resubmitted to the script for processing. In this case, we are using the same script to process `update` requests. 

The script below is used to update the data.

```php
<?php
// Include script to make a database connection
include("connect.php");
// Empty string to be used later
$name='';
$email='';
$id='';

// Button click to update using POST method
if(!empty($_POST['update']) && !empty($_POST['id']) )  {
  $id=$_POST['id'];
  // Fetch record with ID and populate it in the form
  $query2 = "SELECT * FROM user WHERE id='".$_POST['id']."' ";
  $result = $conn->query($query2);
  if ($result->num_rows > 0) {
    // Output data for each row
    while($row = $result->fetch_assoc()) {
      $name=$row["name"];
      $email=$row["email"];
    }
    echo "Current Details: " ."<b> - Name:</b> " . $name. " <b>Email:</b>" . $email. "<br>";
  } else {
    echo "Error updating";
  }
}

// Button click to update using GET method
if(!empty($_GET['update']) && !empty($_GET['id']) )  {
  $id=$_GET['id'];
  // Fetch record with id and populate it in the form
  $query2 = "SELECT * FROM user WHERE id='".$_GET['id']."' ";
  $result = $conn->query($query2);
  if ($result->num_rows > 0) {
    // Output data for each row
    while($row = $result->fetch_assoc()) {
      $name=$row["name"];
      $email=$row["email"];
    }
    echo "Current Details: " ."<b> - Name:</b> " . $name. " <b>Email:</b>" . $email. "<br>";
  } else {
    echo "Error updating";
  }
}
// Check that the input fields are not empty and process the data
if(!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['id']) ){
    // Insert into the database
  $query = "UPDATE user SET name='".$_POST['name']."', email='".$_POST['email']."' WHERE id='".$_POST['id']."' ";
  if (mysqli_query($conn, $query)) {
      echo "Record updated successfully!<br/>";
      echo '<a href="form-get.php">Get Form</a><br/>
            <a href="form-post.php">Post Form</a>';
      die(0);
  } else {
      // Display an error message if unable to update the record
       echo "Error updating record: " . $conn->error;
       die(0);
  }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>FORM</title>
</head>
<body>
    <h1>Form</h1>
    <p>Edit the record</p>
    <form method="POST" action="update.php">
        ID: <input type="text" name="id" value="<?php echo($id); ?>" required><br><br/>
        Name: <input type="text" name="name" value="<?php echo($name); ?>" required><br><br/>
        Email: <input type="text" name="email" value="<?php echo($email); ?>" required><br/>
        <br/>
        <input type="submit" value="update">
    </form>
</body>
</html>
```

The video below shows how the update function will work on the browser.

<iframe width="478" height="269" src="https://www.youtube.com/embed/wojpuuIxJsA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Delete
To delete a record in the table, the user clicks the `delete` button in the HTML table. 

>Take note of the code used to display a button inside a table cell.

```html
<td>
    <form action='form-post.php' method='post'>
        <input name='id' value='",$row["id"],"' hidden>
        <button type='submit' name='delete' value='delete'>Delete</button>
    </form>
</td>
```

The `submit` button has a hidden `id` field. The data is sent to a form and processed by the PHP script below. If the `id` is not empty, then the record with the submitted `id` is deleted.

```php
// Check that the input fields are not empty and process the data
if(!empty($_POST['delete']) && !empty($_POST['id'])){
    $query3 = "DELETE FROM user WHERE id='".$_POST['id']."' ";
    if (mysqli_query($conn, $query3)) {
        echo "Record deleted successfully !";
    } else {
        // Display an error message if unable to delete the record
       echo "Error deleting record: " . $conn->error;
    }
}
```

The delete functionality works as shown in the video below.

<iframe width="478" height="269" src="https://www.youtube.com/embed/63urOOGyJkk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You can download the source code from [here](https://github.com/JudyNduati/HTML-forms-in-PHP-and-MySQL-CRUD-operations).

### Conclusion
In conclusion, a HTTP request enables communication between a client and a server. We have learned how to create HTML forms and process the data using PHP. We have also learned about the POST, PUT and GET methods. 

We learned that `POST` creates data, `GET` reads data from the server, and PUT update data in the server. We learned how to perform CRUD operations on MySQL database using PHP. 

I hope this article will shed some light and give you an understanding while working with HTML forms in PHP.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
