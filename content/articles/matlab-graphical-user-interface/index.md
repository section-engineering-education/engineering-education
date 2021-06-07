---
layout: engineering-education
status: publish
published: true
url: /matlab-graphical-user-interface/
title: Getting Started with Graphical User Interface in Matlab
description: This article will cover the basics of GUI creation using Matlab. We will also build a simple GUI using Matlab, and explore all components that are used for building.
author: linet-achieng
date: 2021-06-06T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/matlab-graphical-user-interface/hero.jpg
    alt: Matlab GUI image example
---
A Graphical User Interface (GUI) is a pictorial interface that allows the user to use an application without understanding the language.
<!--more-->
This is done by providing intuitive controls. The controls are the buttons that the user clicks to obtain a determined output. GUI is an event-driven program. This is because it acquires input at any given time and uses the callback functions to execute the program and give results.

In this article, we will be looking at the components that are used to construct the graphical user interface. We will also look at how to write the callback function of the components that make it possible for them to execute the controls.

Matlab generates the codes for a GUI. This makes it a better tool when designing the GUI for engineering components.

### Prerequisites
1. [Matlab](https://www.mathworks.com/downloads/) must be installed.
2. A proper understanding of [Matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) language.

### Table of content
- [Prerequisites](#prerequisites)
- [How to access the GUI](#how-to-access-the-gui)
- [Example GUI](#example-gui)
- [Conclusion](#conclusion)

### How to access the GUI?
You can access the GUI by typing `guide` in the workspace.

![the choices window for the GUI](/engineering-education/matlab-graphical-user-interface/image1.png)

*Choices window for the GUI*

When Matlab GUI executes this command, a new window opens up. This window gives various GUI templates that the user can use for the design.

In this article, we will use a blank GUI template because it will help us apply the basics of the GUI. On selection of the template, the workspace opens up. This is where we implement our user interface before writing the callback for the components.

The design will be done on the canvas using the aligned components on the left side of the window. The names of each component will not be visible, unless we make it so. 

To make the names visible, we follow the procedure below:
- Click the file folder and select the `preferences`.

![the components and the canvas](/engineering-education/matlab-graphical-user-interface/image2.png)

*The components and the canvas*

- Select the `show names in the component palette`.
- To activate these changes, click on `apply` then `OK`.

![How to enable the name components to be visible](/engineering-education/matlab-graphical-user-interface/image3.png)

*How to enable the name components to be visible*

![Here the components and their names are visible](/engineering-education/matlab-graphical-user-interface/image12.png)

*Here the components and their names are visible*

To add a component to the workspace, you select it and drop it there. The size of the components can be changed by dragging the edges. Changing the position can be done by double-clicking and dragging it.

Let's look at each of the components before using them.
1. `Push Button` – Its function is to call the callback function for the execution of different programs.
2. `Slider` - It is similar to a scroll bar with numerical value. The callback function is called and executed when the user changes the pad position. The pad position can be changed by dragging the pad to the required position or click the forward or backward arrow.
3. `Radio Button` – It has `on` and `off` states. Its state can be changed by clicking on it. When the button contains a solid circle within the hollow circle, then it is `on`. But when the hollow circle is empty, it is `off`. They are grouped and only one can be `on` at a time.
4. `Check Box` – It has the `on` and `off` state. The `on` state is represented by a `tick` inside the box. They are grouped and several checkboxes can be `on` at the same time.
5. `Edit Text` – Is for getting strings as an input from the user. The input can then be modified to numbers using `str2num` or the `str2double` function.
6. `Static Text` – Is to add labels that remain unchanged on the GUI and has no callbacks.
7. `Pop-up Menu` – It is for listing selections. You click on it to view the selections and the callback function is executed depending on the selection.
8. `List box` – It shows a list of selections just as the pop-up menu. In the list box, all the selections are visible throughout unlike the pop-up menu where only the current selection is visible.
9. `Toggle Button` – It functions similarly to the radio button but different appearance in the GUI. It's the appearance that makes the difference. 
10. `Table` – It is used for the addition of a spreadsheet to the GUI. In case of a modification in the input, the callback is executed.
11. `Axes` – Are for the addition of images, charts, and plots to the GUI. They have no callback function.
12. `Panel` – It is for used to group several components and names according to the functionality. It doesn't have a callback function.
13. `Button Group` – It is just like the panel but used to group radio buttons. When we group the radio buttons here. Similar to a panel, we first add the button group before adding the radio buttons.

### Example GUI
We want to create a simple GUI. We first add the required components - Panel, Static text, Axes, Push Button, Slider, and Edit Text. 

Add the components as explained earlier and arrange them as shown below:

![Arrangement of components in our GUI](/engineering-education/matlab-graphical-user-interface/image5.png)

*Arrangement of components in our GUI*

We then modify the components as needed. When you double-click the component that you want to modify, a new window opens up as shown:

![Modification window for components](/engineering-education/matlab-graphical-user-interface/image6.png)

*Modification window for components*

We can also achieve this by clicking the property inspector situated at the top of the window.

We can change the background color, foreground color, font size, font weight, string, and the tag of the components depending on the design structure.

When modifying the string components, ensure that the name is meaningful, which helps identify the callback in the `.m` file.

Modify the GUI and make it similar to the figure below:

![the appearance of new GUI after modification](/engineering-education/matlab-graphical-user-interface/image7.png)

*Appearance of new GUI after modification*

We will change the tag of the `Axes` to `axes`, `slider1` to `Freq`, `edit1` to `Amp`.

> Note that, the tag for the static text and other components which do not have a callback function are not necessary to change.

Save the GUI before running. Upon running the GUI, the `.m` file is automatically generated before the `.fig` file shows up.

![Generated .m file](/engineering-education/matlab-graphical-user-interface/image8.png)

*Generated .m file*

![obtained .fig file](/engineering-education/matlab-graphical-user-interface/image9.png)

*obtained .fig file*

The object is first created and properties are set before the `create function` is called.

The `create function` can also be used in the modification of the components rather than using the property inspector. This is done by initializing the properties. It is complex and requires more understanding of Matlab, so we will not use it in this example.

This how our GUI will function. It takes the current value from the slider as the frequency, gets the user input that computes amplitude. 

When the user clicks the refresh button, it executes the callback functions and draws a sine wave using the obtained data. We will require the callback function for refresh and edit text for error checking. The error checking ensures that the user inputs a number.

We will first look at the callback function for the edit box and this is how we locate its callback function in the `.m file`:
- Select the component.
- Right-click and select the `view callback`.
- Select the `callback` and it will automatically drive you there.

Add the following code after a comment that begins `%str2double`.

```matlab
%str2double(get(hObject,'String')) returns contents of Amp as a double
Amp = str2double(get(hObject,'String'));
if isnan(amp) || ~isreal(amp)
% If the `amp` is not a number(nan) and the input should be a number(real)
% the refresh button should be disabled.

set(hObject,'String','Error: Not a number')
set(handles.ref,'Enable','off')
else
set(handles.ref,'Enable','on')
end
```

We use the `get` function to obtain the user input. Since edit text only accepts a string as input, we convert it using `str2double` function. The input is then error checked and in case of an error, the edit box is set to `Error: Not a number` using the `set` function.

The refresh button is deactivated by executing `set(handles.ref, 'Enable', 'off')`. If it is real, we enable the refresh button by executing `set(handles.ref, 'Enable', 'on')`. Then it invokes the callback.

Below is the callback for the refresh button. Write this code below the comment that begins with `%handles structure`:

> Note that the position of your code in the callback does not hinder the execution of the code since they are comments which are not executed but make the program more understandable.

```Matlab
% handles structure with handles and user data (see GUIDATA)

minFreq = 1;
maxFreq = 10;
% Get parameters from GUI
fs = get(handles.Freq,'Value');
freq = minFreq + fs * (maxFreq - minFreq);
amp = str2double(get(handles.Amp,'String'));
% Calculate data
x = amp * sin(2*pi*freq*t);
% Create time plot in proper axes
plot(handles.axes,t,x)
set(handles.axes,'XMinorTick','on')
grid on
```

In the program above, we give data that helps in the interpretation of the value of the slider, that is, `minFreq` and `maxFreq`. We give the data for the y-axis which helps in plotting the sine waves and it is defined by `t`.

We use all this data to get the matrix for `x` which is then plotted. Since we want the plots to appear on the axes, it is done by executing this code `set(handles. axes, ‘XminorTick’, 'on')`.

We can input various amplitudes and frequencies and see the various plots.

Below is a sample:

![Plots obtained when we run the program](/engineering-education/matlab-graphical-user-interface/image10.png)

*Plots obtained when we run the program*

To ensure that our error check functions properly, we input a letter to see an error message on edit text box, which on refresh turns grey. This means that it does not invoke the callback until the input is changed to a real number. This shows that it is deactivated. 

This is shown in the figure below:

![output incase of NAN input](/engineering-education/matlab-graphical-user-interface/image11.png)

*output incase of NAN input*

### Conclusion
Matlab provides a good environment for creating the GUI. This is because it automatically generates the code for the design of the GUI. The generated code also contain comments that make it easy for the programmer to understand what the code entails and to better organize the callback functions.

This makes the programmer's work easier and saves him/her from the bulky codes. This makes Matlab an efficient tool for creating GUI. The purpose of the GUI is to create an interface to be used by everyone. This makes it an important tool for engineers implementing it in their projects.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
