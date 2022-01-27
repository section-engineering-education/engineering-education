---
layout: engineering-education
status: publish
published: true
url: /spam-detection-model-using-scikit-learn/
title: Building a Spam Detection Model using Scikit-Learn
description: In this tutorial, we will build a machine learning model that will detect Youtube comments as either spam or non-spam.
author: james-omina
date: 2022-01-11T00:00:00-09:37
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spam-detection-model-using-scikit-learn/hero.png
    alt: Spam Detection Model using Scikit-Learn example image 
---
Spam is a large number of unsolicited messages that are sent to a large number of people. The messages may be for advertising, fraudulent purposes, or malware spreading. Spams can be informed of comments left on personal sites or emails sent in bulk.
<!--more-->
Spam detection helps in detecting these spam messages and comments. Spam detection models filter out unwanted messages and comments. This ensures an individual receives messages or notifications that are crucial to them.
When building the spam detection model, we will provide the model with a dataset that consists of spam and non-spam comments.
The model will learn from this dataset and find relevant patterns that will help it to distinguish between spam and non-spam comments. 

This tutorial will demonstrate how to build a machine learning model that will detect Youtube comments as spam or non-spam. We will use a dataset that contains a list of comments from popular Youtube channels to train our model. Finally, we will implement the model using the Naive Bayes algorithm.

