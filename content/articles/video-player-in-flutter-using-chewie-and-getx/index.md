---
layout: engineering-education
status: publish
published: true
url: /video-player-in-flutter-using-chewie-and-getx/
title: Building a Video Player in Flutter using Chewie and Getx 
description: This tutorial will guide the reader on how to build a video player using Chewie and Getx in a Flutter application.
author: naomi-kanoi
date: 2021-12-23T00:00:00-05:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/video-player-in-flutter-using-chewie-and-getx/hero.png
    alt: Video Player in Flutter using Chewie and Getx 
--- 
The ability to play video files is a critical feature in numerous applications. Implementing this functionality in Flutter is quite straightforward. 
<!--more-->
However, you should be aware of packages and libraries such as Chewie and GetX.

The default `video_player` in Flutter limits the user when they want to perform certain actions to a video. 

Chewie is an Application Programming Interface that adds more functionality to the default Flutter video player. Some of these functions include the addition of more play controls.

In this article, we're going to build a video player in Flutter using Chewie and GetX.

We'll be making use of two libraries:

**Chewie**

This is a Flutter plugin for decoding and other playback functionalities. It allows developers to create amazing apps with access to frame-by-frame control.

Chewie is a fully customizable video player which can play/stream nearly all video formats. It also features an easy-to-use API.

**GetX**

This is a Dart library for downloading files from the internet. It makes it easy to download a video from an URL into an input stream.

GetX acts as a wrapper for low-level Android & iOS media APIs. It can, therefore, be used to play videos or capture photos.

In this tutorial, we will use `Chewie` to play videos and `GetX`to download media files from YouTube's  API.

### Prerequisites
To follow along, you need:
- Visual Studio or any code editor installed.
- Have an Understanding of Flutter.
- Familiar with Dart programming language.

We're going to create a screen to show our video player. This screen will have buttons for controlling the playback and two text fields for the user input.

Our videos will be retrieved from the internet rather than from the local storage.

#### VideoScreen
This is the homepage of our video player application. We will use this page to access the downloaded videos. 

Let's start with the basic page with a title. 

The title will be positioned at the top of the page, inside the `Appbar` widget.

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

From the above code, we have a simple screen that contains `Appbar` and `Scaffold` widgets. 

The Scaffold will contain the background image of our video player and two rows: one with the `play` button on top and another showing the `title` and `URL` of the selected resource. 

We will use the `play` button to start the video streaming. The `title` and `URL` are simply for identification purposes.

#### Align widget
This widget contains a container where we will add our components. The main purpose of the `align` widget is to make sure that UI components will be placed correctly on the screen.

```dart
Widget build(BuildContext context) { 

 return new Align( alignment: Alignment.center, //align the child at the center
 
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

We use the `align` widget to position the element in the `center` of the screen. 

In our case, it will be a `container`, So we'll add a `white` background and a `black` border with inner padding of `16dp`.

The choice of color enables the video to be viewed regardless of the quality.

#### Row widget
The `Row` widget will contain several buttons. This widget holds components horizontally.

```dart
Container build(BuildContext context) { 

 return new Center( 
   child: new Column( 
     mainAxisAlignment: MainAxisAlignment.center, 
     children: <Widget>[ new Padding( 
       padding: const EdgeInsets.symmetric(vertical: 16.0), child: new Row( mainAxisAlignment: MainAxisAlignment.spaceBetween, 
       children: <Widget>[ buildButton('PLAY', context), buildButton('STEP_BACKWARD', context),

        ],

      ), ), 

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

                  ), ),

                ], 

            ); 

}

```

The Row contains two buttons: `play` and `skipping`.

We use two `Expanded` widgets: 
- The first one lets us add a `border-radius` to our `Container` with a circular shape.

- The second widget allows us to add more padding on the top and bottom of our video player.

We're going to use `Padding` on the whole screen. However, we need it in both directions on the row.

This is because we'll have one button that stretches across all its width (the "PLAY") and another that has a smaller width (the "STEP_BACKWARD").

Now, let's see how we'll build the elements on this row. Firstly, we have to create a button containing some text:

#### Buttons
Button widgets are used to execute or activate specific actions in our application.

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
As shown above, we use a `Container` to create a button with a height of `50dp` and top padding of `5dp`.

Next, we add a `BoxDecoration` to apply a white background with the same height and width as our `Container`.

Finally, we add text inside the button. In this case, it is just some random string.

We use the `buildButton` method that receives as a parameter, the string that should be inside our button. It then returns the built button `Container`.

We repeat the same procedure for other buttons:

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

This time, we only have to modify the text a little bit.

First, the `STEP_BACKWARD` string should appear in `blue`. Therefore, we add a second parameter called `color` with the value `Colors. blue`.

We now need to update our main method to show the video player:

```dart
void main() { 

 runApp(new VideoPlayerApp());

}
```

We will instantiate the `VideoPlayerApp` in the main method, and then we create a new instance of it (using our video URL) to start playing.

The `RunApp` method runs our application. For this case, it will run the VideoPlayerApp.

We used the following widgets in this example:

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

Chewie and Getx are a perfect combination for a video player app in Flutter. You can test the application on your phone, add more features, and use it for your good or develop your video player.
 
### Conclusion
In this article, we have built a video player app using Flutter, Chewie, and GetX. 

Chewie and GetX allowed us to incorporate streaming capabilities in our app easily.

You can download the complete code from [here](https://github.com/kanoinikita/flutter-chewie-getx/tree/master/videoplayer)

---
Peer Review Contributions by: [Okelo Violet](/engineering-education/authors/okelo-violet/)
