### ORGANIZING EXECUTION OF PROGRAMS USING TIMER OBJECT IN MATLAB
### Table of content
- ### [Introduction](#introduction)
- ### [Prerequisites](#prerequisites)
- ### [Creating timer object](#Creating-timer-object)
- ### [Dispaying message using timer object](#Dispaying-message-using-timer-object)
- ### [Finding timer objects properties](#Finding-timer-objects-properties)
- ### [Timer properties](#Timer-properties)
- ### [Finding all visible timer object in the memory](#Finding-all-visible-timer-object-in-the-memory)
- ### [Specifying timer object starting time](#Specifying-timer-object-starting-time)
- ### [Deleting all existing timer objects in the memory](#Deleting-all-existing-timer-objects-in-the-memory)
- ### [Conclusion](#conclusion)

### Introduction
A timer is an automated mechanism for activating a device or a process at a predetermined time or time intervals. Matlab provides timer objects that can be used to organize the execution of Matlab commands. 

Timers enables control of an events' sequences at fixed intervals and program running time. In this article I will discuss how one can create a timer object, start the timmer running and specify the processes to be performed when the amount of time specified by the timmer object elapses, stopping and deleting the timer objects from the memory. 

Timer helps in keeping track of a program hence becomes handy when tracing for troubleshooting. Timers can be used in real_time execution of programs, making of reminder programs and areas where execution of programs according to priorities are required.

