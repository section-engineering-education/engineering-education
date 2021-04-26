---
layout: engineering-education
status: publish
published: true
url: /engineering-education/prototyping-machine-learning-models-with-streamlit/
title: Prototyping Machine learning models with Streamlit
description: Most times machine learning engineers build models and will need to build a web or mobile app to prototype their models which is another stress on its own, this tutorial will show readers how to quickly prototype their ML models on web applications easily.
author: james-sandy
date: 2020-11-13T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/prototyping-machine-learning-models-with-streamlit/hero.jpg
    alt: machine learning Streamlit example image
---
Are you a machine learning engineer or data scientist? Are the models you have built not served on an application because you do not know how to build a web or mobile application?
<!--more-->
Do you find the process cumbersome, find yourself saving your model weights, and that's all? **Streamlit** is a platform that lets you prototype your model(s) with very few lines of code and technical know-how.
### Table of Contents
1. Introduction to Streamlit
2. Streamlit Setup
3. Building Sentiment Analyzer
4. Conclusion

### Introduction to Streamlit
Streamlit is an open-source Python framework that enables developers to prototype their ML models on web applications. You can turn your data science scripts into a website with few code lines, saving development time and energy. We’ll dive straight into the installation, setup, and deployment of a text summarizer web app.

#### Streamlit Set up
The installation is straightforward; just run this code snippet below in your command prompt or terminal.

```python
pip install streamlit
streamlit hello
```

To import it, use the following code:

```python
import streamlit as st
```

And to run your streamlit app use.

```python
streamlit run app.py
```

