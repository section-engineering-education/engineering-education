---
layout: engineering-education
status: publish
published: true
url: /building-a-simple-translation-app-using-python-for-beginners/
title: Building a simple translation app using Python for beginners
description: In this tutorial, we will build a simple translation app using Hugging Face Transformers and Gradio.
author: sharon-kinyan
date: 2021-08-18T00:00:00-21:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /building-a-simple-translation-app-using-python-for-beginners/hero.png
    alt: translation app example image 
---

Want to build your very own language translation app?

<!--more-->

Well, in this tutorial, I'll show you how you can build one yourself using Hugging Face Transformers and Gradio!

### Prerequisites
To understand the contents of this tutorial, a reader needs to be familiar with the Python programming language and machine learning. You can use either Google Colab or Jupyter notebook. In this tutorial, I'm going to be using [Google Colab](https://colab.research.google.com) notebook. Lastly, you need to be familiar with [Natural Language Processing](https://www.section.io/engineering-education/five-real-life-use-cases-of-natural-language-processing-nlp/) and [PyTorch](https://www.section.io/engineering-education/tensorflow-vs-pytorch/).

### Table of contents
- [Introduction](#introduction)
- [Installing dependencies](#installing-dependencies)
- [Downloading the pre-trained translation model](#downloading-the-pre-trained-translation-model)
- [Building the web app for interaction using Gradio](#building-the-web-app-for-interaction-using-gradio)
- [Wrapping up](#wrapping-up)

### Introduction
The queries you make on websites such as Google and smart assistance such as Google assistant all have one thing in common, they both use Natural Language Process (NLP). NLP is a cutting-edge AI technology that gives a machine the ability to read, understand, and derive meaning from human languages. NLP is the reason why Google assistant sounds so intelligent and Google queries are responded to so intelligently. Data analysts and machine learning experts use NLP be mimic human linguistics behavior saving manpower and time. Every day, you use NLP unknowingly in your phone's auto-correct feature helping you correctly spell a word. To understand how NLP works in-depth, please refer to this [article](https://www.section.io/engineering-education/five-real-life-use-cases-of-natural-language-processing-nlp/).

NLP is a huge library that can be difficult to understand for beginners. Because of this, easy-to-use libraries such as [Hugging Face](https://www.section.io/engineering-education/hugging-face/) have been created to democratize NLP. It is one of the leading startups in the NLP space. This tutorial aims to use it to build a simple translation app.

Hugging Face is a great open-source library that is doing powerful work in the Natural Language Processing (NLP) space. The library has a bunch of pre-trained models which you can leverage or fine-tune. The library has many models including BERT and GPT-2 models that perform various tasks, but for our case, we'll be leveraging the pre-trained language pipeline. Rather than going ahead and training a huge language model such as GPT, one can leverage the ML pipeline instead.

Pipelines are a great and easy way to use models for inference. Hugging Face has many pipelines including the `TokenClassificationPipeline`, `ZeroShotClassificationPipeline` and `Text2TextGenerationPipeline` just to name a few. In our tutorial, we'll be using the `TranslationPipeline`. This pipeline has been fine-tuned to perform translation tasks.

Technology companies such as [Speech Brain](https://speechbrain.github.io/) and [GoogleAI](https://ai.google/research/) use the hugging face model to perform deep learning and create speech technologies.     

[Gradio](https://gradio.app/), on the other hand, allows us to quickly create customizable UI components around PyTorch models. It allows you to create interfaces for your ML models. It helps you quickly test the models you've created using a web interface. There are free example code implementations on their official website demonstrating how you can use gradio to perform digit classification, face segmentation, and outbreak forecast. Please feel free to check it out.

### Installing dependencies
> An important point to note before installing PyTorch is that Google Colab comes pre-installed with PyTorch. You may need to ignore the PyTorch installation if you're using Colab and skip to the Hugging Face and Gradio installations. Only follow the steps to install PyTorch if you're installing it on your machine.

Our main dependencies are going to be PyTorch, Hugging Face Transformers, and Gradio. Let's go ahead and install them.

Let's first install PyTorch. This is available [here](https://pytorch.org/) on PyTorch's website. On the website, find the `Install` button and press it. On the install page, you will see a walkthrough section similar to the one shown below:

![Installing PyTorch](/engineering-education/building-a-simple-translation-app-using-python-for-beginners/installing-pytorch.png)

*[Image Source: PyTorch](https://pytorch.org/)*

The commands for installing PyTorch vary depending on factors such as your OS, package of choice (pip, conda, source), language, and compute platform (CUDA, CPU, or ROCm). So, make sure you select your preference. It doesn't have to look like mine. Mine's shown below:

![Preference](/engineering-education/building-a-simple-translation-app-using-python-for-beginners/pytorch-preference.png)

*[Image Source: PyTorch](https://pytorch.org/)*

To install PyTorch on my machine, I've selected the Long Term Support (LTS 1.8.1) build, Linux OS, `pip` package, Python programming language, and CPU as my compute platform of choice. If your machine has GPU support, choose accordingly.  

After selecting those options, this is the command you're going to run to install PyTorch:

```python
    pip3 install torch==1.8.1+cpu torchvision==0.9.1+cpu torchaudio==0.8.1 -f https://download.pytorch.org/whl/lts/1.8/torch_lts.html
```
Let's now go ahead and install our other dependencies, the Hugging Face Transformers and Gradio. 
```python
    pip install transformers ipywidgets gradio --upgrade
```
> Please note that this command can be used in the command-line interface for a local machine and can also be run as a cell in the Colab notebook. You only add an exclamation `!` mark before the `pip` command when installing on the Colab. This way: `!pip install transformers ipywidgets gradio --upgrade`

Our dependencies are now installed successfully!

`transformers` is going to give us our translation pipeline.
`ipywidgets` provides you with the progress bar as you're downloading the model.
`gradio` gives you a nice way to demonstrate and interact with your ML model.

Now that we've installed our dependencies, the next step involves importing them into our model.

To import them, let's issue the following commands:

```python
    import gradio as gr
    from transformers import pipeline
```
Now that that is done, let's go ahead and download our pre-trained translation model.

### Downloading the pre-trained translation model
Hugging Face has many Transformer pipelines. You can check them on this [documentation](https://huggingface.co/transformers/main_classes/pipelines.html). For our tutorial, we will select the `TranslationPipeline` which is a task-specific pipeline that allows the translation from one language to another. In the documentation, they state that you can use the `pipeline()` method and the task identifier `translation_xx_to_yy` to translate. `xx` being the language you want to translate from and `yy` the language you want to translate to. For our experiment, we are building a simple translation app that can translate from English to French. 

To do this, let's type the following code:

```python
    translation_pipeline = pipeline ('translation_en_to_fr')
```
Let's try it out. So, for example, if I wanted to translate the sentence, "I can't wait to watch Money Heist", we can do it like this:

```python
    translation_pipeline ('I cannot wait to watch Money Heist')
```
This will be the output:

```python

    [{'translation_text': 'Je ne peux attendre de regarder Money Heist'}]

```

Amazing right? The translation pipeline is translating our text from English to French. 

Lastly, we are going to create a function to wrap up all these and display it on a beautiful user interface. We'll be leveraging Gradio for this task.

### Building the web app for interaction using Gradio
This web app allows a user to pass through some text and have it translated.

```python
    def translate_transformers(from_text):
    translated_results = translation_pipeline(from_text)
    return translated_results[0]['translation_text']
```

We have created a function called `translate_transformers()`. We then pass through the text to our translate transformer pipeline. We are storing the results of the translation in a variable called `translated_results`. The function then grabs the first value in our list [0] and returns the translated text.

Now, all that's left to do is wrap this up inside the Gradio function.

We create the gradio interface by writing following pieces of code:

```python
interface = gr.Interface(fn=translate_transformers, 
                        inputs=gr.inputs.Textbox(lines=2, placeholder='Text to translate'),
                        outputs='text')
```
It's amazing how quickly you can create this interface, with only a single line of code. We've passed in a few arguments. `fn` is where we pass in our function which is `translate_transformers`. We pass in an `input` type of Textbox with 2 lines and a placeholder. You can change the number of lines and placeholders in your project without any issues. The last argument states the output type. For our case, it's `text`. 

Let's go ahead and launch it. We use the `launch()` method to achieve this. 

```python
interface.launch()
```
This command will run our gradio app.

![Gradio app](/engineering-education/building-a-simple-translation-app-using-python-for-beginners/gradio-app.png)

*[Image Source: Colab](https://colab.research.google.com/drive/1MMgN89Xn7fz5zVh1XCuLd66ZBIoZ70DZ#scrollTo=62a4vvW_dLsx)*

You can also run the gradio app using the external link generated after issuing the `launch()` instruction. For my case, this is the link that is generated `https://18497.gradio.app`.

![Gradio translation](/engineering-education/building-a-simple-translation-app-using-python-for-beginners/gradio-translation.png)

*[Image Source: Colab](https://colab.research.google.com/drive/1MMgN89Xn7fz5zVh1XCuLd66ZBIoZ70DZ#scrollTo=62a4vvW_dLsx)*

Our code works successfully by using gradio to translate.

### Wrapping up
This tutorial gives us an idea of how one can build a simple translation app. We installed our dependencies, loaded our translation model, and finally used gradio to build our user interface. This is a good example of a project that you can add to your resume or portfolio. It will show the employer of your Machine Learning capabilities. You can play around with the code by trying to translate languages other than french.

You can find the full implementation of the code on this tutorial on my [Colab](https://colab.research.google.com/drive/1MMgN89Xn7fz5zVh1XCuLd66ZBIoZ70DZ#scrollTo=62a4vvW_dLsx).

Happy coding!

### References
- [Hugging Face](https://www.section.io/engineering-education/hugging-face/)
- [PyTorch](https://pytorch.org/)
- [Gradio](https://gradio.app/)
- [Hugging Face Transformer Pipelines](https://huggingface.co/transformers/main_classes/pipelines.html) 
- [Full code](https://colab.research.google.com/drive/1MMgN89Xn7fz5zVh1XCuLd66ZBIoZ70DZ#scrollTo=62a4vvW_dLsx)
