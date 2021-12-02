Gradio is an open-source Python library used to generate user interfaces(UIs) for machine learning models. The user interfaces are easily adjustable depending on the user's needs. Gradio provides customizable interactive components like drag and drop components. Others include buttons, text boxes, and checkboxes used to create the user interface.
 
It also allows users to upload images and other files right in the browser using file dialogs. This makes it easier to make beautiful and interactive user interfaces. The process of making user interfaces are simple and easy to use.

In this tutorial, we will start by exploring the functions of Gradio used to build user interfaces. Then, we will build a custom image classification model, and finally, we will create beautiful and interactive user interfaces using Gradio.

### Table of contents

- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Getting started with Gradio](#getting-started-with-gradio)
- [Implementing multiple inputs and outputs](#implementing-multiple-inputs-and-outputs)
- [Image classification model](#image-classification-model)
- [Adding human readable labels](#adding-human-readable-labels)
- [Building the sharable UI](#building-the-sharable-ui)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites

For a better understanding of this tutorial, the reader must have:
- Advanced knowledge in [Python programming](https://www.section.io/engineering-education/python-projects-for-beginners/).
- Knowledge on how to work with [machine learning models.](https://www.section.io/engineering-education/model-interpretation-using-lime/engineering-education/house-price-prediction/)
- Basic knowledge of [Google Colab notebooks.](https://colab.research.google.com/)

Let's get to it!

### Introduction

Gradio integrates with most Python libraries including: 
1. Hugging face: 
It is an open-source library used to build natural language processing applications.
2. Matplotlib: 
It is a Python library that is used for plotting diagrams during machine learning. Used for visualization.
3. Numpy: 
It is used for data analysis and manipulation.
4. PyTorch: 
It is used for computer vision and natural language processing.
5. Sckit-learn: 
It provides various classification, regression, and clustering algorithms for machine learning.
6. Tensorflow:
 It is used to perform tasks for machine learning and artificial intelligence.

Gradio can also be embedded in Jupyter notebooks and Google Colab notebooks. This does not require running a separate Python script. 
A user can interact with the model right in the working environment.

When you launch a Gradio interface, it automatically generates a public link. This link is sharable. It allows other people to interact with your application remotely. The link expires after 72 hours. 

You can also decide to host the application permanently on their servers which will cost you. 
Gradio has the following benefits.

#### Benefits of Gradio

- Enables you to create demos of your machine learning model.
The demos can be used to present ideas to clients, users, and team members before the actual application are implemented.

- Enable you to get user feedback.
Gradio allows the collection of feedback from the user. A developer can therefore make the necessary improvements.

- Easy debugging of models.
When using Gradio, you can easily identify bugs and errors in the model. This enables you to remove the bugs before production.

- Gradio has an easy setup
This makes it easy to use and develop models of machine learning apps.

- Permanent deployment and hosting of the application
Gradio enables you to permanently deploy the created application on their servers.
- Easily sharing of the application
Gradio generates a public link that enables other users to interact with the application remotely.

Let's now start exploring Gradio practically.

### Getting started with Gradio

To get started with Gradio, we need to install it into our machine. Since we are using Google Colab, we install Gradio using the following command:

```python
!pip install -q gradio
```

Then, import Gradio using the following command:

```python
import gradio as gr
```

Now we launch Gradio using a simple function. In the code below, we have created a function `greet` that will return `Hello` and the `name` the user inputs. 

```python
def greet(name):
 return "Hello " + name + "!"
```

The next thing, we will create a user interface using the following code:

```python
iface = gr.Interface(fn=greet, inputs="text", outputs="text")
iface.launch()
```

We build our interface using the `gr.interface` function. This function has the following parameters:

- `fn`
This takes the created function as an argument. In our case, the created function is `greet`.

- `inputs`
These are input component types that enter the Gradio interface. In our case, the input type is `text`.

- `outputs`
The ouput will be the text after processing.

We also need to launch the user interface using the `launch()` method.  After running the code above, the user interface will appear in the Google Colab notebook.

The user interface will also run in your browser using the following link: `https://localhost:7860/`.

![Gradio UI](/engineering-education/how-to-deploy-machine-learning-model-as-an-app-in-python-using-gradio/gradio-ui.png)

The user interface is interactive. You can input your name, for example, `kelvin`, and press the `submit` button and it outputs `Hello Kelvin`.

Gradio also provides a public link that can be accessed by anyone remotely. The link is `https://51358.gradio.app` and expires within 72 hours.

Let's look at another function.

This function can handle multiple inputs and outputs. Our first function could only handle one input.

### Implementing multiple inputs and outputs

The function above takes three parameters: `myname`, `is_day`, and `temperature`. The function returns the name of the user, the time of day, and the temperature in degrees celsius.

If it's day time, the user's interface will display `Good day`. If it's evening, the user interface will display `Good night`

```python
def greet(myname, is_day, temperature):
  greeting = "Good day" if is_day else "Good night"
  salute = "%s %s. It is %s cels today" % (
    greeting, myname, temperature)
  celsius = (temperature - 24) * 7 / 9
  return salute, round(celsius, 2)
```
Let's create the Gradio interface. The function to create the Gradio interface is shown below.

```python
iface = gr.Interface(
 fn=greetings, 
 inputs=["text", "checkbox", gr.inputs.Slider(0, 100)],
 outputs=["text", "number"])
iface.launch()
```
The `gr.Interface` takes in three-parameter.

- `fn`
Takes in the created function: `greet`.

- `inputs`
The input component will be a text type and a check box to select if the day is `is_day`.

We have also to specify `gr.inputs.Slider`. This is used to select the degree celsius of the day between `0` and `100`.

- `outputs`
This will display the output which will be in `text` form and `number` to represent the degrees celsius.

Let's check the outputs.

![Multiple inputs and outputs](/engineering-education/how-to-deploy-machine-learning-model-as-an-app-in-python-using-gradio/multiple-inputs-output1.png)

If the user does not select the checkbox the output is shown below.

![Multiple inputs and outputs](/engineering-education/how-to-deploy-machine-learning-model-as-an-app-in-python-using-gradio/multiple-inputs-output2.png)

Now that we have explored the functions of Gradio, let's start with the image classification model.

### Image classification model

Let's import the machine learning packages required for image classification.

```python
import tensorflow as tf
import numpy as np
import requests
```
We import the following.

#### Tensorflow
It's used to train our model to understand image classification. It contains deep neural networks with many layers that form the model architecture.
#### numpy
It will be used for data analysis and manipulation.

#### requests
It sends HTTP requests using Python. This enables us to interact with an external server.

Lets load the model.
```python
inception_net = tf.keras.applications.InceptionV3()
```
The `InceptionV3()` is used to handle image classification in the TensorFlow library.

### Adding human-readable labels

In this tutorial, we are dealing with the classification of various animal images. We need to add the real names of these animals into our model so that humans can understand.

```python
response = requests.get("https://git.io/JJkYN")
labels = response.text.split("\n")
```
 `requests.get` has been used to download all the names of animals from the given URL.  `response.text.split` is used to format the names and add them into the model as `labels`.

Let's now create a function to classify the images.

```python
def classify_image(inp):
    inp = inp.reshape((-1, 299, 299, 3))
    inp = tf.keras.applications.inception_v3.preprocess_input(inp)
    prediction = inception_net.predict(inp).flatten()
 return {labels[i]: float(prediction[i]) for i in range(2000)}
```
Let's understand the function above:

`inp.reshape`: Used to reshape our image into the given dimension to make it easier to use. We have also added our `inception_v3()` into our input images.

We flatten the input layer to make it fit with our model. Finally, we return the output after prediction using the `prediction()` method.

### Building the sharable UI

We start by initializing the input component of the Gradio UI. The input component holds the image given by the user during prediction.

The input component should match the dimensions given in the classification function. The input components will hold an image of the following dimension, `299, 299, 3`

In the code below, we have specified the `inputs. Image` as `299, 299` and `outputs.Label` will have a total of three predictions.

```python
image = gr.inputs.Image(shape=(299, 299))
label = gr.outputs.Label(num_top_classes=3)
```
Let's now create the actual user interface. The `gr.Interface` function has four parameters.

- lassify_image: This is a function used for image classification.
- Image: The image given by the user.
- Label: The output that will be given after the prediction.
- launch(): This Will be used to launch the Gradio interface on the Google Colab notebook or via a public link.

```python
gr.Interface(
    classify_image, 
    image, 
    label,
 capture_session=True).launch();
```
Once you run the codes above it will display the user interface as shown below.

![Image classification iterface](/engineering-education/how-to-deploy-machine-learning-model-as-an-app-in-python-using-gradio/image-classification-user-interface.png)

The image above shows the Gradio user interface. The user interface has an input component that allows you to drag and drop an image to be classified.

Let's download an image of a lion or any other animal. Drag and drop or upload the image into the input component. 

Click the submit button to see the prediction results. The prediction results are shown below.

![Prediction results](/engineering-education/how-to-deploy-machine-learning-model-as-an-app-in-python-using-gradio/prediction-results.png)

Gradio gave the prediction results as follows. 
- lion: 98% probability.
- cheetah: 0% probability.
- Arabian camel: 0% probability.

This shows that our model was able to make a right prediction of a lion with a probability of `98%`. Gradio has also deployed our application into a public link of `https://39965.gradio.app` which will expire after 72 hours.

The GIF image below shows you how to add another image to the input component.

![GIF image](/engineering-education/how-to-deploy-machine-learning-model-as-an-app-in-python-using-gradio/gif-image.png)

You can also decide to permanently deploy the application on the Gradio servers. This will cost you a monthly subscription. For now, this machine learning model can be used for production.

### Conclusion

In this tutorial, we have learned about how to deploy a machine learning model as an app in Python using Gradio. We started by discussing the benefits of Gradio and how it generates beautiful user interfaces.

We explored Gradio functions and created user interfaces using these functions. From there we started to build an image classification model, our model was able to classify animal images. 

Finally, people can now access the public link and interact with the application. Using this tutorial, a reader should be able to deploy a machine learning model as an app in Python using Gradio.

### References

- [Google Colab link](https://colab.research.google.com/drive/17J054uCNRhGAmCbeyl7w0OYZjfB4AJcV?usp=sharing)
- [Benefits of using Gradio](https://towardsdatascience.com/gradio-graphical-interfaces-for-machine-learning-models-fd4880964f8f)
- [Tensorflow documentation](https://www.tensorflow.org/)
- [Gradio documentation](https://gradio.app/)
