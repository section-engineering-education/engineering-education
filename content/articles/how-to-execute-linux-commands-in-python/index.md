---
layout: engineering-education
status: publish
published: true
url: /how-to-execute-linux-commands-in-python/
title: How to Execute Linux Commands in Python
description: This tutorial will serve and an introduction to Linux commands. We are going to look at how we can automate and run Linux commands in Python.
author: adith-bharadwaj
date: 2021-01-13T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-execute-linux-commands-in-python/hero.jpeg
    alt: Linux commands Python example image
---
Linux is one of the most popular operating systems used by software developers and system administrators. It is open-source, free, customizable, very robust, and adaptable. Making it an ideal choice for servers, [virtual machines (VMs)](https://www.vmware.com/topics/glossary/content/virtual-machine), and many other use cases.
<!--more-->
Therefore, it is essential for anyone working in the tech industry to know how to work with Linux because it is used almost everywhere. *In this tutorial, we are going to look at how we can automate and run Linux commands in Python*. 

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Building An Application to Ping Servers](#building-an-application-to-ping-servers)
- [Code](#code)
- [Conclusion](#conclusion)

### Prerequisites
- Basic understanding of [Linux](/what-is-linux/) and [shell scripting](/introduction-to-shell-scripting/).
- Basic programming skills in [Python](https://www.python.org/about/gettingstarted/).

### Introduction
Python has a rich set of libraries that allow us to execute shell commands. 

A naive approach would be to use the `os` library:

```python
import os
cmd = 'ls -l'
os.system(cmd)
```

The `os.system()` function allows users to execute commands in Python. The program above lists all the files inside a directory. However, we can't read and parse the output of the command. 

In some commands, it is imperative to read the output and analyze it. The `subprocess` library provides a better, safer, and faster approach for this and allows us to view and parse the output of the commands.  

| OS      | subprocess |
| ----------- | ----------- |
| os.system function has been deprecated. In other words, this function has been replaced.      | The subprocess module serves as a replacement to this and Python officially recommends using subprocess for shell commands.       |
| os.system directly executes shell commands and is susceptible to vulnerabilities.   | The subprocess module overcomes these vulnerabilities and is more secure. |
| The os.system function simply runs the shell command and only returns the status code of that command. | The subprocess module returns an object that can be used to get more information on the output of the command and kill or terminate the command if necessary. This cannot be done in the os module.     |

Although you can execute commands using the OS module, the subprocess library provides a better and newer approach and is officially recommended. Therefore, we are going to use subprocess in this tutorial. This [documentation](https://www.python.org/dev/peps/pep-0324/#abstract) explores the motivation behind creating this module. 

### Building an application to ping servers
Let's use the [`subprocess`](https://docs.python.org/3/library/subprocess.html) library to write a script that pings multiple servers to see whether they are reachable or not. This would be a good use case when you have multiple hosts, servers, or VMs(AWS ec2 instances) and want to check if they are up and running without any problems. 

A simple solution is to just [`ping`](https://www.geeksforgeeks.org/ping-command-in-linux-with-examples/) these servers and see if they respond to the request. However, when you have a considerable amount of machines, it will be extremely tedious and time-consuming to manually `ping` them. A better approach is to use Python to automate this process.  

### Code
According to the [official documentation](https://docs.python.org/3/library/subprocess.html), the subprocess module allows you to spawn new processes, connect to their input/output/error pipes, and obtain their return codes. 

This module intends to replace several older modules and functions. The subprocess library has a class called `Popen()` that allows us to execute shell commands and get the output of the command. 

Create a Python file and add the following code. We also need to create a file called "servers.txt", where we can add a list of all the servers we need to ping. The Python script will read from this file and ping each server listed in it. 

![Servers](/engineering-education/how-to-execute-linux-commands-in-python/servers.png)

I have added 4 servers, out of which two exist and the other two do not. Only the servers that exist can be "pinged".

```python
import subprocess  
  
def ping(servers):
    
    # The command you want to execute   
    cmd = 'ping'
  
    # send one packet of data to the host 
    # this is specified by '-c 1' in the argument list 
    outputlist = []
    # Iterate over all the servers in the list and ping each server
    for server in servers:
        temp = subprocess.Popen([cmd, '-c 1', server], stdout = subprocess.PIPE) 
        # get the output as a string
        output = str(temp.communicate()) 
    # store the output in the list
        outputlist.append(output)
    return outputlist
  
if __name__ == '__main__': 
    
    # Get the list of servers from the text file
    servers = list(open('servers.txt'))
    # Iterate over all the servers that we read from the text file
    # and remove all the extra lines. This is just a preprocessing step
    # to make sure there aren't any unnecessary lines.
    for i in range(len(servers)):
        servers[i] = servers[i].strip('\n')
    outputlist = ping(servers) 
    
    # Uncomment the following lines to print the output of successful servers
    # print(outputlist)
```

![Output](/engineering-education/how-to-execute-linux-commands-in-python/output.png)

As you can see in the output, we get the message "name or service not known" for the two servers that did not exist. 

In the program above, the `ping()` function takes a list of servers and returns the output of each running `ping` command on each server. If a server is unreachable, it displays an output saying "ping: somethingthatdoesntexist: Name or service not known". 

The `Popen()` is a constructor method of the `Popen` class and takes in the following arguments:
- A list of commands and any additional options these commands might require. For example, the `ls` command can be used with '-l' option. To execute the `ls -l` command, the argument list would look like this: `['ls', '-l']`. The commands are specified as strings. In the example above, we use the `ping` command with the option `-c 1` so that it only sends one packet of data, and the server replies with a single `packet`. Without this limit, the command would run forever until an external process stops it. 

- The `stdout` argument is optional and can be used to set where you want the `subprocess` to display the output. By default, the output is sent to the terminal. However, if you don't want to dump a large output onto the terminal, you can use `subprocess.PIPE` to send the output of one command to the next. This corresponds to the `|` option in Linux. 

- The `stderr` argument is also optional and is used to set where you want the errors to be displayed. By default, it sends the errors to the terminal. Since we need to get a list of servers that cannot be reached, we don't need to change this. The servers that cannot be reached (error) will be displayed to us on the terminal.  

The output of the command is stored in a variable called `temp`. The `communicate()` function allows us to read the output and the `str` function can be used to convert it to a string. Once we get the output, we can parse it to extract only the essential details or just display it as it is. In this example, I am storing the output in a list for future use.  

### Conclusion
In conclusion, automation is one of the hottest topics in the industry, and almost every company is investing huge amounts of money to automate various manual tasks. In this tutorial, we explored the process of automatically running and analyzing Linux commands on multiple hosts using Python. 

An old way of doing this is by using shell scripts. However, using Python gives developers more power and control over the execution and output of the commands. Now that you have understood the basics of executing Linux commands, you can go ahead and experiment with different commands and build more complex and robust applications.

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)