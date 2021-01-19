
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
The pseudo elements available for scrollbar customization include:
`::-webkit-scrollbar` the scrollbar.
`::-webkit-scrollbar-button` the buttons on the scrollbar (arrows pointing upwards and downwards).
`::-webkit-scrollbar-thumb` the draggable scrolling handle.
`::-webkit-scrollbar-track` the track (progress bar) of the scrollbar.
`::-webkit-scrollbar-track-piece` the track (progress bar) NOT covered by the handle.
`::-webkit-scrollbar-corner` the bottom corner of the scrollbar, where both horizontal and vertical scrollbars meet.
`::-webkit-resizer` the draggable resizing handle that appears at the bottom corner of some elements.

### Targeting more browser support
Building Future-Proof Scrollbar Styles
You can write your CSS in a way to support both -webkit-scrollbar and CSS Scrollbars specifications.

Here is an example that uses scrollbar-width, scrollbar-color, `::-webkit-scrollbar`, `::-webkit-scrollbar-track`, `::webkit-scrollbar-thumb`:
```CSS
/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}

/* Works on Chrome, Edge, and Safari */
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
 
Blink and WebKit browsers will ignore rules they do not recognize and apply -webkit-scrollbar rules. Firefox browsers will ignore rules they do not recognize and apply CSS Scrollbars rules. Once Blink and WebKit browsers fully deprecate the -webkit-scrollbar specification, they will gracefully fall back to the new CSS Scrollbars specification.

### Conclusion 
CSS is a fundamental language for any frontend developer. In this article, we covered on how to use CSS to style scrollbars by building a practical web page. I find the `::-webkit-scrollbar` pseudo element useful when I need to customize my website scrollbar. This feature translates to even better looking user interface. I hope you find this tutorial useful.