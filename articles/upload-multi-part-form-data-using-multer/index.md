---
layout: engineering-education
status: publish
published: true
url: /engineering-education/upload-multi-part-form-data-using-multer/
title: Uploading Files Using Multer in a Node.js Application.
description: In this article, we will see how to use Multer to handle Multipart/form-data using Node.js, Express and MongoDB.
author: sarthak-duggal
date: 2021-01-17T00:00:00-17:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/upload-multi-part-form-data-using-multer/hero.jpg
    alt: Multer example image
---
Whenever we submit a form on the client-side of any website, all the form data goes to the server-side. Usually, **form-data gets encoded before submitting it to the server**.
<!--more-->
### Introduction
We can do this by specifying the **enctype attribute in the \<form> tag in HTML.** If we don't specify it, form-data gets encode with the default type. This is usually the case when we are dealing with text-only data like name, email, password, etc.
But, **if we are uploading some kind of files, we need to specify the enctype attribute with the value "multipart/form-data."** This value is required when we are using forms that have a file upload control.
Now, **Multer is an npm package that makes it easy to handle the file uploads.** It does it very efficiently, thus it is quite popular. In this article, we will see how to use Multer to handle Multipart/form-data using Node.js, Express and MongoDB.

### Prerequisites
1. Good understanding of HTML and CSS.
2. Node.js should be installed in your system and you should have a working knowledge of it.
3. MongoDB should be installed in your system and you should have a working knowledge of it.
4. Good understanding of Command-Line or Integrated Terminal in code-editors.

### Goals of the Tutorial
The goal of this tutorial is to help you understand these things:-
1. How to design an API endpoint for posting data.
2. How to use Multer as a middleware for that API.
3. How to manage and store those files on the server-side.
4. How to view those files on the Frontend.

### Project setup
Create a new folder/directory in your system and name it Multer-Tutorial. Open this folder in your favorite code editor. I'll be using VSCode.
Next, create a new HTML file and name it index.html. We will create a form in it for uploading files. Your HTML code should look something like this.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:wght@100;400;700;900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      rel="stylesheet"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
      crossorigin="anonymous"
    />
    <!-- style.css file path in the line below. -->
    <link rel="stylesheet" href="css/style.css" />
    <!-- -------------------------------------- -->
    <title>Multer Tutorial</title>
  </head>
  <body>
    <main class="admin">
      <div class="admin__upload-file">
        <form action="#" enctype="multipart/form-data" method="post">
          <input type="file" class="admin__input" id="myFile" name="myFile" />
          <input class="admin__submit" type="submit" />
        </form>
      </div>
    </main>
  </body>
</html>
```

#### Important points to note in the above code:-
1. In the form tag, we have specified the `enctype` attribute to "multipart/form-data", which is necessary.
2. Also, in the form tag, we have specified the action attribute to "#". This is because we haven't made any API endpoint to receive the data from this form. We'll be creating this API endpoint later in this tutorial.

**Note**:- All the header links in this HTML code is my personal way of styling. You can style this page as you want. Also, don't forget to write your CSS code in the `style.css` file created inside the CSS folder in the root directory (Refer the above code). I will share my CSS code at the end of this tutorial because this article is about using Multer.

Also, don't forget to follow the same structure for creating different files. I'll be sharing the folder structure for you to follow this tutorial without any difficulty.

**Folder structure until now:-**

> Multer-Tutorial (Root Directory)
>
> > index.html (file)
> > css (folder)
> >
> > > style.css (file)

### Next step
Before moving forward, make sure that Node.js is installed in your system. Write this command in your terminal to check whether it is installed.

```bash
node -v
```

**It should show you the installed version of Node.js in your system** something like this:- **v14.8.0**

Now,

Since our static site is ready **we can start initiating this project with npm.** To do this:-

1. Write this command in the integrated terminal in your code editor or in any command line tool. Make sure that you are in the root directory of this project while running this command.

```bash
npm init
```

I hope you are familiar with this command. In case you are not, this command creates a new `package.json` file. **This file will help us to manage all the dependencies that we will install later on in this tutorial.**

**Please change the main option in package.json file from index.js to app.js.**
Your `package.json` file should look like this.

![package.json](/engineering-education/upload-multi-part-form-data-using-multer/json.png)

### Setting up the project with Node, Express, and MongoDB
From now onwards, we will be creating many new files and folders. So, make sure to not get confused and I'll be sharing the folder structure frequently.

Also, most of the things that we'll be doing now will only help us to set-up our project to start using Multer. So, I am not going to explain each thing in detail because this is not the exact focus of this tutorial. If you have a good understanding of Node.JS, express, and MongoDB, you will be able to understand it. I will also try my best to be clear and concise so that you can follow along pretty easily.

Now, before that, we have to install the **three most important npm packages that we need for this tutorial. These are:- express, body-parser and mongoose.** Thus, write this command in the terminal:-

```bash
npm i express body-parser mongoose
```

**1)** Express will help us in creating different API endpoints and much more.<br/>
**2)** `body-parser` will mount the data coming from the form onto the incoming request.<br/>
**3)** mongoose will help us to work with MongoDB much easily.<br/>

**Let's start by creating a new file named "app.js" in our root directory.**
In this file, we will make different routes and also write some configuration code.

Finally, **write this code in your app.js file.**

```javascript
// Calling all the required packages
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Configurations for "body-parser"
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Configurations for setting up ejs engine &
// displaying static files from "public" folder
// TO BE ADDED LATER

