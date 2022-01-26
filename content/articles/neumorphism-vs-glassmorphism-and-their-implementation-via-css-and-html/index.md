---
layout: engineering-education
status: publish
published: true
url: /neumorphism-vs-glassmorphism-and-their-implementation-via-css-and-html/
title: Implementing Neumorphism and Glassmorphism UI Designs
description: In this article, we will discuss the UI design patterns of neumorphism and glassmorphism and how they are used.
author: linchez-maina
date: 2022-01-26T00:00:00-04:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/neumorphism-vs-glassmorphism-and-their-implementation-via-css-and-html/hero.png
    alt: neumorphism vs glassmorphism
---
A beautiful user interface design can help improve overall experience and satisfaction. Developers have numerous ways of ensuring that their UI designs stand out from the rest.
<!--more-->
This article explores how to change the look and feel of your upcoming website using neumorphism and glassmorphism.

### What you will learn
- The two UI design strategies: neumorphism and glassmorphism.
- The importance of an intriguing and captivating UI design.
- The various points of your page to fit each design strategy.
- How to use the two design patterns to create a login page using CSS and HTML.

### Importance of a beautiful user interface design
Developers build websites to pass information to users. You can develop a simple website using a markup language and still sell your service. 

However, a good UI/UX design adds many advantages to your site. They include:

- Improving users' experience as they visit the site. This sets a good first impression for your visitors.

- Raising your website's search engine optimization (SEO) rankings due to an increased liking from your site's visitors.

- Boosting your website presence on the internet when it's still new.

- Creating consistency in your site as users get to find whatever they need quickly.

- Making it easier for users to navigate through proper fonts and eye-pleasing colors.

- Building trust between you and your users using the website's UI as a branding tool.

### Neumorphism
In 2020, neumorphism got the attention of many developers on the internet when it got applied to UI/UX design. 

Nevertheless, neumorphism is still new and was inspired by skeuomorphism with a mix of minimalism.

Some developers describe neumorphism as *the soft UI* because it uses light shadows to bring out its effects. Neumorphism makes its UI elements seem like they are patched to the background. They are either protruding from it or inset into it.

### Use cases
- The design pattern is favorable for websites that use many icons to increase accessibility. 
- Neumorphism is also great for designing mobile UI icons.

### Designing the neumorphism UI
To create a good-looking neumorphism effect, use light shadows. Then, continue by combining the different box shadows and border-radius.

To start, create a form element found inside a `<div>` tag of the ID `login-box`. Then, create two `<div>` elements with the `input-fields` class for the form's child elements. 

The `<div>` tags will each have two children: `<label>` and `<input>` tags, while the login button will have a `<button>` tag.

In the CSS file, give the body a display value of `grid` and place the items at the `center.` This shifts the login box to the center of the page. Finish by adding a background color of your choice.

The code will look like this:

```css
body{
 display: grid;
 background: #dee2f1;
 text-align: center;
 place-items: center;
}
```

It's now time to style the form's `<div>` tag to produce the neumorphism effect. Access the element using the ID `login-box`. 

Configure the `width` and `height` properties, and then add a background color. Set the `border-radius` and `box-shadow` properties to produce an oval-like input field.

> It is essential to configure the box-shadow property with two shadow values, a light and dark shadow, to achieve the protruding effect. 

Your code should like this:

```css
#login-box{
 width: 350px;
 padding: 50px 45px;
 background: #dee2f1;
 border-radius: 11px;
 box-shadow: -3px -4px 8px #ffaaff73,
 2px 2px 5px #9b9da3;
}
```

> The login box has a general neumorphic effect. 

Configure the styles for the `input-fields` class to style the form's children and inputs. You should set their height and width to fit inside the outer `<div>` tag.

> The outer `div` tag is the one with the `login-box` ID.

The code appears as follows:

```css
.input-fields{
 height: 65px;
 width: 100%;
 position: relative;
 margin-top: 60px;
}
```

