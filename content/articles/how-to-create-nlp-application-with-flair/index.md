---
layout: engineering-education
status: publish
published: true
url: /how-to-create-nlp-application-with-flair/
title: How to Create an NLP Application using Flair
description: This tutorial will show the reader how to build a simple Natural Language Processing model using Flair. This text classification model classifies a given text as either offensive or non-offensive.
author: brian-nyamache
date: 2021-08-27T00:00:00-04:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-create-nlp-application-with-flair/hero.png
    alt: How to Create an NLP Application using Flair
---
Flair is a simple natural language processing (NLP) library developed and open-sourced by Zalando Research. It is used to build machine learning models for text classification and speech recognition. 
<!--more-->
Flair can be used to build models used in language translation applications and speech recognition. It also enables the conversion of speech to text and viceversa.

Flair has a simple interface that allows you to use and combine different words and interfaces.

In this tutorial, we will discuss Flair basics, then build a simple Natural Language Processing model for text classification. 


### Table of contents
- [Prerequisites](#prerequisites)
- [How to Install Flair](#how-to-install-flair)
- [Splitting the dataset](#splitting-the-dataset)
- [Building Corpus](#building-corpus)
- [Creating Label Dictionary](#creating-label-dictionary)
- [Word Embeddings with Flair](#word-embeddings-with-flair)
- [Building and training the model](#building-and-training-the-model)
- [Making Predictions using our model](#making-predictions-using-our-model)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
1. You must have good knowledge of [Python](https://www.python.org/) and [machine learning modeling](/engineering-education/house-price-prediction/)
2. You need to have installed Python on your machine.
3. You must have some knowledge of [Pandas](https://numpy.org/) and [Numpy](https://numpy.org/).

In this tutorial, we will use `Google Colab` in building our model. You can download the dataset from [here](https://drive.google.com/file/d/1FpEnJkw7XY3cdP1NeUzRRKGqNYsQ3Frz/view?usp=sharing).

> Note: The dataset used is a collection of offensive and non-offensive words.

### How to install Flair
Since we are using [Google Colab](https://research.google.com/), use the following command to install Flair:

```python
pip install flair
```

### Loading the Flair package
To load Flair into our Colab, we use the following command:

```python
import flair
```

### Exploring Flair
Exploring Flair enables us to see the available methods and attributes. These components are used in building our text classification model. 

We do this using the following command:

```python
dir(flair)
```

Output of available methods and attributes:

```bash
['AnnealOnPlateau',
 'Path',
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
 'cache_root',
 'data',
 'datasets',
 'device',
 'embedding_storage_mode',
 'embeddings',
 'file_utils',
 'logger',
 'logging',
 'models',
 'nn',
 'optim',
 'os',
 'tokenization',
 'torch',
 'trainers',
 'training_utils',
 'visual']
```

The methods shown above such as `embeddings`, `data`, `models`, and `trainers` will be used in building our model.

`embeddings`- We use this method to perform word embeddings.
`models`- We use this method to specify the type of model we will be building.
`trainers`- This method is used to train our model.

For data preparation, we need to import the Exploratory Data Analysis packages (EDA).

#### Importing Exploratory Data Analysis (EDA) packages
EDA packages include [Pandas](https://pandas.pydata.org/) and [Numpy](https://numpy.org/). 

`Pandas` is a fast, powerful, flexible, and easy-to-use open-source data analysis and manipulation tool. 

Numpy and Pandas will be used to read and analyze our data.

Let's import `pandas` and `numpy` into our Colab.

```python
import pandas as pd
import numpy as np
```

### Dataset
The [dataset](https://drive.google.com/file/d/1FpEnJkw7XY3cdP1NeUzRRKGqNYsQ3Frz/view?usp=sharing) used consists of a collection of offensive and non-offensive words. This dataset is used to train our model and predict if a text is offensive or not.

Please download the dataset from the link above and rename the downloaded file as `offensive_and_non_offensive_dataset.csv`.

#### Using Pandas to read the dataset
We will use `Pandas` to read our dataset and load it into our working directory, as shown below:

```python
df = pd.read_csv("offensive_and_non_offensive_dataset.csv")
```

To view the structure (rows and columns) of our dataset, we use the command shown below:

```python
df.head()
```

The `df.head()` command returns the first five rows of our dataset, as highlighted below:

![Dataset structure](/engineering-education/how-to-create-nlp-application-with-flair/dataset.png)

### Checking for value counts
This will enable us to check all available collections of both offensive and non-offensive words in our dataset.

```python
df['class'].value_counts()
```

Output:

```python
1    3850
0     821
Name: class, dtype: int64
```

There is a total of `3850` offensive words and `821` non-offensive words in our dataset.

### Formatting our CSV file
To use our dataset for text classification, we first need to reformat the dataset into a `CSV` format. This makes it easy to understand and use.

We start by checking the columns available in our dataset. The dataset is made up of three columns: `clean_tweet`, `class` and `labels`.

- The `clean_tweet` column is the actual text in our dataset.
- The `class` column indicates either `0` to show the word is non-offensive and `1` for an offensive word.
- The `labels` column indicates two labels, offensive and non-offensive. This is the actual output during predictions.

The command below will show the columns in our dataset.

```python
df.columns
```

The output is shown.

```bash
Index(['Unnamed: 0', 'clean_tweet', 'class', 'labels'], dtype='object')
```

![Dataset Columns](/engineering-education/how-to-create-nlp-application-with-flair/dataset_columns.jpg)

#### Removing one column
We have to format our data by removing the column that we do not need. This ensures that we have the correct dataset used by our model during training.

Use the following command to remove the `class` column:

```python
df1 = df[['clean_tweet','labels']]
```

The dataset will remain with only two columns: `clean_tweet` and `labels` as shown.

![Remaining columns](/engineering-education/how-to-create-nlp-application-with-flair/remaining_columns.jpg)

#### Renaming the columns
We have to rename the two remaining columns into simple names that are easy to understand and use.

```python
df1.columns  = ['text','labels']
```

The new column names will be `text` and `labels`, as shown below:

![New Columns](/engineering-education/how-to-create-nlp-application-with-flair/new_columns.jpg)

### Splitting the dataset
In this section, we split our dataset into three: `Train set`, `test set`, and `validation/dev set`.

1. **Train set**
   It is used during the learning and training process. In our case, we will use `60%` of the data as a train set.

2. **Test set**
   It is used to measure the performance of our model and evaluate how we trained it. We will use `20%` of the data as the test set.

3. **Validation/dev set**
   This is the set of data used to optimize our model performance. We will use `20%` of the data as the dev set.

We will use [Pandas](https://numpy.org/) to split our dataset. This allows us to conduct mathematical operations when splitting our dataset. 

Pandas allows us to specify the right percentages to split our three data sets.

As shown below, we use the `split()` method and pass the ratios for data splitting:

```python
train,test,dev = np.split(df1,[int(.6*len(df1)),int(.8*len(df1))])
```

The above command allows us to split the dataset into three, where 60% of the dataset is the train set, 20% will be the test set, and the remaining 20% will be the dev set.

#### Checking the train set, test set, and dev set
After splitting, we need to check the size of the three datasets.

```python
print(df1.shape)
print(train.shape)
print(test.shape)
print(dev.shape)
```

This allows us to see the size of our train, test, and dev sets.

The output is highlighted below:

```bash
(4671, 2)
(2802, 2)
(934, 2)
(935, 2)
```

In the above output, our dataset has `4671` words. If we split it into train set, test set, and dev set, the train set will have a total of `2802` words, the test set will have `934` words, and the dev set will have `935` words. 

The dataset has `2` columns as shown.

After splitting the data into three sets, you need to store the data in a folder.

#### Creating a folder
Let's create a folder where we can store our three sets of data. Since we are using [Google Colab](https://research.google.com/), the following command will create a folder named `data_fst` for us.

```python
mkdir -p data_fst
```

We then need to save the three sets of data into the created folder. The data sets are saved in a CSV format.

```python
train.to_csv("data_fst/train.csv")
test.to_csv("data_fst/test.csv")
dev.to_csv("data_fst/dev.csv")
```

### Building corpus
A corpus is a collection of a large and structured set of machine-readable texts, that represent the dataset used in building a model. 

It consists of a list of sentences that correspond to the training, testing, and validation datasets.

It is the most critical and basic building block of any NLP-related application. It provides us with quantitative data that is used to build NLP applications. We can also use some part of the data to test and challenge our ideas and intuitions about a language.

In this section, we shall use the `CSVClassificationCorpus`. `CSVClassificationCorpus` allows us to build corpus using the CSV file format that we created earlier in this tutorial.

We start by importing `Corpus` and `CSVClassificationCorpus`.

```python
import CSVClassificationCorpus from flair.datasets
import Corpus from flair.data
```

We then create column mapping to show which column is for labels and text. As shown earlier, our CSV dataset has two columns: `labels` and `text`. 

We map our first column as a 'label_topic' and our second column as 'text' using the following command"

```python
column_name_map = {2:"label_topic",1:"text"}
```

Mapping the column name will enhance efficiency when building our model since the model will know which column to use as a `label` and which as a `feature`.

We now need to specify the location of our dataset.

```python
data_folder = 'data_fst/'
```

We can now create our corpus using the `CSVClassificationCorpus`. Since we are using a CSV file format, we specify our `delimiter` as a `,`.

```python
corpus_csv: Corpus = CSVClassificationCorpus(data_folder,column_name_map=column_name_map,skip_header=True,delimiter=',')
```

Our output is as shown:

```bash
2021-08-08 14:34:26,410 Reading data from data
2021-08-08 14:34:26,414 Train: data_fst/train.csv
2021-08-08 14:34:26,416 Dev: data_fst/dev.csv
2021-08-08 14:34:26,417 Test: data_fst/test.csv
```

### Creating Label dictionary
Labels enable our model to understand the possible outputs when making predictions. It does this by identifying text and adding meaningful information to provide context which a machine learning model can learn from it.

We use the `make_label_dictionary()` method to make our label dictionary. The two labels in our dataset are `offensive` and `non_offensive`.

```python
label_dict_csv = corpus_csv.make_label_dictionary()
```

The output is as shown.

```bash
2021-08-08 14:35:29,419 Computing label dictionary. Progress:
100%|██████████| 3736/3736 [00:02<00:00, 1383.38it/s]2020-10-04 13:59:46,550 [b'offensive', b'non_offensive']
```

### Word embeddings with Flair
Word embeddings provide different methods and functionalities that allow us to combine words and documents in different ways. 

In this tutorial, word embedding will help us in building features that act as system inputs.

We will use the `FlairEmbeddings`, `WordEmbeddings`, and `DocumentLSTMEmbeddings` since they are quite powerful. They both use syntax and semantic information of a word. 

Let's import them. 

```python
from flair.embeddings import FlairEmbeddings,WordEmbeddings,DocumentLSTMEmbeddings
```

After importing the various embedding types, we can now use them to create our word embeddings. We will name our embedder `word_embeddings` and use `FlairEmbeddings` to create it.

```python
word_embeddings = [FlairEmbeddings('news-forward-fast'),FlairEmbeddings('news-backward-fast')]
```

This will download our pre-trained `FlairEmbeddings` that will be used when building our classification model, as demonstrated below:

```bash
2021-08-08 14:40:32,332 https://flair.informatik.hu-berlin.de/resources/embeddings/flair/lm-news-english-forward-1024-v0.2rc.pt not found in cache, downloading to /tmp/tmpoq0qzh98
100%|██████████| 19689779/19689779 [00:00<00:00, 37035937.62B/s]2021-08-08 14:40:32,930 copying /tmp/tmpoq0qzh98 to cache at /root/.flair/embeddings/lm-news-english-forward-1024-v0.2rc.pt
2021-08-08 14:40:32,977 removing temp file /tmp/tmpoq0qzh98

2021-08-08 13:40:10,619 https://flair.informatik.hu-berlin.de/resources/embeddings/flair/lm-news-english-backward-1024-v0.2rc.pt not found in cache, downloading to /tmp/tmpr4dnpuah
100%|██████████| 19689779/19689779 [00:00<00:00, 36642750.83B/s]2021-08-08 13:40:11,225 copying /tmp/tmpr4dnpuah to cache at /root/.flair/embeddings/lm-news-english-backward-1024-v0.2rc.pt
2021-08-08 14:40:52,255 removing temp file /tmp/tmpr4dnpuah
```

After performing `FlairEmbeddings`, which is embedding of individual words, we now use `DocumentEmbeddings` which embeds an entire text or sentence.

To perform `DocumentEmbedding`, we use `DocumentRNNEmbeddings` which gives us a more sophisticated way to embed entire sentences. 

`DocumentRNNEmbeddings` provides additional parameters such as `hidden_size`, `reproject_words` and`reproject_words_dimension`. It ensures that every sentence is analyzed.

These embeddings run an `RNN` over all words in a sentence. It then uses the final state of the `RNN` as embedding for the whole document.

To use the `DocumentRNNEmbeddings`, you need to initialize them by parsing a list of `token embeddings` to it.

```python
document_embeddings = DocumentRNNEmbeddingss(word_embeddings,hidden_size=512,reproject_words=True,reproject_words_dimension=256)
```

After we have performed `FlairEmbeddings` and `DocumentEmbeddings`, we can now start building and training our model.

### Building and training the model
In this section, we start to build our model using the processed data, as well as make predictions.

First, we begin by importing our Natural language processing tools from Flair.

```python
from flair.models import TextClassifier
from flair.trainers import ModelTrainer
```

The `TextClassifier` will be used to build our model so that it can perform text classification.

The `ModelTrainer` is an important package used to train our model.

After importing these two packages, we can now initialize our TextClassifier model as `clf` and pass our created `document_embedings` and `label_dictionary` as parameters used to create the text classifier model.

```python
clf = TextClassifier(document_embeddings,label_dictionary=label_dict_csv)
```

Let's now initialize our `ModelTrainer` method.

### Training our model
We initialize our model as `trainer` using the imported `ModelTrainer` package and `corpus_csv` dataset that we created.

```python
trainer = ModelTrainer(clf,corpus_csv)
```

We train our model using the `corpus_csv` that we created earlier in this tutorial. We can add the `number of epochs` in which we train our model. 

We will specify the number of epochs as `2`. Flair will iterate two times through our dataset during training.

```python
trainer.train('data_fst/',max_epochs=2)
```

We use the `train()` method to train our model and also specify where we store our model in the `data_fst` folder. It should be the same location where our dataset is located.

After the `two` epochs, we would have trained our model and it will be saved with a `.pt` extension and this file is what we will use to make a prediction.

### Making predictions using our model
![Data model.](/engineering-education/how-to-create-nlp-application-with-flair/data_model.png)

As shown above we have two saved models: `best-model.pt` and `final-model.pt`, we shall use the `best-model.pt` to make predictions.

To start making predictions, we have to specify which model we will be using. Let's load our best model using the `load()` method.

```python
new_clf = TextClassifier.load('data_fst/best-model.pt')
```

Output is as shown:

```bash
2021-08-08 16:19:05,861 loading file data_fst/best-model.pt
```

After loading our model, we can start to make a prediction. We do this by importing sentences that we wish to predict.

```python
from flair.data import Sentence
```

#### Creating a sample sentence
Let's create sample sentences that we want our model to classify as either `offensive` or `non-offensive`.

```python
pred1 = Sentence("That girl is stupid")
pred2 = Sentence("This is a good material")
```

### Applying our model to make a prediction
We have to apply our `new_clf` model that was saved as the best model to make predictions and then use the `predict()` method.

```python
new_clf.predict(pred1)
```

The following command will predict whether the labeled outputs are `offensive` or `non_offensive`.

```python
pred1.labels
```

The output is as shown:

```bash
[offensive (0.8136)]
```

In the first example, the output is offensive.

Let's try to predict the output of the second sentence and see its output.

```python
new_clf.predict(pred2)
```

```python
pred2.labels
```

The output is as shown:

```bash
[non_offensive (0.8278)]
```
In the second example, the output is non-offensive.

After these two tests, we can see that our model has given predictions with an accuracy of 0.8136 and 0.8278. This means that our model is well trained.

### Conclusion
This tutorial is helpful to anyone interested in exploring Natural Language Processing using Flair. In this tutorial, we started by exploring Flair, which is a good package for natural language processing. .

We then prepared our dataset into a CSV format that our model can easily use. This helped in data-processing where we then split our data into three sets; test set, train set, and dev set.

Finally, we trained our model and made accurate predictions. 

### References
- [Code impementation of this tutorial](https://colab.research.google.com/drive/13cKGpH5k4ahseC6ARpTslHioSHEsCElu?usp=sharing)
- [Pandas documentation](https://pandas.pydata.org/)
- [NumPy documentation](https://numpy.org/)
- [Flair documentaion](https://github.com/flairNLP/flair)
- [Python documentaion](https://www.python.org/)
- [Natural language processing](https://machinelearningmastery.com/natural-language-processing/)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
