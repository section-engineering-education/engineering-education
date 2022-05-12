---
layout: engineering-education
status: publish
published: true
url: /multi-output-classification-with-machine-learning/
title: Multi-Output Classification with Machine Learning
description: This tutorial aims to build a multi-output text classification model using the Netflix dataset. The model will classify the input text as either `TV Show` or `Movie`.
author: willyngashu
date: 2022-01-21T00:00:00-05:08
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/multi-output-classification-with-machine-learning/hero.jpg
    alt: Multi-Output Classification with Machine Learning Hero image
---
Multi-output classification is a type of machine learning that predicts multiple outputs simultaneously. In multi-output classification, the model will give two or more outputs after making any prediction. In other types of classifications, the model usually predicts only a single output.
<!--more-->
An example of a multi-output classification model is a model that predicts the `type` and `color` of fruit simultaneously. The `type of fruit` can be, orange, mango and pineapple. The `color` can be, red, green, yellow, and orange. The multi-output classification solves this problem and gives two prediction results.

In this tutorial, we will build a multi-output text classification model using the Netflix dataset. The model will classify the input text as either `TV Show` or `Movie`. This will be the first output. The model will also classify the rating as: `TV-MA`, `TV-14`, `TV-PG`, `R`, `PG-13` and `TV-Y`. The rating will be the second output. We will use Scikit-Learn `MultiOutputClassifier` algorithm to build this model.

