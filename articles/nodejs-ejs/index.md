### Project setup
// PROJECT STRUCTURE
- `views` contains the `EJS` files and the `partials` contains the partial `EJS` files.
- `server.js` file contains the express configurations and routes.
- `package.json` contains the list of dependencies we will use in the application.

Let's create a directory for our project by executing the commands below.

```bash
$ mkdir demo
$ cd demo
```

Execute the command below to initialize the `package.json` and install `express` and `ejs` into our project.
```bash
$ npm init -y
$ npm install --save express ejs

```

### EJS views and partials

`EJS` partials make it possible to create reusable views. In a real-world application, there can be over 100 Html files with the same footer. To reduce the development time of such a website, the partials become handy. With the partials, we can create a single footer partial file and reuse it across all the pages on the website. Partials improve productivity because in the case of maintenance, changing the code at a single point changes all the occurrences in the pages reusing the partial.

```ejs
<footer class="footer">
    <p>© 2021 demo.</p>
</footer>
```



```ejs
<div class="header clearfix">
    <nav>
        <ul class="nav nav-pills pull-right">
            <li role="presentation"><a href="/">Home</a></li>
        </ul>
        <h3 class="text-muted">Node.js Blog</h3>
    </nav>
</div>
```

```ejs
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Node.js Blog</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <style>
        body {
            padding-top: 20px;
            padding-bottom: 20px;
        }

        .jumbotron {
            margin-top: 10px;
        }
    </style>
</head>
<body>
<div class="container">
    <%- include('partials/navbar') %>
    <div class="jumbotron">
        <h1>All about Node</h1>
        <p class="lead">Check out our articles below!</p>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="list-group">
                <!-- loop over blog posts and render them -->
                <% posts.forEach((post) => { %>
                    <a href="#" class="list-group-item">
                        <h4 class="list-group-item-heading"><%= post.title %></h4>
                        <p class="list-group-item-text"><%= post.author %></p>
                    </a>
                    <br>
                    <br>
                <% }) %>
            </div>
        </div>
    </div>
    <%- include('partials/footer') %>
</div>
</body>
</html>
```

### Routes

```javascript
const express = require('express');
const router = express.Router();


const posts = [
    {
        id: 1,
        author: 'John',
        title: 'Templating with EJS',
        body: 'Blog post number 1'
    },
    {
        id: 2,
        author: 'Drake',
        title: 'Express: Starting from the Bottom',
        body: 'Blog post number 2'
    },
    {
        id: 3,
        author: 'Emma',
        title: 'Streams',
        body: 'Blog post number 3'
    },
    {
        id: 4,
        author: 'Cody',
        title: 'Events',
        body: 'Blog post number 4'
    }
]

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', posts: posts});
});

module.exports = router;

```

### App.js
```javascript
const express = require('express');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.listen(5000)
console.log('listening on port 5000')

```
### Conclusion
Now that you have learned how to use `EJS` template tags and partials, create a website that reuses a footer and implements conditional statements within the `EJS` template. The full source code can be downloaded [here](https://replit.com/@qawuor/ejs-tutorial)
