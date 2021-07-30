FastApi is a new python-based web framework used to create Web APIs. FastAPi is fast when serving your application, also enhances the performance of our application.
In this tutorial, we will start by building a simple machine learning model, which served as an API using the FastAPI, thereafter deploy the machine app to the Kubernetes cluster.

### Table of contents

- [Prerequisites](#prerequisites)
- [Building the machine learning model](#building-the-machine-learning-model)
- [Introduction to the FastAPI](#introduction-to-the-fastapi)
- [Dockerizing the FastAPI application](#dockerizing-the-fastapi-application)
- [Deploying the FastAPI application to Kubernetes cluster](#deploying-the-fastapi-application-to-kubernetes-cluster)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites

1. You must have a good understanding of Python
2. You must have a good working knowledge of machine learning models
3. You must have docker installed in your machine.
4. You must have Kubernetes

### Building the machine learning model

We will build a machine learning model that will be used to predict the nationality of individuals using their names.
This is a simple model that will be used to explain the key concepts used in machine learning modeling.

### Dataset to be used

The dataset used will contains common names of people and their nationalities.
Our data used is as shown.

![A Snip of the data](/how-to-create-a-machine-learning-app-using-the-fast API-and-deploying-it-to-Kubernetes-cluster/snip.png)
[CSV File of data](https://drive.google.com/file/d/1ztQkET6U8EgtGWiprJFoXLICNP3cl34i/view?usp=sharing)

### Installation of the python packages

We will use the following packages when building our model.

1. [Pandas](https://pandas.pydata.org/)
2. [Numpy](https://numpy.org/)
3. [Sckit-learn](https://scikit-learn.org/)

Run the following commands to install the packages.

```bash
pip install pandas
pip install NumPy
pip install sklearn
```

### Loading our EDA packages

These packages are used for Exploratory data analysis in order to summarise the main characteristics of our data for easy visualization.

```python
import pandas as pd
import NumPy as np
```

### Loading from Scikit-learn package

[Scikit-learn](https://scikit-learn.org/) will be the package to be used for predictive analysis since it contains different tools for machine learning modeling and various algorithms for classification, regression, and clustering.

```python
import MultinomialNB from sklearn.naive_bayes
import CountVectorizer from sklearn.feature_extraction.text
import train_test_split from sklearn.model_selection
import accuracy_score from sklearn.metrics
```

We will use the [Naive Bayes Classifier](https://en.wikipedia.org/wiki/Naive_Bayes_classifier) for our modeling.

### Loading our dataset

```python
df = pd.read_csv("nationality.csv")
```

### Nature of our data

We need to understand the nature of the dataset that we have, for example, we need to know the number of names in the dataset, the columns, and the rows present in the data.

```python
df.shape
```

```python
df.head
```

```python
df.columns
```

### All the nationalities available in our data

```python
df['nationality'].unique()
```

### Checking if our data is balanced

```python
df.groupby('nationality')['names'].size()
```

### Visualizing our data using the matplotlib library

[Matplotlib](https://matplotlib.org/) is a python library that is used for plotting hence easy visualization of our data in form of a graph.

```python
import matplotlib.pyplot as plt
%matplotlib inline
```

```python
df.groupby('nationality')['names'].size().plot(kind='bar',figsize=(20,15))
```

Our bar graph is as shown:

![Bar Graph](/how-to-create-a-machine-learning-app-using-the-fast API-and-deploying-it-to-kubernates-cluster/bar-graph.png)

### Checking our features

```python
Xfeatures = df['names']
ylabels= df['nationality']
```

### Vectorizing our features

We will use count vectorizer to transform our dataset

```python
vec = CountVectorizer()
X = vec.fit_transform(Xfeatures)
```

```python
vec.get_feature_names()
```

### Splitting of our data

We use 70% of our data to train our model and 30% of our data for testing.

```python
x_train,x_test,y_train,y_test = train_test_split(X,ylabels,test_size=0.30)
```

### Building our model

We build our model using the [Naive Bayes Classifier](https://en.wikipedia.org/wiki/Naive_Bayes_classifier).
Naive Bayes is a simple classification algorithm to train and fit our model.

```python
nb = MultinomialNB()
nb.fit(x_train,y_train)
```

### Checking the accuracy of our model

We have to check the accuracy score of our model in order to know how well we trained our model.

```python
nb.score(x_test,y_test)
```

### Making predictions

After we have trained our model we can now feed our model with new inputs so that it can start making predictions.
Our model will make accurate predictions based on how well we trained it, the higher the accuracy score the better our model will be in making predictions.

```python
name1 = ["Yin","Bathsheba","Brittany","Vladmir"]

vector1 = vec.transform(sample1).toarray()

nb.predict(vector1)
```

### Saving our model using joblib

We will use joblib to save our model into a pickle file.
Picking our model makes it easier to use our model in the future without repeating the training process again.
A pickle file is a byte stream of our model, by importing joblib from sklearn

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

[FastApi](https://fastapi.tiangolo.com/) is a new python-based web framework that is used to create Web APIs. FastAPi is really fast when serving the application, this enhances the app's performance.
It is used with Python 3.6+.
Fast API is very powerful since it combines the functionalities of best frameworks such as [flask](https://flask.palletsprojects.com/) and [swagger](https://swagger.io/)

### Installing the FastApi

Use the following commands:

```python
pip install fast API
```

Installing the server.

```python
pip install uvicorn[standard]
```

### Creating and API for our machine learning model using the FastAPI

1. First create a new Python file and name it 'main.py'
2. Add our pickle file 'naive_bayes.pkl' in a new folder.

The folder structure is as shown.

```bash
├── app.py
├── model
   ├── naive_bayes.pkl

```

- Let's get started working with our new 'app.py' file.

### Importing our FastApi packages

```python
import uvicorn
import FastAPI, Query from fast API
```

### Loading ML packages

We will use joblib to unpickle our previously pickled file

```python
import joblib from sklearn.externals
```

### Unplickling our naive Bayes classifier file

```python
nationality_naive_bayes = open("model/naive_bayes.pkl","rb")
nationality_cv = joblib.load(nationality_naive_bayes)
```

### initializing our app

```python
app = FastAPI()
```

### Creating our routes

We will create a simple route that will run localhost port 8000

```python
@app.get('/')
async def index():
  return {"text":"Our First route"}
```

```python
if __name__ == '__main__':
  uvicorn.run(app,host="127.0.0.1",port=8000)
```

![A Snip of our first route](/how-to-create-a-machine-learning-app-using-the-fastapi-and-deploying-it-to-kubernates-cluster/first-route.png)

![Interactive API docs](/how-to-create-a-machine-learning-app-using-the-fastapi-and-deploying-it-to-kubernates-cluster/main-doc.png)

The above routes are used to show how to make a simple index route using the FastAPI.
Now we shall add more routes for our machine learning model.

### Adding route for our machine learning logic

We will add a get route for making nationality predictions.

The foloowing function can also be used to make predictions:

```python
def predict_nationality(x):
  vect = nationality_cv.transform(data).toarray()
  result = nationality_clf.predict(vect)
  return result
```

### Adding a route to make predictions

This route will be used to get the ethnicity of a person based on the name input by the user.

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

Make sure to include this in your file to specify the port your app will be served.

```python
if __name__ == '__main__':
  uvicorn.run(app,host="127.0.0.1",port=8000)
```

Our output is as shown:

Interactive API docs: http://127.0.0.1:8000/docs
![All Routes](/how-to-create-a-machine-learning-app-using-the-fastapi-and-deploying-it-to-Kubernetes-cluster/all-routes.png)

The route to be used to make a prediction:

![Prediction route](/how-to-create-a-machine-learning-app-using-the-fast API-and-deploying-it-to-Kubernetes-cluster/making-predictions.png)

We have finally served our machine learning model as API using the FastAPI.

### Dockerizing the FastAPI application

In order to create a docker container, we have to use the following steps.

1. Create a docker file.
   In your working directory create a DockerFile.

Your working directory is as shown below:

```bash
├── app.py
├── Dockerfile
├── model
   ├── naive_bayes.pkl

```

2. Creating docker layers

```docker
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
```

- Create a working directory:

```docker
WORKDIR /app
```

- Copy the app into the new directory created.

```docker
COPY ./app /app
```

- Install in the new working directory

````docker
RUN pip install fastapi uvicorn
``

- Expose the port to serve your application.

```docker
EXPOSE 8000
````

- Create an entry point to be used to execute our image.

```docker
ENTRYPOINT ["uvicorn", "app:app --reload"]

CMD ["uvicorn", "app.app:app", "8000"]
```

3. Create Docker image

```docker
docker build -t fastapi-test-app:new .
```

- The output is as shown:

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

- Listing all of our created images.

```docker
docker image ls
```

- Output:

```bash
fastapi-test-app             new                2de6fstf5uv09      3 minutes ago       1.34GB
testing                      latest             d661f1t3e0b         2 weeks ago          994MB
```

4. Creating docker container

```bash
docker run -p 8000:8000 fastapi:new
```

Result:

```bash
e0f1bd4gv1f7t3dti5e89fd1o29341a50ete9hgad8ed0ye0ff27dt81667fu16b
```

After Dockerizing our FastApi application we now need to deploy it to Kubernetes Cluster.

### Deploying the FastAPI application to Kubernetes cluster

Kubernetes is a container orchestration system that is used for the deployment of docker-created containers. Is meant to manage and coordinate clusters and workloads at a larger scale in a production environment in an efficient manner.
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

1. Service - Acts as the load balancer. A load balancer is used to distribute different sets of tasks to the various available servers in the network in order to maximize the usage of the available resources.

2. Deployment- This is the intended application that we want to deploy to the Kubernetes engine. The user will then send a request to the load balancer in the service, then the load balancer distributes the request by creating the number of replicas that were defined in the deployment.yaml file. Here, are using five replicas for scalability, hence there will be 5 instances of the application running at a time.

When we have various replicas it creates redundancy so that if one instance fails, the others will continue running.

The deployment.yaml file is connected to the Docker image created earlier, In the deployment.yaml file we specify the image name that was created earlier.

### Deployment of our application to Kubernetes cluster

We have dockerized our FastAPI application, now we will deploy it to a Kubernetes engine.

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
![Dashboard Overview](/how-to-create-a-machine-learning-app-using-the-fastapi-and-deploying-it-to-kubernetes-cluster/kubernetes-dashboard.png)
![Running Clusters](/how-to-create-a-machine-learning-app-using-the-fastapi-and-deploying-it-to-kubernetes-cluster/ui-dashboard.png)

### Accessing our application

We access our application using the following command:

```bash
minikube start service: fastapi-test-service
```

Therefore we have deployed our Containerised FastAPI application to the Kubernetes cluster.

### Conclusion

In this tutorial, we have learned how to create a machine learning model. We have followed all the steps from data pre-processing to finally being able to train and build our model.
We have also learned about the FastAPI, which is an efficient library for making WebAPIs, the FastAPI has helped us to serve our machine learning model as an API.
We then containerized our fast API application using docker, we finally deployed the application to the Kubernetes cluster.
By using these steps, a reader should be able to comfortably build a FastAPI application and deploy it to the Kubernetes cluster.
