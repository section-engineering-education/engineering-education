Intent classification is the process of categorizing a given text data based on the intentions and goals of a customer. Intent classification uses the concept of machine learning and natural language understanding to categorize texts or sentences with different intents. For example, a machine learning model can learn that a word such as "where is the best place to buy the television" is associated with the intent to acquire something. Another statement is as follows "where can I find a place to eat" is associated with an intent of finding a restaurant or a hotel.

In a [conversational AI](https://www.interactions.com/conversational-ai/) model, intent refers to the responses that can be given to a customer after typing in a question. In the first example, the model will respond with the best places that sell television, in the second example, the model will respond with the available restaurants or hotels.

Intent classification is an essential component of chatbots in giving the correct answers when a question is posted. This helps to increase sales of a given business and helps in the customer conversation. This is greatly applied in many chatbot systems to engage customers through personalized conversations, this helps in knowing the needs of each customer.

In this tutorial, we will use Rasa and Spacy to build our intent classifier. Rasa is a library used for building AI chatbots using Python and [natural language understanding (NLU)](https://en.wikipedia.org/wiki/Natural-language_understanding). We use Spacy for advanced natural language processing and it is used to run backend operations.

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
2. A good working knowledge of [machine learning](/engineering-education/house-price-prediction/).
3. Download the dataset [here](https://drive.google.com/file/d/1gNRMieWZuiMUJwIsPxwU8TaHCvXM7vST/view?usp=sharing).
4. Have some knowledge of [natural language processing.](https://en.wikipedia.org/wiki/Natural_language_processing)
   > NOTE: To follow along easily, use [Google Colab](https://research.google.com/) in building your model.

### Introduction

Intent classification uses a concept of natural language understanding (NLU). Natural language understanding(NLU) is a subset of natural language processing(NLP) that focuses on machine reading comprehension through checking the grammar and context in which a word is used, enabling it to determine the intended meaning of a given sentence. This is why it is used for intent classification.

On the other hand, natural language processing is just focused on processing a text without finding the context or the meaning of the text.

The image below shows examples of Natural Language Processing(NLP) and Natural Language Understanding(NLU).
![NLP-vs-NLU](/engineering-education/intent-classification-with-rasa-and-spacy/nlp-vs-nlp.png)

In this tutorial, we train our model using a sample test example. Our sample dataset will contain various texts and the intent they belong to.

Before we begin, let's install these libraries.

### Installing Rasa and Spacy

Let's start with Rasa.

Since we are using Google Colab, let's run this command.

```python
!pip install rasa_nlu
```

Let's install Spacy.

```python
!pip install -U spacy
```

### Dataset used

The dataset is used in a JSON format. It contains a list of text and the intent they belong to as shown below.
![Dataset used](/engineering-education/intent-classification-with-rasa-and-spacy/dataset.jpg).

In the above image, we have intents such as `restaurant_search`, `affirm`, `location`, and `food`. This sample JSON dataset will be used to train our model, this conversational AI model will be used to answer questions related to searching for restaurants.
It also gives the location of this restaurant, and the type of food being offered such as `Indian`, `Chinese`, `Italian` and `African fusion`. This will provide a personalized conversation.

To get the JSON file click [here](https://drive.google.com/file/d/1gNRMieWZuiMUJwIsPxwU8TaHCvXM7vST/view?usp=sharing)

After downloading the dataset file, name the file as `rasa-dataset.json`.

### Importing packages

We have to import the following.

```python
from rasa_nlu.training_data  import load_data
from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Trainer
from rasa_nlu import config
```

In the above code, we have imported the following packages.

#### load_data

It is used to load the JSON file dataset into our machine. This dataset is used to train our model, this will help our model to understand the pattern and use it for predictive analysis.

#### RasaNLUModelConfig

This is used to store the best-configured model parameters. Rasa finds the best parameters for our model, these parameters give the highest accuracy for our model and gives the best prediction.

#### Trainer

It's used to train our model using the loaded dataset. Through training, our model will be able to recognize patterns and be able to make predictions.

#### config

This is used to configure Spacy which is used to run the backend of our model.

We now load the dataset to train our model.

### Loading dataset

We load our dataset using the `load_data` method.

```python
train_data = load_data('rasa-dataset.json')
```

### Configure backend using Spacy

We configure our backend using Spacy, an open-source library used to perform natural language processing.

We configure our model using a `yaml` file. This is the sample `yaml` file used.

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

We specify the language used which is English.

#### Pipeline stages

The pipeline is used to automate the machine learning process, this makes the process of building a machine learning model easier and faster.

We name the file as `config_spacy.yaml`. Load this saved file into our program as follows.

```python
trainer = Trainer(config.load("config_spacy.yaml"))
```

We load the saved `yaml` file using the `Trainer` method. We also use`config.load()` so that the file is added with all the set parameters and the pipeline stages.

After loading our data and setting the pipeline stages we are ready to train our model.

### Model training

We train our model using the `trainer.train` method and pass in `train_data`, this will enable the model to be able to learn from the dataset.

```python
trainer.train(train_data)
```

The output after training is as shown.

```bash
Fitting folds for each candidates, totalling the fits
[Parallel(n_jobs=1)]: Done  12 out of  12 | elapsed:    0.3s finished
<rasa_nlu.model.Interpreter at 0x2801960c668>
```

In the output, we fit the model into our dataset. It also shows we have a total of `1` job running and which is completed after `0.3s`. This shows that our model is successfully trained.

After training the model we need to save it into a folder. We shall save the model into a folder named `projects`. This is done using the `persist` method that stores the model into the specified folder.

```python
model_directory = trainer.persist('/projects/')
```

### Entity extraction with SpaCy

Entity extraction identifies the elements and characteristics from a text, it then classifies them into a predefined group or category which are the intents in our dataset. The intents in our dataset are as follows.

#### greet

It is used to categorize statements that are related to greetings.

#### affirm

It is used to describe positive statements and sentences.

#### restaurant_search

This involves statements that involve searching for the best restaurants or a place to eat.

#### Type of food

This shows the available food category such as India, Italian, Mexican and African fusion.

#### Location

This shows where a given restaurant is located.

#### goodbye

This shows texts with goodbye messages.

We need to categorize our input text into these available intents. To start let's import Spacy.

```python
import spacy
nlp = spacy.load('en')
```

We import Spacy which we will be using for entity extraction, we also specify the language used which is English.

Loading a sample text.

```python
docx = nlp(u"I am looking for an Italian Restaurant where I can eat")
```

We then loop through the above text to get all the available entities in the text.

```python
for word in docx.ents:
    print("value",word.text,"entity",word.label_,"start",word.start_char,"end",word.end_char)
```

The above code loops through the text and prints the entities found in the text. We specify where we want to start the extraction using `start` and where we want to finish the extraction using `end`.

The output after extraction is as shown.

```bash
value Italian entity NORP start 20 ends 27
```

The above output has extracted `Italian which is a type of food.

### Making predictions with the model

We use our model to see if that can be able to classify a text into an intent.

```python
from rasa_nlu.model import Interpreter
```

We use `Interpreter` to make predictions.

To make a prediction, we load a sample text. The `interpreter.parse()` method is used to read our input the text.

```python
interpreter.parse("I am looking for an Italian Restaurant where I can eat")
```

The output is shown.

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

In the above output, the model has been able to classify the text into the intent of `restaurant_search`. The model also tried to check all the other available intents but `restaurant_search` gave a higher `confidence` or accuracy score of `0.7455215289019911`, which is `74.5%` accurate.

The other intents gave the following accuracies.

#### affirm intent

It gave a `confidence` of `0.15019642212447237` which is `15.02%` accurate.

#### greet intent

It gave a `confidence` of `0.058736824115844515` which is `5.87%` accurate.

#### goodbye intent

It gave a `confidence` of `0.045545224857692024` which is `4.55%` accurate.

When we compare all the accuracy scores the `restaurant_search` gave a higher accuracy score of `74.5%`, that's why it is chosen.

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

This shows that our model can be able to accurately classify texts into the right intents.

### Conclusion

In this tutorial, we have learned about intent classification using Rasa and Spacy. We started defining intent classification and how it is important when building conversational AI models. We then learned the difference between natural language processing and natural language understanding, Rasa uses natural language understanding in building our model.

We then installed the packages used, from here we explored the dataset used in training our model, the dataset used is in form of a JSON file. We then started building our model, model building involves training our model using the dataset, this trained model is then saved in a folder.

Finally, we used the trained model to make predictions. Our model was able to classify various texts into the right intent.

#### References

- [Implementation for this tutorial](https://colab.research.google.com/drive/1LOzj5ge0Xipk4qwJthwiy3zp_vfLQLfm?usp=sharing)
- [Rasa documentaion](https://rasa.com/)
- [Spacy documentation](https://spacy.io/)
- [Getting started with intent classification](https://monkeylearn.com/blog/intent-classification/)
- [Getting started with entity extraction](https://www.telusinternational.com/articles/the-essential-guide-to-entity-extraction)
- [Natural language processing vs natural language understanding](https://www.bmc.com/blogs/nlu-vs-nlp-natural-language-understanding-processing/)
