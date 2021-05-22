---
layout: engineering-education
status: publish
published: true
url: /react-axios-post-laravel/
title: How to use React to Send a POST Request to a Laravel Application
description: This tutorial will give readers a detailed guide on how to make a post request to a Laravel application using React and retrieve the response.
author: terrence-aluda
date: 2021-03-18T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-axios-post-laravel/hero.jpg
    alt: Post Request Using React Example Image
---
Perhaps you are a backend engineer who wants to load data to your site using the React library, or you want to explore the use of React with Laravel. Or maybe you have other interests in using Laravel with React, either way you are at the right place. 
<!--more-->
We are going to learn how to make a POST request to a Laravel application using React and retrieve the response.

### Basic descriptions
- **React:** This is a JavaScript library that assists us in creating interactive and dynamic Single Page Applications. 
- **Axios:** This is a library that is used to handle HTTP requests to external sources in web applications.
- **Laravel:** This is a PHP framework based on the Model-View-Controller architecture that helps us create web backend applications faster.

### Prerequisites
- A basic understanding of PHP and how to work with Laravel.
- A basic understanding of HTML and CSS.
- A basic understanding of JavaScript and how to use on React.
- Have PHP, Composer, and Laravel installer installed in your machine.

Having that, we can now start diving into the topic.

### What we will be doing
We will be sending input data from a sign up page and send the data to a Laravel controller which will, in turn, return JSON data and display it in an alert.

> **JSON**, JavaScript Object Notation; is a data exchange format between web applications.

### Getting started
We create our application by running this command in the terminal:

```php
laravel new reactaxios
```

Since Laravel supports Vue.js by default, we first have to replace the Vue.js scaffolding with React.js.

```php
php artisan preset react
```

### Creating the Controller and the Route
We then create the controller of our Laravel application receiving the POST request.

```php
php artisan make:controller AxiosReceiverController
```

Open the controller and add the following code.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AxiosReceiverController extends Controller
{
    public function ReceiveIt(Request $request){
        $validatedData = $request->validate([
            'firstname' => 'nullable',
            'lastname' => 'nullable',
            'email' => 'nullable',
            'phone' => 'nullable',
            'NatID' => 'nullable',
            'password' => 'nullable',
            'userLevel' => 'nullable'
        ]);

        return json_encode($validatedData);
    }
}
```

The controller contains a method `ReceiveIt()` which receives a request, validates it according to the user rules then stores it in an array named `$validatedData`. It then returns the array as a JSON object which we'll retrieve later on.

We then head on to create a Route for the controller in the *routes/web.php* file.

```php
Route::post('sendrequest', 'App\Http\Controllers\AxiosReceiverController@ReceiveIt');
```

### Building the React and Frontend module
We add our application's dependencies.

```javascript
npm install
```

To handle our routes, we will use the **React Router** where we render a single view for all the routes. This is particularly important if you have many routes. For our case, it will only be one route.

We will create a wildcard route in the *routes/web* where a view file **app.blade.php** will be used to render our React components. Replace the view code in the *routes/web* with the code below.

```php
Route::view('/{path?}', 'app');
```

We head on to the *resources/views* directory, create the file **app.blade.php** and add the following code:

```html
<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <title>ReactAxios</title>
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="app"></div>

        <script src="{{ asset('js/app.js') }}"></script>
    </body>
    </html>
```

We reference both a CSS and a JavaScript file that contain React and other dependencies. We have an empty div with an id of `"app"` where our components will be rendered.

Next, we create the App component in the *resources/js/components* with the name **App.jsx** and delete the **Example.js** that is there by default.

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
```

We will install **React router** since we are using it:

```javascript
npm install react-router-dom
```

