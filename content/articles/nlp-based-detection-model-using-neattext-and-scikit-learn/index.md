---
layout: engineering-education
status: publish
published: true
url: /nlp-based-detection-model-using-neattext-and-scikit-learn/
title: How to Build an NLP Based Emotion Detection Model using Neattext and Scikit-learn
description: This tutorial will show the reader how to build an NLP based emotion detection model using NeatText and Scikit-learn.
author: francis-ndiritu
date: 2021-11-30T00:00:00-11:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/hero.jpg
    alt: NLP emotion detection NeatText Scikit-learn Hero image
---
Natural language processing helps computers understand speech and written text like a human being. This allows machines to compute necessary responses. One of the many NLP applications is emotion detection in text.
<!--more-->
The emotion detection model is a type of model that is used to detect the type of feeling and attitude in a given text. It may be a feeling of joy, sadness, fear, anger, surprise, disgust, or shame. 

An emotion detection model can classify a text into the following categories. By using emotion detection in text, businesses can know how customers feel about their brand and products. This helps businesses improve product quality and service delivery.

In this tutorial, we will use Neattext and Scikit-learn to build our model. Neattext is a Python library used to preprocess our dataset. Neattext will clean the text dataset by removing stop words and other noise. 

This makes it easier for the model to use the dataset during training. We'll use Scikit-learn to build our model. It contains all the algorithms required for classification. This is a practical guide from data preprocessing to model building and testing.

