---
layout: engineering-education
status: publish
published: true
url: /deploying-machine-learning-model-as-an-app-in-python-using-gradio/
title: How to Deploy Machine Learning Model as an App in Python Using Gradio
description: This tutorial gives a step-by-step guide on how to build an image classification model using Gradio and deploying it as an app.
author: kelvin-kimani-ngure
date: 2021-12-22T00:00:00-15:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

   - url: /engineering-education/deploying-machine-learning-model-as-an-app-in-python-using-gradio/hero.png
     alt: Deploying Machine Learning Model as an App in Python Using Gradio Hero Image
---
Gradio is an open-source python library that allows you to quickly create easy-to-use, customizable UI components for your machine learning model. 
<!--more-->
Gradio allows you to integrate the GUI directly into your Python notebook making it easier to use.

In this tutorial, we will explore various Gradio functions and build a simple Gradio interface. 

We will then use the Gradio functions to build an image classification model. Finally, we will deploy the web application so that it can be accessed using a browser.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Getting started with Gradio](#getting-started-with-gradio)
  - [Benefits of using Gradio](#benefits-of-using-gradio)
- [Installing Gradio](#installing-gradio)
- [Simple Gradio interface](#simple-gradio-interface)
- [Implementing multiple inputs and outputs](#implementing-multiple-inputs-and-outputs)
- [Image classification model](#image-classification-model)
  - [Tensorflow](#tensorflow)
  - [numpy](#numpy)
  - [requests](#requests)
- [Adding human-readable labels](#adding-human-readable-labels)
- [Building the UI using Gradio](#building-the-ui-using-gradio)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
For a better understanding of this tutorial, the reader must have:
- Advanced knowledge in [Python programming](https://www.section.io/engineering-education/python-projects-for-beginners/).
- Knowledge on how to work with [machine learning models.](https://www.section.io/engineering-education/model-interpretation-using-lime/engineering-education/house-price-prediction/)
- Basic knowledge of [Google Colab notebooks.](https://colab.research.google.com/)

Let's get started!

### Getting started with Gradio
Gradio is a powerful tool that integrates with most Python libraries including:

1. Hugging face:
   It is an open-source library used to build natural language processing applications.
2. Matplotlib:
   It is a Python library used for visualization in machine learning.
3. Numpy:
   It is used for data analysis and manipulation.
4. PyTorch:
   It is used for computer vision and natural language processing.
5. Sckit-learn:
   It provides various classification, regression, and clustering algorithms for machine learning.
6. Tensorflow:
   It is used to perform machine learning and artificial intelligence tasks.

Gradio can also be embedded in Jupyter notebooks and Google Colab notebooks. This does not require running a separate Python script. A user can interact with the model right in the working environment.

When you launch a Gradio interface, it automatically generates a link. It allows other people to interact with your application remotely using the link.

Let's look at the key benefits of Gradio in detail.

#### Benefits of using Gradio
- Enables you to create demos of your machine learning model. These demos can be used to present ideas to clients, users, and team members before the actual application is implemented.

- Gradio allows the collection of feedback from the user. A developer can, therefore, make the necessary improvements.

- When using Gradio, you can easily identify bugs and errors in the model. This enables you to remove the bugs before production.

- Gradio has an easy setup which makes it easier to build models of machine learning apps.

- Gradio enables you to permanently deploy an application on online servers.
  
- Gradio generates a public link that enables other users to interact with the application remotely.

### Installing Gradio
To get started with Gradio, we need to install it on our computers. Since we are using Google Colab, we install Gradio using the following command:

```python
!pip install -q gradio
```

Then, import Gradio using the below command:

```python
import gradio as gr
```

We will start by creating simple Gradio interfaces before we build the image classification model.

### Simple Gradio interface
To create a user interface, we will start by creating a simple `greet` function. The function will return `Hello` and the name of the user.

The function is created using the code below:

```python
def greet(name):
  return "Hello " + name + "!"
```

The next thing, we need to add the logic to create a user interface. The user interface will allow users to input their names.

```python
iface = gr.Interface(fn=greet, inputs="text", outputs="text")
iface.launch()
```

In this code, we have built our interface using the `gr.interface` function. This function has the following parameters:

- `fn` - This takes the created function as an argument. In our case, the created function is `greet`.

- `inputs` - These are input component types that users enter in the Gradio interface. In our case, the input type is `text`.

- `outputs` - The output will be the text after processing.

We now launch the user interface using the `launch()` method. The UI will appear in the Google Colab notebook. 

The user interface will also run in your browser using the following link: `https://localhost:7860/`.

![Gradio UI](/engineering-education/deploying-machine-learning-model-as-an-app-in-python-using-gradio/gradio-ui.png)

The user interface is interactive. You can input your name, for example, `kelvin`, and press the `submit` button and it outputs `Hello Kelvin`. 

Gradio also provides a unique URL/public link that allows people to access your application. The link is `https://51358.gradio.app` which can also be found in the Google Colab notebook.

In the next example, we will create a user interface that can handle multiple inputs and outputs.

### Implementing multiple inputs and outputs
We will use a Python function that takes in three parameters: `myname`, `is_day`, and `temperature`. 

The function returns the name of the user, the time of day, and the temperature in degrees celsius.

If it's morning, the user's interface will display `Good Morning`. 

Incase it's evening, the user interface will display `Good Evening`. This can be achieved using the following code:

```python
def greet(myname, is_day, temperature):
  greeting = "Good Morning" if is_day else "Good Evening "
  salute = "%s %s. It is %s degrees today" % (
    greeting, myname, temperature)
  celsius = (temperature - 24) * 7 / 9
  return salute, round(celsius, 2)
```

Let's create the Gradio interface. The function used to create the Gradio interface is shown below:

```python
iface = gr.Interface(
 fn=greetings,
 inputs=["text", "checkbox", gr.inputs.Slider(0, 100)],
 outputs=["text", "number"])
iface.launch()
```

The `gr.Interface` takes in three-parameter:

- `fn`. It takes in the created function: `greet`.

- `inputs` - The input component will be a text type and a check box to select if the day is `is_day`.

- We also have to specify `gr.inputs.Slider`. This is used to select the degree celsius of the day between `0` and `100`.

- `outputs`- This will display the output which will be in `text` form and `number` to represent the degrees celsius.

Let's check the output:

![Multiple inputs and outputs](/engineering-education/deploying-machine-learning-model-as-an-app-in-python-using-gradio/multiple-inputs-output1.png)

If the user does not select the checkbox, the output will be as shown below:

![Multiple inputs and outputs](/engineering-education/deploying-machine-learning-model-as-an-app-in-python-using-gradio/multiple-inputs-output2.png)

So far, we have created two Gradio user interfaces using various functions. We were able to access the user interface both in the Google Colab application and browser. 

Let's now use Gradio to create the image classification model.

### Image classification model
To build the image classification model, we need to import the machine learning packages.

These packages will be used to build the model. Gradio will be utilized to build the user interface for the model. 

This enables users to interact with the application. We import them using the following code:

```python
import tensorflow as tf
import numpy as np
import requests
```

#### Tensorflow
It's used to train our model to understand image classification. It contains deep neural networks with many layers that form the model architecture.

#### numpy
It will be used for data analysis and manipulation.

#### requests
It sends HTTP requests using Python. This enables us to interact with an external server.

Let's load the method used for image classification:

```python
inception_net = tf.keras.applications.InceptionV3()
```

The `InceptionV3()` method is used to handle image classification in the TensorFlow library.

### Adding human-readable labels
In this section, we are dealing with the classification of animal images. We need to add the real names of these animals into our model so that humans can understand them. 

This is done using the following code:

```python
response = requests.get("https://git.io/JJkYN")
labels = response.text.split("\n")
```

In this code, `requests.get` has been used to download all the animal names from "https://git.io/JJkYNURL". 

`response.text.split` is used to format the names and add them into the model as `labels`.

Let's now create a function to classify the images:

```python
def classify_image(inp):
    inp = inp.reshape((-1, 299, 299, 3))
    inp = tf.keras.applications.inception_v3.preprocess_input(inp)
    prediction = inception_net.predict(inp).flatten()
 return {labels[i]: float(prediction[i]) for i in range(2000)}
```

Let's understand the function above:

`inp.reshape` is used to reshape our image into the given dimension to make it easier to use. We have also added our `inception_v3()` into our input images.

We flatten the input layer to make it fit in our model. Finally, we return the output after prediction using the `prediction()` method.

### Building the UI using Gradio 
We start by initializing the input component of the Gradio UI. The input component holds the image uploaded by the user. 

The user will be able to upload an animal image in the UI, then the machine learning model should be able to classify the animal and output its name.

The input component should match the dimensions given in the classification function. The input components will hold an image with a dimension of `299, 299, 3`.

The code below specifies the `inputs`. `Image` as `299, 299` and `outputs.Label` will have a total of `three` predictions. 

The three predictions are all the possible predictions made by the model.

```python
image = gr.inputs.Image(shape=(299, 299))
label = gr.outputs.Label(num_top_classes=3)
```

Let's now create the Gradio interface using the following function:

```python
gr.Interface(
    classify_image,
    image,
    label,
 capture_session=True).launch();
```

The `gr.Interface` function has four parameters:
- `classify_image`: This function is used for image classification.
- `Image`: The image provided by the user.
- `Label`: The output that will be displayed after the prediction.
- `launch()`: This Will be used to launch the Gradio interface on the Google Colab notebook or via a public link.

Once you run the above code, it will display the user interface as shown below.

![Image classification interface](/engineering-education/deploying-machine-learning-model-as-an-app-in-python-using-gradio/image-classification-user-interface.png)

The above user interface has an input component that allows one to drag and drop or upload an image to be classified.

Let's download an image of a lion or any other animal. Drag and drop or upload the image into the input component.

Click the submit button to see the prediction results:

![Prediction results](/engineering-education/deploying-machine-learning-model-as-an-app-in-python-using-gradio/prediction-results.png)

Gradio gave the prediction results as follows:

- lion: 98% probability.
- cheetah: 0% probability.
- Arabian camel: 0% probability.

This shows that the model was able to make a right prediction of a lion with a probability of `98%`.

Gradio also automatically deploys the image classification application. We can access the application using a unique URL/public link: `https://39965.gradio.app`.

This link will be available in your Google Colab notebook once you launch the user interface. 

Therefore, we have successfully deployed our application. It will be accessible via the unique URL. This machine learning application can be used for production.

### Conclusion
In this tutorial, we have learned about how to deploy a machine learning model as an app in Python using Gradio. 

We started by discussing the benefits of Gradio and how it generates beautiful user interfaces.

We then explored Gradio functions and created user interfaces using these functions. From there, we built an image classification model which was able to classify animal images.

Finally, the application was automatically deployed. People can now interact with the application using the unique URL provided by Gradio. 

Therefore, this tutorial will help readers to deploy a machine learning model as an app in Python using Gradio.

To get this image classification model, click [here](https://colab.research.google.com/drive/17J054uCNRhGAmCbeyl7w0OYZjfB4AJcV?usp=sharing)

### Further reading
- [Google Colab link](https://colab.research.google.com/drive/17J054uCNRhGAmCbeyl7w0OYZjfB4AJcV?usp=sharing)
- [Benefits of using Gradio](https://towardsdatascience.com/gradio-graphical-interfaces-for-machine-learning-models-fd4880964f8f)
- [Tensorflow documentation](https://www.tensorflow.org/)
- [Gradio documentation](https://gradio.app/)

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
