When it comes to web development for non-techies the first thought that pops into their heads is a deep dive into a dark abyss. Where you magically open your _third eye_ and manage to talk to the computer in a language only the chosen few can understand. However, this is far from reality. Change sides and take it from a techies perspective. The first thoughts that pop up might be "What framework best fits this task?" or "Should I do this from scratch or customize an existing template?". A great number of us look forward to starting a new project. This to us means learning a different concept or re-enforcing an existing one. But what if you decide to build a new webpage from scratch? Do you remember the basics? How are you going to implement your CSS on the webpage? CSS is part of the backbone of any webpage but do you know that it also has its form of styling? Yes we all know about bootstrap and its ease of use but that is a topic for a different day.

### Styling in CSS
A simple google search will show you that there three different styling methods in CSS each different from the other. Each level has its application and use scenario depending on what gets the job done.

  1. **Local styles:** Also known as inline. This form is defined within your HTML tags/elements. It is mostly used to style specific elements in your code.
  ~~~HTML
  <html>
    <head>
      <title>Cascading Style Sheets</title>
    </head>
    <body>
      <p style = "font-family: sans-serif;
          font-size: 1.2em
          font-style: italic;">
          This paragraph is an example of a local style.
        </p>
    </body>
  </html>
  ~~~

  2. **Page-Level styles:** Page-level styles are defined at the header area of the HTML file. Unlike local styles, you can customize all the similar tags at once thereby saving time and maintaining uniformity.
  ~~~HTML
  <html>
    <head>
      <title>Cascading Style Sheets</title>
      <meta charset="utf-8">
      <style type="text/css">
         body{
           color: yellow;
           background-color: red;
         }
         p{
           color: red;
           background-color: yellow;
         }
      </style>
    </head>
    <body>
      <h1>Heading</h1>
      <p>This paragraph has been styled using page level styling.</p>
    </body>
  </html>
  ~~~

  3. **External Styles** In this case, the styles used for the webpage are located in a completely different file. They are linked to the HTML file depending on which CSS file (Style) best fits the webpage. When developing a website with multiple pages this styling usually comes in handy.

  ~~~html
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="utf-8">
        <title>External Styles</title>
        <link rel="stylesheet" type="text/css" href="css/myStyle.css"/>
    </head>
    <body>
      <h1>Heading</h1>
        <p>This is an example of External CSS</p>
    </body>
  </html>
  ~~~
  ~~~CSS
  /*This is the CSS file called myStyle.css*/
  body{
    background-color: black;
    color: white;
  }
  p{
    color: purple;
  }
  ~~~

### When to use each Style
With these three options for styling in CSS, it becomes rather difficult to identify the most appropriate when building a webpage.

  * _Local Style_ is not the first choice that comes to mind when dealing with CSS. At some point, it becomes too much of a burden to keep styling each element individually. By the time you come to the end of your project, the entire file is a mess. Even the smallest changes will require you to redo at least **70%** of the CSS. Which in the end prolongs the time needed to complete the project.

  However, This does not mean that the style should not be used. It usually works well when you're trying to test out a new style on an element making it easier to determine if the style works well with the design or not. But always keep in mind that local styles have a higher priority over page-level and external styles. Meaning they will override any style property defined in page-level and external

  * _Page Level Style_ is the clean version local style where you have everything located at one central place within the header of the HTML file. This gives the best results especially when you're in the development phase of the project. This is because browsers do not cache page-level styles like they do external styles.

  * _External Styles_ gives you a wider range for its implementation. Since all the code used in the page styling is stored on a separate file it allows one to perform global changes on the project since one style sheet can control many pages. I prefer using external styling when it comes to launching the project or working with a live webpage. It is easier to upgrade since the design parameters of the entire site are defined in a single file.

### Conclusion
In the end of the what matters is how you apply the little knowledge you've gained. Whether it is testing out a new style on an element, building a simple single-page website, or building a company website that requires a uniform design from start to finish. Always consider the project, process, and product at all times.

Happy Coding.
