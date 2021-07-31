### how to create a user login page using java GUI
### Introduction

Java, an object-oriented, interpreted, robust, secure, and high-performance programming language,  java was developed by James Gosling(father of Java) and his collegues of teams at Sun Microsystems in 1990.

#### Graphical User Interface (GUI)

Java provides a rich set of libraries to create GUIs in a platform-independent way. GUIs offer a visual display of components. Components such as labels, text fields, buttons, checkbox, jpanel, jframe on the screen. Java’s original GUI library was the Abstract Window Toolkit (AWT). Swing was later added to the platform in Java SE 1.2. Since then, Swing has remained the primary Java GUI technology. One of the To design a GUI, you need to figure out how to layout your components to match your desired look.
[Further Reading](https://docs.oracle.com/javase/7/docs/api/index.html)

- **Abstract Window Toolkit (AWT):**  AWT is a set of APIs used to create graphical user interface for java applications. It was later replaced by **Swing**.

- **Swing:** Swing is a set APIs containing GUI components used for creating Applications.  The Swing API was build on AWT APIs. Swing provides a better and richer set of GUI components with a native or a cross-platform that makes the application look the same on different windows.
 
In this tutorial, we will import the swing package **` import javax.swing;`**. This syntax allows the use of all swing classes without having to import them differently.

**API:** Application Programming Interface.
[Further Reading](https://docs.oracle.com/javase/7/docs/api/index.html)

### Goal
In this tutorial, we will learn how to design a simple user login page like this.
![Login page](/how-to-create-a-user-login-page-using-java-gui/loginPage.png)

### Prerequisites
1. Basic Understanding of Java and Java GUIs.
2. [JDK version 16 or higher](www.oracle.org).
3. Java compiler of your choice ( Recommended: [Eclipse](www.eclipse.org) )

### Setup procedure

To create a project in eclipse;
- Open eclipse IDE
- Click on File
- select New
- Select Class
- Finally, name your class.

Your workspace will look like this;

![java gui](/how-to-create-a-user-login-page-using-java-gui/structure.png)

Further readings [Eclipse.](http://people.cs.uchicago.edu/~kaharris/10200/tutorials/eclipse/Step_02.html)

### Core Concepts

#### Variables
Variables are containers that hold valid values of any data type. There are three types of variables in Java.
- Local Variables: declared inside a method class and can only be accessed by the method.
- Instance Variables: declared with in a class, outside of a method and can be accessed by an object of a class.
- Static Variables: declared using static keyword with in a class, outside of a method and can be accessed by different objects of a class.
Variables also hold GUI components like labels, checkboxes,  textfields, frames, panels, and buttons.

Example:
```java
// declaring a button variable
button = new JButton("Login");
```
In the example above, we declared **button** as the variable name. **JButton** as the name of the class that holds the button component in awt package. **Login** is the text that appears on the button. 
#### JPanel
JPanel class covers the entire space or a window that we can attach any other components and visualise it to the user including other panels.

#### JFrame
A Frame is a top-level window with a title and a border. The size of the frame includes any area designated for the border. Frame encapsulates window. It contains a title bar, menu bar, borders, and resizing corners.

#### JLabels
A display area for a short text string or an image, or both. A label provides a keyboard alternative as a convenience for a nearby component.

#### JTextfield
JTextField is a lightweight component that allows the editing of a single line of text, note that password textfields does not show the original characters.

#### Password Textfield

- Next, positioning the password text field. 100pixel from the left, 75pixel from the top, 193pixel wide(width) and 28pixel long(height).

### Creating UI
Let's begin by importing the java GUI packages:
```java
import javax.swing.*;import java.awt.*; and import java.awt.event;
```
The snippet above are necessary if we want to use Java GUI. All GUI classes are defined within this packages.

#### Variables
Next, we create a private static variable class.

```java
// Class Variables
public class Java_GUI implements ActionListener {
	private static JLabel password1, label;
	private static JTextField username;
	private static JButton button;
	private static JPasswordField Password;
```
*Note*
We implement an ActionListener that listens to an event. The action is attached to the button. The ActionLister is found in java.awt.event package. It has only one method **actionPerformed()**. The ActionEvent is triggered on button click.

#### Adding JPanel to the window
Next, we construct a JPanel container which will help in laying out components on the window. But before we can use JPanel we have to import its package.
```java
//creating a JPanel class
JPanel panel = new JPanel();
panel.setLayout(null);
```
From the snippet above, we instantiate the variable name as **panel** and set it to take the value of a new JPanel class. we set the layout to be a **null** value, meaning the layout should take the entire width and height of the screen.

#### Adding JFrame
Next, let's create a JFrame class that will contain all the components that we will see on the screen.
```java
 // JFrame class
 JFrame frame = new JFrame();
 frame.setTitle("LOGIN PAGE");
 frame.setLocation(new Point(500, 300));
 frame.add(panel);
 frame.setSize(new Dimension(400, 200));
 frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
```
Line 1: declaring and instantiating JFrame class
Line 2: Setting JFrame title name that will appear at the top of our frame.
Line 3: Positioning frame on the window, 500pixel from the left, 300pixel from the top of the screen.
Line 4: Declares the frame on the panel.
Line 5: Setting the size of the entire frame, 400pixel wide(width) and 200pixel long(height).
Line 6: This will end and close the process whenever the exit option is click.

#### Adding username label

Next, we instantiate the username label and position it 100pixel from the left of the frame, 8pixel from the top of the frame, 70pixel wide(width), 20pixel long(height).
```java
// Username label constructor
label = new JLabel("Username");
label.setBounds(100, 8, 70, 20);
panel.add(label);
```

#### Adding username textfield
Next, we instantaite the username textfield, 100pixel form the left, 27pixel from the top, 193pixel wide(width) and 28pixel long(height).
```java
// Username TextField constructor
username = new JTextField();
username.setBounds(100, 27, 193, 28);
panel.add(username);
```
#### Adding psssword label
Let's position the password label at 100pixel from the left, 55pixel from the top, 70pixel wide(width) and 20pixel long(height).
```java
// Password Label constructor
password1 = new JLabel("Password");
password1.setBounds(100, 55, 70, 20);
panel.add(password1);
```
#### Adding password textfield
Next is the password text field, positioned at 100pixel from the left, 75pixel from the top, 193pixel wide(width) and 28pixel long(height).
```java
// Password TextField
Password = new JPasswordField();
Password.setBounds(100, 75, 193, 28);
panel.add(Password);
```
####Adding button
```java
// Button constructor
 button = new JButton("Login");
 button.setBounds(100, 110, 90, 25);
 button.setForeground(Color.WHITE);
 button.setBackground(Color.BLACK);
 button.addActionListener((ActionListener) new Java_GUI());
 panel.add(button);
```
Line 5: This will invoke an action on button click.

#### Authentication
Finally, we are creating an authentication method. The method will invoke when we click the login button.

```java
// Imlementing an action event listener class with conditional statement
@Override
public void actionPerformed(ActionEvent e) {
String Username = username.getText();
String Password1 = Password.getText();

if(Username.equals("section.io") && Password1.equals("123")) {
	JOptionPane.showMessageDialog(null, "Login Successful");
}else {
	JOptionPane.showMessageDialog(null, "Username or Password mismatch ");
		}
	}
```

### Conclusion

So far we have learned how to design a simple user login page from scratch with the help of java GUI packages. we also learned how to create an authentication method using and display a message dialogbox. `JOptionPane.showMessageDialog();` class. JOption pane are another components of Java GUI, it comes handy when displaying either a warning, message on the screen that contains messages to the user.

[Further reading](http://docs.oracle.com/javase/tutorial/uiswing/index.html)
