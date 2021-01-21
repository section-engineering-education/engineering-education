
CSS is the language we use to improve the look and feel of our applications on the web pages. With the current CSS
scrollbar specification from [W3C](https://www.w3.org/TR/2018/WD-css-scrollbars-1-20180925), we can now customize the appearance of the scrollbar with using CSS.
In this tutorial, we will learn how to build a web page and use CSS to customize scrollbars on modern browsers.

### Prerequisites
1. To write the code, you will need a code editor installed on your system, preferably [VS Code]().

2. To view the web page, you require a web browser such as [Google Chrome]().

3. A basic knowledge of HTML and CSS like using the pseudo-elements.
   
### Objectives
By the end end of this article you will:
1. Understand the browser scrollbar and various CSS available properties available for customization.
   
2. Get an introduction to CSS pseudo-elements. We will focus mostly on the `::-webkit-scrollbar` pseudo-element.
   
3. Be able to implement a customized scrollbar on your web page using CSS.
   
4. Understand how we can target more browser support of this specification.

### The web CSS Scrollbar
The following are the available selectors for scrollbar customization include:
- The `::-webkit-scrollbar` will represent the entire scrollbar.

- `::-webkit-scrollbar-button` is the buttons on the scrollbar. The arrows that point upwards and downwards.
  
- The `::-webkit-scrollbar-thumb` is a draggable handle for making scrolls.
  
- `::-webkit-scrollbar-track` is the track or the progress bar.

- `::-webkit-scrollbar-track-piece` represents the track that will not be covered by the handle when scrolling.
  
- `::-webkit-scrollbar-corner` is the bottom corner of the scrollbar, this is where both horizontal and vertical scrollbars meet.
  
- `::-webkit-resizer` is the draggable resizing handle that will appear at the bottom corner of the elements.
  
These are common properties in a -webkit vendor prefix. There exists various jQuery plugins that will extend or polyfill this functionality to other legacy browsers. A common plugin used is [jScrollPane](http://jscrollpane.kelvinluck.com/).

### Targeting more browser support
To build scrollbar customized styles, it is a good practice to target more support of this feature.
This is where we need to write a CSS code that targets support for both `-webkit-scrollbar` and CSS Scrollbars specifications from W3C.
This is an example that uses the properties of a scrollbar namely `scrollbar-width`, `scrollbar-color`, `::-webkit-scrollbar`, `::-webkit-scrollbar-track`, `::webkit-scrollbar-thumb`:
```CSS
/* This will work on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}

/* Targtes on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: orange;
}

*::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 20px;
  border: 3px solid orange;
}
```
 
> A side note : WebKit browsers will ignore some of the rules  that are not recognized  and make a fallback to apply 
> apply the `-webkit-scrollbar` rules. An example, Firefox browsers will ignore rules that they are not recognizing and instead
> use the CSS Scrollbars specifications.

### Building a web page and implementing a customized scrollbar
This is the part where I will design a landing page that implements a customized landing page. Let us create a folder for our project named `landing-page`. Our folder structure is very simple. We will create another folder inside the `landing-page` named `images` that will contain an image. In the root of our `landing-page`, we have two two files, the `index.html` and `styles.css`.
Let us design this application in the following steps.
1. Write the code for our HTML file. This will be a simple scrollable web page.

2. Add the CSS stylesheet for the application layout design and scrollbar customization. 

### The HTML

### Adding the CSS to our application

### Final application

That is the final application utilizing our CSS scrollbar feature. The [mozilla](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scrollbars) documentation is an awesome resource for reference and checking on the current browser support.
You can check the live application on [netlify]().


### Conclusion 
CSS is a fundamental language for any frontend developer. In this article, we covered on how to use CSS to style scrollbars by building a practical web page. I find the `::-webkit-scrollbar` pseudo element useful when I need to customize my website scrollbar. This feature translates to even better looking user interface. The code is very simple and you can go ahead and incoporate it on your projects. I hope you find this tutorial useful.