Fastify is a low-overhead backend web framework that is built on top of the Node.js runtime. Its popularity and attention rising to its lightweight design and the plugin ecosystem it comes with. In Fastify the idea is that everything is a plugin. This allows us to quickly encapsulate the functionality in our project as a plugin which can then be distributed and used in other projects. The application we are building can be found on [this](https://github.com/KayveTech/fastify-svelte-app) github repository.

### Goal

In this Fastify and Svelte tutorial, we will build a CRUD app that fetches blog posts.  We will be:

- Setting up a Fastify in a Node.js environment.

- Defining the API routes for our Fastify backend.

- Adding the requests validation.

- Loading and using Fastify plugins.

- Setting up a Svelte frontend application using `degit`.

- Data fetching and building components in Svelte.

### Prerequisites

1. Basics of programming with the [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) programming and comfortability of the [Node.js](https://nodejs.org/en/) environment.

2. Have [Node.js](https://nodejs.org/en/) JavaScript runtime installed on your development system.

3. An IDE or code editor such as [VS Code](https://code.visualstudio.com/download).

4. A basic understanding of [REST APIs](https://en.wikipedia.org/wiki/Representational_state_transfer) will be helpful.

5. A web browser such as [Google Chrome]((https://www.google.com/chrome/)) on your development machine.

### Setting Up The Backend with Node.js and Fastify

To start the project, create a folder and name it `fastify-svelte-app`. Inside this folder, we will create another folder for our svelte client and name it `svelte-client`. Our backend code will be at the root of the main `fastify-svelte-app` folder. This is the folder we will start for now. Open the terminal and run the command `npm init -y` to initialize the npm with default configurations while creating a `package.json` file to manages our dependencies.

Before initializing the Node.js server, we want to add the `fastify` and `fastify-cors` as a dependency to our project:

`npm i fastify fastify-cors --save`

### Setting up Fastify
On our `index.js` file, add the following code for the server setup:

```js

// Require the framework and instantiate it
const app = require('fastify')({logger: true})

// handle CORS
app.register(require('fastify-cors'), { 
    origin: true,
    methods: ["GET","POST", "DELETE", "PUT", "PATCH"]
  })

//Parse Content-Type
app.addContentTypeParser('*', function (request, payload, done) {
    var data = ''
    payload.on('data', chunk => { data += chunk })
    payload.on('end', () => {
      done(null, data)
    })
  })  

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

Here is what is happening in the above code:

- First, we load the Fastify application object, instantiate it and enable logs to the console.

- `app.register(require('fastify-cors')` is the method that we use to Cross-Origin Resource Sharing (CORS) in our server. This is a mechanism that restricts the request of resources on a web server depending on the domain of the HTTP request. When using the cors middleware, we can allow or limit some routes. In our case, we will allow for all routes.

- Next, we declare an index route that will respond with JSON response. Our application will receive and respond with JSON as the parsed data format. 

- The `app.listen()` method is the code snippet that is listening on port 3000 where the application will receive requests.

### Adding controllers

For separation of concern, we will create a controller folder in the root folder of the project. Inside the controller folder, we define the `posts.js` file. The file will contain some API demo data as an array of objects. Each is a single post with an ID and title field.
Moreover, we then define all the handlers for the routes in this file. The handler takes request and response as its parameters.

In the `posts.js` file, add the code:

```js
// Demo data

let posts = [
    {
        id: 1,
        title: 'This is an experiment
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

Let's briefly go through the above code:

- Our post objects will be contained in the posts array with an ID and title.

- The route handler methods include adding posts, fetching all posts, and deleting posts respectively. When adding posts, we access the body of the request via `req.body`.

- Lastly, we need to export the handlers as modules to be used in our routes.

In the next step, we will add the handlers to the Fastify route object.

### Creating Routes

Using Fastify, we can define route objects as an. We then bind all the previously defined handlers to the different routes. Here is the code to achieve this:

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
In the console, you should see an output of the server port that our application is running (port 5000).

Now that we have all routes defined we need to have them registered for in our Fastify application object.

### Register Fastify Routes

In this step, we’ll register Fastify routes to the app object. First, we load all the blog routes. Next, we loop over all the routes to register them one by one:

```js

// Register the routes to handle posts
const blogRoutes = require('./routes/blogs')
blogRoutes.forEach((route, index) => {
    app.route(route)
})
```

Now it’s time to verify if this works. Start the Fastify server on the terminal using `node index.js`. If you visit the browser on `http://localhost:3000/blogs/`, should get all the blogs from the demo data in JSON object format.

Our Fastify Node.js backend is complete and now we will head over to Svelte in the next steps.

### Adding the frontend with Svelte

Before scaffolding a Svelte application, we need to understand that it is quite different from other modern client-side JavaScript frameworks such as React. Svelte is a compiler that shifts your work into a compile step rather than using a Virtual DOM. This happens when you build your app by converting the components into highly efficient code.

To create a new Svelte project, we need to use `degit` Svelte CLI.

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

Our Svelte folder has an `src` folder, which is the folder that will contain all our code. The two files inside it include:

1. `App.svelte` - This is the main Svelte component. It has our tags such as `script` and `style`

2. `main.js` - This file is the entry point for the app. It creates a new instance` App.svelte`. The attribute `target: document.body` indicates that we will render our app inside the HTML body. Initially, it renders the props of the `props: { name: 'world' }`: 

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

You will see a `rollup.config.js`, which is the configuration file for the rollup packager bundler. In the `rollup.config.js` file you can see that main.js is specified as input. main.js is called by the application, which in turn calls `App.svelte`. (if you want to nitpick: main.js is incl. within bundle.js at runtime. bundle.js gets called by public.html).

Since this is the boilerplate code, let's start editing and build the component that will connect to our Fastify backend in the next steps.


### Adding the frontend with Svelte

Before scaffolding a Svelte application, we need to understand that it is quite different from other modern client-side JavaScript frameworks such as React. Svelte is a compiler that shifts your work into a compile step rather than using a Virtual DOM. This happens when you build your app by converting the components into highly efficient code.

To create a new Svelte project, we need to use `degit` Svelte CLI.

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

Our Svelte folder has an `src` folder, which is the folder that will contain all our code. The two files inside it include:

1. `App.svelte` - This is the main Svelte component. It has our tags such as `script` and `style`

2. `main.js` - This file is the entry point for the app. It creates a new instance` App.svelte`. The attribute `target: document.body` indicates that we will render our app inside the HTML body. Initially, it renders the props of the `props: { name: 'world' }`: 

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

You will see a `rollup.config.js`, which is the configuration file for the rollup packager bundler. In the `rollup.config.js` file you can see that main.js is specified as input. main.js is called by the application, which in turn calls `App.svelte`. (if you want to nitpick: main.js is incl. within bundle.js at runtime. bundle.js gets called by public.html).

Since this is the boilerplate code, let's start editing and build the component that will connect to our Fastify backend in the next steps.

### Create a `Blog.svelte` Component

To keep things simple, we will use this component to perform all Posts tasks in our app. Since I'm using bootstrap for styling, head over and add the bootstrap CDN in the `public` directory:

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

Before we implement the above functionalities, below is an image of the static markup: 

image attached: []
It includes:

- A label and a text box for entering new tasks.

- An ordered list, which holds a list item for each task and a button to delete the task.
  
Next, copy and paste the following code in your `Posts.svelte` component file:

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

    const fetchPosts = (async () => {
    const response = await fetch('http://localhost:3000/api/blogs')
    return await response.json()
    })()

    const deletePost = (async ()=>{

    })()

</script>
```

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

Let's briefly understand the above `Posts.svelte` code:

Our `Posts.svelte` file has `<script>`, `<section>` container for our markup, and `<style>` blocks. In between the `<scipt>` tag,  we write the JavaScript code to add the dynamic functionality. To begin, we create a `newPostData` object and export it. It will hold the text of the new todo with a title attribute. The backend determines the `ID` by incrementing it each time we add a new post.
To insert a new post, we create a function `createPost()` that sends a POST request to our backend in JSON format. To achieve this, we use the value from the `<input>` HTML element and bind it to the `newPostData`. Svelte enriches our HTML markup so that we can use programming logic such as conditionals and loops. If we click the Add button, the `createPost` method is invoked to create a new post and our backend handles the rest.

Next, we need to understand how `fetchPosts` retrieves our posts. Data fetching is an asynchronous task. Our function and markup uses the async-await syntax to achieve this. The fetch API makes a network request and populates which returns our posts. On our markup, we check if `fetchPosts` method has retrieved the data before rendering it on the UI. Error handling is implemented on the catch block. The Html page:

![] attached

Deleting a post by ID


### Conclusion

Fastify and Svelte are modern JavaScript frameworks built for performance and great developer experience. The Fastify framework is
rich in the ecosystem of plugins and hence code reusability. Just like Express, Fastify is simple and elegant with a great logging
system. What else can we ask for? I hope you give it a try in your next Node.js project.
