Want to build your very own language translation app?

Well, in this tutorial, I'll show you how you can build one yourself using Hugging Face Transformers and Gradio!

### Prerequisite

To understand the contents of this tutorial, a reader needs to be familiar with the Python programming language and machine learning. I'm also going to be using [Google Colab](https://colab.research.google.com) notebook. You need to be familiar with that too.

### Table of contents

1. [Introduction](#introduction)
2. [Installing dependencies](#installing-dependencies)
3. [Downloading the pre-trained translation model](#downloading-the-pre-trained-translation-model)
4. [Building the web app for interaction using Gradio](#building-the-web-app-for-interaction-using-gradio)
5. [Wrapping up](#wrapping-up)

### Introduction

[Hugging Face](https://huggingface.co/transformers/) is a great open-source library that is doing powerful work in the Natural Language Processing (NLP) space. The library has a bunch of pre-trained models which you can leverage or fine-tune. Rather than going ahead and training a huge language model, one can leverage this library instead.     

[Gradio](https://gradio.app/), on the other hand, allows us to quickly create customizable UI components around PyTorch models.

### Installing dependencies

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
> An important point to note is that recently, Google Colab comes pre-installed with PyTorch. You may need to ignore the PyTorch installation if you're using Colab. Only follow the steps if installing on your machine.

Let's now go ahead and install our other dependencies, the Hugging Face Transformers and Gradio.

```python
    pip install transformers ipywidgets gradio --upgrade
```
Our dependencies were installed successfully!

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

Amazing right? The translation pipeline is actually translating our text from English to French. 

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

You can find the full implementation of the code on this tutorial on my [Colab]](https://colab.research.google.com/drive/1MMgN89Xn7fz5zVh1XCuLd66ZBIoZ70DZ#scrollTo=62a4vvW_dLsx).

Happy coding!

### References

1. [Hugging Face](https://huggingface.co/transformers/)
2. [PyTorch](https://pytorch.org/)
3. [Gradio](https://gradio.app/)
4. [Hugging Face Transformer Pipelines](https://huggingface.co/transformers/main_classes/pipelines.html) 
5. [Code](https://colab.research.google.com/drive/1MMgN89Xn7fz5zVh1XCuLd66ZBIoZ70DZ#scrollTo=62a4vvW_dLsx)