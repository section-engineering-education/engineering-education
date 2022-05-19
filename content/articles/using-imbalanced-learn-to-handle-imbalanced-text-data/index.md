---
layout: engineering-education
status: publish
published: true
url: /using-imbalanced-learn-to-handle-imbalanced-text-data/
title: Using Imbalanced-Learn to Handle Imbalanced Text Data in NLP
description: This tutorial will guide a reader on how to build a spam classifier model using Python and natural language processing without balancing the classes in the dataset.
author: donnex-wafula
date: 2022-05-19T00:00:00-13:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-imbalanced-learn-to-handle-imbalanced-text-data/hero.jpeg 
    alt: Using Imbalanced-Learn in Natural Language Processing Hero Image
---
An imbalanced dataset in Natural Language Processing is a dataset whose number of data samples is not the same in the different classes. One class has more data samples than the other class. 
<!--more-->
For example, one class has 3000 samples, and the other may have 300. The class with more data samples is known as the majority class, while the other one is known as the minority class. 

When we train a model with an imbalanced dataset, the model will be biased towards the majority class. The model may make wrong predictions and give inaccurate results. It has a negative impact when we use the model in production, and the stakeholders depend on it for business operations.
 
In Natural Language Processing (NLP), we have various libraries that can handle text data that have an imbalance. We will use the [Imbalanced-learn](https://imbalanced-learn.org/stable/) library. This library will balance the classes in the dataset. It will also reduce model bias and enhance the NLP performance.

We will first build a spam classifier model with natural language processing without balancing the classes in the dataset. We will implement the same model but use `Imbalanced-Learn` to balance the classes. Then, we will compare the two models (before and after balancing) and evaluate their performance.

### Table of contents
- [Prerequisites](#prerequisites)
- [Spam classification dataset](#spam-classification-dataset)
- [Renaming the dataset columns](#renaming-the-dataset-columns)
- [Calculating the length of each data sample](#calculating-the-length-of-each-data-sample)
- [Text cleaning](#text-cleaning)
- [Installing NLTK](#installing-nltk)
- [Creating the custom functions](#creating-the-custom-functions)
- [Converting the class labels into integer values](#converting-the-class-labels-into-integer-values)
- [Implementing text vectorization](#implementing-text-vectorization)
- [Splitting the vectorized dataset](#splitting-the-vectorized-dataset)
- [Model building](#model-building)
- [Making predictions using the test set](#making-predictions-using-the-test-set)
- [Getting accuracy score of these predictions](#getting-accuracy-score-of-these-predictions)
- [Implementing Imbalanced-Learn](#implementing-imbalanced-learn)
- [Splitting the text dataset](#splitting-the-text-dataset)
- [Applying `RandomOverSampler` function](#applying-randomoversampler-function)
- [Using the balanced dataset to build the same model](#using-the-balanced-dataset-to-build-the-same-model)
- [Predicting using the model](#predicting-using-the-model)
- [Getting accuracy score](#getting-accuracy-score)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow easily along this tutorial, ensure you know the following concepts:
- [Python Programming](https://www.w3schools.com/python/) concepts.
- Natural language concepts and how to [implement an NLP model](/engineering-education/building-autocorrect-feature-using-nlp-with-python/).
- Understand [machine learning modelling](/engineering-education/house-price-prediction/) and other related concepts.
- Implement the spam classification model in [Google Colab](https://research.google.com/colaboratory/) to get the same results.

### Spam classification dataset
We will use the SMS collection dataset to train the NLP model. It has two labeled classes. (`spam` and `ham`). The `spam` class contains all the spam SMS. The `ham` class has all the SMS that are not spam. 

The NLP model will classify an SMS as either spam or not spam. Ensure you can download the SMS collection dataset from [here](https://drive.google.com/file/d/1OLdz-fSUBEARnMqUdrTW4bkmGy8yUpCE/view?usp=sharing). The link will give you the complete SMS collection dataset. 

We load the dataset using Pandas.

```python
import pandas as pd
```
We load the SMS collection dataset as follows:

```python
df = pd.read_csv("/content/spam_classification", sep="\t", header=None)
```
To see the shape of the SMS dataset, input this code:

```python
print(df.shape)
```
It gives this output:

```bash
(5572, 2)
```
The dataset has `5572` data samples (rows) and `2` columns. To see some of the data samples in the dataset, input this code:

```python
df.head()
```
It gives this output:

![Some of the data samples](/engineering-education/using-imbalanced-learn-to-handle-imbalanced-text-data/data-samples.png)

Our dataset has two columns: `0` and `1`. `0` contains the dataset classes, and `1` has the SMS texts/messages. We have to rename the dataset column because `0` and `1` are less descriptive and do not convey much meaning.

### Renaming the dataset columns
We rename the columns, `0` becomes `label`, and `1` becomes `text`.

```python
df.rename(columns={0: 'label', 1: 'text'}, inplace=True)
```

To see our dataset with the applied new column names, input this code:

```python
df.head()
```
It gives this output:

![Applied new column names](/engineering-education/using-imbalanced-learn-to-handle-imbalanced-text-data/applied-new-column-names.png)

Let's also check for null values as follows:

```python
df.isnull().sum()
```
It gives this output:

![Check for null values](/engineering-education/using-imbalanced-learn-to-handle-imbalanced-text-data/null-values.png)

The dataset has no null values. We get the value count of each class to know whether the dataset has a class imbalance.

```python
df['label'].value_counts()
```
It gives the following output:

![Data sample count](/engineering-education/using-imbalanced-learn-to-handle-imbalanced-text-data/data-samples-count.png)

The output shows the `spam` class has 747 data samples and the `ham` class has 4825 data samples. The `ham` is the majority class, and the `spam` class the minority. Thus, our dataset is imbalanced.

### Calculating the length of each data sample 
We will create a new `length` column that will show the length of each data sample. This new column will help us with preprocessing the data samples.

```python
df['length'] = df['text'].apply(lambda x: len(x))
```
To see the contents of the new `length` column, input this code:

```python
df.head()
```
It gives this output:

![New length column](/engineering-education/using-imbalanced-learn-to-handle-imbalanced-text-data/new-length-column.png). 

We will begin cleaning the text.

### Text cleaning
Before building the spam classification model, we will clean the dataset to have the required format. Many text cleaning steps will format the text. It includes removing unnecessary words, punctuation, stop words, white spaces, and unnecessary symbols from the text dataset. 

For this tutorial, we will implement the following steps:

- Removing stop words: Stop words do not contribute to the meaning of a sentence since they are common in a language. Stop words for the English language are pronouns, conjunctions, and articles. Removing stop words enables the NLP model to focus on unique words in the SMS messages that will add value. 

- Converting all the SMS messages to lower case: It ensures that we have a uniform dataset.

- Removing numbers and other numeric values: It ensures that only text that remains in the dataset adds value to the model.

- Removing punctuations: It involves removing full stops and other punctuation marks. These are the unnecessary symbols in the dataset.

- Removing extra white spaces: White space occupies the dataset, but they do not carry information. Removing the extra white spaces ensures we only remain with the text that the model will use.

- Lemmatizing the texts: Stemming reduces inflected forms of a text/word into its lemma or dictionary form. For example, the words/texts "running", "ran", and "runs" are all reduced to the root form "run".

- Tokenization: It is the splitting/breaking of the raw texts into smaller words or phrases known as tokens. We will implement the text cleaning steps using Natural Language Toolkit (NLTK). 

We install NLTK as follows:

#### Installing NLTK

```bash
!pip install nltk
```
Import `nltk` as follows:

```python
import nltk
```

NLTK has smaller sub-libraries that perform specific text cleaning tasks. These smaller libraries also have methods for text cleaning. 

The next step is to download the smaller sub-libraries from NLTK as follows:

#### Downloading `punk`

```bash
nltk.download('punkt')
```

It will tokenize the text in the dataset.

#### Downloading stop words
We download the English stop words so that the model can identify the stop words in the texts and remove them.

```bash
nltk.download('stopwords')
```
The downloaded libraries will enable us to import and use specific methods for text cleaning. We import these methods as follows:

#### Importing `WordNetLemmatizer`
It is the method that will perform text lemmatization.

```python
from nltk.stem import WordNetLemmatizer
```

#### Importing `word_tokenize`
It is the method that will perform text tokenization.

```python
from nltk import word_tokenize
```

#### Importing `stopwords`
We will use it to remove all the stop words in the dataset. We will then create custom functions for text cleaning and pass in the imported methods as parameters. To implement the custom functions, we will require Python regular expression (RegEx) module. 

We import it as follows:

```python
import re
```

We can now start creating our functions.

### Creating the custom functions
We first create the function for converting the SMS text to lower case.

#### Converting SMS text to lower function
We create the function as follows:

```python
def convert_to_lower(text):
    return text.lower()
```
The function takes in `text` as an argument. We then apply this function to the `text` column as follows:

```python
df['text'] = df['text'].apply(lambda x: convert_to_lower(x))
```

#### Removing numbers and other numeric values function
We implement this custom function as follows:

```python
def remove_numbers(text):
    number_pattern = r'\d+'
    without_number = re.sub(pattern=number_pattern, repl=" ", string=text)
    return without_number
```

The function takes in `text` as an argument. We then apply this function to the `text` column as follows:

```python
df['text'] = df['text'].apply(lambda x: remove_numbers(x))
```

#### Removing punctuations function
We create the function as follows:

```python
def remove_punctuation(text):
    return text.translate(str.maketrans('', '', string.punctuation))
```
The function takes in `text` as an argument. We then apply this function to the `text` column as follows:

```python
df['text'] = df['text'].apply(lambda x: remove_punctuation(x))
```

#### Removing stop words function
We create the function as follows:

```python
def remove_stopwords(text):
    removed = []
    stop_words = list(stopwords.words("english"))
    tokens = word_tokenize(text)
    for i in range(len(tokens)):
        if tokens[i] not in stop_words:
            removed.append(tokens[i])
    return " ".join(removed)
```
The function takes in `text` as an argument. It also uses the imported `stopwords` method to find all the stopwords in the text and filter them out. The `word_tokenize` method will tokenize the remaining text. We use the for loop to iterate through the text dataset. We then apply this function to the `text` column as follows:

```python
df['text'] = df['text'].apply(lambda x: remove_punctuation(x))
```

#### Remove extra white spaces function
We create the function as follows:

```python
def remove_extra_white_spaces(text):
    single_char_pattern = r'\s+[a-zA-Z]\s+'
    without_sc = re.sub(pattern=single_char_pattern, repl=" ", string=text)
    return without_sc
```
The function takes in `text` as an argument. We then apply this function to the `text` column as follows:

```python
df['text'] = df['text'].apply(lambda x: remove_extra_white_spaces(x))
```

#### Lemmatizing function
We create the function as follows:

```python
def lemmatizing(text):
    lemmatizer = WordNetLemmatizer()
    tokens = word_tokenize(text)
    for i in range(len(tokens)):
        lemma_word = lemmatizer.lemmatize(tokens[i])
        tokens[i] = lemma_word
    return " ".join(tokens)
```

The function also takes in `text` as an argument. It also uses the imported `WordNetLemmatizer` method. The `word_tokenize` method will then tokenize the lemmatized words. We use the for loop to iterate through the text dataset. We then apply this function to the `text` column as follows:

```python
df['text'] = df['text'].apply(lambda x: lemmatizing(x))
```

We have successfully created and applied the functions to our `text` column for text cleaning. We again calculate the length of each data sample after performing text cleaning. We will be able to know if the functions have worked on the `text` column.

### Calculating the length of each data sample after performing text cleaning
We perform this process as follows:

```python
df['length_after_cleaning'] = df['text'].apply(lambda x: len(x))
```
To check the new lengths, use this code:

```python
df.head()
```
It gives this output:

![Rechecking length](/engineering-education/using-imbalanced-learn-to-handle-imbalanced-text-data/rechecking-lengths.png)

From the output above, we have reduced the lengths of the data samples. Thus, our applied functions have worked.

### Converting the class labels into integer values
The class labels are `spam` and `ham`. We can not just feed these labels into the model because it does not understand strings/text. We will have to create a label map that converts the class labels into integer values. The model will understand the integer values.

We can create the label map as follows:

```python
label_map = {
    'ham': 0,
    'spam': 1,
}
```

We have assigned ham to 0 and spam to 1. We then apply/add these integer values to the `label` column using the `map` function.

```python
df['label'] = df['label'].map(label_map)
```
We check the applied integer values as follows:

```python
df.head()
```
It gives this output:

![Applied integer values](/engineering-education/using-imbalanced-learn-to-handle-imbalanced-text-data/applied-integer-values.png)

The output above shows the `label` column has the assigned integer values (0 and 1). The next step is to implement text vectorization.

### Implementing text vectorization
It converts the raw text into a format the NLP model can understand and use. Vectorization will create a numerical representation of the text strings called a [sparse matrix](https://www.geeksforgeeks.org/sparse-matrix-representation/) or word vectors. The model works with numbers and not raw text. We will use `TfidfVectorizer` to create the sparse matrix. 

We import it as follows:

```python
from sklearn.feature_extraction.text import TfidfVectorizer
```
We initialize the method as follows:

```python
tf_wb= TfidfVectorizer()
```
We then apply the initialized method to the `text` column so that it can transform the text strings into a sparse matrix.

```python
X_tf = tf_wb.fit_transform(df['text'])
```

### Converting the sparse matrix into an array
We will use NumPy.

```python
import numpy as np
```
We then apply the `toarray` function to convert the sparse matrix into an array.

```python
X_tf = X_tf.toarray()
```
To see the output array, input this code:

```python
print(X_tf)
```
It gives this output:

![Array](/engineering-education/using-imbalanced-learn-to-handle-imbalanced-text-data/array.png)

We will feed the array into the model for training. 

### Splitting the vectorized dataset
We will split the vectorized dataset into two portions/sets. The first portion will be for model training and the second portion for model testing. We will use the `train_test_split` method to split the vectorized dataset. 

We import it as follows:

```python
from sklearn.model_selection import train_test_split
```
We apply the method to the vectorized dataset and `label` column.

```python
X_train_tf, X_test_tf, y_train_tf, y_test_tf = train_test_split(X_tf, df['label'].values, test_size=0.3)
```

The `test_size` will define the training and testing sizes. The training size will be 70% of the dataset, while the testing size will be 30%. We have cleaned and prepared the dataset. We can start building the model with this dataset.

### Model building
We will use the [Naive Bayes Classifier](https://towardsdatascience.com/naive-bayes-classifier-81d512f50a7c) to build the spam classification model. We will import the [GaussianNB](http://scikit-learn.org/stable/modules/generated/sklearn.naive_bayes.GaussianNB.html) function from the Naive Bayes Classifier. We choose this function because we are dealing with an array of values.

```python
from sklearn.naive_bayes import GaussianNB
```
We initialize `GaussianNB` as follows:

```python
NB = GaussianNB()
```
We then fit the initialized model to the training portion as follows:

```python
NB.fit(X_train_tf, y_train_tf)
```
The `fit` function will train the Naive Bayes Classifier. It will learn and understand spam classification. Let's use this model to make predictions using the test set.

### Making predictions using the test set
We make predictions on the testing set values as follows:

```python
NB_pred= NB.predict(X_test_tf)
print(NB_pred)
```
The model will assign the labels (0 and 1) to the test set and print some of the predictions. The output below shows some of the predictions:

```bash
[0 0 0 ... 0 0 0]
```
### Getting accuracy score of these predictions
We will use the `accuracy_score` method. We import it as follows:

```python
from sklearn.metrics import accuracy_score
```
We then apply the function and print the accuracy score as follows:

```python
print(accuracy_score(y_test_tf, NB_pred))
```
It prints the following accuracy score:

```bash
0.8762331838565023
```
This accuracy score is `87.623%`. It shows the ratio of the accurately predicted data samples to the total data samples in the testing set. We have built the model without class balancing. The next step is to implement the same model but use Imbalanced-Learn to balance the classes.

### Implementing Imbalanced-Learn
We install the library as follows:

```bash
!pip install imbalanced-learn
```
We will use the ` RandomOverSampler` function to balance the classes.

```python
from imblearn.over_sampling import RandomOverSampler
```

`RandomOverSampler` will increase the data samples in the minority class (spam). It makes the minority class have the same data samples as the majority class (ham). The function synthesizes new dummy data samples in the minority class to enable class balancing.

### Splitting the text dataset
We spit the dataset as follows:

```python
X_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'].values, test_size=0.30)
```
After splitting the dataset, we will use the `Counter` module to check the number of data samples in the majority and minority classes. We import the module as follows:

```python
from collections import Counter
```
We check the data samples as follows:

```python
Counter(y_train)
```
It gives this output:

```python
Counter({0: 3371, 1: 529})
```
We can see there is a class imbalance. We also need to apply the vectorization function to transform the `X_train` and `X_test`.

#### Vectorizing the `X_train`
Use the following code:

```python
vectorizer = TfidfVectorizer()
vectorizer.fit(X_train)
```
The `fit` function will fit the initialized `TfidfVectorizer` function to the `X_train`. We then use the `transform` function to apply the vectorization method.

```python
X_train_tf = vectorizer.transform(X_train)
```
We finally convert the transformed text (sparse matrix) to an array as follows:

```python
X_train_tf = X_train_tf.toarray()
```
#### Vectorizing the `X_test`
We will follow the same process as follows:

```python
X_test_tf = vectorizer.transform(X_test)
```
We also convert the transformed text (sparse matrix) to an array:

```python
X_test_tf = X_test_tf.toarray()
```
Let's now apply the `RandomOverSampler` function.

#### Applying `RandomOverSampler` function
We use the following code:

```python
ROS = RandomOverSampler(sampling_strategy=1)
```
The function uses the `sampling_strategy` parameter to balance the class. We set the parameter's value to 1 to ensure the dataset classes have 1:1 data samples. We then apply the function to the training set. It will generate the new data samples to ensure both classes are balanced.

```python
X_train_ros, y_train_ros = ROS.fit_resample(X_train_tf, y_train)
```

Let's recheck the number of data samples in the majority and minority classes:

```python
Counter(y_train_ros)
```
It gives this output:

```bash
Counter({0: 3371, 1: 3371})
```
From the output, both classes have the same data samples. Thus, we have achieved class balancing. We will use the balanced dataset to build the same model.

### Using the balanced dataset to build the same model
Use the following code to initialize the model.

```python
nb = GaussianNB()
```
We fit the initialized model to the balanced training dataset as follows:

```python
nb.fit(X_train_ros, y_train_ros)
```
We have trained the same spam classification model. Let's also use the model to predict the testing set values.

### Predicting using the model
We make predictions on the test set as follows:

```python
y_preds = nb.predict(X_test_tf)
print(y_preds)
```
The model will assign the labels (0 and 1) to the test set and print some of the predictions. The output below shows some of the predictions:

```bash
[1 0 0 ... 1 0 0]
```
Let's get the accuracy score of these predictions.

### Getting accuracy score
We get the accuracy score as follows:

```python
print(accuracy_score(y_test, y_preds))
```

It prints the following accuracy score:

```bash
0.9037081339712919
```
This accuracy score is `90.3708`. The accuracy score has increased from `87.623%` to `90.3708`. Therefore, balancing the classes has enhanced the model performance giving better results.

### Conclusion
We learned to use Imbalanced-learn to handle imbalanced text data in natural language processing. We cleaned the text dataset and implemented the text preprocessing steps using the NLTK library. We implemented text vectorization and fed the model the sparse matrix.

We then implemented a spam classifier model without balancing the dataset and calculated the accuracy score. We also implemented the same model but used Imbalanced-Learn to balance the classes. 

Finally, we compared the two models (before and after balancing). The accuracy score increased from `87.623%` to `90.3708`. Therefore, balancing the classes gives better results.

You can get both the spam classification models we have implemented in this tutorial from [here](https://colab.research.google.com/drive/1ACfpU4sDOfG3gDWpO0Kcch8T-LU95EM4?usp=sharing).

### References
- [Naive Bayes Classifier](https://towardsdatascience.com/naive-bayes-classifier-81d512f50a7c)
- [GaussianNB](https://scikit-learn.org/stable/modules/generated/sklearn.naive_bayes.GaussianNB.html)
- [Scikit-learn documentation](https://scikit-learn.org/)
- [Text Pre-processing steps](https://www.analyticsvidhya.com/blog/2021/09/essential-text-pre-processing-techniques-for-nlp/)
- [Imbalanced-learn documentation](https://imbalanced-learn.org/stable/)
- [Natural Language Processing tasks](https://monkeylearn.com/blog/natural-language-processing-techniques/)

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
