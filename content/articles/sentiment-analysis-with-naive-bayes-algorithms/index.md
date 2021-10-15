---

layout: engineering-education

status: publish

published: true

url: /sentiment-analysis-with-naive-bayes-algorithms/

title: Sentiment Analysis With Naive Bayes Algorithms

description: This tutorial is a comprehensive explanation and implementation of sentiment analysis using naive Bayes algorithms.

author: qoyum-olatunde-yusuf

date: 2021-10-13T00:00:00-15:00

topics: []

excerpt_separator: <!--more-->

images:

- url: /engineering-education/sentiment-analysis-with-naive-bayes-algorithms/hero.PNG

alt: sentiment analysis with naive bayes algorithms cover image

---
Sentiment analysis has been defined by a lot of scholars, hardly is there a new definition for the term that has not been heard of before. On that note, I will say sentiment analysis is the systematic method of extracting emotions with the aid of machine learning. This tutorial will show how to implement sentiment analysis using naive Bayes algorithms.

<!--more-->

Sentiment analysis has been useful in a lot of fields, in discovering hate speech, in analyzing public opinion about a product or brand, in building chatbots, etc.



### Table of contents

1. [Prerequisites](#prerequisites)

2. [Goal](#goal)

3. [Why Naive Bayes Models?.](#why-naive-bayes-models)

4. [IMDB movie review dataset](#imdb-movie-review-dataset)

5. [Installing necessary libraries](#installing-necessary-libraries)

6. [Function to process the IMDB datasets](#function-to-process-the-imdb-datasets)

7. [Preparing the notebook for BernoulliNB](#preparing-the-notebook-for-bernoullinb)

8. [Preparing the notebook for CategoricalNB](#preparing-the-notebook-for-categoricalnb)

9. [Preparing the notebook for ComplementNB](#preparing-the-notebook-for-complementnb)

10. [Preparing the notebook for GaussianNB](#preparing-the-notebook-for-gaussiannb)

11. [Preparing the notebook for MultinomialNB](#preparing-the-notebook-for-multinomialnb)

9. [Conclusion](#conclusion)

10. [Additional resources](#additional-resources)

### Prerequisites

First and foremost, we want to build a sentiment analysis project using `Bayesian models` and discover which of its algorithms is best. Also, it is not a work of which algorithm is best for sentiment analysis, but rather, which of the `naive Bayes algorithms` is best for this project. I strongly believe my readers are machine learning students which are expected to be versed in basic Python programming and must be good at performing data analysis with [Pandas](https://pandas.pydata.org/) and [Numpy](https://numpy.org/).

### Goal

At the end of this tutorial, readers should be able to:

- understand how sentiment analysis works,

- build a supervised machine learning model that predicts the sentiments of a word or sentence given to it,

- determine which is better between count vectorizer and tfidf vectorizer,

- compare the naive Bayes model that is best for text classification, and

- use Pandas functions for data analysis.




### Why Naive Bayes Models?.

Bayesian theorem is the core principle behind naive bayes algorithms, it assumes that all features are independent of one another. We can as well say, the classifier believes that one particular attribute in a class does not in any way influence the presence of another. 
We can take for example a cucumber, it is green, it is long, it has a straight shape. The classifier assumes that being green or long or straight in shape are independent attributes and all together contribute to the existence of a cucumber.

Talking about algorithms that are efficient for text classification task, we can always call on the `Naive Bayes classifiers`. They are simple and very fast classifiers yet powerful. There is a huge probability that if you use some other classification algorithms on sentiment analysis, you will arrive at better results than any result we might have gotten here, but for this project, we are sticking to the naive bayes algorithms.

### IMDB movie review dataset

For this tutorial, an IMDB movie review dataset which has 25000 training data and 25000 testing data is used. It was downloaded from the Stanford archive, and its data is somewhat complicated because it is in a compressed format. To know more about this dataset and to download it, kindly visit [IMDB Movie Review Dataset](http://ai.stanford.edu/~amaas/data/sentiment/aclImdb_v1.tar.gz). Therefore, a function was written to be able to read it into our notebooks. 

### Installing necessary libraries

Most importantly, we need to import every library need for this project, any library used in the notebook has been `pip install` by me. There are thousands of libraries except for the standard `Numpy` and `Pandas`. For a start, there is a need to at least install `sklearn` and `nltk` which are very important libraries for text classifications amidst many others. 

```python
pip install numpy
pip install pandas
pip install matplotlib
pip install sklearn
pip install nltk
```

### Function to process the IMDB datasets

As mentioned earlier, due to the complexity of the dataset, we have to write a function that reads it into our notebook. 
With the function below, the dataset will be uncompressed and cleaned for use with the function `clean_text` which will replace all characters with capital letters to small letters, remove all the punctuations and lemmatize the words, lemmatization is the process of stemming or categorizing words into their root forms, e.g words like `wake, woke, woken, waking` will all be categorized with `wake`, which is the root word.

Create a `utils.py` file and put the following inside.

```python
import os
import random
import string
import numpy as np

from tqdm.notebook import tqdm
from sklearn.base import TransformerMixin
from sklearn.metrics import accuracy_score
from sklearn.naive_bayes import GaussianNB, CategoricalNB

import nltk
from nltk.stem import WordNetLemmatizer
from nltk import word_tokenize, WordNetLemmatizer

nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')

wordnet_lemmatizer: WordNetLemmatizer = WordNetLemmatizer()



def clean_text(text: str) -> str:
 # removes upper cases
    text = text.lower()
 
 # removes punctuation
 for char in string.punctuation:
        text = text.replace(char, "")
 
 # lemmatize the words and join back into string text
    text = " ".join([wordnet_lemmatizer.lemmatize(word) for word in word_tokenize(text)])
 
 return text



class DenseTransformer(TransformerMixin):
 def fit(self, x, y=None, **fit_params):
 return self

 @staticmethod
 def transform(x, y=None, **fit_params):
 return x.todense()
 
 def __str__(self):
 return "DenseTransformer()"
 
 def __repr__(self):
 return self.__str__()
 
 
class CleanTextTransformer(TransformerMixin):
 def fit(self, x, y=None, **fit_params):
 return self
 
 @staticmethod
 def transform(x, y=None, **fit_params):
 return np.vectorize(clean_text)(x)

 def __str__(self):
 return 'CleanTextTransformer()'

 def __repr__(self):
 return self.__str__()



def load_imdb_sentiment_analysis_dataset(imdb_data_path, seed=123):
 """This loads the IMDB movie review dataset.
    # arguments
        imdb_data_path: string.
        seed: int.
    # returns
        Training data and validation data, must be tuple.
        Training data has 25000 samples
        Test data has 25000 samples
        Categories: 2 (0 - negative, 1 - positive)
    # references
        Bmass et al., http://www.aclweb.org/anthology/P11-1015
        Download and uncompress archive from:
        http://ai.stanford.edu/~amaas/data/sentiment/aclImdb_v1.tar.gz
    """

 # Load training data:

    train_texts = []
    train_labels = []
 for category in ['pos', 'neg']:
 print(f"loading train: {category} ...")
        train_path = os.path.join(imdb_data_path, 'train', category)
 for fname in tqdm(sorted(os.listdir(train_path))):
 if fname.endswith('.txt'):
 with open(os.path.join(train_path, fname), encoding="utf-8") as f:
                    train_texts.append(f.read())
                train_labels.append(0 if category == 'neg' else 1)

 # Load validation data:

    test_texts = []
    test_labels = []
 for category in ['pos', 'neg']:
 print(f"loading test: {category} ...")
        test_path = os.path.join(imdb_data_path, 'test', category)
 for fname in tqdm(sorted(os.listdir(test_path))):
 if fname.endswith('.txt'):
 with open(os.path.join(test_path, fname), encoding="utf-8") as f:
                    test_texts.append(f.read())
                test_labels.append(0 if category == 'neg' else 1)

 # Shuffle the data and labels of our training set.
    random.seed(seed)
    random.shuffle(train_texts)
    random.seed(seed)
    random.shuffle(train_labels)

 return ((np.array(train_texts), np.array(train_labels)),
            (np.array(test_texts), np.array(test_labels)))
```

Categorical and Gaussian naive Bayes models keep flagging errors because they can't take the samples of data provided all at once for some reason which might be due to memory allocation, therefore, a separate function was written for the two to take in samples of data in a particular size per batch.

```python
class CategoricalBatchNB(TransformerMixin):
 def __init__(self, batch_size, classes, *args, **kwargs):
        self._batch_size = batch_size
        self._classes = classes
        self._args = args
        self._kwargs = kwargs
        self._model = CategoricalNB(*args, **kwargs)

 def fit(self, x, y, **fit_params):
        batch_size = self._batch_size
        self._model = CategoricalNB(*self._args, **self._kwargs)

 for index in tqdm(range(batch_size, x.shape[0] + batch_size, batch_size)):
            self._model.partial_fit(
                x[index - batch_size:index, :].toarray(),
                y[index - batch_size:index],
 classes=self._classes
            )
 return self

 @staticmethod
 def transform(x, y=None, **fit_params):
 return x

 def predict(self, x):
        batch_size = self._batch_size
        predictions = []
 for index in tqdm(range(batch_size, x.shape[0] + batch_size, batch_size)):
            predictions.extend(
                self._model.predict(
                    x[index - batch_size:index, :].toarray()
                ).tolist()
            )
 return np.array(predictions).ravel()

 def score(self, x, y):
        y_pred = self.predict(x)
 return accuracy_score(y, y_pred)

 def __str__(self):
 return "CategoricalBatchNB()"

 def __repr__(self):
 return self.__str__()



class GaussianBatchNB(TransformerMixin):
 def __init__(self, batch_size, classes, *args, **kwargs):
        self._batch_size = batch_size
        self._classes = classes
        self._args = args
        self._kwargs = kwargs
        self._model = GaussianNB(*args, **kwargs)
 
 def fit(self, x, y, **fit_params):
        batch_size = self._batch_size
        self._model = GaussianNB(*self._args, **self._kwargs)
 
 for index in tqdm(range(batch_size, x.shape[0]+batch_size, batch_size)):
            self._model.partial_fit(
                x[index-batch_size:index, :].toarray(),
                y[index-batch_size:index], 
 classes=self._classes
            )                  
 return self

 @staticmethod
 def transform(x, y=None, **fit_params):
 return x
 
 def predict(self, x):
        batch_size = self._batch_size
        predictions = []
 for index in tqdm(range(batch_size, x.shape[0]+batch_size, batch_size)):
            predictions.extend(
                self._model.predict(
                    x[index-batch_size:index, :].toarray()
                ).tolist()
            )
 return np.array(predictions).ravel()
 
 def score(self, x, y):
        y_pred = self.predict(x)
 return accuracy_score(y, y_pred)

 def __str__(self):
 return "GaussianBatchNB()"

 def __repr__(self):
 return self .__str__()
```



### Preparing the notebook for BernoulliNB

Our main notebook should have some standard imports from libraries and packages installed.

```python
from collections import Counter

import numpy as np 
import pandas as pd
import matplotlib.pyplot as plt 

from tqdm.notebook import tqdm
from sklearn.pipeline import Pipeline 
from sklearn.naive_bayes import BernoulliNB
from sklearn.model_selection import StratifiedKFold 
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics import (
    classification_report, confusion_matrix, 
    f1_score as calculate_f1_score, accuracy_score as calculate_accuracy_score
)
```
Importing the necessary functions from `utils.py`.

```python
from utils import CleanTextTransformer,load_imdb_sentiment_analysis_dataset
```
Load the data

```python
(X_train, y_train), (X_test, y_test) = load_imdb_sentiment_analysis_dataset(imdb_data_path='aclImdb')
```
Visualize the data size

```python

keys, values, labels = [], [], []
count = Counter(y_train)

for key, value in count.items():
    keys.append(key)
    values.append(value)
    labels.append("positive" if value else "negative")

print(count)
print()

barlist = plt.bar(keys, values)

plt.title("Frequency of Sentiments")
plt.xticks(keys, labels)
plt.ylabel('Number of Reviews')
plt.xlabel('Sentiment expressed in Reviews')

barlist[0].set_color('red')
barlist[1].set_color('green')

plt.show()
```
![visualizing the data](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/visualize_data.PNG)

#### What is vectorization?

Vectorization is an essential part of feature engineering as it’s a way of converting a collection of text documents to a vector of term/token counts. It ensures text data are ​pre-processed before generating the vector representations. The two key vectorizers we used and compare are CountVectorizer and TfIdf (term frequency, inverse document frequency)

#### Using Countvectorizer in our pipeline

```python
pipeNB = Pipeline([
    ("clean_text", CleanTextTransformer()),
    ('count', CountVectorizer(stop_words="english")),
    ('classifier', BernoulliNB())
])
```
We hence fit the model in the created pipeline
```python
pipeNB.fit(X_train, y_train)
```
![fitting the data](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/fit_bernoulli.PNG)

#### Model evaluation

Question: “What’s the essence of evaluating a model?”

Answer: “It’s like asking why test a student after a year of study, how do you judge his performance, Understanding, and Assimilation?”

If you get a job as a Machine Learning Engineer in a company where you have to build varieties of models, and you feel like evaluation is not necessary because you are so sure of your model, prepare to wake up jobless one day. No model is perfect models can misbehave. However, some metrics have been put in place to help us understand our models better. 
- Precision
- Recall
- F1-Score
- Accuracy
- Confusion Matrix

Evaluate fitted model
```python
y_pred = pipeNB.predict(X_test)

print("Classification Report")
print("==================================")
print(classification_report(y_test, y_pred))
```
![classification report](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/bernoulli_class_report.PNG)

Evaluation should answer these questions for you.
- How efficient is my model? Is it useful?
- Will introducing more data improve its performance?
- Do I introduce more features?

On predicting with our models, we printed out the classification report, let’s briefly explain what each metric stands for: 

`Precision` is how straight to point your model is. For the negative sentiments, precision will be something like - out of all predictions, how many are negatives? - That’s 78% for the model in the picture. For the positive sentiments, out of all predictions, how many are positives, that’s 87%.

`Recall` is how much you trust the precision. For the negative sentiments, the recall will be, - out of all actual negatives, how many did the model predict correctly as negative.- Which according to the model in our picture is 89% and the positive is 75%.

F1-Score can be stated as the harmonic mean of precision and recall. Simple
![f1score](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/f1score.PNG)

Accuracy 
Accuracy is defined as the percentage of correct predictions for the test data. It can be gotten by dividing the number of correct predictions by the number of total predictions.

`Accuracy = (correct predictions / all predictions)`

```python
print("Confusion Matrix")
print("===================================")
print(confusion_matrix(y_test, y_pred))
```
![confusion matrix](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/confusion_matrix_b.PNG)

#### Confusion matrix

The confusion matrix, which can also be called an error matrix, is a table layout that allows the visualization of the performance of an algorithm, it consists of:

- True positives: Predicting an observation belongs to a class and it actually does belong to that class.
- True negatives: Predicting an observation does not belong to a class and it actually does not belong to that class.
- False positives: Predicting an observation belongs to a class but it actually does not.
- False negatives: Predicting an observation does not belong to a class but it actually does.

#### Performing cross-validation

```python
accuracy, f1_score = [], []
skf = StratifiedKFold(n_splits=10, shuffle=True, random_state=100) 

for train_index, test_index in tqdm(skf.split(X_train, y_train), total=10):
    X_train_fold, X_test_fold = X_train[train_index], X_train[test_index] 
    y_train_fold, y_test_fold = y_train[train_index], y_train[test_index]

    pipeNB.fit(X_train_fold, y_train_fold)
    y_pred = pipeNB.predict(X_test_fold)
 
    accuracy.append(calculate_accuracy_score(y_test_fold, y_pred))
    f1_score.append(calculate_f1_score(y_test_fold, y_pred))

# make as array
f1_score = np.array(f1_score)
accuracy = np.array(accuracy)

print('\nModel Metrics ==> ')
print("================================================")
print(f'{"descr":5s} | {"accuracy":^10s} | {"f1_score":^10s}')
print("================================================")
print(f'{"Max":5s} | {accuracy.max():^10.2f} | {f1_score.max():^10.2f}') 
print(f'{"Min":5s} | {accuracy.min():^10.2f} | {f1_score.min():^10.2f}') 
print(f'{"Mean":5s} | {accuracy.mean():^10.2f} | {f1_score.mean():^10.2f}')
```
![cross validation](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/bernoulli_cv.PNG)

There are different libraries for cross-validation and we've employed `StratifiedKFold` for this tutorial. The essence is to be sure our model is fit and not biased. What cross-validation does is switch between the train and test data, it takes in the whole fresh dataset, does its splitting according to the number specified, and shuffles the train and test dataset one at a time, like the form of
Train 1-9, test 10
Train 1-10(exclude 9),  test 9 
Train 2-10, test 1
On and on until it goes round.



#### Using Tfidfvectorizer in the pipeline

```python
pipeNB = Pipeline([
    ("clean_text", CleanTextTransformer()),
    ('tfidf', TfidfVectorizer(stop_words="english")),
    ('classifier', BernoulliNB())
])
```
Fitting the data into the pipeline
```python
pipeNB.fit(X_train, y_train)
```
![fit the model](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/fit_tfidf_bernoulli.PNG)

Evaluate the model

get the prediction of the unseen data

Evaluate the fitted model
```python
y_pred = pipeNB.predict(X_test)

print("Classification Report")
print("===================================")
print(classification_report(y_test, y_pred))
```
![class report after tfidf](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/bernoulli_2_class_report.PNG)

```python
print("Confusion Matrix")
print("===================================")
print(confusion_matrix(y_test, y_pred))
```
![cross validation after tfidf](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/bernoulli_2_confusion_matrix.PNG)

Perform cross-validation
```python
accuracy, f1_score = [], []
skf = StratifiedKFold(n_splits=10, shuffle=True, random_state=100) 

for train_index, test_index in tqdm(skf.split(X_train, y_train), total=10):
    X_train_fold, X_test_fold = X_train[train_index], X_train[test_index] 
    y_train_fold, y_test_fold = y_train[train_index], y_train[test_index]

    pipeNB.fit(X_train_fold, y_train_fold)
    y_pred = pipeNB.predict(X_test_fold)
 
    accuracy.append(calculate_accuracy_score(y_test_fold, y_pred))
    f1_score.append(calculate_f1_score(y_test_fold, y_pred))

# make as array
f1_score = np.array(f1_score)
accuracy = np.array(accuracy)

print('\nModel Metrics ==> ')
print("================================================")
print(f'{"descr":5s} | {"accuracy":^10s} | {"f1_score":^10s}')
print("================================================")
print(f'{"Max":5s} | {accuracy.max():^10.2f} | {f1_score.max():^10.2f}') 
print(f'{"Min":5s} | {accuracy.min():^10.2f} | {f1_score.min():^10.2f}') 
print(f'{"Mean":5s} | {accuracy.mean():^10.2f} | {f1_score.mean():^10.2f}')
```
![cross validation after using tfidf vectorizer](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/bernoulli_2_cv.PNG)

### Preparing the notebook for CategoricalNB

The first is to import all the libraries needed as done with the bernoulliNB above.

#### Get all the necessary utilities
```python
from utils import CleanTextTransformer, load_imdb_sentiment_analysis_dataset, DenseTransformer, CategoricalBatchNB
```
#### Load the data
```python
(X_train, y_train), (X_test, y_test) = load_imdb_sentiment_analysis_dataset(imdb_data_path='aclImdb')
```
![output of dataset loaded in](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/cat_load_data.PNG)

#### Using Countvectorizer in the pipeline
```python
pipeNB = Pipeline([
    ("clean_text", CleanTextTransformer()),
    ('count', CountVectorizer(stop_words="english", binary=True)),
    ('classifier', CategoricalBatchNB(batch_size=1000, classes=[0, 1]))
])
```
Fit the model
```python
pipeNB.fit(X_train, y_train)
```
![fiting with countvectorizer pipeleine](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/cat_count_fit.PNG)

Evaluate the fitted model
```python
y_pred = pipeNB.predict(X_test)

print("Classification Report")
print("===================================")
print(classification_report(y_test, y_pred))
```
![class report for categorical](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/cat_count_class_rep.PNG)

```python
print("Confusion Matrix")
print("===================================")
print(confusion_matrix(y_test, y_pred))
```
![categorical confusion matrix](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/cat_count_cm.PNG)

Perform cross-validation
```python
accuracy, f1_score = [], []
skf = StratifiedKFold(n_splits=10, shuffle=True, random_state=100) 

for train_index, test_index in tqdm(skf.split(X_train, y_train), total=10):
    X_train_fold, X_test_fold = X_train[train_index], X_train[test_index] 
    y_train_fold, y_test_fold = y_train[train_index], y_train[test_index]

    pipeNB.fit(X_train_fold, y_train_fold)
    y_pred = pipeNB.predict(X_test_fold)
 
    accuracy.append(calculate_accuracy_score(y_test_fold, y_pred))
    f1_score.append(calculate_f1_score(y_test_fold, y_pred))

# make as array
f1_score = np.array(f1_score)
accuracy = np.array(accuracy)

print('\nModel Metrics ==> ')
print("================================================")
print(f'{"descr":5s} | {"accuracy":^10s} | {"f1_score":^10s}')
print("================================================")
print(f'{"Max":5s} | {accuracy.max():^10.2f} | {f1_score.max():^10.2f}') 
print(f'{"Min":5s} | {accuracy.min():^10.2f} | {f1_score.min():^10.2f}') 
print(f'{"Mean":5s} | {accuracy.mean():^10.2f} | {f1_score.mean():^10.2f}')
```
![categorical cross validation](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/cat_count_cv.PNG)

#### Using Tfidfvectorizer in the pipeline

```python
pipeNB = Pipeline([
    ("clean_text", CleanTextTransformer()),
    ('tfidf', TfidfVectorizer(stop_words="english", binary=True)),
    ('classifier', CategoricalBatchNB(batch_size=1000, classes=[0, 1]))
])
```
Fit the model
```python
pipeNB.fit(X_train, y_train)
```
![fitting the model](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/fit_tfidf_cat.PNG)

Evaluate the fitted model
```python
y_pred = pipeNB.predict(X_test)

print("Classification Report")
print("===================================")
print(classification_report(y_test, y_pred))
```
![classification report](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/cat_tfidf_class_rep.PNG)

Perform cross-validation
```python
accuracy, f1_score = [], []
skf = StratifiedKFold(n_splits=10, shuffle=True, random_state=100) 

for train_index, test_index in tqdm(skf.split(X_train, y_train), total=10):
    X_train_fold, X_test_fold = X_train[train_index], X_train[test_index] 
    y_train_fold, y_test_fold = y_train[train_index], y_train[test_index]

    pipeNB.fit(X_train_fold, y_train_fold)
    y_pred = pipeNB.predict(X_test_fold)
 
    accuracy.append(calculate_accuracy_score(y_test_fold, y_pred))
    f1_score.append(calculate_f1_score(y_test_fold, y_pred))

# make as array
f1_score = np.array(f1_score)
accuracy = np.array(accuracy)

print('\nModel Metrics ==> ')
print("================================================")
print(f'{"descr":5s} | {"accuracy":^10s} | {"f1_score":^10s}')
print("================================================")
print(f'{"Max":5s} | {accuracy.max():^10.2f} | {f1_score.max():^10.2f}') 
print(f'{"Min":5s} | {accuracy.min():^10.2f} | {f1_score.min():^10.2f}') 
print(f'{"Mean":5s} | {accuracy.mean():^10.2f} | {f1_score.mean():^10.2f}')
```
![cross validation](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/cat_tfidf_cv.PNG)

### Preparing the notebook for ComplementNB

After importing all libraries as shown in the previous notebooks. Get the utilities and load the dataset.

```python
from utils import CleanTextTransformer, load_imdb_sentiment_analysis_dataset

(X_train, y_train), (X_test, y_test) = load_imdb_sentiment_analysis_dataset(imdb_data_path='aclImdb')
```
#### Using CountVectorizer in the pipeline

```python
pipeNB = Pipeline([
    ("clean_text", CleanTextTransformer()),
    ('count', CountVectorizer(stop_words="english")),
    ('classifier', ComplementNB())
])
```
Evaluate the model
```python
pipeNB.fit(X_train, y_train)

y_pred = pipeNB.predict(X_test)

print("Classification Report")
print("===================================")
print(classification_report(y_test, y_pred))
```
![classification report for complement CV](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/compl_count_class_rep.PNG)

Perform cross-validation
```python
accuracy, f1_score = [], []
skf = StratifiedKFold(n_splits=10, shuffle=True, random_state=100) 

for train_index, test_index in tqdm(skf.split(X_train, y_train), total=10):
    X_train_fold, X_test_fold = X_train[train_index], X_train[test_index] 
    y_train_fold, y_test_fold = y_train[train_index], y_train[test_index]

    pipeNB.fit(X_train_fold, y_train_fold)
    y_pred = pipeNB.predict(X_test_fold)
 
    accuracy.append(calculate_accuracy_score(y_test_fold, y_pred))
    f1_score.append(calculate_f1_score(y_test_fold, y_pred))

# make as array
f1_score = np.array(f1_score)
accuracy = np.array(accuracy)

print('\nModel Metrics ==> ')
print("================================================")
print(f'{"descr":5s} | {"accuracy":^10s} | {"f1_score":^10s}')
print("================================================")
print(f'{"Max":5s} | {accuracy.max():^10.2f} | {f1_score.max():^10.2f}') 
print(f'{"Min":5s} | {accuracy.min():^10.2f} | {f1_score.min():^10.2f}') 
print(f'{"Mean":5s} | {accuracy.mean():^10.2f} | {f1_score.mean():^10.2f}')
```
![cross validation](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/compl_count_cv.PNG)

#### Using Tfidfvectorizer in the pipeline

```python
pipeNB = Pipeline([
    ("clean_text", CleanTextTransformer()),
    ('tfidf', TfidfVectorizer(stop_words="english")),
    ('classifier', ComplementNB())
])
```
```python
pipeNB.fit(X_train, y_train)
```

```python
y_pred = pipeNB.predict(X_test)

print("Classification Report")
print("===================================")
print(classification_report(y_test, y_pred))
```
![classification report](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/compl_tfidf_class_rep.PNG)

#### Perform cross-validation
```python
accuracy, f1_score = [], []
skf = StratifiedKFold(n_splits=10, shuffle=True, random_state=100) 

for train_index, test_index in tqdm(skf.split(X_train, y_train), total=10):
    X_train_fold, X_test_fold = X_train[train_index], X_train[test_index] 
    y_train_fold, y_test_fold = y_train[train_index], y_train[test_index]

    pipeNB.fit(X_train_fold, y_train_fold)
    y_pred = pipeNB.predict(X_test_fold)
 
    accuracy.append(calculate_accuracy_score(y_test_fold, y_pred))
    f1_score.append(calculate_f1_score(y_test_fold, y_pred))

# make as array
f1_score = np.array(f1_score)
accuracy = np.array(accuracy)

print('\nModel Metrics ==> ')
print("================================================")
print(f'{"descr":5s} | {"accuracy":^10s} | {"f1_score":^10s}')
print("================================================")
print(f'{"Max":5s} | {accuracy.max():^10.2f} | {f1_score.max():^10.2f}') 
print(f'{"Min":5s} | {accuracy.min():^10.2f} | {f1_score.min():^10.2f}') 
print(f'{"Mean":5s} | {accuracy.mean():^10.2f} | {f1_score.mean():^10.2f}')
```
![cross validation](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/compl_tfidf_cv.PNG)

### Preparing the notebook for GaussianNB

```python
from utils import CleanTextTransformer, load_imdb_sentiment_analysis_dataset, GaussianBatchNB
(X_train, y_train), (X_test, y_test) = load_imdb_sentiment_analysis_dataset(imdb_data_path='aclImdb')
```
#### Using CountVectorizer in the pipeline
```python
pipeNB = Pipeline([
    ("clean_text", CleanTextTransformer()),
    ('count', CountVectorizer(stop_words="english")),
    ('classifier', GaussianBatchNB(batch_size=1000, classes=[0,1]))
])
```
Fit the model
```python
pipeNB.fit(X_train, y_train)
```
Evaluate the model
```python
y_pred = pipeNB.predict(X_test)

print("Classification Report")
print("===================================")
print(classification_report(y_test, y_pred))
```
![class report](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/gaus_count_class_rep.PNG)

#### Perform cross-validation
```python
accuracy, f1_score = [], []
skf = StratifiedKFold(n_splits=10, shuffle=True, random_state=100) 

for train_index, test_index in tqdm(skf.split(X_train, y_train), total=10):
    X_train_fold, X_test_fold = X_train[train_index], X_train[test_index] 
    y_train_fold, y_test_fold = y_train[train_index], y_train[test_index]

    pipeNB.fit(X_train_fold, y_train_fold)
    y_pred = pipeNB.predict(X_test_fold)
 
    accuracy.append(calculate_accuracy_score(y_test_fold, y_pred))
    f1_score.append(calculate_f1_score(y_test_fold, y_pred))

# make as array
f1_score = np.array(f1_score)
accuracy = np.array(accuracy)

print('\nModel Metrics ==> ')
print("================================================")
print(f'{"descr":5s} | {"accuracy":^10s} | {"f1_score":^10s}')
print("================================================")
print(f'{"Max":5s} | {accuracy.max():^10.2f} | {f1_score.max():^10.2f}') 
print(f'{"Min":5s} | {accuracy.min():^10.2f} | {f1_score.min():^10.2f}') 
print(f'{"Mean":5s} | {accuracy.mean():^10.2f} | {f1_score.mean():^10.2f}')
```
![cross validation](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/gaus_count_cv.PNG)

#### Using Tfidfvectorizer in the pipeline

```python
pipeNB = Pipeline([
    ("clean_text", CleanTextTransformer()),
    ('tfidf', TfidfVectorizer(stop_words="english")),
    ('classifier', GaussianBatchNB(batch_size=1000, classes=[0,1]))
])
```
Fit the model
```python
pipeNB.fit(X_train, y_train)
```
Evaluate the fitted model
```python
y_pred = pipeNB.predict(X_test)

print("Classification Report")
print("===================================")
print(classification_report(y_test, y_pred))
```
![class rep](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/gaus_tfidf_class_rep.PNG)

#### Perform cross-validation
```python
accuracy, f1_score = [], []
skf = StratifiedKFold(n_splits=10, shuffle=True, random_state=100) 

for train_index, test_index in tqdm(skf.split(X_train, y_train), total=10):
    X_train_fold, X_test_fold = X_train[train_index], X_train[test_index] 
    y_train_fold, y_test_fold = y_train[train_index], y_train[test_index]

    pipeNB.fit(X_train_fold, y_train_fold)
    y_pred = pipeNB.predict(X_test_fold)
 
    accuracy.append(calculate_accuracy_score(y_test_fold, y_pred))
    f1_score.append(calculate_f1_score(y_test_fold, y_pred))

# make as array
f1_score = np.array(f1_score)
accuracy = np.array(accuracy)

print('\nModel Metrics ==> ')
print("================================================")
print(f'{"descr":5s} | {"accuracy":^10s} | {"f1_score":^10s}')
print("================================================")
print(f'{"Max":5s} | {accuracy.max():^10.2f} | {f1_score.max():^10.2f}') 
print(f'{"Min":5s} | {accuracy.min():^10.2f} | {f1_score.min():^10.2f}') 
print(f'{"Mean":5s} | {accuracy.mean():^10.2f} | {f1_score.mean():^10.2f}')
```
![cross validation](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/gaus_count_cv.PNG)

### Preparing the notebook for MultinomialNB

```python
from utils import CleanTextTransformer, load_imdb_sentiment_analysis_dataset

(X_train, y_train), (X_test, y_test) = load_imdb_sentiment_analysis_dataset(imdb_data_path='aclImdb')
```
#### Using Countvectorizer in the pipeline

```python
pipeNB = Pipeline([
    ("clean_text", CleanTextTransformer()),
    ('count', CountVectorizer(stop_words="english")),
    ('classifier', MultinomialNB())
])
```
Fit the model
```python
pipeNB.fit(X_train, y_train)
```
Evaluate the fitted model
```python
y_pred = pipeNB.predict(X_test)

print("Classification Report")
print("===================================")
print(classification_report(y_test, y_pred))
```
![multinomial class rep](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/multi_count_class_rep.PNG)

#### Perform cross-validation

```python
accuracy, f1_score = [], []
skf = StratifiedKFold(n_splits=10, shuffle=True, random_state=100) 

for train_index, test_index in tqdm(skf.split(X_train, y_train), total=10):
    X_train_fold, X_test_fold = X_train[train_index], X_train[test_index] 
    y_train_fold, y_test_fold = y_train[train_index], y_train[test_index]

    pipeNB.fit(X_train_fold, y_train_fold)
    y_pred = pipeNB.predict(X_test_fold)
 
    accuracy.append(calculate_accuracy_score(y_test_fold, y_pred))
    f1_score.append(calculate_f1_score(y_test_fold, y_pred))

# make as array
f1_score = np.array(f1_score)
accuracy = np.array(accuracy)

print('\nModel Metrics ==> ')
print("================================================")
print(f'{"descr":5s} | {"accuracy":^10s} | {"f1_score":^10s}')
print("================================================")
print(f'{"Max":5s} | {accuracy.max():^10.2f} | {f1_score.max():^10.2f}') 
print(f'{"Min":5s} | {accuracy.min():^10.2f} | {f1_score.min():^10.2f}') 
print(f'{"Mean":5s} | {accuracy.mean():^10.2f} | {f1_score.mean():^10.2f}')
```
![multinomial cross validation](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/multi_count_cv.PNG)

#### Using Tfidf in the pipeline
```python
pipeNB = Pipeline([
    ("clean_text", CleanTextTransformer()),
    ('tfidf', TfidfVectorizer(stop_words="english")),
    ('classifier', MultinomialNB())
])
```
Fit the model
```python
pipeNB.fit(X_train, y_train)
```
Evaluate the fitted model
```python
y_pred = pipeNB.predict(X_test)

print("Classification Report")
print("===================================")
print(classification_report(y_test, y_pred))
```
![multinomial tfidf class rep](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/multi_tfidf_class_rep.PNG)

#### Perform cross-valdiation
```python
accuracy, f1_score = [], []
skf = StratifiedKFold(n_splits=10, shuffle=True, random_state=100) 

for train_index, test_index in tqdm(skf.split(X_train, y_train), total=10):
    X_train_fold, X_test_fold = X_train[train_index], X_train[test_index] 
    y_train_fold, y_test_fold = y_train[train_index], y_train[test_index]

    pipeNB.fit(X_train_fold, y_train_fold)
    y_pred = pipeNB.predict(X_test_fold)
 
    accuracy.append(calculate_accuracy_score(y_test_fold, y_pred))
    f1_score.append(calculate_f1_score(y_test_fold, y_pred))

# make as array
f1_score = np.array(f1_score)
accuracy = np.array(accuracy)

print('\nModel Metrics ==> ')
print("================================================")
print(f'{"descr":5s} | {"accuracy":^10s} | {"f1_score":^10s}')
print("================================================")
print(f'{"Max":5s} | {accuracy.max():^10.2f} | {f1_score.max():^10.2f}') 
print(f'{"Min":5s} | {accuracy.min():^10.2f} | {f1_score.min():^10.2f}') 
print(f'{"Mean":5s} | {accuracy.mean():^10.2f} | {f1_score.mean():^10.2f}')
```
![multinomial tfidf cross validation](/engineering-education/sentiment-analysis-with-naive-bayes-algorithms/multi_tfidf_cv.PNG).

### Conclusion

Even though complement and multinomial seem to have a tie in their scores, I will stil stick to the fact that complement is the best naive Bayes algorithm for text classification, the reason for choosing the complement model is that it has been used on numerous datasets before this, the complement model has been doing well across the board.

Therefore, we can all agree that complementNB is the best naive Bayes algorithm for sentiment analysis. 

To get the best grip of everything, check out [my Github repo:](https://github.com/wizardcalidad/sentiment-analsis-imdb)

On a final note, machine learning is not all about building models for predictions and classification, it is about figuring out how machines can learn from experience to solve major problems. Building a system to help billions of people solve everyday problems gives you an unimaginable feeling of satisfaction. Go out there, come up with an idea, train it, test it thoroughly, and make the world a better place.

### Additional resources

1. [Sentiment Analysis of Twitter Data](https://www.section.io/engineering-education/sentiment-analysis/)

2. [What is sentiment analysis?](https://en.wikipedia.org/wiki/Sentiment_analysis)

3. [Understanding Sentiment Analysis](https://monkeylearn.com/sentiment-analysis/)

4. [Twitter sentiment analysis](https://www.geeksforgeeks.org/twitter-sentiment-analysis-using-python/)

5. [Sentiment Analysis](https://medium.com/better-programming/twitter-sentiment-analysis-15d8892c0082)

6. [Working with IMDB Movie Review](https://developers.google.cn/machine-learning/guides/text-classification/step-2?hl=da)
