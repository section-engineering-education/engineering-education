---
layout: engineering-education
status: publish
published: true
url: /understanding-css-box-model/
title: Understanding CSS Box Model
description: In this tutorial the reader will learn what is a box model, how to control it, style it, and explore the basic types of boxes.
author: terrypha-wamaitha
date: 2021-08-09T00:00:00-10:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-css-box-model/hero.jpg
    alt: Understanding CSS Box Model Example Image
---
The box-model is a fundamental concept in CSS and HTML. Since everything in CSS is made up of boxes, it's critical to understand how the CSS box model works. 
<!--more-->
In this tutorial, we'll look at the basics of the CSS box-model and why it's known as the box model. In addition, I will provide a better understanding of the box-model behavior.

### Table of contents
1. [What is a box-model](#what-is-a-box-model)
2. [Controlling the box-model](#controlling-the-box-model)
3. [Styling the box](#styling-the-box)
4. [Basic types of boxes](#basic-types-of-boxes)
5. [Understanding the sizing of boxes](#understanding-the-sizing-of-boxes)
6. [Width and height calculations](#width-and-height-calculations)

### What is a box-model?
One or more rectangular boxes make up every element that can be shown on a web page. The CSS box model explains how rectangular boxes are displayed on a web page.

These boxes can have a variety of features and interact with one another in various ways, but they all contain a content area as well as optional **padding**, **border**, and **margin** areas used for changing the appearance.

### Controlling the box-model
Let's start with the box-model's layout, which is depicted in the accompanying image below. 

![css-box-model](/engineering-education/understanding-css-box-model/css-box-model.png)

[CSS box model example](https://www.dummies.com/)

### Styling the box
As we said earlier, we may change the appearance of the HTML components of the box by adjusting the content, padding, border, and margin. Let's look at each of them.

### Content
The content consists of data in the form of text, images, or other forms of media. The `width` and `height` attributes change the box's dimensions. While this is a straightforward definition, it should be emphasized that “content” can also refer to empty space.
For example, using an empty `div` tag to add extra unique designs to a webpage can be great.

#### Padding
Padding is the gap between the content's outside edge and its border. The padding property may be used to resize the box. Padding-left, padding-bottom, and other edge-specific attributes aid in obtaining custom spacing. 

>**NOTE**: You can use one value to represent the padding across the box, for example, `padding: 35px;` or you can give each side of the box a value, for example, `padding-left:25px;`.

Let's look at an example of padding in CSS:
```css
p {
    border-style: solid;
    border-color: red;
  }
```
Since there is no padding set for this **p** tag, you will get the result displayed as below.

![padding](/engineering-education/understanding-css-box-model/padding.png)

Let's add some padding to our **p** and see the results.

```css
p {
    padding: 35px;
    border-style: solid;
    border-color: red;
  }
```

These are the changes that you will observe.

![padding2](/engineering-education/understanding-css-box-model/padding2.png)

The additional padding between the paragraph content and the border has been altered significantly, as we can see.

### Border
The border of an element is defined by the distance between the padding's outer edge and the margin's inner edge. Its width is set to 0 by default.

The border property is used to specify the boundary of an element. Individual edges can be customized as well. 

The following are the three fundamental properties for creating borders:
- `border-style` - Typically, one of the following keywords is used: `solid`, `dashed`, or `dotted`.
- `border-width` - Informs the browser how big the border should be. For this property, we usually specify a pixel value, such as `border-width: 15px;`.
- `border-color` - By default, the value utilizes the text's current color. Even if we don't have to, we like to define it. Example,` border-color: blue;`.

Below is the basic example of the three properties:

```css
border-width: 5px 10px 15px 20px; 
border-style: solid dashed dotted double; 
border-color: red green blue brown;
```

![border](/engineering-education/understanding-css-box-model/border.png)

### Margin
Margin is the portion on the outside of the CSS Box Model. In simpler words, Margin is the distance between an element's box and the boxes of its surrounding elements.

This is similar to the page margin, which is the distance between a page's boundary and its content. It is translucent and has padding-like features, although it clears space outside the element's boundary.

Individual edges, like padding, can be set to have a specific margin. 

For example, `margin-top: 15px;`.

### Example
Let's look at an example of how to apply margin:

```html
<html>
<p>Am the first Box.</p>
<p>Am another Box.</p>

</html>
<style>

p {
    height: 150px;
    width: 150px;
    padding: 20px;
    border: 10px solid blue;
    margin: 15px;
}
</style>
```

The code above shows us how to apply spaces between the two boxes. It separates the two boxes with 15px.

### Basic types of boxes
1. Block boxes.
2. Inline boxes.

These are the two main types of boxes. Let's look at each of them.

#### Block boxes
By default, block boxes take up the entirety of the container's width.

The `<div>` HTML element is the most popular and used HTML element for a block box.

#### Inline Boxes
By default, inline boxes take up the space required by the wrapped content. The `<span>` HTML element is the most often used inline box element.

```html
<div>Am an Example of DIV</div>
<span>Am an Example of SPAN</span>
```

This is the pictorial presentation of the two types:

![div-span](/engineering-education/understanding-css-box-model/div-span.png)

### Understanding the sizing of boxes
Beginners usually make the mistake of assuming that padding, margins, and borders are included in an element's height and width. This is wrong.

The `height` and `width` attributes let you customize the height and width of a web element's content area. Other components on the web page are not taken into account.

When we write the HTML block width element, `width: auto;` the value is equal to the width of the row by default. However, we may assign HTML components a particular width value, such as `width: 200px;`.

### Width and height calculations
We'll need to do a quick calculation to see how much space our entire box takes up. Let's look at an example (let's use the values that we had supplied in the margin code above):
- height: 150px;
- width: 150px;
- padding: 20px;
- border: 10px solid blue;
- margin: 15px;
 
We use the following formula to calculate the width:

```bash
150px(Width) + 40(right and left padding) + 20px (right and left border) + 30px (right and left margin) = 240
```
To calculate the height, we use the height's pixels plus the top and bottom of the padding, border, and margin.

### Conclusion
In this article, we have looked at the box model and, we have seen that it determines the appearance of a box's content, padding, border, and margin.

You can find the code for implementation [here](https://replit.com/@Terripha/understanding-the-css-box-model#index.html).

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
