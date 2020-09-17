---
layout: engineering-education
status: publish
published: true
url: /engineering-education/machine-learning-model-deployments/
title: Deploying Machine learning Models into Production
description: How to deploy your machine learning model into production environment with the help of Django Framework - focus towards making an API of your machine learning model so that everyone can access your model.
author: priyank-kumar
date: 2020-09-17T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/machine-learning-model-deployments/hero.jpg
    alt: machine learning image example

---
The demand for Machine Learning (ML) applications is growing. Many resources show how to train ML algorithms. However, the ML algorithms work in two phases:
The *training phase* - in which the ML algorithm is trained based on historical data, &
the *inference phase* - where the ML algorithm is used for computing predictions on new data with unknown outcomes.
<!--more-->
The real benefit for businesses is in the interference phase when ML algorithms *provide information before it is known or occurs*. Yet, there is still a technological challenge on how ML algorithms provide inference into their production systems.

Today we will focus directly on Deploying Machine Learning models in production with the help of Rest API's. If you want to learn how Rest API's work you can view this [previous article](/engineering-education/rest-api/).

We will focus on Python's Django Rest Framework to Deploy ML Models as REST APIs.

### How Django Rest Framework works?

#### Installation
First we need to install Django Rest Framework in our system. To install DRF you can use Pip.

```bash
pip install djangorestframework
pip install django
```

Next, let’s start a new Django project:

```bash
django-admin startproject digits
cd digits
python manage.py startapp digitapp
pip install keras
pip install tensorflow
```
#### Understanding Django Rest Framework
Django REST framework is a powerful and flexible toolkit for building web APIs.

1. We need to first install the Django rest framework and we have to create an app to get started.

2. After creating an app we should view a folder structure like this:-

![folder img](/engineering-education/machine-learning-model-deployments/folder-structure.png)

3. To run this particular app in your system you need to type this command.

`python manage.py runserver`.

It will run your server and you can view it on the localhost link provided in your terminal after running this command. It is running of port 8000 by default. If you want to change the port you can just add a port number after runserver like this:-

`python manage.py runserver 7000`

4. If you will open the digits folder you can view a file which is by default created named as `settings.py`. It is a core file in Django projects. It holds all the configuration values that your web app needs to work; database settings, logging configuration, where to find static files, API keys if you work with external APIs, and a bunch of other stuff.

5. You can also see there is one more file named as `urls.py`. To access any view which are created via URLs we can create those URLs here in urls.py file. Now what is views?

6. If you will go back and open your digitsapp folder you are able to view multiple files there like  `views.py`, `admin.py`, `models.py`, `apps.py` and `tests.py`

7. We will first look at the `views.py`. A view function, or view for short, is a Python function that takes a web request and returns a web response. This response can be the HTML contents of a web page, or a redirect, or a 404 error, or an XML document, or an image . . . or anything, really.

The view itself contains whatever arbitrary logic is necessary to return that response. This code can live anywhere you want, as long as it’s on your Python path. There’s no other requirement, no “magic,” so to speak.

