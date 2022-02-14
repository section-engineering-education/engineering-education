---
layout: engineering-education
status: publish
published: true
url: /end-to-end-speech-recognition-guide-in-python/
title: End-to-End Speech Recognition Guide in Python
description: This tutorial will help the reader understand what speech recognition is, the use cases, and different APIs that help us with recognizing speeches. Also, we will be implementing a simple Python program to recognize sounds.
author: jose-yusuf
date: 2022-02-08T01:00:00-00:52
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/end-to-end-speech-recognition-guide-in-python/hero.png
    alt: End-to-End Speech Recognition Guide in Python Hero Image
---
Speech recognition is the process of enabling computers to identify and transcript appropriately from human voices or any other sounds. Speech is the best and most widely used means of communication in the world. People rely on it to pass messages to one another for first-hand information.
<!--more-->
Companies like Google have made work easier by implementing [Cloud Speech-to-Text](https://cloud.google.com/speech-to-text) to convert speech to text. Through this, speech recognition has helped us save time from typing things. It has also given us an easy way to interact and communicate with our devices without having to write a line of code.

Companies like [Amazon-Alexa](https://developer.amazon.com/en-US/alexa) use speech recognition for easy navigation to their products. Speech recognition has helped the disabled, children, and visually impaired to interact with their system efficiently since no GUI is needed.

When building a Python application, one needs to incorporate speech recognition in their work to allow easier interaction between the user and the system providing better accessibility.

Let's learn more about speech recognition - how it works, applications that use speech recognition, and simple implementation in Python to recognize speeches.

### Table of contents
- [Prerequisites](#prerequisites)
- [Working principle of speech recognition](#working-principle-of-speech-recognition)
- [Packages in speech recognition](#packages-in-speech-recognition)
- [Application of speech recognition](#application-of-speech-recognition)
- [Open-source project for speech to text](#open-source-project-for-speech-to-text)
- [Conclusion](#conclusion)

### Prerequisites
For one to understand this tutorial better, the reader needs to have the following:
- A good understanding of [Machine learning](https://www.w3schools.com/python/python_ml_getting_started.asp).
- Basic knowledge in [Python programming](https://www.w3schools.com/python/default.asp).
- Have [Jupyter notebook](https://jupyter.org/install) installed and know how to use it.
- Have [Python](https://www.python.org/downloads/release/python-372/) installed on a machine.

### Working principle of speech recognition
Speech recognition was first developed in Bell Labs, in the year 1952. Three researchers developed the system `Audrey` that uses a single speaker for digit recognition - the evolution continued, and more inventions were developed. Now, speech recognition comes built-in with many packages that can understand many languages.

The speech recognition working principle entails converting speech to electrical signals using a microphone. The signals are digitized to digital data that can be understood by the machine. After digitizing, many models have been used to translate the audio data to text data.

The modern speech recognition relies on [Hidden Markov Model](https://the-learning-machine.com/article/ml/hidden-markov-models) approach (HMM) which works on the assumption that speech signal when viewed on a short timescale (like 10 milliseconds), it appears to be a stagnant process - meaning there is no change in the waves patterns. The HMM is used in finding temporal patterns and improving accuracy.

As a programmer, let's not worry about the working principles of speech recognition, since numerous services working with speech recognition are available free online for developers than APIs. One just needs to install the package to start recognizing sounds.

### Packages in speech recognition
Since the implementation of speech recognition, there are several packages available that deal with the speech exists on Python manager [PyPI](https://pypi.org).

We will have a look at a few of them:
- [Apiai](https://pypi.org/project/apiai/)
- [SpeechRecognition](https://pypi.org/project/SpeechRecognition/)
- [CMU sphinx](https://cmusphinx.github.io/)
- [wit](https://pypi.org/project/wit/)
- [Google-cloud-speech](https://pypi.org/project/google-cloud-speech/)
- [watson-developer-cloud](https://pypi.org/project/watson-developer-cloud/)
- [pocket sphinx](https://pypi.org/project/pocketsphinx/)
- [Assembyai](https://pypi.org/project/assemblyai/)

The speech recognition package works the best when dealing with or developing a speech recognition application.

Packages like `Apiais` offer additional functionalities for NLP (Natural Language Processing) that are used for identifying the intent of speakers.

`CMU sphinx` designed with low resource platforms does focus on some fieldwork application creation.

Google Cloud speech offers speech to text messaging.

In addition, speech recognition offers simple audio processing and easy microphone accessibility.

We will use the SpeechRecognition package for the following reasons:
- Saves audio data into an audio file.
- Simple understandable results.
- Speech can be recognized easily by a microphone.
- Gives an easy way to translate audio files.

### How to implement speech recognition
#### Installation
Run the command to install the speech recognition package:

```bash
pip install speechrecognition
```

Install `PyAudio` for accessing the microphone from the device using the command below:

```bash
pip install pyaudio
```

Check the version of installed speech recognition using the command below:

```python
import speech_recognition as sp
print(sp.__version__)#sp is how you have assigned the variable
```

#### Building the recognizer class
To set the conversion of audio data to text data, we will focus on the `Recognizer` class.

The importance of setting the recognizer class is to create an environment (object) for speech to be recognized in our application.

Run the command below to set the recognizer class:

```python
recognizer = sp.Recognizer()
```

#### Setting the threshold value
The threshold value is a value that determines the loudness of an audio file.

To determine the energy threshold of an audio file, consider the ideal energy of audio files which is equivalent to `300` (recommended by `SpeechRecognition` library), and works best within that limit when dealing with the audio files.

When working on audio data, increasing the energy threshold does nothing but only improves speech recognition. When values exceed the energy threshold of `300`, we consider them to be speech.

However, when they go below that barrier, they are deemed silent or no speech is found.

To set the threshold, we run the command below:

```python
recognizer.energy_threshold = 300
```

#### Speech recognition methods
The methods below are used for recognizing speech from the audio data using different APIs:

- `recognize_houndify()` - Houndify by SoundHound.
- `recognize_ibm()` - [IBM speech-to-text](https://speech-to-text-demo.ng.bluemix.net/).
- `recognize_sphinx()` - [CMU Sphinx](https://cmusphinx.github.io/) (works after installing PocketSphinx).
- `recognize_google()` - Google web speech API.
- `recognize_google_cloud()` - Google Cloud Speech (need to install google-cloud-speech package).

The `recognize_sphinx()` can work offline with the CMU Sphinx engine. But, other functions require a stable internet connection.

Google has a free API `recognize_google()` method, that runs on its own without the help of any API. One disadvantage in that is, it gives a limit when trying to process audio files that take a long time during processing.

#### Processing audio
When processing an audio file, due to the wrong data type format of the audio file, there are chances of error to occur.

For this, the audio file should be processed as shown below:

```python
import speech_recognition as sp

# get audio from the microphone
data = sp.Recognizer()
with sp.Microphone() as start:
    print("speak up!")
    audio = data.listen(start)

# write audio to a WAV file
with open("microphone-results.wav", "wb") as f:
    f.write(audio.get_wav_data())
```

You can find the code [here](https://replit.com/@Joseyusuf/audio-processing#main.py).

#### Audio conversion

```python
import speech_recognition as sr
recognizer = sr.Recognizer()
audio_file_ = sr.AudioFile("audio_myfile.wav")#input the name of your audio file to be processed "myfile.wav".
```

This code converts audio to audio data with help of `record()`.

```python
#specify the source of the audio data to be converted.
with audio_file as start:
  audio_file = recognizer.record(start)
  recognizer.recognize_google(audio_data = audio_file)
```

Parameters used in `record` include:

##### Duration
Duration is the time taken for an action to start or complete. It is used in speech recognition to specify the time taken when working with audio data.

For example, the line code states that "I like traveling and nature walk". Let's say that, the sentence must be read in 6 seconds (when it's not possible to read in 6 seconds). Thereby, we restrict the speech recognition to a specific duration using the code below:

```python
with audio_file_ as start:
  audio_file = recognizer.record(source, duration = 0.06)#specify the duration in seconds 0.06
  result = recognizer.recognize_google(audio_data=audio_file)
print(result)
```

**Output:**

```bash
"I like traveling"
```

##### Offset
Offset is used to crop audio data.

For example, when you want to listen to the audio for 3 seconds, you set the offset to be 3.

```python
with audio_file_start:
  audio_file = recognizer.record(start, offset=3.0)
  result = recognizer.recognize_google_cloud(audio_data = audio_file)
print(result)
```

**Output:**

```bash
"and nature walk"
```

### Open-source project for speech to text
#### DeepSpeech
This is an open-source embedded speech-to-text engine that runs on real-time devices with higher power GPU servers to those with less power like Raspberry. Mostly exists and runs on pre-trained machine models.

For further information, you can read [here](https://deepspeech.readthedocs.io/en/v0.8.2/).

#### SpeechRecognition
SpeechRecognition is also an open-source project having several engines and APIs that are freely available offline.

For more information, read [this](https://pypi.org/project/SpeechRecognition/).

#### Leon
Leon is an open-source project that lives on a server and performs some tasks as directed by the users. It can as well be configured to operate offline as well.

For documentation, read [this](https://getleon.ai).

#### Wav2letter
Developed by Facebook researchers that work on end-to-end auto-switch speech recognition.

More information can be found [here](https://github.com/flashlight/wav2letter).

#### Espnet
Espnet is an end-to-end speech processing toolkit that covers text to speech, speech translation, spoken language, and the rest.

For more information, read [this](https://espnet.github.io/espnet/).

Few other open-source projects include:
- [wenet](https://wenet-e2e.github.io/wenet/)
- [Annyang](https://github.com/TalAter/annyang)
- [Dragon fire](https://3c5.com/XBByt)
- [speech py](https://pypi.org/project/SpeechRecognition/)

### Conclusion
After going through this article, you will get to know what speech recognition is, where it is used in real life, and it's working principles as well.

Furthermore, you will gain knowledge on various open-source projects where you can configure and make your speech recognition application. Also, we have covered the implementation using one of the libraries in detail.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)