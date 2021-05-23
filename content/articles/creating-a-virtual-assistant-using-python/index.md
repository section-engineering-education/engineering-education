---
layout: engineering-education
status: publish
published: true
url: /creating-a-virtual-assistant-using-python/
title: Creating a Virtual Assistant using Python
description: This article will take the reader through creating a virtual assistant using Python. A virtual assistant, also called an AI assistant or digital assistant, is an application program that understands natural language voice commands and completes tasks for the user.
author: aransiola-ayodele
date: 2021-05-04T00:00:00-16:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/creating-a-virtual-assistant-using-python/hero.jpg
    alt: Virtual Assistant Image Example
---
Virtual assistants are Artificial Intelligent based programs. They are a smart computer program that understands human natural languages through voice commands or text and performs tasks for the user. This article will guide you through the process of creating your own voice assistant through the use of a Python library.
<!--more-->
For this tutorial, I will be writing the code on Pycharm IDE by Jetbrains.

PyCharm is an integrated development platform for computer programming, with an emphasis on the Python programming language. JetBrains, a Czech company, built it. Click [here](https://www.jetbrains.com/pycharm/download/) to download Pycharm.

After downloading and installing Pycharm, launch the application and click on the file menu, then select new project. A pop-up message will ask you for your project's name. Kindly give it a desired name, but for this article, we will give our project the title “vitualBot”.

The project will load. Once loading is complete, clear the automated content in the "main.py" file to have a clean screen for your code.

### What does a virtual assistant do?
1. It listens for your command.
2. It responds to your command with either a success or failure response.

For this article, 3 Python libraries will be used, they include:
1. Python Speech Recognition: Recognition speech is the act of translating spoken words into text. Python supports many speech recognition engines such as Google Speech Engine, Microsoft Bing Voice Recognition, and many others.

This library translates audio signal into a computer-readable format. Typically, this is a spectrogram. It's a three-dimensional graph with time on the x-axis, frequency on the y-axis, and color representing strength.

To use the Python speech recognition library, click this [link](https://pypi.org/project/SpeechRecognition/) and you should see the page as shown in the image below. 

Copy the text circled in red.

![Speech Recognition library download page](/engineering-education/creating-a-virtual-assistant-using-python/python-speech.png)

Paste what you copied in the terminal and click enter. The package will be installed. Once this first package is installed, we need the second package, which is:

2. Python Text To Speech v3 (Pyttsx3): This library is a text-to-speech conversion library in Python. This library works offline and it is also compatible with Python version 2 and 3.

This package can be downloaded [here](https://pypi.org/project/pyttsx3/). Copy the command found on the website and paste it in the terminal just as you did with the first library.

![Python text to speech library download page](/engineering-education/creating-a-virtual-assistant-using-python/pyttsx3.png)

Once you have successfully installed the second package, we will continue to install the third package.

3. Python Audio (PyAudio): PyAudio allows you to quickly play and record audio on a number of devices using Python. Download the package [here](https://pypi.org/project/PyAudio/). Install the package using the steps used in 1 above.

![Python Audio library download page](/engineering-education/creating-a-virtual-assistant-using-python/pyaudio.png)

### Note
For Linux users, you might encounter an error when installing Pyaudio. 

Follow the steps to fix the error:

1. Install ***portaudio*** modules using this command:

```bash
sudo apt-get install libasound-dev
```

2. Download the portaudio archive from this [Link](http://files.portaudio.com/download.html)

3. Unzip the archive using:

```bash
tar -zxvf [filename portaudio.tgz]
```

4. Enter the directory of the unzipped portaudio file, then run:

```bash
./configure && make
```

5. Once that is successful, install it by using this command:

```bash
sudo make install
```

6. Finally, install pyaudio:

```bash
pip install pyaudio
```

We have successfully installed the three libraries. 

Now, let's give our Virtual assistant life!!!

```python
# import the library needed for the virtual assistant

import speech_recognition as assistance
import pyttsx3

# now, let us obtain voice input from the microphone
listener = assistance.Recognizer()

# the next line is to initiate the pttsx3 library
engine = pyttsx3.init()

# let's take voice from our microphone and use our microphone as source
with assistance.Microphone() as source:
    print("Say something...!")
    audio = listener.listen(source)

# recognize your speech using the Google Speech Recognizer
try:
    print("I heard you say " + listener.recognize_google(audio))
except assistance.UnknownValueError:
    print("Hey, I could not understand what you say")
except assistance.RequestError as e:
    print("Request from Google Speech Recognition failed; {0}".format(e))

#the engine will then repeat what you said before performing your command
engine.say(audio)
engine.runAndWait()

```

There are many things you can achieve with Python libraries. 

With the tutorial above, you should be able to dive more into making your virtual assistant smarter.

Thanks for reading.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)