### Getting Started With Alpine.js
### Introduction
Alpine.js is a rugged, minimal tool for composing behavior directly in your markup. Think of it like jQuery for the modern web. It is very reactive like Vue and it is very lightweight. Alpine.js is very simple to use and setup as it doesn't require any installation with NPM, just the CDN version works magic.

Alpine.js is not a replacement for full-fledged frameworks like Vue, React or Angular, but rather a lighter framework to be used for the most simple needs, in applications that require minimal JavaScript, usually server-side rendered web applications. Alpine.js really shines when you need simple components like dropdowns, search inputs and a few elements in the view to be toggled.

Alpine.js offers very great flexibility such that you get to keep your markup as it is and sprinkle behavior where ever you want, at no cost.

### Prerequisites
To follow along with this tutorial, you'll need:
- A good browser, [Chrome](https://www.google.com/chrome/) is advised.
- A basic text-editor, [VSCode](https://code.visualstudio.com/) works well.
- Basic HTML, CSS and [Bootstrap](https://getbootstrap.com/) knowledge.
- Basic JavaScript knowledge.

### Goals
By the end of this tutorial, you should be conversant with:

- [What Alpine.js is](#introduction).
- [Event Handling](https://alpinejs.dev/essentials/events) in Alpine.js.
- [State management](https://alpinejs.dev/essentials/state) in Alpine.js.
- [Templating](https://alpinejs.dev/essentials/templating) in Alpine.js.

To help you achieve these, this article will show how to build a basic application to store TODOs.

### Alpine.js Installation
To get started with the application, we have to first install all required dependencies, Alpine.js and Bootstrap CSS. To install Bootstrap, get the starter template from the [official website](https://getbootstrap.com/docs/5.1/getting-started/introduction/#starter-template). Edit this template with this to have the correct title and a basic card and list (of Todos).
```html
<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <style>
        .bg-pink {
            background: pink;
        }

        .bg-trans {
            background: rgba(0, 0, 0, 0.1);
        }
    </style>

    <title>Alpine Todo</title>
</head>
<body class="container bg-pink">
    <main class="row justify-content-center my-5 py-5">
        <div class="card col-lg-5 px-5 py-5 shadow-sm bg-trans">
            <div class="d-flex justify-content-between align-items-center">
                <h2>Todos</h2>
                <div>
                    <span class="badge bg-primary rounded-pill">All</span>
                    <span class="badge bg-white text-black rounded-pill">Opened</span>
                    <span class="badge bg-danger rounded-pill">Cancelled</span>
                    <span class="badge bg-success rounded-pill">Completed</span>
                </div>
            </div>
            <ul class="list-group mt-3">
                <li class="list-group-item">
                    <input type="text" placeholder="Enter New Todo" class="form-control">
                    <small class="text-info">Hit Enter To Save</small>
                </li>
                <li class="list-group-item list-group-item-success">First Item</li>
                <li class="list-group-item list-group-item-danger">First Item</li>
                <li class="list-group-item">First Item</li>
            </ul>
        </div>
    </main>

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>
```

This code is just HTML, CSS and Bootstrap to design our application.

Having the design all set, Alpine.js can be installed now. Like any other client-side JavaScript library or framework, Alpine.js can be installed using more than one way. For the purpose of simplicity, this article uses the CDN installation, this can be achieved by adding the script tag found in the [official documentation](https://alpinejs.dev/essentials/installation#from-a-script-tag).
```html
<script defer src="https://unpkg.com/alpinejs@3.4.2/dist/cdn.min.js"></script>
```

Alternatively, in your other projects, you may install Alpine.js using NPM. Simply run the `npm install` command.
```shell
npm install alpinejs
```

After installation, you can start using Alpine.js with no configuration by just importing and initialising it in your main JavaScript file.
```js
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.start()
```

At this point, your application should look just like this:
![App design](/getting-started-with-alpinejs/app-design.png)
Based on the design, we have a list of Todos, but to make these dynamic, we have to be able to create and store some todos, that may be then be iterated over as list items.

### Event Handling In Alpine.js
To get user input and give good user experience, users should be able to type in a todo, and press the 'Enter' key to save their todo. To do this, we have to be able to listen to the `keyup` event on the input, to know when the user presses the 'Enter' key. Alpine makes it simple to listen for browser events and react to them as you wish. Alpine.js provides us with the `x-on` directive that lets us listen to events, similar to how we would, using vanilla JavaScript.

To see how this directive works, we add a click listener to the first list item that alerts "Hi" everytime it is clicked.
```html
<li class="list-group-item list-group-item-success" x-data x-on:click="alert('Hi')">First Item</li>
```
Do not worry about the `x-data` directive yet, it'd be explained well under [state management](#state-management-in-alpinejs).

See how easy that is, other events like `change`, `blur`, and `focus` can also be listened to easily. Alpine.js further simplifies event handling by providing a shortcut for the `x-on` directive. This shortcut lets you call the name of the event directly, just by adding `@` before it. The previous example can be rewritten as:
```html
<li class="list-group-item list-group-item-success" x-data @click="alert('Hi')">First Item</li>
```
Other events will then be called using `@change`, `@blur` and `@focus`.

Alpine.js doesn't limit you to it's own directive, it gives access to JavaScript's in-built `event` object as a magic property, `$event`. This would be used later in the application.

#### Keyboard Events
Alpine.js further simplifies event handling by giving modifiers that can be attached to the `keyup` event. These modifiers help us respond to events when certain keys are pressed, even as a combination, like `shift` + `enter`. To alert the value entered into the input field in our HTML when 'Enter' is clicked, we can use both the `@keyup` directive and the magic `$event` property, as follows:
```html
<input type="text" placeholder="Enter New Todo" class="form-control" x-data @keyup.enter="alert($event.target.value)">
```

To find more modifiers, check the [official documentation](https://alpinejs.dev/directives/on#keyboard-events).

Now, you know how to handle events, this knowledge can be used to get the user input when the 'Enter' button is pressed. However, the user's input is currently useless as we have no place to store it, no way to track state. To solve this, Alpine.js lets you declare data (state) right in your markup.

### State Management In Alpine.js
Data is at the center of modern web application, and Alpine.js as a progressive framework, has it as its core too. Data can be made available to a single HTML element, a chunk of HTML or globally in Alpine.js.

#### `x-data`
This directive lets you declare data right in your markup. For example, to store the visible state of some element, you can declare its state like this:
```html
<div x-data="{ show: false }"></div>
```

This directive can also be nested (present in the parent and child elements). When nested, the parent data can be accessed from within the child element. This is especially useful if you have multiple components (HTML blocks) that depend on a variable, each block could have its own data and still depend on the main data, in the parent element. If the parent element has a data property with the same name as a data property in the child element, the child's data property is given precedence when accessed from within it. An example of data nesting:
```html
<div x-data="{ show: false }">
    <div x-data="{ items: ['Apple', 'Ball'] }">
        ....
    </div>
</div>
```

Often, you don't want to store any data, but still want to access Alpine.js's superpowers, as seen in examples above, adding the `x-data` attribute lets you have these functionalities.

#### Global State
Data in Alpine.js application don't have to be limited to single components, or children components, they can be stored on a larger scale, to be reusable and accessible to every component on the page. `Alpine.data()` lets you declare data that can be reused by components in your application. `Alpine.store()` helps make some data available to every component in your page. This data can be accessed using the `$store` magic property. The difference between both methods can be examined in this example.
```js
Alpine.data('dropdown', () => ({
    open: false,
}))

Alpine.store('tabs', {
  current: 'first',

  items: ['first', 'second', 'third'],
})
```

```html
<div x-data="dropdown">
    <span x-show="open">Content...</span>
</div>

<div x-data="dropdown">
    <span x-show="open">Some Other Content...</span>
</div>

<div x-data>
  <template x-for="tab in $store.tabs.items">
    ...
  </template>
</div>

<div x-data>
  <button @click="$store.tabs.current = 'first'">First Tab</button>
  <button @click="$store.tabs.current = 'second'">Second Tab</button>
  <button @click="$store.tabs.current = 'third'">Third Tab</button>
</div>
```

In this example, a `dropdown` data object was created to be reusable, a `tabs` data object was created to be globally available. Components using the `dropdown` had to explicitly state it by passing it in their `x-data` property. However, components using `tabs` just referenced it directly using its magic property.

At this point, you have learned event management in Alpine.js and know how to get users input when the 'Enter' button is pressed, you've also learned how to store and access this data. Let's put these together to get user input and store it.

### Store User Input
Add the `x-data` attribute to the `ul` element, to store all the todos created in it.
```html
<ul class="list-group mt-3" x-data="{ todos: [] }">
```

The todos array can now be populated, update the `input` element to respond on click events and push to the array.
```html
<input
  type="text"
  placeholder="Enter New Todo"
  class="form-control"
  x-data
  @keyup.enter="todos.push({
      'name': $event.target.value,
      'status': 'open'
  })"
>
```
This code pushes a todo object into the array. The object is of this structure:
```javascript
{
    name: "Todo name",
    status: "Todo status" // 'open', 'completed', 'cancelled'
}
```

Just to be sure the todo actually gets pushed, you may `console.log` the `todos` array after the push to see.
```js
@keyup.enter="todos.push({
    'name': $event.target.value,
    'status': 'open'
}); console.log(todos)"
```

You should see the updated todo list on the console everytime you hit 'Enter'. However, a few things need to be put in place for a better experience. You should empty and exit the input once submitted.
```js
@keyup.enter="todos.push({
    'name': $event.target.value,
    'status': 'open'
}); $event.target.value = ''; $event.target.blur()"
```

Now, we can get users input, store it as an object in an array. We can display these todos as list items now.

### Templating In Alpine.js
Another wonderful feature of Alpine.js is the ease with which it lets you manipulate the DOM on a web page. To output some text in Alpine.js, use the `x-text` directive. This directive can be used to output a normal string, some stored data, or even a result of some JavaScript operation.
```html
<div x-data="{ greeting: 'Hello World' }">
    <h1 x-text="'Hello world'"></h1> <!-- Outputs Hello World -->
    <h1 x-text="'Hello world'">Not Hello World</h1> <!-- Outputs Hello World -->
    <h1 x-text="greeting"></h1> <!-- Outputs Hello World -->
    <h1 x-text="'Hello ' + 'World'"></h1> <!-- Outputs Hello World -->
    <h1 x-text="3 + 2"></h1> <!-- Outputs Hello World -->
</div>
```
This example shows the behavior of the `x-text` directive, it displaces the text between the tag it is passed to, it parses the response of the arithmetic operation to string to be printed.

Like the `x-text`, but for outputting HTML, `x-html` lets you display rich text right in your markup.
```html
<div x-data="{ title: '<h1>Start Here</h1>' }">
    <div x-html="title"></div>
</div>
```

#### Conditionally Rendering Templates
Alpine.js lets you conditionally render elements based on your set conditions, these conditions can be toggled to render hidden elements or hide rendered elements. `x-if` and `x-show` let you render some piece of markup if a condition is true. Here's an example, where my name is displayed and hidden by clicking on a button.
```html
<div x-data="{ showName: false }">
    <button @click="showName = !showName">Toggle Name</button>

    <p x-show="showName">Zubair Idris Aweda</p>
</div>
```

This same functionality can be achieved using `x-if` like this:
```html
<div x-data="{ showName: false }">
    <button @click="showName = !showName">Toggle Name</button>

    <template x-if="showName">
      <p>Zubair Idris Aweda</p>
    </template>
</div>
```

Notice that the `x-if` examples has an additional `template` tag, this is because `x-if` leverages [`template` browser behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) and can remove the paragraph from the page when `showName` returns false, or add it to the page when it returns true.

Another difference between the `x-if` and `x-show` directives is that you can add a transition to the hiding and showing of the element when using `x-show`. This transition can be customised as you like. Read more on transitions [here](https://alpinejs.dev/essentials/templating#toggling-with-transitions).
```html
<div x-data="{ showName: false }">
    <button @click="showName = !showName">Toggle Name</button>

    <p x-show="showName" x-transition>Zubair Idris Aweda</p>
</div>
```

We can take a moment to add another fix to our application. Currently, the 'Hit Enter To Save' text just sits there. How about we set it to show only when the input field is focused on. Update the list item containing input field to match this:
```html
<li class="list-group-item" x-data="{ showHint: false }">
    <input
            type="text"
            placeholder="Enter New Todo"
            class="form-control"
            @focus="showHint = true"
            @blur="showHint = false"
            @keyup.enter="todos.push({
                'name': $event.target.value,
                'status': 'open'
            }); $event.target.value = ''; $event.target.blur()"
    >
    <small x-show="showHint" class="text-info">Hit Enter To Save</small>
</li>
```

This example listens to the `focus` and `blur` events to update the state of the hint text. At this point, you must have seen the reactive nature of Alpine.js.

#### Looping Elements
Apart from being able to render elements if some condition is true, Alpine.js lets you repeat a block of code multiple times, or display a list of data. It creates DOM elements based on data from a list. The `x-for` directive, like the `x-if` directive must be used with a `template` tag. For example, you may print 1 to 10 to your screen using:
```html
<ul x-data>
    <template x-for="i in 10">
        <li x-text="i"></li>
    </template>
</ul>
```

You may also loop through a simple array like this:
```html
<ul x-data="{ colors: ['Red', 'Orange', 'Yellow'] }">
    <template x-for="color in colors">
        <li x-text="color"></li>
    </template>
</ul>
```

Having learned this, we can display our todos by iterating over the stored todos array. Replace all the static list items in the page with this:
```html
<template x-for="todo in todos" x-data>
    <li
        x-text="todo.name"
        x-transition
        class="list-group-item"
    ></li>
</template>
```

This is supposed to loop over the todos array, but the array is currently empty. So go on, enter some things you'd like to do later, and watch them show up.
![Dynamic Todos List](/getting-started-with-alpinejs/dynamic-list.png)

To make things more interesting, and for illustration purposes, we can add some todos to the array, so the application always has some todos from the start. Add three todos, with the three available statuses. Update the `ul` element to have these new todos.
```html
<ul class="list-group mt-3" x-data="{ todos: [
    {
        'name': 'Eat breakfast',
        'status': 'completed'
    },
    {
        'name': 'Give my breakfast to the dogs',
        'status': 'cancelled'
    },
    {
        'name': 'Complete this article',
        'status': 'open'
    }
] }">
```

![Starting With Todos](/getting-started-with-alpinejs/starter.png)

At this point, we're very close to the initial design, but we've not been able to get these todos to look different based on their status.

#### Manipulating HTML Attributes
To manipulate the styling of each list-item, we can use Alpine.js `x-bind` directive. This directive lets us set HTML attributes as the result of JavaScript expressions. For example, to set the `src` attribute of an image:
```html
<div x-data="{ image_src: 'hero.jepg' }">
    <img x-bind:src="image_src">
</div>
```
This example sets the image `src` to 'hero.png'.

`x-bind`, like `x-on` has a shorthand syntax. To use this syntax to make an attribute dynamic, prefix the attribute name with a colon, `:`, like this:
```html
<div x-data="{ placeholder: 'Enter text here' }">
      <input type="text" :placeholder="placeholder">
</div>
```

Having learned this, we can modify our list to set each item's background based on its status. To do this, we'd extract the class that currently exist on all the todos into a variable, `list_class`, then add this to the unique class based on status.
```html
<template x-for="todo in todos" x-data="{ list_class: 'list-group-item' }">
    <li
        x-text="todo.name"
        x-transition
        :class="todo.status === 'completed' ? list_class + ' list-group-item-success' : todo.status === 'cancelled' ? list_class + ' list-group-item-danger' : list_class"
    ></li>
</template>
```

This example uses ternary operators to determine the appropriate Bootstrap class to use. This should result in a good-looking list like this:
![Colorful Todo List](/getting-started-with-alpinejs/colorful.png)

To wrap up this tutorial, we should be able to filter these items by their status, as listed at the top.

### Filter By Status
Filtering todo items by status involves a few steps.

First, clicking on the pills at the top should update some state, that tells what category is being viewed currently. To do this, add event listeners to the pills, and a data property to a parent div, maybe the `body`.
```html
<body class="container bg-pink" x-data="{ viewing: 'all' }"></body>
```

Adds a viewing state, to know which state is being viewed currently.
```html
<div>
    <span class="badge bg-primary rounded-pill" @click="viewing = 'all'">All</span>
    <span class="badge bg-white text-black rounded-pill" @click="viewing = 'open'">Opened</span>
    <span class="badge bg-danger rounded-pill" @click="viewing = 'cancelled'">Cancelled</span>
    <span class="badge bg-success rounded-pill" @click="viewing = 'completed'">Completed</span>
</div>
```

Now, the `viewing` state changes when anyone of these is clicked. To respond to these changes, we have to be able to actually detect these changes. Alpine.js has a magic property just for us. The `$watch` magic property monitors a data property, and performs some action whenever it changes. In this case we want to update a display state on each list item.
```html
<li
    x-text="todo.name"
    x-data="{ will_show: viewing === 'all' }"
    x-init="$watch('viewing', value => will_show = value === 'all' || value === todo.status )"
    x-transition
    x-init="$watch('viewing', value => will_show = value === 'all' || value === todo.status )"
    x-show="will_show"
    :class="todo.status === 'completed' ? list_class + ' list-group-item-success' : todo.status === 'cancelled' ? list_class + ' list-group-item-danger' : list_class"
></li>
```
In this example, first we declare a `will_show` state that determines the display status of the list item. We want every item to be displayed when 'all' is clicked, so it is initialised based on this value.

Then, a new directive, `x-init` is introduced. This directive lets you run some code when a template is created in the DOM. In this example, we watch for changes on the `viewing` state, and respond to these by updating the `will_show` state if the item's status is the same as the selected category.

Finally, the display is toggled with some transition using the `x-show` directive.

![Completed Todos](/getting-started-with-alpinejs/completed.png)

### Conclusion
In this tutorial we have learned what Alpine.js is, and how to take advantage of its many features and directives to build fast, and lightweight single-page web applications easily.

## Happy Coding!
