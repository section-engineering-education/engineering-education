### Social authentication using Djoser in react applications

### Introduction
Djoser is a powerful library that helps a great deal when it comes to authenticating applications. It
offers basic features such as registration, account activation, login, password reset and logout. It works with
a custom user model. It also offers capabilities for social authentication and that will be the main focus of this article.
We will be shall create an application for handling social authentication using google. The application will have Django for the backend and
React for frontend.

### Prerequisites
1. Have `python` installed on your machine.
2. Install `django`, `djangorestframework`, `djangorestframework-simplejwt`, `djoser`, `social-auth-app-django`, `django-cors-headers`. You can install them using `pip`.
3. Have `npm` installed for our frontend part.

### Getting Started
Start by making a new directory. In your terminal, under this directory, run `Django-admin startapp backend` to create a new Django application called `backend`.Because `Djoser` works with
a custom user model, let's create a new app inside our project. Cd into backend and run `python3 manage.py startapp users`.
Let's now extend the default User model that ships with Django. In the `users` folder find `models.py` and edit it to be similar to this:

`users/models.py`
```python
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models


# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email,  password=None, **kwargs):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email,  password=None, **kwargs):
        kwargs.setdefault('is_active', True)
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        if kwargs.get('is_active') is not True:
            raise ValueError('Superuser must be active')
        if kwargs.get('is_staff') is not True:
            raise ValueError('Superuser must be staff')
        if kwargs.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')
        return self.create_user(email, password, **kwargs)
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return f"{self.first_name}{self.last_name}"

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email

```
We have created a new User model and specified that the username field will be an email. We have also created a UserManager model that handles 
creation of users and superusers.

We then have to edit our `settings.py` to set up `djoser` and Google authentication.
Add the following settings to it:

`backend/settings.py`
```python


from datetime import timedelta


AUTH_USER_MODEL = 'users.User'


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'users',
    'rest_framework',
    'djoser',
    'corsheaders',
    'social_django',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
    
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ORIGIN_WHITELIST = [
     "http://localhost:3000",
     "http://127.0.0.1:3000", 
]
CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = 'auth_system.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect'
            ],
        },
    },
]


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',

    ),
}
SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT',),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
}

DJOSER = {
    'LOGIN_FIELD': 'email',
    'SOCIAL_AUTH_TOKEN_STRATEGY': 'djoser.social.token.jwt.TokenStrategy',
    'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS': ['http://127.0.0.1:8000', 'http://127.0.0.1:8000/home','http://127.0.0.1:8000/login'],
    'SERIALIZERS': {},
}
AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    'django.contrib.auth.backends.ModelBackend'
)
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = 'your_client_id_key'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'your_secret_key'
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid'
]
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA = ['first_name', 'last_name']

```
We have listed all necessary apps, including the one we created, required by our application in `INSTALLED_APPS`.We have also specified that the User model we shall be using is the one defined in
the `users` app. Then we set up the middleware for CORS and one used when working with `django_social`.

Then we specify the allowed site origins to access our application. In this case will `localhost:3000` because we will be working with React later on.

We then make the settings for Django REST Framework and Django REST simple jwt.

Then we set up Djoser. Notice the allowed redirect urls part. These urls should be similar to the ones you set
up for your app in google console. For authentication, we will implement google and we also need the `ModelBackend` because we may need to log into the admin panel.
Then we set up settings for `SOCIAL_AUTH_GOOGLE_OAUTH2_KEY`, `SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET`.You may set up the others for more information.

We are all set for `settings.py`. Now we need to configure some urls to make the backend application work.

Edit `backend/urls.py` as follows:
```python
from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),#Needed for social authentication
]
```
We can now run `python3 manage.py makemigrations` and `python3 manage.py migrate` to finish the setup for the backend.

### Creating Google OAuth Credentials

