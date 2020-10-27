Cascading Style Sheets commonly known as CSS. This is what turns your everyday markup language, HTML, into a one of a kind expression that leaves people in admiration. CSS compliments the elements in HTML to help come up with a various designs that make a website pop. From background colors, font size, font weight, font-family and much more the design of a website becomes limited to only your imagination. This is the main playground for any developer. In simple terms CSS is like all the spices you add to your food to give it a rich, enticing aroma and taste when you finally present it. However, just throwing things in there randomly doesn't guarantee greatness. You still have to know what goes with what, when to apply a specific style or when something just doesn't fit in. How you implement your CSS can either make or break your website. Below we'll be looking at the different styling options in CSS, how to apply them and when best to implement each style.

### Styling in CSS
There are 3 distinct methods for styling in CSS. Each level of styling is given a different hierarchical priority and is used for different reasons. The 3 methods are further grouped into two categories. Namely *Internal CSS* and *External CSS*. *Internal CSS* comprises of Local Styles and Page-Level Styles while *External CSS* is just as the name implies.

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
        <p>This
    </body>
  </html>
  ~~~

  By using the style tag in the HTML element *p*, we are able to change the font, font-size, and style only for the first *p*. As for the second *p* element it retains its default style.

  2. **Page-Level styles:** Page-level styles are defined at the header area of the HTML file. All similar tags, whether elements members of the class or ID selector within the body of the HTML will undergo the changes at once.

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

  This time round we define the style within the *head* HTML tags. By doing so all elements defined in the style will automatically use the style defined for them. This means that all *p* elements in the page will have a color red and a background-color of yellow. The body on the other hand will have a color yellow and a background-color of red.

  3. **External Styles** The styles used for the webpage are located in a completely different file. The *.HTML* file is linked to the *.css* file which can be imported to modify the style. When developing a website with multiple pages this styling usually comes in handy.

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
  In this first half of the code there are no style tags defined. However, the styling used for the webpage has been written in another file and linked to this one using the link tags.
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

  The CSS written in this file, *mystyle.css*, is used in the code above it to implement the design.

### When to use each Style
With these three options for styling in CSS, **the best practices** should be to avoid internal CSS and implement external CSS.

  * __Local Style__ is not the first choice that comes to mind when dealing with CSS. At some point, it becomes too much of a burden to keep styling each element individually. By the time you come to the end of your project, the entire file is a mess. Which in the end prolongs the time needed to complete the project thereby causing you to extend deadlines or sacrifice your sleep just to keep up.

  However, This does not mean that the style should not be used. It usually works well when you're trying to test out a new style on an element making it easier to determine if the style works well with the design or not. But always keep in mind that local styles have a higher priority over page-level and external styles. Meaning they will override any style property defined in page-level and external.

    __Pros :__
      * Easy to test designs on individual elements
      * You can use one document for the loading of CSS styles.

    __Cons :__
      * It can take a long time to load or render a page since multiple individual elements are styled within.
      * This final file will look disorganized and making it harder to read.


  * __Page Level Style__ is the clean version local style where you have everything located at one central place within the header of the HTML file. This gives the best results especially when you're in the development phase of the project. This is because browsers do not cache page-level styles like they do external styles.

  __Pros :__
    * Easy to manage during initial development stages
    * Programmer doesn't need to keep switching files to make minor adjustments

  __Cons :__
    * Adding code to the document increases the size of the file.
    * In order to manipulate a website design you would have to acquire all the files that contain CSS

  * __External Styles__ gives you a wider range for its implementation. Since all the code used in the page styling is stored on a separate file it allows one to perform global changes on the project since one style sheet can control many pages. I prefer using external styling when it comes to launching the project or working with a live webpage. It is easier to upgrade since the design parameters of the entire site are defined in a single file.

  __Pros :__
    * One style sheet controls many pages
    * Separation of content and design

  __Cons :__
    *  You can not render the page until the entire CSS file is downloaded
    * Linking multiple CSS files to the page can lead to downtime.

### Conclusion
  Whether it is testing out a new style on an element, building a simple single-page website, or building a company website that requires a uniform design from start to finish, you might dabble in inline CSS, page-level styles or external styles respectively. Where inline lets you test out new design patterns but becomes too much of a workload implementing in the entire page. Page level lets you play around with the entire web page design without leaving the page but proves disadvantageous when dealing with multiple pages. While external styles can give your website the feel of a whole new theme.
