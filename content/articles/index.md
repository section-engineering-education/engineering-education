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

Let's start with a brief history of speech recognition, first implemented in Bell Labs in 1952. Three researchers developed the system `audrey` that uses a single speaker digit recognition, the evolution continued, and more inventions developed. To date, speech recognition has the capability of understanding numerous languages.

The speech recognition working principle entails converting speech to electrical signals by a microphone. The signals are digitized to digital data that can be understood by the machine. When the digitization process completes, several models can now be used to translate the audio data to text data.

The modern speech recognition relies on [Hidden Markov Model](https://3c5.com/kvIar) approach (HMM) which works on the assumption that speech signal when patterned or viewed on a short timescale like 10 milliseconds it appears to be a stagnant process, meaning there is no change on the waves patterns. The model can be used to find a temporal pattern in speech and improve accuracy.

As a programmer let's not worry about the working principles of speech recognition that much since more recognition services are available for online users than as APIs.

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

Among these packages, SpeechRecognition seems to be the best when implementing speech recognition. Packages like wit and apiai offer additional functionality for natural language processing(NLP) used for identifying the intent of the speaker and this goes beyond speech recognition. CMU sphinx tools are designed for low-resource platforms and focus on practical application development. Google Cloud Speech offers only speech-to-text conversation. SpeechRecognition offers easy audio processing and microphone accessibility.

For this matter, we will use the SpeechRecognition package for a number of the following reasons:

- Makes easy translation of audio files.
- Easy speech recognition from microphone.
- Allows for saving audio data into audio files.
- Simple understandable results.

### Application of speech recognition

To install SpeechRecognition run the command below:

```bash
pip install speechrecognition
```

Install PyAudio for accessing the microphone from the device using the command below:

```bash
pip install pyaudio
```

Check the version of SpeechRecognition installed using the command below:

```python
import speech_recognition as sr
print(sr.__version__)
```

After installation we will discuss the following:

#### 1. Setting recognizer class

There are many SpeechRecognition libraries but we will majorly focus on the Recognizer Class for conversation of audio_data to text files. The reason for setting Recognizer Class is to recognize speech in our application or project you are working on. To set recognizer class we use the command below:

```bash
recognizer = sr.Recognizer()
```

#### 2. Setting the threshold value

The threshold value is a value that determines the loudness of an audio file. To set the energy threshold value of an audio file, consider the ideal energy of audio files which is equivalent to 300 where SpeechRecognition recommends, and work best within that limit when dealing with audio files.

The energy_threshold does nothing but only improves recognition of speech when working with audio data. when values are higher than the limit of energy threshold that is 300, then we start to consider it as speech while when they are lower they are considered are silent or no speech. To set the threshold we run the command below:

```bash
recognizer.energy_threshold = 300
```

#### 3. Speech Recognition Functions

The Functions below are used for recognizing speech from the audio data when using different APIs.

- `recognize_houndify()`: Houndify by SoundHound
- `recognize_ibm()`: [IBM Speech](https://speech-to-text-demo.ng.bluemix.net/) to Text
- `recognize_sphinx()`: [CMU Sphinx](https://cmusphinx.github.io/) – requires installing PocketSphinx
- `recognize_google()`: Google Web Speech API
- `recognize_google_cloud()`: Google Cloud Speech – requires installation of the google-cloud-speech package.

The recognize_sphinx() has benefits as it can work offline with the CMU Sphinx engine. The other requires a stable internet connection.

Google offers API recognize_google() function that is free, it also does not require any API key for its use. It has one advantage in that it gives a limit when trying to process audio files that take a long time during processing.

#### 4. Audio Preprocessing

During this process, one can get an error due to the wrong data type format for the audio file. For this reason one can need to process the audio file as shown below:

```python
import speech_recognition as sr

# get audio from the microphone
data = sr.Recognizer()
with sr.Microphone() as source:
    print("speak up!")
    audio = data.listen(source)

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
with audio_file as source:
  audio_file = recognizer.record(source)
  recognizer.recognize_google(audio_data = audio_file)

type(audio_file)
```

Parameters in recording include:

- Duration.
- Offsets.

##### a.) Duration

Duration is used when you want to specify the time of the audio data you are working with for example if you want to set it for 6 seconds of the entire audio streamline so we set the audio duration to 0.6. For example, the line code states that "I like traveling and nature walk" Let say that in 6 seconds the sentence cannot be read in that duration then:

```python
with audio_file_ as source:
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
with audio_file_ as source:
  audio_file = recognizer.record(source, offset=3.0)
  result = recognizer.recognize_google(audio_data = audio_file)
```

```output
# output
"and nature walk"
```

You will have a clear sound, but due to the environment, you may experience some unclear sound because of background noise or the device being unclear.

### Open source project for speech to text

- DeepSpeech

DeepSpeech is an open-source embedded speech-to-text engine that runs in real-time on devices from Raspberry PI4 to higher-powered GPU servers. Deepspeech mostly runs on pre-trained machine models based on Baidu's Deep Speech research paper and its implementation using TensorFlow. For more information [here](https://3c5.com/MlNHQ).

- SpeechRecognition

SpeechRecognition is also an open-source project having several engines and APIs available online and offline mode. For it's documentation [here](https://3c5.com/NtXly).

- Leon

Leon is a personal assistant open source project that is live on a server and performs tasks as directed by the user. It can as well be configured to operate offline as well. For documentation [here](https://3c5.com/ToRtb).

- Wav2letter

Wav2letter was made by Facebook AI researchers, works on end-to-end automatic speech recognition. More information[here](https://github.com/flashlight/wav2letter).

- Espnet

Espnet is an end-to-end speech processing toolkit that covers text to speech, speech translation, spoken language, and the rest. for more information[here](https://espnet.github.io/espnet/).
Other open source projects includes: [wenet](https://wenet-e2e.github.io/wenet/), [Annyang](https://github.com/TalAter/annyang), [Dragon fire](https://3c5.com/XBByt), [speech py](https://pypi.org/project/SpeechRecognition/), and more others.

### Conclusion

After going through this article, you will get to know what SpeechRecognition, where SpeechRecognition has been used in real life, and its working principles as well. Furthermore, you will gain knowledge on open-source projects where you can configure and make your SpeechRecognition application.
