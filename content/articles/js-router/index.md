### How to create a simple router in JavaScript using window event listeners

A router is a JavaScript object that maps URLs to functions. The router calls a function based on the URL. It is also used for creating the URL based on the function.

Before the rise of single page applications, a web application was a series of interconnected pages. This could be either static pages or dynamically generated in the server.

Single page applications was a new concept where a web application's life span evolves around a single html document. Transition between pages was replaced by use of different views. Links are no longer used to generate and navigate between pages, instead they are bound to views.

A view is a JavaScript object that contains the logic for a single page. The view handles page rendering and user input. All the views are controlled by the router.

### The concept
A router watches for changes in the URL and calls the appropriate function. The function is responsible for rendering the view.

A view can be as simple as a function that creates a `div` element and appends it to the body.

To demonstrate this concept, let's create a simple router in JavaScript.

Create two files:
1. index.html
2. script.js

In your index html, create a div with the id: "app". Also link the script.js file.

```html
<div id="app"></div>
<script src="./script.js"></script>
```

That's all for the index.html file.

In your script.js file, create two objects to hold the routes and the template functions to be rendered.

```javascript
let routes = {};
let templates = {};
```

Then create two functions to display the home page and the about page. You can use arrow functions to define these functions, but I'll use regular functions for simplicity.

```javascript
let app_div = document.getElementById('app');

function home() {
    let div = document.createElement('div');
    let link = document.createElement('a');
    link.href = '#about';
    link.innerText = 'About';

    div.innerHTML = '<h1>Home</h1>';
    div.appendChild(link);

    app_div.appendChild(div);
};

function about() {
    let div = document.createElement('div');
    let link = document.createElement('a');
    link.href = '#home';
    link.innerText = 'Home';

    div.innerHTML = '<h1>About</h1>';
    div.appendChild(link);

    app_div.appendChild(div);
};
```

Now, define the routes. A route is defined by a path and a template to be rendered. A template can be a function to create the DOM elements or a file name (string).

```javascript
function route (path, template) {
    if (typeof template === 'function') {
        return routes[path] = template;
    }
    else if (typeof template === 'string') {
        return routes[path] = templates[template];
    } else {
        return;
    };
};
```

The route function takes two arguments:
    1. `path`: the path to be mapped to the template.
    2. `template`: the template to be rendered.

We check if the template is a function or a string. If it is a function, we store it in the routes object. If it is a string, we store the template function in the templates object.

Now, register the template function. This function will act as a template engine.

```javascript
function template (name, templateFunction) {
    return templates[name] = templateFunction;
};
```

The template function takes two arguments:
    1. `name`: the name of the template.
    2. `templateFunction`: the function that will create the DOM elements.

Now you can map a template to a route.

```javascript
template('home', function(){
    home();
});

template('about', function(){
    about();
});
```

Then define the route to template mapping.

```javascript
route('/', 'home');
route('/about', 'about');
```

We match the template names to the functions that will create and append the DOM elements to the app div.

All there is left to do is to detect and resolve the changes in the URL to render the correct template.

```javascript
function resolveRoute(route) {
    try {
        return routes[route];
    } catch (e) {
        throw new Error(`Route ${route} not found`);
    };
};
```

Create a `router` function that will get the route from the URL hash and call the template function.

```javascript
function router(evt) {
    let url = window.location.hash.slice(1) || '/';
    let route = resolveRoute(url);

    route();
};
```

To switch between views, you need to listen for the load and hashchange events. When the pae is loaded, the load event is triggered. The hashchange event is triggered when the URL hash changes.

```javascript
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
```

At this point, the simple router is ready. Open the index.html file in your browser and you should see the home page. Now, click the about link and you should see the about page.

### Conclusion
In this tutorial, you created a simple router in JavaScript. Being a simple router it only handles basic route mapping. It lacks many features that are available in a more complex router. For example, it does not offer support for nested routes.

To add those features, you have to write more functions to handle the routing logic.

Happy coding!
