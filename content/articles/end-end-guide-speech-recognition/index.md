### End-to-End SpeechRecognition Guide in Python

### Table of contents

- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Working principle of speech recognition](#working-principle-of-speech-recognition)
- [Packages in speech recognition](#packages-in-speech-recognition)
- [Application of speech recognition](#application-of-speech-recognition)
- [Open source project for speech to text](#open-source-project-for-speech-to-text)
- [Conclusion](#conclusion)

### Prerequisites

For one to understand this tutorial better, the reader needs to have basic knowledge in the following areas:

- [Machine learning skill](https://www.w3schools.com/python/python_ml_getting_started.asp)
- [Python programming skills](https://www.w3schools.com/python/default.asp)
- [Jupyter Notebook](https://jupyter.org/install) installed and how to use it.
- [Python](https://www.python.org/downloads/release/python-372/) installed on a machine

### Introduction

Speech Recognition is the process of enabling computers to identify and respond appropriately to human voices or other sounds. Speech is the best and widely used means of communication in the world. People rely on it to pass messages to one another for first-hand information.

Companies like Google have made work easy by implementing [Google-cloud-speech](https://3c5.com/VnuYg) for converting speech to text. Through this, speech recognition has helped us in time-saving since no typing is needed. It has also given us an easy way of interacting and communicating with our devices without writing a line of code.

Companies like [Amazon-Alexa](https://3c5.com/xYaZu) use speech Recognition for easy navigation to their products. Speech recognition has helped the disabled, children, and visually impaired to interact with their system efficiently since no GUI is needed.  

When building a Python application, one needs to incorporate Speech Recognition in their work for easy interaction between the user and the system and better accessibility. Let's consider the discussion below in this tutorial of the speech recognition guide.

### Working principle of speech recognition

Speech recognition was first developed in Bell Labs, in the year 1952. Three researchers developed the system `audrey` that uses a single speaker digit recognition, the evolution continued, and more inventions developed. Up to date speech recognition has many packages that can understand many languages.

The speech recognition working principle entails converting speech to electrical signals by a microphone. The signals are digitized to digital data that can be understood by the machine. After the process of digitization, many models have been used to translate the audio data to text data.

The modern speech recognition relies on [Hidden Markov Model](https://3c5.com/kvIar) approach (HMM) which works on the assumption that speech signal when patterned or viewed on a short timescale like ten milliseconds it appears to be a stagnant process, meaning there is no change on the waves patterns. The hidden Markov model is used in finding temporal patterns and improving accuracy.

As a programmer let's not worry about the working principles of speech recognition that much since numerous services working with speech recognition are available free online for developers than APIs. One just needs to install the package and start writing speech recognition programs.

### Packages in speech recognition

Speech recognition since its implementation, there are many many packages available that deal with the speech that exists on [PYPI](link) we will have a look at a few of them that are listed below:

- [Apiai](https://pypi.org/project/apiai/)
- [SpeechRecognition](https://pypi.org/project/SpeechRecognition/)
- [CMU sphinx](https://cmusphinx.github.io/)
- [wit](https://pypi.org/project/wit/)
- [Google-cloud-speech](https://pypi.org/project/google-cloud-speech/)
- [watson-developer-cloud](https://pypi.org/project/watson-developer-cloud/)
- [pocket sphinx](https://pypi.org/project/pocketsphinx/)
- [Assembyai](https://pypi.org/project/assemblyai/)

The speech recognition package seems to be the best when dealing with or developing a speech recognition application. Packages like Apiais offer some extra functionalities for NLP(Natural Language Processing) that are used for identifying the intent of speakers and this is no longer available in speech recognition. CMU sphinx designed with low resource platforms only does focus on some fieldwork application creation. Google Cloud speech offers speech to text messaging. In addition, speech recognition offers simple audio processing and easy microphone accessibility.

For this matter, we will use the SpeechRecognition package for a number of the following reasons:

- Saves audio data into an audio file.
- Simple understandable results.
- Speech can be recognized easily by a microphone.
- Gives an easy way to translate audio files.

### How to implement speech recognition

Run the command to install speech recognition:

```bash
pip install speechrecognition
```

Install PyAudio for accessing the microphone from the device using the command below:

```bash
pip install pyaudio
```

Check the version of installed speech recognition using the command below:

```python
import speech_recognition as sp
print(sp.__version__)#sp is how you have assigned the variable
```

After installation we will discuss the following:

#### 1. Building the recognizer class

To set the conversion of audio_data to text_data we will major in the Recognizer Class library. The main importance of setting the recognizer class is to create an environment for speech to be recognized in our application projects. Run the command below to set the recognizer class:

```bash
recognizer = sp.Recognizer()
```

#### 2. Setting the threshold value

The threshold value is a value that determines the loudness of an audio file. To determine the energy threshold of an audio file, consider the ideal energy of audio files which is equivalent to 300 where SpeechRecognition recommends, and work best within that limit when dealing with audio files.

When working with audio data of a file, increasing the energy threshold does nothing but only improves speech recognition. When values exceed the energy threshold of 300, we consider them to be speech, however, when they go below that barrier, they are deemed silent or no speech. To set the threshold we run the command below:

```bash
recognizer.energy_threshold = 300
```

#### 3. Speech Recognition Methods

The methods below are used for recognizing speech from the audio data when using different APIs.

- `recognize_houndify()`: Houndify by SoundHound
- `recognize_ibm()`: [IBM Speech](https://speech-to-text-demo.ng.bluemix.net/) to Text
- `recognize_sphinx()`: [CMU Sphinx](https://cmusphinx.github.io/) – works after installing PocketSphinx
- `recognize_google()`: Google Web Speech API
- `recognize_google_cloud()`: Google Cloud Speech – need to install google-cloud-speech package.

The recognize_sphinx() has benefits as it can work offline with the CMU Sphinx engine. The other requires a stable internet connection.

Google has a free API recognize_google() method, that runs on its own without the help of any API. It has one disadvantage in that it gives a limit when trying to process audio files that take a long time during processing.

#### 4. Processing of audio

When processing an audio file, an error can be developed. The error message or information can rise due to the wrong data type format of the audio file. For this, the audio file should be processed as shown below:

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

Access code [here](https://replit.com/@Joseyusuf/audio-processing#main.py).

#### 5. Audio processing code

```python
import speech_recognition as sr
recognizer = sr.Recognizer()
audio_file_ = sr.AudioFile("audio_myfile.wav")#input the name of your audio file to be processed "myfile.wav".
type(audio_file)
```

converts audio to audio data with help of record.

```python
#specify the source of the audio data to be converted.
with audio_file as start:
  audio_file = recognizer.record(start)
  recognizer.recognize_google(audio_data = audio_file)

type(audio_file)
```

Parameters in recording include:

- Duration.
- Offsets.

##### a.) Duration

Duration is the time taken for an action to start or complete. It is used in speech recognition to specify the time taken when working with audio data. For example, the line code states that "I like traveling and nature walk" Let say that in 6 seconds the sentence cannot be read in that duration then:

```python
with audio_file_ as start:
  audio_file = recognizer.record(source, duration = 0.06)#specify the duration in seconds 0.06
  result = recognizer.recognize_google(audio_data=audio_file)
```

```output
# output
"I like traveling"
```

##### b.) Offset

Offset is used to cut some seconds at the beginning of audio data. For example, when you want to listen for 3 seconds the only thing to do is to set the offset parameter to 3.

```python
with audio_file_start:
  audio_file = recognizer.record(start, offset=3.0)
  result = recognizer.recognize_google_cloud(audio_data = audio_file)
```

```output
# output
"and nature walk"
```

You will have a clear sound, but due to the environment, you may experience some unclear sound because of background noise or the device being unclear.

### Open source project for speech to text

- DeepSpeech

This is an open-source embedded speech-to-text engine that runs on real-time devices with higher power GPU servers to those with less power like Raspberry. Mostly exists and runs on pre-trained machine models. For more research [here](https://3c5.com/MlNHQ).

- SpeechRecognition

SpeechRecognition is also an open-source project having several engines and APIs that are free and available offline mode. For more information [here](https://3c5.com/NtXly).

- Leon

Leon is an open-source project that lives on a server and many platforms online and performs some tasks as directed by the users. It can as well be configured to operate offline as well. For documentation [here](https://3c5.com/ToRtb).

- Wav2letter
Developed by Facebook researchers that work on end-to-end auto-switch speech recognition. More information[here](https://github.com/flashlight/wav2letter).

- Espnet

Espnet is an end-to-end speech processing toolkit that covers text to speech, speech translation, spoken language, and the rest. for more information[here](https://espnet.github.io/espnet/).
Other open source projects includes: [wenet](https://wenet-e2e.github.io/wenet/), [Annyang](https://github.com/TalAter/annyang), [Dragon fire](https://3c5.com/XBByt), [speech py](https://pypi.org/project/SpeechRecognition/), and more others.

### Conclusion

After going through this article, you will get to know what SpeechRecognition, where SpeechRecognition has been used in real life, and its working principles as well. Furthermore, you will gain knowledge on open-source projects where you can configure and make your SpeechRecognition application.
