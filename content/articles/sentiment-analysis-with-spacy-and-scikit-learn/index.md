---
layout: engineering-education
status: publish
published: true
url: /sentiment-analysis-with-spacy-and-scikit-learn/
title: Sentiment Analysis with Spacy and Scikit-Learn
description: This article show the reader how to create a sentiment analysis engine from scratch using Spacy and scikit-learn.
author: francis-ndiritu
date: 2021-10-13T00:00:00-13:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/hero.png
    alt: Spacy scikit-learn sentiment analysis example image
---
Sentiment analysis is a subset of natural language processing and text analysis that detects positive or negative sentiments in a text. 
<!--more-->
Sentiment analysis helps businesses understand how people gauge their business and their feelings towards different goods or services. 

The evaluation is done using reviews on their sites, as well as monitoring online conversations.

Sentiment analysis is used to analyze customer feedback. It helps businesses to determine whether customers are happy or frustrated with their products. 

Businesses use this information to change their products to meet customers' needs.

In this tutorial, we will use Spacy to build our sentiment analysis model. We will use three datasets from `IMDB`, `Amazon`, and `Yelp`.

These datasets contain reviews that are either labeled positive or negative. 

In addition, the dataset contains movie reviews from the IMDB dataset, product reviews from the Amazon dataset, and local business and social networking site reviews from the Yelp dataset.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Dataset used](#dataset-used)
- [Loading dataset](#loading-dataset)
- [Adding headers](#adding-headers)
- [Merge or concatenate our datasets with the keys](#merge-or-concatenate-our-datasets-with-the-keys)
- [Removing stop words](#removing-stop-words)
- [Loading machine learning packages](#loading-machine-learning-packages)
- [Custom transformer class](#custom-transformer-class)
- [Vectorization and classifier](#vectorization-and-classifier)
- [TfidfVectorizer method](#tfidfVectorizer-method)
- [Features and labels](#features-and-labels)
- [Dataset splitting](#dataset-splitting)
- [Creating the pipeline](#creating-the-pipeline)
- [Accuracy score](#accuracy-score)
- [Making prediction](#making-prediction)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
1. A good understanding of [Python](/engineering-education/python-projects-for-beginners/).
2. Some knowledge of [machine learning](/engineering-education/house-price-prediction/).
3. Have some working knowledge of [natural language processing](https://en.wikipedia.org/wiki/Natural_language_processing).

> NOTE: To follow along easily, use [Google Colab](https://research.google.com/).

### Introduction
There are different types of sentiment analysis depending on the model goals. 

- Models that focus on the polarity of a given text: positive, neutral, and negative.
- Model that focuses on feeling and emotions within a text.
- Models that focus on the intentions and urgency of a customer.

Depending on these goals, they are further classified into the following groups.

1. Standard Sentiment Analysis.
2. Fine-grained Sentiment Analysis.
3. Emotion Detection.
4. Aspect-based Sentiment Analysis.
5. Intent Detection.

#### Standard Sentiment Analysis
It detects the polarity of a given text, either positive, negative, or neutral.

For Example:

- "I love using your product": The polarity is `Positive.`
- "Your product has many issues": The polarity is `Negative.`
- "I am open to further assistance about your product": The polarity is `Neutral.`

#### Fine-grained Sentiment Analysis
It focuses on the polarity of given text but adds more options or categories such as:
- Very positive
- Positive
- Neutral
- Negative
- Very Negative

For Example.

- "This is the best product ever": The polarity is `Very Positive.`
- "This product is disgusting": The polarity is `Very Negative.`

For a practical guide on fine-grained sentiment analysis, click [here](https://towardsdatascience.com/fine-grained-sentiment-analysis-in-python-part-1-2697bb111ed4)

#### Emotion Detection
This type detects emotions and feelings in a given text. For example, the emotions can be happiness or anger.

For Example:

- "This product makes my work easier": This shows `Happiness.`
- "It has ruined my schedule and caused me pain": This shows `Anger.`

For a practical guide on emotion detection, click [here](https://towardsdatascience.com/emotion-detection-a-machine-learning-project-f7431f652b1f)

#### Aspect-based Sentiment Analysis
Aspect-based sentiment analysis (ABSA) is a text analysis technique that categorizes data by aspect and identifies the sentiment attributed to each one.

Aspect-based sentiment analysis can analyze customer feedback by associating specific sentiments with different aspects of a product or service.

Aspects are the attributes or components of a product or service. For example: "The user experience of a new product", "the response time for a query or complaint", or "the ease of integration of new software".

Aspect sentiment analysis is important because it helps companies to sort and analyze customer data, automate processes like customer support tasks, and gain powerful insights from customer reviews.

For a practical guide on aspect-based sentiment analysis, click [here](https://www.analyticsvidhya.com/blog/2021/06/analyzing-customer-feedbacks-using-aspect-based-sentiment-analysis/)

#### Intent Detection
This focuses on the customer's goals and intention behind a given statement. This is applied in chatbot systems to provide better answers and assistance.

For example.

- "This app keeps on crashing. What should I do?": This shows "Need for assistance."

For a practical guide on intent detection, click [here](https://rasa.com/blog/rasa-nlu-in-depth-part-1-intent-classification/)

In this tutorial, we will build a `standard sentiment analysis` model.

### Dataset used
As stated, we are working with three datasets: IMDB dataset, Amazon dataset, and Yelp dataset. 

The datasets contain reviews of different products or services. The reviews are labeled either `1` to show a `positive` review or `0` for a `negative` review.

Our dataset is in text format, which is easy to read and use by our model.

A snip of the three datasets in text format is shown below:

![Amazon dataset snip](/engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/amazon-snip.jpg)

To download the Amazon dataset in a text format, click [here](https://drive.google.com/file/d/1JYwslHzs_7bCxaS1XEDzMByn27-EAbez/view?usp=sharing)

![IMDB dataset snip](/engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/imdb-snip.jpg)

To download the IMDb dataset in a text format, click [here](https://drive.google.com/file/d/11_TT9aP-HvY0AmipuQOZV3JpXPCwS6d_/view?usp=sharing)

![Yelp dataset snip](/engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/yelp-snip.jpg)

To download the Yelp dataset in a text format, click [here](https://drive.google.com/file/d/1eguxUNJWf9sMGqFqrJATLFWLIMxXuR0i/view?usp=sharing)

After downloading all three datasets, let's load them into our machine.

### Loading dataset
We use the `Pandas` package to load our dataset. Pandas is used for data manipulation and analysis.

```python
import pandas as pd
```

Let's use `Pandas` to read our three datasets as shown below.

```python
df_yelp = pd.read_table('yelp_labelled.txt')
df_imdb = pd.read_table('imdb_labelled.txt')
df_amz = pd.read_table('amazon_cells_labelled.txt')
```

Since we have three different datasets, we have to concatenate them together.

```python
frames = [df_yelp,df_imdb,df_amz]
```

### Adding headers
Our dataset has no headers. We need to separate our dataset into two columns and give them heading names. 

It will have two columns. The first column, named `Message`, will contain the actual review text, while the other column is named `Target`, will contain the label of either `1` or `0`.

```python
for colname in frames:
    colname.columns = ["Message","Target"]
```

Let's print the column names, as shown below:

```python
for colname in frames:
    print(colname.columns)
```

The output is, as shown below:

```bash
Index(['Message', 'Target'], dtype='object')
Index(['Message', 'Target'], dtype='object')
Index(['Message', 'Target'], dtype='object')
```

We need to assign keys to our dataset to distinguish them since we have merged the three datasets. The dataset belongs into three groups `Yelp`, `IMDB`, and `Amazon`.

```python
keys = ['Yelp','IMDB','Amazon']
```

### Merge or concatenate our datasets with the keys
We have created three keys in the above section: `Yelp`, `IMDB`, and `Amazon`. Then, we add the list of keys to our dataset. 

The keys enable the model to know where each dataset belongs since we have merged the three datasets. This makes it easy for our model to understand and use the dataset during the training phase.

```python
df = pd.concat(frames,keys=keys)
```

To see the output of the merged keys and datasets, use this command.

```python
df.head()
```

![Output](/engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/output.jpg)

The above output shows the keys added to our dataset. The output also shows the two additional columns, `Message` and `Target`, labeled either `0` or `1`.

Now that we have prepared the dataset, we can now remove stop words from the dataset.

### Removing stop words
Stop words are a set of commonly used words in a language. They have a lower classification power because they are not unique and make the model biased.

We remove stop words using Spacy. Let's first install Spacy into our machine.

Since we are using Google Colab in this tutorial, we install Spacy using this command.

```python
!pip install -U spacy
```

After installing Spacy, let's import this library.

```python
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
nlp = spacy.load('en')
```

In the above code, we have imported the following.

#### Spacy
This is the library we will use for sentiment analysis

#### Stopwords
This package is used to remove the stopwords in the dataset.

We also specify the language used as English using `spacy.load('en')`.

Let's list all the stopwords in our dataset.

```python
stopwords = list(STOP_WORDS)
```

Let's remove the stopwords.

```python
for word in stopwords:
    if word.is_stop == False and not word.is_punct:
```

The code snippet above removes the stopwords in the dataset. It also removes all the punctuations using `word.is_punct` after looping through the dataset.

### Loading machine learning packages
Let's import all the packages used in building our model. We will use `Scikit-learn` in building the model.

```python
import CountVectorizer,TfidfVectorizer from sklearn.feature_extraction.text
import accuracy_score from sklearn.metrics
import train_test_split from sklearn.model_selection
import TransformerMixin from sklearn.base
import LinearSVC from sklearn.svm
import Pipeline from sklearn.pipeline
```

In the above code, we have imported the following.

1. CountVectorizer
2. TfidfVectorizer
3. accuracy_score
4. train_test_split
5. TransformerMixin
6. LinearSVC
7. Pipeline

#### CountVectorizer
This package is used to transform the texts in our dataset into numeric values that are in vectors. These numeric values can be accessed by the model more quickly than text.

For detailed understanding about `CountVectorizer`, click [here](https://towardsdatascience.com/basics-of-countvectorizer-e26677900f9c)

#### TfidfVectorizer
TF-IDF(frequency-inverse document frequency) is a statistical measure that evaluates how relevant a word is in a collection of documents.

If a word is common in a given document and common in other documents, it indicates that it has less power when making a prediction. 

Conversely, if a word is unique in a document, it shows it has more power in classification and predictive analysis.

For detailed understanding about `TfidfVectorizer` click [here](https://medium.com/@cmukesh8688/tf-idf-vectorizer-scikit-learn-dbc0244a911a)

#### accuracy_score
This package is used to calculate the model's accuracy when making a prediction.

#### train_test_split
This is used to split our dataset into a training set and testing set.

#### TransformerMixin
This is used to fit the model into the dataset during the training phase. It ensures that our model learns the patterns in the dataset.

#### LinearSVC
This is the support vector machine algorithm used in building the model. It uses the LinearSVC method to fit our model to the data and produce the best fit.

#### Pipeline
A pipeline is an important aspect of machine learning. It automates functions such as `CountVectorizer`, `TfidfVectorizer`, `TransformerMixin`, and `LinearSVC`.

This makes model building process faster and easier since all the stages are bundled together into one unit process.

Let's use these imported packages starting with `TransformerMixin`.

To implement the data transformer, we need to create a custom class.

### Custom transformer class

```python
class transformers(TransformerMixin):
    def data_transform(X_train, Y_train):
        return [clean_text(text) for text in X]
    def model_fit(X=text, y=text_set,):
        return text
    def set_params(best_params, set=True):
        return {}

def text_cleaning(text):
    return clean_text.label().lower_case()
```

The above `transformers` class has the following functions.

#### data_transform
It checks the parameters in the dataset using `X_train` and `Y_train`. It then converts them into a structure that the model can understand.

#### model_fit
It fits the model into the dataset. This enables the model to learn by understanding patterns in the dataset.

#### set_params
This method retrieves all the converted and optimized parameters to produce an optimized model.

#### text_cleaning
This function cleans our dataset and converts all the texts into lower case.

Let's go to the next stages.

### Vectorization and classifier
In vectorization, we use `CountVectorizer` that converts our text dataset into numeric vectors.

The classifier is the algorithm used in building the model. In this case, we are using `LinearSVC`. 

This is the classification method used by the support vector machine algorithm.

```python
vectorizer = CountVectorizer(tokenizer = spacy_tokenizer, ngram_range=(1,1))
classifier = LinearSVC()
```

### TfidfVectorizer method
This is used to check the frequency in which a given word is used in our dataset.

```python
tfvectorizer = TfidfVectorizer(tokenizer = spacy_tokenizer)
```

### Features and labels
Features are the independent variable in our dataset that are used as inputs when building our model. In our case, the `Message` column will be our feature.

Labels are what we want to predict. In our case, we are trying to predict the sentiment of a given review. So the output can be either `1` for `positive` or `0` for `negative`.

In our case, the `Target` column will be the label.

```python
X = df['Message']
ylabels = df['Target']
```

### Dataset splitting
We split our dataset into train set and test set. This tutorial uses `75%` of our dataset as the train set and `25%` as the test set, as shown below:

```python
X_train, X_test, y_train, y_test = train_test_split(X, ylabels, test_size=0.25, random_state=42)
```

Let's build our pipeline to automate all these processes.

### Creating the pipeline
The pipeline will clean our dataset, vectorize our text into numeric values and finally classify our reviews as either `positive` or `negative`.

```python
pipe = Pipeline([("cleaner", predictors()),
                 ('vectorizer', vectorizer),
                 ('classifier', classifier)])
```

Let's use our pipeline to fit our model into the training dataset as shown.

```python
pipe.fit(X_train,y_train)
```

After training, the output is as shown.

```bash
Pipeline(memory=None,
     steps=[('cleaner', <__main__.predictors object at 0x7fee6cac3f98>), ('vectorizer', CountVectorizer(analyzer='word', binary=False, decode_error='strict',
        dtype=<class 'numpy.int64'>, encoding='utf-8', input='content',
        lowercase=True, max_df=1.0, max_features=None, min_df=1,
        ng...ax_iter=1000,
     multi_class='ovr', penalty='l2', random_state=None, tol=0.0001,
     verbose=0))])
```

Let's now calculate the accuracy score of our model.

### Accuracy score

```python
print("Accuracy: ",pipe.score(X_train,y_train))
```

The output is shown below:

```bash
Accuracy:  0.9849726775956285
```

This shows that our model has an accuracy score of `98.497%`. This is a good score and shows that our model has a higher chance of making correct predictions.

### Making prediction
We now use our model to see if we can classify a review as either `positive` or `negative`.

```python
pipe.predict(["I recommend this movie to watch, it's great"])
```

The output of the prediction is as shown.

```bash
array([1])
```

The output is `1`, which is a `positive` review.

Let's try another sample text.

```python
example = ["I love this product so much",
 "What an inferior item! I will purchase a new one",
 "I feel happy when using your product!"]
```

Let's see the prediction output.

```bash
array([1, 0, 1])
```

This shows that the first sentence in the array was a `positive` review, the second one was a `negative`, and the last one was a `positive` review. 

In this example, all these cases are true. This shows that our model can make accurate predictions.

### Conclusion
In this tutorial, we have learned about sentiment analysis with Spacy and Scikit-learn. We started by learning sentiment analysis and its importance to a business. 

We also discussed the different types of sentiment analysis. In this tutorial, we were focusing on the standard sentiment analysis.

We then moved to dataset cleaning and used the final dataset to build our sentiment analysis model. 

Next, we performed all the steps required to build the model and finally used a pipeline approach to automate all the processes involved in model building.

Finally, we used our model to make predictions. For example, our model was able to classify a review as either `positive` or `negative`. 

Using the above steps, a reader should be able to build a sentiment analysis model using Spacy and Scikit-learn.

To access the implementation for this tutorial in Google Colab, click [here](https://colab.research.google.com/drive/10TBCZrFNlGQSZmJwFCze_28QZhJb9eQh?usp=sharing)

### References
- [Code implementation for this tutorial](https://colab.research.google.com/drive/10TBCZrFNlGQSZmJwFCze_28QZhJb9eQh?usp=sharing)
- [Spacy documentation](https://spacy.io/)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [Support-vector machine algorithm](https://www.javatpoint.com/machine-learning-support-vector-machine-algorithm)
- [Sentiment Analysis: A Definitive Guide](https://monkeylearn.com/sentiment-analysis/)

---
 Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
