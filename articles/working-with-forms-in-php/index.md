### Introduction
PHP forms have many usages. They range from contact forms, login forms, and registration forms to collect and update data in a web-based application. Forms are the fundamental interface between the user and the server.

Creating a form on a web application is achieved using HTML. PHP connects the web application with the server (MySQL). It takes data from a webpage and sends it to the server. PHP handles data in the form. Data is then saved in a database, such as MySQL.

Through this article, you will learn how to:
- Create a PHP form using HTML
- Learn about Hypertext Transfer Protocol (HTTP) request methods(GET, POST, and PUT).
- Understand [POST and GET methods](https://www.w3schools.com/tags/ref_httpmethods.asp). Learn how the two methods work and how they are different from each other.

### Prerequisites
You should have prior knowledge of HTML and PHP.

### Overview of Forms

A [form](https://www.tutorialspoint.com/php/php_form_introduction.htm) is a document with blank fields for a user to insert or select data. The user's data is stored or saved in the database and retrieved anytime.

Collecting user's data in a Web application using forms is a major task. In web development, there are many forms. Some of them include:

- Contact Form
- Search Forms
- Login Forms
- Registration Forms.

The `Form` is presented to the user. The user inserts data and submits the form using the submit button. Then the data is saved and processed by the server. At the server, data is created, read, updated, and deleted. This pattern is commonly known by the acronym CRUD operations.
Hypertext Transfer Protocol (HTTP) enables the communication between the client(browser) and the server. The HTTP request method is sent by a client to the server. The server returns the response to the client. There are many HTTP methods, but in this article, we will discuss GET, POST, and PUT. Data is processed based on the method mentioned. 

`GET` method fetches data from the server(read). `POST` method sends data from the HTML form to the server to create a resource(create). PUT method sends data to the server to update a resource(update). Many developers confuse how POST and PUT method protocols work. The PUT method is idempotent. This means calling a PUT method multiple times will not affect the database because data is already updated. In contrast, calling a `POST` method affects the database because you create multiple objects. 

### How to Create PHP forms Using HTML
We create forms using `html` tags and use `php` to process the data. The form contains special elements such as [buttons](https://www.w3schools.com/tags/att_button_form.asp), [radio buttons](https://www.w3schools.com/tags/att_input_type_radio.asp) and [checkboxes](https://www.w3schools.com/tags/att_input_type_checkbox.asp). It, therefore, becomes easy for the user to interact with the webpage. Forms should be user-friendly. This means that a user with no technical skills should use it easily.

Forms are defined by the `<form><\form>` tags. The `form` tag surrounds all the inputs. Also, it gives instructions about how and where to submit the form. The HTML form sends data to your `php` script using either `POST` or `GET` methods.

Here is an example of a form that submits data to a file named `index.php`. To have a complete source code, use this HTML code and change the method to either POST or GET where necessary.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>PHP FORMS</title>
</head>
<body>
    <h1>PHP Form</h1>
    <form method="" action="index.php">
        Name: <input type="text" name="name"><br><br/>
        Email: <input type="text" name="email"><br/>
        <br/>
        <input type="submit" value="submit" >
    </form>
</body>
</html>
```

Here is the output of the code.
![Form Example](/engineering-education/woking-with-forms-in-php/form.jpg)

The `action` identifies the page to submit the form. Data can be submitted on the same page as the form or a different one. The `method` specifies how data is processed. The `GET` method collects data from the server and sends it in the URL. The `POST` method sends data in the webserver to create a resource. The data submitted via the `POST` method is not shown on the URL; it is hidden. The HTML form does not do much, and whatever data you enter goes away after clicking the submit button.

### POST Method

POST is a superglobal method, which collects form data and submits it to the HTTP server. The data entered is encoded, and the content is not displayed. POST method has a global scope, and data is accessed from any script.

The POST method is preferred because data sent through it is not visible in the URL. The POST method is also important because data cannot be decoded by looking into web server logs. POST does not have a limitation on the amount of data sent from the form. This is because data is submitted via the body of HTTP. The best example of using the POST method is using a login form to submit login details to the server.

#### Processing the Form Data (PHP Script)
A PHP script process the data sent by the HTML Forms. Here is a POST method PHP script.
```php
<?php
    if(empty($_POST['name']) && empty($_POST['email'])){
        echo " <br/> Please fill in the fields";
    }else{
        $name= $_POST['name'];
        $email= $_POST['email'];
        echo ('Your Name is:     '. $name. '<br/>');
        echo ('Your Email is:'   . $email. '<br/>');
    }
?>
```
Here is the output of the POST method example.
![POST method Example](/engineering-education/woking-with-forms-in-php/post-method.gif)

### GET Method

GET is the default super global method that collects or retrieve data from the server. It has a global scope. Thus data is accessed from any script in the program. The GET method submits data in the URL. Data transferred via this method is visible on the URL of the HTTP request. The HTTP request can be cached and saved in the browser history. Using the GET method is a disadvantage. It cannot work with delicate data such as passwords because it is not secure.

The GET method has a limitation of the amount of data sent from the form. The data being sent on the URL depends on the web server's operating system and the kind of browser. Most systems have a limit of 255 characters. The best example of using the GET method is with search engine forms. This is because it allows the users to bookmark the results.
Here is a GET method PHP script.

```php  
Welcome <?php echo $_GET['name'];?><br>
This is your email address: <?php echo $_GET['email'];?> 
```

Here is the output of the GET method example.
![GET method Example](/engineering-education/woking-with-forms-in-php/get-method.gif)

### GET vs POST Methods

Both methods are the most common HTTP request methods. POST and GET methods function differently. The POST method sends data from the browser (client) to the server. The GET method requests data from the server and sends it to the URL of a GET request.

#### Tabular Comparison

| POST Method | GET Method |
| --- | --- |
| Bookmarking the results is not possible. | Results get bookmarked. |
| Data do not remain in the browser history. It's hidden. | Data remain in the browser history. |
| The performance is low because POST cannot decode the data. | The performance is high because of the simple nature of displaying data. |
| It is more secure | It is less secure |
| Do not limit the amount of data sent to the server. | Limit the amount of data sent to the server. |
| It works with delicate data. | It cannot work with delicate data. |

### Conclusion

In conclusion, HTTP request methods enable communication between a client and server. We have learned how to create forms using HTML and process the data using PHP. Also, we have learned about POST, PUT and GET methods and how they work. We learned that POST creates data, GET read data from the server and PUT update data in the server. Developers mostly use the GET method so that the user may see the entered content. On the other hand, the POST method is more secure because data is not displayed on the URL. I hope this article will shed some light and give you an understanding while working with forms in PHP.