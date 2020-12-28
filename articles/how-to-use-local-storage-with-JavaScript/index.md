Local Storage allows developers to store and retrieve data in the browser. The data stored in the local storage doesn't expire. This means the data will persist even if the tab or the browser window is closed.

### Prerequisites
You must have a basic understanding of javascript. You also need a code editor and browser to test the project. In this tutorial, we will be using Visual Studio Code and Chrome.

### What is Local Storage
Local Storage is a web storage that stores data for a long time. This could be a day, a week, or even a year. This depends upon the developer's preference. It is important to note that local storage only stores strings. So, if you wish to store objects, lists, or arrays, you must convert them into a string using `JSON.stringify().`

### When to use Local Storage
You should only use local storage when storing insensitive information. This is because third-party individuals can easily access the information. Local storage can help in storing temporary data before it is pushed to the server. It is important to clear the local storage once this operation is completed.

### Limitations
The major limitations of local storage are:

- Insecure data.

- Synchronous operations.

- Limited storage capacity.

### Main methods in Local Storage
The primary methods when using Local Storage are `key()`, `setItem()`, `removeItem()`, `getItem()`, and `clear()`.

#### key()
This method is used to retrieve a value/string from a specific location. The index can be passed into the `key()` function as a parameter.

```JavaScript
var answer = localStorage.key(1);
// this statement will retrieve the value of the second item in the localStorage.
```

The `key()` can also be used in a loop statement to retrieve all the items in the local storage.

#### setItem()
This function is used to store items in the local storage. An example of this function is shown below.

```JavaScript
window.localStorage.setItem("grade","One");
//in this case, the `grade` is the key while `One` is the value.
```

As mentioned before, we must `stringify` objects before we store them in the local storage. An example is outlined below.

```JavaScript
const Car = {
  brand:"Suzuki",
  color:"white",
  price:10000
}

window.localStorage.setItem('car', JSON.stringify(Car));
```

Failure to stringify the object will result in an error.

#### getItem()
This function is used to access or retrieve the data in the local storage. The method takes in a `key` as a parameter. It then extracts the required value from the local storage.

For example, to retrieve the above `Car` object, we will use the following statement.

```JavaScript
window.localStorage.getItem('car');
```

The above statement will return something like this;

```JavaScript
"{brand:"Suzuki",color:"white",price:"10000"}"
```

You should convert it to an object using `JSON.parse()` to use it in your code.

```JavaScript
JSON.parse(window.localStorage.getItem('car'));
```

#### removeItem()
This method is used to delete an item from the local storage. The `removeItem()` method requires a key as a parameter.

```javascript
window.localStorage.removeItem('brand');
```

#### clear()
This method is used to clear all values stored in the local storage. It does not require any parameters.

```JavaScript
window.localStorage.clear()
```

### Project
Now that we have learned about the primary functions of local storage, let's create a web application that stores, retrieves, deletes, and clears items from the local storage.

Create a new folder and open it in your code editor. Create two files, `index.html` and `main.js`. The `index.html` will showcase the web page to the user, while the `main.js` will store our javascript functions. These functions will be used to access different functionalities of the `Local Storage`.

### Let's Code
Our `index.html` will have a `form` and several `buttons`, as shown below.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Local Storage</title>
  <script type="text/javascript" src="main.js"></script>
</head>

<body>

  <br>
  <br>

  <div class="container" id="formDiv">
        <form id="carForm">
            <h1>Local Storage</h1>
            <label for="carBrand" >Car</label>
            <input type="text" id="carBrand" placeholder="Car brand" required autofocus><br>
            <label for="carPrice" >Price</label>
            <input type="text" id="carPrice" placeholder="Price" required><br>
            <label for="key" >Key</label>
            <input type="text" id="key" placeholder="Key" required><br>
            <button type="submit">Store Records</button>
        </form>
        <br>
        <br>
        <br>
        <label for="retrieveKey" >Enter Key to retrieve item</label>
        <input type="text" id="retrieveKey" placeholder="retrieveKey" required><br>
        <button id="retrieveButton">Retrieve records</button>
        <br>
        <div id="retrieve"></div>
        <br>
        <label for="removeKey" >Enter Key to delete item</label>
        <input type="text" id="removeKey" placeholder="removeKey" required><br>
        <button id="removeButton">Remove record</button>
        <br>
        <br>
        <button id="clearButton">Clear all records</button>
  </div>

