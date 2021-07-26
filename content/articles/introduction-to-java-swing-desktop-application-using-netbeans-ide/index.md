### Introduction
Java Swing is part of Java Foundation Classes, and it is used to create a window-based application that makes it suitable for developing desktop applications that could be lightweight. Java Swing is built on top of an abstract windowing toolkit API purely written in Java programming language. 

Java Swing-Java Programming language provides very lightweight components and platform-independent components, making it suitable and efficient in designing and developing desktop-based applications (systems).

### Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Differences between Java Swing and Java AWT](#differences-between-java-swing-and-java-awt)
- [Common Swing Components for Desktop Application-GUI](#common-swing-components-for-desktop-application-gui)
- [Getting Started with Java Swing desktop application in NetBeans-Sample Application](#getting-started-with-java-swing-desktop-application-in-netbeans-sample-application)
- [Conclusion](#conclusion)

### Prerequisites
- NetBeans installed
- JDK installed
- Basic knowledge of Java programming language

### Differences between Java Swing and Java AWT
Both Java Swing and Java Abstract Window Toolkit (AWT) are used to design a graphical user interface in Java programming language; however, they have differences that would make the other suitable over another depending on what one wants to achieve.

Some of the differences include;
- Java AWT has a set of functions and procedures that creates an application that can access the features or the information (data) of the Operating system, other applications, or even services. Java AWT is an Application Programming Interface framework (API) that develops a Java graphical user interface. On the other hand, Java Swing is formed from Java Foundation Classes, making it suitable to create a very independent application.
- Since Java AWT interacts with the Operating system, this makes its component very heavy. Unlike Java Swing, whose components are lightweight, Java swing has more functionality than Java AWT since its components are powerful.
- Applications done in Java Swing are very fast and efficient compared to those done in Java AWT; Swing has less execution time than AWT, and Swing components are lightweight.
- Java AWT is a kind of API framework, and this makes it platform-dependent since its components are dependent on the platform. In contrast, Swing components are not dependent on the platform. Hence, Swing is platform-independent. 

### Common Swing Components for Desktop Application (GUI)
As discussed earlier in the introduction of this article, Swing is used in creating a window-based application. The Swing components are contained in the j*avax.swing* package, which has the classes for the java components. 

Java Swing Components are the essential building elements (blocks) for designing, developing, and implementing an application. These components form the Swing Graphical User Interface widget toolkit for the Java programming language. In NetBeans IDE, they are found under the palette. Java Swing components provide an interactive experience with the application.

In this article, we will look at a few commonly used Swing components used in desktop application development;

These include;
1. JFrame
2. JLabel
3. JTextField
4. JButton

Others Include; JPanel, JComboBox, JRadioButton, JCheckBox, JTable, JList, JFileChose, JTextArea, ImageIcon

#### JFrame
JFrame is the very first component in the Java Swing Component hierarchy under the container Swing components. It can be created mainly through two ways;

1. Through object creation of the Frame class-i.e. creation through association
Example;

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

2. Through extending the Frame class, i.e., OOP creation through class inheritance 
Example;

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
JLabel component is an object component whose class displays a readable text or an image in the Swing Container User interface. The application user cannot change the text (edit) rendered in the JLabel however, the application itself, through action events, can change the text. The JLabel methods to display the text can allow both plain text and HTML texts rendered in the UI as plain text.

Example;

``` java
JLabel labelName=new JLabel("Name");
```

![jlabel](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/jlabel.png)

#### JTextField
It is a text swing component that allows users to input one line of text. JTextField inherits from the JTextComponent class of javax.swing Library

Example declaration;

``` java
JTextField sectionTextField=new JTextField(20);
```

![jtextfield](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/jtext.png)
 
 For JTextField to be accessible and editable, enable property must be set to true. Text field can be initialized by calling the JTextField constructor and passing a parameter of integer type. The integer parameter type passed in the constructor does limit the number of characters a user and key in the text field box, but it sets the width of the text field box in the number of columns to be assigned to it.

#### JButton
JButton is one of the swing components which gives swing the property of platform independence. JButton gives this implementation. This component creates a push (On click) effect on the application user interface, resulting in some action behind the code on it. It is implemented in any application by calling any of its class constructors. The click or double click push on it results in retrieving the data from databases and displaying them on the UI or collecting the user's data on UI and storing/saving them into the database. JButton in most applications contains text or image display which communicates to the user what the button does. 

Example Declaration; 

``` java
JButton submitButton=new JButton("Submit");
```

![jbutton](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/jbutton.png)

### Getting Started with Java Swing desktop application in NetBeans-Sample Application
NetBeans- is an IDE for developing an application in different languages. Java programming language of one of those many languages which it supports. NetBeans is the best Swing desktop application developing IDE since it provides a user-friendly interface for designing and coding UI. It has inbuilt libraries for swing, which auto-populate codes. The inbuilt libraries in NetBeans provide a palette section of the IDE when creating a swing application, making it easier to drag and drop and components for designing an application.

Getting Started; Sample Code- We will make a sample Swing Application, showing us the above components. It is a simple application that collects customer personal information.

1. Start NetBeans IDE click on File-New Project.

![netbeans start](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-startpage.png)

2. Chose Java and the Java Application in the project windows, then click next.

![netbeans project](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-project.png)

3. Leave the location as default, and we will name our Sample *sectionSampleSwingGUI* to check on creating the main Class if you need to create a main class and check on Use dedicated Folder for Storing Libraries. In our case, will we check both of these. click finish and wait just a few seconds for the project to set up.

![netbeans add project](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-add.png)

4. Right-click on the project and select new, the chose JFrame Form; this will form our main class and the main window.

![netbeans jframe](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-jframe.png)

5. In the next step, give the name of the class, *sectionHomeWindow* for our case, chose the package created when creating the project, i.e., *sectionsampleswinggui,* then click finish. 

![jframe name](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-jframename.png)

Our Window (Form) has been created, and this will form the main component where other swing components will reside.

![jframe form](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-jform.png)

6. We will now drag and drop the components discussed earlier in this article and place them inside the JFrame and run our application (project) to see how it will look. To run the application, click on the Run button in the IDE and click the Run project menu bar.

![project run](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-run.png)

![desktop app](/engineering-education/introduction-to-java-swing-desktop-application-using-netbeans-ide/netbeans-desktopapp.png)


### Conclusion
Java Swing is very easy to use in developing a desktop application; been platform-independent and lightweight, its applications are significantly faster and reliable. NetBeans IDE provides a simple, friendly GUI to drag and drop Swing components effortlessly, thereby making the design of an application very easy.  

From this article, we have learned the following;
1. Differences between Java swing and Java AWT
2. Java Swing Basic components commonly used in desktop application development
3. Sample design  of  a simple desktop application using NetBeans IDE

The code snippets used in this guide can be accessed at [GitHub Repo](https://github.com/JosephAyoma/Java-swing-for-Desktop-application).
