---
layout: engineering-education
status: publish
published: true
url: /leveraging-gptneo-to-generate-ai--based-blog-content/
title: Leveraging GPT-Neo to Generate AI-based Blog Content
description: This tutorial will take you through how to build an AI-powered blog content generator using GPT-Neo.
author: willies-ogola
date: 2022-01-05T00:00:00-21:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/leveraging-gptneo-to-generate-ai--based-blog-content/hero.png
    alt: GPT-Neo Hero Image
---
In this tutorial, we will take you through how to build an AI-powered blog content generator using a GPT-3 clone known as GPT-Neo.
<!--more-->

### Prerequisites
To follow along with this tutorial, you need to be familiar with:
- Natural Language Processing.
- Machine Learning modeling.
- Python programming language. 
- Google Colab or Jupyter Notebook.

### Table of contents 
- [Introduction](#introduction)
- [How to leverage GPT-Neo to Generate AI-based Blog Content](#how-to-leverage-gpt-neo-to-generate-ai-based-blog-content)
- [Integration with the Gradio App](#integration-with-the-gradio-app)
- [Wrapping up](#wrapping-up)
- [Further reading](further-reading)

### Introduction
GPT-3 is a deep learning-powered language model that is trained on 175 billion parameters. It would take an enormous amount of computing time to train a model with such parameters on a consumer GPU machine. As a result of its vast amount of training parameters, it performs well on a wide variety of NLP tasks. The model is ideal for most NLP tasks such as text generation, sentiment analysis, and question-answer models. 

But, the model is not open-sourced and it's only available through a closed beta. This means that one has to apply and be granted access before being able to use it. Luckily, one can leverage a GPT clone known as GPT-Neo. At least, this is open-source and anyone can use it. We will leverage this model in this tutorial.

The GPT-3 Neo model that we will use in this tutorial is trained on 125 million parameters. It is not exactly the GPT-3 model with 175 billion parameters that was built by OpenAI but it's also equally as sophisticated as we will see in this tutorial. 

> If you have a much powerful machine, you can train your model on the much powerful 1.3, and 2.7 billion parameters model for a better outcome.

### How to leverage GPT-Neo to Generate AI-based Blog Content
#### Installing and importing dependencies
The first dependency that we are going to need is PyTorch. To install it, you need to head over to PyTorch's [website](https://pytorch.org/) and click on the `install` button. Choose the Pytorch build, your OS, package, language, and compute platform that resonates with your machine.

For our case, we're selecting the `Stable (1.10)` PyTorch build, `Linux OS`, `Pip` package, `Python` language, and a `CUDA 11.3` compute platform. This combination generates the installation command shown below:

> Make sure to include an `!` before the `pip install` command. Otherwise, you'll get an error.

```bash
!pip3 install torch==1.10.0+cu113 torchvision==0.11.1+cu113 torchaudio==0.10.0+cu113 -f https://download.pytorch.org/whl/cu113/torch_stable.html
```
The next thing that we need to do is to install Transformers. Transformers is a powerful natural language processing library. The beautiful thing about transformers is that you get a bunch of NLP pipelines embedded into the library. Some of these pipelines include the `FeatureExtractionPipeline`, `SummarizationPipeline`, `TextClassificationPipeline`, `TranslationPipeline`, and `TextGenerationPipeline` that allows you to leverage powerful and sophisticated NLP models relatively easy. For our task, we will be using the `TextGenerationPipeline`.

Let's go ahead and install it into our notebook.

```bash
!pip install transformers
```
Now that we've installed them, we need to import them.

```python
from transformers import pipeline
```
This command imports all the available pipelines inside the transformers library. If you want a deeper dive into all the available pipelines, please read this [documentation](https://huggingface.co/docs/transformers/index).

#### Setting up the generator
This step involves setting up the generator to allow us to generate blog content. 

```python
generator = pipeline('text-generation', model ='EleutherAI/gpt-neo-2.7B')
```
This block of code goes ahead and downloads our GPT-Neo model with 2.7 billion parameters from transformers. Specifically, focusing on the `text-generation` pipeline. We store this model inside a variable known as `generator`. This process is going to take a bit of time to download as it is a fairly large model, about 10GB. 

There are the 1.3 billion and 125 million parameter models, if your computer is running slow, you can leverage that model instead using the following command:

For the 1.3 billion parameter model, use:

```python
generator = pipeline('text-generation', model='EleutherAI/gpt-neo-1.3B')
```
For the 125 million parameter model, use:

```python
generator = pipeline('text-generation', model ='EleutherAI/gpt-neo-125M')
```

#### Generating text 

```python
post = "This is my first blog post, I'm really excited!"
```
We need to pass this `post` to our generator to generate posts. We do this by writing the following command:

```python
result = generator(post, max_length=50, do_sample=True, temperature=0.9)
```
After running the above block of code, we'll have our generated text stored inside the `result` variable.

We've passed in some arguments inside the `generator` method. They include:

- `post` is the string we created earlier. It contains the text we want the model to generate. 
- `max_length` defines how long your output is going to be. For our case, it's 50 words. 
- `do_sample` is set to `true` to allow for sampling within our model.
- The `temperature` is set to 0.9. It is the value used to model the next set of probabilities. 

You can play around with these parameters, and tune them if you so wish.

If we take a look at the results, we will see that it has generated a new block of text. 

```bash
[{'generated_text': "This is my first blog post, I'm really excited! I have been writing a lot lately, and I'm not getting around to it yet. Here's some of what I'm reading in my mind so I can get back to it.\n"}]
```
If you'd like to generate more text, you need to increase the maximum length. 

### Integration with the Gradio App
Using Gradio is the fastest way to demo your machine learning model with a friendly web interface so that anyone can use it. As a developer, the section above is above board and you can decide to stop there as your code is working perfectly. However, from a user's standpoint, that's not the case. Most app users are not developers and wouldn't want to be working with command lines to process their results. Gradio creates user-friendly interfaces that make it easy to interact with the model. 

We begin by installing it into our notebook.

```bash
!pip install gradio
```
Next, we need to import it into our notebook as `gr`.

```python
import gradio as gr
```
The next step involves encapsulating the function that we want our Gradio app to run.

```python
def generate(post):
    results = generator(post, max_length=50, do_sample=True, temperature=0.9)
    print (results)
```
We've created a new function using `def` and named it `generate`. To that function, we've passed in our post. We've then used the `generator` method to generate new posts. 

Let's go ahead and integrate it with Gradio. We begin by creating a placeholder where a user can input a sentence. We save the result inside the `blog_inputs` variable.

```python
blog_inputs = gr.inputs.Textbox(lines=3, placeholder="Enter sentence to generate new posts...")
```
We now need to put it all together. 

```python
interface = gr.Interface(fn=generate, 
                        inputs=blog_inputs,
                        outputs='text',
                        title='AI based blog content generator')
```
We've created a variable called `interface`. We've set that to be equal to `gr` which is Gradio. We've also used the `Interface()` class from Gradio. This class requires three arguments:
- An ML function to run. That'll be the `generate` function.
- The format for the inputs. That'll be `blog_inputs` that we created.
- The output format. We need our output to be a text.
- A title. You can give it any name you wish.

To launch the Gradio app, we use the `launch()` method as shown below:

```python
interface.launch()
```
It will generate a public URL that you can use to access the application on a web browser. 

Results:

![Blog post generated](/engineering-education/leveraging-gptneo-to-generate-ai--based-blog-content/blog-generator.png)

Here's the Google Colab [link](https://colab.research.google.com/drive/1TphnblcE--PNWQjP3eonbix94I2pMqC6?usp=sharing) for this tutorial.

### Wrapping up
Transformers allow you to quickly perform NLP tasks like question and answering, feature extraction, summarization, and generation. This tutorial has shown us how to use it for text generation. You can use it to generate blog posts, a song, or even write some code. Its use cases are endless.

### Further reading
- [Gradio](https://gradio.app/)
- [GPT Neo](https://github.com/EleutherAI/gpt-neo)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
