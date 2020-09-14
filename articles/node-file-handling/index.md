---
layout: engineering-education
status: publish
published: true
url: /engineering-education/node-file-handling/
title: File handling in Node.js
description: Covering the basics on file handling in Node.js to perform various CRUD operations. The module offers functions to perform basic CRUD(Create, Read, Update, Delete) operations.
author: lalithnarayan-c
date: 2020-09-11T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/node-file-handling/hero.jpg
    alt: file handling in Node.js
---
[Node.js](https://nodejs.org/en/) is a server-side environment for executing JavaScript files. Off the browser, Node.js offers more number of features to complement JavaScript functionalities. One of them is file handling. Node.js is built around adding such functionalities that cannot be performed or utilized in a browser. In this article, we will cover file handling extensively, understand the various functionalities Node.js offers, and implement code to read and write to files.
<!--more-->
### File System Module
For file handling, Node.js offers a module called `fs` (fileSystem). To use the features of this [module](https://www.w3schools.com/nodejs/nodejs_filesystem.asp), we need to begin with importing it. We import it by using the `require` keyword.

```js
const fileSystem = require('fs')
```

The module offers functions to perform basic [CRUD](https://stackify.com/what-are-crud-operations/) (Create, Read, Update, Delete) operations. Let us look at some of the prominent functions used regularly during development. `readFile`, `readFileSync`, `writeFile`, `writeFileSync` are the main functions that we will be looking at for this article. Some of the functionalities the `fs` module provides are given below.

1. **unlinkSync**: unlinkSync is used to delete files synchronously.
   ```js
    const fs = require('fs');

    try {
    fs.unlinkSync('./fileToBeDeleted.txt');
    console.log('successfully deleted fileToBeDelted.txt');
    } catch (error) {
    // handle the error
    console.log(error)
    }
   ```
   `unlinkSync` takes in the path of the file to be deleted as its parameter.  

2. **unlink**: unlink is used to delete files asynchronously using callbacks. Asynchronous execution refers to the execution of the next line of code while waiting for the function to execute. The order is not specific and therefore, the callback function returns the value upon successful execution of the function unlink.

   ```js
    const fs = require('fs');

    fs.unlink('./fileToBeDeleted', (error) => {
    if (error) throw error;
    console.log('successfully deleted');
    });
   ```
   `unlink` takes the path of the file to be deleted and a callback function as its parameters. The callback function returns the error upon unsuccessful deletion. If deleted, it displays a successfully deleted message.

3. **readFile**: This function is used for reading files asynchronously.
  `js
    fs.readFile('<directory>', (error, data) => {
    if (error) throw error;
    console.log(data');
    });
   `
   `readFile` takes in the path and a callback function as its parameters.

4. **readFileSync**: Used to read files synchronously in order.  

   ```js
   fs.readFileSync('<directory>');
   ```
   `readFileSync` takes in the path of the file as its parameter.

5. **writeFile**: `writeFile` is a function used to write to files asynchronously. The function takes in four parameters: `fileName`, `textToBeWritten`, `FileEncodingType`, `Callback function`.

   ```js
    const textToBeWritten = 'Sample Text'
    fs.writeFile('message.txt', textToBeWritten, 'utf8', (error, data)=> {
        console.log(data);
    });
   ```
6. **writeFileSync**: `writeFileSync` is used to write to files synchronously. The function takes three parameters, `fileName`, `inputText` and `fileEncoding` as its inputs.

    ```js
    const textToBeWritten = 'Sample Text'
    fs.writeFileSync('message.txt', textToBeWritten, 'utf8')
    ```

7. **stats.isDirectory**: To check for the existence of a file, we use the `function stats.isDirectory`. It returns a boolean value.  

   ```js
    const fs = require('fs');

    const pathsToCheck = ['./fileCheckForExistence'];

    for (let i = 0; i < pathsToCheck.length; i++) {
    fs.stat(pathsToCheck[i], function(err, stats) {
        console.log(stats.isDirectory());
    });
    }
   ```

   The resulting output should look like this (Assuming the file exists).

   ```txt
    true
   ```
   If the file does not exist, the output will be `false`

### Reading From Files
We will begin by creating a JavaScript file called `fileHandling.js`. For reading files, we will make use of the module `fs`, which stands for the file system. The `fs` module gives us access to the file system of the local machine. Before we begin with reading the file, we will create a sample file that we will read and write to. We will name it `sampleText.txt`.

```txt
This is a sample text for a blog on file handling in Node.js. We will be covering the topic of file handling extensively.
```

We have a file available for reading. Let us look at the code for reading the file.

#### readFileSync
```js
const fileSystem = require('fs')
const textFromFile = fileSystem.readFileSync('./sampleText.txt','utf-8')
console.log(textFromFile)
```

The contents of the `.txt` file is displayed on the console/terminal. `require('fs')` creates an object called `fileSystem` which has all the functionalities required to interact with local files. The readFileSync function returns the text from the file and it is stored in the `textFromFile` variable.

### readFile
Consider the asynchronous counterpart for reading files. As discussed earlier, asynchronous execution does not guarantee order of execution of code. Let us now code to understand this better:

```js
const fileSystem = require('fs')
console.log("Before Reading")
fileSystem.readFile('sampleText.txt', 'utf-8', (err,data)=> {
    console.log(data)
    console.log("Read File")
})
console.log('Reading file')
```

Before moving onto the next section, try to guess the output.

I am sure you guessed it right. Upon executing the command `node fileHandling.js`, we obtain the following output.

```txt
Before Reading
Reading file
This is a sample text for a blog on file handling in Node.js. We will be covering the topic extensively.

Read File
```
Let us analyze the output. The order of code executed is not the same as the order in which it has been written. This is the beauty of asynchronous code. The callback function returns `data` upon reading the file.

### Write To Files
Let us now consider writing to files. The given snippet of code writes to file synchronously.

```js
const fileSystem = require('fs')
const textToBeWritten = 'Hopefully, you enjoyed going through the article'
fileSystem.writeFileSync('./newFileCreated.txt', textToBeWritten)
console.log("Creating and Writing to File DONE! :)")
```
The writeFilesync is executed before the `console.log` statement reasserting the fact that the order of execution is in-order. The asynchronous counterpart is similar to `readFile`. Since the execution order is not fixed, we cannot say which file will be written first. Although, in the example that we choose, since the files are small, we might not find a change in the order of execution.

At the end of the execution of the code, we will have a new file created called `newFileCreated.txt`.

```js
const fileSystem = require('fs')
const textToBeWritten = 'Hopefully, you enjoyed going through the article'
fileSystem.writeFile('./newFileCreated1.txt', textToBeWritten, (err,data)=>{
    console.log("inside file 1")
})
console.log("Creating and Writing to File DONE! :)111111")
const textToBeWritten2 = 'Hopefully, you enjoyed going through the blog'
fileSystem.writeFile('./newFileCreated2.txt', textToBeWritten2, (err,data)=>{
    console.log("inside file 2")
})
console.log("Creating and Writing to File DONE! :)2222222")
```

The output will resemble the text snippet given below:

```txt
Creating and Writing to File DONE! :)111111
Creating and Writing to File DONE! :)2222222
inside file 1
inside file 2
```

Upon analysis of the code snippet, we understand that the creation of the two files takes place after the console.log statements have been executed. This demonstrates the asynchronous nature of the code.

### Conclusion
In this article, we have covered the `fs` module and understood the various functionalities that it provides. This article serves as a go-to guide for developers to glance at the concepts in file handling. Reading and writing files is an important task and I hope you have got a stronghold on the `fs` module.
