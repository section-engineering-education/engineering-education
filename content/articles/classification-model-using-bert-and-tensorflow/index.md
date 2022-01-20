---
layout: engineering-education
status: publish
published: true
url: /classification-model-using-bert-and-tensorflow/
title: How to Build a Text Classification Model using BERT and Tensorflow
description: This tutorial aims to build a Text Classification model Using BERT and Tensorflow. We will build a spam detection model.
author: bravin-wasike
date: 2021-12-20T00:00:00-14:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/classification-model-using-bert-and-tensorflow/hero.jpg
    alt: Text Classification model Using BERT and Tensorflow Hero Image
---
Text classification is a subset of machine learning that classifies text into predefined categories. Text classification is one of the important tasks in natural language processing (NLP). 
<!--more-->
Some examples of text classification are [intent detection](/engineering-education/intent-classification-with-rasa-and-spacy/), [sentiment analysis](/engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/), [topic labeling](https://towardsdatascience.com/nlp-extracting-the-main-topics-from-your-dataset-using-lda-in-minutes-21486f5aa925) and [spam detection](https://towardsdatascience.com/spam-detection-in-emails-de0398ea3b48).

In this tutorial, we will build a spam detection model. The spam detection model will classify emails as spam or not spam. This will be used to filter unwanted and unsolicited emails. We will build this model using BERT and Tensorflow. 

BERT will be used to generate sentence encoding for all emails. Finally, we will use Tensorflow to build the neural networks. Tensorflow will create the input and output layers of our machine learning model.

### Table of contents
- [Prerequisites](#prerequisites)
- [Importing important packages](#importing-important-packages)
- [Balancing dataset](#balancing-dataset)
- [Adding labels](#adding-labels)
- [Splitting labeled dataset](#splitting-labeled-dataset)
- [Getting started with BERT](#getting-started-with-bert)
- [Downloading the BERT model](#downloading-the-bert-model)
- [Building model using TensorFlow](#building-model-using-tensorflow)
- [Initializing the BERT layers](#initializing-the-bert-layers)
- [Initializing the neural network layers](#initializing-the-neural-network-layers)
- [Model compiling](#model-compiling)
- [Fitting the model](#fitting-the-model)
- [Evaluating model using the testing dataset](#evaluating-model-using-the-testing-dataset)
- [Making predictions](#making-predictions)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
For a reader to understand this tutorial, they should:
- Know how to work with [deep learning models](/engineering-education/building-a-deep-learning-app-using-python/)
- Know how to use [Pandas](https://pandas.pydata.org/) and [Numpy](https://numpy.org/) in data analysis.
- Know how to work with [TensorFlow](https://www.tensorflow.org/).
- Have [Google Colab notebook](https://research.google.com/colaboratory/). We will use Google Colab because it's faster.

### Importing important packages
Let's import the required packages as follows:

```python
import tensorflow as tf
import tensorflow_hub as hub
import tensorflow_text as text
import pandas as pd
```

We have imported the following packages:

- `tensorflow`: It is the machine learning package used to build the neural network. It will create the input and output layers of our machine learning model.

- `tensorflow_hub`: It contains a pre-trained machine model used to build our text classification. Our pre-trained model is BERT. We will re-use the BERT model and fine-tune it to meet our needs.

- `tensorflow_text`: It will allow us to work with text. In this tutorial, we are solving a text-classification problem.

- `pandas`: We will use Pandas to load our dataset. We also use Pandas for data manipulation and analysis. It gives us a clear overview of how our dataset is structured.

Now, let's load and explore the dataset we will use in this tutorial. Before we load the dataset, make sure you download this dataset from [here](https://drive.google.com/file/d/1QXzFte4FulQXmgUHBAk8y6IqcCYy8An-/view?usp=sharing).

We need to run this command to load the dataset.

```python
df = pd.read_csv("spam.csv")
```

Let's see the structure of five data samples in our dataset.

```python
df.head(5)
```

The output is shown below:

![Dataset structure](/engineering-education/classification-model-using-bert-and-tensorflow/dataset-structure.png)

From the image above, our dataset has two categories: `ham` and `spam`. `ham` represents the emails that are not spam, this are emails from a trusted source. `spam` represents emails from an unknown source.

The dataset also has the `Message` column. This column represents the email messages. Let's see the individual value count for the `spam` and `ham` emails.

```python
df['Category'].value_counts()
```

The output is shown below:

![Value count](/engineering-education/classification-model-using-bert-and-tensorflow/value-count.png)

From the image above, we have 4825 `ham` emails and 747 `spam` emails. The `ham` email has a significantly higher number. 

The ratio of the two categories is shown below:

```python
747/4825
```

```bash
0.15481865284974095
```

This result implies that about 15% are spam emails and 85% of ham emails. This indicates a class imbalance. We need to balance the two classes to reduce bias during model training.

### Balancing dataset
We have various techniques that are used to balance the dataset. In this tutorial, we will use the most simple approach. We will reduce 4825 of the majority class to 747. This will make the two classes balanced.

Before we balance the two classes, let's create data frames for the individual classes.

#### Dataframe for `spam` class
To create the data frame, run this code.

```python
df_spam = df[df['Category']=='spam']
```

#### Dataframe for 'ham' class
To create this data frame, run this code.

```python
df_ham = df[df['Category']=='ham']
```

Now that we have created the two data frames, we will reduce the number of the `ham` class to be equal to the `spam` class.

```python
df_ham_downsampled = df_ham.sample(df_spam.shape[0])
```

We will save the new class into a `df_ham_downsampled` variable. We need to concatenate the two balanced classes into a single data frame.

```python
df_balanced = pd.concat([df_ham_downsampled, df_spam])
```

The `pd.concat` method will concatenate `df_ham_downsampled` and `df_spam` into a single data frame. It will save the dataset into a variable `df_balanced`.

Let's now check if the classes are balanced.

```python
df_balanced['Category'].value_counts()
```

The output is shown below.

```bash
spam    747
ham     747
Name: Category, dtype: int64
```

The output shows the dataset with equal class values of `747`. Thus, our dataset is now balanced.

### Adding labels
We need to label our dataset into `1` and `0`. `1` will represent the data samples that belong to the `spam` class. `0` will represent the data samples that belong to the `ham` class.

To label, the dataset runs this code.

```python
df_balanced['spam']=df_balanced['Category'].apply(lambda x: 1 if x=='spam' else 0)
```

From the code above, we use `lambda` to write our logic. The `apply` method will run the written logic. This will enable us to label our dataset. 

To see the output of five data samples, run this code:

```python
df_balanced.sample(5)
```

The output is shown below.

![Labeled dataset](/engineering-education/classification-model-using-bert-and-tensorflow/labeled-dataset.png)

From the image above, we can see that the dataset is labeled into two. Some of the data samples are labeled `1` while others are labeled `0`. We now need to split our labeled dataset.

### Splitting labeled dataset
We split our dataset into two sets, the first set will be used for training and the second set will be used for testing.

We will split our dataset using the `train_test_split`, which we import as follows:

```python
from sklearn.model_selection import train_test_split
```

To split this dataset, use this code:

```python
X_train, X_test, y_train, y_test = train_test_split(df_balanced['Message'],df_balanced['spam'], stratify=df_balanced['spam'])
```
In the code above, we use `stratify` to ensure equal distribution of classes in the train and test sample. This ensures we have an equal amount of `spam` and `ham` emails after splitting. After splitting the dataset, we can start working with BERT.

### Getting started with BERT
BERT stands for Bidirectional Encoder Representations from Transformers. BERT models help machines understand and interpret the meaning of the text. It uses immediately preceding text to understand the context. It also checks the relationships of words within a sentence to give the actual meaning of words.

BERT will then convert a given sentence into an embedding vector. Embedding vector is used to represent the unique words in a given document. BERT ensures words with the same meaning will have a similar representation.

Machine learning does not work with text but works well with numbers. That's why BERT converts the input text into embedding vectors. The embedding vectors are numbers with which the model can easily work.

The BERT process undergoes two stages: Preprocessing and encoding.

#### Preprocessing
Preprocessing is the first stage in BERT. This stage involves removing noise from our dataset. In this stage, BERT will clean the dataset. It also removes duplicate records from the dataset.

It will also format the dataset so that it can be easy to use during model training. This will increase the model performance. 

#### Encoding
Because machine learning does not work well with the text, we need to convert the text into real numbers. This process is known as encoding. BERT will convert a given sentence into an embedding vector.

Let's download the BERT model.

### Downloading the BERT model
BERT models are usually pre-trained. They are available in [TensorFlow Hub](https://www.tensorflow.org/hub). TensorFlow Hub contains all the pre-trained machine learning models that are downloaded. 

We will download two models, one to perform preprocessing and the other one for encoding. The links for the models are shown below.

```python
bert_preprocess = hub.KerasLayer("https://tfhub.dev/tensorflow/bert_en_uncased_preprocess/3")
bert_encoder = hub.KerasLayer("https://tfhub.dev/tensorflow/bert_en_uncased_L-12_H-768_A-12/4")
```

After downloading the model, let's start building our model using TensorFlow.

### Building model using TensorFlow
There are two types of models that you can build in TensorFlow. Sequential model and a functional model. In a sequential model, layers are built on top of each other, layer by layer. In a sequential model, we don't have multiple inputs and outputs. 

Functional models are more robust and flexible. They do not create layers in sequential order. In the functional model, we have multiple inputs and outputs. This tutorial will use the functional approach to build our model. We will start by initializing the BERT layers.

### Initializing the BERT layers

```python
text_input = tf.keras.layers.Input(shape=(), dtype=tf.string, name='text')
preprocessed_text = bert_preprocess(text_input)
outputs = bert_encoder(preprocessed_text)
```

In the code above, we are creating an input layer using `tf.keras.layers.Input` method. We will use the `preprocessed_text` as input for this layer. 

The `bert_encoder` function will then convert the preprocessed text into embedding vectors. This will be the output of this layer. The `outputs` will then be fed into the neural network layers.

### Initializing the neural network layers

```python
l = tf.keras.layers.Dropout(0.1, name="dropout")(outputs['pooled_output'])
l = tf.keras.layers.Dense(1, activation='sigmoid', name="output")(l)
```

The neural network has two layers, the `Dropout` layer, and the `Dense` layer.

#### 'Dropout' layer
This layer will be used to prevent model overfitting. We will use` 0.1%` of the neurons to handle overfitting. Overfitting happens when a model perfectly learns from training data but performs poorly in testing. We also give it the name `dropout`.

Since we are using the functional approach to build the model, we add the input for this layer as a function using `(outputs['pooled_output'])`. This input was the output of the BERT layers.

#### 'Dense' layer
It only has one neuron. We also initialize the activation function as `sigmoid`. `sigmoid` is used when we have output values that between `0` and `1`. In our case, when making predictions, the prediction probability will lie between `0` and `1`. That's why it is best suited.

We also name the layer as `output` because this is our output layer. Lets now add the input and output layers to construct the final model as shown below:

```python
model = tf.keras.Model(inputs=[text_input], outputs = [l])
```
The model will use the `text_input` as inputs and will have only one single output. We will display the model summary so that we can see all the input and output layers used.

```python
model.summary()
```

The model summary is shown below.

![Model summary](/engineering-education/classification-model-using-bert-and-tensorflow/model-summary.png)

The image above shows all the input and output layers we have initialized for our model. The output also shows the total params, trainable params, and non-trainable params.

- Total params: It represents all the parameters in our model.

- Trainable params: It represents the parameters that we will train.

- Non-trainable params: These parameters are from the BERT model. They are already trained.

Let's compile our model.

### Model compiling
During this stage, we will set the `optimizer`, the `loss function`, and the `metrics` for our model as shown below.

- The `Optimizer` is used to improve the model performance and reduce errors that occur during model training. We use the `adam` optimizer.

- `Metrics` will be used to check the model performance so that we can know how we trained our model. We set the `BinaryAccuracy(name='accuracy')` which will be used to calculate the accuracy score of the model.

- The `Loss function` is used to calculate the model error during the training phase. We use `binary_crossentropy` as our loss function because our output is binary. The output can either be a `0` or `1`.

We now set these parameters.

```python
METRICS = [
      tf.keras.metrics.BinaryAccuracy(name='accuracy'),
      tf.keras.metrics.Precision(name='precision'),
      tf.keras.metrics.Recall(name='recall')
]

model.compile(optimizer='adam',
 loss='binary_crossentropy',
 metrics=METRICS)
```

After compiling the model, we can now fit it into our dataset.

### Fitting the model
In this stage, the model learns from the training data samples. The model will identify patterns in the training dataset and gain knowledge.

```python
model.fit(X_train, y_train, epochs=10)
```

We will specify the number of epochs as 10. The model will iterate through the dataset ten times and print the accuracy score after each iteration. This process is shown below.

![Model training](/engineering-education/classification-model-using-bert-and-tensorflow/model-training.png)

After ten iterations, the model accuracy score is `0.9179 `. This value represents `91.79%`.  Let's use the model to make predictions.

### Evaluating model using the testing dataset
To evaluate the model, we will use the model to classify the data samples in the testing dataset. They should be classified into either `ham` or `spam`. 

Use the following code:

```python
y_predicted = model.predict(X_test)
y_predicted = y_predicted.flatten()
```

The `model.predict` method will give the prediction results which are in a 2D array, but we want our results in a 1D array. To convert the result from the `2D` to `1D` array we use the `y_predicted.flatten()` function.

Since we used a `sigmoid` activation function, the prediction probabilities will lie between `0.0` to `1.0`. So, if the prediction result is > 0.5 the output should be `1`, and if it is < 0.5, the output should be `0`.

We will use NumPy to help us create this logic. 

```python
import numpy as np

y_predicted = np.where(y_predicted > 0.5, 1, 0)
y_predicted
```
The result is shown below.

![Model prediction](/engineering-education/classification-model-using-bert-and-tensorflow/model-prediction.png)

The image above shows our model has classified the data samples into either `0` or `1`. We can now use this model, to make a single prediction using input texts.

### Making predictions
We use the following texts to make predictions:

```python
sample_dataset = [
 'You can win a lot of money, register in the link below,
 'You have an iPhone 10, spin the image below to claim your prize and it will be delivered in your door step',
 'You have an offer, the company will give you 50% off on every item purchased.',
 'Hey Bravin, don't be late for the meeting tomorrow will start lot exactly 10:30 am,
 "See you monday, we have alot to talk about the future of this company ."
]
```

The texts above show examples of email messages. We will use our model to classify these email messages as either `spam` or `ham`.

To make run the prediction, use this code:

```python
model.predict(sample_dataset)
```

The prediction results are shown below.

```bash
array([[0.8734353 ],
       [0.92858446],
       [0.8960864 ],
       [0.29311982],
       [0.13262196]], dtype=float32)
```

From the output above, the first three email messages have been classified as `spam`. They have a prediction probability that is greater than 0.5. The last two email messages have been classified as `ham`. They have a prediction probability that is less than 0.5. These are the right predictions and show we have successfully built our text classification model.

To get the Python code for this tutorial, click [here](https://colab.research.google.com/drive/1fius4_KVATn8Pi0Ve7vs3WPHvMvlVplH?usp=sharing)

### Conclusion
In this tutorial, we learned how to build a spam detection model. The model was able to classify email messages as `spam` or `ham`. We started by using BERT to convert a given sentence into an embedding vector. This was done using the pre-trained BERT models. 

We created our model using TensorFlow and initialized all the input and output layers. We followed all the stages of building the neural network and finally came up with a spam detection model. Finally, we used the model to make predictions, the model was able to give accurate predictions. 

Happy coding!

### References
- [BERT for deep learning](https://en.wikipedia.org/wiki/BERT_(language_model))
- [TensorFlow documentation](https://www.tensorflow.org/)
- [TensorFlow hub models](https://www.tensorflow.org/hub)
- [BERT basics](https://towardsdatascience.com/bert-explained-state-of-the-art-language-model-for-nlp-f8b21a9b6270)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
