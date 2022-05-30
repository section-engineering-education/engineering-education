---
layout: engineering-education
status: publish
published: true
url: /how-to-handle-imbalanced-data-in-deep-neural-networks/
title: Implementing Undersampling, Oversampling, and SMOTE Techniques in Deep Neural Networks
description: This tutorial will implement undersampling, oversampling, and SMOTE techniques to balance the dataset.
author: willyngashu
date: 2022-05-28T00:00:00-23:48
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/hero.jpg
    alt: Handling imbalanced data in deep neural networks Hero image
---
In Deep Neural Networks (DNN), the goal is to implement various machine learning techniques to balance the classes before using the dataset. This tutorial will implement undersampling, oversampling, and SMOTE techniques to balance the dataset.
<!--more-->
A deep neural network is an artificial neural network that has many hidden layers between the input and output layers. It uses different datasets to produce a deep learning model. The final model can perform image classification, computer vision, and natural language processing. 

It can either use a balanced or imbalanced dataset. A balanced dataset is the best since it will produce an optimized deep learning model. An imbalanced dataset has an unequal number of data samples in the dataset classes and will not give the best model.

The goal is to implement various machine learning techniques to balance the classes before using the dataset. We will implement undersampling, oversampling, and SMOTE techniques to balance the dataset. 

We will start by building a deep neural network model using an imbalanced dataset and get the performance score. We will then implement the three techniques to balance the dataset classes and compare the performance scores of the model before and after balancing the dataset.

