### Introduction
Node.js programs are known to run as a single process when executed. Now imagine the system has to run millions of the program instances, this, as you might have guessed would lead to blocking of the Node.js threads. One way to work around this delay is the use of Node.js child process, a process that is launched by another process due to unending tasks.  

In this tutorial, let's discuss how to we can use this child proeccesses to launch another process to avoid the blocking/ delays while executing our programs.

### Prerequisites
This tutorial requires basic knowledge on how non-blocking processes works in JavaScript and basic knowledge in Node.js.

### Getting Started
As we've seen, Node.js is single threaded, this implies that however powerful your server is, it only supports a few loads at a given time.  
But could this mean it can't support multiple loads? of course no, there must be a way, and that's the use of child process.  
Node.js is based on the use of modules, actually, most of its key features are modules, including the child process feature.  

Let's have a look at the child process module and how we can support multiple processes.   

### Child process module
As with other Node.js modules, child process module has several methods that we can use to create other processes.
In this tutorial, our focus is based on how to create these processes with `child_process` module, after which, we get the results using the `exec()` method.
We'll also have a look at the `spawn()` and `fork()` functions.  

For us to learn these key `child_process` module concepts, we'll have a look at how to write a program listing the contents of a folder(directory) and a script finding your files.  

### Creating child process using `exec()` method
`child_process.exec()` method creates a new shell process. It then uses this shell to execute commands. The output of these executed commands are then kept in memory buffer.  This output can then be accessed via the callback function that is being passed to `exec()` method. Let's look at an example:  

>In this tuturial, we use the Node.js powerful `REPL` command-line tool to run/test our results, but you're free to create files to suit your requirements.  

Launch your `REPL` by running the following command in your terminal: 

```bash

$ node

```
Output:
```bash
owinowendy@owino:~$ node
Welcome to Node.js v13.14.0.
Type ".help" for more information.
> 

```
Next, let's import the `child_process` module by running the following command:  

```bash
...................
> const {exec} = require('child_process');
undefined
> 

```
Let's proceed and log to our console what this method returns.
Output:  

```bash
> const {exec} = require(`child_process`);
undefined
> console.log(exec);
[Function: exec]   //returns a function, hence we're sure our exec() will be executed as a method.
undefined
> 

```
This method has the following syntax:
```bash
child_process.exec(command[, options][, callback])
```
The `command` argument is of type string, that expects a command to execute, say for example, a command to list your directory's files.   
The `options` is an object, that takes several other additional methods, for instance getting current working directory of the child process `process.cwd()`.  
The `callback` is a function that should be called when a process has been terminated. It takes 3 argumentsn as follows:

- error <Error> - returns an error of type `Error`.
- stdout <string> | <Buffer> - This could either be a string or a buffer.
- stderr <string> | <Buffer> - returns a string/ buffer.

With the module, let's proceed and add the following scripts to run `ls` command to list directories and files in Ubuntu 16.04.  

```bash
> exec('ls -lh', (error, stdout, stderr) => {
...   if (error) {
.....     console.error(`error: ${error.message}`);
.....     return;
.....   }
... 
...   if (stderr) {
...     console.error(`stderr: ${stderr}`);
...     return;
...   }
... 
...   console.log(`stdout:\n${stdout}`);
... });
>  
undefined
> 

```  
This script imports the module, using an extremely terse syntax, the JavaScript destructuring.  
With this module now available, the first argument takes the command while the second argument takes the callback function. 
On successful execution, `error` returns `null` otherwise an instance of `Error` is returned.  

The `stdout` and `stderr` contains the child process' output decoded in `UTF-8`.

