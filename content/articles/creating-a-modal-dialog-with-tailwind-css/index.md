### Introduction
When developing web designs, one of the most important things to put attention to is user interactivity. A good example of these things is by use of modal dialogs.

A modal is a popup window that appears on top of the main content of a webpage requiring user interaction. It appears on the top of the main content and forces the user to interact with it before continuing with their work. Modal dialogs are helpful because they give critical warnings to the user as a way of preventing errors.

Throughout this tutorial, we will be using Tailwind to create and style up our modal dialog. We also use JavaScript to add functionality to it.

The modal dialog will look like this when fully created:

![Modal Dialog](modal-dialog.png)

### Prerequisites

1. Latest version of Tailwind CSS installed
2. Knowledge of Tailwind CSS
3. Knowledge of JavaScript functions

#### Adding Tailwind CSS to your project

I assume that you already have Tailwind installed. But if not, then visit this [article](/engineering-education/introduction-to-tailwind-css/) first for the full Tailwind installation process.

Let's get started!

#### Creating a Button that will open the modal dialog

For your HTML, make sure to correctly link your Tailwind CSS stylesheet as shown below:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./public/tailwind.css" />
  </head>
</html>
```

Next, add a `div` container under the `<body>` tag. It will add some content and a button that will open the modal dialog when clicked.

```html
<div class="w-80 mx-auto mt-5 p-7"></div>
```

- `w-80` specifies a width of the content.
- `mx-auto` centers the `div` items on our page.
- `mt-5` sets the top margin to 20px.
- `p-7` sets a padding of 28px

Now, under the `div` add a `<p>` tag for instructions and a button that will be clickable.

```html
<p class="text-2xl font-medium text-gray-800">
  Click here to open to the modal
</p>
<button
  class="bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
  id="open-btn"
>
  Open Modal
</button>
```

We have styled up our `p` tag with the following classes:

- `text-2xl`, `font-medium` and `text-gray-800` which makes the text in the tag to have a font size of 24px, font weight of 500 and gray text color respectively.

The button is also styled as follows

- `bg-green-500`, `text-white`, `text-base` and `font-medium` changes the background color of the button to green, the font color to white, the font size to 16px and the font weight to 500 respectively.
- `px-8` and `py-2` adds a padding of 32px to the x-axis and 8px to the y-axis respectively.
- `hover:bg-green-600` adds a hover effect on the button by changing the background color to green.
- `focus:outline-none` removes the outline border that appears when the button is clicked.
- `focus:ring-2` creates an outline ring to the button.
- `focus:ring-green-300` creates a green outline ring.

We added a unique identifier (ID), `open-btn` to the button. Its purpose is to identify the element when scripting.

#### Adding an overlay effect

In most webpages, when a dialog opens, the background becomes inactive.This means that, the content behind the modal dialog cannot be accessed until the user interacts with the modal dialog. This is called an overlay effect.

We are going to create the effect with just a few lines of code, like shown below:

```html
<!--Overlay Effect-->
<div
  class="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
  id="my-modal"
></div>
```

- `fixed` makes the overlay effect stay in place when it appears.
- `hidden` hides the effect by default.
- `inset-0` makes the overlay effect fill the entire screen
- `h-full` and `w-full` sets the height and width to 100% of its container.
- `bg-opacity-50` changes the background opacity to 50%.
- `overflow-y-auto` adds a scroll bar on the y-axis if the content overflows the bounds.

We added a unique identifier (ID), `my-modal` to the modal. Its purpose is to identify the element when scripting.

#### Creating the modal dialog

In the beginning of this tutorial, we said that modal dialogs give users critical warnings.

For example, if a user wants to delete some content, a window will pop up with a question like " Are you sure you want to delete this?". With it, it comes with choices like **"OK"** or **"CANCEL"**.

In a modal window like that, the user is required to check if they really wish to delete that particular thing. If yes, they click on the **OK** button and **CANCEL** if they are not sure.

In our case here, we are going to create a pop up window similar to the one seen when an account has been successfully registered.

Lets get to it.

We will create a `div` where we will place our modal content. It will act as a container which will contain an icon, text and a button. 

The classes will be as follows:

```html
<!--Modal Content-->
<div
  class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
