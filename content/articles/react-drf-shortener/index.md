### How to Create a URL Shortener with React, Django Rest Framework, and SQLite Database

This article covers creating a custom URL(Uniform Resource Locator) shortener service. The URL shortener will take in a long URL and provide an equivalent short URL suitable for posting on social media and sharing with friends. The shortener service will be made up of 3 parts: 
- The front-end for interacting with the client(we will create the front-end using React).
- The backend for creating the server, and providing the API routes(we will create the backend using Django Rest Framework).
- The database for storing the data(We will use SQLite Database).

The user will copy a link in the input field provided and click the `shorten` button. The link will be sent to the backend using the `Fetch API`, and the backend will apply a procedure to provide an equivalent short 6-digit URL. Equivalent means that the short URL will redirect the user to the same page as the long URL.

### Pre-requisites

To follow along, the reader should have:

- Understanding of the Django Rest Framework.
- Understanding of Serializers in Django Rest Framework.
- Basic understanding of the React hooks.
- Understanding of the Fetch API.
- Python and Node.js installed on the computer.
- A browser, preferably Google Chrome.
- A code editor, preferably VS Code.

### Goals

By the end of this article, the reader should be able to:

- Create a custom URL shortener.
- Work with React and Django.
- Fetch data from a database using Django and display it on React webpage.

### Setting up the Backend and Exposing the API Routes.

Create a folder named `react-drf-shortener` and `cd` into it. First, create a virtual environment for the Django backend. More information about Django virtual environments can be found [here](https://docs.python.org/3/tutorial/venv.html).

Run the commands below in the terminal to create the virtual environment, activate it, and install Django in it:

```bash
python -m venv shortener-env

.\shortener-env\Scripts\activate

python -m pip install Django
```

After Django has been successfully installed, run the following commands in the same directory to create a Django project named `urlshortener` and open it in VS Code:

```bash
django-admin startproject urlshortener

code urlshortener
```

Open the integrated terminal in the code editor and ensure that the virtual environment is still active. If it is not, run the following commands to activate it:

```bash
cd ..

.\shortener-env\Scripts\activate

cd urlshortener
```

The above commands change our active directory to the root directory, activate the virtual environment, and then navigate to the `urlshortener` folder.

Run the following code to make sure that the server is working:

```bash
python manage.py runserver
```

If the server is working perfectly, this will open a development server at `http://127.0.0.1:8000/`

Now that the server is working perfectly, we will create a new app to handle all the API requests from the front end. Run the code below:

```bash
django-admin startapp api
```

Next, run the commands below to install all the packages/dependencies we will need:

```bash
pip install djangorestframework

python -m pip install django-cors-headers
```

**Code Explanation**:

`pip install djangorestframework` will install Django Rest Framework(DRF). DRF allows us to create an API using Django.

`python -m pip install django-cors-headers` - This will install CORS to allow the Django backend to communicate with the React front-end.

### Registering the api app and the installed packages

Open the `settings.py` file and modify its contents as shown below:

For the `INSTALLED_APPS` section:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'api.apps.ApiConfig', #registers our api app

    'rest_framework',

    'corsheaders'
]
```

For the `MIDDLEWARE` section:

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',

     "corsheaders.middleware.CorsMiddleware",

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

Append the following code to the `settings.py` file:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

The above code specifies the clients that communicate with the Django backend.

Open the `urls.py` file in the `urlshortener` folder and modify it as shown below to route all the requests to the `api` app we previously created.

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),
]
```

### Working on the api app

#### Creating the model

Open the `models.py` file in the api folder and modify it as shown below:

```python
from django.db import models

class urlShortener(models.Model):
    longurl = models.CharField(max_length=255)
    shorturl = models.CharField(max_length=10)

    def __str__(self):
        return self.shorturl
```

The above code will create a table in the database with two fields:

-   `longurl` - This will store the long URL submitted by the user from the front-end.
-   `shorturl` - This will store the short URL equivalent of the long URL generated by the server.

Run the commands below to propagate the changes made to the model into the database schema:

```bash
python manage.py makemigrations

python manage.py migrate
```

#### Creating the Serializer

In the `app` folder, create a `serializers.py` file and modify it as shown below:

```python
from rest_framework.serializers import ModelSerializer
from .models import urlShortener

class urlShortenerSerializer(ModelSerializer):
    class Meta:
        model = urlShortener
        fields = '__all__
```

The above code will serialize all fields in the `urlShortener` model.

