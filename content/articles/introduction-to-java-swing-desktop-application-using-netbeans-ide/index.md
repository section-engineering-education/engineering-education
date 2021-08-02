### Introduction
Java Swing is part of Java Foundation Classes. It is used to create window-based applications which makes it suitable for developing lightweight desktop applications. Java Swing is built on top of an abstract windowing toolkit API purely written in Java programming language. 

Java Swing provides lightweight and platform-independent components, making it suitable and efficient in designing and developing desktop-based applications (systems).

### Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Differences between Java Swing and Java AWT](#differences-between-java-swing-and-java-awt)
- [Common Swing Components for Desktop Application-GUI](#common-swing-components-for-desktop-application-gui)
- [Getting Started with Java Swing desktop application in NetBeans-Sample Application](#getting-started-with-java-swing-desktop-application-in-netbeans-sample-application)
- [Conclusion](#conclusion)

### Prerequisites
- [NetBeans](https://netbeans.apache.org/download/nb122/nb122.html) installed
- [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) installed
- Basic knowledge of Java programming language

### Differences between Java Swing and Java AWT
Both Java Swing and Java Abstract Window Toolkit (AWT) are used to design graphical user interfaces in Java programming language. However, they have differences that would make one suitable over the other; depending on what one wants to achieve.

Some of the differences are;
-  Java AWT has a set of functions and procedures that create applications that can access features or information (data) of the Operating system, other applications, or even services. Java AWT is an Application Programming Interface framework (API) that develops a Java graphical user interface. On the other hand, Java Swing is formed from Java Foundation Classes, making it suitable for creating independent applications.
- Java AWT components are heavy since they interact with the Operating system. On the other hand, Java Swing's components are lightweight and powerful, hence has more functionality compared to Java AWT.
- AApplications done in Java Swing are faster and more efficient compared to those done in Java AWT. Swing has less execution time compared to AWT, and Swing components are lightweight.
- Java AWT is kind of an API framework which makes it platform-dependent since its components depend on the platform. On the other hand, Swing components do not depend on the platform. Hence, Swing is platform-independent.

### Common Swing components for desktop application (GUI)
As discussed earlier, Swing is used in creating window-based applications. Swing components are contained in the `javax.swing` package. 

Java Swing Components are essential building elements (blocks) for designing, developing, and implementing an application. These components form the Swing Graphical User Interface widget toolkit for the Java programming language. In NetBeans IDE, components are found under the palette. Java Swing components provide an interactive experience with the application.

In this article, we will look at a few commonly used Swing components used in desktop application development;

These include;
1. JFrame
2. JLabel
3. JTextField
4. JButton

Others Include: JPanel, JComboBox, JRadioButton, JCheckBox, JTable, JList, JFileChose, JTextArea, ImageIcon

#### JFrame
JFrame is the very first component in the Java Swing Component hierarchy. It can be created in two ways:

1. By creating an object of the Frame class - i.e. creation through association.
Example:

``` java
import javax.swing.JFrame;
public class Main {
 
	public static void main(String[] args) {
 
            JFrame sectionFrame = new JFrame();
            sectionFrame.setSize(600, 600);//600 width & 600 height  
            sectionFrame.setLayout(null);//no layout managers  
            sectionFrame.setVisible(true);//frame visible 
            	
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
JLabel is a component which displays a readable text or an image in the Swing Container User interface. The application user cannot edit the text rendered in the JLabel. However, the application itself, through action events, can change the text. JLabel component can display both plain and HTML text.

Example:

``` java
JLabel labelName=new JLabel("Name");
```

![jlabel](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/jlabel.png)

#### JTextField
It is a swing component that allows users to input one line of text. `JTextField` inherits from the `JTextComponent` class of `javax.swing` Library.

Example declaration:

``` java
JTextField sectionTextField=new JTextField(20);
```

![jtextfield](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/jtext.png)
 
 For `JTextField` to be accessible and editable, `enable` property must be set to true. `JTextField` can be initialized by calling the `JTextField` constructor and passing a parameter of integer type. The integer parameter passed in the constructor does not limit the number of characters a user can key in the text field box. However, it sets the width of the text field box; i.e. the number of columns to be assigned to it.

#### JButton
`JButton` is one of the swing components which gives swing the property of platform independence. This component creates a click effect on the application's user interface. It is implemented in an application by calling any of its class constructors. Clicking or double clicking on it results in retrieving data from databases and displaying them on the UI or collecting user's data on UI and storing/saving them into a database. `JButton` in most applications contains text or image which communicates to the user what the button does. 

Example Declaration: 

``` java
JButton submitButton=new JButton("Submit");
```

![jbutton](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/jbutton.png)

### Getting Started with Java Swing desktop application in NetBeans-Sample application
NetBeans is an IDE for developing applications using different languages. Java programming language is one of those many languages which NetBeans supports. NetBeans is the best IDE for building desktop applications using swing since it provides a user-friendly interface for designing and coding the UI. It has inbuilt libraries for swing, which auto-populate code. The inbuilt libraries in NetBeans provide a palette section in the IDE when creating a swing application, making it easier to drag and drop and components for designing an application.

Let's make a sample Swing application that shows the above components. It is a simple application that collects customer personal information.

1. Start NetBeans IDE click on File-> New Project.

![netbeans start](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-startpage.png)

2. Chose Java and the Java Application in the project windows, then click next.

![netbeans project](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-project.png)

3. Leave the project location as default and name our project as *sectionSampleSwingGUI*. If you need to create the main Class, tick `create mainclass` checkbox and  to create dedicated folder for libraries check on ` Use dedicated Folder for Storing Libraries` checkbox. In our case, will we tick both of these. click finish and wait just a few seconds for the project to set up.

![netbeans add project](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-add.png)

4. Right-click on the project and select new, then chose `JFrame` Form; this will form our main class and the main window.

![netbeans jframe](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-jframe.png)

5. In the next step, name the class *sectionHomeWindow*, chose the package created when creating the project, i.e. *sectionsampleswinggui*, then click finish.  

![jframe name](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-jframename.png)

Our Window (Form) has been created. This forms the main component where other swing components will reside.

![jframe form](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-jform.png)

6. We will now drag the components discussed earlier in this article and place them inside the `JFrame` before running our application to see how it looks. To run the application, click on the Run button in the IDE and click the Run project menu bar.

![project run](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-run.png)

![desktop app](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-desktopapp.png)


### Conclusion
Java Swing is very easy to use. Being platform-independent and lightweight, its applications are significantly faster and reliable. NetBeans IDE provides a simple, friendly GUI to drag and drop Swing components effortlessly, thereby making the design of an application very easy.  

From this article, we have learned the following:
1. Differences between Java swing and Java AWT.
2. Java Swing components commonly used in desktop application development.
3. Sample design of a simple desktop application using NetBeans IDE.

The code snippets used in this guide can be accessed at my [GitHub Repo](https://github.com/JosephAyoma/Java-swing-for-Desktop-application).