### prerequsites
For this tutorial, you'll need to have:
- [Matlab](https://www.mathworks.com/login?uri=%2Fdownloads%2Fweb_downloads) installed.
- [Basic](/engineering-education/getting-started-with-matlab/) understanding of Matlab.
### Objectives of the tutorial
- To create timers in Matlab.
- To elaborate on timer properties.
- To demonstrate how to start and stop a timer.
- To demonstrate how to delete timers in Matlab memory.


### Creating timer object
This is the process of making a timer object which will be used in executing the commands. Timer objects can support various properties and functions controlling their behavior. A timer is created using the function `timer`.
```matlab
t = timer %creating timer
```

![creating timer object](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_one.PNG)

### Displaying message using timer objects
Timers can be used to display messages by first creating the timer tool then adding the message to be displayed in the timer properties. I will create a timer object to display the message "Hello everyone!" after a delay time of 5 seconds. the following codes are used in the program.
```matlab
t = timer('Timerfcn','stat=false;disp(''Hello everyone!'')','StartDelay',5);
start(t) %starts the timer
stat=true;
while(stat==true)
end
```

![displaying message after time delay](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_two.PNG)

The above code can also be used in creating a time delay before displaying the final intended message. For example, I will create a timer object to display the message "WARNING" 3 times at an interval of 1 second before displaying the final message "STOP!". The following are the codes for the program.
```matlab
t = timer('Timerfcn','stat=false;disp(''STOP!'')','StartDelay',3) %
start(t) %starts the timer
stat=timer;
while(stat==true)%timer object condition
disp('WARNING') %delay massege
pause(1) %delay interval period
end
```

![dispalaying multiple messages at time intervals](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_three.PNG)

### Finding timer object properties
Timer object properties gives information on the states and control aspects of the timer functions. One can retrive the value of timer properties by using the `get` function; (this will give an ooutput list of all the timer object properties).
```matlab
t = timer; %creating timer
set(t,'ExecutionMode','fixedRate','BusyMode','drop','period',1); %Assigns values of timer object properties
t.TimerFcn = 'disp(''loading...'')' %TimerFcn callback function
start(t) % starts the timer

stop(t) % stops the timer
get(t) % finding timer properties
delete(t) % deleting the timer object
```

![timer properties](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_four.PNG)

It is advisable to always delete the timer objects after use. Deleting of timer object is done using the function `delete(t)`. When timer objects are not deleted, they can cause errors when executing other functions which are not related to the timer.

The list of settable properties of a timer is viewed using the function `set(t)`, this code will show all the time object properties that can be assigned certain values excluding the read-only properties of the timer object.
```matlab
t = timer; %creating a timer
set(t) %for viewing list of settable timer properties
```

![Settable timer properties](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_five.PNG)

### Timer properties
Timer object properties are classified into four major groups namely;
- Callback function properties.
- Timing properties.
- Labelling properties.
- Read-only properties.

### Callback function properties
Callback properties are identified by the `Fcn` function. They can be specified as vectors, string scalar, function handle, or cell arrays. The following are callback function properties;

- `TimerFcn`: This callback function must be defined before starting the timer. It executes events depending on how it is defined; whether as vectors, string scalar, function handle, or cell arrays.

- `StartFcn`: This function is used for starting the callback function.

- `StopFcn`: This function stops the timer callback function. It is also known as the timer stop method.

- `ErrorFcn`: This is the time error callback function. If there is an error in the code for the program, the function is executed, and then `errorfcn` calls for `StopFcn`.

### Timing properties
Timing properties are mostly defined by a numeric scalar. They include the following functions:

- `Period`; This is the specified delay time between execution of programs. The delay time is usually in seconds.

- `StartDelay`; This is the delay period between the start of the timer and the execution of the first program.

- `TaskToExecute`; This function specifies the number of times a program is executed, the function is usually set in whole numeric numbers.

- `BusyMode`; This function is used to specify the actions timer is supposed to execute before completion of the previous timer function. When the timer object is running, the `BusyMode` becomes read-only meaning it can not be edited.

The following example shows callback function properties and timing properties codes in the same program. The syntax for using timer properties are illustrated in the codes below.
```matlab
t = timer;
set(t,'ExecutionMode','fixedRate','BusyMode','drop','period',1);
t.startfcn = 'disp('' the start function'')'; %startfcn
t.TasksToExecute = 5; %TasksToExecutefcn
t.Timerfcn = 'disp(''Hello everyone'')'; %Timerfcn
t.stopfcn = 'disp(''the stop function'')'; %stopfcn
start(t) %starting timer object
```

![Callback and timing function properties illustrations](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_six.PNG)

### Labeling properties
These properties label the timer by giving it defined characters. They include;

- `Name`: Provides a name for the timer as either a character vector or a string scalar. Example of the syntax for name: `t = timer('Name','MyfirstTimer')` 

- `Tag`: written as a character vector or a string scalar. Syntax example is; t1 = timer('Tag','TimerTafunction')
- `Objectvisibility`:This function is used to specify the visibility of timer object as either `on` or `off`. `Timerfind` function does not provide information on timer objects whose visibilty is turned off but such objects are still valid. Example illustrating syntax for the function: `t = timer('ObjectVisibility','off')`.

- `UserData`: This function provides a field for user data and it supports any valid Matlab data.

### Read-only properties
These are properties that can not be edited. These values depend on the timing and callback function properties value. They include;

- AvaragePeriod: This is the average time between the execution of commands. It is specified in seconds as a numeral scalar.

- InstantPeriod: This is the time between the execution of the last two commands, they are given in seconds as a numerical scalar.

- Running: This is an indicator of an active callback function, which can be specified as `on` or `off`.

- TaskExecuted: This is the number of times the timer object has been executed. Is given as a numerical number.

- Type: indicates the object type, is given as a character vector.

From the last program we can view timer properties using `get(t)` and `set(t)` functions.

![Get funtion properties](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_seven.PNG)

![Set function properties](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_eight.PNG)

### Finding all visible timer object in the memory
All visible timer object present in the memory can be found using the function `timerfind` or `timerfindall`. This can be demonstrated by creating three diferent timer objects namely `a,b, and c` then find the using the `timerfindall` function.
```matlab
a = timer;
b = timer;
b = timer;
out = timerfind
```
![Finding timers](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_nine.PNG)

### Specifying timer object starting time
The specified time for starting a timer can be set using the `startat` function. The function makes it possible for one to predetermine the specific date, hour, minute, and second, the timer is supposed to execute a command. The syntax for `startat` function `(t, specified firing time)`. The firing time is specified as a matlab serial time or as a formatted date text string following syntax `startat(t,y,m,d,h,m,s)`. For example, I will write a program to display the message "it has been 5 seconds now" after 5 seconds from the current time. The following codes are used.
```matlab
t = timer('TimerFcn','disp(''it has been 5 seconds now)');
ftime = 5/(60^2*24); %5 seconds in serial time
startat(t,now+ftime);
```
![Starting timer using at a specified time](/engineering-education/organizing-execution-of-programs-using-timer-object-in-matlab/timer_ten.PNG)

### Deleting all existing timer objects in the memory
To delete all the existing timer objects in the memory we must first find all the timers present both visible and invisible using function `timerfindall` then delete using the function `delete(timerfindall)`. It is also possible to delete a single timer object, this is done using the function `delete(name)`.

### Conclusion
Timer objects help in automatically monitoring programs making them executed at a specific set time, this also ensures that the programs do not run for too long. Timers limitations can be subjected to the programmer's hardware, software, operating system, and the current state of matlab for example if matlab is busily processing another task the timer object may not function. The following are areas of application of organizing program execution using timers;

- Making of reminder programs.
- Timely displaying of messages.
- Program execution according to priority.
- Real-time execution of programs.
