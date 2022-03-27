---
layout: engineering-education
status: publish
published: true
url: /multi-class-image-classifier-using-deep-autoviml/
title: Multi-Class Image Classifier using Deep AutoViML
description: In this tutorial we will use Deep AutoViML to build a model that classifies images of hands playing the rock-paper-scissors game.
author: simon-ndiritu
date: 2022-03-03T00:00:00-15:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/multi-class-image-classifier-using-deep-autoviml/hero.jpg
    alt: Multi-Class Image Classifier using Deep AutoViML Hero Image
---
Image classification categorizes input images into their respective labels or categories. Most image classifications usually have only two classes for example `cat` and `dog`. In a multi-class, we have three or more classes such as `lion`, `cheetah`, `leopard`, and `tiger`.
<!--more-->
Multi-class image classification categorizes an input image into one of the three or more classes. When doing a multi-class classification, the predicted image belongs to only one class. An image cannot belong to more than one class at the same time. 

We will use the `Deep AutoViML` library in building the model. Deep AutoViML is an Automated Machine Learning (AutoML) library that builds neural networks using [TensorFlow](https://www.tensorflow.org/) and [Keras](https://keras.io/).

In this tutorial, we will use Deep AutoViML to build a model that classifies images of hands playing the rock-paper-scissors game. The images have three classes: `rock`, `paper` and `scissors`.

### Table of contents
- [Prerequisites](#prerequisites)
- [Getting started with Deep AutoViML](#getting-started-with-deep-autoviml)
- [Deep AutoViML features](#deep-autoviml-features)
- [Using GPU](#using-gpu)
- [Images dataset](#images-dataset)
- [Unzipping the dataset](#unzipping-the-dataset)
- [Cleaning the directory](#cleaning-the-directory)
- [Displaying images](#displaying-images)
- [Importing the libraries](#importing-the-libraries)
- [Dataset directory](#dataset-directory)
- [Initializing the neural network](#initiliazing-the-neural-network)
- [Fitting the neural network](#fitting-the-neural-network)
- [Model type and the layers of the neural network](#model-type-and-the-layers-of-the-neural-network)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this tutorial, the reader should:
- Understand [image preprocessing in Python](/engineering-education/image-preprocessing-in-python/).
- Understand [convolution neural networks](/engineering-education/basics-of-convolution-neural-networks/).
- Know how to build an image classifier using [Keras](/engineering-education/image-classifier-keras/) and [TensorFlow](https://www.tensorflow.org/tutorials/images/classification).
- Run the model in [Google Colab notebook](https://colab.research.google.com/).

### Getting started with Deep AutoViML
Deep AutoViML automates the process of building an image classification model. Deep AutoViml uses Keras and Tensorflow libraries to build a deep learning model. The models are fast and more accurate. 

Deep AutoViML can also automate NLP tasks. In this tutorial, we will be focusing on image classification. Deep AutoViML has the following useful features:

#### Deep AutoViML features
1. Deep AutoViML uses Keras preprocessing layers to automate image preprocessing - Image preprocessing is an essential stage in image classification. It converts the images into a format the neural network can understand and use.

The most common image preprocessing activities are as follows:
- [Image normalization](<https://en.wikipedia.org/wiki/Normalization_(image_processing)>) - Image normalization converts the range of an image's pixel intensity values to a user-defined range.
- [Image resizing](https://en.wikipedia.org/wiki/Image_scaling) - Image resizing is the process of changing the image size. This enables the resized image to fit into the neural network you are building.
- [Image standardization](https://towardsdatascience.com/normalization-vs-standardization-which-one-is-better-f29e043a57eb) - Changing the image pixels to meet the required standards so that the image can have uniform heights and widths.
- [Image scaling](https://en.wikipedia.org/wiki/Image_scaling) - This process converts the image to a user set scale.

These processes are very important, to understand them in detail, read this [article](/engineering-education/image-preprocessing-in-python/) for more information. These processes provide an image that is ready for use.

2. Deep AutoViML uses pre-trained models - Pre-trained models are neural networks models that undergo training using large datasets. The models are then imported to solve similar problems.

In this tutorial, we will use the pre-trained [MobileNet](https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4) convolutional neural network which is used for image classification. The MobileNet is trained using a large image dataset. This model is already imported into Deep AutoViML.

3. Deep AutoViML performs hyper-parameter tuning - Hyper-parameter tuning is the process of fine-tuning the parameters of a neural network. Finding the best parameters produces an optimized model. Deep AutoViML uses the [Optuna](https://optuna.org/) to automatically search for the best neural network parameters.
4. Deep AutoViML allows you to add more custom layers - Using Deep AutoViML, we can add more layers to the pre-trained model. This enables us to have more user-centric models that can meet the user's needs.
5. Deep AutoViML automatically selects the best model.
6. Deep AutoViML automatically saves the trained model.

To use this library, we install it using the command below:

```bash
!pip install deep_autoviml --upgrade
```

After the installation process, we can now import the `deep_autoviml` using the following code:

```python
from deep_autoviml import deep_autoviml as deepauto
```

### Using GPU
GPUs are much faster than CPUs. Since we are dealing with an image classification problem, we initialize the GPU. We will also monitor its performance. 

To use Google Colab's GPU, follow the steps below:

1. Click the `Runtime` option.

![alt text](/engineering-education/multi-class-image-classifier-using-deep-autoviml/runtime.png)

2. Click `Change runtime type`.

![alt text](/engineering-education/multi-class-image-classifier-using-deep-autoviml/change-runtime-type.png)

3. Then select the `GPU` option and save.

![alt text](/engineering-education/multi-class-image-classifier-using-deep-autoviml/gpu.png)

To manage and monitor this GPU, we will use `Nvidia-smi`:

```bash
!nvidia-smi
```

Let us now use `deep_autoviml` and `Nvidia-smi` to build the multi-class image classification model. First, we download the images dataset.

### Images dataset
The image dataset has three classes: `rock`, `paper`, and `scissors`. To get the hand gestures dataset, click [here](https://www.kaggle.com/drgfreeman/rockpaperscissors/download).

We now need to add the dataset to our working directory. To download this dataset into our working directory, we use the command below:

```bash
!wget --no-check-certificate \
  https://www.kaggle.com/drgfreeman/rockpaperscissors.zip
```

This command downloads the dataset and adds the dataset into the working directory. The dataset will be in a `zip` format.

#### Unzipping the dataset
To unzip the dataset, we use the command below:

```bash
!unzip rockpaperscissors.zip
```

After unzipping the dataset, let's create a `train` and `test` folder. The `train` folder will have the train set and the `test` folder the test set. 

To create these folders, we use the command below:

```bash
!mkdir rockpaperscissors/train
!mkdir rockpaperscissors/test
```

Let us move the train set to this folder using the code below:

```bash
!mv rockpaperscissors/paper rockpaperscissors/train/paper
!mv rockpaperscissors/rock rockpaperscissors/train/rock
!mv rockpaperscissors/scissors rockpaperscissors/train/scissors
```

#### Adding the testing images
To add the test set images to the `test` folder, we use the command below:

```bash
!mv rockpaperscissors/rps-cv-images rockpaperscissors/test
```

Now we clean the directory by removing unnecessary files:

### Cleaning the directory
To clean the directory, we use the command below:

```bash
!rm rockpaperscissors/README_rpc-cv-images.txt
!rm rockpaperscissors/test/README_rpc-cv-images.txt
```

This command will remove the two files from our directory.

### Displaying images
To display some of the images, we use the `IPython.display` Python module. To import this module, we use the code below:

```python
from IPython.display import Image, display
```

We will display some of the images, using the code below:

```python
display(Image('rockpaperscissors/train/scissors/KNNsNhduqSfuqEK5.png'))
```

The output is shown below:

![First image](/engineering-education/multi-class-image-classifier-using-deep-autoviml/scissors-gesture.jpg)

The image above shows a `scissors` gesture.

```python
display(Image('rockpaperscissors/test/paper/9zuFLFklb0ibEelE.png'))
```

![Second image](/engineering-education/multi-class-image-classifier-using-deep-autoviml/paper-gesture.jpg)

The image above shows a `paper` gesture.

```python
display(Image('rockpaperscissors/test/rock/JOaPrPIINVvoI9l4.png'))
```

![Third image](/engineering-education/multi-class-image-classifier-using-deep-autoviml/rock-gesture.jpg)

The image above shows a `rock` gesture.

### Importing the libraries
We import the important libraries as follows:

```python
import matplotlib.pyplot as plt
import numpy as np

import warnings
warnings.filterwarnings('ignore')
```

The imported libraries have the following functions:
1. **matplotlib** - Matplotlib is a visualization library. We use Matplotlib for diagrams and different graphs.
2. **numpy** - Numpy converts the input images into arrays. It performs mathematical operations on arrays.
3. **warnings** - It shows warnings that arise when running our model. In our case, we have decided to ignore these warnings.

After installing these libraries, let us specify the dataset directory.

#### Dataset directory
Adding the dataset directory will enable the model to know the dataset location. To add the directory, we use the code below:

```python
image_dir = '/content/rockpaperscissors/'
```

Next, let us specify the image size and the number of the image classes:

#### Image sizes
We specify the height and width of the images. To add the image size, use the code below:

```python
img_height = 224
img_width = 224
img_channels = 3
```

From the code above, we set the image height to 224 and the image width to 224. This is the default image size that Deep AutoViML expects. Deep AutoViML uses the pre-trained MobileNet internally.

The `MobileNet` model uses images that are 244 by 244 pixels. `img_channels = 3` represents the number of image classes (rock, paper, scissors).

Next, let us initialize the neural network.

### Initializing the neural network
We initialize the neural networks using the code below:

```python
keras_model_type =  "image"
keras_options = {"early_stopping": True, 'lr_scheduler': 'rlr', "epochs": 3}
model_options = {'tuner':"optuna", "max_trials":2, 'cat_feat_cross_flag':True,
 'image_directory': image_dir, 'image_height': img_height,
 'image_width':img_width, 'image_channels':img_channels }
```

From the code snippet above, the neural network has the following parameters:
1. **keras_model_type** - Deep AutoViML uses the Keras library model to build neural networks. Since we are building an image classification model, we set the type of model as an `image` classifier. This will automatically use the MobileNet model to train the neural network.
2. **keras_options** - It changes the Keras model options. Keras models have options such as `early_stopping`, `lr_scheduler`, and `epochs`.

Let us explain these models:
- `early_stopping` - Early stopping is a parameter used to avoid model [overfitting](https://en.wikipedia.org/wiki/Overfitting) during training. We set it to `True`.
- `lr_scheduler`- It is used to determine the rate of the neural network during each epoch/iteration.
- `epochs` - Determines the total number of iterations of the model. We have set the number of epochs to `3`.

3. **model_options** - It sets the key attributes of the input images. It also sets the hyper-parameter tuning technique. 

These techniques are:
- `tuner` - It sets the hyper-parameter tuning technique. We will use [Optuna](https://optuna.org/) to automatically search for the best neural network parameters.
- `max_trials` - It is the maximum number of combinations tested by `Optuna` during hyperparameter tuning.
- `image_directory` - It specifies the image directory.
- `image_height` - It specifies the image height.
- `image_channels` - It specifies the number of image classes.

After initializing the neural network, let's fit the neural network onto our dataset.

### Fitting the neural network
Fitting the neural network allows the model to learn from the training images. This will enable the model to gain useful insight which it will use to make predictions.

To fit the neural network, we use the code below:

```python
model = deepauto.fit("", "", keras_model_type=keras_model_type,
 project_name='rock_paper_scissors_classifier',
 save_model_flag=False, model_options=model_options,
 keras_options=keras_options, use_my_model='', verbose=0)
```

We fit the neural network using the `deepauto.fit` function. In the function we add the `project_name` as `rock_paper_scissors_classifier`. The other function values are the parameters set during the initialization process. We also use the `save_model_flag` to specify if we want to save our model or not.

When the code is executed, it automates the model-building process. It then produces different outputs to show the progress.The first output shows the model training using the `rock-paper-scissors` dataset. The output also shows the number of GPUs used to speed up the process. 

This output is shown in the image below:

![Training process](/engineering-education/multi-class-image-classifier-using-deep-autoviml/training-process.jpg)

From the image above, we are using 1 physical GPU and 1 logical GPU. The models learn from the images under the given image directory. 

The neural network iterates through the training dataset 3 times. It prints the accuracy score after each iteration. The final accuracy score is `0.96875`.

The next output displays some of the images:

![Displayed images](/engineering-education/multi-class-image-classifier-using-deep-autoviml/displayed-images.jpg)

Deep AutoViML also automatically plots the `Model Training vs Validation loss` and `Model Training vs Validation Accuracy` diagrams. These diagrams are shown below:

![Diagrams](/engineering-education/multi-class-image-classifier-using-deep-autoviml/digrams.jpg)

The diagram on the left shows the `Model Training vs Validation loss`. From the image, we can see the `train_loss` and the `val_loss` reduces over time. This shows that our model improved as the training process continued.

The diagram on the right shows the `Model Training vs Validation Accuracy`. We can see the `train_accuracy` and `val_accuracy` increase over time. This shows that our model improved as the training process continued.

### Model type and the layers of the neural network
This output shows the model type and the layers of the neural network. It also shows the model's summary and parameters. The parameters are categorized into trainable and non-trainable parameters. 

This output represents the structure of the neural network:

![Neural network layers](/engineering-education/multi-class-image-classifier-using-deep-autoviml/neural-network.jpg)

From the image above, the model type is sequential. Sequential models allow layers to be built on top of each other. It also shows the total model parameters (2,261,827).

The trainable parameters (3,843) are the ones the neural network will train. The non-trainable parameters (2,257,984) are already trained. 

We import the non-trainable parameters from the pre-trained MobileNet. The number of non-trainable parameters is more than the trainable parameters. This saves training time.

Finally, Deep AutoViML automatically makes a few predictions. It classifies some of the images in the test set. It prints the `actual label` and the `predicted label` of the images. 

The `actual label` shows the actual image class. The `predicted label` shows the class the model predicts. If the `actual label` and the `predicted label` match, the model would have made the right prediction.

This output is shown in the image below:

![Model predictions](/engineering-education/multi-class-image-classifier-using-deep-autoviml/predicted-images.jpg)

From the image above, the model has classified 6 images. For all the images, the `actual label` and the `predicted label` match. This shows that our model was able to make the right predictions. 

We have also achieved multi-class image classification. The model was able to classify an image into one of the three classes.

### Conclusion
In this tutorial, we have gone over a multi-class image classifier using Deep AutoViML. We discussed the Deep AutoViML features used to build powerful deep learning models. 

Using these features we were able to build a multi-class image classification model. The final model was able to classify images of hands playing the rock-paper-scissors game. 

I hope you find this tutorial insightful.

To get the complete Python code in Google Colab, click [here](https://colab.research.google.com/drive/1nqLKPj93fha33IK-R32WOFCw5yHwO5zl?usp=sharing).

### References
- [Getting started with image preprocessing in Python](/engineering-education/image-preprocessing-in-python/)
- [Working with preprocessing layers](https://keras.io/guides/preprocessing_layers/)
- [Keras documentation](https://keras.io/)
- [Deep AutoViML hitHub](https://github.com/AutoViML/deep_autoviml)
- [TensorFlow documentation](https://www.tensorflow.org/)

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
