---
layout: engineering-education
status: publish
published: true
url: /integrate-ml-to-flask-api-and-deploy-to-heroku/
title: Integrating Flask API with ML Models and Deploying to Heroku
description: In this article we will discuss the process of integrating an ML model into a Flask REST API. We will deploy the model to Heroku.
author: iniabasi-affiah
date: 2021-09-30T00:00:00-08:50
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/integrate-ml-to-flask-api-and-deploy-to-heroku/hero.png
    alt: ML Flask API example image
---
It is not enough to build and train ML models. Your ML model is useless if it just sits in your PC after training. Would it not be great to show others what your machine learning model can do after training it?
<!--more-->
This article covers how to integrate an ML model into a Flask REST API. It also covers how to deploy a Flask REST API to Heroku. You can merge this REST API into web applications and android applications. The repo for this project can be found [here.](https://github.com/Inyrkz/diagnose-diabetes-svm)

### Prerequisites
- Building [ML model](https://www.section.io/engineering-education/diagnose-diabetes-with-svm/) guide.
- [REST API basics](https://www.section.io/engineering-education/rest-api/).
- Code Editor (VS Code).

### Outline
- [Pickling ML model](#pickling-ml-model)
- [Integrating ML model to a Flask-RESTful API](#integrating-ml-model-to-a-flask-restful-api)
- [Deploying to Heroku](#deploying-to-heroku)
- [Conclusion](#conclusion)

### Pickling ML model
To build the Machine Learning model for this project, use this [guide](https://www.section.io/engineering-education/diagnose-diabetes-with-svm/).

After training the model, we have to save it to a file. Serialization comes to play here. Serialization is the process of turning a Python object into a byte stream.

The conventional method of serializing objects in Python is by using `pickle`. With `pickle`, we can serialize our machine learning model. 

We then save the serialized format to a file. It relieves us the stress of retraining our machine learning model each time we want to use it.

Then, we can load the saved file and de-serialize it. Then we use it to make new predictions.

Add the code below to a new cell in your Jupyter Notebook. It pickles the machine learning model and training set:

```python
# pickle the training set
import pickle
filename_X = 'X_train.sav'
pickle.dump(X_train, open(filename_X, 'wb'))
filename = 'model.sav'
pickle.dump(model, open(filename, 'wb'))
```

You may be wondering why we are pickling the training set. In this [guide](https://www.section.io/engineering-education/diagnose-diabetes-with-svm/), we feature scaled our test set with the mean and standard deviation of each feature in the training set.

We need to use those same values to scale the new record before making predictions.

Running the code above creates two new files in your current directory: `X_train.sav` and `model.sav`.

### Integrating ML model to a Flask-RESTful API
Using a text editor (VS Code), create a new file and name it to `api.py.`

We create a virtual environment to isolate the libraries we will be using for this project. The virtual environment will not change the modules installed on our system.

Instead, it will create a unique environment where we can install only the libraries we need for our project.

Thus, it helps us avoid conflict between the libraries installed in our system and the libraries we will be using for our project. First, we install `virtualenv`. Then we use `virtualenv` to build separate Python environments:

```bash
pip install virtualenv
```

We create a virtual environment and call it `venv`. It adds a new folder `venv` to our directory:

```bash
virtualenv venv
```

To activate the virtual environment on Windows, run the command below:

```bash
venv\Scripts\activate.bat
```

Once we activate the virtual environment, we install all the libraries we need to run our API. The `pickle` module comes by default with python. So we do not need to install it.

Next, we installed the version of the scikit-learn library we used to build the ML model in our Jupyter Notebook. To check for the version, run the code below in your notebook:

```python
import sklearn

print('scikit-learn version is', sklearn.__version__)
```

Output:

```bash
scikit-learn version is 0.24.2
```

We install this version of scikit-learn in our virtual environment:

```bash
pip install flask
pip install flask-restful
pip install numpy
pip install scikit-learn==0.24.2
```

I am using `Flask==2.0.1`, `Flask-RESTful==0.3.9`, `numpy==1.21.2`, and `scikit-learn==0.24.2`.

Now we can build our RESTful API. We start by importing the libraries and instantiating the Flask RESTful API in `api.py`:

```python
from flask import Flask, request
from flask_restful import Api, Resource
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler

# instantiate Flask Rest Api
app = Flask(__name__)
api = Api(app)
```

The Flask-RESTful library in Flask enables us to build REST APIs with ease. It strictly follows the REST API standard.

First, let us load our pickled model and training set:

```python
# load the pickled model and X_train
X_train = pickle.load(open('X_train.sav', 'rb'))
model = pickle.load(open('model.sav', 'rb'))
```

We standardize the training set. We will scale the new patient's data later before making predictions:

```python
# feature scale data after fitting scalar object to pickled training set
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
```

We create a Resource called `Records`:

```python
# Create class for Api Resource
class Records(Resource):
    def get(self):
        # get request that returns the JSON format for API request
        return {"JSON data format": {"Pregnancies": 5,
                                     "Glucose": 32,
                                     "BloodPressure": 43,
                                     "SkinThickness": 23,
                                     "Insulin":22,
                                     "BMI": 54,
                                     "DiabetesPedigreeFunction":  43,
                                     "Age": 50
                                    }
                }, 200
```

We create a GET request which will return the format our JSON data should be in when sending a POST request. The status code is 200. Which means the request was successful.

Next, we create a POST request to get the patient’s record, and return the model prediction:

```python
    def post(self):
        # post request
        # make model and X_train global variables
        global model
        global X_train
        # it gets patient's record and returns the ML model's prediction
        data = request.get_json()

        try:
            pregnancies = int(data["Pregnancies"])
            glucose = int(data["Glucose"])
            bp = int(data["BloodPressure"])
            st = int(data["SkinThickness"])
            insulin = int(data["Insulin"])
            bmi = float(data["BMI"])
            dpf = float(data["DiabetesPedigreeFunction"])
            age = int(data["Age"])

            # model expects a 2D array
            new_record = [[pregnancies, glucose, bp, st, insulin, bmi, dpf, age]]
            # feature scale the data
            scaled_data = sc.transform(new_record)
            # dictionary containing the diagnosis with the key as the model's prediction
            diagnosis = {0: 'Your Result is Normal',
                         1: 'Diabetes Detected'
                        }
            # pass scaled data to model for prediction
            new_pred = model.predict(scaled_data)[0]
            # get corresponding value from the diagnosis dictionary (using the model prediction as the key)
            result = diagnosis.get(new_pred)
            return {'Diagnosis': result}, 200
        except:
            # if client sends the wrong request or data type then return correct format
            return {'Error! Please use this JSON format': {"Pregnancies": 5,
                                              "Glucose": 32,
                                              "BloodPressure": 43,
                                              "SkinThickness": 23,
                                              "Insulin":22,
                                              "BMI": 33.6,
                                              "DiabetesPedigreeFunction":  1.332,
                                              "Age": 50
                                             }}, 500
```

Finally, we add the URI of the `Records` resource and run the API:

```python
api.add_resource(Records, '/')
app.run(port=5000, debug=True)
```

We test the local API with Postman to make sure it works before deploying it.

![GET request to local server](/engineering-education/integrate-ml-to-flask-api-and-deploy-to-heroku/get_request_local.png)

After sending a GET request, we get a response showing the JSON format we should send in a POST request. Now we send a POST request with JSON data in the same format shown above.

![POST request to local server](/engineering-education/integrate-ml-to-flask-api-and-deploy-to-heroku/post_request_to_local_api.png)

After sending the POST request, we get the model prediction as a response. Let us see what happens if the client sends the wrong JSON data to the API.

![POST request with the wrong format to local server](/engineering-education/integrate-ml-to-flask-api-and-deploy-to-heroku/post_wrong_request_to_local_server.png)

If we send the wrong JSON data to the API, we get an error message with the 500 status code.

However, the client will also receive the correct JSON data format. Since our API is working fine, we can proceed to deploy it.

### Deploying to Heroku
The next step is to deploy our API so other developers can have access to it.

Next, we will deploy the API to Heroku. Heroku is a cloud platform that allows developers to build, run, and deploy their apps.

If you do not have a Heroku account, you can create one by clicking [here](https://signup.heroku.com/).

We need to install Git and Heroku CLI (Command Line Interface) on our PC. Heroku uses git to manage the deployment of apps.

Click [here](https://git-scm.com/downloads) to download and install git.

Use this [link](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) to download and install Heroku CLI.

With Heroku CLI, we can use our terminal to deploy. The Heroku CLI allows us to access Heroku from our terminal.

With it, we can create and manage applications on Heroku with ease.

To access Heroku CLI, we log in to Heroku from our terminal:

```bash
heroku login
```

This command takes us to the Heroku login page on our web browser. If you want to remain in the CLI and log in, use the command below instead:

```bash
heroku login -i
```

After successfully logging in, we can proceed. We can initialize a git repo in our project directory after installing git:

```bash
git init
```

We need to add two files to our project directory: `Procfile` and `requirements.txt`.

The `Procfile` tells Heroku what to do with the code you want to push to their server.

The `requirements.txt` contains all the dependencies we need to install to run our API on Heroku.

We will be running the API using `Gunicorn`. First, we need to install it.

`Gunicorn` is a web server that is more powerful than the built-in server that flask gives you. The built-in server in the flask can only handle one user at a time. But `Gunicorn` can deal with many users at once.

Click [here](https://towardsdatascience.com/my-favorite-python-servers-to-deploy-into-production-d92289764fbe) to learn more.

```bash
pip install gunicorn
```

Create a new file, `Procfile`, and add the code below in the file:

```bash
web: gunicorn api: app
```

Here, the `Procfile` tells Heroku that we want to run a web API using gunicorn. The api in the code above represents the name of our python script. So, we want to run the app inside the `api.py` script.

For the `requirements.txt` file, run the command below in your terminal:

```bash
pip freeze > requirements.txt
```

Running the command creates a `requirements.txt` file. It contains all the libraries installed in the virtual environment.

```bash
aniso8601==9.0.1
certifi==2021.5.30
charset-normalizer==2.0.4
click==8.0.1
colorama==0.4.4
Flask==2.0.1
Flask-RESTful==0.3.9
gunicorn==20.1.0
idna==3.2
itsdangerous==2.0.1
Jinja2==3.0.1
joblib==1.0.1
MarkupSafe==2.0.1
numpy==1.21.2
pymongo==3.12.0
pytz==2021.1
requests==2.26.0
scikit-learn==0.24.2
scipy==1.7.1
six==1.16.0
threadpoolctl==2.2.0
urllib3==1.26.6
Werkzeug==2.0.1
```

Before we push our API to Heroku, we need to remove the last line of code in the `api.py` file. We can comment it out.

Our API will be running on a Gunicorn, so we do not need that last line:

```python
# app.run(port=5000, debug=True)
```

Create one more file, `.gitignore`. Add the name of the virtual environment venv to the file. We want git to ignore the virtual environment.

Now we can commit our code and push it to Heroku:

```bash
git add .
git commit -m "comment last line of code"
```

The Heroku create command creates a new empty app on the Heroku server. It gives us the URL for the app and the associated Heroku Git Repository.

```bash
heroku create <app-name>
```

In the code above, <app-name> is a placeholder. Note that the name of your application must be unique.

If you cannot come up with a unique app name, run the code below instead. Heroku will come up with a unique app name for you:

```bash
heroku create
```

We push our API to Heroku:

```bash
git push heroku main
```

It will take a while to deploy your API to Heroku. However, here is what you may see on your screen:

![Deploying to Heroku](/engineering-education/integrate-ml-to-flask-api-and-deploy-to-heroku/push_to_heroku.png)

Once deployment is complete, we test our API with Postman:

![GET request to Deployed API](/engineering-education/integrate-ml-to-flask-api-and-deploy-to-heroku/push_to_heroku.png)

The GET request works:

![POST request to Deployed API](/engineering-education/integrate-ml-to-flask-api-and-deploy-to-heroku/post_request_to_deployed_api.png)

The POST request also returns the correct response.

If the client sends incorrect JSON data, the API returns the correct JSON format as a response:

![POST request with the wrong format to Deployed API](/engineering-education/integrate-ml-to-flask-api-and-deploy-to-heroku/post_wrong_request_to_deployed_api.png)

### Conclusion
In this guide, we learned how to save a machine learning model to a file. Then, we integrated the ML model into a Flask-REST API and deployed it to Heroku using Heroku CLI.

Besides using Heroku CLI, you can also deploy your API to Heroku from GitHub. Other software developers can now use the API you deployed in their apps, whether a web app or an Android app.

You can also integrate your machine learning model into a web application. This [article](https://www.section.io/engineering-education/deploying-machine-learning-models-using-flask/) will help you with that.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
