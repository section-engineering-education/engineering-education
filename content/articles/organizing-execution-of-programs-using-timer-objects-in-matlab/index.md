---
layout: engineering-education
status: publish
published: true
url: /organizing-execution-of-programs-using-timer-object-in-matlab/
title: Scheduling Program Execution using Timer objects in Matlab
description: This article will discuss how to implement Timer objects in Matlab. These objects allow one to schedule various activities or tasks.
author: vitalis-odhiambo
date: 2021-11-05T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/hero.jpg
    alt: Programs Execution using Timer Objects in Matlab Hero Image
---
A timer is an automated mechanism for activating a device or a process at a predetermined time or interval. Matlab provides Timer objects that can be used to execute different commands.
<!--more-->
In this article, we will discuss how one can create a Timer object, start it, and specify processes that should be performed until the time ends. 

We will also learn how to stop and delete the Timer objects from the memory. 

Timer helps in keeping track of a program. It's therefore crucial during troubleshooting. 

Timers can also be used in the real-time execution of tasks, as well as building reminders.

### Prerequisites
For this tutorial, you'll need to have:
- [Matlab](https://www.mathworks.com/login?uri=%2Fdownloads%2Fweb_downloads) installed.
- Some basic understanding of [Matlab](/engineering-education/getting-started-with-matlab/).
  
### Table of contents
- [Objective](#objective)
- [Creating Timer object](#creating-timer-object)
- [Displaying message using a Timer object](#displaying-message-using-timer-object)
- [Finding Timer objects properties](#finding-timer-objects-properties)
- [Timer properties](#timer-properties)
- [Finding all visible Timer objects in the memory](#finding-all-visible-timer-object-in-the-memory)
- [Specifying Timer object starting time](#specifying-timer-object-starting-time)
- [Deleting all existing Timer objects in the memory](#deleting-all-existing-timer-objects-in-the-memory)
- [Conclusion](#conclusion)

### Objective
In this tutorial, we are going to discuss timer objects and their functions in Matlab.

### Creating Timer object
This is the process of making a Timer object which will be used in executing commands.

Timer objects can support various properties. A Timer is created using the `timer` function.

```matlab
t = timer %creating timer object
```

![Creating timer object](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_one.PNG)

### Displaying message using Timer objects
To display messages, we first create the Timer tool then add the text that should be displayed in the timer properties.

Here, we will create a timer object to display the message "Hello everyone!" after `5` seconds:

```matlab
t = timer('Timerfcn','stat=false;disp(''Hello everyone!'')','StartDelay',5);
start(t) %starts the timer
stat=true;
while(stat==true)
end
```

![Displaying message after time delay](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_two.PNG)

The above code can also be used in creating a time delay before displaying the final intended message.

For example, we will create a timer object to display a warning message 3 times at an interval of 1 second before displaying the final message "STOP!":

```matlab
t = timer('Timerfcn','stat=false;disp(''STOP!'')','StartDelay',3) %
start(t) %starts the timer
stat=timer;
while(stat==true)%timer object condition
disp('WARNING') %delay massege
pause(1) %delay interval period
end
```

![Displaying multiple messages at time intervals](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_three.PNG)

### Finding Timer object properties
Timer object properties give information about the states and control aspects.

To retrieve the timer properties, we use the `get` function, as shown below:

```matlab
t = timer; %creating timer
set(t,'ExecutionMode','fixedRate','BusyMode','drop','period',1); %Assigns values of timer object properties
t.TimerFcn = 'disp(''loading...'')' %TimerFcn callback function
start(t) % starts the timer

stop(t) % stops the timer
get(t) % finding timer properties
delete(t) % deleting the timer object
```

![Timer properties](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_four.PNG)

It is advisable to delete the timer objects after use to save up the memory.

We use the `delete(t)` method to delete the timer object. When these objects are not deleted, they cause errors when executing other functions.

The `set(t)` method shows all the timer object properties that can be assigned values.

```matlab
t = timer; %creating a timer
set(t) %for viewing list of settable timer properties
```

![Settable timer properties](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_five.PNG)

### Timer properties
Timer object properties are classified into four major groups namely:
- Callback function properties.
- Timing properties.
- Labeling properties.
- Read-only properties.

#### Callback function properties
Callback properties are identified by the `Fcn` function. They can be specified as `vectors`, `string scalar`, `function handle`, or `cell arrays`.

The following are callback function properties:

- `TimerFcn` - This callback function must be defined before starting the timer. It executes events depending on how it is defined; whether as vectors, string scalar, function handle, or cell arrays.

- `StartFcn` - This function is used for starting the callback function.

- `StopFcn` - This function stops the timer callback function. It is also known as the timer stop method.

- `ErrorFcn` - This is the time error callback function. If there is an error in the code for the program, the function is executed, and then `errorfcn` calls for `StopFcn`.

#### Timing properties
Timing properties are mostly defined by a numeric scalar. They include the following functions:

- `Period` - This is the specified delay time between the execution of programs. The delay time is usually in seconds.

- `StartDelay` - This is the delay period between the start of the timer and the execution of the first program.

- `TaskToExecute` - This function specifies the number of times a program is executed and is usually set in numeric numbers.

- `BusyMode` - This function is used to specify the actions that the timer is supposed to execute before completion of the previous timer method. When the timer object is running, the `BusyMode` becomes read-only meaning it can not be edited.

The following example shows callback function and timing properties code in the same program:

```matlab
t = timer;
set(t,'ExecutionMode','fixedRate','BusyMode','drop','period',1);
t.startfcn = 'disp('' the start function'')'; %startfcn
t.TasksToExecute = 5; %TasksToExecutefcn
t.Timerfcn = 'disp(''Hello everyone'')'; %Timerfcn
t.stopfcn = 'disp(''the stop function'')'; %stopfcn
start(t) %starting timer object
```

![Callback and timing function properties](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_six.PNG)

#### Labeling properties
These properties label the timer by providing it with defined characters. They include:

- `Name` - It provides a name for the timer as either a character vector or a string scalar. For example, `t = timer('Name','MyfirstTimer')`.

- `Tag` - It's written as a character vector or a string scalar. For example, `t1 = timer('Tag','TimerTafunction')`.

- `Object visibility` - This function is used to specify the visibility of the timer object as either `on` or `off`.

- `Timerfind` function does not provide information on timer objects whose visibility is turned off but such objects are still valid. For example, `t = timer('ObjectVisibility','off')`.
- `UserData` - This function provides a field for user data and supports any valid Matlab data.

#### Read-only properties
These properties can not be edited. These values depend on the timing and callback function properties value. They include:

- `AveragePeriod` - This is the average time between the execution of commands. It is specified in seconds as a numeral scalar.

- `InstantPeriod` - This is the time between the execution of the last two commands, they are given in seconds as a numerical scalar.

- `Running` - This is an indicator of an active callback function, which can be specified as `on` or `off`.

- `TaskExecuted` - This is the number of times the timer object has been executed. Is given as a numerical number.

- `Type` - indicates the object type, denoted by a character vector.

From the last program, we can view timer properties using `get(t)` and `set(t)` functions.

![Get funtion properties](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_seven.PNG)

![Set function properties](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_eight.PNG)

### Finding all visible Timer objects in the memory
All visible timer object present in the memory can be found using `timerfind` or `timerfindall` functions.

This can be demonstrated by creating three different timer objects namely `a`, `b`, and `c` then finding them using the `timerfindall` function:

```matlab
a = timer;
b = timer;
b = timer;
out = timerfind
```

![Finding timers](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_nine.PNG)

### Specifying timer object starting time
The specified time for starting a timer can be set using the `startat` function. 

The function enables one to predetermine a specific date, hour, minute, and second.

The syntax for `startat` function `(t, specified firing time)`.

The firing time is specified as a Matlab serial time or as a formatted date text string following syntax `startat(t,y,m,d,h,m,s)`.

For example, we write a program to display the message "It has been 5 seconds now" after 5 seconds.

The following code is used:

```matlab
t = timer('TimerFcn','disp(''it has been 5 seconds now)');
ftime = 5/(60^2*24); %5 seconds in serial time
startat(t,now+ftime);
```

![Starting timer using at a specified time](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_ten.PNG)

### Deleting all existing Timer objects in the memory
To delete all the existing timer objects in the memory, we first find all the timers present using the `timerfindall` method.

We then delete the timers using the `delete(timerfindall)`function.

The `delete(name)` function can also be used to delete a single timer object.

### Conclusion
Timer objects help in monitoring programs automatically and executing them at a specific set time. They also ensure that programs do not run for too long.

We can use timers when creating reminder programs, displaying messages, and initializing different processes.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)