</body>
</html>
```

When the `submit` button is clicked, it takes the user input and passes it to the `store` function in the `main.js` file. The `document.getElementById('carBrand').value` gets the user input. The values are then passed to the car object and stored in the local storage using the `setItem` method.

```JavaScript
function store(){ //stores items in the local storage
    var brand = document.getElementById('carBrand').value;
    var price = document.getElementById('carPrice').value;
    var key = document.getElementById('key').value; //gets the key from the user

    const car = {
        brand: brand,
        price: price,
    }

    window.localStorage.setItem(key,JSON.stringify(car));  
    //converting object to string
}
```

Similarly, the `retrieveButton` will invoke the `retrieveRecords` function when clicked. This method fetches items from the local storage using the getItem function. 

`var paragraph = document.createElement("p")` creates a new paragraph component in our web page. 

`document.createTextNode(records);` helps create the text that will be displayed to the user. 

The text node is then added to the paragraph tag by `paragraph.appendChild(infor)`. 

These components are then shown in a specific place on the web page by `document.getElementById("retrieve")` and `element.appendChild(paragraph)`.

```JavaScript
function retrieveRecords(){ //retrieves items in the localStorage
    console.log("retrieve records");
     var key = document.getElementById('retrieveKey').value;
    var records = window.localStorage.getItem(key);
    var paragraph = document.createElement("p");
    var infor = document.createTextNode(records);
    paragraph.appendChild(infor);
    var element = document.getElementById("retrieve");
    element.appendChild(paragraph);
}
```

`removeButton` invokes `removeItem()`. This `method` will delete a value from the local storage using the `removeItem` function.

```JavaScript
function removeItem(){  //deletes item from localStorage
    var key = document.getElementById('removeKey').value;
    localStorage.removeItem(key)
    console.log("remove items");
}
```

`clearButton` calls the `clearStorage()`. The `clear()` method is used to remove all values in the local storage.

```JavaScript
function clearStorage(){ /
    //clears the entire localStorage
    localStorage.clear()
    console.log("clear records");
}
```

Let's set the `onClick` property of all the buttons when the webpage loads.

```JavaScript
window.onload =function(){ //ensues the page is loaded before functions are executed.
    document.getElementById("carForm").onsubmit = store
    document.getElementById("clearButton").onclick = clearStorage
    document.getElementById("removeButton").onclick = removeItem
    document.getElementById("retrieveButton").onclick = retrieveRecords
}
```

Here is the `main.js` file with all the functions.

```JavaScript
function store(){ //stores items in the local storage
    var brand = document.getElementById('carBrand').value;
    var price = document.getElementById('carPrice').value;
    var key = document.getElementById('key').value;

    const car = {
        brand: brand,
        price: price,
    }

    window.localStorage.setItem(key,JSON.stringify(car));  
    //converting object to string
}

function retrieveRecords(){ //retrieves items in the localStorage
    var key = document.getElementById('retrieveKey').value; //gets key from user
    console.log("retrive records");
    var records = window.localStorage.getItem(key);//searches for the key in local storage
    var paragraph = document.createElement("p");
    var infor = document.createTextNode(records);
    paragraph.appendChild(infor);
    var element = document.getElementById("retrieve");
    element.appendChild(paragraph);
}

function removeItem(){//deletes item from localStorage
    var key = document.getElementById('removeKey').value;//gets key from user
    localStorage.removeItem(key) //passes key to the removeItem method
    console.log("remove items");
}

function clearStorage(){ //clears the entire localStorage
    localStorage.clear()
    console.log("clear records");
}

window.onload =function(){ //ensures the page is loaded before functions are executed.
    document.getElementById("carForm").onsubmit = store
    document.getElementById("clearButton").onclick = clearStorage
    document.getElementById("removeButton").onclick = removeItem
    document.getElementById("retrieveButton").onclick = retrieveRecords
}
```

As shown above, the functions will only be accessible after the page has finished loading. This is specified by the `window.onload` method.

Ensure that the `main.js` file is referenced in the `index.html` file by pasting the statement below in the `head` section.

```html
<script type="text/javascript" src="main.js"></script>
```

### Results
The following video shows how the site works.

<iframe width="478" height="269" src="https://www.youtube.com/embed/a1MXV8LhJ2Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Conclusion
You are now familiar with the different functionalities of Local Storage. The major methods in local storage are `setItem`, `getItem`, `removeItem` and `clear`. A `key` is required when storing, retrieving, and removing items from the local storage. In case, you didn't understand any concept, feel free to go through the local storage functions again.

### References
[JavaScript.Infor](https://javascript.info/localstorage)