While the installation continues, open the **app.js** file in the *resources/js/* directly and update the code found there with this one:

```javascript
    require('./bootstrap')
    require('./components/App')
```

#### The Signup page
We will create a folder called *pages* in the *resources/js/components/* directory where we will create the signup page, name it **Register.jsx**, and add it to the folder. Add the following code inside it.

```javascript
import React, { Component } from 'react';
import axios from "axios";
import wave from 'https://terrence-aluda.com/wave.png'
import bg from 'https://terrence-aluda.com/bg.svg'
import avatar from 'https://terrence-aluda.com/avatar.svg'

class Register extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstname : '',
            lastname : '',
            email : '',
            phone : '',
            NatID : '',
            password : '',
            userLevel : 'Job Expert'
        }

        this.firstName = this.firstName.bind(this);
        this.lastName = this.lastName.bind(this);
        this.takePhone = this.takePhone.bind(this);
        this.takeEmail = this.takeEmail.bind(this);
        this.takeID = this.takeID.bind(this);
        this.takePassword = this.takePassword.bind(this);
        this.takeLevel = this.takeLevel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    firstName(event){
        this.setState({firstname : event.target.value})
    }
    lastName(event){
        this.setState({lastname : event.target.value})
    }
    takePhone(event){
        this.setState({phone : event.target.value})
    }
    takeEmail(event){
        this.setState({email : event.target.value})
    }
    takeID(event){
        this.setState({ID : event.target.value})
    }
    takePassword(event){
        this.setState({password : event.target.value})
    }
    takeLevel(event){
        this.setState({userLevel : event.target.value})
    }

    handleSubmit(){
    
        const packets = {
            firstname:  this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
            NatID: this.state.ID,
            userLevel: this.state.userLevel,
            password: this.state.password
        };
        axios.post('/sendrequest', packets)
            .then(
                response => alert(JSON.stringify(response.data))
                
                )
            .catch(error => {
                console.log("ERROR:: ",error.response.data);
                
                });
    }

    render(){
        return (
<div>
            
            <img class="wave" src={wave} alt="img"/>
            <div class="container">
                <div class="img">
                    <img src={bg} alt="img"/>
                </div>
                <div class="login-content">
                    <form>
                        <img src={avatar} alt="img"/>
                        <h2 class="title">Register</h2>
                           <div class="input-div one">
                              <div class="i">
                                      <i class="fas fa-user"></i>
                              </div>
                              <div class="div">
                                      <h5></h5>
                                      <input type="text" placeholder="First Name" onChange={this.firstName} class="input"/>
                              </div>
                           </div>
            
                           <div class="input-div one">
                              <div class="i">
                                      <i class="fas fa-user"></i>
                              </div>
                              <div class="div">
                                      <h5></h5>
                                      <input type="text" placeholder="Last Name" onChange={this.lastName} class="input"/>
                              </div>
                           </div>
            
                           <div class="input-div pass">
                              <div class="i"> 
                                   <i class="fas fa-envelope-square"></i>
                              </div>
                              <div class="div">
                                   <h5></h5>
                                   <input type="email" placeholder="Email" onChange={this.takeEmail} class="input" />
                           </div>
                        </div>
            
                        <div class="input-div pass">
                              <div class="i"> 
                                   <i class=""></i>
                              </div>
                              <div class="div">
                              <select onChange={this.takeLevel} name="userLevel">
                                    <option value="">Choose level</option>                                 
                                    <option value="Job Expert">Job Expert</option>
                                    <option value="Client">Client</option>
                                </select>
                           </div>
                        </div>
            
                        <div class="input-div pass">
                              <div class="i"> 
                                   <i class="fas fa-id-card"></i>
                              </div>
                              <div class="div">
                                   <h5></h5>
                                   <input type="number" placeholder="National ID" onChange={this.takeID} class="input" />
                           </div>
                        </div>
            
                        <div class="input-div pass">
                              <div class="i"> 
                                   <i class="fas fa-phone"></i>
                              </div>
                              <div class="div">
                                   <h5></h5>
                                   <input type="number" placeholder="Phone Number" onChange={this.takePhone} class="input" />
                           </div>
                        </div>
            
                           <div class="input-div pass">
                              <div class="i"> 
                                   <i class="fas fa-lock"></i>
                              </div>
                              <div class="div">
                                   <h5></h5>
                                   <input type="password" placeholder="Password" onChange={this.takePassword} class="input" />
                           </div>
                        </div>
            
                        <div class="input-div pass">
                              <div class="i"> 
                                   <i class="fas fa-lock"></i>
                              </div>
                              <div class="div">
                                   <h5></h5>
                                   <input type="password" placeholder="Confirm Password" class="input" />
                           </div>
                        </div>
                        <input type="submit" class="btn" onClick={this.handleSubmit} value="Register"/>
                    </form>
                </div>
            </div>
                    
                </div>
        );
    }
}
export default Register;
```

#### Explanation
We reference the images we'll be using on the page.

The constructor then initializes state values and binds the component's functions.

The succeeding functions are used to take values from the inputs they are called from after a user types them in, then sets the state values appropriately.

The `handleSubmit()` function is called when the submit button is clicked. The function contains an object called `packets` with properties from the `state` object. This is then passed in the Axios post method as a request to the Laravel controller route we created.

After the request, we retrieve the results and display it in an alert using the `JSON.stringify()` method which converts the object returned to a string. If there is an error during the process, it is shown in the console after being 'caught'.

### Adding the styling for the page and updating the App.jsx file
For the styling, you can customize and add your own but what we will be using to format our page, is in the CSS code below. 

Open *resources/js/components/App.css* and add this code:

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap');

:root{
  --nav-width: 68px;

  /* colors */
  --first-color: #00BFA6/*#472347D9*/;
  --first-color-light: #fff/*#AFA5D9*/;
  --white-color: #F7F6FB;

  /* === Font and Typography */
  --body-font: 'Nunito', sans-serif;
  --normal-font-size: 1rem;
  /* z-index */
  --z-fixed: 100;
}

