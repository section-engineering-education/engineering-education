---
layout: engineering-education
status: publish
published: true
url: /how-to-produce-colors-with-rgb-leds/
title: How to Produce Colors With RGB LEDs using Arduino and Matlab Graphical User Interface
description: This tutorial presents a scheme to produce any color using RGB LEDs controlled by the Arduino Uno board. The Arduino Uno board is interfaced with MATLAB.
author: queenter-bruce
date: 2022-03-06T00:00:00-12:05
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-produce-colors-with-rgb-leds/hero.jpg
    alt: RGB LEDs Using Arduino and Matlab Graphical User Interface Hero Image.
---
Arduino is an initiative and user community that designs and manufactures single-board microcontrollers and microcontroller kits. These kits are used for making digital devices using open-source hardware and software.
<!--more-->
A wide range of microprocessors and controllers are used in Arduino board designs. The boards have digital, and analog input/output (I/O) pins connected to breadboards and other circuits.

This tutorial will present a scheme to produce any color using RGB LEDs controlled by the Arduino Uno board. The Arduino Uno board is interfaced with MATLAB. One can learn how to interface Arduino Uno with Matlab and get an idea of how different colors are produced from three primary colors Red, Green, and Blue.

### Prerequisites
To follow along with this tutorial, the reader will need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- A proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).
- An understanding of the [MATLAB graphical user interface](/engineering-education/matlab-graphical-user-interface/).

### Arduino board
The Arduino board is an open-source microcontroller board based on the microchip `ATmega328P ` microcontroller developed by the Arduino company. The different components of this microcontroller are shown in the image below:

![Components](/engineering-education/how-to-produce-colors-with-rgb-leds/rgb-one.png)

- USB connector: It helps the user connect the board to a computer or laptop when programming the controller.
- Power supply: It is used to provide external power to the Arduino board.
- Reset: This button is used to reset the Arduino after use.
- Microcontroller Atmega328: It is the microcontroller. It governs the functionality of the Arduino.
- Digital I/O: They collect data from the Arduino sensors and write them to other components(actuators).
- Serial out(Tx)/in(Rx): It is used to communicate between Arduino and the computer or other connected devices.
- Analog in: Used when reading the analog sensors.

> In the digital input/output, pins 11, 10, 9, 6, 5, 3 have `~` symbols. This is because they are supported by pulse width modulation (PMW). They can give any voltage in the range `0-5V` with the help of PMW. The pins can generate a dc voltage in 256 variations since it is an 8-bit controller `(2^8)`. Arduino produces this voltage variation by varying the duty cycle of a square wave. This is known as PMW.

In an Arduino IDE, the voltages of these PMW pins can be written by `analogwrite(pin, value)`. In Matlab, we use the command `writePMWVoltage(board, pin, value)`.

### Hardware implementation
The circuit diagram to implement the color production is shown below:

![Hardware implementation](/engineering-education/how-to-produce-colors-with-rgb-leds/rgb-two.png)

The image above shows how we connect the Arduino to the breadboard. Instead of using three LEDs, i.e. red, green, and blue, we use a single LED known as common cathode RGB LEDs. 

We also have three resistors to limit the current. The maximum current that our LED can handle is `20mA` per color channel.

### Working principle of the RGB LED
There are two types of RGB LED: common anode and common cathode. As the name suggests, the anode is common for all the color channels for the common anode. 

Likewise, the cathode terminal is common for all the color channels for the common cathode.

![RGB LEDs](/engineering-education/how-to-produce-colors-with-rgb-leds/rgb-three.png)

LEDs are diodes. Since diodes have two parts, P-side and the N-side, separated by a p-n junction, P-side is the anode, and the N-side is the cathode.

For our case, we have used the common cathode. If we want to switch on the red LED, we apply 5 volts to its terminal/channel. It applies to both green and blue. 

When using the common anode type, we ground the terminal of the color that we want to switch on.
When we want to produce a red color, we provide 5 volts to the red terminal. It can be represented as `RGB=[1 0 0]` where 1 represents the maximum voltage, and 0 represents no voltage. It applies to all the colors. 

We have to mix the RGB colors to produce custom colors. A simple combination to produce custom colors is shown below:

![Producing custom colors](/engineering-education/how-to-produce-colors-with-rgb-leds/rgb-four.png)

