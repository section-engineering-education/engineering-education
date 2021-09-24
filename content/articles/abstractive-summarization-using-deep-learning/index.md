---
layout: engineering-education
status: publish
published: true
url: /abstractive-summarization-using-deep-learning/
title: Abstractive Summarization Using Deep Learning
description: In this tutorial we will learn how to use the Pegasus model to perform abstractive summarization from start to finish.
author: sharon-kinyan
date: 2021-09-24T00:00:00-00:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/abstractive-summarization-using-deep-learning/hero.png
    alt: abstractive summarization example image 
---

Abstractive summarization uses the Pegasus model by Google. The model uses Transformers Encoder-Decoder architecture. The encoder outputs masked tokens while the decoder generates Gap sentences.
<!--more-->
Abstractive summarization aims to take a body of text and turn it into a shorter version. Not only does abstractive summarization shorten the body of texts, but it also generates new sentences. 

This is not the case for previous versions of text summarizations which only aim to generate accurate and concise summaries from input documents. It copies informative fragments from input sentences.

Abstractive summarization uses Google's [Pegasus](https://huggingface.co/google/pegasus-xsum) model. This is described in a research paper as [PEGASUS: Pre-training with Extracted Gap-sentences for Abstractive Summarization](https://arxiv.org/pdf/1912.08777.pdf). 

This tutorial will walk you through how to use the Pegasus model to perform abstractive summarization from start to finish. We will perform abstractive summarization on some Wikipedia, News, and Scientific Journals and documents.

