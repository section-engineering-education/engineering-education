## Introduction to Javascript Modules

As you write programs, once in a while, you'll find yourself in a position where you need to write several lines of code to achieve a specific task.  

Instead of writing all these codes in a single file, you could as well separate concerns, by creating several files each with its own defined task.  

With this approach, your code will be well organized and maintainable in the essence that in the future when you or even another developer wants to update the code, it becomes easier.


### Getting Started With JavaScript Modules
In Javascript, there is a functionality known as modules, this feature allows us to divide our Javascript codes into smaller portions.  
This could enhance system security by enabling you to expose some parts of the code to be exported while keeping others.  

A point to note, Javascript modules concept depends on the ```import``` and ```export``` statements.  

### Export Module Feature
Let's create a simple file and name it 
```add.js```.
```js
// exporting a function
export function addTwoNumbers(firstNumber,secondNumber) {
    const sum=firstNumber+secondNumber;
    return sum;
}
```
In this file, we have a method(function) called ```addTwoNumbers```, which takes two parameters, ```firstNumber``` and ```lastNumber```.  
But have you noticed the use of the keyword ```export``` coming before the function name?  

What it does is very simple, it makes your code available for importation into another file. For example, the code in `add.js` is made available for use in another file.

This means that the method defined here, ```addTwoNumbers()``` will be made available into the code where this file is imported.  

The most common way of exporting items in Javascript has been the use of a single export statement at the end of the module file.  
This is then followed by a list of items to be exported separated by commas in curly braces. For example:-  

```code snippet for student.js```

```js

let studentName = 'John Doe';

function studentDetails(name,
                        admission_number,
                        college,yearOfStudy
)
{
    const myDetails="My name is "+ name
     +  ", a student at " + college
     + " ,admission number "+ admission_number
     +" .I'm in year"+ yearOfStudy;

    return myDetails;
}

export { studentName,studentDetails };

```
In the above code, we have a method named ```studentDetails()```  which is being passed several parameters and a variable named ```studentName```.  
Now instead of prepending the ```export``` keyword for each item, we want to export, in this case,```studentDetails()``` and ```studentName```, we simply export them at once, by simply defining them at the end of the module. 
```js
export { studentName,studentDetails };
```

### Import-Module Feature

Now that we have exported several items from the previous part,```Export Module Feature```, in this section, we want to see how to use these exported items in our application.  

Previously, we created a file ```add.js```, let's see how we can import the contents of this module into our new module file and use its contents.  

Let's start by creating a file called ```results.js```.  

```js
//import the contents of add.js
//ensure the file path is correct
import { addTwoNumbers } from './modules/add.js';

```

In the file above, we only have 1 line of code, the ```import``` statement.  
What happens is that the import statement lists the items which are being imported and including the path where the module is located.  
Once these items are imported into the file, in this case, ```results.js```, they are readily available for using a smart IDE will even suggest for you the methods and properties when you start typing.  

It's important to note that these methods and properties imported are read-only features of the exported files. You cannot modify them.  

### Applying Modules to HTML

Now that we have seen how to export and import a module file, how do you use them in HTML pages?  
In this section, we want to use the previous examples to see the actual results.  

First, we need to remind ourselves how to include an external Javascript file in our HTML pages.  
To include a ```test.js``` file in our ```example.html```
file, we do the following:-  

In our ```example.html``` file, add the following.  
```html
<head>
    <script type="text/javascript" src="myScript.js"></script>
</head>

```
Well, this is slightly different when working with modules, you need a few modifications as we will see soon.  

The first and the most important part is to add a ```type``` as ```module```, that is, ```type="module" ``` in the script element.  
This ensures that the script is defined or declared as a module.  

Now to import ```results.js``` we would do something like:-  
```html
<head>
    <script type="module" src="results.js"></script>
</head>
<body>
    <button onClick="addTwoNumbers(1,2);">
    Calculate Sum</button>
</body>
```


NOTE:- The Javascript module could also be embedded directly into the HTML file as follows:-  

```HTML

<script type="module">
  let studentName = 'John Doe';

function studentDetails(name,
                        admission_number,
                        college,yearOfStudy
)
{
    const myDetails="My name is "+ name
     + " ,a student at "+ college
     + " ,admission number "+ admission_number
     +" .I'm in year"+ yearOfStudy;

    return myDetails;
}

export { studentName,studentDetails };

</script>

```
Exports and imports are only used within modules and not regular scripts.

---

Peer review contributions by: [Mike White](https://www.section.io/engineering-education/authors/mike-white/)