// Routes will be added here later on

//Express server
module.exports = app;
```

**Note that I have exported the app because we will be creating a new file. In that file, we will make our express server and also a connection with our MongoDB cluster.**
Please refer to these two videos to learn how to make a MongoDB cluster in Atlas (cloud database) and how to connect it to our project.
1. This [video](https://www.youtube.com/watch?v=rPqRyYJmx2g) will help you create a cluster.
2. This [video](https://www.youtube.com/watch?v=Qn0SOL8vK8w) will help you connect it to our project.

When you are ready with your cluster, **create a new file in the root directory and name it "server.js"**. This file will make the connection with our server and database. Write this code in the file:-

```javascript
const app = require("./app");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

const DB = "ENTER YOUR CONNECTION STRING HERE";

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("DB connected successfully");
  });

const port = 3000;

const server = app.listen(port, () => {
  console.log("Server is up listening on port:" + port);
});
```

**Don't forget to enter your connection URI string in the DB variable.**

Now, we have to run our project on the express server that we have mentioned. To do this, run the "server.js" file by writing this command on the terminal.

```bash
nodemon server.js
```

**You should see this message on the terminal if you have done everything right.**

```bash
Server is up listening on port:3000
DB connected successfully
```

But, if you see something else like any error, watch those videos again or try fixing those errors by surfing on the internet.

Before writing any code in the app.js file, we have to make some new folders and change the locations of some files. You must be wondering why we are putting so much effort into emphasizing these things. **It is because writing clean and manageable code with an organized folder structure is as important as writing the "right" code.** These kind of folder structure and refactoring will help you with your big, future projects.

1. Create a new folder in the root directory and name it public. This will hold the static files that we will serve. Cut the CSS folder that we created at the start of this project and paste it into this folder.
2. Create a second folder and name it **views**. This will hold our HTML file which we created at the beginning.

Since we are dealing with our HTML file. We have to make two changes to that.

1. Change the file extension from `.html` to `.ejs`. As we'll be using the `ejs` render engine.
2. Inside the head tag, where we have linked our CSS file, change that link from this:-

```html
<link rel="stylesheet" href="css/style.css" />
```

to this:-

```html
<link rel="stylesheet" href="/css/style.css" />
```

We only added the '/' in front of it because now we have to mention the relative path from the public folder, as it contains our static files.

**Now your folder structure must look like this.**

├───node_modules (folder) <br/>
├───public (folder) <br/>
│ └───css (folder) <br/>
|──────└───style.css (file) <br/>
|───views (folder)<br/>
│────└───index.ejs (file)<br/>
├───app.js (file)<br/>
├───package-lock.json (file)<br/>
├───package.json (file)<br/>
├───server.js (file)<br/>

Finally, we have to define some routes in our `app.js` file. So, we will start by defining the route for our home page.

Follow these steps:

**1)** Install the template engine for ejs by writing this command.

```bash
npm i ejs
```

**2)** Include the path package at the top. It is a build-in node.js package.

```javascript
const path = require("path");
```

**3)** Write the configuration code for setting up ejs template engine and defining the path.

```javascript
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));
```

**4)** Now, we will create our first API endpoint, which is to render the HTML file that we build at the start of this tutorial.

```javascript
app.use("/", (req, res) => {
  res.status(200).render("index");
});
```

After all these steps, your app.js file should look like this.

![app.js](/engineering-education/upload-multi-part-form-data-using-multer/appjs.png)

Restart the server with the same command as above.

```bash
nodemon server.js
```

You should see the rendered HTML file which you created earlier.

### Let's talk about Uploading and storing Files.
Before using Multer for handling the upload action of files, we need to understand a few things.

1. The actual files are never stored in the database. They are always stored someplace on the server. In our tutorial, we will store the uploaded files in the public folder. This is because all the files that are in the public folder are meant to be available to the public at the frontend. Also, later in the tutorial, we will learn how to view those files on the front-end. So, that is another reason to store them in the public folder.
2. But, we will use the database to store some information about those files. The first thing can be the name of the file and other information can vary according to the project.

So, the next thing we need to do is to create a schema for storing the name of our uploaded files. We will do this with the help of the **mongoose package that we installed earlier.**

To do this, follow these steps:
1. Create a new folder and name it **model**.
2. Create a new file in it and name it the **fileSchema.js.**.
3. Write this code in that file.

```javascript
// Calling the "mongoose" package
const mongoose = require("mongoose");

