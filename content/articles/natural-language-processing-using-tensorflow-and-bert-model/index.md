---
layout: engineering-education
status: publish
published: true
url: /natural-language-processing-using-tensorflow-and-bert-model/
title: Natural language Processing using TensorFlow and Bert Model
description: This tutorial will guide readers on how to build a sentiment analysis model using BERT and TensorFlow.
author: charles-ndirutu
date: 2022-05-03T00:00:00-05:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/natural-language-processing-using-tensorflow-and-bert-model/hero.png 
    alt: Natural language processing using TensorFlow and Bert Model Hero Image
---
Natural language processing (NLP) is a subfield of Artificial Intelligence that enables computers to understand texts and spoken words. 
<!--more-->
Through building of NLP models, the models can perform essential tasks such as [speech recognition](https://monkeylearn.com/blog/natural-language-processing-applications/#speech), [sentiment analysis](https://monkeylearn.com/blog/natural-language-processing-applications/#sentiment-analysis), [intent classification](https://monkeylearn.com/blog/natural-language-processing-applications/#intent), [machine translation](https://monkeylearn.com/blog/natural-language-processing-applications/#translation), [spam filtering](https://mailchimp.com/help/about-spam-filters/) and [chatbot systems](https://monkeylearn.com/blog/natural-language-processing-applications/#chatbots). 

In this tutorial, we will build a sentiment analysis model using [BERT](https://huggingface.co/docs/transformers/model_doc/bert) and [TensorFlow](https://www.tensorflow.org/). 

BERT is a pre-trained model for Natural Language Processing. We will use TensorFlow to create the input, intermediate, and output layers.

### Table of contents
- [Prerequisites](#prerequisites)
- [Getting started with BERT](#getting-started-with-bert)
- [What is Hugging Face Transformers?](#what-is-hugging-face-transformers)
- [Installing Hugging Face Transformers](#installing-hugging-face-transformers)
- [Working with sentiment analysis dataset](#working-with-sentiment-analysis-dataset)
- [Preprocessing the sentiment analysis dataset](#preprocessing-the-sentiment-analysis-dataset)
- [Creating the function](#creating-the-function)
- [Specify the number of sentiment labels](#specify-the-number-of-sentiment-labels)
- [Performing one-hot encoding](#performing-one-hot-encoding)
- [Creating a map function](#creating-a-map-function)
- [Shuffling the training dataset](#shuffling-the-training-dataset)
- [Defining the training dataset](#defining-the-training-dataset)
- [Model creation](#model-creation)
- [Adding the layers](#adding-the-layers)
- [Compiling the initialized neural network](#compiling-the-initialized-neural-network)
- [Fitting the neural network](#fitting-the-neural-network)
- [Using the model to classify input reviews](#using-the-model-to-classify-input-reviews)
- [Input a review and print the classification results](#input-a-review-and-print-the-classification-results)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along, the reader should have some knowledge of:

- [Python programming](/engineering-education/python-projects-for-beginners/).
- [natural language processing model](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/).
- [Text preprocessing](https://towardsdatascience.com/nlp-text-preprocessing-a-practical-guide-and-template-d80874676e79).
- How to build a simple model with [TensorFlow](https://www.tensorflow.org/tutorials).

### Getting started with BERT
[BERT](https://github.com/google-research/bert) is a Bidirectional Encoder Representation from the [Hugging Face's Transformers](https://huggingface.co/models). 

BERT can perform multiple tasks such as question answering systems, text classification, and sentiment analysis. 

In this tutorial, we will use BERT to perform sentiment analysis. This is a supervised model that is pre-trained on raw texts and the English language. 

To start using BERT is easy and only requires installing the Hugging Face Transformers library. We then download the pre-trained BERT model from the Hugging Face Transformers. 

Finally, we will fine-tune the model to perform sentiment analysis.

### What is Hugging Face Transformers?
Hugging Face Transformers provides APIs to download and fine-tune pre-trained models. There are various pre-trained models for NLP tasks, image classification, video classification, and audio classification. 

It supports different pre-trained models such as BERT. To see all the supported pre-trained models, click [here](https://huggingface.co/docs/transformers/index)

Hugging Face Transformers can easily be integrated with machine learning libraries such as [Pytorch](https://pytorch.org/) and [TensorFlow](tensorflow.org). We will start by installing the Hugging Face Transformers library.

#### Installing Hugging Face Transformers
To install the Hugging Face Transformers, we use the following code:

```bash
!pip install transformers
```
We can also install other necessary libraries for this tutorial as follows:

```python
import numpy as np
from tqdm.auto import tqdm
import tensorflow as tf
```
**numpy** - We will use NumPy to convert the dataset into an array.

**tqdm** - We use this library to create input tensors that the model will use.

**tensorflow** - We will use TensorFlow to train the model. We will import Keras from TensorFlow to add all the layers the model requires.

After the installation process completes, we can now work with the dataset for sentiment analysis.

### Working with sentiment analysis dataset
We will use a *movie reviews* dataset that has different sentiment labels to train the sentiment analysis model. 

You can download the sentiment analysis model from [here](https://drive.google.com/file/d/1KkqLk6orkAJl1WEfZw1z_4jDPBOXLWW9/view?usp=sharing). The movie review dataset has `5` sentiment labels as follows:

- 0: It represents a negative sentiment/review.

- 1: It represents a negative sentiment/review.

- 2: It represents a neutral sentiment/review

- 3: It represents a somewhat positive sentiment/review

- 4: It represents a positive sentiment/review.

We will read the dataset using Pandas:

```python
import pandas as pd
```
To read the sentiment analysis dataset, use the code below:

```python
df = pd.read_csv('/content/train.tsv', sep='\t')
```

The dataset has tab-separated values (TSV). Let's display the dataset in the Google Colab notebook.

```python
df.head()
```
The image below shows the dataset output:

![Movie reviews dataset](/engineering-education/natural-language-processing-using-tensorflow-and-bert-model/movie-review-dataset.png)

The dataset has multiple columns, but the model only requires the `Phrase` and `Sentiment` columns. 

The `Phrase` column represents the actual movie review, and the `Sentiment` columns represent the sentiment labels previously listed. 

Before we use the sentiment analysis data in the pre-trained BERT model, we need to process it into an acceptable format for the model.

### Preprocessing the sentiment analysis dataset
A BERT model does not understand raw text in the `Phrase` column. We first split the texts into smaller words or phrases known as tokens. 

We convert the tokens into word embeddings. The word embedding encodes the meaning of the tokens using word vectors. 

Word vectors are a numeric representation of the tokens. It is the format that the model can easily understand.

We will use the `BertTokenizer` to implement text preprocessing. It will prepare the text input for the BERT model. Let's import the `BertTokenizer`.

#### Import `BertTokenizer`
We import the library as follows:

```python
from transformers import BertTokenizer
```

After importing the `BertTokenizer`, we initialize it, as shown below:

```python
tokenizer = BertTokenizer.from_pretrained('bert-base-cased')
```

The code above initializes the `BertTokenizer`. It also downloads the `bert-base-cased` model that performs the preprocessing. 

Before we use the initialized `BertTokenizer`, we need to specify the size [`input IDs`](https://huggingface.co/docs/transformers/preprocessing) and [`attention mask`](https://huggingface.co/docs/transformers/preprocessing) after tokenization. These parameters are required by the `BertTokenizer`. 

The `input IDs` parameter contains the split tokens after tokenization (splitting the text). The `attention mask` ensures the model only focuses on the original split tokens and not the synthesized tokens known as [padding tokens](https://albertauyeung.github.io/2020/06/19/bert-tokenization.html/). 

The sentences in the `Phrase` column have varying lengths, so the `BertTokenizer` synthesizes new tokens to ensure the lengths of sentences are uniform.

Let's initialize these parameters:

```python
X_input_ids = np.zeros((len(df), 256))
X_attn_masks = np.zeros((len(df), 256))
```

The `X_input_ids` will contain the `input IDs` tokens. We generate the tokens from the `df` (this is our dataset), and the length of each sentence is 256. The `X_attn_masks` will contain the `X_attn_masks` tokens. 

We also generate these tokens from the `df` and will also have the same length. 

Let's create a helper function to preprocess the dataset. It will take in the `df`, the `input IDs`, the `attention mask`, and the initialized `tokenizer`. 

#### Creating the function
We create the function as follows:

```python
def preprocessing_dataset(df, ids, masks, tokenizer):
    for i, text in tqdm(enumerate(df['Phrase'])):
        tokenized_text = tokenizer.encode_plus(
            text,
            max_length=256, 
            truncation=True, 
            padding='max_length', 
            add_special_tokens=True,
            return_tensors='tf'
        )
        ids[i, :] = tokenized_text.input_ids
        masks[i, :] = tokenized_text.attention_mask
    return ids, masks
```

The function is called `preprocessing_dataset`. It outputs the dataset in the required format. It takes in the `df`, the `input IDs` as `ids`, the `attention mask` as `masks`, and the initialized `tokenizer`. 

The `for` loop will iterate through the `Phrase` and generate the word embedding using the `tokenizer.encode_plus` method.

The function also has the following arguments:

- `max_length`: It specifies the size of each sentence in the `Phrase` column. The specified value is 256.

- `truncation=True`: The sentences in the `Phrase` column have varying lengths, so longer sentences are truncated to ensure the lengths of sentences are uniform (256).

- `padding='max_length`: It synthesizes new tokens to ensure the sentences have a fixed length and uniform length (256).

- `add_special_tokens=True`: It adds new tokens to make the sentences have the maximum length.

- `return_tensors='tf`: It ensures that the function outputs the preprocessed text as TensorFlow tensors.

The function will finally output the `ids` (input IDs) and `masks` (attention masks). These outputs values will become the inputs for the BERT model. 

We also need to call the function so that it can populate or generate all the `input IDs ` and the `attention mask`. 

We will use the following code:

```python
X_input_ids, X_attn_masks = preprocessing_dataset(df, X_input_ids, X_attn_masks, tokenizer)
```

The next step is to specify the number of sentiment labels.

### Specify the number of sentiment labels
We specify the sentiment labels as follows:

```python
labels = np.zeros((len(df), 5))
```
To know if we have added the labels, run the following code:

```python
labels.shape
```
The code produces the following output:

```bash
(156059, 5)
```
The above output shows the number of sentiment labels added. The next step is to perform one-hot encoding.

### Performing one-hot encoding
One-hot encoding will convert the five sentiment classes in the dataset into a numeric representation that the model understands. We will perform one-hot encoding using the following code:

```python
labels[np.arange(len(df)), df['Sentiment'].values]
```

### Create batches of data
We need to create batches of the dataset for easy loading during training. It will also ease up the training process. We will use the TensorFlow dataset utility method to create the dataset batches.

```python
dataset = tf.data.Dataset.from_tensor_slices((X_input_ids, X_attn_masks, labels))
```
To see the shape of each dataset batch, use this code:

```python
dataset.take(1)
```

The code will display the shape of one sample data batch, as demonstrated below:

![Dataset batch](/engineering-education/natural-language-processing-using-tensorflow-and-bert-model/dataset-batch.png)

From the above output, each data sample has 256 tokens. It also has five sentiment labels. The next step is to create a map function.

### Creating a map function
The map function will define how the model will return the output. We want the model to use the `input Ids` and `attention mask` and return one of the five sentiment labels after predictions.

```python
def SentimentDatasetMapFunction(input_ids, attn_masks, labels):
    return {
        'input_ids': input_ids,
        'attention_mask': attn_masks
    }, labels
```

The code above will initialize the map function. Let's now call the map function using the code below:

```python
dataset = dataset.map(SentimentDatasetMapFunction)
```
The next step is to shuffle the training dataset and provide the batch size.

### Shuffling the training dataset
We will shuffle the dataset randomly to prevent the model from memorizing the data samples but learning from the dataset. 

It will prevent model bias and ensure we have accurate sentiment predictions. We also need to specify the batch size. 

The batch size will determine the number of training data samples that the model will use in one iteration (epoch). 

```python
dataset = dataset.shuffle(10000).batch(16, drop_remainder=True) 
```
The `dataset.shuffle` method will shuffle the selected `10000` data samples. The model will use `16` data samples during each iteration. The `drop_remainder` will drop any word embedding that the model leaves out during training.

The next step is to define how much data the model will use for training. We will specify the ratio that will split the dataset.

### Defining the training dataset
We define the training dataset as follows:

```python
p = 0.8
train_size = int((len(df)//16)*p)
```
The code will define the training dataset to be 80%. The remaining dataset (20%) will be the validation set. Let's split the dataset using this ratio.

```python
training_dataset = dataset.take(train_size)
validation_dataset = dataset.skip(train_size)
```
The training dataset will be 80% and the validation dataset 20%, and it marks the end of dataset preprocessing or preparation. Let's move to the next phase of model creation.

### Model creation
We will use the pre-trained BERT model to create the sentiment analysis model. Let's import the pre-trained BERT model as follows:

```python
from transformers import TFBertModel
```
After importing, let's initialize the model as follows:

```python
model = TFBertModel.from_pretrained('bert-base-cased')
```

The code above initializes the `TFBertModel`. It also downloads the `bert-base-cased` model that will perform sentiment analysis. The next step is to add the input, intermediate, and output layers to the `TFBertModel` model.

### Adding the layers
We will use Keras to add all the input, intermediate/hidden, and output layers the model requires. Let's first add the input layers.

#### Adding input layers
The model will have two input layers. The first layer will handle the `input Ids` and the second layer will handle the `attention mask`. We create the `input Ids` layer as follows:

```python
input_ids = tf.keras.layers.Input(shape=(256,), name='input_ids', dtype='int32')
```
The layer will be named `input_ids`,  and it will have 256 neurons because this is the maximum length of the `input Ids`. We create the `attention mask` as follows:

```python
attn_masks = tf.keras.layers.Input(shape=(256,), name='attention_mask', dtype='int32')
```
The layer will be named `attention_mask`, and it will have 256 neurons because this is the maximum length of the `attention_mask`. We will combine these layers and feed them the BERT model as follows:

```python
bert_embds = model.bert(input_ids, attention_mask=attn_masks)[1]
```
#### Adding intermediate layers
Intermediate layers are the hidden layers of our neural network. These layers will further fine-tune the BERT model and enhance its performance.

```python
intermediate_layer = tf.keras.layers.Dense(512, activation='relu', name='intermediate_layer')(bert_embds)
```
We have created a `Dense` layer as the intermediate layer. It will have 512 neurons and will be named `intermediate_layer`. It uses `relu` as the activation function. 

We use this activation function because the output of this layer ranges between 0 and infinity. It also uses the previous `bert_embds` as input since we are building the model sequentially (layer by layer).

#### Adding the output layer
We add the output layer as follows:

```python
output_layer = tf.keras.layers.Dense(5, activation='softmax', name='output_layer')(intermediate_layer) 
```

The output layer will have five neurons since we have five sentiment labels. It will take the `intermediate_layer` as an input.  

It uses `softmax` as the activation function. We use this activation function because we have more than two sentiment classes. This makes the whole model architecture or structure. We will combine all these layers and initialize the complete neural network.

```python
sentiment_model = tf.keras.Model(inputs=[input_ids, attn_masks], outputs=output_layer)
```

After initializing the model, we can print the sentiment model summary as follows:

```python
sentiment_model.summary()
```
It produces the following summary:

![Sentiment model summary](/engineering-education/natural-language-processing-using-tensorflow-and-bert-model/model-summary.png)

It also shows all the input, intermediate, and output layers. The output also shows the following:

- `Total params: 108,706,565` - These are all the parameters in the initialized neural network.
- `Trainable params: 108,706,565` - It shows the parameters that the initialized neural network will train.
- `Non-trainable params: 0` - These are the pre-trained parameters, which in our case are zero. 

In the next step, we will define the accuracy metrics, the loss function, and the optimizer for the model. 

**We define the optimizer as follows:**

```python
optim = tf.keras.optimizers.Adam(learning_rate=1e-5, decay=1e-6)
```

We define the optimizer as `Adam` from TensorFlow's Keras optimizers. It enhances the performance of the initialized neural performs and reduces the errors the model encounters in training. 

We also set the `learning_rate` that defines the speed at which the initialized neural network learns. The `decay` will speed up the learning rate of the initialized neural network.

**We define the loss function as follows:**

```python
loss_func = tf.keras.losses.CategoricalCrossentropy()
```
We use the `CategoricalCrossentropy` as the loss function because we have different categories/class sentiments (five). It will keep track of the errors in the neural network while training.

**We define the accuracy metrics as follows:**

```python
acc = tf.keras.metrics.CategoricalAccuracy('accuracy')
```
We will use `CategoricalAccuracy` to check the neural network's performance and calculate the accuracy score. We now compile the neural network using these defined parameters.

### Compiling the initialized neural network
We use the following code:

```python
sentiment_model.compile(optimizer=optim, loss=loss_func, metrics=[acc])
```
After compiling the neural network, let's now fit it to the `training_dataset` and the `validation_dataset`.

#### Fitting the neural network
The `training_dataset` will train the neural network to understand sentiment analysis. The `validation_dataset` will adjust and fine-tune the neural network trainable parameters. 

We will output a final model with enhanced performance that can make accurate classifications.

```python
model_training = sentiment_model.fit(
    training_dataset,
    validation_data=validation_dataset,
    epochs=2
)
```
The `sentiment_model.fit` method trains the neural network. We have passed the `training_dataset` and the `validation_dataset`. The neural network will run for *two* epochs and produce the following output:

![Neural network output](/engineering-education/natural-language-processing-using-tensorflow-and-bert-model/neural-network-output.png)

From this output, the final model accuracy score after the `2` epochs is `0.673 (67.3%)`. You can increase the epochs to improve the model accuracy score before using the model in production, but the training process will take more time (hours or even days). 

For demonstration purposes, this is still a good accuracy score. Let's use the model to classify input reviews.

### Using the model to classify input reviews
We will use the model to classify the input reviews into one of the five sentiment labels. Before we use the trained model, we have to process the input reviews to have the required format. 

We will use the same libraries and functions to process the input reviews (we have explained and implemented text preprocessing in the previous sections). 

We will follow the same steps as follows:

- Initializing `BertTokenizer`.
We use the following code:

```python
tokenizer = BertTokenizer.from_pretrained('bert-base-cased')
```
- Creating the function for preprocessing

```python
def prepare_data(input_text, tokenizer):
    token = tokenizer.encode_plus(
        input_text,
        max_length=256, 
        truncation=True, 
        padding='max_length', 
        add_special_tokens=True,
        return_tensors='tf'
    )
    return {
        'input_ids': tf.cast(token.input_ids, tf.float64),
        'attention_mask': tf.cast(token.attention_mask, tf.float64)
    }
```

To make a classification/prediction, we create a function that makes the classification as follows:

```python
def make_prediction(model, processed_data, classes=['Negative', 'A bit negative', 'Neutral', 'A bit positive', 'Positive']):
    probs = sentiment_model.predict(processed_data)[0]
    return classes[np.argmax(probs)]  
```
The function will make a prediction and classify an input review into the different sentiment labels. Let's now input a review and print the classification results.

### Input a review and print the classification results
We use the following code:

```python
input_text = input('Input a review here:')
processed_data = prepare_data(input_text, tokenizer)
result = make_prediction(sentiment_model, processed_data=processed_data)
print(f"Classification results: {result}")
```
When you run the code, a text input control will appear in Google Colab. You will then be prompted to input a review, as shown below:

![Prompted to input ](/engineering-education/natural-language-processing-using-tensorflow-and-bert-model/prompt-to-input.png)

You can then type this input review: 'This is the best movie I have ever watched on NetFlix'. After typing the review text, press Enter. The model will then print the following classification results.

```bash
Classification results: positive
```
The model has classified the input reviews as `Positive`. It has made the correct prediction/classification. It shows that the model was well trained and understood sentiment analysis.

### Conclusion
We have learned how to perform natural language processing using Tensorflow and Bert model. We discussed how to install the BERT model from the Hugging Face Transformers and how to fine-tune the model. 

We worked with the sentiment analysis dataset and processed the dataset to have the required format.

Finally, we initialized the neural network using TensorFlow's Keras layers and trained it to perform sentiment analysis. The final model was further fine-tuned and can accurately classify input reviews.

You can download the Python source code [here](https://colab.research.google.com/drive/1H9ggLyXkP3yBQJWlynkGi2rfWUM_SjqY?usp=sharing)

### Further reading
- [Hugging Face Transformers documentation](https://huggingface.co/docs/transformers/index)
- [Data set preprocessing](https://huggingface.co/docs/transformers/preprocessing)
- [Transformers tokenizer](https://huggingface.co/docs/transformers/main_classes/tokenizer)
- [BERT based cased](https://huggingface.co/bert-base-cased)
- [Hugging Face for NLP](https://blog.tensorflow.org/2019/11/hugging-face-state-of-art-natural.html)
- [BERT Tokenizer](https://www.analyticsvidhya.com/blog/2021/09/an-explanatory-guide-to-bert-tokenizer/)
- [Word Embeddings](/engineering-education/understanding-embeddings-in-machine-learning/)
- [NLP transfomers](/engineering-education/getting-started-with-nlp-transformers/)
- [TensorFlow documention](https://www.tensorflow.org/)
---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)