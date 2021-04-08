### Introduction
Node.js programs run on a single thread when executed. Executing millions of processes leads to delays/blocking hence the need for a solution.
One way to work around this delay is the use of Node.js child process, a process that is launched by another process due to previous program unending tasks.  

In this tutorial, let's discuss how to we can use these child processes to launch another process to avoid the blocking/ delays while executing our programs.

### Prerequisites
This tutorial requires basic knowledge on how non-blocking processes work in JavaScript and basic knowledge in Node.js.

### Getting Started
As we've seen, Node.js is single-threaded, this implies that however powerful your server is, it only supports a few loads at a given time.  
But could this mean it can't support multiple loads? of course not, there must be a way, and that's the use of the child process.  
Node.js is based on the use of modules most of its key features are modules, including the child process.  

Let's have a look at the child process module and how Node supports multiple processes.   

### Child process module
The child process module has several methods that we can use to create other processes. In this post, we cover the following: 
- `child_process.exec()` 
- `child_process.spawn()`

### Creating child process using `exec()` method
`child_process.exec()` method creates a new shell process. It then uses this shell to execute commands. The output of these executed commands is then kept in an in-memory buffer.  This output can then be accessed via the callback function that is being passed to the `exec()` method. Let's look at an example:  

>In this tutorial, we use the Node.js powerful `REPL` command-line tool to run/test our results, but you're free to create files to suit your requirements.  

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
[Function: exec]   //output
undefined
> 

```
This method (`child_process.exec()`) has the following syntax:

```bash
child_process.exec(command[, options][, callback])
```
The `command` argument is of type string, that expects a command to execute, say, for example, a command to list your directory's files.   
The `options` is an object, that takes several other additional methods, for instance, getting the current working directory of the child process `process.cwd()`.  
The `callback` is a function that should be called when a process has been terminated. It takes 3 argumentsn as follows:

- error <Error> - returns an error of type `Error`.
- stdout <string> | <Buffer> - This could either be a string or a buffer.
- stderr <string> | <Buffer> - returns a string/ buffer.

With the module, let's proceed and add the following scripts to run the `ls` command listing folders and files in a directory

```bash
> exec('ls -lh', (error, stdout, stderr) => {
...   if (err) {
.....     console.error(err);
.....     return;
.....   }
... 
...   if (stderr) {
...     console.error(stderr);
...     return;
...   }
... 
...   console.log(stdout);
... });
>  
undefined
> 

```  
Output:
```bash
> stdout:
total 8.0K
-rwxrwxrwx 1 root       root        612 Apr  2 11:57 index.nginx-debian.html
lrwxrwxrwx 1 root       root         21 Apr  2 12:54 phpmyadmin -> /usr/share/phpmyadmin
drwxrwxr-x 5 wen wen 4.0K Apr  2 12:24 project

```
This script imports the module, using an extremely terse syntax, the JavaScript destructuring.  
With this module now available, the first argument takes the command while the second argument takes the callback function. 
On successful execution, `error` returns `null` otherwise an instance of `Error` is returned.  

The `stdout` and `stderr` contain the child process' output decoded in `UTF-8`as shown in the above output.  

### Creating child process using child_process.spawn()
Unlike the `child_process.exec()`, this method requires the use of the streams i.e data is returned via the streams API.
Therefore, to get the required results, we need to listen to stream events.  

Let's look at an example: 

In your `REPL`, run the following commands:  
```bash

Type ".help" for more information.
> const { spawn } = require('child_process');
undefined
> 
> const spawned_child = spawn('cat', ['child.js']);
undefined
> 
```
The above script is quite straightforward, we import the `child_process` module. The result is assigned to a destructured constant, `spawn`.  
We then create a child process by calling the `spawn()` method. This method accepts 2 arguments, the command, and optional options.  
The resulting output is being assigned to a `spawned_child` constant.  

Let's run the above script by typing the following:  

```bash
> child
ChildProcess {
...........................
.............................
> stderr: cat: child.js: No such file or directory

child process exited with code 1
> 

```

### Conclusion
In this tutorial, we've seen how can create child process using the `child_process.exec()` and `child_process.spawn()`.
Other methods exists such as `child_process.fork()` which is a variation of the `child_process.spawn()` method. It has the advantage of communicating directly between the parent and the child process. The other method is the `child_process.execFile()`. For more details, visit [this link](https://nodejs.org/api/child_process.html).  



