---
layout: engineering-education
status: publish
published: true
url: /how-to-implement-zero-shot-classification-using-python/
title: How to Implement Zero-Shot Classification using Python
description: This tutorial will leverage the zero-shot classification model from Hugging Face to extract model predictions and perform multi-class classification. 
author: esther-awuor
date: 2022-03-16T00:00:00-17:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-implement-zero-shot-classification-using-python/hero.png
    alt: Zero-Shot Classification using Python Example Image
---
Machine learning is an ever-developing field. One area of machine learning that has greatly developed over a few years is Natural Language Processing (NLP).
<!--more-->
The [HuggingFace](https://huggingface.co/) organization has been at the forefront in making contributions in this field. This tutorial will leverage the zero-shot classification model from Hugging Face to extract model predictions and perform multi-class classification. 

### Prerequisites
To follow along with this tutorial, you'll need to be familiar with:
- Machine Learning modeling.
- Natural Language processing.

### Outline
- [Zero-shot classification](#zero-shot-classification)
- [How to leverage the Hugging Face API to perform classification](how-to-leverage-the-hugging-face-api-to-perform-classification)
- [Performing multi-class classification](#performing-multi-class-classification)
- [Wrapping-up](#wrapping-up)
- [Further reading](#further-reading)

### Zero-shot classification
Zero-shot classification is a technique that allows us to associate an appropriate label with a piece of text. This association is irrespective of the text domain and the aspect. For example, it can be a  topic, emotion, or event described by the label. To perform zero-shot classification, we need a zero-shot model.

A zero-shot model allows us to classify data that has not been previously used to build the model. In simple terms, it uses a model built by other people, against your data. Hugging Face allows us to leverage this pre-trained model to perform classification using a few lines of code.

### How to leverage the Hugging Face API to perform classification
Let's begin by installing the main dependency, Transformers.

```bash
!pip install transformers
```
We need to import `pipeline` into our code.

```python
from transformers import pipeline
```

This next step involves initializing our pipeline. We save the result inside a variable called `classifier_pipeline`. We are also using the `facebook/bart-large-mnli` model. There are other zero-shot models available. 

We will use this model because it is the most popular, with over one million downloads. Please refer to this [link](https://huggingface.co/models?pipeline_tag=zero-shot-classification&sort=downloads) to access the other models.

```python
classifier_pipeline = pipeline ("zero-shot-classification", model = "facebook/bart-large-mnli")
```

BERT is an acronym that stands for Bidirectional Encoder Representations from Transformers. It is a popular natural language processing model by Google. It is based on the Transformer architecture used by many NLP models today. 

It is used because it tends to generate contextualized embeddings. This model is different from previous NLP models such as word2vec, which tends to have a fixed embedding vector for sentences that appear somewhat similar. 

For example, a sentence like, "She didn't receive fair treatment", and "There is a fun fair in NYC this summer". These two sentences have similar words but different contexts. Previous models such as word2vec tend to give them similar vector embedding regardless. That is incorrect. But, a BERT model will generate different embedding for the two sentences. 

BERT is very powerful. It looks at the statement's context and generates a meaningful vector representation for a given word. It consists of two model versions, BERT Base and BERT Large. BERT Base is comparable in size to the Open AI's Transformer and uses 12 encoder layers, while BERT Large is a huge model using 24 encoder layers. 

It is the model version used to achieve the state-of-the-art results recorded by the model. The BERT Large is the model's version that we will use in this tutorial. Next, we need a list of input text and candidate labels. We will store these results inside the `input_sequence` and `label_candidate` variables.

```python
input_sequence = "I love traveling"
label_candidate = ['travel', 'cooking', 'entertainment', 'dancing', 'technology']
classifier(input_sequence, label_candidate)
```
Result:

```bash
{'labels': ['travel', 'entertainment', 'technology', 'dancing', 'cooking'],
 'scores': [0.9624875783920288,
  0.030896618962287903,
  0.002539442852139473,
  0.0024957722052931786,
  0.0015806530136615038],
 'sequence': 'I love traveling'}
```

It is clear from the results that the model has correctly classified the sentence as being a `travel` category with an accuracy score of `0.9624875783920288`. This value represents a 96% accuracy.

But, this is a simple example. Let's pick a paragraph text from Wikipedia, and the model will tell us the category the paragraph is based on. We get the paragraph from this Wikipedia [link](https://en.wikipedia.org/wiki/Quantum_machine_learning).

```python
input_sequence = "To avoid plagiarism issues, please refer to the code on the Google Colab"
label_candidate = ['travel', 'cooking', 'entertainment', 'dancing', 'technology']
classifier_pipeline(input_sequence, label_candidate)
```

Result:

```bash
{'labels': ['technology', 'travel', 'entertainment', 'cooking', 'dancing'],
 'scores': [0.9226115942001343,
  0.023767797276377678,
  0.021649882197380066,
  0.01717376336455345,
  0.01479694340378046]
}
```

The model correctly classified the paragraph as an excerpt for technology with an accuracy score of `0.9226115942001343`. This value represents a 92% accuracy. Interesting, right?

The model can also output results with multiple classifications. An article, sentence, or paragraph can be of several categories simultaneously. For example, it can be about travel and it can be in the entertainment category. Let's see how we can achieve this process.

#### Performing multi-class classification
We need to introduce an argument known as `multi_class`, and set it to `True` as shown below:

```python
input_sequence = "To avoid plagiarism issues, please refer to the code on the Google Colab"
candidate_labels = ['travel', 'technology', 'algorithms' 'cooking', 'dancing', 'exploration']
classifier_pipeline(input_sequence, label_candidate, multi_label=True)
```

> Please note that the `multi_class` argument has been used extensively in other tutorials. This argument is deprecated and renamed to `multi_label`. It still works, and you can use it interchangeably. But, `multi_class` will be removed in a future version of Transformers.

Results:

```bash
{'labels': ['dancing', 'entertainment', 'travel', 'technology', 'cooking'],
 'scores': [0.9758230447769165,
  0.8731157183647156,
  0.11541531980037689,
  0.00350499851629138,
  0.0004167791921645403]
  }
```

The model has successfully performed a multi-class classification. It has classified the sentence to be of the category of `dancing (98%)`, and `entertainment (87%)` as well. Please refer to this [link](https://colab.research.google.com/drive/1L4IyAEQLeZR5D9nG_nD_klhNMst1_wHN?usp=sharing) to get the complete code for this tutorial.

### Wrapping up
This tutorial has shown us how to leverage a pre-trained BERT model to implement zero-shot classification on text using Python. You can take this experiment a step further. You could integrate this model inside a web application such as Gradio and build a production-ready application. 

The Hugging Face team has built a user-friendly [demo](https://huggingface.co/zero-shot/) that you can experiment with your text or sentences. Also, they include a sample notebook that you can use to build up your knowledge on the subject.

Have fun coding!

### Further reading
- [HuggingFace](https://huggingface.co/models?pipeline_tag=zero-shot-classification&sort=downloads)
- [Zero shot learning](https://en.wikipedia.org/wiki/Zero-shot_learning)
- [Benchmarking Zero-shot Text Classification: Datasets, Evaluation and Entailment Approach](https://arxiv.org/pdf/1909.00161.pdf)

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