// Creating a Schema for uploaded files
const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  },
});

// Creating a Model from that Schema
const File = mongoose.model("File", fileSchema);

// Exporting the Model to use it in app.js File.
module.exports = File;
```

This is how we create a Schema with mongoose and extract a Model from it. We will now use this model to store information about uploaded files in MongoDB. Also, don't forget to call this model in the `app.js` file at the top.

```javascript
const File = require("./model/fileSchema");
```

**Create a new folder named "files" inside the public folder. This is where we'll be storing the uploaded files.**

**Folder Structure:-** <br/>
├───model (folder) <br/>
│ └───fileSchema.js (file) <br/>
├───node_modules (folder) <br/>
├───public (folder) <br/>
│ └───css (folder), files(folder) <br/>
|──────└───style.css (file) <br/>
|───views (folder) <br/>
│────└───index.ejs (file) <br/>
├───app.js (file) <br/>
├───package-lock.json (file) <br/>
├───package.json (file) <br/>
├───server.js (file) <br/>

### MULTER
As I already told you earlier. **Multer is a `Node.js` middleware for handling multipart/form-data, which is primarily used for uploading files.** For those who don't know what is a **middleware in node.js**:- **It is a function that receives the request and response object when a user from the client-side makes any request.**

There are two uses of middleware in node.js
1. To send the response based on the request coming from the user.
2. To change or modify the request object and send it to the next middleware.
**We can add as many middleware as we wish in this request-response cycle.**

Let's start by installing Multer. Write this command in your terminal.

```bash
npm i multer
```

After installing the package, we will import it at the top of the `app.js` file.

```javascript
const multer = require("multer");
```

Then we will start by creating an API endpoint for uploading the file, just above the previous one.

**Note:-** Make sure that the endpoint to render the page is at the end of all the API endpoints.

```javascript
//API Endpoint for uploading file
app.post("/api/uploadFile", (req, res) => {
  // Stuff to be added later
});
```

### Let's start using multer
We are going to store the uploaded files in our disk storage inside the files folder that we just created. Let's start by defining the destination. Copy the following code in your `app.js` file just below the code for configuration of static files.

```javascript
//Configuration for Multer
const upload = multer({ dest: "public/files" });
```

In this code, **we are calling the multer function.** It takes certain options as arguments. So, **we pass the dest (destination) option as** and the **value of dest will be :- 'public/files'.**

After that, **we have to use this upload variable as the middleware** in the above-created API endpoint. So, **change that API endpoint to this:-**

```javascript
app.post("/api/uploadFile", upload.single("myFile"), (req, res) => {
  // Stuff to be added later
  console.log(req.file);
});
```

Here, **`upload.single` is again a function.** The **single determines that only a single file is to be uploaded.** In the case of many files, we can use **multiple** instead of single.
It takes a string as an argument and that string is the name of the input that we mentioned in our HTML code.

Finally, we did `console.log(req.file)` to see the details of the file that we are uploading. This will help us to configure multer in a more advanced way. Also, we will be able to do the filtering on those files.

Now, we can start sending the request with files on this API. But, before that, we need to make small changes in our HTML code in the `index.ejs` file. So, open that file and **change the value of the action attribute in the form to '/api/uploadFile'.** Also, note the name of the input that we mentioned in the above code.

```html
<form action="/api/uploadFile" enctype="multipart/form-data" method="POST">
  <input type="file" class="admin__input" id="myFile" name="myFile" />
  <input class="admin__submit" type="submit" />
