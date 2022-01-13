## THE BEST WAY TO FACILITATE CSS MEDIA QUERIES USING SCSS MIXINS
### Introduction
In web development, it is essential to build sites and applications that are user-friendly and visually appealing across every device. CSS media queries are the most used technique in creating the desired responsive websites for several screen sizes ranging from desktop to mobile. 


### TABLE OF CONTENTS
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Key-takeaways](#key-takeaways)
- [CSS Media Queries](#css-media-queries)
- [CSS Preprocessor scripting language (SCSS)](css-preprocessor-scripting-language-(SCSS))
- [Creating the SCSS File](creating-the-sccs-file)
- [Media Queries Using SCSS Mixins](media-queries-using-scss-mixins)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To comprehend this article better, the reader should have an understanding of the following: 
- HTML and CSS 
- Elementary knowledge of the CSS preprocessor - [SASS/SCSS](http://sass-lang.com)

### Key Takeaways 
By the end of this article, the reader is expected to acquire the following knowledge: 
- How the CSS preprocessor scripting language works
- The best approach for handling media queries.
- How to design responsive applications using SCSS mixins.
- How best to implement the SCSS mixins for cleaner and easier to maintain codes.


### CSS Media Queries 
CSS media queries are among the fundamental CSS techniques that developers use to ensure the layout of a website adapts flawlessly on all devices. However, most developers agree that CSS media queries can be wordy, complex, time-consuming, and challenging to maintain. This is where the preprocessor scripting language SCSS comes in.

With the aid of the CSS preprocessor, particularly SCSS, one can build tidier and easy-to-maintain websites. The preprocessor enlarges the existing features and functionalities of CSS to produce a website with responsive design and layout. The following steps cover how to create SCSS mixins. 

### Step 1
**CSS Preprocessor scripting language (SCSS)**

CSS Preprocessors are tools with extended functionalities that take written codes and compile them into traditional CSS that a browser can read and work with. Generally, Leaner Style Sheets (LESS), Syntactically Awesome Stylesheets (SAAS)/Sassy CSS (SCSS), and Stylesheet Language (Stylus) are the most prominent CSS preprocessors among developers. In this article, we would be making use of SCSS.
 
SASS and SCSS should not be confused with each other, despite the similarity in their fundamental structure and their functionality as it concerns CSS. SCSS is a higher version of SASS, with greater programming features and flexibility when handling CSS codes. Thankfully, their distinctions can be seen easily in their different syntaxes and file extensions.
 
To take advantage of a CSS preprocessor, one needs to install the CSS compiler on the web server. There are various means of doing this, but an easy method is to locate the appropriate SASS package for your operating system on this [GitHub page](https://github.com/sass/dart-sass/releases/tag/1.43.5) and download it. Then you can simply install it and add the directory to your PATH. The path here refers to the listed directories where the OS looks for programs. That’s all. 

For further instructions or directions on the installation process, the official [sass website](https://sasslang.com) is always available.

### STEP 2
**Creating the SCSS File**

SCSS mixins give the ability to produce reusable blocks of codes which aids to avoid repetition, creating cleaner codes and enabling easy maintainability. There is no need to lay out the individual rules with tons of breakpoints which can be time-consuming and break up your code. Plus, you can avoid going through the frustration of searching through the CSS files for specific elements. Hence, it makes sense to use SCSS, particularly its mixins, to handle the media queries.
 
At this point, It is assumed that you have a sass compiler on your system and are ready to go. To use the mixins, you need to create a file titled "style.scss" and then place it in the root folder for your project. Then execute this code: ```sass --watch style.scss:style.css``` on the command prompt for the compiler to read the scss file. This action automatically creates a new CSS file named style.css in the folder.
 
Now mixins help you manage your media query by defining it in one location. So you can apply it as needed, and then sass enables you to compile it to the corresponding CSS codes.
Let’s open our style.scss file and input the necessary codes to set up the mixins:
 
 
```SCSS
// We define the mixins for two major breakpoints mobile and tablet
 
 // $breakpoint is the variable that can have several values
@mixin devices ($breakpoint) { //the name of the mixin is devices
  
    @if $breakpoint==tablet {    
    @media only screen and (max-width: 680px) {
      @content;
    }
  }
 
  @if $breakpoint==mobile {
    @media only screen and (max-width: 481px) {
      @content;
    }
  }
}
 
```
 
The above block of codes shows how mixins are mapped out and associated with names.

### STEP 3
**Media Queries Using SCSS Mixins**

As you can see in the snippet below, the styling can be affected by simply calling up the mixins. From what has been defined, the color changes appropriately for tablet and mobile screen sizes.
```SCSS
// HANDLING THE RESPONSIVENESS
.responsive {
    background: yellow;
  // The normal background color is set to yellow
 
  @include devices(tablet) {
        background: lightblue;
        // code set for tablet
    }
 
  @include devices(mobile) {
        background: aquamarine;
        h1{
            color: red;
        }
        // code set for mobile    
    }
}
 
```
By simply calling up the mixins created, you can apply stylings as you wish. These SCSS codes will compile to generate the corresponding CSS codes:
 
```CSS
.responsive { 
  background: yellow;
}
@media only screen and (max-width: 680px) {
  .responsive {
    background: lightblue;
  }
}
@media only screen and (max-width: 481px) {
  .responsive {
    background: aquamarine;
  }
  .responsive h1 {
    color: red;
  }
}
 
```
The result is a short block of CSS codes generated automatically, with styling for the breakpoints defined.
Now, you can simply use the mixins where you choose and alter the media queries by just editing the mixins. The resulting CSS codes are clearly neater, without the long list of breakpoints. When you run the codes and resize the screen to the various widths, you will observe how the background colour changes in correspondence.
 

### Conclusion
You have successfully acquired guidelines on how to install the SASS compiler, learnt how to set up the SCSS mixins and then utilized the best technique that uses SCSS mixins to build a website that would fit in appropriately and display perfectly across all devices. 
With the SCSS mixins, you don't have to bury a long list of breakpoints in my code but have them in a centralized location for easy management and better responsiveness. 
I hope you found this article helpful in building responsive websites quickly and efficiently. Thanks to SCSS, you can see CSS media queries in a less intimidating light. 

### Further reading
- [The easier way to write media queiries](https://levelup.gitconnected.com/the-easier-way-to-write-media-queries-with-scss-mixin-c7c956150551)
- [Mixin documentation](https://sass-lang.com/documentation/at-rules/mixin)
- [Writing Media Queries with Sass Mixins](https://itnext.io/writing-media-queries-with-sass-mixins-3ea591ea3ea4)
- [SASS Basics](https://sass-lang.com/guide)
- [Writing media Queries](https://dev.to/heytulsiprasad/easy-to-write-media-queries-using-sass-mixins-1p2f)
- [How to write CSS Media Queries](https://www.educative.io/edpresso/how-to-write-css-media-queries-using-sass-mixins)
- [Creating better Queries with SASS](https://medium.com/nerd-for-tech/use-sass-to-create-better-media-queries-f5f149dc618c)
- [Learn CSS Media Queries](https://www.freecodecamp.org/news/learn-css-media-queries-by-building-projects/)




