---
layout: engineering-education
status: publish
published: true
url: /creating-a-scratch-pad-with-jetpack-compose/
title: Creating a Scratchpad with Jetpack Compose
description: This tutorial will guide the reader on how to use different aspects and concepts of composing graphics to come up with a scratchpad from scratch.
author: anne-sogoli
date: 2022-07-05T00:00:00-10:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-scratch-pad-with-jetpack-compose/hero.jpg
    alt: Creating a Scratchpad with Jetpack Compose
---
Jetpack Compose makes working with bespoke graphics a lot easier. Many apps require the ability to customize precisely what is drawn on the screen.
<!--more-->
This could be as simple as placing a box or a circle in the exact right spot on the screen, or it could be a complex arrangement of graphic components in a variety of styles.

In this tutorial, we are going to use different aspects and concepts of composing graphics to come up with a scratchpad from scratch.

### Prerequisites
To follow along with this tutorial, you need to have a basic understanding of:
- The Kotlin programming language.
- Android development.
- Jetpack Compose.

### Goals
This article will walk the reader through the concept of creating a custom scratchpad in jetpack compose that implements classes such as Path state and drawing tool classes.

### Introduction to Compose graphics concepts
In Jetpack compose, graphics like `Canvas` and `Path` are used to make the creation of graphics more enjoyable, easy, and interesting. 

Canvas is composable which is part of the UI component library. It gives the power and ability to draw 2D objects on Android screens. The path is a Jetpack compose class that is used in conjunction with canvas to show compound geometric pathways made up of straight-line segments, quadratic curves, and cubic curves.

### Advantages of Jetpack Compose in creating graphics
- Compose avoids the problem of state programming by reducing the size of state graphics.
- Anything drawn is always a composable function as expected.
- The creation and release of objects in compose are done by graphics APIs.

### Getting started 
Let's create an application where users can draw sketches just like how a scratchpad works.

### Step 1 - Creating a new project
To create a new project with the Android Studio IDE, go to `File >> New >> New Project`. Choose an empty compose activity and click Next. Kotlin is selected automatically as the language to be used, click `OK` after giving the project a suitable name.

![new project](/engineering-education/creating-a-scratch-pad-with-jetpack-compose/new-project.png)

### Step 2 - Creating a drawing tool 
The drawing tool is a composable that comprises drawing color, brush and all components to be used in drawing. All elements are arranged in a common layout that is the column.

This composable gives the capability to choose the color of interest when drawing and also gives the ability to apply the color to the text. The floating action button provides a way to choose brush thickness. The brush thickness is arranged in a column and it is given an animation property when the fab is clicked.

![Drawing tool](/engineering-education/creating-a-scratch-pad-with-jetpack-compose/drawing-tool.png)

