Sentiment analysis is a subset of natural language processing and text analysis that detects positive or negative sentiments in a text. Sentiment analysis helps businesses to understand how people gauge and their feelings towards their brand and products.

This is done using the reviews left on their sites and monitoring online conversations.

Sentiment analysis is used to analyze customer feedback, this helps businesses to know if customers are happy or frustrated with their products. Businesses use this information to make changes in their products and provide the best products that meet customer's needs.

In this tutorial, we shall use Spacy in building our sentiment analysis model, we shall use three datasets from IMDb, Amazon, and Yelp.
These datasets contain various reviews that are either labeled positive or negative. This dataset contains movies reviews in the IMDb dataset, products bought reviews from the Amazon dataset, and local business and social networking site reviews from the Yelp dataset.

These datasets will be able to build our model that can be able to classify a review as either positive or negative. This will help a business to know if customers are satisfied or disgruntled with their products or services. This helps the business to make the necessary adjustments to improve the products or services offered.

### Table of contents

- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Dataset used](#dataset-used)
- [Loading dataset](#loading-dataset)
- [Adding headers](#adding-headers)
- [Merge or concatenate our datasets with the keys](#merge-or-concatenate-our-datasets-with-the-keys)
- [Removing stopwords](#removing-stopwords)
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
2. A good working knowledge of [machine learning](/engineering-education/house-price-prediction/).
3. Have some working knowledge of [natural language processing.](https://en.wikipedia.org/wiki/Natural_language_processing)

> NOTE: To follow along easily, use [Google Colab](https://research.google.com/).

### Introduction

There are different types of sentiment analysis depending on the goals of the model.

- Models that focus on the polarity of a given text are positive, neutral, and negative.
- Model that focuses on feeling and emotions within a text.
- Models that focus on the intentions and urgency of a customer.

Depending on these goals, they are further classified into the following groups.

1. Standard Sentiment Analysis.
2. Fine-grained Sentiment Analysis.
3. Emotion Detection.
4. Aspect-based Sentiment Analysis.
5. Intent Detection.

#### Standard Sentiment Analysis

It detects the polarity of a given text either positive or negative.

For Example:

- "I love using your product": The polarity is `Positive.`
- "Your product has a lot of issues": The polarity is `Negative.`
- "I am open to further assistance about your product": The polarity is `Neutral.`

#### Fine-grained Sentiment Analysis

It also focuses on the polarity of given text but also adds more options or categories such as:

- Very positive
- Positive
- Neutral
- Negative
- Very Negative

For Example.

- "This is the best product ever": The polarity is `Very Positive.`
- "This product is disgusting": The polarity is `Very Negative.`

For a practical guide on fine-grained sentiment analysis click [here](https://towardsdatascience.com/fine-grained-sentiment-analysis-in-python-part-1-2697bb111ed4)

#### Emotion Detection

This type detects various emotions and feelings in a given text. The emotions can be happiness or anger.
For Example:

- "This product makes my work and life easier": This shows `Happiness.`
- "It has ruined the way operate and caused me pain": This shows `Anger.`

For a practical guide on emotion detection click [here](https://towardsdatascience.com/emotion-detection-a-machine-learning-project-f7431f652b1f)

#### Aspect-based Sentiment Analysis

Aspect-based sentiment analysis (ABSA) is a text analysis technique that categorizes data by aspect and identifies the sentiment attributed to each one.
Aspect-based sentiment analysis can be used to analyze customer feedback by associating specific sentiments with different aspects of a product or service.

Aspects are the attributes or components of a product or service. For example: “The user experience of a new product”, “the response time for a query or complaint” or “the ease of integration of new software”.

Aspect sentiment analysis is important because it can help companies automatically sort and analyze customer data, automate processes like customer support tasks, and gain powerful insights from customer reviews.

For a practical guide on aspect-based sentiment analysis click [here](https://www.analyticsvidhya.com/blog/2021/06/analyzing-customer-feedbacks-using-aspect-based-sentiment-analysis/)

#### Intent Detection

This focuses on the customer's goals and intention behind a given statement. This is applied in a chatbot to provide better answers and provide assistance.

For example.

- "This app keeps on crashing. What should I do?": This shows "Need for assistance"

For a practical guide on intent detection [click](https://rasa.com/blog/rasa-nlu-in-depth-part-1-intent-classification/)

In this tutorial, we will build a `standard sentiment analysis.`

### Dataset used

We are working with three datasets: IMDb dataset, amazon dataset, and Yelp dataset. The datasets contain reviews of different products or services, the reviews are labeled either `1` to show a `positive` review or `0` for `negative` review.

Our dataset is in form of text format which is to read and use by our model.

A snip of the three datasets in text format is shown below.

![Amazon dataset snip](/engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/amazon-snip.jpg)

To download the amazon dataset in a text format click [here](https://drive.google.com/file/d/1JYwslHzs_7bCxaS1XEDzMByn27-EAbez/view?usp=sharing)

![Imdb dataset snip](/engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/imdb-snip.jpg)

To download the IMDb dataset in a text format click [here](https://drive.google.com/file/d/11_TT9aP-HvY0AmipuQOZV3JpXPCwS6d_/view?usp=sharing)

![Yelp dataset snip](/engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/yelp-snip.jpg)

To download the yelp dataset in a text format click [here](https://drive.google.com/file/d/1eguxUNJWf9sMGqFqrJATLFWLIMxXuR0i/view?usp=sharing)

After downloading all three datasets, let's load them into our machine.

### Loading dataset

To load our dataset we use `Pandas` packages which are used for data manipulation, analysis, and reading of our dataset.

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

Our dataset has no headers, we separate our dataset into two columns and give them heading names. It will have two columns, the first column which is named `Message` will contain the actual review text while the other column is named `Target` will contain the label of either `1` or `0`.

```python
for colname in frames:
    colname.columns = ["Message","Target"]
```

Let's print the column names as shown below.

```python
for colname in frames:
    print(colname.columns)
```

The output is as shown below.

```bash
Index(['Message', 'Target'], dtype='object')
Index(['Message', 'Target'], dtype='object')
Index(['Message', 'Target'], dtype='object')
```

We need to assign keys to our dataset so that we can know which each dataset belongs to since we have merged the three datasets. The dataset belongs into three groups `Yelp`, `IMDB`, and `Amazon`.

```python
keys = ['Yelp','IMDB','Amazon']
```

### Merge or concatenate our datasets with the keys

In the above section, we have created three keys: `Yelp`, `IMDB`, and `Amazon`, we add the list of keys into our dataset. This enables the model to know where each dataset belongs to since we have merged the three datasets. This makes it easy for our model to understand the dataset during the training phase.

```python
df = pd.concat(frames,keys=keys)
```

To see the output of the merged keys and datasets, use this command.

```python
df.head()
```

![Output](/engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/output.jpg)

The output shows the keys added to our dataset so that we can know which dataset we are dealing with. The output also shows the two added columns `Message` and `Target` which are labeled either `0` or `1`.

Now that we have prepared our dataset, we can now start building our model.

### Removing stopwords

Stopwords are list words that are common in a language, they tend to give a lower classification power because they are not unique and make the model biased.

We romove stopwords using Spacy. Let's first install Spacy into our machine.

Since we are using Google Colab in this tutorial, we install Spacy using this command.

```python
!pip install -U spacy
```

After installing Spacy let's import this library.

```python
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
nlp = spacy.load('en')
```

In the above code, we have imported the following.

#### Spacy

This is the library we will use for sentiment analysis

#### STOP_WORDS

This is what is used to remove the stopwords in our dataset.

We also specify the language used as English using this `spacy.load('en')`.

Let's list all the stopwords in our dataset.

```python
stopwords = list(STOP_WORDS)
```

Let's remove the stopwords.

```python
for word in stopwords:
    if word.is_stop == False and not word.is_punct:
```

The code-snippet above removes the stopwords in our dataset, it also removes all punctuations using `word.is_punct` after looping through our dataset using the `for` loop.

### Loading machine learning packages

Let's import all the packages that we will use in building our model. We will be using `Scikit-learn` in building the model.

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

This is used to transform the texts in our dataset into numeric values which are in form of vectors, these numeric vectors are easily readable by the machine rather than text.

#### TfidfVectorizer

It’s used to measure the importance and relevance of a word relative to other documents found in a given database.

If a word is common in a given document and also common in other documents, it indicates that it has less power when it comes to making a prediction, but if a word is unique in a document, it shows it has more power when it comes to classification.

#### accuracy_score

This is used to calculate the accuracy of our model when making a prediction.

#### train_test_split

This is used to split our dataset into a training set and testing set.

#### TransformerMixin

This is used to fit the model into the dataset during the training phase. This ensures that our model learns the patterns from the dataset.

#### LinearSVC

This is the support vector machine algorithm that is used in building the model. It uses the LinearSVC method to fit our model to the data and produce the best fit model.

#### Pipeline

A pipeline is an important aspect in machine learning, it automates the above functions which are `CountVectorizer`, `TfidfVectorizer`, `TransformerMixin`, and `LinearSVC`. This makes the process of model building faster and easier, it bundles all the stages above together into one unit process.

Let's use these imported packages, we start with `TransformerMixin`. To implement the data transformer, we create a custom class.

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

Our above `transformers` class has the following functions.

#### data_transform

Checks the parameters in the dataset using `X_train` and `Y_train`.
It then converts them into a structure that the model can understand.

#### model_fit

It fits the model into the dataset. This enables the model to learn through understanding patterns.

#### set_params

This gets all the converted and optimized parameters that produce an optimized model.

#### text_cleaning

This function cleans our dataset and converts our text into lower case.

Let's go to the next stages.

### Vectorization and classifier

In vectorization, we use `CountVectorizer` that converts our text dataset into numeric vectors.
The classifier is the algorithm used in building the model, in this case, we are using `LinearSVC`.
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

Features are the independent variable in our dataset that act will be used as inputs when building our model. In our case, the `Message` column will be used as our feature.

Labels are what we want to predict. In our case we are trying to predict the sentiment of a given review, the output can be either `1` for `positive` or `0` for `negative`.

In our case, the `Target` column will be used as our label.

```python
X = df['Message']
ylabels = df['Target']
```

### Dataset splitting

We split our dataset into train set and test set. In this tutorial `75%` of our dataset will be used as the train set and `25%` will be the test set as shown below.

```python
X_train, X_test, y_train, y_test = train_test_split(X, ylabels, test_size=0.25, random_state=42)
```

Let's built our pipeline that automates all these processes.

### Creating the pipeline

Our pipeline will clean our dataset, vectorize our text into numeric values and finally be able to classify our reviews as either `positive` or `negative`.

```python
pipe = Pipeline([("cleaner", predictors()),
                 ('vectorizer', vectorizer),
                 ('classifier', classifier)])
```

Let's use our pipeline to fit our model into the training dataset as shown.

```python
pipe.fit(X_train,y_train)
```

After training the output is as shown.

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

The output is as shown.

```bash
Accuracy:  0.9849726775956285
```

This shows that our model has an accuracy of `98.497%` expressed as a percentage. This is a good accuracy score and shows that our model has a higher chance of making an accurate prediction.

### Making prediction

We now use our model to see if can be able to classify a review to be either `positive` or `negative`.

```python
pipe.predict(["I recommend this movie to watch, it's great"])
```

The output of the prediction is as shown.

```bash
array([1])
```

The output is `1` which is a positive review.

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

This shows that the first word in the array was a `positive` review, the second one was a `negative` and the last one was a `positive review. In this example all these cases are true, this shows that our model can make accurate predictions.

### Conclusion

In the tutorial, we have learned about sentiment analysis with Spacy and scikit-learn. We started by learning about sentiment analysis and its importance to a business, we also learned about the different types of sentiment analysis, in this tutorial we were focusing on the standard sentiment analysis.

We then moved to dataset cleaning, we then used this clean dataset to build our sentiment analysis model. We underwent all the stages required to build our model and finally used a pipeline approach that automates all the processes involved in model building and we successfully build our model.

Finally, we used our model to make predictions, our model was able to classify a review as either `positive` or `negative`. Using these steps, a reader should be able to build a sentiment analysis model using Spacy and Scikit-learn.

To get the implementation for this tutorial in Google Colab click [here](https://colab.research.google.com/drive/10TBCZrFNlGQSZmJwFCze_28QZhJb9eQh?usp=sharing)

### References

- [Code implementation for this tutorial](https://colab.research.google.com/drive/10TBCZrFNlGQSZmJwFCze_28QZhJb9eQh?usp=sharing)
- [Spacy documentation](https://spacy.io/)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [Support-vector machine algorithm](https://www.javatpoint.com/machine-learning-support-vector-machine-algorithm)
- [Sentiment Analysis: A Definitive Guide](https://monkeylearn.com/sentiment-analysis/)
