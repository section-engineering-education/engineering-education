### Introduction

When developing web designs, one of the most important things to put attention to is user interactivity. A good example of these things is by use of modal dialogs. 

A modal is a popup window that appears on top of the main content of a webpage requiring user interaction. A modal dialog appears on the top of the main content and forces the user to interact with it before continuing with their work. Modal dialogs are useful helpful because they give critical warnings to the user as a way of preventing errors.

Throughout this tutorial, we will be using Tailwind to style up our modal dialog. We also use JavaScript to add functionality to the modal dialog.

The modal dialog will look like this when fully created:

![Modal Dialog](modal-dialog.png)

### Prerequisites

1. Latest version of Tailwind CSS installed
2. Knowledge of Tailwind CSS
3. Knowledge of JavaScript functions

### Adding Tailwind CSS to your project

I assume that you already have Tailwind installed. But if not, then visit this [article](/engineering-education/introduction-to-tailwind-css/) for the full Tailwind installation process.

Let's get started!

### Building a Button to open the modal dialog

Add the following code and make sure to correctly link your Tailwind stylesheet.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./public/tailwind.css">
</head>
```

Next, we will add a `div` tag and some styling to it.

```html
<div class="w-80 mx-auto mt-5 p-7">
```

This `div` tag contains the `button` that when clicked, opens the modal dialog. In the `div` tag we have added classes:

- `w-80` specifies a width of 320px.
- `mx-auto` centers the `div` items in the screen.
- `mt-5` sets the top margin to 20px.
- `p-7` sets a padding of 28px 

Now, let us add a `p` tag and a `button` that opens the modal dialog when clicked.

```html
   <p class="text-2xl font-medium text-gray-800">Click here to open to the modal</p>
    <button class="bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300" id="open-btn">Open Modal</button>
```

The code above has created some words and a button that opens the modal dialog. 

We have styled up our `p` tag with the following classes:

- `text-2xl`, `font-medium` and `text-gray-800` which makes the text in the tag to have a font size of 24px, font weight of 500 and gray font color respectively.

We have also added classes to our `button`:

- `bg-green-500`, `text-white`, `text-base` and `font-medium` which changes the background color of the button to green, the font color to white, the font size to 16px and the font weight to 500 respectively.
- `px-8` and `py-2` will add a padding of 32px to the x-axis and 8px to the y-axis respectively.
- `hover:bg-green-600` adds a hover effect on the button by changing the background color to green.
- `focus:outline-none` removes the outline border when the button is clicked.
- `focus:ring-2` creates an outline ring to the button.
- `focus:ring-green-300` creates a green outline ring.

We have also added a unique identifier (ID), `open-btn` to the button. Its purpose is to identify the element when scripting.

### Adding an overlay effect

```html
<!--Overlay Effect-->
<div class="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
```

We have added classes to the `div` tag to make an overlay effect that will appear when the Open Modal button is clicked:

- `fixed` will make the overlay effect stay in place when it appears.
- `hidden` hides the effect by default.
- `inset-0` this makes the overlay effect fill the entire screen
- `h-full` and `w-full` will set the height and width to 100% of its container.
- `bg-opacity-50` the background will be 50% transparent.
- `overflow-y-auto` this is to add scroll bars on the y-axis if the content overflows the bounds.
 
 We have also added a unique identifier (ID), `my-modal` to the modal. Its purpose is to identify the element when scripting.

 ### Creating the modal dialog

 ```html
