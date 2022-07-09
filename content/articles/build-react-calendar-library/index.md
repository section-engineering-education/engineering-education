---
layout: engineering-education
status: publish
published: true
url: /build-react-calendar-library/
title:  Build a Calendar in React Using React-Calendar Library
description: In this article, you'll learn how to utilize [react-calendar](https://www.npmjs.com/package/react-calendar) to handle and modify dates in [React](https://reactjs.org/tutorial/tutorial.html). 
author: emmanuel-alege
date: 2022-03-16T00:00:00-02:11
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-react-calendar-library/hero.jpg
    alt: React Calendar Hero Image
---
Often, you want to manage and manipulate dates in your web app. These may include adding events or setting reminders. Having a calendar in your web application is a way to implement this. 
<!--more-->
In this article, you'll learn how to utilize [react-calendar](https://www.npmjs.com/package/react-calendar) to handle and modify dates in [React](https://reactjs.org/tutorial/tutorial.html).

### Table of Contents
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [What is react-calendar?](#what-is-react-calendar)
- [Installation](#installation)
- [Creating a new React project](#creating-a-new-react-project)
- [Integrate React-calendar library into your project](#integrate-react-calendar-library-into-your-project)
- [Add calendar to our project using react-calendar](#add-calendar-to-our-project-using-react-calendar)
- [Add style to your calendar](#add-style-to-your-calendar)
- [Add custom styling to your calendar](#add-custom-styling-to-your-calendar)
- [Select date range](#select-date-range)
- [Build booking application with `react-calendar.`](#build-booking-application-with-react-calendar)
- [Create time component](#create-time-component)
- [creating the `Times.js` component](#creating-the-timesjs-component)
- [Conclusion](#conclusion)

### Prerequisites
To follow this tutorial along, you will need the following:
- Basic understanding of [React](https://reactjs.org/tutorial/tutorial.html).
- Basic understanding of the command line(Nodejs 14.5.1 or higher).
- A code editor. We'll be using [VSCode](https://code.visualstudio.com/).

### Goals
In this article, you will learn:
- How to add react-calendar to your React app.
- How to style react-calendar.
- How to customize react-calendar.
- How to enable users to select a date range in react-calendar.
- How to create a date picker.

### What is react-calendar?
[React-calendar](https://www.npmjs.com/package/react-calendar) is an easy-to-use calendar library for React. It provides functionality that helps you to manipulate and manage date and time. 

React-calendar gives end-users the ability to pick a day, month, or even a year.

### Installation
Nodejs 14.5.1 or higher is required for this tutorial. To install, visit Nodejs' official website to [download](https://nodejs.org/en/). It comes with a pre-installed Node Package Manager(NPM).

Check Nodejs version installed. Open your terminal and copy and paste the command below.
```bash
node --version
```

Verify the installation and version of npm using the command below.
```bash
npm --version
```

### Creating a new React project
To begin, you must first create a react development environment.

Type the command below in the built-in terminal of your code editor.
```bash
npm create-react-app calendar-project
```

This may take a few minutes; wait for the installation of the development environment to complete.

Your development environment will set up an application structure that looks like the one below.

![react-application-structure](/engineering-education/build-react-calendar-library/react-application-structure.png)

Next, start your application by running the command below.
```bash
npm start
```

### Integrate React-calendar library into your project
Run the command below to integrate `react-calendar` into your React project.
```bash
npm install react-calendar
```

### Add calendar to our project using react-calendar
In this step, you will add a calendar to your React project. The calendar will enable users to select their date of birth.

Let's follow the steps below to add a calendar to our project:
1. Navigate to `app.js`.
2. Clear the boilerplate.
3. Import calendar component from react-calendar in `App.js`.
4. Copy the code below into your `App.js` file.

Next edit the `src/App.js` file as shown below: 
```javascript
import {useState} from 'react';
import Calendar from 'react-calendar'; 
import './App.css';

function App() {
 const [date, setDate] = useState(new Date())



return (
 <div className="app">
   <h1 className="header">React Calendar</h1>
   <div className="calendar-container">
     <Calendar onChange={setDate} value={date}/>
   </div>
   <div className="text-center">
      Selected date: {date.toDateString()}
   </div>
 </div>
  )

}

export default App;
```

In the code above, we used `useState` to store a date, and we set the current date as its initial value using `Javascript Date object`. We then pass the date as a value to our Calendar component. 

When a user selects a date, the value of the date will be set to the user's selected date. This value is then printed below your calendar.

Your application should look like the one below.

![react-application-structure](/engineering-education/build-react-calendar-library/react-calendar-default.png)

### Add style to your calendar
You can improve the calendar appearance by importing the react-calendar default stylesheet.

Add the line stylesheet to `App.js` as shown below:
```javascript
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'

```

### Add custom styling to your calendar
You may want your calendar to be consistent with a particular design. 

This can be accomplished by following the steps below.
1. Navigate to `node_modules/react-calendar/dist`.
2. Copy the code in the stylesheet into `App.css`.
3. Remove import `'react-calendar/dist/Calendar.css'` from `App.js.`
4. You can now edit the code according to your taste.

In this tutorial, we have changed the default styling by implementing the custom styling in this [link](https://gist.github.com/codeInn001/b479eaab3e612a1edc4448451379a0ed).

The final customized calendar now looks as shown below:

![react-application-structure](/engineering-education/build-react-calendar-library/customized-react-calendar.png)

### Select date range
React-calendar has the date range feature. This gives users the ability to select a custom date range. 

Then, after that, you can give some data that falls within the user's preferred date range.

Paste the following code into your `App.js` file:
```javascript
import { useState } from 'react';
import Calendar from 'react-calendar';
import './App.css';

function App() {
 const [date, setDate] = useState(new Date());

 return (
 <div className='app'>
   <h1>React Calendar with Range</h1>
   <div>
     <Calendar onChange={setDate} value={date} selectRange={true}/>
   </div>
   {date.length > 0 ? (
   <p>
     <span>Start:</span>{' '} {date[0].toDateString()}
     &nbsp; to &nbsp;
     <span>End:</span> {date[1].toDateString()}
   </p>
        ) : (
   <p>
     <span>Default selected date:</span>{' '} {date.toDateString()}
   </p>
        )}
 </div>
  );
}

export default App;

```

We passed a `selectRange` prop into our `Calendar` component in the above script. `selectRange` has a default value of `false`. We changed this value to `true`. This enables the user to select a date range. 

When a user chooses a date range to work with, `react-calendar` highlights the range.

Next, `react-calendar` returns an array containing two elements as our state. The two elements indicate the start date and the end date. We can then print the start date and end date in the array.

### Build booking application with `react-calendar.`
You can integrate other features with `react-calendar` to build an application with a complex feature.

We will demonstrate this by building a booking app. In the booking app, users can click on a date. 

After clicking on the desired date, the application will display the available time slot. Users can then select a time slot. 

Finally, after choosing a time slot, the date and time of the appointment will be displayed on the screen.

Copy the code below into your `app.js` file.
```javascript
import {useState} from 'react';
import Calendar from 'react-calendar';
import './App.css';
import Time from './Time.js'

function App() {
 
const [date, setDate] = useState(new Date());
const [showTime, setShowTime] = useState(false) 

 return (
 <div className='app'>
   <h1 className='header'>React Calendar</h1>
   <div>
    <Calendar onChange={setDate} value={date} onClickDay={() => setShowTime(true)}/>
   </div>

   {date.length > 0 ? (
   <p>
     <span>Start:</span>
     {date[0].toDateString()}
     &nbsp;
     &nbsp;
     <span>End:</span>{date[1].toDateString()}
   </p>
          ) : (
   <p>
      <span>Default selected date:</span>{date.toDateString()}
   </p> 
          )
   }
   <Time showTime={showTime} date={date}/>

 </div>
  )
}

export default App;

```

In the code above, we used `useState` to store the initial value of `showTime` as false.

The `Calendar` component has a default `onClickDay` prop. This listens to the user click event. We passed in `setShowTime` into `onClickDay` prop. This sets `showTime` new value to true when any day in the calendar is clicked. 

The `Time` component displays the time slot when the value of `showTime` changes to true. We passed `showTime` and `date` as props in `Time` component.

### Create time component
Create a `Time.js` component. This will display the elements in the `Times.js` component.

Copy the code below into your `Time.js` file.
```javascript
import {useState} from 'react';
import Calendar from 'react-calendar';
import './App.css';
import Times from './Times.js'

import React from 'react'

function Time(props) {
 
 return (
 <div>
  {props.showTime ? <Times date={props.date}/> : null}
 </div>
  )
}

export default Time;

```

When `showTime` is true in the code above, our application displays the `Times.js` component elements. If false, they are not displayed.

### creating the `Times.js` component
This component will contain an array of time slots.

Copy the code below into the `Time.js` component.
```javascript
import React from 'react'
import {useState} from 'react';
import Calendar from 'react-calendar';
import './App.css';

const time = ['08:00','09:00','10:00','14:00','15:00']

function Times(props) {

 const [event, setEvent] = useState(null)
 const [info, setInfo] = useState(false)

 function displayInfo(e) {
   setInfo(true);
   setEvent(e.target.innerText);
}

return (
 
 <div className="times">
   {time.map(times => {
    return (
    <div>
      <button onClick={(e)=> displayInfo(e)}> {times} </button>
    </div>
        )
     })}
    <div>
      {info ? `Your appointment is set to ${event} ${props.date.toDateString()}` : null}
    </div>
 </div>
  )
}

export default Times;

```

The code above has an array of time slots called `time`. We map through the array to display each time slot as a button element. 

Also, the button element has an `onClick` event handler. Finally, it contains a `dislayInfo` function that triggers when a user clicks any buttons.

The `displayInfo()` function contains two `useState`. When `displayInfo` triggers, the value of info changes to true, and the value of event changes to the innerText of the button element.

We passed in date as a prop from  `App.js` to `Time.js` finally to `Times.js`.

When the value of `info` changes to true, the app displays the time slot and date selected by the user.

Our final application will look like the image below.

![react-application-structure](/engineering-education/build-react-calendar-library/booking-app-demo.png)

### Conclusion
We went over how to integrate the `react-calendar` package into our react app, customize it, set a date range, and add a booking feature.

You can now use this knowledge to build a more dynamic and powerful calendar in react.

You can head to the [official documentation](https://github.com/wojtekmaj/react-calendar) to explore more functionalities.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)