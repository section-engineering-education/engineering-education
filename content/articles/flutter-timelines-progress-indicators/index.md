---
layout: engineering-education
status: publish
published: true
url: /flutter-timelines-progress-indicators/
title: Getting Started with Flutter Timelines
description: This tutorial will guide the reader on how to get started with Flutter timelines.Timelines can be viewed as progress indicators that show a user the level of completion of a task and all the steps completed in executing a given activity. 
author: dianne-sandra
date: 2021-12-24T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/flutter-timelines-progress-indicators/hero.jpg
    alt: Getting started with Flutter timelines Image
---
Timelines can be viewed as progress indicators that show a user the level of completion of a task and all the steps completed in executing a given activity. As a result, timelines form a significant role in most applications today.
<!--more-->
Flutter timelines can be applied to applications today for easy implementation and a straightforward and user-friendly interface. 

### Examples where timelines are used
A wide range of applications implements timelines and can easily integrate flutter timelines to enhance their functionality, look, and feel. 

However, the most prominent examples are:

#### Delivery applications
Timelines can show every instance of the delivery process from the packaging, pickup to transport. This concept is mainly implemented using real-time tracking maps to show the user the progress of the delivery.

#### Multi-step forms
Some forms are so large that they cannot be filled in a single screen. For this reason, such forms can be divided into steps depending on the data to be entered, for instance, personal details, location details, educational background, and professional life. 

#### Progress tracking applications
Let us say one wants to simulate the progress of a project using an application such that after every step, you update the system to display the progress status. In such a case, you can apply the flutter timelines.

### Article goal
While most tutorials focus on building flutter timelines using the `flutter timelines` package, this tutorial ensures a complete showcasing of a flutter timeline from scratch using only dart code and material library.

We will build a flutter application that shows creating an issue and publishing an article in the [Section's Engineering Education platform](/engineering-education/)]. Each step will be represented as a process with its title and description of the process. Additionally, the article will show the reader how to style timeline components effectively for an attractive user interface.

### Prerequisites
To follow along with this article, the reader should have:
- Android Studio or VS Code installed in their computer.
- A basic understanding of Flutter and Dart programming language
- Flutter SDK installed in the reader's machine.

### Project initialization
Open your Android Studio and create a new flutter application using the steps described in this link.

Most of the code written in a flutter application exists in the `lib` folder. However, we will have two files for this application.  The first file will be the `main.dart`  file, and the second file will be named `ProcessCard.dart`.

Create a new file in the `lib` folder and name it `ProcessCard.dart`. This file is the `ProcessCard class`, where we specify the properties of a single step of the timeline.

### The ProgressCard class
As mentioned above, the progress card class contains the title of the process, the description, and the icon. Additionally, we will specify a class constructor in the same file. In the file that contains the progress class, add the following code snippet.

```dart
import 'package:flutter/cupertino.dart';

class ProcessCard{
    String title;
    String description;
    IconData icon;

    ProcessCard(this.title, this.description, this.icon);
}
```

### Creating the timeline class
The timeline class will be called in the body section of the application. It is where most of the design code will go. Create a new class called `Timeline` which extends a `StatefulWidget` as illustrated below:

```dart
class Timeline extends StatefulWidget {
    const Timeline({
        Key? key,
    }) : super(key: key);

    @override
    _TimelineState createState() => _TimelineState();
}
```

### The timeline state 
Next, we need to create a timeline state that extends the timeline class to utilize the material library's components. The state will have a large portion of the code that we will write.

```dart
class _TimelineState extends State<Timeline> {

}
```

The first step we execute is creating a list of colors to use for different steps of our process. For instance, creating a new issue should be different from the topic approval process. However, the colors will be cycled after every fourth step.

```dart
List<Color> colors = [Colors.red, Colors.green,Colors.pinkAccent, Colors.blue];
```

The following step is to create an array of the steps with a title, description, and an icon from the `ProgressCard` class template. 

```dart
List<ProcessCard> _getProcess(){
    List<ProcessCard> processCard = [];

    processCard.add(ProcessCard("Issue Creation", "The author creates a new issue.", Icons.adjust_rounded));
    processCard.add(ProcessCard("Topic Approval", "The author waist for 3 - 5 days."Icons.check));
    processCard.add(ProcessCard("Article Writing", "The author writes the topic.", Icons.border_color_rounded));
    processCard.add(ProcessCard("PR Creation", "The author creates a new Pull Request", Icons.call_merge_rounded));
    processCard.add(ProcessCard("Review Process", "This ensure article is correct", Icons.change_circle_rounded));
    processCard.add(ProcessCard("Final Review", "The article is polished", Icons.bookmark_add_rounded));
    return processCard;
}
```

We then create a list of the `ProgressCards` and a function to fetch them into a single array that we will loop through to obtain the information regarding an individual process for display.

```dart
List<ProcessCard> processCard = [];

@override
void initState() {
// TODO: implement initState
super.initState();
processCard = _getProcess();
```

### Styling the user interface
In this step, we are styling the user interface of the application. Of course, the design may vary depending and how good a given programmer is at designing user interfaces. However, one can develop their design templates from [Dribble](dribble.com).

We begin by encapsulating the entire design in a container that actively provides the children, in this case, the individual processes with a padding margin. The container has a `Listview` class which places all the processes we have into a list aligned from top to bottom. 

```dart
@override
  Widget build(BuildContext context) {
    return Container(
      child: ListView.builder(
        itemCount: processCard.length,
        itemBuilder: (context, index){
         
        
        }),
    );
  }
```

The following snippets illustrate the remaining part of the design. Each card should have its color and icon. 

```dart
 return Container(child: Row(
    children:<Widget> [
        Column(children: <Widget>[
        Container(
            width: 2,
            height: 60,
            color: index == 0 ? Colors.white : Colors.black,
        ),
        Container(
            margin: EdgeInsets.only(left: 8, right: 5),
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
            color: colors[(index +1) %  4],
            borderRadius: BorderRadius.circular(50)
            ),
            child: Icon(processCard[index].icon, color: Colors.white,),
        ),
        Container(
            width: 2,
            height: 60,
            color: index == processCard.length - 1 ? Colors.white : Colors.black,
        ),
        ],
        ),
        Expanded(
            child: Container(
                margin: EdgeInsets.all(10),
                decoration: BoxDecoration(
                    color: Colors.white,
                border: Border(top: BorderSide(width: 3, color: colors[(index +1) %  4],), left: BorderSide(width: 3, color: colors[(index +1) %  4],),),
                boxShadow: [BoxShadow(
                    blurRadius: 5,
                    color: Colors.black26,
                )]
                ),
            height: 140,
            child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget> [
                            Text(processCard[index].title, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: colors[(index +1) %  4],),),
                        Text(processCard[index].description, style: TextStyl(fontSize: 17, letterSpacing: 2),)
                ],
            ),
            ),
        ))
    ],),
```

### Testing the application
Upon completion of the design of the user interface, we can now test the application to see if our implementation worked. 

It would be best if you had an emulator or a mobile device to carry run the application. First, click on the `run` icon in the Android studio, then select the emulator or mobile device where you want the application to run. 

Your application should look like this upon successful execution.

![timeline part one](/engineering-education/flutter-timelines-progress-indicators/timeline-one.jpg)

![timeline part two](/engineering-education/flutter-timelines-progress-indicators/timeline-two.jpg)

### Conclusion
This article introduced the reader to Flutter timelines. Next, we developed an understanding of the benefits of Flutter timelines and provided real-life use cases of the same concept. Finally, we developed an application that emulated the Engineering Education review process to emulate the use of Timelines.

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
