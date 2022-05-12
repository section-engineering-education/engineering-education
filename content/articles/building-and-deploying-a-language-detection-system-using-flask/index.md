---
layout: engineering-education
status: publish
published: true
url: /building-and-deploying-a-language-detection-system-using-flask/
title: Building a Flask Language Detection System 
description: This tutorial will walk the reader through the basic implementation of a language detection model and deployment using the Flask framework.
author: adhinga-fredrick
date: 2022-01-25T00:00:00-10:40
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/building-and-deploying-a-language-detection-system-using-flask/hero.jpg
    alt: Flask language detection system Hero Image
---
With more than a thousand languages being used today, communication between people of different native languages is crucial. That is why companies like Google are applying Natural Language Processing(NLP) into their products like language detection on Chrome browser, to give users a smooth experience.
<!--more-->

Language detection is a task in Natural Language Processing (NLP) that identifies the language of a given text or phrase and provides its translation.

In this article, we will build a language detection model using Python and the language detection dataset from [Kaggle](https://www.kaggle.com/basilb2s/language-detection). Additionally, we will test and deploy the model using [Flask,](https://flask.palletsprojects.com/en/2.0.x/) an easy-to-use Python micro web framework.

### Table of content
- [Building the language detection model](#building-the-language-detection-model)
    - [Setting up the development environment](#setting-up-the-development-environment)
    - [Importing Libraries](#importing-libraries)
    - [Data Preprocessing](#data-preprocessing)
    - [Modeling](#modeling-the-data)
    - [Model evaluation](#model-evaluation)
    - [Inference](#inferencing-using-the-model)
- [Deploying the model using Flask](#deploying-the-model-using-flask)

### Prerequisites
To follow along with this article, the reader should have the following:
- A basic knowledge of Machine Learning.
- Python and [Jupyter Notebook](https://jupyter.org/) installed on their machine.
- Basics of the [Flask](https://flask.palletsprojects.com/en/2.0.x/tutorial/) framework.

### Building the language detection model
To work on the project, it would be best if you started by setting up a development environment.

#### Setting up the development environment
The first step will be creating a project folder and a virtual environment to handle the project dependencies.

Run the following commands to create the project's folder:

```bash
mkdir langdetect
cd langdetect
```

In the newly created folder `langdetect`, create a virtual environment and activate it using the following commands:

```bash
py -m venv .env #create a virtual environment named .env
cd .env/Scripts/activate # activate the environment
```

Next,  create a new file, `languagedetection.ipynb` in the `langdetect` folder. Then, open the file using Jupyter Notebook.

#### Importing libraries
We need to import the libraries as shown by the snippets below:

```python
import numpy as np
import pandas as pd
import seaborn as sns
import re          #(regular expression)
import matplotlib.pyplot as plt
import warnings
warnings.simplefilter("ignore")
```

Next, read the dataset using the following code snippet:

```python
df= pd.read_csv("Language Detection.csv")
df.head()
```

We need to check the number of languages in the dataset. Use the following code snippet for that operation.

```python 
df["Language"].value_counts()
```

Our dataset has 17 languages: English, French, Spanish, Portuguese, Italian, Russian, Swedish, Malayalam, Dutch, Arabic, Turkish,   German, Tamil, Danish, Kannada, Greek, and Hindi. 

#### Data preprocessing
Here, we will transform the data into a desired usable format by the model.

First, split the data into dependent and independent variables. We will use `X` for the independent variables(features) and `y` for the dependent variable(label/target).

```python
X = df["Text"]
y = df["Language"]
```

Next, we will encode the label (**Language**) using the `LabelEncoder()`.

Encoding is the process of converting categorical data to numerical data. Encoding is necessary to allow data to be easily fitted into the model and improve its performance.

```python
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)
```
In the next step, we need to preprocess our feature (**Text**) as shown below:

```python
text_list = []

# iterating through all the text
for text in X:         
    text = re.sub(r'[!@#$(),n"%^*?:;~`0-9]', ' ', text)      # removes all the symbols and numbers
    text = re.sub(r'[[]]', ' ', text)   
    text = text.lower()          # converts all the text to lower case
    text_list.append(text)       # appends the text to the text_list
```
Then, we encode our feature(**Text**) through a **Bag of Words** model using the `CountVectorizer()` method.

A **Bag of Words** is a method used to transform text to a vector which allows the model to access the number of times a word appears in a document. In summary, it represents a phrase or a sentence as a bag(container) of words without considering the structure or the pattern of the words.

```python
from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer() 
X = cv.fit_transform(text_list).toarray() # tokenize a collection of text documents and store it
                                            #in an array
X.shape # check the shape of the data
```
#### Modeling the data
Once we are done processing the data, we need to split the data into training and testing sets. Use the snippets below to split the data into training and testing sets.

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size = 0.80, random_state=32)
```

By this point, we need to train the model. We will use the `MultinomialNB` classifier, which is best for classifying discrete features. Use the code snippets below to apply the `MultinomialNB` classifier to train your model.

```python
from sklearn.naive_bayes import MultinomialNB  
model = MultinomialNB()
model.fit(X_train, y_train)
```

Once the training is finished, we need to predict the model's output using the test set.

```python
y_pred = model.predict(X_test)
y_pred
```

#### Model evaluation
After modelling, evaluate the performance of the model using the snippet below:

```python
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
acc = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
print("Accuracy is :",acc)
```

The result is good, as shown in the picture below:

![accuracy](/engineering-education/building-and-deploying-a-language-detection-system-using-flask/acuracy.jpg)

#### Inferencing using the model
We will now try to use our model to predict the language of a sentence. When supplied with the sentence, the model should output the language of the sentence.

```python
def predict(txt):
     lang = cv.transform([txt]).toarray() # convert text to bag of words model (Vector)
     language = model.predict(lang) # predict the language
     language = le.inverse_transform(language) # find the language corresponding with the predicted value
     print ("The language is in", language[0]) # printing the language

predict('I went home yesterday')  # Call the function
```

The output of our prediction is "English", as seen below:

![output](/engineering-education/building-and-deploying-a-language-detection-system-using-flask/out.jpg)

We can now save the model using `Pickle` as shown below:

```python
import pickle
pickle.dump(model, open('model.pkl','wb'))
```

After the modeling process, we will deploy the model using Flask.

### Deploying the model using Flask
Before the deployment, we need to install the Flask framework package.

```bash
pip install flask
```

Then, we need to create the following files:

- `model.pkl` - The saved model to be used.
- `apps.py` - To connect the web page with the model.
- `index.html`- To display the web page.
- `style.css` - To style the HTML page.

In the `index.html` file, add the following snippet:

```html
<!DOCTYPE  html>
<html  >
    <head>
        <meta  charset="UTF-8">
        <title>Language Detection</title>

        <link  href='https://fonts.googleapis.com/css?family=Pacifico'  rel='stylesheet'  type='text/css'>
        <link  href='https://fonts.googleapis.com/css?family=Arimo'  rel='stylesheet'  type='text/css'>
        <link  href='https://fonts.googleapis.com/css?family=Hind:300'  rel='stylesheet'  type='text/css'>
        <link  href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300'  rel='stylesheet'  type='text/css'>
        <link  rel="stylesheet"  href="{{ url_for('static', filename='css/style.css') }}">

    </head>
    <body>
        <div  class="login">
        <h1>What Language is this?</h1>
        <!-- User Input -->
            <form  action="{{ url_for('predict')}}"method="post">
                <input  type="text"  name="text"  placeholder="Text"  required="required"  />
                <button  type="submit"  class="btn btn-primary btn-block btn-large">Predict</button>
            </form>
        <br>
        <br>
        {{ prediction_text }}
        </div>
    </body>
</html>
```

Make the [following changes](https://github.com/FREDERICO23/Language-detection/blob/main/static/css/style.css) on the `style.css` file to style the web page then connect the web page to the model using the `apps.py` file by adding the following code snippet:

```python
import pandas as pd
from flask import Flask, request, render_template
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder
import re

cv = CountVectorizer()
le = LabelEncoder()

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    
    # Read data
    df = pd.read_csv("Language Detection.csv")

    # feature and label extraction
    X = df["Text"]
    y = df["Language"]

    # Label encoding
    from sklearn.preprocessing import LabelEncoder
    le = LabelEncoder()
    y = le.fit_transform(y)

    # cleaning the data
    text_list = []

    # iterating through all the text
    for text in X:         
        text = re.sub(r'[!@#$(),n"%^*?:;~`0-9]', ' ', text) 
        text = re.sub(r'[[]]', ' ', text)   
        text = text.lower()
        text_list.append(text)
    
    
    # Encode the feature(text)

    from sklearn.feature_extraction.text import CountVectorizer
    cv = CountVectorizer() 
    X = cv.fit_transform(text_list).toarray() 
                                            
    # split the dataset
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X, y, train_size = 0.80, random_state=32)

    # Model Training
    from sklearn.naive_bayes import MultinomialNB  
    model = MultinomialNB()
    model.fit(X_train, y_train)

    if request.method == 'POST':
        txt = request.form['text']
        t_o_b = cv.transform([txt]).toarray()
        language = model.predict(t_o_b) 
        corr_language = le.inverse_transform(language) 
    
        output = corr_language[0]

    return render_template('index.html', prediction='Language is in {}'.format(output))

if __name__ == "__main__":
    app.run(debug=True)
```

Once the above changes are done,  run the webserver using the following command to see how the model works:

```bash
python apps.py
```

![home page](/engineering-education/building-and-deploying-a-language-detection-system-using-flask/homepage.jpg)

Enter a word in any of the languages above, then click on the **Predict** button to see the results. An example below is the results of a phrase *"Hur mår du"*.

![results](/engineering-education/building-and-deploying-a-language-detection-system-using-flask/result.jpg)

### Conclusion
We have built a language detection model and deployed it using Flask. As discussed above, the knowledge can be applied to other NLP projects like fraud and hate speech detection.

You can find the code for this project  on [GitHub.](https://github.com/FREDERICO23/Language-detection)

### Further reading
- [Flask](https://flask.palletsprojects.com/en/2.0.x/tutorial/factory/)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)