</form>
```

**Just to make sure that we are on the same page, here is the state of the app.js file until now.**

![app.js](/engineering-education/upload-multi-part-form-data-using-multer/appjs2.png)

**Finally, you can upload a file from your rendered page. You should see something like this on your terminal window when you hit submit.**

This is my output, yours can be different based on what you uploaded.

```bash
{
  fieldname: 'myFile',
  originalname: 'Final Resume.pdf',
  encoding: '7bit',
  mimetype: 'application/pdf',
  destination: 'public/files',
  filename: '54a87baf681a51490eda5626f495df6c',
  path: 'public\\files\\54a87baf681a51490eda5626f495df6c',
  size: 2034370
}
```

Also, note that a new file would already have been created in your files folder under public. But, that file won't be readable because there is no extension for that file.

With the information we just got, we will configure multer in a more complex way so that our files can become readable.

### Configuring multer
Now, we can start **configuring multer in a more complex way and we will do that in two parts:-**

**1) Configuring the disk storage and naming the uploaded files.**
To do this, **replace the previous one-liner code for configuration with this code.**

**Delete this:-**

```javascript
//Configuration for Multer
const upload = multer({ dest: "public/files" });
```

**and write this:-**

```javascript
//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
```

**What this code is doing is:-**
Multer package has an inbuilt method called `diskStorage` and it takes a couple of options.

- **The first option is again the destination**, but we cannot simply set it as we did before.
- The destination option is a callback function **that takes 3 arguments:-**
  1. **req**, which is the **incoming request object.**
  2. **file, which is the incoming file object** (that we saw in the terminal a bit before).
  3. **cb**, which is again **another callback function.**
- Finally, **we call the cb function that takes 2 arguments**. The first is **error and we are going to pass null in this.** The second is the **destination folder which is public.**
- The **second option that this method takes is the filename.** It is almost the same as the destination option **except in this, the inner callback function takes the filename as the 2nd argument.**

So, you can see that I have created a unique filename for this using the template string in JavaScript. You can refer to the file object that we logged in to our terminal earlier. I have taken the extension from the `mimetype` property of the file object and also the fieldname.

We have completed the first step of configuring multer. Next, we will make a filter to filter out different kinds of files. I will make a filter to upload only pdf files. You can make your kind of filter by referring to the code below.

```javascript
// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};
```

Now, this piece of code is very simple. **Multer filter is just a function that also has req, file, and a callback function as its arguments.** In this, we will check if the uploaded files are PDFs, if so we will pass true in the callback function. If it isn't a PDF, we will pass false along with an error in the callback function.
If you want to filter out some other files like images, you can do that easily by checking the mimetype of the uploaded files.

**And the last step is to again call the multer function but now passing our manually configured `multerStorage` and `multerFilter` as options.**

```javascript
//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
```

Finally, **if you will restart your server** or since it is running on nodemon, then all you have to do is to save the file and it will restart it.
And, **now if you try to upload a PDF file, you should see that uploaded file (in PDF format) in your files folder under the public directory. But, if you upload any other file, it will show an error.**

So, **we can finally see our uploaded file in our disk storage.** But, if we want to see this file on the front-end, we need to store the name of the file in our Database. Also, we have already created the schema for our database earlier. **So, all we have to do is to save the name of the file in our route-handler function.**

**Write this code inside the uploadFile API endpoint:-**

```javascript
// Stuff to be added later
// console.log(req.file)
try {
  const newFile = await File.create({
    name: req.file.filename,
  });
  res.status(200).json({
    status: "success",
    message: "File created successfully!!",
  });
} catch (error) {
  res.json({
    error,
  });
}
```

**app.js File for your reference**

![atlas](/engineering-education/upload-multi-part-form-data-using-multer/appjs3.png)

And, **now if you again upload a file and hit submit, the name of the file will be saved in your cloud database.** To see that, **you can go to your cluster at the MongoDB site, and in the collections, you should see something like this.**

![atlas](/engineering-education/upload-multi-part-form-data-using-multer/atlas.png)

Note that, **the name of the file in the database should match the filename in your disk storage and this is how we can upload a file using multer as a middleware in a node.js application.**

### View these files on your Front-End
The next part of this tutorial is to view these uploaded files on the front-end of your project. **To do this, we have to create another API endpoint to get all the files.** So, write this code in your app.js file.

```javascript
app.get("/api/getFiles", async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json({
      status: "success",
      files,
    });
  } catch (error) {
    res.json({
      status: "Fail",
      error,
    });
  }
});
```

Now, **all we have to do is to make an API call on this endpoint.** I prefer **using Axios**. After getting the results, **we can show these files on our page using some basic HTML code and styling.**

**Include this script at the end of your HTML code before closing the \<html> tag.**

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

**I'll be writing all the javascript after this only.** But you can create a new javascript file and then place it in the public directory same as your CSS file.

```html
<script>
  const parentDiv = document.querySelector(".admin");
  window.addEventListener("load", async () => {
    try {
      let result = await axios({
        method: "GET",
        url: "/api/getFiles",
      });
      let files = result.data.files;

      files.forEach((file) => {
        markup = `
              <div class="files__entity">
                <i class="files__icon fa fa-file-text" aria-hidden="true"></i>
                <span class="files__date">Date created:- ${file.createdAt}</span>
                <a href="${file.name}" class="files__link"><i class="fa fa-eye tests__icon" aria-hidden="true"></i></a>
              </div>
            `;
        parentDiv.insertAdjacentHTML("beforeend", markup);
      });
    } catch (error) {
      console.log(error);
    }
  });
