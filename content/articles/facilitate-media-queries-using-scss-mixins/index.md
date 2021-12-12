# THE BEST WAY TO FACILITATE CSS MEDIA QUERIES USING SCSS MIXINS
### Introduction
In web development, it is essential to build sites and applications that are user-friendly and visually appealing across every device. CSS media queries are the most used technique in creating the desired responsive websites for several screen sizes ranging from desktop to mobile. 


### TABLE OF CONTENTS
[Introduction](#Introduction)
[Prerequisites](#prerequisites)
[Key-takeawyas](#key-takeaways)
[CSS Media Queries](#css-media-queries)
[CSS Preprocessor scripting language (SCSS)](#css-preprocessor-scripting-language-scss))
[Setting up the SCSS Mixins](setting-up-the-sccs-mixins)
[Media queries using SCSS Mixins](#media-queries-using-scss-mixins)
[Conclusion](#conclusion)
[Further reading](#furtherreading)

### Prerequisites
To better understand this article, the reader is expected to have the following knowledge: 
HTML and CSS 
Basic knowledge of the CSS preprocessor - [SASS/SCSS](https://sass-lang.com)

### Key Takeaways 
At the end of this article, the reader is expected to learn the following: 
How the CSS preprocessor scripting language works
The best approach for handling media queries.
How to design responsive applications using SCSS mixins.
How best to implement the SCSS mixins for cleaner and easier to maintain codes.


### CSS Media Queries 
CSS media queries are among the fundamental CSS techniques that developers use to ensure the layout of a website adapts flawlessly on all devices. However, most developers agree that CSS media queries can be wordy, complex, time-consuming, and challenging to maintain. This is where the preprocessor scripting language SCSS comes in.

With the aid of the CSS preprocessor, particularly SCSS, one can build tidier and easy-to-maintain websites. The preprocessor expands CSS to provide functionalities and features that are handy in creating a responsive layout and design. The following steps cover how to create SCSS mixins. 

### Step 1
**CSS Preprocessor scripting language (SCSS)**
CSS Preprocessors are tools with extended functionalities that take written codes and compile them into traditional CSS that a browser can read and work with. SAAS (or SCSS), LESS, and Stylus are the most popular CSS preprocessors, but for this article, our focus would be on SCSS.
 
To avoid any confusion, let me clarify that SASS and SCSS are of the same origin, but the differences lie in their syntaxes and that SCSS is more flexible than SASS and provides more programming power. Where Sass stands for Syntactically Awesome Stylesheets, SCSS simply means Sassy CSS. No worries, SCSS is a superset of CSS, which guarantees that the CSS code works perfectly in SCSS and the features of SASS are still fully contained in it. 
 
To take advantage of a CSS preprocessor, one needs to install the CSS compiler on the web server. So, you would need to install sass if you don’t already have it installed on your system.
 
The most straightforward approach is to install Sass on Windows, Mac, or Linux by downloading the operating system package from [GitHub](https://github.com/sass/dart-sass/releases/tag/1.43.5) and adding it to your PATH. The path here refers to the listed directories where the OS looks for programs. 
That’s all. If you need more assistance on sass installation, you can visit the official [sass website](https://sass-lang.com)
 
### STEP 2
**Setting up the SCSS Mixins**
SCSS mixins give the ability to create reusable chunks of code, reduce repetition, promote cleaner codes, and allow easy maintainability. You don’t have to lay out the individual rules with tons of breakpoints which can be time-consuming and break up your code. Plus, you can avoid going through the frustration of searching through the CSS files for specific elements. Hence, it makes sense to use SCSS, particularly its mixins, to handle the media queries.
 
At this point, It is assumed that you have a sass compiler on your system and are ready to go. To use the mixins, you need to create a file titled "style.scss" and then place it in the root folder for your project. Then execute this code: ```sass --watch style.scss:style.css``` on the command prompt for the compiler to read the scss file. This action automatically creates a new CSS file named style.css in the folder.
 
Now mixins help you manage your media query by defining it in one location. So you can apply it as needed, and then sass enables you to compile it to the corresponding CSS codes.
Let’s open our style.scss file and input the necessary codes to set up the mixins:
 
 
```
// We define the mixins for two major breakpoints mobile and tablet
 
 // $breakpoint is the variable that can have several values
@mixin devices ($breakpoint) { //the name of the mixin is devices
  
    @if $breakpoint==tablet {    
    @media only screen and (max-width: 680px) {
      @content;
    }
  }
 
  @if $breakpoint==mobile {
    @media only screen and (max-width: 480px) {
      @content;
    }
  }
}
 
```
 
The above block of codes shows how mixins are mapped out and associated with names.
### STEP 3
**Media Queries Using SCSS Mixins**
As you can see in the snippet below, the styling can be affected by simply calling up the mixins. From what has been defined, the color changes appropriately for tablet and mobile screen sizes.
```
// HANDLING THE RESPONSIVENESS
.responsive {
    background: yellow;
  // normal styling code
 
  @include devices(tablet) {
        background: green;
        // responsive code for tablet
    }
 
  @include devices(mobile) {
        background: blue;
        h1{
            color: red;
        }
        // responsive code for mobile    
    }
}
 
```
By simply calling up the mixins created, you can apply stylings as you wish. These SCSS codes will compile to generate the corresponding CSS codes:
 
```
.responsive { 
  background: yellow;
}
@media only screen and (max-width: 680px) {
  .responsive {
    background: green;
  }
}
@media only screen and (max-width: 480px) {
  .responsive {
    background: blue;
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
With the SCSS mixins, I didn’t have to bury a long list of breakpoints in my code but have them in a centralized location for easy management and better responsiveness. I hope you found this article helpful in building responsive websites quickly and efficiently. Thanks to SCSS, you can see CSS media queries in a less intimidating light. 

### Further reading
[The easier way to write media queiries](https://levelup.gitconnected.com/the-easier-way-to-write-media-queries-with-scss-mixin-c7c956150551)
[Mixin documentation](https://sass-lang.com/documentation/at-rules/mixin)
[SASS Basics](https://sass-lang.com/guide)
[Writing media Queries](https://dev.to/heytulsiprasad/easy-to-write-media-queries-using-sass-mixins-1p2f)
[How to write CSS Media Queries](https://www.educative.io/edpresso/how-to-write-css-media-queries-using-sass-mixins)
[Creating better Queries with SASS](https://medium.com/nerd-for-tech/use-sass-to-create-better-media-queries-f5f149dc618c)
[Learn CSS Media Queries](https://www.freecodecamp.org/news/learn-css-media-queries-by-building-projects/)



