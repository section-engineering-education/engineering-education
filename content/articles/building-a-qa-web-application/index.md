Question-Answering Web Apps have been around for a while now. A good example is the use of bots on websites where a user asks a question and an answer is automatically generated. In this build, we will show our readers how to build a Q&A app using one of the pre-trained models on [HuggingFace](https://huggingface.co/). 
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
- [Conclusion](#conclusion)
- [Reference](#reference)

### Installing and importing dependencies
The first dependency that we will install is PyTorch.

```bash
!pip3 install torch==1.10.2+cu113 torchvision==0.11.3+cu113 torchaudio==0.10.2+cu113 -f https://download.pytorch.org/whl/cu113/torch_stable.html
```
The next dependency that we will install is Transformers. Transformers is the NLP library that will allow us to use the model from HuggingFace.

```bash
!pip install transformers
```
Those are the two main dependencies that we will use in this tutorial. Let's go ahead and import the tokenizer, pipeline, and model from transformers.

```python
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline
```
- The `AutoTokenizer` allows us to convert natural language into tokens which can then be used by the NLP model.
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

```python
random_text = """
Machine learning (ML) is the study of computer algorithms that can improve automatically through experience and by the use of data. 
It is seen as a part of artificial intelligence. Machine learning algorithms build a model based on sample data, known as training data, to make predictions or decisions without being explicitly programmed to do so. 
Machine learning algorithms are used in a wide variety of applications, such as in medicine, email filtering, speech recognition, and computer vision, where it is difficult or unfeasible to develop conventional algorithms to perform the needed tasks.
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
The model seems to be giving us the right answers by simply fetching context from the paragraph. This is so nice! We could take this a step further a build a web application that enables users to interact with the model easily. This is where Anvil comes in handy.

### Integrating the model with Anvil app
[Anvil](https://anvil.works/) is a platform for building full-stack web apps entirely in Python. It makes it easy to build and deploy full-stack machine learning apps. It is easy-to-use and open-source. We will use the framework for this build.

To use it, head on to their website and click on the `start building` button on the top-right corner of the webpage. Of course, you'll need to sign up to access the app. If you already have your logins, you can go ahead and log in. If you don't, you can sign up then log in. It is free.

On successful login, create a new blank app. You'll be prompted to choose the theme of your choice. We selected the `Material Design theme` for this build.

If you've ever used WordPress before with its drag and drop feature, building the front-end is quite similar. 

Here's the design we came up with:

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1pQ5laoIMBXXZcx2HIxHncXefEgtqJ4uo?usp=sharing).


### References
- [Anvil](https://anvil.works/)
- [Model](https://huggingface.co/deepset/roberta-base-squad2)