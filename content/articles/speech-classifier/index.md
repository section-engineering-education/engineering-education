---
layout: engineering-education
status: publish
published: true
url: /speech-classifier/
title: Speech Classifier Using MFCC Features
description: This articles describes how to train a speech classifier using MFCC features.  
author: francisca-jeruto
date: 2022-01-29T00:00:00-18:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/speech-classifier/hero.jpg
   alt: Implementing GANs example image
---

A classifier is an algorithm that sorts data into categories or classes of information. Therefore, a speech classifier is a program that automatically classifies a set of input audio data.

<!-- more -->
### Packages to install
* numpy
* pandas
* os
* glob
* librosa
* keras
* python_speech_features
* mfcc
* numpy

### Introduction

Audio recognition is a supervised learning task where we input an audio signal and predict the text. Raw audio input cannot be used as an input because of the noise in the audio signal. By extracting features from the audio signal and then using them as input to the base model, we can produce a better performance than using raw audio directly as input.

MFCC is a widely used technique to extract the features from the audio signal. Before we proceed further, we should understand MFCC. It stands for Mel-frequency Cepstral Coefficients. These coefficients collectively make up an MFC (Mel-frequency cepstrum). The MFC is derived from a cepstral representation of the audio clip. It has frequency bands that approximate the human auditory system's response, allowing for a better representation of the sound.

Now that we know what an MFCC is and some of its features, let’s get to the how’s. The first thing we will do is collect audio data of different people or objects in WAV format. The MFCC function creates a feature matrix for an audio file in Python. It converts the audio data in WAV format into a matrix.

Other crucial packages that we are going to use are called `librosa`. This is because we get two channels whenever we read any audio signal, i.e. mono and stereo channels. The mono channel is one-dimensional, while the stereo channel is multi-dimensional. Some of the audio recorded is usually at a very high frequency. Librosa ensures that the audio recording frequency is kept a 21 kHz and normalizes the audio data so that we can see the data in a normalized form.

The data set that we will use has independent and dependent features. Independent features are extracted from the audio signal, and the dependent features are the class label names (i.e. which class it belongs to). An important thing to note is that `librosa` converts any audio data into only one channel (mono channel), a one dimension signal.

It is important to collect as many voice recordings as possible and append the feature matrix of each audio file in this matrix. This is going to act as our training data set.

### Let's code it

Since we have an idea of what we are building, it's time to get to the real stuff. Copy or type the following code.

```py
import os
```

We are going to list the files. Here you can write the name of your file in the brackets.

```py
filelist = os.listdir('30_speakers_train')
```
Next we are going to read them into `Pandas`.
```py
train_df = pd.DataFrame(filelist) 
```
Rename the column name to file
```py
train_df = train_df.rename({0:'file'})
```
Now we need to identify each speaker(the object you want to classify the data)
Create an empty list to append all speakers' ids for each row of the data.
```py
speaker = []
for i in range(0, len(df)):
    speaker.append(df['file'][i].split('-')[0])
```
Assign the speaker a new column
```py
train_df['speaker'] = speaker
```
Write a function to extract audio properties for each audio file. For this, we will use librosa.
```py
def extract_features(files):  
```
Set `pathname` to the location of the file on the computer.
```py
    file_name = os.path.join(os.path.abspath('30_speakers_train')+'/'+str(files.file))
```
Let sound file to be a floating-point time series and assign the default sample rate. The sample rate is set at 22050 by default.
```py
 x, sample_rate = librosa.load(file_name, res_type = 'kaiser_fast')
```
Generate the MFFCs from a time series
```py
 mfccs = np.mean(librosa.feature.mfcc(y=x, sr=sample_rate, n_mfcc=40).T,axis=0)
```
Generate a short_time fourier transform (STFT) to use in the chroma_stft
```py
 stft = np.abs(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T, axis = 0)
```
Compute a Mel-scaled spectrogram
```py
 mel = np.mean(librosa.feature.melspectrogram(X, sr=samplerate).T, axis = 0)
```
Compute the spectral contrast
```py
 contrast = np.mean(librosa.feature.spectral_contrast(S=stft, sr=sample_rate).T, axis = 0)
```
Compute the tonal centroid features (tonnetz)
```py
 tonnetz = np.mean(librosa.feature.tonnetz(y = librosa.effects.harmonic(X), sr=sample_rate).T, axis = 0)
return mfccs, chroma, mel, contrast, tonnetz
```
Apply the function to every audio file, then store that information. This will take some minutes or even hours.
```py
train_features = train_df.apply(extract_features, axis=1)
```
Set X_train to NumPy array
```py
X_train = np.array(features_train)
```
We need speaker ids for Y. We have the target data from our original data frames; hence we can get those values.
```py
y_train = np.array(train_df['speaker'])
y_val = np.array(val_df['speaker'])
```
We have to hot encode y for use in the neural network. For this, we have to import LabelEncorder from sklearn and import to_categorical from keras which uses Tensorflow.
```py
from sklearn.preprocessing import LabelEncoder
from keras.utils.np_utils import to_categorical

lb = LabelEncoder()
y_train = to_categorical(lb.fit_transform(y_train))
y_val = to_categorical(lb.fit_transsform(y_val))
```
Time to build a neural network
```py
from keras.models import Sequential
from keras.callbacks import EarlyStopping
from keras.labels import Dropout, Flatten, Dense, Activation
```
Build a simple model with softmax and early stopping.
```py
model = Sequential()

model.add(Dense(193, input_shape = (193,), activation = 'relu'))
model.add(Dropout(0.1))

model.add(Dense(128, activation = 'relu'))
model.add(Dropout(0.25))

model.add(Dense(128, activation = 'relu'))
model.add(Dropout(0.5))

model.add(Dense(30, activation = 'softmax'))

model.compile(loss = 'categorical_crossentropy', metrics = ['accuracy'], optimizer = 'adam')

early_stop = EarlyStopping(monitor = 'val_loss', min_delta = 0, patience = 100, verbose = 1, mode = 'auto')
```
Now that we have the model, we will fit it with validation training data.
```py
history = model.fit(y_train, X_train, batch_size = 256, epochs = 100,

validation_data = (X_val, y_val),

callbacks = [early_stop])
```
Plot graph of training, validation data over epochs
```py
train_accuracy = history.history['accuracy']
val_accuracy = history['val_accuracy']
```
Set the figure size
```py
plt.fiugre(figsize = (12, 18))
```
Generate line plot of training, testing loss over epochs
```py
plt.plot(train_accuracy, label = 'Training Accuracy', color = '#185fad')
plt.plot(val_accuracy, label = 'Validation Accuracy', color = 'orange')
```
Set the title
```py
plt.title('Training and Validation Accuracy by Epoch', fontsize = 25)
plt.xlabel('Epoch)', fontsize = 18)
plt.ylabel('Categorical Crossentropy', fontsize = 18)
plt.xticks(range(0, 100, 5), range(0, 100, 5))

plt.legend(fontsize = 18);
```
And that's it.

MFCC is used because of some of its unique qualities, which include quantifying the gross shape of the spectrum, which is important in identifying vowels. It also removes fine spectral structure, which is not necessarily needed, hence focusing on the most informative signal.

However, the MFCC does have some issues. Some of these issues include a poorly motivated choice of perpetual scale. Another issue is that the performance of the MFCC in the presence of additive noise is not very good compared to other features. For example, the MFCCs usually work better in analysis but are problematic in synthesis.

### Conclusion
Building the sound classifier is easy by using the above-given steps. Once the data set is prepared, fit this data into any deep learning model used for classification to classify the voices of different objects/people.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
