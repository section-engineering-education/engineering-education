### How to create a user login page using Java GUI

### Introduction

Java is an Object-Oriented Programming Language. G.U.I stands for Graphical User Interface. GUIs are made up of objects and classes that can interact with each other. GUIs are said to be `Event Driven` programs. this means that GUIs depends on series of object events that can occur at any given time.

### Goals

In this tutorial, we will learn how to design a simple user login page. At the end of this tutorial, the reader will be able to design the user login page below.

![Login page](/how-to-create-a-user-login-page-using-java-gui/loginPage.png)

### Prerequisites

1. Basic Understanding of Java and Java GUIs.
2. [JDK version 16 or higher](www.oracle.org).
3. Java compiler of your choice ( Recommended: [Eclipse](www.eclipse.org) )

### Setup procedure

Open eclipse, click on File, select New, then select Class, name your class by Java naming convention.
If done properly you will have a window like this with the given class name, in this tutorial we name our class Java_GUI.

![java gui](/how-to-create-a-user-login-page-using-java-gui/java_gUI.png)
**NOTE:** We will import `javax.swing.*;`,`import java.awt.event.*;` this will cover the rest of our java swing extension classes and event package.

#### Variables
Now let's create our private static variables class and also set it to implements an action whenever the button is click.

```java
public class Java_GUI implements ActionListener {

	private static JLabel password1, label;
	private static JTextField username;
	private static JButton button;
	private static JCheckBox checkbox;
	private static JPasswordField Password;
```
#### JPanel
Next, we create a JPanel container which will help in laying out components on the window. But before we can use JPanel we have to import its package.

```java
//creating a JPanel class
JPanel panel = new JPanel();
panel.setLayout(null);
```

#### JFrame

Now let's import the JFrame extension package and create a JFrame class that will contain all the components that we will see on the window.

```java
 // JFrame class
1 JFrame frame = new JFrame();
2 frame.setTitle("LOGIN PAGE");
3 frame.setLocation(new Point(500, 300));
4 frame.add(panel);
5 frame.setSize(new Dimension(400, 200));
6 frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
```
Line 1: declaring and instantiating JFrame
Line 2: Setting JFrame title name that will appear at the top of our frame.
Line 3: Declaring and positioning the frame on the window, 500pixel from the left, 300pixel from the top of the screen.
Line 4: Declares the frame on the panel.
Line 5: Setting the size of the entire frame, 400pixel wide(width) and 200pixel long(height).
Line 6: This will end and close the process whenever the exit option is click.

#### Username Label
Next, we instantiate the username label and position it 100pixel from the left of the frame, 8pixel from the top of the frame, 70pixel wide(width), 20pixel long(height).

```java
// Username label
1 label = new JLabel("Username");
2 label.setBounds(100, 8, 70, 20);
panel.add(label);
```
#### Username Textfield
Next, we instantaite the username textfield, 100pixel form the left, 27pixel from the top, 193pixel wide(width) and 28pixel long(height).

```java
// Username TextField container
username = new JTextField();
username.setBounds(100, 27, 193, 28);
panel.add(username);
```
#### Password Label
Moving to the next item is the password label positioned at 100pixel from the left, 55pixel from the top, 70pixel wide(width) and 20pixel long(height).
```java
// Password Label
password1 = new JLabel("Password");
password1.setBounds(100, 55, 70, 20);
panel.add(password1);
```
#### Password Textfield
Next is the password text field, positioned at 100pixel from the left, 75pixel from the top, 193pixel wide(width) and 28pixel long(height).

```java
// Password TextField container
Password = new JPasswordField();
Password.setBounds(100, 75, 193, 28);
panel.add(Password);
```
#### Button

```java
// Button container
1 button = new JButton("Login");
2 button.setBounds(100, 110, 90, 25);
3 button.setForeground(Color.WHITE);
4 button.setBackground(Color.BLACK);
5 button.addActionListener((ActionListener) new Java_GUI());
6 panel.add(button);
```
Line 5: This will invoke an action whenever our login button is clicked.

#### Authentication
Finally, we are going to create an authentication method that will be invoke when we click the login button.

```java
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
**NOTE:** In the above block of code, we specify the username to section.io and password to 123.
### Conclusion

So far we have learned how to design a simple user login page from scratch with the help of java GUI packages. we also learned how to create an authentication method using `JOptionPane.showMessageDialog();` class.