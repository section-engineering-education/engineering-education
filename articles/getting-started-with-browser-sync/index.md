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
Browser-sync is an automation tool that allows you to keep multiple browsers & devices in sync when building websites. It also provides a platform for fast network applications

>I've been trying out different local servers just to replace the hassle of using live servers. I found that [Browser-sync](https://www.browsersync.io/) was the best because it has so many useful features. A stitch in time saves nine which really sums it up.

>Browser-sync is awesomely fast, with incredible features you can use. Browser-sync allows you to preview your work simultaneously on different devices, provided you are connected to the same network.

![Internal-UI-Interface](/engineering-education/getting-started-with-browser-sync/browsersync-dashboard.png)

In the above image, you will see the awesome features Browser-sync provides. Install and enjoy it seamlessly watching over your files for changes. It also records your test URLs so you can push changes back out to all devices with a single click.

In this article, I will provide the steps to install Browser-sync for Linux. The instructions for other operating systems can be seen in their documentation [here](https://www.browsersync.io/docs)

  
### Linux Installation

The first step is to install Node.js on your computer

```bash

sudo apt install nodejs

```

After the installation, check the version of the installed node package using the command below

```bash

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

The above command calls for Browser-sync and requests the server to start, then the ```--directory --files``` part tells the server to watch over the files in the directory. Including the "*" means, watch over any changes I make into any file in this directory/folder.

Using Browser-sync for dynamic sites (when you are already running a local server (i.e Xampp) with PHP or a similar scripting language), the process is very similar. Although it will require to run Browser-sync in proxy mode. This can be done using the command below:

```bash

browser-sync start --proxy "localhost/hotel" --files "*"

```

*Where **localhost/hotel** is the URL of your local server.*

Before going to the next step, I will briefly discuss ***servers and proxy servers***

### Server & Proxy Server

_A server_ is a software or hardware device that accepts and responds to requests made over a network.

On the Internet, the term "server" commonly refers to the system that receives requests for web files or data and sends those files back to the client (your computer). Since your project is yet to be hosted on a live server (thus accessible over the internet), your computer serves as a local server that receives requests and fetches your web files.

A _Proxy Server_ acts as the gateway between you and the internet. It’s an intermediary server separating end users from the websites they browse.

If you look back at your previous command, it sounds like this: hey _browser-sync_ please _start_ a _server_ in this _directory_ and make a request for all the _files_ for me. If I make any changes, update it and show me how it looks like :smile:

***Next Step***

The image below has a "\*\*/*\*" instead of the single asterisk "\*" used in the first command, the reason is: after using the first command (browser-sync start --server --directory --files "*") and you switch off your computer or close the terminal, or the working environment and all. To get a complete synchronization and watch over your files again, you have to use “**/*”.

![Watching-over-your-files-again](/engineering-education/getting-started-with-browser-sync/watching-files.png)

Did you notice that each URL has both internal and external URLs? That is the power of Browser-sync.

Your files are ready and have been served. After the above command, the next interface you will see is similar to the one below

![running-browser-sync](/engineering-education/getting-started-with-browser-sync/final-interface.png)

Click on the index file to see your project.

### Features of Browser-sync

1. Live reloading: This is probably the most important feature of Browser-sync. Immediately after your code is changed, the page is auto-reloaded across all connected devices.

2. Interaction synchronization: All your actions are mirrored across every browser. This little feature is useful for testing, especially, when testing across many devices.

3. Simulate slower connections: Browser-sync has a feature that you can use to throttle your website connection speed. Some countries are not fortunate enough to have a fast internet connection, so browser-sync can simulate slower networks for testing purposes.

4. URL history: Browser-sync logs all browsing history so you can push a test URL to all devices.

5. Compatibility: Browser-sync is compatible with many task runners like Gulp and Grunt and it is cross-platform enabled.

### Conclusion

This is a little out of what Browser-sync has to offer. To find out more about what you can do with Browser-sync, check out their detailed [documentation](https://www.browsersync.io/docs).

Thank you for reading.