### Introduction
[CSS](https://en.wikipedia.org/wiki/CSS) is still among the top ten coding languages according to [Redmonk](https://redmonk.com/sogrady/2020/07/27/language-rankings-6-20/), despite not being as popular as [JavaScript](https://www.javascript.com/).
CSS is popular among website developers because it is quite robust, relatively straightforward to learn, and ubiquitous across different browsers.

There are various CSS shortcuts or **hacks**, as there are with any coding language, that help you to write cleaner code, improve design components, and save time.

It's also vital to note that CSS does not require you to be a senior web developer.

If you’re new to CSS, I would urge you to have a look at this [tutorial](https://www.section.io/engineering-education/getting-started-with-css/) before we proceed. However, if you are familiar with fundamental aspects of CSS, Let's get started with the Important CSS **hacks**.

1. ### Hovering effect delays
In CSS, hovering is the change of the appearance of the component interface when the mouse is placed on it.

Apart from being beautiful to the users' eyes, the Hovering effect provides more information to that element and also draws more attention.

Below is an example snippet of a hovering effect:
```html
<html>
  <body>
    <h4>My website</h4>
    <p>This is my first website</p>
    <style>
      /*Styles without hovering effect*/
      h4 {
        font-size: 70px;
        color: red;
      }
      p {
        font-size: 60px;
        color: blue;
      }
      /* Styles, with hovering effect */
      h4:hover {
        color: black;
        transition: all 0.5s ease; /*An element for delaying the hovering effect. */*
      }
      p:hover {
        color: yellow;
        transition: all 2s ease;
      }
    </style>
  </body>
</html>
```
In the code snippet above, we have styled elements `h4` and `p` with different hovering effects. `h4` will turn to color black when the mouse is placed on it with a delay of 0.5s while `p` will change to color yellow with a longer delay of 2.0s.

2. ### How to use CSS to position content in the center
To center content in the screen using CSS, most of the developers have to scratch their heads. According to research, it's not that it's difficult to do that task, it's just that there are many ways of doing it which confuse developers on which to use.

For instance you can use  `position: absolute` to place you content in the center as shown in the snippet below:
```css
h4{
  position: absolute;
  left: 50%;
  top: 50%;
}
```
In the above style snippet, we have placed the content of element `h4` in the center. We have placed it halfway down the container with `top: 50%` and `left: 50%`.

3. ### Fitting images to the page in CSS. 
Have you ever come to a close website with images spilling over the site.❓️ Or have you ever designed a web app and on hosting it, the images spill all over the visitor's page?😞 If this ever happened am sure it caused a break on your site's layout and visitors turned away.

However, using this CSS `hack`, I can guarantee you that your images will always fit on your end users' screen despite the devices they are using.

Let's have a look at the example snippet below:
```css
img{
  width: 500px;
  height: 500px;
  object-fit: scale-down;
 }
```
In the above snippet, the `object-fit attribute specifies how an `image should be scaled to fit within its container.

4. ### CSS style for visited links
These styles are very important, yet some developers decide to avoid them. This sometimes causes trouble to the end-users as far as the usability of the web app is concerned.

The `a: visited` link controls all the links that the visitor has clicked on, the `a: link` controls all links that haven’t been clicked on yet. while the `a: active` link shows a link a moment it is clicked. 

Styling these links properly is a great benefit to the users. It builds a user-friendly website as users can navigate through the site easily

Different colors are used for different link as shown in the snippet below:
```css
/* color red represent unvisited link */
a:link {
  color: red;
}
/* color green represent visited link */
a:visited {
  color: green;
}
/*color blue represent selected link */
a:active {
  color: blue
```
5. ### How to style Initial Letter using CSS
The initial letter is a CSS technique that selects the first letter of a paragraph and specifies the number of lines it holds. It's usually used by print media and information sites, such as news sites. It's a very important technique as it grabs the reader's attention making them read the first line and finally the entire paragraph.

While this style may appear to have dated, you can still design it to appear modern and profit from the psychological effect it has on your clients.

Let's have a look at the example snippet below:
```html
<html>
  <body>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    <style>
       p:first-letter{
       display: grid;
       margin: 7px;
       color: black;
       font-size: 80px;
       float: left;
      }
    </style>
  </body>
</html>
```
6. ### How to Group styling in CSS
Styling different `HTML elements one by one is very tiresome and time wastage. This problem faced by developers is easily solved by learning how to consolidate CSS style.

To do this, you separate different elements with commas (`,`) and add the CSS style inside, then you will have added the style to all of them.

Because you don't have to write the same line of code numerous times, you'll save time and reduce the size of your code. Amazing Stuff🚀

Let's have a look at the example snippet below:
```html
<html>
  <body>
    <h4>Why do developer Group elements together when styling?</h4>
    <p>Developers Group elements together to save on time </p>
    <h5>What are advantages Of Consolidating during styling?</h5>
    <style>
      /* suppose you want to add a background color, text color, font and center the 3 elements in the middle of the screec */
      h4,p,h5{
        background-color: black;
        color: white;
        font-size: medium;
        text-align: center;
      }
    </style>
  </body>
</html>
```
7. ### Fixing an element’s position in CSS
Developers sometimes want to fix some elements in a certain position to make them behave differently, such as resting on top of one another or always remaining in the same location within the browser viewport.

This technique is achieved by the use of `position:absolute` script.
Let's have a look at the example snippet below:
```html
<html>
  <body>
    <div class="sidebar">
      <div>Menu Item 1</div>
      <div>Menu Item 2</div>
      <div>Menu Item 3</div>
      </div>
      <style>
        /* suppose you want to fix your sidebar’s position and size */
        .sidebar {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 300px;
          height: 150px;
          position: static;
          border: 3px solid #73AD21;
        }
      </style>
  </body>
</html>
```
### Conclussion
In this tutorial, we have covered the most important `hacks` that every developer needs to know to design the best web app.

If you need `Further Reading` refer to the  link below:
- [CSS tricks](https://www.creativebloq.com/features/css-tricks-to-revolutionise-your-layouts)

Happy coding ahead!🥳
