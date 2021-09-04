---
layout: engineering-education
status: publish
published: true
url: /abstractive-summarization-using-deep-learning/
title: Abstractive Summarization Using Deep Learning
description: In this tutorial we will learn how to use the Pegasus model to perform abstractive summarization from start to finish.
author: sharon-kinyan
date: 2021-09-04T00:00:00-20:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/abstractive-summarization-using-deep-learning/hero.png
    alt: abstractive summarization example image 
---
Abstractive summarization uses Google's Pegasus model. The model uses Transformer's Encoder-Decoder architecture. The encoder outputs masked tokens while the decoder generates Gap sentences.
<!--more-->
Abstractive summarization aims to take a body of text , turning it into a shorter version. Not only does abstractive summarization shorten body of texts, but also generates new sentences. They cover principal information in the input and is linguistically fluent, generating novel words.

This is not the case for previous versions of text summarizations which only aim to generate accurate and concise summaries from input documents. Basically, it copies informative fragments from input sentences.

Abstractive summarization uses Google's [Pegasus](https://huggingface.co/google/pegasus-xsum) model. This is described in a research paper known as [PEGASUS: Pre-training with Extracted Gap-sentences for Abstractive Summarization](https://arxiv.org/pdf/1912.08777.pdf). The model uses Transformer's Encoder-Decoder architecture. The encoder outputs masked tokens while the decoder generates Gap sentences.

This tutorial will walk you through how to use the Pegasus model to perform abstractive summarization from start to finish. We will perform abstractive summarization on some Wikipedia, News and Scientific Journals documents.