The image above shows that producing custom colors involves combining the RGB colors. For example, if we want to produce a yellow color, we combine red and green colors. So, we need to switch the red and the green colors simultaneously. It can be represented as `RGB=[1 1 0]` in the program.

At some point, we do not need to provide the full voltage. For example, if we want to produce an orange color, we need the red LED to be brighter and green to be less bright. This can be represented as `RGB=[1 0.4 0]`. 

The red LED receives 5 volts and the green receives 40% of the total voltage. With this variation, we can get any color.

### Arduino interface with Matlab
To interface Arduino with Matlab, you must install the hardware support package for Arduino. We do this in the add-on, but it requires us to first log in to our MathWorks Account. 

To do this:
- Click on the add-on and select `get hardware support package`.
- Once you click that, you get a window that contains all the support packages.
- Filter for `Matlab support package for Arduino software` and install it.

### Matlab implementation
We will create a Graphical User Interface (GUI) to help control the colors of this implementation. For a better understanding, you can go through the article ["Getting started with graphical user interface"](/engineering-education/matlab-graphical-user-interface/). 

The GUI will be as shown below:

![The GUI](/engineering-education/how-to-produce-colors-with-rgb-leds/rgb-five.png)

The function of the various components of the GUI are as follows:
- Board ON: When we press this button, our board is connected to Matlab.
- Choose color: In this button group, select the type of color you want the LED to be producing. You can also produce other colors by entering the values of RGB, as explained earlier.
- Exit: Exits the Arduino board.

To open the GUI in Matlab, execute the `guide` command in the command window. Then, open a blank GUI and add the components to form the interface shown below:

![The designed GUI](/engineering-education/how-to-produce-colors-with-rgb-leds/rgb-six.png)

The property inspector modifies the component's background color, string, and tag. All we need to do is double click the component we want to modify and the property inspector window opens up.

Once the modification of all the components is done, we can save the GUI. It generates the GUI program and the callback functions. 

The callback functions are functions that render the functionality of our GUI. We then write the control command for the callback to achieve color production.

Let's look at the callback functions for each button. Let's begin with the `Board-ON`:

```matlab
a = arduino();
handles.a = a;
handles.ON = 1;

if ~isempty(handles.a)==1
    set(handles.Board_ON, 'BackgroundColor', [0 1 0]);
end
guidata(hObject, handles)
```

We need to declare the board variable `a = Arduino()`. After this, we create a handle `handle.a` for the board variable. 

We also create a handle for the `ON` condition such that when the handle is 1, the board is on. When the handle is 0, the board is off. It's like a linking handle. This handle is `handles.ON`.

Now, let us use an `if` statement to check for the validity of the conditions. We can check if the board is created using `~isempty(handles.a)`. If it is created (equal to 1), we set the button's background color to green [0 1 0]. We then update the handles using `guidata(hObject, handles)`.

Now, let us use an `if` statement to check for the validity of the conditions. Let's check if the board is created using `~isempty(handles.a)`. If it is created (equal to 1), we set the button's background color to green [0 1 0]. We then update the handles using `guidata(hObject, handles)`.

Let us begin with the red buttons:

```matlab
if handles.ON==1
    writePMWVoltage(handles.a, 'D6', 5); %red
    writePMWVoltage(handles.a, 'D5', 0); %green
    writePMWVoltage(handles.a, 'D3', 0); %blue
end
```

This code first checks if the board is enabled. We use the `writePMWVoltage()` function to determine the color to be produced. This function takes the board variable `handle.a`, PIN `D6`, and the voltage to be passed to the pin, i.e. 5v. It is done for all the colors defined by the radio buttons. 

The code for the callback functions and the radio buttons is the same. We only need to change the voltage passing through each color channel to form the defined color. 

The callback codes are as follows:

