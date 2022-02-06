### How to produce colours with RGB LEDs using Arduino and Matlab graphical user interface
### Introduction
Arduino is an initiative and user community that designs and manufactures single-board microcontrollers and microcontroller kits. These kits are used for making digital devices using open-source hardware and software. A wide range of microprocessors and controllers are used in Arduino board designs. The boards have digital, and analogue input/output (I/O) pins connected to breadboards and other circuits.
This tutorial presents a scheme to produce any colour using RGB LEDs controlled by the Arduino Uno board. The Arduino Uno board is interfaced with MATLAB. Also, one can learn how to interface Arduino Uno with Matlab and get an idea of how different colours are produced from three primary colours Red, Green and Blue.

### Prerequisites
To follow along with this tutorial, you will need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).
- Understanding the [graphical user interface](https://www.section.io/engineering-education/matlab-graphical-user-interface/)

### Arduino board
Arduino board is an open-source microcontroller board based on the microchip ATmega328P microcontroller developed by Arduino. Cc. The different components of this microcontroller are shown in the image below:

![Components](/engineering-education/how-to-produce-colours-with-rgb-leds-using-arduino-and-matlab-graphical-user-interface/rgb-one.png)

- USB connector- It helps the user to connect the board to the computer or laptop for programming the controller.
The power supply is used to provide external power to the Arduino.
- Reset- This button is used to reset the Arduino after use.
- Microcontroller Atmega328- It is the microcontroller. It governs the functionality of the Arduino.
- Digital I/O- They collects data from the Arduino sensors and write them to other components(actuators) 
- Serial out(Tx)/in(Rx)- It is used to communicate between Arduino and the computer or other connected devices.
- Analogue in- Used for reading the analogue sensors.

> In the digital input/output, pins 11, 10, 9, 6, 5, 3 have `~` symbols. It is because they are supported by pulse width modulation(PMW). They can give any voltage in the range 0-5v with the help of PMW. The pins can generate a dc voltage in 256 variations since it is an 8-bit controller(2^8). Arduino produces this voltage variation by varying the duty cycle of a square wave. It is known as PMW.

In IDE of Arduino. Cc, the voltages of these PMW pins can be written by `analogwrite(pin, value)`. In Matlab, we use the command `writePMWVoltage(board, pin, value)`.

### Hardware implementation
The circuit diagram to implement the colour production is as shown below:

![Hardware implementation](/engineering-education/how-to-produce-colours-with-rgb-leds-using-arduino-and-matlab-graphical-user-interface/rgb-two.png)

The image above shows how we connect the Arduino to the breadboard. Instead of using three LEDs, i.e. red, green, and blue, we use a single LED known as common cathode RGB LEDs. Also, we have three resistors to limit the current. The maximum current that our LED can handle is 20mA per colour channel.

### Working principle of the RGB LED
There are two types of RGB LED: common anode and common cathode. As the name suggests, the anode is common for all the colour channels for the common anode. Likewise, the cathode terminal is common for all the colour channels for the common cathode.

![RGB LEDs](/engineering-education/how-to-produce-colours-with-rgb-leds-using-arduino-and-matlab-graphical-user-interface/rgb-three.png)

LEDs are diodes. Since diodes have two parts, P-side and the N-side, separated by a p-n junction, P-side is the anode, and the N-side is the cathode.
For our case, we have used the common cathode. If you want to switch on the red LED, you apply 5v to its terminal/channel. It applies to both green and blue. When using the common anode type, we ground the terminal of the colour that we want to switch on.
When you want to produce red colour, you provide 5v to the red terminal. It can be represented as `RGB=[1 0 0]` where 1 represents the maximum voltage, and 0 represents no voltage. It applies to all the colours. You have to mix the RGB colours to produce custom colours. A simple combination to produce custom colours is shown below:

![Producing custom colours](/engineering-education/how-to-produce-colours-with-rgb-leds-using-arduino-and-matlab-graphical-user-interface/rgb-four.png)

The image above shows that producing custom colours involves combining the RGB colours. For example, you want to produce a yellow colour. However, yellow is formed by a combination of red and green colours. So, we need to switch the red and the green colours simultaneously. It can be represented as `RGB=[1 1 0]`.
At some point, you do not need to provide the full voltage. For example, if you want to produce an orange colour, we need the red led to be brighter and green to be less bright. This can be represented as `RGB=[1 0.4 0]`. The red led receives 5V, and the green receives 40% of the total voltage. With this variation, you can get any colour.

### Arduino interface with Matlab
To interface with Arduino with Matlab, you must install the hardware support package for Arduino. We do this in the add-on, but it requires that you first log in to your MathWorks Account.
- Click on the add-on and select `get hardware support package`.
- Once you click that, you get a window that contains all the support packages.
- Filter for `matlab support package for arduino software` and install it.

### Matlab implementation
We create a Graphical User Interface(GUI) to help control the colours for this implementation. For proper understanding, you must go through the article 'getting started with [graphical user interface](https://www.section.io/engineering-education/matlab-graphical-user-interface/)'. The GUI will be as shown below:

![The GUI](/engineering-education/how-to-produce-colours-with-rgb-leds-using-arduino-and-matlab-graphical-user-interface/rgb-five.png)

The function of the various components of the GUI are as follows:
- Board ON- When you press this button, your board is connected to Matlab.
Choose colour- In this button group, select the type of colour you want the led to be producing. You can also produce other colours by entering the values of RGB, as explained earlier.
- Exit- You exit the Arduino board.
To open the GUI in Matlab, execute the `guide` command in the command window. Then, open a blank Gui and add the components to form the interface shown below:

![The designed GUI](/engineering-education/how-to-produce-colours-with-rgb-leds-using-arduino-and-matlab-graphical-user-interface/rgb-six.png)

The property inspector modifies the component's background colour, string, and tag. All you need to do is double click the component you want to modify, and the property inspector window opens up.
Once the modification of all the components is done, we can save the GUI. It generates the GUI program and the callback functions. The callback functions are functions that render the functionality of our GUI. We then write the control command for the callback to achieve colour production.
Let us look at the callback functions for each button. Let's begin with the `Board-ON`.
```matlab
a = arduino();
handles.a = a;
handles.ON = 1;

if ~isempty(handles.a)==1
    set(handles.Board_ON, 'BackgroundColor', [0 1 0]);
end
guidata(hObject, handles)
```
First, we declare the board variable `a = Arduino()`. After this, we create a handle `handle.a` for the board variable. Also, we create a handle for the ON condition such that when the handle is 1, the board is on. When the handle is 0, the board is off. It s like a linking handle. This handle is `handles.ON`.
Now, let us use an `if` statement to check for the validity of the conditions. First, we check if the board is created using `~isempty(handles.a)`. If it is created(equal to 1), we set the button's background colour to green[0 1 0]. Then finally, we update the handles using `guidata(hObject, handles)`.
Now, let us write the callback function for the radio buttons, i.e. red, green, blue etc. These buttons allow you to select a colour you want your LED to produce. For example, the led should produce a red colour if you select red. Let us begin with the red buttons.
```Matlab
if handles.ON==1
    writePMWVoltage(handles.a, 'D6', 5); %red
    writePMWVoltage(handles.a, 'D5', 0); %green
    writePMWVoltage(handles.a, 'D3', 0); %blue
end
```
This code first checks if the board is enabled. We then use the `writePMWVoltage()` function to determine the colour to be produced. This function takes the board variable `handle.a`, PIN `D6`, and the voltage to be passed to the pin, i.e. 5v. It is done for all the colours defined by the radio buttons. The code for the callback functions for the radio buttons is the same. We only need to change the voltage passing through each colour channel to form the defined colour. The callback codes are as follows:
```Matlab    
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
Let us look at the callback function for the exit push button.
```Matlab
clear handles.a;
closereq();
```
`clear handles.a` clears the board variable. When this variable is cleared, Arduino disconnects from Matlab. We then exit the GUI using the `closereq()` function.
At some point, you may require that need to create custom colors. As we have seen before, custom colors is formed from a combination of of the rgb colors. The callback function for the `enter RGB for any color` text field is shown below:
```matlab
rgb = str2num(get(hObject, 'string'));
handles.R = rgb(1);
handles.G = rgb(2);
handles.B = rgb(3);
guidata(hObject, handles)
```
Here, we get the input using the `get()` function. When you enter this value, it is of the string type. Next, we convert this input to a number using the `str2num` function. After this conversion, we extract the RGB values. The first value, `RGB(1)`, is assigned to the red channel. The second value is assigned to green, and the third value is for blue. Finally, we updated the handle.
To display our custom colors, we need to enter the rgb values and then click `OK`. The callback function for the `OK` pushbutton is:
```matlab
if handles.ON == 1
    writePMWVoltage(handles.a, 'D6', handles.R); %red
    writePMWVoltage(handles.a, 'D5', handles.G); %green
    writePMWVoltage(handles.a, 'D3', handles.B); %blue
end
set(handles.text10, 'BackgroundColor', [handles.R handles.G handles.B]);
guidata(hObject, handles)
```
In writing this callback, we check if the board is ON. Using the `writePMWVoltage()` function. This function takes the board variable, PIN, and the entered input value. We then set the `backgroundcolor` of the text field `text10` as the colour that our input values produce. It means that the background colour of the text field should be the same as that produced by the RGB led.
Arrange your Arduino and breadboard as shown below:

![Arrangement](/engineering-education/how-to-produce-colours-with-rgb-leds-using-arduino-and-matlab-graphical-user-interface/rgb-seven.png)

Let us run our program to see the output. Select the red radio button and see the output.

![Red color](/engineering-education/how-to-produce-colours-with-rgb-leds-using-arduino-and-matlab-graphical-user-interface/rgb-eight.png)

The behaviour of the light-off radio button is shown below:

![Light off](/engineering-education/how-to-produce-colours-with-rgb-leds-using-arduino-and-matlab-graphical-user-interface/rgb-nine.png)

Let us use our program to produce a custom colour by entering `[1 0.5 0.25]`.

![Custom color](/engineering-education/how-to-produce-colours-with-rgb-leds-using-arduino-and-matlab-graphical-user-interface/rgb-ten.png)

The colour produced by the RGB led is the same as the background for the text field `colour produced` as shown in the image.

### Conclusion
Arduino hardware is a microcontroller. This hardware can be programmed using Matlab or any other software. Matlab makes it easy to interface with this hardware. It is because of the support package that makes this work. Arduino is widely applicable in the science engineering field. It is applicable in robotics fields and even security improvement.

!Enjoy coding