Visit [Google Cloud Plaform](https://console.developers.google.com/) and create a new project as follows:
![Create Project](/engineering-education/content/articles/social-authentication-with-djoser-in-react-applications/create_new_project_google_console.png)

With the project selected, click `Credentials` and then click OAuth Client ID after navigating to create credentials.
![Create OAuth Client ID](/engineering-education/content/articles/social-authentication-with-djoser-in-react-applications/creating_oauth_client_id.png)
You may need to set up OAuth consent. Select web application. For authorized javascript origins enter `http://127.0.0.1:8000` and for authorized redirect URIs
have these URLs: `http://127.0.0.1:8000`, `http://127.0.0.1:8000/home`, `http://127.0.0.1:8000/login`

![Set up the uris](/engineering-education/content/articles/social-authentication-with-djoser-in-react-applications/setting_up_the_uris.png)

After you click create, you will get your client id and client secret which you will use in your `settins.py` file for this part:

```python
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = 'your_client_id_key'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'your_secret_key'
```

### Creating the frontend application

In a new terminal session, run `npx create-react-app frontend` to create a new React application.
Cd into frontend and run the following `npm install axios redux react-redux redux-devtools-extension redux-thunk styled-components`. This command installs all the dependencies we will need
during the making of this application.

You should have such a project structure:
```
.
├── node_modules
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── images
│   │   ├── google.svg
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    │   ├── auth.js
    │   └── index.js
    ├── reportWebVitals.js
    └── setupTests.js
    

```
### Creating the components
Under the `src` folder, create a new directory called `components` that will house all the components we will need.
In that folder, create the following components:

`components/Home.js`
```javascript
import React from 'react'
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="container">
            <div className="card"style={{ width: 700}}>
                <div className="card-body">
                    <h5 className="card-title">Welcome to The Auth with React & Djoser</h5>
                    <p className="card-text">Thank you for using this authentication system.</p>
                </div>
            </div>
        </div>
    )
}

export default Home
```

`components/Layout.js`
```javascript
import React, from 'react'

const Layout = (props) => {
    return (
        <div className="container">
            <Navbar/>
            {props.children}
        </div>
    )
}

export default Layout
```

`components/Login.js`
```javascript
import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import styled from "styled-components";

const Login = () => {
    return (
        <div className="container mt-4">
            <h1>Sign In</h1>
            <p>Log into your account now.</p>
           
            <Google className="btn btn-secondary" >
                <img src="/images/google.svg" alt=""/>
                Continue with Google.
            </Google>
            <p className="mt-3">Don't have an account? <Link to="/signup">Register</Link></p>

        </div>
    )
}
const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 46px;
  width: 30%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0, 0, 0, 60%), inset 0 0 0 2px rgb(0, 0, 0, 0%), inset 0 0 0 1px rgb(0, 0, 0, 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgbe(0, 0, 0, 0.6);

  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`
export default Login
```

`components/Navbar.js`
```javascript
import React from 'react'
import {Link} from "react-router-dom";

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">The Auth</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/login">Home</Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/signup">Home</Link>
                        </li>
              
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export Navbar
```

`components/Signup.js`
```javascript
import React from 'react'
import {Link, Navigate} from 'react-router-dom'

import styled from "styled-components";

const Signup = () => {
    return (
        <div className="container mt-4">
            <h1>Sign Up</h1>
            <p>Create into your account now.</p>
         

            <Google className="btn btn-secondary">
                <img src="/images/google.svg" alt=""/>
                Continue with Google.
            </Google>
            <p className="mt-3">Have an account? <Link to="/login">Sign In</Link></p>

        </div>
    )
}
const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 46px;
  width: 30%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0, 0, 0, 60%), inset 0 0 0 2px rgb(0, 0, 0, 0%), inset 0 0 0 1px rgb(0, 0, 0, 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgbe(0, 0, 0, 0.6);

  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`

export default Signup
```

`components/Welcome.js`
```javascript
import React from 'react'
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <div className="container">


            <div className="card"style={{ width: 700}}>

                    <div className="card-body">
                        <h5 className="card-title">Welcome to The Auth</h5>
                        <p className="card-text">Click to Login.</p>
                        <Link to="/login"  className="btn btn-primary">Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p className="mt-3">Don't have an account? <Link to="/signup">Register</Link></p>
                    </div>
            </div>
        </div>

)
}

export default Welcome
```

Let's now access `App.js` and configure routing for our components. Edit it as follows:

`src/App.js`
```javascript
/* import logo from './logo.svg';*/
/* import './App.css'; */
import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Welcome from "./components/Welcome";
import Signup from "./components/Signup";
import Login from "./components/Login";

import Layout from "./components/Layout";
import store from "./store";

import Home from "./components/Home";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

```
You can now run `npm start` and you should be able to see this welcome page:
![Home Page](/engineering-education/content/articles/social-authentication-with-djoser-in-react-applications/home_page.png)

You should also be able to navigate to login and signup pages.

### Setting up the authentication
The frontend application will be using `redux` for our application. Redux is a state container for Javascript applications.
We are going to set up the actions, reducers and store files for our application. Create the following files and folders under `src` and make it have the following structure.

```python
.
├── node_modules
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── images
│   │   ├── google.svg
│   │   ├── haidong.jpg
│   │   ├── jaspergeys.jpg
│   │   └── robson.jpg
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
└── src
    ├── actions
    │   ├── auth.js
    │   └── types.js
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── components
    │   ├── Home.js
    │   ├── Layout.js
    │   ├── Login.js
    │   ├── Navbar.js
    │   ├── Signup.js
    │   └── Welcome.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reducers
    │   ├── auth.js
    │   └── index.js
    ├── reportWebVitals.js
    ├── setupTests.js
    └── store.js

```
The following folders and files were created:
1. actions - This folder handles how different actions are specified
2. reducers - Handles how states are manipulated in case of different actions
3. store.js - A file that we use to define our store.
4. .env file - we use this file to define our default api url.

We begin by defining our API URL in the `.env` file. Have it as follows:

`src/.env`
```javascript
REACT_APP_API_URL = 'http://127.0.0.1:8000'
```
Let us go ahead now to define the actions. For that we need different action types. Edit `types.js` to be similar to this:

`src/action/types.js`
```javasript

export const GOOGLE_AUTH_SUCCESS = 'GOOGLE_AUTH_SUCCESS'
export const GOOGLE_AUTH_FAIL = 'GOOGLE_AUTH_FAIL'
export const LOGOUT = 'LOGOUT'

```
Then we define our  actions in `auth.js`. Edit it as follows:

`src/actions/auth.js`
```javascript
import {

    GOOGLE_AUTH_FAIL,
    GOOGLE_AUTH_SUCCESS,
    LOGOUT,
 
} from "./types";

import axios from "axios";
axios.defaults.withCredentials = true;

export const googleAuthenticate = (state, code) => async dispatch =>{
    if( state && code && !localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }}
        const details = {
                'state': state,
                'code':code
        }
        const formBody = Object.keys(details).map(key=> encodeURIComponent(key)+'='+encodeURIComponent(details[key])).join('&')
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);
            console.log(res.data)
            dispatch({
                type:GOOGLE_AUTH_SUCCESS,
                payload: res.data
            })
        }catch(err){
            dispatch({
                type:GOOGLE_AUTH_FAIL
            })
            console.log(err)
        }
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}

```
When a user authenticates using google, a redirect uri will be sent that contains a state and code. This code and state is what will be used to obtain user information such access and refresh token, email, first name etc.
The `googleAuthnticate` function handles the post request with the code and state as data and has user data as results of the request. These results
are what are dispatched to the reducer with the action type being `GOOGLE_AUTH_SUCCESS`.
In case of any errors, then the action type dispatched is `GOOGLE_AUTH_FAIL`.

We also have the `logout` action that dispatches the action type `LOGOUT`.

we now handle the reducers. We create an `index.js` file when we have more than two reducers. It should be similar to this:

`src/reducers/index.js`
```javascript
import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
    auth
})

export default rootReducer
```
We then have the `auth.js` file under the reducers directory to trigger an action according to type. Have the file be  similar to this:

`src/reducers/auth.js`
```javascript
import {

    GOOGLE_AUTH_FAIL, 
    GOOGLE_AUTH_SUCCESS,
    LOGOUT,
    
} from "../actions/types";


const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
  

}
export default function(state=initialState,action){
    switch (action.type){
        case GOOGLE_AUTH_SUCCESS:
            console.log(action.payload)
            localStorage.setItem('access',action.payload.access)
            return{
                ...state,
                isAuthenticated: true,
                access: action.payload.access,
                refresh: action.payload.refresh
            }
        case GOOGLE_AUTH_FAIL:
        case LOGOUT:
            console.log(action.payload)
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null
            }
        default:
            return state
    }
}

```
We first set an initial state that sets default values for access and refresh tokens. We also set a default boolean value of false for
`isAuthenticated`. This value will later be used to handle routing for authenticated users.
Then we set access and refresh token values set in local storage to the one dispatched if the authentication was successful and `isAuthenticated` to true, otherwise the values are set to null for the token values 
and false for `isAuthenticated`. We return  the current state if there is no other action.

We then create our store. Edit `store.js` to resemble this:

`src/store.js`
```javascript
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
```
All components will read the states from this file.
We then need to make our store available to our components. Let us add it to `App.js`. Edit the file to this:

`src/App.js`
```javascript
// All imports remain the same

function App() {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
        // All code remain the same
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

```
The line `<Provider store={store}>` makes the states available to all components in our application.

We now have to connect our components to the store.Let's begin with the `Layout.js` file. Edit to the following:

`src/components/Layout.js`
```javascript
import React, {useEffect} from 'react'
import Navbar from "./Navbar";
import {googleAuthenticate} from "../actions/auth";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import queryString from "query-string";

const Layout = (props) => {
    const location = useLocation()
    useEffect(() => {
        const values = queryString.parse(location.search)
        const state = values.state ? values.state : null
        const code = values.code ? values.code : null
        console.log('State: '+ state)
        console.log('Code: '+code)
        if (state && code){
            props.googleAuthenticate(state, code)
        }
    }, [location])

    return (
        <div className="container">
            <Navbar/>

            {props.children}
        </div>
    )
}

export default connect(null, { googleAuthenticate})(Layout)
```
We use the `connect` function to connect to our store. We dispatch `googleAuthenticate` action and pass it as props to the `Layout` function.
We will need to get the url of the current page. Then we get the key-value pairs of the url. If there exists code and state, we call the `googleAuthenticate` action 
that takes code and state as parameters. When we get redirected, the url will have within it a state and code, which are acquired and passed to the `googleAuthenticate` function.

Next, we connect our `Signup` to the store. Edit `Signup.js` as follows:

`src/components/Signup.js`
```javascript
import React, {useEffect, useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {connect, useDispatch, useSelector} from 'react-redux'

import styled from "styled-components";
import axios from "axios";

const Signup = ({ isAuthenticated}) => {
    const signupWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/login`)

            window.location.replace(res.data.authorization_url)

        } catch (err) {
            console.log("Error logging in")
        }
    }
    
    if (isAuthenticated) {
        return <Navigate to='/home'/>
    }

    return (
        <div className="container mt-4">
            <h1>Sign Up</h1>
            <p>Create into your account now.</p>


            <Google className="btn btn-secondary" onClick={signupWithGoogle}>
                <img src="/images/google.svg" alt=""/>
                Continue with Google.
            </Google>
            <p className="mt-3">Have an account? <Link to="/login">Sign In</Link></p>

        </div>
    )
}
const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 46px;
  width: 30%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0, 0, 0, 60%), inset 0 0 0 2px rgb(0, 0, 0, 0%), inset 0 0 0 1px rgb(0, 0, 0, 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgbe(0, 0, 0, 0.6);

  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, null)(Signup);
