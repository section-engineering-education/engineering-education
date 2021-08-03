---
layout: engineering-education
status: publish
published: true
url: /practical-approach-to-date-and-time-in-javascript/
title: Practical Approach to Date and Time in JavaScript
description: This article will highlight some inbuilt methods in JavaScript that can help us make use of the `Date` object. The reader will learn how to calculate the number of days between two dates, iterate through dates, and how to build a simple countdown timer.
author: samuel-mwangi
date: 2021-08-03T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/practical-approach-to-date-and-time-in-javascript/hero.png
   alt: Date and Time in JavaScript Image
---
JavaScript has an inbuilt `Date` object that can be used for various applications. There are also some inbuilt methods in JavaScript that can help us make use of the `Date` object.
<!--more-->
Date and time are crucial parts of our day-to-day lives. Knowing how to work with them is very important when developing applications or software.

### Prerequisites
To follow this tutorial smoothly, we will need:
- Fundamental knowledge in JavaScript and HTML
- A text editor of your choice
- A browser
 
### 1. Getting the day of the week from a date
In JavaScript, the inbuilt method `new Date()` is used to get the current date by default. There is also the `getDay()` that is used for checking the day of the week. 

It returns the results as an integer ranging between `0 - 6` whereby 0 is Sunday and the rest of the days follow respectively up to 6 for Saturday. 

We will use the two methods above combined with a `switch statement` to get the day from today's date.
```HTML
 <!DOCTYPE  html>
<html  lang="en">
<head>
<title>Document</title>
</head>

<body>
<script>

var  d = new  Date();
var  today = "";

switch(d.getDay()){
	case  0:
		today = "Sunday"
		break;

	case  1:
		today = "Monday"
		break;

	case  2:
		today = "Tuesday"
		break;

	case  3:
		today = "Wednesday"
		break;

	case  4:
		today = "Thursday"
		break;

	case  5:
		today = "Friday"
		break;

	case  6:
		today = "Saturday"
		break;

	}

	document.writeln("Today is " + today)

</script>
</body>
</html>
```

### 2. Calculating the number of days between two dates
In this task, we'll start by initializing the two dates to be used. Next, we subtract the time difference between the two dates which will be in milliseconds, and finally, we convert the milliseconds into days.

```HTML
<!DOCTYPE  html>
<html  lang="en">
<head>
<title>Document</title>
</head>
<body>
<script>

var  Today = new  Date("7/29/2021");
var  Target = new  Date("11/21/2050");

// Tym diff
var  Diff_in_tym = Target.getTime() - Today.getTime();
// No of days btwn
var  Diff_in_days = Diff_in_tym / (1000 * 3600 * 24);

document.writeln(Diff_in_days);

</script>
</body>
</html>
```

In case we want to use the current day like today, we would be required to do some changes in terms of `Today's` formatting.

```HTML
<!DOCTYPE  html>
<html  lang="en">
<head>
<title>Document</title>
</head>
<body>

<script>
var  Today = new  Date();
var  Target = new  Date("11/21/2050");

var  dd = String(Today.getDate()).padStart(2, '0'); // padString() is used to pad strings in js
var  mm = String(Today.getMonth()+1).padStart(2, '0') // until it reaches the provided length
var  yyy= Today.getFullYear();
Today = new  Date(mm + '/' + dd + '/' + yyy);

// Tym diff
var  Diff_in_tym = Target.getTime() - Today.getTime();
// No of days btwn
var  Diff_in_days = Diff_in_tym / (1000 * 3600 * 24);

document.writeln(Diff_in_days);

</script>
</body>
</html>
```

> **Note:** If the target date happens to be less than the current date, the results will be negative. At the time of writing this, `Target ` is still a future date.

### 3. Calculating the number of workdays between two dates (excluding weekends)
In this task, we will iterate from one date to another, counting the number of weekends until we get to the given date. Next, we will get the number of days between the two dates and then subtract the number of weekends from the number of days between the two dates.

```HTML
 <!DOCTYPE  html>
<html  lang="en">
<head>
<title>Document</title>
</head>
<body>
<script>

var  weekends =0;
var  workdays = 0;

var  Today = new  Date();
var  Target = new  Date("11/21/2050");
  
var  dd = String(Today.getDate()).padStart(2, '0'); // padString() is used to pad strings in js
var  mm = String(Today.getMonth()+1).padStart(2, '0') // until it reaches the provided length
var  yyy= Today.getFullYear();
Today = new  Date(mm + '/' + dd + '/' + yyy);

// Tym diff
var  Diff_in_tym = Target.getTime() - Today.getTime();
// No of days btwn
var  Diff_in_days = Diff_in_tym / (1000 * 3600 * 24);

// Iterate through dates
for (var  d = new  Date(); d<= Target; d.setDate(d.getDate()+ 1)){
	if(d.getDay() == 0 || d.getDay() == 6) // 0 for sunday & 6 for saturday

	weekends = weekends + 1;
}
workdays = Diff_in_days - weekends;

document.writeln(workdays);

</script>
</body>
</html>
```

### 4. Building a simple countdown timer
In this task we will use the `setInterval()` method to repeat our time update function at every given interval, in this case, it shall be one second.

This method will continue calling our function until we close the window or the `clearInterval()` method is called, in this case, we shall call it when the countdown timer gets to zero. 

We will also use the `floor()` method to return rounded-up numbers for the days, hours, minutes, and seconds after we get the difference in time.

```HTML
<!DOCTYPE  html>
<html  lang="en">
<head>
<title>Document</title>
</head>
<body>

<p  id="countdown_Timer">
</p>
<script>
	// updating our timer per second
	
	var  time = setInterval(function(){
	// current time
	var  now = new  Date().getTime();
	// The final date's time
	var  target_Date = new  Date("11/21/2050").getTime();
	
	// get the time difference
	var  Diff_in_tym = target_Date - now;
	
	// breaking down the remaining time into days, hours, minutes & seconds
	var  days = Math.floor(Diff_in_tym / (1000 * 3600 * 24));
	var  hrs = Math.floor((Diff_in_tym % (1000 * 3600 * 24)) / (1000 * 3600));
	var  min = Math.floor((Diff_in_tym % (1000 * 3600 )) / (1000 * 60));
	var  sec = Math.floor((Diff_in_tym % (1000 * 60)) / 1000);

	// Displaying the timer
	document.getElementById("countdown_Timer").innerHTML = days + " Days " + hrs + " Hrs " + min + " min " + sec + " sec ";

	if(Diff_in_tym < 0 ){
		clearInterval(time);
		document.getElementById("countdown_Timer").innerHTML = "Time Out";
	}
	}, 1000);
</script>
</body>
</html>
```

### Conclusion 
In this tutorial you have learned the following: 
- How to check what day it is from a date.
- How to calculate the number of days between two dates.
- Calculating the number of workdays between two dates.
- Iterating through dates.
- How to build a simple countdown timer.

You can go ahead and try the tasks above on your own now or even customize them. You can copy the snippets and paste them into a file you name with a `.html` extension.
  
Run the code by opening the file in a browser. If you are using VScode, install a live server extension to make the task easier.

Have fun coding!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