```matlab
function radiobutton2_Callback(hObject, event data, handles)%Green color
if handles.ON==1
    writePMWVoltage(handles.a, 'D6', 0); %red
    writePMWVoltage(handles.a, 'D5', 5); %green
    writePMWVoltage(handles.a, 'D3', 0); %blue
end

function radiobutton3_Callback(hObject, eventdata, handles) %blue
if handles.ON==1
    writePMWVoltage(handles.a, 'D6', 0); %red
    writePMWVoltage(handles.a, 'D5', 0); %green
    writePMWVoltage(handles.a, 'D3', 5); %blue
end

function radiobutton4_Callback(hObject, eventdata, handles) %white
if handles.ON==1
    writePMWVoltage(handles.a, 'D6', 5); %red
    writePMWVoltage(handles.a, 'D5', 5); %green
    writePMWVoltage(handles.a, 'D3', 5); %blue
end

function radiobutton5_Callback(hObject, eventdata, handles) %magneta
if handles.ON==1
    writePMWVoltage(handles.a, 'D6', 5); %red
    writePMWVoltage(handles.a, 'D5', 0); %green
    writePMWVoltage(handles.a, 'D3', 5); %blue
end

function radiobutton7_Callback(hObject, eventdata, handles) % Cyan
if handles.ON==1
    writePMWVoltage(handles.a, 'D6', 0); %red
    writePMWVoltage(handles.a, 'D5', 5); %green
    writePMWVoltage(handles.a, 'D3', 5); %blue
end

function radiobutton8_Callback(hObject, eventdata, handles) %Yellow
if handles.ON==1
    writePMWVoltage(handles.a, 'D6', 5); %red
    writePMWVoltage(handles.a, 'D5', 5); %green
    writePMWVoltage(handles.a, 'D3', 0); %blue
end

function radiobutton9_Callback(hObject, eventdata, handles) %switch of lights
if handles.ON==1
    writePMWVoltage(handles.a, 'D6', 0); %red
    writePMWVoltage(handles.a, 'D5', 0); %green
    writePMWVoltage(handles.a, 'D3', 0); %blue
end
```

Let us look at the callback function for the exit push button:

```Matlab
clear handles.a;
closereq();
```

`clear handles.a` clears the board variable. When this variable is cleared, Arduino disconnects from Matlab. We then exit the GUI using the `closereq()` function. At some point, we may need to create custom colors. As we have seen before, custom colors are formed from a combination of RGB colors. 

The callback function for the `enter RGB for any color` text field is shown below:

```matlab
rgb = str2num(get(hObject, 'string'));
handles.R = rgb(1);
handles.G = rgb(2);
handles.B = rgb(3);
guidata(hObject, handles)
```

Here, we get the input using the `get()` function. When you enter this value, it is of the string type. Next, we convert this input to a number using the `str2num` function. After this conversion, we extract the RGB values. 

The first value, `RGB(1)`, is assigned to the red channel. The second value is assigned to green, and the third value is for blue. Finally, we updated the handle. To display our custom colors, we need to enter the RGB values and then click `OK`. 

The callback function for the `OK` push button is:

```matlab
if handles.ON == 1
    writePMWVoltage(handles.a, 'D6', handles.R); %red
    writePMWVoltage(handles.a, 'D5', handles.G); %green
    writePMWVoltage(handles.a, 'D3', handles.B); %blue
end
set(handles.text10, 'BackgroundColor', [handles.R handles.G handles.B]);
guidata(hObject, handles)
```

In writing this callback, we check if the board is ON using the `writePMWVoltage()` function. This function takes the board variable, PIN, and the entered input value. 

We then set the `backgroundcolor` of the text field `text10` as the color that our input values produce. It means that the background color of the text field should be the same as that produced by the RGB LED.

Arrange your Arduino and breadboard as shown below:

![Arrangement](/engineering-education/how-to-produce-colors-with-rgb-leds/rgb-seven.png)

Let us run our program to see the output. Select the red radio button and see the output.

![Red color](/engineering-education/how-to-produce-colors-with-rgb-leds/rgb-eight.png)

The behavior of the light-off radio button is shown below:

![Light off](/engineering-education/how-to-produce-colors-with-rgb-leds/rgb-nine.png)

Let us use our program to produce a custom color by entering `[1 0.5 0.25]`.

![Custom color](/engineering-education/how-to-produce-colors-with-rgb-leds/rgb-ten.png)

The color produced by the RGB LED is the same as the background for the text field `color produced` as shown in the image.

### Conclusion
Arduino hardware is a microcontroller. This hardware can be programmed using Matlab or any other software. Matlab makes it easy to interface with this hardware. This is because of the support package that makes this work. 

Arduino is widely applicable in the science engineering field. It is applicable in robotics fields and even security improvement.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)