body{
  font-family: Nunito, sans-serif;
  position: relative;
  /* margin: var(--header-height) 0 0 0; */
  margin: 0;
  padding: 0;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  transition: .5s;
}

*, ::before, ::after{
  box-sizing: border-box;
}

body::-webkit-scrollbar{
  width: 8px;
}

body::-webkit-scrollbar-thumb{
  background-color: rgb(36, 36, 36);
}
body::-webkit-scrollbar-track{
  background-color: rgb(235, 236, 235);
}

.login-register{
  display: flex;
  justify-content: space-between;
}
.login-register a{
  margin-right: 6px;
}
a{
  text-decoration: none;
}

form {
  background: white;
  border: 1px solid #dedede;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 500px;
  padding: 30px 50px;
}
button{
  border: none;
  border-radius: 5px;
}


input,select {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
}

label {
  color: #3d3d3d;
  display: block;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}

li{
  list-style: none;
  margin: 0 10px;
}


/**Login**/

.wave{
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
}

.container{
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap :7rem;
    padding: 0 2rem;
}

.img{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login-content{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

.img img{
  width: 500px;
}

form{
  width: 360px;
}

.login-content img{
    height: 100px;
}

.login-content h2{
  margin: 15px 0;
  color: #333;
  text-transform: uppercase;
  font-size: 2.9rem;
}

.login-content .input-div{
  position: relative;
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
}

.login-content .input-div.one{
  margin-top: 0;
}

.i{
  color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.i i{
  transition: .3s;
}

.input-div > div{
    position: relative;
  height: 45px;
}

.input-div > div > h5{
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
  transition: .3s;
}

.input-div:before, .input-div:after{
  content: '';
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #38d39f;
  transition: .4s;
}

.input-div:before{
  right: 50%;
}

.input-div:after{
  left: 50%;
}

.input-div.focus:before, .input-div.focus:after{
  width: 50%;
}

.input-div.focus > div > h5{
  top: -5px;
  font-size: 15px;
}

.input-div.focus > .i > i{
  color: #38d39f;
}

.input-div > div > input{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: #555;
  font-family: 'poppins', sans-serif;
}

.input-div.pass{
  margin-bottom: 4px;
}

a{
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: .3s;
}

a:hover{
  color: #38d39f;
}

.btn{
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  margin: 1rem 0;
  cursor: pointer;
  transition: .5s;
}
.btn:hover{
  background-position: right;
}


@media screen and (max-width: 1050px){
  .container{
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1000px){
  form{
    width: 290px;
  }

  .login-content h2{
        font-size: 2.4rem;
        margin: 8px 0;
  }

  .img img{
    width: 400px;
  }
}

@media screen and (max-width: 900px){
  .container{
    grid-template-columns: 1fr;
  }

  .img{
    display: none;
  }

  .wave{
    display: none;
  }

  .login-content{
    justify-content: center;
  }
}

/**fire**/
.fa-fire{
  color: rgb(255,102,102);
  font-size: 3.8rem;
}

footer{
  font-size: 1.5rem;
  padding: 0.8rem;
  text-align: center;
  background-color: rgb(20, 20, 20);
  color:#F7F6FB;
  }

.dash{
  background-color:#f2f4f6;
  min-width: 60vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-header{
  background-color: #32be8f;
  color: #fff;
}

.list-group-flush li:first-child{
  font-size: 1.8rem;
  color: blue;
  text-decoration: underline;
}

.list-group-flush li:nth-child(2){
  color: #6026ff;
  font-size: 1.1rem;
  font-weight: 500;
}

.list-group-flush{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

```

We update the `App.jsx` file with the routes to display with this code snippet:

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import RegisterPage from './pages/Register';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={RegisterPage} />     
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
```
### Running the app
Before running the app, we first need to test-compile the react using Laravel Mix by running this command:

```php
npm run dev
```

Then run the Laravel server:

```php
php artisan serve
```

The expected output:

![First Screenshot](/engineering-education/react-axios-post-laravel/screen-one.png)

![Second Screenshot](/engineering-education/react-axios-post-laravel/screen-two.png)

![Third Screenshot](/engineering-education/react-axios-post-laravel/screen-three.png)

#### Conclusion
In this tutorial we got an overview on using the Axios library to send a HTTP request. A POST request which is used in making our applications RESTful. We saw the use of JSON in passing information between the backend and frontend. I will talk about other HTTP methods using these technologies in other tutorials.

That's all for now. Hope you've gotten insights on how to make a POST request from React using Axios to a Laravel application.

Have a good one!

Happy coding.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
