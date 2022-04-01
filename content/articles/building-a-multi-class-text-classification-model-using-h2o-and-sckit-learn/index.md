---
layout: engineering-education
status: publish
published: true
url: /building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/
title: Multi-class Text Classification using H20 and Scikit-learn.
description: In this article, we will understand how to automatically classify GitHub labels based on GitHub issue title using machine learning.
author: charles-kariuki
date: 2022-03-31T00:00:00-16:59
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/hero.jpg
   alt: Multi-class Text Classification example image
---

Text classification is an essential task in natural language processing that categorizes various texts into classes. Text classification is done using a model trained using a text dataset. Then, the model learns from the test dataset and makes predictions. 
<!--more-->
Text classification models perform tasks such as [intent detection](https://sentione.com/blog/new-state-of-the-art-intent-detection-model-from-sentione), [topic labeling](https://medium.com/@gab.choojj/airline-topic-labeling-and-classification-using-latent-dirichlet-allocation-lda-d88d91b2c6ef), [sentiment analysis](/engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/) and [spam detection](/engineering-education/spam-detection-model-using-scikit-learn).

Multi-class text classification is a text classification task with more than two classes/categories. Each data sample can be classified into one of the classes. However, a data sample cannot belong to more than one class simultaneously.

For example, a model that classifies news headlines into news categories. The categories can be business, sports, tech, entertainment, and politics. 

This tutorial will build a customer-complaints text classifier with five classes.

We will use [Scikit-learn](https://scikit-learn.org/stable/) for text preprocessing and vectorization, and [H2O](https://github.com/h2oai/h2o-3) to automate the model building process using [H2O AutoML](https://github.com/h2oai/h2o-3) algorithm.

### Table of contents
- [Prerequisites](#prerequisites)
- [H2O library](#h2o-library)
- [Benefits of H2O](#benefits-of-h2o)
- [H2O dependencies](#h2o-dependencies)
- [Initializing H2O](#initializing-h2o)
- [Customer complaints dataset](#customer-complaints-dataset)
- [Creating a dictionary object](#creating-a-dictionary-object)
- [Dataset splitting](#dataset-splitting)
- [Text Preprocessing for natural language processing](#text-preprocessing-for-natural-language-processing)
- [Text vectorization](#text-vectorization)
- [Converting the train and test sets into an array](#converting-the-train-and-test-sets-into-an-array)
- [Creating H2O Data Frame](#creating-h2o-data-frame)
- [Adding the target column](#adding-the-target-column)
- [Using H2O AutoML to run multiple models](#using-h2o-automl-to-run-multiple-models)
- [Calling the train function](#calling-the-train-function)
- [Performance of the models](#performance-of-the-models)
- [Using the best model](#using-the-best-model)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this article, the reader should: 
- Know how to implement [Scikit-learn algorithms.](https://scikit-learn.org/stable/)
- Understand [text pre-processing-techniques](https://www.analyticsvidhya.com/blog/2021/09/essential-text-pre-processing-techniques-for-nlp/)
- Know how to build a [natural language processing model](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/)

You must use [Google Colab](89N3PDyZzakoH7W6n8ZrjGDDktjh8iWFG6eKRvi3kvpQ) notebook to build the model. Google Colab notebook has fast CPUs and GPUs. Ensure you connect to GPU in Google Colab to speed up building the model.

### Connecting to GPU in Google Colab
To use Google Colab’s GPU, follow the steps below:

1. Click the `Runtime` option.

![Runtime option](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/runtime.png)

2. Click `Change runtime type`.

![Change runtime type](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/change-runtime-type.png)

3. Then select the `GPU` option and save

![GPU option](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/gpu-option.png)

### H2O library
H2O is an open-source machine learning library that provides supervised and unsupervised machine learning algorithms. It is robust and easily scalable.

[H2O](https://github.com/h2oai/h2o-3) automates the model building process using [H2O AutoML](https://github.com/h2oai/h2o-3). It selects the best algorithm and performs the model evaluation.

#### Benefits of H2O
- Saves developers' time. H2O AutoML algorithm automates most machine learning tasks, saving the developers time and increasing productivity.

- H20 builds simple and interactive interfaces during the automation process. 

- Simplifies the machine learning process by automating complex machine learning tasks. 

- Corrects most human errors due to automation of tasks. H2O is also a debugging tool that detects and removes underlying model errors. As a result, the final model will make accurate predictions.

- Automatic training and tuning of multiple models. H2O runs multiple models during training. It then selects the best model and performs the model evaluation. Finally, it produces an optimized model that will make accurate predictions.

- It produces an easily deployable model for production.

### H2O dependencies
H2O requires [64-bit JDK](https://www.oracle.com/java/technologies/downloads/) and runs on Java, so we have to install Java to proceed.

```bash
!apt-get install default-jre
!java -version
```
After installing the dependencies, we can install H2O.

#### Installing H2O
Use the command below to install H2O:

```python
!pip install h2o
```
To import H2O, use this code:

```python
import h2o
from h2o.automl import H2OAutoML
```

We use `H2OAutoML` to run multiple machine learning algorithms during training and select the best algorithm.

### Initializing H2O
Use this code snippet to initialize H2O:

```python
h2o.init()
```

The snippet above runs H2O clusters. We need to use its memory for text classification.

The image below shows the H2O clusters.

![H2O clusters](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/h2o-clusters.png)

### Customer complaints dataset
The customer complaints dataset trains the classification model. When we have a new customer complaint, the model will classify it into one of the classes. 

You can download the customer complaints dataset [here.](https://drive.google.com/file/d/1wtocenD095o98GKJDXMi8CeVVHYd6qx2/view?usp=sharing)

We will use `Pandas` to read the dataset. 

```python
import pandas as pd
```

To read the dataset, use this code snippet below:

```python
df=pd.read_csv('/content/consumer_compliants.csv')
```

To see the loaded dataset, use this command:

```python
df
```

The dataset output:

![Dataset output](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/dataset-output.png)

From the image above, the dataset has 18 columns. We are interested in the `Product`, `Company` and `Consumer complaint narrative` columns.

The `company` columns show the customer complaint company. 
The `Consumer complaint narrative` column contains the actual customer complaints. 
The `Product` columns contain the complaints classes.

To see the complaints classes, run this code snippet:

```python
df['Product'].value_counts()
```
The complaints classes output:

![Complaints classes](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/pre-defined-complaints-classes.png)

From the image above, we have five complaints classes. The model will classify a customer complaint into one of the complaints classes.

#### Company column
To check the number of complaints received in each company, run the code snippet below: 

```python
df['Company'].value_counts()
```

![Company output](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/company-output.png)


#### Renaming `Consumer complaint narrative` column
We will rename the column to `complaints`. The new name is shorter and more machine-readable. The model can easily understand the new name and use the column during training. To rename the column, use this code:

```python
complaints_df=df[['Consumer complaint narrative','Product','Company']].rename(columns={'Consumer complaint narrative':'complaints'})
```

The check the dataset with the renamed column, use this code:

```python
complaints_df
```
The dataset output:

![Renamed column](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/renamed-column.png)

### Creating a dictionary object
The dictionary object will encode the complaints classes as integer/numeric values. The integer values will be between 1 to 5.
They will represent the complaints classes. So we need to save them in the `target` variable.

```python
target={'Debt collection':0, 'Credit card or prepaid card':1, 'Mortgage':2, 'Checking or savings account':3, 'Student loan':4, 'Vehicle loan or lease':5}
```

Let us add the `target` variable to our dataset.

```python
complaints_df['target']=complaints_df['Product'].map(target)
```

Use the code snippet below to check the new dataset with the added target variable:

```python
complaints_df
```
The new dataset output:

![New dataset](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/new-dataset.png)

### Dataset splitting
We will split the customer complaints dataset into two sets. One set for model training and the other for model testing. 

```python
from sklearn.model_selection import train_test_split
```

To split the dataset, use this code:

```python
X_train, X_test = train_test_split(complaints_df, test_size=0.2, random_state=111)
```

### Text Preprocessing for natural language processing
There are many text preprocessing steps. In this tutorial, we will focus on the following:

- Stemming. Stemming reduces a word into its stem word or root. It removes the word affixes so that only the root remains. For example, the words “connecting”, “connect”, “connection”, and “connects” are all reduced to the root form “connect”.

- Removing stop words. Stop words are the most common words in any language. However, they do not add much information to the text. Examples of stop words are conjunctions, pronouns, and articles. Removing stop words will enable the model to focus on words that add value in training. 

- Lower Casing. It converts the text dataset to lower case. 

- Tokenization. Breaking up the sentences into smaller word units called tokens. This process enables the model to understand the sentences by analyzing the word tokens.

- Removing unnecessary characters. The text dataset may have unnecessary characters that do not add value to the model. We remove these characters to ensure the model focus on important information.

Natural Language Toolkit (NLTK) will perform these steps. 

```bash
!pip install nltk
```

Import `not` using this code snippet:

```python
import nltk
```

We can also install the library from NLTK that will perform tokenization.

```python
nltk.download('punkt')
```

- `punkt` is a pre-trained sentence tokenizer.

#### Stemming
Let us import the SnowballStemmer algorithm we need to use for stemming.

```python
from nltk.stem.snowball import SnowballStemmer
```

To initialize the stemming algorithm, use this code:

```python
stemmer = nltk.stem.SnowballStemmer('english')
```

#### Downloading stop words
We download the English stop words using this code:

```python
nltk.download('stopwords')
stop_words = set(nltk.corpus.stopwords.words('english'))
```

Let us create a function to perform all text preprocessing steps using Python regular expression RegEx module.

```python
import re

def preprocessing(text):
   tokens = [word for word in nltk.word_tokenize(text) if (len(word) > 3 and len(word.strip('Xx/')) > 2 and len(re.sub('\d+', '', word.strip('Xx/'))) > 3) ] 
   tokens = map(str.lower, tokens)
   stems = [stemmer.stem(item) for item in tokens if (item not in stop_words)]
   return stems
```
The function is named `preprocessing` has the following text preprocessing methods:

- The `nltk.word_tokenize` method will tokenize the text. `
- `word.strip` will remove the unnecessary characters. 
- `str.lower` will transform the text to lower case, and 
- `stemmer.stem` will perform stemming. The function returns the stemmed words.

### Text vectorization
Text vectorization converts the stemmed words to numerical values called word vectors. We feed vectors to the model during training.

We will use the `TfidfVectorizer` method for text vectorization.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
```

Let's initialize `TfidfVectorizer` function.

```python
vectorizer_tf = TfidfVectorizer(tokenizer=preprocessing, stop_words=None, max_df=0.75, max_features=1000, lowercase=False, ngram_range=(1,2))
```
The function has the following parameters:

- `tokenizer=preprocessing`. It is the function that performs all text preprocessing steps.

- `stop_words=None` .It ensures that the function does not vectorize the words in the stop words list.

- `max_df=0.75`. The function will vectorize 75% of the stemmed words. However, we have a large text dataset that may slow down the vectorization process using the whole dataset.

- `max_features=1000`. We only select 1000 words because we have a large dataset, which may slow down the vectorization process.

- `lowercase=False`. Ensures the function only vectorizes the words that are in lowercase.

- `ngram_range=(1,2)`. `ngram_range` is a contiguous sequence of words, symbols, or tokens in the stemmed text. Our stemmed text will have either 1 or 2 words.

We now apply the method to both the training and testing dataset.

#### Applying `TfidfVectorizer`

```python
train_vectors = vectorizer_tf.fit_transform(X_train.complaints) 
test_vectors = vectorizer_tf.transform(X_test.complaints)
```

### Converting the train and test sets into an array
We convert the train and test sets into an array using the `toarray` method.

To convert the train set, use this code:

```python
train_df=pd.DataFrame(train_vectors.toarray(), columns=vectorizer_tf.get_feature_names())
test_df=pd.DataFrame(test_vectors.toarray(), columns=vectorizer_tf.get_feature_names())
```

The code above converts the train-set and test-set into an array using the `toarray()` method. It also adds the 1000 features that we have selected from the original text data using the `get_feature_names` method.

We also need to add the `target` column to these new data frames (`train_df` and `test_df`)

### Adding the target column
To add the target column, use this code:

```python
train_df=pd.concat([train_df,X_train['target'].reset_index(drop=True)], axis=1)
test_df=pd.concat([test_df,X_test['target'].reset_index(drop=True)], axis=1)
```

The `concat` function will concatenate or merge the data frames with the target column. The final data frames will have the 1000 features that we selected and the target column.

### Creating H2O Data Frame
We will convert our Pandas Data Frame to H2O Data Frame. The H2O will use the created Data Frame during algorithm selection and training.

```python
h2o_train_df = h2o.H2OFrame(train_df)
h2o_test_df = h2o.H2OFrame(test_df)
```

The next step is to add the `target` column to the created H2O Data Frame.

### Adding the target column
The target column contains the model output after making a prediction. 

```python
h2o_train_df['target'] = h2o_train_df['target'].asfactor()
h2o_test_df['target'] = h2o_test_df['target'].asfactor()
```
We are now ready to use H2O AutoML to run multiple models and select the best.

### Using H2O AutoML to run multiple models
Let us initialize the H2O AutoML algorithm and its parameters.

```python
aml = H2OAutoML(max_models = 5, seed = 10, exclude_algos = ["StackedEnsemble"], verbosity="info", nfolds=0, balance_classes=True, max_after_balance_size=0.3)
```

From the code above, we have initialized the `H2OAutoML` algorithm with the following parameters:

- `max_models`
It specifies the maximum number of models that `H2OAutoML` will run. For example, it will run five models.

- `seed`
We use it to ensure model reproducibility.

- `exclude_algos`
It specifies that the algorithms `H2OAutoML` should not use during model training. `H2OAutoML` will skip the `StackedEnsemble` algorithms.

- `balance_classes`
It will handle the imbalanced dataset. We set it to `true` to balance the five classes.

- `nfolds=0,`
It specifies the number of k-fold cross-validation of the H2OAutoML model. We have set the number to zero.

- `max_after_balance_size=0.3`
It specifies the maximum relative size of the training data after balancing the classes.

### Specifying the y and x variables
The `x` variable contains all the input features during training. The `y` variable contains the output/target column.

```python
x=vectorizer_tf.get_feature_names()
y='target'
```

### Calling the train function
The train function will train and evaluate the model using the training set.

```python
aml.train(x = x, y = y, training_frame = h2o_train_df, validation_frame=h2o_test_df)
```

- `x` specifies the x variable/input features.
- `y` It specifies the `y` variable/target column.
- `training_frame` contains the training dataset.
- `validation_frame` contains the testing dataset.

H2OAutoML will run five models and produce the following outputs that show the AutoML progress:

![Model training](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/model-training.png)

Output showing the best model details:

![Model training](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/final-model.png)

From the five models the best model is XGBoost with a model id of `XGBoost_2_AutoML_3_20220322_140825`. 

We can also check the performance of all five models using this code:

### Performance of the models

```python
aml.leaderboard
```

`leaderboard` will show the performance of the five models. It lists the models from the best performing to the least performing. The image shows the listed models:

![Listed models](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/listed-models.png)

From the image above, the best model has a `model_id` of `XGBoost_2_AutoML_3_20220322_140825`. The least performing model has a `model_id` of `DRF_1_AutoML_3_20220322_140825`. Let's use the best model to make predictions.

### Using the best model
We will use the best model from the `leaderboard` to predict the test data frame(h2o_test_df). The model will classify some vectorized text in the test data frame.

```python
pred=aml.leader.predict(h2o_test_df)
```

Let us apply our `vectorizer_tf` method to this text.

The `aml.leader` method selects the best model from the list above. Finally, the `predict` will classify some vectorized text in the test data frame.

To print the prediction results, use this code:

```python
print(prediction)
```

The prediction output:

![Prediction output](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/prediction-output.png)

The best model has classified some vectorized text in the test data frame into five classes (0, 1,2, 3, 4, and 5). The `predict` columns show the class in which the vectorized text has been classified.

### Conclusion
We have learned how to build a multi-class text classification model. We developed the model using Scikit-learn and the H2O library. The tutorial also explained the benefits of H2O and how to install it.

We performed text preprocessing using Natural Language Toolkit. Then, using the clean dataset, we trained a model that classifies customer complaints. H2O runs multiple models, and we used the best model to make predictions.

To get the multi-class text classification model we have trained in this tutorial, click [here.](https://colab.research.google.com/drive/1R2lUqZlaXOTHJSlY65ykxoKEw47JyHMx?usp=sharing)

### References
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [Text-pre-processing-techniques](https://www.analyticsvidhya.com/blog/2021/09/essential-text-pre-processing-techniques-for-nlp/)
- [H2O AutoML documentation](https://docs.h2o.ai/h2o/latest-stable/h2o-docs/automl.html)
- [H2O GitHub](https://github.com/h2oai/h2o-3)
- [Notebook for this tutorial](https://colab.research.google.com/drive/1R2lUqZlaXOTHJSlY65ykxoKEw47JyHMx?usp=sharing)

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
