### Introduction
Forms are commonly used to interact with web applications in the past and today's world. They are essential since they accept the users' input and render the output from the web applications. Due to this, handling the form and performing the necessary validations to control the user input is undoubtedly essential.

Many third-party libraries assist in the validation and handling of web forms. However, these libraries come at a cost with many unnecessary features, which negatively impact the web application's performance. Due to this, it is better to handle and validate the form independently without using any of the third-party libraries. This will optimize the web application's performance and give the developer the power to interact with the language API.

This guide will cover details on how to handle the form and perform necessary validations using React without using third-party libraries. We will use React Hooks to perform the client-side validations. However, the same concept can be applied to server-side validations.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [How our Demo application works](#how-our-demo-application-works)
- [Setting up a React application](#setting-up-a-react-application)
- [Creating the form components](#creating-the-form-components)
- [Creating the custom React Hooks Forms Handler](#creating-the-custom-react-hooks-forms-handler)
- [Integrating the Form Components into the custom useForm Hook](#integrating-the-form-components-into-the-custom-useform-hook)
- [Form validation using custom React Hooks](#form-validation-using-custom-react-hooks)
- [Initializing the form values](#initializing-the-form-values)
- [Performing form validation using React Hooks](#performing-form-validation-using-react-hooks)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)





### Prerequisites
- [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) packages installed.
- Code editor such as [VS Code](https://code.visualstudio.com/) installed.
- A working web browser such as [Google Chrome](https://www.google.com/chrome/) is installed.
- A good understanding of [React.js](https://reactjs.org/tutorial/tutorial.html) and [React Hooks](https://reactjs.org/docs/hooks-overview.html).

### How our Demo application works
This guide will use React to develop a simple login form with all the validations on the client-side. We will achieve this by creating a custom React Hook that will validate the user input, update the form data, and handle the form submission.

### Setting up a React application
We will start by running the below command in the terminal to create a new React application:

```bash
$ npx create-react-app login-page-hooks
```

We will create the CSS ﬁle named `Loginfrm.scss` to style our form components. The CSS ﬁle would appear as below:

```css
.login-wrapper {
    flex: 1 0 100%;
    display: flex; 
    flex-wrap: wrap; 
    margin: auto;
    max-width: 300px; 
    padding: 30px; 
    border-radius: 5px;
    border: 1px solid #16324f69; 
    background-color: #fff;

    h1, input {
        margin: 15px auto; 
        flex: 1 0 100%;
    }
    
    input, select { 
        border: none; 
        outline: none;
    }
    
    input {
        padding-bottom: 5px;
        border-bottom: 1px solid rgba(22, 50, 79, 0.41);
    }
    
    input:focus {
        border-bottom: 1px solid rgb(22, 50, 79);
    }
        
    .submit {
        cursor: pointer; 
        outline: none; 
        flex: 0 0 170px;
        margin: 15px auto; 
        background-color: #16324f; 
        color: #fff;
        border: none; 
        height: 30px; 
        border-radius: 5px; 
        font-size: 15px;
    }
        
    .error { 
        width: 100%;
        text-align: left; 
        font-size: 12px; 
        color: #db222a;
    }
}
```

We will then import the CSS ﬁle to use it in our form components by adding the below line of code to the ﬁle `index.js`:

```JavaScript
// Importing the CSS ﬁle 
import './Loginfrm.scss';
```

### Creating the form components
We will create the form components and then code the React Hooks responsible for handling the form events and validating the form. In the directory `src`, we will create a new ﬁle named `Loginfrm.js`.

It will be a stateful functional component meaning that we will not import a component from React. The Hook will add state to the functional components.

The `Loginfrm.js` ﬁle will have the below contents:

```JavaScript
import React from 'react'; 
const Loginfrm = () => { 
    return (
        <form className="login-wrapper">
            <h1>Login Page</h1>
            <input placeholder="Email Address" type="email" name="email" />
            <input placeholder="Password" type="password" name="password" />
            <button type="submit" className="submit">Login</button>
        </form>
    );
};

export default Loginfrm;
```

Note that we have not yet implemented any Hook on our components as we are currently working to have our form working.
We will open up our `App.js` ﬁle and edit it as below to render the form components that we have just created:

```JavaScript
import React from 'react';
import Loginfrm from './Loginfrm';

const App = () => { 
  return (
    <div className="App">
      <Loginfrm />
    </div>
  );
};

export default App;
```

Then we will run the below command in the terminal to run our React application:

```bash
$ yarn start
```

The below results will be displayed:

![Login Form](/engineering-education/handling-form-and-validation--in-react-without-using-third-party-libraries/login-form.png)

As we have seen, we have successfully rendered our form components.

### Creating the custom React Hooks Forms Handler
We will cover the two most common event handlers that every form can barely miss, as stated below:

- `onSubmit` – the event handler is responsible for handling the form submission.
- `onChange` – the event handler is invoked when any input value of the form changes.

We will create a new ﬁle and name it as `useLoginfrm.js`. It is better to note that when naming a React Hook, we follow a default naming convention that requires the developer to use a prefix `use` in front of the function name. This practice enables React to recognize the file as the React Hook.

We create the file `useLoginfrm.js` as below:

```JavaScript
import { useState } from 'react';
    const useLoginfrm = (options) => { 
        const [data, setData] = useState({}); 
        const whenSubmitted = (e) => {
            if (e) e.preventDefault(); options();
        };
    
        const whenChanged = (e) => { 
            e.persist();
            setData(data => ({ ...data, [e.target.name]: e.target.value }));
        };
    return { 
        whenChanged, 
        whenSubmitted, 
        data,
    }
};

export default useLoginfrm;
```

In the above code snippet, we have covered the following:
- First, we have used the `useState` Hook provided by React to help monitor the form values.
- Then, we created a new function named `useLoginfrm` that takes one parameter known as `options`. The function will be called any time the form is submitted.
- Next, we have set a state variable named `data` and a setter function called `setData`. Then, we have created the function with the name `whenSubmitted`, which takes an event that prevents the page from reloading on event invocation. Eventually, it calls the `options` function.
- At the end of the code, we have returned `whenChanged` and `whenSubmitted` and values from custom Hook for our components to access them.

### Integrating the Form Components into the custom useForm Hook
To use the Hook that we have created in our form components, we need to import it into the `Loginfrm.js` ﬁle.

We will navigate to the ﬁle `Loginfrm.js` and open it, then import it at the top of the ﬁle and then initialize it at the bottom of the function declaration as below:

```JavaScript
 ...
import useLoginfrm from "./useLoginfrm"; 

const Loginfrm = () => {
    const { data, whenChanged, whenSubmitted } = useLoginfrm();
 ...
```

In the above code snippet, we restructured our object returned from the `useLoginfrm` custom Hook to use the `whenChanged` and `whenSubmitted`.

Then we will use these values in our HTML form element by adding an `onSubmit` attribute to the form that will, in turn, call the `whenSubmitted` as below:

```JavaScript
 ...
<form onSubmit={whenSubmitted}>
 ...
```

Then we edit the email input element and add an `onChange` and `value` attributes to it as below:

```JavaScript
<input placeholder="Email Address" type="email" name="email" onChange={whenChanged} value={data.email} />
```

We will do the same to the same to the `password` input element as below:

```JavaScript
<input placeholder="Password" type="password" name="password" onChange={whenChanged} value={data.password} />
```

Finally, we will need to add a `signin` function to the `Loginfrm` component and pass it to the `useLoginfrm` custom Hook as the callback parameter as below:

```JavaScript
 ...
const { data, whenChanged, whenSubmitted } = useLoginfrm(signin); 

function signin() {
    alert('The User Email: ' + data.email + ' has been submitted!');
    console.log(data);
}
 ...
```

Below is how our updated `Loginfrm.js` ﬁle will appear:

```JavaScript
import React from 'react';
import useLoginfrm from "./useLoginfrm"; 
 
const Loginfrm = () => { 
    const { data, whenChanged, whenSubmitted } = useLoginfrm(signin); 

    function signin() {
        alert('The User Email: ' + data.email + ' has been submitted!');
        console.log(data);
    }

    return (
        <form className="login-wrapper" onSubmit={whenSubmitted}>
            <h1>Login Page</h1>
            <input placeholder="Email Address" type="email" name="email" onChange={whenChanged} value={data.email} />
            <input placeholder="Password" type="password" name="password" onChange={whenChanged} value={data.password} />
            <button type="submit" className="submit">Login</button>
        </form>
    );
};

export default Loginfrm;
```

Then we will run the React application, and the below results are expected: 

**[logged-in]**

### Form validation using custom React Hooks
This section will not use any third-party libraries to validate our input elements. Instead, we will use React Hooks to validate our form elements.

### Initializing the form values
To initialize the form values we will start by navigating to the ﬁle `Loginfrm.js` and open it and inspect the HTML form that we are returning especially the `email` input ﬁeld as shown below:

```JavaScript
<input placeholder="Email Address" type="email" name="email" onChange={whenChanged} value={data.email} />
```

If we look at the `email` value attribute, pass the key returned from the data object stored in the `useLoginfrm` Hook. In React, when we pass the real value to the `email` input ﬁeld, it becomes a controlled input.

When the Form component is ﬁrst displayed, it initializes the `useLoginfrm` custom Hook. We can navigate to the ﬁle `useLoginfrm.js` and inspect the initial values of our custom Hook we created as below:

```JavaScript
const [data, setData] = useState({});
```

As seen in the above line of code, we have initialized the data state to an empty object, meaning when our `Loginfrm` component gets the `data.email` it does not ﬁnd any values in it hence initialize it as undeﬁned.

We can see, the `email` input ﬁeld starts with an empty value. However, when we type a value inside the email ﬁeld, it ﬁnally sets the value and a state from the undeﬁned value.

The above cannot be regarded as a good coding style since we are changing an uncontrolled input to a controlled input and will pop up an error for such a practice.

We can use an OR operator to set the initial value of the email input as below:

```JavaScript
<input
    ...
    value={data.email || ''}
    ...
/>
```

This means we ﬁrst set an email value to an empty string when the form initializes. The same applies to the `password` ﬁeld.

### Performing form validation using React Hooks
This section will validate our Form using the custom React Hook that we earlier created. We will follow the below steps in order to perform form validations:
- Setting up the validation rules for the form input elements. 
- Assign any errors from the form input fields into the state variables.
- If an error occurs during validation phase, the form should not submit.

#### Setting up the validation rules
We will create a new ﬁle named `FormValidation.js`, deﬁning the rules for our input ﬁelds. We will then deﬁne a single function and name it `formVal`. It takes one parameter, values, and exports as a default value, then initialize a new object inside the validate function called `formErr`.

The `formErr` object will be returned at the end of the function to display the errors encountered inside the `useLoginfrm` custom Hook as below:


```JavaScript
const formVal=(data) => { 
    const formErr = {};
    return formErr;
}

export default formVal;
```

Next, we can now perform validations to the `email` input ﬁeld. Remember the rule we will use can apply to almost every required ﬁeld in the form, since it checks whether the value exists as below:


```JavaScript
const formVal=(data) => { 
    const formErr = {};
    if (!data.email) {
        formErr.email = 'Email Address cannot be empty';
      }
    return formErr;
}

export default formVal;
```

Since we have created an object that will deal with errors, we verify that the email value is not empty. We add a new key to the `formErr` object called `email` if it is empty; we set its value as `Email Address cannot be empty`.

Email has to be written in the correct format for it to be acceptable. We can easily check the format by adding an `else if` clause and validate the email against regular expressions as below:

```JavaScript
const formVal=(data) => { 
    const formErr = {};
    if (!data.email) {
        formErr.email = 'Email Address cannot be empty';
      } else if 
      (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
      ) { 
          formErr.email = 'Invalid Email Address';
      }

    return formErr;
}

export default formVal;
```

We will perform validations also on the password ﬁeld as shown below in our updated `FormValidation.js` ﬁle:


```JavaScript
const formVal=(data) => { 
    const formErr = {};
    if (!data.email) {
        formErr.email = 'Email Address cannot be empty';
      } else if 
      (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
      ) { 
          formErr.email = 'Invalid Email Address';
      }

    if(!data.password || data.password.length<8){
        formErr.password = 'Password should contain at least 8 characters'
    }        
    return formErr;
}

export default formVal;
```

#### Using React Hooks to perform validations
In the `Loginfrm.js` ﬁle, we will initialize our `useLoginfrm` React Hook at the top of the form component body. This is achieved by passing the `formVal` function to the `useLoginfrm` Hook as the second parameter as below:

```JavaScript
 ...
import formVal from './FormValidation'; 
const Loginfrm = () => {
    const { 
        data,
        whenChanged, 
        whenSubmitted,
    } = useLoginfrm(signin, formVal);
 ... 
```

Then, we navigate to the `useLoginfrm.js` custom React Hook and add a new variable parameter inside the `useLoginfrm` function parenthesis as below:

```JavaScript
 ...
const useLoginfrm = (options, formVal) => {
 ...
```

It is better to note that the `formVal` function takes an object as a value and returns another object called `formErr`.

We need to `useLoginfrm` Hook to store errors in their state to display them on the form components. This is achieved by declaring a new `useState` Hook under the values called `formErr` as below:

```JavaScript
const [formErr, newErr] = useState({});
```

We will need to check the form values the user has submitted before submitting the form. This is done by modifying the `whenSubmitted` function to call `formVal` instead of `options`, hence we pass the values that was stored in the React Hook’s state as below:

```JavaScript
const whenSubmitted = (e) => { 
    if (e) e.preventDefault(); 
    newErr(formVal(data));
};
```

#### Detecting changes in Errors State
As seen above, we have set the `formErr` state to the result of the `formVal` function, but we have not submitted the form. Again, we may need to add the call to the `options` function to our `useLoginfrm` Hook. In this case, we will need to use the `useEﬀect` Hook.

In addition, we will be passing an array with a value inside to `useEﬀect` as the second parameter. We can use the `useEﬀect` declaration to keep track of the values in the form.

In our case we will use the `useEﬀect` Hook that will listen to any changes that happens in `formErr`, then checks the length of object, and calls the `options` function if the `formErr` object is empty as below:

```JavaScript
useEﬀect(() => {
    if (Object.keys(formErr).length === 0) { 
        options();
    }
}, [formErr]);
```

In the above code snippet, the `useEﬀect` Hook is used to check if the error value changes. It checks if the `formErr` object is empty, and if empty, it calls the `options` function.

#### Preventing the Form from submitting on the render
Before we hook our HTML form to the errors, we will need to ﬁx the `signin` function inside our form component, as it is called when the page loads.

The reason is `useEﬀect` Hook is invoked when the component is displayed on the browser, and the value of `formErr` is referenced as an empty object.

To ﬁx the issue, we will add another state variable inside our custom React Hook named `whenLoading` and set its initial state to false as below:

```JavaScript
 ...
const [whenLoading, setLoading] = useState(false);
const [data, setData] = useState({}); 
const [formErr, newErr] = useState({});
 ...
```

Then the state variable `whenLoading` is set to true inside the `whenSubmitted` function as below:

```JavaScript
const whenSubmitted = (e) => { e.preventDefault(); 
    whenLoading(true); 
    newErr(formVal(data));
};
```

Next, we proceed to check that `whenLoading` is true inside the `useEﬀect` Hook as below:

```JavaScript
useEﬀect(() => {
    if (Object.keys(formErr).length === 0 && whenLoading) { 
        options();
    }
}, [former, options, whenLoading]);
```

In the end, we return the `formErr` object at the bottom of the Hook as below:

```JavaScript
return {
    whenSubmitted,
    whenChanged,
    data,
    formErr,
}
```

The updated `useLoginfrm.js` file is as below:

```JavaScript
import { useState, useEffect } from 'react';

const useLoginfrm = (options, formVal) => { 
    const [whenLoading, setLoading] = useState(false); 
    const [data, setData] = useState({});
    const [formErr, newErr] = useState({});
    
    useEffect(() => {
        if (Object.keys(formErr).length === 0 && whenLoading) { 
            options();
        }
    }, [formErr, options, whenLoading]);

    const whenSubmitted = (e) => { e.preventDefault(); 
        newErr(formVal(data)); 
        setLoading(true);
    };

    const whenChanged = (e) => { e.persist();
    setData(data => ({ ...data, [e.target.name]: e.target.value }));
    };

    return {  
        whenSubmitted,
        whenChanged,
        data, 
        formErr,
    }
};

export default useLoginfrm;
```

#### Displaying Errors in the Form component
We will start by adding the `formErr` object to the list of variables and functions that we are getting from `useLoginfrm` as below:

```JavaScript
const {
    ...
    formErr,
    ...
} = useLoginfrm(signin, formVal);
```

We will utilize the CSS classes we earlier created to display the errors better on the form as below:

```JavaScript
<input placeholder="Email Address" type="email" name="email" onChange={whenChanged} value={data.email || ''} />
{formErr.email && (
    <p className="error">{formErr.email}</p>
    )}

<input placeholder="Password" type="password" name="password" onChange={whenChanged} value={data.password} />
{formErr.email && (
    <p className="error">{formErr.password}</p>
    )}
```

Next will be to run the React application and perform the tests as below: 

![Login Form Empty](/engineering-education/handling-form-and-validation--in-react-without-using-third-party-libraries/form-empty-error.png)


![Login Form Wrong Empty](/engineering-education/handling-form-and-validation--in-react-without-using-third-party-libraries/form-wrong-input.png)

### Wrapping up
We have successfully created a React Hook that can manage any form. In our case, we have used it with the login form.

We saw that when the form is submitted, it runs all the validations registered when the input was mounted and sets the errors for those speciﬁc ﬁelds. Then the errors are passed down to the correct input and displayed accordingly.

It is important to note that we have not used any third-party libraries in performing these validations and handling the form input.
The full code for this guide can be accessed at my GitHub [Repo](https://github.com/verah-tech/login-page-hooks).

### Further reading
- [Understanding Custom React Hooks](https://medium.com/swlh/understanding-custom-react-hooks-by-using-them-ce62a8342375).
- [Learning React Hooks](https://www.telerik.com/kendo-react-ui/react-hooks-guide/).
- [Building React form components](https://retool.com/blog/how-to-build-a-react-form-component/).
- [Understanding React useState and useEffect Hooks](https://sebhastian.com/react-usestate-useeffect-hooks/).