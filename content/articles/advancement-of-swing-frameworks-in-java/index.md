---
layout: engineering-education
status: publish
published: true
url: /advancement-of-swing-frameworks-in-java/
title: Advancement of Swing Frameworks in Java
description: Swing in Java is an Application Programming Interface (API) for providing graphical user interface elements to Java Programs. In this article, we will learn all you need to get started with swings in Java.
author: jacob-muganda
date: 2021-11-16T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/advancement-of-swing-frameworks-in-java/hero.png
    alt: Advancement of Swing Frameworks in Java Hero Image
---
Java Foundation Class took Swing Framework to be part of it. Java version 1.1 initially contained Swing as a well-defined library. Later on, it got integrated into the Java language.
<!--more-->
The framework can enhance issues due to the fact frameworks may be large and complex. When we recall small programs, a spring framework can bring about greater difficulty than the unique gadget it supposedly improves, since Swing has dreams that lessen any tough results that a larger framework ought to do.

The primary objective of the framework is to provide the kernel of a Swing application, assisting programmers to get started swiftly and to gain optimum practices from just a few elements similar to every Swing Framework.

### Table of contents
- [Prerequisites](#prerequisites)
- [Pluggable Feel and Look Provided by Swing](#pluggable-feel-and-look-provided-by-swing)
- [The MVC Connection](#the-mvc-connection)
- [Event Handling](#event-handling)
- [Performing  Swing Painting ](#performing-swing-painting)
- [Conclusion](#conclusion)


### Prerequisites

To follow along with this article, the reader must have the following:
- Familiarity with Java programming language.
- Familiarity with the introduction to java swing. Refer to this [introduction to java swing](https://www.section.io/engineering-education/introduction-to-java-swing/) article. 

### Pluggable feel and look provided by swing
The pluggable feel and look provided by Swing is one of the reasons that makes it considered by Java code.  The control of Swing makes it create an aesthetic feeling. Meaning that the look and feel of a component can be separated from the logic of the component because that is what Swing does. 

It is possible to “plugin” an unused look and feels for any given component with failure to create any side effects in the code that uses that component. Pluggable feel-and-look has important benefits all through. 

It is practical to explain a feel and look that is uniform across all platforms, that is, suppose an application will be running in a MacOS environment only, it is achievable to define the MacOS feel and look. It is also possible to model the convention feel and look. 

To sum up, the feel and look can be changed dynamically at run time.

### The MVC (Model-View-Controller) Connection
The Swing framework is ideal since it is underpinned by the ideas and its design referring to the link created by the MVC. Problems arise from Swing components due to a high level of differences caused by the separation of the controller and view.

On the other hand, Swing deploys a modified version of MVC, that combines view and controller binding into an exclusive logical object referred to as the UI delegate. The Separable Model blueprint or the Model-Delegate blueprint are the two techniques used by Swing. 

Although the component blueprint of Swing's Framework is based on MVC, the traditional implementation is not deployed. The blueprint of the Model-Delegate resizes and realizes Swing's pluggable feel and look.

### Event Handling
Since we have some information about swing frameworks we can proceed to how events are handled in the preceding section. Swing generates the interactions to be handled by the components responding to user input as well as events. When a set timer goes off, it triggers an event. 

The most important part of all Swing-based applications is event handling. In most instances, Events in AWT are also used in swings, and the execution of these events are all contained in `java.awt.event`. The `java.swing.event`allows for packaging only Swing-specific events. Illustrated by code below is an event-generated swing button `PUSH `.

```java
package eventdemo;
import java.awt.event.*;
import javax.swing.*;


class EventDemo {
 JLabel lbJ;
 EventDemo() {
JFrame frJ = new JFrame("EVENT HANDLER ILLUSTRATOR");
 // We will be performing layout specification
 frJ.setLayout(new FlowLayout());
 // At this point we have to assign our frame a primary size.
 frJ.setSize(400, 400);
 // When the user closes the application, the program should stop.
 frJ.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
 // You can create as many buttons but here we are going create only two.
 JButton jbtnEvent1 = new JButton("Event1");
 JButton jbtnEvent2 = new JButton("Event2");
 // Implementing Event1 listener.
 jbtnEvent1.addActionListener(new ActionListener() {
 // Declaring ActionPerformed to be visible to all classes.
 public void actionPerformed(ActionEvent ae) {
 lbJ.setText("EVENT1 HAS BEEN HANDLED." + "\n");
 }
 });
 // include listener for Event2.
 jbtnEvent2.addActionListener(new ActionListener(){
 lbJ.setText("EVENT2 HAS BEEN HANDLED." + "\n");
 }
 );
 frJ.add(jbtnEvent1);
 frJ.add(jbtnEvent2);
 // text-based label will have to be created.
 lbJ = new JLabel("Press any button.");
 // Putting labels.
 frJ.add(lbJ);
 //Putting the frame on display.
 frJ.setVisible(true);
 }
 // Declaration of the main method
 public static void main(String args[]) {
//This metod uses Swing for its user interface.
 SwingUtilities.invokeLater(new Runnable() //declaration of utility methods.
  {
 public void run() {
     //Recall method (function) EventDemo
 new EventDemo();
 }
 });
 }
}
```
When you run your program the first output gotten is this:

![Button](/engineering-education/advancement-of-swing-frameworks-in-Java/button.png)

When you click the first button you get the display as shown below:

![Event1](/engineering-education/advancement-of-swing-frameworks-in-Java/event1.png)

When you click the second button  you get the output display as shown below:

![Event2](/engineering-education/advancement-of-swing-frameworks-in-Java/event2.png)

### Performing swing painting 
For the painting to be achieved, we need to understand the following. Swing Framework is powerful as it happens that it does not limit to using Swing Framework since it has functions allowing users to input directly into the output area of the frame, panel, or other components of swing, such as JLabel. 

Moreover, in several cases usage of Swing will not need the direct drawing to the display of the component, this functionality is dependant on those applications. To input directly in the given output of the display included in a component, you will be required to use the drawing approaches and procedures included in the AWT library, like the `drawRect()` method or even the `drawLine()` method.

```java
// We will painting  the panel lines.
package paintdemo;
import java.awt.*;
// Allows for use of input methods on swing at runtime
import javax.swing.*;
// allows for importing of java class or packages
import java.util.*;
//  In the panel lines are plotted.
class PaintPanel extends JPanel {
 Insets set; // The panel holder is Insets
 Random rand; // Generation of random numbers
 // Construction of the panel.
 PaintPanel() {
 //Placing a border around the panel gives yuor platform a neat view.
 setBorder(
 //Defining the border shade
 BorderFactory.createLineBorder(Color.GREEN, 5));
 //An object for random outputs is created.
 rand = new Random();
 }
 // PaintComponent() function needs to be overriden.
 @Override
 protected void paintComponent(Graphics j) {
 // Superclass method calling  first has to be done.
 super.paintComponent(j);
 // Declaring of variables
 int a, b, a2, b2;
 // We are getting the dimensions.
 int hgt = getHeight();
 // Declaring Method for getting height and width. 
 int wdt = getWidth();
 // Getting the insets.
 ins = getInsets();
 // Randomly produced endpoints of nine lines are drawn.
 for(int i=0; i < 9; i++) {
 // At this point we will be acquiring random coordinates.
 a = rand.nextInt(wdt-ins.left);
 b = rand.nextInt(hgt-ins.bottom);
 a2 = rand.nextInt(wdt-ins.left);
 b2 = rand.nextInt(hgt-ins.bottom);
 // Drawing of the lines.
 j.drawLine(a, b, a2, b2);
 }
 }
}
// Description of painting onto the plane.
 public class PaintDemo {
 // Creation of an object for JLabel.    
 JLabel lbJ;
 // Creation of class PaintPanel.
 PaintPanel jj;
 PaintDemo() {
 // JFrame repository is created.
 JFrame frJ = new JFrame("Paint Demo");
 // Defining the area to be displayed at execution.
 frJ.setSize(400, 400);
 // End the program on closing of the swing application.
 frJ.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
 // Creation of the panel that will need painting.
 jj = new PaintPanel();
 frJ.add(jj);
 // Showing the display .
 frJ.setVisible(true);
 }
 // Declaring the main method.
 public static void main(String args[]) {
 // Thread event execution are created in relation to the frame.
 SwingUtilities.invokeLater(() -> {
     PaintDemo paintDemo = new PaintDemo();
 });
 }
}
```

![Painting](/engineering-education/advancement-of-swing-frameworks-in-Java/painting.png)

The `paintComponent()` method is overridden by the PaintPanel, to manage painting. Enabling the PaintPanel to write directly onto the output display of the component while painting is being carried out. The program has a default border format that it uses making the area not to be declared and adding the panel towards the middle. The display in the panel is sized to fill the middle.

### Conclusion
In this article, we have learned how to perform the following task using Swing frameworks:
- Handling events.
- Painting in the panel.
- Understanding how swing supports a pluggable look and feel.
- Understanding the concept of MVC.
- 
From the insights gained. Moreover, you are also equipped with the necessary information to handle swing frameworks entirely. You are now a swing geek. 

Happy designing of Swing frameworks!

Happy Learning!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
