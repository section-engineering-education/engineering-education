---
layout: engineering-education
status: review
published: false
url: /engineering-education/getting-started-with-browser-sync/
title: Getting Started with Browser-sync
description: The basic concept of browser-sync, installing browser-sync and using it serve your files while building a website project
author: aransiola-ayodele-leom
date: 2020-09-24T00:00:27-21
topics: [Browser-sync]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-browser-sync/hero.jpg
    alt: Computers in a workspace displaying code
---

# Getting Started with Browser-sync


Browser-sync is an automation tool that allows you to keep multiple browsers & devices in sync when building websites. It also gives your testing workflow a faster synchronization, interaction and code changes across multiple devices easily, both internally and externally.

>I have been working with different local servers just to replace the hassle of live server. After trying out many, I found [browser-sync](https://www.browsersync.io/) more fascinating because of it’s complete packages. A stitch in time saves nine, that is Browser-sync in quote. 

>Browser-sync is awesomely fast, with incredible features for your use. Browser-sync allows you to also check your work preview simultaneously on different device, provided you are connected on the same network.

![Internal-UI-Interface](/engineering-education/getting-started-with-browser-sync/browsersync-dashboard.png)

In the above image, you will see different features, these are the awesome things browser-sync provides you. Install on your computer and enjoy seamless watch over your files. It also record your test URLs so you can push them back out to all devices with a single click.
I will give the steps to install browser-sync for linux. Other OS installation can be seen in their documentation [here](https://www.browsersync.io/docs)

### Linux Installation

The first step is to install Node.js on your computer
```
sudo apt install nodejs

```
After the installation, check the version of the installed node using the command below

```
node -v
```

Once you have successfully install node on your computer, let us get you started on how to install browser-sync.

```
npm install -g browser-sync
```
The above command will get browser-sync installed on your computer. After that, change directory to where your project file is located. Looking at the image below, the project file is located on my Desktop. So, I do a “cd Desktop/Vue project” in my terminal. This take me to the Desktop directory of my computer and inside the Vue project folder.

![Change-directory](/engineering-education/getting-started-with-browser-sync/cd.png)

Next thing to do is run the command below:

```
browser-sync start --server --directory --files "*"
```
The above command calls for browser-sync and request for a server start, then the --directory --files tells the server to watch over the files in the directory. Including the “*” means, watch over any changes I make in to any file in this directory/folder.

Using Browser-sync for dynamic sites when you are already running a local server (i.e Xampp) with PHP or a similar scripting language, the process is very similar to server mode although will require to run BrowserSync in proxy mode. This can be done using the command below:

```
browser-sync start --proxy "localhost/hotel" --files "*"
```
*Where localhost/hotel is the URL of your local server.*

Before going to the next step, I will discuss briefly on ***Server & Proxy Server***

### Server & Proxy Server
_A server_ is a software or hardware device that accepts and responds to requests made over a network. 
This simply put, since your project is yet to be hosted on a live server(internet). On the Internet, the term "server" commonly refers to the system that receives requests for a web files or data and sends those files back to the client (your computer). 
In this regard, your computer serves as a local server that recieves requests and fetch your web files.

_Proxy Server_ act as the gateway between you and the internet. It’s an intermediary server separating end users from the websites they browse.

If you look back at your previous command, it sounds like this: hey _browser-sync_ please _start_ a _server_ in this _directory_ and make request for all the _files_ for me. If I make any change, update it and show me how it looks like :smile: 

***Next Step***
The image below has a "**/*" instead of the single asterisk "*" used in the first command, reason is: after using the first command (browser-sync start --server --directory --files "*") 
 and you switch off your computer or close the terminal, or the working environment and all. To get a complete syncchronization and watch over your files again, you have to use “**/*”.

 ![Watching-over-your-files-again](/engineering-education/getting-started-with-browser-sync/watching-files.png)

 Did you notice that each url has both internal and external urls. That is the power of Browser-sync.

 Your files are ready and has been served. After the above command, the next interface you will see is similar to the one below

 ![running-browser-sync](/engineering-education/getting-started-with-browser-sync/final-interface.png)

Click on the index file to see your project.

### Features of Browser-sync
1. Live reloading: This is probably the most important feature of BrowserSync. Immediately your code is changed, the page is auto-reloaded across all connected devices.
2. Interaction synchronization: All your actions are mirrored across every browser. This little feature is useful for testing, especially, when testing across many devices.
3. Simulate slower connections: Browser-sync has a feature that you can use to throttle your website connection speed. Some countries are not fortunate enough to have fast internet connection, so browser-sync is buil to work on slower network
4. URL history: BrowserSync logs all browsing history so you can push a test URL to all devices.
5. Compatibility: BrowserSync is compatible with many task runners like GULP and Grunt and it is cross platform enabled.


### Conclusion

This is a little out of what Browser-sync has to offer. BrowserSync definitely improves development speed... To find out more about what you can do with BrowserSync, check out their detailed [documentation](https://www.browsersync.io/docs).


Thank you for reading.

