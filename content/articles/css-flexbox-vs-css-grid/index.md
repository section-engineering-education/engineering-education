---
layout: engineering-education
status: publish
published: true
url: /css-flexbox-vs-css-grid/
title: CSS Flexbox vs CSS Grid
description: There are many modern CSS technologies that are making it a lot easier to create dynamic layouts. Two of these are CSS Flexbox and CSS Grid. Learn the difference between them.
author: joseph-chege
date: 2021-02-21T00:00:00-20:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/css-flexbox-vs-css-grid/hero.png
    alt: CSS Flexbox vs CSS Grid Image
---
CSS is a very important web development technology. For a long time, we used common CSS properties to lay out HTML elements. These included floats, inline-block, and position styling. In recent years, we have seen many modern CSS technologies that are making it a lot easier to create dynamic HTML layouts.
<!--more-->
Some of these robust technologies include CSS Grid and CSS Flexbox. They have changed the way we lay out HTML elements in an incredibly simple approach.

When we talk about Flexbox and Grid layouts, we understand the concept of containers and items. In this case, a container is an HTML block that can contain other HTML elements. An item is an HTML element that can be placed inside a container.

Here is a simple example that showcases HTML items inside an HTML container.

```html
<div>
    <div>One</div>
    <div>Two Two</div>
    <div>Three Three Three</div>
    <div>Four Four Four Four</div>
    <div>Five Five Five Five Five</div>
</div>
```

In this example, the outermost `div` is a container element where other `divs` are the container items.

This guide will discuss the differences and relationships that exist between Grid and Flexbox layouts. To follow along with this guide, prior knowledge of [CSS Flexbox](/css-flexbox/) and [CSS Grid](/css-grid/) would be helpful.

### What is CSS Flexbox
Flexbox is a layout mode in CSS3. It's a more proficient approach to designing, aligning, and disseminating space between items in a container to control their arrangement. 

With Flexbox, we can arrange items left to right, right to left, top to bottom, or bottom to top and, at the same time, control the spacing, alignment, and order of items in the container.

### What is CSS Grid
CSS Grid is a collection of styles that allow you to control page layout based on rows and columns. In a Grid system, the containing elements are used to define a row within the layout. 

Then, you apply class attributes to item elements that then span them over the desired number of columns. This allows you to create more complex nested layouts.

### CSS Grid vs CSS Flexbox
Let's have a look at some of the common differences between the two layouts.

#### One vs two dimensions
Flexbox arranges items in a one-dimensional layout. This can be either in rows or columns.

![image](/engineering-education/css-flexbox-vs-css-grid/flex-horizontal-or-vertical.jpg)

