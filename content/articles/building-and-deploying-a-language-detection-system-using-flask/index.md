
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
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import re          #regular expression
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
x_train, x_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state=32)
```

Then, we will train our model using the `MultinomialNB` classifier which is best for classification with discrete features as shown below:
```python
from sklearn.naive_bayes import MultinomialNB  
model = MultinomialNB()
model.fit(x_train, y_train)
```
Once it has finished training, we will now predict the output of the model using the test set.
```pytho
y_pred = model.predict(x_test)
y_pred
```
#### Model Evaluation
After modeling, we will now evaluate the performance of our model.
```python
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
accuracy = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
print("Accuracy is :",accuracy)
```
You can see the result of the model is pretty good.

![accuracy](/engineering-education/building-and-deploying-a-language-detection-system-using-flask/accuracy.jpg)

#### Inference
We will now try to use our model to predict a sentence written in a particular language.

```python
def predict(text):
     x = cv.transform([text]).toarray() # convert text to bag of words model (Vector)
     language = model.predict(x) # predict the language
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
* `apps.py` - To connect the web page with the model
* `index.html`- To display the web page
* `style.css` - To style the HTML page.

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
On the `style.css` file make the following changes to style our webpage.

```css
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
.btn-large { padding: 9px 14px; font-size: 15px; line-height: normal; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; }
.btn-primary, .btn-primary:hover { text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); color: #ffffff; }
.btn-primary.active { color: rgba(255, 255, 255, 0.75); }
.btn-primary { background-color: #4a77d4; background-image: -moz-linear-gradient(top, #6eb6de, #4a77d4); background-image: -ms-linear-gradient(top, #6eb6de, #4a77d4); background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#6eb6de), to(#4a77d4)); background-image: -webkit-linear-gradient(top, #6eb6de, #4a77d4); background-image: -o-linear-gradient(top, #6eb6de, #4a77d4); background-image: linear-gradient(top, #6eb6de, #4a77d4); background-repeat: repeat-x; filter: progid:dximagetransform.microsoft.gradient(startColorstr=#6eb6de, endColorstr=#4a77d4, GradientType=0);  border: 1px solid #3762bc; text-shadow: 1px 1px 1px rgba(0,0,0,0.4); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.5); }
.btn-block { width: 100%; display:block; }

* { -webkit-box-sizing:border-box; -moz-box-sizing:border-box; -ms-box-sizing:border-box; -o-box-sizing:border-box; box-sizing:border-box; }

html { width: 100%; height:100%; overflow:hidden; }

body { 
	width: 100%;
	height:100%;
	font-family: 'Open Sans', sans-serif;
	background: #123f3f;
	color: #fff;
	font-size: 18px;
	text-align:center;
	letter-spacing:1.2px;
	
}
.login { 
	position: absolute;
	top: 40%;
	left: 50%;
	margin: -150px 0 0 -150px;
	width:400px;
	height:400px;
}

.login h1 { color: #fff; text-shadow: 0 0 10px rgba(0,0,0,0.3); letter-spacing:1px; text-align:center; }

input { 
	width: 100%; 
	margin-bottom: 10px; 
	background: rgba(0,0,0,0.3);
	border: none;
	outline: none;
	padding: 10px;
	font-size: 13px;
	color: #fff;
	text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
	border: 1px solid rgba(0,0,0,0.3);
	border-radius: 4px;
	box-shadow: inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2);
	-webkit-transition: box-shadow .5s ease;
	-moz-transition: box-shadow .5s ease;
	-o-transition: box-shadow .5s ease;
	-ms-transition: box-shadow .5s ease;
	transition: box-shadow .5s ease;
}
input:focus { box-shadow: inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2); }
```

We will now proceed to connect the webpage with the model using `apps.py` by making the following changes.

```python
# import libraries
import numpy as np
from flask import Flask, request, render_template
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder

cv = CountVectorizer()
le = LabelEncoder()

# Load the language detection model
app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

# apply the model to the user's input
@app.route('/predict',methods=['POST'])
def predict():
    txt = request.form.get('text') # get user input
    y = cv.fit_transform([txt]).toarray() # convert text to bag of words model (Vector)
    language = model.predict(y) # predict the language
    language = le.inverse_transform(language) # find the language corresponding with the predicted value
    
    output = language[0]

    return render_template('index.html', prediction='Language is in {}'.format(output))

if __name__ == "__main__":
    app.run(debug=True)
```

Once you've done the above changes, we can now run the webserver using the code below to see how our app works:

```bash
python apps.py
```

You should be able to see something like this:

![homepage](/engineering-education/building-and-deploying-a-language-detection-system-using-flask/index.jpg)

 Enter a word in any of the languages above and click on the **Predict** button to see your results as below:
 
 ![results](/engineering-education/building-and-deploying-a-language-detection-system-using-flask/results.jpg)

### Conclusion
As you've seen, we have built a language detection model and deployed it using Flask. You can go and apply the knowledge to other NLP projects like fraud detection, hate speech detection etc.

You can find the project's code on [GitHub](https://github.com/FREDERICO23/Language-detection)

### More Reading

* Read more on [Flask](https://flask.palletsprojects.com/en/2.0.x/tutorial/factory/).
