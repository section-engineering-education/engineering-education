---
layout: engineering-education
status: publish
published: true
url: /building-a-grammar-correction-python-app-with-gramformer-and-gradio/
title: Building a Grammar Correction Python Application with Gramformer and Gradio
description: The objective of this tutorial is to help the reader learn how to build a grammar correction python application using a library known as Gramformer and the gradio app.
author: lilian-tonia
date: 2021-10-10T00:00:00-13:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-grammar-correction-python-app-with-gramformer-and-gradio/hero.png
    alt: Grammar Correction Python Application Example image
---

### Outline
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Installing Gramformer and importing dependencies](#installing-gramformer-and-importing-dependencies)
- [Using the Gramformer model for grammar correction](#using-the-gramformer-model-for-grammar-correction)
- [Deploying the model as an application using Gradio](#deploying-the-model-as-an-application-using-gradio)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Prerequisites
- Python programming language.
- Google colab or Jupyter Notebook. 
> To follow along with this tutorial, please use Google colab.

### Introduction

Gramformer is an open-source framework for detecting, highlighting, and correcting grammar mistakes on natural language text. It is a relatively new framework and is currently available on GitHub.

### Installing Gramformer and importing dependencies

There is one core dependency that you need to install prior to working with Gramformer. This is PyTorch.

Go ahead into PyTorch's [website](https://pytorch.org/) and click on the `Install` button. Depending on the OS you're using, PyTorch build, package, programming language, and compute platform, select your preferences and run the install command.  

For our case, we've chosen the `LTS (1.8.2)` PyTorch build, `Linux` OS, `Pip`package, `Python` programming language, `CUDA 11.1` compute platform (because we're using Google Colab's GPU). Don't forget to add an exclamation mark `!` before `pip`.

```bash
!pip3 install torch==1.8.2+cu111 torchvision==0.9.2+cu111 torchaudio==0.8.2 -f https://download.pytorch.org/whl/lts/1.8/torch_lts.html
```

```
Once that is done, go ahead and install Gramformer using the command below:

```bash
!pip3 install pip==20.1.1 

!pip3 install -U git+https://github.com/PrithivirajDamodaran/Gramformer.git
```
Finally, we need to import Gramformer into our project.

```python
from gramformer import Gramformer
```

### Using the Gramformer model for grammar correction

#### Instantiating the Gramformer model
```python
gf = Gramformer(models=1, use_gpu=False) #1=corrector, 2=detector
```
Currently, Gramformer has two model; the error detector and erro corrector model. The value `1` represents the corrector, while `2` represents the detector. 

Here's the result obtained from running the command above:

```bash
[Gramformer] Grammar error correct/highlight model loaded..
```
It has successfully loaded the error correct/highlight model.

#### Correcting sentences

Let's start by accessing the `correct()` class from Gramformer.

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
We can see that the model corrected our sentence. You can change the input sentence into another grammatically incorrect sentence of your choice and try it out. Make sure the input sentence is a string. The output sentence is automatically stored in a list.

If you want to perform corrections on a bunch of sentences, you can run a loop. We create a variable called `sentences` to store our grammatical incorrect sentences as shown:

```python
sentences = [
                'My name a Lilian',
                'I love watching a action movie',
                'I has a laptop',
                'My phone battery a missing'
]
```
We pass these sentences through a loop churning out the improved version of the sentences.

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

Let's now put it all together using the library called Gradio. Gradio is a light-weight library that allows you to build user interfaces for your machine learning apps.

```bash
!pip install gradio
```
```python
def correct(sentence):
    res = gf.correct(sentence) 
    return res[0] 
```
The above function encapsulates all of our Gramformer code into a single code.

```python
app_inputs = gr.inputs.Textbox(lines=3, placeholder="Enter a grammatically incorrect sentence here...")
```
>Please note that there are different types of inputs for gradio. `Textbox` is just one of them. Refer to the Gradio's[documentation](https://www.gradio.app/) to learn more. 

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

Finally, to launch Gradio, we used the `launch()` method as shown:

```python
interface.launch()
```

![Output](/engineering-education/building-a-grammar-correction-python-app-with-gramformer-and-gradio/gramformer.png)

An interesting thing to note is that once you launch it, it generates an external link that allows it to run as a web app. For our case:
```bash
Running on External URL: https://23225.gradio.app
```

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1sTt1R69ajgYme6LNFfEw8RYSmKRkp5vq?usp=sharing).

### Further reading
- [Gramformer](https://github.com/PrithivirajDamodaran/Gramformer)
- [Gradio](https://www.gradio.app/)
- [PyTorch](https://pytorch.org/)
- [Complete code](https://colab.research.google.com/drive/1sTt1R69ajgYme6LNFfEw8RYSmKRkp5vq?usp=sharing)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
