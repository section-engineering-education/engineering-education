---
layout: engineering-education
status: publish
published: true
url: /how-to-deploy-streamlit-app-with-docker/
title: Deploying a Simple Streamlit app using Docker
description: This article takes the reader through creating and deploying a streamlit application using Docker. Docker is a virtualization platform that is designed to create, run, and deploy applications through the use of containers.
author: bravin-wasike
date: 2021-06-30T00:00:00-12:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-deploy-streamlit-app-with-docker/hero.png
    alt: Docker image example
---
Docker is a virtualization platform that is designed to create, run, and deploy applications through the use of containers. We will use Docker to deploy a simple machine learning app built using Streamlit.
<!--more-->
In this tutorial, we will first create a simple machine learning model, save it into a pickle file to be loaded into our platform, and create its interface using Streamlit. After creating the Streamlit app, we shall use docker to deploy it.

### Table of contents
- [Prerequisites](#prerequisites)
- [Building a simple machine learning model](#building-a-simple-machine-learning-model)
- [Introduction to streamlit](#introduction-to-streamlit)
- [Dockerizing the streamlit app](#dockerizing-the-streamlit-app)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
1. A good understanding of Python.
2. Good working knowledge of machine learning models.

### Building a simple machine learning model
Let's start by building a simple machine learning prediction model. We will build a machine learning model to predict the gender of a person based on the user's input.

### Dataset
We will use a dataset of names commonly used by people.
The format of our data used is as shown:

![A Snip of the data](/engineering-education/how-to-deploy-streamlit-app-with-docker/data.png)

[CSV File](https://drive.google.com/file/d/1ztQkET6U8EgtGWiprJFoXLICNP3cl34i/view?usp=sharing)

### Installation of the required packages
We need the following packages:
1. [Sckit-learn](https://scikit-learn.org/)
2. [Pandas](https://pandas.pydata.org/)
3. [Numpy](https://numpy.org/)

The following command is used to install the packages above.

```bash
pip install sklearn
pip install pandas
pip install numpy
```

### Importing Panda and Numpy
```python
import pandas as pd
import numpy as np
```

### Importing from sckitlearn

```python
import CountVectorizer from sklearn.feature_extraction.text
import DictVectorizer from sklearn.feature_extraction
```

```python
df = pd.read_csv('dataset.csv')
```

```python
df.size
df.dtypes
```

### Checking for missing values
We need to ensure that there are no missing values in our dataset. This provides well structured data that will optimize on training our model.

```python
df.isnull().isnull().sum()
```

### Checking for number of male and female
Here, we look for the total number of male and female in our dataset.

```python
df[df.sex == 'F'].size
df[df.sex == 'M'].size
df_names = df
```

### Replacing the data F and M with 0 and 1
This is done so as to provide a binary output of either 0 or 1, 0 to represent female, 1 to represent male.

```python
df_names.sex.replace({'F':0,'M':1},inplace=True)
Xfeatures =df_names['name']
```

### Feature extraction
```python
cv = CountVectorizer()
X = cv.fit_transform(Xfeatures)
```

### Processing of model
```python
import train_test_split from sklearn.model_selection

```

### Features and labels
After identifying our features and labels to be used in training the model, we can split our data set into two:

1. Training set: This will be 75% of the data.
2. Test Set: This will be 25% of the data.

```python
X
y = df_names.sex
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)
```

### Creating the naive bayes classifier model
We import Naive Bayes Classifier algorithm from the scikit-learn package. The model will be used to fit and train our model.

```python
import MultinomialNB from sklearn.naive_bayes
clf = MultinomialNB()
clf.fit(X_train,y_train)
clf.score(X_test,y_test)
```

### Making predictions
We will use a function named predict that will be used to predict the gender of a person based on the name provided.

```python
def predict(a):
    test_name = [a]
    vector = cv.transform(test_name).toarray()
    if clf.predict(vector) == 0:
        print("Female")
    else:
        print("Male")
```

### Saving the model into a pickle file
We shall save our model using Joblib. We shall accomplish this by converting our model into a byte stream which will be saved into a pickle file named 'naivemodel.pkl'.

```python
import joblib from sklearn.externals
naiveBayesModel = open("model/naivemodel.pkl","wb")
joblib.dump(clf,naiveBayesModel)
naiveBayesModel.close()
```

### Introduction to streamlit
Streamlit is a framework that is used by different machine learning engineers and data scientists to build UIs and powerful machine learning apps from a trained model.

These apps can be used for visualization by providing interactive interfaces for the user.

They provide an easier way to build charts, tables, and different figures to meet your application's needs. They also utilize the models that have been saved or picked into the app to make a prediction.

### How to install streamlit
Use the following command:

```bash
pip install streamlit

```

### Let's build the streamlit app
1. Create a new Python file named `app.py`.
2. Add our pickled model into a created folder called 'model'.

Our folder structure should look like this.

```bash
├── app.py
├── model
   ├── naivebayesgendermodel.pkl

```

3. Import required packages.

```python
import streamlit as st

from sklearn.externals import joblib
import time
from PIL import Image
```

4. Unplick the model.

This will help to load our model so that it can be used for gender prediction. Here, the byte stream from the 'naivemodel.pkl' file is converted into an object hierarchy so that it can be used by the streamlit app.

```python
gender_nv_model = open("models/naivemodel.pkl","rb")
gender_clf = joblib.load(gender_nv_model)

```

5. Building our prediction logic.

```python
def predict_gender(data):
  vect = gender_cv.transform(data).toarray()
  result = gender_clf.predict(vect)
  return result
```

6. Styling the app
We will use material UI for styles and icons for our app.

```python
def load_css(file_name):
    with open(file_name) as f:
        st.markdown('<style>{}</style>'.format(f.read()), unsafe_allow_html=True)

def load_icon(icon_name):
    st.markdown('<i class="material-icons">{}</i>'.format(icon_name), unsafe_allow_html=True)
```

7. Adding an image

```python
def load_images(file_name):
  img = Image.open(file_name)
  return st.image(img,width=300)
```

Your file structure should be as shown:

```bash
├── male.png
├── female.png
├── model
   ├── nainvemodel.pkl

```

### Designing the user interface
This is where we use different tools from streamlit to design a nice UI.

```python
def main():
  """Gender Classifier App
    With Streamlit

  """

  st.title("Gender Classifier")
  html_temp = """
  <div style="background-color:blue;padding:10px">
  <h2 style="color:grey;text-align:center;">Streamlit App </h2>
  </div>

  """
  st.markdown(html_temp,unsafe_allow_html=True)
  load_css('icon.css')
  load_icon('people')

  name = st.text_input("Enter Name","Pleas Type Here")
  if st.button("Predict"):
    result = predict_gender([name])
    if result[0] == 0:
      prediction = 'Female'
      img = 'female.png'
    else:
      result[0] == 1
      prediction = 'Male'
      img = 'male.png'

    st.success('Name: {} was classified as {}'.format(name.title(),prediction))
    load_images(img)
```

The code is explained below:
- Adding the apps title.
- Styling our app by adding the app's background color, text color, and the general structure of our app.
- Adding a text input area where a user can key in a name to be predicted as either male or female.
- Adding a button that a user can use to submit the input.
  
We set the following styles on our app:
```bash
Background-color: blue
Text color: grey,
Padding: 10px,
App Title: Gender Classifier App
```

We then run our app using this command.

```bash
streamlit run app.py
```

Our user interface is as shown below.

1. A prediction where the output is male.

![Male Prediction](/engineering-education/how-to-deploy-streamlit-app-with-docker/male-prediction.png)

2. Prediction where the output is female

![Female Prediction](/engineering-education/how-to-deploy-streamlit-app-with-docker/female-prediction.png)

### Dockerizing the streamlit app
1. Let's create a Docker file.

- In the working root directory, let's create a file named 'Dockerfile' without any extensions.

- Your file structure should be as shown.

```bash
├── Dockerfile
├── male.png
├── female.png
├── model
   ├── nainvemodel.pkl

```

2. Docker Layers

- Firstly we define our base image where we want to build our file from, as demostrated below.

```docker
FROM python:3.7
```

- Here we will use the official Python imge from Docker.

- Create a working directory as shown.

```docker
WORKDIR /app
```

- Copy all the requirements into the new directory created.

```docker
COPY requirements.txt ./requirements.txt
```

- Copying from the source to the destination.

- Install all that is in the `requirments.txt` file.

```docker
RUN pip install -r requiremts.txt
```

- Expose the port to be used to run the application.

```docker
EXPOSE 8501
```

- This is the same port that our streamlit app was running on.

- Copy our app from the current directory to the working area.

```docker
COPY ./app
```

- Create an entry point to make our image executable.

```docker
ENTRYPOINT ["streamlit", "run"]

CMD ["app.py"]
```

3. Building a Docker image

- We build using the following command then "." to run the current directory.

```docker
docker build -t streamlitapp:latest .
```

- You can also use the following command to specify the file.

```docker
docker build -t streamlitapp:latest .f Dockerfile
```

- The output will be as shown below.

```bash
Sending building context to the Docker daemon  34.90kb
Step 1/8 : FROM python:3.8
  --->d6568b1g3y4h
Step 2/8 : WORKDIR /app
  --->Using Cache
  --->25cyf5dfpbfd
Step 3/8 : COPY requirements.txt ./requirements.txt
    --->Using Cache
    --->52jdf5dffbfd
Step 4/8 : RUN pip install -r requiremts.txt
    --->Using Cache
    --->81cdf5dffedf
Step 5/8 : EXPOSE 8501
    --->Using Cache
    --->62d29afd9eb
Step 6/8 : COPY ./app
    --->9rraeb07t4d
Step 6/8 : EXPOSE 8501
    --->4b2ap4h557cc
Step 7/8 : ENTRYPOINT ["streamlit", "run"]
    --->2egaeb07tdte
Removing intermediate container 5ta3824edte
 ---> 65dv092efstfu
step 8/8 : CMD ["app.py"]
Successfully built 65dv092efstfu
Successfully tagged streamlitapp:latest
```

- Use the following command to view all your images.

```docker
docker image ls
```

- Output is as shown.

```bash
REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
streamlitapp                 latest             65dv092efstfu        2 minutes ago       1.24GB
testapp                      latest             d660b1f1t3e         1 weeks ago          794MB
```

4. Creating a container

```bash
docker run -p 8501:8501 streamlitapp:latest
```

Result:

```bash
gv092e0ff6btdte593a7dad8e50ef01f7t3e89fy41816624gdted7fu1h1bid1o
```

It also starts our streamlit app in the following urls:
1. Network URL: http://172.17.0.2.8501
2. External URL: https://193.106.63.249:8501

With that, the Streamlit app is now deployed with docker.

### Conclusion
In this tutorial, we have learned how to create a simple machine learning model, how to create a steamlit app using the model and finally used Docker to run the app.

We first began by building a gender classification model using our machine learning model. After building the model we designed a user interface using streamlit. Streamlit is a good library used by most developers when building machine learning apps within a short time frame.

Streamlit designs a user interface that the end-user can use to make a prediction of gender based on the name the user has provided.

After we made sure that our streamlit app was fully functional, we finally deployed to docker by creating a docker image. 
We then used that image to create a docker container, and finally run our app. 

By using these steps, a reader should be able to comfortably deploy a streamlit app using Docker.

Happy coding!

### References
- [Streamlit Documentation](https://streamlit.io/)
- [Docker Documentation](https://www.docker.com/)
- [Tensorflow Documentation](tensorflow.org/guide/keras/save_and_serialize)
- [Scikit-learn Documentation](https://scikit-learn.org/)

---

Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
