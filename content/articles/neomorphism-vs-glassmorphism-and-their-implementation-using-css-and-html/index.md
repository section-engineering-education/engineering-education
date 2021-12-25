#### Introduction

A beautiful user interface (UI) design will ensure a user remains fulfilled by a webpage. Developers have many ways of ensuring their UI designs stand out from the rest.

This article explores how to change the look and feel of your upcoming website using neomorphism and glassmorphism.

#### What You Will Learn

- The two UI design strategies: neomorphism and glassmorphism.
- The importance of an intriguing and captivating UI design.
- The various points of your page to fit each design strategy.
- How to use the two design patterns to design a login page using CSS and HTML.

#### Importance of an exemplary user interface design
Developers build websites to pass information to users. You can develop a simple website using a markup language and be done with it. But, a good UI/UX design adds many advantages to your site. Some of these advantages include:

- Improves users' experience as they will enjoy visiting the site. This sets a good first impression for your visitors.
- It helps raise your website's Search Engine Optimization (SEO) rankings due to an increased liking from your site's visitors.
- It boosts your website presence on the internet when it's still new.
- It creates consistency in your site as users get to find whatever they need quickly.
- Using proper fonts and eye-pleasing colors makes it easier for your visitors to navigate around a website.
- The website's UI is a branding tool that builds trust between you and your users.

#### Neomorphism
In 2020, neomorphism got the attention of many developers on the internet when it got applied to UI/UX design. But, the design pattern is still new and was inspired by skeuomorphism with a mix of minimalism.

Some developers describe neomorphism as **the soft UI** because it uses light shadows to bring out its effects.
neomorphism makes its UI elements seem like they are patched to the background. They are either protruding from it or inset into it.

#### Use Cases
- Neomorphism is favorable for websites that use many icons to increase accessibility. 
- Neomorphism is also great for designing mobile user interfaces icons.

#### Designing the Neomorphism UI
To create a good-looking neomorphism effect, use light shadows. Then, continue by combining the different box shadows and border-radius.

Create a form element found inside a `<div>` tag of the ID `login-box.`

Create two `<div>` tags with the input-fields class for the form's child elements. The `<div>` tags will each have two children: `<label>` and `<input>` tags, while the login button will have a `<button>` tag.

In the CSS file, give the body a display value of `grid` and place the items at the `center`. This shifts the login box to the center of the page. Finish by adding a background colour of your choice.

The code will look like this:

```css
body{
 display: grid;
 background: #dee2f1;
 text-align: center;
 place-items: center;
}
```

It's now time to style the form's `<div>` tag to produce the neomorphism effect.

Access the element using the ID `login-box`. Configure the width and height properties, and add a background colour. Set the border-radius and box-shadow properties to produce an oval like input field.

>It is essential to configure the box-shadow property with two shadow values. 

The code for that will look like this:

```css
#login-box{
 width: 350px;
 padding: 50px 45px;
 background: #dee2f1;
 border-radius: 11px;
 box-shadow: -3px -4px 8px #ffaaff73,
 2px 2px 5px #9b9da3;
```

>The login box has a general neomorphism effect. 

Configure the styles for the `input-fields` class to style the form's children and inputs. You should set the height and width to how you configured the outer `<div>` tag.

The code looks like this:

```css
.input-fields{
 height: 65px;
 width: 100%;
 position: relative;
 margin-top: 60px;
}
```

Give the border-radius a value of none and add two inset shadows to the box-shadow property in the inputs styles.
 
>Please note I removed the outline and border to prevent the neomorphism effect set on the elements from being overridden by the default styles.

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
Neomorphism UI elements look patched to the background and appear either inset or protruding from the background. 
 
In this case, make the login button protrude as the input elements appear inset. Remove the outline and border and give it the border-radius and box-shadow properties.

````css
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
````
>Use commas to separate the two values of the box-shadow.

You can add pseudo-elements like `focus` to the input and button elements to change their behaviour and styles when clicked.

The code for that is as follows:
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
```CSS
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
The webpage will look like this:
 
#### Glassmorphism and Its Use Cases

Since neomorphism lacked proper accessibility,its popularity declined causing its fall and rise of glassmorphism. 

Glassmorphism is a general design pattern for building many things without compromising accessibility.

Glassmorphism is great for designing:
- Website landing pages
- Mobile apps' UI 
- Dashboards
- App onboarding screens.
#### Designing the Glassmorphism UI

Set your elements with a semi-transparent background, a sublime shadow, and a border to achieve glassmorphism. Also, add a blur property to the background so that whatever is behind it is 'morphed' into the element.

Change the background colour and add the backdrop and blur properties. Proceed by removing the heavy background colours. Finally, use a blur function on the backdrop filter property to produce a semi-transparent background.

The code will look like this:
````css
#login-box{
 width: 350px;
 padding: 50px 45px;
 background: rgba(246, 246, 246, .6);
 backdrop-filter: blur(5px);
 border-radius: 12px;
 -webkit-backdrop-filter: blur(5px);
````

For the body, add an image background. I recommend an image with a gradient colour flow to produce an excellent visual for the blend (morph).

The code for that:

```css
body{
 display: grid;
 background: url(https://cdn.pixabay.com/photo/2021/06/29/06/14/water-drops-6373296__340.jpg);
 background-size: cover;
 text-align: center;
 place-items: center;
}
```

Add the backdrop filter property to the main element to produce the glassmorphism effect. 

Use the backdrop filter property on the login box, then remove the background colour and the box-shadow property.

> Please remove the background colour and the box-shadow property. This prevents the shadows from blocking the morphing effect.


The CSS code will look like this for the login box and its child elements. Kindly note that I have not inlcuded the HTML code.
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
Notice that I used a lighter colour in the elements' background. This increases the ease of the elements morphing with the body's background. 

The final webpage will look like this:
 
#### Conclusion

Glassmorphism and neomorphism are new trends. However, Glassmorphism is more recent and accepted by the developer community. Thus, developers will use the design for a long time to style websites until a better trend emerges. Concurrently, neomorphism will be around for a while due to its minimalist aspects. 

There are many glassmorphism and neomorphism UI libraries on the web to use in your upcoming project. Knowing the specific areas on your webpage to use the two design patterns is a skill to learn and practice.
