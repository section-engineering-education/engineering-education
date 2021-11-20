### Client-Server Implementation of reCAPTCHA with React and Django

Google provides a service known as reCAPTCHA that helps keep malicious users away from your website. It does this by posing a challenge that is easy for humans to solve but tough for bots. This service is mostly used on forms to ensure that the information being submitted is coming from a human being and this helps avoid spamming.

In this article, we will discuss how we can integrate the reCAPTCHA v2 service into our website. ReCAPTCHA v2 verifies that it is a human accessing a website by posing a challenge. We will use React (a JavaScript framework for building user interfaces) for the frontend and Django(a python backend technology) to create our backend.

#### Pre-requisites
To be able to follow along in this article, the reader will need to have:
- Node.js installed.
- Python installed.
- Basic React knowledge.
- Basic Python and Django knowledge.
- Basic understanding of the Django Rest Framework.
- Understanding of the Fetch API.

#### Goals
By the end of this article, the reader will be able to:
- Implement reCAPTCHA into a website.
- Verify the reCAPTCHA response on the server-side and take the appropriate action.
- Connect a React frontend with a Django backend

#### Acquiring our Site and Secret Keys
To enable reCAPTCHA on your website, you first need to register your site on the reCAPTCHA website so that you be able to acquire the site and secret keys. Click [here](https://www.google.com/recaptcha/admin/create) to open the Google reCAPTCHA section for registering a new site. Fill in the required information as shown below:

- In the **Label** text field, enter your site name.
- In the **reCAPTCHA** section, choose reCAPTCHA v2. In the options list that appears, select option 1("I'm not a robot" Checkbox).
- In the **Domains** section, enter the following two options: 127.0.0.1 and localhost.
- Accept the reCAPTCHA's terms of service and click submit.
- You will then be provided with a **site key**(to use in the frontend) and a **secret key**(to use in the backend).

![Recaptcha](recaptchaSnap.PNG)

#### Setting up our Frontend
Create a folder named **react-django-recaptcha**. Open the folder in your terminal and run the following command:

```bash
npx create-react-app frontend
```

The above command will create our React frontend.
Run the following commands to navigate into the frontend directory and open the directory in your code editor, in this case VS code.
```bash
cd frontend
code .
```

After you open the project in the code editor, launch the integrated terminal and type in the following command:
```bash
npm i react-google-recaptcha
```
This will install the Google reCAPTCHA v2 package into our project. We will use this to set up reCAPTCHA in the frontend.

Now, open the `App.js` file and modify the code in it with the following code:

```javascript
import './App.css';
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [captchaResult, setCaptchaResult] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Handle form submission here

  }

     const handleRecaptcha = (value) => {

       fetch('http://127.0.0.1:8000/recaptcha/', {
         method: 'POST',
         body: JSON.stringify({ 'captcha_value': value }),
         headers: { 'Content-Type': 'application/json' }
       })
        .then(res => res.json())
        .then(data => {
          console.log(data.captcha.success)
          setCaptchaResult(data.captcha.success)
        }) 
     }
  


  return (
    <div className="container">
      <h2>Contact us:</h2>
      <form>
        <label>Name</label>
        <input type="text" name="name" placeholder="Your name.." value={name} onChange={(e) => {setName(e.target.value)}} />

        <label>Email</label>
        <input type="email" name="email" placeholder="example@domain.com" value={email} onChange={(e) => {setEmail(e.target.value)}} />

        <label>Subject</label>
        <textarea name="subject" placeholder="Write something.." value={message} onChange={(e) => {setMessage(e.target.value)}} />

        <div className="cta">
          <ReCAPTCHA
            sitekey="YOUR SITE KEY"
            onChange={handleRecaptcha}
          />
          
          {
             captchaResult && <button type='submit' onClick={(e) => {handleSubmit(e)}}>Submit</button>
          }
        </div>
  </form>
</div>
  );
}

export default App;
```

**Code explanation**

- In the above code, we have a contact form that contains the fields; name, email, and message. We keep track of the data entered in these fields using the `useState()` hook.
- In the `div` with the className `cta`, we have our ReCaptcha component that takes two attributes, one is the site key that we get from the Google reCAPTCHA website. The other attribute is an `onChange` attribute that calls the `handleRecaptcha()` function when the reCAPTCHA component is clicked on.
- Below the reCAPTCHA component, we conditionally render the `Submit` button depending on the outcome of the reCAPTCHA. We only show it when the success value of the reCAPTCHA evaluates to true(when the user successfully solves the reCAPTCHA challenge). This helps to ensure that the form data can only be submitted after the reCAPTCHA challenge has been solved.
- The `handleRecaptcha()` function takes in a value that we send to the backend for server-side verification. You can console.log the value to see it. We use the Fetch API to make a POST request to the route `http://127.0.0.1:8000/recaptcha/` which we will, later on, create on our server. We then use the response we get from the server and pass it to the `setCaptchaResult()` function which sets the state of the `captchaResult`. The response is either true or false. If it is true, we show the `Submit` button.
- After the Submit button has been displayed(which means that the reCAPTCHA challenge has been successfully solved) you can go ahead and handle the form submission using the `handleSubmit()` function.

Now, open the `App.css` and modify it with the following code to make our webpage look better:
```css
body {
    background: #f2f2f2;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.container {
    max-width: 80%;
    border-radius: 5px;
    background-color: white;
    padding: 20px;
}
input[type="text"],
[type="email"],
textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
}

.cta {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

button {
    background-color: #04aa6d;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
}
```

**Running our Frontend**:

Open the integrated terminal and type in the following command:
```bash
npm start
```
This will open our project in the local development server. Open `127.0.0.1:3000` on your web browser to view the webpage.

#### Setting up our Backend
To set up our backend, we first need to create a virtual environment. To learn more about Django virtual environment, click [here](https://docs.python.org/3/tutorial/venv.html).

Open the command prompt and `cd` into our **react-django-recaptcha** folder. Type in the following command to create a virtual environment:

```bash
python -m venv recaptcha-env
```
This will create a virtual environment with the name recaptcha-env. To activate the virtual environment, type in the following command:

```bash
.\recaptcha-env\Scripts\activate
```

After activating the virtual environment, then type in the following command to install Django:

```bash
python -m pip install Django
```

Type in the following commands:

```bash
django-admin startproject recaptchaVerification

cd recaptchaVerification

code .
```
The first command creates a Django application with the name `recaptchaVerification`, the second one changes our active directory and the last one launches our code editor.

Open the integrated terminal and make sure that the virtual environment is still active. If it is not, type in the following commands to activate it:

```bash
cd ..
.\recaptcha-env\Scripts\activate
```

To make sure our server is working, you can run the following command(remember to `cd` into the `recaptchaVerification` directory before running the command):
```bash
python manage.py runserver
```

We now need to create a new app that will handle our API requests. Run the following command to create an app named `api`:

```bash
django-admin startapp api
```

We now need to make a few installations. Run the following commands:

```bash
pip install djangorestframework

python -m pip install requests

python -m pip install django-cors-headers
```

- The first command installs Django Rest Framework that helps us to create an API.
- The second command installs the Requests HTTP library that helps us to send HTTP requests easily. We will use this to send an HTTP request to Google ReCAPTCHA to verify the user's response.
- The last command installs CORS that allows in-browser requests to your Django application from other origins. This will enable our React frontend to make requests to our Django backend.

**Modifying the `settings.py` file**:

Open the `settings.py` file and modify the`INSTALLED_APPS` and `MIDDLEWARE` section as shown below:
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

    'requests',

    'corsheaders'
]

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

At the bottom of the `settings.py` file, add the following lines of code:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```
This will allow requests from our localhost port 3000 where our React app is running.

**Modifying the `recaptchaVerification\urls.py` file**:

Open the `urls.py` file that is in the recaptchaVerification folder and modify it as shown below:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls'))
]
```
This will help route all the requests to our api app. 


**Working on the api app**:

In the api app, that we created, open the `views.py` file and modify it as shown below:

```python
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def recaptcha(request):
    r = requests.post(
      'https://www.google.com/recaptcha/api/siteverify',
      data={
        'secret': 'YOUR SECRET KEY',
        'response': request.data['captcha_value'],
      }
    )

    return Response({'captcha': r.json()})

```
- In the above code, we use  `@api_view` decorator provided by the Django Rest Framework to restrict only POST requests to this API route.
- We then use the requests HTTP library to make a POST request to `https://www.google.com/recaptcha/api/siteverify`. This API post request can take three parameters; secret, response, and remoteip. The `secret` is the secret key provided by the Google reCAPTCHA website, the `response` is the user response token that we get from the frontend when the user solves the captcha challenge and `remoteip` is the user's IP address. The first two are required but the `remoteip` is optional. In our example, we have only used the `secret` and the `response`.
- The API responds with a JSON object that contains the following attributes; `success` which is either true or false, `challenge_ts` which is the timestamp the challenge was taken, `hostname` which is the name of our hostname of the site where the captcha was solved(in our case, localhost) and `error-codes` which are optional.
- We store the API response in `r` and then send it to the frontend as a JSON object.


In the same api folder, create a `urls.py` file and modify it as shown below:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('recaptcha/', views.recaptcha)
]
```
The code above exposes our API endpoint that will be accessed by the frontend. 

#### Testing our Application
To test our application, make sure that the React front-end and the Django back-end are running. Now go to your browser on `localhost:3000` and you will see that the contact form is there but the submit button is not visible.

After you solve the captcha challenge, the submit button will appear, and only then can you submit the form. This ensures that someone has to solve the captcha challenge before they submit data.

You'll also notice that after a while, the captcha verification displays a message, 'verification expired. Check the checkbox again' and the submit button disappears. This means that our application is working perfectly fine because the submit button will only be displayed when our server responds with `success = true`.

#### Conclusion
Google reCAPTCHA provides a great and simple way of protecting us from being victims of spamming. This is one way of implementing Google reCAPTCHA and there are other ways which you can look up on the internet. 

After applying this to your website, you can now go ahead and handle the form submission.

Happy coding!!!
