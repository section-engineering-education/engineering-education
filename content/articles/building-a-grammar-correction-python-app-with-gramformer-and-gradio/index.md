---
layout: engineering-education
status: publish
published: true
url: /building-a-grammar-correction-python-app-with-gramformer-and-gradio/
title: Building a Grammar Correction Python App with Gramformer and Gradio
description: This tutorial will show the reader how to build a grammar correction Python application using Gramformer and Gradio.
author: lilian-tonia
date: 2021-10-27T00:00:00-11:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-grammar-correction-python-app-with-gramformer-and-gradio/hero.png
    alt: Grammar Correction Python Application Hero Image
---
It is challenging to write English sentences without making grammatical mistakes. Many people struggle a lot with writing the correct vocabularies and tenses.
<!--more-->
When you think of grammar correction web applications, the [grammarly](https://app.grammarly.com/) app always comes to mind. 

Grammarly is a service that runs on your web browser or in desktop applications such as Microsoft Word. When you type something, it helps you correct grammatical mistakes. 

In some instances, it suggests new sentences for you. The problem with services like this is that they are not open-source and do not have free APIs. You, therefore, need to pay a subscription fee to fix advanced grammatical mistakes.

In this tutorial, we will build a service similar to Grammarly using an open-source framework called Gramformer. 

This build will help us have an idea of how services such as Grammarly work. We will give a sentence with grammatical mistakes to the model and it will produce a corrected version of the sentence.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Installing Gramformer and importing dependencies](#installing-gramformer-and-importing-dependencies)
- [Using the Gramformer model for grammar correction](#using-the-gramformer-model-for-grammar-correction)
- [Deploying the model as an application using Gradio](#deploying-the-model-as-an-application-using-gradio)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this tutorial, a reader needs to be familiar with:
- The Python programming language.
- [Google colab](https://research.google.com/colaboratory/) or [Jupyter Notebook](https://jupyter.org/). 

> Note that we will be using Google Colab in this tutorial.

### Introduction
Gramformer is an open-source framework for detecting, highlighting, and correcting grammar mistakes on natural language text. 

It is a relatively new framework and is currently available on [GitHub](https://github.com/PrithivirajDamodaran/Gramformer). You can pass a sentence to this framework and it would improve it for you. 

The framework consists of three models; `error correction`, `error detection`, and `error highlighter model`. 

At the time of writing this tutorial, only the `error detector` and `highlighter` models are available. 

The fine-tuning for these models is done on relatively smaller models with not-so-much data due to limited computing budgets. 

### Installing Gramformer and importing dependencies
PyTorch is a core dependency that you should install before working with Gramformer.

On your browser, navigate to PyTorch's [website](https://pytorch.org/) and click on the `Install` button. Depending on the OS you're using,  click on PyTorch build -> package -> programming language -> compute platform, select your preferences and then run the install command.  

For our case, we've chosen the `LTS (1.8.2)` PyTorch build, `Linux` OS, `Pip` package, `Python` programming language, `CUDA 11.1` compute platform (because we're using Google Colab's GPU). Don't forget to add an exclamation mark `!` before `pip`.

```bash
!pip3 install torch==1.8.2+cu111 torchvision==0.9.2+cu111 torchaudio==0.8.2 -f https://download.pytorch.org/whl/lts/1.8/torch_lts.html
```

Once that is done, go ahead and install Gramformer using the command below:

```bash
!pip3 install pip==20.1.1 

!pip3 install -U git+https://github.com/PrithivirajDamodaran/Gramformer.git
```
Finally, we need to import `Gramformer` into our project.

```python
from gramformer import Gramformer
```

### Using the Gramformer model for grammar correction

#### Instantiating the Gramformer model

```python
gf = Gramformer(models=1, use_gpu=False) #1=corrector, 2=detector
```

Currently, Gramformer has two models; the error detector and the error corrector model. Therefore, value `1` represents the corrector, while `2` represents the detector. 

Here's the result obtained from running the command above:

```bash
[Gramformer] Grammar error correct/highlight model loaded..
```

It has successfully loaded the error correct/highlight model.

#### Correcting sentences
Let's start by accessing the `correct()` function from Gramformer.

```python
gf.correct()
```

Using an example, let's try and use Gramformer to correct a sentence.

```python
gf.correct('I taken dinner')
```

Here's our output:

```bash
[('I took dinner.', -30.599159240722656)]
```

We can see that the model corrected our sentence. You can change the input sentence into another grammatically incorrect sentence of your choice and try it out. 

Make sure the input sentence is a string. The output sentence is automatically stored in a list.

If you want to perform corrections on a bunch of sentences, you can run a loop. We create a list called `sentences` to store our grammatical incorrect sentences as shown:

```python
sentences = [
                'My name a Lilian',
                'I love watching a action movie',
                'I has a laptop',
                'My phone battery a missing'
]
```

We pass these sentences through a loop and churn out the improved version of the sentences.

```python
for sentence in sentences:
    results = gf.correct(sentence)
    print(results[0])
```

Here's our output:

```bash
('My name is Lilian.', -28.28873062133789)
('I love watching an action movie.', -33.1871337890625)
('I have a laptop.', -25.25513458251953)
('My phone battery is missing!', -36.07805252075195)
```

### Deploying the model as an application using Gradio
Let's now put it all together using the library called Gradio. 

Gradio is a lightweight library that allows you to build user interfaces for your machine learning apps.

```bash
!pip install gradio
```

```python
def correct(sentence):
    res = gf.correct(sentence) 
    return res[0] 
```

The above function encapsulates all of our Gramformer code into a single application.

```python
app_inputs = gr.inputs.Textbox(lines=3, placeholder="Enter a grammatically incorrect sentence here...")
```

> Note that there are different types of inputs for Gradio. `Textbox` is just one of them. Refer to Gradio's [documentation](https://www.gradio.app/) to learn more. 

```python
interface = gr.Interface(fn=correct, 
                        inputs=app_inputs,
                         outputs='text', 
                        title='Hi there, I\'m Gramformer')
```

The interface class requires three arguments:

- `fn`: A machine learning function to run. For our case, it's `correct`.
- `inputs`: The format for the inputs. For our case, it's `app_inputs`.
- `outputs`: The format for our output. For our case, it's `text`.

Finally, to launch Gradio, we use the `launch()` method, as shown below:

```python
interface.launch()
```

![Output](/engineering-education/building-a-grammar-correction-python-app-with-gramformer-and-gradio/gramformer.png)

An interesting thing to note is that once you launch it, it generates an external link that allows it to run as a web app. For our case:

```bash
Running on External URL: https://23225.gradio.app
```

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1sTt1R69ajgYme6LNFfEw8RYSmKRkp5vq?usp=sharing).

### Conclusion
In this tutorial, we have learned how to build an end-to-end grammar correction web application using Gramformer. 

However, this simple build is only suitable for experimental purposes, if you need to build one for production, a lot more work needs to be done. 

Since the Gramformer model is still new, you can refer to the [official documentation](https://github.com/PrithivirajDamodaran/Gramformer) regularly for updates.

### Further reading
- [Gramformer](https://github.com/PrithivirajDamodaran/Gramformer)
- [Gradio](https://www.gradio.app/)
- [PyTorch](https://pytorch.org/)
- [Complete code](https://colab.research.google.com/drive/1sTt1R69ajgYme6LNFfEw8RYSmKRkp5vq?usp=sharing)

Happy coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
