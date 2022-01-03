---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-nlp/
title: Getting Started with NLP Transformers
description: This article will look at Transformers in NLP and their advantages over traditional deep learning algorithms like recurrent neural networks (RNN).
author: sharon-atieno
date: 2022-01-30T00:00:00-10:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-nlp/hero.jpg
    alt: nlp images alt
---
In today's world of daily new improvements and developments in technology, the field of Natural Language Processing (NLP) has not been left behind. 

New developments like Transfer Learning, Transformers (e.g., Google BERT & ELMO), Reinforcement Learning, Low-Code Tools, et cetera, have changed how data scientists work with textual data.
<!--more-->
They have also helped increase the area application for NLP, like detecting fake news and monitoring social media for cases of cyberbullying.

This article will look at Transformers in NLP and their advantages over traditional deep learning algorithms like recurrent neural networks (RNN).

We will then learn how to build an NLP model using a transformer.

### Table of Contents
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [Getting started with NLP Transformers](#getting-started-with-nlp-transformers)
- [Understanding the pre-existing model architectures](#understanding-the-pre-existing-model-architectures)
  - [Sequence-to-sequence models](#sequence-to-sequence-models)
- [Weaknesses](#weaknesses)
- [Understanding the working principles behind Transformers](#understanding-the-working-principles-behind-transformers)
- [Modeling using NLP Transformers](#modeling-using-nlp-transformers)
  - [a) Sequence classification task](#a-sequence-classification-task)
  - [b) Sequence paraphrasing task](#b-sequence-paraphrasing-task)
- [Conclusion](#conclusion)
- [More Reading](#more-reading)

### Prerequisites
To follow through this tutorial, you need to:
* Install Python locally in your machine or a [Google Colab account](https://colab.research.google.com/)
* Have the basic knowledge of deep learning.

### Goals
By the end of this tutorial, you should be able to:
- Understand the model architecture of the Transformer in NLP
- Understand the working principles behind Transformers
- Model NLP using a transformer.

### Getting started with NLP Transformers
Natural language processing (NLP) refers to a subfield of artificial intelligence interpreting natural human language to machines. Examples include; language detection systems, language translation, et cetera.

A transformer is a deep learning model that works under self-attention to evaluate its input and output data representations. 

Transformers are primarily applied in computer vision and natural language processing. 

Transformers are mainly used in machine language translation, conversational chatbots, and powering better search engines.

### Understanding the pre-existing model architectures
Since the NLP Transformer is built to solve sequence-to-sequence tasks, i.e., ease of long-range handling dependencies, we must first understand sequence-to-sequence models.

#### Sequence-to-sequence models
These models are used in NLP to convert sequences of one type to another. An example can be, language translation where a language like Chinese is translated to English.

Since most of the world's data exist mainly in the form of sequences, the introduction of sequence-to-sequence based modes like Recurrent Neural Networks(RNN) has gained popularity in recent years due to their effectiveness in the field of NLP. 

A Recurrent Neural Network is an artificial neural network that uses sequential or time-series data.

### Weaknesses
Despite their efficiency, sequence-to-sequence models have the following limitations:
-   Inability to deal with long-range dependencies.
-   Inability to perform parallelization. 

> Note: Google Brain's Transformer concept has tackled these limitations.

### Understanding the working principles behind Transformers
First proposed in the paper [Attention Is All You Need](https://arxiv.org/abs/1706.03762), a Transformer was built to use `attention` and `repetition` to handle dependencies between input and output data. 

A transduction model ultimately uses self-attention for computing representations of its inputs and outputs, unlike RNNs that use sequences.

The visual representation of a Transformer architecture is shown below:

![transformer](/engineering-education/getting-started-with-nlp/transformer.webp)

The model architecture of a transformer.  
(Source: https://arxiv.org/pdf/1706.03762.pdf)

To better understand how a Transformer works, we will tackle the `Encoder` and `Decoder` parts. 

> Note: The input part is the Encoder, and the output part is the Decoder

The Transformer's encoder and the decoder parts work as explained below:
- Word inputs sequences are passed to the first encoder.
- The inputs are then reshaped and passed on to the next encoder repeatedly till the last encoder.
- Output is then generated from the last encoder in the encoder-stack.
- The generated output from the last encoder is passed to the decoder-stack, passing through all the decoders in the stack. 

### Modeling using NLP Transformers
Having understood the basics behind Transformers, we can now dive into their implementation in NLP.

Transformer architecture models like BERT (Bidirectional Encoder Representations from Transformers) are often very complicated and require many hours and a workforce to build from scratch. 

This is why it is a good practice to use pre-trained models like the [Hugging Face](https://huggingface.co/) library.

We will model at least two tasks using Hugging Face, starting with the sequence classification task.

#### a) Sequence classification task
This is the most straightforward task in classifying sequences. We will use a transformer pipeline together with a [GLUE](https://gluebenchmark.com/) (General Language Understanding Evaluation benchmark) dataset to leverage a fine-tuned model on [SST2](https://www.kaggle.com/atulanandjha/stanford-sentiment-treebank-v2-sst2)(Stanford Sentiment Treebank version 2).

Before importing the necessary Transformer library, we first need to install it by using the following command:
```bash
pip install transformers
```

Write the following code to import the library:
```python
from transformers import pipeline
```

Proceed and download sentiment analysis pre-trained model using the following line of code:
```python
classification_task = pipeline("sentiment-analysis")
```

Proceed and check the inference of the pre-trained model `sentiment-analysis` model using the following lines of code:
```python 
result = classification_task("I love you")
result
```

The above code results in a positive sentiment based on the word "love," as seen below:

![positive](/engineering-education/getting-started-with-nlp/positive.jpg)

```python 
result = classification_task("I hate you")
result
```

The code above results in a negative sentiment based on the word "hate," as seen below:

![negative](/engineering-education/getting-started-with-nlp/negative.jpg)

The next task will be a sequence paraphrasing task.

#### b) Sequence paraphrasing task
Paraphrasing is the process of expressing the meaning of a phrase, paragraph, sentence, et cetera using different words to achieve clarity.

In this task, we will use Auto models. Auto models are packages that will automatically select the correct model architecture according to a given checkpoint.

We first import the required libraries as shown below:
```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
```

Then, we instantiate a tokenizer and a model from the checkpoint, [MRPC](https://paperswithcode.com/dataset/mrpc)(Microsoft Research Paraphrase Corpus) using the following code:
```python
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased-finetuned-mrpc")
model = AutoModelForSequenceClassification.from_pretrained("bert-base-cased-finetuned-mrpc")
```

We will then proceed to create classes for paraphrased phrases and those that aren't.
```python
classes = ["Paraphrase", "Not_Paraphrase"]
```

Create two sets of sequence sentences as below:
```python
main_sentence = "I went shopping yesterday."
sentence1 = "the shopkeeper sells goods"
sentence2 = "I bought a few items the day before today."
```

To know which one is a paraphrase of our *main_sentence*, we will look at the output to get Input IDs, Token type IDs, and Attention masks of the sentences.
```python
paraphrase = tokenizer(main_sentence, sentence1, return_tensors="pt")
not_paraphrase = tokenizer(main_sentence, sentence2, return_tensors="pt")
paraphrase
```

![output](/engineering-education/getting-started-with-nlp/output.jpg)

Classify the two available classes: 0 (paraphrased) and 1 (not paraphrased) by passing the sequence through the model as shown below:
```python
model_p = model(**paraphrase)
model_np = model(**not_paraphrase)
```

Compute the softmax of the model results to get probabilities of the two classes.
```python 
result_p = torch.softmax(paraphrase_model[0], dim=1).tolist()[0]
result_np = torch.softmax(nonparaphrase_model[0], dim=1).tolist()[0]
```

Run the code below to check the results of the paraphrased model
```python
# Paraphrased output
for i in range(len(classes)):
    print(f"{classes[i]}: {result_p[i] * 100:.2f}%")
```

![paraphrased](/engineering-education/getting-started-with-nlp/para.jpg)

```python
# Not Paraphrased output
for i in range(len(classes)):
    print(f"{classes[i]}: {result_np[i] * 100:.2f}%")
```

![not paraphrased](/engineering-education/getting-started-with-nlp/notpara.jpg)

We can now say we have learned something for today with these two examples.
You can access the code from Colab [here](https://colab.research.google.com/drive/1V3X41fO-3FMxqNyDFZzHUpNftgcxPm3W#scrollTo=biiwRypRtDX9).

### Conclusion
Now that we have looked at the basic working principles of Transformers and built two NLP models using a Transformer.

We have also seen the benefits of using Transformers over sequence-to-sequence models like RNN; you can now apply the knowledge to your personal or work projects.

Happy coding!

### More Reading
* Attention is All you need, [research paper](https://arxiv.org/pdf/1706.03762.pdf).
* Model more [NLP Transformer tasks](https://www.kaggle.com/varunyadav17/nlp-transformer-tasks#Sequence-Classification-Task--).


---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