[Gist](https://gist.github.com/anne-sogoli/4a3bc2de8d43ba08ff3f7a655aad2ea8)

### Step 3 - Creating the path state
Initially, we talked about the path and said, the path is a Jetpack compose class that is used in conjunction with canvas to show compound geometric pathways made up of straight-line segments, quadratic curves, and cubic curves. Path state is a data class that holds the variables path, color, and stroke used in the implementation of the scratchpad.

![path state](/engineering-education/creating-a-scratch-pad-with-jetpack-compose/path-state.png)

### Step 4 - Creating a scratchpad in the main activity 
There are several composables used to create a scratchpad. Let us dive deeper into each composable used.

A `TopAppBar` composable is used to create the app bar with the app name and an icon which is used for deleting errors. The paint body is used to define all the components used in drawing, that is the drawing canvas and drawing tool all placed in a layout box.
The composable uses the path of type `PathState` to listen to all the drawings done on the screen. 

The last composable used is drawing Canvas which is used to listen to all the movements. Using the states of path color and brush it can detect movements from current to the next state. It uses the composable `Canvas` with the modifier property `pointerInteropFilter` which is used to detect down and upward movement of the path across the XY axis.

```kotlin 
@Composable
fun ScratchPad() {
    val path = remember {mutableStateOf(mutableListOf<PathState>())}
    Scaffold(
        topBar = {
            ComposePaintAppBar{
                path.value = mutableListOf()
            }
        }
    ) {
        PaintBody(path)
    }
}
// Top app Bar composable with application name and Icon
@Composable
fun ComposePaintAppBar(
    onDelete:()-> Unit
) {
    TopAppBar(
        title = {
            Text(text = "ScratchPad")
        },
        actions = {
            IconButton(onClick = onDelete) {
                Icon(
                    imageVector = Icons.Default.Delete,
                    contentDescription ="Delete"
                )
            }
        }
    ) 
}

// Define all the components used in drawing that is the drawing canvas and drawing tool
@OptIn(ExperimentalAnimationApi::class)
@Composable

// Uses path of type Path state to listen to all location on the screen drawn
fun PaintBody(path:MutableState<MutableList<PathState>>) {
    Box(
        modifier = Modifier.fillMaxSize()
    ) {
        val drawColor = remember{ mutableStateOf(Color.Black)}
        val drawBrush = remember{ mutableStateOf(5f)}
        val usedColor = remember { mutableStateOf(mutableSetOf(Color.Black,Color.White,Color.Gray))}

        path.value.add(PathState(Path(),drawColor.value,drawBrush.value))

        DrawingCanvas(
                drawColor,
                drawBrush,
                usedColor,
                path.value
        )

        DrawingTools(
            drawColor = drawColor,
            drawBrush = drawBrush,
            usedColors = usedColor.value
        )
    }
}

// A composable that listen to all the movements across the XY axis from the current path to all other movements made and draws the line on each movement detected.
@OptIn(ExperimentalComposeUiApi::class)
@Composable
fun DrawingCanvas(
    drawColor: MutableState<Color>,
    drawBrush: MutableState<Float>,
    usedColor: MutableState<MutableSet<Color>>,
    path: MutableList<PathState>
) {
    val currentPath = path.last().path
    val movePath = remember{ mutableStateOf<Offset?>(null)}

    Canvas(
        modifier = Modifier
            .fillMaxSize()
            .padding(top = 100.dp)
            .pointerInteropFilter {
                    when(it.action){
                        MotionEvent.ACTION_DOWN ->{
                            currentPath.moveTo(it.x,it.y)
                            usedColor.value.add(drawColor.value)
                        }
                        MotionEvent.ACTION_MOVE ->{
                            movePath.value = Offset(it.x,it.y)
                        }
                        else ->{
                            movePath.value =null
                        }
                    }
                true
            }
    ){
        movePath.value?.let {
            currentPath.lineTo(it.x,it.y)
            drawPath(
                path = currentPath,
                color = drawColor.value,
                style = Stroke(drawBrush.value)
            )
        }
        path.forEach {
            drawPath(
                path = it.path,
                color = it.color,
                style  = Stroke(it.stroke)
            )
        }
    }
}
```

Finally, your `MainActivity` should look like this.

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ScratchPadDemoTheme {
                // A surface container using the background color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    ScratchPad()
                }
            }
        }
    }
}
```

### Demo

![demo](/engineering-education/creating-a-scratch-pad-with-jetpack-compose/demo.gif)

### Conclusion
In this tutorial, we talked about the concept of creating a custom scratchpad in Jetpack compose and all the classes implemented such as Path state and drawing tool classes. We also covered the composable used in the main activity.

Happy coding!

### Further reading 
- [The Power of Drawing](https://medium.com/google-developer-experts/exploring-jetpack-compose-canvas-the-power-of-drawing-8cc60815babe)
- [Jetpack Compose Canva](https://medium.com/falabellatechnology/jetpack-compose-canvas-8aee73eab393)
- [Path in Jetpack Compose](https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/Path)
- [Path Tracing](https://rahulrav.com/blog/path_tracing_compose.html)

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
