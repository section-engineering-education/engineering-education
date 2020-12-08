---
layout: engineering-education
status: publish
published: true
url: /engineering-education/how-css-works-behind-the-scenes/
title: How does CSS works behind the scenes?
description: In this article we will explore what happens behind the scenes with CSS (Cascading Style Sheets). We will go over what parsing is within HTML.
author: sarthak-duggal
date: 2020-12-07T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-css-works-behind-the-scenes/hero.jpg
    alt: Parsing HTML CSS example image
---
Parsing means taking the HTML code and then extracting valuable information from it. This includes information like the title of the page, header links, and the body content.
<!--more-->
Before jumping right into the topic, we have to look at the first thing that happens while loading a website in a browser. When the root HTML document is being loaded, that is what we call being parsed.

After it parses the HTML document, all it stores the code in a DOM (Document Object Model). It describes the entire web page consisting of parents, children, and siblings. It separates the header links that contain the CSS files during parsing.

The separated CSS files go to the next step, i.e. loading the CSS files.

![Flowchart showing Parsing](/engineering-education/how-css-works-behind-the-scenes/parsing.png)

After loading the CSS files, the parsing of CSS occurs, similar to the parsing of the HTML files, but **there’s a slight difference**. The parsing of CSS files takes place in two steps, and it's a bit more complex.

The first step is: **Resolving the CSS declarations conflicts**, and this step is also known as **Cascading**.

The second step is: **Processing final CSS values.**

Now, let’s explain both steps!!

1. **Cascading**: It means combining different CSS files while resolving issues like **conflicts between the different rules and declarations applied to the same element**. Sometimes, while writing CSS, some block of rules applies to certain elements, and some do not. This happens because **some styles have higher importance or specificity over others.**

Now let's go over cascading in detail.

**There are three kinds of CSS**:

1. **Author CSS**: The developer writes it.
2. **User CSS**: It includes styles like the font-size of any webpage that **the user can change** in the browser settings.
3. **Browser CSS**: Some styles are **pre-defined in the browser** like in the case of anchor tags. This is known as Browser CSS, and the point of this cascade is to resolve the conflicts between the declarations coming from these three different CSS based on some factors.

Factors such as:
- ** Importance**
- ** Specificity**
- ** Source Order**

Cascade marks the importance of CSS styles based on the source they are coming from in the following order:

> 1. User declarations marked with **!important** keyword.
> 2. Author declarations marked with **!important** keyword.
> 3. Author declarations.
> 4. User declarations.
> 5. Browser declarations.

Consider this example: We have a **button with a class button under the nav element**. We have conflicted the background-color property of this button as:

![Code snippet showing importance](/engineering-education/how-css-works-behind-the-scenes/importance-code.png)

In this case, **the background-color property with the color red will be applied**. This is because it's **marked with an !important keyword**. This is how 'importance' is applied while cascading.

Now, consider a situation when **two or more conflicting styles have the same importance**. In that case, **we use the specificity of the selectors** that we are using to style the element, and the selector specificity is given as:

**Inline styles > IDs > Classes or Pseudo classes > elements or pseudo elements**

Inline styles or **Inline CSS have the highest precedence because they are written in HTML documents** and not in the separate CSS files.

Next select the element by its ID. Next is **selecting the element by its class, that has a lower precedence than ID**. Finally, selecting the element by its name has the lowest precedence.

We can find the specificity of any element based on the selectors we are using like this: **(I, ID, C, E).**

Consider this example, in which we have styled an element in a separate CSS file.

```css
#nav button .btn:hover {
  background-color: red;
}
```

1. Since this element is not styled by inline CSS so, I=0.
2. An ID nav selects it. Thus, ID=1.
3. It has two classes, including **btn** and a pseudo-class **hover**, thus, C=2.
4. And finally, it also has an element button, therefore E=1.

**Therefore, the selector specificity for this block of style will be (I, ID, C, E)=(0,1,2,1).**

### Let’s create an example showing how it resolves the conflict
![Code snippet showing specificty](/engineering-education/how-css-works-behind-the-scenes/specificity-code.png)

Let’s start by writing the specificity for all these styles:
```bash
(0, 0, 1, 0),
(0, 0, 0, 2),
(0, 1, 1, 1)
```

As we can see that the **inline specificity is the same in all three**, so we will go to the next precedence, i.e., ID. Now **ID for the 1st and 2nd is 0 except the 3rd block has 1**.

Thus the 3rd block has a higher specificity than the other 2.

Now **we don’t even have to look at the other precedence, i.e., classes and elements**.

In this case, the 3rd block of style will be applied to the **background - and color of the button will be blue.**

But, there could be a case **when the ID could also be the same, we would go to the next precedence until we found a winner**.

In that case, we would go to the very last scene we had while resolving the conflicts, and that's **Source order**.

If the last two scenarios, i.e., **importance, and specificity failed, we could decide the style by comparing the source order**. This means if two blocks have the same importance and specificity, then **the one written last will be applied.**

**Important points to remember:**

1. Do not use **!important keyword** until it is given the highest priority.

2. Rather than using !important, use the selector specificity carefully.

3. A selector with 1 ID specificity will always be given priority over the selector with 1000 class specificity. The one with 1 class specificity will be prioritized from the one with even 1000 elements specificity.

4. The **universal selector ‘ \* ‘** has specificity (0, 0, 0, 0).

So this finishes the first step of parsing the CSS, i.e, Cascading.

### Processing the real values
This step includes giving the final processed values to all the styles.<br>
The **default font-size of content on a webpage is always 16px**, that is the style from the browser CSS, and if needed we could change it.
Also, **we should never set the font-size in pixels**. Otherwise, the user cannot change the size from the browser settings, which is a bad user experience.
To solve this problem by **setting the font-size in ‘rem’ and 1rem=16px to be exact**.<br>
We could also set the font size in percentage, and it would set it to the given percentage of the parent’s font size.
In the case of something like padding:15%, it will set the padding to 15% of the parent’s element total width.

**Now that CSS's parsing has been completed, all the parsed CSS is stored in a CSS object model, similar to the DOM. So, let’s look at the flowchart again.**

![Flowchart showing CSS-OM](/engineering-education/how-css-works-behind-the-scenes/css-om.png)

Now that both HTML and CSS have been parsed and stored into their object models, **they both form the Render Tree**. It's formed with a combination of HTML, DOM, and CSS-OM. It's **used to calculate the layout of each element** on the page and helps render the page.

![Flowchart showing Render Tree](/engineering-education/how-css-works-behind-the-scenes/render-tree.png)

After the render tree has been formed, the website uses something known as the **Visual Formatting model**. A Visual Formatting model is an algorithm that **calculates the boxes and the box sizes for each element on the webpage** and helps lay those elements on the page to determine the final layout of the page.

Finally, we have our rendered website.

![Flowchart showing Rendered website](/engineering-education/how-css-works-behind-the-scenes/rendered-website.png)

Happy Coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
