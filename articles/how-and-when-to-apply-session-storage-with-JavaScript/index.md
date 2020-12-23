sessionStorage is a popular choice when it comes to storing data on the browser. It enables developers to save and retrieve different values. Unlike localStorage, sessionStorage only keeps data for a particular session. The data is cleared once the user closes the browser window.

### Introduction

`sessionStorage` is a perfect alternative to cookies. Its syntax is quite straightforward. This means that it can easily be learned and implemented by beginners. sessionStorage can also accommodate a huge amount of data. Most browsers, including Chrome and Firefox, can store about 10 MBs of data in sessionStorage.

### Prerequisites

To follow along, you must have some basic understanding of `HTML` and `JavaScript`. You should also have a browser installed on your computer.

### Goal

To demonstrate how to store, retrieve, delete, and clear items in the sessionStorage.

### Step 1 – Creating the project

Create a new folder on your desktop. In this folder, create `index.html` and `main.js` files. You can then open these files in Visual Studio Code or your preferred editor. All our JavaScript functions relating to the `sessionStorage` object will be in the `main.js` file. We will then import this file in the `index.html`.

### Step 2 – Understanding sessionStorage functions

Before we get started, it is important to understand the different methods supported by `sessionStorage`. You will realize that sessionStorage and localStorage have similar methods. These are `setItem()`, `getItem()`, `removeItem()`, and `clear()`.

#### setItem()

This method is called to store values in the sessionStorage. This method takes in the key and values as parameters.
```javascript
sessionStorage.setItem("name:, "John Smith");
```
In the above function, `name` is the key, while `John Smith` is the value.

#### getItem()

This function is used to retrieve values from the sessionStorage. It takes in the `key` as a parameter. Using the above example, the key is `name`.
```javascript
var user = sessionStorage.getItem("name");
```

#### removeItem()
This method also requires a `key` as a parameter. The method will then delete the specified item from the sessionStorage.
```javascript
sessionStorage.remove("name");
```
When called, the above statement will remove `John Smith` from the sessionStorage.

#### clear()

As the name suggests, this function deletes all items from the sessionStorage. This method does not require any parameters.
```javascript
sessionStorage.clear();
```
Let&#39;s implement sessionStorage in a real-life application.

### Step 3 – Creating the view

In this step, we will design a simple web page that we will use to interact with the sessionStorage functionalities. The page is designed using HTML 5. The `main.js` file must be imported in the `index.html` file. This allows us to access the required sessionStorage functions. We import the main.js file using the below code snippet.

```html
  <script type="text/javascript" src="main.js"></script>
```

It&#39;s important to ensure that all of our buttons have an `id`. This is because we will handle their click events in the `main.js` file.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>sessionStorage</title>
  <script type="text/javascript" src="main.js"></script>

</head>

<body>

  <br>
  <br>
  <div class="container" id="formDiv">
        <form class="form-signin" id="carForm">
            <h1>Enter details</h1>
            <label for="carBrand" class="sr-only">Car</label>
            <input type="text" id="carBrand" class="form-control" placeholder="Car brand" required autofocus><br>
            <label for="carPrice" class="sr-only">Price</label>
            <input type="text" id="carPrice" class="form-control" placeholder="Price" required><br>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
        </form>
        <br>
        <br>

        <button class="btn btn-lg btn-primary btn-block" id="retrieveButton">Retrieve records</button>
        <br>
        <div id="retrieve"></div>
        <br>

        <button class="btn btn-lg btn-danger btn-block" id="removeButton">Remove record</button>
        <br>
        <br>

        <button class="btn btn-lg btn-danger btn-block" id="clearButton">Clear all records</button>

  </div>

</body>
</html>

```

The above web page has four buttons with the `ids` of `removeButton`, `clearButton`, `retrieveButton`, and `submit`.

`removeButton` – when clicked, this button will call the `removeItem` function in the main.js file.

`clearButton` – this button calls the `clearStorage` method.

`submit` – stores or saves values in the `sessionStorage`.

`clearButton` – deletes all items in the `sessionStorage`.

All of these functions are defined in the `main.js` file.

The `store()` will take in the user input and pass the values to the `setItem()` method as parameters. As a result, these values or objects will be stored in the `sessionStorage`. The code for the `store()` method is included below.

```javascript
function store(){ //stores items in the local storage
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
function retrieveRecords(){ //retrieves items in the sessionStorage
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
        sessionStorage.removeItem('car')
        console.log("remove items");
}
```

The clearStorage function will delete all items in the sessionStorage when called. Here is the required code snippet.

```javascript
function clearStorage(){ //clears the entire sessionStorage
        sessionStorage.clear()
        console.log("clear records");
}
```

Here is the entire code in the main.js file.

```javascript

function store(){ //stores items in the local storage
    var brand = document.getElementById('carBrand').value;
    var price = document.getElementById('carPrice').value;

    const car = {
        brand: brand,
        price: price,
    }
    
    window.sessionStorage.setItem('car',JSON.stringify(car));  
    //converting object to string
}
function retrieveRecords(){ //retrieves items in the sessionStorage
        console.log("retrive records");
        var records = window.sessionStorage.getItem('car');
        var paragraph = document.createElement("p");
        var infor = document.createTextNode(records);
        paragraph.appendChild(infor);
        var element = document.getElementById("retrieve");
        element.appendChild(paragraph);
}
function removeItem(){//deletes item from sessionStorage
        sessionStorage.removeItem('car')
        console.log("remove items");
}

function clearStorage(){ //clears the entire sessionStorage
        sessionStorage.clear()
        console.log("clear records");
}

window.onload =function(){ //ensures the page is loaded before functions are executed.
        document.getElementById("carForm").onsubmit = store
        document.getElementById("clearButton").onclick = clearStorage
        document.getElementById("removeButton").onclick = removeItem
        document.getElementById("retrieveButton").onclick = retrieveRecords
}
```
You can follow the code below to store a list in sessionStorage.

```javascript

function store(){ //stores items in the local storage
    var brand = document.getElementById('carBrand').value; //retrieves value
    var price = document.getElementById('carPrice').value; //retrieve value

    const car = {brand: brand,price: price}

    var vehicles =[car]; // adding an object to list
    window.sessionStorage.setItem('car',JSON.stringify(vehicles));  
    //converting the list to string. SessionStorage only stores values in Strings
}
```
### Results
Kindly, note that the item been stored in sessionStorage is the `car` object used in this tutorial. You can follow the video below to test the web page. 

<iframe width="478" height="269" src="https://www.youtube.com/embed/bQ6R14jwMIk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### When to use sessionStorage
sessionStorage can be used to check for the user&#39;s authentication state. Users who are logged in can be redirected to the home page. Unregistered users, on the other hand, are directed to the authentication pages. SessionStorage also helps prevent certain actions. For instance, it helps barr some users from making certain purchases. Developers can also use sessionStorage to improve data safety. Once the user closes the browser tab, all their data is cleared. This makes it much difficult for third parties to gain access.

### Conclusion
By now, you understand the ins and outs of sessionStorage. You should consider using sessionStorage as an alternative to cookies. This is because it offers great flexibility.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
