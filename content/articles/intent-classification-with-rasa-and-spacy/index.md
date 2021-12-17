---
layout: engineering-education
status: publish
published: true
url: /intent-classification-with-rasa-and-spacy/
title: Intent Classification with Rasa and Spacy
description: This article will show you how to classify text intents using Rasa and Spacy. These tools are useful in machine learning and natural language processing.
author: kelvin-kimani-ngure
date: 2021-10-05T00:00:00-02:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

   - url: /engineering-education/intent-classification-with-rasa-and-spacy/hero.jpg
     alt: Intent Classification with Rasa and Spacy Hero Image
---
Java Virtual Machine (or JVM) allows a computer to interpret or run Java programs. It acts as a compiler for generating machine code. All Java programs require a Runtime Environment. 
<!--more-->

Intent classification is the automated categorization of text data based on customer goals. 

Intent classification uses the concept of machine learning and natural language understanding to categorize texts or sentences with different intents.

For example, a machine learning model can learn that a sentence such as "where is the best place to buy a television" is associated with the intent to purchase. 

Another example can be "where can I find a place to eat" which is associated with an intent of finding a restaurant or a hotel.

In a [conversational AI](https://www.interactions.com/conversational-ai/) model, an intent refers to the responses given to a customer after typing in a question. 

In the first example, the model will respond with the best places that sell television. In the second example, the model will highlight the available restaurants or hotels.

Intent classification is an essential component of chatbots.It allows these technologies to provide accurate answers when questions are posted. 

This helps to increase sales, as well as customer management. Most chatbot systems are used to engage customers through personalized conversations.

In this tutorial, you will use Rasa and Spacy to build the intent classifier. Rasa is a library used for building AI chatbots using Python and [natural language understanding (NLU)](https://en.wikipedia.org/wiki/Natural-language_understanding). 

You will use Spacy for advanced natural language processing and backend operations.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Installing Rasa and Spacy](#installing-rasa-and-spacy)
- [Dataset used](#dataset-used)
- [Importing packages](#importing-packages)
- [Loading dataset](#loading-dataset)
- [Configure backend using Spacy](#configure-backend-using-spacy)
- [Model training](#model-training)
- [Entity extraction with SpaCy](#entity-extraction-with-spacy)
- [Making predictions with the model](#making-predictions-with-the-model)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
1. A good understanding of [Python](/engineering-education/python-projects-for-beginners/).
2. Some basic knowledge of [machine learning](/engineering-education/house-price-prediction/).
3. Download the dataset [here](https://drive.google.com/file/d/1gNRMieWZuiMUJwIsPxwU8TaHCvXM7vST/view?usp=sharing).
4. Have some knowledge of [natural language processing.](https://en.wikipedia.org/wiki/Natural_language_processing)
   
> NOTE: To follow along easily, use [Google Colab](https://research.google.com/) in building the model.

### Introduction
Intent classification uses a concept of natural language understanding (NLU). 

Natural Language Understanding (NLU) is a subset of Natural Language Processing (NLP) that focuses on machine reading comprehension through checking the grammar and context in which a word is used.

This enables it to determine the intended meaning of a given sentence. This is why it is used for intent classification.

On the other hand, NLP focuses on processing a text without finding the context or the meaning of the text.

The image below shows examples of Natural Language Processing (NLP) and Natural Language Understanding(NLU).

![NLP-vs-NLU](/engineering-education/intent-classification-with-rasa-and-spacy/nlp-vs-nlp.png)

In this tutorial, you train the model using a sample test example. The sample dataset will contain various texts and the intent they belong to.

Before you begin, install the following libraries.

### Installing Rasa and Spacy
Let's start with Rasa.

Since you are using Google Colab, run this command to install Rasa.

```python
!pip install rasa_nlu
```

To install Spacy run this command.

```python
!pip install -U spacy
```

### Dataset used
The dataset is used in a JSON format. It contains a list of text and the intent they belong to, as shown below.

![Dataset used](/engineering-education/intent-classification-with-rasa-and-spacy/dataset-used.jpg).

In the image above, you have intents such as `restaurant_search`, `affirm`, `location`, and `food`. 

This sample JSON dataset will be used to train the model. The conversational AI model will be used to answer questions related to restaurants.

It also gives the location of this restaurant, and the type of food being offered such as `Indian`, `Chinese`, `Italian` and `African fusion`. This will provide a personalized conversation.

To get the JSON file click [here](https://drive.google.com/file/d/1gNRMieWZuiMUJwIsPxwU8TaHCvXM7vST/view?usp=sharing)

After downloading the dataset file, name the file as `rasa-dataset.json`.

### Importing packages
You have to import the following packages:

```python
from rasa_nlu.training_data import load_data
from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Trainer
from rasa_nlu import config
```

Let's understand the above libraries:

#### load_data
It is used to load the JSON file dataset into the machine. This dataset is used to train the model.

This will help the model to understand the pattern and use it for predictive analysis.

#### RasaNLUModelConfig
This library is used to store the best-configured model parameters. Rasa finds the best parameters for the model

These parameters give the highest accuracy for the model, as well as the best prediction.

#### Trainer
It's used to train the model using the loaded dataset. The training allows the model to recognize patterns and make predictions.

#### Config
This library is used to configure Spacy which is used to run the backend of the model.

You now load the dataset to train the model.

### Loading dataset
You load the dataset using the `load_data` method.

```python
train_data = load_data('rasa-dataset.json')
```

### Configure backend using Spacy
We will configure the backend using Spacy. This is an open-source library used to perform natural language processing.

You configure the model using a `yaml` file. This is the sample `yaml` file used.

```yaml
language: "en"
pipeline: "spacy_sklearn"

=======================

language: "en"

pipeline:
- name: "nlp_spacy"
- name: "tokenizer_spacy"
- name: "intent_entity_featurizer_regex"
- name: "intent_featurizer_spacy"
- name: "ner_crf"
- name: "ner_synonyms"
- name: "intent_classifier_sklearn"
```

The `yaml` file contains the following:

#### Language used
You specify the language used which is English.

#### Pipeline stages
The pipeline is used to automate the machine learning process. This makes the process of building a machine learning model easier and faster.

You name the file as `config_spacy.yaml`. Load this saved file into the program as follows:

```python
trainer = Trainer(config.load("config_spacy.yaml"))
```

You load the saved `yaml` file using the `Trainer` method.

You then use the `config.load()` function to add the set parameters and the pipeline stages.

We are now ready to train the model.

### Model training
You train the model using the `trainer.train` method and pass in `train_data`. This will enable the model to learn from the dataset.

```python
trainer.train(train_data)
```

The training output is, as shown below:

```bash
Fitting folds for each candidates, totalling the fits
[Parallel(n_jobs=1)]: Done  12 out of  12 | elapsed:    0.3s finished
<rasa_nlu.model.Interpreter at 0x2801960c668>
```

In the output above, you fit the model into the dataset. It also shows that you have a total of `1` job running and was completed after `0.3s`. This notifies that you have finished training the model.

After training the model, you need to save it into a folder. You will save the model into a folder named `projects`. 

This is done using the `persist` method that stores the model into the specified folder.

```python
model_directory = trainer.persist('/projects/')
```

### Entity extraction with SpaCy
Entity extraction identifies the elements and characteristics from a text. It then classifies them into a predefined group or category which are intents in the dataset. 

The intents in the dataset are as follows:

#### greet
It is used to categorize statements that are related to greetings.

#### affirm
It is used to describe positive statements and sentences.

#### restaurant_search
This involves statements that involve searching for the best restaurants or a place to eat.

#### Type of food
This shows the available food category such as Indian, Italian, Mexican, and African Fusion.

#### Location
This shows where a given restaurant is located.

#### goodbye
This shows texts with goodbye messages.

You need to categorize the input text into these available intents. To start, import Spacy, as demonstrated below:

```python
import spacy
nlp = spacy.load('en')
```

You import Spacy which you will be using for entity extraction, you also specify the language used which is English.

Loading a sample text.

```python
docx = nlp("I am looking for an Italian Restaurant where I can eat")
```

You then loop through the text above to get all the available entities in the text.

```python
for word in docx.ents:
    print("value",word.text,"entity",word.label_,"start",word.start_char,"end",word.end_char)
```

The code above loops through the text and prints the entities found in the text. 

You specify where you want to start the extraction using `start` and where you want to finish the extraction using `end`.

The extraction output is, as shown below:

```bash
value Italian entity NORP start 20 ends 27
```

The output above has extracted `Italian` which is a type of food.

### Making predictions with the model
You use the model to check if it can classify a text into an intent.

```python
from rasa_nlu.model import Interpreter
```

You use `Interpreter` to make predictions.

To make a prediction, you need to load a sample text. The `interpreter.parse()` method is used to read the input text.

```python
interpreter.parse("I am looking for an Italian Restaurant where I can eat")
```

The output is as shown.

```bash
{'intent': {'name': 'restaurant_search', 'confidence': 0.7455215289019911},
 'entities': [{'start': 20,
   'end': 27,
   'value': 'italian',
   'entity': 'cuisine',
   'confidence': 0.6636828413532201,
   'extractor': 'ner_crf'}],
 'intent_ranking': [{'name': 'restaurant_search',
   'confidence': 0.7455215289019911},
  {'name': 'affirm', 'confidence': 0.15019642212447237},
  {'name': 'greet', 'confidence': 0.058736824115844515},
  {'name': 'goodbye', 'confidence': 0.045545224857692024}],
 'text': 'I am looking for an Italian Restaurant where I can eat'}
```

In the output above, the model has been able to classify the text into the intent of `restaurant_search`. 

The model also tried to check all the other available intents but `restaurant_search` gave a higher `confidence` or accuracy score of `0.7455215289019911`. This score is `74.5%` accurate.

The other intents gave the following accuracies:

#### affirm intent
It gave a `confidence` of `0.15019642212447237` which is `15.02%` accurate.

#### greet intent
It gave a `confidence` of `0.058736824115844515` which is `5.87%` accurate.

#### goodbye intent
It gave a `confidence` of `0.045545224857692024` which is `4.55%` accurate.

When you compare all the accuracy scores above, the `restaurant_search` gave a higher accuracy score of `74.5%`, that's why it is chosen.

Let's try another prediction.

#### Second prediction

```python
interpreter.parse("Good morning World")
```

The output is shown.

```bash
{'intent': {'name': 'greet', 'confidence': 0.44328419685532383},
 'entities': [],
 'intent_ranking': [{'name': 'greet', 'confidence': 0.44328419685532383},
  {'name': 'goodbye', 'confidence': 0.31245698090344237},
  {'name': 'affirm', 'confidence': 0.1257434275305043},
  {'name': 'restaurant_search', 'confidence': 0.11851539471072912}],
 'text': 'Good morning World'}
```

The `intent` is chosen because it has a higher accuracy score of `0.443` as compared to other intents of `0.312`, `0.1257`, and `0.1185`.

This shows that the model can accurately classify texts into the right intents.

### Conclusion
In this tutorial, you have learned about intent classification using Rasa and Spacy. You started by defining intent classification and its importance in building conversational AI models.

You also learned the difference between natural language processing and natural language understanding. Rasa uses natural language understanding in building the model.

You then installed all the packages needed for intent classification and created the training model.

Finally, you used the trained model to make predictions. The model was able to classify various texts into the right intents.

#### References
- [Implementation for this tutorial](https://colab.research.google.com/drive/1LOzj5ge0Xipk4qwJthwiy3zp_vfLQLfm?usp=sharing)
- [Rasa documentation](https://rasa.com/)
- [Spacy documentation](https://spacy.io/)
- [Getting started with intent classification](https://monkeylearn.com/blog/intent-classification/)
- [Getting started with entity extraction](https://www.telusinternational.com/articles/the-essential-guide-to-entity-extraction)
- [Natural language processing vs natural language understanding](https://www.bmc.com/blogs/nlu-vs-nlp-natural-language-understanding-processing/)

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)