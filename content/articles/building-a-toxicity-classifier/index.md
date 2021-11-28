---
layout: engineering-education
status: publish
published: true
url: /building-a-toxicity-classifier/
title: Building a Toxicity Classifier using Python
description: This tutorial will help the reader understand how to built a multi-lingual toxicity classifier using Gradio to recognize toxic sentences.
author: lilian-cheptoo
date: 2021-11-28T00:00:00-11:11
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-toxicity-classifier/hero.png
    alt: Building a Toxicity Classifier using Python Hero image
---
This tutorial will use the detoxify pre-trained model to recognize toxic sentences. We will integrate this model into the Gradio app to build an interactive application that will allow the user to enter a sentence.
<!--more-->
The model will give an output to indicate if the sentence is toxic or not.

### Prerequisites
To follow along with this tutorial, you'll need to:
- Be familiar with machine learning modeling.
- Use Google Colab or Jupyter Notebook.
- Be familiar with the Jigsaw Multilingual Toxic Comment Classification [dataset](https://www.kaggle.com/c/jigsaw-multilingual-toxic-comment-classification) as the model has been trained on it. 

### Outline
- [The toxicity classifier](#the-toxicity-classifier)
- [Installing the detoxify model and installing the necessary dependencies](#installing-the-detoxify-model-and-installing-the-necessary-dependencies)
- [Performing prediction using the model](#performing-prediction-using-the-model)
- [Deploying the model as an application using Gradio](#deploying-the-model-as-an-application-using-gradio)
- [Wrapping up](wrapping-up)

### The toxicity classifier
The toxicity classier can classify whether a particular text or sentence is toxic or not. Cyberbullying has been an issue ever since the rise of the social media era. Many people have experienced cyberbullying in one way or another. 

On social media sites, there are a lot of comments that people make, and most of them have a significant amount of negativity and toxicity in them. Major technology companies have turned to machine learning to help with the automated classification of toxic content to combat toxic content and online abuse. 

Indeed, many of these automated systems are deployed today. For example, this has been seen on Twitter, where the company has automatically flagged more than half of all tweets that violate its rules. 

Just recently, in January 2021, Donald Trump's Twitter account was [permanently suspended](https://blog.twitter.com/en_us/topics/company/2020/suspension) as his account was deemed to cause incitement of violence. This automation was performed by a machine learning system.  

An example of an open-sourced model built for this purpose is the [toxicity classifier](https://github.com/tensorflow/tfjs-models/tree/master/toxicity) model built by Google's research team. The model can detect whether sentences contain toxic content or not. This toxicity could be in the form of insults, threatening language, obscenities, identity-based hate, gender-based hate, or sexually explicit language.

This model is built on top of Google's [Universal Sentence Encoder](https://arxiv.org/pdf/1803.11175.pdf) model, which provides encoding over words and phrases and sentences, perhaps even longer pieces of texts. The model is trained on a collection of user-generated online news comments published between 2015 and 2017. 

Please refer to this [article](https://figshare.com/articles/dataset/data_json/7376747) to learn more about it. To demonstrate how we can use this model, we will use a simple Python example to demonstrate how you can implement such a model in your project.

### Installing the detoxify model and installing the necessary dependencies

We begin by performing a quick `pip` install.

```bash
pip install detoxify
```

After installation, we need to import it into our Colab.

```python
from detoxify import Detoxify
```

### Performing prediction using the model
After installing and importing the model, we need to load it into our notebook. We do this by using the `Detoxify` method we imported in the step above. After loading the model, we save it into a variable known as `predictor`. 

```python
predictor = Detoxify('multilingual')
```

Let's try and perform prediction on a simple sentence to establish whether the sentence is toxic or not.

```python
predictor.predict('Why are you so fat?')
```

In some modern cultures, calling someone `fat` isn't such a big issue. But in other cultures, they might find it offensive. Let's see what the model thinks.

The output:

```bash
{'identity_attack': 0.0020285994,
 'insult': 0.8864248,
 'obscene': 0.0039239605,
 'severe_toxicity': 9.833861e-05,
 'sexual_explicit': 0.0007071728,
 'threat': 0.00047757424,
 'toxicity': 0.9415722}
```

According to this output, we can decode that the model views such a sentence as an insult and toxic.

Since the model is multi-lingual, we can try to perform a prediction in French. Let's perform a prediction on the French word, `Je vous aime`, which means `I love you` to establish whether it's toxic or not. We all know it's not toxic, but let's see whether the model also thinks the same.

```python
predictor.predict('Je vous aime')
```

The output:

```bash
{'identity_attack': 0.0007130441,
 'insult': 0.005802411,
 'obscene': 0.012052586,
 'severe_toxicity': 0.0008066323,
 'sexual_explicit': 0.00037506246,
 'threat': 0.0006130718,
 'toxicity': 0.0023800838}
```

As expected, the model didnt't classify the sentence as toxic. The results show the toxicity of such a sentence to be very low. 

Remember, this is only for a single sentence. What if we wanted the model to classify the toxicity of a couple of sentences? We can create a list of sentences we'd want our model to classify then run a loop for the model to classify.

```python
sentences = [
        'You suck!',
        'How much is this bag?',
        'Why do you always get to be an jerk?',
        'I bought this gift for my mother',
        'I will hurt you'
]
```

All we've done in the code above is to create a variable called `sentences` that holds an array of all those sentences we want to classify. We now need to loop through them.

```python
for sentence in sentences:
    results = predictor.predict(sentence)
    print (results)
```

The output:

```bash
{'toxicity': 0.99660456, 'severe_toxicity': 0.012938017, 'obscene': 0.575454, 'identity_attack': 0.0018781582, 'insult': 0.9799171, 'threat': 0.004116686, 'sexual_explicit': 0.080397494}
{'toxicity': 0.0016920721, 'severe_toxicity': 1.4579835e-05, 'obscene': 0.00018599258, 'identity_attack': 7.167015e-05, 'insult': 0.0005639612, 'threat': 3.5181794e-05, 'sexual_explicit': 2.9744933e-05}
{'toxicity': 0.99021566, 'severe_toxicity': 0.016646694, 'obscene': 0.8672117, 'identity_attack': 0.013259668, 'insult': 0.92916876, 'threat': 0.0023937696, 'sexual_explicit': 0.058671534}
{'toxicity': 0.00089999853, 'severe_toxicity': 1.5985268e-05, 'obscene': 0.000108549386, 'identity_attack': 0.00012365123, 'insult': 0.00023804733, 'threat': 3.0528885e-05, 'sexual_explicit': 2.781837e-05}
{'toxicity': 0.99378043, 'severe_toxicity': 0.046788186, 'obscene': 0.08628249, 'identity_attack': 0.02743811, 'insult': 0.07973734, 'threat': 0.912243, 'sexual_explicit': 0.098065615}

```

These results show that:
- The first sentence is toxic and insulting.
- The second sentence is not toxic.
- The third sentence is toxic, obscene, and insulting.
- The fourth sentence is not toxic.
- The last sentence is toxic and threatening.

We can integrate this model into the gradio app to make it more user-friendly.

### Deploying the model as an application using Gradio
Gradio is a Python library that allows us to implement a user interface for your machine learning model quickly. In this tutorial, we will use it to create a user interface where a user can input a sentence, and the model will output a sentence telling the user whether the sentence is toxic.

Let's begin by installing Gradio into our notebook. We do this by performing a quick `pip` install.

```python
!pip install gradio
```

After installing it, we import it into our model to use inside our code as `gr`. This means that we will be referring to the gradio app as `gr` and not by its full name inside our code. This makes our code cleaner.

```python
import gradio as gr
```

We will now write a single Python function `classify` that we want our gradio app to run on.

```python
def classify(sentence):
    results = predictor.predict(sentence)
    print (results)
```

We first need to define our inputs. We save them in a variable called `toxicity_inputs`.

```python
toxicity_inputs = gr.inputs.Textbox(lines=3, placeholder="Enter sentence to know its toxicity...")
```

Using the `Interface()` method, we'll need to pass in several arguments to get the Gradio app to work. The function, `fn`, `inputs`, `outputs`, and `title`. We store these results in a variable known as `interface`.

```python
interface = gr.Interface(fn=classify, 
                        inputs=toxicity_inputs,
                        outputs='text',
                        title='Toxicity Classifier')
```

To launch our Gradio app, we use the `launch()` method to open our app on the terminal. You can use the link generated to open the app on the browser.

```python
interface.launch()
```

![Gradio](/engineering-education/building-a-toxicity-classifier/gradio.png)

We have successfully built a multi-lingual toxicity classifier using Gradio. Please find the code for this tutorial [here](https://colab.research.google.com/drive/1aSBPqXQ4fXO2qDVj9im6xrhj5AHXtnlz?usp=sharing).

### Wrapping up
As we've seen, it's really simple to create your toxicity classifier. Of course, this is not meant to be used in a production scale application, but it gives you the basics of open-source models you can use to build yours. Feel free to read the documentation further in the reference section below. 

I hope you enjoyed this tutorial.

Happy coding!

### References
- [Toxicity classifier](https://github.com/tensorflow/tfjs-models/tree/master/toxicity)
- [Dataset](https://www.kaggle.com/c/jigsaw-multilingual-toxic-comment-classification)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
