---
layout: engineering-education
status: publish
published: true
url: /image-classifier-using-transfer-learning-with-tensorflow/
title: Image Classifier using Transfer Learning with Tensorflow
description: In this tutorial, we will build a model that classifies images of hands playing rock, paper, scissor games using TensorFlow.
author: charles-kariuki
date: 2022-02-11T00:00:00-01:38
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/image-classifier-using-transfer-learning-with-tensorflow/hero.jpg
   alt: Image classifier example image
---
Transfer learning is a technique that trains a neural network on one problem and then applies the trained neural network to a different but related problem. It focuses on storing knowledge gained while solving one problem and applying it to a different but related problem. Transfer learning decreases the training time and produces a model that performs well.
<!--more-->

For example, knowledge gained while learning to recognize lemons could apply when trying to recognize oranges. Lemons and oranges are different but related problems. The neural network is fine-tuned to meet the user's needs rather than being trained from scratch.

In this tutorial, we will build a model that classifies images of hands playing rock, paper, scissor games. We will download a pre-trained [MobileNet-v2](https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4) convolutional neural network from the [TensorFlow hub](https://tfhub.dev/). We will then fine-tune it to classify images of hands playing rock, paper, scissor games.

### Table of contents
- [Prerequisites](#prerequisites)
- [Importing important libraries](#importing-important-libraries)
- [Downloading the images dataset](#downloading-the-images-dataset)
- [Displaying images](#displaying-images)
- [Image shuffling](#image-shuffling)
- [Splitting the dataset into three sets](#splitting-the-dataset-into-three-sets)
- [Image normalization and resizing](#image-normalization-and-resizing)
- [Adding batch size](#adding-batch-size)
- [Downloading the MobileNet-v2 convolutional neural network](#downloading-the-mobileNet-v2-convolutional-neural-network)
- [Extract the feature extractor layer from the MobileNet-v2 model](#extract-the-feature-extractor-layer-from-the-mobileNet-v2-model)
- [Initliazing the neural network](#initliazing-the-neural-network)
- [Model compling](#model-compling)
- [Model fitting](#model-fitting)
- [Accuracy score using the test set](#accuracy-score-using-the-test-set)
- [Making predictions](#making-predictions)
- [Saving the model](#saving-the-model)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this tutorial, a reader should:

- Know how to build [deep learning models](https://www.section.io/engineering-education/building-a-deep-learning-app-using-python/) using TensorFlow.
- Know basics of [convolution neural networks](/engineering-education/basics-of-convolution-neural-networks/).
- Use [Google Colab](https://research.google.com/).

### Importing important libraries
For this tutorial, import the following libraries.

```python
import matplotlib.pylab as plt
import tensorflow as tf
import tensorflow_hub as hub
import os
import numpy as np
import tensorflow_datasets as tfds
```
The libraries are important in building our transfer learning model. The functions of each of these libraries are as follows:

**matplotlib.pylab** - 
It is a visualization library. We use Matplotlib to plot line graphs, figures, and diagrams.

**tensorflow** - 
It is an open-source library for machine learning and artificial intelligence. We use it to create the input, dropout, and dense layers for our image classification model.

**tensorflow_hub** - 
It is a TensorFlow repository that contains a collection of pre-trained models. 

**os** - 
It enables us to interact with the operating system. The OS module in Python provides functions for creating and removing a directory, fetching its contents, changing and identifying the current directory.

**numpy** - 
It will convert the image dataset into arrays. It also enables us to perform mathematical operations on arrays.

**tensorflow_datasets** - 
It is a TensorFlow repository that is made up of a collection of ready-to-use datasets.

### Downloading the images dataset
We will download the rock, paper, scissors image dataset from `tensorflow_datasets` using the following code:

```python
datasets, info = tfds.load(name='rock_paper_scissors', with_info=True, as_supervised=True, split=['train','test'])
```
We have downloaded the dataset and saved it into `train` and `test` sets.

To check the information available in our dataset, run this command:

```python
info
```
The output is shown below:

![Dataset information](/engineering-education/image-classifier-using-transfer-learning-with-tensorflow/dataset-information.jpg)

From the image above, we have a total of 2892 images. The image size is `300` by `300` pixels and we have 3 classes. Let's display some of the images.

### Displaying images
To show the images, we will specify the image set to be displayed. We will display the `train` set using the following code:

```python
train, info_train = tfds.load(name='rock_paper_scissors', with_info=True, split='test')
tfds.show_examples(info_train,train)
```
The images are shown below:

![Displaying images](/engineering-education/image-classifier-using-transfer-learning-with-tensorflow/displayed-images.jpg)

### Image shuffling
We shuffle to reduce model bias. Shuffling enables the model to learn rather than memorize the images.

```python
dataset=datasets[0].concatenate(datasets[1])
dataset=dataset.shuffle(3000)
```
In the code above, we first concatenate the two image sets(train and test). Then, randomly shuffle the 3000 images.

### Splitting the dataset into three sets
After shuffling the dataset, split the dataset into three sets. Train set, validation set, and test set.

- Train set: it is used to train the model. The model learns from this set.

- Validation set: it is used to fine-tune the model hyper-parameters so that we can have an optimized model.

- Test set: it is used to assess the final model after training. It checks if the model can make accurate predictions.

We split the dataset using the following code:

```python
rsp_val=dataset.take(600)
rsp_test_temp=dataset.skip(600)
rsp_test=rsp_test_temp.take(400)
rsp_train=rsp_test_temp.skip(400)
```
From the code above, we have used `600` images as the validation set, `400` images as the test set, and `400` images as a train set.

### Image normalization and resizing
Image normalization is the process of changing the range of an image's pixel intensity values to a predefined range. Often, the predefined range is usually [0, 1], or [-1, 1]. In this tutorial we want our pixel range to be [0, 1]. For a detailed understanding on image normalization, click [here](/engineering-education/image-preprocessing-in-python/). 

Image resizing is the process of changing the image size. This enables the resized image to fit into the neural network you are building. To perform this process, use the following function.

```python
def scale(image, label):
  image = tf.cast(image, tf.float32)
  image /= 255.0
  return tf.image.resize(image,[224,224]), tf.one_hot(label, 3)
```
From the code above, we performed image normalization by dividing the image by 255. It will change the pixel range to 0, 1. The code also resized our image to 224 by 224 using the `tf.image.resize` method. It is the same size as the images from the pre-trained [MobileNet-v2](https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4) convolutional neural network.

Finally, the code performs one-hot encoding using the `tf.one_hot` method. One hot encoding converts the categorical variables (rock, paper, scissors), into integer values (0, 1, 2). The neural network understands integer values (numeric values). After this process, we need to add a batch size for each set.

### Adding batch size
Batch size is the number of data samples used in each set during an iteration (epoch). We will set the batch size to `64`. This is done using the following function.

```python
def get_dataset(batch_size=64):
  train_dataset_scaled = rsp_train.map(scale).shuffle(1900).batch(batch_size)
  test_dataset_scaled =  rsp_test.map(scale).batch(batch_size)
  val_dataset_scaled =  rsp_val.map(scale).batch(batch_size)
 return train_dataset_scaled, test_dataset_scaled, val_dataset_scale
```
From the code above, each set (train, validation, and test) will have `64` images during an iteration (epoch).

We call the `get_dataset` function to be applied to the dataset.

```python
train_dataset, test_dataset, val_dataset = get_dataset()
```
Finally, cache the train and Val set so that the model can use.

#### Caching dataset
To cache the dataset, use this code:

```python
train_dataset.cache()
val_dataset.cache()
```
This dataset is now ready for use. The next step is to download the MobileNet-v2 convolutional neural network.

### Downloading the MobileNet-v2 convolutional neural network
To download this neural network run this command:

```python
feature_extractor = "https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4"
```
This model is already pre-trained using different images. MobileNet-v2 follows the convolutional neural network architecture. It is made up of a feature extractor layer (collection of convolutional and pooling layers) and fully connected layers. For further understanding of the convolutional neural network architecture, read this [article.](/engineering-education/basics-of-convolution-neural-networks/)

We will apply this model to classify images of hands playing rock, paper, scissor games. To use this model, we extract the feature extractor layer from the MobileNet-v2 model. We then use the feature extractor layer as the input layer when building the model.

### Extract the feature extractor layer from the MobileNet-v2 model
The feature extractor layer of the MobileNet-v2 model is made up of a collection of stacked convolutional and pooling layers. This layer is very important and is used to extract the important features from the input image. For further understanding of how the convolutional and pooling layers work, read this [article.](/engineering-education/basics-of-convolution-neural-networks/)

We extract the layer using the following code:

```python
feature_extractor_layer = hub.KerasLayer(feature_extractor, input_shape=(224,224,3))
```
This layer is already trained. To ensure that it will not be trained when we build our neural network, run the following code:

```python
feature_extractor_layer.trainable = False
```
### Initliazing the neural network
We initialize our neural network as follows:

```python
model = tf.keras.Sequential([
  feature_extractor_layer,
  tf.keras.layers.Dropout(0.5),
  tf.keras.layers.Dense(3,activation='softmax')
])
```
From the code above, we are building a sequential model that allows layers to be built on top of each other. We have used the `feature_extractor_layer` as the input for the neural network. We then add a `Dropout` layer to prevent [model overfitting](/engineering-education/dropout-regularization-to-handle-overfitting-in-deep-learning-models/).

Finally, add the `Dense` layer, which is the output layer for the neural network. It has 3 neurons because our model has three classes. We used a `softmax` because we have more than two classes. For further understanding of how the `softmax` activation function works, read this [article.](/engineering-education/activation-functions/)

To check the summary of this model, use this code:

```python
model.summary()
```
![Model summary](/engineering-education/image-classifier-using-transfer-learning-with-tensorflow/displayed-images.jpg)

The image shows the model type (Sequential) and the initialized layers. It also shows the total model parameters (2,261,827). Some parameters are trainable while others are non-trainable. The trainable parameters (3,843) are the ones the neural network will train. The non-trainable parameters (2,257,984) are from the `feature_extractor_layer` and they are already trained. The number of non-trainable parameters is more as compared to the trainable parameters. This will save the training time.

### Model compling
In model compiling, we determine the `metrics`, the `optimizer`, and the `loss function` to be used by the neural network.

#### Metrics
It is used to calculate the accuracy score of the neural network. This determines the probability of model-making accurate predictions.

#### Optimizer
It is used to enhance the model performance as it learns from the train set. The optimize troubleshoots the model during training and removes errors. The most common optimizer is the `Adam` optimizer which we will use for this neural network.

#### Loss function
It is used to determine the total model error. We will use the `CategoricalCrossentropy` because our dataset is made up of three categories (rock, paper, scissors). To compile this model, use this code:

```python
model.compile(
 optimizer=tf.keras.optimizers.Adam(),
 loss=tf.keras.losses.CategoricalCrossentropy(from_logits=True),
 metrics=['acc'])
```
The next step is to fit our compiled model into the `train_dataset` and the `val_dataset`.

### Model fitting
During model fitting, the model will learn from the `train_dataset`. `val_dataset` will be used to fine-tune the model parameters so that we have an optimized model.

```python
history = model.fit_generator(train_dataset, epochs=2, validation_data=val_dataset)
```
We also set `epochs=2`. This number of times the model will iterate through the `train_dataset` and `val_dataset` during training. When we run this code, the training process will start and produce the following output.

![Model training](/engineering-education/image-classifier-using-transfer-learning-with-tensorflow/model-training.jpg)

From the image above, the model accuracy score after the first epoch is `0.8333`. This represents `83.33%`. After the second iteration, the accuracy score increased to `0.9722`, this is `97.22`. The model improves and increases the chances of making the right classifications.

### Accuracy score using the test set
The test accuracy score is used to assess the final model after training. It checks the model performance using the test dataset.

```python
result=model.evaluate(test_dataset)
```
The accuracy score is as shown below:

```bash
7/7 [==============================] - 1s 88ms/step - loss: 0.6086 - acc: 0.9850
```
The accuracy score is `98,50%`. This shows our model performs well using both the train and test datasets. The next step is to use the model to make predictions.

### Making predictions
We use 10 images from the test dataset to make predictions. The `for` loop will be used to select the 10 images from the test dataset.

```python
for test_sample in rsp_test.take(10):  
  image, label = test_sample[0], test_sample[1]
  image_scaled, label_arr= scale(test_sample[0], test_sample[1])
  image_scaled = np.expand_dims(image_scaled, axis=0)   
```
After selecting the images, let's print the prediction results.

#### Printing prediction results
We will print the `actual label` and the `predicted label`. The `actual label` represents the actual image category/class in the test dataset. The `predicted label` is the category/class the model predicts.

```python
img = tf.keras.preprocessing.image.img_to_array(image)                    
  pred=model.predict(image_scaled)
 print(pred)
  plt.figure()
  plt.imshow(image)
  plt.show()
 print("Actual Label: %s" % info.features["label"].names[label.numpy()])
 print("Predicted Label: %s" % info.features["label"].names[np.argmax(pred)])
```
We have the `tf.keras.preprocessing.image.img_to_array` method to convert the images into an array. We use the `predict` method to make the predictions. The predictions results are shown below:

![Prediction results](/engineering-education/image-classifier-using-transfer-learning-with-tensorflow/prediction-outputs.jpg)

From the image above, the model was able to make the right predictions. The `Actual Label` is the same as the `Predicted Label`.

Let's look at another prediction result.

![Another prediction result](/engineering-education/image-classifier-using-transfer-learning-with-tensorflow/another-prediction.jpg)

For this result, the model was able to make the right predictions. The `Actual Label` is the same as the `Predicted Label`. This shows our image classifier model was well trained. Let's save this trained model.

### Saving the model
To save the model, use this code:

```python
model.save('./models/', save_format='tf')
```
This code will save the model and produce the following output.

![Saving model](/engineering-education/image-classifier-using-transfer-learning-with-tensorflow/saving-model.jpg)

The output above shows the directory that our model is saved. We can load this model and use it in the future to make predictions.

### Conclusion
In this tutorial, we have learned how to build an image classifier using transfer learning. We downloaded the MobileNet-v2 convolutional neural network from the TensorFlow hub. The downloaded model was used to build the model that classifies images of hands playing rock, paper, scissor games.

Finally, we tested the model and it can make accurate predictions. Using this tutorial, a reader should be able to come up with this model. The model we have built in this tutorial is found [here](https://colab.research.google.com/drive/1et3XrRG6_ntIlNusMZJMXvteieNJewzm?usp=sharing).

### References
- [Google Colab notebook](https://colab.research.google.com/drive/1et3XrRG6_ntIlNusMZJMXvteieNJewzm?usp=sharing)
- [TensorFlow documentation](https://www.tensorflow.org/)
- [Transfer Learning for Deep Learning](/engineering-education/transfer-learning-with-deep-learning/)
- [TensorFlow hub](https://www.tensorflow.org/hub)
- [Basics of Convolution Neural Networks](/engineering-education/basics-of-convolution-neural-networks/)
- [Introduction to Neural Networks](/engineering-education/introduction-to-neural-networks/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
