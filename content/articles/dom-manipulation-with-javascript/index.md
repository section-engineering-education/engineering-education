---
layout: engineering-education
status: draft
published: false
url: /dom-manipulation-with-javascript/
title: DOM manipulation with JavaScript
description: This tutorial provides the reader with a detailed guide on manipulating the Document Object Model with JavaScript.
author: samuel-torimiro
date: 2021-06-21T00:00:00-10:00
topics: [JavaScript]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dom-manipulation-with-javascript/hero.jpg
    alt: JavaScript example image
---
The Document Object Model (DOM) is a tree-like structure showing a hierarchical relationship between different HTML elements. The DOM can also be referred to as a programming API for HTML and XML documents. It defines the logical structure of documents and the way a document is accessed and manipulated.
<!--more-->

For instance, we can have a `<ul>` tag which in this context could be the parent tag and inside have multiple `<li>` tags which serve as the children. The body tag could also serve as the grandparent and so on and so forth. 

With JavaScript, we can easily manipulate the DOM to bring our web pages to life. This tutorial is focused on adding an element to the DOM, removing element from the DOM with JavaScript. By the end of this tutorial, you will be equipped with the tools needed to interact with the DOM using JavaScript.

### Prerequisites
To follow along with this tutorial, a basic understanding of HTML and JavaScript is required.

### Todo List Front-Page
In this section we would be building a minimalistic to-do list front page, so we can visualize what we will be explaining in future sections.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>DOM manipulation with JavaScript</title>
</head>
<body>

    <div class="container">

        <h1>My Daily Task:</h1>
        <hr>
        <ul>
            <li class="todo">Sweep the floor</li>
            <li class="todo">Polish my armor</li>
            <li class="todo">Empty the trash</li>
        </ul>

        <input type="text" name="" class="form-control" id="userInput">
        <br>
        <button class="btn btn-outline-secondary" style="width: 100%;" id="button">Add New Task</button>

    </div>

    

</body>
</html>
```

Open a new file in an empty folder, name it `index.html` and add the above HTML code. Save it, and open it using your favourite browser. You should see the following:

![home_page_screenshot](/engineering-education/dom-manipulation-with-javascript/home-page-screenshot.png)

### Adding Element to the DOM
It would be awesome if we could add additional task through our form and insert them inside our HTML list element. This is possible through JavaScript. 

```html
<script>

    // Get Access to the button
    let button = document.querySelector('#button');

    // Get Access to the ul tag (the parent of the li tag)
    let todoWrapper = document.querySelector('.todo-wrapper');

    // OnSubmit Add New Task To The DOM
    button.addEventListener('click', () => {

        // Get User Input
        let userInput = document.querySelector('#userInput').value;

        if (userInput.length > 5) {

            // Create a new li tag
            let li = document.createElement('li');

            // Add a class name of todo to the li tag
            li.className = 'todo';

            // Create a Text Node from user input
            let node = document.createTextNode(userInput);

            // Append node to li
            li.appendChild(node);

            // Append li to ul
            todoWrapper.appendChild(li);

            // Empty user Input
            document.querySelector('#userInput').value = '';

        } else {

            alert('Todo\'s can\'t be less than 5 characters :)');

        }
    })

</script>
```

Add the following code to your HTML page before the closing of the body tag.

What's happening here?
1. we added an event listener that listens to a click event on the submit button
1. if the button was clicked, then we created a new li tag
1. we also created a new text node from the user's input
1. and finally, we appended the li (child) to the ul (parent)

How does it work?
To insert a new element into the DOM, we need two things. First, the parent node in this context will be our `ul` tag and then the children node(s) in this context will be the `li` tags. We can only append a child to the parent node by calling the `appendChild` function on the parent node.

Try adding some tasks.

### Removing Element from the DOM
It would be nice if we could delete a task that we have completed. Let's add that:

```html
<script>

    document.querySelector('.todo-wrapper').addEventListener('click', (e) => {

        if(e.target.className === 'todo') {
        
            let msg = confirm(`Are you sure you want to delete \n ${e.target.innerText}`)

            if (msg == true) {

            document.querySelector('.todo-wrapper').removeChild(e.target)
            
            }
            
        }
    });

</script>  
```

Add the following code to your HTML page before the closing of the body tag.

What's happening here?
1. we added an event listener that listens to a click event on every task
1. we then checked using an if statement if the task was clicked upon
1. finally, we delete the task that was clicked upon after warning the user for confirmation

How does it work?
To remove a new element from the DOM, we need two things. First, the parent node in this context will be our `ul` tag and then the children node(s) in this context will be the `li` tags. We can only delete children from the parent node by calling the `removeChild` function and passing the child as an argument.

Try deleting some tasks.

### Conclusion
Glad you reached the end of this tutorial. In this tutorial, we saw how to manipulate the DOM using JavaScript. We created a to-do list application in the process, with the ability to add a task and delete a task. With these tools, we brought our webpage to life by making it more interactive.

Happy coding!

---
Peer Review Contributions by: 


