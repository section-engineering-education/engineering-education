# Getting Started with Browser-sync


Browser-sync is an automation tool that makes your web development project faster. It makes your browser testing workflow faster by synchronising URLs, interactions and code changes across multiple devices, both internally and externally.

*I have been working with different local servers just to replace the hasle of live servers for your web app or web design testing but I got stucked with [browser-sync](https://www.browsersync.io/) because of it’s complete package. You get a time-saving synchronised browser testing.* 

Browser-sync is awesomely fast, with incredible features for your use. Browser-sync allows you to also check your work preview simultaneously on different device with a provided you are connected on the same network.
![Internal-UI-Interface](/engineering-education/getting-started-with-browser-sync/browsersync-dashboard.png)

In the above image, you will see different features, these are the awesome things browser-sync provides you. Install on your machine and enjoy seamless watch over your files. It also records your test URLs so you can push them back out to all devices with a single click.
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
The above command will get browser-sync installed on your computer. After that, change directory to where your project file is located. Looking at the image below, the project file is located on my Desktop. So, I do “cd Desktop/Vue project” this take me to the Desktop and inside the project folder.

![Change-directory](/engineering-education/getting-started-with-browser-sync/cd.png)

Next thing is to do is run the below command

```
browser-sync start --server --directory --files "*"
```
The above command calls for browser-sync and request for a server start, then the --directory --files tells the server to watch over the files in the directory. Including the “*” means, watch over any changes i make in to any file in this directory/folder.

If you look closer to the image below I used "**/*"
 after the command, reason is: after using the first command (browser-sync start --server --directory --files "*") 
 and you switch of your machine or close the terminal, working environment and all. To get a complete sync and watch over your files again, you have to use “**/*”.

 ![Watching-over-your-files-again](/engineering-education/getting-started-with-browser-sync/watching-files.png)

 Did you notice that each url has both internal and external urls. That is the power of Browser-sync.

 Your files are ready and has been served. After the above command, the next interface you will see is similar to the one below

 ![running-browser-sync](/engineering-education/getting-started-with-browser-sync/final-interface.png)

Click on the index file to see your project.

### Conclusion

As you work on your project, it automatically refresh your browser accross all the devices it is been displayed on.

Thank you for reading.

