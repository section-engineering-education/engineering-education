---
layout: engineering-education
status: publish
published: true
url: /how-and-when-to-apply-session-storage-with-javascript/
title: How and When to Apply Session Storage with JavaScript
description: In the guide, we will learn when it's best to use session storage and how to implement it using JavaScript. In this article we wil demonstrate how to store, retrieve, delete, and clear items in session storage.
author: michael-barasa
date: 2021-01-10T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-and-when-to-apply-session-storage-with-javascript/hero.jpg
    alt: How and When to Apply Session Storage with JavaScript image
---
Session storage is a popular choice when it comes to storing data on a browser. It enables developers to save and retrieve different values. Unlike local storage, session storage only keeps data for a particular session. The data is cleared once the user closes the browser window.
<!--more--> 
### Introduction
Session storage is a perfect alternative to cookies. Its syntax is quite straightforward. Beginners can easily learn and implement this storage. Session storage can also accommodate a huge amount of data. Most browsers, including Chrome and Firefox, can store about 10 MBs of data in session storage.

### Prerequisites
To follow along, you must have some basic understanding of HTML and JavaScript. You should also have a browser installed on your computer.

### Goal
To demonstrate how to store, retrieve, delete, and clear items in session storage.

### Step 1 – Creating the project
First, create a new folder on your desktop. In this folder, create `index.html` and `main.js` files. You can then open these files in Visual Studio Code or your preferred editor. 

All our JavaScript functions relating to the `sessionStorage` object will be in the `main.js` file. We will then import this file in the `index.html`.

### Step 2 – Understanding session storage functions
Before we get started, it is important to understand the different methods supported by session storage. You will realize that session storage and localStorage have similar methods. 

These being: `setItem()`, `getItem()`, `removeItem()`, and `clear()`.

#### setItem()
This method is called to store values in session storage. This method takes in the key and values as parameters.

```javascript
sessionStorage.setItem("name:, "John Smith");;
```

In the above function, `name` is the key, while `John Smith` is the value.

#### getItem()
This function is used to retrieve values from the session storage. It takes in the `key` as a parameter. Using the example above, the key is `name`.

```javascript
var user = sessionStorage.getItem("name");
```

#### removeItem()
This method also requires a `key` as a parameter. The method will then delete the specified item from session storage.

```javascript
sessionStorage.remove("name");
```

When called, the above statement will remove `John Smith` from session storage.

#### clear()
As the name suggests, this function deletes all items from the session storage. This method does not require any parameters.

```javascript
sessionStorage.clear();
```

Let's implement session storage in a real-life application.

### Step 3 – Creating the view
In this step, we will design a simple web page that we will use to interact with the session storage functionalities. The page was designed using HTML5. The `main.js` file must be imported in the `index.html` file. 

This allows us to access the required session storage functions. Kindly, note that we will use Bootstrap to style our web page. Here is the Bootstrap link.

``` html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
```

We import the `main.js` file using the code snippet below.

```html
  <script type="text/javascript" src="main.js"></script>
```

It's important to ensure that all of our buttons have an `id`. This is because we will handle their click events in the `main.js` file.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>sessionStorage</title>
  <script type="text/javascript" src="main.js"></script>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
  <div class="container" id="formDiv">
        <form class="form-signin" id="carForm">
            <h1>Enter details</h1>
            <label for="carBrand" class="sr-only">Car</label>
            <input type="text" id="carBrand" class="form-control" placeholder="Car brand" required autofocus><br>
            <label for="carPrice" class="sr-only">Price</label>
            <input type="text" id="carPrice" class="form-control" placeholder="Price" required><br>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
        </form>

        <button class="btn btn-lg btn-primary btn-block" id="retrieveButton">Retrieve records</button>
        <div id="retrieve"></div>

        <button class="btn btn-lg btn-danger btn-block" id="removeButton">Remove record</button>
        <button class="btn btn-lg btn-danger btn-block" id="clearButton">Clear all records</button>
  </div>

</body>
</html>

