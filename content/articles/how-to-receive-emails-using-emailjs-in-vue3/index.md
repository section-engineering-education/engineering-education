---
layout: engineering-education
status: publish
published: true
url: /how-to-receive-emails-using-emailjs-in-vue3/
title: How to Receive Emails using EmailJS in Vue3
description: In this tutorial we will discuss how integrate Email.js into a Vue3 application. It is a library that supports different email services like Gmail, Fast mail, Outlook, Yahoo
author: mercy-bassey
date: 2022-02-07T00:00:00-08:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-receive-emails-using-emailjs-in-vue3/hero.jpg
    alt: Vue 3 EmailJS image for Vue 3
---
One of the best and fastest ways of connecting with your potential employer is through email. The ability to receive emails is an important feature, especially when putting yourself out in the labor market.
<!--more-->
This article will teach you to receive emails with [EmailJS](https://www.emailjs.com) specifically for the Vue3 framework. 

EmailJS is a JavaScript library that is used to send and receive emails. These emails can be personal or transaction emails. It is a library that supports different email services like Gmail, Fast mail, Outlook, Yahoo, and many others depending on which you prefer to use in your application.

It is only used on client-side technologies (on the frontend) like [Vue](https://vuejs.org), [React](https://reactjs.org), and [Angular](https://angular.io). So no backend code is needed. 

All you have to do is sign up, choose a supported email service, and then connect the email you'd like to receive messages to that email service.

In this article you will be learning how to:
- Sign up.
- Choose a supported email service.
- Connect your email account to that email  service.
- Create an email template.
- Integrate it on a Vue application using the Vue3 composition API.

### Prerequisites
To follow this article, you need to have the following:
- Node.js locally installed.
- Text editor (e.g. Vs Code).
- Basic understanding of Vue.

### Signing up
To integrate the EmailJS service in your application, it is required that you sign up for a free account. Head over to the [emailjs](https://www.emailjs.com/) official website to sign up for a free account.

Once you have successfully created your account, you will see this screen below on your browser:

![account](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email1.png)

### Choosing a supported email service
Once you have successfully created your account, click on the `Add New Service` button to choose a supported email service.

![service](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email2.png)

You will be prompted with the types of email services available. In this article, we will be using Gmail. Choose Gmail as shown below:

![Gmail](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email3.png)

The email service is totally up to you, and the process remains the same. Once you click on Gmail, you'll have the screen below:

![account](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email4.png)

### Connecting an account to the email service
The next step is to connect your email account. This email account will be the email account you want to receive and send emails to.

Click on `Connect Account`  to connect an email account.

![Connect](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email5.png)

At this point, you should be prompted to choose an email account associated with Gmail. Since that is the email service, we are trying to incorporate. 

Choose an email account you'd like to connect, and you should have the following screen:

![account](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email6.png)

Click on the `Continue` button. After that, you will be taken to the previous screen to create a service as shown in the screenshot below:

![service](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email7.png)

After creating the Gmail service, you should have a test email sent to the connected email account, which indicates that the email account is successfully connected to the Gmail email service.

### Creating an email template
Click on the `Email Templates` tab, and then click on the `Create New Template` button on the sidebar as shown below:

![template](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email8.png)

With that done, you should have the following screen:

![output](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email9.png)

The email template style is up to you. You can add more fields if you want to; you can change the font, the size of the font, and other things. 

The template customization is totally up to you. For this article, our template will look as shown below:

![sample-output](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email10.png)

So, we go ahead to save and test out our template:

![test](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email11.png)

After clicking on the `Test it` button, you will have this screen:

![test-output](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email12.png)

Now fill up the fields, and click on the `Send Test Email` button. We are good to go if you have a 200 status code.

![status](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email13.png)

Before we go ahead with the code, we will need three things from our EmailJS account, which are:
- SERVICE_ID.
- TEMPLATE_ID.
- USER_ID.

To get your `SERVICE_ID`, go to the sidebar, and click on the `Email Services` tab.

![service](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email14.png)

For your `TEMPLATE_ID`, click on the `Email Templates` tab on the sidebar.

![templates](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email15.png)

Then, for your `USER_ID`, click on the `Integration` tab on the sidebar and scroll down to the end of the page.

![user](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/email16.png)

With that done, we can go right into coding.

### Setting EmailJS up on Vue 3
Now that we have our email service ready, we'll go ahead to integrate it into our Vue application.

#### Create a Vue project
```bash
vue create email-app
```

Be sure to select the default settings for Vue 3, as we will be using the latest version of Vue.

Open up the project on your text editor. We will only be needing one component in this project, which we will call `Email.vue`. 

The file structure for this project should look like this:
```bash
  |_ email-app

    |_ node_modules

    |_ public

    |_ src

      |_ assets

      |_ components

        |_ Email.vue
    |_ App.vue

    |_ index.css

    |_ main.js

    |_ gitignore

    |_ babel.config.js

    |_ package.lock.json

    |_ package.json
```

Your `App.vue` component should look like this:
```jsx
  <template>
  <Email />
  </template>

  <script>
  import Email from '@/components/Email.vue'

  export default {
  name: 'App',
  components: {
  Email
    }
  }
  </script>
```

Next, your `index.css` file should have the following styles:
```css
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

*{
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}

html, body {
 font-size: 12px;
 overflow: hidden;
 font-family: 'Comfortaa', cursive;
 color: white;
}

p{
 font-size: 30px;
 padding: 10px;
 font-weight: bold;
}

.form-container {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 margin: 50px auto;
 border-radius: 10px;
 padding: 10px;
 background-color: #ea1d6f; 
 width: 500px;
}

.form-group{
 padding: 15px;
}

.form-group input{
 padding: 10px 10px 10px 10px;
 border: none;
 border-radius: 10px;
 width: 400px;
 outline: none;
 font-family: 'Comfortaa', cursive;
 font-weight: 500;
}

.text-area {
 height: 150px;
 width: 400px;
 border: none;
 border-radius: 10px;
 padding: 10px;
 outline: none;
 font-family: 'Comfortaa', cursive;
 font-weight: 500;
}

.form-group .submit{
 border: none;
 border-radius:5px;
 height: 40px;
 width: 70px ;
 cursor: pointer;
 font-family: 'Comfortaa', cursive;
 font-weight: 500;
}
```

And then, the `Email.vue` component should look like this:
```html
  <template>
  <section>
  <div class="form-container">
  <p>Hire Me</p>
  <form class="form">
  <div class="form-group">
  <input name="from_name" placeholder="name" type="text" :value="inputFieldReset" required>
  </div>
  <div class="form-group">
  <input name="email" placeholder="email" type="email" :value="inputFieldReset" required>
  </div>
  <div class="form-group">
  <input name="subject" placeholder="subject" type="text" :value="inputFieldReset" required>
  </div>
  <div class="form-group">
  <textarea class="text-area" name="message" placeholder="message" type="text" :value="inputFieldReset" required></textarea>
  </div>
  <div class="form-group">
  <input class="submit" type="submit" name="send" />
  </div>
  </form>
  </div>
  </section>
  </template> 
```

#### Output:
It would help if you had this as an output on your browser. So with that, we have our scaffolding set.

![vue-output](/engineering-education/how-to-receive-emails-using-emailjs-in-vue3/output.png)

The next thing we have to do is install the EmailJS library and import it into our `Email.vue` component. Run the code below to install it:

#### Installation
```bash
npm install emailjs-com;
```

In our `Email.vue` component, inside the `script` tag, we import it like this:

```jsx
import emailjs from 'emailjs-com';
```

Since we are using the Vue 3 Composition API, we have to import `ref` right after the EmailJS import like this:
```bash
import {ref} from 'vue';
```

Now, we are going to write a function that fetches the EmailJS API. This API accepts four parameters: the `SERVICE_ID`, `TEMPLATE_ID`, the `DOM` element we want to access, and the `USER_ID`. 

We will be using the browser Fetch API, which returns a promise that resolves into a response object.

So we declare two constant variables called `form` and `inputFieldReset` and set them to the value of null.  

The `form` acts as the reference to the DOM element we want to access, which is our form element, and the `inputFieldReset` is to reset the form fields after our message has been sent successfully.

So, we have our function that look like this:
```jsx
<script>
import emailjs from 'emailjs-com';
import {ref} from 'vue';

export default {
 setup() {
    const form = ref(null);
    const inputFieldReset = ref(null);

    const sendMail = () => {
        emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form.value, 'USER_ID')
        .then(() => {
          alert('Message sent!')
          inputFieldReset.value = " ";
        }, (error) => {
          alert('Message not sent', error);
        }); 
      }
    }

 return{
    form,
    inputFieldReset,
    sendMail
  }
 }
}
</script>
```

The code above is completely Vue3 syntax. On Vue2, an older version of Vue, this will be a methods option. Basically, the Vue 2 integrates the Options API, while the Vue 3 integrates the Compositions API, which works just fine for building Vue applications efficiently. 

Here, we have to return every function or variable we use, and all functions go into one particular option called the `setup()`. You'll notice we have `form.value` to access the constant variable's value and the `inputFieldReset` variable. That is how Vue 3 works.

So, our function fetches the `emailjs` API, giving it the four parameters it needs. Then if our form sends successfully, it says `Message Sent` and empties the form's input fields. 

And if an error occurs, it says `Message not sent`; with the particular error message alongside it.

Be sure to replace the parameters in the `sendMail` function with your credentials. Also have the name of your input tags in the form correspond to the field names of your email template.

On the form element in our template, we do this:
```html
<form class="form" ref="form" @submit.prevent="sendMail" >
</form>
```

When it comes to Vue 3, we use the `ref` attribute to reference a DOM element from the render context to manipulate it right from our JavaScript code. Then, we prevent the default behaviour of our `form` element with the `@submit.prevent` method, passing in our function. So, when the form is submitted, it runs our `sendMail()` function.

You have to send a sample message from the contact form. And with that done, you should see your sample mail right in your mailbox.

That's it! It's that simple.

### Conclusion
JavaScript libraries help make it easier to write complex code easier. For example, the email functionality we just added into our application will be very hectic setting it up from scratch.

But with the help of this library, it is painless setting it up, and this will be a good piece for your portfolio. 

This library is not only meant for Vue; as I said, it works on different client-side technologies. So, for example, this library works on React and Angular. 

Be sure to upgrade if you have more emails coming in, as the free tier only works for 500 emails daily. You can find the code right [here](https://github.com/mercybassey/email-app-for-vue3). Thank you for reading, and happy coding.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
