### Prerequisites
Before learning this tutorial as a learner you need to have learned java. Know some basic java concepts and know how to compile and run java programs. HTML basics are also needed before learning this tutorial.
### Applet definition

Applet are small java program that are primarily used in internet programming. To run an applet program, you require an applet viewer or a web browser that supports java.

An applet performs many functions like any application program, which includes performing arithmetic operations, playing sounds, accepts inputs from the user and displaying graphics. A webpage can comprise texts static images and also the java applets. When an applet program runs in a web page it can display moving images, produce sounds, and produce graphics.

To display a java applet program in a web page it needs to be linked to a HTML program.

### Types of applets

Applets are categorized based on how they embed into a web page i.e. Local and Remote applets

Local applets-is a locally developed and stored applet. A local applet does not need to use an internet connection to be located simply because the directory is in the local system.

Remote applet-is an applet stored in a remote computer that is connected to the internet. We downloaded it from the internet into our system and run it.


### Preparing to write an applet

To write and run an applet program, you need to have installed an applet viewer or a browser that supports java.

1.  To build an applet code  .java

2.  To create an executable applet .class

3.  To design a HTML webpage.

4.  Adding the <applet> </applet> tags to the HTML code.

5.  Create a HTML file.

6.  The applet code is tested using browsers that supports java or an applet viewer.

### Helloworld applet

The following is a hello world applet named Hellojava.Java
```java

        Import Java.awt.*

        Import Java.applet.*

        Public class Hellojava extends Applet

        {

           public void paint (graphics g) 

           {

               g.drawstring (“Hello world”,25,50);

           }

        }
```
### Life cycle of an applet

There are five primary stages to follow to create an applet as stated below:

1.  **INIT**- this is the initialization state in an applet. The init state is called after the parameter tags in the applet tag.

2.  **START/ RUNNING**-this takes place shortly after the applet initialization happens or when the applet was in the idle state. We can call the start state more than once.

3.  **IDLE/ STOPPED**- this result once the applet has stopped running and a halt in the running of an applet may occur once you quit the page where the applet is currently running or when you call the stop () explicitly.

4. **DEAD/ DESTOYED**- this occurs once you quit the web browser from which an applet was running as he applet is shielded in a HTML page or by invoking destroy ()

5.  **DISPLAY/ PAINT**- this occurs once the output operations are to be performed on the screen. it is invoked once the applet once to repaint itself or after the start state start ().

### Differences between an applet and a java stand alone application 

Applets and standalone applications are java programs but they still differ because an applet completes slight tasks in the internet. An applet is not a full featured application. The differences are as stated.

•   An applet does not use the main () method to start its code execution.

•   Local files in a computer cannot be read by an applet.

•   An applet follows strict rules that include restrictions and limitations to enhance security of the systems.

•   To view an applet you need a JVM java virtual machine.

•   Applets cannot be run independently and are therefore run inside a web page using HTML tags, unlike the standalone application that is run independently.

•   Applet may not use libraries from other languages.

### Conversion of java application to applet

A graphical java application that uses Abstract Windows Toolkit (AWT)and one that opens with the java program launcher can be easily converted into an applet and loaded into a web page in conversion of an application to an application to an applet we follow the steps below:

1.  Create a HTML page with specific tasks to include an applet code.

2.  Introduce a public class of the Japplet class. Making the class public allows the applet to be loaded to the HTML page.

3.  Remove the primary method from the application to be converted.

4.  Move an initialization code from the frame window to the initialization state of the applet.

5.  Carry out the elimination of the call set size in the applet's sizing through parameters width and height in the HTML file.

6.  Remove the call set size tittle as the applet does not have tittle basis.

7.  A call set visible (true)should not be invoked, since the display of an applet happens automatically.

### Invoking an applet

An applet is invoked into a HTML file through embedding its directive to the HTML file.

We view a HTML file through a java-enabled browser or an applet-viewer the basis of embedding an applet in a HTML file is usually the <applet> </applet> tags. The <applet> tag specifies the applet that needs to run . the parameters of width and height are also included to specify the panel size on which an applet should run. The </applet> tag closes the applet directives in the HTML file. Any browser that is not java enabled does not process information contained between the tags <applet> </applet> but processes other information not contained in the applet tags and not related to the applet.

How to invoke an applet.
```java
    Import Java.awt.*

        Import Java.applet.*

        Public class Myinstitution extends Applet

        {

           public void paint (graphics g) 

           {

               g.drawstring (“My institution is one of the best”, 320,120);

           }

        }
```
Below is how you invoke “My institution” applet .
```html
    <html>

    <tittle> My institution applet </tittle>

    <hr>

    <applet code = “Myinstitutionapplet.class” width = “320” height = “120”>

    </applet>

    <hr>

    </html>
```






