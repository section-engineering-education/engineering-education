---
layout: engineering-education
status: publish
published: true
url: /applet-programming-in-java/
title: How to Build Applet programs in Java
description: In this tutorial, we will learn how to create Applet applications in Java and host them on a web page. Applets allow developers to add more features to a web application.
author: paul-mwangi
date: 2021-06-09T00:00:00-15:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/applet-programming-in-java/hero.jpg
    alt: Applet programming in Java
---
An Applet is a small Java program that adds functionality to another application. To run an Applet program, you require an Applet viewer or a web browser that supports Java.
<!--more-->
### Applet definition
An Applet performs many functions including arithmetic operations, playing sounds, accepting user input, and displaying graphics. A webpage can therefore be comprised of text, static images, videos, and Java Applets. 

An Applet program can display images, graphics, as well as play sounds.

> To display a Java Applet program on a web page, it needs to be linked to an HTML program.

### Prerequisites
To follow along with this tutorial, you'll need to have some knowledge of Java and HTML.

### Types of Applets
Applets are categorized based on how they are embedded in a web page, i.e. local and remote Applets.

`Local Applets` are developed and stored locally. They do not require an internet connection to be located, simply because the directory is in the local system.

`Remote Applets` are stored in a remote computer. You need an internet connection to access them.

The `URL` address specified in the Applet’s `HTML` document as the `CODEBASE` is used to locate and load a remote Applet:

```bash
CODEBASE= http://www.netserve.com/applets
```

### Helloworld Applet
To write and run an Applet program, you need to install an Applet viewer or a browser that supports java.

The following is an example of a Java Applet:

```Java
Import Java.awt.*
Import Java.applet.*

Public class Hellojava extends Applet {
    
        public void paint (graphics g) {
               g.drawstring (“Hello world”,25,50);
                /*the code is used to display hello world*/
           }

 }
```

### Lifecycle of an Applet
There are five primary stages to follow to create an applet as stated below:

1. **INIT** - This is the initialization state in an Applet. The `init` state is called after the `parameter` tags.
2. **START/RUNNING** - This takes place shortly after the Applet is initialized or when it was in an `idle` state. We can call the `start` state more than once.
3. **IDLE/STOPPED** - This occurs when the Applet has stopped. It happens when you close the page where the Applet was running or when you call the `stop()` function explicitly.
4. **DEAD/DESTROYED** - It occurs once you quit the web browser from which an Applet was running or by invoking the `destroy()` method.
5. **DISPLAY/ PAINT** - In this stage, the application is displayed to the user. It is invoked by the `start()` method.

### Differences between an Applet and a Java application 
An applet is not a fully-featured application. 

The differences between Applets and Java programs are:
- An Applet does not use the `main()` method to start its code execution.
- Local files in a computer cannot be accessed by an Applet.
- An Applet follows strict rules to enhance system security.
- To view an Applet you need a JVM (Java virtual machine).
- Applets can not run independently and are included inside a web page using HTML tags.
- Applets may not use libraries from other languages.

### Converting a Java application to an Applet
A graphical Java application that uses `Abstract Windows Toolkit` (AWT), and one that opens with the `Java program` launcher can be easily converted into an Applet and loaded into a web page. 

To do so, we follow the steps below:
1. Create an HTML page with specific tasks to include an Applet code.
2. Introduce a public class of the JApplet class. Making the class public allows the Applet to be loaded to the HTML page.
3. Remove the primary method from the application to be converted.
4. Move the initialization code from the frame window to the initialization state of the Applet.
5. Set the Applet's width and height in the HTML file.
6. Remove the `set title` attribute since it is not required by Applets.
7. Since the display of an Applet happens automatically, we may ignore the `set visible` attribute.

### Invoking an Applet
An Applet is invoked by embedding its directive to the HTML file.

We view an HTML file through a Java-enabled browser or an applet-viewer. Then, we use the `<applet> </applet>` tags to embed an Applet in HTML. 

The `<applet>` tag specifies the Applet that needs to run. The width and height are also included to specify the panel size on which an applet should run. The `</applet>` tag closes the applet directives in the HTML file. 

> Note that incompatible browsers do not process information contained inside the `<applet> </applet>` tag.

To invoke an applet:

```Java
    Import Java.awt.*

        Import Java.applet.*

        Public class Myinstitution extends Applet{

           public void paint (graphics g) /*in drawing the applet output we use the paint() which includes the graphics parameter describing the graphics environment on which an applet runs*/

           {

               g.drawstring (“My institution is one of the best”, 320,120);
                /*the code displays my institution is one of the best*/
           }

        }
```

Below is how you invoke the `Myinstitution` Applet:

```html
    <html>

    <title> My institution applet </title>

        <hr>

        <applet code = “Myinstitutionapplet.class” width = “320” height = “120”>

        </applet>

        <hr>

    </html>
```

### Conclusion
In this tutorial, we have defined an Applet as a small Java application that runs in the browser. We have also discussed both remote and local Applets. 

The tutorial has also shown you how to write Applet programs and include them in a browser. Therefore, you can use this knowledge to craft more powerful applications.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)
