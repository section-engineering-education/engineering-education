Have you ever desired to build an application that generates QR codes of text or URLs using Node.js? If you did, you are in the right place. In this tutorial, you are going to learn how to create a QR code generator for text or URLs using Node.js.

### Pre-Requisites

Some of the basic requirements for this tutorial are:

- Basic understanding of HTML, CSS, and web development
- Basic understanding of Node.js
- Have Node installed on your machine. You can download it from [their website](https://nodejs.org/en/download/).
- An IDE installed on your machine, in our case we shall use Visual Studio Code. You can download it from its [website](https://code.visualstudio.com/download).
- A stable internet connection

Having all these, let us go step by step through the tutorial.

### Key Takeaways

At the end of this tutorial, you will have understood:

- What QR codes are.
- Purpose of QR codes.
- How to create a QR code generator.
- How to run it on a simple webpage.
- What to do with the QR codes generated.

### Table of contents

- [What are QR Codes](#What-are-QR-Codes)
- [Uses and importance of QR Codes](#Uses-and-importance-of-QR-Codes)
- [Overall Folder Structure](#Overall-Folder-Structure)
- [Adding a starting point](#Adding-a-starting-point)
- [Adding a views folder](#Adding-a-views-folder)
- [Running the node.js application](#Running-the-node.js-application)
- [Conclusion](#conclusion)
- [References](#References)


### What are QR Codes

QR Code, which stands for Quick Response code, is a form of a graphical object which stores data that can be easily accessed through scanning. Invented in 1994 by the Danson Wave Company, it became very popular as the years went on. I

t is made up of modules, which are black and white dots (or any other color such as blue or even red), that hold the data in by being arranged in a certain format. The smallest QR code size is 2 cm x 2 cm (0.787 inches x  0.787 inches) which is made up of 21 x 21 modules. The largest on the other hand can be very big and can consist of up to 177 x 177 modules. This can store 7089 numeric characters or 4296 Alphanumeric characters. You can read more on how data is stored on the QR code [here](https://www.keyence.com/ss/products/auto_id/barcode_lecture/basic_2d/qr/#:~:text=A%20QR%20code%20is%20composed,(Reed%2DSolomon%20code)).

QR Codes are very efficient in sharing data. Multiple devices can access the same data anytime and anywhere without restrictions.

### Uses and importance of QR Codes

Some of the major uses of QR Codes in the world as we see today include:

- In online payment to access account numbers or pay bills
- Advertisements to land on webpages
- By companies to advertise and download apps
- Shopping and Ecommerce
- Direct clients and potential customers on social media platforms and so much more...

You can refer to additional uses [here](https://www.smartinsights.com/digital-marketing-strategy/8-uses-qr-codes-measurable-marketing-campaign/) or [here](https://www.takeflyte.com/blog/50-creative-uses-of-qr-codes). 

### Overall Folder Structure

The overall project structure will be as shown below:

> QRcode-Generator (Root Directory)
>
> > node_modules (folder)
> >
> > views (folder)
> > > index.ejs (file)
> > > scan.ejs (file)
> >
> > index.js (file)

Let's begin by setting up our project directory. Create a folder and name it "QRcode-Generator". Open the folder with Visual Studio Code. Once inside VS Code, open the terminal. You can quickly do this by using the `` Ctrl+` `` shortcut on a PC or `` Control + Shift + ` `` shortcut on a Mac. Create a `package.json` file by running: 

```bash
npm init -y
```

Once created, run the following command:

```bash
npm i qrcode express body-parser ejs
```

This installs the following packages to the project:

- body-parser 
- ejs (Embedded JavaScript templates)
- express 
- qrcode

### Adding a starting point

We will need a starting point for our application. Create a file called "index.js".

Inside the "index.js" file, let us do the following in sequential order:

- Import the required modules.

```javascript
// Importing the packages that we need

const express = require("express");
const app = express();
const port = 5000;
const bp = require("body-parser");
const qr = require("qrcode");
```

- Use express package to set our template engine (view engine) and the body-parser middleware for parsing bodies from URL and JSON objects.

```javascript
// Using the ejs (Embedded JavaScript templates) as our template engine
// and call the body parser  - middleware for parsing bodies from URL
//                           - middleware for parsing json objects

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
```

> A **Template Engine** during runtime, replaces actual values to the variables used in the HTML file template. It then converts the HTML templates to an actual visible page that can be accessed. This allows the webpage to have dynamic content in it. Examples of these engines include pug.js, ejs.js, Dust.js, and handlebars.js among many others. You can learn more about Node.js Template Engines [here](https://www.tutorialsteacher.com/nodejs/template-engines-for-nodejs) or [here](https://expressjs.com/en/resources/template-engines.html).

- Create a listener to the root route (`/`) and render the "index.ejs" file.

```javascript
// Simple routing to the index.ejs file
app.get("/", (req, res) => {
    res.render("index");
});
```

- Set blank error input error

```javascript
// Blank input
// Incase of blank in the index.ejs file, return error 
// Error  - Empty Data!

app.post("/scan", (req, res) => {
    const url = req.body.url;

    // If the input is null return "Empty Data" error
    if (url.length === 0) res.send("Empty Data!");
    
    // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
    // It shall be returned as a png image format
    // In case of an error, it will save the error inside the "err" variable and display it
    
    qr.toDataURL(url, (err, src) => {
    
        if (err) res.send("Error occured");
        
        // Let us return the QR code image as our response and set it to be the source used in the webpage
        res.render("scan", { src });
    });
});
```

- Configuring the ports we are listening to. This line starts the server.

```javascript
// Setting up the port for listening requests
app.listen(port, () => console.log("Server at 5000"));
```

#### Adding a views folder

Inside the main directory, create an additional folder namely "views". In this directory, add 2 new files and name them "index.ejs" and "scan.ejs".

> "index.ejs" file will be the default page that loads when we start the application while the "scan.ejs" will hold our QR Code image after generation.

Let us create a simple page structure in "index.ejs". We shall then copy the structure to the "scan.ejs" file to promote webpage design consistency. We shall use some custom css together with bootstrap to quicken the styling process and shorten the code.

This is shown in the code below:

```html
<!doctype html>
<html lang="en">

<head>
    <title>QR Code Generator</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <!-- Custom CSS -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
        * {
            font-family: Montserrat;
        }
        
        .card {
            margin: 0 auto;
            /* Added */
            float: none;
            /* Added */
            margin-bottom: 10px;
            /* Added */
        }
    </style>
</head>

<body>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    <!-- Main Container -->
    <div class="container">
        <br>
        <h1 class="text-center">QR CODE GENERATOR</h1>
        <hr>
    </div>
    <!--container end.//-->
</body>
</html>
```

Now, inside the "index.ejs" file, let us add an input element inside the body tags and a button which we shall name, "Generate", to execute the QR Code generation process. This is shown in the code below:

```html
<!-- Input card -->
<!-- row -->
<div class="row mb-3">

    <!-- col.// -->
    <aside class="col-sm-12 text-center">
        <p>This is a simple QR Code generator website</p>

        <div class="card">
            <article class="card-body">
                <h4 class="card-title text-center mb-4 mt-1">Input</h4>
                <hr>
                <p class="text-success text-center">Please paste in or type the URL or Text below and press Generate!</p>
                <form action="/scan" method="POST">
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-pencil"></i> </span>
                            </div>
                            <input name="url" class="form-control" placeholder="URL or Text" type="text" required>
                        </div>
                        <!-- input-group.// -->
                    </div>
                    <!-- form-group// -->

                    <!-- form-group// -->
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block" value="Get QR">Generate</button>
                    </div>
                    <!-- form-group// -->

                    <p class="text-center"><a href="#" class="btn">Find help?</a></p>
                </form>
            </article>
        </div>
        <!-- card.// -->

    </aside>
    <!-- col.// -->
</div>

<!-- row.// -->
<!--Image card end.//-->
```

Inside the "scan.ejs" file, add a card that shall contain the QR Code image generated. Add also a button that returns us to the previous page. This is well shown in the code below:

```html
<!-- Image card -->
<div class="row mb-3">
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src=<%=src%> alt="QR Code Image">
        <div class="card-body">
            <p class="card-text">Scan the QR Code to access data!</p>
        </div>
        <a href="/"><button type="button" class="btn btn-outline-secondary btn-lg">Back</button></a>
    </div>
    <!--Image card end.//-->
```

Notice how we use the ejs source attribute to easily add our image to our webpage!

#### Running the node.js application

Let us now run our application using node by running the command below inside the terminal:

```nodejs
node index.js
```

Access the webpage at `localhost:5000`.

You can now enter some simple URL or Text and click generate to see the output. An example is shown below:

You can find and clone the code above in [this](https://github.com/franciskaguongo/Generate-a-QR-code-in-Node.js) repository.
Congratulations, you have successfully created a Node.js QR Code generator program!

#### Conclusion

In conclusion, we have learned the following: 

- What QR Codes are and how they store data.
- Uses of QR codes.
- How QR Codes are efficient in data sharing on multiple devices.
- How to create a simple QR Code generator using Node.js.

You can also try other projects on your own using the above knowledge such as automatically printing or sharing the code generated in social media platforms or emails.

Happy Coding!

#### References

- **qrcode.js** options and usages [here](https://www.npmjs.com/package/qrcode).

- **body-parser.js** [here](https://www.npmjs.com/package/body-parser).
