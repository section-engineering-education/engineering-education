---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-nlp-transformers/
title: Getting Started with NLP Transformers
description: This article will discuss NLP Transformers and their advantages over traditional deep learning algorithms such as Recurrent Neural Networks (RNN).
author: sharon-atieno
date: 2022-02-03T00:00:00-08:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-nlp-transformers/hero.jpg
    alt: Getting Started with NLP Transformers Hero Image
---
New technologies such as Transfer Learning, NLP Transformers, Reinforcement Learning, and Low-Code tools have changed how data scientists work with textual data.
<!--more-->
These fields have also helped to increase the area of application for NLP. They include detecting fake news and monitoring social media platforms for cases of cyberbullying cases.

This article will look at Transformers in NLP and their advantages over traditional deep learning algorithms like Recurrent Neural Networks (RNN).

We will also learn how to build an NLP model using a Transformer.

### Table of Contents
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [Getting started with NLP Transformers](#getting-started-with-nlp-transformers)
- [Understanding the pre-existing model architectures](#understanding-the-pre-existing-model-architectures)
- [Weaknesses](#weaknesses)
- [Understanding the working principles behind Transformers](#understanding-the-working-principles-behind-transformers)
- [Modeling using NLP Transformers](#modeling-using-nlp-transformers)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along, you need to:
- Install Python locally on your machine or have a [Google Colab account](https://colab.research.google.com/)
- Have some basic knowledge of deep learning.

### Goals
By the end of this tutorial, you should be able to:
- Understand NLP Transformer's model architecture.
- Understand the working principles behind Transformers.
- Model NLP using a transformer.

### Getting started with NLP Transformers
Natural Language Processing (NLP) refers to a subfield of Artificial Intelligence interpreting natural human language to machines. They include language detection systems and language translation.

A transformer is a deep learning model that is self-sufficient and evaluates its input and output data representations. 

Transformers are primarily applied in computer vision and Natural Language Processing. They are also used in machine language translation, conversational chatbots, and search engines.

### Understanding pre-existing model architectures
Since the NLP Transformer is built to solve sequence-to-sequence tasks, we must first understand other related models.

#### Sequence-to-sequence models
These models are used in NLP to convert sequences of one type to another. An example can be, language translation where a language like Chinese is translated to English.

Since most of the world's data exist mainly in the form of sequences, the introduction of sequence-to-sequence-based models like Recurrent Neural Networks(RNN) has gained popularity in recent years. 

A Recurrent Neural Network relies on sequential or time-series data.

### Weaknesses of sequence-to-sequence models
Despite their efficiency, sequence-to-sequence models have the following limitations:
- Inability to deal with long-range dependencies.
- Inability to perform parallelization. 

> Note: Google Brain's Transformer concept has tackled these limitations.

### Understanding the principles behind Transformers
A [Transformer]((https://arxiv.org/abs/1706.03762)) was built to use `attention` and `repetition` to handle dependencies between input and output data. 

A transduction model uses self-attention to compute representations of its inputs and outputs, unlike RNNs that use sequences.

The visual representation of a Transformer architecture is shown below:

![transformer](/engineering-education/getting-started-with-nlp-transformers/transformer.jpg)

To better understand how a Transformer works, we will tackle the `Encoder` and `Decoder` parts. 

> Note: The input is the Encoder, and the output part is the Decoder.

The Transformer's encoder and the decoder parts work as explained below:
- Word input sequences are passed to the first encoder.
- The inputs are then reshaped and passed on to the next encoder repeatedly till the last encoder.
- An output is then generated from the last encoder in the encoder-stack.
- The generated output from the last encoder is then passed through other decoders in the stack. 

### Modeling using NLP Transformers
Having understood the basics behind Transformers, we can now start implementing NLP.

Transformer architectural models like BERT (Bidirectional Encoder Representations from Transformers) are often very complicated and require significant time to build from scratch. 

This is why it is a good practice to use pre-trained models such as the [Hugging Face](https://huggingface.co/) library.

In this tutorial, we will model at least two tasks using Hugging Face, starting with the sequence classification task.

#### Sequence classification task
This is the most straightforward task in classifying sequences. 

We will use a transformer pipeline with a [GLUE](https://gluebenchmark.com/) dataset to leverage a fine-tuned model on [SST2](https://www.kaggle.com/atulanandjha/stanford-sentiment-treebank-v2-sst2).

We first need to install the *Transformer* library using the following command:

```bash
pip install transformers
```

Write the following code to import the library:

```python
from transformers import pipeline
```

Proceed and download a pre-trained model using the code below:

```python
classification_task = pipeline("sentiment-analysis")
```

Check the inference of the pre-trained model using the following code:

```python 
result = classification_task("I love you")
result
```

The above code results in a positive sentiment based on the word `love`, as shown below:

![positive](/engineering-education/getting-started-with-nlp-transformers/positive.jpg)

```python
result = classification_task("I hate you")
result
```

The code above results in a negative sentiment based on the word `hate`:

![negative](/engineering-education/getting-started-with-nlp-transformers/negative.jpg)

#### Sequence paraphrasing task
Paraphrasing is the process of expressing the meaning of a phrase, paragraph, or sentence using different words to achieve clarity.

We will use Auto models to implement this functionality. These are packages that automatically select the correct model architecture according to a given checkpoint.

The first step is to import the required libraries:

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
```

Then, we instantiate a `tokenizer` and `model` from the checkpoint as follows:

```python
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased-finetuned-mrpc")
model = AutoModelForSequenceClassification.from_pretrained("bert-base-cased-finetuned-mrpc")
```

We will then create classes for paraphrased phrases and those that aren't:

```python
classes = ["Paraphrase", "Not_Paraphrase"]
```

Create two sets of sequence sentences, as shown below:

```python
main_sentence = "I went shopping yesterday."
sentence1 = "the shopkeeper sells goods"
sentence2 = "I bought a few items the day before today."
```

To know which one is a paraphrase of our *main_sentence*, we will look at the output to get the *Input IDs*, *Token type IDs*, and *Attention masks* of the sentences.

```python
paraphrase = tokenizer(main_sentence, sentence1, return_tensors="pt")
not_paraphrase = tokenizer(main_sentence, sentence2, return_tensors="pt")
paraphrase
```

![output](/engineering-education/getting-started-with-nlp-transformers/output.jpg)

Classify the two available classes: 0 (paraphrased) and 1 (not paraphrased) by passing the sequence through the model, as shown below:

```python
model_p = model(**paraphrase)
model_np = model(**not_paraphrase)
```

We need to compute the *softmax* of the model results to determine the probabilities of the two classes:

```python 
result_p = torch.softmax(paraphrase_model[0], dim=1).tolist()[0]
result_np = torch.softmax(nonparaphrase_model[0], dim=1).tolist()[0]
```

Run the code below to check the results of the paraphrased model:

```python
# Paraphrased output
for i in range(len(classes)):
    print(f"{classes[i]}: {result_p[i] * 100:.2f}%")
```

![paraphrased](/engineering-education/getting-started-with-nlp-transformers/para.jpg)

```python
# Not Paraphrased output
for i in range(len(classes)):
    print(f"{classes[i]}: {result_np[i] * 100:.2f}%")
```

![not paraphrased](/engineering-education/getting-started-with-nlp-transformers/notpara.jpg)

You can access the complete code from [here](https://colab.research.google.com/drive/1V3X41fO-3FMxqNyDFZzHUpNftgcxPm3W#scrollTo=biiwRypRtDX9).

### Conclusion
In this tutorial, we looked at the basic working principles of Transformers and built two NLP models.

We also discussed the benefits of using Transformers over sequence-to-sequence models like RNN.

You can now apply the knowledge to your personal or work projects.

Happy coding!

### Further reading
- [Research paper](https://arxiv.org/pdf/1706.03762.pdf).
- [NLP Transformer tasks](https://www.kaggle.com/varunyadav17/nlp-transformer-tasks#Sequence-Classification-Task--).


---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)