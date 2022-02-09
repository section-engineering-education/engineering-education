---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-java-gui-calculator-from-scratch-using-box-layout/
title: How to build a Java GUI calculator from scratch using Box layout
description: This tutorial will expose the readers to the power of box layout and use it in other programs to convert their console apps to a GUI app.
author: suleiman-ibrahim
date: 2022-02-02T00:00:00-17:10
topics: [Languages]
excerpt_separator: <!--more-->
images:
- url: /engineering-education/how-to-build-a-java-gui-calculator-from-scratch-using-box-layout/hero.png
alt: How to build a Java GUI calculator from scratch using Box layout in Java
---
You have probably used a calculator at one point or the other to compute business transactions as an adult, solve high school math assignments as a teenager, or even toy with it as a kid. However, have you ever asked yourself how these calculators function under the hood? If you are curious to know more about that, you have come to the right place.
<!--more-->
In this tutorial, we will build a calculator from scratch using the `BoxLayout` to align the components of the calculator correctly. This calculator will consist of the GUI and the logic part, which performs computations. We will also learn how real-life calculators work under the hood by incorporating functionalities like addition, subtraction, division, multiplication, ets.

The tutorial will also expose the readers to the power of Box layout and how they can use it in other programs to convert their console apps into GUI apps.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Goal](#goal)
- [Layout managers](#layout-managers)
- [The Box layout](#the-box-layout)
- [Step 1: Building the User Interface (UI)](#step-1-building-the-user-interface-ui)
- [Step 2: Building the calculator logic](#step-2-building-the-calculator-logic)
  - [a) Creating the structure](#a-creating-the-structure)
  - [b) Creating the Event Handlers](#b-creating-the-event-handlers)
  - [c) Adding ActionListeners to the buttons](#c-adding-actionlisteners-to-the-buttons)
  - [d) Updating the utility methods](#d-updating-the-utility-methods)
- [Step 3: Wrapping things up](#step-3-wrapping-things-up)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, the reader will need to need to:
- Have basic knowledge and understanding of Java programming language.
- Basic knowledge of using OOP principles in Java.
- A suitable Integrated Development Environment (IDE). I recommend [NetBeans](https://netbeans.apache.org/download/index.html).

### Goal
By the end of this tutorial, the reader will:
- Get comfortable using BoxLayout to build UIs in Java.
- Get to know about the logic that runs on simple calculators.
- Know how to build a simple calculator from scratch using Java.

### Layout managers
Layout managers allow us to align components in any desired position on the panel. They position each GUI component on their panel or frame. Some layout managers Java provides out of the box are:
- GridBag layout
- Grid layout
- Group layout
- Flow layout
- Border layout
- Box layout

### The Box Layout
The Box layout is the simplest and easiest to implement next to the flow layout. It allows you to stack components on top of each other in a column as a vertical box. It also allows to 'lay out' components in a row as a horizontal box next to each other. 

It can be accessed using the `BoxLayout` class provided by the Java `Swing` package. A new instance of this class is then passed into the `setLayout()` panel method to be worked on.

Below is an example of setting a panel's layout to `BoxLayout`:

```java
JPanel mainPanel = new JPanel();
mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.PAGE_AXIS));
```

`BoxLayout` constructor takes in two arguments. The first is the container you wish to apply the layout to, and the second argument is a constant provided by the `BoxLayout` class, which specifies the axis along which the components will be laid out.

Below is a list of the constants and their description:

| Constant                            |                                                                                                                                                                                            Description |
| :---------------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `public static final int X_AXIS`    |                                                                                                  Specifies that the components should be laid out from left to right. The value for this constant is 0 |
| `public static final int Y_AXIS`    |                                                                                                             Specifies that components be laid out from top to button. The value for this constant is 1 |
| `public static final int LINE_AXIS` |                                   Specifies that components should be laid out toward a line as determined by the target container's `ComponentOrientation` property. The value of this constant is 2. |
| `public static final int PAGE_AXIS` | Specifies that components should be laid out in the direction that lines flow across a page as determined by the target container's `ComponentOrientation` property. The value for this constant is 3. |

> Note that you can either use the constant variable or the value to set the components axis. For example, 0 instead of `BoxLayout.X_AXIS`, 1 instead of `BoxLayout.Y_AXIS`, and so on.

It is advisable to always use the `PAGE_AXIS` and `LINE_AXIS` for internationalization. This will enable components to be laid out correctly from either left to right or right to left based on the device's language orientation.

Though Box layout can be used alone, you can also take advantage of the `Box` class to add components to the panel. When the Box layout is used alone, the components stick to each other with no white space like padding. This is where the `Box` class comes to play.

The `Box` class provides static methods that can add invisible components to the panel, which can serve as spacing between components.
Some of the static method provided by the `Box` class are:
- `createHorizontalBox()`
- `createVerticalBox()`
- `createRigidArea(Dimension d)`
- `createHorizontalGlue()`
- `createVerticalGlue()`

All the methods listed above are used to create invisible components which can then be used as white space between the components.
Now that we've learned a bit about the Box layout, let's dive into building the calculator.

### Step 1: Building The User Interface (UI)

![UI Overview](/how-to-build-a-java-gui-calculator-from-scratch-using-box-layout/1-ui-overview.png)

The image above is the final view of the calculator we will build in this tutorial.

To get started, we first have to create a calculator class that extends the `JFrame`class. By extending the `JFrame` class, we are making our calculator class inherit all the properties of the JFrame class.
`JFrame` is a class made available by the swing package. So we need to import the swing package as well.

```java
import javax.swing.*;
public class CalculatorBox extends JFrame {

}
```

The next step is to create the components that will be included in the calculator. These components include the buttons that will send input to the calculator and the text field that will read the calculator output. We will use `JButton` and `JTextField` which are made available by the swing package which was imported earlier.

Besides the components, we also need to create `String` variables that will hold the previous input, the current input, and the operator.
Add the following code inside the class body as class variables.

```java
JButton btnAdd, btnSubtract, btnDivide, btnMultiply, btnClear, btnDelete, btnEquals, btnDot;
JButton numBtn[];
JTextField output;
String previous, current, operator;
```

Now let's move on to create the constructor that will initialize the components and variables. We will also create the `main` method inside the calculator class that will invoke the class once the program is executed.

> Recall that a constructor is a method that has the same name as the class. We will therefore use the same name as our class to create the constructor.

```java
public CalculatorBox() {
}

public static void main(String[] args) {
    new CalculatorBox();
}
```

By now, we have created the basic structure of the calculator and the program looks like this:

```java
import javax.swing.*;

public class CalculatorBox extends JFrame {

JButton btnAdd, btnSubtract, btnDivide, btnMultiply, btnClear, btnDelete, btnEquals, btnDot;
JButton numBtn[];
JTextField output;
String previous, current, operator;

public CalculatorBox() {
}

public static void main(String[] args) {
    new CalculatorBox();
}
```

Now, let's focus on the constructor of the calculator class. We first have to set the title of the calculator by passing the title into the superclass (`JFrame`) constructor. Here, we want to set the title to "Box Calculator". You can set it to any name of your choice.
Add the following code inside the constructor:

```java
super("Box Calculator");
```

The next step is to create a panel named `mainPanel` that will house all other components in the calculator.

```java
JPanel mainPanel = new JPanel();
```

Since the calculator has a box layout, we can then create rows and then group all the components of the calculator into these rows. The rows comprise 5 sub-panels situated inside the main panel. The reason for the panel hierarchy is to make the calculator design more precise.

After creating the rows, we also need to initialize the components declared earlier. These components include the output and other buttons, like operation buttons and number buttons.

The number buttons are all already inside an array, so we append the dot button at the end of the array. We will have to loop through the array to initialize the buttons and also add some styling to them. This is done to avoid repetition and achieve a cleaner code.

We will use the `Font` class to style the buttons. The `Font` class is made available by Java's Abstract Windows ToolKit (AWT) package. This package contains other useful classes we will use later in the project. So we add an import statement at the top of our calculator program that imports all the classes in this package.

The code for the import statement is shown below. Add the code to the top of the program above the class declaration.

```java
import java.awt.*;
```

Recall that `JButton()` takes in `String` as an argument, and the count variable used for the iteration is an integer. We will use the `valueOf()` static method of the `String` class to convert each `int` value in the array to a `String` and then set the value of each button, respectively.
Similar styling applies to the other buttons of the calculator as well.

Below is the full code. Add the code inside the constructor immediately below the `mainPanel` variable.

```java
        // Create sub panels inside main panel
        JPanel row1 = new JPanel();
        JPanel row2 = new JPanel();
        JPanel row3 = new JPanel();
        JPanel row4 = new JPanel();
        JPanel row5 = new JPanel();

 	      // Initialize components
        output = new JTextField(16);
        btnSubtract = new JButton("-");
        btnAdd = new JButton("+");
        btnDivide = new JButton("÷");
        btnMultiply = new JButton("*");
        btnDot = new JButton(".");
        btnEquals = new JButton("=");
        btnClear = new JButton("C");
        btnDelete = new JButton("D");

 	      // Initialize, style, and add action listeners to number buttons
        numBtn = new JButton[11];
        numBtn[10] = btnDot;
        for (int count = 0; count < numBtn.length - 1; count++) {
            numBtn[count] = new JButton(String.valueOf(count));
            numBtn[count].setFont(new Font("Monospaced", Font.BOLD, 22));
        }

 	      // Style other buttons
        btnDot.setFont(new Font("Monospaced", Font.BOLD, 22));
        btnEquals.setFont(new Font("Monospaced", Font.BOLD, 22));
        btnAdd.setFont(new Font("Monospaced", Font.BOLD, 22));
        btnSubtract.setFont(new Font("Monospaced", Font.BOLD, 22));
        btnDivide.setFont(new Font("Monospaced", Font.BOLD, 22));
        btnMultiply.setFont(new Font("Monospaced", Font.BOLD, 22));
        btnClear.setFont(new Font("Monospaced", Font.BOLD, 20));
        btnDelete.setFont(new Font("Monospaced", Font.BOLD, 20));
```

Next, we will add some styling to the output display.

```java
        // Style the output display
        output.setMaximumSize(new Dimension(185, 40));
        output.setFont(new Font("Monospaced", Font.BOLD, 27));
        output.setDisabledTextColor(new Color(0, 0, 0));
        output.setMargin(new Insets(0, 5, 0, 0));
	      output.setText("0");
```

So far, we have been able to create and style components that will be displayed in the calculator. But these components are not visible yet unless added to their respective panels and then to the main panel.

The next step is to set the layout of each row of the calculator. Each row is set to `BoxLayout` with a layout direction of `LINE_AXIS`.
This will enable the buttons to flow from either left to right or right to left based on the language orientation of the device in use.

```java
        // Set the layout of each row in the pane
        row1.setLayout(new BoxLayout(row1, BoxLayout.LINE_AXIS));
        row2.setLayout(new BoxLayout(row2, BoxLayout.LINE_AXIS));
        row3.setLayout(new BoxLayout(row3, BoxLayout.LINE_AXIS));
        row4.setLayout(new BoxLayout(row4, BoxLayout.LINE_AXIS));
        row5.setLayout(new BoxLayout(row5, BoxLayout.LINE_AXIS));
```

After setting the layout of each of the sub-panels, we now have to add the respective components to populate these sub-panels.
>Note that this can be achieved using a loop as we did for the number buttons. But for the sake of simplicity, we just have to add the components sequentially.

```java
        // Add components to each of the row
        row1.add(Box.createHorizontalGlue());
        row1.add(btnClear);
        row1.add(btnDelete);
        row2.add(numBtn[7]);
        row2.add(numBtn[8]);
        row2.add(numBtn[9]);
        row2.add(btnMultiply);
        row3.add(numBtn[4]);
        row3.add(numBtn[5]);
        row3.add(numBtn[6]);
        row3.add(btnAdd);
        row4.add(numBtn[1]);
        row4.add(numBtn[2]);
        row4.add(numBtn[3]);
        row4.add(btnSubtract);
        row5.add(btnDot);
        row5.add(numBtn[0]);
        row5.add(btnEquals);
        row5.add(btnDivide);
```

Notice that we created a horizontal glue and added it as the first component in `row1`. This horizontal glue pushes the `C` and `D` buttons as far as possible to the horizontal edge of the pane.

![Horizontal Glue Demo](/how-to-build-a-java-gui-calculator-from-scratch-using-box-layout/2-horizontalglue-demo.png)

You can also use the `createVerticalGlue()` to achieve something similar. But instead of forcing its left and right components as far away from each other as possible, it forces the components above and below as far as possible from each other.

The second to last step before completing the UI is to set the layout of the main panel and then add all the respective rows to the main panel in accordance.
Here, we will set the layout direction of the main layout to `PAGE_AXIS`. This arranges the components in the panel from top to bottom.

We will also add a space between the output display and the buttons to allow for proper spacing in the UI. This space is added with the help of the `createRigidArea()` method of the `Box` class, which takes in an instance of a `Dimension`. The `Dimension` takes in two arguments where the first argument is the width and the second is the height (in pixels). Here, we are adding 5 pixels between the output display and other buttons.

Below is the code that does all the above:
```java
        // Add all rows to the main panel
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.PAGE_AXIS));
        mainPanel.add(output);
        mainPanel.add(Box.createRigidArea(new Dimension(0, 5)));
        mainPanel.add(row1);
        mainPanel.add(row2);
        mainPanel.add(row3);
        mainPanel.add(row4);
        mainPanel.add(row5);
```

The UI is now completed. But if you run the code, the frame will appear empty. This is because we have not added the main panel to the frame. We can achieve this by using the `add()` method inherited from `JFrame`. We also need to set what happens when the user clicks on the `close` button as well. Here, it will exit the app.

In addition, we need to set the visibility of the app to `true` otherwise it will be transparent and, therefore, invisible. To put the app in shape, we need to set the size as well using the `setSize()` method from `JFrame`. This method takes in two arguments: the first which is the width, and the second which is the height.

Below is the code that concludes the UI design.
```java
        // final touch
        this.add(mainPanel);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setVisible(true);
        this.setSize(205, 280);
```

The UI of our calculator is complete and is ready to launch.

Below is an image of the final view of the calculator.
![UI Final View](/how-to-build-a-java-gui-calculator-from-scratch-using-box-layout/3-ui-final-view.png)

> Check [here](https://github.com/princeibs/java-box-calculator/blob/97283e994097ba74ee67827b829bbf124d05b1e6/CalculatorBox.java) for the calculator source code at this point.

### Step 2: Building The Calculator Logic

Now that we've completely built the user interface of the calculator. The next steps are to add functionalities to the buttons and also to build the logic the calculator will run on.

#### a) Creating the structure
First, we will create some utility methods that will define the various functionalities of the calculator. These methods are all defined inside the class but outside the constructor. And then we will gradually build the functionalities of these methods as we proceed.

Below is the code for the utility methods:
```java
public void delete() {
}

public void clear() {
}

public void updateOutput(){
}

public void appendToOutput(String num) {
}

public void selectOperator(String newOperator) {
}

public void calculate() {
}
```

The next step is to create action listeners for each of these buttons. These action listeners make the buttons listen to events such as when the user clicks on a button, and then update the output and other necessary fields.

For the sake of this tutorial, we will use an inner class that implements the `ActionListener` interface. We will make all the classes private.
The `ActionListener` interface is made available by Java's AWT event package. We will need other interfaces in the event package later in the tutorial aside from the `ActionListener`. 

Let's add an import statement at the top of the file that imports all the classes and interfaces in the event package.
```java
import java.awt.event.*;
```

The next step is to create these anonymous classes that will handle the events that will occur within the calculator. We will create three classes that will handle all the click events in the calculator.

#### b) Creating the Event Handlers

**`class NumberBtnHandler`**

The first class is the `NumberBtnHandler` which will handle events from all the number buttons, including the dot button. This class will implement the `ActionListener` interface so that we can override the `actionPerformed()` abstract method in the `ActionListener` interface. This method takes in an `ActionEvent` parameter, which is made available by the event package imported earlier.

Below is the code for the `NumberBtnHandler` class. Add the code immediately below the utility methods.
```java
    private class NumberBtnHandler implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {           
        }
    }
```

Next, we have to decide what will happen when any of the "number buttons" get clicked. This can be achieved inside the `actionPerformed()` method, which takes in a parameter we named `e`. The parameter `e` can then access the `Object`s `getSource()` method, which can get the object where an event initially occurred. This is useful when we want to check for the button that was clicked.

Recall that the "number buttons" are inside an array. So we can easily loop through the array comparing each button with the button that was clicked. If a match occurs, we then get the text inside the button and append it to the output display. After which we will call the `updateDisplay()` method to display the new appended number.

>Note that we need to cast `e.getSource()` to a `JButton` so that we can store it in a button variable with a more meaningful name, which can later be used for comparison inside the loop.

Below is the code for the implementation. Note that all the lines of code below are inside the `actionPerformed()` method of the `NumberBtnHandler` class.
```java
	    JButton selectedBtn = (JButton) e.getSource();
        for (JButton btn : numBtn) {
            if (selectedBtn == btn) {
                appendToOutput(btn.getText());
                updateOutput();
            }
        }
```

**`class OperatorBtnHandler`**

The second class to be created is the `OperatorBtnHandler` which also implements the `ActionListener` interface. This class is similar in structure to the `NumberBtnHandler` created above, but the major difference lies inside the `actionPerformed()` method.

Inside the `actionPerformed()` method of this class, we will compare each operator button with the button that was clicked to know which operator was selected. We can achieve this using `if` statements since the operator buttons are not inside an array, unlike the "number buttons".

When an operator button is selected, we get the text of the button and pass it to the `selectOperator()` method and then update the output by calling the `updateOutput()` method.

Below is the code implementation for the `OperatorBtnHandler` class.
```java
    private class OperatorBtnHandler implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
            JButton selectedBtn = (JButton) e.getSource();
            if (selectedBtn == btnMultiply) {
                selectOperator(btnMultiply.getText());
            } else if (selectedBtn == btnAdd) {
                selectOperator(btnAdd.getText());
            } else if (selectedBtn == btnSubtract) {
                selectOperator(btnSubtract.getText());
            } else if (selectedBtn == btnDivide) {
                selectOperator(btnDivide.getText());
            }
            updateOutput();
        }
    }
```

**`class OtherBtnHandler`**

The last action listener class to be created is the `OtherBtnHandler` class. This class will implement the `ActionListener` interface and override the `actionPerformed()` method as well. Similar to the `OperatorBtnHandler`, `OtherBtnHandler` will compare the selected button to the other buttons in the calculator and execute their respective methods.

After the execution, we will also call the `outputDisplay()` method to update the UI. Below is the code implementation for the `OtherBtnHandler` class.
Below is the full implementation of the `OtherBtnHandler` class.

```java
    private class OtherBtnHandler implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e ) {
            JButton selectedBtn = (JButton) e.getSource();
            if (selectedBtn == btnDelete) {
                delete();
            } else if (selectedBtn == btnClear) {
                clear();
            } else if (selectedBtn == btnEquals) {
                calculate();
            }
            updateOutput();
        }
    }
```

#### c) Adding ActionListeners to the buttons
We have just created all the action listeners that will handle all the events from all the calculator's buttons. But if you click on any button by now, no event will occur because these action listeners have not been added to the respective buttons.

Now back to our constructor. The first step is to create objects of all the button handler classes which can then be passed as action listeners to each of the buttons.

Add the following code immediately below where we first initialize the components inside the constructor. Precisely immediately below where we initialized `btnDelete`.

```java
  	    // Instantiate action listeners
        NumberBtnHandler numBtnHandler = new NumberBtnHandler();
        OtherBtnHandler otherBtnHandler = new OtherBtnHandler();
        OperatorBtnHandler opBtnHandler = new OperatorBtnHandler();
```

The next step is to add these action listeners to their respective buttons. Recall from the loop we used to style the number buttons above, you can directly add action listeners to each button within the loop similar to how styling was added to them. You can achieve this by calling the `addActionListener()` method on each button and passing the respective action listener.

Update the entire body of the loop with the code below.
```java
    for (int count = 0; count < numBtn.length - 1; count++) {
        numBtn[count] = new JButton(String.valueOf(count));
        numBtn[count].setFont(new Font("Monospaced", Font.BOLD, 22));
        numBtn[count].addActionListener(numBtnHandler);
    }

```

Similarly, you can add action listeners to the operation and other buttons by passing in the respective action listener to the `addActionListener()` method of each button, as shown below.

```java
        // Add action listeners to other buttons
        btnDot.addActionListener(numBtnHandler);
        btnDelete.addActionListener(otherBtnHandler);
        btnClear.addActionListener(otherBtnHandler);
        btnEquals.addActionListener(otherBtnHandler);

        // Add action listeners to operation buttons
        btnMultiply.addActionListener(opBtnHandler);
        btnAdd.addActionListener(opBtnHandler);
        btnSubtract.addActionListener(opBtnHandler);
        btnDivide.addActionListener(opBtnHandler);
```

Add the above code immediately below the line where the `output` was styled. This line precisely:

```java
output.setText("0");
```
All the buttons in the calculator are now functional, but if you click on any of the buttons, you won't see output just yet. This is because the methods that we will use to aid these functionalities are empty for now. Let's dive in and update these methods.

#### d) Updating the Utility Methods

**`updateOutput()`**

The first method we will update is the `updateOutput()` method. This method updates the output display with whatever the value of the current operand is. Add the line of code below inside the `updateOutput()` method.

```java
output.setText(current);
```

**`appendToOutput()`**

Next, we will update the `appendToOutput()` method. This method adds any number that the user clicked to the output variable. We will achieve this by concatenating the user input to the current value on the output and then updating the output afterward.

Add the line of code below inside the `appendToOutput()` method and run the program to see the output.

```java
current += num;
```

The image below is the updated view of the calculator.

![Output Display Inconsistencies](/how-to-build-a-java-gui-calculator-from-scratch-using-box-layout/4-null-n-multiple-dot-bug.png)

If studied carefully, you will notice two problems with the calculator. First, a `null` appears on the output display with other numbers trailing it. The second problem is, you can add more than a dot. This does not apply to standard calculators. Let's fix this real quick.

To fix the multiple dots in the output display, replace the code inside the `appendToOutput()` method with the code below.

```java
    public void appendToOutput(String num) {
        // Prevents adding more than one dot on the output
        if (num.equals(".") && current.contains(".")) {
            return;
        }
        current += num;
    }
```

The code will first check for a dot on the current output. If one is already present, then it will return without executing the function. But if none is present, it will add the incoming dot to the current display.

Now to fix the `null` appearing on the output display, recall that the default value for a `String` is `null`. So when we declare the `current` variable at the top of the program, the default variable gets assigned to it.

To solve this, we need to initialize the value of both `current` and `previous` to an empty string inside the constructor. This will initialize the value of the variables immediately after the program is executed.

Add the following code at the top of the program, immediately below where we created the `mainPanel` variable.

```java
   	// Initializing the calculator operands
    current = "";
    previous = "";
```

Now that we have fixed the minor bug with the output display, we can now update other methods in the calculator.

**`clear()`** and **`delete()`**

The next set of methods to update are the `clear()` and `delete()`. The `clear()` method clears all the content on the screen by setting both the previous and current operands to an empty string. It also sets the `operator` to null so that we cannot operate on an empty `String`.

The `delete()` method removes the element at the last index from the output display. This is achieved by using the `substring()` method to get from the first, up till next to the last element in the string and then set it to the new current operand on the output display.

With only this implementation of the `delete()` method, if you click the delete button when the output is empty, you will get a `StringIndexOutOfBoundsException`. This is because you are trying to chop off the last element from an empty string.

To solve this, we will set an `if` condition to let the delete method body run only when the string contains at least one element.

Below is the code for the `clear()` and the `delete()` method.

```java
   public void delete() {
        if (current.length() > 0) {
            current = current.substring(0, current.length() - 1);
        }
    }

    public void clear() {
        current = "";
        previous = "";
        operator = null;
    }
```

`selectOperator()`

Next on let's consider the `selectOperator()` method which we will use to set the operator based on the user input. Before setting the operator, some checks need to be made. First, if the output is empty and an operator is selected, we will set the new operator to be the selected operator, writing off the previously entered operator and then exiting the method. This is useful where the user accidentally clicks a wrong operator, it can then be corrected by clicking on the correct operator next.

Another check is to see if the previous operand is not empty. If true, we will evaluate the previous operand with the current operand before selecting the next operator. This reason for this so the user can perform calculations continuously without pressing the equals button. For example, when a user enters `1 + 2`, but instead of pressing the equals button, the user performs more operations, say `+ 3`. The method will first evaluate the value of the first two operands and set the result to the current operand before selecting the next operator.

After all the checks are done, we will now set the new operator as the selected operator and pass the value of the current operand display on the output to the previous operand. We will also clear the screen by setting the current operand to an empty string to give way for new input.

Below is the code implementation for the `selectOperator()` method.

```java
    public void selectOperator(String newOperator) {
        // if no number is entered yet
        if (current.isEmpty()) {
            operator = newOperator;
            return;
        }
        
        if (!previous.isEmpty()) {
            calculate();
        }
        
        operator = newOperator;
        previous = current;
        current = "";
    }
```

##### calculate()
The last method we will work on is the `calculate()` method, which will perform all computations in the calculator. We will confirm that the value of both the previous and current operand is not empty. If either or both operands are empty, the computation will not hold because we need the two operands to perform any arithmetic computation.

We will then create a named result floating-point variable and initialize it with 0.0. We need to initialize the result because when the compiler wants to parse the result back into a string, the value of the operator used inside a switch case statement to initialize the value of the result might not have been initialized which leaves the result still not initialized, which will throw an error when trying to parse it to a string.

The next step is to parse both the previous and current operand from string to double to be used for computations. Now that we have gotten the previous and current operand and the operator used on them. The next step is to use a switch statement to compute the result of the previous and current operand based on the operator and then store the result in the result.

The last step for the `calculate()` method is to convert the floating-point result to a string and pass its value to the current operand. Furthermore, set the value of the operator to null because the operator has been used to perform computation already. Last, we clear the previous operand so that its value will not be used to perform computations again since it has already been used.

Below is the final code implementation for the calculate() method.

```java
    public void calculate() {
        if (previous.length() < 1 || current.length() < 1) {
            return;
        }
        double result = 0.0;
        double num1 = Double.parseDouble(previous);
        double num2 = Double.parseDouble(current);
        switch (operator) {
            case "*":
                result = num1 * num2;
                break;
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "÷":
                result = num1 / num2;
                break;
            default:
                break;
        }
        current = String.valueOf(result);
        operator = null;
        previous = "";
    }
```

You can now run the program, and the calculator works as expected. You can also perform any computations of your choice and get the correct results.

>Check [here](https://github.com/princeibs/java-box-calculator/blob/f3cf0aebe02772d56b411744b655735a4fb23bb4/CalculatorBox.java) for the code up to this point.

### Step three: Wrapping things up
By now, your calculator is fully functional and outputs the correct result. However, there is just one more fact that you might not like about the calculator, it does not correctly display integer numbers, just like the image below.

![Test Output 1](/engineering-education/how-to-build-a-java-gui-calculator-from-scratch-using-box-layout/5-four-by-fiftysix.png)

The image above results from performing a random operation like `4 * 56`. Since the result is an integer, we do not need the extra trailing zero.

**processOutputNumber()**: To fix this, we create a method called `processOutputNumber()` to process every number displayed on the output.

To avoid processing an empty output, we will first check if the current output is not empty using an if statement. We will then split the output into two parts - the integer and the decimal parts. We can achieve this using the `split()` method of the `Strin`g class and then pass in a regular expression that searches for a dot in the output.

Recall that the `split()` method returns an array to set the first element of the array to `integerPart` and the second element to `decimalPart`. We will then check if the decimal part is `0`. We ignore it and set only the integer part to the current output if `true`.

Below is the final code for the `processOutputNumber()` method:

```java
    public void processOutputNumber() {
        if (current.length() > 0) {
            String integerPart = current.split("\\.")[0];
            String decimalPart = current.split("\\.")[1];
            if (decimalPart.equals("0")) {
                current = integerPart;
            }
        }
    }
```

The last step is to call the `processOutputNumber()` method at the last line of `calculate()` method because we want to process the number displayed on the output anytime a calculation is performed before displaying it.

![processOutputNumber() location](/engineering-education/how-to-build-a-java-gui-calculator-from-scratch-using-box-layout/6-processoutputnumber-location.png)

>The `processOutputNumber()` is at the same level as other utility methods.

You can now test the calculator with calculations involving integers and also decimal results.

![Final output 1](/engineering-education/how-to-build-a-java-gui-calculator-from-scratch-using-box-layout/7-final-screenshot-a.png)

![Final output 2](/engineering-education/how-to-build-a-java-gui-calculator-from-scratch-using-box-layout/8-final-screenshot-b.png)

The images above result from computing `4 * 56` and `24 ÷ 5`, respectively.

That is it!

Congratulations on building a fully functional calculator using the Box layout in Java.

Check out this Github [repository](https://github.com/princeibs/java-box-calculator) to get the final source code for the calculator.

### Conclusion
The primary goal of this tutorial is to create a calculator that can perform basic arithmetic operations with some added functionalities, like delete and clear output using the Box layout. You can add more functionalities to the calculator, like scientific operations. 

You can also explore more of the Box layout by converting our calculator UI to a more complex layout, similar to a scientific calculator UI. There are infinitely many things you can do with this knowledge. I hope to see the great things you will build out of it.

For further reference, check out the official Java documentation on [How to Use BoxLayout](https://docs.oracle.com/javase/tutorial/uiswing/layout/box.html)

Happy coding!