></div>
```

We have used the following classes to style up our containment `div`:

- `relative` positions the modal according to the normal flow of the items in the webpage.
- `top-20` positions the modal dialog 80px away from the top edge of the screen.
- `mx-auto` centers the modal box to the center of the screen.
- `p-5` adds a padding of 20px round the `div` items.
- `border` adds a border round the dialog box.
- `w-96` specifies a width of 384px.
- `shadow-lg` adds a shadow of the dialog to make it popup
- `rounded-md` makes the vertices of the dialog rounded.
- `bg-white` makes the background of our modal dialog white.

Now, we will add another child `div` into which the icon, text and button will be placed. 

```html
<div class="mt-3 text-center"></div>
```
In the code above, the class:
- `mt-3` adds a top margin of 12px.
- `text-center` centers all the text present.

Now lets add some content so our styling can be applied!

We will create another `<div>` that will add an icon to our pop up window. The code is as follows:

```html
<div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
    <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
</div>
```

The classes will do the following

- `flex`, `items-center`, `justify-center` and `mx-auto` will center the content.
- `rounded-full` makes the `div` a circle.
- `h-12` and `w-12` specifies the height and width of the `div` to 48px.
- `bg-green-100` makes the background color of the `div` green.

For the icon, it is has a height and width of 24px. It also has a green color and background too to make it pop.

This is how it looks like:

Afterwards, we will add some content to it as shown below:

```html
<h3 class="text-lg font-medium text-gray-900">Successfull!</h3>
<div class="mt-2 text-center">
  <p class="text-sm text-gray-500">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam unde amet
    magni perferendis vel, dolorem natus quas, pariatur odit excepturi opipsam
    est, dolorum consectetur quos saepe quis totam assumenda.
  </p>
</div>
```

The `h3` tag has the following classes:

- `text-lg` adds a font size of 18px.
- `font-medium` changes the font weight to 500.
- `text-gray-900` changes the font color of the text to gray.

We have added the `div` tag so that we can align the text as shown below:

- `mt-2` adds a top margin of 8px.
- `text-center` aligns the text to center.

Now, we will add another `div` which will contain the close button as shown:

```html
<div class="items-center px-4 py-3">
  <button
    id="close-btn"
    class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
  >
    Close
  </button>
</div>
```

We have added the following classes to the `div` :

- `px-4` and `py-3` adds a padding of 16px to the x-axis and of 8px to the y-axis.
- `items-center` centers the button to the container.

We will add the following classes to the button:

- `bg-green-500`, `text-white`, `text-base` and `font-medium` changes the background color of the button to green, the font color to white, the font size to 16px and the font weight to 500 respectively.
- `px-8` and `py-2` adds a padding of 32px to the x-axis and 8px to the y-axis respectively.
- `rounded-md` makes the vertices of the button rounded.
- `shadow-sm` adds a small shadow to the button to make it pop a little.
- `w-full` makes the button acquire the width of it container.
- `hover:bg-green-600` adds a hover effect on the button by changing the background color to green.
- `focus:outline-none` removes the outline border when the button is clicked.
- `focus:ring-2` creates an outline ring to the button.
- `focus:ring-green-300` creates a green outline ring.

We will add a unique identifier (ID), `close-btn` to the button. Its purpose is to identify the element when scripting.

Well done! We are done designing our modal dialog!

#### Adding Functionality to our modal dialog

We will add functionality to the buttons we have created using simple JavaScript.

We will grab all the elements that we want to add functionality to, like this:

```JavaScript
    // Gets the modal dialog by its Id
    var modal = document.getElementById("my-modal");

    // Gets the button that opens the modal by its Id
    var btn = document.getElementById("open-btn");

    // Gets the button that closes the modal by its Id
    var button = document.getElementById("close-btn")
```

We will then add functionality to the open and close buttons. This will enable us to open and close the modal dialog, like this:

```JavaScript
    // When the user clicks on the Open modal button, the modal opens
    btn.onclick = function() {
    modal.style.display = "block";
    }
    // When the user clicks on the close button, the modal closes
    button.onclick = function() {
    modal.style.display = "none";
    }
```

We will also add another functionality to our modal dialog. We want the modal dialog to close when the user clicks anywhere outside the modal.

This is how we will do it:

```JavaScript
    // When the user clicks anywhere outside of the modal, the modal closes
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
```

Well done! Our modal dialog is now fully functional!

### Conclusion

In this tutorial, we have gone through creating and styling up our modal dialog with Tailwind CSS. We have also learnt how to use JavaScript functions to make our modal dialog functional. A modal dialog is one of the many examples of the things that can be used to improve user interactivity.

I hope you found this tutorial useful.
