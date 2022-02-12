### Creating a YouTube Video Downloader using Python

### Introduction
YouTube is an internationally known website for sharing videos. When you use an online downloader to download a video or try to get it from a random website, you run the danger of your personal information being stolen. This task is incredibly straightforward, efficient, and safe when using the Python Tkinter module which gets the video directly from YouTube for you.

### Table of Contents
- [Creating a YouTube Video Downloader using Python](#creating-a-youtube-video-downloader-using-python)
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Requirements](#requirements)
- [Installations](#installations)
  - [Installing PyTube module](#installing-pytube-module)
  - [Install **Tkinter**](#install-tkinter)
- [Building the API/GUI](#building-the-apigui)
- [Creating the download function](#creating-the-download-function)
- [Conclusion](#conclusion)

### Requirements
To develop a video downloader, you should have;
- Prior and a better understanding of Python language
- Python package installed on your PC
- An editor of choice
- Internet connection for API testing
- **Tkinter** which is a Python module for creating GUIs.
- **Pytube** which downloads the video from YouTube.

### Installations
 Requirements need to be ready before you start your development process. A Python environment is a foremost requirement for this project. You can follow [these directives](https://www.section.io/engineering-education/a-beginners-guide-to-python/) to make set-up a Python environment on your PC. A crucial module needs to be installed, which is the beginning of the development process.
#### Installing PyTube module
To install Pytube using `pip`, open your command prompt CLI on your machine and type in the following command.
```python

pip install PyTube
```
#### Install **Tkinter**
The same way you have used to install Pytube, the `pip` command is used to install any other Python module. Install Tkinter as shown below since it is required to develop the user interface.
```python

pip install Tkinter
```
If you get errors while installing, please check to ensure that your Python package is properly installed using the correct [defaults](https://www.python.org/about/gettingstarted/). Once it is successfully installed, you can start coding your API as instructed in the development section below.
### Building the API/GUI
In this section, you will design the interface for the application. Since the article is about downloading functionality, the interface will be simple with few features. If you want to add more features to your API and make it more appealing, you can refer to this [article](https://www.section.io/engineering-education/introduction-to-gui-in-python-using-tkinter/) to get more understanding of Tkinter GUI development. The following are the main steps to be followed.
1. **Import Libraries needed in the project**
After installing the modules, you need to import the libraries required in your application. Importing them allows them to act as a part of your project. Here is the right way to import them.
``` Python
# import all Tkinter libraries from the module
from Tkinter import * 
# From the  installed Pytube module, import the youtube library
from Pytube import YouTube 
```
2. Create the **API window** where all the UI features lie.
   
```python
root = Tk()
root.geometry('500 X 300') # Size of the window
root.resizable(0, 0) # makes the window adjustable with its features
root.title('youtube downloader')

root.mainloop()
```
When you run the code so far, an empty window is displayed with the title in the code above. The rest of the code will fall in between the `Tk()` and the `mainloop()`
3. **Create the link entry**
Here you will create an entry where you can paste your link. The code is as follows;
```Python
Label(root, text="Download Youtube videos for free", font='san-serif 14 bold').pack()
link = StringVar() # Specifying the variable type
Label(root, text="Paste your link here", font='san-serif 15 bold').place(x=150, y=55)
link_enter = Entry(root, width=70, textvariable=link).place(x=30, y=85)
```
After running the code, the window will appear as shown in the photo below which is not the final appearance.

![result](engineering-education/youtube-video-downloader-using-python/result.png)

4. Create the **download button**
The download button allows you to download the video by calling the download function in the next step. It only takes one line of code as shown in the code block below.
```python
Button(root, text='Download', font='san-serif 16 bold', bg='red', padx=2,command="download").place(x=100, y=150)
 
```
The command `download` is the attribute that initiates the download process when the button is pressed. It is called from the download function created below for getting the video from YouTube.

### Creating the download function
Up to this point, you have made an API where you can paste your link from youtube but the download button is not yet functional. To fetch the video using the URL, you will have to create a download function to be called by the download button. The code below is a python function titled `download` which reads the URL entered, connects to youtube, and downloads the video. The comments help you know the importance of every line of code and what it does. 
```python

def download():
    url = YouTube(str(link.get())) #This captures the link(url) and locates it from YouTube.
    video = url.streams.first() # This captures the streams available for downloaded for the video i.e. 360p, 720p, 1080p. etc.
    video.download() # This is the method with the instruction to download the video.
    Label(root, text="Downloaded", font="arial 15").place(x=100, y=120) #Once the video is downloaded, this label `downloaded` is displayed to show dowload completion.

```
To test your API, copy and paste a link from a YouTube video, then click the download button. The video is saved in your project folder when you are logged into a network. The completed GUI is seen in the image below. 

![](engineering-education/youtube-video-downloader-using-python/final.png)

### Conclusion
To this point, you have successfully constructed a youtube video downloader application in Python in this tutorial. For rendering graphics, you have used the well-known Tkinter package. You have used the Pytube library, which creates a fully functional GUI, to fetch videos from Youtube.

I hope you find this tutorial helpful.