### Table of contents
- [Prerequisites](#prerequisites) 
- [Installing dependencies for Transformers in Python](#installing-dependencies-for-transformers-in-python)
- [Importing and configuring the Pegasus model](#importing-and-configuring-the-pegasus-model)
- [Performing abstractive summarization](#performing-abstractive-summarization)

### Prerequisites
To understand this tutorial, You need to be familiar with:
- Natural Language Processing.
- Python programming language.
- Machine learning modelling.
- Google Colab or Jupyter Notebook. 

### Installing dependencies for transformers in Python
We will start by installing all our dependencies to be able to use the Pegasus model. Specifically, we'll use a library called HuggingFace Transformers, Pytorch, and a text tokenizer known as SentencePiece. 

PyTorch will be the underlying framework that powers the Pegasus model.

Let's install PyTorch.

Navigate to PyTorch's main [website](https://pytorch.org/). On the main webpage, you'll see an `install` option. Click on it. Here, you can choose your PyTorch build of choice, your OS, installation package, language, and compute platform. This will generate a code which you will use to install PyTorch. Please note that different selections generate different installation code.

For our case, we'll choose the `LTS (1.8.2)` Pytorch build, `Linux` OS, the `Pip` package, `Python` programming language, and finally `CUDA 10.2`. Since I'll be using Google Colab. If you don't have a GPU in your machine, you can still go ahead and choose the CPU option.

After the selection, the following installation command is generated:

```python
!pip3 install torch==1.8.2+cu102 torchvision==0.9.2+cu102 torchaudio==0.8.2 -f https://download.pytorch.org/whl/lts/1.8/torch_lts.html
```
If you're using Jupyter notebook or Google Colab, make sure to add the `!` before the command. Otherwise, it won't install.

This command successfully installs PyTorch.

Let's go ahead and install our second dependency which is the HuggingFace transformers

```python
!pip3 install transformers
```

This command will successfully install the huggingface transformer library.

Our third dependency which we need to install is `SentencePiece`. It is a text tokenizer and detokenizer that helps predetermine vocabulary sizes before the neural model training.

```python
!pip3 install sentencepiece
```

Let's now go ahead and import them into our Colab.

### Importing and configuring the Pegasus model
We have installed all the required dependencies. The next step involves importing and configuring the Pegasus model.  

```python
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
```

The above command imports our main dependencies from transformers which we installed earlier. This imports two classes, the `PegasusForConditionalGeneration`, and `PegasusTokenizer`. The `PegasusTokenizer` class will convert our sentences into tokens. This is a numbered representation of our sentences. This allows us to pass it to our deep learning model. The `PegasusForConditionalGeneration` class will allow us to use our model.

Let's now go ahead and create our tokenizer for the model

```python
tokenizer_model = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
```
Our tokenizer is now imported. 

`from_pretrained` method allows us to import a pre-trained model. In our case, it's the `google/pegasus-xsum`. You can read more about the pre-trained model and its features [here](https://huggingface.co/google/pegasus-xsum).

There are other Pegasus models available in the HuggingFace library. They include but not limited to `google/pegasus-reddit_tifu`, `google/pegasus-newsroom`, `google/pegasus-pubmed`, and `google/pegasus-arxiv`. All these models are based on Pegasus and trained on different datasets. You can play around and see which suits you best. 

> To use other models, make sure to replace the `google/pegasus-xsum` model in the `from_pretrained` method in the command above with your preferred one.

Let's now load our model.

```python
loaded_model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")
```
We use the `PegasusForConditionalGeneration` class to perform this task. We also use the `from_pretrained` method to allow us to import a pre-trained model.

Our model has now loaded successfully into our Colab.

All that's left to do is to perform abstractive summarization on some wikipedia texts.

### Performing abstractive summarization 
This last step involves taking a bunch of texts, pass it through the Pegasus model, and see how it performs abstractive summarization on the text. 

Let's find some text that we want to summarize. Let's create a variable called `text` and add some text into it.

```python
text = """
Hugging Face is a great open-source library that is doing powerful work in the Natural Language Processing (NLP) space. The library has a bunch of pre-trained models which you can leverage or fine-tune. 

The library has many models including BERT and GPT-2 models that perform various tasks, but for our purpose, we’ll be leveraging the pre-trained language pipeline. Rather than going ahead and training a huge language model such as GPT-2 with 1.5 billion parameters, one can leverage the ML pipeline instead."""
```

We've picked some text from this [tutorial](/engineering-education/building-a-simple-translation-app-using-python-for-beginners/) on Section's website that we want our model to summarize. 

Using our tokenizer which we loaded earlier, let's convert our text into its tokens representation.

```python
tokens = tokenizer_model(text, truncation=True, padding="longest", return_tensors="pt")
```
We've created a variable called `tokens` to store our token representation. We use our tokenizer `tokenizer_model` which we created earlier to tokenize our texts. The `truncation=True` argument allows the model to truncate our texts into a size suitable to be used as input into our model. The `return_tensors` argument tells the model to use tensors from PyTorch.

Let's view our tokens. We achieve this by writing the following command:

```python
tokens
```
Let's now go ahead and try to summarize this text.

```python
summary = model.generate(**tokens)
```
The `**tokens` unpacks our tokens and passes it into our model. The asterics in `**tokens` is just a simple way of adding the `input_ids`, and `attention_mask` present in the results above. 

Let's check our generated summary results. We do this by typing the following command:

```python
summary
```
These results represent our output tensors. This is our summary in tokens.

To us, these are just a bunch of numbers. But to machines, this is how they understand language. Let's decode these values so that they make sense to us, humans.

```python
tokenizer_model.decode(summary[0])
```
From the `summary` result above, we can see that the results are in a nested list. But we only need the first result, so that's why we've indexed [0].

Running that command shows our summarized text. 

Impressive, right?

All that big block of text summarized into that short text. 

So, here's the actual test. If you go through the huge block of text, you'll find that this summarized version of the text doesn't exist. It's novel and has been completely generated by the model.

This is what abstractive summarization is all about!

Please find the full code implementation of the tutorial [here](https://colab.research.google.com/drive/1jmyj05vzVLN96Q3uNrZZ9o6QM2PLSXj-#scrollTo=4DIofQXEv-pr).

### Wrapping up
This is abstractive summarization in a nutshell. Sometimes the model won't give you an abstractive summary. Rather, a text summary. This might be because you're not using the fine-tuned pegasus model for that particular task. Try and use the Pegasus model fine-tuned for that task for better results. For example, the `pegasus-reddit_tifu` would be most suited for performing abstractive summarization on reddit posts, and not `google/pegasus-xsum`. 

Happy coding!

### References
- [PEGASUS: Pre-training with Extracted Gap-sentences for Abstractive Summarization](https://arxiv.org/pdf/1912.08777.pdf)
- [Pegasus-xsum model](https://huggingface.co/google/pegasus-xsum)
