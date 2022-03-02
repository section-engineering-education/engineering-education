---
layout: engineering-education
status: publish
published: true
url: /building-a-qa-web-application/
title: How to build a Q&A web application using Python and Anvil
description: This tutorial will help the reader understand how to build a Q&A app using one of the pre-trained models on HuggingFace.
author: lilian-cheptoo
date: 2022-02-21T00:00:00-11:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-qa-web-application/hero.png
    alt: Q&A web application using Python and Anvil Hero image
---
Question-Answering web apps have been around for a while now. A good example is the use of bots on websites where a user asks a question, and an answer is generated automatically.
<!--more-->
In this build, we will show our readers how to build a Q&A app using one of the pre-trained models on [HuggingFace](https://huggingface.co/) and Anvil.

Anvil is an open-source web interface that allows a developer to spin up and deploy a web app using Python. It is quite similar to the popular [Gradio](https://gradio.app/) web application used by developers. We will leverage Anvil to build our front-end.

### Prerequisites
To follow along, you need to have:
- An understanding of Natural Language Processing.
- An understanding of Machine Learning modeling.
- Google Colab or Jupyter Notebook.

### Outline
- [Installing and importing dependencies](#installing-and-importing-dependencies)
- [Setup the deep learning NLP model](#setup-the-deep-learning-nlp-model)
- [Integrating the model with Anvil app](#integrating-the-model-with-anvil-app)
- [Connecting to Anvil](#connecting-to-anvil)
- [Setting up a callable function](#setting-up-a-callable-function)
- [Testing the app](#testing-the-app)
- [Conclusion](#conclusion)
- [References](#references)

### Installing and importing dependencies
The first dependency that we will install is PyTorch.

```bash
!pip3 install torch==1.10.2+cu113 torchvision==0.11.3+cu113 torchaudio==0.10.2+cu113 -f https://download.pytorch.org/whl/cu113/torch_stable.html
```
The next dependency that we will install is Transformers. It's the NLP library that will allow us to use the model from HuggingFace.

```bash
!pip install transformers
```
Those are the two main dependencies that we will use in this tutorial. Let's go ahead and import the tokenizer, pipeline, and model from transformers.

```python
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline
```
- The NLP model uses the `AutoTokenizer` to convert natural language into tokens.
- The `AutoModelForQuestionAnswering` allows us to load our model.
- The `pipeline` allows us to use the model.

We can now go ahead and set up our model.

### Setup the deep learning NLP model
Let's begin by creating the Q&A pipeline.

```python
model = 'deepset/roberta-base-squad2'

nlp_pipeline = pipeline('question-answering', model= model, tokenizer= model)
```
When you run the code above, it will download the model to your notebook.

> You don't have to use the same model we've used in this tutorial. We chose the `deepset/roberta-base-squad2` as it is the most popular. But, there are many Question Answering models on HuggingFace. Feel free to experiment with any other too.

To use this model, we'll need to pass in a dictionary. To this dictionary, we need to pass in two things. A question and some context.

We create a variable called `random_text` to hold some text randomly fetched from Wikipedia. We will pass this variable to the `context`.

```python
random_text = """
<To avoid plagiarism flags, please refer to the linked Google Colab URL to access the random text gotten from Wikipedia>
"""

QA_set = {
            'question':'What is machine learning?',
            'context': random_text
}
```
Let's go ahead and test this out in our pipeline.

```python
nlp_pipeline(QA_set)
```

Results:
```bash
{'answer': 'computer algorithms that can improve automatically through experience and by the use of data',
 'end': 131,
 'score': 0.06677386909723282,
 'start': 39}
```
Impressive right? Let's pass on another question.

```python
QA_set = {
            'question':'Where are machine learning algorithms used?',
            'context': random_text
}
```
Results:
```bash
{'answer': 'medicine, email filtering, speech recognition, and computer vision',
 'end': 509,
 'score': 0.27500787377357483,
 'start': 443}
```
The model seems to be giving us the answers by simply fetching context from the paragraph. This is good. We can take this a step further. We can build a web interface that enables users to interact with the model easily. This is where Anvil comes in handy.

### Integrating the model with Anvil app
[Anvil](https://anvil.works/) is a platform for building full-stack web apps entirely in Python. It makes it easy to build and deploy full-stack machine learning apps. It is easy-to-use and open-source. We will use the framework for this build.

To use it, head on to their website and click on the `start building` button on the top-right corner of the webpage. Of course, you'll need to sign up to access the app. If you already have your logins, you can go ahead and log in. If you don't, you can sign up then log in. It is free.

On successful login, create a new blank app. You'll be prompted to choose the theme of your choice. We selected the `Material Design theme` for this build.

If you've ever used WordPress before with its drag and drop feature, building the front-end is quite similar.

Here's the design we come up with:

![Design](/engineering-education/building-a-qa-web-application/design.jpg)

Now that we have our design ready, we need to head back to our Google Colab and connect to Anvil from there.

### Connecting to Anvil
We begin by installing the main dependency called `anvil-uplink`. It allows us to connect our Colab to the Anvil app.

```bash
!pip install anvil-uplink
```
As with the previous installs, we import it into our Colab.

```python
import anvil.server
```

The next step involves connecting to the Anvil server.

```python
anvil.server.connect('<Add your Anvil code here>')
```
The screenshot below shows you where you can get the anvil code on the app.

![Anvil code](/engineering-education/building-a-qa-web-application/uplink.jpg)

Click on the `Uplink` option. A pop-up will appear as shown below:

![Anvil server uplink](/engineering-education/building-a-qa-web-application/anvil-server-uplink.jpg)

Finally, you need to enable the `Enable the Anvil Server Uplink for this app` button to get the code.

When you run the code, you should see the message below showing that you have successfully connected to the server.

```bash
Connecting to wss://anvil.works/uplink
Anvil websocket open
Connected to "Default environment" as SERVER
```
Now, we need to set up a callable function that the Anvil app can call to talk to our Google Colab. Besides, our Colab will use the function to connect to the NLP model.

### Setting up a callable function
We begin by defining a decorator which tells the server that this is a callable function.

```python
@anvil.server.callable
```
Next, we'll define the function to connect to our NLP model.

```python
def question_answer(question_text, context_text):
    QA_set = {
            'question':question_text,
            'context': context_text
}
```
Let's run it through the NLP pipeline and store the results inside a variable called `results`.

```python
results = nlp(QA_set)
```
Finally, we return the `answer`. Keep in mind that the results are a dictionary with `answer`, `end`, `score`, and `start`. You can confirm that it returns a dictionary using `type(results)`.

```python
return results['answer']
```
On our Anvil app, on the code section, add the following function:

```python
 def primary_color_1_click(self, **event_args):
    input_text = self.input_text.text
    question_text = self.question_text.text

    result = anvil.server.call('question_answer', question_text, input_text)

    self.answer_text.text = result
```
This connects our model to the elements we created on the Anvil app.

### Testing the app
On the Anvil app, click the `Run` button. Pick any passage and paste it onto the input area. You can ask any question you would like the model to return an answer. Finally, click on the `ASK A QUESTION` button.

Here are our results:

![Results](/engineering-education/building-a-qa-web-application/results.jpg)

We have successfully built a Q&A web application.

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1pQ5laoIMBXXZcx2HIxHncXefEgtqJ4uo?usp=sharing). You can also access the Anvil Q&A web application [here](https://CQFZO3BMKH73MVY3.anvil.app/MK7W2ABMSJKEQQR2AB3RP73C)

### Conclusion
That's our Q&A web application built from scratch. It is relatively straightforward.

If you would like to deploy the web application to a wider audience, you can use the `Publish this app` option on the top-right corner of the Anvil app. It will generate a private link that you can show to your users or embed on your website.

Happy coding!

### References
- [Anvil](https://anvil.works/)
- [Model](https://huggingface.co/deepset/roberta-base-squad2)
- [Anvil Q&A web application](https://CQFZO3BMKH73MVY3.anvil.app/MK7W2ABMSJKEQQR2AB3RP73C)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
