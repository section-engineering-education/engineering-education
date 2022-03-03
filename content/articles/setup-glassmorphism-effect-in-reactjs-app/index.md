---
layout: engineering-education
status: publish
published: true
url: /setup-glassmorphism-effect-in-reactjs-app/
title: Setting up Glassmorphism Effect in ReactJs App
description: In this guide, we will build a basic login form card. We will then implement the glassmorphism effect to the card component using React.js.
author: moses-maina
date: 2022-01-27T00:00:00-00:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/setup-glassmorphism-effect-in-reactjs-app/hero.png
   alt: Setting up a Glassmorphism Effect in ReactJs App Hero Image
---
Glassmorphism is an interface-based concept applied to web apps, websites, mobile apps, etc. Its commonly used in card-based interfaces.

Glassmorphism creates glassy panels that float in the set background space. This creates a transparent background blur with frosted-glassy-like effects.
 <!--more-->
In this guide, we will build a basic login form card. We will then implement the glassmorphism effect to the card component using React.js.

### Prerequisites
It will be advantageous to have the following to fully understand this article:
- Basic knowledge working with React.js and some basic understanding of using the Material UI.
- [Node.js](https://nodejs.org/en/) runtime installed on your computer.

### Table of contents
- [Setting up a React application using Create React App(CRA)](#setting-up-a-react-application-using-create-react-appcra)
- [Implementing a simple form](#implementing-a-simple-form)
- [Implementing the glassmorphism effect on the form](#implementing-the-glassmorphism-effect-on-the-form)
- [Conclusion](#conclusion)

### Setting up a React application using Create React App(CRA)
[Create React App](https://reactjs.org/docs/create-a-new-react-app.html) is a tool provided by the React.js team for bootstrapping a single page application in React. This provides you with a basic React App template that you use to scale up your application.

To create a basic React app using Create React App, navigate to your desired project directory and run the following command to initialize the React.js application using Typescript:

```bash
npx create-react-app react-glassmorphism-app --template typescript
```

Then run the following command to access the newly-created directory.

```bash
cd react-glassmorphism-app
```

To test this out, start the development server using the below NPM command.

```bash
npm run start 
```

The default React page will be loaded on your default browser. This indicates that everything is okay, and we can start building our React app logic.

### Implementing a simple form
We will start by creating a simple form and adding some CSS styling to it. Navigate to your `src/App.tsx` file and add the following changes:

- Import `App.css` at the top:

```ts
import './App.css';
```

- Edit the render function to add a form with `name`, `email`, and `password` fields as follows:

```ts
<div className="form-container">
    <form className="form">
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter name" />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter password" />
        </div>
    </form>
</div>
```

This basic form gives us a view that we need to set up a glassy panel.

The next step is to now style the above form. In the `src/App.css`, we will add the following styles:

- To the `form-container` class:

```css
.form-container{
    /* Entire page width */
    width:100%;
    /* Entire page height */
    height:100vh;
    /* Responsive layout */
    display:flex;
    /* Display vertically at the center */
    justify-content: center;
    /* Display horizontally at the center */ 
    align-items: center;
    /* Background image from unsplash */
    background-image:url('https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
    /* To cover the entire screen */
    background-size:cover;
    /* Image position */
    background-position:center;
    /* To not repeat the image beyond its scale */
    background-repeat:no-repeat;
}
```

Glassmorphism works well with multi-layered styles. In this case, we set a form container with an image as background. We will then layout a form card above this `form-container`.

- To the `form` class:

```css
.form{
    /** Sizeable width for the form **/
    width:400px;
    /** Sizeable height for the form **/
    height:400px;
    /** Black color with opacity **/
    background-color:rgba(0,0,0,0.5);
    /** Responsive layout **/
    display:flex;
    /** One element on top of the other **/
    flex-direction:column;
    /** Vertically at the center **/
    justify-content: center;
    /** Smooth corners **/
    border-radius:10px;
    /** Top, bottom, right, and left spacing between form and its content **/
    padding:20px; 
}
```

- To the `form-group` class:

```css
.form-group{
    /* Bottom space between one form-group and the other*/
    margin-bottom:20px;
    /* Responsive layout */
    display: flex;
    /* One element on top of the other */
    flex-direction: column;
}
```

- To the `label`:

```css
.form-group label{
    /** Medium font size **/
    font-size:16px;
    /** Visible color **/
    color:white;
    /** Bottom space between it and the input form **/
    margin-bottom:5px; 
}
```

- To the form inputs (text,email,password):

```css
.form-group input[type="text"],input[type="email"],input[type="password"]{
    /** Size-able width of the input **/
    width:90%; 
    /** Size-able height of the input **/
    height:40px;
    /** Smooth corners on all edges **/
    border-radius:5px;
    /** No line surrounding the input **/
    border:none;
    /** Top, right, bottom, right spacing to where content starts **/
    padding:10px; 
    /** Medium font **/
    font-size:16px;
    /** Visible color **/
    color:white;
    /** Dark background with some opacity **/
    background-color:rgba(0,0,0,0.5); 
}
```

The form and the form attributes will now float above the background image. This will help us create a colorful and transparent layer that can easily adjust to set up a blurred background.

Ensure your development server is running. If not, start it with the following command from the terminal:

```bash
npm run start
```

Then on your browser, open `http://localhost:300`. Your page should be similar to the one below:

![styled-home-page](/engineering-education/setup-glassmorphism-effect-in-reactjs-app/styled-home-page.png)

### Implementing the glassmorphism effect on the form
We have a styled form ready. Let's now add the flossy glassmorphism effect. To add the glassmorphism effect to our form, we will use the following styles. Head over to the `src/App.css`, and add the following styling to the `form` class:

- A linear gradient as the background image:

```css
/* To start from bottom to right on a less dark color to a darker color */
background-image:linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0));
```

A `linear-gradient()` determines the gradient's colors. It gives the gradient a starting point and an ending point. In this case, the starting point will be from the bottom and the ending point at the top. The starting point defines the first color of the gradient. The color starts with a less dark color and progresses to dark as the gradient moves to the right.

- A backdrop filter:

```css
/* A blur effect behind the form */
backdrop-filter: "blur(10px)"; 
```

`backdrop-filter` sets up a colorful and transparent layer that sets a blurred background. The blurred objects induce a layer that has a 3d perspective layout. This creates a blur-like effect that has a transparent background.

- A box shadow:

```css
/** Thick box shadow with a greyish background **/
box-shadow: 10px 10px 10px rgba(30,30,30,0.5);
```

`box-shadow` sets a background of your choice. You can adjust the shadow color to fit your preference.

- A border to the left and the top:

```css
/** Glass panel effect to the left **/
border-left:solid 1px rgba(255,255,255,0.8);
/** Glass panel effect to the top **/
border-top:solid 1px rgba(255,255,255,0.8);
```

Once you have added the above, head over to your browser `http://localhost:300` to check if everything is working as expected, the form should now have a glassmorphism effect, as shown in the image below:

![form-with-glassmorphism-effect](/engineering-education/setup-glassmorphism-effect-in-reactjs-app/form-with-glassmorphism-effect.png)

### Conclusion
Glassmorphism can be implemented in any application of your choice. This guide helped you implement a glassmorphism effect in React.js. It is an incredible artwork to add to your applications. However, it can be misused when overused. When used in inappropriate layouts, glassmorphism can create readability problems, especially for the visually impaired.

It shines most when used to highlight specific contents of your applications, such as cards, like the one we have created above. In this case, the glassmorphism effect should not be overused across different application components. It aims to highlight specific areas of your page that focus on specific content.

The critical aspect of glassmorphism effect adding is specifying `backdrop-filter` to your components. Other properties such as borders, box-shadow, and background can be adjusted to fit the design of your choice.

I hope you found this helpful. Happy coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)