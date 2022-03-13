### How to Embed Desktop Compose into a Swing-based application
Compose for Desktop is part of the Compose Multiplatform which was recently released. With Compose Multiplatform, it is possible for desktop applications, Android devices, and web applications to share code.

In this tutorial, we will introduce developing an app with Compose for Desktop and look at how it can interoperate with Swing. Additionally, we'll learn to integrate it with Swing components. 

### Prerequisites
To follow along with this tutorial, you will have to:
- Have installed the latest version of [Intellij IDEA](https://www.jetbrains.com/idea/download/#section=windows).
- Have an understanding of the [Kotlin](https://kotlinlang.org/) programming language.
- Have installed [JDK 11](https://www.oracle.com/java/technologies/downloads/) or higher

### Goals
- Learn to use Compose for Desktop's features
- Provide a quick recap of building Swing and desktop Compose applications
- Using a ComposePanel to create UIs
- Composing a CFD using a Swing component

### Introduction
With Compose for Desktop, you can create UIs with Kotlin and handle events responsively.
Using Compose for Desktop increases the performance of the web applications, reduces memory usage, and has made it easier for developers to iterate on features. Also, it requires no more XML or templating language. 
In this way, you can still use the Swing and AWT components together with the Composable functions to build a desktop UI. 

Now let's get started :)

### Compose for Desktop features
Some of the great features of Compose for Desktop are: 
- Interoperability between Swing and AWT
- Code sharing with Android applications
- [Skia](https://skia.org/docs/) hardware-accelerated rendering

### Building Swing-based applications
Swing is a minimal GUI toolkit written in Java that includes a large number of widgets for creating optimal window-based applications. It is built upon Java AWT which was their initially platform-dependent GUI toolkit.

Let's have a look at how to create a Swing application. 
```kotlin
import javax.swing.*;
import java.awt.*;

class ExampleClass {
    
    private fun main(args: Array<String>) {
        val frame = JFrame()
        frame.setSize(400, 600)
        frame.setTitle("Swing Application");
        frame.defaultCloseOperation = JFrame.EXIT_ON_CLOSE
        
        val menuBar = JMenuBar()
        val menu1 = JMenu("File")
        val menu2 = JMenu("Edit")
        val menu3 = JMenu("Selection")
        menuBar.add(menu1)
        menuBar.add(menu2)
        menuBar.add(menu3)
        
        val pane = JPanel()
        val button = JButton("Click me")
        val label = JLabel("Click the Button")
        pane.add(button)
        pane.add(label)
        
        frame.contentPane.add(BorderLayout.NORTH, menuBar)
        frame.contentPane.add(BorderLayout.CENTER, pane)
        frame.isVisible = true
    }
}
```
The above class will produce this output.
![output](/how-to-embed-compose-desktop-application-to-swing-based-application/swing-app-output.png)

### Building a Compose for Desktop application
Compose for Desktop applications is built upon Composable functions to create the UI. This is purely done in the `Kotlin` programming language.

Let's also have a look at how a Compose for Desktop application is built like.
```kotlin
@Composable
@Preview
fun App() {
    MaterialTheme {
        Column (Modifier.fillMaxSize(), Arrangement.spacedBy(3.dp), Alignment.CenterHorizontally) {
            Button(onClick = {} ) {
                Text("Click me")
            }
            Text("Click the button")
        }
    }
}

fun main() = application {
    Window(onCloseRequest = ::exitApplication,
        state = rememberWindowState(width = 300.dp , height = 300.dp),
        title = "Compose for Desktop "
    ) {
        App()
    }
}
```
>NOTE: In the above code, we did not put the menu bar as we did in the Swing application

This will provide the following output:

![output](/how-to-embed-compose-desktop-application-to-swing-based-application/compose-for-desktop-output.png)

### Swing and Compose for Desktop interoperability
`Swing/Compose` interoperate well together though there are few use cases and limitations. We will look at each one of them later in this article.
First, let's have a look at the advantages of interoperability. 
1. Its easier to migrate a Swing-based application to Compose application
2. Allows you to extend Compose's functionality with Swing components that are not Compose equivalent.

### Interoperability uses cases
Keep in mind that before integration, Compose and Swing employ distinct techniques of showing content on the screen. Compose uses one Swing component to display its contents and has several component rendering levels. Swing on the other hand works with both robust and lightweight components.

One use case is when you want to include a Compose component in a Swing application.
Swing will automatically view this component as one of its own.
Compose uses a container called 'ComposePanel' to keep and show all of its components. On the other hand, Swing uses the `SwingPanel` to keep and show its components. As a result, it's probably advisable to use a Swing-based approach instead of Compose components.

Let's have a look at when you can use `ComposePanel` or `SwingPanel` in your application.

#### ComposePanel use cases
- Whenever you would like to add an engaging rendering section to your app. This will be more simple and efficient to do with Compose.
- Whenever you wish to include animated objects, or a grid of dynamic objects, in your app. For instance, consider a toolbar with an animated emoticon reaction to events.
- Whenever you need to incorporate a complex display region, Compose is the way to go.
- Whenever you need to make a complex component of a Swing-based app easier to understand, go for Compose.

#### SwingPanel use cases
- When your app does not have complexity in layouts, menus, or other features like tooltips. 
- When adjusting the position of the Swing component, `SwingPanel` decreases the possibility of problems. This is because the position of a `SwingPanel` does not shift. 
- When the component you wish to utilize is only accessible in Swing and not in Compose 

### Using a ComposePanel in a Swing application
Let's have an example of how our code should look like when using `ComposePanel`.
```kotlin
fun main() = SwingUtilities.invokeLater {
    val jFrame = JFrame()
    setDefaultLookAndFeelDecorated(true)
    val panel = ComposePanel()
    jFrame.defaultCloseOperation = WindowConstants.EXIT_ON_CLOSE
    jFrame.title = "Swings App"
    jFrame.isVisible = true
    jFrame.setSize(600, 600)

    jFrame.contentPane.add(panel, BorderLayout.CENTER)
    jFrame.contentPane.add(JButton("Swing Button 1"), BorderLayout.NORTH)
    jFrame.contentPane.add(JButton("Swing Button 2"), BorderLayout.EAST)
    jFrame.contentPane.add(JButton("Swing Button 3"), BorderLayout.WEST)

    panel.setContent { ComposeUI() }
}
@Composable
fun ComposeUI (){
    Column (
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(50.dp))
        Row {
            Surface(
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
In the `main()` function, we created Swing components of type `JFrame` and `JButton` which we added in a `ComposePanel`. `JFrame` will render the window and `ComposePanel` will act as the container to hold all the components used. 

From above, we can see how the two can work perfectly with each other.

Upon running this, the corresponding output will be:

![output](/how-to-embed-compose-desktop-application-to-swing-based-application/compose-swing-output.png)

It is worth noting the difference in the appearance of the Compose and Swing buttons. The Compose button is more appealing and better than the Swing button.

### Using a SwingPanel for CFD Composition
You can also use `SwingPanel` to hold Swing components inside a Compose application. Without further ado, let's see how this happens.
```kotlin
fun main() = singleWindowApplication(title = "Compose Simple Application") {
    Column {
        Box(modifier = Modifier.fillMaxWidth().height(60.dp).padding(top = 20.dp),
            contentAlignment = Alignment.TopCenter){
                Button( modifier = Modifier.size(200.dp, 40.dp), onClick = {}){
                    Text("Compose Button")
                }
        }
        Box(modifier = Modifier.fillMaxWidth().height(60.dp).padding(top = 20.dp),
             contentAlignment = Alignment.TopCenter ){
            Button( modifier = Modifier.size(200.dp, 40.dp), onClick = {}){
                Text("Compose Button")
            }
        }
        Box(modifier = Modifier.fillMaxWidth().height(60.dp).padding(20.dp),
            contentAlignment = Alignment.Center){
            SwingPanel(
                modifier = Modifier.size(200.dp, 40.dp),
                background = White,
                factory = {
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

![output](/how-to-embed-compose-desktop-application-to-swing-based-application/compose-swing-output-2.png)

With the knowledge of this, you can create a more complex and appealing UI using both Swing and Compose components.

### Conclusion
From the above tutorial, we can see that it is possible to use Swing components together with the Compose components. This makes it easier to migrate an existing Swing-based application to a Compose application.

Note that Compose components look much more appealing. With this, you can make your Swing application have a great interface by use of these components. And remember, when constructing a desktop UI, always consider when it is best to use either `SwingPanel` or `ComposePanel`.

Hope you enjoyed this tutorial. Keep Composing :)
