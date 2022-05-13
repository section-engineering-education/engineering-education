---
layout: engineering-education
status: publish
published: true
url: /how-to-embed-compose-desktop-application-to-swing-based-application/
title: How to Embed a Compose for Desktop Applications in a Swing-Based Application
description: This tutorial will introduce the reader to Compose for Desktop and how to interop it with a Swing-Based Application.
author: kariuki-boniface
date: 2022-04-11T00:00:00-10:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-embed-compose-desktop-application-to-swing-based-application/hero.png
    alt: How to embed a Compose for Desktop application in a Swing-based application
---
Compose for Desktop is part of the Compose Multiplatform. With Compose Multiplatform one can share code between desktop applications, Android devices, and web applications.
<!-- more -->
In this tutorial, we will look at how to develop an app with Compose for Desktop and how it can interoperate with Swing. Additionally, we'll learn to integrate it with Swing components. 

### Prerequisites
To follow along with this tutorial, you will have to:
- Have installed the latest version of [IntelliJ IDEA](https://www.jetbrains.com/idea/download/#section=windows).
- Have an understanding of the [Kotlin](https://kotlinlang.org/) programming language.
- Have installed [JDK 11](https://www.oracle.com/java/technologies/downloads/) or higher.

### Goals
- Learn to set up a Compose for a Desktop project.
- Learn to use Compose for Desktop's features.
- Provide a quick recap of building Swing and desktop Compose applications.
- Using a ComposePanel to create UIs.
- Composing a CFD using a Swing component.

### Introduction
With Compose for Desktop, you can create UIs with Kotlin and handle events responsively. It increases the performance of web applications, reduces memory usage, and has made it easier for developers to iterate on features. It also requires no more XML or templating languages. This way, you can still use the Swing and AWT components together with the Composable functions to build a desktop UI. 

Now let's get started :)

### Creating a Compose for Desktop project
To create a Compose Desktop project, launch IntelliJ IDEA and click on *File*. Inside this menu, select *New* and select *Project*.

![create-project](/engineering-education/how-to-embed-compose-desktop-application-to-swing-based-application/create-compose-desktop-project-step1.png)

A new project window will open. Select *Kotlin*, name your project, specify the location. On the *Project Template* section, select *Compose Desktop Application*. 

![create-project](/engineering-education/how-to-embed-compose-desktop-application-to-swing-based-application/create-compose-desktop-project-step2.png)

### Compose for Desktop features
Some of the great features of Compose for Desktop are: 
- Interoperability between Swing and AWT.
- Code sharing with Android applications.
- [Skia](https://skia.org/docs/) hardware-accelerated rendering.

### Building Swing-based applications
Swing is a minimal GUI toolkit written in Java that includes a large number of widgets for creating optimal window-based applications. It is built upon Java AWT which was their initially platform-dependent GUI toolkit.

Let's have a look at how to create a Swing application. 
```kotlin
import java.awt.BorderLayout
import javax.swing.*

private fun main() {
    //Creates an empty window and set its size and defaultCloseOperation
    val frame = JFrame()
    frame.setSize(400, 600)
    frame.title = "Swing Application"
    frame.defaultCloseOperation = JFrame.EXIT_ON_CLOSE

    //Creates a Menu bar and adds menu items in the menu bar
    val menuBar = JMenuBar()
    val menu1 = JMenu("File")
    val menu2 = JMenu("Edit")
    val menu3 = JMenu("Selection")
    menuBar.add(menu1)
    menuBar.add(menu2)
    menuBar.add(menu3)

    //creates a JPanel and adds the label and button in it
    val pane = JPanel()
    val button = JButton("Click me")
    val label = JLabel("Click the Button")
    pane.add(button)
    pane.add(label)

    //setting up the menu bar and JPanel in the window using border layout
    frame.contentPane.add(BorderLayout.NORTH, menuBar)
    frame.contentPane.add(BorderLayout.CENTER, pane)
    frame.isVisible = true
}
```

The above class will produce this output.

![output](/engineering-education/how-to-embed-compose-desktop-application-to-swing-based-application/swing-app-output.png)

### Building a Compose for Desktop application
Compose for Desktop applications are built upon Composable functions to create the UI. This is purely done in the Kotlin programming language.

Let's also have a look at how a Compose for Desktop application is built.
```kotlin
import androidx.compose.material.MaterialTheme
import androidx.compose.desktop.ui.tooling.preview.Preview
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState

@Composable
@Preview
fun App() {
    MaterialTheme {
        Column (Modifier.fillMaxSize(), Arrangement.spacedBy(3.dp), Alignment.CenterHorizontally) {
            Button(onClick = {
                //Do something
            } ) {
                Text("Click me")
            }
            Text("Click the button")
        }
    }
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication,
        title = "Compose for Desktop ",
        state = rememberWindowState(width = 300.dp , height = 300.dp)
    ) {
        App()
    }
}
```

>NOTE: In the code above, we did not put the menu bar as we did in the Swing application.

This will provide the following output:

![output](/engineering-education/how-to-embed-compose-desktop-application-to-swing-based-application/compose-for-desktop-output.png)

### Swing and Compose for Desktop interoperability
Swing and Compose interoperate well together though there are few use cases and limitations. We will look at each one of them later in this article.

First, let's have a look at the advantages of interoperability:
- Its easier to migrate a Swing-based application to a Compose application.
- Allows you to extend Compose's functionality with Swing components that are not Compose equivalent.

### Interoperability uses cases
Keep in mind that before integration, Compose and Swing employ distinct techniques of showing content on the screen. Compose uses one Swing component to display its contents and has several component rendering levels. Swing on the other hand works with both robust and lightweight components.

One use case is when you want to include a Compose component in a Swing application. Swing will automatically view this component as one of its own. Compose uses a container called `ComposePanel` to keep and show all of its components. On the other hand, Swing uses the `SwingPanel` to keep and show its components. As a result, it's probably advisable to use a Swing-based approach instead of Compose components.

Let's have a look at when you can use `ComposePanel` or `SwingPanel` in your application.

#### ComposePanel use cases
- Whenever you would like to add an engaging rendering section to your app. This will be more simple and efficient to do with Compose.
- Whenever you wish to include animated objects or a grid of dynamic objects in your app. For instance, consider a toolbar with an animated emoticon reaction to events.
- Whenever you need to incorporate a complex display region, Compose is the way to go.
- Whenever you need to make a complex component of a Swing-based app easier to understand, go for Compose.

#### SwingPanel use cases
- When your app does not have complexity in layouts, menus, or other features like tooltips. 
- When adjusting the position of the Swing component, `SwingPanel` decreases the possibility of problems. This is because the position of a `SwingPanel` does not shift. 
- When the component you wish to utilize is only accessible in Swing and not in Compose.

### Using a ComposePanel in a Swing application
Let's show an example of how our code should look like when using a `ComposePanel`.

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Button
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.awt.ComposePanel
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import java.awt.BorderLayout
import javax.swing.JButton
import javax.swing.JFrame
import javax.swing.JFrame.setDefaultLookAndFeelDecorated
import javax.swing.SwingUtilities
import javax.swing.WindowConstants

fun main() = SwingUtilities.invokeLater {
    //Creates an empty window and set its size and defaultCloseOperation
    val jFrame = JFrame()
    setDefaultLookAndFeelDecorated(true)
    jFrame.defaultCloseOperation = WindowConstants.EXIT_ON_CLOSE
    jFrame.title = "Swing App"
    jFrame.isVisible = true
    jFrame.setSize(600, 600)

    /*creates a ComposePanel with JButtons and then
     adds them to the JFrame using border layout*/

    val panel = ComposePanel()
    jFrame.contentPane.add(panel, BorderLayout.CENTER)
    jFrame.contentPane.add(JButton("Swing Button 1"), BorderLayout.NORTH)
    jFrame.contentPane.add(JButton("Swing Button 2"), BorderLayout.EAST)
    jFrame.contentPane.add(JButton("Swing Button 3"), BorderLayout.WEST)

    //Set the content of the ComposePanel to the Compose elements defined in ComposeUI()
    panel.setContent { ComposeUI() }
}
@Composable
fun ComposeUI (){
    //Column defines how the components inside it will be arranged
    Column (
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        //Spacer creates an empty space of height 50.dp
        Spacer(modifier = Modifier.height(50.dp))
        Row {
            Surface(
                //Surface gives the components inside it a material background
                color = Color(200, 200, 200),
                modifier = Modifier.size(130.dp, 130.dp)
            ){
                Column {
                    Box(
                        modifier = Modifier.height(30.dp).fillMaxWidth(),
                        contentAlignment = Alignment.Center
                    ){
                        Text("Compose Button")
                    }
                    Spacer(modifier = Modifier.height(50.dp))
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier.height(30.dp).fillMaxWidth()
                    ){
                        Button(onClick = {}, shape = RoundedCornerShape(10.dp)){
                            Text("Button 1")
                        }
                    }
                }
            }
        }
    }
}
```

In the `main()` function, we created Swing components of the type `JFrame` and `JButton` which we added in a `ComposePanel`. `JFrame` will render the window and `ComposePanel` will act as the container to hold all the components used. 

From above, we can see how the two can work perfectly with each other.

Upon running this, the corresponding output will be:

![output](/engineering-education/how-to-embed-compose-desktop-application-to-swing-based-application/compose-swing-output.png)

It is worth noting the difference in the appearance of the Compose and Swing buttons. The Compose button is more appealing and better than the Swing button.

### Using a SwingPanel for CFD Composition
You can also use `SwingPanel` to hold Swing components inside a Compose application. Without further ado, let's see how this happens.

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.awt.SwingPanel
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.singleWindowApplication
import java.awt.Dimension
import javax.swing.BoxLayout
import javax.swing.JButton
import javax.swing.JPanel

fun main() = singleWindowApplication(title = "Compose Simple Application") {
    //Inside the window scope
    Column {

        //Align modifiers inside the box to specify where to place composable
        Box(modifier = Modifier.fillMaxWidth().height(60.dp).padding(top = 20.dp),
            contentAlignment = Alignment.TopCenter){
                Button( modifier = Modifier.size(200.dp, 40.dp), onClick = {}){
                    Text("Compose Button")
                }

        }
        Box(modifier = Modifier.fillMaxWidth().height(60.dp).padding(top = 20.dp),
            contentAlignment = Alignment.TopCenter){
            Button( modifier = Modifier.size(200.dp, 40.dp), onClick = {}){
                Text("Compose Button")
            }
        }
        Box(modifier = Modifier.fillMaxWidth().height(60.dp).padding(20.dp),
            contentAlignment = Alignment.Center){
            //Swing panel inside a composable
            SwingPanel(
                modifier = Modifier.size(200.dp, 40.dp),
                background = White,
                factory = {
                    //The block creating the Component to be composed.
                    val button = JButton("Swing Button")
                    button.preferredSize = Dimension(40,40)
                    val panel = JPanel()
                    panel.add(button, BoxLayout.X_AXIS)
                }
            )
        }
    }
}
```

The output of this program will be the following:

![output](/engineering-education/how-to-embed-compose-desktop-application-to-swing-based-application/compose-swing-output-2.png)

With this example you can now create a more complex and appealing UI using both Swing and Compose components.

### Conclusion
In this tutorial, we saw it is possible to use Swing components together with the Compose components. This makes it easier to migrate an existing Swing-based application to a Compose application.

Note that Compose components look much more appealing. By using these components, you can make your Swing application have a better interface. And remember, when constructing a desktop UI, always consider when it is best to use either `SwingPanel` or `ComposePanel`.

Hope you enjoyed this tutorial. Keep Composing. :)

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)
