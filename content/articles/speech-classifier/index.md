### Introduction

**What is a classifier?**
A classifier is an algorithm that sorts data into categories or classes of information.

**What is speech recognition?**
Speech recognition is the capability of a program to process human speech into a written format.
A speech classifier, therefore, is a program that automatically classifies a set of input audio data.

#### Prerequisites

Before we start learning, you should have the following packages installed.

- numpy
- pandas
- os
- glob
- librosa
- keras
- python_speech_features
- mfcc
- numpy

#### Body

Audio recognition is a supervised learning task where we have to input an audio signal and predict the text from it.
Raw audio input cannot be used as an input because of the noise in the audio signal.
By extracting features from the audio signal and then using it as input to the base model, we can be able to produce a better performance than using raw audio directly as input.
MFCC is the technique that is widely used to extract the feature from the audio signal.
Before we proceed any further, we have to understand what an MFCC is.
MFCC stands for Mel-frequency cepstral coefficients. These are the coefficients that collectively make up an MFC (Mel-frequency cepstrum).
The MFC is derived from a type of cepstral representation of the audio clip. It has frequency bands that approximate the human auditory system's response hence allowing for a better representation of the sound.
The MFCC has features for speech input, feature extraction, feature vectors, a decoder, and a word output.

Now that we know what an MFCC is and some of its features, let’s get to the how’s.
The first thing that you will have to do is collect audio data of different people or objects in WAV format.
The MFCC function creates a feature matrix for an audio file in python.
It does this by converting the audio data in WAV format into a matrix.


One of the crucial packages that we are going to use is called librosa. Whenever we read any audio signal, we get two channels i.e. mono channel and stereo channel. The mono channel is one-dimensional while the stereo channel is a multi-dimensional channel.
Some of the audio recorded are usually at a very high frequency. Librosa ensures that the frequency of the audio recorded is kept a 21 kHz and normalizes the audio data so that we can see the data in a normalized form.
The data set that we are going to use has to be the form of independent and dependent features. Independent features are the ones extracted from the audio signal and the dependent features are the class label names (i.e. which class it belongs to).
An important thing to note is that librosa converts any audio data into only one channel (mono channel) which is a one dimension signal.

```
import os
```

We are going to list the files
```
filelist = os.listdir('30_speakers_train')
```
Here you can write the name of your file

Next, we are going to read them into pandas
```
train_df = pd.DataFrame(filelist)
```
This will create a data frame for the training data. It's important to check the size of your data frame and ensure that it matches with the number of files in your folder

We will rename the column name to file
```
train_df = train_df.rename({0:'file'})
```

Now we will need to identify each speaker(an object that you want to classify the data)
We will create an empty list where we will append all the speakers' ids for each row of the data frame by slicing the file name as we know that the idis the first number just before the hash
```
speaker = []
for i in range(0, len(df)):
    speaker.append(df['file'][i].split('-')[0])
```

Now we will assign the speaker a new column
```
train_df['speaker'] = speaker
```

We will do the same for the validation and testing files to get about three different data frames

Since we have the data frames, we will write a function to extract the audio properties of each audio file. For this, we will use librosa
```
def extract_features(files):  
    file_name = os.path.join(os.path.abspath('30_speakers_train')+'/'+str(files.file))
    
```
Set the name to be the path to where the file is on the computer

Load the audio file as a floating-point time series and assign the default sample rate. The sample rate is set at 22050 by default
```
    x, sample_rate = librosa.load(file_name, res_type = 'kaiser_fast')
 
 ```

Now generate the MFFCs from a time series
```
    mfccs = np.mean(librosa.feature.mfcc(y=x, sr=sample_rate, n_mfcc=40).T,axis=0)
    
 ```

Generate a short_time Fourier transform(STFT) to use in the chroma_stft
```
    stft = np.abs(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T, axis = 0)
    
 ```

Compute a Mel-scaled spectrogram
```
    mel = np.mean(librosa.feature.melspectrogram(X, sr=samplerate).T, axis = 0)
```

Compute the spectral contrast
```
    contrast = np.mean(librosa.feature.spectral_contrast(S=stft, sr=sample_rate).T, axis = 0)
```

Compute the tonal centroid features(tonnetz)
```
    tonnetz = np.mean(librosa.feature.tonnetz(y = librosa.effects.harmonic(X), sr=sample_rate).T, axis = 0)
return mfccs, chroma, mel, contrast, tonnetz

```

We are going to apply the function to every single audio file and then store that information. This will take some minutes or even hours depending on the amount of data you are using and the computing power
```
train_features = train_df.apply(extract_features, axis=1)
```

Now we will concatenate all the numerical features for each file so that we will have a single array for each file to feed into our neural network
```
features_train = []
for i in range(0, len(train_features)):

features_train.append(np.concatenate((
                                    train_features[i][0]
                                    train_features[i][1]
                                    train_features[i][2]
                                    train_features[i][3]
                                    train_features[i]
 [4], axis = 0)))
```

Now we can set our X_train to be the numpy array of our features
```
X_train = np.array(features_train)
```

For Y, we will need the speaker ids. We have the target data from our original data frames hence we can get those values
```
y_train = np.array(train_df['speaker'])
y_val = np.array(val_df['speaker'])
```

We have to hot encode y to be able to use it for the neural network. For this, we have to import LabelEncorder from sklearn and also import to_categorical from keras which uses Tensorflow
```
from sklearn.preprocessing import LabelEncoder
from keras.utils.np_utils import to_categorical
```

Now we hot encode y
```
lb = LabelEncoder()
y_train = to_categorical(lb.fit_transform(y_train))
y_val = to_categorical(lb.fit_transsform(y_val))
```

Now it's time to build a neural network
```
from keras.models import Sequential
from keras.labels import Dense, Dropout, Activation, Flatten
from keras.callbacks import EarlyStopping
```

We will build a simple dense model with early stopping and softmax for categorical classification
```
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

Now that we have the model, we will fit it with the training and validation data
```
history = model.fit(X_train, y_train, batch_size = 256, epochs = 100,

validation_data = (X_val, y_val),

callbacks = [early_stop])
```

Now we are going to see a graph of the training and validation accuracy over epochs
```
train_accuracy = history.history['accuracy']
val_accuracy = history['val_accuracy']
```

We have to set the figure size
```
plt.figure(figsize = (12, 18))
```

Generate line plot of training, testing loss over epochs
```
plt.plot(train_accuracy, label = 'Training Accuracy', color = '#185fad')
plt.plot(val_accuracy, label = 'Validation Accuracy', color = 'orange')
```

Now we set the title
```
plt.title('Training and Validation Accuracy by Epoch', fontsize = 25)
plt.xlabel('Epoch)', fontsize = 18)
plt.ylabel('Categorical Crossentropy', fontsize = 18)
plt.xticks(range(0, 100, 5), range(0, 100, 5))

plt.legend(fontsize = 18);
```


It is important to collect as many voice recordings as possible and append the feature matrix of each audio file in this matrix. This is going to act as your training data set.
Repeat the above steps to form a matrix of other classes.
Once the data set is prepared, fit this data into any deep learning model that is used for classification to classify the voices of different objects/people.


Reasons, why MFCC is used, are because of some of its unique qualities which include quantifying the gross shape of the spectrum which is important in identifying vowels. It also removes fine spectral structure which is not necessarily needed hence focusing on the part of the signal that is most informative.
However, the MFCC does have some issues. Some of these issues include a poorly motivated choice of perpetual scale.
Another issue is that the performance of the MFCC in presence of additive noise is not very good compared to other features. The MFCCs usually work better in analysis but are problematic in synthesis.

