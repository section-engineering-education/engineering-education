---
layout: engineering-education
status: publish
published: true
url: /a-beginner-guide-to-softmax-regression-using-tensorflow/
title: A Beginner's Guide to SoftMax Regression Using TensorFlow
description: In this article, we will walk through a simple example of using TensorFlow to implement a softmax regression model.
author: bonface-ndolo
date: 2022-04-19T00:00:00-18:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education//a-beginner-guide-to-softmax-regression-using-tensorflow/hero.png
   alt: Beginner's Guide to SoftMax Regression Using TensorFlow Example Image
---


This article introduces basic softmax regression and its implementation in Python using tensorflow to the learner. While implementing softmax regression in Python using TensorFlow, we will use the MNIST handwritten digit dataset. MNIST forms the basics of machine learning just like 'hello world' forms the basics of programming. Classifying the MNIST handwritten digit dataset is a low-level problem in machine learning which can be solved in many ways.
<!-- more -->
### Introduction

This article does not focus on designing a complex machine learning model. Instead, we will focus on basic TensorFlow concepts. Softmax regression is used in TensorFlow using various dependencies such as NumPy, matplotlib, and TensorFlow.

This article also utilizes knowledge from logic regression and how it is implemented in Python using softmax regression.
Logistic regression can be termed a supervised classification algorithm. It is applied in a classification problem where the output/target variable(y) only takes discrete values for available inputs/set of features(x).
Python comes with various libraries that one can use to implement logistic regression.

### Table of Contents

