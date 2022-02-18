---
layout: engineering-education
status: publish
published: true
url: /speech-to-text-transcription-model-using-deep-speech/
title: Speech to Text Transcription Model using Deep Speech
description: In this tutorial, we will build a speech to text transcription model using the Deep Speech library.
author: francis-ndiritu
date: 2022-02-09T00:00:00-11:17
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/speech-to-text-transcription-model-using-deep-speech/hero.jpg
    alt: Speech to text example image
---
Speech-to-text models have made users more comfortable when using online voice services. Businesses can now use speech recognition models in their operations.
<!--more-->

Speech-to-text transcription is a subset of natural language processing that is used to convert speech to text. Speech may be in form of video or audio files. The model analyses the speech and converts it to the corresponding text.

A speech to text model is applied in various areas such as:
- Subtitle generation in audio and video files.
- Medical sector to convert spoken words to text.
- Online voice services. It is applied in businesses that use online customer support.
- Automatic generation of word documents. Using audio and producing word documents instead of typing.

Speech-to-text models have made users more comfortable when using online voice services. Businesses can now use speech recognition models in their operations.

In this tutorial, we will use the Deep Speech library to build the model. Deep Speech takes digital audio or video file as input and outputs text.

### Table of contents
- [Prerequisites](#prerequisites)
- [Types of transcription models](#types-of-transcription-models)
- [Getting started with Deep Speech](#getting-started-with-deep-speech)
- [Installing depencancies](#installing-depencancies)
- [Importing important packages](#importing-important-packages)
- [Adding model file paths](#adding-model-file-paths)
- [Initializing models](#initializing-models)
- [Simulating streaming audio](#simulating-streaming-audio)
- [Function to read the audio file](#function-to-read-the-audio-file)
- [Function to perform the transcription](#function-to-perform-the-transcription)
- [Downloading an audio file](#downloading-an-audio-file)
- [Playing the audio file](#playing-the-audio-file)
- [Calling the function](#calling-the-function)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this tutorial, a reader should:
- Be farmiliar with [Python programming](/engineering-education/python-projects-for-beginners/).
- Understand [machine learning models](/engineering-education/house-price-prediction).
- Use [Google Colab notebook](https://research.google.com/).

### Types of transcription models
In speech-to-text transcription, we have two types of models. Streaming transcription and batch streaming.

#### Streaming transcription
This is a type of transcription that deals with real-time audio or video files. In streaming transcription, it breaks the input audio into chunks. The model then outputs the transcribed text in real-time as the audio is processed. It is effective when you have live events and you want the transcribed text in real-time.

Streaming transcription can be applied in the following areas:
- Live podcasts, webinars, and videos.
- Live online events and teleconferencing.
- Real-time phone calls.

#### Batch streaming
This is a type of transcription that deals with offline audio and video files. It is best suitable when we have large recorded video and audio files. The model only produces the transcribed text when it has finished the processing. 

In this tutorial, we will be dealing with the streaming transcription for audio data.
### Getting started with Deep Speech
Deep Speech is a library used for speech-to-text transcription. Deep Speech library uses deep learning neural networks. It converts speech spectrograms into a text transcript. Deep Speech is built using [TensorFlow](https://www.tensorflow.org/) framework.
We install Deep Speech using the following command:

```bash
!pip install deepspeech==0.8.2
```
In the code above, we have installed Deep Speech version `0.8.2`.

Deep speech is made up of two pre-trained models that we have to download. It is made up of the Acoustic model and the Language model.

#### Acoustic model
It is a pre-trained model that converts the raw audio into a waveform or spectrogram. It analyses the spectrogram and converts it to its corresponding text transcripts. This is the model used for speech recognition.

To download the acoustic model, run this code:

```bash
!wget https://github.com/mozilla/DeepSpeech/releases/download/v0.8.2/deepspeech-0.8.2-models.pbmm
```

#### Language model
It is a pre-trained that is used to fine-tune and guide the acoustic model. It refines output text and makes sure it's valid. It checks for the grammar and contextual relationship of words in a sentence. This increases the accuracy of the transcription output.

To download the language model, run this code:

```bash
!wget https://github.com/mozilla/DeepSpeech/releases/download/v0.8.2/deepspeech-0.8.2-models.scorer
```
We also need to install some more dependencies.

### Installing depencancies
We will install the I/O libraries. The I/O libraries are used for cross-platform audio and video support. This will enable us to perform audio and video processing using any operating system.

For more information about these libraries, read this [documentation](https://packages.debian.org/buster/portaudio19-dev).

To install all the I/O libraries, use this code:

```bash
!apt install libasound2-dev portaudio19-dev libportaudio2 libportaudiocpp0 ffmpeg
```
The next step is to import the packages and functions we will use to build the transcription model.

### Importing important packages
To import the necessary packages and functions, use this code:

```python
from deepspeech import Model
import numpy as np
import os
import wave
from IPython.display import Audio
```
**Model** - It is the function used to initialize our downloaded pre-trained model. It will be used to initialize the downloaded acoustic model.

**numpy** - It is used to convert audio files into an array. It also performs mathematical computation on our audio file.

**os** - It enables us to interact with the operating systems. It will enable us to perform core operating functions while in the notebook

**wave** - This library enables us to read the `WAV` audio format.

**IPython.display** - This will enable us to display and play the audio file in the Google Colab notebook.

### Adding model file paths
We add the file path for the acoustic and language so that we can be able to use them.

```python
model_file_path = 'deepspeech-0.8.2-models.pbmm'
lm_file_path = 'deepspeech-0.8.2-models.scorer'
```
After adding the file paths, we also initialize the following.

```python
beam_width = 100
lm_alpha = 0.93
lm_beta = 1.18
```
In the code above `beam_width` is used to format our audio file to make it easy to use. The `lm_alpha` and `lm_beta` specifies the alpha and beta versions of our language model.

Next, let's now add the parameters above into our model.

#### Initializing models
We use the following code:

```python
model = Model(model_file_path)
model.enableExternalScorer(lm_file_path)

model.setScorerAlphaBeta(lm_alpha, lm_beta)
model.setBeamWidth(beam_width)
```
In the code above we have added the acoustic and language models so that we can begin using them. We have added the alpha and beta versions of our language model.

### Simulating streaming audio
The audio data will be broken into chunks. This simulates data being received from a real-time recording. This will enable us to achieve real-time transcription.

```python
stream = model.createStream()
```
The next step is to create a function used to read the audio file.

### Function to read the audio file
The function is created using the following code:

```python
def read_audio_file(filename):
 with wave.open(filename, 'rb') as w:
        rate = w.getframerate()
        frames = w.getnframes()
        buffer = w.readframes(frames)

 return buffer, rate
```
The function used is named `read_audio_file`. The audio file we will use in this model is a `WAV` audio format. `wave.open` method will be used to read the `WAV` audio files.

The function also specified the audio frame rate and the number of frames. This has been done using the `getframerate()` and `getnframes()` methods. The `buffer` variable will hold the final audio chunk.

We now need to create another function that will be used to perform the transcription.

### Function to perform the transcription
The function is created using the following code:

```python
def real_time_transcription(audio_file):
    buffer, rate = read_audio_file(audio_file)
    offset=0
    batch_size=8196
    text=''

 while offset < len(buffer):
      end_offset=offset+batch_size
      chunk=buffer[offset:end_offset]
      data16 = np.frombuffer(chunk, dtype=np.int16)

      stream.feedAudioContent(data16)
      text=stream.intermediateDecode()
 print(text)
      offset=end_offset
 return True
```
The function used is named `real_time_transcription`. We pass the `buffer` and `rate` as a parameter. We also add the `read_audio_file` function which is used to read the `WAV` audio file. We set the `batch_size=8196`, the batch size represents the size of the audio. One broken audio chunk will be 8196 bytes.

The function also has a `while` loop. The `while` loop is used to loop through the audio file. During each loop, it breaks the audio file into the required size (8196 bytes).

The `feedAudioContent` method feeds the audio chunks into the model for transcription. `intermediateDecode()` will decode the model output and produce the corresponding text. Finally, the function will return the results and print the transcribed text.

Before we call this function, we need to download a sample audio file that the model will use.

### Downloading an audio file
To download the audio file, use the following command:

```bash
!wget -O speech.wav https://github.com/EN10/DeepSpeech/blob/master/man1_wb.wav?raw=true
```
To see if the audio file has been added to our working directory, use this command:

```bash
!ls
```
The output is shown below:

![Dowloaded audio](/engineering-education/speech-to-text-transcription-model-using-deep-speech/added-audio.jpg)

From the image above,  the working directory has two models (acoustic and language model). It also shows the downloaded audio file saved as `speech.wav`.
### Playing the audio file
To play the audio file in Google Colab, use this code:

```python
Audio('speech.wav')
```
When we run this code, it will provide an interface that allows you to play the audio in Google Colab. The interface is shown below:

![Audio interface](/engineering-education/speech-to-text-transcription-model-using-deep-speech/audio-interface.jpg)

The interface has a play button that we can press and listen to audio. We will pass `speech.wav` as an argument when we call the `real_time_transcription` function.
### Calling the function
To call the `real_time_transcription` function, run this code:

```python
real_time_transcription('speech.wav')
```
This code will produce a text transcript in real-time. The output is shown below:

![Text transcription output](/engineering-education/speech-to-text-transcription-model-using-deep-speech/text-transcription.jpg)

From the output above we can see the model was able to do real-time transcription. The model produced an output bit-by-bit as the audio processing continued. The acoustic and language models produce an accurate transcription.

### Conclusion
In this tutorial, we have learned how to do a streaming transcription using Deep Speech. We discussed the types of transcription models. We explored the types of pre-trained Deep Speech models. We use the acoustic and language models to build a model that was able to do real-time transcription.

To access this notebook, click [here](https://colab.research.google.com/drive/16snySXh3E4dFyc6FSqpQhJi4I140YnSN?usp=sharing).

### References
- [Acoustic model](https://en.wikipedia.org/wiki/Acoustic_model#:~:text=An%20acoustic%20model%20is%20used,recordings%20and%20their%20corresponding%20transcripts.)
- [Language model](https://en.wikipedia.org/wiki/Language_model)
- [Types of transcrption models](https://www.cogitotech.com/blog/what-is-transcription-and-its-types)
- [Deep Speech Github](https://github.com/mozilla/DeepSpeech)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)