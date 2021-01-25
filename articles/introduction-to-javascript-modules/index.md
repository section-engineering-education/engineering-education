## Introduction to Javascript Modules

While writing programs, there are scenarios where you need to write several lines of code. It could make the code so big and complex to maintain.

The simple solution to this problem is the use of Javascript modules. It ensures the organization and ease of code maintenance.

### Getting Started With JavaScript Modules

In Javascript, there is a functionality known as modules. This feature allows us to divide our Javascript codes into smaller portions. 

In the past, Javascript existed without modules which are part of the core language.  
This was not a problem to most developers as scripts were simple and small.  

Due to the growth or as more companies started appreciating Javascript, scripts became complex. 
This led to the invention of the various ways to organise the scritpts, the modules.

This breakthrough has also led to the creation of several libraries to load these modules. 

These libraries include:  
* CommonJs 
* Asynchronous Module Definition(AMD)
* Universal Module Definition(UMD)

For more details about these libraries, visit this [link](https://javascript.info/modules-intro)

Writing codes in this manner enables the separation of concern.
It also ensures the exportation of certain functionalities, hence system security. 
For example, hiding the configuration files in their module.  
It minimizes the exposure of the vital software files.
NOTE:  Javascript modules concept depends on the ```import``` and ```export``` statements.  

### Export Module Feature
Let's create a simple file called ```add.js``` in the ```modules``` directory.

```modules/add.js```.
```js
// exporting a function
export function addTwoNumbers(firstNumber,secondNumber) {
    const sum=firstNumber+secondNumber;
    return sum;
}
```
In this file, ```addTwoNumbers``` takes two parameters, ```firstNumber``` and ```secondNumber```. 
  
But have you noticed the use of the keyword ```export``` coming before the function name?  

```Export``` makes the code available for importation. For example, the code in ```modules/add.js``` is available for importation into another file module.  
Hence the method, ```addTwoNumbers()``` is available in the importing file module.  

The most common way of exporting items is by defining the ```export``` statement at the end of the module file. A list of items separated by commas in curly braces follows. For example:   

```code snippet for student.js```

```js

let studentName = 'John Doe';
let admissionNumber = "SCT111-00-000";

function studentDetails(name,
                        admission_number,
                        college,yearOfStudy
)
{
    const myDetails="My name is "+ name
     +", a student at "+ college
     +", admission number "+ admission_number
     +". I'm in year "+ yearOfStudy;

    return myDetails;
}

export { studentName, admissionNumber, studentDetails };

```
In the ```student.js``` file module, we have several codes.  
It has variables, a function, and an ```export``` statement. 

Instead of prepending the ```export``` keyword for each item, we export them at once.
It's achievable by defining them at the end of the module in an ```export``` statement. 

```js
export { studentName, admissionNumber, studentDetails };
```

### Import-Module Feature

In the previous section, we learned how to export items. Now let's work with these items by importing them into our module.

Let's start by creating a file called ```results.js```.  

```js
//import the contents of add.js
//ensure the file path is correct
import { addTwoNumbers } from './modules/add.js';

function sum(){
    alert(addTwoNumbers(1,2));
}
window.sum=sum;

```

In the file module above, we have the ```import``` statement with a list of items, in this case, a method. This function is now available in our module for use.

NOTE: All items listed in the import statement are always read-only.  It means that they remain unchanged in the importing module.

### Applying Modules to HTML

We have seen how to export and import a module file, but how do you use them in HTML pages? 
In this section, we will use the previous examples of modules to get the actual results on our browser. 

First, let's remind ourselves how to include an external Javascript file in our HTML pages. To include an imaginary file, let's say ```test.js``` file in our ```example.html``` file, we do the following: 

In our ```example.html``` file, add the following.  
```html
<head>
    <script type="text/javascript" src="myScript.js"></script>
</head>

```
Well, this is different while working with modules. In modules, we will need a few modifications.

The important part is adding a ``` type``` as ``` module```, that is, ```type=" module" ``` in the script tag. 
What it does is that it marks our script as a module, different from the normal JavaScript. 

Now to import ```results.js``` we would do something like:  
```html
<head>
    <script type="module" src="results.js"></script>
</head>
<body>
    <button onClick="sum()">
    Calculate Sum</button>
</body>
```


***NOTE***: The Javascript module could also be embedded directly into the HTML file as follows:-  

```HTML

<script type="module">
  let studentName = 'John Doe';

function studentDetails(name,
                        admission_number,
                        college,yearOfStudy
)
{
    const myDetails="My name is "+ name
     +", a student at "+ college
     +", admission number "+ admission_number
     +", I'm in year"+ yearOfStudy;

    return myDetails;
}

export { studentName,studentDetails };

</script>

```
Note: ```Exports``` and ```imports``` are only used within modules and not regular scripts.
