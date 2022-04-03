---
layout: engineering-education
status: publish
published: true
url: /natural-language-processing-using-gradient-boosting-machine-and-h2o-library/
title: Natural Language Processing using Gradient Boosting Machine and H2O Library
description: This tutorial aims to focus on the Gradient Boosting Machine algorithm to build multiple decision trees sequentially.
author: willyngashu
date: 2022-02-23T00:00:00-14:48
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/hero.png
    alt: Natural Language Processing Gradient Boosting Machine H2O library Hero image
---
[H2O](https://github.com/h2oai/h2o-3) is an open-source, in-memory platform for machine learning. H2O provides implementations of many popular algorithms. It supports both supervised and unsupervised machine learning algorithms.
<!--more-->
H20 supports the following algorithms: [Naive Bayes algorithms](https://en.wikipedia.org/wiki/Naive_Bayes_classifier), [Random Forests](https://en.wikipedia.org/wiki/Random_forest), [Gradient Boosting Machine](https://en.wikipedia.org/wiki/Gradient_boosting), [Generalized Linear Models](https://en.wikipedia.org/wiki/Generalized_linear_model), [K-Means algorithms](https://en.wikipedia.org/wiki/K-means_clustering), [Principal component analysis](https://en.wikipedia.org/wiki/Principal_component_analysis) and [Deep Neural Networks](https://en.wikipedia.org/wiki/Deep_learning). 

To get the complete list of all the algorithms that H2O supports, click [here](https://docs.h2o.ai/h2o/latest-stable/h2o-docs/data-science.html).

H2O is fast and scalable, making it the best platform for building machine learning models. It also automates machine learning using the [H2O AutoML](https://github.com/h2oai/h2o-3) pipeline.

In this tutorial, we will focus on the Gradient Boosting Machine. This algorithm builds both classification and regression models. In Gradient Boosting Machine, we train multiple decision trees sequentially. They are then combined to create a final model.

We will use the Gradient Boosting Machine to train a natural language processing model. The model will perform sentiment analysis. It will classify a customer review as either positive or negative.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction to Gradient Boosting Machine](#introduction-to-gradient-boosting-machine)
- [Getting started with H2O](#getting-started-with-h2o)
- [Initializing H2O](#initializing-h2o)
- [Dataset for sentiment analysis](#dataset-for-sentiment-analysis)
- [Converting the dataset into an array](#converting-the-dataset-into-an-array)
- [Selecting the columns](#selecting-the-columns)
- [Creating the data frame](#creating-the-data-frame)
- [Adding the output column](#adding-the-output-column)
- [Text preprocessing](#text-preprocessing)
- [Installing the Natural Language Toolkit](#installing-the-natural-language-toolkit)
- [Downloading stopwords](#downloading-stopwords)
- [Creating the function](#creating-the-function)
- [Applying the function](#applying-the-function)
- [Vectorization](#vectorization)
- [Training the vectorization model](#training-the-vectorization-model)
- [Saving the vectorization model](#saving-the-vectorization-model)
- [Applying the model](#applying-the-model)
- [Adding the vectorized columns to the data frame](#adding-the-vectorized-columns-to-the-data-frame)
- [Splitting the data frame](#splitting-the-data-frame)
- [Model training using the Gradient Boosting Machine](#model-training-using-the-gradient-boosting-machine)
- [Feeding the model with the dataset](#feeding-the-model-with-the-dataset)
- [Accuracy score](#accuracy-score)
- [Making predictions](#making-predictions)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this tutorial, you need to be familiar with:
- [Natural language processing](https://www.ibm.com/cloud/learn/natural-language-processing).
- [Steps in text preprocessing](https://towardsdatascience.com/nlp-text-preprocessing-a-practical-guide-and-template-d80874676e79).
- [Popular machine learning algorithms](https://www.analyticsvidhya.com/blog/2017/09/common-machine-learning-algorithms/).
- [Ensemble learning techniques](/engineering-education/ensemble-learning/) in machine learning.

> NOTE: You must use [Google Colab notebook](https://research.google.com/) to build the model. Google Colab notebook has fast CPUs and GPUs. 

### Introduction to Gradient Boosting Machine
As mentioned earlier, Gradient Boosting Machine trains multiple decision trees sequentially. The decision trees are then combined to create a final model. The initial decision tree model is the base model or a weak learner.

Boosting uses a collection of algorithms to convert weak learners into strong learners. It minimizes/reduces the training errors. A random sample of data is selected, fitted with a model, and then trained sequentially.

Weak learners may not perform well individually due to [high variance or high bias](https://www.javatpoint.com/bias-and-variance-in-machine-learning). However, when we aggregate the weak learners, they form a strong learner. Their combination reduces bias or variance, yielding better model performance. For further reading on Gradient Boosting Machine, read this [article](/engineering-education/boosting-algorithms-python/).

Let's get started with H2O.

### Getting started with H2O
To use H2O, we will install the dependencies. H2O depends on the [64-bit JDK](https://www.oracle.com/java/technologies/downloads/) to run. It uses the Java programming language. To install the 64-bit JDK, run this command:

```bash
!apt-get install default-jre
!java -version
```

After installing the dependencies, install H2O using the following command:

```bash
!pip install h2o
```

This command will install the latest H2O version. To import H2O, use this code:

```python
import h2o
```

#### Initializing H2O
We initialize H2O using the following code:

```python
h2o.init()
```

Initializing H2O will enable us to connect to the H2O clusters. Thus, we will use its memory for machine learning. When we run the code above, it produces the following output:

![Initializing H2O](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/h2o-cluster.jpg)

From the image above, we have successfully connected to the H2O cluster. It also shows the cluster version and the total free cluster memory. The next step is to load the dataset.

### Dataset for sentiment analysis
We will use the Amazon dataset. It has customers' reviews of personal care appliances. 

We download the dataset from the `tensorflow_datasets`. `tensorflow_datasets` is a TensorFlow repository that contains ready-to-use datasets. To import `tensorflow_datasets`, use this code:

```python
import tensorflow_datasets as tfds
```

To download the dataset from `tensorflow_datasets`, use the following code:

```python
dowloaded_dataset, dataset_info = tfds.load('amazon_us_reviews/Personal_Care_Appliances_v1_00', with_info=True, batch_size=-1)
```

From the code above, we use the `tfds.load` method to load the dataset from the `tensorflow_datasets` repository. We will then save the dataset into the `train` variable using the following code:

```python
train_dataset = dowloaded_dataset['train']
```

To see the dataset information, run this command:

```python
dataset_info
```

It produces the following output:

![Sentiment analysis dataset](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/dataset-information.jpg)

From the image above, the dataset has over 130 million customer reviews. We will use the following columns as inputs:`review_body`, `review_headline`, `star_rating`, and `helpful_votes`.

- `review_body`: It shows a detailed description of the product review.

- `review_headline`: It shows the title of the review.

- `star_rating`: It shows the 1-5 star rating of the product purchased.

- `helpful_votes`: It shows the number of votes given to an Amazon product.

After loading the dataset, we need to convert the Amazon dataset into a NumPy array using NumPy. A NumPy array is easy to manipulate and use.

#### Converting the dataset into an array
To import the NumPy package, use the following code:

```python
import numpy as np
```

We use Numpy to convert the dataset into an array using the following code:

```python
dowloaded_dataset=tfds.as_numpy(train_dataset)
```

To see the dataset array, run this code:

```python
dowloaded_dataset
```

It produces the following output:

![Converted dataset array](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/dataset-array.jpg)

From the image above, the Amazon dataset is in a NumPy array. Next, we need to select the columns that we will use to build the sentiment analysis model.

### Selecting the columns
To select these columns, use this code:

```python
review_body=dowloaded_dataset['data']['review_body']
review_headline=dowloaded_dataset['data']['review_headline']
helpful_votes=dowloaded_dataset['data']['helpful_votes']
rating=dowloaded_dataset['data']['star_rating']
```

The code above selects four columns from our dataset. The four columns are the inputs for the model during the training phase. We will then create a DataFrame using the H2O DataFrame function. A DataFrame is a data structure that organizes data into a 2-dimensional table of rows and columns.

### Creating the Data Frame
We will create the DataFrame using the H2O DataFrame function.

```python
h2o_df=h2o.H2OFrame(np.hstack((helpful_votes[:,None],review_headline[:,None],review_body[:,None],rating[:,None])),column_names=['votes','headline','reviews','rating'],column_types=['numeric','string','string','numeric'])
```

The code above will create a DataFrame using the `h2o.H2OFrame` function. The function is also assigned human-readable column names. The assigned column names are as follows: `votes`, `headline`, `reviews`, and `rating`. 

To see the created DataFrame, run this code:

```python
h2o_df
```

The code produces the following output:

![Created DataFrame](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/converted-dataframe.jpg)

### Adding the output column
We need to add an output column to our DataFrame. The output column contains the output of the model after making a prediction. The model will classify the customer's reviews as either positive or negative. We represent positive reviews using `1`, while negative reviews using `0`. 

For a customer review to be positive, the `star_rating` should be greater than `4`. If the `star_rating` is less than `4`, the review is negative. To add the output column, we will use this logic.

We use the following code to represent this logic:

```python
h2o_df["output"] = h2o_df["rating"].apply(lambda x: 1 if x>= 4 else 0) 
```

When we execute the code, it will add the output column. To see the new data frame with the added output column, use this code:

```python
h2o_df
```

It produces the following output:

![Output column](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/output-column.jpg)

The next step is to perform text preprocessing.

### Text preprocessing
Text processing is an essential step in natural language processing. In-text preprocessing, we clean and remove noise from the dataset. Text processing makes our dataset ready for use by the model. 

Some of the text preprocessing steps we will perform in this tutorial are as follows:
- Removing stop words: Stop words are the most common words in any language. Stop words are articles, prepositions, pronouns, and conjunctions. They do not add much information to the text.

- Converting text to lower case: Converting text to lower case ensures we have a uniform dataset.

- Tokenization: Tokenization is splitting the text into smaller word units called tokens.

For a detailed understanding of all the steps in text preprocessing, read this [article](https://towardsdatascience.com/nlp-text-preprocessing-a-practical-guide-and-template-d80874676e79).

In this tutorial, we will only perform three steps. We will use the Natural Language Toolkit (NLTK).

### Installing the Natural Language Toolkit
We install the Natural Language Toolkit (NLTK) using this command:

```bash
!pip install nltk
```

To import the `nltk` use this code: 

```python
import nltk
```

Let's now use `nltk` for text preprocessing.

### Downloading stopwords
Stopwords are the most commonly used words in a given language. Stopwords carry very little information and have little impact on the model. Removing stop words will allow the model to focus on the unique words in the dataset.

We will use `nltk` to download the stop words of the English language.

```python
from nltk.corpus import stopwords
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))
```

We will then filter out the stop words from the dataset. We will create a single function that removes the stopwords, perform tokenization, and convert text to lower case.

### Creating the function
We create the function using the following code snippet:

```python
def tokenize(line):
  tokenized = line.tokenize("\\W+")
  tokenized = tokenized.tolower()
  tokenized = tokenized[(tokenized.nchar() >= 2) | (tokenized.isna()),:]
  tokenized_filter = tokenized[(tokenized.isna()) | (~ tokenized.isin(stop_words)),:]
 return tokenized_filter
```

The function name is `tokenize`. In this function, the `line.tokenize` method performs tokenization. The `tokenized.tolower` method converts the text to lower case. `(~ tokenized.isin(stop_words))` will tokenize words not found in the stop words list. It will filter out the stop words from the dataset. Then the function returns a clean text that has undergone all three steps. Let's apply this function to our `reviews` and `headline` columns.

### Applying the function
The `reviews` and `headline` columns contain text. To apply the function into these two columns, use this code:

```python
words_reviews = tokenize(h2o_df["reviews"])
words_headline = tokenize(h2o_df["headline"])
```

To see the `reviews` column after applying the function, use this code:

```python
words_reviews.head()
```

It produces the following output:

![Reviews column](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/reviews-column.jpg)

To see the `headline` column after applying the function, use this code:

```python
words_headline.head()
```

It produces the following output:

![Headline column](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/headline-column.jpg)

The steps above show how to remove stop words, convert text into lower case, and perform tokenization. The next step is to vectorize the tokenized text.

### Vectorization
Vectorization converts the tokenized text to a list of numbers. The list of numbers is known as word vectors which the model uses as input. Machines do not understand the text. That's why we need to convert the text into numeric form (list of numbers). In H2O, we use the `H2OWord2vecEstimator` algorithm to convert the tokenized text to word vectors.

For further reading on how the `H2OWord2vecEstimator` algorithm converts the tokenized text to word vectors, read this [documentation](https://docs.h2o.ai/h2o/latest-stable/h2o-docs/data-science/word2vec.html)

We import the `H2OWord2vecEstimator` using the following code:

```python
from h2o.estimators.word2vec import H2OWord2vecEstimator
```

The `H2OWord2vecEstimator` algorithm trains a model that will perform vectorization. To use the trained model, we apply it to the `words_reviews` and the `words_headline` columns. The vectorization model produces the corresponding word vectors.

Let's now train the vectorization model.

### Training the vectorization model
We will train the vectorization model using the `words_reviews` and the `words_headline` columns. We use the following code:

```python
vec_model = H2OWord2vecEstimator(vec_size = 100, model_id = "w2v_amazon.model")
vec_model.train(training_frame=words_reviews)
vec_model.train(training_frame=words_headline)
```

From the code above, we use the following methods and parameters:

- `vec_size = 100`: It represents the number of columns that the word vectors will have.

-`model_id = "w2v_amazon.model"`: It is the name of our vectorization model.

- `vec_model.train`: It is the function that trains the vectorization model. 

We then pass the `training_frame` as a parameter. It specifies the columns that train the vectorization model. We use both the `words_reviews` and the `words_headline` columns to train the model.

The code above will build our vectorization model.

#### Saving the vectorization model
To save the model, use this code:

```python
h2o.save_model(vec_model,path='./')
```

After saving the model, we can now use it to transform/convert the tokenized text to word vectors.

### Applying the model
We will apply the trained model to both the `words_reviews` and the `words_headline` columns. These two columns contain the tokenized text.

#### `words_reviews` column
```python
review_vecs = vec_model.transform(words_reviews, aggregate_method = "AVERAGE")
```
The `vec_model.transform` function converts/transforms the tokenized text to word vectors. The function has the following parameter:

- `words_reviews`: It is the input column.

- `aggregate_method = "AVERAGE"`: It specifies how the function will aggregate the tokenized words. `"AVERAGE"` will ensure words don't lose meaning after the conversion.

To see the size of converted word vectors, use this code:

```python
review_vecs.shape
```
It produces the following output:

```bash
(85981, 100)
```
From the output above, we have `85981` word vectors. To see the output of converted word vectors, use this code:

```python
review_vecs.head()
```

It produces the following output:

![Converted word vectors](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/converted-word-vectors.jpg)

From the image above, we have converted the `words_reviews` column.  

We also vectorize the `words_headline` column using the same process.

#### `words_headline` column
We will use the following code:

```python
headline_vecs = vec_model.transform(words_headline, aggregate_method = "AVERAGE")
headline_vecs.names = ["headline_" + s for s in headline_vecs.names]
```
We use the same `vec_model.transform` function to vectorize the `words_headline` column. We also use the same `aggregate_method = "AVERAGE"` parameter to perform the vectorization.

To see the vectorized text, use this code:

```python
headline_vecs.head()
```
It produces the following output:

![Converted word vectors](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/word-vectors.jpg)

From the image above, we have converted the `words_headline` column.

We will use the `review_vecs` and the `headline_vecs` as inputs for our model. We need to add/attach them to the original DataFrame.

### Adding the vectorized columns to the data frame
We will add/attach the vectorized columns to the original `h2o_df` DataFrame using the `cbind` function.

```python
h2o_df_ext=h2o_df.cbind(review_vecs)
h2o_df_ext = h2o_df_ext.cbind(headline_vecs)
```
The `cbind` function will add the `review_vecs` dataframe to the `h2o_df`. The same function also adds the `headline_vecs` DataFrame to the created `h2o_df_ext`.

After merging all the DataFrames, we split the final `h2o_df_ext` DataFrame into two sets. The first set is for model training and the second set is for model validation.

### Splitting the Data Frame
We split the dataset into two sets. One for training and the other for validation using this code:

```python
h2o_train,h2o_valid = h2o_df_ext.split_frame(ratios=[.8])
```
The model will learn from the training set to understand sentiment analysis. The validation set will fine-tune the model's hyper-parameters in training.

We use the splitting ratio of `.8`. 80% of the data frame will be the training set, 20% will be the validation set.

Let's use the Gradient Boosting Machine to train the model.

### Model training using the Gradient Boosting Machine
We will import the `H2OGradientBoostingEstimator` algorithm from the H2O library. It is the algorithm that trains the model.

```python
from h2o.estimators import H2OGradientBoostingEstimator
```
Let's initialize the `H2OGradientBoostingEstimator`. We will also set the hyper-parameters that will produce the best results.

```python
Gradient_Boosting_Machine= H2OGradientBoostingEstimator(ntrees=100,
 max_depth = 6,  learn_rate=0.1
                                             )
```
The initialized `H2OGradientBoostingEstimator` algorithm has the following parameters:

- `ntrees`: It specifies the number of decision trees used to build the model. We have set the number of trees to be `100`. The `H2OGradientBoostingEstimator` algorithm will create 100 decision trees sequentially. It then combines them to create a final model with the best results.

- `max_depth`: It is the maximum depth of the decision trees used. We have set the value to `6`. Increasing the `max_depth` value may lead to model overfitting.

- `learn_rate`: It specifies the learning rate of the model during training.

After initializing the model, we feed the model with the prepared dataset.

### Feeding the model with the dataset
To feed the model with the dataset, use this code:

```python
Gradient_Boosting_Machine.train(x=headline_vecs.names+review_vecs.names, y='output', training_frame = h2o_train, validation_frame=h2o_valid)
```
From the code above, the `train` function trains the model. It has the following parameters.

- `x` variable: It is the variable that contains all the input columns. The `headline_vecs` and the `review_vecs` are the input columns. 

- `y` variable: It is the variable that contains the output column. 

- `training_frame`: It specifies the DataFrame used for training. We use the `h2o_train` DataFrame for training.

- `validation_frame`: It specifies the DataFrame we will use for validation. We use the `h2o_valid` data frame for validation.

The algorithm will train the model and give the best accuracy score.

### Accuracy score
To get the accuracy score, use this code:

```python
print(" Hyperparameter AUC: " + str(round(Gradient_Boosting_Machine.auc(valid = True), 3)))
```
The code above will print the accuracy score.

```bash
Hyperparameter AUC: 0.934
```
The accuracy score is `0.934`, which is 93.4%. It is a high accuracy score and shows the model was well trained. We can now use this model to make predictions.

### Making predictions
We use the model to classify a customer review as either negative or positive.

```python
predictions = ["The shippers and loaders were great....willing to consider speedier shipping options, the good news is that at the end the shipping arrived quickly enough"]
```
Let's vectorize this text input.

```python
predictions = vec_model.transform(predictions)
```
After vectorization, we use the vectorized text to make a prediction.

```python
prediction_result = Gradient_Boosting_Machine.predict(predictions)
print(prediction_result)
```
It produces the following prediction:

```bash
array([1])
```
The prediction result is `1`, and is a positive review. From the prediction above, our model can make accurate predictions.

### Conclusion
In this tutorial, we built a sentiment analysis model. We created the model using Gradient Boosting Machine and the H2O library. The tutorial also covers text preprocessing. We cleaned and removed noise from the dataset. Finally, we trained the model using the `H2OGradientBoostingEstimator` algorithm. The final model was able to make accurate predictions.

To access the Google Colab notebook for this tutorial, click [here](https://colab.research.google.com/drive/1MS3ziVfG2UIgCbvJ8nRyciJcfDyZVDq1?usp=sharing).

### References
- [Gradient Boosting](https://en.wikipedia.org/wiki/Gradient_boosting)
- [Ensemble Learning Techniques](/engineering-education/ensemble-learning/)
- [Boosting Algorithms in Python](/engineering-education/boosting-algorithms-python/)
- [Algorithms supported by H2O](https://docs.h2o.ai/h2o/latest-stable/h2o-docs/data-science.html)
- [Steps in text preprocessing](https://towardsdatascience.com/nlp-text-preprocessing-a-practical-guide-and-template-d80874676e79).
- [Word2vec algorithm](https://docs.h2o.ai/h2o/latest-stable/h2o-docs/data-science/word2vec.html)
- [H2O GitHub](https://github.com/h2oai)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
