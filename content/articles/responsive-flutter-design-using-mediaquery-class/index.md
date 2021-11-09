---
layout: engineering-education
status: publish
published: true
url: /responsive-flutter-design-using-mediaquery-class/
title: Responsive Flutter Design using MediaQuery Class
description: This tutorial will teach you how to set up a Flutter application to be responsive and resolve satisfactorily on all devices.
author: somtobe-eze
date: 2021-10-14T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/responsive-flutter-design-using-mediaquery-class/hero.jpg
    alt: HResponsive Flutter Design using MediaQuery Class Hero Image
---
This tutorial will teach us how to set up a Flutter application to be responsive and resolve satisfactorily on all devices.
<!--more-->

### Introduction
When we create our application using Flutter, we do not know the sizes the user’s device will view our application on, nor can we guess the orientation of the device.

While it is possible to restrict our application to a specific orientation (either horizontal or vertical), writing different code to display our widgets in different device sizes is highly inefficient and can be a nightmare.

What will we do then if a new device screen size is released into the market?

Why should we go through this trouble when we should be more focused on creating amazing functional applications? Luckily, Flutter has a way to ensure that our widgets are responsive and fit to a given screen size of the device they are viewed on.

In this tutorial, you’ll:
- Build a simple Flutter app that changes based on the layout.
- Make use of Flutter’s MediaQuery, FittedBox, LayoutBuilder, OrientationBuilder, and AspectRatio widgets.
- Handle changes in device orientation.