### Table of contents
- [Prerequisites](#prerequisites) 
- [Installing dependencies for Transformers in Python](#installing-dependencies-for-transformers-in-python)
- [Importing and configuring the Pegasus model](#importing-and-configuring-the-pegasus-model)
- [Performing abstractive summarization](#performing-abstractive-summarization)

### Prerequisites
To understand this tutorial, You need to be familiar with:
- Natural Language Processing.
- Python programming language.
- Machine learning modeling.
- Google Colab or Jupyter Notebook. 

### Installing dependencies for transformers in Python
We will start by installing all our dependencies to be able to use the Pegasus model. Specifically, we'll use a library called HuggingFace Transformers, Pytorch, and a text tokenizer known as SentencePiece. 

PyTorch will be the underlying framework that powers the Pegasus model.

To install PyTorch, navigate to PyTorch's main [website](https://pytorch.org/). On the main webpage, you'll see an `install` option. 

Here, you can choose your PyTorch build of choice, your OS, installation package, language, and compute platform. This will generate a code that you will use to install PyTorch. Please note that different selections generate different installation codes.

For our case, we'll choose the `LTS (1.8.2)` Pytorch build, `Linux` OS, the `Pip` package, `Python` programming language, and finally `CUDA 10.2`. If you don't have a GPU in your machine, you can still go ahead and choose the CPU option.

After the selection, the following installation command is generated:

```bash
!pip3 install torch==1.8.2+cu102 torchvision==0.9.2+cu102 torchaudio==0.8.2 -f https://download.pytorch.org/whl/lts/1.8/torch_lts.html
```
If you're using Jupyter notebook or Google Colab, make sure to add the `!` before the command. Otherwise, it won't install.

The second dependency, we should install is the HuggingFace transformers library.

```bash
!pip3 install transformers
```

Our third dependency is `SentencePiece`. It is a text tokenizer and detokenizer that helps predetermine vocabulary sizes before the neural model training.

```bash
!pip3 install sentencepiece
```

### Importing and configuring the Pegasus model 

```py
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
```

The above command imports our main dependencies from transformers which we installed earlier. This imports two classes, the `PegasusForConditionalGeneration`, and `PegasusTokenizer`. 

The `PegasusTokenizer` class will convert our sentences into tokens. This is a numbered representation of our sentences. This allows us to pass it to our deep learning model. 

The `PegasusForConditionalGeneration` class will allow us to use our model.

We now need to create our tokenizer for the model.

```py
tokenizer_model = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
```
Our tokenizer is now imported. `from_pretrained` method allows us to import a pre-trained model. In our case, it's the `google/pegasus-xsum`. You can read more about the pre-trained model and its features [here](https://huggingface.co/google/pegasus-xsum).

There are other Pegasus models available in the HuggingFace library. Some include `google/pegasus-reddit_tifu`, `google/pegasus-newsroom`, `google/pegasus-pubmed`, and `google/pegasus-arxiv`. 

All these models are based on Pegasus and trained on different datasets. You can play around with them and see which suits you best.

> To use other models, make sure to replace the `google/pegasus-xsum` model in the `from_pretrained` method in the command above with your preferred one.

This next step involves loading our model.

```python
loaded_model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")
```
We use the `PegasusForConditionalGeneration` class to perform this task. We also use the `from_pretrained` method to allow us to import a pre-trained model. All that's left to do is to perform abstractive summarization on some Wikipedia text.

### Performing abstractive summarization 
This last step involves taking a bunch of text, passing it through the Pegasus model, and seeing how the model performs abstractive summarization on the text.

To summarize text, let's create a variable called `text` and add some text to it.

```python
text = """
```

Hugging Face is a great open-source library doing powerful work in the Natural Language Processing (NLP) space. The library has a bunch of pre-trained models which you can leverage or fine-tune. 

The library has many models, including BERT and GPT-2 models that perform various tasks, but we’ll be leveraging the pre-trained language pipeline for our purpose. Rather than going ahead and training a huge language model such as GPT-2 with 1.5 billion parameters, one can leverage the ML pipeline instead."""

We've picked some text from this [tutorial](/engineering-education/building-a-simple-translation-app-using-python-for-beginners/) on Section's website. Using our tokenizer, let's convert our text into its token representation.

```python
tokens = tokenizer_model(text, truncation=True, padding="longest", return_tensors="pt")
```
We've created a variable called `tokens` to store our token representation. We use our tokenizer `tokenizer_model`, which we created earlier, to tokenize our texts.

The `truncation=True` argument allows the model to truncate our texts into a size suitable for input into our model. The `return_tensors` argument tells the model to use tensors from PyTorch.

To view our tokens, we write:

```python
tokens
```
It's time to summarize our text.

```python
summary = loaded_model.generate(**tokens)
```
`**tokens` unpacks our tokens and passes them into our model. The asterisks in `**tokens` are simply adding the `input_ids` and `attention_mask` present in the results above. 

To check our generated summary results in tokens, we type `summary`.

```python
summary
```
These results represent our output tensors. These may be just a bunch of numbers to humans, but not to machines. This is how they understand language. Decoding these values will help us make sense of these numbers.

```python
tokenizer_model.decode(summary[0])
```
The `summary` result above shows that the results are in a nested list. But we only need the first result, so that's why we've indexed [0]. 

Running the above command shows our summarized text. Isn't it impressive how that block of text has been summarized? If you go through the huge block of text, you'll find that this summarized version of the text doesn't exist. 

It's novel and has been completely generated by the model. This is what abstractive summarization is all about! Please find the full code implementation of the tutorial [here](https://colab.research.google.com/drive/1jmyj05vzVLN96Q3uNrZZ9o6QM2PLSXj-#scrollTo=4DIofQXEv-pr).

### Wrapping up
This is abstractive summarization in a nutshell. 

Sometimes the model won't give you an abstractive summary. Rather, a text summary. This might be because you're not using the fine-tuned pegasus model for that particular task. 

Try and use the Pegasus model fine-tuned for that task for better results. For example, the `pegasus-reddit_tifu` would be most suited for abstractive summarization on Reddit posts as opposed to `google/pegasus-xsum`.

Happy coding!

### References
- [PEGASUS: Pre-training with Extracted Gap-sentences for Abstractive Summarization](https://arxiv.org/pdf/1912.08777.pdf)
- [Pegasus-xsum model](https://huggingface.co/google/pegasus-xsum)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