```

The above web page has four buttons with the `ids` of `removeButton`, `clearButton`, `retrieveButton`, and `submit`.

`removeButton` – When clicked, this button will call the `removeItem` function in the `main.js` file.

`clearButton` – This button calls the `clearStorage` method.

`submit` – Stores or saves values in `sessionStorage`.

`clearButton` – Deletes all items in `sessionStorage`.

All of these functions are defined in `main.js` file.

The `store()` will take in the user input and pass the values to the `setItem()` method as parameters. As a result, these values or objects will be stored in session storage. The code for the `store()` method is included below.

```javascript
function store(){ //stores items in sessionStorage
    var brand = document.getElementById('carBrand').value;
    var price = document.getElementById('carPrice').value;

    const car = {
        brand: brand,
        price: price,
    }

    window.sessionStorage.setItem('car',JSON.stringify(car));  
    //converting object to string
}
```

The `main.js` also has a `retrieveRecords()` function to fetch the items in the `sessionStorage`. This function is outlined below. As noted, the `getItem()` requires a key to retrieve a specific object or value.

```javascript
function retrieveRecords(){ //retrieves items in sessionStorage
        console.log("retrive records");
        var records = window.sessionStorage.getItem('car');
        var paragraph = document.createElement("p");
        var infor = document.createTextNode(records);
        paragraph.appendChild(infor);
        var element = document.getElementById("retrieve");
        element.appendChild(paragraph);
}
```

Just like the `getItem()`, the `removeItem()` method requires a key. In this example, the key is the `car`.

```javascript
function removeItem(){//deletes item from sessionStorage
        sessionStorage.removeItem('car');
        console.log("remove items");
}
```

The clearStorage function will delete all items in the session storage when called. 

Here is the required code snippet:
```javascript
function clearStorage(){ //clears the entire sessionStorage
        sessionStorage.clear();
        console.log("clear records");
}
```

Here is the entire code in the main.js file:
```javascript

function store() { //stores items in the sessionStorage
    var brand = document.getElementById('carBrand').value;
    var price = document.getElementById('carPrice').value;

    const car = {
        brand: brand,
        price: price,
    }
    
    window.sessionStorage.setItem('car',JSON.stringify(car));  
    //converting object to string
}

function retrieveRecords() { //retrieves items in the sessionStorage
        console.log("retrive records");
        var records = window.sessionStorage.getItem('car');
        var paragraph = document.createElement("p");
        var infor = document.createTextNode(records);
        paragraph.appendChild(infor);
        var element = document.getElementById("retrieve");
        element.appendChild(paragraph);
}

function removeItem() {//deletes item from sessionStorage
        sessionStorage.removeItem('car');
        console.log("remove items");
}

function clearStorage() { //clears the entire sessionStorage
        sessionStorage.clear();
        console.log("clear records");
}

window.onload =function() { //ensures the page is loaded before functions are executed.
        document.getElementById("carForm").onsubmit = store;
        document.getElementById("clearButton").onclick = clearStorage;
        document.getElementById("removeButton").onclick = removeItem;
        document.getElementById("retrieveButton").onclick = retrieveRecords;
}
```

You can follow the code below to store a list in session storage:

```javascript

function store() { //stores items in the local storage
    var brand = document.getElementById('carBrand').value; //retrieves value
    var price = document.getElementById('carPrice').value; //retrieve value

    const car = {brand: brand,price: price}

    var vehicles = [car]; // adding an object to list
    window.sessionStorage.setItem('car',JSON.stringify(vehicles));  
    //converting the list to string. SessionStorage only stores values in Strings
}

```

### Results
Note that the item that has been stored in session storage is the `car` object used in this tutorial. You can follow the video below to test the web page.

<iframe width="478" height="269" style="margin-bottom: 5%;" src="https://www.youtube.com/embed/bQ6R14jwMIk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### When to use session storage
Session storage can be used to check for the user's authentication state. Users who are logged in can be redirected to the homepage. Unregistered users, on the other hand, are directed to the authentication page.

Session storage also helps prevent certain actions. For instance, it helps bar some users from making certain purchases. Developers can also use session storage to improve data safety. Once the user closes the browser tab, all their data is cleared. This makes it difficult for third parties to gain access.

### Conclusion
By now, you should have a better understanding of session storage. You should consider using session storage as an alternative to cookies. Since it can offer great flexibility to developers.

Happy Coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
