---
layout: engineering-education
status: publish
published: true
url: /detecting-malicious-url-using-machine-learning/
title: Detecting Malicious URL using Machine Learning
description: In this tutorial, we will learn how to build a Machine Learning model to detect malicious URLs.
author: bravin-wasike
date: 2022-01-20T00:00:00-08:11
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/detecting-malicious-url-using-machine-learning/hero.jpg
    alt: Detecting Malicious URL using Machine Learning Hero Image
---

A malicious URL is a website link that is designed to promote virus attacks, phishing attacks, scams, and fraudulent activities. When a user clicks a malicious URL they can download computer viruses such as trojan horses, ransomware, worms, and spyware.

The end goal of these viruses is to access personal information, damage the user's device, and for financial gain. They may also destroy the company's network, leading to losses.

A malicious URL can also be used to lure people to submit their personal information on a fake website. This makes these people share their personal and sensitive information with unknown people. They use the information for an ulterior motive. The harm caused by these malicious URLs can be very large.

In this tutorial, we will build a machine learning model that can be able to detect these malicious URLs. We will train our model using a dataset with URLs labeled both `bad` and `good`. We will build the model using [Scikit-learn](https://scikit-learn.org/stable/) Python library.

### Table of contents
- [Prerequisites](#prerequisites)
- [Exploring our dataset](#exploring-our-dataset)
- [Loading dataset](#loading-dataset)
- [Dataset cleaning](#dataset-cleaning)
- [Features and labels](#features-and-labels)
- [Importing packages](#importing-packages)
- [Convert the text data into a vectors of numbers](#convert-the-text-data-into-a-vectors-of-numbers)
- [Dataset splitting](#dataset-splitting)
- [Model building using LogisticRegression](#model-building-using-logisticregression)
- [Fitting algorithm](#fitting-algorithm)
- [Calculating the model's accuracy score](#calculating-the-model's-accuracy-score)
- [Making predictions](#making-predictions)
- [Another prediction](#another-prediction)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To understand this tutorial easily, a reader should:

- Have [Python programming](/engineering-education/python-projects-for-beginners/) skills.
- Understand [machine learning](/engineering-education/house-price-prediction/) processes.
- Have some [natural language processing](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn) knowledge.
- Know some [Scikit-learn](https://scikit-learn.org/stable/) algorithms.
- Code using [Google Colab notebook](https://research.google.com/).

### Exploring our dataset
To build this model, we will use a dataset with URLs labeled both `bad` and `good`. The model will learn from the dataset and gain useful knowledge which it will use to make predictions. The dataset is shown below.

![Dataset used](/engineering-education/detecting-malicious-url-using-machine-learning/dataset-used.jpg)

The URLs dataset can be downloaded from [here.](https://drive.google.com/file/d/18QthCgAj-ENJ1U7ky0f6HWtpXXFgp0eO/view?usp=sharing)

After successfully downloading the URLs dataset, we can now load this dataset into our notebook.

### Loading dataset
We will use the Pandas package to load our package. To import Pandas, use the following code:

```python
import pandas as pd
```

We can now load the dataset using the following code:

```python
urls_data = pd.read_csv("urldata.csv")
```

After loading the dataset, let's see how it is structured using the following code:

```python
urls_data.head()
```

The output is shown below:

![Dataset structure](/engineering-education/detecting-malicious-url-using-machine-learning/dataset-structure.jpg)

From the image above, the dataset has two columns. The first column is `url` which represents the actual ULR links. The second column is `label` which contains both `bad` and `good` URLs.

From here, we now need to clean our dataset to make it ready to be used by our model during training.

### Dataset cleaning
Dataset cleaning involves removing noise from our dataset. Noise is unnecessary characters in the text data, punctuations, and repetitive words.

Removing noise from our dataset will enable the model to focus only on the most important information in the dataset. This will increase the model performance. The model will be able to make accurate predictions.

In this tutorial, we will first split the texts, then remove repetitions in the dataset. Finally, we will remove the `com` from each URL.

We will create a custom Python function to clean our dataset. The function is shown below.

```python
def makeTokens(f):
    tkns_BySlash = str(f.encode('utf-8')).split('/') # make tokens after splitting by slash
    total_Tokens = []

 for i in tkns_BySlash:
        tokens = str(i).split('-') # make tokens after splitting by dash
        tkns_ByDot = []

 for j in range(0,len(tokens)):
            temp_Tokens = str(tokens[j]).split('.') # make tokens after splitting by dot
            tkns_ByDot = tkns_ByDot + temp_Tokens
        total_Tokens = total_Tokens + tokens + tkns_ByDot
    total_Tokens = list(set(total_Tokens))  #remove redundant tokens

 if 'com' in total_Tokens:
        total_Tokens.remove('com') # removing .com since it occurs a lot of times and it should not be included in our features
 
 return total_Tokens
```

The function above is named `makeTokens`. The function is used to split our text by slash, dash, and dot. This will ensure we have a clean text with these unnecessary characters.

The function will also remove the redundant words in the text. Finally, it removes the `com` word using the `total_Tokens.remove('com')` method. The function will then return a clean text.

After this text cleaning, we now need to add features and labels to our dataset.

### Features and labels
Features are the unique data points in our dataset that are used as input for the model during training. Features are represented by the `url` column, which is our input column.

In machine learning, a label is the model's output after prediction. It is represented using the `label` column. The model's output can either be `bad` or `good`.

To add these features and labels, use this code:

```python
url_list = urls_data["url"]
y = urls_data["label"]
```

Let's now start importing the machine learning packages.

### Importing packages
To build our machine learning model, we have various Python packages that are essential for this process. We will import all the important packages and explain their functions later.

To import these packages, use this code:

```python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
```

The functions of each of these packages are as follows:

**LogisticRegression**

This is a [Scikit-learn](https://scikit-learn.org/stable/) algorithm that we will use to train our model. This algorithm will enable our model to understand patterns and relationships in our dataset. The model will gain useful knowledge and insight, which it will use to make predictions.

**train_test_split**

This is the function in Sklearn model selection for splitting data arrays into two subsets: for training data and for testing data.

**TfidfVectorizer**

This package will enable the model to understand and manipulate text data. Text is a big problem for machines, machines cannot consume text in its raw form. We need to convert text into vectors of numbers that machines can read and understand.

`TfidfVectorizer` is used to convert the raw text data into vectors of numbers that represents the original text. This text is converted based on the frequency of occurrence of each word in the text data.

For further reading on how `TfidfVectorizer` works, read this [article](https://towardsdatascience.com/text-vectorization-term-frequency-inverse-document-frequency-tfidf-5a3f9604da6d).

Let's now use these packages.

#### Convert the text data into vectors of numbers
To convert the text data into vectors of numbers, use this code:

```python
vectorizer = TfidfVectorizer(tokenizer=makeTokens)
```

We convert the text using `TfidfVectorizer` and also pass `makeTokens` as a parameter. `makeTokens` is the function used to clean our text.

After converting text, we will save our vectors of numbers into a new variable using the following code:

```python
X = vectorizer.fit_transform(url_list)
```

The next step is to split our dataset.

#### Dataset splitting
We will use `train_test_split` to split our dataset into two sets. One set will be used for model training and the other one will be used for model testing.

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)   
```

In this code, we have used `test_size=0.2`. This is the ratio applied when splitting the dataset. The ratio will ensure that `80%` of the dataset is used to train the model and `20%` will be used to test the model.

We can now build the model using the `LogisticRegression`.

### Model building using LogisticRegression
We will initialize the `LogisticRegression` algorithm using the following code:

```python
logit = LogisticRegression()
```

After initializing the algorithm, we will fit the algorithm onto our training dataset. The model will learn from this dataset.

#### Fitting algorithm
To fit the algorithm, use this code:

```python
logit.fit(X_train, y_train)
```

This process will train our model and produce the following output.

![Model training](/engineering-education/detecting-malicious-url-using-machine-learning/model-training.jpg)

The output shows our model trained with all the best parameters. Let's now calculate the accuracy score of our model.

### Calculating the model's accuracy score
To calculate the accuracy score, run this code:

```python
print("Accuracy ",logit.score(X_test, y_test))
```

The output is shown below:

```bash
Accuracy  0.96163771063
```

The accuracy score is `96.164%`. This is a very high accuracy score and implies that our model was well trained. The model learned a lot from the dataset during the training phase and can now be used to make predictions.

### Making predictions
To make predictions, we will use several URLs and see if the model can classify if the URL is `bad` or `good`. The URLs that we will use are shown below.

```python
X_predict = ["https://www.section.io/engineering-education/",
"https://www.youtube.com/",
"https://www.traversymedia.com/", 
"https://www.kleinehundezuhause.com", 
"http://ttps://www.mecymiafinance.com",
"https://www.atlanticoceanicoilandgas.com"]
```

We can run predictions on these URLs using the following code:

```python
X_predict = vectorizer.transform(X_predict)
New_predict = logit.predict(X_predict)
```

From the code above, we use the `vectorizer.transform` method to convert the text to vectors of numbers. Then we apply the `logit.predict` method to make the actual predictions.

To print the prediction results, run this code:

```python
print(New_predict)
```

The prediction results are shown below.

```bash
['good' 'good' 'good' 'bad' 'bad' 'bad']
```

From the prediction results, the model has predicted the first three websites as `good`. This is a correct prediction because these are known websites. The last websites have been classified as `bad`.

Let's make another prediction.

#### Another prediction
The following are the website URLs.

```python
X_predict1 = ["www.buyfakebillsonlinee.blogspot.com", 
"www.unitedairlineslogistics.com",
"www.stonehousedelivery.com",
"www.silkroadmeds-onlinepharmacy.com" ]
```

To make the predictions use the following code:

```python
X_predict1 = vectorizer.transform(X_predict1)
New_predict1 = logit.predict(X_predict1)
print(New_predict1)
```

The prediction result is shown below.

```bash
['bad' 'bad' 'bad' 'bad']
```

The model has classified all the URLs as `bad`. Using this model we are able to classify URLs as either `bad` or `good`.

### Conclusion
In this tutorial, we have learned how to detect malicious URLs using machine learning. We started by discussing the negative impact of clicking a malicious URL.

We learned how to clean our dataset to ensure that it is correctly formatted.

The Google Colab notebook used in this tutorial can be found [here.](https://colab.research.google.com/drive/1gsHe5AhCPVtsomlydwAfFmGJNTcXdnZ8?usp=sharing)

### References
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [What is a malicious URL?](https://cheapsslsecurity.com/blog/what-is-a-malicious-url/)
- [Google Colab notebook](https://colab.research.google.com/drive/1H9ZSa3S6E0inX8zDK9LxDdFbeQ2yNXsr?usp=sharing)
- [Logistic Regression in Python](/engineering-education/logistic-regression-in-python/)

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)