```
When a user clicks to continue with google during sign up, the `signupWithGoogle` function is called. This function sends a post request to the backend with a specified redirect uri. This uri must be one of the allowed redirect uris in the Djoser settings. Also, the allowed uris must be the same as the one added in your
google cloud console. The user will be directed to the authorization page after which it will redirect the user to the specified redirect uri with the state and code included in the url.
We also have passed the `isAuthenticated` state to redirect our user directly to the home page without having them authenticated
again if they are already authenticated.

Now we do the same for the login page. Edit `Login.js` to be similar to this:

`src/components/Login.js`
```javascript
import React, {useEffect, useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import {login} from "../actions/auth";
import styled from "styled-components";
import axios from "axios";

const Login = ({ isAuthenticated}) => {
    const loginWithGoogle = async () =>{
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/home`)
            window.location.replace(res.data.authorization_url)

        }catch(err){
            console.log("Error logging in")
        }
    }
  
    if(isAuthenticated){
        return <Navigate to="/home" />
    }
    return (
        <div className="container mt-4">
            <h1>Sign In</h1>
            <p>Log into your account now.</p>


            <Google className="btn btn-secondary" onClick={loginWithGoogle} >
                <img src="/images/google.svg" alt=""/>
                Continue with Google.
            </Google>
            <p className="mt-3">Don't have an account? <Link to="/signup">Register</Link></p>

        </div>
    )
}
const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 46px;
  width: 30%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0, 0, 0, 60%), inset 0 0 0 2px rgb(0, 0, 0, 0%), inset 0 0 0 1px rgb(0, 0, 0, 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgbe(0, 0, 0, 0.6);

  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,

})

export default connect(mapStateToProps, null)(Login);
```
We have done the same procedure as the sign-up one, only that this time the redirect uri will be for the home page when a user logs in.
We also have passed the state `isAuthenticated` to make sure an authenticated user is redirected to the home page.

Finally, we handle the logout process. Edit `Navbar.js` as follows:

`src/components/Navbar.js`
```javascript
import React from 'react'
import {Link} from "react-router-dom";
import {logout} from "../actions/auth";
import {connect} from "react-redux";

const Navbar = ({isAuthenticated, logout}) => {
    return(

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">The Auth</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {isAuthenticated ?
                            <li className="nav-item">
                                <a className="nav-link" href="/" onClick={logout}>Logout</a>
                            </li>

                            :
                            <div className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Log In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                </li>
                            </div>

                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { logout })(Navbar)
```
Once more we pass the `isAuthenticated` state and logout function as props to the Navbar function.
We check if a user is authenticated and if so, have the user only have the option of logging out, otherwise the user can either sign up or log in.
The logout function is called when a user clicks the Logout link.

You should now be able to fully authenticate using a google account:
![Authenticating using Google](/engineering-education/content/articles/social-authentication-with-djoser-in-react-applications/authenticating_with_google.png)

You will be redirected to the home page with the option of logging out.
![The home page after authentication](/engineering-education/content/articles/social-authentication-with-djoser-in-react-applications/home_page_after_authentication.png)

> Notice that the user will be authenticated as long as they have signed out of their google account. This way the user does not have to keep entering the email and password 
> every time they want to login.

> You may face issues when authenticating because the state may not be seen by the backend because of frontend running on localhost:3000.For this reason, I reccommend
> running `npm run build` and move the build folder to the backend directory and set up the necessary  urls for viewing and settings for static files so that your project runs on localhost:8000

### Conclusion
You have now been able to handle authentication for google using Djoser. You can do the same for other social accounts such as 
Facebook, Twitter or any other.Please refer to [Djoser Documentation](https://djoser.readthedocs.io/en/latest/) for more information.