### Prerequisite
- It is vital you have foreknowledge of how to set up a Flutter application. If we are new to Flutter, check out this piece of the [Flutter](https://flutter.dev/docs/get-started/install) documentation to get us started with a basic Flutter application.

#### Table of contents
- [Responsive flutter design using MediaQuery Class](#responsive-flutter-design-using-mediaquery-class)
  - [Introduction](#introduction)
  - [Prerequisite](#prerequisite)
  - [Table of Contents](#table-of-contents)
  - [Responsive Apps](#responsive-apps)
  - [Working with orientation in Flutter](#working-with-orientation-in-flutter)
  - [Creating layouts for larger screens in Flutter](#creating-layouts-for-larger-screens-in-flutter)
  - [Keyboard State Change](#keyboard-state-change)
  - [AspectRatio](#aspectratio)
  - [FittedBox](#fittedbox)
    - [Boxfit.fill](#boxfitfill)
    - [Boxfit.contain](#boxfitcontain)
    - [Boxfit.cover](#boxfitcover)
    - [Boxfit.fitHeight](#boxfitfitheight)
    - [Boxfit.fitWidth](#boxfitfitwidth)
    - [BoxFit.none](#boxfitnone)
    - [BoxFit.scaleDown](#boxfitscaledown)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Responsive apps
A responsive app is one that is written in such a way that it fits the available screen size of the device it is viewed on. This is often achieved by the app re-rendering the UI if the user resizes the screen or if the device orientation is changed.

Responsive apps are a vital concept for apps that run on a watch, phone, tablet, desktop.

Here are reasons why our app may need to change from its initial design:

- Different Device Types and Screen Sizes

Flutter is a multi-platform framework that enables anyone to build applications for various devices, Phones, Watches, TVs, Desktop all of which have different screen sizes.

- Orientation Change

Users can rotate their devices. This can be disabled by locking our application in a portrait mode or a landscape mode but this will cost us a lot in terms of the experience the users of our application may have. MediaQuery class in flutter can help rebuild our layout.

MaterialApp Layout Widget and WidgetsApp Layout Widgets make use of MediaQuery under the hood. Using them at the top of our widget tree while building our application ensures that our application automatically resizes to the given orientation.

- Keyboard State Change

Our app might have a need for keyboard input. The keyboard slides up when the user begins interacting with the fields. When that keyboard appears, so do issues related to spacing.

Flutter uses the Scaffold class to handle state changes in the keyboard. Scaffold makes adjustments for bottom insets in order to enable the keyboard to pull up. You can disable this behavior, just set the resizeToAvoidBottomInset property to false.

### Working with orientation in Flutter

![Orientation](/engineering-education/responsive_flutter_design_using_mediaquery_class/orientation.png)

We make use of the OrientationBuilder class to deal with orientation changes. The two properties of the class are the Orientation.portrait and the Orientation.landscape.

```dart
Widget build(BuildContext context) {

 return Scaffold(

   body: OrientationBuilder(

     builder: (context, orient) {

       return orient == Orientation.portrait

           ? _VerticalDisplay()

           : _HorizontalDisplay();

     },

   ),

 );

}
```

In the above code, the OrientationBuilder builder function re-renders the layout. This function will be called whenever a change made to the orientation. If the orientation is portrait it displays the `_verticalDisplay()`, if landscape it displays `_HorizontalDisplay()`

The orientation can also be obtained using `MediaQuery.of(context).orientation`

If we want to prevent the change and leave the display as only portrait irrespective of the device change, use `SystemChrome.setPreferredOrientations(DeviceOrientation.portraitUp);`

### Creating layouts for larger screens in Flutter
It is advisable to let our app use up all the available space on the screen if we are working on devices with large screens. This can be achieved by creating two different layouts for larger device screens such as tablets, desktops, and screens for smaller devices like phones. As we have stated before this can become tiring over the long run so what do we do?

Let's check out this example:

![listview](/engineering-education/responsive_flutter_design_using_mediaquery_class/list.png)

![detailed](/engineering-education/responsive_flutter_design_using_mediaquery_class/detailed.png)

The image above represents a screen showing first a listview of numbers and then displaying on top with a blue translucent background, a detailed view that represents a selection of a single listview. This is a normal implementation for mobile phone screen sizes but not for large screen sizes. Implementing this design method for a tablet will lead to a waste of space.

To represent this on such screens what we can do is to have each section as a component and display them. We have to know the width of the device so we know if it is a larger screen or a smaller screen. This can be obtained using `MediaQuery.of(context).size.width`

How to proceed:

First, we create two widgets, one to contain the listview component and the other the detailed view component.

Secondly, we create two files. On the first, we check whether the device has enough width to contain both widgets.

Then, using a conditional statement we check whether the width is enough, if it is we add both widgets to one page. If not, then we traverse to a second page when an item is clicked.

The LISTVIEW widget:

```dart
class ListViewWidget extends StatefulWidget {

  int num;

  ItemSelectedCallback selectedItem;

 ListViewWidget(

   this.num,

   this.selectedItem,

 );

 @override

 _ListViewWidgetState createState() => _ListViewWidgetState();

}

class _ListViewWidgetState extends State<ListViewWidget> {

 @override

 Widget build(BuildContext context) {

   return ListView.builder(

     itemCount: widget.num,

     itemBuilder: (context, side) {

       return Padding(

         padding: const EdgeInsets.all(12.0),

         child: Card(

           child: GestureDetector(

             onTap: () {

               widget.selectedItem(side);

             },

             child: Padding(

                   padding: const EdgeInsets.all(16.0),

                   child: Text(side.toString(), style: TextStyle(fontSize: 16.0),),

                 ),

            ),

         ),

       );

     },

   );

 }

}
```

The listview takes in the total number of items to be listed and a function to be called when a single list is selected. This function is what will be used to determine whether to change the layout to a detailed view for large device screens or to traverse to another page when on a small device.

Using the listView Builder we display a number of list items based on the itemCount. We used GestureDetector to handle click events on the items.

The Detailed View Widget

```dart
class SelectedListViewWidget extends StatefulWidget {

 final int result;

 SelectedListViewWidget(this.result);

 @override

 _SelectedListViewWidgetState createState() => _SelectedListViewWidgetState();

}

class _SelectedListViewWidgetState extends State<SelectedListViewWidget> {

 @override

 Widget build(BuildContext context) {

   return Container(

     color: Colors.blue[600],

     child: Center(

       child: Text(widget.result.toString(), style: TextStyle(fontSize: 20.0, color: Colors.grey),),

             ),

   );

 }

}
```

This view widget simply displays the selected number to the screen. It takes into its constructor data passed from the selected widget and saves it into a `result` field. Since the data passed is of type `int`, the result data field is also of type `int`.

The code written above is simply widgets created aside which when called will render on the screen based on some condition set.

Layout Screen:

```dart
class LayOutScreen extends StatefulWidget {

 @override

 _LayOutScreenState createState() => _LayOutScreenState();

}

class _LayOutScreenState extends State<LayOutScreen> {

 int value = 0;

 bool isLargeScreen = false;

 @override

 Widget build(BuildContext context) {

   return Scaffold(

     body: OrientationBuilder(builder: (context, orientation) {

       if (MediaQuery.of(context).size.width > 720)

            isLargeScreen = true;

       else isLargeScreen = false;

        return Row(

            children: <Widget>[

                Expanded(

                child: ListViewWidget(20, (value) {

                    if (isLargeScreen) {

                this.value = value;

                setState(() {});

                } else {

                Navigator.push(context, MaterialPageRoute(

                    builder: (context) {

                    return DetailedScreen(value);
                    },
                 ));
                }
              }),
            ),
            isLargeScreen ? Expanded(child: SelectedListViewWidget(value)) : Container(),
         ]);
        }),
   );
 }
}
```

![Detailed](/engineering-education/responsive_flutter_design_using_mediaquery_class/detailed.png)

This is the LayoutScreen of the app. There are two data fields/variables. `value` which stores the selected item, and `isLargeScreen`, which is a boolean that states whether the display screen is large enough to display both the listview and detailedview widgets.

There is an OrientationBuilderWidget that surrounds it. What this does is that it checks if a device is of a mobile size and also when rotated has enough space to display both widgets on a single screen.

`isLargeScreen ? Expanded(child: SelectedListViewWidget(value)) : Container()`

If the display screen size is large, navigate to detailed widget, else return an empty container.

```dart
if (isLargeScreen) {

    this.value = value;

    setState(() {});

    } else {

    Navigator.push(context, MaterialPageRoute(

        builder: (context) {

        return DetailedScreen(value);
        },
    ));
    }
```

This means that if the larger layout is used, then there is no need to traversing to another screen since the detailed widget dwells on the same page. In the event the screen is smaller, we will need to traverse to a different page since only the list will be shown on the current screen.

```dart
class DetailedScreen extends StatefulWidget {

 final int result;

 DetailedScreen(this.result);

 @override

 _DetailedScreenState createState() => _DetailedScreenState();

}

class _DetailedScreenState extends State<DetailedScreen> {

 @override

 Widget build(BuildContext context) {
   return Scaffold(
     body: SelectedListViewWidget(widget.result),

   );
 }
}
```

To design for specific screens, obtain the size from the MediaQuery class and use it to get the actual device width. using the MediaQuery width directly, will fetch the width of that orientation only. So when the device is in landscape mode, the length of the phone will be considered to be the width.

```dart
Size size = MediaQuery.of(context).size;

double width = size.width > size.height ? size.height : size.width;
```

```dart

if(width > 720) {

 // codes for large screens

} else {

 // codes for small screens

}
```

### Keyboard State Change

By default using Scaffold means our app will scale automatically when the keyboard slides up. This can be disabled by setting the `resizeToAvoidBottomInset` property from the default true to false.

### AspectRatio

The Aspect ratio widget attempts to resize its child widget to suite the stipulated aspect ratio. It achieves this by first trying out the highest width size to verify whether the layout constraints allows for it. To obtain the height of the widget, apply the stipulated aspect ratio to the width. This is expressed as the ratio of width to height

```dart
Widget build(BuildContext context) {

  return Center(

  Child: Container(

    color: Colors.red,

    width: double.infinity,

    height: 120.0,

    child: AspectRatio(

      aspectRatio: 3 / 2,

      child: Container(

        color: Colors.blue,

       ),
     ),
   );
  )
}
```

The code above displays how AspectRatio sets the child widget’s width when its parent widget width constraint is infinite. Since the parents' permited height is a stated value, the actual width is determined via the given AspectRatio.

Since the height is fixed at 120.0 below and the aspect ratio is set to 3 / 2, the width then should be 120.0 / 2 \* 3.

### FittedBox

Flutter widgets are resizable, scalable, and can be inserted inside one another. When an inserted widget does not fit well into the housing widget, we can make it scale so as to fit into its parent using FittedBox.

```dart
Widget build(BuildContext context) {

  return Container(

    height: 300,

    width: 200,

    color: Colors.green,

    child: FittedBox(

      child: Container(

  Width: 600,

Height: 600,

Color: Colors.white

),

      fit: BoxFit.fill,

    ),

  );

}
```

#### Boxfit.fill
In the code above, the value assigned to the fit property specifies the child container should fit into the parent and fill the entire size of its parent. This makes the inserting container lose its sizing.

#### Boxfit.contain
This specifies that the child widget resizes itself to try as much as possible to fit the parent container either in width or height while doing so proportionally.

#### Boxfit.cover
Specifies that the child widget should scale proportionally both its width and height so as to cover up all its parent widget space. This may lead to the loss of some part of the child widget if the child widget is larger than the parent’s widget.

#### Boxfit.fitHeight
This specifies that the full height of the child widget is shown, irrespective of whether this means the child widget overflows the parent’s widget horizontally.

#### Boxfit.fitWidth
This specifies that the complete width of the child widget is shown, irrespective of whether this means the child widget overflows the parent’s widget vertically. This may lead to some aspects of the child widget being lost if the parent widget has a hard constraint on its size.

#### BoxFit.none
This aligns the child widget within the parent widget (by default, centering) and discards any portions of the child widget that lie outside the box. The child widget image is not resized.

#### BoxFit.scaleDown
This sets the child widget within the parent widget (by default, centering) and, if necessary, scales the child widget down to ensure that the child widget fits within the parent.

### Conclusion
In this tutorial, we stated what a responsive Flutter application is and the importance of our application being responsive. When creating our application, these should be the first things we envision before proceeding to create our layout.

Draft up how the application should be and have an idea of the set of devices our application will be likey displayed on. Nicely design apps that are responsive make users more engaged in the application and keeps them coming back.

### Further reading
- [Flutter Docs](https://flutter.dev/docs/development/ui/layout/adaptive-responsive)
- [Aspect Ratio](https://api.flutter.dev/flutter/widgets/AspectRatio-class.html)
- [Adaptive Layouts](https://www.youtube.com/watch?v=n6Awpg1MO6M&feature=emb_imp_woyt)
- [Adaptive Layouts part 2](https://www.youtube.com/watch?v=eikOZzfc0l4&t=11s)

---
Peer Review Contributions by: [Okelo Violet](/engineering-education/authors/okelo-violet/)

