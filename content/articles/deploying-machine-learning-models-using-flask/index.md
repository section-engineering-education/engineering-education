---
layout: engineering-education
status: publish
published: true
url: /deploying-machine-learning-models-using-flask/
title: Deploying Machine Learning Models using Flask
description: This tutorial will serve as an introduction on deploying Machine Learning models using Flask. We will go through various steps for building an end-to-end web application with inbuilt Machine Learning model using Flask.
author: srishilesh-p-s
date: 2021-01-16T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/deploying-machine-learning-models-using-flask/hero.png
    alt: Deploying Machine Learning models using Flask
---
In this article, we will learn about deploying Machine Learning models using Flask. By the end of the article, you will have an overview of how Machine Learning models are built, how Flask servers interact with our Machine Learning model, and how to connect the model with a web application. You will also learn a step-by-step procedure for deploying the model locally.
<!--more-->
I highly recommend going over [this](/complete-guide-on-installing-flask-for-beginners/) article to better grasp those concepts regarding Flask. As a prerequisite, a little knowledge about [HTML](https://en.wikipedia.org/wiki/HTML) and [CSS](https://en.wikipedia.org/wiki/CSS) would help to follow this article along.

### Table of contents
- [Objective](#objective)
- [Machine Learning Model](#machine-learning-model)
- [HTML Webpage](#html-webpage)
- [Flask Webserver](#flask-webserver)
- [Output Display Page](#output-display-page)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Step by step guide for implementation
#### Objective
In this tutorial, we are going to deploy a simple Machine Learning model using the Flask webserver. As a demonstration, our Machine Learning model will helps us classify the variety of flowers based on the length and width of sepals and petals. We will build a simple HTML webpage to accept the measurements as input and classify the variety based on the classification model.

#### Machine Learning Model
##### Dataset
When building the Machine Learning model, we will make use of the [Iris](https://gist.github.com/netj/8836201) dataset. 

A glimpse of the data is as shown below:

![A few rows of Iris dataset](/engineering-education/deploying-machine-learning-models-using-flask/Dataset.PNG)

##### Classification Model
Having chosen the dataset, it's time to build our classification model. Let's name the file `model.py`.

First, we import the necessary Python libraries for building the classification model. 

Here, we use the following libraries:

- Pandas.

- Numpy.

- Sklearn/Sci-kit learn,

```python
# Importing necessary libraries
import pandas as pd # To manage data as data frames
import numpy as np # To manipulate data as arrays
from sklearn.linear_model import LogisticRegression # Classification model
```

After importing the libraries, we import the dataset using `pd.read_csv` command. This command reads the CSV file and transforms it into a data frame called `data`. Generally, working with data frames is much easier when compared to that of arrays.

The CSV file of the dataset can be downloaded [here](https://gist.github.com/netj/8836201) and saved in the same working directory of `model.py`.

```python
# Importing the dataset
data = pd.read_csv('./iris.csv')
```

![Iris dataset](/engineering-education/deploying-machine-learning-models-using-flask/Dataset.PNG)

As you see in the image, the target variable under the `variety` column has textual data. Since the textual data is made use of in building our Machine Learning model, we must encode the textual data as numbers.

For example, let's say, we map the flower variety `Setosa` as `0`, `Versicolor` as `1`, and `Virginica` as `2`. In the data frame `data`, we replace the textual data with respective numbers, based on the above mapping.

```python
# Dictionary containing the mapping
variety_mappings = {0: 'Setosa', 1: 'Versicolor', 2: 'Virginica'}

# Encoding the target variables to integers
data = data.replace(['Setosa', 'Versicolor' , 'Virginica'], [0, 1, 2])
```

Having replaced the textual data, we can get started with building the actual classification model.

First, we have to separate the independent values (features) from the dependent values (target). To do this, we make use of the `.iloc[]` method to slice the rows and columns of the data frame.

```python
X = data.iloc[:, 0:-1] # Extracting the features/independent variables
y = data.iloc[:, -1] # Extracting the target/dependent variable
```

In the above snippet, for features columns `X`, we consider all the columns from `0` to the last, but one. Here, `-1` signifies that we exclude the last column.

Similarly, for target column `y`, we consider only the last column.

```python
logreg = LogisticRegression(max_iter=1000) # Initializing the Logistic Regression model
logreg.fit(X, y) # Fitting the model
```

Next, we initialize the `LogisticRegression()` model by calling and creating a Python object and assigning it to a variable called `logreg`.

Finally, we fit the features `X` with the target values `y`. This can be done, by making use of `.fit()` function.

```python
# Function for classification based on inputs
def classify(a, b, c, d):
    arr = np.array([a, b, c, d]) # Convert to numpy array
    arr = arr.astype(np.float64) # Change the data type to float
    query = arr.reshape(1, -1) # Reshape the array
    prediction = variety_mappings[logreg.predict(query)[0]] # Retrieve from dictionary
    return prediction # Return the prediction
```

To modularize the code, we build a method called `classify()` to return the predictions based on the input arguments passed. In this function, we accept the length and the width of both sepal and petal as input arguments. Then, we make a numpy array using `np.array()`, convert the data type from `string` to `float`, and reshape the array by finding the transpose.

Now, our Logistic regression model classifies the variety based on the above-pre-processed input. The probability score predicted using logistic regression can be used when finding the right mapping to the name of variety, using a dictionary called `variety_mappings`.

For example, if the rounded-off probability score is `1`, then `variety_mappings[1]` would be `Versicolor`.

#### HTML webpage
Having built our Machine Learning model, now let's build a simple form using HTML to accept the inputs from the user.

Since our objective is not learning how to build an HTML webpage, let's focus on building the body content. The remaining contents are written to enhance the webpage. Full webpage code can be found [here](https://github.com/srishilesh/Machine-learning/blob/master/Local%20Deployment/templates/home.html).

We have built our webpage using Bulma CSS. To learn more about it, refer to the [documentation](https://bulma.io/documentation/) for better understanding of the CSS classes.

```html
<body>
    <div id="login-form-container">
        <form action="classify" method="GET">
            <div class="card" style="width: 400px">
            <div class="card-content">
                <div class="media">
                <div class="is-size-4 has-text-centered">Flower Variety Classification</div>
                </div>
                <div class="content">

                <div class="field">
                    <p class="control">
                    Sepal Length: <input class="input" type="number" value='0.00' step='0.01' name="slen" id="slen">
                    </p>
                </div>

                <div class="field">
                    <p class="control">
                    Sepal Width: <input class="input" type="number" value='0.00' step='0.01' name="swid" id="swid">
                    </p>
                </div>

                <div class="field">
                    <p class="control">
                    Petal Length: <input class="input" type="number" value='0.00' step='0.01' name="plen" id="plen">
                    </p>
                </div>

                <div class="field">
                    <p class="control">
                    Petal Width: <input class="input" type="number" value='0.00' step='0.01' name="pwid" id="pwid">
                    </p>
                </div>
                
                <div class="field">
                    <button class="button is-fullwidth is-rounded is-success">Submit</button>
                </div>
                </div>
            </div>
        </form>
    </div>
</body>
```

The above code is saved as `home.html` under the directory `./templates/home.html`.

To explain the above code in simple words, we created a `div` tag with class `field` containing `input` tags with its respective labels. 

Each `input` tag has fixed styling property like:

- `class = "input"`

- `type="number"`

- `value='0.00'`

- `step='0.01'`

- `name` and `id` based on the respective fields

All the `div` tags are enclosed within a `form` with `action="classify"` and `method="GET"`. Here, `GET` request helps us transport the data from the HTML form to the backend server. To learn more about such methods, [this](/rest-api/) article would help you understand better.

#### Flask webserver
In Python, we use the Flask framework to host local servers and when routing the webpages. Here, we will use it when deploy our Machine Learning model locally. If you are new to the Flask framework, it is highly recommended to go over [this](/complete-guide-on-installing-flask-for-beginners/) article before building.

To begin, let's start building by importing the necessary libraries.

```python
import model # Import the python file containing the ML model
from flask import Flask, request, render_template # Import flask libraries
```

Here, the `model` refers to the Machine Learning model that we built earlier. To import all the methods from `model.py`, we specify `import model`. Apart from our Machine Learning model, we also import other Flask related libraries.

As the first step in building the Flask server we start by initializing the server, and routing it to the default URL path.

```python
# Initialize the flask class and specify the templates directory
app = Flask(__name__,template_folder="templates")

# Default route set as 'home'
@app.route('/home')
def home():
    return render_template('home.html') # Render home.html
```

In the above snippet, we specified the current module `__name__` as an argument to the parameterized constructor `Flask()`. We also specify the `template_folder` containing all the webpage related files. Then, we assign the constructor to `app`.

Now, we set the default route of the server to `/home` by specifying the path in `@app.route()` function. This method works whenever the `/home` route is called for. Here, we set the default page as `home.html` using the `render_template()` method.

```python
# Route 'classify' accepts GET request
@app.route('/classify',methods=['GET'])
def classify_type():
    try:
        sepal_len = request.args.get('slen') # Get parameters for sepal length
        sepal_wid = request.args.get('swid') # Get parameters for sepal width
        petal_len = request.args.get('plen') # Get parameters for petal length
        petal_wid = request.args.get('pwid') # Get parameters for petal width

        # Get the output from the classification model
        variety = model.classify(sepal_len, sepal_wid, petal_len, petal_wid)

        # Render the output in new HTML page
        return render_template('output.html', variety=variety)
    except:
        return 'Error'
```

Similarly, we create a separate route for the Machine Learning model. Here, we use the `/classify` route with the `GET` method as the default method.

In this method, we retrieve the data from the form action in `home.html` through a `GET` request. Now, we retrieve the data from each of the input fields in the form, using its `name` attribute. To retrieve, we use `request.args.get()`.

Using the above command, we retrieve the data from all 4 input fields. Later, it is passed to the `classify()` method of our Machine Learning model `model.py`.

To call a method in another file, we specify the `filename.methodname()`. Here, it is `model.classify()`. This method returns the variety of the flower as a `string` data type.

To render the returned value i.e the variety of flowers, we specify the output HTML file along with the arguments to be rendered, using the `render_template(filename, arguments)` command.

Finally, to run the Flask webserver, we must use the `app.run()` method as shown below:

```python
# Run the Flask server
if(__name__=='__main__'):
    app.run(debug=True)
```

#### Output display page
Having predicted the variety of the flower, now we have to display our classification, back in a new HTML webpage.

To do this, we create a very similar HTML webpage like we did earlier. Now, we name a new file as `output.html` and save it in the directory `./templates/output.html`.

```html
<body>
    <div id="login-form-container">
        <div class="card" style="width: 400px">
            <div class="card-content">
                <div class="media">
                    <div class="is-size-4 has-text-centered">
                        {{ variety }}
                    </div>
                </div>
                <form action="home">
                    <div class="field">
                        <button class="button is-fullwidth is-rounded is-success">Retry</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
```

In the above code, `{{ variety }}` specifies the input argument that was passed in `render_template()` in the Flask server. In Flask, such arguments can be passed along with the respective HTML file, to get rendered in the new HTML file.

#### Sample outputs
Now, on running the flask server using the command `python server.py` on your terminal, your development server gets hosted locally. Now, copy and paste the local URL that you get at the start of the server.

To view the landing page, append `/home` to the existing URL. You can view sample inputs and outputs in the below screenshots.

![HTML page to accept details](/engineering-education/deploying-machine-learning-models-using-flask/Input.PNG)

![HTML page to display the variety of flower](/engineering-education/deploying-machine-learning-models-using-flask/Output.PNG)

From the above images, you can see that `Virginica` is the classified variety for the given inputs of sepal and petal.

The folder structure should like this:

```md
deploying-machine-learning-model-using-flask
├── iris.csv
├── model.py
├── server.py
├── templates
   ├── home.html
   ├── output.html
```

### Conclusion
In conclusion, we have gone through how Machine Learning models are built, how to connect them with a web application, and how to deploy them locally using Flask. This article serves only as an introduction to deploying Machine Learning models using Flask. It's highly recommended to try out the code manually by reading further from the referenced articles.

All the codes can be accessed [here](https://github.com/srishilesh/Machine-learning/tree/master/Local%20Deployment).

To summarize:

- We understood how Machine Learning models are deployed.

- We had an overview of how it can be deployed locally.

- We also learned about the Flask framework.

### Further Reading

- [Deploying ML models](https://towardsdatascience.com/deployment-of-machine-learning-model-demystified-part-1-1181d91815d2)
- [Another similar implementation](https://www.analyticsvidhya.com/blog/2017/09/machine-learning-models-as-apis-using-flask/)
- [Deployment in Cloud for production](https://www.kdnuggets.com/2019/06/approaches-deploying-machine-learning-production.html)
- [Understanding deployment in detail](https://christophergs.com/machine%20learning/2019/03/17/how-to-deploy-machine-learning-models/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