### Table of contents
- [Prerequisites](#prerequisites)
- [Building the deep neural network model using an imbalanced dataset](#building-the-deep-neural-network-model-using-an-imbalanced-dataset)
- [Counting the data samples in each class](#counting-the-data-samples-in-each-class)
- [Train and test split](#train-and-test-split)
- [Implementing the deep neural network](#implementing-the-deep-neural-network)
- [Initializing the Sequential model](#initializing-the-sequential-model)
- [Compiling the deep neural network](#compiling-the-deep-neural-network)
- [Fitting the compiled deep neural network](#fitting-the-compiled-deep-neural-network)
- [The performance scores](#the-performance-scores)
- [Predictions using the test samples](#predictions-using-the-test-samples)
- [Importing the classification report](#importing-the-classification-report)
- [Implementing the undersampling technique](#implementing-the-undersampling-technique)
- [Making predictions after implementing undersampling](#making-predictions-after-implementing-undersampling)
- [Classification report after implementing undersampling](#classification-report-after-implementing-undersampling)
- [Implementing the oversampling technique](#implementing-the-oversampling-technique)
- [Making predictions after implementing oversampling](#making-predictions-after-implementing-oversampling)
- [Classification report after implemening oversampling](#classification-report-after-implementing-oversampling)
- [Implementing the SMOTE technique](#implementing-the-smote-technique)
- [Making predictions after implemening SMOTE](#making-predictions-after-implementing-smote)
- [Classification report after implementing SMOTE](#classification-report-after-implementing-smote)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To better understand the techniques implemented in this tutorial, the reader should:
- Have [Python programming](https://www.programiz.com/python-programming) knowledge.
- Know [Deep Learning](/engineering-education/introduction-to-deep-learning/).
- Know some of the [Deep Learning algorithms](https://www.simplilearn.com/tutorials/deep-learning-tutorial/deep-learning-algorithm).
- Understand [neural networks](/engineering-education/introduction-to-neural-networks/).
- Know how to implement a simple [neural network with TensorFlow's Keras](https://www.tensorflow.org/guide/keras/sequential_model).
- Use [Google Colab](https://research.google.com/colaboratory/) to implement the techniques.

### Building the deep neural network model using an imbalanced dataset
We will build a customer churn classification model. The model will predict the number of customers who will close their accounts and leave the bank. We will use an imbalanced dataset to build the model. You will get the imbalanced dataset for this tutorial [here](https://drive.google.com/file/d/1Hlb7T2MssGpPXSdDZ8LqQfXgsrdMCC33/view?usp=sharing).

After downloading the dataset, we will load the dataset into our project using Pandas.

```python
import pandas as pd
```
To load the dataset, use this code:

```python
df = pd.read_csv("/content/customer_churn_final.csv")
```
We can also display some of the data points using this code:

```python
df.head()
```
The code displays the following data points:

![Imbalanced dataset](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/imbalanced-dataset.png)

Let's further explore our imbalanced dataset to have a detailed understanding of the dataset.

### Counting the data samples in each class
Our dataset has two classes `1` and a `0` class. The `1` class represents the customers who will leave the bank, and the `0` class represents the customer who will not leave the bank. Counting the data samples in each class will enable us to see the class imbalance.

```python
df.Churn.value_counts()
```
The code will display the following output:

![Counting the data samples](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/counting-data-samples.png)

The `0` class has 5163 data samples, and the `1` class has 1869 data samples. It shows we have a class imbalance, and we will balance the classes later on when implementing the three techniques. The `0` class is the majority class in the imbalanced dataset, and the `1` class is the minority.

#### Printing all the columns
To print all the columns, input this code:

```python
print(df.columns)
```
The code will print the following columns:

![Printing columns](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/printing-columns.png)

These are all the dataset columns. We have to select the input and output columns from this list.

### Selecting input and output columns
We select the input columns as follows:

```python
X = df.drop('Churn',axis='columns')
```
The input columns are all the columns except the `churn` column. We save them in the `X` variable. We select the output column as follows:

```python
y = testLabels = df.Churn.astype(np.float32)
```
The output column is the `Churn` column. We save it in the `y` variable.

### Train and test split
We will split the imbalanced dataset into train and test samples. We will use the `train_test_split` class for splitting the imbalanced dataset. To import this class, execute this code:

```python
from sklearn.model_selection import train_test_split
```
We then split the data samples as follows:

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=15)
```
Using this code, 80% of the data samples will be for deep neural network training, and 20% will be for testing. We also check the number of data samples in each class for the training set as follows:

```python
y_train.value_counts()
```
It gives the following output:

![Train value count](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/train-value-count.png)

We can also check the number of data samples in each class for the testing set as follows:

```python
y_test.value_counts()
```
It gives the following numbers:

![Test value count](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/test-value-count.png)

We have explored and prepared the imbalanced dataset. Let's implement the deep neural network.

### Implementing the deep neural network
We will use Keras to create the layers for the deep neural network. Let's import TensorFlow and then import Keras from TensorFlow.

```python
import tensorflow as tf
from tensorflow import keras
```
#### Initializing the Sequential model
A Sequential Keras model will enable us to build the multiple layers of the deep neural network sequentially (layer by layer). We will initialize the input layer, the hidden/intermediate layer, and the output layer. These layers will produce the final deep neural network model. Let's initialize all the layers and explain their functions.

```python
dnn_model = keras.Sequential([
    keras.layers.Dense(26, input_shape=(26,), activation='relu'),
    keras.layers.Dense(15, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])
```
The `Sequential` function will initialize the model. The deep neural network has multiple `Dense` layers as follows:

- 1st Dense layer: It acts as the input layer. It has 26 neurons since this is the number of input columns. We apply `relu` as an activation function because the output of this layer will be between 0 and positive infinite values.

- 2nd Dense layer: It acts as the hidden/intermediate layer. It has 15 neurons which further enhances the performance. We also apply the `relu` activation function.

- 3rd Dense layer: It acts as the output layer. It has one neuron that will output the neural network results. We can apply `sigmoid` as the activation function since the output will be between 0 and 1.

### Compiling the deep neural network
To compile the deep neural network, execute this code in Google Colab.

```python
dnn_model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])
```

We compile the deep neural network architecture using the `compile` function. The compilation process also has the following essential parameters.

- optimizer: It will improve and enhance the performance of the deep neural network. It also handles the errors of the deep neural network. We apply `adam` as the deep neural network optimizer during the compilation process.

- loss: It is the function that will calculate and accumulate all the errors that the neural network encounters when the training process starts. We use `binary_crossentropy` since the imbalanced dataset has two classes.

- metrics: It is the function that will get the overall deep neural network performance scores after the training process. We set its value to `accuracy`.

### Fitting the compiled deep neural network
To fit the compiled deep neural network to the training samples, execute this code in Google Colab:

```python
dnn_model.fit(X_train, y_train, epochs=100)
```
The compiled deep neural network uses the `fit` function to learn from the training sample. The deep neural network will run for 100 epochs to increase the overall performance scores. The code will display the following output:

![Fitting the deep neural network](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/fitting-the-dnn.png)

The deep neural network produces a final accuracy score of `0.8064`. We can not use the accuracy score when evaluating the performance of a model that uses an imbalanced dataset because the model will have a bias toward the majority class. The model will always predict the same class even if it has a high accuracy score. 

We therefore use the [Recall](https://towardsdatascience.com/methods-for-dealing-with-imbalanced-data-5b761be45a18), [Precision](https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall) and the [F1-score](https://towardsdatascience.com/the-f1-score-bec2bbc38aa6) performance scores. They focus on the performance of the individual classes after the neural network has made predictions.

### The performance scores
- Precision: The precision performance score indicates the true positive values in the prediction result divided by all the prediction values (both true positives and false positives values). 

- Recall: Recall performance score indicates the true positive values in the prediction result divided by the number of actual values in the test samples. It represents the true positive values that the deep neural network fails to identify after a prediction.

- F1-score: F1-score calculates the average of the precision and recall performance scores.

Read this [guide](https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall) to have a more detailed understanding. Let's make predictions using the test samples and get the performance scores. We will then print a classification report to show these performance scores for the two classes.

### Predictions using the test samples
To make a prediction using the test samples, execute this code:

```python
dnn_pred = dnn_model.predict(X_test)
```
The prediction outputs are probabilities between 0 and 1 (which can be decimals). We have to round off the results to the nearest whole number. 

We use the `round` method from NumPy.

```python
import numpy as np
dnn_pred = np.round(dnn_pred)
```
#### Importing the classification report
Let's import the `classification_report` that will print the performance scores:

```python
from sklearn.metrics import confusion_matrix , classification_report
```
To print the classification report, execute this code:

```python
print(classification_report(y_test,dnn_pred))
```
The code displays the following classification report:

![Classification report](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/classification-report.png)

Keenly observe the precision, recall, and f1-score values for both the classes (0 and 1). You will notice that the `0` class has higher score values than the `1` class. The scores need to be almost uniform for both the classes to ensure we can trust the model. 

Implementing dataset balancing using the three-techniques will ensure we give fair treatment to both classes. It will increase the performance score for the minority class. 

After implementing these three techniques, we will compare the precision, recall, and f1-score to see any improvements. Let's start by implementing the undersampling technique.

### Implementing the undersampling technique
The undersampling technique will reduce the data samples in the majority class (0) to have the same number as the minority class. We will use the Pandas `sample` method to perform undersampling. Let's execute this code to keep track of the number of data samples in each class:

```python
count_majority_class, count_minority_class = df.Churn.value_counts()
```
We then save the majority and minority classes in new variables as follows:

```python
df_majority_class = df[df['Churn'] == 0]
df_minority_class = df[df['Churn'] == 1]
```
Lets now apply the `sample` method as follows:

```python
df_class_undersample = df_majority_class.sample(count_minority_class)
```

We concatenate the undersampled majority class with the minority class. It will form a single data frame.

```python
df_balanced = pd.concat([df_class_undersample, df_minority_class], axis=0)
```
We then print the number of data samples in the new balanced dataset.

```python
print('Number of data samples after under-sampling:')
print(df_balanced.Churn.value_counts())
```
It prints the following output:

![Data samples after undersampling](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/after-undersampling.png)

We can see that the two classes have the same data samples. We have achieved a balanced dataset. Let's select the input and output column from the balanced dataset as follows:

```python
X = df_balanced.drop('Churn',axis='columns')
y = df_balanced['Churn']
```
We also need to get train and test splits as follows:

```python
X_train_bus, X_test_bus, y_train_bus, y_test_bus = train_test_split(X, y, test_size=0.2, random_state=15, stratify=y)
```
The `stratify` argument will ensure that the classes remain balanced after splitting. We also use the same splitting ratio. We again feed the dataset to our deep neural network as follows:

```python
dnn_model.fit(X_train_bus, y_train_bus, epochs=100)
```
The code will train the deep neural network using the balanced dataset and display the following output:

![Training after undersampling](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/training-after-undersampling.png)

We will also not use the accuracy to measure the performance of the deep neural network. Let's make predictions and get the classification report:

#### Making predictions after implementing undersampling
We execute this code:

```python
dnn_preds_bus = dnn_model.predict(X_test_bus)
```
We then execute this code to round off the prediction probabilities:

```python
dnn_preds_bus = np.round(dnn_preds_bus)
```
#### Classification report after implementing undersampling
To print the classification report execute this code:

```python
print(classification_report(y_test_bus,dnn_preds_bus))
```

![Classification report after undersampling](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/report-after-undersampling.png)

From the classification report, observe the precision, recall, and f1-score values for the `1` class. We can see the scores have improved compared to using the imbalanced dataset:
- The precision has increased from 0.64 to 0.73. 
- The recall has improved from 0.40 to 0.76. 
- The f-score has improved from 0.49 to 0.75.

These scores are also almost uniform for both classes. It ensures a fair treatment for both dataset classes during the classification process.

Let's move to oversampling technique.

### Implementing the oversampling technique
The oversampling technique will increase the data samples in the minority class (1) to have the same number as the majority class. It will duplicate the data samples in the minority class. We will also use the Pandas `sample` method to perform oversampling.

```python
df_class_oversample = df_minority_class.sample(count_majority_class, replace=True)
```
After applying the `sample` method, we concatenate the oversampled minority class with the majority class. It will form a single data frame.

```python
df_balanced_os = pd.concat([df_class_oversample, df_majority_class], axis=0))
```
We then print the number of data samples in the new balanced dataset.

```python
print('Number of data samples after over-sampling:')
print(df_balanced_os.Churn.value_counts())
```
It prints the following output:

![Data samples after oversampling](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/after-oversampling.png)

We can see that the two classes have the same data samples. We have achieved a balanced dataset. Let's also select the input and output column from the balanced dataset as follows:

```python
X = df_balanced.drop('Churn',axis='columns')
y = df_balanced['Churn']
```
We also need to get train and test splits as follows:

```python
X_train_bos, X_test_bos, y_train_bos, y_test_bos = train_test_split(X, y, test_size=0.2, random_state=15, stratify=y)
```
We feed the dataset to our deep neural network as follows:

```python
dnn_model.fit(X_train_bos, y_train_bos, epochs=100)
```
The code will train the deep neural network using the balanced dataset and display the following output:

![Training after undersampling](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/training-after-oversampling.png)

We will also not use the accuracy to measure the deep neural network performance. Let's make predictions and get the classification report:

#### Making predictions after implementing oversampling
We execute this code:

```python
dnn_preds_bos = dnn_model.predict(X_test_bos)
```
We then execute this code to round off the prediction probabilities:

```python
dnn_preds_bos = np.round(dnn_preds_bos)
```
#### Classification report after implementing oversampling
To print the classification report execute this code:

```python
print(classification_report(y_test_bos,dnn_preds_bos))
```
![Classification report after oversampling](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/report-after-oversampling.png)

From the classification report, observe the precision, recall, and f1-score for the `1` class. We can see the scores have also improved. 

This technique has performed much better:
- The precision has increased from 0.64 to 0.75. 
- The recall has improved from 0.40 to 0.86. 
- The f-score has improved from 0.49 to 0.80.  

Let's move to the SMOTE technique.

### Implementing the SMOTE technique
Synthetic Minority Oversampling Technique (SMOTE) is a machine learning technique that balances the dataset classes. It generates synthetic and unique data samples for the minority class to achieve a balanced dataset. We will import SMOTE from `Imbalanced-learn`. To install `Imbalanced-learn`, execute this command in Google Colab.

```bash
! pip install imbalanced-learn
```
To import SMOTE, execute this command:

```python
from imblearn.over_sampling import SMOTE
```
We then select the input and output columns as follows:

```python
X = df.drop('Churn',axis='columns')
y = df['Churn']
```
To balance the dataset, execute this code:

```python
smote_technique = SMOTE(sampling_strategy='minority')
X_smt, y_smt = smote_technique.fit_resample(X, y)
```
The `SMOTE` function uses the `sampling_strategy` parameter to balance the classes. To display the number of data samples in the new balanced dataset, execute this code:

```python
y_smt.value_counts()
```
It displays the following:

![Data samples after SMOTE](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/after-applying-smote.png)

We can see that the two classes have the same data samples. Let's get the train and test splits as follows:

```python
X_train_smt, X_test_smt, y_train_smt, y_test_smt = train_test_split(X_smt, y_smt, test_size=0.2, random_state=15, stratify=y_smt)
```
We then feed the dataset to the deep neural network.

```python
dnn_model.fit(X_train_smt, y_train_smt, epochs=100)
```
![Training using SMOTE](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/training-using-smote.png)

We will not use the accuracy to measure the deep neural network performance. Let's make the predictions and get the classification report:

### Making predictions after implementing SMOTE
To predict after applying SMOTE, execute this code:

```python
dnn_preds_smt = dnn_model.predict(X_test_smt)
dnn_preds_smt = np.round(dnn_preds_smt)
```
### Classification report after implementing SMOTE
To get a classification report after applying SMOTE, execute this code:

```python
print(classification_report(y_test_smt,dnn_preds_smt))
```
![Classification report after applying SMOTE ](/engineering-education/how-to-handle-imbalanced-data-in-deep-neural-networks/report-after-smote.png)

From the classification report, observe the precision, recall, and f1-score for the `1` class. 

We can see the scores have also improved:
- The precision has increased from 0.64 to 0.75. 
- The recall has improved from 0.40 to 0.89. 
- The f1-score has increased from 0.49 to 0.82. 

Using the three techniques, we have balanced the dataset and improved the performance scores.

### Conclusion
We have learned how to handle an imbalanced dataset in deep neural networks. We implemented undersampling, oversampling, and SMOTE techniques. We started by building the deep neural network model using an imbalanced dataset and got the performance score. We were building a customer churn classification model. We then implemented the three techniques to balance the dataset and also got the performance score. 

These three techniques improved the precision, recall, and f1-score for the deep neural network. You can access the Google Colab notebook for this tutorial [here](https://colab.research.google.com/drive/1CnIXJDJDZYmdfutQEYzo4Z0htKBgLurO?usp=sharing)

### References
- [What is imbalanced data?](https://www.analyticsvidhya.com/blog/2021/06/5-techniques-to-handle-imbalanced-data-for-a-classification-problem/)
- [Dealing with Imbalanced ata](https://towardsdatascience.com/methods-for-dealing-with-imbalanced-data-5b761be45a18)
- [Handling Imbalanced Datasets](/engineering-education/imbalanced-data-in-ml/)
- [Techniques to handle imbalanced datasets](https://www.kdnuggets.com/2017/06/7-techniques-handle-imbalanced-data.html)
- [Precision vs Recall](https://medium.com/@shrutisaxena0617/precision-vs-recall-386cf9f89488)
- [Classification: Precision and Recall](https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall)
- [Imbalanced-learn documentation](https://imbalanced-learn.org/stable/)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
