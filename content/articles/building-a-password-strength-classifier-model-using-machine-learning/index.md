---
layout: engineering-education
status: publish
published: true
url: /building-a-password-strength-classifier-model-using-machine-learning/
title: Building a Password Strength Classifier Model Using Machine Learning
description: This tutorial gives a step-by-step guide on how to build a password classification model with machine learning, from model building to training datasets.
author: kelvin-kimani-ngure
date: 2022-01-26T00:00:00-10:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-password-strength-classifier-model-using-machine-learning/hero.jpg
    alt: Building a Password Strength Classifier Model Using Machine Learning Hero Image
---
Password strength is used to measure how effective a password is against external attacks. External attacks are in form of password cracking or brute-force attacks. They aim to gain unauthorized access to a computer system or network.
<!--more-->
The strength of a password is usually measured using its complexity, length, and unpredictability.

Cyber crimes and data breaches are on the rise, and the main cause for this is usually compromised passwords.

In this tutorial, we will build a password classification model using [Scikit-Learn](https://scikit-learn.org/). The model will give the strength of a password from the lowest strength labeled `0` to the highest strength labeled `2`.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Passwords dataset](#passwords-dataset)
- [Loading dataset into Google Colab](#loading-dataset-into-google-colab)
- [Checking missing values](#checking-missing-values)
  - [Removing missing values](#removing-missing-values)
- [Convert dataset into an array](#convert-dataset-into-an-array)
- [Dataset shuffling](#dataset-shuffling)
- [Adding features and labels](#adding-features-and-labels)
- [Tokenization process](#tokenization-process)
- [Converting word tokens into numerical data](#converting-word-tokens-into-numerical-data)
  - [Initialiazing TfidfVectorizer](#initialiazing-tfidfvectorizer)
- [Splitting vectorized dataset](#splitting-vectorized-dataset)
- [Building the model](#building-the-model)
- [Accuracy score using the training dataset](#accuracy-score-using-the-training-dataset)
- [Model testing](#model-testing)
- [Accuracy score using the testing dataset](#accuracy-score-using-the-testing-dataset)
- [Single prediction](#single-prediction)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To understand the concepts explained in this tutorial easily, you should:
- Have [Python programming](/engineering-education/python-projects-for-beginners/) knowledge.
- Be able to build a simple [machine learning](/engineering-education/house-price-prediction/) model.
- Have some [data analysis](https://www.datapine.com/blog/data-analysis-methods-and-techniques/) knowledge.
- Understand basic concepts about [natural language processing](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn).
- Write the Python code using [Google Colab notebook](https://research.google.com/).

### Passwords dataset
The dataset used was collected from different websites through web scraping. The dataset contains several passwords with different strengths. We will use this dataset to train our model.

A glimpse of the dataset is shown below:

![Passwords dataset](/engineering-education/building-a-password-strength-classifier-model-using-machine-learning/dataset-used.jpg)

To download the password dataset, click this [link](https://drive.google.com/file/d/1k3-lTk-HvRDIwLPWd5cXCE8zljvIvmaJ/view?usp=sharing). After downloading the passwords dataset, load the dataset into the Google Colab notebook.

### Loading dataset into Google Colab
For us to load the dataset, we need the Pandas Python library. Let's import pandas.

```python
import pandas as pd
```

To load the dataset using Pandas, run this code:

```python
pswd_data = pd.read_csv("/content/data.csv",error_bad_lines=False)
```

In the code above, we have added the `error_bad_lines=False` command so that `pandas` reads only the complete data samples from the datasets. Adding this command our dataset will be loaded with no errors.

To know if our dataset is successfully loaded, run this code:

```python
pswd_data.head()
```

This code will output the structure of the loaded dataset with all the columns. The output is shown below:

![Loaded dataset](/engineering-education/building-a-password-strength-classifier-model-using-machine-learning/loaded-dataset.jpg)

From the image above, our dataset has `password` and `strength` columns. The `password` column holds the password text and the `strength` columns contain the password strengths.

To check all the password strength values, run this code:

```python
pswd_data['strength'].unique()
```

The output is shown below:

```bash
array([1, 2, 0])
```

From the output above, our password strength has three values. `0` represents the weakest passwords, `1` for medium passwords, and `2` for strongest passwords.

This dataset may have missing values, let's now check for missing values in our dataset.

### Checking missing values
Missing values make the dataset incomplete and this gives inaccurate results. To check for missing values, use this code:

```python
pswd_data.isna().sum()
```

The output is shown below:

![Missing values](/engineering-education/building-a-password-strength-classifier-model-using-machine-learning/missing-values.jpg)

#### Removing missing values
From the image above, our dataset has one missing value. Let's remove the missing value using the following code:

```python
data.dropna(inplace=True)
```

To check if the missing value is removed, run this code:

```python
data.isnull().sum()
```

The output is as shown below:

![Removing missing values](/engineering-education/building-a-password-strength-classifier-model-using-machine-learning/removing-missing-values.jpg)

After removing the missing values, we will convert our dataset into an array.

### Convert dataset into an array
An array is much easier to work with. We will therefore use the NumPy Python library. To import NumPy, use this code:

```python
pswd = np.array(pswd_data)
```

To see the array, run this code:

```python
pswd
```

The output is shown below:

![Removing missing values](/engineering-education/building-a-password-strength-classifier-model-using-machine-learning/dataset-array.jpg)

The next step is to shuffle our dataset randomly. Shuffling the dataset will make the dataset more robust. This will prevent the model from memorizing the dataset and ensure the model learns from the dataset.

### Dataset shuffling
When using a shuffled dataset, the model will understand patterns and relationships within our dataset.

To shuffle our dataset, we will import the `random` Python package.

```python
import random
```

We can now randomly shuffle the dataset using the following code:

```python
random.shuffle(pswd)
```

### Adding features and labels
In machine learning, features are all the unique independent variables in our dataset that are used as the model's input. Here, our features are located in the `password` column. The `password` column holds all the text passwords that will train our model.

Labels are variables in our dataset that are used as output for the model. Here, our labels are located in the `strength` column. The `strength` column has three values, 0, 1, and 2.

We will add the features and labels using the following code:

```python
ylabels  = [s[1] for s in pswd]
allpasswords = [s[0] for s in pswd]
```

In the code above, we save our labels in the `ylabels` variable. The code loops through the columns and selects the last column(1) as the labels. We also save our features in the `allpasswords` column. The code loops through the columns and selects the column(0) as the features.

Run the following code to check the number of passwords and labels in our dataset:

Number of labels:

```python
len(ylabels)
```

The output is shown below:

```bash
669639
```

Number of passwords:

```python
len(allpasswords)
```

The output:

```bash
669639
```

From the output above, the dataset is big and has many data samples. We can now use the dataset to build our model.

### Tokenization process
Tokenization is the process of breaking text data into simpler characters called tokens. We will break our password text into word tokens which we will use as input for our model.

To perform this process, we will create a custom function. The function `createTokens` will loop through our dataset and return the converted tokens.

```python
def createTokens(f):
    tokens = []
 for i in f:
        tokens.append(i)
 return tokens
```

### Converting word tokens into numerical data
Machine learning models do not comprehend text. We therefore need to further convert the word tokens to numeric data.

We will use the `TfidfVectorizer` package to convert the word tokens into numeric data (vectors of numbers). Using the `TfidfVectorizer`, it will convert based on the frequency of occurrence of each word token in the dataset.

For further understanding of how `TfidfVectorizer` works in details, click [here](https://medium.com/@cmukesh8688/tf-idf-vectorizer-scikit-learn-dbc0244a911a).

We will import this package using the following code:

```python
from sklearn.feature_extraction.text import TfidfVectorizer
```

Lets initialize `TfidfVectorizer`:

#### Initialiazing TfidfVectorizer

```python
vectorizer = TfidfVectorizer(tokenizer=createTokens)
```

In the code above we have initialized `TfidfVectorizer` and also passed `createTokens` function as an argument. We will then fit `vectorizer` into our dataset using the `fit_transform` method to convert it into numeric data.

```python
X = vectorizer.fit_transform(allpasswords)
```

Our input data (features) is saved in the `allpasswords` variable.

### Splitting vectorized dataset
Splitting datasets creates two sets; one will be used for training the model and the other for testing. To split the dataset, we will use `train_test_split`.

```python
from sklearn.model_selection import train_test_split
```

The splitting function will be as follows:

```python
X_train, X_test, y_train, y_test = train_test_split(X, ylabels, test_size=0.2, random_state=42)
```

We have used a `test_size=0.2` so that `80%` of the data is used for training and `20%` for testing.

Let's now build the model!

### Building the model
We will build our model using the `DecisionTreeClassifier` algorithm. This algorithm is best suited for classification problems. It produces a model with a very accurate score:

```python
from sklearn.tree import DecisionTreeClassifier
```

To use the algorithm, we will initialize it using the following code:

```python
clf=DecisionTreeClassifier()
```

Finally, we fit the algorithm onto the train set dataset. This will ensure that the model fully learns from the dataset. Over time, the model will understand patterns and relationships within our dataset:

```python
clf.fit(X_train, y_train)
```

Let's calculate the accuracy score of this trained model.

### Accuracy score using the training dataset
To get the accuracy score, use this code:

```python
print("Accuracy :",logit.score(X_test, y_test))
```

The accuracy score is shown below:

```bash
Accuracy : 0.9998114655103219
```

This is `99.98114%`. This being the first training; it is a good accuracy score. We will test this model using the test dataset.

### Model testing
We will use the data as input for the trained model so that it can classify the data points in this dataset.

```python
y_pred=clf.predict(X_test)
y_pred
```

It will produce the following output:

```bash
array([0, 0, 1, ..., 1, 1, 0])
```

### Accuracy score using the testing dataset
In this section, we will be checking the accuracy score using the testing dataset so we get to know if our model is over-fitted. Over-fitting occurs when the model performs very well using the training dataset but poorly using the testing dataset.

Use this code:

```python
print("Accuracy :",clf.score(X_test, y_test))
```

The output is as shown below:

```bash
Accuracy : 0.9738516217669195
```

This is `97.385`. It is still a good accuracy score if we compare it with the one obtained using the training dataset. Therefore, our model is not over-fitted and can be used to make single predictions.

For more information on model over-fitting, click [here](/engineering-education/dropout-regularization-to-handle-overfitting-in-deep-learning-models/).

### Single prediction
In a single prediction, we input sample passwords to our model for it to make predictions. We will use the following input passwords:

```python
X_predict = ['drshsyqb*',
 'python'
 'littledotsK18@#',
 'password##@',
 'ajd1348#28t**',
 'gtddsdsaa',
 'silasaw',
 '123456',
 'abcdef']
```

To make these predictions, run the following code:

```python
X_predict = vectorizer.transform(X_predict)
y_Predict = clf.predict(X_predict)
print(y_Predict)
```

From the code above, the `vectorizer.transform` method will convert the password text into numeric data. `clf.predict` method will perform the prediction. `print` will print the prediction results, as shown below:

```bash
[1 2 1 2 1 0 0 2]
```

From the output above, the model was able to classify the password strengths. `0` represents the weakest passwords, `1` for medium passwords, and `2` for strongest passwords.

### Conclusion
In this tutorial, we have learned how to build a password strength classifier model using machine learning. We started by performing data pre-processing to correctly format our dataset. We then used this dataset to train our model.

After training the model, it was able to make accurate predictions. This model can further be deployed and used as a real application.

This tutorial has used guided steps, the Python code used in this tutorial can be found [here](https://colab.research.google.com/drive/1I_sXiqaN6fGKtsYXWGnxfv4MiyVfTUim?usp=sharing).

### References
- [Trained model in this tutorial](https://colab.research.google.com/drive/1I_sXiqaN6fGKtsYXWGnxfv4MiyVfTUim?usp=sharing)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [Decision tree algorithm](/engineering-education/decision-tree-in-python/)

I hope you find this article helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
