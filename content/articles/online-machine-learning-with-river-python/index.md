---
layout: engineering-education
status: publish
published: true
url: /online-machine-learning-with-river-python/
title: Online Machine Learning with River Python
description: In this tutorial, we will use River Python to build our model and simulate streaming data. This will be a text classification model that classifies a given input text as either software or hardware-related.
author: bravin-wasike
date: 2021-09-20T00:00:00-17:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/online-machine-learning-with-river-python/hero.jpg
    alt: Online Machine Learning with River Python
---
Online machine learning is a type of machine learning in which data becomes available in a sequential order. At each step, the model is updated until we have a more accurate and robust model.
<!--more-->
The data is in motion and keeps on changing over time. It's best suited when we have streaming data, where we want to process one sample of data at a time.

This differs from traditional or offline machine learning, where the dataset is available locally and we generate a model at the end after learning from the entire dataset. In offline machine learning, all our datasets are usually available locally.

We show an overview of the difference between online and offline machine learning below:

![Online vs Offline machine learning](/engineering-education/online-machine-learning-with-river-python/offline-vs-online-machine-learning.jpg)

In this tutorial, we will use [River Python](https://riverml.xyz/latest/) to build our model and simulate streaming data. This will be a text classification model that classifies a given input text as either software or hardware-related.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [River Python installation](#river-python-installation)
- [Checking methods and attributes](#checking-methods-and-attributes)
- [Loading machine learning packages](#loading-machine-learning-packages)
- [Getting the relevant methods and attributes](#getting-the-relevant-methods-and-attributes)
- [Simulating streaming data](#simulating-streaming-data)
- [Building the pipeline](#building-the-pipeline)
- [Pipeline stages initialization](#pipeline-stages-initialization)
- [Visualizing the pipeline](#visualizing-the-pipeline)
- [Get pipeline steps](#get-pipeline-steps)
- [Building our model](#building-our-model)
- [Making prediction](#making-prediction)
- [Prediction probability](#prediction-probability)
- [Model accuracy](#model-accuracy)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
A reader must have the following:
1. [Python](/engineering-education/python-projects-for-beginners/) installed in your machine.
2. A good understanding of [Python](/engineering-education/python-projects-for-beginners/).
3. A good knowledge of [machine learning models](/engineering-education/house-price-prediction/).
4. How to use [Google Colab](https://research.google.com/) or [Jupyter Notebook](https://jupyter.org/). In this tutorial, we will use Google Colab.

> NOTE: For you to follow along easily, use Google Colab

### Introduction
As mentioned earlier, we will use [River Python](https://riverml.xyz/latest/) to build our model. [River Python](https://riverml.xyz/latest/) is best suited due to the following reasons:

- It has incremental functionality. This library can be updated after each observation, and thus can be used to process streaming data.
- It's adaptive. Since we are dealing with streaming data that keeps on changing over time, we need a library that is robust and can work under changing environments.
- It is general-purpose. River Python is used for classification, clustering, and regression. Both supervised and unsupervised machine learning.
- Efficient & easy to use. It's very efficient when handling streaming data, it is also simple and easy to use and a beginner can easily follow.

In online machine learning, the model uses real-time data for training and makes a single observation at a time. We then update our model as each new data arrives, increasing the model accuracy over time. 

The input data is continuously used to improve the current model's knowledge. As we further train the model, it becomes more adaptive and robust.

### River Python installation
Since we are using Google Colab, we install river using the following command:

```python
!pip install river
```

#### Import River
To use River, we import it into our machine.

```python
import river
```

### Checking methods and attributes
The River Python has various methods and attributes for online machine learning. To list all the available methods use the following command:

```python
dir(river)
```

This is a list of River methods and attributes:

```bash
['__all__',
 '__builtins__',
 '__cached__',
 '__doc__',
 '__file__',
 '__loader__',
 '__name__',
 '__package__',
 '__path__',
 '__spec__',
 '__version__',
 'anomaly',
 'base',
 'cluster',
 'compat',
 'compose',
 'datasets',
 'drift',
 'dummy',
 'ensemble',
 'evaluate',
 'expert',
 'facto',
 'feature_extraction',
 'feature_selection',
 'imblearn',
 'linear_model',
 'meta',
 'metrics',
 'multiclass',
 'multioutput',
 'naive_bayes',
 'neighbors',
 'neural_net',
 'optim',
 'preprocessing',
 'proba',
 'reco',
 'stats',
 'stream',
 'synth',
 'time_series',
 'tree',
 'utils']
```

Some of the methods that we will be using are as follows:

- `naive_bayes` - This is the algorithm that we will be using to build our text classification model.

- `preprocessing` - It will be used in the processing of our dataset used to train our model.

- `metrics` - It's used to calculate the accuracy score of our model.

- `stream` - It's used to simulate our dataset to be streaming data.

- `anomaly` - Is used to detect errors and anomalies in our model.

- `compose` - Is used to build a pipeline to automate machine learning workflows.

These methods will be very helpful in this tutorial.

### Loading machine learning packages
To load our machine learning packages, use the following commands:

```python
import MultinomialNB from river.naive_bayes
import BagOfWords,TFIDF from river.feature_extraction
```

We have imported the following packages:

#### MultinomialNB
This is a Naive Bayes method that is used for text classification. This contains the algorithm that is useful in the building of our model.

For a detailed understanding about MultinomialNB, please click [here](https://scikit-learn.org/stable/modules/generated/sklearn.naive_bayes.MultinomialNB.html).

#### BagOfWords
It is used to extract various features in our dataset. Features are the independent variables that are used as input for our model.

It also converts our text inputs into vectors that are more machine-readable. BagOfWords work the same as `CountVectorizer` in offline machine learning.

In offline machine learning, the `CountVectorizer` is used to transform a given text into a vector based on the frequency of each word that occurs in the entire text. This is helpful when we have the text and we wish to convert that text into a vector for further text analysis.

`CountVectorizer` is also used for very basic preprocessing like removing the punctuation marks and converting all the words to lowercase.

In this tutorial we will be dealing with online machine learning, thus, we replace `CountVectorizer` with `BagOfWords` which perform the same functionalities.

For a detailed understanding about TFIDF, please click [here](https://en.wikipedia.org/wiki/Bag-of-words_model).

#### TFIDF
TDIDF stands for Term Frequency-Inverse Document Frequency. It shows how words are relevant in a given document, and gives the importance of words.

This is done by measuring the frequency of how words appear in a given document. If a word appears frequently in a document, while not appearing frequently in others, it means this word is more relevant and has a more classification power as compared to words that appear in all the documents.

For a detailed understanding of TFIDF, please click [here](https://towardsdatascience.com/text-vectorization-term-frequency-inverse-document-frequency-tfidf-5a3f9604da6d).

### Getting the relevant methods and attributes
To use the methods stated earlier, we need to add them to our program. 

To do this, we use the following Python function:

```python
def get_all_attributes(package):
    subpackages = []
    submodules = []
    for i in dir(package):
        if str(i) not in ["__all__", "__builtins__", "__cached__", "__doc__", "__file__", "__loader__", "__name__", "__package__", "__path__", "__pdoc__", "__spec__", "__version__"]:
            subpackages.append(i)
            res = [j for j in dir(eval("river.{}".format(i)))]
            submodules.append(res)
    df = pd.DataFrame(submodules)
    df = df.T
    df.columns = subpackages
    res_df = df.dropna()
    return res_df
```

We name this function `get_all_attributes` to get all the attributes and methods needed to build our model.

The function loops through the package and removes the following: `__all__`, `__builtins__`, `__cached__`, `__doc__`, `__file__`, `__loader__`, `__name__`, `__package__`, `__path__`, `__pdoc__`, `__spec__` and `__version__`.

We remove them since they are not used to build our model.

The remaining sub-packages and sub-modules in the list are added using the `subpackages.append()` method.

We then add these sub-packages and sub-modules into our data frame using the `pd.DataFrame(submodules)` method. The data frame is what will be used to train our model. The data frame will now have all the sub-packages and sub-modules.

The above function removes the unnecessary methods, packages, and attributes as shown:

```python
dir(river)
```

The output of the remaining methods and attributes is shown:

```bash
['anomaly',
 'base',
 'cluster',
 'compat',
 'compose',
 'datasets',
 'drift',
 'dummy',
 'ensemble',
 'evaluate',
 'expert',
 'facto',
 'feature_extraction',
 'feature_selection',
 'imblearn',
 'linear_model',
 'meta',
 'metrics',
 'multiclass',
 'multioutput',
 'naive_bayes',
 'neighbors',
 'neural_net',
 'optim',
 'preprocessing',
 'proba',
 'reco',
 'stats',
 'stream',
 'synth',
 'time_series',
 'tree',
 'utils']
```

To add these methods and attributes into our program, use the commands shown below. This will make them available for use when building our model.

```python
river_df = get_all_attributes(river)
```

To see if these methods and attributes are added, use this command:

```python
river_df
```

The output is as shown:

![Methods and attributes](/engineering-education/online-machine-learning-with-river-python/methods-and-attributes-1.jpg)

![More methods and attributes](/engineering-education/online-machine-learning-with-river-python/methods-and-attributes-2.jpg)

### Simulating streaming data
To use River Python, we need streaming data. Streaming data comes in incrementally over time, and comes one at a time. To simulate streaming data, we use our dataset as a list of a tuple as shown:

> We will have two lists of data: A training list and a testing list.

#### Training list
```python
data = [("my python program is runnning","software"),
("I tried to run this program, but it has bugs","software"),
("I need a new machine","hardware"),
("the flashdisk is broken","hardware"),
("We need to test our code","software"),
("programming concepts and testing","software"),
("Electrical device","hardware"),
("device drives","hardware"),
("The generator is broken","hardware"),
("im buidling a REST API","software"),
("design the best API so far","software"),
("they need more electrical wiring","hardware"),
("my code has errors","software"),
("i found some program test faulty","software"),
("i broke the car handle","hardware"),
("i tested the user interface code","software")]
```

This contains a list of texts that are labeled as either `hardware` or `software` related. They will be used to train the model one at a time.

#### Testing List
```python
test_data = [('he writes programs daily','software'),
             ('my disk is broken','hardware'),
             ("program mantainance","software"),
             ('The drive is full','hardware')]
```

This test data will be used to test our model and measure the model performance.

### Building the pipeline
A machine learning pipeline is used to automate the workflow of a machine learning model.

Machine learning pipelines are made up of sequential steps. These steps involve data extraction, preprocessing, model training, and deployment.

Let's import Pipeline.

```python
from river.compose import Pipeline
```

Our pipeline will have two stages:
1. BagOfWords: It's used for feature extraction and conversion of text inputs into vectors.
2. MultinomialNB: Uses the Naive Bayes algorithm in building the model.

Let's initialize these two stages.

### Pipeline stages initialization
To initialize our pipeline, use this code snippet.

```python
pipe_nb = Pipeline(('vectorizer',BagOfWords(lowercase=True)),('nb',MultinomialNB()))
```

This will initialize our two stages; `BagOfWords` as `vectorizer` and `MultinomialNB` as `nb`. We also change our text to lowercase by setting `lowercase=True`.

### Visualizing the pipeline
To visualize the initialized pipeline, use this command:

```python
pipe_nb
```

The output is as shown:

![Pipeline Visualization](/engineering-education/online-machine-learning-with-river-python/pipeline-visualization.jpg)

### Get pipeline steps
To get the pipeline steps, use the following command. In this tutorial, we have two steps.

```python
pipe_nb.steps
```

Output:

```bash
OrderedDict([('vectorizer',
              BagOfWords (
                on=None
                strip_accents=True
                lowercase=True
                preprocessor=None
                tokenizer=<built-in method findall of re.Pattern object at 0x7fa35529de00>
                ngram_range=(1, 1)
              )),
             ('nb',
              MultinomialNB (
                alpha=1.
              ))])
```

### Building our model
Since we are dealing with streaming data, we have to learn from our data one a time to simulate streaming data.

Our data is in form of a list of tuples, so we can learn from it one a time by iterating through our data using the `for` loop. This will ensure that we train a model to give each instance in our loop over time, before going to the next instance as if we are dealing with real-time data that comes in streams.

#### Looping through our dataset
```python
for text,label in data:
    pipe_nb = pipe_nb.learn_one(text,label)
```

When looping through our dataset, we use the `learn_one()` method to learn one at a time from our given list of the tuple. `learn_one()` will learn from the first `text` and `label` which is `"my python program is running", "software"` according to our data set.

It will store the knowledge learned and use it when the next data arrives. Since the model remembers the knowledge gained over time, it will be able to adapt to changes in the dataset. 

Over time, the model will be more accurate than when we began the training since it will have accumulated knowledge.

### Making prediction
In online machine learning, the model does not wait till the end to make predictions. It will predict this instance and continue training when the next data arrives.

```python
pipe_nb.predict_one("I built an API")
```

We use `predict_one` to predict according to this instance.

The output is shown:

```bash
'software'
```

This is true since our text is `software` related.

### Prediction probability
To get the probability of the classification above, use this command:

```python
pipe_nb.predict_proba_one("I built an API")
```

We use the `predict_proba_one()` method to get the probability of prediction at this instance.

The output is as shown:

```python
{'software': 0.732646964375691, 'hardware': 0.2673530356243093}
```

This shows that the probability of the text being classified as `software` is more than that of `hardware`. Their probabilities are `0.7326` and `0.2673` respectively.

Online machine learning is a continuous process since we are using real-time time data that is continuously being generated.

Let's make another prediction.

#### Other prediction
```python
pipe_nb.predict_one("the hard drive  in the computer is damaged")
```

The prediction output:

```bash
'software'
```

This gives a wrong prediction because it is still early in the learning process. But as we continue training using our dataset, the model will gain more knowledge which it will use when making future predictions. 

The aim is for the learning model to adapt to new data without forgetting the existing knowledge.

At the beginning of the training phase, the model has a lower accuracy, but with time the accuracy increases. Let's calculate the model accuracy at this instance.

### Model accuracy
We need to get the accuracy of our model at this instance. We use the `river.metrics.Accuracy()` method to calculate the accuracy.

We loop through our data set to get the instance we want to calculate the accuracy for and update our model with the accuracy score after making a prediction using `metric.update`.

```python
metric = river.metrics.Accuracy()
for text,label in test_data:
    y_pred_before = pipe_nb.predict_one(text)
    metric = metric.update(label,y_pred_before)
    pipe_nb = pipe_nb.learn_one(text,label)
```

To get the accuracy score, use the following command:

```python
metric
```

The output is as shown.

```bash
Accuracy: 75.00%
```

Being the first prediction, this is a good accuracy for our model. This shows that our model has a 75% chance of making an accurate prediction. 

As we continue training, our model will learn from the dataset and store the knowledge. It will then use this accumulated knowledge to increase the accuracy score when making predictions, this is the goal of any model.

### Conclusion
In this tutorial, we have learned about online machine learning. We started by stating the difference between online and offline machine learning, this gave us a good working knowledge of this kind of model.

We then explored River Python which is a good library that can handle streaming data. River Python has various methods and attributes that are important in building our machine learning model.

We then applied a machine learning pipeline that automated our workflow from data processing, feature extraction, and building our model. We built our model using the Naive Bayes algorithm.

We finally used our trained model to make a prediction and also check the model accuracy. The higher the accuracy the better our model. Our model should be able to classify a given text to be either hardware or software-related.

Happy coding!

### References
- [Code implementation of this tutorial](https://colab.research.google.com/drive/17Xtmymg8Sh8E1m3zeNhmzqkauBRjyLh1?usp=sharing)
- [Online machine learning](https://en.wikipedia.org/wiki/Online_machine_learning)
- [Online vs offline machine learning differences](https://blog.goodaudience.com/online-vs-offline-machine-learning-which-one-to-use-934801e0a418?gi=ddf3aa016f62)
- [River Python documentation](https://riverml.xyz/latest/getting-started/getting-started/)
- [Text Classification](https://monkeylearn.com/text-classification/)

---

Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
