---
layout: engineering-education
status: publish
published: true
url: /engineering-education/streamlit-ui-tutorial/
title: How to Build a UI for your Model using Streamlit
description: This tutorial will build a Logistic Regression Model to predict if a person would survive the Titanic Disaster. We will use Streamlit to build a web app and a UI for our Model. 
author: rahul-banerjee
date: 2021-01-06T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/streamlit-ui-tutorial/hero.jpg
    alt: UI model using Streamlit image example
---
Streamlit is an open-source Python library that can build a UI for various purposes, it is not limited to data apps/machine learning. It is easy to learn, and a few lines of code can create a beautiful web app.
<!--more-->

### How to build a UI for your model using Streamlit
Streamlit is a Python library that helps us develop UIs for our models without HTML/CSS/JS. Most models die inside a Jupyter notebook and are not appealing. But, using Streamlit, you can create a clean UI for your model and showcase it to others. Building a UI lets users use your model in a more user-friendly format.

### Table of contents
- Prerequisites
- Installing required libraries
- Logistic regression model
- Streamlit UI
- Conclusion  
  
### Why you should use Streamlit?
- You don't need to deal with HTML/CSS/JSS.

- It supports markdown.

- It has many prebuilt widgets available, further reducing the time you spend on building the UI.

- Builds a responsive UI.

- Easy to deploy Streamlit apps using Streamlit sharing.

- It's open-source, and you can create your widgets if needed.

This tutorial will build a Logistic Regression Model to predict if a person would survive the Titanic Disaster. After building the model, we will use Streamlit to build a web app and a UI for our Model. The web app will let the user input values and get the predicted results.

### Prerequisites
This tutorial is focused on Streamlit, so familiarity with building ML models using scikit-learn is expected.

- A good understanding of Python.

- A basic understanding of data cleaning and standard techniques such as numerical-encoding, one-hot-encoding.

- Familiarity with the scikit-learn library.

- Familiarity with Logistic Regression helps but is not necessary.

- Familiarity with Pandas library.

- Basic Understanding of Matplotlib library.

### Installing required libraries

```python
python -m venv venv
venv/Scripts/activate
pip install streamlit,scikit-learn, pandas, matplotlib
```

First, we will need to create a virtual environment to manage our packages and install the required packages: streamlit,scikit-learn, pandas, and matplotlib. Once the installation is complete, type the following command to ensure that streamlit has been installed as expected.
  
```bash
streamlit hello
```  

This should launch a sample Streamlit app. You can press ctrl+C on the command line to stop the app.

### Import necessary libraries

We will need to import all the installed libraries.

```python
import streamlit as st
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix
import matplotlib.pyplot as plt
```
  