### Building Sentiment Analyzer
In this tutorial, we build a sentiment analyzer model and deploy it with Streamlit. The first step will be to get a dataset that can we download at this [link](https://drive.google.com/drive/folders/1wk0hkrRhxe6t5g390g5V5O-CUcRB6BZC?usp=sharing). Next, let’s create a directory and create a virtual environment. To do that, open your terminal or command prompt and type in the code below.

```python
$ mkdir textanalyzer
$ cd textanalyzer
```

To create a virtual environment, we use the code below. This is to isolate the code environment and avoid errors due to libraries' inter-dependencies.

```python
$ python3.8 -m venv env
$ source env/bin/activate
```

The first line of code creates the virtual environment while the second activates it. Now copy the dataset as it is in the folder and paste it into this `textanalyzer` directory. Create a file and save it as *sentiment_analyzer.py*.

This will be where we will be writing our code to build the Streamlit app. The next thing will be to import all the packages we'll be using for this tutorial.

```python
import streamlit as st
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import BernoulliNB
from sklearn.metrics import confusion_matrix
import numpy as np
import itertools
import matplotlib.pyplot as plt
```

After that, let’s add a header for our web app and a subheader, and to do that, we use the code below.

```python
st.title("Sentiment Analyzer Based On Text Analysis ")
st.subheader("Paras Patidar - MLAIT")
st.write('\n\n')
```

The next step will be to write a function that will get all the data from our directory and bring them up.

Your directory should look like this:

![Simple](/engineering-education/prototyping-machine-learning-models-with-streamlit/img1.jpg)

```python
@st.cache
def get_all_data():
 root = "Datasets/"
 with open(root + "imdb_labelled.txt", "r") as text_file:
     data = text_file.read().split('\n')
 with open(root + "amazon_cells_labelled.txt", "r") as text_file:
     data += text_file.read().split('\n')
 with open(root + "yelp_labelled.txt", "r") as text_file:
     data += text_file.read().split('\n')
 return data
```

Notice the code snippet @st.cache in the first line. This tells Streamlit that whenever the function is called, some requirements should be fulfilled.

Create a new variable called all_data. all_data calls the function get_all_data we defined earlier.

```python
all_data = get_all_data()
```

Next, we create a checkbox using the `st.checkbox` function to display the dataset. The checkbox should have the values from the `all_data` variable we created earlier.

```python
if st.checkbox('Show Dataset'):
 st.write(all_data)
```

Now we write another function that will carry out data preprocessing, and to achieve that, we use the code below.

```python
@st.cache
def preprocessing_data(data):
 processing_data = []
 for single_data in data:
     if len(single_data.split("\t")) == 2 and single_data.split("\t")[1] != "":
         processing_data.append(single_data.split("\t"))
 return processing_data

```

Now let’s create another checkbox that will display `show_preprocessed_data` and will get the data from the *all_data* function. The `all_data` function will then pass it through the preprocessing data function we wrote above.

```python
if st.checkbox('Show PreProcessed Dataset'):
 st.write(preprocessing_data(all_data))
```

The next step will be writing a function that will split the data and call it `split_data`

```python
@st.cache

def split_data(data):
 total = len(data)
 training_ratio = 0.75
 training_data= []
 evaluation_data = []
 for indice in range(0,total):
     if indice<total*training_ratio:
         training_data.append(data[indice])
     else:
         evaluation_data.append(data[indice])
 return training_data, evaluation_data

```

Now we're going to create two functions. One will be `preprocessing_step` that will get the data, preprocess it, and then split it. The second one will be `training_step` that will receive two parameters and vectorize the training text.

```python
@st.cache
def preprocessing_step()
 data = get_all_data()
 processing_data = preprocessing_data(data)
 return split_data(processing_data)
def training_step(data,vectorizer):
 training_text = [data[0] for data in data]
 training_result = [data[1] for data in data]
 training_text = vectorizer.fit_transform(training_text)
 return BernoulliNB().fit(training_text,training_result)
```

The next step will be passing the training and evaluation data into the "preprocessing_step" function, then choosing a "vectorizer" (in this case, we will be using `CountVecotizer`) and finally a 'classifier" variable.

The "Classifier" variable will call the "training_step" function and pass in the "training_data" and vectorizer.

The last line uses `BernoulliNB,` a Naive Bayes model; it predicts the probability of the input being classified for all the classes and is used for text classification with the 'Bag of Words' model.

Finally, we fit our "training_text" and "training_result" into it.

```python
training_data,evaluation_data = preprocessing_step()
vectorizer = CountVectorizer(binary='true')
classifier = training_step(training_data,vectorizer)
```

After carrying out the above step, the next step will be to write two functions.

The first will be `analyze_text,` and it will carry out the analysis by taking in the classifier, vectorizer, and text value.

The second function will be called `print_result` and will send a result as positive or negative.

```python
def analyse_text(classifier,vectorizer,text):
 return text,classifier.predict(vectorizer.transform([text]))
def print_result(result):
 text,analysis_result = result
 print_text = "Positive" if analysis_result[0]=='1' else "Negative"
 return text,print_text
```

Now it’s time for us to continue building the interface. We will need an input form, button, and output textbox.

```python
review = st.text_input("Enter The Review","Write Here...")
if st.button('Predict Sentiment'):
 result = print_result(analyse_text(classifier,vectorizer,review))
 st.success(result[1])
else:
 st.write("Press the above button..")
```

The codes above use Streamlit `st.text_input` to create a text input form that will display “enter the review, write here,” and the if `st.button` will create a button that will display “predict sentiment”. The variable result then calls the *print_result* function and passes in the parameters.

If the whole process is successful, the st.success(result[1) displays the result else, it passes an error message asking the user to press the button above. Run your app using the command below.

```python
streamit run sentiment_analyzer.py
```

This is what you should run on your terminal.

![Simple](/engineering-education/prototyping-machine-learning-models-with-streamlit/img2.jpg)

And your application should look like this:

![Simple](/engineering-education/prototyping-machine-learning-models-with-streamlit/img3.jpg)

### Conclusion
If you have followed the process, you will see how fun and easy it is to prototype your machine learning models with Streamlit and save yourself a lot of stress. You can explore more advanced examples and take this project forward by deploying it on Heroku or any other hosting platform.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
