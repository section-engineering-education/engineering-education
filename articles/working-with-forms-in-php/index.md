### Introduction

PHP forms have many usages. Forms range from registration and login forms, a simple contact form to collecting and updating data in a web-based application. Forms are the fundamental interface between the user and the server.

Creating a form on a web application is achieved using HTML. PHP connects the web application with the server (My SQL). It takes data from a webpage and sends it to the server. PHP handles data in the form. Data is then saved in the database, such as My SQL.

Through this article, you will learn how to:

- Create PHP form using HTML
- Understand [POST and GET methods](https://www.w3schools.com/tags/ref_httpmethods.asp). Learn how the two methods work and how they are different from each other.

### Prerequisites

Forms often take input from users. Therefore, the reader should have prior knowledge of HTML and PHP.

### Overview of Forms

A [form](https://www.tutorialspoint.com/php/php_form_introduction.htm) is a document with blank spaces for a user to insert or select data. The user's data is stored or saved in the database and retrieved anytime and anywhere needed.

Collecting user's data in a Web application using forms is a major task. In web application development, there are many forms, including:

- Contact Form
- Search Forms
- Login Forms
- Registration Forms.

The Form is presented to the user. The user inserts data and submits the form using the submit button. Then the data is saved and processed by the server. Data is processed based on the method mentioned. There are two methods, GET and POST. Both methods send data to the server. The POST method is more secure because the data sent is hidden.

### How to Create PHP forms Using HTML

Forms in PHP are similar to forms built using HTML besides the syntax used. The form contains `Html` tags with [Graphical User Interface (GUI)](https://www.computerhope.com/jargon/g/gui.htm) such as [buttons](https://www.w3schools.com/tags/att_button_form.asp) and [checkboxes](https://www.w3schools.com/tags/att_input_type_checkbox.asp). It, therefore, becomes easy for the user to interact with the webpage or with the form. Forms are created for user-friendly purposes. Whereby a user with no technical skills will easily use it.

Forms are written inside form tag `<form>` and `</form>;.` The `form` tag surrounds all the inputs. Also, it gives instructions about how and where to submit the form. `POST` and `GET` methods declare where to submit the data.

Here is an example of a form in a file named `index.php.`
```html
<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP FORMS</title>
</head>
<body>
    <h1>Form Sample</h1>
    <form action="index.php" method="POST">
    Name: <input type="text" name="name"><br>
    Email: <input type="text" name="email"><br>
    <input type="submit" value="send" >
    </form>
    
</body>
</html>
```

The ` action` identifies what page to submit the form to. The `action` is mostly on the same page as the form. The `method` indicates how the form is submitted. THE `GET` method sends data in the URL while the `POST` method sends data in the request header. The data submitted via the `POST` method is not shown on the URL; thus, it's hidden. Most of the time, forms will use the `POST` method because it is more secure.

### POST Method

POST is a superglobal method, which collects form data and submits it to the HTTP server. The data entered is encoded, and the content is not displayed. POST method has a global scope, and data is accessed from any script.

The POST method is preferred because data sent through it is not visible in the URL. The POST method is also important because data cannot be decoded by looking into web server logs. POST does not have a limitation on the amount of data sent from the form. This is because data is submitted via the body of HTTP. The best example of using the POST method is when the user is submitting login details to the server.

Here is a login form example using the POST method.
```php
<?php
    if (isset($_POST['submit'])) {
        echo $_POST['name'];
        echo $_POST['email'];
        if (!empty($name)&&!empty($email)){
            echo 'Okay';
        }
    }
     ?>
```

### GET Method

GET is the default super global method that sends data to the webserver. It has a global scope. Thus data is accessed from any script in the program. The GET method submits data in the URL. Data transferred via this method is visible on the URL of the HTTP request, thus not secure. The HTTP request can be cached and saved in the browser history. Using the GET method is a disadvantage because it cannot work with delicate data such as passwords.

The GET method has a limitation of the amount of data sent from the form. The data being sent on the URL depends on the web server's operating system and the kind of browser. Most systems have a limit of 255 characters. The best example of using the GET method is with search engine forms. This is because it enables the users to bookmark the results.
Here is an example of GET method.
```php
<?php
    if (isset($_GET['submit'])) {
        echo $_GET['name'];
        echo $_GET['email'];
        if (!empty($name)&&!empty($email)){
            echo 'Okay';
        }
    }
     ?>

```

### GET vs. POST Methods

Both methods send data to the server. The difference between the two methods is how data is submitted to the server. The POST method sends data from the browser (client) to the HTTP request in the message body. The GET method sends data to the URL of the HTTP request.

#### Tabular Comparison

| POST Method | GET Method |
| --- | --- |
| Bookmarking results is not possible. | It is possible to bookmark results. |
| Data is not shown in the URL. It's hidden. | Data is shown in the URL. |
| The performance is low because this method cannot decode data. | The performance is high because of the simple nature of displaying data. |
| It is more secure | It is less secure |
| Do not limit the amount of data sent to the server. | Limit the amount of data sent to the server. |
| It works with delicate data. | It cannot work with delicate data. |

### Conclusion

In conclusion, POST and GET methods send data from a form to the server. We have learned how to create PHP forms using HTML and how PHP forms work. Also, we have learned about POST and GET methods of sending data. Developers mostly use the GET method so that the user may see the entered content. POST method son the other hand, is more secure because data is not displayed on the URL. I hope this article will shed some light and give you depth understanding while working with PHP forms.