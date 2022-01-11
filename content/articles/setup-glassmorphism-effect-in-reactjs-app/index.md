Glassmorphism is an interface-based concept applied to web apps, websites, mobile apps, etc. Its commonly used in card-based interfaces. Glassmorphism creates glassy panels that float in the set background space. This creates a transparent background blur with frosted-glassy-like effects.

In this guide, we will be implementing the glassmorphism effect on a card component using React.js.

### Prerequisites
It will be advantageous to have the following to fully understand this article:

- Basic knowledge working with React.js and some basic understanding of using the Material UI
- [Node.js](https://nodejs.org/en/) runtime installed on your computer.

### Overview
- [Prerequisites](#prerequisites)
- [Overview](#overview)
- [Setting up a React application using Create React App(CRA)](#setting-up-a-react-application-using-create-react-appcra)
- [Implementing a simple form](#implementing-a-simple-form)
- [Implementing the glassmorphism effect on the form](#implementing-the-glassmorphism-effect-on-the-form)
- [Conclusion](#conclusion)

### Setting up a React application using Create React App(CRA)
[CRA](https://reactjs.org/docs/create-a-new-react-app.html) is a tool provided by the React.js team for bootstrapping a single page application in React. To create a basic React app using CRA, navigate to your desired project directory and run the following command to initialize the React.js application using Typescript:

```bash
npx creat-react-app react-glassmorphism-app --template typescript
```

Then run the following command to access the newly-created directory.

```bash
cd react-glassmorphism-app
```

To test this out, start the development server using the below command.

```bash
npm run start 
```

The default React page will be loaded on your default browser to indicate everything is okay.

### Implementing a simple form
We will start by creating a simple form and adding some CSS styling to it. In the `src/App.tsx`, add the following changes:

- Import `App.css` at the top:

```ts
import './App.css';
```

- Edit the render function to edit a form with `name`, `email`, and `password` fields as follows:

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

Since we just need a view for this article, the above view is enough.

The next step is to now style our form. In the `src/App.css`, we will add the following styles:

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

The form will form attributes will now float above the background image. This will help us create a colorful and transparent layer that can easily adjust to set up a blurred background.

Ensure your development server is running. If not, start it with the following command from the terminal:

```bash
npm run start
```

Then on your browser, open `http://localhost:300`. Your page should be similar to the one below:

![styled-home-page](/engineering-education/setup-glassmorphism-effect-in-reactjs-app/styled-home-page.png)

### Implementing the glassmorphism effect on the form
To add the glassmorphism effect to our form, we will add the following styles:

- A linear gradient as the background image:

```css
/* To start from bottom to right on a less dark color to a darker color */
background-image:linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0));
```

- A backdrop filter:

```css
/* A blur effect behind the form */
backdrop-filter: "blur(10px)"; 
```

`backdrop-filter` sets up a colorful and transparent layer that sets a blurred background. The blurred objects induce a layer that has a 3d perspective layout.

- A box shadow:

```css
/** Thick box shadow with a greyish background **/
box-shadow: 10px 10px 10px rgba(30,30,30,0.5);
```

- A border to the left and the top:

```css
/** Glass panel effect to the left **/
border-left:solid 1px rgba(255,255,255,0.8);
/** Glass panel effect to the top **/
border-top:solid 1px rgba(255,255,255,0.8);
```

After adding the styles, refresh your previously opened tab. The form should apply the below glassmorphism effect:

![form-with-glassmorphism-effect](/engineering-education/setup-glassmorphism-effect-in-reactjs-app/form-with-glassmorphism-effect.png)

### Conclusion
Glassmorphism is an incredible artwork to add to your applications. However, it can be misused when overused. When used in inappropriate layouts, glassmorphism can create readability problems, especially for the visually impaired. It shines most when used to highlight specific contents of your applications, such as cards, like the one we have created above.

Glassmorphism can be implemented in any application of your choice. This guide helped you implement a glassmorphism effect in React.js.