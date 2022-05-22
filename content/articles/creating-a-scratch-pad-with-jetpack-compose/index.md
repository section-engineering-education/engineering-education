### Introduction
Jetpack Compose makes working with bespoke graphics a lot easier. Many apps require the ability to customize precisely what is drawn on the screen. This could be as simple as placing a box or a circle in the exact right spot on the screen, or it could be a complex arrangement of graphic components in a variety of styles. 

In this tutorial, we are going to use different aspects and concepts of composing graphics to come up with a scratch card from scratch.
### Prerequisites
To follow along with is the tutorial:
- Have a basic understanding of the Kotlin programming language.
- Have a basic understanding of Android development.
- Have a basic understanding of Jetpack Compose.
### Goals
This article will walk the reader through the concept of creating a custom scratchpad in jetpack compose and all of the classes implemented such as Path state and drawing tool classes.

### Introduction to Compose Graphics Concepts
In jetpack compose graphics like `Canvas` and `Path` are used to make the creation of graphics more enjoyable, easy, and interesting. 
Canva is composable which is part of the UI component library it gives the power and ability to draw 2D objects on android screens. The path is a Jetpack compose class that is used in conjunction with canvas to show compound geometric pathways made up of straight-line segments, quadratic curves, and cubic curves.

### Advantages of Jetpack compose in Making graphics
- Compose avoids the problem of state programming by reducing the size of state graphics.
-Anything draw are always in composable function as expected.
-The creation and release of objects in compose are done by graphics APIs

### Getting started 
Let's create an application where users can draw sketches just like how a scratch pad works.

### Step 1 - Creating a New Project
To create a new project with the Android Studio IDE, go to File > New > New Project. After that, choose an empty compose activity and click Next. Kotlin is selected automatically as the language to be used, click OK after giving the project a suitable name.

![new project](/engineering-education/creating-a-scratch-pad-with-jetpack-compose/new-project.png)

### Step 2 - Creating a Drawing tool 
The drawing tool is composable that comprises drawing color, brush and all other colors to be used in drawing. All elements are arranged in a common layout that is the column. This composable gives the capability to choose the color of interest when drawing and also gives the ability to apply the color to the text. The floating action button provides a way to choose brush thickness. The brush thickness is arranged in a column and it is given an animation property when the Floating action button is clicked.

![Drawing tool](/engineering-education/creating-a-scratch-pad-with-jetpack-compose/drawing-tool.png)

[Gist](https://gist.github.com/anne-sogoli/4a3bc2de8d43ba08ff3f7a655aad2ea8)

### Step 3 - Creating the Path State.
Initially, we talked about the path and said, the path is a Jetpack compose class that is used in conjunction with canvas to show compound geometric pathways made up of straight-line segments, quadratic curves, and cubic curves. Path state is a data class that holds the variables path, color, and stroke used in the implementation of the scratchpad.

![path state](/engineering-education/creating-a-scratch-pad-with-jetpack-compose/path-state.png)


### Step 4 - Creating a Scratchpad in the main activity 
There are several composables used to create a scratchpad. Let us dive deep into each composable used. A `TopAppBar` composable is used to create the app bar with the app name and an icon which is used for deleting errors. The paint body is used to define all the components used in drawing that is the drawing canvas and drawing tool are all placed in a layout box. The composable uses the path of type `PathState` to listen to all the drawings done on the screen. The last composable used is drawing Canva which is used to listen to all the movements. Using the states of path color and brush it can detect movements from current to the next state. It uses the composable `Canva` with the modifier property `pointerInteropFilter` which is used to detect down and upward movement of the path across the X/Y axis.

![main](/engineering-education/creating-a-scratch-pad-with-jetpack-compose/main.png)

### Demo

![demo](/engineering-education/creating-a-scratch-pad-with-jetpack-compose/demo.gif)

### Conclusion
In this tutorial, we talked about the concept of creating a custom scratchpad in jetpack compose and all of the classes implemented such as Path state and drawing tool classes. All the composable used in the main activity.

### Further Reading 
- [The Power of Drawing](https://medium.com/google-developer-experts/exploring-jetpack-compose-canvas-the-power-of-drawing-8cc60815babe)
- [Jetpack Compose Canva](https://medium.com/falabellatechnology/jetpack-compose-canvas-8aee73eab393)
- [Path in Jetpack Compose](https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/Path)
- [Path Tracing](https://rahulrav.com/blog/path_tracing_compose.html)