</script>
```

With this code, **we are calling the API endpoint that we created.** And then, **with the data we receive, we are making entities for each different file.** Also, **we made a link in those entities and set its value to the name of the file stored in the database.** In this way, **when we'll click that link, our uploaded file will open in our browser.**

**My CSS styling**

```css
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}

.admin {
  margin-left: 50%;
  margin-top: 7rem;
  transform: translateX(-30%);
}

.admin__input {
  border: none;
  background-color: #41398e;
  padding: 1rem 1.8rem;
  color: #e2e0e0;
  border-radius: 10rem;
  margin-right: 2.5rem;
}

.admin__submit {
  border: none;
  background-color: #603556;
  padding: 1rem 1.8rem;
  color: #e2e0e0;
  border-radius: 10rem;
  cursor: pointer;
}

.admin__submit:focus {
  outline: none;
}

.files__entity {
  background-color: lightgray;
  display: inline-block;
  padding: 5px 10px;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}
```

### Conclusion
So, **this is how we can upload files using multer and view them on the front-end.** **In the case of images, we can also resize them** according to our needs. **For this, we have to store the images in the buffer storage before storing them in disk storage.**
There are also lots of things that we can do with multer, therefore I suggest you to check out its documentation [here](https://github.com/expressjs/multer).

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
