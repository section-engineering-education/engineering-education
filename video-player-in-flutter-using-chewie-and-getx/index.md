---
layout: engineering-education
status: publish
published: true
url: /engineering-education/video-player-in-flutter-using-chewie-and-getx/
title: Video player in flutter using Chewie and Getx 
description: This tutorial will guide you on how to set up and integrate Chewie and Getx in your Flutter application.
author: kanoi-nikita
date: 2021-11-05T00:00:00-11:00
topics: [API]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/video-player-in-flutter-using-chewie-and-getx/hero.png
    alt: Video player in flutter using Chewie and Getx 
--- 

### Video player in Flutter using Chewie and Getx

### Introduction

The default flutter `video_player` limits the user when they want to perform an action to a video. Chewie is an Application Programming Interface that adds more functionality to the default flutter video player. Some of these functions include are like the addition of play controls to the video player.

In this article, we're going to build a video player using Dart and Flutter.

### Key Takeaways

- What is `Chewie?`
- Learn how to use `Chewie`.
- Implementation of `Chewie` in a Flutter app.
- Code Implementation of `Chewie`.

We'll be making use of two libraries:

* `Chewie`, the flutter plugin for decoding, playback, and camera. Build amazing videos with access to the frame by frame control and camera view.

* `GetX`, a dart library for downloading files from the internet. It makes it very easy to download from a URL or a file into an input stream.

We'll take advantage of the first library, `Chewie` to play videos and audio files, and the second one, `GetX`, for downloading them from Youtube's  API.

### Prerequisites

- Visual Studio or any code editor installed.
- Have an Understanding of Flutter Widgets
- Familiar with dart programming languages.
- Knowledge in Flutter.

The result will be something like this:

We're going to create a screen to show our video player. This screen will have buttons for controlling the playback and two text fields to write the URL of the resource we want to play and its title.

#### VideoScreen
This is the page that we will use to interact with the our videos.Let's start with the a basic page with a title.

```dart

class VideoScreen extends StatefulWidget { 

@override

VideoScreenState createState() => new VideoScreenState();

} 

class VideoScreenState extends State { 

@override 

Widget build(BuildContext context) { 

 return new Scaffold(//contains our components of the application.

     appBar: new AppBar( 

       title: new Text("Video Player"), 

     ),

   );

 } 

}

```

As you see, we have a simple screen with an `appbar `, which will have the title of our player, and a `Scaffold`. The `Scaffold` will contain the background image of our video player and two rows: one with the "Play" button on top and another showing the title and URL of the selected resource.

#### Align Widget
This widget contains a container where we will add our components. The main purpose of the align widget is to make sure that the compononets will be placed correctly and in a more appealing location on the screen.

```dart

Widget build(BuildContext context) { 

 return new Align( alignment: Alignment.center, //align the child at the center of the screen.

 child: new Padding( 

   padding: const EdgeInsets.all(16.0),//all edges will be 16 pixels from the walls.

   child: new Container( 

     height: 300.0, width: 300.0, 

     decoration: new BoxDecoration( color: Colors.black45),

   ), 

 ), 

 ); 

}

```

We use the `Align` widget to align the element in the `Center` of the screen. In this case, it will be a `Container`, so we'll add a white background and a black border with inner padding of 16dp.

#### Row widget
The Row widget will contains buttons of applications. 
```dart

Container build(BuildContext context) { 

 return new Center( 

   child: new Column( 

     mainAxisAlignment: MainAxisAlignment.center, 

     children: <Widget>[ new Padding( 

       padding: const EdgeInsets.symmetric(vertical: 16.0), child: new Row( mainAxisAlignment: MainAxisAlignment.spaceBetween, 

       children: <Widget>[ buildButton('PLAY', context), buildButton('STEP_BACKWARD', context),

        ],

      ), 

     ), 

 new Expanded(

        child: new Container( 

          height: 300.0, width: 300.0,

          decoration: new BoxDecoration( 

            borderRadius: new BorderRadius.circular(10.0)), color: Colors.black45, 

            margin: const EdgeInsets.all(16.0), ), ), 

 new Padding( 

              padding: const EdgeInsets.symmetric(horizontal: 16.0), 

              child: new Row( 

                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                 children: <Widget>[ buildButton('PLAY', context), buildButton('STEP_FORWARD', context), 

                 ], 

               ), 

             ),

            ], 

        ); 

}

```

The `Row` contains two buttons: playing and stepping backwards in the video (to skip intros and similar stuff).

We use two `Expanded` widgets. The first one lets us add a `border-radius` to our `Container` with a circular shape, and the second one allows us to add more padding on the top and the bottom of our video player.

We're going to use `Padding` during the whole screen, but on this `Row`, we need it in both directions because we'll have one button that stretches across all its width (the "PLAY") and another that has a smaller width (the "STEP_BACKWARD").

Now, let's see how we'll build the elements on this row. First of all, we have to create a button with some text inside it:
#### Buttons
```dart
Widget buildButton(String title, BuildContext context) { 
 return new Container( 
    height: 50.0, padding: const EdgeInsets.only(top: 5.0),
     decoration: new BoxDecoration( color: Colors.white, ),
      child: new Text( title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20.0), 
      ), 
      ); 
      }
```
We use a `Container` to create our button with a height of 50dp and top padding of 5dp.

Next, we add a `BoxDecoration` to apply a white background with the same height and width as our `Container`, and finally, we get the text inside the button. In this case, it is just some random string I typed in, but you usually use an `IconButton` to get the correct icon.

Finally, we use the `buildButton` method that receives as a parameter the string that should be inside our button, and then it returns the built button `Container`.

We do almost the same thing to build the other button:

```dart

Widget buildButton(String title, BuildContext context) { 

 return new Container(

    height: 50.0, padding: const EdgeInsets.only(top: 5.0), decoration: new BoxDecoration( 

      color: Colors.white, 

      ), 

      child: new Text( title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20.0), 

      ),

 ); 

}

```

This time, we only have to modify the text a little bit. First, the "STEP_BACKWARD" string should appear in blue, so we add a second parameter called `color` with the value `Colors. blue`.

Almost done! We have to update our main method to show the video player:

```dart

void main() { 

 runApp(new VideoPlayerApp());

}

```

We will instantiate the `VideoPlayerApp` in the main method, and then we create a new instance of it (using our video URL) to start playing.


Widgets used in this example:

```dart

Widget buildButton(String title, BuildContext context) { 

 return new Container( 

   height: 50.0, padding: const EdgeInsets.only(top: 5.0), decoration: new BoxDecoration( 

     color: Colors.white, ),

      child: new Text( title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20.0),

   ), 

 ); 

}

Widget buildButton(String title, BuildContext context, [Color color]) { 

 return new Container(

   height: 50.0, padding: const EdgeInsets.only(top: 5.0), decoration: new BoxDecoration( color: color, ),

    child: new Text( title,

     style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20.0),

    ), 

 ); 

}

```

### Conclusion
You can find the complete code of this example [here](https://github.com/kanoinikita/flutter-chewie-getx/tree/master/videoplayer)

---
Peer Review Contributions by: [Okelo Violet](/engineering-education/authors/okelo-violet/)
