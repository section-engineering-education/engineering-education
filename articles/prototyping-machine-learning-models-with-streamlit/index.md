title: Prototyping Machine learning models with streamlit
description: Most times machine learning engineers build models and will need to build a web or mobile app to prototype their models which is another stress on its own, this tutorial will show readers how to quickly prototype their ML models on web applications easily.

### Prototyping Machine learning models with Streamlit


![Simple](https://github.com/jamessandy/engineering-education/blob/new-article/articles/prototyping-machine-learning-models-with-streamlit/hero.jpg)

As Machine learning Engineers or Data scientist, you are used to building cool machine learning models but you are probably not familiar with building mobile or web apps, or the thought of building an application to serve your model is stressful because of the whole process of building either a web or mobile app so you just leave your model(s) on your notebook without using the weights. Streamlit is a platform that can help you prototype your model(s) in a few lines of code with less stress.
#### Tabel of Content
1. Introduction to streamlit
2. Streamlit setup
3. Building sentient analyzer
4. Conclusion 

#### Introduction to Streamlit
Streamlit is an Open source python framework that enables developers to demo or prototype their ML models and a lot more on a web application effortlessly, you can simply turn your data science scripts into a website with few lines of code. It saves time, energy, and is also simple to learn, use, and fast too. Now we’ll dive straight into how to install and setup streamlit and then build a text summarizer web app.

##### Streamlit Set up
The installation is very simple, just run this on your command prompt or terminal

```python
Pip install streamlit
Streamlit hello
```
To import it, use the simple

```python
import pandas as pd
import streamlit as st
import plotly.express as px
```
And to run your streamlit app simply use

```python
Streamlit run app.py
```
#### Building Sentiment Analyzer
Now for this introductory tutorial, we will be building a sentiment analyzer model and prototype it with streamlit. The first step will be getting a Dataset, and the dataset we will be using can be found HERE, next let’s create a directory and create a virtual environment.

```python
$ mkdir textanalyzer
$ cd textanalyzer
```
Now to create the Virtual environment use the code below

```python
$ python3.8 -m venv env
$ source env/bin/activate
```
Now copy the dataset as it is in the folder and paste it into this textanalyzer directory, now create a file and save it as sentiment_analyzer, this will be where we will be writing our code to build the streamlit app. The next thing will be to import all the packages we will be using for this tutorial.

```python
import streamlit as st
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import BernoulliNB
from sklearn.metrics import confusion_matrix
import numpy as np
import itertools
import matplotlib.pyplot as plt
```
After that let’s add a header for our web app and a subheader and to do that we simply use the code below

```python
st.title("Sentiment Analyzer Based On Text Analysis ")
st.subheader("Paras Patidar - MLAIT")
st.write('\n\n')
```
The next step will be to write a function that will get all the data from our directory and bring them up,

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
If you notice in the function above the first line is *@st.cache*, this mark tells streamlit that whenever the function is called that there are some certain requirements it should check for and they should be met, now create a variable called all_data which should call the *get_all_data* function we just wrote.

```python
all_data = get_all_data()
```
Next, we create a checkbox using the *st.checkbox* function that will display Show dataset and this checkbox should have the value from the *all_data* variable we created earlier.

```python
if st.checkbox('Show Dataset'):
    st.write(all_data)
```
Now we write another function that will carry out data preprocessing and to achieve that we use the code below.

```python
@st.cache
def preprocessing_data(data):
    processing_data = []
    for single_data in data:
        if len(single_data.split("\t")) == 2 and single_data.split("\t")[1] != "":
            processing_data.append(single_data.split("\t"))

    return processing_data
```

Now let’s create another checkbox that will display *show_preprocessed_data* and will get the data from the *all_data* function and pass it through the preprocessing data function we wrote above. 
```python
if st.checkbox('Show PreProcessed Dataset'):
    st.write(preprocessing_data(all_data))
```

The next step will be writing a function that will split the data and call it *split_data*

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

Now we are going to create two functions, one will be *preprocessing_step* that will get the data, preprocess it, and then split it, and the second one will be *training_step* that will receive two parameters and vectorize the training text.

```python
@st.cache
def preprocessing_step():
    data = get_all_data()
    processing_data = preprocessing_data(data)
    return split_data(processing_data)

def training_step(data,vectorizer):
    training_text = [data[0] for data in data]
    training_result = [data[1] for data in data]
    training_text = vectorizer.fit_transform(training_text)

    return BernoulliNB().fit(training_text,training_result)
```
The next step will be passing the training and evaluation data into the *preprocessing_step* function, choosing a vectorizer( In this case we will be using CountVecotizer), and finally, a classifier variable that will call the *training_step* function and pass in the training_data and vectorizer.

```python
training_data,evaluation_data = preprocessing_step()
vectorizer = CountVectorizer(binary='true')
classifier = training_step(training_data,vectorizer)
```
After carrying out the above step the next step will be writing two functions, the first will be *analyze_text* and it will carry out the analysis by taking in the classifier, vectorizer, and text value, and the second function will be called *print_result* and will send a result as positive or negative.

```python
def analyse_text(classifier,vectorizer,text):
    return text,classifier.predict(vectorizer.transform([text]))

def print_result(result):
    text,analysis_result = result
    print_text = "Positive" if analysis_result[0]=='1' else "Negative"
    return text,print_text
```
Now it’s time for us to continue building the interface, we will simply need an input form, button, and output textbox.

```python
review = st.text_input("Enter The Review","Write Here...")
if st.button('Predict Sentiment'):
    result = print_result(analyse_text(classifier,vectorizer,review))
    st.success(result[1])
else:
    st.write("Press the above button..")
```
The codes above use streamlit *st.text_input* to create a text input form that will display “enter the review, write here”, the if *st.button* will create a button that will display “predict sentiment”, after that the variable result calls the *print_result* function and pass in the parameters. If the whole process the st.sucess(result[1) displays the result else it passes an error message asking the user to press the above button. Run your app using the command below.

```python
streamit run textanalyzer.py
```
#### Conclusion
If you have followed the process carefully you will see how fun and easy it is to prototype your machine learning models with streamlit and save yourself a whole lot of stress. You can explore more advanced examples and maybe take this project forward by deploying it on Heroku or any other platform.
