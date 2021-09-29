---
layout: engineering-education
status: publish
published: true
url: /machine-learning-for-audio-classification/
title: Machine Learning for Audio Classification
description: This tutorial will help readers understand how to classify audio using machine learning and TensorFlow.
author: willies-ogola
date: 2021-09-29T00:00:00-05:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/machine-learning-for-audio-classification/hero.png
    alt: Machine Learning for Audio Classification Example Image
---
Machine learning can be used in pitch detection, understanding speech, and musical instruments, as well as in music generation. For our case, we shall use machine learning for audio classification.
<!--more-->
Machine learning has shown exemplary results when evaluating the environment using pictures. However, this field has not been fully exploited in audio classification. 

This is because sound can give us a nondirectional perspective, unlike a camera. Sound does not depend on illumination. This means that you can hear the sound the same way no matter if it's day or night.

Nevertheless, converting sound waves into audio and spectrograms (visual representation of frequencies) can allow us to use machine learning capabilities. 

Machine learning for audio can be used in pitch detection and music generation. For our case, we'll use it for classification. 

An excellent example of an audio classification problem is when a machine has to determine whether the audio is speech or music.

This tutorial introduces you to Machine Learning for audio classification and some of the associated theories. 

We will also implement an audio classification task using TensorFlow.

### Table of contents
- [Differences between sound and audio](#differences-between-sound-and-audio)
- [What is a spectrogram?](#what-is-a-spectrogram)
- [Implementing audio classification using TensorFlow](#implementing-audio-classification-using-tensorflow)
- [Wrapping up](#wrapping-up)

### Prerequisites
You need to have:
- Domain knowledge in sound and audio.
- Intermediate Python programming skills.
- An understanding of [TensorFlow](https://www.tensorflow.org/) and [Scikit-learn](https://scikit-learn.org/stable/).
- A [Kaggle](https://www.kaggle.com/) account.

### Differences between sound and audio
Sound is what you hear. It's a vibration that propagates as an acoustic wave. Unique properties of sound include frequencies, speed, amplitude, and direction. 

When talking about the primary usage of machine learning in this domain, only frequency and amplitude are the essential features. 

Sound waves can often be simplified to sinusoidal waves. A sinusoidal wave shows us how the amplitude of a variable changes with time. We use a microphone to capture and convert sound to its electronic representation.

Audio is the electronic representation of sound. The audio frequencies that humans can hear range from 20Hz to 20 kHz. 

Frequencies below 20Hz and above 20KHz are inaudible for humans because they are either low or too high. 

These samples, over time, result in a waveform. Currently, we cannot apply machine learning to such waveforms.

### What is a spectrogram?
The diagram below shows a spectrogram:

![Spectrogram](/engineering-education/machine-learning-for-audio-classification/spectrogram.png)

*[Image Source: ResearchGate](https://www.researchgate.net/figure/Spectrograms-and-Oscillograms-This-is-an-oscillogram-and-spectrogram-of-the-boatwhistle_fig2_267827408)*

A [spectrogram](https://pnsn.org/spectrograms/what-is-a-spectrogram) is a visual representation of all frequencies over time. 

The Y-axis is the frequency in hertz, while the X-axis represents time. The color represents the magnitude or amplitude. 

The color in a spectrogram is either brighter or higher and expressed in decibels (unit of measure).

We can convert a waveform to a spectrogram. Technically, this is equivalent to an image. Researchers have found that we can effectively apply computer vision techniques to the spectrogram. 

This means that we can analyze sound with the same methods used to classify images. 

A machine learning model can, therefore, extract the dominant audio per time frame in a waveform by finding patterns in the spectrogram. 

However, in this tutorial, we won't be using a spectrogram to find patterns. We'll use a library known as Librosa to help us achieve this task.

Now that you know a little more about audio and machine learning can be used to classify it. Let's implement an audio classification task using TensorFlow. 

### Implementing audio classification using TensorFlow
We will use the [UrbanSound8K dataset](https://www.kaggle.com/chrisfilo/urbansound8k) available on Kaggle. 

This dataset contains 8,732 labeled sound excerpts of urban sounds from ten classes. These ten classes include `air_conditioner`, `car_horn`, `children_playing`, `dog_bark`, `drilling`, `engine_idling`, `gun_shot`, `jackhammer`, `siren`, and `street_music`.

[Librosa](https://librosa.org/doc/latest/index.html) is an open-source python package for music and audio analysis. The library can give us the data and the sampling rate. 

In this context, the sample rate is the number of samples per second of audio. By default, Librosa mixes all audio to mono and resamples them to 22050 Hz at load time. 

This plays a vital role in audio classification since different sounds have different sample rates.

### Exploratory data analysis (EDA)
We begin by installing Librosa using the following command: 

```bash
pip install librosa
```

Next, we install other required dependencies, as shown below:

```python
import pandas as pd
import os
import librosa
import librosa.display
import numpy as np
import IPython.display as ipd
import matplotlib.pyplot as plt
%matplotlib inline
```
### Loading dataset from Kaggle
We now need to load our external data on Kaggle into Google Colab.

**Step 1:** Head over to your Kaggle account and download your `Kaggle API token`. You'll find it in the API section. When you click on the `Create New API Token` button, a kaggle.json file will be generated and downloaded to your computer.

**Step 2:** Upload the downloaded `kaggle.json` file to your Colab project.

**Step 3:** Update the `KAGGLE_CONFIG_DIR` path to the current working directory, as shown:

> You get your current working directory by typing `!pwd` on the terminal.

```bash
os.environ['KAGGLE_CONFIG_DIR'] = "/content"
```

**Step 4:** Run the following Kaggle API to download datasets:

```bash
!kaggle datasets download -d chrisfilo/urbansound8k
```
After downloading the datasets, run the command below to unzip them:

```bash
!unzip urbansound8k.zip
```

### Experimenting with one audio file
Let's use a random audio file of children playing, `100263-2-0-121.wav`, from our dataset folder for analysis. 

```python
file_name='fold5/100263-2-0-121.wav'

audio_data, sampling_rate = librosa.load(file_name)
librosa.display.waveplot(audio_data,sr=sampling_rate)
ipd.Audio(file_name)
```

Librosa gives us both the `audio_data` and `sampling_rate`. Let's have a look at the results for one sample audio file:

```python
audio_data
```

```bash
array([-0.00270751, -0.00303302, -0.00159557, ..., -0.0012889 ,
       -0.00184731, -0.00210062], dtype=float32)
```
In mono, there is only one signal. So, our `audio_data` results show that Librosa has converted the audio into integers with only one dimension. 

if it was stereo, we'd have two signals and which would have been a 2D array. Although we won't use stereo signals in our tutorial, it is important to know that stereo sound is usually preferred in audio. 

It gives us a sense of directionality, perspective, and space. Librosa simplifies these signals into mono for easier processing.

```python
sampling_rate
```

```bash
22050
```

By default, Librosa gives us a sampling rate of 22050.

We will now use the Pandas library to read our csv file:

```python
audio_dataset_path='/content/'
metadata=pd.read_csv('UrbanSound8K.csv')
metadata.head()
```
We load the `UrbanSound8K.csv` file available in our downloaded dataset folder. We then store it in a variable known as `metadata`. 

Next, we use the `head()` method to view the first 20 files in our dataset.

```bash
    slice_file_name     fsID    start   end     salience    fold    classID     class
0   100032-3-0-0.wav    100032  0.000000    0.317551    1   5   3   dog_bark
1   100263-2-0-117.wav  100263  58.500000   62.500000   1   5   2   children_playing
2   100263-2-0-121.wav  100263  60.500000   64.500000   1   5   2   children_playing
3   100263-2-0-126.wav  100263  63.000000   67.000000   1   5   2   children_playing
4   100263-2-0-137.wav  100263  68.500000   72.500000   1   5   2   children_playing
5   100263-2-0-143.wav  100263  71.500000   75.500000   1   5   2   children_playing
6   100263-2-0-161.wav  100263  80.500000   84.500000   1   5   2   children_playing
7   100263-2-0-3.wav    100263  1.500000    5.500000    1   5   2   children_playing
8   100263-2-0-36.wav   100263  18.000000   22.000000   1   5   2   children_playing
9   100648-1-0-0.wav    100648  4.823402    5.471927    2   10  1   car_horn
10  100648-1-1-0.wav    100648  8.998279    10.052132   2   10  1   car_horn
11  100648-1-2-0.wav    100648  16.699509   17.104837   2   10  1   car_horn
12  100648-1-3-0.wav    100648  17.631764   19.253075   2   10  1   car_horn
13  100648-1-4-0.wav    100648  25.332994   27.197502   2   10  1   car_horn
14  100652-3-0-0.wav    100652  0.000000    4.000000    1   2   3   dog_bark
15  100652-3-0-1.wav    100652  0.500000    4.500000    1   2   3   dog_bark
16  100652-3-0-2.wav    100652  1.000000    5.000000    1   2   3   dog_bark
17  100652-3-0-3.wav    100652  1.500000    5.500000    1   2   3   dog_bark
18  100795-3-0-0.wav    100795  0.191790    4.191790    1   10  3   dog_bark
19  100795-3-1-0.wav    100795  13.059155   17.059155   1   10  3   dog_bark
```
We see that the audio files are all stored in `.wav` file format for audio files. They are also organized in their respective file classes.

Our dataset should not be imbalanced. We perform a quick check to make sure it isn't using the command below:

```python
metadata['class'].value_counts()
```

```bash
street_music        1000
air_conditioner     1000
jackhammer          1000
engine_idling       1000
drilling            1000
children_playing    1000
dog_bark            1000
siren                929
car_horn             429
gun_shot             374
Name: class, dtype: int64
```
The results show that most of the classes in the dataset are balanced. Thus, this would be a good dataset to use.

Now that we are done with EDA, we've figured that this data is in its raw format. We need to preprocess this data to extract meaningful features. 

We'll then use these extracted features for training instead of using the data in its raw form.

### Data preprocessing
To extract the features, we will be using the [Mel-Frequency Cepstral Coefficients (MFCC)](http://practicalcryptography.com/miscellaneous/machine-learning/guide-mel-frequency-cepstral-coefficients-mfccs/) algorithm. 

This algorithm has been widely used in automatic speech and speaker recognition since the 1980s. It was introduced by Davis and Mermelstein. 

MFCC algorithm summarizes the frequency distribution across the window size. This enables the analysis of both the frequency and time characteristics of the provided sound. It will allow us to identify features for classification.

```python
mfccs = librosa.feature.mfcc(y=audio_data, sr=sampling_rate, n_mfcc=40)
```

The `n_mfcc` parameter denotes the number of `MFCCs` to return. In our case, we chose 40. You can choose any value you want.

```python
mfccs
```

```bash
array([[-4.6613168e+02, -4.6417816e+02, -4.7455182e+02, ...,
        -4.4540848e+02, -4.5221939e+02, -4.5637799e+02],
       [ 1.0846554e+02,  1.1128984e+02,  1.0955853e+02, ...,
         1.1160173e+02,  1.1063791e+02,  1.1319142e+02],
       [-2.5252140e+01, -2.7399439e+01, -3.2546665e+01, ...,
        -3.8440331e+01, -3.4312595e+01, -3.5521683e+01],
       ...,
       [ 2.3573508e+00,  1.6371250e+00,  3.2692363e+00, ...,
         7.8856702e+00,  1.0755114e+01,  1.1197763e+01],
       [-3.2311397e+00, -2.6380532e+00,  4.6177328e-01, ...,
         1.0223865e+01,  1.1984882e+01,  1.3385002e+01],
       [-1.3852274e+01, -1.0576165e+01, -2.1510942e+00, ...,
         2.9695926e+00,  2.1894133e+00,  6.6635776e-01]], dtype=float32)
```
These patterns above have been extracted from one audio file based on the frequency and time characteristics.

```python
def features_extractor(file):
    audio, sample_rate = librosa.load(file_name, res_type='kaiser_fast') 
    mfccs_features = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
    mfccs_scaled_features = np.mean(mfccs_features.T,axis=0)
    
    return mfccs_scaled_features
```

To extract the features from all the audio files in the dataset, we create a list to store all the extracted features. 

We then iterate through each audio file and extract features using the Mel-Frequency Cepstral Coefficients.

```python
extracted_features=[]
for index_num,row in tqdm(metadata.iterrows()):
    file_name = os.path.join(os.path.abspath(audio_dataset_path),'fold'+str(row["fold"])+'/',str(row["slice_file_name"]))
    final_class_labels=row["class"]
    data=features_extractor(file_name)
    extracted_features.append([data,final_class_labels])
```

Let's convert the entire list into a data frame using the Pandas library. This converts the results into tables for more straightforward analysis.

```python
extracted_features_df=pd.DataFrame(extracted_features,columns=['feature','class'])
extracted_features_df.head(10)
```
```bash
              feature                                    class
0   [-215.79301, 71.66612, -131.81377, -52.09133, ...   dog_bark
1   [-424.68677, 110.56227, -54.148235, 62.01074, ...   children_playing
2   [-459.56467, 122.800354, -47.92471, 53.265705,...   children_playing
3   [-414.55377, 102.896904, -36.66495, 54.18041, ...   children_playing
4   [-447.397, 115.0954, -53.809113, 61.60859, 1.6...   children_playing
5   [-447.70856, 118.409454, -35.24866, 56.73993, ...   children_playing
6   [-477.1972, 120.63773, -29.692501, 57.051914, ...   children_playing
7   [-464.84656, 117.71454, -30.163269, 50.72254, ...   children_playing
8   [-472.1215, 126.76601, -38.36653, 58.748646, -...   children_playing
9   [-196.18527, 114.94506, -14.661183, 1.2298629,...   car_horn
```

The results above show the extracted features and their respective classes.

The following command splits the dataset into independent and dependent datasets, x and y.

```python
X=np.array(extracted_features_df['feature'].tolist())
y=np.array(extracted_features_df['class'].tolist())
```
We then import both `to_categorical` and `LabelEncoder` methods from TensorFlow and Sklearn. 

```python
from tensorflow.keras.utils import to_categorical
from sklearn.preprocessing import LabelEncoder
labelencoder=LabelEncoder()
y=to_categorical(labelencoder.fit_transform(y))
```

This step involves using sklearn's `train_test_split` method to split our dataset into training and test sets.

```python
from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=0)
```
Now that we are done with data preprocessing, we now need to create our model.

### Model creation
In this step, we will create a model using TensorFlow. Any TensorFlow version above 2.0.0 is okay to use. 

We import it into our notebook, as demonstrated below:

```python
import tensorflow as tf
print(tf.__version__)
```
```bash
2.6.0
```

Using TensorFlow, we import the following libraries:

```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense,Dropout,Activation,Flatten
from tensorflow.keras.optimizers import Adam
from sklearn import metrics
```

Our layers will be stacked in sequence. The last layer will have a softmax activation layer because it is a multi-class classification problem.

```python
model=Sequential()
###first layer
model.add(Dense(100,input_shape=(40,)))
model.add(Activation('relu'))
model.add(Dropout(0.5))
###second layer
model.add(Dense(200))
model.add(Activation('relu'))
model.add(Dropout(0.5))
###third layer
model.add(Dense(100))
model.add(Activation('relu'))
model.add(Dropout(0.5))

###final layer
model.add(Dense(num_labels))
model.add(Activation('softmax'))
```

```python
model.compile(loss='categorical_crossentropy',metrics=['accuracy'],optimizer='adam')
```
We can now train our model. The more the number of epochs, the more the accuracy increases. For our case, we only trained the model with 200 epochs.

```python
from tensorflow.keras.callbacks import ModelCheckpoint
from datetime import datetime 

num_epochs = 200
num_batch_size = 32

checkpointer = ModelCheckpoint(filepath='saved_models/audio_classification.hdf5', 
                               verbose=1, save_best_only=True)
start = datetime.now()

model.fit(X_train, y_train, batch_size=num_batch_size, epochs=num_epochs, validation_data=(X_test, y_test), callbacks=[checkpointer], verbose=1)


duration = datetime.now() - start
print("Training completed in time: ", duration)
```

We get the validation accuracy by running the following code:

```python
test_accuracy=model.evaluate(X_test,y_test,verbose=0)
print(test_accuracy[1])
```
```bash
00.7870635390281677
```
We get a validation accuracy of 78.71%. Increasing the number of training epochs will increase this accuracy score.

### Testing the model
In this section, we will be performing the following three steps:

- Preprocessing the test audio data. It involves extracting the features using the MFCC algorithm.
- Predicting its class with the help of the model that we have created.
- Inversing and transforming the predicted label to get our class label.

We choose a random audio file of a dog bark, `103076-3-0-0.wav`, from our dataset to use for testing. 

In the code below, we repeat the steps we used earlier to preprocess audio data. 

We then perform a prediction of the class it belongs to and finally use the `inverse_transform` method from scikitlearn to give us the predicted label name. 

```python
filename="fold8/103076-3-0-0.wav"
audio, sample_rate = librosa.load(filename, res_type='kaiser_fast') 
mfccs_features = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
mfccs_scaled_features = np.mean(mfccs_features.T,axis=0)

print(mfccs_scaled_features)
mfccs_scaled_features=mfccs_scaled_features.reshape(1,-1)
print(mfccs_scaled_features)
print(mfccs_scaled_features.shape)
predicted_label=model.predict(mfccs_scaled_features)
print(predicted_label)
classes_x=np.argmax(predicted_label,axis=1)
prediction_class = labelencoder.inverse_transform(classes_x)
prediction_class
```

```bash
[[1.1630526e-21 5.3596851e-09 2.6831966e-09 9.9984801e-01 4.6294679e-09
  9.3139047e-12 1.5179862e-04 4.0151480e-34 1.1097348e-07 4.4551591e-08]]

array(['dog_bark'], dtype='<U16')
```
The model has correctly predicted the dog bark.

All the code for this tutorial is available [here](https://colab.research.google.com/drive/1iLMmBnLazIhWBOpnsVfo7lVaQnB3WONv#scrollTo=GlWofJJVcrQT).

### Wrapping up
Audio signal processing poses numerous challenges to developers. However, using libraries such as Librosa makes it much easier to understand. 

You do not have to use the Librosa library for this task. Once you have the waveform, you could instead convert it into a spectrogram and use a Convolution Neural Network (CNN) for classification.

Happy coding!

### Further reading
- [UrbanSound8K Dataset](https://www.kaggle.com/chrisfilo/urbansound8k)
- [Complete code](https://colab.research.google.com/drive/1iLMmBnLazIhWBOpnsVfo7lVaQnB3WONv#scrollTo=GlWofJJVcrQT)
- [Librosa](https://librosa.org/doc/latest/index.html)
- [A Dataset and Taxonomy for Urban Sound Research](http://www.justinsalamon.com/uploads/4/3/9/4/4394963/salamon_urbansound_acmmm14.pdf)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
