---
layout: engineering-education
status: publish
published: true
url: /keyboard-events-in-javascript/
title: Introduction to Keyboard Events in JavaScript
description: In this article we will learn about what keyboard events are, and explore different keyboard events. We will also build a simple game that uses keyboard events.
author: benson-kariuki
date: 2021-03-19T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/keyboard-events-in-javascript/hero.jpg
    alt: Introduction to keyboard events in JavaScript example image
---
Whenever a user presses any key on the Keyboard, different events are fired. There are three keyboard events, namely `keydown`, `keypress`, and `keyup`. Keyboard events belong to the `KeyboardEvent` object. This tutorial will discuss how to implement JavaScript keyboard events.
<!--more-->
One of the most common uses of keyboard events today is computer gaming. Most browser-based games require some form of keyboard input. There are different responses from game objects based on the keyboard event. This tutorial will also demonstrate how keyboard events are used in gaming.

### Table of contents
- [Prerequisites](#prerequisites)
- [JavaScript keyboard events](#javascript-keyboard-events)
- [KeyboardEvent sequence](#keyboardevent-sequence)
- [Handling keyboard events in JavaScript](#handling-keyboard-events-in-javascript)
- [Use of keyboard events in gaming demo](#use-of-keyboard-events-in-gaming-demo)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
This article is suitable for beginner to expert web developers. However, prior knowledge of [HTML](https://www.w3schools.com/html/) and [JavaScript](https://www.w3schools.com/js/) is required.

### JavaScript keyboard events
There are three different keyboard events in JavaScript:
1. `keydown`: Keydown happens when the key is pressed down, and auto repeats if the key is pressed down for long.
2. `keypress`: This event is fired when an alphabetic, numeric, or punctuation key is pressed down.
3. `keyup`: Keyup happens when the key is released.

Some browsers no longer support `keypress` event. Refer to the [Mozilla documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event#browser_compatibility) for `keypress` event browser compatibility details.

To record a `keydown` event in JavaScript, use the code below:

```JavaScript
// Add event listener on keydown
document.addEventListener('keydown', (event) => {
  var name = event.key;
  var code = event.code;
  // Alert the key name and key code on keydown
  alert(`Key pressed ${name} \r\n Key code value: ${code}`);
}, false);
```

To record a `keypress` event in JavaScript, use the code below:

```JavaScript
// Add event listener on keypress
document.addEventListener('keypress', (event) => {
  var name = event.key;
  var code = event.code;
  // Alert the key name and key code on keydown
  alert(`Key pressed ${name} \r\n Key code value: ${code}`);
}, false);
```

To record a `keyup` event in JavaScript, use the code below:

```JavaScript
// Add event listener on keyup
document.addEventListener('keyup', (event) => {
  var name = event.key;
  var code = event.code;
  // Alert the key name and key code on keydown
  alert(`Key pressed ${name} \r\n Key code value: ${code}`);
}, false);
```

In the code snippets above, we are adding the `addEventListener()` method to the document. This attaches the event handler to the window, to listen for the keyboard events.

### KeyboardEvent sequence
`KeyboardEvent` events are fired in the following order:
1. The first event is the `keydown` event. If a key that produces a character key which is held further, then the event is repeated.
2. If the `keypress` event is supported, it is fired next and repeated while the key is pressed down.
3. The last event is the `keyup` event. It is fired when the key is released.

### Handling keyboard events in JavaScript
The `Event` object is the parent of all event objects. Some of the commonly used event objects are `TouchEvent`, `KeyboardEvent`, `InputEvent`, `ClipboardEvent`, `WheelEvent`, and `MouseEvent`. This tutorial will focus on `KeyboardEvent`.

The event object has two properties, `key` and `code`, which allows getting the character and the 'physical key code', respectively. The table below shows the `event.key` and `event.code` for the character `v`.

Key | `event.code` | `event.key`
--- | --- | ---
`V` | `KeyV` | `v` (lowercase)
`Shift+V` | `KeyV` | `V` (uppercase)

The `event.key` value may vary depending on the language, while the `event.code` is always the same. For all the keycode values on a keyboard, refer to the [W3 UI events code specification](https://www.w3.org/TR/uievents-code/).

We will use the JavaScript scripting language to get each key's keycode value. Create an HTML script with your preferred name and add the JavaScript code below. Open the script on a web browser.

```html
<script>
  // Add event listener on keydown
  document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    if (name === 'Control') {
      // Do nothing.
      return;
    }
    if (event.ctrlKey) {
      alert(`Combination of ctrlKey + ${name} \n Key code Value: ${code}`);
    } else {
      alert(`Key pressed ${name} \n Key code Value: ${code}`);
    }
  }, false);
  // Add event listener on keyup
  document.addEventListener('keyup', (event) => {
    var name = event.key;
    if (name === 'Control') {
      alert('Control key released');
    }
  }, false);
</script>
```

The complete source code for the above demo is available on [GitHub here](https://github.com/Tsanguu/Javascript-Keyboard-Events).

The `Control` key is used in combination with other keys. Therefore, we need to note that, when the `Control` key is combined with different keys, we perform different `KeyBoard` events.

The code below creates an alert when any key is pressed down (`keydown` event) except for the `Control` key.

```JavaScript
  if (name === 'Control') {
    // Do nothing.
    return;
  }
```

If the `Control` key is pressed without any combination, the code listens to the keyup event and creates an alert.

```JavaScript
// Add event listener on keyup
document.addEventListener('keyup', (event) => {
  var name = event.key;
  if (name === 'Control') {
    alert('Control key released');
  }
}, false);
```

The screenshots below shows the codes output, when different keys are pressed:

- Control key (`Ctrl`) released output

![JavaScript keyboard events output 2](/engineering-education/keyboard-events-in-javascript/javascript-keyboard-event-2.png)

- Key "r" (`R`) pressed output

![JavaScript keyboard events output 1](/engineering-education/keyboard-events-in-javascript/javascript-keyboard-event-1.png)

- Combination of the control key and key "d" (`Ctrl` + `D`) output

![JavaScript keyboard events output 3](/engineering-education/keyboard-events-in-javascript/javascript-keyboard-event-3.png)

### Use of keyboard events in gaming demo
Keyboard events are used in gaming, whereby a player can control game objects using some predefined keys. We will create a game demo where a player controls a game object using the arrow keys.

#### HTML code
The HTML code creates a SVG with a rectangular shape. 

Draw a rectangle using HTML SVG code below:

```html
  <p>Use the arrow keys to control the square object.</p>
  <svg width="500px" height="500px" class="area">
    <rect id="object1" x="10" y="10" width="20" height="20" fill="black" />
  </svg>
  <script>refreshPosition();</script>
```

#### CSS code
Now, let's style the background color of the SVG using the code below:

```css
  /* Change svg background color. */
  .area {
    background-color: #00FF00;
  }
```

#### JavaScript code
Then, we declare some variables that we will be using in our game, as shown below:

```JavaScript
// Declare and assign variables.
let object1Size = {
  width: 20,
  height: 20
};
let position = {
  x: 10,
  y: 10
};
let moveRate = 10;
let object1 = document.getElementById("object1");
```

Create two functions (`updateYPosition` and `updateXPosition`) for updating the object position.

These functions gives the object's updated position, when given the distance the object is moved along either axis, as an argument.

```JavaScript
// Update y-axis position.
function updateYPosition(distance) {
  position.y = position.y - distance;
// Update y-axis position at the edge.
  if (position.y < 0) {
    position.y = 499;
  } else if (position.y > 499) {
    position.y = 0;
  }
}
// Update x-axis position.
function updateXPosition(distance) {
  position.x = position.x + distance;
  // Update x-axis position at the edge.
  if (position.x < 0) {
    position.x = 499;
  } else if (position.x > 499) {
    position.x = 0;
  }
}
```

The function `updateYPosition()` computes the new position of the object by subtracting the distance moved by the object from the Y-axis position.

The function `updateXPosition()` computes the new position of the object by adding the distance moved by the object from the X-axis position.

The `refreshPosition()` function draws the object to its new position.

```JavaScript
function refreshPosition() {
  let x = position.x - (object1Size.width/2);
  let y = position.y - (object1Size.height/2);
  let transform = "translate(" + x + " " + y + ")";

  object1.setAttribute("transform", transform);
}
```

The `addEventListener()` method is used to attach an event handler to the object. This event handler listens for keydown events. Once the relevant keys are pressed, the `refreshPosition()` method is called to draw the object at its new position.

```JavaScript
window.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return;
  }
  if (event.code === "ArrowDown"){
      // Handle "down"
      updateYPosition(-moveRate);
  } else if (event.code === "ArrowUp"){
      // Handle "up"
      updateYPosition(moveRate);
  } else if (event.code === "ArrowLeft"){
      // Handle "left"
      updateXPosition(-moveRate);
  } else if (event.code === "ArrowRight"){
      // Handle "right"
      updateXPosition(moveRate);
  }
  refreshPosition();
  event.preventDefault();
}, true);
```

The JavaScript code above listens for the key events and calls either `updateXPosition()` or `updateYPosition()` function.

The complete source code for the above demo is available on [Github](https://github.com/Tsanguu/Javascript-Keyboard-Events).

**Output**

![JavaScript keyboard events animation](/engineering-education/keyboard-events-in-javascript/js-keyboard-events-animation.gif)

### Conclusion
JavaScript keyboard events are used in several ways. This article has demonstrated how we can use JavaScript keyboard events in gaming.

To summarize:
- We learned about different keyboard events, and what they are.
- We implemented keyboard events to create a simple game.

Happy coding!

### Further reading
- [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [Jquery keyboard events](https://api.jquery.com/category/events/keyboard-events/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)