### Table of contents
- [Prerequisites](#prerequisites)
- [Netflix Dataset](#netflix-dataset)
- [Loading the dataset](#loading-the-dataset)
- [Output columns distribution](#output-columns-distribution)
- [Text cleaning](#text-cleaning)
- [Importing important packages](#importing-important-packages)
- [Adding features and labels](#adding-features-and-labels)
- [Dataset splitting](#dataset-splitting)
- [Importing pipeline](#importing-pipeline)
- [Making predictions](#making-predictions)
- [Prediction probabilities](#prediction-probabilities)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To understand the concepts in this tutorial, a reader should:

- Understand [Python programming](/engineering-education/python-projects-for-beginners/)
- Be able to build [machine learning models.](/engineering-education/house-price-prediction/)
- Understand [natural langauge processing](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/)
- Know how to train models using [Scikit-learn](https://scikit-learn.org/stable/)
- Use [Google Colab notebook](https://research.google.com/) to run the Python code in this tutorial.

### Netflix dataset
We will use the Netflix dataset to build our model. The image below will show how our dataset is structured.

![Dataset image](/engineering-education/multi-output-classification-with-machine-learning/dataset-image.png)

From the image above, our dataset has four columns: `title`, `description`, `type`, and `rating`. The `title` column will be the input column while `type` and `rating` will be the output column. We now need to load this dataset on our machine.

To download this Netflix dataset, click [here](https://drive.google.com/file/d/1524vMr5iCGEEJmPx2n2-TAl8EicKuxcg/view?usp=sharing)

### Loading the dataset
There are various exploratory data analysis (EDA) packages that will load our dataset. Let's import them using the following code:

```python
import pandas as pd
import numpy as np
```

We will use Pandas to load the dataset. We will use Numpy to perform computational operations on our dataset. It also works well with arrays.

Let's now load the Netflix dataset that you have downloaded from the link above.

```python
df = pd.read_csv("netflix_titles_dataset.csv")
```

To check if our dataset is loaded successfully, run the code:

```python
df.head()
```

This command will output the structure of our dataset, and it shows all the columns on our dataset. It should have the same structure as the dataset you have downloaded. The output is shown below:

![Loaded dataset](/engineering-education/multi-output-classification-with-machine-learning/loaded-dataset.png)

Now that we have loaded our dataset successfully, let's check the distribution of our target/output columns.

### Output columns distribution
From our dataset, we have two output columns: `type` and `rating`. Column distribution is the value count of each column in the entire dataset. We will start with the `type` column.

#### `type` column

```python
df['type'].value_counts()
```

The output is shown below:

```bash
Movie      4788
TV Show    2143
Name: type, dtype: int64
```

In the output above, we have 4788 `movie` data samples and 2143 `TV Show` data samples.

#### `rating` column
To get the value count of the `rating` column, use the following code:

```python
df['rating'].value_counts()
```

The output is shown below:

```bash
TV-MA    2863
TV-14    1931
TV-PG     806
R         665
PG-13     386
TV-Y      280
Name: rating, dtype: int64
```

The output above shows the distribution of all the ratings in our dataset. We have seven ratings: `TV-MA`, `TV-14`, `TV-PG`, `R`, `PG-13` and `TV-Y`.

Before building our model, we also need to clean our dataset. Dataset cleaning involves correctly formatting our dataset.

### Text cleaning
For text cleaning, we will convert all our text data into lower case and remove stop words. We will use the `NeatText` Python package to perform this process. We will install Neattext using the following code:

```bash
!pip install neattext
```

Let's import the Neattext functions that we will use for text cleaning.

```python
import neattext.functions as nfx
```

To convert the text data into lower case, run this command:

```python
df['title'] = df['title'].nfx.lower()
```

Let's remove stopwords from our test dataset. Stopwords are the most common words that are used in any language. They have little weight on the model during training.

Removing stopwords removes words with little weight. This allows the model to focus on the words that will have a greater impact during training.

To remove the stopwords, run this code:

```python
df['title'] = df['title'].apply(nfx.remove_stopwords)
```

Now that we have removed stop words and correctly formatted our dataset, let's import all the packages we will use to build the model.

### Importing important packages
To import all the important packages, run this code:

```python
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.multioutput import MultiOutputClassifier
```

Let's explain these packages that we have imported.

**LogisticRegression**
It is the algorithm used to train the model.

**CountVectorizer**
Since we are dealing with text, we need to convert the input text into vectors of numbers. Machine learning models do not understand the raw text. The converted vectors of numbers are the representation of the original text.

`CountVectorizer` is the most common Python package used to perform this process.

For further reading on CountVectorizer and how they convert raw text into vectors of numbers, click [here](https://towardsdatascience.com/basics-of-countvectorizer-e26677900f9c)

**train_test_split**
It is the Python package that is used for dataset splitting. In machine learning, it's essential to split a dataset into two sets. One set is to be used for training and another one for testing.

**accuracy_score**
It is used to calculate the accuracy score of the model after training.

**MultiOutputClassifier**
Since we are dealing with a multi-output classification problem, we need a more specific algorithm. `MultiOutputClassifier` is the most common [Scikit-learn](https://scikit-learn.org/stable/) algorithm used to build this model.

We now need to specify features and labels for our model.

### Adding features and labels
Features and labels are essential in any machine learning label. Features represent all the columns used by the model as inputs during training. Labels represent the output or target columns, which the model wants to predict. We add the using the following code:

```python
Xfeatures = df['title']
ylabels = df[['type','rating']]
```

From this code, our feature is the `title`, and we will use it as input for our model. The labels are `type` and `rating`, and are the output of our model. We have two labels because we are dealing with a multi-output classification problem.

The next step is to split our dataset using the `train_test_split` method.

### Dataset splitting
To split the dataset into two, use this code:

```python
x_train,x_test,y_train,y_test = train_test_split(Xfeatures,ylabels,test_size=0.3,random_state=7)
```

In the code above, we use a `test_size=0.3`. It will split our dataset so that `70%` of the dataset is used for training and `30%` for testing. We have split our dataset, and we are now ready to build the model.

To build this model, we will use the machine learning pipeline package to speed up the process of building our model. It will speed up the process by automating all the processes involved in building the model.

The machine learning pipeline will automate the process of `CountVectorizer`. It will also automate the process of model training using `LogisticRegression` and `MultiOutputClassifier` algorithms.

We will import the `Pipeline` package to implement this pipeline process.

### Importing pipeline
To import the `Pipeline`, use the following code:

```python
from sklearn.pipeline import Pipeline
```

To build the model using this `Pipeline` package, we need to initialize all the processes involved in building our model. In our case, we have two processes.

The first process is `CountVectorizer`: converting raw text to vectors of numbers. The second process uses the `LogisticRegression` and `MultiOutputClassifier` algorithms in training the model.

Let's initialize these two processes.

#### Initializing the processes
These processes are usually in sequential steps. The output of one process is used as the input of the next process, as shown in the code below.

```python
pipe_lr = Pipeline(steps=[('cv',CountVectorizer()),
                          ('lr_multi',MultiOutputClassifier(LogisticRegression()))])
```

Now that we have initialized the processes, let's fit the pipeline into our training dataset. This will enable the model to learn from the dataset. To fit the pipeline, use the following code:

```python
pipe_lr.fit(x_train,y_train)
```

The two processes will run automatically during this stage and produce a trained model, as shown below:

![Training process](/engineering-education/multi-output-classification-with-machine-learning/training-process.png)

We can calculate the accuracy score of this model using the following code:

```python
pipe_lr.score(x_test,y_test)
```

The accuracy score is shown below:

```bash
0.8969221004536385
```

The accuracy score for our model is `0.896922`. This represents `89.6922%`. It is a good accuracy score, and we can use this trained model to make predictions.

### Making predictions
To make a prediction, we need to extract a sample input text. To extract a sample text, run this code:

```python
print(x_test.iloc[0])
```

The output of this sample text is `the midnight sky`. Let's save this text in a variable.

```python
pred1 = x_test.iloc[0]
```

The model will use this input text to make a prediction. The model should classify the input text as either a `Movie` or `TV Show` and provide its rating.

To make this prediction, run this code:

```python
pipe_lr.predict([pred1])
```

The prediction output is shown below:

```bash
array([['Movie', 'TV-MA']], dtype=object)
```

From the output above, the model has produced two prediction outputs. It has classified the input text as a `Movie` with a rating of `TV-MA`. Therefore, we have successfully built our multi-output text classification model.

We can also calculate the prediction probability of these outputs. This enables us to know why the model made these predictions.

### Prediction probabilities
To calculate the probabilities, use the following code:

```python
print(pipe_lr.classes_)
pipe_lr.predict_proba([pred1])
```

The output is shown below:

```bash
[array(['Movie', 'TV Show'], dtype=object), array(['PG-13', 'R', 'TV-14', 'TV-MA', 'TV-PG', 'TV-Y'], dtype=object)]
[array([[0.74445483, 0.25554517]]),
 array([[0.12310188, 0.07038494, 0.21476461, 0.46916205, 0.10270243,
         0.01988409]])]
```

From the output above, we can see `Movie` had a higher probability of `0.74445483` than `0.25554517` of `TV Show`. That's why the model classified the text as `Movie`.

In the next prediction, `TV-MA` has a higher probability of `0.46916205` than the other rating. That's why the model classified the rating as `TV-MA`. Using these prediction probabilities, we can see that our model could make the right predictions.

### Conclusion
In this tutorial, we have learned how to build a multi-output classification model. We started by cleaning our Netflix dataset to ensure that we correctly formatted it before use. We then used the clean dataset to build the multi-output text classification model.

We used the `LogisticRegression` and `MultiOutputClassifier` algorithms to train the model. We implemented all the machine learning processes using the pipeline package. It sped up the process and made our work easier.

Finally, we used our model to make predictions, and the trained model could make the right predictions. To get the multi-output classification model we have built in this tutorial, click [here](https://colab.research.google.com/drive/11-SVWysrpK0SGp7d7EYnuArlYeLsv1K0?usp=sharing).

### References
- [Google Colab notebook](https://colab.research.google.com/drive/11-SVWysrpK0SGp7d7EYnuArlYeLsv1K0?usp=sharing)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [Getting started with Neattext](https://pypi.org/project/neattext/)
- [How to work with machine learnining pipeline](https://valohai.com/machine-learning-pipeline/)
- [MultiOutputClassifier algorithm](https://scikit-learn.org/stable/modules/multiclass.html)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
