---
layout: engineering-education
status: publish
published: false
url: /engineering-education/crud-operation-with-mysql-using-vue-js-and-php/
title: CRUD Operation with MySQL using Vue.js and PHP
description: In this article, you will learn how to select, insert, update, and delete records from a MySQL database with Vue.js and PHP.

author: aransiola-ayodele
date: 2020-12-17T00:00:00-05:00
topic: []
excerpt_separator: <!--more-->
images:

    - url: /engineering-education/css-in-js-solutions/hero.jpg
      alt: Interconnection of blue lines with a background of building
---
CRUD functionality is mostly required on every dynamic web based project. This article will put you through on how you can connect your Vuejs project with a MYSQL database.
<!--more-->

### Technologies Involved in this Article
1. AJAX (Asynchronous JavaScript and XML) is a technique for creating fast and dynamic web pages. AJAX allows web pages to be updated asynchronously by exchanging small amounts of data with the server behind the scenes. This means that it is possible to update parts of a web page, without reloading the whole page.

2. [Axios](https://www.npmjs.com/package/axios) is a modern and Promise-based JavaScript HTTP client library that can be used both in the browser and the server with Node.js. Axios works asynchronously and allows you to make HTTP calls to REST endpoints and consume JSON REST APIs. You can read more about how to consume API Endpoint with Vue.js [here](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html).

3. [Vue.js](https://vuejs.org/) is an open-source model-view-view-model front end progressive Javascript framework for building user interfaces and single-page applications. Vue.js is not just used for web interfaces development alone, it is also used for desktop and mobile application development. You can read about the PROS and CONS of Vue.js [here](https://www.altexsoft.com/blog/engineering/pros-and-cons-of-vue-js/)

4. [PHP](https://www.php.net/) is a server-side scripting language, and a powerful tool for making dynamic and interactive Web pages. Every PHP code is executed on a web server. An instance of this, is when you complete a form on a website and submit it, or click a link to a web page written in PHP, no actual PHP code runs on your computer. Instead, the form data or request for the web page gets sent to a web server to be processed by the PHP scripts. The web server then sends the processed data and your web browser displays the results. You can install a local server on your computer by visiting this [link](https://www.apachefriends.org/download.html).

Add, edit, and delete functionality is mostly required on every dynamic web based project. With AJAX you can improve user experience and these operations can be performed without page reload. For this tutorial, I will be using the Axios package to send an Ajax request to PHP from Vue.js.

The article will be a hands on skill practise on how to have a Vue.js application that can communicate with your MySQL database using Axios and PHP.

### Creating Our Database
We will need to create a database using SQL: 

```mysql
create database crud;
```
then we will need to create table in the database using the command below:

```sql
CREATE TABLE `products` (
  `p_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `p_name` varchar(100) NOT NULL,
  `p_price` int(10) NOT NULL,
  `p_description` varchar(100) NOT NULL
);
```

### Configuring Our Database
After creating the database, the next thing is  to create a database configuration file called **config**

Create a file in Folder on your desktop, name it CRUD and create a config.php file inside the folder. Copy the code below into this file:

```php
<?php

    $host = "localhost";
    $user = "root"; 
    $pass = "";
    $dbname = "crud";

    $conn = mysqli_connect($host, $user, $pass, $dbname);

    // Check connection
    if (!$conn)
    {
      die("error in database connection: " . mysqli_connect_error());
    }
?>
```
### Including Axios and VUE in our Project through Content Delivery Network (CDN)

A CDN (Content Delivery Network) is a highly-distributed platform of servers that helps minimize delays in loading web page content by reducing the physical distance between the server and the user. This helps users around the world view the same high-quality content without slow loading times. Read more about CDN [here](https://www.globaldots.com/content-delivery-network-explained)

We will be creating a html index.php file in our root folder (CRUD folder), then include the Axios package in the head section of the html using CDN.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CRUD Operation with Vue.js, PHP and MySQL</title>
    <script src="app.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

</head>
<body>
    
</body>
</html>
```
Afterwards, in the body of the html file, let's create a table where we will display the data that will be fetched from the database. We will also be adding three buttons to the table for Adding, Updating and Deleting data on the table. 

Below is the updated code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CRUD Operation with Vue.js, PHP and MySQL</title>
    <script src="app.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

</head>
<body>

<h1>Products</h1>
<div id='vueapp'>

    <table border='1' width='100%' style='border-collapse: collapse;'>
    <tr>
        <th>Product ID</th>
        <th>Product Name</th>
        <th>Product Price</th>
        <th>Product Description</th>
        <th></th>
    </tr>

    <tr v-for='product in products'>
    <td><input type='text' v-model='p_id'></td>
    <td><input type='text' v-model='p_name'></td>
    <td><input type='text' v-model='p_price'></td>
    <td><input type='text' v-model='p_description'></td>
    <td><input type='button' value='Add' @click='addRecord();'></td>
    </tr>
    </table>

     <!-- Update/Delete -->
   <tr v-for='(product, index) in products'>
     <td><input type='text' v-model='product.p_id' ></td>
     <td><input type='text' v-model='product.p_name' ></td>
     <td><input type='text' v-model='product.p_price' ></td>
     <td><input type='text' v-model='product.p_description' ></td>
     <td><input type='button' value='Update' @click='updateRecord(index, product.p_id);'><br>
     <input type='button' value='Delete' @click='deleteRecord(index, product.p_id)'></td>
   </tr>

  </table>
 
</div>
</body>
</html>
```

### Creating an Ajax Module

As it has been discussed earlier, that Ajax will be used to make a fetch call, update records, delete and check for data existence in the database. Therefore we will create a file called ajax.php in the root folder (CRUD). Below is the code to insert:

```php
<?php
include "config.php";
$data = json_decode(file_get_contents("php://input"));

$request = $data->request;

// Fetch All records
if($request == 1){
  $p_Data = mysqli_query($conn,"select * from products order by id desc");

  $response = array();
  while($row = mysqli_fetch_assoc($p_Data)){
    $response[] = $row;
  }

  echo json_encode($response);
  exit;
}

// Add record
if($request == 2){
  $productID = $data->p_id;
  $productName = $data->p_name;
  $productPrice = $data->p_price;
  $productDescription = $data->p_description;

  $p_Data = mysqli_query($conn,"SELECT * FROM products WHERE p_id='".$productID."'");
  if(mysqli_num_rows($p_Data) == 0){
    mysqli_query($conn,"INSERT INTO products(p_id,p_name,p_price,p_description) VALUES('".$productID."','".$productName."','".$productPrice."','".$productDescription."')");
    echo "Insert successfully";
  }else{
    echo "Username already exists.";
  }

  exit;
}
if($request == 3){
  $productID = $data->p_id;
  $productName = $data->p_name;
  $productPrice = $data->p_price;
  $productDescription = $data->p_description;

  mysqli_query($conn,"UPDATE users SET p_name='".$productName."',p_price='".$productPrice."',p_description='".$productDescription."' WHERE p_id=".$productID);
 
  echo "Update successfully";
  exit;
}

// Delete record
if($request == 4){
  $productID = $data->p_id;

  mysqli_query($conn,"DELETE FROM products WHERE p_id=".$productID);

  echo "Delete successfully";
  exit;
}

?>
```

### Creating the Vue Application
We used the CDN to register our project as a vue app, so we will be creating a app,js file which will be located also at the root folder (CRUD) our project. There, we will define all the method required for the CRUD operations to work.

Below is the complete code 
```js
var app = new Vue({
    el: '#productapp',
    data: {
      productID: "",
      productName: "",
      productPrice: "",
      productDescription: ""
    },
    methods: {
     allRecords: function(){
       axios.post('ajax.php', {
         request: 1
       })
       .then(function (response) {
         app.products = response.data;
       })
       .catch(function (error) {
         console.log(error);
       });
   
     },
     addRecord: function(){
  
       if(this.p_id != '' && this.p_name != '' && this.p_price != '' && this.p_description != ''){
         axios.post('ajax.php', {
           request: 2,
           p_id: this.productID,
           p_name: this.productName,
           p_price: this.productPrice,
           p_description: this.productDescription
         })
         .then(function (response) {
  
           // Fetch records
           app.allRecords();
  
           // Empty values
           app.productID = '';
           app.productName = '';
           app.productPrice = '';
           app.productDescription = '';

           alert(response.data);
         })
         .catch(function (error) {
           console.log(error);
         });
       }else{
         alert('No data, Kindly fill.');
       }
   
     },
     updateRecord: function(index,id){
  
       // Read value from Table
       var productName = this.products[index].p_name;
       var productPrice = this.products[index].p_price;
       var productDescription = this.products[index].p_description;

  
       if(p_name !='' && p_price !='' && p_description !=''){
         axios.post('ajax.php', {
           request: 3,
           productID: p_id,
           productName: p_name,
           productPrice: p_price,
           productDescription: p_description
         })
         .then(function (response) {
           alert(response.data);
         })
         .catch(function (error) {
           console.log(error);
         });
       }
     },
     deleteRecord: function(index,p_id){
   
       axios.post('ajax.php', {
         request: 4,
         productID: p_id
       })
       .then(function (response) {
  
         // Remove index from users
         app.users.splice(index, 1);
         alert(response.data);
       })
       .catch(function (error) {
         console.log(error);
       });
   
      } 
    },
    created: function(){
      this.allRecords();
    }
  })
```

We created foour (4) methods in the code:
1. allRecords – this will send a POST request to fetch records where pass request is 1. On successful, callback assign response.data to app.users.
2. addRecord – this will send a POST request to add new record where pass request is 2. On successful callback Empty the data values and call allRecords methods.
3. updateRecord – this method will read data from products according to index and send a POST request to update record where pass request: 3.
4. deleteRecord – this will send a POST request to delete record where pass request: 4. On successful callback remove an index from products using splice().

Also, we defined the created option to call the allRecords() method after the instance is been created.

Following the steps above, we will be able to connect our Vue project with MySQL database using PHP.