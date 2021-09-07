---
layout: engineering-education
status: draft
published: true
url: /dom-manipulation-with-javascript/
title: DOM Manipulation with JavaScript
description: This tutorial will provide the reader with a detailed guide on manipulating the Document Object Model with JavaScript.
author: samuel-torimiro
date: 2021-07-07T00:00:00-17:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dom-manipulation-with-javascript/hero.jpg
    alt: JavaScript example image
---
The Document Object Model (DOM) is a tree-like structure showing a hierarchical relationship between different HTML elements. The DOM can be referred to as a programming API for HTML and XML documents according to `w3.org`. It defines the logical structure of documents and the way a document is accessed and manipulated.
<!--more-->
For instance, we can have a `<ul>` tag which in this context could be the parent tag and inside have multiple `<li>` tags which serve as the children. The body tag could also serve as the grandparent and so on and so forth.

With JavaScript, we can easily manipulate the DOM to bring our web pages to life. This tutorial will focus on adding an element to the DOM, removing element from the DOM with JavaScript. 

By the end of this tutorial, you will be equipped with the tools needed to interact with the DOM using JavaScript.

### Prerequisites
To follow along with this tutorial, a basic understanding of HTML and JavaScript is required.

### Step 1 — Todo list front-page
In this section we will be building a minimalistic to-do list front page, so we can visualize what we will be explaining in future sections.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <title>DOM manipulation with JavaScript</title>
  </head>
  <body>
    <div class="container">
      <h1>My Daily Task:</h1>
      <hr />
      <ul>
        <li class="todo">Sweep the floor</li>
        <li class="todo">Polish my armor</li>
        <li class="todo">Empty the trash</li>
      </ul>

      <input type="text" name="" class="form-control" id="userInput" />
      <br />
      <button
        class="btn btn-outline-secondary"
        style="width: 100%;"
        id="button"
      >
        Add New Task
      </button>
    </div>
  </body>
</html>
```

Open a new file in an empty folder, name it `index.html` and add the HTML code above. Save it, and open it using your favourite browser.

You should see the following:

![home_page_screenshot](/engineering-education/dom-manipulation-with-javascript/home-page-screenshot.jpg)

### Step 2 — Understanding the DOM
To Understand the DOM, let's draw the structure for our HTML page.

![dom_example](/engineering-education/dom-manipulation-with-javascript/dom-example.png)

This structure is not a complete capture of our HTML page, but it shows a detailed example of the DOM. As our web page is not completely loaded, the browser created this type of structure for the page. 

With JavaScript, we can easily modify the DOM, change styles, add HTML attributes and so on. We will be taking a look at them in the following sections.

> Want to learn more about the DOM? Check out [Understanding Document Object Model](https://www.section.io/engineering-education/document-object-model/) article.

### Step 3 — Adding an element to the DOM
It would be awesome if we could add additional tasks through our form and insert them inside our HTML list element. This is how we would do just that in JavaScript.

```html
<script>
  // Get Access to the button
  let button = document.querySelector("#button");

  // Get Access to the ul tag (the parent of the li tag)
  let todoWrapper = document.querySelector(".todo-wrapper");

  // OnSubmit Add New Task To The DOM
  button.addEventListener("click", () => {
    // Get User Input
    let userInput = document.querySelector("#userInput").value;

    if (userInput.length > 5) {
      // Create a new li tag
      let li = document.createElement("li");

      // Add a class name of todo to the li tag
      li.className = "todo";

      // Create a Text Node from user input
      let node = document.createTextNode(userInput);

      // Append node to li
      li.appendChild(node);

      // Append li to ul
      todoWrapper.appendChild(li);

      // Empty user Input
      document.querySelector("#userInput").value = "";
    } else {
      alert("Todo's can't be less than 5 characters :)");
    }
  });
</script>
```

Add the following code to your HTML page before the closing of the body tag.

#### What's happening here?
- We added an event listener that listens to a click event on the submit button
- If the button was clicked, we then created a new `li` tag
- We also created a new text node from the user's input
- Finally, we appended the `li` (child) to the `ul` (parent)

#### How does it work?
To insert a new element into the DOM, we need two things. First, the parent node in this context will be our `ul` tag and then the children node(s), which in this context will be the `li` tags. We can only append a child to the parent node by calling the `appendChild` function on the parent node.

Try adding some tasks.

### Step 4 — Removing Element from the DOM
It would be nice if we could delete a task that we have completed. 

Let us add that:

```html
<script>
  document.querySelector(".todo-wrapper").addEventListener("click", (e) => {
    if (e.target.className === "todo") {
      let msg = confirm(
        `Are you sure you want to delete \n ${e.target.innerText}`
      );

      if (msg == true) {
        document.querySelector(".todo-wrapper").removeChild(e.target);
      }
    }
  });
</script>
```

Add the following code to your HTML page before the closing of the body tag.

#### What's happening here?
1. we added an event listener that listens to a click event on every task
2. we then checked using an if statement if the task was clicked upon
3. finally, we delete the task that was clicked upon after warning the user for confirmation

#### How does it work?
To remove a new element from the DOM, we need two things. First, the parent node in this context will be our `ul` tag and then the children node(s) in this context will be the `li` tags. We can only delete children from the parent node by calling the `removeChild` function and passing the child as an argument.

Try deleting some tasks.

### Conclusion
Glad you've reached the end of this tutorial. In this tutorial, we saw how to manipulate the DOM using JavaScript. We created a to-do list application in the process, with the ability to add a task and delete a task. 

With these tools, we brought our webpage to life by making it more interactive.

Happy coding!

### References
- [Understanding Document Object Model (DOM)](/engineering-education/document-object-model/)
- [w3.org](https://www.w3.org/TR/WD-DOM/introduction.html)

---

Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
