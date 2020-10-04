
---

layout: engineering-education

status: review

published: false

url: /engineering-education/getting-started-with-browser-sync/

title: Getting Started with Browser-sync

description: The basic concept of browser-sync, installing browser-sync and using it serve your files while building a website project

author: aransiola-ayodele-leom

date: 2020-09-24T00:00:27-21

topic: [Browser-sync]

excerpt_separator: <!--more-->

images:

- url: /engineering-education/getting-started-with-browser-sync/hero.jpg

alt: Computers in a workspace displaying code

---
<<<<<<< HEAD
# Getting Started with Browser-sync
=======

# Getting Started with Browser-sync

>>>>>>> 872e5832c66ee31a22aaa2789d459dcbec2f79e8
Browser-sync is an automation tool that allows you to keep multiple browsers & devices in sync when building websites. It also provides a platform for fast network applications

>I've been trying out different local servers just to replace the hassle of using live servers. I found that [Browser-sync](https://www.browsersync.io/) was the best because it has so many useful features. A stitch in time saves nine which really sums it up.

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>Browser-sync is awesomely fast, with incredible features you can use. Browser-sync allows you to also check your work preview simultaneously on different devices, provided you are connected to the same network.
=======
>Browser-sync is awesomely fast, with incredible features for your use. Browser-sync allows you to also check your work preview simultaneously on different devices, provided you are connected to the same network.
>>>>>>> 872e5832c66ee31a22aaa2789d459dcbec2f79e8
=======
>Browser-sync is awesomely fast, with incredible features for your use. Browser-sync allows you to also check your work preview simultaneously on different devices, provided you are connected to the same network.
>>>>>>> parent of df9075d... Major readability revision
=======
>Browser-sync is awesomely fast, with incredible features for your use. Browser-sync allows you to also check your work preview simultaneously on different devices, provided you are connected to the same network.
>>>>>>> parent of df9075d... Major readability revision

![Internal-UI-Interface](/engineering-education/getting-started-with-browser-sync/browsersync-dashboard.png)

In the above image, you will see different features, these are the awesome things Browser-sync provides you. Install on your computer and enjoy a seamless watch over your files. It also records your test URLs so you can push them back out to all devices with a single click.

I will give the steps to install Browser-sync for Linux in this article. The steps for other OSes installation can be seen in their documentation [here](https://www.browsersync.io/docs)

  

### Linux Installation

The first step is to install Node.js on your computer

```bash

sudo apt install nodejs

```

After the installation, check the version of the installed node package using the command below

```

node -v

```

Once you have successfully installed the nodejs package on your computer, let’s get you started on how to install Browser-sync.

```bash

npm install -g browser-sync

```

The above command will get Browser-sync installed on your computer. After that, change the directory to where your project file is located. Looking at the image below, the project file is located on my Desktop. So, I do a ```cd Desktop/Vue project``` in my terminal. This takes me to the Desktop directory of my computer and inside the Vue project folder.

![Change-directory](/engineering-education/getting-started-with-browser-sync/cd.png)

  
The next thing to do is run the command below:

```bash

browser-sync start --server --directory --files "*"

```

The above command calls for Browser-sync and request for a server start, then the ```--directory --files``` tell the server to watch over the files in the directory. Including the “*” means, watch over any changes I make into any file in this directory/folder.

Using Browser-sync for dynamic sites when you are already running a local server (i.e Xampp) with PHP or a similar scripting language, the process is very similar to server mode although will require to run Browser-sync in proxy mode. This can be done using the command below:

```bash

browser-sync start --proxy "localhost/hotel" --files "*"

```

*Where **localhost/hotel** is the URL of your local server.*

  

Before going to the next step, I will discuss briefly on ***Server & Proxy Server***

  

### Server & Proxy Server

_A server_ is a software or hardware device that accepts and responds to requests made over a network.

On the Internet, the term "server" commonly refers to the system that receives requests for web files or data and sends those files back to the client (your computer). This simply put, since your project is yet to be hosted on a live server(internet). In this regard, your computer serves as a local server that receives requests and fetches your web files.

A _Proxy Server_ acts as the gateway between you and the internet. It’s an intermediary server separating end users from the websites they browse. [Read-more](https://www.varonis.com/blog/what-is-a-proxy-server/)

If you look back at your previous command, it sounds like this: hey _browser-sync_ please _start_ a _server_ in this _directory_ and make a request for all the _files_ for me. If I make any changes, update it and show me how it looks like :smile:

***Next Step***

The image below has a "\*\*/*\*" instead of the single asterisk "\*" used in the first command, the reason is: When next you want to work on your project after the first time, you will have to use this command ```browser-sync start --server --directory --files "**/*"``` to start the Browser-sync.

  

![Watching-over-your-files-again](/engineering-education/getting-started-with-browser-sync/watching-files.png)

<<<<<<< HEAD
Did you notice that each URL has both internal and external URLs? The internal URL will be used to access the project in your browser, while the external URL will be used to access the project on an external device. That is the power of Browser-sync.

  

  

![Watching-over-your-files-again](/engineering-education/getting-started-with-browser-sync/watching-files.png)

  
<<<<<<< HEAD
Did you notice that each URL has both internal and external URLs? 
The internal URL will be used to access the project in your browser, while the external URL will be used to access the project on an external device. That is the power of Browser-sync.
=======
  
=======
>>>>>>> parent of df9075d... Major readability revision
Did you notice that each URL has both internal and external URLs? That is the power of Browser-sync.
>>>>>>> parent of df9075d... Major readability revision

Your files are ready and have been served. After the above command, the next interface you will see is similar to the one below

![running-browser-sync](/engineering-education/getting-started-with-browser-sync/final-interface.png)

Click on the index file to see your project.

### Features of Browser-sync

1. Live reloading: This is probably the most important feature of Browser-sync. Immediately your code is changed, the page is auto-reloaded across all connected devices.

2. Interaction synchronization: All your actions are mirrored across every browser. This little feature is useful for testing, especially, when testing across many devices.

3. Simulate slower connections: Browser-sync has a feature that you can use to throttle your website connection speed. Some countries are not fortunate enough to have a fast internet connection, so browser-sync is built to work on a slower network

4. URL history: Browser-sync logs all browsing history so you can push a test URL to all devices.

<<<<<<< HEAD
<<<<<<< HEAD
5. Compatibility: Browser-sync is compatible with many task runners like [GULP](https://browsersync.io/docs/gulp) and [Grunt](https://browsersync.io/docs/grunt) and it is cross-platform enabled.
=======
5. Compatibility: Browser-sync is compatible with many task runners like GULP and Grunt and it is cross-platform enabled.
>>>>>>> parent of df9075d... Major readability revision
=======
5. Compatibility: Browser-sync is compatible with many task runners like GULP and Grunt and it is cross-platform enabled.
>>>>>>> parent of df9075d... Major readability revision

### Conclusion

This is a little out of what Browser-sync has to offer. To find out more about what you can do with Browser-sync, check out their detailed [documentation](https://www.browsersync.io/docs).

Thank you for reading.