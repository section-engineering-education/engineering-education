Flair is a natural language processing (NLP) used to build machine learning models used in text classification and speech recognition. It is used in language translation applications, speech recognition, and conversion of speech to text and text to speech applications. It's made up of a text embedding library that enables one to combine different word and document embeddings during model building.

In this tutorial we will start with the Flair basics, then build a simple Natural Language Processing model using flair, the model build is a text classification model that is used to classify a given text as either offensive or not.

### Table of contents
- [Prerequisites](#prerequisites)
- [How to Install Flair](#how-to-install-flair)
- [Prepare the dataset](#prepare-the-dataset)
- [Splitting the dataset](#splitting-the-dataset)
- [Building Corpus](#building-corpus)
- [Creating Label Dictionary](#creating-label-dictionary)
- [Word Embeddings with Flair](#word-embeddings-with-flair)
- [Building and training the model](#building-and-training-the-model)
- [Making Predictions using our model](#making-predictions-using-our-model)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
1. You must have a good knowledge of [python](https://www.python.org/) and have it installed in your machine.
2. You must have a good understanding of machine learning modeling.
3. You must have a working knowledge of [Pandas](https://numpy.org/).
4. You must have a working knowledge of [Numpy](https://numpy.org/).
5. Use [Google Colab](https://research.google.com/) or [Jupyter Notebook](https://jupyter.org/). In this tutorial, we will be using Google Colab in building our model.

### How to install Flair
Since we are using [Google Colab](https://research.google.com/), use the following command to install flair:

```python
!pip install flair
```
After you have successfully installed Flair we can now start exploring Flair.

### Loading the Flair package
To load Flair so that we can start using it, we use the following command

```python
import flair
```

### Exploring Flair
Exploring Flair enables us to see the methods and attributes available in this library, these methods will help us in building our text classification model.

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

The methods shown above such as `embeddings`, `data`, `models`, and `trainers` will be in building our model.
`embeddings`- We shall use this to perform word embeddings.
`models`- This will be used to specify the type of model we will be building.
`trainers`- These methods will be used to train our model.

### Prepare the dataset
To start with data preparation, we need first to import the exploratory data analysis packages(EDA) to be used in data manipulation and analysis.

#### Importing exploratory data analysis (EDA) packages
The exploratory data analysis packages such as [Pandas](https://pandas.pydata.org/) and [Numpy](https://numpy.org/) will be used to reading and analysis of our data to get the characteristics available in our data.

Let's import `pandas` and `numpy` into our Colab.

```python
import pandas as pd
import numpy as np
```

### Dataset
The dataset used consists of a collection of offensive and non-offensive words. The dataset will be used to train our model so that it can be used to predict if a text is offensive or not.

[CSV File of our data](https://drive.google.com/file/d/1FpEnJkw7XY3cdP1NeUzRRKGqNYsQ3Frz/view?usp=sharing)
Download the dataset from the above link and name the file as `offensive_and_non_offensive_dataset.csv`.

#### Using Pandas to read dataset
`Pandas` will be used to import our dataset.

```python
df = pd.read_csv("offensive_and_non_offensive_dataset.csv")
```

To preview our dataset and see how its structure, enables us to see all the available columns in our dataset. We use the following command.

```python
df.head()
```

![Dataset structure](/engineering-education/how-to-create-nlp-application-with-flair/dataset.png)

### Checking for value counts
This will enable us to check all available collections of both the offensive and non-offensive words in our dataset.

```python
df['class'].value_counts()
```

### Formatting our CSV file
To use our dataset for text classification we first need to reformat the dataset into a CSV format so that to make it easy for our model to understand and use.
We start by exploring through our CSV file to check the columns available in our dataset. Our dataset is made up of three columns: `clean_tweet`, `class` and `labels`.

- 'clean_tweet' is the actual text in our dataset.
- 'class', this is either 0 to show the word is non-offensive and 1 for an offensive word.
- 'labels', have two labels offensive and non-offensive. This is the actual output during predictions.

#### Removing one column
We have to format our data by removing one column which we will not need. This ensures that we have the correct dataset that will be used by our model during training.
Use this command to remove the `class` column.

```python
df1 = df[['clean_tweet','labels']]
```

The dataset will have remain with only two columns: `clean_tweet` and `labels`.

#### Renaming the columns
We have to rename our columns into simple names that we can easily understand and use.

```python
df1.columns  = ['text','labels']
```

The new column names will be `text` and `labels`.

### Splitting the dataset
In this section, we have split our dataset into three: train set, test set, and dev or validation set.

1. Train set.
   It is used during the learning process of the model and it is actually what we use to train our model.
   In our case, we will use 60% of the data as a train set.

2. Test set.
   Is used to measure the performance of our model and evaluate how well our model was trained.
   We shall use 20% of the data as the test set.

3. Dev/Validation set.
   This is the set of data that is used to optimize our model performance.
   We use 20% of the data as the dev set.

We shall use [Pandas](https://numpy.org/) in the splitting of our dataset which allows us to conduct mathematical operations when splitting our dataset.
It conducts the mathematical operation that allows us to specify the right percentages to split our three sets of data.
As shown we use the `split()` method and pass the ratios in which our data is to be split.

```python
train,test,dev = np.split(df1,[int(.6*len(df1)),int(.8*len(df1))])
```

The above command allows us to split the dataset into three where 60% of the dataset will be used as a train set, 20% will be test set, and the remaining 20% will be dev set.

#### Checking the train set, test set, and dev set
After splitting we need to check the size of the three datasets.

```python
print(df1.shape)
print(train.shape)
print(test.shape)
print(dev.shape)
```

This allows us to see the size of our train, test, and dev sets.
The output is as shown.

```bash
(4671, 2)
(2802, 2)
(934, 2)
(935, 2)
```

After splitting the data into three you need to store the data into a folder.

#### Creating a folder
Let's create a folder where we can store our three sets of data. Since we are using [Google Colab](https://research.google.com/), the following command will create a folder named `data_fst` for us.

```python
!mkdir -p data_fst
```

We then need to save the three sets of data into the created folder. The data sets are saved in a CSV format.

```python
train.to_csv("data_fst/train.csv")
test.to_csv("data_fst/test.csv")
dev.to_csv("data_fst/dev.csv")
```

### Building corpus
A corpus is a collection of a large and structured set of machine-readable texts that represents the dataset that is used in building our model.
It consists of a list of sentences that corresponds to the training, testing, and validation sets of our data that is used during model training.

In this section, we shall use the `CSVClassificationCorpus` in creating our corpus. `CSVClassificationCorpus` allows us to build corpus using the CSV file format that we created earlier in this tutorial.
NOTE > Since our dataset is prepared in form of a CSV we have to use `CSVClassificationCorpus` when building our corpus.

We start by importing `Corpus` and `CSVClassificationCorpus`.

```python
import CSVClassificationCorpus from flair.datasets
import Corpus from flair.data
```

After we have successfully imported `Corpus` and `CSVClassificationCorpus`, we have to create column mapping to show which column is for labels and text. As shown earlier in this tutorial our CSV dataset has two columns: 'labels and 'text'.
We shall map our first column as a 'label_topic' and our second column as 'text' using the following command.

```python
column_name_map = {2:"label_topic",1:"text"}
```

Mapping the column name will enhance efficiency when building our model since the model will easily know which column to use as a label and which as a feature.
We also need to give the location of our dataset so that the model can know where our data is located during training.

```python
data_folder = 'data_fst/'
```

After doing all this we can now create our corpus using the `CSVClassificationCorpus` since we are using a CSV file format hence we specify our `delimiter` as a `,`.

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
Labels enable our model to understand the possible outputs when making predictions by identifying text and adding meaningful information to provide context so that a machine learning model can learn from it.
We use `make_label_dictionary()` method to make our label dictionary. The two labels in our dataset are `offensive` and `non_offensive`.

```python
label_dict_csv = corpus_csv.make_label_dictionary()
```

### Word embeddings with Flair
Word embeddings provide different methods and functionalities that allow us to combine different words and documents in different ways.

In this section, word embedding will help us in building our features which will act as inputs into our system.

We will use the `FlairEmbeddings`, `WordEmbeddings` and `DocumentLSTMEmbeddings` embeddings types which when used are more powerful since they use both syntax and semantic information of a word.

```python
from flair.embeddings import FlairEmbeddings,WordEmbeddings,DocumentLSTMEmbeddings
```

After importing the various embedding types we can now use them to create our word embeddings. We will name our embedder `word_embeddings` and is created using `FlairEmbeddings`.

```python
word_embeddings = [FlairEmbeddings('news-forward-fast'),FlairEmbeddings('news-backward-fast')]
```

This will download our pre-trained `FlairEmbeddings` that will be used during building our classification model.

After performing `FlairEmbeddings` which is embedding of individual words we can now do `DocumentEmbeddings` which gives embedding of an entire text or sentences.
To perform `DocumentEmbedding` we use `DocumentRNNEmbeddings` which gives us a more sophisticated way to embed entire sentences.
`DocumentRNNEmbeddings` gives us additional parameters such as `hidden_size`, `reproject_words` and`reproject_words_dimension` to ensure that every sentence is fully analyzed.

```python
document_embeddings = DocumentRNNEmbeddingss(word_embeddings,hidden_size=512,reproject_words=True,reproject_words_dimension=256)
```

After we have successfully performed both `FlairEmbeddings` and `DocumentEmbeddings` we can now start building and training our model.

### Building and training the model
In this section we start to build our model using the processed data, the processed data from the above sections will be used to train our model so that it can understand our dataset so that later the model can be used to make predictions.

First, we begin by importing our Natural language processing tools from Flair.

```python
from flair.models import TextClassifier
from flair.trainers import ModelTrainer
```

The `TextClassifier` will be used to build our model so that it can be able to perform text classification.
The `ModelTrainer` is an important package used to train our model.

After importing these two packages we can now initialize our TextClassifier model as `clf` and pass our created `document_embedings` and `label_dictionary` as parameters to be used to create the text classifier model.

```python
clf = TextClassifier(document_embeddings,label_dictionary=label_dict_csv)
```

From here now we can initialize our `ModelTrainer` method.

### Training our model
We initialize our model as `trainer` using the imported `ModelTrainer` package and `corpus_csv` dataset that we created.

```python
trainer = ModelTrainer(clf,corpus_csv)
```

We train our model using the `corpus_csv` created earlier in this tutorial. We can add the number of epochs in which our model should be trained. Here we specify the number of epochs as `2`. Flair will iterate two times through our dataset during training.

```python
trainer.train('data_fst/',max_epochs=2)
```

We use the `train()` method to train our model and also specify where we store our model in the `data` folder, the same location where our dataset is located.
After the two epochs, we would have trained our model and our model will be saved with a `.pt` extension and this file is what we will use to make a prediction.

### Making Predictions using our model
![Data model](/engineering-education/how-to-create-nlp-application-with-flair/data_model.png)

As shown above we have two saved models: `best-model.pt` and `final-model.pt`, we shall use the `best-model.pt` to make predictions.

To start making predictions we have to specify which model we will be using. Let's load our best model using the `load()` method. We will use it to make predictions. This makes our model ready for use.

```python
new_clf = TextClassifier.load('data_fst/best-model.pt')
```

Output is as shown:

```bash
2021-08-08 16:19:05,861 loading file data_fst/best-model.pt
```

After loading our model we can now start to make a prediction.
We do this by inputting sentences that we want to make predictions.

```python
from flair.data import Sentence
```

#### Creating a sample sentence
We make sample sentences that we want our model to classify as either offensive or non-offensive.

```python
pred1 = Sentence("That girl is stupid")
pred2 = Sentence("This is a good material")
```

These two sentences are what we will use to predict whether the sentence is offensive or not.

### Applying our model to make a prediction
We have to apply our `new_clf` model that was saved as the best model to make predictions and then the `predict()` method.

```python
new_clf.predict(pred1)
```

- Getting the labeled output(offensive or non_offensive)

```python
pred1.labels
```

The output is as shown:

```bash
[offensive (0.8136)]
```

In the first example, the output is offensive.

- let's try the second sentence and see the output.

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

After these two tests, we can see that our model has given predictions with an accuracy of 0.8136 and 0.8278, this is a good sign that our model was trained well.

### Conclusion
This tutorial has been really helpful to anyone interested in Natural Language Processing using Flair. In this tutorial we started by exploring Flair which is a good package to be used for natural language processing, this gave a good foundation before diving deeper and using the package.

We then prepared our dataset into a CSV format that our model can easily use, this helped in data-processing which we then split into three sets, test set, train set, and dev set.

The next section that followed was creating a corpus and label dictionary which ensured that our dataset is well represented with understandable labels to be used during the building and training phases of our model. From here we began word embeddings that provide different methods and functionalities that allow us to combine different words and documents in different ways. These sections we helpful in preparing us for model building.

We then start building our model, we used the pre-processed data to train our model so that it can be able to perform text classification. After here we used our trained model predictions to determine whether a sentence is offensive or non-offensive.

This is a really good tutorial for a reader to follow from the start to the end and learn about natural language processing.

### References
- [Code impementation of this tutorial](https://colab.research.google.com/drive/13cKGpH5k4ahseC6ARpTslHioSHEsCElu?usp=sharing)
- [Pandas documentation](https://pandas.pydata.org/)
- [NumPy documentation](https://numpy.org/)
- [Flair documentaion](https://github.com/flairNLP/flair)
- [Python documentaion](https://www.python.org/)
- [Natural language processing](https://machinelearningmastery.com/natural-language-processing/)
