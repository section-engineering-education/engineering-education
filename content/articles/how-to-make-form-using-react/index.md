### Create a registration form using React.js ( Hooks )

We will make a registration from using React.js from scratch using react hooks and bootstrap, In the end you will have form ready like this one below :

// insert a pic

So now lets start with setting up our coding enviornment
* node.js should be installed and any code editor you like to use.
* Optionally you can also install Yarn package manager.
* Now we have everyting ready, so open your terminal and run the below commands to create your react app

```
npx create-react-app loginforms
cd loginforms
npm start
```


If your setup is complete you will get to see the below screen:-

//INSER IMG

This is a boilerplate code comes when we create a react app. Now open the loginforms folder and open index.html in `public` folder add bootstrap scripts there, here are the CDN links :-

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="stylesheet" 
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" 
          crossorigin="anonymous">
   
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>

  </body>
</html>
```


This is where are code start you can change the meta tags as per your requirements.

Now go inside the src folder there you will find `app.js` thats where we start are code. In react we write JSX for writting our HTML code.Create a new folder named components inside the src folder. Here we will make all of our components and then render them in App.js.

Now lets first create a navbar components for our header. The code of header component is as follows:-

``` javascript
import React from 'react';
function Header() {
    return(
        <nav class="bg-dark navbar-dark navbar">
            <div className="row col-12 d-flex justify-content-center text-white">
                <h3>Registration</h3>
            </div>
        </nav>
    )
}
export default Header;
```

since our main code run from `app.js` we need to import are Header component in it. Modify your `app,js` as follows:

```javascript
import logo from './logo.svg';
import './App.css';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header/>
    </div>
  );
}

export default App;
```

If you written above code correct the webpage will look like this:

///insert img

Next we have to add registration form for the users. Create a RegistrationForm folder inside the components folder and add the code to create the input elements.
For styling make a `style.css` file inside the component folder here we will write all are styles and include in your registration form component.

``` javascript
import React, {useState} from 'react';
import './style.css'
function RegistrationForm() {
    return(
      <div className="form">
          <div className="form-body">
              <div className="username">
                  <label className="form__label" for="firstName">First Name </label>
                  <input className="form__input" type="text" id="firstName" placeholder="First Name"/>
              </div>
              <div className="lastname">
                  <label className="form__label" for="lastName">Last Name </label>
                  <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName"/>
              </div>
              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input  type="email" id="email" className="form__input" placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password"  id="password" placeholder="Password"/>
              </div>
              <div className="confirm-password">
                  <label className="form__label" for="confirmPassword">Confirm Password </label>
                  <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password"/>
              </div>
          </div>
          <div class="footer">
              <button type="submit" class="btn">Register</button>
          </div>
      </div>      
    )       
}
export default RegistrationForm;
```
This is your code of `style.css`  file
```css
body{
    background: #bdc3c7;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2c3e50, #bdc3c7);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2c3e50, #bdc3c7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.form{
    background-color: white;
    border-radius: 5px;
    width: 550px;
    margin: 20px auto;
    padding: 20px;
    /* height: 600px; */
}

.form-body{
    text-align: left;
    padding: 20px 10px;
}

.form-body > *{
    padding: 5px;
}

.form__label{
    width: 40%;
}

.form_input{
    width: 60%;
}

.footer{
    text-align: center;
}


```

Make sure to include this component in  `App.js` 

``` javascript
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import RegistrationForm from './components/registrationForm'

function App() {
  return (
    <div className="App">
      <Header/>
      <RegistrationForm/>
    </div>
  );
}

export default App;
```

I recommend you to first go through react official documentation.Lets have a overview of hooks in react.js
`useState` hook it used to maintain state of a variable which we can update dynamically using `setState` 

Now lets get to our form we need to maintain the state of every input in our form so that when user hit submit we can send the data to our backend api. If you remember in javascript we used to update this using `document.getElementById("demo").value` but in react we have state for every input and we will update it on every Onchange event. 

import `useState` and `setState` hooks form react on top of your code.Now we make a state for all input element. 
```jsx
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
```

We have to update these value on onChange 




