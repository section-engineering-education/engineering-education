### Introduction 
GIMP is an open-source image manipulation tool which many people use as a suitable solution as it competes with some corporate demands. GIMP is efficient in dealing with tangled elements such as layers and paths. GIMP is aware of many coordinated picture associations and works with channels that are typically elaborate. GIMP has a solid foundation and philosophy, thus there isn't any technical info as to how to use or encourage GIMP in general.
This article will wind up being about how to utilize GIMP-Python, which is a party of Python modules that permit you to program in Python to mechanize undertakings in the GNU Image Manipulation Program (GIMP). These Python modules are generally covered for the libgimp library. GIMP-Python isn't generally so old as Script-Fu upgrades. To run scripts in Script-Fu, a module is used. The Python script changes into the overpowering characteristic of gathering in GIMP-Python and practices the work. You may run the GIMP-Python scripts clearly from GIMP, or you can use GIMP's group mode to start it from the sales line.
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
Both gimp and python can be installed and used at any time in `Mac OS`, `Linux`, and `Microsoft Windows`. You can use Python to create advanced modules for GIMP and run them on these stages.
GIMP is an open-source image editing tool that many folks use as a personal choice rather than as part of professional commitments, making it simpler to show on your device. You can get the most recent version of GIMP [here](http://www.gimp.org/downloads/).
Having a suitable substrate in GIMP programming, the next thing to present is Python on your operating system, as demonstrated by the bearing on the python documentation. Python's latest recent translation is available [here](https://www.python.org/downloads/). To ensure that python has been properly installed on your operating system, open the command line and run `python - version` to see the latest recently introduced python version in your OS. 
### Choosing your substance 
On the Windows stage, Python files go in your user’s home GIMP folder. For my situation it's`C:\Users\KENNEDY\AppData\Roaming\GIMP\2.10\plug-ins` the place where I have saved my `.py` file 
Note that framework modules are a mysterious coordinator; henceforth, to get to Gimp 2.10 modules file in Windows 10 open File Explorer and enter the above path from your GIMP. You can get the above path by opening your GIMP, tapping on `edit>preferences>folders>plug-ins` The figure under shows the strategy for getting the file path.

![Plug-ins folder](/section-engineering/getting-started-with-python-plug-ins-for-gimp/plugins.png) 

The picked path above is for `system modules`, and the other is for `user modules` duplicate the selected modules and paste it on your file explorer pathway. Make another text document in the open coordinator and save it as `.py` On Mac and Linux structures, that coordinator is `~/.gimp-2.6/modules`. 
The Python script records should in like manner be executable and have the Python mediator on the fundamental line, like the standard substance affirmations under. 
There are 12 arguements to the register work you may felt that they are clarified [here] (http://www.expmedia.com/content/extending gimp-python-python-fu-modules region 2). You are required to enlist your python script all together GIMP to add the modules in one of the GIMP menus. Coming up next is a model 
```python
#!/usr/compartment/python 
From gimpfu import * # same for every module 
def gimp_plugins(image, drawable): 
register( 
# name of the solicitation you bring from the request brief 
"python_fu_resize", 
# The framework program shows information about the module. 
"Saves the image at the most outrageous width and height", 
# The draftsman of the module 
"Kennedy Mwangi", 
# The plug-in's copyright holder. 
"Kennedy Mwangi", 
# The copyright end date 
"2021", 
# The menu name that the module livelihoods. 
"<Image>/Image/Resize to max", 
# The procedure limits for the module 
[ 
(PF_FILE, "infile", "Way for input archive", ""), 
(PF_DIRNAME, "save-way", "Way for yield filename", ""), 
], 
# The eventual outcomes of the modules technique 
[], 
gimp_plugins) 
main()
``` 
The `register()` system gives any data about your module. It has a few ways that show menu choices for the modules and what python technique to call when you start your modules. There is more data about the register technique's cutoff points on the python-Fu console, 
- on GIMP research through `filters>python-Fu>Console` then, at that point, compose the accompanying order below.

```python
import gimpfu 
help(gimfu.register) 
```
Save your script in the `.\GIMP\2.10\plug-ins` folder. Start gimp in the command line to see any information that is printed out by your modules. From your, GIMP click `picture` to see the refreshed `Resize to max` menu as displayed below.

![new menu](/section-engineering/getting-started-with-python-plug-ins-for-gimp/menu.png)
### Setting up the resize 
To resize your image, add the code under in your `gimp_plugins` method after a potent python modules appear in GIMP.
```python
def gimp_plugins(image, drawable, maxheight=500, maxwidth=500): 
currentWidth = drawable.width 
currentHeight = drawable.height 
newWidth = currentWidth 
newHeight = currentHeight 
in the event that (maxwidth < newWidth): 
newWidth = maxwidth 
newHeight = (float(currentHeight)/(float(currentWidth)/newWidth)) 
in the event that (maxheight < newHeight): 
newHeight = maxheight 
newWidth = (float(currentWidth)/(float(currentHeight)/newHeght)) 
```
`pdb.gimp_scale_image` is a procedure to resize the picture straightforwardly by doing some simple computations to see the expected additions of the scaled picture sizes. To investigate changed frameworks to call inside your python script in GIMP, click `help>procedure Browser`. 
### Running the resize module script 
After you add the code to play out the resize, open a picture in GIMP by tapping on `file>open a layer>select your picture from your record explorer>drag and drop in your GIMP work area`. 
Directly following adding your picture click on the `image>resize to max` menu, an interface will hop up as shown under to request the sizes (i.e Maximum Width and Maximum Height)
  ![resize](/section-engineering/getting-started-with-python-plug-ins-for-gimp/resize.png)

Coming about to setting your maximum_height and maximum_width click the OK button the `plug_main` method. It executes and your substance resizes your picture. 
### Setting up the picture change 
Since the file you have saved is in `.xcf` which is a GIMP saving game plan, you can resuscitate the python record to save the picture in another picture plan. It permits you to save the original image as a JPEG or PNG format, along with resizing it to meet your specific needs. 
```python
#!/usr/repository/python 
from gimpfu import * 
def gimp_plugins(image, drawable, maxheight=500, maxwidth=500, savecopy=TRUE): 
currentWidth = drawable.width 
currentHeight = drawable.height 
newWidth = currentWidth 
newHeight = currentHeight 
on the off chance that (maxw > newWidth): 
newWidth = maxwidth 
newHeight = (float(currentHeight)/(float(currentWidth)/newWidth)) 
```
Furthermore, you can get the name of the system to use from the `procedure information base variable` (pdl) by utilizing GIMP's `Help > Procedure Browser`. The figure under shows the various ways you can save your picture.
![ways of saving image..](/section-engineering/getting-started-with-python-plug-ins-for-gimp/types.png) 

`gimpfu library` offers predictable utilized for the limit input type which you can get by running the solicitation under the python console in GIMP. 
```python
import gimpfu 
help(gimpfu) 
```
The parameters begin with PF_ and represent information types that can be used for data structure controls.
### Running the reestablished module script 
After exporting the picture as JPEG, you may run the module by opening a picture in GIMP and using the `Picture > Resize to max` menu item to obtain even more info box. The animated limit input is depicted in the photo below.
![updated paremeter](/section-engineering/getting-started-with-python-plug-ins-for-gimp/update.png)

After which, you can run the plug-ins on all of the pictures in a folder.
### Running both on a folder
Because of the non-smart cluster mode, GIMP awards you to call the request line where you can utilize the request line highlights to manage all photographs in a coordinator utilizing standard novel cases(wildcards). On this event, the procedure for saving a picture as PNG can be passed surely into GIMP's party mode. Notwithstanding, this is altogether harder to do while thinking about the assessments for the size necessities. Accordingly, these modules clearly work on the two activities, so you can call them from a sinsle GIMP interest. Since your modules are working, and you tried them, the GIMP module has its own deals in GIMP's structure informational gathering. By going to the organized program `Help > Procedure Browser in GIMP` and outlining in the name you gave your modules, you can see the sales for them. GIMP opens the picture you illustrated, executes your request utilizing the limits that you give, and starts there on stops without saving any developments made to the fundamental picture. You might set up huge augmentation acclimations to a complete facilitator stacked with photographs by using the GIMP interest in non-sharp bundle mode.

Check out for the complete code [here](https://github.com/kmwangi-ken/python)

### Conclusion
Trust this article has shown you the best philosophy with python modules for GIMP and it has been of help. It has fundamentally covered all the fundamental python scripts by working line of codes and control. The codes are besides simple to learn and investigate since they have remarks which assist you with recognizing what line of code is doing what.
In this article, you have figured out some method for making Python code that allows you to computerize two specific errands in GIMP; resizing pictures and saving them in different associations. Much appreciation to you.
### Further reading
[Treading python projects on GitHub 2020](https://analyticsindiamag.com/top-10-trending-python-projects-on-github-2020/)

Happy coding!