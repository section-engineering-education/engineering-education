---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-fastify-and-svelte/
title: Getting Started with Fastify and Svelte
description: This article will help us understand how to build a CRUD application using Fastify and Svelte.
author: kevin-kimani
date: 2021-07-22T00:00:00-23:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-fastify-and-svelte/hero.jpg
    alt: Getting started with Fastify and Svelte
---
[Fastify](https://www.fastify.io/) is a low-overhead backend web framework that is built on top of the Node.js runtime. Its popularity and attention are rising due to its lightweight design and the [plugin ecosystem](https://www.fastify.io/ecosystem/) it comes with.
<!--more-->
In Fastify, the idea is that everything is a plugin that allows developers to extend its functionalities. This allows us to quickly encapsulate the functionality in our project as a plugin which can then be distributed and used in other projects.

On the client-side, we will use Svelte which is quite different from other modern client-side JavaScript frameworks such as React.

[Svelte](https://svelte.dev/) is a compiler that shifts your work into a compile step rather than using a Virtual DOM. This happens when you build your app by converting the components into highly efficient code.

### Goal
In this Fastify and Svelte tutorial, we will build a CRUD app that fetches blog posts.

We will be:
- Setting up a Fastify in a Node.js environment.
- Defining the API routes for our Fastify backend.
- Adding the validation of the request.
- Loading and using Fastify plugins.
- Setting up a Svelte frontend application using `degit`.
- Data fetching and building components in Svelte.

### Prerequisites
1. Basics of programming with the [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) and [Node.js](https://nodejs.org/en/) environment.
2. Have [Node.js](https://nodejs.org/en/) JavaScript runtime installed on your development system.
3. An IDE or code editor such as [VS Code](https://code.visualstudio.com/download).
4. A basic understanding of [REST APIs](https://en.wikipedia.org/wiki/Representational_state_transfer) will be helpful.
5. A web browser such as [Google Chrome]((https://www.google.com/chrome/)) on your development machine.

### Setting up the backend with Node.js and Fastify
To start the project, create a folder and name it `fastify-svelte-app`. Inside it, we will create another folder for our Svelte client and name it `svelte-client`.

Our backend code will be at the root of the main `fastify-svelte-app` folder. This is the folder we will start with for now.

Open the terminal and run the command `npm init -y`. This initializes `npm` with default configurations while creating a `package.json` file to manage our dependencies.

Before initializing the Node.js server, we want to add the `fastify` and `fastify-cors` as a dependency to our project.

```bash
npm i fastify fastify-cors --save
```
### Setting up Fastify
We set up the Fastify server inside the `index.js` file. First, load the Fastify application object, instantiate it and enable logs to the console.

```js
// Require the framework and instantiate it
const app = require('fastify')({logger: true})

// handle CORS
app.register(require('fastify-cors'), { 
    origin: true,
    methods: ["GET","POST", "DELETE", "PUT", "PATCH"]
  })
```

To consume the API, our server needs a method that we can use to enable Cross-Origin Resource Sharing (CORS) in our server.

CORS is a mechanism that restricts the request of resources on a web server depending on the domain of the HTTP request. When using the CORS middleware, we can allow or limit some routes. In our case, we will allow requests for all the routes.

```js
//Parse Content-Type
app.addContentTypeParser('*', function (request, payload, done) {
    var data = ''
    payload.on('data', chunk => { data += chunk })
    payload.on('end', () => {
      done(null, data)
    })
  })  
```

Next, we declare an index route. Our application will receive and respond with JSON as the parsed data format.

```js
app.get('/', (req, res)=>{
    res.send('You are in the index route')
})

app.listen(3000, (err, address)=>{
    if(err){
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`Server listening on ${address}`)
})
```

The `app.listen()` method in the above code allows us to listen on port `3000`, so that our application can allow the incoming requests.

### Adding controllers
For separation of concerns, we will create a `controller` folder in the root folder of the project. Inside the `controller` folder, we define the `posts.js` file.

In an MVC architecture, a controller is responsible for controlling how the client interacts with an application. It controls the logic flow to determine what response to send back when the server receives a request.

The file will contain some API demo data as an array of objects. Each is a single post with an ID and title field. 

We then define all the handlers for the routes in this file. The handler takes request and response as its parameters.

Let's define our post data as an array of objects. The object has the property of ID and `title`.

In the `posts.js` file, add the following code:

```js
// Demo data
let posts = [
    {
        id: 1,
        title: 'This is an experiment'
    },
    {
        id: 2,
        title: 'Fastify and Svelte pretty cool'
    },
    {
        id: 3,
        title: 'Another post, here we go!'
    }
];
```

The route handler methods include adding posts, fetching all posts, and deleting posts respectively. When adding posts, we access the body of the request via `req.body`.

Lastly, we need to export the handlers as modules to be used in our routes.

```js
// Handlers
const addPost = async (req, res) => {
    const id = posts.length + 1 // adding new post will generate a new ID
    const newPost = {
        id,
        title: req.body.title,
    }

    posts.push(newPost)

    return res.send(newPost)
}

const getAllPosts = async (req, res) => {
    return posts
}


const deletePost = async (req, res) => {
    const id = Number(req.params.id)

    posts = posts.filter(blog => blog.id !== id)

    return { msg: `Blog with ID ${id} is deleted` }
}

module.exports = {
    addPost,
    getAllPosts,
    deletePost
}
```

In the next step, we will add the handlers to the Fastify route object.

### Creating routes
Using Fastify, we can define route objects as an API endpoint. We then bind all the previously defined handlers to the different routes.

Here is the code to achieve this:

```js
const blogController = require('../controller/blogs')

const routes = [{
        method: 'GET',
        url: '/api/blogs',
        handler: blogController.getAllPosts
    },
    {
        method: 'POST',
        url: '/api/blogs',
        handler: blogController.addPost
    },
    {
        method: 'DELETE',
        url: '/api/blogs/:id',
        handler: blogController.deletePost
    }
]
module.exports = routes
```

Now let's test if our server is working or not. Open the terminal again and type:

```bash
node server.js
```

In the console, you should see an output of the server port that our application is running (`port 5000`).

Now that we have all routes defined we need to have them registered for in our Fastify application object.

### Register Fastify routes
In this step, we’ll register Fastify routes to the app object.

First, we load all the blog routes. Next, we loop over all the routes to register them one by one:

```js
// Register the routes to handle posts
const blogRoutes = require('./routes/blogs')
blogRoutes.forEach((route, index) => {
    app.route(route)
})
```

Now, it’s time to verify if this works.

Start the Fastify server on the terminal using `node index.js`. If you visit the browser on `http://localhost:3000/blogs/`, should get all the blogs from the demo data in JSON object format.

Our Fastify Node.js backend is complete and now we will head over to Svelte in the next steps.

### Adding the frontend with Svelte
Before scaffolding a new Svelte application, create a new Svelte project. We will to use `degit` Svelte CLI.

```bash
npx degit sveltejs/template svelte-app
```

To install the dependencies, navigate inside our `svelte-app` project and run `npm install`:

```bash
cd svelte-app

npm install
```

Open the application folder in your IDE and start the application using [Rollup](https://rollupjs.org).

```bash
npm run dev
```

Our Svelte folder has an `src` folder, which is the folder that will contain all our code.

The two files inside it include:

1. `App.svelte` - This is the main Svelte component. It contains tags such as `script` and `style`

2. `main.js` - This file is the entry point for the app. It creates a new instance of `App.svelte`.

```js
import App from './App.svelte'

const app = new App({
    target: document.body,
    props: {
        name: 'world'
    }
})

export default app
```

The attribute `target: document.body` indicates that we will render our app inside the HTML body. Initially, it renders the props of the `props: { name: 'world' }`.

You will see a `rollup.config.js`, which is the configuration file for the rollup packager bundler.

In the `rollup.config.js` file, you can see that `main.js` is specified as input. `main.js` is called by the application, which in turn calls `App.svelte`.

If you want to nitpick: `main.js` is included within `bundle.js` at runtime. `bundle.js` gets called by `public.html`.

Since this is the boilerplate code, let's start editing and building the component that will connect to our Fastify backend in the next steps.

### Create a Blog.svelte Component
To keep things simple, we will use this component to perform all post tasks in our app. Since I'm using bootstrap for styling, head over and add the bootstrap CDN in the `public` directory:

```HTML
<link rel="stylesheet" 
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" 
        crossorigin="anonymous">
```

The tasks of our Svelte component include:
- Fetching posts from the Node.js server within the `<script>` block.
- A function to insert new posts which will be held temporarily on the server.
- A function to delete a single post by ID.

Head over to your `Posts.svelte` component file and implement the following steps:

Our `Posts.svelte` file has `<script>`, `<section>` container, and `<style>` blocks. In between the `<script>` tags,  we write the JavaScript code to add the dynamic functionality.

To begin, we create a `newPostData` object and export it. This object will hold the text of the new `todo` with a `title` attribute.

The backend determines the `ID` by incrementing it each time we add a new post. To insert a new post, we create a function `createPost()` that sends a `POST` request to our backend in JSON format.

To achieve this, we use the value from the `<input>` HTML element and bind it to the `newPostData`.

Svelte enriches our HTML markup, so that we can use programming logic such as conditionals and loops. If we click the `Add` button, the `createPost` method is invoked to create a new post and our backend handles the rest.

```js
<script>
    export let newPostData ={
        title: "",
    }

    const createPost = async ()=>{
      const new_post = {
            title: newPostData.title
        }
       await fetch('http://localhost:3000/api/blogs', {
           method: "POST",
           mode: "cors",
           headers:{
               "Content-Type": "application/json"
           },
           body: JSON.stringify(new_post)
       })
       .then(result=>console.log(result))
       .catch(err=>console.error(err))
    }
</script>
 ```

Next, we need to understand how `fetchPosts` that retrieves all our posts.

Data fetching is an asynchronous task. Our function and markup use the `async-await` syntax to achieve this.

The fetch API makes a network request and returns the posts. On the markup, we check if the `fetchPosts` method has retrieved the data before rendering it on the UI. Error handling is implemented on the catch block.

```js
const fetchPosts = (async () => {
const response = await fetch('http://localhost:3000/api/blogs')
return await response.json()
})()

const deletePost = (async ()=>{

})()
```

Svelte uses a superset of HTML that has:
- A `<section>` tag with a `<div>` element as the container.
- A form to create new posts
- A label and a text box for entering new tasks.
- An ordered list, which holds a list item for each task and a button to delete the task.

```html
<section>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-6">
                <div class="card p-2 shadow">
                    <div class="card-body">
                        <div class="card-title mb-4">
                            <h2>Add New Post</h2>
                            <form>

                                <div class="form-group">
                                    <label for="title">Title:</label>
                                    <input bind:value={newPostData.title}
                                    type="text" class="form-control" id="text" placeholder="Note Post">

                                </div>


                                <button on:click|preventDefault={createPost}
                                type="submit" class="btn btn-primary">Add</button>

                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-">
                    <div class="card">
                        <h2 class="card-header">Posts</h2>
                        <div class="card-body">


{#await fetchPosts}
    <p>...waiting</p>

{:then data}
                  
    <div>
        {#each data as item}
        <h3 class="card-title underline">{item.id}</h3>

        <p class="card-text">
            {item.title}
            <span><button class="btn btn-danger">Delete</button></span>
        </p>

        {/each}

    </div>
    
{:catch error}
    <p>An error occurred!</p>

{/await}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>
```

The above Html webpage should look like this:

![compelete.png](/engineering-education/getting-started-with-fastify-and-svelte/complete.png)

### Deleting a post by ID
To delete a post, we will make a `DELETE` request using the fetch API to our backend. The logic is to filter the `ID` and return the remaining posts except the filtered one.

Let's create the function that handles this:

```js
const deletePost = async (id)=>{
    const response =  await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: 'DELETE'
    })

    const msg = await response.json()
    console.log(msg)
    // .then(res => console.log(res)).catch(err=>console.log(err))
}
```

We need to bind this to our delete button in the HTML template.

```html
<span><button class="btn btn-danger" on:click={deletePost}>Delete</button></span>
```

Thus, we have built a CRUD application to creat, read, update and delete blog posts using Fastify and Svelte.

### Conclusion
Fastify and Svelte are modern JavaScript frameworks built for performance and great developer experience. The Fastify framework is rich in the ecosystem of plugins and hence code reusability. Just like Express, Fastify is simple and elegant with a great logging system.

The source code for this tutorial can be found on [this](https://github.com/KayveTech/fastify-svelte-app) GitHub repository.

Happy coding!

### Further reading
- [Build a REST service with Fastify](https://codesource.io/build-a-rest-service-with-fastify/)
- [Fastify](https://www.fastify.io/)
- [Svelte](https://svelte.dev/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)