More information about Serializers can be found [here](https://www.django-rest-framework.org/api-guide/serializers/).

#### Working on the views

Open the `views.py` file and modify it as shown below:

```python
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import urlShortener
from .serializers import urlShortenerSerializer

import random

@api_view(['POST'])
def makeshorturl(request):
    data = request.data
    s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!*^$-_"
    shorturl = ("".join(random.sample(s, 6)))
    urlShortener.objects.create(
        longurl=data['longurl'],
        shorturl=shorturl
    )
    longurl = data['longurl']
    shorturl = "http://localhost:8000/"+shorturl
    return Response({'longurl': longurl, 'shorturl': shorturl})


def redirectUrl(request, shorturl):
    try:
        obj = urlShortener.objects.get(shorturl=shorturl)
    except urlShortener.DoesNotExist:
        obj = None

    if obj is not None:
        return redirect(obj.longurl)
```

In the `makeshorturl` view, we use the `@api_view` decorator provided by the Django Rest Framework to limit only POST requests to the view. The view receives the front-end data and creates a `shorturl` from a string of predefined letters, numbers, and symbols. The `shorturl` has a length of six characters. The `longurl` and `shorturl` objects are then stored in the database, and a `Reponse` is returned to the user with the long URL and the generated short URL.

The `redirectUrl` view takes in the `request` and `shorturl`. The `shorturl` parameter will be specified in the `urls.py` file. This view uses a `try except` statement to retrieve an object from the database where the `shorturl` provided is equal to the shorturl in the database. The user is redirected to the `longurl` in the object retrieved from the database if the object is found.

#### Working on the urls

Open the `urls.py` file and modify it as shown below:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('shorten/', views.makeshorturl),
    path('<str:shorturl>', views.redirectUrl)
]
```

The above code exposes the API endpoints to be accessed by the front-end.

To run the server, run the following command:

```bash
python manage.py runserver
```

### Setting up the Frontend

`cd` into the `react-drf-shortener` folder using the command prompt and run the following commands:

```bash
npx create-react-app shortener-frontend

code shortener-frontend
```

This creates a react app and opens it up in VS Code.

Open the `App.js` file and modify it with the code provided below:

```js
import { useState } from "react";

function App() {
    const [longurl, setLongurl] = useState("");
    const [shorturl, setShorturl] = useState("");
    const [returnLongURL, setReturnLongURL] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/shorten/", {
            method: "POST",
            body: JSON.stringify({ longurl: longurl }),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setShorturl(data.shorturl);
                setReturnLongURL(data.longurl);
                setLongurl("");
            });
    };

    return (
        <div style={{ textAlign: "center" }}>
            <input
                type="text"
                name="longurl"
                value={longurl}
                onChange={(e) => setLongurl(e.target.value)}
            />
            <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                disabled={!longurl}
            >
                shorten
            </button>

            <div>
                <p>Long URL: {returnLongURL}</p>
                <p
                    style={{ cursor: "pointer" }}
                    onClick={() => window.open(returnLongURL)}
                >
                    Short URL: {shorturl}
                </p>
            </div>
        </div>
    );
}

export default App;
```

Code explanation:

We import the `useState()` hook from `react` in the code above. We then set up three pieces of state as explained below:

-   `longurl` - this will be used to track the input provided by the user.
-   `shorturl` - this will be used to hold the value of the short URL returned by the server.
-   `returnLongURL` - this will be used to hold the value of the long URL provided by the server.

In the `return` section, there is an input field and a button that calls the `handleSubmit()` function when clicked. This function uses the `fetch API` to send the `longurl` to the backend. The `fetch API` returns a response and sets the `shorturl` and `returnLongURL` values.

The long URL and the short URL are rendered on the browser. We use the `window.open()` method to open the long URL on a new tab at the click of the short URL.

To run the front-end code, type in the following command in the integrated terminal and press enter:

```bash
npm start
```

The above command will open a local development server on `127.0.0.1:3000`

### Testing the Shortener Service.

To test the service, open the browser and navigate to the following URL, `127.0.0.1:3000`. Make sure that server is running. Input the long URL on the input field provided and click on the `shorten` button. A short URL will be rendered, and after clicking on it, it redirects to the same webpage as the long URL. This means that our shortener service is working.

**Proof of working application:**
![Working application](engineering-education/react-drf-shortener/workingApp.PNG)

**Proof of short URL redirecting you to the same page as the long URL:**
![Redirected to same URL](engineering-education/react-drf-shortener/redirectedtosameurl.PNG)

### Conclusion

We have how to implement a simple shortener service using React and Django. However, this project can be taken to the next level by styling the user interface and adding more features. One of the features that may be added is counting the number of times a link has been created.

Full code for the application can be found [here](https://github.com/KayveTech/url-shortener).

Happy coding!