- [Prerequisite](#prerequisite)
- [Ooverview of Softmax Regression](#overview-of-softmax-regression)
- [Softmax regression implementation on the MNIST handwritten digit dataset using Tensorflow](#softmax-regression-implementation-on-the-mnist-handwritten-digit-dataset-using-tensorflow)
- [Conclusion](#conclusion)

### Prerequisite

- The learner should have basic knowledge of programming. They should be equipped with knowledge of the python programming language. (<https://github.com/Akuli/python-tutorial>)
- Running python codes requires python3 or the latest version. (<https://www.python.org/downloads/>)
Tensorflow basic knowledge is also required to understand TensorFlow concepts in this article quickly. (<https://github.com/Akuli/python-tutorial>)
- Download TensorFlow from(<https://www.tensorflow.org/install/>)
- Logic regression knowledge in Python also comes in handy. (<https://github.com/IKMLab/Logistic-Regression-Tutorial>)

### Overview of Softmax Regression

The softmax function forms the basis of softmax regression. The softmax function(or normalized exponential function) can be viewed as a normalization function involving adjusting values calculated on different scales to an ideally similar scale. Softmax regression is a form of logistic regression used when multiple classes are handled.

In a binomial/binary logistic regression, we target a variable that can only take two possibilities, that is, 0 or 1 to represent "True" or "False" for an i<sup>th</sup> observation, x<sub>i</sub> belong to {0,1}

Let's consider a scenario where the target variable takes in two or more class labels, such that for i<sup>th</sup> observation, x<sub>i</sub> belong to the range betw een 0 and 9.
Softmax/multinomial logistic regression would be appropriate in such a scenario.

We are defining our model.

- We first give our dataset 'n' features, 'm' observations, and 'z' class labels, such that each observation can be classified as a 'k' possible target value. For example,**suppose** we have a dataset of 100 28x28 vector size handwritten digit images, we get n=100, m=28x28=784, and k=10.

- 'x' feature matrix\
The x feature matrix is defined as:

![xfeature](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/xfeature.png)

x<sub>ij</sub> signifies j<sup>th</sup> feature value for the i<sup>th</sup> observation. The matrices imension is;

![xmatrix](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/xmatrix.png)

- 'w' weight matrix\
The w weight matrix is defined as;

![wfeature](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/wfeature.png)

w<sub>ij</sub> signifies the weight labeled to i<sup>th</sup> feature for the j<sup>th</sup> class. The matrices dimension is;
  
![wmatrix](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/wmatrix.png)

- logic score matrix\
We now define our logic score(net input) matrix z as z=xw. The matrices dimension is;

![logicmatrix](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/logicmatrix.png)

The logic matrix 'z' soignifies the probabiloty of label j for the i<sup>th</sup> observation.

We can use the logic vector score for the i<sup>th</sup> observation as z<sub>i</sub>. For instance, the vector z<sub>5</sub>=(1.0,2.5,3.5,4.1,1.5,0.4,1.3,1.1,0.3) can represent each class labels score ranging from 0 to 9  in the MNIST handwritten classification case for the 5<sup>th</sup> observation. The maximum score becomes 5.2, corresponding to class label '3'. This shows that our model predicts the 5<sup>th</sup> image to be '3'.

- The softmax layer\
Training the model using score values becomes hard since differentiating them becomes challenging when applying the gradient descent algorithm. The softmax function helps covert the 'z' score matrix to probabilities. For a vector y<sub>i</sub> the softmax function s<sub>(y)</sub> can be defined as;

![softmaxmatrix](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/softmaxmatrix.png)

The softmax function converts all scores to probabilities and then sums up the probabilities to 1.

Our sofmax function computes the probabiliuty that the i<sup>th</sup> training sample is from the <sub>j</sub> class for the logic vector z<sub>(i)</sub> as;
  
![logicvector](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/logicvector.png)

We will denote the softmax probabiliry for the i<sup>th</sup> observation as s<sub>i</sub>

- Target one-hot encoded matrix\
One-hot encoding occurs when a target vector corresponds to each observation comprising 0's and 1's, with 1 being a correct label. The diagram below shows how one-hot encoding.

![one-hot-encoding](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/one-hot-encoding.png)

We can denote T<sub>i</sub> as one-hot encoding vector for the i<sup>th</sup> observation.

- cost function\
The cross-entropy concept (variates two probability distribution measures) can be used to variate one-hot encoded vector and softmax probability distance. The distance values depend on the target classes.

The cross entropy function, D(S<sub>i</sub>,T<sub>i</sub>) for the i<sup>th</sup> observation  with the softmax vector probability , S<sub>i</sub> and one=hot target vector can be defined as;

![cost-function](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/cost-function.png)

The average cross-entropy defines the cost function,<sub>j</sub>, as;
  
![cross-entropy](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/cross-entropy.png)

- Gradient descent algorithm
We now compute two gradient descent derivatives, 

![g1](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/g1.png)

and

![g2](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/g2.png)

To train our softmax model. The gradient descent derivatives can be used to improve the biases and weights contrary to the gradients, 
  
![weight1](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/weight1.png)

and 

![weight2](/engineering-education/softmax-regression-using-tensorflow.md/c:/users/macha/desktop/softmax/weight2.png) 
  
for every instance of class <sub>j</sub>, that is, (1,2,3,...,k) with alpha being the learning rate.

Let us create a softmax regression model using Tensorflow to manipulate the MNIST handwritten dataset.

### Softmax regression implementation on the MNIST handwritten digit dataset using Tensorflow 

MNIST's (Modified National Institute of Standards and Technology) handwritten digit dataset is used to train image processing models for the handwritten digit classification set. It is also used in training machine learning and deep learning models.
The MNIST dataset features 60,000 small square training images and 10,000 testing images on a 28 x 28-pixel scale of single handwritten digits between 0 and 9. Each data point has two parts describing the 28 x 28 size image, an image(x) and a label(y)

Tensorflow is a free end-to-end open-source platform for training machine learning models. Tensorflow features a broad and flexible environment of libraries and tools for machine learning. In addition, it provides a python programming interface that we will need for this article.

In this tutorial, we will train a softmax function model that will recognize a handwriting digit by comparing each pixel in the image, then train the model using TensorFlow to predict the image by looking at a couple of examples already labeled. First, let us look at the steps.

1. Import required packages\

Let us begin by importing TensorFlow and NumPy libraries.

```py3
import tensorflow as tf
from tensorflow import keras
import numpy as np
```

We import the packages and use them as a short form of the package's name to avoid re-using the full name in our code.
NumPy(Numerical Python) is a virtual library for programming in Python. NumPy consists of a multidimensional array object and various routines for handling those arrays.
Matplotlib is a vast library for data visualization and graphical plotting in python programming. However, matplotlib being too broad, we only import the pyplot interface for plotting.

2. Download MNIST Data\

Yann LeCun's website (<http://yann.lecun.com/exdb/mnist/index.html>) provides the official details of the MNIST dataset. In addition, Tensorflow library comes packed with the MNIST dataset for use in artificial intelligence.

```py3
((train_data, train_labels),
(mnist_data, mnist_labels))=tf.keras.datasets.mnist.load_data()
```

The above code downloads the MNIST data from the tensorflow.keras library. Each image is decompressed into an array of size 784 and saved as data.

3. process the data\
The MNIST dataset features 60,000 small square training images and 10,000 testing images of 28 x 28-pixel scale of single handwritten digits between 0 and 9, each flattened into a 1-dimension array of size 784. Each data point has two parts describing the 28 x 28 size image, an image(x) and a label(y).

```py3
train_data=train_data/np.float32(255)
train_labels=train_labels.astype(np.int32)

mnist_data=mnist_data/np.float32(255)
mnist_labels=mnist_labels.astype(np.int32)

```

The images in the MNIST dataset range from 0 to 255. we divide the train_data with 32-bit float since a 32-bit precision is most commonly used in training models. We then convert the labels to an integer of 32-bit.

4. Define 28x28 numerical features.\
Next step, we train the classifier.

```py3
feature_columns=[tf.feature_column.numeric_column("x",
shape=[28,28])]

```

The above code represents the feature as numerical features of size 28x28. feature_column defines the set of transformations to the input.

5. Logistic regression estimator\
We make use of a linear classifier.

```py3
classifier=tf.estimator.LinearClassifier(
    feature_columns=feature_columns,
    n_classes=10,
    model_dir="mnist_model/"
)
```

This dataset only contains categorical features hence the feature_column. The estimator only requires to know the classification algorithm to be performed on the dataset. We
use a linear classifier as our estimator, passing the feature_colimns. The estimator trains, evaluate, predicts, and exports the model.

7. Build an input function for the above etimator\
We predict a particular picture to determine whether it is consistent with an actual image.

```py3
train_input_fn=tf.compat.v1.estimator.inputs.numpy_input_fn(
        x={"x":train_data},
        y=train_labels,
            batch_size=100,
            num_epochs=None,
            shuffle=True)
```

The `train_input_fn` is used for predictions and evaluation. `train_input_fn=tf.compat.v1.estimator.inputs.numpy_input_fn` is used to return the function used to feed the numpy dict array into the model with x representing the dict features and y the dict targets.
`batch_size=100` returns the integer batch size.     `num_epochs=None` represents the number of iterative epochs over the data. None means it will run forever. `shuffle=False` is supposed to shuffle the queue when the value is actual.

8. Train the classifier

```py3
classifier.train(input_fn=train_input_fn, steps=5)
```

We train the model where steps define how many times will train the model.

9. Validate data
We now create an input_fn function to validate the data.

```py3
val_input_fn=tf.compat.v1.estimator.inputs.numpy_input_fn(
        x={"x":mnist_data},
        y=mnist_labels,
        num_epochs=1,
        shuffle=False)
```

10. Evaluate the classifier

```py3
mnist_results=classifier.evaluate(input_fn=val_input_fn)
print(mnist_results)
```

We get an accuracy of 89.4% after 130 steps. This model trains for a specific number of steps and logs the value after ten steps.

### Conclusion

-Softmax regression using TensorFlow is an excellent technique for solving image recognition problems in machine learning.
-Softmax regression is applied in many areas, such as image recognition in neural networks. Output values from a hidden layer would be treated as input values by the output layer and computed for probabilities by softmax. The highest probability class would be treated as the final class.

Happy coding!
