FastAPI is a new Python-based web framework used to create Web APIs. FastAPI is fast when serving your application, also enhances the performance of our application.

### Table of contents

- [Prerequisites](#prerequisites)
- [Building the machine learning model](#building-the-machine-learning-model)
- [Introduction to the FastAPI](#introduction-to-the-fastapi)
- [Dockerizing the FastAPI application](#dockerizing-the-fastapi-application)
- [Deploying the FastAPI application to Kubernetes cluster](#deploying-the-fastapi-application-to-kubernetes-cluster)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites

1. You must have a good understanding of [Python](https://www.section.io/engineering-education/python-projects-for-beginners/)
2. You must have an excellent working knowledge of [machine learning models](https://www.section.io/engineering-education/house-price-prediction/)
3. You must have [Docker](https://www.section.io/engineering-education/getting-started-with-docker/) installed in your machine.
4. You must have [Kubernetes](https://www.section.io/engineering-education/introduction-to-kubernetes/) installed in your machine.
5. Know how to use [Google Colab](https://research.google.com/) or [Jupyter Notebook](https://jupyter.org/). In this tutorial, we shall use Google Colab in building our model

> NOTE: For you to follow along easily use [Google Colab](https://research.google.com/), it's easy to use fast when building models.

### Building the machine learning model

We will build a machine learning model that will predict the nationality of individuals using their names.
This is a simple model that will explain the key concepts used in machine learning modeling.

### Dataset to be used

The dataset used will contains common names of people and their nationalities.
Our data used is as shown.

![A Snip of the data](/engineering-education/how-to-create-a-machine-learning-app-using-the-fast API-and-deploying-it-to-Kubernetes-cluster/snip.png)
[CSV File of data](https://drive.google.com/file/d/1UNIqFDaqmfRxPmQaOC8SCPOQln27tfr-/view?usp=sharing)

### Installation of the Python packages

We will use the following packages when building our model.

1. [Pandas](https://pandas.pydata.org/)

   Pandas is a software library written for the Python programming language for data manipulation and analysis.
   It's a tool for reading and writing data between in-memory data structures and different file formats.

2. [Numpy](https://numpy.org/)

   NumPy is the fundamental package for scientific computing in Python. NumPy arrays facilitate advanced mathematical and other types of operations on large numbers of data.

3. [Sckit-learn](https://scikit-learn.org/)

   Is a free software machine learning library for the Python programming language. It consists various classification, regression and clustering algorithms including support vector machines, random forests, gradient boosting, k-means and linear regression.

Run the following commands to install the packages.

```bash
pip install pandas
pip install numpy
pip install sklearn
```

### Loading our exploratory data analysis(EDA) packages

These packages are used for [Exploratory data analysis(EDA)](https://en.wikipedia.org/wiki/Exploratory_data_analysis) to summarise the main characteristics of our data for easy visualization.
It helps determine how best to manipulate data sources to get the answers you need, making it easier in discovering patterns, spot anomalies, test a hypothesis and check for assumptions.

- `pandas` is library written for the Python programming language for data manipulation and analysis.
- `numpy` is the fundamental package for scientific computing in Python. NumPy arrays facilitate advanced mathematical and other types of operations on large numbers of data.

```python
import pandas as pd
import numpy as np
```

### Loading from Scikit-learn package

[Scikit-learn](https://scikit-learn.org/) will be the package used for predictive analysis since it contains different tools for machine learning modeling and various algorithms for classification, regression, and clustering.

```python
import MultinomialNB from sklearn.naive_bayes
import CountVectorizer from sklearn.feature_extraction.text
import train_test_split from sklearn.model_selection
import accuracy_score from sklearn.metrics
```

In the above code snippet, we have imported the following.

#### `MultinomialNB`

This is the classifier method that is found in the Naive Bayes algorithm. We shall use `MultinomialNB` in the building of our model.
Naive-Bayes classification technique is based on Bayes' Theorem, Naive Bayes model is easy to build and particularly useful for very large data sets. Along with simplicity, Naive Bayes is known to outperform even highly sophisticated classification methods.

Naïve Bayes classifiers are highly scalable algorithms that requires a number of features when building a classification model.
This an important concept that a user needs to grasp because this is the building block for our model.
In our case we specifically use `MultinomialNB` from the Naive Bayes algorithm since its suitable for classification with discrete features which is the case for our model.
For further reading about the Naive Bayes algorithm and how it's useful in classification you can use this amazing article.

[Understanding Naive Bayes Classifier](https://towardsdatascience.com/naive-bayes-classifier-81d512f50a7c)

#### `CountVectorizer`

Is used to fit our model into the inputs of our dataset. `CountVectorizer` also transforms our dataset into vectors which are more readable inputs, the dataset is then used by our model during the training phase. It is also used to extract features from our dataset. Features are the inputs for our model.
For more details about CountVectorizer, this great article can be used for further reading.

[Basics of CountVectorizer](https://towardsdatascience.com/basics-of-countvectorizer-e26677900f9c)

#### `train_test_split`

This is what is used in splitting our dataset. Our dataset will be split into `train_set` and `test_set`.

#### `accuracy_score`

It is used to measure the accuracy of our model in percentage. USed gauge how our model learned during the training phase.

We will use the [Naive Bayes Classifier](https://en.wikipedia.org/wiki/Naive_Bayes_classifier) for our modeling.
We choose the Naive Bayes Classifier algorithm for our classification instead of the other algorithms due to the following reasons.

1. It's simple and easy to implement.
2. It tends to give a higher accuracy as compared to the other algorithm.
3. Naive Bayes is fast during training as compared to other algorithms.
4. Other algorithms tend to memorize rather than learn, unlike Naive Bayes which ensures that a model learns during training.

- Other common algorithms used are as follows.

1. [Logistic Regression.](https://analyticsindiamag.com/7-types-classification-algorithms/)
2. [Stochastic Gradient Descent.](https://analyticsindiamag.com/7-types-classification-algorithms/)
3. [K-Nearest Neighbours.](https://analyticsindiamag.com/7-types-classification-algorithms/)
4. [Decision Tree.](https://analyticsindiamag.com/7-types-classification-algorithms/)
5. [Random Forest.](https://analyticsindiamag.com/7-types-classification-algorithms/)

### Loading our dataset

We use the `pandas` package to import our `nationality.csv` dataset.
We also use `pandas` for data manipulation and data analysis.

```python
df = pd.read_csv("nationality.csv")
```

### Nature of our data

We need to understand the nature of the dataset that we have. For example, we need to know the number of names in the dataset, the columns, and the rows present in the data.

```python
df.shape
```

The output is as shown.
This shows the size of our dataset.

```bash
(3238, 3)
```

```python
df.head
```

The output is shown:
This shows that our datasst has two columns: `names` and `nationality` column.

```bash
Unnamed: 0  names nationality
0       0   Louane  french
1       1   Lucien  french
2       2   Yamazaki japanese
3       3   Zalman  yiddish
4       4   Zindel  yiddish
```

```python
df.columns
```

Output is shown.

```bash
Index(['Unnamed: 0', 'names', 'nationality'], dtype='object')
```

### All the nationalities available in our data

```python
df['nationality'].unique()
```

The ouput gives an array of all the nationalities available in our dataset, as shown below.

```bash
array(['yiddish', 'gaelic', 'african', 'irish', 'hungarian', 'german',
       'swedish', 'japanese', 'italian', 'american', 'hawaiian', 'greek',
       'polynesian', 'scandinavian', 'spanish', 'celtic', 'old-english',
       'korean', 'sanskrit', 'african-american', 'hebrew', 'norse',
       'chinese', 'finnish', 'persian', 'scottish', 'slavic', 'english',
       'old-norse', 'dutch', 'armenian', 'welsh', 'polish', 'teutonic',
       'russian', 'egyptian', 'arabic', 'swahili', 'native-american',
       'old-french', 'french', 'middle-english', 'latin', 'vietnamese',
       'danish', 'hindi', 'old-german', 'turkish', 'indian',
       'czechoslovakian'], dtype=object)
```

### Checking if our data is balanced

This shows the available number of names in each nationality. The nationalities should have almost the same number of names to ensure that the model is well trained.
As we can see most of the nationalities have a total of `100` names.

```python
df.groupby('nationality')['names'].size()
```

Output of our nationalities.

```bash
nationality
african             100
african-american    100
american            100
arabic              100
armenian             17
celtic               62
chinese             100
czechoslovakian      38
danish               11
dutch                24
egyptian             30
english             100
finnish              13
french              100
gaelic               87
german              100
greek               100
hawaiian            100
hebrew              100
hindi               100
hungarian            64
indian               25
irish               100
italian             100
japanese            100
korean               16
latin               100
middle-english       45
native-american     100
norse                40
old-english         100
old-french           46
old-german           40
old-norse            28
persian              55
polish               48
polynesian           15
russian              85
sanskrit             28
scandinavian        100
scottish             74
slavic               79
spanish             100
swahili              16
swedish              14
teutonic             32
turkish              52
vietnamese           52
welsh                91
yiddish              11
Name: names, dtype: int64
```

### Visualizing our data using the Matplotlib library

[Matplotlib](https://matplotlib.org/) is a Python library used for plotting hence easy visualization of our data in the form of a graph.
In this tutorial we will be using [Google Colab](https://research.google.com/) as our notebook since it's very fast in machine learning.
Run the below code snippet on [Google Colab](https://research.google.com/) so you can import Matplotlib.

```python
import matplotlib.pyplot as plt
%matplotlib inline
```

```python
df.groupby('nationality')['names'].size().plot(kind='bar',figsize=(20,15))
```

Our bar graph is as shown:

![Bar Graph](/engineering-education/how-to-create-a-machine-learning-app-using-the-fast API-and-deploying-it-to-kubernates-cluster/bar-graph.png)

### Checking our features

- `Xfeatures` are individual independent variables that act like a input in your system, while making the predictions, models use such features to make the predictions.

- `ylabels` will be used as outputs when making predictions.

```python
Xfeatures = df['names']
ylabels= df['nationality']
```

### Vectorizing our features

We will use the `CountVectorizer()` method to transform our dataset into readable inputs to be used by our model.
This method is also used to extract features from our dataset. Features are the inputs used for training our model.
For more details about CountVectorizer, this great article can be used for further reading.

- [Basics of CountVectorizer](https://towardsdatascience.com/basics-of-countvectorizer-e26677900f9c)

```python
vec = CountVectorizer()
X = vec.fit_transform(Xfeatures)
```

We also need to initialize the `get_feature_names()` method which is used to get features of our system. Features are the independent variables in our dataset that are used as inputs when building our model.

```python
vec.get_feature_names()
```

### Splitting of our data

We need to split our dataset into `train_test` and `test_test.` We shall use 70% of our data to train our model and 30% of our data for testing.

```python
x_train,x_test,y_train,y_test = train_test_split(X,ylabels,test_size=0.30)
```

### Building our model

We build our model using the [Naive Bayes Classifier](https://en.wikipedia.org/wiki/Naive_Bayes_classifier).
Naive Bayes is a simple classification algorithm to train and fit our model.
The reasons for choosing [Naive Bayes Classifier](https://en.wikipedia.org/wiki/Naive_Bayes_classifier) over the other algorithms has been stated earlier.

```python
nb = MultinomialNB()
nb.fit(x_train,y_train)
```

### Checking the accuracy of our model

We have to check the accuracy score of our model to know how well we trained our model. The higher the accuracy the better we trained our model.

```python
nb.score(x_test,y_test)
```

Our accuracy score is as shown:

```bash
0.85036482694119869
```

The final percentage accuracy for our model is `0.85036482694119869`.

### Making predictions

After we have trained our model, we can now feed our model with new inputs to start making predictions.
Our model will make accurate predictions based on how well we trained it. Therefore, the higher the accuracy score, the better our model will be in making predictions.

```python
name1 = ["Yin","Bathsheba","Brittany","Vladmir"]

vector1 = vec.transform(sample1).toarray()

nb.predict(vector1)
```

### Saving our model using joblib

We will use `joblib` to save our model into a pickle file.
Picking our model makes it easier to use our model in the future without repeating the training process.
A pickle file is a byte stream of our model. To use `joblib` we have to import the package from `sklearn.externals`.
Joblib is an important package that a user needs to underastand since this is what we will use in saving our model.
Here a detailed article that can help a reader fully grasp the use and functionalities of `joblib`.

- [Saving Machine Learning Models using Joblib](https://medium.com/@harsz89/persist-reuse-trained-machine-learning-models-using-joblib-or-pickle-in-python-76f7e4fd707)

```python
import joblib from sklearn.externals
```

```python
nationality_predictor = open("naive_bayes.pkl","wb")
joblib.dump(cv,nationality_vectorizer)
nationality_predictor.close()
```

We will name our pickle file 'naive_bayes.pkl'.

### Introduction to the FastAPI

FastAPI is a modern, fast web framework for building APIs with Python 3.6+ based on standard Python type hints.
The key features for FastApi are as follows:

1. Fast when building APIs.
2. Fast to code: Increases the speed of developing new features.
3. Fewer bugs: Reduce developer induced errors
4. Intuitive: Has great editor support, completion everywhere and less time debugging.
5. Easy: Designed to be easy to use and learn.
6. Short: Minimize code duplication with multiple features from each parameter declaration.
7. Robust: Get production-ready code with automatic interactive documentation.
8. Standards-based: Based on the open standards for APIs.

This makes Fast API potent since it combines the functionalities of best frameworks such as [flask](https://flask.palletsprojects.com/) and [swagger](https://swagger.io/)

### Installing the FastApi

Use the following commands in order to install FastAPi into our machine.

```python
pip install fastapi
```

Let's install the server.

- `univicorn` is server that is used to run FastAPI. We specify the `standard` version of `univicorn` which contains minimal dependencies. This version contains pure Python dependencies.
  This version is best suited for our model since we are dealing the core packages and dependancies used in building our model.

```python
pip install uvicorn[standard]
```

### Creating an API for our machine learning model using the FastAPI

1. First, create a new Python file and name it 'main.py.'
2. Add our pickle file 'naive_bayes.pkl' in a new folder.

The folder structure is as shown.

```bash
├── app.py
├── model
   ├── naive_bayes.pkl

```

- Let's get started working with our new 'app.py' file.

### Importing our FastApi packages

We need to import the install packages such as `uvicorn` and `FastAPI` so that we can start using these packages.

```python
import uvicorn
import FastAPI, Query from fast API
```

### Loading ML packages

We will use `joblib` to unpickle our previously pickled file, convert our serialized model back to its original form.
This article can give you a deeper understanding about `joblib`.

- [Saving Machine Learning Models using Joblib](https://medium.com/@harsz89/persist-reuse-trained-machine-learning-models-using-joblib-or-pickle-in-python-76f7e4fd707)

```python
import joblib from sklearn.externals
```

### Unplickling our naive Bayes classifier file

To use our saved model we need to convert it back to the original object. TThis allows us to use our model in the original form we had created.
This article can give you a more detailed guidance about unpliking a model.

- [A Beginner's guide to Pickling and Unpickling](https://www.pythoncentral.io/how-to-pickle-unpickle-tutorial/)

```python
nationality_naive_bayes = open("model/naive_bayes.pkl","rb")
nationality_cv = joblib.load(nationality_naive_bayes)
```

### Initializing our app

We initialize our model using the `FastAPI()` method.

```python
app = FastAPI()
```

### Creating our routes

We will create a simple route that will run localhost port 8000.
To create our route we shall use the concept of Asynchronous programming in creating routes.

- [Asynchronous programming](https://www.aeracode.org/2018/02/19/python-async-simplified/) allows a program to run multiple operations without waiting for other operations to complete.

This is an important concept in any programming language since it allows multiple operations to run in parallel without blocking each other.
Asynchronous programming is an advanced concept that has become very important in Python language. For a detailed guidance on this concept this article is very helpful.

- [Get started with async in Python](https://www.infoworld.com/article/3454442/get-started-with-async-in-python.html)

We shall use then [`async`](https://fastapi.tiangolo.com/async/#in-a-hurry) function when creating our `FastApi` routes. This enables the `FastApi` to create multiple routes concurrently.

```python
@app.get('/')
async def index():
  return {"text":"Our First route"}
```

```python
if __name__ == '__main__':
  uvicorn.run(app,host="127.0.0.1",port=8000)
```

![A Snip of our first route](/engineering-education/how-to-create-a-machine-learning-app-using-the-fastapi-and-deploying-it-to-Kubernetes-cluster/first-route.png)

![Interactive API docs](/engineering-education/how-to-create-a-machine-learning-app-using-the-fastapi-and-deploying-it-to-kubernates-cluster/main-doc.png)

The above routes are used to show how to make a simple index route using the FastAPI.
Now we shall add more routes for our machine learning model.

### Adding route for our machine learning logic

We will add a get route for making nationality predictions.

The following function can also be used to make predictions. We use the `predict_nationality()` method when we want to make predictions about someone's nationality.

```python
def predict_nationality(x):
  vect = nationality_cv.transform(data).toarray()
  result = nationality_clf.predict(vect)
  return result
```

### Adding a route to make predictions

We will use this route to get the ethnicity of a person based on the name input by the user.

```python
@app.get('/predict/{name}')
async def predict(name: str = Query(None, min_length=2, max_length=12)):
  if request.method == 'GET':
    namequery = request.form['namequery']
    data = [namequery]
    vect = nationality_cv.transform(data).toarray()
    result = nationality_cv.predict(vect)

    return {"orig_name": name, "prediction": result}
```

Make sure to include this in your file to specify the port that will serve your app.

```python
if __name__ == '__main__':
  uvicorn.run(app,host="127.0.0.1",port=8000)
```

Our output is as shown:

Interactive API docs: http://127.0.0.1:8000/docs

![All Routes](/engineering-education/how-to-create-a-machine-learning-app-using-the-fastapi-and-deploying-it-to-Kubernetes-cluster/all-routes.png)

The route to be used to make a prediction:

![Prediction route](/engineering-education/how-to-create-a-machine-learning-app-using-the-fast API-and-deploying-it-to-Kubernetes-cluster/making-predictions.png)

We have finally served our machine learning model as API using the FastAPI.

### Dockerizing the FastAPI application

It involves creating a Docker Container for our application.

A Docker Container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.

Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.

Container images become containers at runtime and in the case of Docker containers, images become containers when they run on Docker Engine
To create a docker container, we have to use the following steps.

1. Create a Docker file.
   In your working directory create a DockerFile.

Your working directory is as shown below:

```bash
├── app.py
├── Dockerfile
├── model
   ├── naive_bayes.pkl

```

2. Creating Docker Layers

Docker Layers are what compose the file system for both Docker images and Docker containers. Each layer corresponds to certain instructions in your Dockerfile. In our Dockerfile we have instructions, the instructions are shown below from defining our base image to creating an entry point to be used to execute our image.

If these steps are followed we will end up with a Docker image. The steps are as follows.

#### Define base image

A base image is the image that is used to create all of your container images.

```docker
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
```

#### Create a working directory

```docker
WORKDIR /app
```

#### Copy the app into the new directory created

```docker
COPY ./app /app
```

#### Install in the new working directory

```docker
RUN pip install fastapi uvicorn
```

#### Expose the port to serve your application

```docker
EXPOSE 8000
```

#### Create an entry point to be used to execute our image

```docker
ENTRYPOINT ["uvicorn", "app:app --reload"]

CMD ["uvicorn", "app.app:app", "8000"]
```

3. Create Docker image

Image result for docker image
A Docker image contains application code, libraries, tools, dependencies and other files needed to make an application run

```docker
docker build -t fastapi-test-app:new .
```

#### The output is as shown

This output shows the process used when creating a docker image.

```bash
Sending context building to the Docker daemon  34.90kb
Step 1/7 : FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
  --->db183g656y4h
Step 2/7 : WORKDIR /app
  --->Using Cache
  --->5df25yffdpbc
Step 3/7 : COPY ./app /app
    --->Using Cache
    --->25dffbfdjdf5
Step 4/7 : RUN pip install fastapi uvicorn
    --->Using Cache
    --->edf81dffcdf5
Step 5/7 : EXPOSE 8000
    --->Using Cache
    --->afd99eb62d2
Step 6/7 : ENTRYPOINT ["uvicorn", "app:app --reload"]
    --->07taebte2egd
Removing intermediate container 4edte5ta382
 ---> 2de6fstf5uv09
step 7/7 : CMD ["uvicorn", "app.app:app", "8000"]
Successfully built 2de6fstf5uv09
Successfully tagged fastapi-test-app:new
```

#### Listing all of our created images

In order to list all the docker images we had created earlier you can use the following command.

```docker
docker image ls
```

- Output:

```bash
REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
fastapi-test-app             new                2de6fstf5uv09      3 minutes ago       1.34GB
testing                      latest             d661f1t3e0b         2 weeks ago          994MB
```

4. Creating docker container

Docker containers are the live, running instances of Docker images, users can interact with them, and administrators can adjust their settings and conditions using docker commands

```bash
docker run -p 8000:8000 fastapi:new
```

Result:

```bash
e0f1bd4gv1f7t3dti5e89fd1o29341a50ete9hgad8ed0ye0ff27dt81667fu16b
```

After Dockerizing our FastApi application, we now need to deploy it to Kubernetes Cluster.

### Deploying the FastAPI application to Kubernetes cluster

Kubernetes is a container orchestration system that is used for the deployment of docker-created containers. It is meant to manage and coordinate clusters and workloads at a larger scale in a production environment efficiently.
Helps to manage containerized services through automation in deployment.

We create a new file called 'deployment.yaml' in our working directory.
Our folder structure is as shown:

```bash
├── app.py
├── Dockerfile
├── deployment.yaml
├── model
   ├── naive_bayes.pkl

```

The code snippet for the deployment.yaml file is as shown:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: fastapi-test-service
spec:
  selector:
    app: fastapi-test-app
  ports:
    - protocol: "TCP"
      port: 3000
      targetPort: 8000
  type: LoadBalancer

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fastapi-test-app
spec:
  selector:
    matchLabels:
      app: fastapi-test-app
  replicas: 5
  template:
    metadata:
      labels:
        app: fastapi-test-app
    spec:
      containers:
        - name: fastapi-test-app
          image: fastapi-test-app
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8000
```

The file has two sections:

1. Service - Acts as the load balancer. A load balancer is used to distribute different sets of tasks to the various available servers in the network to maximize the usage of the available resources.

2. Deployment- This is the intended application that we want to deploy to the Kubernetes engine. The user will then send a request to the load balancer in the service. Then the load balancer distributes the request by creating the number of replicas defined in the deployment.yaml file. Here, we are using five replicas for scalability. Hence there will be five instances of the application running at a time.

When we have various replicas, it creates redundancy so that if one instance fails, the others will continue running.

The deployment. yaml file is connected to the Docker image created earlier. In the deployment .yaml file, we specify the image name created earlier.

### Deployment of our application to Kubernetes cluster

We have dockerized our FastAPI application, and now we will deploy it to a Kubernetes engine.

Run the following command:

```bash
kubectl apply -f deployment.yaml
```

This command will deploy our service and application instances created above to the Kubernetes engine. After running this command, the fastapi-test-service and the fastapi-test-app are created.

### Deployment dashboard

Minikube and Kubernetes provide a dashboard that is used to visualize the deployment. To see the deployed container in the dashboard, we use the following command.

```bash
minikube dashboard
```

Our dashboard will be as shown:
![Dashboard Overview](/engineering-education/how-to-create-a-machine-learning-app-using-the-fastapi-and-deploying-it-to-kubernetes-cluster/kubernetes-dashboard.png)
![Running Clusters](/engineering-education/how-to-create-a-machine-learning-app-using-the-fastapi-and-deploying-it-to-kubernetes-cluster/ui-dashboard.png)

### Accessing our application

We access our application using the following command:

```bash
minikube start service: fastapi-test-service
```

Therefore we have deployed our Containerised FastAPI application to the Kubernetes cluster.

### Conclusion

In this tutorial, we have learned how to create a machine learning model. We have followed all the steps from data pre-processing to train and build our model finally.
We have also learned about the FastAPI, which is an efficient library for making WebAPIs. The FastAPI has helped us to serve our machine learning model as an API.
We then containerized our fast API application using docker. Finally, we deployed the application to the Kubernetes cluster.
Using these steps, a reader should be able to comfortably build a FastAPI application and deploy it to the Kubernetes cluster.

### References

- [Scikit-learn Documentation](https://scikit-learn.org/)
- [Pandas Documentation](https://pandas.pydata.org/)
- [NumPy Documentation](https://numpy.org/)
- [Docker Documentation](https://www.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