For the sake of putting the code somewhere, the convention is to put views in a file called views.py, placed in your project or application directory. You can read more about a view [here](https://docs.djangoproject.com/en/3.1/topics/http/views/)

8. The purpose of `apps.py` file. The application configuration objects store metadata for an application. Some attributes can be configured in AppConfig subclasses. Others are set by Django and read-only.

9. The `admin.py` file is used to display your models in the Django admin panel. You can also customize your admin panel. Django has a built-in admin interface that reads metadata from your models, such as fields, and lets you perform CRUD operations for free

10. `models.py`: A model is a class that represents table or collection in our DB, … Models are defined in the app/models.py. To do the DB operations in our project we can create models.

11. With Django's test-execution framework `tests.py` and assorted utilities, you can simulate requests, insert test data, inspect your application's output and generally verify that your code is doing what it should be doing. Basically you can write your test cases here.

Now that you have a basic understanding of Django Rest Framework we can move forward with creating a Django API.

Exciting !!!

You have to create a folder named as **scripts**. We are creating this folder to keep our Python written files here. You can easily find your Python file with **.py** extension.

If you open the directory you are able to view the folder structure like this:

![folder img](/engineering-education/machine-learning-model-deployments/folder-structure.png)

Now before going deeper into Django we first have to create our Machine Learning model.

We are picking digit classifiers to train our model with the training data. Follow the steps below to train your ML model:

```Python
# coding: utf-8
# baseline cnn model for mnist
from numpy import mean
from numpy import std
from matplotlib import pyplot
from sklearn.model_selection import KFold
from keras.datasets import mnist
from keras.utils import to_categorical
from keras.models import Sequential
from keras.layers import Conv2D
from keras.layers import MaxPooling2D
from keras.layers import Dense
from keras.layers import Flatten
from keras.optimizers import SGD


def load_dataset():
    # load dataset
    (trainX, trainY), (testX, testY) = mnist.load_data()
    # reshape dataset to have a single channel
    trainX = trainX.reshape((trainX.shape[0], 28, 28, 1))
    testX = testX.reshape((testX.shape[0], 28, 28, 1))
    # one hot encode target values
    trainY = to_categorical(trainY)
    testY = to_categorical(testY)
    return trainX, trainY, testX, testY


def prep_pixels(train, test):
    # convert from integers to floats
    train_norm = train.astype('float32')
    test_norm = test.astype('float32')
    # normalize to range 0-1
    train_norm = train_norm / 255.0
    test_norm = test_norm / 255.0
    # return normalized images
    return train_norm, test_norm


def define_model():
    model = Sequential()
    model.add(Conv2D(32, (3, 3), activation='relu', kernel_initializer='he_uniform', input_shape=(28, 28, 1)))
    model.add(MaxPooling2D((2, 2)))
    model.add(Flatten())
    model.add(Dense(100, activation='relu', kernel_initializer='he_uniform'))
    model.add(Dense(10, activation='softmax'))
    # compile model
    opt = SGD(lr=0.01, momentum=0.9)
    model.compile(optimizer=opt, loss='categorical_crossentropy', metrics=['accuracy'])
    return model


def evaluate_model(model, dataX, dataY, n_folds=5):
    scores, histories = list(), list()
    # prepare cross validation
    kfold = KFold(n_folds, shuffle=True, random_state=1)
    # enumerate splits
    for train_ix, test_ix in kfold.split(dataX):
        # select rows for train and test
        trainX, trainY, testX, testY = dataX[train_ix], dataY[train_ix], dataX[test_ix], dataY[test_ix]
        # fit model
        history = model.fit(trainX, trainY, epochs=10, batch_size=32, validation_data=(testX, testY), verbose=0)
        # evaluate model
        _, acc = model.evaluate(testX, testY, verbose=0)
        print('> %.3f' % (acc * 100.0))
        # stores scores
        scores.append(acc)
        histories.append(history)
    return scores, histories




def summarize_diagnostics(histories):
    for i in range(len(histories)):
    # plot loss
        pyplot.subplot(211)
        pyplot.title('Cross Entropy Loss')
        pyplot.plot(histories[i].history['loss'], color='blue', label='train')
        pyplot.plot(histories[i].history['val_loss'], color='orange', label='test')
        # plot accuracy
        pyplot.subplot(212)
        pyplot.title('Classification Accuracy')
        pyplot.plot(histories[i].history['accuracy'], color='blue', label='train')
        pyplot.plot(histories[i].history['val_accuracy'], color='orange', label='test')
    pyplot.show()




def summarize_performance(scores):
    # print summary
    print('Accuracy: mean=%.3f std=%.3f, n=%d' % (mean(scores)*100, std(scores)*100, len(scores)))
    # box and whisker plots of results
    pyplot.boxplot(scores)
    pyplot.show()

# Model is evaluated and now saving the model.
def run_test_harness():
    # load dataset
    # load dataset
    trainX, trainY, testX, testY = load_dataset()
    # prepare pixel data
    trainX, testX = prep_pixels(trainX, testX)
    # define model
    model = define_model()
    # fit model
    model.fit(trainX, trainY, epochs=10, batch_size=32, verbose=0)
    # save model
    model.save('final_model.h5')


(trainx, trainy), (testx, testy) = mnist.load_data()
print('Train: X=%s, y=%s' % (trainx.shape, trainy.shape))
print('Test: X=%s, y=%s' % (testx.shape, testy.shape))
for i in range(9):
    pyplot.subplot(330 + 1 + i)
    pyplot.imshow(trainx[i], cmap=pyplot.get_cmap('gray'))
pyplot.show()
run_test_harness()

```

The model is trained with the help of Neural Networks and there are a lot more tutorials available. You can follow [this link](https://pathmind.com/wiki/neural-network) to learn more about neural networks.

Now that we have our model trained. We have to take in minde that this model can be used by only you and it will work on your system as we are not able to deploy it. So we have to make it accessible to everyone.

1. We have to save our model. But how?
If you notice **closely**, the function `run_test_harness` that we have written has a line in there to save our model.

```bash
model.save('final_model.h5')
```

You have to save the model in h5 format. As it can be easily be accessed by the Python Keras Library.

2. You will notice that there is a file saved in the same directory with name `final_model.h5`, This is your trained model and you can use it for your predictions.             

3. Now to let our model work, to test or validate images we can just take a random image and test it with our model. You can try this by following the code below.

```Python
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.models import load_model


def load_image(filename):
	# load the image
	img = load_img(filename, grayscale=True, target_size=(28, 28))
	# convert to array
	img = img_to_array(img)
	# reshape into a single sample with 1 channel
	img = img.reshape(1, 28, 28, 1)
	# prepare pixel data
	img = img.astype('float32')
	img = img / 255.0
	return img

# load an image and predict the class
def run_example(location):
	# load the image
	img = load_image(location)
	# load model
	model = load_model('/home/Priyank/Documents/Django_projects/DigitRecognition/digits/scripts/final_model.h5')
	# predict the class
	digit = model.predict_classes(img)
	return {'Predictions': digit[0]}

```

This file returns a dictionary whenever you are passing an image through for the model to predict from.

Our model is now trained and we are now able to predict with it as well.

Follow The steps below in order to let your model works as a Rest Api.

1. Copy these 3 files (`your_mode.py`, `your_prediction_from_model.py` and `final_model.h5`) and paste these files inside the folder scripts we have created previously in Django.

![scripts img](/engineering-education/machine-learning-model-deployments/scripts-folder.png)

2. Now open your digits folder and go inside the `setting.py` file. You can find your file with the help of the image below.

![settings img](/engineering-education/machine-learning-model-deployments/settings.png)

3. Add your apps into `installed apps` so that Django can recognized your apps.

```django
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'digitapp',
    'rest_framework',
]
```

4. Go to your app and make an empty file and name it `serializer.py` and add the following code to your file:

![app img](/engineering-education/machine-learning-model-deployments/app.png)

```Python
from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    class Meta():
        model = File
        fields = '__all__'

```

5. Open your `models.py` file and add the following code. We are adding a file field so that we can upload an image and our model can make a prediction from it.

```Python
from django.db import models


class File(models.Model):
    file = models.FileField(blank=False, null=False)
```
6. Open `app.py` and add the code below:

```Python
from django.apps import AppConfig


class DigitappConfig(AppConfig):
    name = 'digitapp'

```
7. We now have to open our `views.py` file. We will call all the files mentioned above with views and from views the code will go to our serializer and then continues to model. We will add the code below to let our views works for us.

```Python
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import FileSerializer
from scripts.predictionFromModel import *
import os


class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            dict_data = file_serializer.data
            location = []
            for k, v in dict_data.items():
                if k == 'file':
                    location.append(v)
            directory = '/home/Priyank/Documents/Django_projects/DigitRecognition/digits'+location[0]
            prediction = run_example(directory)
            return Response(prediction, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```

8. Now in order to access it on the web we have add a URL in our `urls.py` file which is inside the digit folder. Open the `urls.py` file and add the following URLs to it.

```Python
from django.contrib import admin
from django.urls import path
from digitapp.views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('digitRecogniser/', FileView.as_view())
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```

Now, your code will first come to your `urls.py` then it will be routed to `views.py` then `serializer.py`.

In your `views.py` file you are calling your "make-prediction-from-model.py" file and the run_example function will execute from there.

To test your model you can refer to the image below.

![sample img](/engineering-education/machine-learning-model-deployments/sample-image.png)

Now we have to run our model. Run by entering the command below.

```Python
python manage.py runserver
```

Open http://127.0.0.1:8000/digitRecogniser/ in your browser.

![django img](/engineering-education/machine-learning-model-deployments/django.png)

Now open your Postman. You can [download](https://www.postman.com/) it from here. Postman is a collaboration platform for API development. Postman's features simplify each step of building an API and streamline collaboration so you can create better APIs—faster.

Click on Post and paste your URL http://127.0.0.1:8000/digitRecogniser/ there.

Now click on body and then binary. Upload your sample-image.png file there and click on the send button.

You will get an output like this:

```Python
{"Predictions": 7}
```

Congratulations, you have deployed your ML model. Now, just go to any server in the production environment and push your code. Hope this helped you along the way and you now have a better understanding about ML models and how to deploy them.

### Further Reading
[Django](https://docs.djangoproject.com/en/3.0/)

[NeuralNetworks](https://pathmind.com/wiki/neural-network)

[ModelBuilding](https://www.kaggle.com/c/digit-recognizer)
