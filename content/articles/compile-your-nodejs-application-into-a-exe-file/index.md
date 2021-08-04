---
layout: engineering-education
status: publish
published: true
url: /compile-your-nodejs-application-into-a-exe-file/
title: Compiling a Node.js Application into an .exe File
description: In this article, we will discuss the reasons for converting an application into a .exe file and finally understand the technical details involved with the same.
author: chris-mutua
date: 2021-07-02T00:00:00-12:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/compile-your-nodejs-application-into-a-exe-file/hero.jpg
    alt: Node.js to .exe example image
---
During the development phase, the developer performs several processes of installation and coding to build and run an application. But, the end-users are just interested in running the application and not the underlying code and processes.
<!--more-->
This causes the need for a simple executable file that can run on any operating system without requiring the user to perform other steps to run the application.

In this tutorial, we'll learn how to create executable files for our Node.js application. Then, we'll compile our JavaScript files into an executable file.

### Table of contents
- [Key takeaways](#key-takeaways)
- [Pre-requisites](#pre-requisites)
- [What are Executable (.exe) files](#what-are-executable-(.exe)-files)
- [Pros of executable files](#pros-of-executable-files)
- [Packages used](#packages-used)
- [A simple web app](#a-simple-web-app)
- [nexe](#nexe)
    - [nexe installation](#nexe-installation)
    - [Compile one javascript file into an exercutable using nexe](#compile-one-javascript-file-into-an-executable-using-nexe)
    - [Compile your project into an executable using nexe](#compile-your-project-into-an-executable-using-nexe)
- [pkg](#pkg)
    - [pkg installation](#pkg-installation)
    - [Compile one javascript file into an executable using pkg](#compile-one-javascript-file-into-an-executable-using-pkg)
    - [Compile your project into an executable using pkg](#compile-your-project-into-an-executable-using-pkg)
    - [File or directory not included Error](#file-or-directory-not-included-error)
- [Further practice](#further-practice)
- [References](#references)

### Key takeaways
At the end of this tutorial, you would have learned the following:
- What are `.exe` files and their importance.
- Packages that we can use to compile your Node.js application into `.exe` files.
- Creating a simple Node.js application.
- Compiling Node.js files into an executable file for various operating systems.
- Running the executable file in an operating system.

### Prerequisites
For one to quickly follow along with this tutorial, you'll require a minimum of the following requirements:
- Basic web development skills.
- Some JavaScript coding skills.
- Node.js installed in your machine. If not, download it [here](https://nodejs.org/en/download/).
- An IDE. I highly recommend Visual Studio Code which is free and highly customizable. You can download it from [here](https://code.visualstudio.com/download).
- A stable internet connection.

If you are all set on the above requirements, let's look at some packages to accomplish our goal.

### What are Executable (.exe) files
Executable files (.exe files): These are files containing a set of encoded instructions, which are executed sequentially once the user clicks on the file or runs it.

`.exe` is a Windows extension referring to an executable file. Other operating systems have executable files as well, but with varying extensions. For example, in Linux or Unix-based operating systems, files ending with the `.bin`, `.elf` or `[none]` extensions are executables, while in MacOS, they *lack* extensions.

We shall focus on creating Windows executable files and touch on some other operating systems as we proceed.

### Pros of executable files
Let us see why the users prefer executable files in the first place. 

Some advantages of the executable files include:
- **Quick no-code execution:** It only requires one click to run the file, and that's it. Commands are not required to be run on the terminal to execute the program.

- **Prevent unwanted code change:** It prevents unwanted errors generated due to unplanned and accidental modification of source code.

- **Supports distribution:** Being hardware agnostic, the user doesn't have to install any packages or dependencies. This allows one to run multiple instances of the code on any machine without further requirements.

### Packages used
Two of the most commonly used packages used to compile JavaScript files into executables are:

- [nexe](https://www.npmjs.com/package/nexe "npmjs.com nexe/nexe documentation" ): It is a simple command-line utility that compiles your Node.js application into a single executable file. By default, it converts it into a Windows executable. You can quickly jump over to its section by clicking [here](#nexe).
- [pkg](https://www.npmjs.com/package/pkg): It is a Node.js package that can convert your Node.js app into several executable files for various operating systems (all at once) or of an individual operating system. You can quickly jump over to its section by clicking [here](#pkg).

We shall now get a simple Node.js application that is running and use it as our application.

### A simple web app
This web app will run on localhost at port 5000 and display images found in the images folder. First, create a directory called "executable" and create files and folders as shown in the folder structure below.

Initialize the project with:

```bash
npm init -y
```

Install the packages needed for the project using:

```bash
npm i express
```

### Folder structure
The folder structure of the application will look as shown below:

```bash
├──  node_modules (folder)
├──  views (folder)
│   └── images (folder)
│       └── tv1.jpg (file)
│   └── index.html (file)
│   └── style.css (file)
├──  index.js (file)
└──  package.json (file)
```

### Views
#### Images
Inside the image folder, download a free 760 × 380 tv image from the web and name it "tv1.jpg". You may download a sample image [here](https://www.google.co.ke/search?q=smart+tv+760+x+600&tbm=isch&ved=2ahUKEwjS7LDE_pnxAhUOphQKHW3bA1EQ2-cCegQIABAA&oq=smart+tv+760+x+600&gs_lcp=CgNpbWcQAzoECAAQQzoCCAA6BAgAEBhQh4cNWOe6DWChwQ1oAHAAeACAAeYBiAHjD5IBBTAuNS41mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=2svIYNKXFI7MUu22j4gF&bih=626&biw=1434&safe=active&hl=en-KE).

#### index.html
The HTML markup code is as follows:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercutable Files</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <!--Display text and a tv image-->
    <h1>Hello, world!</h1>
    <br>
    <p>Its you again, Hello there!</p>
    <div class="photo">
        <h2>TV 1</h2>
        <img src="./images/tv1.jpg" alt="tv1" class="img">
        <br>
        <hr>
        <h2>TV 2</h2>
        <img src="./images/tv1.jpg" alt="tv2" class="img">
    </div>
</body>
</body>

</html>
```

#### style.css

```css
html {
    font-size: 62.5%;
    font-family: serif;
}

body {
    font-size: 1.8rem;
    line-height: 1.618;
    max-width: 38em;
    margin: auto;
    color: #4a4a4a;
    background-color: #f9f9f9;
    padding: 13px;
}

h1 {
    font-size: 2.35em;
}

h2 {
    font-size: 2em;
}

hr {
    border-color: #2c8898;
}

img {
    max-width: 50vh;
}
```

#### index.js

```javascript
/*jshint strict:false */

(function() {
    'use strict';
    // this function is strict...
}());

// Setting up our app requirements

const express = require('express');
const app = express();
const Server = require('http').Server;
const server = new Server(app);
const path = require('path');
const port = 5000;

// Setting up our port

server.listen(port, () => console.log("Server at 5000"));

// Configuiring simple express routes
// getDir() function is used here along with package.json.pkg.assets

app.use('/', express.static(getDir() + '/views'));

app.get('/', function(req, res) {
    res.sendFile(getDir() + '/views/index.html');
});


// Using a function to set default app path
function getDir() {
    if (process.pkg) {
        return path.resolve(process.execPath + "/..");
    } else {
        return path.join(require.main ? require.main.path : process.cwd());
    }
}
```

> **Note:** Use the `getDir()` function or `path.join` instead of `__dirname` when using express or fastify routings to avoid errors.

#### package.json
The code automatically generated will look as shown below:

```json
{
    "name": "executable",
    "version": "1.0.0",
    "description": "Simple express app",
    "main": "index.js",
    "scripts": {
        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "express": "^4.17.1"
    }
}
```

You can find the code in [this](https://github.com/RisoriTofa/Convert-a-Node.js-file-into-an-exercutable-file/tree/main) repository.

Open the inbuilt Visual Studio Code Terminal using `Ctrl + ` in PC or `Control + Shift + ` in Mac.

Run the application using the following command on the terminal to get "Server at 5000" output using:

```bash
node index.js
```

Open a browser and open the app by visiting `localhost:5000`. Once done, let's use the packages to convert the application into a Windows executable file.

### nexe

![nexe](/engineering-education/compile-your-nodejs-application-into-a-exe-file/nexe.png)

Let's compile our project into an executable file with all the required packages and resources. Apart from the "node_modules", the other resource required that is also found in the root directory is the "views" folder. 

The Node.js packages will be automatically added, so we'll only specify the other required resources.

#### nexe installation
Run the following command in the terminal to install `nexe` globally:

```bash
npm i nexe -g
```

If you are using Ubuntu, run:

```bash
sudo npm i nexe -g
```

> **Note:** Unlike the pkg module, we don't install the package locally but rather globally. If you install it locally, you will face numerous errors. An example of that error is `Command' nexe' not found`. You can see how to resolve it [here](https://stackoverflow.com/questions/67981535/nexe-module-command-nexe-not-found-error/67981536#67981536).

Once done, run the following to verify if it is installed:

```bash
nexe -h
```

#### Compile one JavaScript file into an executable using nexe
Now, let's run the following to convert the application's entry point into an executable file:

```bash
nexe index.js
```

This tells `nexe` that it should only look and compile the "index.js" file into an executable file during the build process.
Once done, run the following command on the terminal to start the build process:

```bash
nexe --build
```

We'll create a new executable file with the same name as our root directory's name, "executable". By default, it'll use the system's operating system and architecture type as the target for the application. 

This is so that you can quickly run it on your system. In our case, it'll create Windows executable file with the name "executable".

Double-tap on it or right-click and select the run command to start the application. It automatically logs out "Server at 5000," meaning that it is running. 

Access the application in the preferred browser at `localhost:5000`. You can terminate the process by clicking on the close window button.

To prove that only the entry point is compiled and not the resources found in the root directory. Resources such as those in the "views" folder, copy and paste the executable file in a separate folder and run it. It pops up errors since the application will be unable to access the resources.

##### Run on Linux or MacOs
- In case you are on Linux, you can run the generated executable using the command below:

```bash
./executable
```

You can close it using `Ctrl + C`.

- On MacOS, just double-tap to open. Then, close it using the close button.

#### Compile the entire project into an executable using nexe
We can do this in two ways.

- First, we can add the resources in the command line using the `--resources` or `-r` flag as seen below:

```bash
nexe -r "views/**/*"
```

We can also add additional commands such as the output executable file path using `--output` or `-o`, target using `--target` or `-t`, name of the executable file using `--name` or `-n`, build from source using `--build` or `-b` etc.

> 'target' in `nexe` is used to specify the platform (Windows, Linux, or MacOS), the arch or architecture type (x86, x64), and the Node.js version (12, 14, 16). You can see more [here](https://github.com/nexe/nexe "nexe Readme").

- We can define the resources inside the 'package.json' file. I recommend this since it saves your configurations for later re-runs. Since we already declared that our app "main" is "index.js", we shall introduce a build script additionally.

Head over to the "package.json" file, and under the scripts tag, add a build script as follows:

```json
{
    "scripts": {
        "start": "node index.js",
        "build": "nexe -r views/**/*",
        "test": "echo \"Error: no test specified\" && exit 1"
    }
}
```

This will specify our resources which are locally found during the build time.

Now run the command below to tell `nexe` to use the specifications in the build tag:

```bash
npm run build
```

To start the build process, use the following command:

```bash
npm --build
```

You can run the file that's created. You can also copy it to another directory without any resources and try running it to verify that the resources were compiled into the executable file.

In case of other errors, you can post them in the [nexe issues tab](https://github.com/nexe/nexe/issues) for help.

### pkg

![pkg](/engineering-education/compile-your-nodejs-application-into-a-exe-file/nexe.png)

Let's use the project that we previously created and see the outcome.

> You can either delete the contents of the root directory (executable) previously created or create a new one with a different name and repeat the steps we did above to create a new project. This reduces vulnerability errors due to packages clashing with each other.

#### pkg installation
You can start by installing the package using the command below for local installation:

```bash
npm i pkg
```

or for global installation use:

```bash
npm i pkg -g
```

Please wait for a few seconds for it to complete the process. Then, on completion, check and close any instance in which the code is running in the background.

#### Compile one JavaScript file into an executable using pkg

Please run the following command in which we'll call the pkg module and the entry point to our application. 

In our case, its `index.js`:

```bash
pkg index.js
```

This will compile our app's entry point into three different executable files since no targets were specified. Just wait for some time for the process to complete. Head over to the main directory. You will find three newly generated files. 

These are the:
1. for Windows (index-win.exe)
2. for Linux (index-linux)
3. for mac (index-macos)

That is because we did not specify an operating system. Run the file that's suitable for your operating system. For example, in Windows, double-click on the "index-win.exe" icon. 

It will launch the app and display a console that will act as an interactive interface between you and the app. Access the application in the preferred browser at `localhost:5000`. As seen, it works well.

> **NOTE:** As long as the executable file is running, the application is running.

##### Run on Linux or MacOS
If you are using Ubuntu, run `./index-linux` on the terminal. Then, confirm if it is running on the browser at `localhost:5000`.

Close it using `Ctrl + C`.

If you are using MacOS, double click on "index-macos" icon and run your compiled application. Then, close it using the close button.

##### Deeper dive
Now let us dive a little deeper and specify the operating system and the Node.js version. In this, we use the `--targets` flag to set the target operating system.

Delete the executable files generated in the previous process.

Run the following in the terminal:

```bash
pkg index.js --targets node12-win-x64
```

This specifies that the project should be compiled into an executable file that runs on Node.js version 12 and Windows O/S of a 64-bit architecture.

Some of the supported Node.js ranges, platforms, and architectures are as shown in the table below:

| Node.js Versions | Platforms  | Archs  |
|---|---|---|
| node8  | alpine  | x64  |
| node10  | linux  | arm64  |
| node12  | linuxstatic  | (armv6)  |
| node14  | win  | (armv7)  |
| node16  | macos  |   |
| latest  | (freebsd)  |   |

#### Compile your project into an executable using pkg
Here, we should tell `pkg` our resources folder. Again, we can do this inside the `package.json` file using scripts and assets configurations.

Let us head over to our `package.json` file and add a "pkg" as shown below:

```json
{
    "name": "executable",
    "bin": "index.js",
    "version": "1.0.0",
    "description": "Simple express app",
    "main": "index.js",
    "scripts": {
        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "pkg": {
        "assets": [
            "views/**/*"
        ],
        "output": "dist"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "express": "^4.17.1",
        "pkg": "^5.2.1"
    }
}
```

Notice that we have also added "bin". This tells `pkg` where the app entry point is. Inside the "pkg" script, we have added "assets" to show which file contains our resources. 

You can add more by just separating them with a comma.  We have further specified where the outputs will be stored using "outputPath".

Run `pkg` using the command below to use our configuration in `package.json`:

```bash
pkg .
```

or

```bash
pkg package.json
```

In the case of build files or the specific targets, you can also specify them to pkg to obtain an output of the format below:

```json
{
    "pkg": {
              "scripts": "build/**/*.js",
              "assets": "views/**/*",
              "targets": [ "node14-linux-arm64" ],
              "outputPath": "dist"
            }
}
```

#### File or directory not included error
In case you have encountered the "was not included" error in pkg, then this is how to get around it. In pkg module, we shall not use a direct concatenation of relative paths, for instance `res.sendFile(__dirname + '/views/index.html');`. 

This is because it is not only a **bad programming practice** but also because it will return an error as shown below:

```bash
john@john:~/Tofa/Projects/Convert node project into .exe/Secondtest/express$ ./express
Error: File or directory '/**/express/views/index.html' was not included into executable at compilation stage. Please recompile adding it as asset or script.
at error_ENOENT (pkg/prelude/bootstrap.js:539:17)
at findNativeAddonForStat (pkg/prelude/bootstrap.js:1201:32)
at statFromSnapshot (pkg/prelude/bootstrap.js:1224:25)
at Object.stat (pkg/prelude/bootstrap.js:1250:5)
at SendStream.sendFile (/snapshot/express/node_modules/send/index.js:721:6)
at SendStream.pipe (/snapshot/express/node_modules/send/index.js:595:8)
at sendfile (/snapshot/express/node_modules/express/lib/response.js:1103:8)
at ServerResponse.sendFile (/snapshot/express/node_modules/express/lib/response.js:433:3)
at /snapshot/express/index.js:21:9
at Layer.handle [as handle_request] (/snapshot/express/node_modules/express/lib/router/layer.js:95:5)
```

This is because `pkg` won't recognize the pattern, hence it will be unable to compile the project resources and paths correctly.

Instead of using `__dirname`, replace it with either `path.join` or `getDir()` in which you have required *path* at the beginning of the file using `const path = require('path');`. `process.cwd()` is always used for files which will not be available during build time but would be required for execution.

In case of more issues, you can read more [here](https://stackoverflow.com/questions/67966111/node-js-vercel-pkg-express-return-0-error-and-fastify-errors-error-file-or-f/67966112#67966112 "Stack-Overflow vercel/pkg express and fastify errors"). You can also raise up new issues [here](https://github.com/vercel/pkg/issues "vercel/pkg issues tab").

### Further practice
- Check out additional functions at [nexe/nexe](https://github.com/nexe/nexe "Github.com nexe/nexe") and [vercel/pkg](https://github.com/vercel/pkg "Github.com vercel/pkg") and try them out.
- You can try running the other two files in their respective virtual machines and see the outcome.

Just install the other two operating systems and configure them. Then, run the files and test the outcome on web browsers of choice.

> As stated before, you can copy it to another machine, and the other person won't need to do any package installation process.

### Conclusion
As projects need more testing during the SDLC process, code alterations are problems one does not hope to encounter. In addition, one prefers quick project distribution. We can solve these by compiling them into Node.js executable files either with or without resources as preferred.

Happy coding!

### References
Some references used for this tutorial are listed below:
- Node.js [pkg](https://www.npmjs.com/package/pkg) module documentation.
- [nexe](https://www.npmjs.com/package/nexe) package documentation.
- [Importance of .exe files](https://www.bu.edu/tech/support/research/software-and-programming/common-languages/matlab/standalone/benefits/).
- [express and fastify pkg module errors](https://stackoverflow.com/questions/67966111/node-js-vercel-pkg-express-return-0-error-and-fastify-errors-error-file-or-f/67966112#67966112).
- [Stack Overflow command 'nexe' not found Error](https://stackoverflow.com/questions/67981535/nexe-module-command-nexe-not-found-error/67981536#67981536).
- [Stack-Overflow vercel/pkg express and fastify errors](https://stackoverflow.com/questions/67966111/node-js-vercel-pkg-express-return-0-error-and-fastify-errors-error-file-or-f/67966112#67966112).

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
