---
layout: engineering-education
status: publish
published: true
url: /how-to-create-a-carousel-using-react-class-components-and-tailwind-css/
title: How to Create a Carousel using React Class Components and Tailwind CSS
description: In this article, we will create a carousel using React class components and use Tailwind CSS for styling. React is a JavaScript library that is used to create user interfaces.
author: kevin-murimi
date: 2021-11-02T00:00:00-08:03
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-create-a-carousel-using-react-class-components-and-tailwind-css/hero.jpg
    alt: How to Create a Carousel Using React Class Components and Tailwind CSS Hero Image
---
A carousel is a slideshow that cycles through a series of content. This content could be images, text, or videos. Transitioning from one carousel slide to another is made possible by the use of previous and next controls. The transitioning can also be automated through the use of timers.
<!--more-->
In this article, we will create a carousel component using React class components and use Tailwind CSS for styling. React is a JavaScript library that is used to create user interfaces. To learn more about react, go through the [React documentation](https://reactjs.org/docs/getting-started.html).

Tailwind CSS is a CSS framework that uses utility classes to style a webpage. The Tailwind CSS documentation can be found [here](https://tailwindcss.com/docs).

### Goals
- Create a carousel using React class components.
- Style the carousel using Tailwind CSS.
- Implement the carousel auto-play functionality.
- Implement the swipe functionality in mobile devices.

### Prerequisites
To follow along with this tutorial, you will need:
- Basic knowledge of React.
- Intermediate CSS knowledge.
- A code editor, preferably [VS Code](https://code.visualstudio.com/).
- A browser, preferably Chrome.
- [Node.js](https://nodejs.org/) installed on your machine.

### Setting up our project
In a Windows operating system, open **Command Prompt**, and navigate to the location where you want to create your project. Then run the following command:

```bash
npx create-react-app react-tailwind-carousel
```

The command above will create our React project.

Type the following command to navigate to the project directory.

```bash
cd react-tailwind-carousel
```

If you are using VS Code, type the following command in the command prompt, or open your code editor and open the folder containing the project:

```bash
code .
```

Open the integrated terminal and type the following command to open the project on a development server:

```bash
npm run start
```

The command above, by default, starts the project on localhost port 3000. Open the browser and type the following address: [http://localhost:3000](http://localhost:3000). If you see the rotating react logo and some text below it, it means that the project is successfully set up.

The next step is to install Tailwind CSS in our project. The step-by-step guide to doing this can be found [here](https://tailwindcss.com/docs/guides/create-react-app).

### Installing dependencies
The following are the dependencies that we will use in our project:
- react-icons - We will use this package to get the next and previous icons.
- react-easy-swipe - We will use this package to implement the swipe functionality on mobile devices.

Run the following command to install them:

```bash
npm install react-icons react-easy-swipe
```

### Creating the carousel
As all the components are, by default, functional components. Open the `App.js` component and clear everything. Then paste the following code:

```javascript
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return <div className="flex justify-center"></div>;
  }
}
```

The code above shows how we define a class component. This is the root component, and we will import the other components into this component to be rendered to the user.

The div has two styles applied to it. The styles help to center the component horizontally across the webpage.

Next, open the `src` folder and create a folder named **component/**. This is where we will create all the individual components.

In the components folder, create two components:
- CarouselData.js - This component will hold all the carousel's data. It will be an array that contains links to different images that we'll show in the carousel.
- Carousel.js - This component will contain all the carousel's interactive elements, including next and previous buttons, slide indicators, and all the functionalities of the carousel.

### Creating the CarouselData.js component
Open the CarouselData.js file and paste the following code:

```javascript
export const CarouselData = [
  {
    image:
      "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
];
```

The code above is an array of objects that contain links to images that we will show in our carousel.

The source of the images is [Unsplash](https://unsplash.com/).

### Creating the Carousel.js component
Open the Carousel.js component and paste the following code:

```javascript
import React, { Component } from "react";
import { CarouselData } from "./CarouselData";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
    };
  }

  render() {
    return (
      <div className="mt-8">
        <div className="max-w-lg h-72 flex overflow-hidden relative">
          {CarouselData.map((slide, index) => {
            return (
              <img
                src={slide.image}
                alt="This is a carousel slide"
                key={index}
                className={
                  index === this.state.currentSlide
                    ? "block w-full h-auto object-cover"
                    : "hidden"
                }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
```

We start by importing the `CarouselData` component to gain access to images that will display in the carousel.

We then import the left and right arrows from the `react-icons` package.

Lastly, we import the `Swipe` package, which will help us add the swipe functionality in mobile devices.

In the state section, we define the active state as 0. The state will be modified by a function that will increase or decrease it accordingly. This will help us dictate which slide to display.

We give the container div a class of `mt-8` which translates to **margin-top: 2rem**. This moves our carousel away from the top margin. We then create another div that will contain the individual images.

To understand the classes assigned to the div element, kindly refer to the [Tailwind Documentation](https://tailwindcss.com/docs).

Inside this div, we use the JavaScript array `map()` method. Click [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to learn more about how it works.

In this example, the `map()` method takes two arguments: slide - which refers to each individual element in the CarouselData array and index - which refers to the index of each individual element in the array. The method also takes a callback that returns the images with the `src` set to `slide.image`.

We then give the image a class, and in the class, we use conditional rendering to determine which image we will display. This is made possible by the use of a [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

The code:

```javascript
className={index===this.state.currentSlide ? 'block w-full h-auto object-cover' : 'hidden'}
```

Translates to: if the index (which is a parameter in the map() method) is equal to the `currentSlide` state defined in the class, apply the classes `block w-full h-auto object-cover` to the image. Else, apply the `hidden` class to the image. This means that we can only view one image at a time.

Update the `App.js` with the following code to import the **Carousel** component and render it to the browser:

```javascript
import React, { Component } from "react";
import Carousel from "./components/Carousel";

export default class App extends Component {
  render() {
    return (
      <div className="flex justify-center">
        <Carousel />
      </div>
    );
  }
}
```

### Adding the next and previous buttons
On the browser, we can only view one image. We need to add navigation buttons to help us move from one image to the other.

To do this, in the **Carousel.js** component, add the following code inside the div that contains the map method:

```javascript
<AiOutlineLeft className='absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer' />

<AiOutlineRight className='absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer' />
```

We insert two arrows and position them accordingly.

To add the functionality to the arrows, add the `onClick` event listener, which will listen to a click event and navigate to the appropriate slide:

```javascript
<AiOutlineLeft onClick={this.prevSlide} className='absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer' />

<AiOutlineRight onClick={this.nextSlide} className='absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer' />
```

Now we have to create functions that will be called when we click on the buttons. Under the constructor method, add the following lines of code:

```javascript
nextSlide = () => {
  let newSlide =
    this.state.currentSlide === CarouselData.length - 1
      ? 0
      : this.state.currentSlide + 1;
  this.setState({ currentSlide: newSlide });
};

prevSlide = () => {
  let newSlide =
    this.state.currentSlide === 0
      ? CarouselData.length - 1
      : this.state.currentSlide - 1;
  this.setState({ currentSlide: newSlide });
};
```

The `nextSlide` function is called when the user clicks on the next button.

In this function, we start by defining a variable named `newSlide`. We then conditionally assign a value to this variable. If the currentSlide state is equal to the length of the array containing the images, we set the value of `newSlide` to 0. Else, we increment the value of the currentSlide state.

This helps to ensure that we can keep looping through the images. We then use the `setState` method to update the value of the currentSlide. More information about the `setState()` method can be found [here](https://reactjs.org/docs/state-and-lifecycle.html).

The `prevSlide` function is called when the user clicks the previous button. The newSlide variable is conditionally assigned a value depending on the value of the currentSlide state.

Suppose the currentSlide state is equal to 0. In that case, the newSlide variable is assigned the value equivalent to the length of the array containing the images - 1 (which is the last image).

### Implementing the dots/indicators
These are usually located at the bottom of the carousel and are used to show the current slide and the total number of slides. They can also be used to navigate between slides.

To implement the dots, copy the following code in the div that contains the images:

```javascript
<div className="absolute w-full flex justify-center bottom-0">
  {CarouselData.map((element, index) => {
    return (
      <div
        className={
          index === this.state.currentSlide
            ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
            : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
        }
        key={index}
        onClick={() => {
          this.setCurrentSlide(index);
        }}
      ></div>
    );
  })}
</div>
```

The code loops through the array and returns a div for each element. Each div has an `onClick` event listener that calls a `setCurrentSlide` function when clicked and passes the index of the clicked div as an argument.

We assign the classes conditionally to make sure that the active slide's dot is different from the others.

Below the **prevSlide** function, copy the following code:

```javascript
setCurrentSlide = (index) => {
  this.setState({ currentSlide: index });
};
```

The function above receives the index of the clicked div as a parameter and uses it to set the value of the currentSlide state.

Now, go to the browser on [http://localhost:3000/](http://localhost:3000/). You will see that you can switch between different images either by clicking the dots, or the previous and next buttons.

### Implementing slide auto-play and pause on hover
To do this, modify the state section so that it looks like this:

```javascript
this.state = {
  currentSlide: 0,
  paused: false,
};
```

To implement auto-play, we will use the javascript `setInterval()` method and the `componentDidMount()` method. More information about the `setInterval()` method can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/setInterval). More information about the `componentDidMount()` method can be found [here](https://reactjs.org/docs/state-and-lifecycle.html).

```javascript
componentDidMount(){
      setInterval(() => {
        if(this.state.paused === false){
          let newSlide = this.state.currentSlide === CarouselData.length - 1 ? 0 : this.state.currentSlide + 1
          this.setState({currentSlide: newSlide})
        }
      }, 3000)
    }
```

In the code above, the `setInterval()` method is called when the component mounts. It only executes when the paused state is set to false. It uses a conditional statement to assign a value to the newSlide variable, and then sets the currentSlide state to the value assigned to it. It helps determine which image to show.

The `setInterval()` method also takes another parameter, delay, which determines interval at which the code should be executed. In this case, the delay is 3000ms which means that the function executes after every 3 seconds.

To implement pause on hover, we will use the [onMouseEnter](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event) and [onMouseLeave](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event) event listeners. Add the following event listeners to the img tag:

```javascript
onMouseEnter={() => {
    this.setState({paused: true})
}}

onMouseLeave={() => {
    this.setState({paused: false})
}}
```

`onMouseEnter` is fired when you move the cursor into the area containing the image. Once fired, it modifies the paused state to true and pauses the auto-play.

`onMouseLeave` is fired when you move the cursor away from the area containing the image. Once fired, it modifies the paused state to false and resumes the auto-play.

### Implementing the swipe functionality in mobile devices
To do this, we will use the `react-easy-swipe` package that we installed earlier.

Put the `<Swipe></Swipe>` tags around the region where you want to listen for swipe events. In this case, it is around the `map()` method that produces the images:

```javascript
<Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
  {CarouselData.map((slide, index) => {
    return (
      <img
        src={slide.image}
        alt="This is a carousel slide"
        key={index}
        className={
          index === this.state.currentSlide
            ? "block w-full h-auto object-cover"
            : "hidden"
        }
        onMouseEnter={() => {
          this.setState({ paused: true });
        }}
        onMouseLeave={() => {
          this.setState({ paused: false });
        }}
      />
    );
  })}
</Swipe>
```

The Swipe tag takes the `onSwipeLeft` and `onSwipeRight` properties, and calls the appropriate functions.

Now you have a fully functional carousel created using React class components and Tailwind CSS.

### Complete code for the carousel component

```javascript
import React, { Component } from "react";
import { CarouselData } from "./CarouselData";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      paused: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.paused === false) {
        let newSlide =
          this.state.currentSlide === CarouselData.length - 1
            ? 0
            : this.state.currentSlide + 1;
        this.setState({ currentSlide: newSlide });
      }
    }, 3000);
  }

  nextSlide = () => {
    let newSlide =
      this.state.currentSlide === CarouselData.length - 1
        ? 0
        : this.state.currentSlide + 1;
    this.setState({ currentSlide: newSlide });
  };

  prevSlide = () => {
    let newSlide =
      this.state.currentSlide === 0
        ? CarouselData.length - 1
        : this.state.currentSlide - 1;
    this.setState({ currentSlide: newSlide });
  };

  setCurrentSlide = (index) => {
    this.setState({ currentSlide: index });
  };

  render() {
    return (
      <div className="mt-8">
        <div className="max-w-lg h-72 flex overflow-hidden relative">
          <AiOutlineLeft
            onClick={this.prevSlide}
            className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
          />

          <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
            {CarouselData.map((slide, index) => {
              return (
                <img
                  src={slide.image}
                  alt="This is a carousel slide"
                  key={index}
                  className={
                    index === this.state.currentSlide
                      ? "block w-full h-auto object-cover"
                      : "hidden"
                  }
                  onMouseEnter={() => {
                    this.setState({ paused: true });
                  }}
                  onMouseLeave={() => {
                    this.setState({ paused: false });
                  }}
                />
              );
            })}
          </Swipe>

          <div className="absolute w-full flex justify-center bottom-0">
            {CarouselData.map((element, index) => {
              return (
                <div
                  className={
                    index === this.state.currentSlide
                      ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                      : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                  }
                  key={index}
                  onClick={() => {
                    this.setCurrentSlide(index);
                  }}
                ></div>
              );
            })}
          </div>

          <AiOutlineRight
            onClick={this.nextSlide}
            className="absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer"
          />
        </div>
      </div>
    );
  }
}

export default Carousel;
```

### Conclusion
A carousel is an essential part of a website as it helps improve the user experience.

In the example above, we have covered the major parts of the carousel.

However, you can improve it by adding animations and displaying more than one item on larger screens.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