### Table of contents
- [Prerequisites](#prerequisites)
- [Dataset preparation](#dataset-preparation)
- [Extracting important columns](#extracting-important-columns)
- [Feature extraction from text](#feature-extraction-from-text)
- [Model building](#model-building)
- [Accuracy score of our model](#accuracy-score-of-our-model)
- [Model evaluation](#model-evaluation)
- [Making a single prediction](#Making-a-single-prediction)
- [Making another prediction](#making-another-prediction)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
A reader should know the following to understand this tutorial clearly:

- Be well equipped with [Python programming](/engineering-education/python-projects-for-beginners/) skills.
- Understand the concepts of [machine learning.](/engineering-education/house-price-prediction/)
- Have some knowledge about [natural language processing](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/).
- Know how to work with some of the [Scikit-learn](https://scikit-learn.org/stable/) algorithms.
- Know how to build a machine learning model using [Google Colab notebook](https://research.google.com/).

### Dataset preparation
The dataset used contains a list of comments from popular Youtube channels. We will use a dataset collected from five Youtube channels. We need to prepare this dataset to be ready for use. Data preparation involves correctly formatting our dataset to make it easy for use by the model during training.

First, we need to load these datasets into our machine. Let's import the packages that will load our dataset.

```python
import pandas as pd
import numpy as np
```
We will use `Pandas` to read the datasets and `Numpy` to perform mathematical operations on these datasets. We will have five datasets since we have collected the dataset from five Youtube channels. 

To download the five datasets in a ZIP file, click [here](https://drive.google.com/file/d/1rF1qv4onQQ-DH0MRJdVtKnm0pAApDk96/view?usp=sharing). After downloading the ZIP file, extract the individual datasets, which we will load onto our machine.

To load the five datasets, use the following code:

```python
df1 = pd.read_csv("Youtube01-Channel1.csv")
df2 = pd.read_csv("Youtube02-Channel2.csv")
df3 = pd.read_csv("Youtube03-Channel3.csv")
df4 = pd.read_csv("Youtube04-Channel4.csv")
df5 = pd.read_csv("Youtube05-Channel5.csv")
```
Now we have five datasets, we need to concatenate or merge them. We will join the five datasets together to have a single data frame.

#### Datasets concatenation
We create a single data frame for the datasets and then apply the `concat` method to join them together.

```python
frames = [df1,df2,df3,df4,df5]
df_merged = pd.concat(frames)
```
To view our merged datasets, use the following code:

```python
df_merged
```
The output is shown below:

![Merged dataset](/engineering-education/spam-detection-model-using-scikit-learn/merged-dataset.jpg)

From the image above, our dataset has five columns: `COMMENT_ID`, `AUTHOR`, `DATE`, `CONTENT`, and `CLASS`. The columns that we are most interested in are `CONTENT` and `CLASS` columns.

`CONTENT` column represents the actual Youtube comments. The `CLASS` column is labeled either `0` or `1`. `0` represents non-spam comments, and `1` represents spam comments.

The merged dataset contains five datasets. We need to assign keys to our merged dataset to distinguish each dataset. 

#### Assigning keys
Assigning keys enables the model to know the Youtube channel that a dataset belongs to. We will have five keys to represent the five datasets as shown below.

```python
keys = ["Channel1","Channel2","Channel3","Channel4","Channel5"]
```
After initializing the five keys, we need to concatenate these keys into our dataset using the following code:

```python
df_with_keys = pd.concat(frames,keys=keys)
```
The code above will add the keys to the dataset. It will also group the dataset according to the Youtube channels. This makes it easy for the model to understand and manipulate the dataset. 

The model will easily identify useful insights and patterns from the dataset during training. To view this dataset with the added keys, use this code:

```python
df_with_keys
```
The output is shown below:

![Merged dataset with keys](/engineering-education/spam-detection-model-using-scikit-learn/added-keys.jpg)

We can save the dataset into a new variable, `df`.

```python
df = df_with_keys
```
To check the size of the dataset, run the following code:

```python
df.size
```
The output is shown below:

```bash
9780
``` 
After combining the five datasets, we have `9780` Youtube comments.

Let's check for any missing values in our dataset.

### Checking for missing values
To check for missing values, use the following code:

```python
df.isnull().isnull().sum()
```
The output is shown below:

```bash
COMMENT_ID    0
AUTHOR        0
DATE          0
CONTENT       0
CLASS         0
dtype: int64
```
From the output above, there are no missing values. Therefore, our dataset is ready for use.

### Extracting important columns
We need to extract the important columns from our dataset. As mentioned earlier, we are interested in only two columns, `CONTENT` and `CLASS`. 

The `CONTENT` column contains the actual Youtube comments. This column will be used as an input for the model. The `CLASS` column contains` 0` and `1` labels. This column will be used as an output or target for the model.

To extract these two columns, use this code:

```python
df_data = df[["CONTENT","CLASS"]]
```
We now need to specify which column will be used as an input and which one will be used as an output. This is done using the following code:

```python
df_x = df_data['CONTENT']
df_y = df_data['CLASS']
```
From the code above, `df_x` is the input variable and `df_y` is the output or target variable. After specifying our input and output variables, let's perform feature extraction.

### Feature extraction from text
Feature extraction is the process of getting important characteristics from the raw text. Machine learning models do not understand the text and can not use text directly. That's why we have to perform feature extraction. The extracted features will now be used as inputs for the model.

We have to convert the raw text into a vector of numeric values during feature extraction. The vectors of numeric values represent the original raw text. Machine learning models easily understand numeric values and can use them directly.

This process of converting raw text to vectors of numeric values will be done using the `CountVectorizer` Python package. `CountVectorizer` is a powerful tool from [Scikit-learn](https://scikit-learn.org/) library that speeds up this feature extraction process from text.

Let's import `CountVectorizer`.

```python
from sklearn.feature_extraction.text import CountVectorizer
```
We will then use `CountVectorizer` to perform feature extraction on our input variable, `df_x`.

```python
corpus = df_x
cv = CountVectorizer()
X = cv.fit_transform(corpus)
```
In the code above, we save the input variable into a new variable, `corpus`. The `fit_transform` ensures that the `CountVectorizer` completely fits our input dataset and no data point is left out. Therefore, all the raw text will be converted into vectors of numeric values.

To view these vectors of numeric values, use this code. The code will convert the numeric values into an array of numbers.

```python
X.toarray()
```
The output is shown below:

![Converted text](/engineering-education/spam-detection-model-using-scikit-learn/vectors-numbers.jpg)

We can now use this vector of numbers to build the model.

### Model building
To build our machine learning model, we need to import the packages that will be useful during this process.

```python
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
```

**MultinomialNB**

This is the classification method imported from the Naive Bayes algorithm. Naive Bayes algorithm has other methods such as GaussianNB, but MultinomialNB is best suited because we are working with text.

We will use the MultinomialNB method to build our spam detection model.

For a detailed understanding of the different Naive Bayes algorithm methods, click [here.](https://towardsdatascience.com/naive-bayes-classifier-81d512f50a7c)

**train_test_split**

We will use this package to split our dataset into two sets. The model will use the first set for training, and the second set for testing.

We will start by splitting the dataset.

#### Dataset splitting
To split the dataset, use the following code:

```python
X_train, X_test, y_train, y_test = train_test_split(X, df_y, test_size=0.30, random_state=42)
```
From the code above, we have a `test_size=0.30`. This means the algorithm uses 70% of data for training the model, and `30%` will be used to test the model.

Let's now build the model using the `MultinomialNB` method. First, we initialize the `MultinomialNB` method as follows:

```python
clf = MultinomialNB()
```
After initializing this method, we fit our model into our dataset. This enables the model to learn by identifying useful insights and patterns from the dataset.

#### Model fitting
```python
clf.fit(X_train,y_train)
```
### Accuracy score of our model
To calculate the accuracy score of this trained model, use this code:

```python
print("Accuracy of Model",clf.score(X_test,y_test)*100,"%")
```
The accuracy score is shown below:

```bash
Accuracy of Model 91.95046439628483 %
```
This is a very high accuracy score, and the model has a high chance of making accurate predictions. We can now evaluate this model using the testing dataset.

### Model evaluation
We will use this model to classify the Youtube comments in the testing dataset as either spam or non-spam.

```python
clf.predict(X_test)
```
We use the `predict` method to classify all the Youtube comments in the testing dataset. The output is shown below:

![Model evaluation](/engineering-education/spam-detection-model-using-scikit-learn/model-evaluation.jpg)

From the image above, we can see the model assigned labels to our testing dataset. The labels are either `0` or `1`.

We can use this model to make a single prediction.

### Making a single prediction
We will use input text to predict, as shown below.

```python
comment = ["Check this out I will be giving 50% offer on your first purchase"]
vect = cv.transform(comment).toarray()
```
The input text is "Check this out". We will use the model to classify the text into either spam(1) or non-spam(0). We also need to convert the input text into vectors of numeric values using `cv.transform` method. Finally, the numeric values will be converted into an array of numbers using the `toarray()` method.

To make this prediction, run this code:

```python
clf.predict(vect)
```
The prediction result is shown below:

```bash
array([1], dtype=int64)
```
The prediction result is `1`, which shows that the Youtube comment above is `spam`. We can use this mode to make another prediction.

### Making another prediction
We will follow the same steps as above to make a second prediction.

```python
comment1 = ["Great song Friend, it has really touched my heart"]
vect = cv.transform(comment1).toarray()
clf.predict(vect)
```
The prediction result is shown below:

```bash
array([0], dtype=int64)
```
The prediction result is `0`, which shows that the comment is `non-spam`. Using these two predictions, we can see that our model can distinguish between spam and non-spam comments. 

### Conclusion 
In this tutorial, we have learned how to build a spam detection model. We started by preparing our dataset to format our dataset correctly. We had five datasets that were collected from popular Youtube channels. After preparing the dataset, we used it to build our spam detection model. The model was able to distinguish between spam and non-spam comments. This was the tutorial's goal, and we have successfully built a spam detection model.

To get this spam detection model in Google Colab, click [here](https://colab.research.google.com/drive/1UPgeF-7EI1pZQ_QXS_h_D2VW2eI97BNl?usp=sharing).

### References
- [Google Colab notebeook](https://colab.research.google.com/drive/1UPgeF-7EI1pZQ_QXS_h_D2VW2eI97BNl?usp=sharing)
- [What is spam detection?](https://bdtechtalks.com/2020/11/30/machine-learning-spam-detection/)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [Naive bayes algorithm](https://en.wikipedia.org/wiki/Naive_Bayes_classifier)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
