CSS Grid is a layout system used in web design to layout UI elements of a web page using rows and columns. We can easily do this with Tailwind CSS. Tailwind CSS added a comprehensive set of utilities for working with CSS Grid Layout! Let's take a look at how they work.

In this tutorial, we will learn how we can easily layout elements in our web page using grid classes with Tailwind CSS. We will also learn how to make responsive designs for our elements using these classes.

### Prerequisites
You will need knowledge of HTML and Tailwind CSS classes to be able to follow up what we will be doing throughout this tutorial.

We will not cover the basics of Tailwind CSS in this tutorial. If you are not comfortable with the Tailwind, we highly recommended to go over this tutorial, ``/engineering-education/introduction-to-tailwind-css``, to learn how to add Tailwind to your project before you continue further.

Let’s jump into it!

### Overview
In this tutorial we will be going through the following:
1. Linking the project with Tailwind
2. Setting up the HTML
3. Grid row and columns classes and responsiveness
4. Grid row and column span classes
5. Grid gap classes and responsiveness

### Linking our Tailwind stylesheet
We will then link our Tailwind stylesheet to our project using <link> tag as show below:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./src/tailwind.css">
</head>
</html>
```

### Setting up the HTML

First, we will set the background of our web page as green on the <body> tag. You can choose any other color that is appealing to you. Next, we will specify the height of our containment `<div>`. We will now create another container inside the first container. This container will contain the elements which we will be laying out in rows and columns.
```html
<body class="bg-green-400">
    <div class="min-h-screen flex items-center justify-center">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
            <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">1</div>
            <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">2</div>
            <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">3</div>
            <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">4</div>
            <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg col-span-2">5</div>
            <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">6</div>
            <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">7</div>
            <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">8</div>
            <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">9</div>
            <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">10</div>
        </div>
    </div>
</body>
```

We have added the following styling classes to our elements:
 - `min-h-screen` sets minimum height of the container to be equal to 100% of the screen height.
 - `flex` aligns the elements vertically.
 - `items-center` and `justify-center` align the cards in the center of the screen.
 - `rounded-lg` makes the edges of the elements have a rounded look.
 - `bg-green-100` classes gives the elements a green background color around.

We have now completely set our HTML and added Tailwind classes. This is how it looks like:

![Small Screen](/engineering-education/using-tailwind-grid-classes/image-sm.png)

![Medium Screen](/engineering-education/using-tailwind-grid-classes/image-md.png)

![Large Screen](/engineering-education/using-tailwind-grid-classes/image-lg.png)

As shown above, the layout of the elements changes depending on the screen size of the viewport. This is called responsiveness.

### Grid rows and columns and responsiveness
To be able to use grid classes, we need to start by giving the `<div>` container,  the `grid` class as shown in the code above. This grid class controls the display type of this element.
In Tailwind CSS, responsiveness is achieved by the use of these `{screen:}` prefixes: `sm:` for small screen sizes, `md:` for medium screen sizes, and `lg:` for large screen sizes.

The `grid-col-2` utility that we have used sets the elements to be in two columns. This takes effect on all screen sizes. To change this to only take effect on small screen devices, we use the prefix, `sm:` before the class. The rows are automatically set to match the number of columns. We can also use `sm:grid-rows-5` to achieve the same result as per this example which we have ten elements.

The `md:grid-cols-3` utility sets the elements into three columns in medium screen devices by the use of `md:` before the grid class meaning medium screens. This class sets the elements into three columns and four rows.

The `lg:grid-cols-4` utility sets the elements into four columns in large screen devices only by the use of `lg:` before the grid class. This class sets the elements into three rows and four columns.

### Grid row-span and column-span classes
In Tailwind, the `col-span` class is used to specify the number of columns a cell should span. The `row-span-{n}` class is used to specify the number of rows that a cell should span. We set the number of rows or columns that a cell should span by adding a number in front of the class.

For example, if we want a cell to span two rows, then we use `row-span-2`, and if we wanted a column span of two, then we use `col-span-2`. As shown below:

```html
<div class="grid grid-cols-3 gap-4 p-5">
    <div class="shadow-lg bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg row-span-2">1</div>
    <div class="shadow-lg bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">2</div>
    <div class="shadow-lg bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg row-span-2">3</div>
    <div class="shadow-lg bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg">4</div>
    <div class="shadow-lg bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg col-span-3">5</div>
</div>
```

![Row and Column Span](/engineering-education/using-tailwind-grid-classes/row-and-column-span.png)


### Grid gap classes
The gap classes are used to add space between rows and columns. The gap classes include: `gap-{size}`, `gap-x-{size}` and `gap-y-{size}`. 
As for our case, we have used `gap-4`. This class adds space evenly between rows and columns. If you wanted a different spacing between rows and columns, then you can use `gap-x-{size}` for space between columns and `gap-y-{size}` for space between rows. 

#### Usage
```html
<div class="grid grid-cols-2 gap-x-4 gap-y-2">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### Gap responsiveness
In Tailwind, we can control the gap at specific screen sizes, add a `{screen}:` prefix to any existing gap class. For example, use `md:gap-4` to apply the `gap-4` utility at only medium screen sizes and `lg:gap-6` for large screen sizes only. As shown below:

#### Usage
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 p-5">
    <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-14 rounded-lg">1</div>
    <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-14 rounded-lg">2</div>
    <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-14 rounded-lg">3</div>
    <div class="bg-green-100 text-green-500 text-lg font-bold text-center p-14 rounded-lg">4</div>
</div>
```

![Gap in Small Screen](/engineering-education/using-tailwind-grid-classes/gap-sm.png)

![Gap in Medium Screen](/engineering-education/using-tailwind-grid-classes/gap-md.png)

![Gap in Large Screen](/engineering-education/using-tailwind-grid-classes/gap-lg.png)

### Conclusion
In this tutorial, we have gone through several Tailwind CSS grid classes and how to implement them in a web page comprehensively. You can now create more and even better designs using Talwind grid layout classes on your own. Hope this tutorial was helpful.

Happy coding!