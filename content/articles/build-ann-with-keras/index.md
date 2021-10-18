---
layout: engineering-education
status: publish
published: true
url: /build-ann-with-keras/
title: Building an Artificial Neural Network with Keras
description: In this article, you will learn how to build and train an Artificial Neural Network with Keras.
author: iniabasi-affiah
date: 2021-07-20T00:00:00-11:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-ann-with-keras/hero.png
    alt: Build an ANN with Keras example image
---  

In this article, you will learn how to build and train an artificial neural network with Keras. We will make a model that will tell us if a customer will churn. That can be very useful in businesses. 

If you know the customers that will churn, you can provide these customers with better offers. So you can retain them. We will use machine learning to determine customers that are likely to churn. We have a sample dataset from a bank. We will predict the customers that will stop banking with this bank. Here is the GitHub [repo](https://github.com/Inyrkz/Customer-Churn) for this project.

### Prerequisites
To follow along with this tutorial, you need to have:
-	Basics of [Artificial Neural Network](https://www.section.io/engineering-education/introduction-to-neural-networks/).
-	[Google Colab](https://colab.research.google.com/).
-	Download the Churn modeling dataset from [Kaggle](https://www.kaggle.com/adammaus/predicting-churn-for-bank-customers).

### Table of contents

-	[Import Libraries](#import-libraries)
-	[Data preprocessing](#data-preprocessing)
-	[Build and visualize the Artificial Neural Network](#build-and-visualize-the-artificial-neural-network)
-	[Training the ANN](#training-the-ann)
-	[Evaluating the model](#evaluating-the-model)

### Import libraries

Most of the libraries we will be using have been pre-installed on Google Colab. So, we import them into our code:

```python
import numpy as np
import pandas as pd
import tensorflow as tf
```
Let us confirm the version of Tensorflow we are using. No need to import Keras as it runs on top of Tensorflow 2.

```python
print(tf.__version__)
```

#### Output
```bash
'2.5.0'
```

Let us load our dataset. If you are running the codes with Google Colab, then upload the dataset first. Click on the folder icon on the left panel.

![click on folder icon](/engineering-education/build-ann-with-keras/upload-dataset.PNG)

Then click on the upload icon.

![Upload_dataset](/engineering-education/build-ann-with-keras/upload-data.PNG)

Go to the directory where the dataset is, in your local computer, and select it. Click Open, to upload the dataset to Colab.

![Select dataset in local directory](/engineering-education/build-ann-with-keras/select-dataset.PNG)

![Uploaded dataset](/engineering-education/build-ann-with-keras/uploaded-dataset.PNG)

Let's load our dataset and display the first five records:

```python
dataset = pd.read_csv('/content/Churn_Modelling.csv')
dataset.head()
```

![first 5 rows of dataset](/engineering-education/build-ann-with-keras/dataset.PNG)

### Data preprocessing

Not all the features in our dataset are helpful. We do not need the row number, customer id, and customer names. These features will not help us predict if the customer will churn. Hence, we can get rid of them. We use the code below to separate the features and the label.

```python
X = dataset.iloc[:, 3:-1].values
y = dataset.iloc[:, -1].values
print(X)
print(y)
```
Here are the features and labels obtained after separation:

![features of dataset](/engineering-education/build-ann-with-keras/features.PNG)

![dataset label](/engineering-education/build-ann-with-keras/labels.PNG)

You notice that there are some categorical variables in our dataset. They are in the geography and gender columns. We have to encode these variables. Since there are two unique variables in the `Gender` column, we label-encode it. Then, we one-hot encode the `Geography` column.

One-Hot Encoding creates new columns in the dataset. The number of new columns created depends on the number of unique values in the column to be one-hot encoded. These new columns replace the geography column. For instance, `1.0, 0.0, 0.0` represents a customer from `France`.

Label Encoding the `gender` column replaces the texts with numbers. `0` represents `Female`, while `1` represents `Male`.

```python
# label encode the gender column
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
X[:, 2] = le.fit_transform(X[:, 2])
print(X)
```
This is the result obtained after label-encoding:

![label encode the gender column](/engineering-education/build-ann-with-keras/label-encoding.PNG)

```python
# one-encode the geography column
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [1])], remainder='passthrough')
X = np.array(ct.fit_transform(X))
print(X)
```
This is the result obtained after one-hot encoding:

![one hot encode the geography column](/engineering-education/build-ann-with-keras/onehot-encoding.PNG)

Next, using the code below, we split our dataset into training and testing set:

```python
# split the dataset into train and test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)
```

Finally, we perform feature scaling. It is vital in deep learning as it helps to reduce the training time.

```python
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)
print(X_train)
```
These are the results obtained after feature-scaling:

![feature scaling](/engineering-education/build-ann-with-keras/feature-scaling.PNG)

Now that that's done, let's build and visualize our ANN.

### Build and visualize the Artificial Neural Network

We build our neural network with the `Sequential()` class. We first create the input layer with 12 nodes. Twelve is the number of rows in our training set. We then add the hidden layers. 

To keep things simple, we use two hidden layers. The initial hidden layer has 12 nodes, while the next layer has 8 nodes. In the hidden layers, we use the [relu activation function](https://en.wikipedia.org/wiki/Rectifier_(neural_networks)). 

Finally, we add the output layer. We use a single node at the output layer since we have only two categories. We also use the [sigmoid activation function](https://en.wikipedia.org/wiki/Sigmoid_function) at the output layer. It will give us the probability of a customer churning.

```python
# Initializing the ANN
ann = tf.keras.models.Sequential()
# Add the input layer and first hidden layer
ann.add(tf.keras.layers.Dense(units=12, activation='relu', input_shape=X_train[0].shape))
# Add the second hidden layer
ann.add(tf.keras.layers.Dense(units=8, activation='relu'))
# Add the output layer
ann.add(tf.keras.layers.Dense(units=1, activation='sigmoid'))
```

Now that we have created our model, let's use the code below to visualize it:

```python
from tensorflow.keras.utils import plot_model
plot_model(ann,
           to_file="model.png",
           show_shapes=True,
           show_layer_names=True,
          )
```

#### Output

![Artificial Neural Network Plot](/engineering-education/build-ann-with-keras/plot-model.PNG)

We can also use the [NN-SVG](https://alexlenail.me/NN-SVG/) tool to visualize our model:

![ANN Visualization using NN-SVG](/engineering-education/build-ann-with-keras/NN-SVG-architecture.PNG)

### Training the ANN

In training the ANN, we perform a couple of tasks:

- We compile the model with the [Adam optimizer](https://keras.io/api/optimizers/adam/).
- We use the binary [cross-entropy loss](https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html). 
- We train the model for 100 epochs.

```python
ann.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])
ann.fit(X_train, y_train, batch_size = 32, epochs = 100)
```

![Last 11 epoch of training](/engineering-education/build-ann-with-keras/last-eleven-epochs-of-training.PNG)

### Evaluating the model

Now that our model training is completed, we can make predictions on a single customer. Let us find out if a customer with the details below will churn:

| Record      | Details     |
| :---        |    :----:   |
| Country   | Spain       |
| Credit Score| 600         |
| Gender      | Male        |
| Age         | 40 years  |
| Tenure      | 3 years     |
| Balance remaining  | $60000      |
| Number of Products owned | 2    |
| Own a Credit Card? | Yes          |
| Is an Active Member? | Yes        |
| Estimated Salary | $50000 |

```python
print(ann.predict(sc.transform([[0, 0, 1, 600, 1, 40, 3, 60000, 2, 1, 1, 50000]])))
```

#### Output
```bash
[[0.04270527]]
```

Remember that after one-hot encoding, `0, 0, 1` represents the geographical location, `Spain`. It will be in the first three columns of our matrix of features.

We can add a threshold of 0.5. The customer will leave the bank if the predicted probability is above 0.5. In extreme situations, we can increase the threshold. That is if we want our model to predict `True` only if it is very confident.

```python
print(ann.predict(sc.transform([[0, 0, 1, 600, 1, 40, 3, 60000, 2, 1, 1, 50000]])) > 0.5)
```

#### Output
```bash
[[False]]
```

This is great news for the bank! This customer will not churn. Let us assess our model using the test set:

```python
y_pred = ann.predict(X_test)
y_pred = (y_pred > 0.5)
pd.DataFrame(list(zip(y_test, y_pred)), columns=['Actual', 'Predicted'])
```

![Actual Values vs Predicted Values](/engineering-education/build-ann-with-keras/actual-vs-predicted-values.PNG)

It looks like our model got most of the predictions right. But, it made a mistake for the second customer in our test set. We can check the accuracy score, and build a confusion matrix. 

```python
from sklearn.metrics import confusion_matrix, accuracy_score
print(confusion_matrix(y_test, y_pred))
print(accuracy_score(y_test, y_pred))
```

#### Output
```bash
[[1506  89]
 [193  212]]
0.859
```

The accuracy score is 85.9%. Out of 2000 cases, our model predicted 1718 cases correctly.
The confusion matrix shows the number of True Positives, False Positives, False Negatives, and True Negatives.

Our model inaptly predicted that 193 customers churn (False Positives), and 89 customers did not churn (False Negatives). But it correctly predicted that 1506 customers churn (True Positives), and 212 customers did not churn (True Negatives). 

### Conclusion

In this guide, we learned how to build, visualize and train an ANN using Keras. We made a model that shows the customers that will leave a bank. 

We got an accuracy of 85.9%. Now you can make an artificial neural network and train on any dataset. There is no definite architecture to use. You can study different architectures. The goal is to see which one gives you a better result.  You can start by using the architectures in deep learning research papers.

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)