<!--Modal Content-->
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
            </div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Successfull!</h3>
                <div class="mt-2 px-7 py-3">
                    <p class="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam unde amet magni perferendis vel, dolorem natus quas, pariatur odit excepturi optio ipsam est, dolorum consectetur quos saepe quis totam assumenda.
                    </p>
                </div>
                <div class="items-center px-4 py-3">
                    <button id="close-btn" class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">Close</button>
                </div>
            </div>
        </div>
    </div>
 ```

We will create the parent `div` into which all the child `div` components will be contained. 

```html
<!--Modal Content-->
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
```
We have used the following classes:
- `relative` positions the modal according to the normal flow of the items in the webpage.
- `top-20` positions the modal dialog 80px away from the top edge of the screen.
- `mx-auto` centers the modal box to the center of the screen.
- `p-5` adds a padding of 20px round the `div` items.
- `border` adds a border round the dialog box.
- `w-96` specifies a width of 384px.
- `shadow-lg` adds a shadow of the dialog to make it popup
- `rounded-md` makes the vertices of the dialog rounded.
- `bg-white` makes the background of our modal dialog white.

We then add another child `div` into which the icon, text and button will be placed. 

```html
<div class="mt-3 text-center">
```
We have added the following classes:

- `mt-3` adds a top margin of 12px.
- `text-center` centers the text in the `div`.

We then add another child `div` to which we will add an icon.

```html
<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
```

We have aded the following classes:

- `flex`, `items-center` and `justify-center`
- `rounded-full` makes the `div` a circle.
- `h-12` and `w-12` specifies the height and width to 48px.
- `bg-green-100` makes the background color green.
- `mx-auto` centers icon to the container.

We will then add our SVG icon.
```html
    <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
```

We have added styling classes to it:

- `h-6` and `w-6` specifies a height and width of 24px to the icon.
- `text-green-600` changes the color of the icon to green.

Now, we will add text to the dialog box.

```html
<h3 class="text-lg leading-6 font-medium text-gray-900">Successfull!</h3>
<div class="mt-2 px-7 py-3">
    <p class="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam unde amet magni perferendis vel, dolorem natus quas, pariatur odit excepturi opipsam est, dolorum consectetur quos saepe quis totam assumenda.
    </p>
</div>
```

The `h3` tag has the following classes:

- `text-lg` adds a font size of 18px.
- `leading-6` sets a line height of 24px.
- `font-medium` changes the font weight to 500.
- `text-gray-900` changes the font color of the text to gray.

The `div` tag has the following classes:

- `mt-2` adds a top margin of 8px.
- `px-7` and `py-3`adds a padding of 28px and 12px in the x-axis and y-axis respectively.

We will now add the close button.

```html
<div class="items-center px-4 py-3">
    <button id="close-btn" class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">Close</button>
</div>
```

We have added some classes to the `div` tag. 
- `px-4` and `py-3` adds a padding of 16px to the x-axis and of 8px to the y-axis.
- `items-center` centers the button to the container.

We have also added the following classes to the button:

- `bg-green-500`, `text-white`, `text-base` and `font-medium` which changes the background color of the button to green, the font color to white, the font size to 16px and the font weight to 500 respectively.
- `px-8` and `py-2` will add a padding of 32px to the x-axis and 8px to the y-axis respectively.
- `rounded-md`
- `shadow-sm`
- `w-full`
- `hover:bg-green-600` adds a hover effect on the button by changing the background color to green.
- `focus:outline-none` removes the outline border when the button is clicked.
- `focus:ring-2` creates an outline ring to the button.
- `focus:ring-green-300` creates a green outline ring.

We have also added a unique identifier (ID), `close-btn` to the button. Its purpose is to identify the element when scripting.

Well done! We are done designing our modal dialog!

 ### Adding Functionality to our modal dialog

 We will add functionality to the buttons we have created using simple JavaScript.

We will grab all the elements that we want to add functionality to, like this:

```JavaScript
    // Get the modal
    var modal = document.getElementById("my-modal");

    // Get the button that opens the modal
    var btn = document.getElementById("open-btn");

    // Get the button that closes the modal
    var button = document.getElementById("close-btn")
```

We will then add functionality to the open and close buttons. This will enable us to open and close the modal dialog, like this:

```JavaScript
    // When the user clicks on the Open modal button, the modal opens
    btn.onclick = function() {
    modal.style.display = "block";
    }
    // When the user clicks on close, the modal closes
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