Give the `border-radius` a value of `none`, then add two `inset shadows` to the `box-shadow` property in the inputs' styles.
 
> Note that I removed the outline and border to prevent the neumorphic effect set on the elements from being overridden by the default styles.

The final code will look like this:

```css
.input-fields input{
 height: 100%;
 border: none;
 font-size: 16px;
 background: #dee2f1;
 padding: 0px 10px;
 color: #686869;
 outline: none;
 border-radius: 33px;
 box-shadow: inset 3px 3px 4px #9b9da3,
 inset -6px -6px 12px #ffaaff74;
 width: 100%;
}
```
Neumorphism UI elements look patched to the background and appear either inset or protruding from the background. 
 
In this case, make the `login button` protrude as the input elements appear inset. Then, remove the outline and border and give it the `border-radius` and `box-shadow` properties.

```css
button{
 margin-top: 80px;
 font-size: 20px;
 line-height: 45px;
 width: 100%;
 font-weight: 700;
 background: #dee2f1;
 border-radius: 30px;
 border: none;
 height: 60px;
 outline: none;
 color: #686869;
 box-shadow: 3px 3px 6px #9b9da3,
 -6px -6px 12px #ffaaff73;
 cursor: pointer;
}
```

> Use commas to separate the two values of the box-shadow.

You can add pseudo-elements like `focus` to the input and button elements to change their behavior and styles when clicked:

````css
button:focus{
 color: #3688db;
 box-shadow: inset 3px 3px 6px #9b9da3,
 inset -6px -6px 12px #ffaaff73;
}
````

The final HTML and CSS files will contain the following code:

```html
<body>
 <div id="login-box">
        <form action="#">
            <div class="input-fields">
            <label><p>Email Address</p></label>
            <br>
            <input type="text"  required>
            </div>
             <div class="input-fields">
             <label><p>Password</p></label>
             <br>
             <input type="password" required>
             </div>
            <button>Login</button>
        </form>
    </div>
</body>

```

```css
html,body{
 height: 100%;
}

*{
 font-family: sans-serif;
 padding: 0;
 box-sizing: border-box;
 margin: 0;
}

body{
 display: grid;
 background: #dee2f1;
 text-align: center;
 place-items: center;
}

#login-box{
 width: 350px;
 padding: 50px 45px;
 background: #dee2f1;
 border-radius: 11px;
 box-shadow: -3px -4px 8px #ffaaff73,
 2px 2px 5px #9b9da3;
}

.input-fields{
 height: 65px;
 width: 100%;
 position: relative;
 margin-top: 60px;
}

.input-fields input{
 height: 100%;
 border: none;
 font-size: 16px;
 background: #dee2f1;
 padding: 0px 10px;
 color: #686869;
 outline: none;
 border-radius: 33px;
 box-shadow: inset 3px 3px 4px #9b9da3,
 inset -6px -6px 12px #ffaaff74;
 width: 100%;
}

.input-fields input:focus{
 box-shadow: inset 2px 2px 1px #9b9da3,
 inset -2px -2px 1px #ffaaff73;
}

.input-fields label{
 position: relative;
 text-align: left;
 pointer-events: none;
 color: #666666;
}

button{
 margin-top: 80px;
 font-size: 20px;
 line-height: 45px;
 width: 100%;
 font-weight: 700;
 background: #dee2f1;
 border-radius: 30px;
 border: none;
 height: 60px;
 outline: none;
 color: #686869;
 box-shadow: 3px 3px 6px #9b9da3,
 -6px -6px 12px #ffaaff73;
 cursor: pointer;
}

button:focus{
 color: #3688db;
 box-shadow: inset 3px 3px 6px #9b9da3,
 inset -6px -6px 12px #ffaaff73;
}
```
The webpage will appear as shown below:

![Neumorphism](/engineering-education/neumorphism-vs-glassmorphism-and-their-implementation-via-css-and-html/neumorphism.png)
 
