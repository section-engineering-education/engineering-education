---
layout: engineering-education
status: publish
published: true
url: /engineering-education/creating-a-virtual-assistant-using-python/
title: Creating a Virtual Assistant Using Python
description: This article takes the reader through creating a virtual assistant using python. A virtual assistant, also called an AI assistant or digital assistant, is an application program that understands natural language voice commands and completes tasks for the user.
author: aransiola-ayodele
date: 2021-04-12T00:00:00-01:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/creating-a-virtual-assistant-using-python/hero.jpg
    alt: Virtual Assistant Image Example
---

A virtual assistant, also known as an AI assistant or a digital assistant, is a computer program that recognizes natural language voice commands and performs tasks for the user. This article guides you through the process of creating your own voice assistant through the use of a python library.

<!--more-->

For this tutorial, I will be writing the code on Pycharm IDE by Jetbrains.

PyCharm is an integrated development platform for computer programming, with an emphasis on the Python programming language. JetBrains, a Czech company, built it. Click [here](https://www.jetbrains.com/pycharm/download/) to download Pycharm.

After downloading and installing Pycharm, launch the application and click on the file menu, then select new project. You will get a pop-up message asking you for your project's name. Kindly give it a desired name, but for this article, we will give our project the title “vitualBot”.

The project will load. Once loading is complete, clear the automated content in the "main.py" file to have a clean screen for your code.

### What does a virtual assistant do?

1. It listens for your command
2. It responds to your command with either a success or failure response.

For this project, we need 3 python libraries, which include:

1. Python Speech Recognition: Speech recognition is the process of translating spoken words to text. Google Speech Engine, Google Cloud Speech API, Microsoft Bing Voice Recognition, and IBM Speech to Text are only a few of the speech recognition engines and APIs that Python supports.

The first step in a speech recognition system is to translate the audio signal into a computer-readable format. Typically, this is a spectrogram. It's a three-dimensional graph with time on the x-axis, frequency on the y-axis, and color representing strength.

To use the Python speech recognition library, click this [link](https://pypi.org/project/SpeechRecognition/) and you should see the page as shown in the image below. Copy the text circled in red.

![Speech Recognition library download page](/engineering-education/creating-a-virtual-assistant-using-python/python-speech.png)

Paste what you copied in the terminal and click enter. The package will be installed. Once this first package is installed, we need the second package, which is:

2. Python Text To Speech v3(Pyttsx3): this library is a text-to-speech conversion library in Python. It works offline and is compatible with both Python 2 and 3.

This package can be downloaded [here](https://pypi.org/project/pyttsx3/). You will copy the command found on the website and paste in the terminal just as you have done to install the first library.
![Python text to speech library download page](/engineering-education/creating-a-virtual-assistant-using-python/pyttsx3.png)

Once you have successfully installed the second package, we will continue to install the third package called:

3. Python Audio (PyAudio): this library provides Python bindings for PortAudio, the cross-platform audio I/O library. PyAudio allows you to quickly play and record audio on a number of devices using Python. Download the package [here](https://pypi.org/project/PyAudio/). Install the package using the steps used in 1 above.
   ![Python Audio library download page](/engineering-education/creating-a-virtual-assistant-using-python/pyaudio.png)

### Note:

for Linux users, installing the Pyaudio, you might encounter an error when installing Pyaudio. Follow the steps to fix the error:

1. Install **_portaudio_** modules using this command:

```bash
sudo apt-get install libasound-dev
```

2. Download the portaudio archive from: [Link](http://files.portaudio.com/download.html)

3. Unzip the archive using:

```terminal
tar -zxvf [filename portaudio.tgz]
```

4. Enter the directory of the unzipped portaudio file, then run:

```terminal
 ./configure && make
```

5. Once that is successful, Install it by using this command:

```terminal
sudo make install
```

6. Lastly, install pyaudio:

```terminal
pip install pyaudio
```

We have successfully installed the three libraries. Now, let's get our Virtual assistant alive!!!

```python
# import the library needed for the virtual assistant

import speech_recognition as assistance
import pyttsx3

# now, let us obtain voice input from the microphone
listener = assistance.Recognizer()

# the next line is to initiate the pttsx3 library
engine = pyttsx3.init()

# let take voice from our microphone and use pur microphone as source
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

There are many things you can achieve with Python libraries. With the above tutorial, you should be able to dive more into making your virtual assistant more smarter.

Thanks for reading.
