
### Building and Deploying a Language Detection System using Flask
With more than a thousand languages being used in the world today, communication between two or more people of different native languages is still key. That's why companies like Google are applying NLP into their products like language detection on Chrome browser to give their users a smooth experience regardless of their preferred language.

In this article, we will tackle language detection from the basic idea to implementation. Since it is a real-world project, it will not only build your understanding of NLP but also boost your portfolio projects.

### Introduction
Language detection is a task in Natural Language Processing (NLP) that deals with identifying which language a text or phrase is in. It helps in problems like language translation.

In this article, we will build a language detection model using Python and the [Language detection](https://www.kaggle.com/basilb2s/language-detection) dataset from Kaggle and deploy it using Flask, an easy-to-use Python micro web framework that does not require particular tools or libraries.

### Table of Contents
* [Building the language detection model](#building-the-language-detection-model)
	* [Setting up the development environment](#setting-up-the-development-environment)
	* [Importing Libraries](#importing-libraries)
	* [Data Preprocessing](#data-preprocessing)
	* [Modeling](#modeling)
	* [Model evaluation](#model-evaluation)
	* [Inference](#inference)
* [Deploying the model using Flask](#deploying-the-model-using-flask)

### Prerequisites
To follow through the article, you should have the following:
- Basic knowledge of Machine Learning
- Python and Jupyter Notebook installed on your machine
- Know the basics of Flask

### Building the language detection model
Before we start building the language detection model, you need to set up your development environment.

#### Setting up the development environment
The first step will be to create a project folder and in it, create a virtual environment to handle our project dependencies.

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

Once done, create a new file, `languagedetection.ipynb` in the folder `langdetect`.

Open the file using Jupyter Notebook and follow through the following:

#### Importing libraries
Before starting to model, we first need to import a few necessary libraries below:
```python
import numpy as np
import pandas as pd
import seaborn as sns
import re          #(regular expression)
import matplotlib.pyplot as plt
import warnings
warnings.simplefilter("ignore")
```

Once done, read the dataset using the following code below:

```python
df= pd.read_csv("Language Detection.csv")
df.head()
```

We will then check the number of languages in the dataset using the following code:
```python 
df["Language"].value_counts()
```
You will notice that our dataset has 17 languages which are: English, French, Spanish, Portuguese, Italian, Russian, Swedish, Malayalam, Dutch, Arabic, Turkish,   
German, Tamil, Danish, Kannada, Greek, and Hindi. 

We will then proceed to preprocess our data.

#### Data preprocessing
We will differentiate the dataset feature from the label as shown below:
```python
X = df["Text"]
y = df["Language"]
```
Once done, we will then encode the label (**Language**) using the `LabelEncoder()` method as shown below:
```python
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)
```
Once done, we will move to preprocess our feature (**Text**) as shown below:
```python
text_list = []

# iterating through all the text
for text in X:         
    text = re.sub(r'[!@#$(),n"%^*?:;~`0-9]', ' ', text)      # removes all the symbols and numbers
    text = re.sub(r'[[]]', ' ', text)   
    text = text.lower()          # converts all the text to lower case
    text_list.append(text)       # appends the text to the text_list
```
Then, we will encode our feature(**Text**) through a Bag of Words model using the `CountVectorizer()` method as shown below:
```python
from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer() 
X = cv.fit_transform(text_list).toarray() # tokenize a collection of text documents and store it
                                            #in an array
X.shape # check the shape of the data
```
#### Modeling
Once done with processing the data, we will now split the data into train and test sets as shown below:
```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size = 0.80, random_state=32)
```

Then, we will train our model using the `MultinomialNB` classifier which is best for classification with discrete features as shown below:
```python
from sklearn.naive_bayes import MultinomialNB  
model = MultinomialNB()
model.fit(X_train, y_train)
```

Once it has finished training, we will now predict the output of the model using the test set.
```python
y_pred = model.predict(X_test)
y_pred
```

#### Model Evaluation
After modeling, we will now evaluate the performance of our model.
```python
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
acc = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
print("Accuracy is :",acc)
```

You can see the result of the model is pretty good.

![accuracy](/engineering-education/building-and-deploying-a-language-detection-system-using-flask/accuracy.jpg)

#### Inference
We will now try to use our model to predict a sentence written in a particular language.

```python
def predict(txt):
     lang = cv.transform([txt]).toarray() # convert text to bag of words model (Vector)
     language = model.predict(lang) # predict the language
     language = le.inverse_transform(language) # find the language corresponding with the predicted value
     print ("The language is in", language[0]) # printing the language

predict('I went home yesterday')  # Call the function
```

The output of our prediction will be "English" as seen below:
![output](/engineering-education/building-and-deploying-a-language-detection-system-using-flask/output.jpg)

We can now save the model using `Pickle` as shown below:
```python
import pickle
pickle.dump(model, open('model.pkl','wb'))
```

After we've finished modeling, we will proceed to deploy the model using Flask.

### Deploying the model using Flask
Before we start the development process, we first need to install the Flask framework package.
```bash
pip install flask
```

Then, we need to create the following files:
* `model.pkl` - The saved model we will use.
* `apps.py` - For connecting the web page with the model.
* `index.html`- For displaying the web page.
* `style.css` - For styling the HTML page.

On the `index.html` file, make the following changes:
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

On the `style.css` file make the [following changes](https://github.com/FREDERICO23/Language-detection/blob/main/static/css/style.css) to style the webpage.

We will now proceed to connect the webpage with the model using `apps.py` by making the following changes.

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

Once you've done the above changes, we can now run the webserver using the following command to see how our app works:

```bash
python apps.py
```

You should be able to see something like this:

![homepage](/engineering-education/building-and-deploying-a-language-detection-system-using-flask/home.jpg)

 Enter a word in any of the languages above and click on the **Predict** button to see your results.

 An example below is the results of a phrase *"Hur mår du"*.

 ![results](/engineering-education/building-and-deploying-a-language-detection-system-using-flask/results.jpg)

### Conclusion
As you've seen, we have built a language detection model and deployed it using Flask. You can go and apply the knowledge to other NLP projects like fraud detection, hate speech detection etc.

You can find the project's code on [GitHub](https://github.com/FREDERICO23/Language-detection)

### More Reading

* Read more on [Flask](https://flask.palletsprojects.com/en/2.0.x/tutorial/factory/).
