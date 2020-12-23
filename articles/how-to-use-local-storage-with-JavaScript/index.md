localStorage is a critical part of web development. It allows developers to store and retrieve data in the browser. One key advantage of localStorage is that the data does not have an expiry date. Data is not deleted when the browser&#39;s tab or window is closed.

### What is localStorage
You can look at `localStorage` as some form of web storage that keeps data for a long time. This could be a day, a week, or even a year. It is important to note that `localStorage` only stores strings. So, if you wish to store objects, lists, or arrays, you must convert them into a string using `JSON.stringify().`

### Limitations
The major limitations of localStorage are:
- Insecure data
- Synchronous operations
- Limited storage capacity

### Main methods in localStorage
The primary functions when using localStorage are `key()`, `setItem()`, `removeItem()`, `getItem()`, and `clear()`.

#### key()
This function is used to retrieve a value/string in a specific location. The index can be passed into the key() function as a parameter.

```javascript
var answer = localStorage.key(1);
// this statement will retrieve the value of the second item in the localStorage.
```

The key() can also be used in a loop statement to retrieve all the items in the localStorage.

#### setItem()
This function is used to store items in the localStorage. An example of this function is shown below.

```
Window.localStorage.setItem("grade","One");

//in this case, the `grade` is the key while `One` is the value.
```

As noted, we must `stringify` objects before we store them in the localStorage. An example is outlined below.

```javascript
Const Car = {

brand:"Suzuki",

color:"white",

price:10000

}

Window.localStorage.setItem('car', JSON.stringify(Car));
```

Failure to stringify the object will result in an error.

#### getItem()
This function enables one to access or retrieve the data in the localStorage. The method takes in a `key` as a parameter. It then extracts the required value.

For example, to retrieve the above Car object, we will use the following statement.

```
Window.localStorage.getItem('car');
```

The above statement will return something like this;

```javascript
"{brand:"Suzuki",color:"white",price:"10000"}"
```

To make maximum use of the above result, you should convert it to an object using `JSON.parse()`.

```
JSON.parse(window.localStorage.getItem('car';));
```

#### removeItem()
This method is used to delete an item from the localStorage. The `removeItem()` method requires a key as a parameter. This is shown below.

```
window.localStorage.removeItem('brand');
```

#### clear()
When called, this function clears all values in the localStorage. It is executed, as shown below. It does not require any parameters.

```javascript
Window.localStorage.clear()
```

Now that we have understood what localStorage entails let&#39;s create a project that uses this concept.

### Preferences
You must have a basic understanding of javascript. You also need a code editor and browser to test the project. In this example, we will mainly be using visual studio code and Chrome.

### Goal
To create a web application that stores, retrieves, deletes, and clears items from the `localStorage`.

Let&#39;s jump in.

### 1. Creating the project
Create a new folder on your Desktop and open it in your code editor. Create two files: `index.html` and `main.js`. The `index.html` will showcase the web page to the user, while the `main.js` will store our javascript functions. These methods will be used to access different functionalities of the `localStorage`.

### 2. Forms, buttons, and JavaScript functions
Our `index.html` will have a `form` and several `buttons`, as shown below.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>localStorage</title>
  <link rel="stylesheet" href="./css/bootstrap.css">
  <script type="text/javascript" src="main.js"></script>

</head>

<body>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>

   
  <br>
  <br>
  <div class="container" id="formDiv">
        <form class="form-signin" id="carForm">
            <h1>Please sign in</h1>
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

When the `submit` button is clicked, it takes the user input and passes it to the `store` function in the `main.js` file. The `document.getElementById('carBrand').value` gets the user input. The values are then passed to the car object and stored in the `sessionStorage` using setItem method.

```javascript
function store(){ //stores items in the local storage
        var brand = document.getElementById('carBrand').value;
        var price = document.getElementById('carPrice').value;
    
        const car = {
            brand: brand,
            price: price,
        }
        
        window.localStorage.setItem('car',JSON.stringify(car));  
        //converting object to string
}
```


Similarly, the `retrieveButton` will invoke the `retrieveRecords` function when clicked. This method fetches items from the `localStorage` using the getItem function. ` var paragraph = document.createElement("p")` creates a new paragraph component in our web page. `document.createTextNode(records);` helps create the text that will be displayed to the user. The text node is then binded to the paragraph tag by `paragraph.appendChild(infor)`. These components are then shwn in a specific place on the web page by `document.getElementById("retrieve")` and `element.appendChild(paragraph)`.

```javascript
function retrieveRecords(){ //retrieves items in the localStorage
    console.log("retrive records");
    var records = window.localStorage.getItem('car');
    var paragraph = document.createElement("p");
    var infor = document.createTextNode(records);
    paragraph.appendChild(infor);
    var element = document.getElementById("retrieve");
    element.appendChild(paragraph);
}
```

removeButton invokes `removeItem()`. This `method` will delete a value from the `localStorage` using the removeItem `function`.

```javascript
function removeItem(){  //deletes item from localStorage
    localStorage.removeItem('car')
    console.log("remove items");
}
```

clearButton calls the `clearStorage()`. The `clear()` method is used to remove all values in the localStorage.
```
function clearStorage(){ //clears the entire localStorage
    localStorage.clear()
    console.log("clear records");
}
```

Here is the `main.js` file with the required functions.

```javascript
function store(){ //stores items in the local storage
        var brand = document.getElementById('carBrand').value;
        var price = document.getElementById('carPrice').value;
    
        const car = {
            brand: brand,
            price: price,
        }
        
        window.localStorage.setItem('car',JSON.stringify(car));  
        //converting object to string
}

function retrieveRecords(){ //retrieves items in the localStorage
    console.log("retrive records");
    var records = window.localStorage.getItem('car');
    var paragraph = document.createElement("p");
    var infor = document.createTextNode(records);
    paragraph.appendChild(infor);
    var element = document.getElementById("retrieve");
    element.appendChild(paragraph);
}

function removeItem(){//deletes item from localStorage
    localStorage.removeItem('car')
    console.log("remove items");
}

function clearStorage(){ //clears the entire localStorage
    localStorage.clear()
    console.log("clear records");
}

window.onload =function(){ //ensues the page is loaded before functions are executed.
    document.getElementById("carForm").onsubmit = store
    document.getElementById("clearButton").onclick = clearStorage
    document.getElementById("removeButton").onclick = removeItem
    document.getElementById("retrieveButton").onclick = retrieveRecords

}

```

As shown above, the functions will only be accessible after the page has finished loading. This is specified by the `window.onload` method.

Ensure that the `main.js` file is referenced in the `index.html` file by pasting the statement below in the `head` section.

```
  <script type="text/javascript" src="main.js"></script>
```

### 3. Results
The following video shows how the site looks, as well as the invocation of localStorage methods.

<iframe width="560" height="315" src="https://www.youtube.com/embed/nzitoIbsT2g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### When to use local storage
You should only use localStorage when storing insensitive information. This is because third-party individuals can easily access the information. localStorage can help in storing temporary data before it is pushed to the server. It is important to clear localStorage once this operation is completed.

#### Conclusion
You are now familiar with the different functionalities of localStorage. In case, you didn't understood any concept, feel free to go through the localStorage functions again.

### References
[JavaScript.Infor](https://javascript.info/localstorage)
