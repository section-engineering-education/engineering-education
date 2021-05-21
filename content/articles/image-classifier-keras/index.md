---
layout: engineering-education
status: publish
published: true
url: /image-classifier-keras/
title: How to Build an Image Classifier with Keras
description: In this article, we will learne how to build an image classifier using Keras. We will apply data augmentation to increase the size of our dataset. We will be able to visualize our training images.Image classification helps us recognize and identify images. 
author: iniabasi-affiah
date: 2021-02-08T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/image-classifier-keras/hero.jpg
    alt: Shared Nothing and Shared Disk Clustering image
---
In this article, we will learn how to use a convolutional neural network to build an *image classifier*. We will use Keras with TensorFlow at the backend. Image classification helps us recognize and identify images. We apply image classifiers in fields such as healthcare, agriculture, education, surveillance, etc.
<!--more-->
We will see how we can apply image classifiers in healthcare. Our goal here is to train a CNN model to classify COVID-19 and normal chest X-ray scans of patients.

The colab notebook for this project is [here](https://github.com/Inyrkz/covid-classifier/blob/main/CovidTrial.ipynb).

### Table of contents
- Importing Libraries and Exploring Dataset
- Data Visualization
- Data Preprocessing and Augmentation
- Build CNN Model
- Compile and Train the Model
- Model Evaluation
- Prediction on New Data
 
### Prerequisites
Before we begin it would be helpful to have the following understanding on the:
- Basics of Convolutional Neural Network. I recommend this [article](/basics-of-convolution-neural-networks/) by Willies Ogola to get started.
- Python Programming.
- [Colab Notebook](https://colab.research.google.com/).


### Importing libraries and exploring the dataset
Let us start by importing the libraries we will be using for this project.

```python
# Importing Libraries
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dropout, Flatten, Dense
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
import matplotlib.pyplot as plt
```

We will create a directory where we can store our model as it trains. Let's check the version of TensorFlow we are using and confirm if we are using a GPU.

```python
# creating models directory
import os
if not os.path.isdir('models'):
  os.mkdir('models')
# checking TensorFlow version and GPU usage
print('Tensorflow version:', tf.__version__)
print('Is using GPU?', tf.test.is_gpu_available())
```

![alt text](/engineering-education/image-classifier-keras/1.JPG)

We are using TensorFlow 2.4, but our output is False for GPU. We need to connect to a GPU runtime. 

To do that, we:

1. Click on *Runtime*

![alt text](/engineering-education/image-classifier-keras/runtime.jpg)

2. Select *Change runtime type*

![alt text](/engineering-education/image-classifier-keras/runtime2.jpg)

3. Select *GPU* as the hardware accelerator

![alt text](/engineering-education/image-classifier-keras/runtime3.jpg)

4. Click on *Save*

Let us run the code above again.

![alt text](/engineering-education/image-classifier-keras/4.JPG)

Now our output is *True*. It indicates that we are using a GPU on Google’s Colab. With a GPU, we can train our model faster.

Let us clone the GitHub repo containing the dataset.

```python
# Clone and Explore Dataset
!git clone https://github.com/education454/datasets.git
```

![alt text](/engineering-education/image-classifier-keras/5.JPG)

The dataset is now available in Colab.

![alt text](/engineering-education/image-classifier-keras/6.JPG)

Let us set the path to the main directory of our dataset.

```python
# setting path to the main directory
main_dir = "/content/datasets/Data"
```

We also set the paths to the training set and testing set subdirectories.

```python
# Setting path to the training directory
train_dir = os.path.join(main_dir, 'train')

# Setting path to the test directory
test_dir = os.path.join(main_dir, 'test')
```

Let's set the path to the training covid images and training normal images. We will do the same for testing covid images and testing normal images.

```python
# Directory with train covid images
train_covid_dir = os.path.join(train_dir, 'COVID19')

# Directory with train normal images
train_normal_dir = os.path.join(train_dir, 'NORMAL')

# Directory with test covid image
test_covid_dir = os.path.join(test_dir, 'COVID19')

# Directory with test normal image
test_normal_dir = os.path.join(test_dir, 'NORMAL')
```

Let us put all the images in each directory in a list and print out the first ten file names in each list.

```python
# Creating a list of filenames in each directory
train_covid_names = os.listdir(train_covid_dir)
print(train_covid_names[:10])  # printing a list of the first 10 filenames

train_normal_names = os.listdir(train_normal_dir)
print(train_normal_names[:10])

test_covid_names = os.listdir(test_covid_dir)
print(test_covid_names[:10])

test_normal_names = os.listdir(test_normal_dir)
print(test_normal_names[:10])
```

![alt text](/engineering-education/image-classifier-keras/7.JPG)


Let's see the total number of images available in the training set and test set.

```python
# Printing total number of images present in each set
print('Total no of images in training set:', len(train_covid_names
                                                + train_normal_names))
print("Total no of images in test set:", len(test_covid_names
                                            + test_normal_names))
```

![alt text](/engineering-education/image-classifier-keras/8.JPG)

We have 1,811 images in the training set and 484 images in the test set.


### Data visualization
The image module in the matplotlib package enables us to load, rescale, and display images. We plot a grid of 16 images, 8 Covid19 images, and 8 Normal images.

```python
# Data Visualization
import matplotlib.image as mpimg
# Setting the no of rows and columns
ROWS = 4
COLS = 4
# Setting the figure size
fig = plt.gcf()
# get current figure; allows us to get a reference to current figure when using pyplot
fig.set_size_inches(12, 12)
```

We create a list containing the path to the directories of eight Covid-19 images in the training set. We do the same for the normal class. Let us merge the two lists to get a total of 16 images, which we will display.

```python
# get the directory to each image file in the trainset
covid_pic = [os.path.join(train_covid_dir, filename) for filename in train_covid_names[:8]]
normal_pic = [os.path.join(train_normal_dir, filename) for filename in train_normal_names[:8]]
print(covid_pic)
print(normal_pic)
# merge covid and normal lists
merged_list = covid_pic + normal_pic
print(merged_list)
```

![alt text](/engineering-education/image-classifier-keras/9.JPG)

```python
# Plotting the images in the merged list
for i, img_path in enumerate(merged_list):
    # getting the filename from the directory
    data = img_path.split('/', 6)[6]
    # creating a subplot of images with the no. of rows and colums with index no
    sp = plt.subplot(ROWS, COLS, i+1)
    # turn off axis
    sp.axis('Off')
    # reading the image data to an array
    img = mpimg.imread(img_path)
    # setting title of plot as the filename
    sp.set_title(data, fontsize=6)
    # displaying data as image
    plt.imshow(img, cmap='gray')
    
plt.show()  # display the plot
```

![alt text](/engineering-education/image-classifier-keras/10.JPG)


### Data preprocessing and augmentation
Our dataset has training data and testing data. There is no validation data. We use 20% of our training data for validation. 

We use the training data to train the model. We use the validation data to check the model during training. We use the testing data to test the model after training.

```python

# Data Preprocessing and Augmentation
# Generate training, testing and validation batches
dgen_train = ImageDataGenerator(rescale=1./255,
                                validation_split=0.2,  # using 20% of training data for validation 
                                zoom_range=0.2,
                                horizontal_flip=True)
dgen_validation = ImageDataGenerator(rescale=1./255)
dgen_test = ImageDataGenerator(rescale=1./255)
```

Image Augmentation helps us increase the size of our training set. It also helps to reduce overfitting. *The ImageDataGenerator()* class generates batches of tensor image data with real-time data augmentation.

We create objects of the class. One is for the training images, where we apply image augmentation. We also create objects for the validation images and the test images.

We begin by rescaling the images, which normalizes the pixel values of our images. The *rescale* parameter is for feature scaling. It is vital when training neural networks. 

The *validation_split* parameter allows us to split a subset of our training data into the validation set. 0.2 means we use 20% of our training set as the validation set. We set *zoom_range* to 0.2. Finally, we set *horizontal_flip* to True.

Now that we have created the objects, we need to connect them to our dataset.  The *ImageDataGenerator()* class has a function called *flow_from_directory*. The function connects the image augmentation tool to the images in our dataset. It takes the path to the directory and generate batches of augmented data.

```python
# Awesome HyperParameters!!!
TARGET_SIZE = (200, 200)
BATCH_SIZE = 32
CLASS_MODE = 'binary'  # for two classes; categorical for over 2 classes

# Connecting the ImageDataGenerator objects to our dataset
train_generator = dgen_train.flow_from_directory(train_dir,
                                                 target_size=TARGET_SIZE,
                                                 subset='training',
                                                 batch_size=BATCH_SIZE,
                                                 class_mode=CLASS_MODE)

validation_generator = dgen_train.flow_from_directory(train_dir,
                                                      target_size=TARGET_SIZE,
                                                      subset='validation',
                                                      batch_size=BATCH_SIZE,
                                                      class_mode=CLASS_MODE)
test_generator = dgen_test.flow_from_directory(test_dir,
                                               target_size=TARGET_SIZE,
                                               batch_size=BATCH_SIZE,
                                               class_mode=CLASS_MODE)
```

![alt text](/engineering-education/image-classifier-keras/11.JPG)

The first argument is the path to the dataset. The next parameter is the *target_size*. It resizes all the images to the specified target size of 200x200. The *batch size* defines how many images we want to have in each batch. 

We use a batch size of 32, and the class mode is either *binary* or *categorical*. *Binary* is for two output classes, while categorical is for more than two classes. Since we are working with only *two* classes, we set the class mode to *binary*.

The *subset* parameter keeps track of the images we use for training and validation from the *train_dir*. We don’t need the *subset* parameter for the test generator. We use the subset parameter only if we use *validation_split*.

**Note:** We only apply image augmentation to the training set. We can normalize the validation and test set as well.

To get the class indices, we use the *class_indices* attribute.

```python
# Get the class indices
train_generator.class_indices
```

![alt text](/engineering-education/image-classifier-keras/12.JPG)

We can also get the shape of our image by using the *image_shape* function.

```python
# Get the image shape
train_generator.image_shape
```

![alt text](/engineering-education/image-classifier-keras/13.JPG)


### Build CNN model
```python
# Building CNN Model
model = Sequential()
model.add(Conv2D(32, (5,5), padding='same', activation='relu',
                input_shape=(200, 200, 3)))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.2))
model.add(Conv2D(64, (5,5), padding='same', activation='relu'))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.2))
model.add(Flatten())
model.add(Dense(256, activation='relu'))
model.add(Dropout(0.2))
model.add(Dense(1, activation='sigmoid'))
model.summary()
```

The Convolutional layer helps us detect features in our images. We are using 32 filters with the size 5x5 each. We set padding to *same* so we do not lose the information in the image. We add the *ReLU* activation function to introduce non-linearity. The input image is 200x200 with *three* color channels for RGB. 

The MaxPooling layer with *pool_size* of (2,2) reduces the image size by half. It helps maintain the features of the image. It also reduces the number of parameters, that shortens the training time.

The Dropout layer helps us avoid overfitting. We use a rate of 0.2. You can learn more about the dropout layer [here](https://machinelearningknowledge.ai/keras-dropout-layer-explained-for-beginners/).

We add another Convolutional layer with 64 filters and a MaxPooling layer. We also add another Dropout layer.

The Flatten layer converts the data to a 1D vector. The dense layer is our fully connected layer. We are using 256 nodes with a *ReLU* activation function. We add another dropout layer, and we create an output layer with one node, using a *sigmoid* activation function. We are using one node at the output because it is a binary classification problem.

![alt text](/engineering-education/image-classifier-keras/14.JPG)


### Compile and train the model
```python
# Compile the Model
model.compile(Adam(lr=0.001), loss='binary_crossentropy', metrics=['accuracy'])
```

We compile our model using the *Adam* optimizer with a learning rate of 0.001. That is also the default learning rate. 

We are using *binary_crossentropy* loss since we have two classes. If we have more than two classes, then we would use *categorical_crossentropy*. The loss function gives the measure of our model’s performance. We also keep track of the accuracy while our model trains.


```python
# Train the Model
history = model.fit(train_generator,
          epochs=30,
          validation_data=validation_generator,
          callbacks=[
          # Stopping our training if val_accuracy doesn't improve after 20 epochs
          tf.keras.callbacks.EarlyStopping(monitor='val_accuracy', 
                                           patience=20),
          # Saving the best weights of our model in the model directory
        
          # We don't want to save just the weight, but also the model architecture
          tf.keras.callbacks.ModelCheckpoint('models/model_{val_accuracy:.3f}.h5',
                                           save_best_only=True,
                                           save_weights_only=False,
                                           monitor='val_accuracy'
                                             )
    ])
```

We fit our model to the *train_generator* and train for 30 epochs. We set the *validation_data* parameter to the *validation_generator*. We also set some callbacks. As the model trains, we track the validation accuracy. 

If the validation accuracy doesn’t improve after 20 epochs, our model will stop training. The *save_best_only* parameter is set to *True*. It will save the model with the highest accuracy after each epoch. The *save_weights_only* parameter is set to *False*. It stores not only the weights but the whole architecture of the model.

![alt text](/engineering-education/image-classifier-keras/15.JPG)

![alt text](/engineering-education/image-classifier-keras/23.JPG)

We store the best performing model in the models’ directory that we created earlier.

![alt text](/engineering-education/image-classifier-keras/16.JPG)

We added the validation accuracy to the name of the model file. It will be easy for us to identify the best model in the directory.

Our best performing model has a training loss of 0.0366 and a training accuracy of 0.9857. It has a validation loss of 0.0601 and a validation accuracy of 0.9890.

If you do not get a good validation accuracy, you can increase the number of epochs for training. It’s advisable to get more training data. The more data you have, the more accurate your model will be.

After training, we get the history object. It contains the progress of the network during training. That is the loss and the metrics we defined when we compiled our model.


### Performance evaluation
Let us get the keys of the history object.

```python
# Performance Evaluation
history.history.keys()
```

![alt text](/engineering-education/image-classifier-keras/17.JPG)

The history object stores the values of loss, accuracy, validation loss, and validation accuracy in each epoch.
 
We now plot a graph to visualize the training and validation loss after each epoch of training.

```python
# Plot graph between training and validation loss
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.legend(['Training', 'Validation'])
plt.title('Training and Validation Losses')
plt.xlabel('epoch')
```

![alt text](/engineering-education/image-classifier-keras/18.JPG)

Let us also plot a graph to visualize the training and validation accuracy after each epoch of training.

```python
# Plot graph between training and validation accuracy
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.legend(['Training', 'Validation'])
plt.xlabel('epoch')
```

![alt text](/engineering-education/image-classifier-keras/19.JPG)

Let us see how our model performs on the testing data. Remember, the testing data is the data the model hasn’t seen during the training process.

```python
# loading the best perfoming model
model = tf.keras.models.load_model('/content/models/model_0.989.h5')

# Getting test accuracy and loss
test_loss, test_acc = model.evaluate(test_generator)
print('Test loss: {} Test Acc: {}'.format(test_loss, test_acc))
```

![alt text](/engineering-education/image-classifier-keras/21.JPG)

We get a test loss of approximately 0.0768 and a test accuracy of approximately 0.9731.

### Prediction on new data
Let us use our model to make predictions on new data. Our new data will be a random image from our test set. We get the path to the test image's directory and pass it to the *load_img()* function.

```python
# Making a Single Prediction
import numpy as np
from keras.preprocessing import image

# load and resize image to 200x200
test_image = image.load_img('/content/datasets/Data/test/COVID19/COVID-19 (457).jpg',
                            target_size=(200,200))

# convert image to numpy array
images = image.img_to_array(test_image)
# expand dimension of image
images = np.expand_dims(images, axis=0)
# making prediction with model
prediction = model.predict(images)
    
if prediction == 0:
  print('COVID Detected')
else:
  print('Report is Normal')
```

![alt text](/engineering-education/image-classifier-keras/22.JPG)

The *load_img()* function from *keras.preprocessing.image* lets us load images in a PIL format. The first argument is the path to the image, and the second argument resizes our input image. After we load and resize our image, we convert it to a numpy array. 

We also have to expand the dimension of the image. This is because we trained our model with images in a batch, 32 images entering the model at a time. So we create a batch of one image before calling the *predict* method. The *axis* parameter of the *expand_dims* function specifies where we want to add that extra dimension. 

The dimension of the batch is always the first dimension so that the argument will be 0. We now encode the result, so our model will tell us if the scan has Covid or is normal, for instance, instead of 0 or 1.

Remember, from the class indices, 0 represents a scan with covid, and 1 represents a normal scan. So if the prediction is 0, the patient has covid. Otherwise, the patient is normal. Our model has detected COVID-19 in the patient’s X-ray scan.


### Conclusion
In this article, we learned how to build an image classifier using Keras. We applied data augmentation to increase the size of our dataset. We were able to visualize our training images. We created a CNN model and trained it to classify Covid-19 chest X-ray scans and normal chest X-ray scans. 

We got a test accuracy of 97% and a loss of 0.0768. We were also able to save our model and load it to make predictions on new data. We cannot use this model in real life because we did not train it on a large dataset.

Now you can build an image classifier to classify images, for example, a dog and a cat, a car and a bike, etc.

Thank you for reading!!! 

### References
1. [Keras Documentation](https://keras.io/api/)
2. [Coursera Guided Project](https://www.coursera.org/learn/classification-of-covid19-using-chest-xray-images-in-keras/home/welcome)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
