---
layout: engineering-education
status: publish
published: true
url: /form-validation-in-vue.js-using-veevalidate/
title: Form Validation in Vue.js using VeeValidate
description: This article will discuss and demonstrate how to set up form validation using the vee-validate library.
author: njunu-simon
date: 2021-09-01T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/form-validation-in-vue.js-using-veevalidate/hero.jpg
    alt: form-validation-in-vue.js-using-veevalidate
---

As technology evolves we are posed with challenges of creating modern solutions. It is fundamental to validate your forms in the browser. This saves on application resources and improves user experience.
<!--more-->
Vue has its built-in validation but recommends libraries such as `Vee Validate`, tested to work on all browsers.

In this tutorial, we will discuss and set up form validation using the vee-validate library.

### Prerequisites
To follow along with this article, it is helpful to have the following:
- [Node](https://nodejs.org) installed
- [Vue](https://vuejs.org/) installed
- [yarn](https://classic.yarnpkg.com/en/docs/install)
- Basic knowledge of JavaScript programming.
- Basic knowledge and practice of Vue.
- Text editor installed. Preferably [VS Code](https://code.visualstudio.com/)

### Overview

- [Why Client Side Validation](#why-client-side-validation)
- [Project SetUp](#project-setup)
- [Introducing VeeValidate](#introducing-veevalidate)
- [Form validation](#form-validation)
- [Custom Error Messages](#custom-error-messages)
- [Validation Triggers](#validation-triggers)
- [Add Alert Message](#add-alert-message)

### Why Client-Side Validation
Client-side validation is essential because it provides users with immediate feedback thus increasing user experience. 

This in turn saves on application resources by eliminating the response request cycle process hence saving on bandwidth and time. 

This is not to say that server-side validation should not be performed on an application, client-side validation can be disabled in the browser, it is wise to perform validation both on the client and the server.

### Project SetUp
Make sure you have `Vue` configured in your machine. Create a new Vue app with the above command:

```bash
vue create vue-form-validation
```

We are going to start by installing tailwind and setting up a demo template for practice. Install the [tailwind plugin](https://www.npmjs.com/package/vue-cli-plugin-tailwind)

In the newly created repository, install the plugin using the command below:

```bash
vue add tailwind
```

Let's create a new component and set up the tailwind template. Copy the template(Tailwind Form Template) body elements from this [pen](https://codepen.io/dev_njunu). 

Fire up the server and navigate to the local port, you will have a registration form. Feel free to customize it to your liking.

### Introducing VeeValidate
[VeeValidate](https://vee-validate.logaretm.com/v4/) is an effective validation library. Before we get into working with the library let's explore it. 

The above library provides us with two ways of form validation, components and composition API. We are going to adopt the components approach in this tutorial.

We are provided with the above components:
- **Form** component renders a form and wraps all form elements.
- **Field** component represents form inputs and renders any HTML element.
- **ErrorMessage** component displays an error message for a field.

Let's define the validation process and see how it relates to the mentioned components:
1. Wrap your form with the **Form** component, overwriting the default _form_ elements.
1. Replace _input_ element with **Field** component and add an identifier _name_ to the component.
1. Add validation rules.
1. Handle validation errors.

Now that you have a basic understanding of the library, let's dive deep and see how validation works.

Install the Vee Validate library:

```bash
yarn add vee-validate@next
```

After installation, create an empty folder _plugin_ in the _src_ folder to set up the validator. 

In the folder created, add a new file:

```bash
validation.js
```

Configure the plugin,

```js
import { Form as VeeForm, Field as VeeField } from "vee-validate";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
  },
};
```

We are importing and registering the components from the vee-validate library, giving them aliases so as not to collide with HTML elements.

We need to let Vue know we are using the vee-validate library, update _main.js_ file to match:

```js
import { createApp } from "vue";
import VeeValidatePlugin from "./plugin/validation";
import App from "./App.vue";
import "./assets/tailwind.css";

const app = createApp(App);

app.use(VeeValidatePlugin);

app.mount("#app");
```

In our template, replace the _form_ element with _vee-form_ component.

Refresh the browser and see that we have no error messages in our console, vee-validate has been successfully installed.

### Form Validation
We are going to validate our first input field, _username_. 

We should change our input element to _vee-field_ component and provide a _name_ identifier to our _Field_ components. The identifier helps us to match the component to error messages.

Our element should match:

```js
<vee-field
  name="username"
  id="username"
  class="bg-transparent border-b m-auto block border-gray-500 w-full mb-6text-gray-700 pb-1"
  type="text"
  placeholder=""
/>
```

Since we are done with the first two processes of form validation, lets add our rules. 

We are going to register the rules _globaly_ to avoid code repetition, but before that import the vee-validate-rule library.

```bash
yarn add @vee-validate/rules
```

Rules provide a list of criteria that a value must meet, it is a function that takes an input process and outputs an error message.
We configure the library in our _validation.js_ file:

```js
import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
} from "vee-validate";

import { required } from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
  },
};
```

To avoid going back and forth in files, we import the _defineRule_ and _ErrorMessage_ from vee-validate. This is used to define rules and set error messages respectively.

We register the _ErrorMessage_ component and define a _required_ rule, the rule ensures that an input element must be present.

The _defineRule_ is a function provided by the global validator. It takes two arguments; an _identifier_ (this is a rule name), and a _validator_ function used to verify the field value.

Let's get back to defining our rules. We will use the vee-validate property known as the _schema_. This will allow us to outsource our rules to an external object.

Define a schema object in the component that you pasted the tailwind template:

```js
<script>
export default {
  name: 'ComponentName', // replace with component-name
  data() {
    return {
      schema: {
        username: 'required'
      }
    }
  }
}
</script>
```

We can now bind our object to the _form_ component

```js
<vee-form :validation-schema="schema">
```

We are done with step 3. Next, we will set up the error component. 

Below the _field_ component define the _ErrorMessage_ component with some basic styling and the _name_ identifier as below:

```js
<ErrorMessage class="text-red-600" name="username" />
```

Note that the _name_ in the component must match with that defined in the _schema_ object and _field_ component.

Let's add a guard that will enable validation only on form submission. Add a _submit_ event provided by vee-validate then update the _Form_ component to match:

```js
<vee-form :validation-schema="schema" @submit="register" >
```

We have emitted a _register_ function in our _Form_ component. Let's define it:

```js
methods: {
  register(values){
    console.log(values);
  },
};
```

The _values_ parameter is provided by the vee-validate library, which stores all the values from the form inputs. When validation returns a truthy the values will be logged in the console.

Fill out the _username_ element in the form and submit the form. The form value should be returned in console. If you try to leave it empty, a validation error will be returned.

Now that we are familiar with validation and vee-validate, let's validate other input elements.

Import and register rules that will be used in our forms. Update _validation.js_ file to match:

```js
import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  not_one_of as excluded,
  confirmed,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("min_value", minVal);
    defineRule("max_value", maxVal);
    defineRule("excluded", excluded);
    defineRule("country_excluded", excluded);
    defineRule("password_mismatch", confirmed);
  },
};
```

We are having aliases for some of our [rules](https://vee-validate.logaretm.com/v4/guide/global-validators#vee-validaterules), the `apha_spaces` and `not_one_of`. This is to escape linting and improve readability.

Now that we have our rules in place, open the template file and update the `input fields` and `schema object`. To update the schema object, multiple rules will be separated with a pipe character.

```js
schema: {
  username: 'required|min:3|max:50|alpha_spaces',
  email: 'required|min:3|max:20|email',
  age: 'required|min_value:1|max_value:100',
  password: 'required',
  password_confirmation: 'password_mismatch:@password',
  country: 'required|country_excluded:Africa',
}
```

We can update our input elements and ErrorMessage as illustrated above in the _username_ example. Our form should now be validated.

When updating the input elements, you will have trouble with the drop down field. This will give us a chance to explore another _field_ property; the _as_ property. 

It defaults to an input element but allows us to render a root node. We update the _Country field_ to match:

```js
<div>
  <label id="country" class="text-xs text-gray-500">
    Country
  </label>
  <vee-field
    as="select"
    name="country"
    class="bg-transparent w-full py-1.5 px-3 text-gray-800 border-b border-gray-500
    transition duration-500 focus:outline-none focus:border-black rounded"
  >
    <option value="USA">USA</option>
    <option value="Mexico">Mexico</option>
    <option value="Germany">Germany</option>
    <option value="Africa">Africa</option>
  </vee-field>
  <ErrorMessage class="text-red-600" name="country" />
</div>
```

When you inspect the element in the source, it will have a select element property. We have overriden the default input element with the _as_ property.

While still on the Coutry field, let's explore what we can do with the library. Set-up a default option from the drop-down to the field. 

This is achieved by use of _initialValues_ property. It sends an objects containing field names as keys and their values.

Define an object _userData_ after our _schema_ object

```js
userData: {
  country: 'USA',
},
```

Update the _vee-form_ component to match the above:

```js
<vee-form :validation-schema="schema" @submit="register" :initial-values="userData" >
```

Note that we are binding the initial value to the object userData, which contains key-value properties. The object value will be set as the default select element in the drop-down.

### Custom Error Messages
Vee-validate provides us with its default error messages, but we can override it to match our custom messages. The _configure_ function will help us achieve this task.

Install the function:

```js
import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
```

Let's now create our custom rules, after the last rule registered with the _defineRule_, add the configure function.

```js
configure({
  generateMessage: (context) => {
    const messages = {
      required: `This field ${context.field} is required.`,
      min: `This field ${context.field} is too short.`,
      max: `This field ${context.field} is too long.`,
      alpha_spaces: `This field ${context.field} can only contain letters and spaces.`,
      email: `This field ${context.field} is not a valid email.`,
      min_value: `This field ${context.field} is too low.`,
      max_value: `This field ${context.field} is too high.`,
      excluded: "This field is not allowed.",
      country_excluded: "We do not allow users from this location",
      password_mismatch: `This field ${context.field} does not match.`,
    };
    const message = messages[context.rule.name]
      ? messages[context.rule.name]
      : `The field ${context.field} is invalid`;
    return message;
  },
});
```

The `configure functions` take an argument context and store a message which overrides the default error messages. The context argument stores input names.

We have the ternary operator which returns customized error messages.

### Validation Triggers
Validation happens on certain triggers. 

Register it after the _generateMessage_ object in the configure function. This is also provided by the configure function.
- ValidateOnBlur happens after a blur event on the input element.
- ValidationOnChange happens after the change event.
- ValidationOnInput happens when a field value is changed.
- ValidationOnModelUpdate happens after form submission.

In the configure function, after the generateMessage object, add the code below:

```js
validateOnBlur: true,
validateOnChange: true,
validateOnInput: false,
validateOnModelUpdate: true,
```

You are free to customize the validation triggers by setting your custom boolean inputs, this is just my preference.

### Add an Alert Message
It is a best practice to disable clients from submitting spam forms. A user should not submit a single form multiple times. 

In our component, update our data with the above properties. Add the properties after the _userData_ object.

```js
reg_in_submission: false,
reg_show_alert: false,
reg_alert_variant: 'bg-indigo-500',
reg_alert_message: 'Please wait! Account is being registered.',
```

These are properties that we set to disable the alert element from displaying when the form is in the progress of validation. Update the _alert_ element with the defined properties.

```js
<div class="shadow-lg mt-3 pt-3 pb-3 w-full text-white text-center
  hover:bg-indigo-400 rounded-full cursor-pointer"
  v-if="reg_show_alert"
  :class="reg_alert_variant"
>
  {{ reg_alert_msg }}
</div>
```

We are using the `v-if` directive to toggle the alert message if set to a boolean and v-bind to display our tailwind properties.
Define the properties in the _register function_, update it to match:

```js
register(values) {
  this.reg_show_alert = true;
  this.reg_in_submission = true;
  this.reg_alert_variant = 'bg-indigo-500';
  this.reg_alert_msg = 'Please wait! Your account is being created.';

  this.reg_alert_variant = 'bg-blue-500';
  this.reg_alert_msg = 'Success! Your account has been created.';

  console.log(values);
},
```

We have defined alert properties and message but not included it in our form. Update our button element to match:

```js
<button
  :disabled="reg_in_submission"
  class="shadow-lg mt-3 pt-3 pb-3 w-full text-white bg-indigo-500
  hover:bg-indigo-400 rounded-full cursor-pointer "
  type="submit"
  value="Create account"
  >
  Create Account
</button>
```

On submission, the form will be disabled to avoid multiple form submissions and an alert message will be displayed. Form input values will also be logged in the console as an object.

### Conclusion
We have learned about form validation in vue and how it can be achieved using the vee-validate library.

Please visit [VeeValidate](https://vee-validate.logaretm.com/v4/) official documentation for further clarifications.

The finalized code can be found [here](https://github.com/Njunu-sk/Form-Validation). Feel free to give the project a star.

Happy coding!

---

Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