[***Image Source***](https://www.youtube.com/watch?v=MdPYenT89o4)

A Flexbox layout fits best when aligning items either horizontally or vertically. It is one dimensional and can only fit a row or a column.

![image 2](/engineering-education/css-flexbox-vs-css-grid/vertical.png)

[***Image Source***](https://www.youtube.com/watch?v=MdPYenT89o4)

![image 3](/engineering-education/css-flexbox-vs-css-grid/horizontal.png)

[***Image Source***](https://www.youtube.com/watch?v=MdPYenT89o4)

A perfect example of a one-dimensional layout is a header navigation bar or a footer.

Let's take a look at implementing a header navigation menu using Flexbox.

```html
<div class="nav">
    <div>HOME</div>
    <div>ABOUT</div>
    <div>CONTACT</div>
    <div>SIGN UP</div>
    <div>SIGN IN</div>
</div>
```

Some CSS to style the header:

```css
.nav {
    display: flex;
    background: seagreen;
    height: 50px;
    align-items: center;
    gap: 10px;
}

.nav div {
    color: whitesmoke;
    margin-left: 20px;
}
```

![flex image](/engineering-education/css-flexbox-vs-css-grid/flex-header-nav.png)

Most common header layouts lay their items in one direction; making it much easier to use Flexbox because of its one-dimensional capabilities.

On the other hand, a Grid is a two-dimensional layout, meaning you can lay out items in rows and columns.

![image grid](/engineering-education/css-flexbox-vs-css-grid/grid.png)

[***Image Source***](https://www.youtube.com/watch?v=MdPYenT89o4)

An example of a basic two-dimensional layout.

```html
<div class="container">
    <div class="item item1"></div>
    <div class="item item2"></div>
    <div class="item item3"></div>
    <div class="item item4"></div>
    <div class="item item5"></div>
    <div class="item item6"></div>
</div>
```

```css
.container {
    display: grid;
    grid-template-columns: 150px 150px 150px;
    grid-gap: 1rem;
    grid-template-rows: 150px 150px;
}

.item {
    background-color: #1EAAFC;
    color: #fff;
    border: 6px solid #171717;
}
```

![grid example](/engineering-education/css-flexbox-vs-css-grid/grid-example.jpg)

We specify a grid with `display: grid` and then determine rows and columns with `grid-template-columns` and `grid-template-rows`. This defines a two-dimensional layout. In this case, each column and row take the size of `150px`.

#### Content vs layout
Flexbox is content-based so content comes first. By content first, we mean it helps you align the contents of and move blocks and items within a container.

On the other hand, the CSS Grid focuses on laying out the outer/skeleton layout of the page.

To understand the content vs layout concept, let's go back to the header navigation bar design we've discussed above. We can target an item inside the header (container) and determine where to display it.

To get the [core difference](https://www.youtube.com/watch?v=9zA8cB-54SA), assume we want to move the `Sign In` and `Sign Up` menu to the left, we can do it using Flexbox and CSS Grid.

**Using Flexbox:**

```css
.nav {
    display: flex;
    background: seagreen;
    height: 50px;
    align-items: center;
    gap: 1px;
}

.nav div {
    margin-left: 20px;
    margin-right: 20px;
    color: whitesmoke;
}

div:nth-child(4) {
    margin-left: auto;
}
```

![Flex Content First](/engineering-education/css-flexbox-vs-css-grid/flex-content-first.png)

We specify a child item of the container (nth-child(4) and determine its position). That's what we mean by Flexbox being content-based.

On the other hand, we can implement the same using CSS Grid. The header is one dimensional, and Flexbox is better for this, but we will go over an example with CSS Grid to differentiate between layout and content.

```css
.nav {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    background: seagreen;
    height: 50px;
    align-items: center;
    gap: 1px;
}

.nav div {
    margin-left: 20px;
    margin-right: 20px;
    color: whitesmoke;
}
```

And the result looks pretty much the same.

![header nav](/engineering-education/css-flexbox-vs-css-grid/grid-header-nav.png)

But notice, we specified ten columns, each taking a fraction of one unit. To drive the point home, let's see how the Grid layout works under the hood.

Use a web browser to inspect the parent `div` element.

![grid header](/engineering-education/css-flexbox-vs-css-grid/grid-header-under-the-hood.png)

This is awesome. We can see the grid is divided into ten cells. This is where the concept of the layout first is applied. First, we define the layout and then fix items into the grid cells.

If we were to move the items `Sign In` and `Sign Up` to the left, applying `margin-left: auto`,  as we did in the Flexbox example, it won't work. This how we could do it using CSS Grid.

```css
.nav {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    background: seagreen;
    height: 50px;
    align-items: center;
    gap: 1px;

}

.nav div {
    margin-left: 20px;
    margin-right: 20px;
    color: whitesmoke;
}

div:nth-child(4) {
    grid-column: 9;
    color: rgb(64, 35, 97);
}

div:nth-child(5) {
    grid-column: 10;
    color: rgb(64, 35, 97);
}
```

![nav layout](/engineering-education/css-flexbox-vs-css-grid/grid-header-nav-layout-first.png)

The layout has ten columns. To move these items to the left, specify the cells (layout first) where you want the content to be displayed.

![layout](/engineering-education/css-flexbox-vs-css-grid/grid-header-nav-layout-first-under-the-hood.png)

These simple examples explain the concept of content and layout first.

#### The gap property
Usually, you would include a margin property to create gaps around the items.

One of the structural differences between CSS Grid and CSS Flexbox is that you only create gutters around items using the Grid layout.

The great news is that CSS has added features that support implementing gutters around the items called a gap property. Both layouts support this property. 

It gives you control over the spaces around the items inside a container, between columns and rows.

Let's see how we can implement this.

Here, I have nine items inside a Flexbox container.

```html
<div class="gap">
    <div>A</div>
    <div>B</div>
    <div>C</div>
    <div>D</div>
    <div>E</div>
    <div>F</div>
    <div>G</div>
    <div>H</div>
    <div>I</div>
</div>
```

```css
.gap {
    display: flex;
    flex-wrap: wrap;
}

.gap>div {
    background-color: rgba(10, 129, 209, .5);
    border: 1px solid #000;
    color: #000;
    padding: 20px;
    font-size: 150%;
}
```

![gap](/engineering-education/css-flexbox-vs-css-grid/gap.png)

**Using margin to create gutter around the items.**

```css
.gap {
    display: flex;
    border: 3px solid rgba(6, 109, 243, 0.911);
    flex-wrap: wrap;
    max-width: 800px;
}

.gap>div {
    background-color: rgba(10, 129, 209, .5);
    border: 1px solid #000;
    color: #000;
    padding: 20px;
    font-size: 150%;
    margin: 6px;
}
```

![gap margin](/engineering-education/css-flexbox-vs-css-grid/gap-with-margin.png)

![wrapped margin](/engineering-education/css-flexbox-vs-css-grid/gap-with-margin-wrapped.png)

When I introduce a `margin of 6px`, notice how the spaces are created around the items. Margin creates some extra white spaces that can be avoided using the gap property.

The gap property distinctly creates the gutter. You can choose to create spaces between rows and columns.

Apply gap by specifying `column-gap`.

```css
.gap {
    display: flex;
    border: 3px solid rgba(6, 109, 243, 0.911);
    flex-wrap: wrap;
    column-gap: 6px;
    max-width: 800px;
}

.gap>div {
    background-color: rgba(10, 129, 209, .5);
    border: 1px solid #000;
    color: #000;
    padding: 20px;
    font-size: 150%;
}
```

![column gap](/engineering-education/css-flexbox-vs-css-grid/column-gap.png)

![gap column](/engineering-education/css-flexbox-vs-css-grid/column-gap-wrapped.png)

When we apply the wrap, we force Flexbox to create rows and columns on small screens. We can use `row-gap` to create the gutter around them as well.

```css
.gap {
    display: flex;
    border: 3px solid rgba(6, 109, 243, 0.911);
    flex-wrap: wrap;
    column-gap: 6px;
    row-gap: 6px;
    max-width: 800px;
}

.gap>div {
    background-color: rgba(10, 129, 209, .5);
    border: 1px solid #000;
    color: #000;
    padding: 20px;
    font-size: 150%;
}
```

![row gap](/engineering-education/css-flexbox-vs-css-grid/column-gap-row-gap.png)

**The shorthand**

To create spacing between rows and columns, we can use gaps and specify the units of both. 

For example, `gap: 6px 6px` and we will get the same results as applying `column-gap: 6px` and `row-gap: 6px`.

Note that when using the gap property, you can mix values in pixels and percentages. You do not have to stick to a single unit. For example, `6px 6%`, `6px 6rem` or `6% 6rem`.

When using the Grid, you would use `grid-gap`. `grid-gap` is deprecated, and we have a `gap` property that works on both layouts.

> **NOTE** : *This is not a difference between the two. It used to be when only Grid supported gaps. Since it is a [latest update](https://developer.mozilla.org/en-US/docs/Web/CSS/gap), you may find a tutorial stating gaps as a property difference.*

#### The wraps
The wrap is a property used to wrap items inside a container. It is applied when you want items to fit the available spaces of the container. 

This is one of the common properties needed to resolve a few issues, such as child elements not staying inside the container element.

The wrap allows us to wrap elements onto the next line when there is not enough room for them in the current content column.

The two layouts employ the concept of the wrap. They handle wrap differently.

Here is an example:

We are checking the ability to stretch and shrink items based on the amount of space available in our container.

Here is a very basic example of a wrap using Flexbox layout.

```html
<div class="row-flex">
    <div>1 2 3 4 5 6 7 8 9 0</div>
    <div>1 2 3 4 5 6 7 8 9 0</div>
    <div>1 2 3 4 5 6 7 8 9 0</div>
    <div>1 2 3 4 5 6 7 8 9 0</div>
    <div>1 2 3 4 5 6 7 8 9 0</div>
    <div>1 2 3 4 5 6 7 8 9 0</div>
    <div>1 2 3 4 5 6 7 8 9 0</div>
    <div>1 2 3 4 5 6 7 8 9 0</div>
    <div>1 2 3 4 5 6 7 8 9 0</div>
    <div>1 2 3 4 5 6 7 8 9 0</div>
</div>
```

```css
.row-flex {
    display: flex;
}
```

When you resize the screen to below 600px, not every item will be visible—that is where the concept of wrap comes to the rescue. Specify the wrap property inside the container, and this will be resolved.

```css
.row-flex {
    display: flex;
    flex-wrap: wrap;
}
```

We are using wrap inside the container to wrap the Flexbox items to the available container size.

#### The differences
Here is an example of a Flexbox and Grid layout:

```html
<h1>Flexbox</h1>
<div class="flex">
    <div>One</div>
    <div>Two Two</div>
    <div>Three Three Three</div>
    <div>Four Four Four Four</div>
    <div>Five Five Five Five Five</div>
</div>

<h1>Grid</h1>
<div class="grid">
    <div>One</div>
    <div>Two Two</div>
    <div>Three Three Three</div>
    <div>Four Four Four Four</div>
    <div>Five Five Five Five Five</div>
</div>
```

Some CSS to style the container and the items:

```css
/* Flexbox row styles */
.flex {
    margin-bottom: 2em;
    border: 3px solid #000;
    display: flex;
    flex-wrap: wrap;
    gap: 2px 2px;
    max-width: 700px;
}

.flex>div {
    background-color: rgba(130, 184, 219, 0.5);
    border: 2px solid rgb(104, 182, 235);
    color: #000;
    padding: 20px;
    font-size: 150%;
    flex: 1 1 250px;
}

/* Grid row styles */
.grid {
    max-width: 700px;
    border: 3px solid #000;
    background-color: #fff;
    color: #444;
    gap: 2px 2px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.grid>div {
    background-color: rgba(170, 132, 167, 0.5);
    border: 2px solid rgb(239, 189, 235);
    color: #000;
    padding: 20px;
    font-size: 150%;
}
```

![flex grid](/engineering-education/css-flexbox-vs-css-grid/grid-and-flexible.jpg)

Apply the wrap property to the container because it's the containing element of these items. It's going to control the wrapping of those items.

Let's do that.

When we apply the wrap property, this is how the CSS styling should look like:

```css
/* Flexbox row styles */
.flex {
    margin-bottom: 2em;
    border: 3px solid #000;
    display: flex;
    flex-wrap: wrap;
    gap: 2px 2px;
    max-width: 700px;
}

.flex>div {
    background-color: rgba(130, 184, 219, 0.5);
    border: 2px solid rgb(104, 182, 235);
    color: #000;
    padding: 20px;
    font-size: 150%;
    flex: 1 1 250px;
}

/* Grid row styles */
.grid {
    max-width: 700px;
    border: 3px solid #000;
    background-color: #fff;
    color: #444;
    gap: 2px 2px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.grid>div {
    background-color: rgba(170, 132, 167, 0.5);
    border: 2px solid rgb(239, 189, 235);
    color: #000;
    padding: 20px;
    font-size: 150%;
}
```

![flexible-wrapped](/engineering-education/css-flexbox-vs-css-grid/grid-and-flexible-wrapped.png)

For the Flexbox layout, we are applying:
- `flex-wrap: wrap` to push items into rows or columns.
- `flex: 1 1 250px` to give the items a width of 250 and allow them to grow and shrink as the screen size reduces.

In the Grid case:
- `grid-template-columns` to create columns.
- `minmax()` function to give each item a width of 250px.
- `repeat()` function to wrap the columns into rows and columns repeatedly.

The observation is that:
Flexible layout loses its context. If you look at item five, it loses its context when a wrap is applied. The wrap tries to squeeze the items to fill the space available. Also, when pushed down, item five is not the same size as other items. 

This is because Flexbox is one-dimensional, which arranges items in rows or columns. Wrap forces Flexbox to form rows and columns, making Flexbox to lose its one-dimensional context.

You can say a grid is just a grid. The items do not lose their grid context. They are all of the same size and fall in grid lines. It doesn't lose its context of being a grid. 

This has to do with the Grid layout being two-dimensional, and that fits well in a layout with rows and columns. In our case, the Grid wrap has forced the items to rows and columns and doesn't lose its two-dimensional context.

On the side of the application, the Grid wrap concept works best when you want to push items while maintaining the same width. A good example is the images section we used in our web designed (explained later in this guide).

![image section](/engineering-education/css-flexbox-vs-css-grid/images-section.png)

A fair use case of Flexbox wrap would be this subscription form, where the items don't have to be of the same size as you push them to different screen sizes.

```html
<div class="subscribe-container">
    <form>
        <input type="email" placeholder="Email Address">
        <input type="text" placeholder="Name">
        <input class="subscribe-button" type="submit" value="Subscribe">
    </form>
</div>
```

```css
.subscribe-container {
    max-width: 800px;
    margin: 60px auto;
    background-color: rgba(130, 184, 219, 0.5);
    border: 5px solid rgb(98, 143, 228);
}

.subscribe-container form {
    display: flex;
    flex-wrap: wrap;
}

.subscribe-container form input {
    margin: 15px;
    border: 1px solid rgb(98, 143, 228);
    padding: 0.4rem;
}

.subscribe-container form input {
    flex: 1 1 200px;
}

.subscribe-container form input[type="submit"] {
    border-radius: 3px;
    background-color: rgba(17, 228, 10, 0.5);
    color: rgb(98, 143, 228);
}

.subscribe-container form input[type="email"] {
    flex: 1 1 250px;
}
```

![subscribe-form](/engineering-education/css-flexbox-vs-css-grid/subscribe-form.jpg)

In this case, each item takes as much space as possible as the container spread or shrink on varying screen sizes.

![subscribe](/engineering-education/css-flexbox-vs-css-grid/subscribe.gif)

### Flexbox layout and Grid layout
Some of the most commonly asked questions about these two include:
- Does CSS Grid replace CSS Flexbox? Is it better than CSS Flexbox?
- Should I use CSS Grid instead of CSS Flexbox or CSS Flexbox instead of CSS Grid?
- When should I use either?
- Which is best to design web layouts?

Every layout has its strength. They both work differently. The best and easiest way is to combine the two layouts to produce an intricate, simple design in a standout way.

Let's illustrate where the CSS Grid can be implemented, working together with CSS Flexbox to create something awesome.

![content-alignment](/engineering-education/css-flexbox-vs-css-grid/web-page-design-and-content-alignment.png)

The above is an example of a web page design representation. By implementation, the design was done with a Grid layout. Check the [code](https://codepen.io/abbeyjfitzgerald/pen/zzqqYo) that was used to implement it.

During implementation, some instances will require you to use a Flexbox layout such as the header and footer.

When the design is implemented, we can represent the content and the design of this [example](https://codepen.io/abbeyjfitzgerald/pen/RgRoKy).

![web-design](/engineering-education/css-flexbox-vs-css-grid/web-design-implemented.png)

Go ahead and check the [code](https://codepen.io/abbeyjfitzgerald/pen/RgRoKy) used to implement the design above.

The main layout skeleton is made with the CSS Grid as previewed using a web browser inspector tool.

![under-the-hood](/engineering-education/css-flexbox-vs-css-grid/web-page-under-the-hood.png)

```css
.container {
    max-width: 1250px;
    margin: 0 auto;
    padding: 0 60px;
    display: grid;
    grid-template-columns: 0.4fr 0.3fr 0.3fr;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
    background-color: #fff;
}
```

Let's break down this web page.

As we said, the layout and its contents are a blend of the CSS Grid and CSS Flexbox properties.

The header consists of a navigation menu and a logo. They are aligned in one direction, and hence Flexbox layout will handle its alignment perfectly.

```html
<div class="header">
    <p class="logo"><a href="#"><i class="fa fa-home" aria-hidden="false"></i></a></p>
    <nav>
        <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">ABOUT</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">SIGN UP</a></li>
            <li><a href="#">SIGN IN</a></li>
        </ul>
    </nav>
</div>
```

In this case, the header is the perfect example of implementing a Flexbox inside the CSS Grid.

```css
.header {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
    text-transform: uppercase;
    border-bottom: 2px solid #b0e0ea;
    padding: 20px 0;
    display: flex;
    gap: 5px;
    align-items: center;
}
```

![header-content](/engineering-education/css-flexbox-vs-css-grid/header-content.png)

Again the navigation menu will fit well with a Flexbox layout.

```css
.header nav ul {
    display: flex;
    list-style-type: none;
}
```

![nav-header-content](/engineering-education/css-flexbox-vs-css-grid/nav-header-content.png)

Another case that embraces one dimension flexibility is the extra content section.

```html
<div class="extra">
    <div class="content-block-info">
        <h3>View Grid Help</h3>
        <p>See tips and tricks for CSS Grid Layouts...</p>
        <button>Read</button>
    </div>

    <div class="content-block-info">
        <h3>View Flexbox Help</h3>
        <p>See tips and tricks for Flexbox layouts...</p>
        <button>Read</button>
    </div>

    <div class="content-block-info">
        <h3>View Combined Help</h3>
        <p>See tips and tricks for combined layouts...</p>
        <button>Read</button>
    </div>
</div>
```

```css
.extra {
    grid-column: 2 / 4;
    grid-row: 4 / 5;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #ececec;
    justify-content: space-between;
}
```

![extra-content](/engineering-education/css-flexbox-vs-css-grid/extra-content.png)

Each `content-block-info` is arranged vertically; thus, a one-dimensional layout fits its design.

To wrap this illustration, the image section consists of images. It would be possible to implement this with a Flexbox layout by wrapping the images to fit the layout size.

But with a Grid layout, the images will work fine on a two-dimensional layout.

```css
.related-images {
    grid-column: 1 / 3;
    grid-row: 5 / 6;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
}
```

![images-section](/engineering-education/css-flexbox-vs-css-grid/images-section.png)

CSS Grid and Flexbox layout can do a many things. But in some areas, the CSS Grid is better and more convenient, and in other areas, Flexbox is more convenient and the right choice.

### Conclusion
#### When to consider Flexbox
- When you need small-scale layouts, it is ideal for implementing layouts with fewer items such as headers and footers.

- Flexbox is ideal if you consider aligning your content in one direction. It allows us to create a Flexbox container and determine its direction, either horizontally or vertically. It will help distribute your content evenly in one direction.

- When you consider a content first scenario, Flexbox will be a perfect choice.

#### When to consider Grid
- Larger scale layouts with multi-rows and multi-columns that are two dimensional. CSS Grid will help you with an intricate design like the one we used in the web design above due to its capacity to support multi-directional design. It enables you to design the bigger picture of your layouts and components.

- When a design of your layout is a choice to arrange the items in your container, the CSS Grid will be ideal for manipulating your layout's design.

The best option is to combine both layouts. A Flexbox container can be used inside a Grid container and not vise versa. When designing a web page, adopt the practice of using a Flexbox layout inside your Grid containers to move your content in the right direction.

I prefer to use Flexbox for specific layouts and CSS Grid for the general or the overall design. Rather than going with choice bias, I generally use them both where they're more needed. They both have different use cases, and I use the one more appropriate for the task at hand.

Happy coding.

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/) & [Louise Findlay](/engineering-education/authors/louise-findlay/)