### Prerequisites
To follow along a reader must know:
- [Python](/engineering-education/python-projects-for-beginners/) programming.
- How to build [machine learning models](/engineering-education/house-price-prediction/).
- How to work with [Pandas](https://numpy.org/) and [Numpy](https://numpy.org/).
- Have some knowledge of [natural language processing](/engineering-education/how-to-create-nlp-application-with-flair/).

> NOTE: In this tutorial, we will use [Google Colab](https://research.google.com/) to build our model.

### Table of contents
- [Exploring our dataset](#exploring-our-dataset)
- [Loading dataset](#loading-dataset)
- [Getting started with Neattext](#getting-started-with-neattext)
- [Importing machine learning packages](#importing-machine-learning-packages)
- [Model features and labels](#model-features-and-labels)
- [Dataset splitting](#dataset-splitting)
- [Pipeline approach](#pipeline-approach)
- [Model fitting](#model-fitting)
- [Calculating the accuracy score](#calculating-the-accuracy-score)
- [Making a single prediction](#making-a-single-prediction)
- [Conclusion](#conclusion)
- [Reference](#references)

### Exploring our dataset
In this tutorial, we will use a dataset that contains various texts with different emotion labels. The dataset has eight emotion labels that are named as follows: joy, sadness, fear, anger, surprise, neutral, disgust, and shame. The dataset will be used during the training phase. The trained model will then be used to classify a given text into the emotion labels.

A snip of the dataset is shown below:

![Dataset snip](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/dataset-snip.png)

To get this dataset in CSV format, click [here](https://drive.google.com/file/d/1tamvXZzgcYcHRr3GwFk8C4LVVaWHMqt0/view?usp=sharing).

After downloading the dataset, we can now load it into our Google Colab notebook.

#### Loading exploratory data analysis packages
We import two exploratory data analysis packages, `Pandas` and `Numpy`. We will use pandas to read our CSV file and load it into our Google Colab notebook. Numpy works with arrays and is used to perform mathematical computations to our data.

```python
import pandas as pd
import numpy as np
```

We use `pandas` to load our dataset.

### Loading dataset
Use the following command to load the dataset:

```python
df = pd.read_csv("emotion-dataset.csv")
```

To see how the dataset is structured, use this command:

```python
df.head()
```

The output is shown below:

![Dataset structure](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/dataset-structure.png)

The image above shows that our dataset has two columns: `Emotion` and `Text`. The `Emotion` column represents the various emotion labels. The `Text` column shows all the texts in our dataset.

To show the value count for each emotion, run the code below. It will give you the total number of texts for each `emotion` label.

```python
df['Emotion'].value_counts()
```

The output is shown below:

![Value count](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/emotion-value-count.png)

We can now start cleaning our dataset using Neattext.

### Getting started with Neattext
As mentioned earlier, Neattext is a Python library that is used to preprocess our dataset.  Neattext will clean the text dataset by removing stop words and noise.

To install Neattext, run this command:

```bash
!pip install neattext
```

We import `neattext` as follows:

```python
import neattext.functions as nfx
```

To use `neattext`, we list all the methods and attributes used by `neattext` for data cleaning.

```python
dir(nfx)
```

The output for the methods and attributes is shown below:

![Methods and attributes](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/methods-attributes.png)

We are interested in only two methods from the list, the `remove_stopwords` and `remove_userhandles`.

#### Removing user handles
The dataset contains some Twitter handles of different users. These handles are unnecessary and considered as noise to our dataset. We use the `remove_userhandles` method to remove them from our dataset.

```python
df['Clean_Text'] = df['Text'].apply(nfx.remove_userhandles)
```

We use the `apply()` method to add `remove_userhandles`. We save the cleaned dataset into a new column named `Clean_Text`.

#### Removing stopwords
Stopwords is a list of all the commonly used words in any language. Stopwords carry very little helpful information and have minimal impact on the model during training. These words lead to model bias during training. Removing stopwords eliminates unimportant words, allowing the  applications to focus on the essential words instead.

Common stopwords are like articles of a given language. They include the words, `the`, `is`, `and` and `are` in the English language.

```python
df['Clean_Text'] = df['Clean_Text'].apply(nfx.remove_stopwords)
```

In this section, we also use `apply()` to add `remove_stopwords`. We save the cleaned dataset into a new column named `Clean_Text`.

To get the output of the clean dataset, run this command:

```python
df
```

The output of the dataset after removing user handles and stopwords is shown below:

![Clean dataset](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/clean-dataset.png)

Now that we cleaned our dataset, we can now load our machine learning packages.

### Importing machine learning packages

```python
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
```

From the code above, we have imported the following:

- `LogisticRegression` is an algorithm used for both classification and regression. This algorithm is imported from [Scikit-learn](https://scikit-learn.org/stable/). We will use it for emotion classification.

- Machine learning models have a problem comprehending raw text, they work well with numbers. Machines cannot process the raw text data, and it has to be converted into a matrix of numbers. `CountVectorizer` is used to convert the raw text into a matrix of numbers. This process depends on the frequency of each word in the entire text. During this process, `CountVectorizer` extracts important features from the text. They are used as input for the model during training.

- The `train_test_split` method is important during the splitting of the dataset. It splits the dataset set into two sets, a `train set`, and a `test set`. This depends on the percentage specified by the user.

- The `accuracy_score` is important when calculating the accuracy score of our model during prediction.

Features and labels are important in machine learning. In this section, we will specify our features and labels.

### Model features and labels
Features are the attributes and variables extracted from the dataset. These extracted features are used as inputs to the model during training enabling model learning. Our features are present in the `Clean_Text` column.

Labels are the output or the target variable. Our label is the `Emotion` column, and this is what the model is predicting.

```python
Xfeatures = df['Clean_Text']
ylabels = df['Emotion']
```

### Dataset splitting
We need to split our dataset into a train set and test set. The model will learn from the train set. We will use the test set to evaluate the model performance and measure the model's knowledge capability.

We specify the `test_size=0.3`. This will split our dataset with `70%` of data used for training and `30%` for testing.

To make the process of training our model faster and automated, we will use a machine learning pipeline. Machine learning pipelines automate the machine learning workflows such as model fitting and training. 

Doing so saves the developers time and reduces model errors. Machine learning pipeline is a new approach adopted by many developers as it produces quality models which are free from bugs.

To use this pipeline approach, we need to import the `Pipeline` package.

### Pipeline approach
We import `Pipeline` using the following code:

```python
from sklearn.pipeline import Pipeline
```

To use `Pipeline` we need to specify the machine learning stages we want to automate. In this tutorial, we have two processes we want to automate. The first stage is the `CountVectorizer` process. This stage converts the raw text dataset into a matrix of numbers that a machine can understand. 

The second stage is the model training process using the `LogisticRegression` algorithm. In this stage, the model learns from the dataset. During training, it understands patterns, gains knowledge, and uses the knowledge to make predictions.

The two pipeline stages are initialized as follows:

```python
pipe_lr = Pipeline(steps=[('cv',CountVectorizer()),('lr',LogisticRegression())])
```

After initializing the two stages, we need to fit these stages into our dataset. We will use the train set dataset, which is specified as `x_train` and `y_train`.

### Model fitting
To fit the pipeline stages into `x_train` and `y_train`, run this code:

```python
pipe_lr.fit(x_train,y_train)
```

The `Pipeline` will run the following stages automatically and produce the following output:

![Pipeline ouput](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/pipeline-output.png)

This process produces the optimal model that will give the best results. With time the model will improve on its own and give better prediction results.

After building the model, we check the accuracy score produced by our `Pipeline` to evaluate the model's performance.

### Calculating the accuracy score
To check the accuracy score, run this command:

```python
pipe_lr.score(x_test,y_test)
```

The output is shown below:

```bash
0.8200421536692853
```

When the accuracy score is expressed as a percentage, it becomes `82.0%`. This is a high accuracy after the first phase of training. Through continuous training, the model will increase the accuracy score. The higher the accuracy score, the better model will be in making predictions.

Our model is now fully trained and tested. We can now use this model to make predictions.

### Making a single prediction
Our model should be able to classify a given text into emotion labels. Let's use the sample text shown below to make a prediction.

```python
sample1 = "This chocolate was very sweet it made me happy"
```

To make the actual prediction, run this code:

```python
pipe_lr.predict([sample1])
```

We use the `predict` method to predict our sample text. The prediction outcome is shown below:

```bash
array(['joy'], dtype=object)
```

The prediction outcome is `joy`. This is the correct prediction. This shows that our model can accurately predict. It can be adopted and deployed to production.

The Google Colab notebook link for this tutorial is available [here](https://colab.research.google.com/drive/1y6Xd9DqAtKgTE8P4wkwjbK1X7Mu90oMD?usp=sharing).

### Conclusion
In this tutorial, we have learned how to build an emotion detection model using Neattext and Scikit-learn. We started by cleaning our dataset using Neattext. The dataset has to be in the right shape before it is used for training. 

We explored the different machine learning packages and algorithms to use. We used the logistic regression algorithm to build our emotion detection model. We also introduced a concept known as machine learning pipeline. The pipeline approach made our work easier. It automates the `CounterVectorizer` process and model building. 

Finally, we used this model to make accurate predictions. Any business can adopt the model and use it to monitor online conversations and reviews made by customers. This gives businesses an added advantage on how to improve their brand image.

Happy coding!

### References
- [Google Colab notebook](https://colab.research.google.com/drive/1y6Xd9DqAtKgTE8P4wkwjbK1X7Mu90oMD?usp=sharing)
- [Neattext documentation](https://pypi.org/project/neattext/)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [Getting started with machine learning pipeline](https://valohai.com/machine-learning-pipeline/)
- [Pandas Documentation](https://pandas.pydata.org/)
- [NumPy Documentation](https://numpy.org/)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
