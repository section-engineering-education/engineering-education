
### Introduction
We use the Node.js Operating System(OS)  module to get more information about the underlying computer system.  
In this tutorial, you'll learn basic OS module operations in Node.Js and other related Operating Systems activities.

### Getting started
JavaScript has improved since the release of ES2015, employing the use of modules.  This feature allows for the reusability of scripts across multiple files.  
Given this advantage, Node.js is no exception, it organizes most of its core functionalities in [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) including the OS module.  

As we've seen, Operating System (in Node.js) is a module, and therefore we'll need to import it into our script. 
Let's start by creating a file `node-os-module.js` and add the following line.  

```js
const os = require('os');
```
Now that we've got the OS module, in the next section, let's have a look at various operations we can perform with the OS module.  

### Getting operating system details

This module has a couple of functions that are used to retrieve the details of an operating system as we'll see shortly.  
In the  `node-os-module.js` file, add the following the scripts:  

```js
const os = require('os');

let myCurrentOSDetails = {
    name: os.type(),
    architecture: os.arch(),
    platform: os.platform(),
    release: os.release(),
    version: os.version()
};

console.log(myCurrentOSDetails);
```
Run this script in your terminal, by typing the following in your shell:  
```bash
node node-os-module.js 
```
Running this script in my Ubuntu 20.04 outputs the following (Note that results vary depending on your system):  
```bash
{
  name: 'Linux',
  architecture: 'x64',
  platform: 'linux',
  release: '5.8.0-45-generic',
  version: '#51~20.04.1-Ubuntu SMP Tue Feb 23 13:46:31 UTC 2021'
}
```

You can achieve the same result by using the Node.js' `Read, Evaluate, Print and Loop (REPL)` command-line tool. Indeed, this will even simplify your work by not creating any files. 

Start by running the following command in your terminal to launch `REPL` :  
```bash
$ node
```
Upon running the `node` command, you will notice that you're presented with a screen with the `>` symbol, this is the REPL command line.  
```bash
$ node
Welcome to Node.js v15.12.0.
Type ".help" for more information.
> 

```
Now let's proceed and write our previous script in the REPL as shown below: 

```bash
$ node
Welcome to Node.js v15.12.0.
Type ".help" for more information. 
> const os = require('os');
undefined
> 
> let myCurrentOSDetails = {
...     name: os.type(),
...     architecture: os.arch(),
...     platform: os.platform(),
...     release: os.release(),
...     version: os.version()
... };
undefined
>
```
Since our script is assigned to a  `myCurrentOSDetails` variable, we can log our result as shown below:  
```bash
> console.log( myCurrentOSDetails );
> {
  name: 'Linux',
  architecture: 'x64',
  platform: 'linux',
  release: '5.8.0-45-generic',
  version: '#51~20.04.1-Ubuntu SMP Tue Feb 23 13:46:31 UTC 2021'
}
undefined
>
```
### Checking computer system (server) uptime

Previously, we have seen how we can use this module to get the server underlying operating system details, in this section, we look at server uptime.  
Uptime in computers refers to the availability of the system to perform its operations, unlike downtime where the system is stalled/shut down and unable to perform its task.  

This module has the `uptime()` method, which returns the system uptime details in seconds.  
Let's look at an example:

In your REPL window, enter the following command:  

```bash
...
> console.log(`Server running for the past ${os.uptime()} seconds.`);
```
Output:

 ```bash
...
> console.log(`The server has been up for ${os.uptime()} seconds.`);
Server running for the past 750588.69 seconds.
undefined
> 

```

### Getting user information (current system user)
The OS module has the `userinfo()` method that returns the details of the current system.  
You can achieve this task by running the following REPL command( remember to import the os module as discussed previously):  

```bash
console.log(os.userInfo());
```
Output in Ubuntu 20.04:
```bash
> console.log(os.userInfo());
{
  uid: 1000,
  gid: 1000,
  username: 'xxxmixxxer',
  homedir: '/home/xxxmixxxer',
  shell: '/bin/bash'
}
undefined
>

```

### Computer system hardware information
It has several methods to get detailed information about a computer system. They include:  
- `totalmem()` - This method returns the computer's primary storage (memory) in bytes.  We can achieve this by tying the following in our REPL:  
 ```bash
 > let memory = os.totalmem();
undefined
> 

 ```
 
 ```bash
 > console.log(memory);
16628015104
undefined
> 

 ```
 - `os.freemem()` - This method returns the computer's free space.  The size of space available in bytes. For example: 
 ```bash
 > let freeMememorySpace = os.freemem();
undefined
> 

 ```
 
 ```bash
 > console.log(freeMememorySpace);
1298567168
undefined
> 

 ```
 
### Conclusion
We've seen how we can use the `os module` to get more information about a computer system. This is important especially when a piece of knowledge about the hosting platform is required.
Various operations are available such as getting details about the computer's network interface which you can read from [here](https://nodejs.dev/learn/the-nodejs-os-module).  
