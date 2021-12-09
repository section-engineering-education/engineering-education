### Introduction 
GIMP is an open-source image manipulation tool which many people use as a suitable solution as it competes with some corporate demands. GIMP is efficient in dealing with tangled elements such as layers and paths.

This article will show you how to use GIMP-Python, which is a collection of Python plug-ins that allow you to program in Python ands automate tasks in the GNU Image Manipulation Program (GIMP).

### Table of content
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Installation](#installation)
- [Choosing your substance](#choosing-your-substance)
- [Setting up the resize](#setting-up-the-resize)
- [Running the resize module script](#running-the-resize-module-script)
- [Setting up the picture change](#setting-up-the-picture-change)
- [Running the reestablished module script](#running-the-reestablished-module-script)
- [Running both on a folder](#running-both-on-a-folder)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Installation 
Both Gimp and Python can be installed and used at any time on `Mac OS`, `Linux`, and `Microsoft Windows`. You can use Python to create advanced modules for GIMP and run them on these stages. You can get the most recent version of GIMP [here] (http://www.gimp.org/downloads/).Having a suitable substrate in GIMP programming, the next thing to present is Python on your operating system. You can get the most recent version of Python here [here](https://www.python.org/downloads/). And follow the setup steps.

### Choosing your substance 
On the Windows, Python records go into your user's home GIMP folder. In my case, the location where I saved my `.py` file is `C://users/KENNEDY/App/DataRoaming/GIMP2.10/plug-ins`.
To get the Gimp 2.10 modules record in Windows 10 open File Explorer and enter the above pathway from your GIMP. Which is obtained by opening GIMP and tapping on `edit>preferences>folders>plug-ins` The figure below shows the strategy for getting the path.
[Plug-ins folder](/section-engineering/getting-started-with-python-plug-ins-for-gimp/plugins.png)
 Duplicate the highlighted path and paste it on your record explorer pathway. Make another text document in the open folder and save it as a `.py`  On Mac and Linux systems, that folder is at `~/.gimp-2.6/folder`.
There are 12 arguments required in your work register. You can read more about it [here] (http://www.expmedia.com/content/extending-gimp-python-python-fu-modules-region-2).You must use your Python script in conjunction with GIMP to add the module to one of the GIMP menus.Following that is a model.

```python
#!/usr/bin/python
From gimpfu import * # same for every modules 
def gimp_plugins(image, drawable): 
register( 
# name of the solicitation you bring from the request brief 
"python_fu_resize", 
# The framework program shows information about the module. 
"Saves the image at a most outrageous width and height", 
# The draftsman of the module 
"Kennedy Mwangi", 
# The plug-in's copyright holder. 
"Kennedy Mwangi", 
# The copyright end date 
"2021", 
# The menu name that the module livelihoods. 
"<Image>/Image/Resize to max ", 
# The procedure limits for the module 
"*",
[], 
[], 
gimp_plugins) 
main()
``` 

The `register()` system gives any data about your module. It has a few parameters that tell GIMP how to best display menu options for the modules and what Python method to use when you start your plug-ins.There is more data about the register technique's cutoff points on the python-Fu console,
- on windows research through `filters>python-Fu> console`.
Save your work in the `.\GIMP\2.10\plug-ins folder`. Start gimp in the command line to see any information that is printed out by your plug-ins. Click on your GIMP `picture` to see the refreshed `Resize to max` menu as displayed below.

![new menu](/section-engineering/getting-started-with-python-plug-ins-for-gimp/menu.png)

### Setting up the resize 
To resize your image, add the code under your `gimp plugins` method. 

```python
def gimp_plugins(image, drawable, maxheight=500, maxwidth=500): 

  # elementary calculations
currentWidth = drawable.width 
currentHeight = drawable.height 
newWidth = currentWidth 
newHeight = currentHeight 

if (maxwidth < newWidth): 
newWidth = maxwidth 
newHeight = (float(currentHeight)/(float(currentWidth)/newWidth)) 
if (maxheight < newHeight): 
newHeight = maxheight 
newWidth = (float(currentWidth)/(float(currentHeight)/newHeght)) 

# method to resize the image
pdb.gimp_image_scale(img, newWidth, newHeight)
```

`pdb.gimp_scale_image` is a procedure to resize the picture by doing some simple computations to see the expected additions of the scaled picture sizes. To check other alternative functions to call inside your Python script in GIMP, click `help>procedure Browser` 

### Running the resize module script 
After adding your picture, click on the `image>resize to max`. An interface will hop up like shown below to request the sizes (i.e., maximum width and maximum height)

  ![resize](/section-engineering/getting-started-with-python-plug-ins-for-gimp/resize.png)

 Set your maximum height and maximum width, then click the OK button. It executes, and your script resizes your picture.

### Setting up the picture change 
Since the file is saved as `.xcf` which is a GIMP saving technique, you can resuscitate the python record to save the picture in another picture format. It permits you to save the original image as a JPEG or PNG format, along with resize it to meet your specific needs.
```python
#!/usr/bin/python
from gimpfu import * # same for every modules 
def gimp_plugins(image, drawable, maxheight=500, maxwidth=500, savecopy=TRUE): 

  # elementary calculations
currentWidth = drawable.width 
currentHeight = drawable.height 
newWidth = currentWidth 
newHeight = currentHeight 
if (maxwidth > newWidth): 
newWidth = maxwidth 
newHeight = (float(currentHeight)/(float(currentWidth)/newWidth)) 
if (maxheight < newHeight): 
newHeight = maxheight 
newWidth = (float(currentWidth)/(float(currentHeight)/newHeght)) 

# method to resize the image
pdb.gimp_image_scale(img, newWidth, newHeight)

# saving the image as jpg
    if savecopy:
        pdb.file_jpeg_save(img, drawable, img.name+".jpg", img.name+".jpg",
                           0.9, 0, 0, 0, "", 0, 0, 0, 0)
```

Furthermore, you can get other functions to use to save your picture from the `procedure information base variable` (pdl) by utilizing GIMP's `Help > Procedure Browser`. As the image below shows, there are different ways to save your picture.

![Image Saving Methods](/section-engineering/getting-started-with-python-plug-ins-for-gimp/types.png)

### Running the reestablished module script 
After saving the picture as JPEG, you may run the plug-ins by opening a picture in GIMP and using the `Picture > Resize to max` menu item to obtain even more information. The animated limit input is depicted in the photo below.After that, you can run the plug-ins on all of the pictures in the folder.

![updated paremeter](/section-engineering/getting-started-with-python-plug-ins-for-gimp/update.png)

### Running both on a folder
Because of the non-smart cluster mode, GIMP awards you a call request line where you can utilize the request line highlights to manage all photographs in a folder utilizing standard novel cases (wildcards). In this event, the procedure for saving a picture as PNG can be passed into GIMP's party mode. However, this is significantly more difficult to do while considering the assessments for the size necessities.Accordingly, these modules clearly work on the two activities, so you can call them from a sinsle GIMP interest. Since your modules are working, and you tried them, the GIMP module has its own deals in GIMP's structure for information gathering. By going to the organized program `Help > Procedure Browser in GIMP` and outlining in the name you gave your plug-ins, you can see the sales for them. GIMP opens the image you've drawn, executes your request using the parameters you've specified, and then exits without saving any changes you've made to the original image.You might set up huge augmentation acclimations to a complete facilitator stacked with photographs by using the GIMP interest in non-sharp bundle mode.

Check out for the complete code [here](https://github.com/kmwangi-ken/python/blob/main/python/index.md)

### Conclusion
I trust this article has shown you the best understanding of Python plug-ins for GIMP and has been of help. It has fundamentally covered all the fundamental Python scripts by working lines of code and control. The codes are also simple to learn and investigate since they have remarks that assist you with recognizing what line of code is doing what.

In this article, you have figured out some method for making Python code that allows you to computerize two specific errands in GIMP; resizing pictures and saving them in different associations. Much appreciation to you.

### Further reading
[Top 10 Trending Python Projects On GitHub: 2020](https://analyticsindiamag.com/top-10-trending-python-projects-on-github-2020/)

Happy coding!