### Logistic regression model
First, we will load the Titanic dataset and manipulate our dataset to meet our requirements. You can download the dataset from [Kaggle](https://www.kaggle.com/c/titanic/data?select=train.csv).

### Load data frame
We import the dataset and create a dataframe.

  
```bash
train_df = pd.read_csv("train.csv")
print(train_df.head())
```

You can print the dataframe to check the columns inside it.
  
We need to perform the following on our data before our Logistic Regression Model can use it.

- Assign a numerical value to the feature 'Sex.'

- Use one-hot encoding on the feature 'Pclass.'

- Fill the missing values in the age column.

- Only select the required features.

We will define a function to transform our data to make it useable for our Logistic Regression Model.

### Manipulate data

```python
def manipulate_df(df):
	# Update sex column to numerical
	df['Sex'] = df['Sex'].map(lambda x: 0 if x == 'male' else 1)
	# Fill the nan values in the age column
	df['Age'].fillna(value = df['Age'].mean() , inplace = True)
	# Create a first class column
	df['FirstClass'] = df['Pclass'].map(lambda x: 1 if x == 1 else 0)
	# Create a second class column
	df['SecondClass'] = df['Pclass'].map(lambda x: 1 if x == 2 else 0)
	# Create a second class column
	df['ThirdClass'] = df['Pclass'].map(lambda x: 1 if x == 3 else 0)
	# Select the desired features
	df= df[['Sex' , 'Age' , 'FirstClass', 'SecondClass' ,'ThirdClass' 'Survived']]
	return df
```

- For the `sex` column, we set a value of 0 if the passenger is male and 1 if the passenger is female.

- We use the mean value to fill the missing data in the age columns.

- We use one-hot-encoding for the `Pclass.`.

- Since we are not focused on building the model, we will only select 6 features from our dataframe.

### Train-test split
  
```python
train_df = manipulate_df(train_df)
features= train_df[['Sex' , 'Age' , 'FirstClass', 'SecondClass','ThirdClass']]
survival = train_df['Survived']
X_train , X_test , y_train , y_test = train_test_split(features , survival ,test_size = 0.3)
```
  
We will use a 70-30 ratio to split the dataset.
  
### Scale the feature data
  
```python
scaler = StandardScaler()
train_features = scaler.fit_transform(X_train)
test_features = scaler.transform(X_test)
```
  
We will need to scale the data, so it has mean = 0 and standard deviation = 1.

### Build the model
```python
# Create and train the model
model = LogisticRegression()
model.fit(train_features , y_train)
train_score = model.score(train_features,y_train)
test_score = model.score(test_features,y_test)
y_predict = model.predict(test_features)
```
  
After training our model, we store the accuracy scores of our model.

>  **We have successfully built our model. Now we will move on to Streamlit.**

### Streamlit

To run a streamlit app, type the following command.

```python
streamlit run app.py
```

You should see a blank screen since we do not have any components being displayed right now. On the top right corner, Select 'Always Rerun'. This tells Streamlit to reload each time we make changes to our code.

### Title and input datframe

![image title](/engineering-education/streamlit-ui-tutorial/title.png)  
  
We will use the following functions for this part of our webapp:
- **title( str )**: This method is like a \<h1> tag. It takes in a string as a parameter and displays the text as a title.
- **subheader( str)**: It is like the title method, but the font of text displayed is smaller than the one displayed by the title.
- **table( dataframe )**: The table() method takes a dataframe as a parameter and displays it. You can also use the .dataframe() method yet the .table() method displays a much nicer looking table.

The code is below:  
```bash
st.title("Would you have survived the Titanic Disaster?")
st.subheader("This model will predict if a passenger would survive the Titanic Disaster or not")
st.table(train_df.head(5))
```
  
An alternative to **st.table()** is **st.dataframe()**. Both of them support a dataframe and can display it, however I prefer the **st.table()** since it looks better.

### Model performance

![image title](/engineering-education/streamlit-ui-tutorial/performance.png)  

First, we will need to form the confusion matrix and compute the values.

```python
confusion = confusion_matrix(y_test, y_predict)
FN = confusion[1][0]
TN = confusion[0][0]
TP = confusion[1][1]
FP = confusion[0][1]
  ```

We can use the **subheader()** method to display the train and test scores.

  
```python
st.subheader("Train Set Score: {}".format ( round(train_score,3)))
st.subheader("Test Set Score: {}".format(round(test_score,3)))
```
  
Now, we will create a bar graph with the above data.

```python
plt.bar(['False Negative' , 'True Negative' , 'True Positive' , 'False Positive'],[FN,TN,TP,FP])
```

To display the graph, we will use Streamlit's **pyplot()** method.
  
```python
st.pyplot()
```
  
You can think of **st.pyplot()** as an equivalent to **plt.show()**.

### Taking input from the user

![image title](/engineering-education/streamlit-ui-tutorial/predict.png)
  
Next, we allow the user to input data and display the prediction. 

We will use the following methods:
- **text_input(str)**: This method takes a string as a parameter and creates a text input field with the input parameter as its label.

- **st.selectbox(str , options = [ ]):** This method creates a drop-down menu. It takes in two parameters, the string to use as the label and the list of options. The options need to be passed as a list of string values.

- **st.slider(str, start, end,step):** This creates a slider with the given parameters.

The code is displayed below:
  
```python
name = st.text_input("Name of Passenger ")
sex = st.selectbox("Sex",options=['Male' , 'Female'])
age = st.slider("Age", 1, 100,1)
p_class = st.selectbox("Passenger Class",options=['First Class' , 'Second Class' , 'Third Class'])
```

Every time the user gives an input, the script is re-run, and the respective variables will store the input values.

Before we use these values for prediction, we will need to scale them and modify them.
  
```python
sex = 0 if sex == 'Male' else 1
f_class , s_class , t_class = 0,0,0
if p_class == 'First Class':
	f_class = 1
elif p_class == 'Second Class':
	s_class = 1
else:
	t_class = 1
input_data = scaler.transform([[sex , age, f_class , s_class, t_class]])
prediction = model.predict(input_data)
predict_probability = model.predict_proba(input_data)
```

- First, we set the value of sex to either 0 or 1.

- Then, we use one-hot encoding on the passenger class.

- Finally, we scale the input and calculate the prediction and probability.

### Displaying our prediction
  
```python
if prediction[0] == 1:
	st.subheader('Passenger {} would have survived with a probability of {}%'.format(name , round(predict_probability[0][1]*100 , 3)))
else:
	st.subheader('Passenger {} would not have survived with a probability of {}%'.format(name, round(predict_probability[0][0]*100 , 3)))
```
  
Based on the prediction, we display a text message.
 
>  **We have now built a UI for our model**

### Conclusion
With just a few extra lines of code, we were able to transform a plain and boring script into a web app with a neat and clean UI. Many people might have built a model to predict the survival of a passenger in the Titanic Disaster, but building a web app for it will make you stand out.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