### Glassmorphism and its use cases
Since neumorphism lacked proper accessibility, its popularity declined, which led to the rise of glassmorphism. 

Glassmorphism is a general design pattern for building UI without compromising accessibility. It's great for designing:
- Website landing pages.
- Mobile apps' UI. 
- Dashboards.
- App onboarding screens.

### Designing the Glassmorphism UI
We need to set elements with a semi-transparent background, a sublime shadow, and a border to achieve glassmorphism. 

Also, add a `blur` property to the background so that whatever is behind it is 'morphed' into the element.

Change the background color then add the backdrop and blur properties. Next, remove the dark background colors and add a blur on the backdrop filter property to produce a semi-transparent background.

The code should appear as follows:

````css
#login-box{
 width: 350px;
 padding: 50px 45px;
 background: rgba(246, 246, 246, .6);
 backdrop-filter: blur(5px);
 border-radius: 12px;
 -webkit-backdrop-filter: blur(5px);
}
````

For the `body`, add a background image. I recommend an image with a gradient color flow to produce an excellent visual for the blend. Here is the code for that:

```css
body{
 display: grid;
 background: url(https://cdn.pixabay.com/photo/2021/06/29/06/14/water-drops-6373296__340.jpg);
 background-size: cover;
 text-align: center;
 place-items: center;
}
```

Add the backdrop filter property to the main element to produce the glassmorphism effect. Use the backdrop filter property on the login box, then remove the `background-color` and the `box-shadow` property. This prevents the shadows from blocking the morphic effect.

The CSS code for the login box and its child elements will look as follows. Note that I have not included the HTML code because we will be reusing the one used in the neumorphic design.

```css
*{
 font-family: sans-serif;
 padding: 0;
 box-sizing: border-box;
 margin: 0;
}

html,body{
 height: 100%;
}

body{
 display: grid;
 background: url(https://cdn.pixabay.com/photo/2021/06/29/06/14/water-drops-6373296__340.jpg);
 background-size: cover;
 text-align: center;
 place-items: center;
}
#login-box{
 width: 350px;
 padding: 50px 45px;
 background: rgba(246, 246, 246, .6);
 backdrop-filter: blur(5px);
 border-radius: 12px;
 -webkit-backdrop-filter: blur(5px);
}
.input-fields{
 height: 65px;
 width: 100%;
 position: relative;
 margin-top: 60px;
}
.input-fields input{
 width: 100%;
 outline: none;
 backdrop-filter: blur(5px);
 border: none;
 padding: 0px 10px;
 font-size: 16px;
 background: rgba(246, 246, 246, .6);
 -webkit-backdrop-filter: blur(5px);
 color: #686869;
 border-radius: 30px;
 height: 100%;
}
button{
 margin-top: 80px;
 height: 61px;
 font-size: 21px;
 line-height: 45px;
 font-weight: 700;
 background: rgba(246, 246, 246, .7);
 backdrop-filter: blur(5px);
 border:none;
 border-radius:30px;
 outline: none;
 cursor: pointer;
 color: #686869;
 -webkit-backdrop-filter: blur(5px);
 width: 100%;
}
```
Notice that we used a lighter color in the elements' background. This improves the morphic effect on the elements. 

The webpage will look as shown below:

![glassmorphism](/engineering-education/neumorphism-vs-glassmorphism-and-their-implementation-via-css-and-html/glassmorphism.png)
 
The final code for the two web pages can be found [here](https://github.com/lin-chez/Section-Repositories/tree/main/glassmorphism%20vs%20neomorphism).

### Conclusion
Glassmorphism and neumorphism are new trends in UI design. However, Glassmorphism is more recent and accepted by the developer community. Nevertheless, neumorphism will still be around for a while due to its minimalist aspects. 

Fortunately, there are many glassmorphism and neumorphism UI libraries that you can apply in a project. These libraries help to save time since you do not need to design UI elements from scratch.

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)
