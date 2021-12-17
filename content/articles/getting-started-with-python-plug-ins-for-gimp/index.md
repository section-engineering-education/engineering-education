### Introduction 
GIMP is an open-source image manipulation tool that many people use as a viable alternative to some of the commercial offerings. GIMP is efficient in dealing with tangled elements such as layers and paths. It also supports several different image formats and comes with relatively complex filters.

This article is about using GIMP-Python, which is a set of Python modules that allow you to do programming in Python to automate commands in the GNU Image Manipulation Program (GIMP). These Python modules are wrappers around the `libgimp libraries`. GIMP-Python is different from the `Script-Fu extensions`. In Script-Fu, a plug-in is used to execute scripts. In GIMP-Python, the Python script takes center stage and does the work. You can instantiate the GIMP-Python scripts from inside GIMP itself, or you can use GIMP’s batch mode to start  them from the command line.

### Table of content
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Installation](#installation)
- [Choosing your substance](#choosing-your-substance)
- [Setting up the resize](#setting-up-the-resize)
- [Running the resize module script](#running-the-resize-module-script)
- [Setting up the picture change](#setting-up-the-picture-change)
- [Running the updated plug-in script](#running-the-updated-plug-in-script)
- [Running both on a folder](#running-both-on-a-folder)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Installation 
Both Gimp and Python can be installed and used at any time on `Mac OS`, `Linux`, and `Microsoft Windows`. You can use Python to create advanced modules for GIMP and run them on these operating systems. You can get the most recent version of GIMP [here] (http://www.gimp.org/downloads/). The next thing to install is Python on your operating system. You can get the most recent version of Python here [here](https://www.python.org/downloads/). And follow the setup steps.

### Choosing your substance 
On Windows, Python records go into your user's home GIMP folder. In my case, the location where I saved my `.py` file is `C://users/KENNEDY/App/DataRoaming/GIMP2.10/plug-ins`.

To get the Gimp 2.10 module records in Windows 10 open File Explorer and enter the above pathway from your GIMP. This is obtained by opening GIMP and tapping on `edit>preferences>folders>plug-ins` The figure below shows the strategy for getting the path.

![Plug-ins folder](/section-engineering/getting-started-with-python-plug-ins-for-gimp/plugins.png)

Duplicate the highlighted path and paste it on your file explorer pathway. Make another text document in the open folder and save it as a `.py`  On Mac and Linux systems, that folder is at `~/.gimp-2.6/folder`.

There are 12 arguments required in your work register. You can read more about it [here] (http://www.expmedia.com/content/extending-gimp-python-python-fu-modules-region-2). You must use your Python script in conjunction with GIMP to add the module to one of the GIMP menus. Following that is a model.

```python
#!/usr/bin/python
From gimpfu import * # same for every module 
def gimp_plugins(timg, tdrawable): 
register( 
# The name of the command that you can call from the command line or scripting
"python_fu_resize", 
# Information about the plug-in that displays in the procedure browser
"Saves the image at a maximum width and height",
# Help for the plug-in
"Saves the image at a maximum width and height", 
# The plug-in’s author
"Kennedy Mwangi", 
# The copyright holder for the plug-in
"Kennedy Mwangi", 
# The copyright end date 
"2021", 
# The label that the plug-in uses in the menu 
"<Image>/Image/Resize to max ", 
# The types of images the plug-in is made to handle 
"RGB*, GRAY*",
# The parameters for the plug-in’s method
[], 
# The results of the plug-in’s method
[], 
# The name of the method to call in your Python code
gimp_plugins) 
main()
``` 

The `register()` method gives GIMP information about your plug-in.

The `register()` method has several parameters that tell GIMP how to display menu options for the plug-in, and what Python method to call when you start the plug-in from the menu. After putting your values in the register method, save your script. Make sure that it is executable and is located in the `.gimp2-6/plug-ins folder`. With GIMP started, go to the `Image` menu where you can see the new `Resize to max` menu item as shown below.

![new menu](/section-engineering/getting-started-with-python-plug-ins-for-gimp/menu.png)

Now that your plug-in is registering itself properly with GIMP and you can click on a menu item for your plug-in, you are ready to proceed with adding the Python code for resizing the image.

### Setting up the resize 
To resize your image, add the code snippet below your `gimp plugins` method. 

```python
def gimp_plugins(timg, tdrawable, maxh=500, maxw=500):

    # elementary calculations
    currentWidth = tdrawable.width
    currentHeight = tdrawable.height

    newWidth = currentWidth
    newHeight = currentHeight

    if (maxw < newWidth):
        newWidth = maxw
        newHeight = (float(currentHeight) / (float(currentWidth) / newWidth))

    if (maxh < newHeight):
        newHeight = maxh
        newWidth = (float(currentWidth) / (float(currentHeight) / newHeight))

    # method to resize the image
    pdb.gimp_image_scale(timg, newWidth, newHeight)
```

The Python code simply calls the `pdb.gimp_scale_image` method to resize the image after doing some elementary calculations to find what the values of the scaled image sizes should be. Because the values put into the box are maximum values, the script needs to check both the width and height of the current image to see if the image’s dimensions need to be constrained. If either image dimension is larger than the maximum size, it sets the constrained dimension to the maximum size and then calculates the other dimension. 

### Running the resize module script 
After you add the code to perform the resize, open an image in GIMP. Click your new `Image > Resize to max` menu item. Your script asks us for the sizes as shown below.

  ![resize](/section-engineering/getting-started-with-python-plug-ins-for-gimp/resize.png)

 When you click OK, your `gimp_plugins` method executes and your script resizes your image.

### Setting up the picture change 
Now that you have the plug-in working to resize your image, you can update the Python script to also save the image in a different image format. This allows you to save the original image as a JPEG file as well as resize it to fit within certain constraints.

The new additions to the script are as shown below.
```python
#!/usr/bin/python
from gimpfu import * # same for every modules 
def gimp_plugins(timg, tdrawable, maxh=500, maxw=500, savecopy=TRUE): 

  
    currentWidth = tdrawable.width
    currentHeight = tdrawable.height

    newWidth = currentWidth
    newHeight = currentHeight

    if (maxw > newWidth):
        newWidth = maxw
        newHeight = (float(currentHeight) / (float(currentWidth) / newWidth))

    if (maxh > newHeight):
        newHeight = maxh
        newWidth = (float(currentWidth) / (float(currentHeight) / newHeight))

    
    pdb.gimp_image_scale(timg, newWidth, newHeight)

    # saving the image as jpg
    if savecopy:
        pdb.file_jpeg_save(timg, tdrawable, timg.name+".jpg", timg.name+".jpg",
                           0.9, 0, 0, 0, "", 0, 0, 0, 0)
```

You can get the name of the method to use from the procedure database `the pdb variable` by using GIMP’s `Help > Procedure Browser` as shown below.

![Image Saving Methods](/section-engineering/getting-started-with-python-plug-ins-for-gimp/types.png)

### Running the updated plug-in script 
After adding the new code to the Python script to save the image as a JPEG, you can execute the plug-in by opening an image in GIMP and using the `Image > Resize to max` menu item. You see the updated parameter input box as shown below.

![updated paremeter](/section-engineering/getting-started-with-python-plug-ins-for-gimp/update.png)

Now that you’ve made the script and tried it on some images, you can run the plug-in on all of the images in a folder.

### Running both on a folder
GIMP has a non-interactive batch mode that allows you to call GIMP commands from the command line. You can use the command-line feature to operate on all the images in a folder using standard wildcards. For instance, the method for saving the image as a JPEG can be passed directly into GIMP’s batch mode by using the command below.

```
gimp -i -b '(file-jpeg-save "Menu_006.png" 200 200 TRUE)' -b '(gimp-quit 0)'
```

However, this becomes a little more difficult to do when considering the calculations necessary for the size constraints. Therefore, this plug-in greatly simplifies both operations so you can call them from a single GIMP command.

Now that your plug-in is working and is registered in GIMP, the plug-in has its own command in GIMP’s procedure database. You can see the command for your plug-in by going to the procedure browser `Help > Procedure Browser in GIMP` and typing the name that you gave your plug-in. For example, if you named it `python_fu_resize` in the register method, you will find it in the GIMP procedure browser as python-fu-resize. You call this command as it’s shown in the GIMP Procedure Browser from the command line using the gimp command and the `-i -b` flags as shown below.

```
gimp -i -b '(python-fu-resize "myimage.png" 200 200 TRUE)' -b '(gimp-quit 0)'
```

GIMP opens the image you specified, executes your command using the parameters that you provide, and then quits without saving any modifications made to the original image. By using the GIMP command in the non-interactive batch mode, you can script large-scale modifications to an entire folder full of images.
The command shown below operates your new plug-in’s command on all Portable Network Graphics (PNG) images in a folder.

```
gimp -i -b '(python-fu-resize "*.png" 200 200 TRUE)' -b '(gimp-quit 0)'
```

Check out for the complete code [here](https://github.com/kmwangi-ken/python/blob/main/python/index.md)

### Conclusion
I hope this article has given you a better understanding of Python GIMP plug-ins. By using working lines of code and control, it has covered all of the basic Python scripts. The codes are also simple to learn and analyze since they include comments that help you identify which line of code is doing what.

In this article, we have figured out some methods for making Python code that allows you to automate two different tasks in GIMP; resizing pictures and saving them in different formats.

### Further reading
[Gimp Python Documentation](https://www.gimp.org/docs/python/index.html)

Happy coding!