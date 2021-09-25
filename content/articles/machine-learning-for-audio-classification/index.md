Machine learning has shown exemplary results when understanding our environment using vision. But one area where machine learning hasn't been used much is in sound. This is because sound can give us a perspective that is not directional like in a camera. It does not depend on illumination, and you can hear the sound the same way no matter if it's day or night and from a much further distance. This creates additional challenges.

But as it turns out, converting sound waves into audio then to spectrograms (visual representation of frequencies) can allow us to use machine learning on audio. Machine learning for audio can be used in pitch detection, to understand speech, understand musical instruments, and in audio and music generation. For our case, we'll use it for classification. An excellent example of an audio classification problem is telling a machine whether audio is speech or music.

In this tutorial, you'll get an introduction to Machine Learning for audio classification and some of the theories needed to understand it. Also, using an example, we will be implementing an audio classification task using TensorFlow.

### Overview
- [Differences between sound and audio](#differences-between-sound-and-audio)
- [What is a spectrogram?](#what-is-a-spectrogram)
- [Implementing audio classification using TensorFlow](#implementing-audio-classification-using-tensorflow)
- [Wrapping up](#wrapping-up)

### Technology stack
- [Python](https://www.python.org/)
- [Librosa](https://librosa.org/doc/latest/index.html)

### Prerequisites
You need to have some domain knowledge in:
- Sound and audio
- Intermediate Python programming

### Differences between sound and audio
Sound is what you hear.

A better definition of sound is that it's a vibration that propagates as an acoustic wave. Unique properties of sound include frequencies, speed, amplitude, and direction. When talking about the primary usage of machine learning in this domain, only frequency and amplitude are the essential features.

Sound waves can often be simplified to sinusoidal waves. A sinusoidal wave shows us how the amplitude of a variable changes with time.

To capture sound into its electronic representation, we use a microphone.

Audio is the electronic representation of sound. The audio frequencies that humans can hear range from 20Hz to 20 kHz. Frequencies below 20Hz and above 20KHz are inaudible for humans because they are either low or high. These samples, over time, result in a waveform.

But can we apply machine learning to these waveforms?

No. At least not yet. This's where one last concept can help us.

### What is a spectrogram?

The diagram below shows a spectrogram.

![Spectrogram](/engineering-education/machine-learning-for-audio-classification/spectrogram.png)

*[Image Source: PNSN](https://pnsn.org/spectrograms/what-is-a-spectrogram)*

A [spectrogram](https://pnsn.org/spectrograms/what-is-a-spectrogram) is a visual representation of all frequencies over time. The Y-axis is the frequency in hertz, while the X-axis represents the time. The color represents the magnitude or amplitude. The color in a spectrogram is either brighter or higher and expressed in decibels (unit of measure).

We can convert a waveform to a spectrogram. Technically, this is equivalent to an image. Researchers have found that we can effectively apply computer vision techniques to the spectrogram. This means that we can classify sound with the same methods used to classify images. 

With these, a machine learning model can extract the dominant audio per time frame in a waveform by finding patterns in the spectrogram. That's one way of finding patterns in audio data. However, in this tutorial, we won't be using a spectogram to find patterns, we'll use a library known as librosa to help us achieve this task. 

Now that you know a little more about audio and how machine learning can classify it, let's implement an audio classification task using TensorFlow. 

### Implementing audio classification using TensorFlow
- We will use the [UrbanSound8K dataset](https://www.kaggle.com/chrisfilo/urbansound8k) available on Kaggle. This dataset contains 8732 labeled sound excerpts of urban sounds from 10 classes. These 10 classes includes `air_conditioner`, `car_horn`, `children_playing`, `dog_bark`, `drilling`, `enginge_idling`, `gun_shot`, `jackhammer`, `siren`, and `street_music`.

- In this tutorial, [Librosa](https://librosa.org/doc/latest/index.html) will be our main library. Librosa is an open-source python package for music and audio analysis. The library can give us the data and the sampling rate. The sample rate is the number of samples per second of audio. By default, librosa mixes all audio to mono and resamples them to 22050 Hz at load time. This plays a vital role as in audio, different sounds have different sample rates.

#### Exploratory data analysis (EDA)
We begin by installing Librosa. 

```bash
!pip install librosa
```
The above command will install the Librosa library. Let's go ahead and install the other dependencies that we will need for our project.

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
#### Loading dataset from kaggle
Let's load our external data on Kaggle into Google Colab.

Step 1: Head over to your Kaggle account and download your `Kaggle API token`. You'll be able to find it in the API section. By clicking the “Create New API Token”, a kaggle.json file will be generated and downloaded to your computer.

Step 2: Upload the downloaded kaggle.json to your Colab project.

Step 3: Update the KAGGLE_CONFIG_DIR path to the current working directory as shown:

> You get your current working directory by typing `!pwd` on the terminal.

```bash
os.environ['KAGGLE_CONFIG_DIR'] = "/content"
```
Step 4: Finally, run the following Kaggle API to download datasets:

```bash
!kaggle datasets download -d chrisfilo/urbansound8k
```
After downloading, run this command to unzip it.

```bash
!unzip urbansound8k.zip
```
#### Experimenting with one audio file
We've picked one random audio file, of children playing, `100263-2-0-121.wav`, from our dataset folder for analysis. 

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
In mono, there is only one signal. So, the results from our audio_data show that librosa has converted the audio into integers with only one 1-dimension. On the other hand, if it was stereo, we'd have two signals and would have been a 2-D array. Although we won't use stereo signal in our tutorial, it is important to know that stereo sound is usually preffered in audio as it gives us a sense of directionality, perspective, space. But, librosa simplifies these signals into mono for easier processing.

```python
sampling_rate
```

```bash
22050
```
By default, Librosa gives us a sampling rate of 22050.

Let's now use the Pandas library to read our csv file:

```python
audio_dataset_path='/content/'
metadata=pd.read_csv('UrbanSound8K.csv')
metadata.head()
```
We load in the `UrbanSound8K.csv` file available in our downloaded dataset folder. We then store it in a variable known as `metadata`. Using the `head()` method, let's take a look at the first 20 files in our dataset.

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
We see that the audio files are all stored in `.wav` file format, for audio files. They are also organized in their respective file classes.

Let's check whether the dataset is imbalanced.

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

Now that we are done with EDA, we've figured that this data is in its raw format. We need to preprocess this data to extract meaningful features from it. We'll then use these extracted features for training instead of using the data in its raw form.

#### Data preprocessing
To extract the features, we will be using the [Mel-Frequency Cepstral Coefficients (MFCC)](http://practicalcryptography.com/miscellaneous/machine-learning/guide-mel-frequency-cepstral-coefficients-mfccs/) algorithm. This algorithm is widely used in automatic speech and speaker recognition since the 1980s when it was introduced by Davis and Mermelstein. It summarizes the frequency distribution across the window size. This enables the analysis of both the frequency and time characteristics of the sound. It will allow us to identify features for classification.

```python
mfccs = librosa.feature.mfcc(y=audio_data, sr=sampling_rate, n_mfcc=40)
```

The `n_mfcc` parameter denotes the number of MFCCs to return. In our case, we chose 40. You can choose any value you want.

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
These are patterns that have been extracted from one audio file based on the frequency and time characteristics.

To extract the features from all the audio files in the dataset, we create a list to store all the extracted features.

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
              feature 	                                 class
0 	[-215.79301, 71.66612, -131.81377, -52.09133, ... 	dog_bark
1 	[-424.68677, 110.56227, -54.148235, 62.01074, ... 	children_playing
2 	[-459.56467, 122.800354, -47.92471, 53.265705,... 	children_playing
3 	[-414.55377, 102.896904, -36.66495, 54.18041, ... 	children_playing
4 	[-447.397, 115.0954, -53.809113, 61.60859, 1.6... 	children_playing
5 	[-447.70856, 118.409454, -35.24866, 56.73993, ... 	children_playing
6 	[-477.1972, 120.63773, -29.692501, 57.051914, ... 	children_playing
7 	[-464.84656, 117.71454, -30.163269, 50.72254, ... 	children_playing
8 	[-472.1215, 126.76601, -38.36653, 58.748646, -... 	children_playing
9 	[-196.18527, 114.94506, -14.661183, 1.2298629,... 	car_horn
```

The results show the extracted features and their respective classes.

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

#### Model creation
We are now going to create a model using TensorFlow. Any TensorFlow version above 2.0.0 is okay to use. 

Let's import it into our notebook.

```python
import tensorflow as tf
print(tf.__version__)
```
```bash
2.6.0
```

Using TensorFlow, let's import the following libraries:

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
Let's now go ahead and train our model. The more the number of epochs, the more the accuracy increases. Try play around and see how it turns out. For our case, we only trained the model for 200 epochs.

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

#### Testing the model
In this section, we will be performing three steps:

- We will be preprocessing the new audio data that we want to test. It involves extracting the features using the MFCC algorithm.
- We will predict its class with the help of the model that we have created.
- We will inverse transform the predicted label to get our class label.

Let's choose a random audio file of a dog bark, `103076-3-0-0.wav`, from our dataset to use for testing. 

In the code below, we repeat the steps we used earlier to preprocess audio data. We then perform a prediction of the class it belongs to and finally uses the `inverse_transform` method from scikitlearn to give us the name of the predicted label. 

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

### Wrapping up
Audio signal processing is not easy to understand as you need to have at least some domain knowledge. But it isn't difficult either. Using Python and libraries such as librosa, which have done most of the hard work for you, becomes easy to understand. You don't have to use the librosa library for this task. Once you have the waveform, you could convert the waveform into a spectrogram and use a Convolution Neural Network (CNN) for classification instead.

Happy coding!

### References
- [UrbanSound8K Dataset](https://www.kaggle.com/chrisfilo/urbansound8k)
- [Complete code](https://colab.research.google.com/drive/1iLMmBnLazIhWBOpnsVfo7lVaQnB3WONv#scrollTo=GlWofJJVcrQT)
- [Librosa](https://librosa.org/doc/latest/index.html)
- [A Dataset and Taxonomy for Urban Sound Research](http://www.justinsalamon.com/uploads/4/3/9/4/4394963/salamon_urbansound_acmmm14.pdf)
