### How CSS works behind the scenes?

Before coming right onto the topic, we have to take a look at the very first thing that happens while loading a website in a browser.The loading of the root HTML document. When the root HTML document is being loaded, it gets parsed. Parsing means, taking the HTML code and then extracting valuable information from it. This includes information like the title of the page, header links, and the body content.

After the parsing of the HTML document, all the code is stored in DOM (Document Object Model). It describes the whole web page consisting of parents, children, and siblings. The header links that contain the CSS files are separated during the parsing. The separated CSS files go to the next step i,e. loading of the CSS files.
![Flowchart showing Parsing](/engineering-education/how-css-works-behind-the-scenes/parsing.png)

After the loading of the CSS files, parsing of CSS takes place, like parsing of HTML but **there’s a small difference**. The parsing of CSS files takes place in two steps and it is a bit more complex.

The first step is:- **Resolving the CSS declarations conflicts** and this step is also known as **Cascading**.
and, the second step is:- **Processing final CSS values.**

Now, let’s explain both the steps!!

1. **Cascading**:- It means, the combining of different CSS files while, resolving issues like **conflicts between the different rules and declarations that are applied to the same element**. Sometimes, while writing CSS some block of rules applies to certain elements and some do not. This happens because **some styles have higher importance or specificity than the other.**

So, now let us learn about cascading in detail.
Let me tell you, **there are three kinds of CSS**:-

1. **Author CSS**:- It is written by the developer.
2. **User CSS**:- It includes styles like the font-size of any web-page that **can be changed by the user in the browser settings.**
3. **Browser CSS**:- Some styles are **pre-defined in the browser** like in the case of anchor tags, this is known as Browser CSS.

and the work of cascade is to resolve the conflicts between the declarations coming from these 3 different CSS on the basis of some factors:-

1. **Importance**
2. **Specificity**
3. **Source order**

So, cascade marks the importance of CSS styles based on the source they are coming from in the following order:-

> 1. User declarations marked with **!important** keyword.
> 2. Author decalarations marked with **!important** keyword.
> 3. Author declarations.
> 4. User declarations.
> 5. Browser declarations.

Consider this example, let's say we have a **button with a class button under the nav element**. We have conflicted the background-color property of this button as,

![Code snippet showing Importance](/engineering-education/how-css-works-behind-the-scenes/importance-code.png)

In this case, **the background-color property with the color red will be applied**. This is because it is **marked with an !important keyword**. This is how 'importance' is applied while cascading.

Now, consider a situation when **two or more conflicting styles have the same importance**. In that case, **we use the specificity of the selectors** that we are using to style the element and the selector specificity is given as:-

**Inline styles > IDs > Classes or Pseudo classes > elements or pseudo elements**

Inline styles or **Inline CSS have the highest precedence because they are written in HTML documents** and not in the separate CSS files. Next comes, when we select the element by its ID. Next is, **selecting the element by its class which has lower precedence than ID**. Finally, selecting the element by its name has the lowest precedence.

We can actually find the specificity of any element based on the selectors we are using like this:- **(I, ID, C, E).**
Consider this example, in which an element has been styled in a separate CSS file.

```css
#nav button .btn:hover {
  background-color: red;
}
```

1. Since this element is not styled by inline CSS so, I=0.
2. It is selected by an ID nav, thus, ID=1.
3. It has 2 classes including **btn** and a pseudo-class **hover**, thus, C=2.
4. and finally, it also has an element button, therefor E=1.

**Thus, the selector specificity for this block of style will be (I, ID, C, E)=(0,1,2,1).**

### Let’s create an example showing how it resolves the conflict.

![Code snippet showing specificty](/engineering-education/how-css-works-behind-the-scenes/specificity-code.png)

So, which style you think will be applied to the button. Let’s start by writing the specificity for all these styles.
(0, 0, 1, 0),
(0, 0, 0, 2),
(0, 1, 1, 1)
As we can see that the **inline specificity is the same in all three**, so we will go to the next precedence i.e, ID. Now **ID for 1st and 2nd is 0 except the 3rd block has 1**, thus the 3rd block has a higher specificity than the rest 2. Now **we don’t even have to look at the other precedence i.e, classes and elements**.
So, in this case, the 3rd block of style will be applied the **background-color of the button will be blue.**

But, there can be a case **when ID can also be the same so we will go to the next precedence and then next until we find a winner**.
In that case, we will go to the very last scene we have while resolving the conflicts and that is **Source order**.

If the last two scenarios i.e, **importance, and specificity fails we decide the style by comparing the source order**. This means if 2 blocks have the same importance and specificity, then **the one written last will be applied.**

**Important points to remember:**

1. Do not use **!important** until it should not be given the highest priority.

2. Rather than using !important use the selector specificity carefully.

3. A selector with 1 ID specificity will always be given priority over the selector with 1000 class specificity. The one with 1 class specificity will be prioritized from the one with even 1000 elements specificity.

4. The **universal selector ‘ \* ‘** has specificity (0, 0, 0, 0).

So this finishes the first step of parsing the CSS i.e, Cascading.

2. **Processing the real values**
   This step includes giving the final processed values to all the styles.<br>
   The **default font-size of content on a webpage is always 16px** which is the style from the browser CSS and we can change it.
   Also, **we should never set the font-size in pixels**. This is because if we do so the user cannot change the size from the browser settings which is a bad user experience.
   So, what we do to solve this problem is to se**t the font-size in ‘rem’ and 1rem=16px to be exact**.<br>
   Now, we can also set the font-size in percentage and it will set it to the given percentage of the parent’s font-size.
   In the case of something like padding:15%, it will set the padding to 15% of the parent’s element total width.

**Now that the parsing of CSS has been completed, all the parsed CSS is stored in a CSS object model, one like the DOM. So, let’s look at the flowchart again.**

![Flowchart showing CSS-OM](/engineering-education/how-css-works-behind-the-scenes/css-om.png)

Now that, both HTML and CSS have been parsed and stored into their object models, **they both together form the Render Tree**. It is formed by a combination of HTML DOM and CSS-OM. It is **used for calculating the layout of each element** on the page and helps in rendering the page.

![Flowchart showing Render Tree](/engineering-education/how-css-works-behind-the-scenes/render-tree.png)

After the render tree has been formed, the website uses something known as the **Visual Formatting model**. A Visual Formatting model is an algorithm which **calculates the boxes and the box sizes for each element on the webpage** and helps in laying those elements on the page to determine the final layout of the page.

And finally, after this, we have our rendered website.

![Flowchart showing Rendered website](/engineering-education/how-css-works-behind-the-scenes/rendered-website.png)
