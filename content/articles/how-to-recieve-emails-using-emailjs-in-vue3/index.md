# How to recieve emails using Emailjs in Vue3

## **Introduction**

One of the best and fast ways of connecting with your potential employer is through email. The ability to receive emails is a very important feature especially when you are trying to put yourself out in the labor market.

This article will teach you how to receive emails with emailjs specifically for  Vue3. You of course may be wondering what emailjs is, hang in there! I'll tell you before we begin to work with it.

Emailjs is a JavaScript library that is used to send and receive emails. These emails can be personal or transaction emails. It is a library that supports different email services like, Gmail, Fast mail, Outlook, Yahoo, and many others depending on which you prefer to use in your application.

It is only used on client-side technologies (on the frontend) like Vue, react, and angular. So no backend code is needed. All you have to do is Sign up, choose a supported email service and then connect the email you'd like to receive messages to that email service.


In this article you will be learning how to :

- Sign up
- Choose a supported email service
- Connect your email account to that email  service
- Create an email template
- Integrate it on a Vue application using the Vue3 composition API.

## **Prerequisites**

To follow this article, you need to have the following:

- Node
- Terminal app (Command Line)
- Text editor (E.g Vs code)
- Basic understanding of Vue.

## **Signing Up**

To integrate the email.js service in your application it is required that you sign up for a free account. Head over to the [emailjs](https://www.emailjs.com/) official website to sign up for a free account.

Once you have successfully created your account you will be having this screen below on your browser:

![email1.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email1.png)

## **Choosing a supported email service**

Once you have successfully created your account click on the "Add New Service" button to choose a supported email service. Like this:

![email2.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email2.png)

You will prompted with the types of email services available. In this article we will be using Gmail. Choose Gmail. Like this:

![email3.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email3.png)

The email service is totally up to you and the process still remains the same. Once you click on Gmail, you'll be having the screen below :

![email4.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email4.png)

## **Connecting An Account to the email service**

The next step is to connect your email account. This email account will be the email account you want to receive and send emails. Click on "Connect Account" to connect an email account.

![email5.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email5.png)

At this point you should be prompted to choose an email account associated with Gmail since that is the email service we are trying to incorporate. Choose an email account you'd like to connect and you should have the following screen:

![email6.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email6.png)

Click on the "Continue" button. After that you will be taken to the screen before that to create a service. Like this:

![email7.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email7.png)

After creating the Gmail service, you should have a test email sent to the connected email account which indicates that the email account is successfully connected to the Gmail email service.

## **Creating an email template**

On the side bar click on the "Email Templates" tab and then click on the "Create New Template" button. Like this:

![email8.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email8.png)

With that done, you should have this screen:

![email9.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email9.png)

The email template style is up to you. You can add more fields if you want to, you can change the font, the size of the font and other things. The template customization totally up to you. For the purpose of this article, our own template will look like this:

![email10.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email10.png)

So, we go ahead to save and test out our template like so:

![email11.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email11.png)

After clicking on the "Test it" button, you will have this screen:

![email12.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email12.png)

Now fill up the fields and click on the "Send Test Email" button. If you have a 200 status code, then we are good to go. Like this:

![email13.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email13.png)

 

Before we go ahead to the code, we will be needing three things from our Emailjs account, which are:

SERVICE_ID

TEMPLATE_ID

USER_ID

To get your SERVICE_ID, go to the side bar and click on the "Email Services" tab. Like this:

 

![email14.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email14.png)

For your TEMPLATE_ID, on the sidebar, click on the "Email Templates" tab. Like this:

![email15.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email15.png)

Finally, for your USER_ID, on the side bar, click on the "Integration" tab and scroll down to the end of the page. Like this:

![email16.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/email16.png)

With that done, we can go right into coding.

## **Setting emailjs up on Vue**

Now that we have our email service ready, we'll go ahead to integrate it in our vue application.

**Create a Vue project**

```jsx
vue create email-app
```

Be sure to select the default settings for vue3, As we will be using the latest version of vue.

Open up the project on your text editor. We will only be needing one component in this project which we will call `Email.vue` . The file structure for this project will look like this:

<aside>
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

</aside>

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

your `index.css` file should have the following styles:

```jsx
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

```jsx
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
            <input  name="subject" placeholder="subject" type="text" :value="inputFieldReset" required>
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
<script>

</script>

```

**Output**:

You should have this as an output on your browser. With that, we have our scaffolding set.

![output.png](/engineering-education/how-to-recieve-emails-using-emailjs-in-vue3/output.png)

The next thing we have to do is install the emailjs library and import it into our `Email.vue` component. Run the code below to install it:

**Installation**

```jsx
npm install emailjs-com
```

In our `Email.vue` component, inside the `script` tag we import it like this:

```jsx
import emailjs from 'emailjs-com';
```

Since we are using the vue3 Composition Api, we have to import `ref` right after the emailjs import like this:

```jsx
import {ref} from 'vue';
```

Now, we are to write a function that fetches the emailjs API. This API accepts four parameters which are: the `SERVICE_ID`, `TEMPLATE_ID`, the `DOM` element we want to access and the `USER_ID`. We will be using the browser Fetch API, which returns a promise that resolves into a response object.

so we declare two constant variables called `form` and `inputFieldReset`  and set them to the value of null.  The `form` acts as the reference to the DOM element we want to access which in this case is our form element, and the `inputFieldReset` is to reset the form fields after our message has been sent successfully.

So we have our function to look like this:

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

The code above is completely Vue3 syntax. On Vue2 which is an older version of Vue, this will be in a methods option. So basically the Vue2 integrates the Options API while the Vue3 integrates the Compositions API. 

Here, we have to return every function or variable we use and all functions go into one particular option called the `setup()`  , unlike the Options API where we have different options like `methods`, `computed`, and `watchers`  .

You'd notice I did `form.value` to access the value of the constant variable. That is how Vue3 works. On Vue2 you'd likely do `this.form`  and also the `inputFieldReset` variable.

So our function fetches the `emailjs`  API, giving it the four parameters it needs. Then if our form sends successfully, it says "Message sent" and empties the input fields of the form. And if an error occurs it says "Message not sent" with the particular error message alongside it.

Be sure to replace the parameters in the `sendMail` function with your credentials. And also have the name of you input tags in the form correspond to the field names of your email template.

On the form element in our template we do this:

```jsx
<form class="form" ref="form" @submit.prevent="sendMail" >
</form>                                       
```

When it comes to Vue3 we use the  `ref` attribute to reference a DOM element from the render context to be able to manipulate it right from our javascript code. Then we prevent the default behavior of our `form` element  with the `@submit.prevent` method passing in our function, so when the form is submitted it runs our `sendMail` function.

Now all you have to do is send a sample message from the contact form. And with that done you should see your sample mail right in your mailbox.

That it! It’s that simple.

## **Conclusion**

Javascript libraries help make it easier to write complex code easily. The email functionality we just added to our application will be very hectic setting it up from scratch. But with the help this library it is painless setting it up and this will be a good piece for your portfolio. This library is not only meant for Vue, like I said it works on different client-side technologies. This library works on React and Angular as well. 

Be sure to upgrade if you will be having more emails coming in as the free tier only works for 500 emails daily. You can find the code right [here](https://github.com/mercybassey/email-app-for-vue3). Thank you for reading, and happy coding.