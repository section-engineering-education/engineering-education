---
layout: engineering-education
status: publish
published: true
url: /introduction-to-java-swing/
title: Introduction to Java Swing
description: This article takes the reader through creating desktop using Java Swing. Java Swing is used to create window-based applications which makes it suitable for developing lightweight desktop applications.
author: ayoma-joseph
date: 2021-08-03T00:00:00-06:53
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-java-swing/hero.jpg
    alt: Introduction to Java Swing Hero Image
---
Java Swing is part of Java Foundation Classes. It is used to create window-based applications which makes it suitable for developing lightweight desktop applications.
<!--more-->
Java Swing is built on top of an abstract windowing toolkit API purely written in Java programming language.

Java Swing provides lightweight and platform-independent components, making it suitable and efficient in designing and developing desktop-based applications (systems).

### Table of contents
- [Prerequisites](#prerequisites)
- [Differences between Java Swing and Java AWT](#differences-between-java-swing-and-java-awt)
- [Common Swing components for desktop application-GUI](#common-swing-components-for-desktop-application-gui)
- [Getting started with Java Swing desktop application in NetBeans](#getting-started-with-java-swing-desktop-application-in-netbeans)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this article, you will need to have:
- [NetBeans](https://netbeans.apache.org/download/nb122/nb122.html) installed
- [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) installed
- Basic knowledge of Java programming language

### Differences between Java Swing and Java AWT
Both Java Swing and Java Abstract Window Toolkit (AWT) are used to design graphical user interfaces using Java.

However, they have differences that would make one suitable over the other; depending on what one wants to achieve.

Some of the differences are:

- Java AWT has a set of functions and procedures that create applications that can access features or information of the Operating system, other applications, or even services. Java AWT is an Application Programming Interface (API) that develops Java graphical user interfaces. On the other hand, Java Swing is formed from Java Foundation Classes, making it suitable for creating independent applications.
- Java AWT components are heavy since they interact with the Operating System. On the other hand, Java Swing's components are lightweight and powerful, hence has more functionality compared to Java AWT.
- Applications done in Java Swing are faster and more efficient compared to those done in Java AWT. Swing has less execution time compared to AWT.
- Java AWT is an API framework which makes it platform-dependent since its components depend on the platform. On the other hand, Swing components do not depend on the platform. Hence Swing is platform-independent.

### Common Swing components for desktop application (GUI)
As discussed earlier, Swing is used in creating window-based applications. Swing components are contained in the `javax.swing` package.

Java Swing Components are essential building blocks for designing, developing, and implementing an application. These components form the Swing Graphical User Interface widget toolkit for Java programming language.

In NetBeans IDE, components are found under the palette. Java Swing components provide an interactive experience with the application.

In this article, we will look at a few Swing components commonly used in desktop application development.

These include:

- JFrame
- JLabel
- JTextField
- JButton

Others Include: `JPanel`, `JComboBox`, `JRadioButton`, `JCheckBox`, `JTable`, `JList`, `JFileChose`, `JTextArea`, `ImageIcon`.

#### JFrame
`JFrame` is the very first component in the Java Swing Component hierarchy. It can be created in two ways:

1. By creating an object of the Frame class. That is, creation through association.

Example:

```java
import javax.swing.JFrame;
public class Main {
	public static void main(String[] args) {
            JFrame sectionFrame = new JFrame();
            sectionFrame.setSize(600, 600); // 600 width & 600 height
            sectionFrame.setLayout(null); // no layout managers
            sectionFrame.setVisible(true); // frame visible
	}
}
```

2.  By extending the Frame class. That is, OOP creation through class inheritance.

Example:

```java
import javax.swing.JFrame;
public class sectionHomeWindow extends JFrame {
    /**
     * Creates new form sectionHomeWindow
     */
    public sectionHomeWindow() {

    }
}
```

#### JLabel
`JLabel` is a component which displays a readable text or an image in the Swing Container User interface. The application user cannot edit the text rendered in the `JLabel`.

However, the application itself, through action events, can change the text. `JLabel` component can display both plain and HTML text.

Example:

```java
JLabel labelName = new JLabel("Name");
```

![JLabel](/engineering-education/introduction-to-java-swing/jlabel.png)

#### JTextField
`JTextField` is a swing component that allows users to input one line of text. `JTextField` inherits from the `JTextComponent` class of `javax.swing` Library.

Example:

```java
JTextField sectionTextField = new JTextField(20);
```

![JTextField](/engineering-education/introduction-to-java-swing/jtext.png)

For `JTextField` to be accessible and editable, `enable` property must be set to true. `JTextField` can be initialized by calling the `JTextField` constructor and passing a parameter of integer type.

The integer parameter passed in the constructor does not limit the number of characters a user can key in the text field. However, it sets the width of the text field box; i.e. the number of columns to be assigned to it.

#### JButton
`JButton` is one of the swing components which gives swing the property of platform independence. This component creates a click effect on the application's user interface. It is implemented in an application by calling any of its class constructors.

Clicking or double clicking on it results in retrieving data from databases and displaying them on the UI, or collecting user's data on UI and storing/saving them into a database.

`JButton` in most applications contains text or an image which communicates to the user what the button does.

Example:

```java
JButton submitButton = new JButton("Submit");
```

![JButton](/engineering-education/introduction-to-java-swing/jbutton.png)

### Getting started with Java Swing desktop application in NetBeans
NetBeans is an IDE for developing applications using different languages. Java programming language is one of those many languages which NetBeans supports.

NetBeans is the best IDE for building desktop applications using swing since it provides a user-friendly interface for designing and coding the UI. It has inbuilt libraries for swing which auto-populate code.

The in=built libraries in NetBeans provide a palette section in the IDE when creating a swing application. This makes it easier to drag and drop and components when designing an application.

Let's make a sample Swing application that shows the above components. It is a simple application that collects customer personal information.

1. Start NetBeans IDE, click on File -> New Project.

![NetBeans start](/engineering-education/introduction-to-java-swing/netbeans-startpage.png)

2. Chose Java and Java Application in the project window then click next.

![NetBeans project](/engineering-education/introduction-to-java-swing/netbeans-project.png)

3. Leave the project location as default and name the project as _sectionSampleSwingGUI_. If you need to create the main Class, tick `create mainclass` checkbox and check on `Use dedicated Folder for Storing Libraries` checkbox to create a dedicated folder for libraries. In our case, we will check both checkboxes. Click finish and wait for the project to set up.

![NetBeans add project](/engineering-education/introduction-to-java-swing/netbeans-add.png)

4. Right-click on the project and select new, then chose `JFrame` Form. This will form our main class and the main window.

![NetBeans jframe](/engineering-education/introduction-to-java-swing/netbeans-jframe.png)

5. In the next step, name the class *sectionHomeWindow*. Choose the package created when creating the project, i.e. *sectionsampleswinggui*, then click finish.

![JFrame name](/engineering-education/introduction-to-java-swing/netbeans-jframename.png)

Our Window has been created. This forms the main component where other swing components will reside.

![JFrame form](/engineering-education/introduction-to-java-swing/netbeans-jform.png)

6. We will now drag the components discussed earlier in this article and place them inside the `JFrame`. We will then run our application to see how it looks. To run the application, click on the Run button in the IDE and click the Run project menu bar.

![Project run](/engineering-education/introduction-to-java-swing/netbeans-run.png)

![Desktop app](/engineering-education/introduction-to-java-swing/netbeans-desktopapp.png)

### Conclusion
Java Swing is very easy to use. Being platform-independent and lightweight, its applications are significantly faster and reliable.

NetBeans IDE provides a simple and friendly GUI to drag and drop Swing components effortlessly, thereby making the design of an application very easy.

From this article, we have learned the following:

1. Differences between Java swing and Java AWT.
2. Java Swing components commonly used in desktop application development.
3. Sample design of a simple desktop application using NetBeans IDE.

The code snippets used in this guide can be accessed at my [GitHub Repo](https://github.com/JosephAyoma/Java-swing-for-Desktop-application).

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
