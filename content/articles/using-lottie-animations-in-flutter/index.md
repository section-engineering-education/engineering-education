Animations are very important in every mobile application. They make the user interface of apps appealing and fun to use. Animations may be difficult to implement in apps and that is where Lottie animations come in. A Lottie is JSON-based animation file. They are used both as a static asset and a network asset. They polish the user interface of your app and make it intuitive to users.

In this article, we will implement Lottie animation in a flutter application. Animation controllers in Flutter, give us high-level control over our animations. We will be using an animation controller to control the state of our Lottie animations in our Flutter app.

### Prerequisites

1. A solid understanding of Dart programing language.
2. A solid understanding of Flutter widgets.
3. Basic knowledge of using animation controllers in Flutter.

Let us jump right into it!

### Step one: Adding Lottie dependency to your project

- Goto the terminal in your editor and run this command:

```dart
flutter pub add Lottie
```

A line like this will be added to the pubspec.yaml file of your project:

```dart
dependencies:
  Lottie: ^1.2.1 //Lottie Animation Library
```

- Once the Lottie dependency has been added to your project, you can import it to your dart code by adding this on the `main.dart` file:

```dart
import 'package:lottie/lottie.dart';
```

### Step Two: Adding assets to your project

- First, to get a Lottie animation JSON file visit, [Lottie animation](http://www.lottiefiles.com/). Select the animation of your choice and download it.

- Next, create an assets folder in our project directory. Here you will add the downloaded Lottie JSON file which you will use.

- Next, add our assets folder in the pubspec.yaml file in our project as shown below and run `flutter pub get` :

```dart
assets:
 - assets/
```

### Step three: Creating the LottieScreen page

- In your `main.dart`, create a new stateful widget class called LottieScreen which will return a Scaffold containing an app bar with a title, `Lottie implementation`. As shown below:

```dart
class LottieScreen extends StatefulWidget {
  const LottieScreen({Key? key}) : super(key: key);

  @override
  _LottieScreenState createState() => _LottieScreenState();
}

class _LottieScreenState extends State<LottieScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Lottie Implementation"),
        centerTitle: true,
      ),
    );
  }
}
```

- Next, add a `body` to the Scaffold. The body will contain the following widgets:
  - Center widget - to center the child widgets on the screen.
  - Column widget which will a child of the Center widget - to layout the children vertically.

### Step four: Using Lottie animations

#### 1. Network Lottie

To add a network Lottie animation, goto to the Lottie files website and copy the URL of the Lottie of your choice.

Add a `Lottie.network('')` widget as one of the children in the Column widget. Paste the Lottie URL as shown below:

```dart
body: Center(
    child: Lottie.network("https://assets8.lottiefiles.com/packages/lf20_xxjvkrex.json",
    animate: true
    ),
),
```

When the application is run, the animation plays automatically. This can be changed by adding the `animate: false` property inside the Lottie widget. The Lottie animation becomes a static image.

#### 2. Asset Lottie

The `Lottie.asset('')` allows Lottie JSON files which are stored locally in the assets folder as shown below:

```dart
body: Center(
  child: Lottie.asset("assets/transaction-completed.json"),
),
```

### Step five: Animation Controllers

In this article, to comprehensively explain the use of animation controllers in Flutter, we will implement an animation controller using the Lottie asset animation that we added to our project above.

We will create a button such that, when pressed, a dialog box appears containing a Lottie asset which notifies a user that the command has been executed successfully.

This is the code for the button:

```dart
body: Center(
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Lottie.network("https://assets8.lottiefiles.com/packages/lf20_xxjvkrex.json", animate: true),
        const SizedBox(height: 24,),
        ElevatedButton(
            onPressed: () => showSuccessfulDialog(),
            child: const Text("Update Transactions"),
            )
    ],),
),
```

When the button is pressed, the `showSuccessfulDialog()` method is executed. This method is the one that shows the dialog box.

This is the `showSuccessfulDialog()` method code:

```dart
void showSuccessfulDialog() => showDialog(
      context: context,
      builder: (context) => Dialog(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Lottie.asset("assets/transaction-complete.json",
                repeat: false,
              controller: lottieController,
              onLoaded: (composition) {
              controller.duration = composition.duration;
              controller.forward();
              }
            ),
            const SizedBox(height: 8),
            const Center(
              child: Text("Done!", style: TextStyle(
                  color: Colors.green,
                  fontSize: 21),),
            ),
            const SizedBox(height: 14),
          ]
        ),
      )
  );
```

As from the code above, we have created a dialog box that will appear when the button is clicked and disappear after the Lottie animation is complete.

We set the `repeat: false` property on the Lottie to make the animation only play once and not on a loop.

We will create a new animation controller inside our state called `lottieController` as shown below:

```dart
late AnimationController lottieController;
```

We will add the animation controller that we have created to the `showSuccessfulDialog()` method in the controller property.

To start the Lottie animation, we add the `onLoaded` property where we will call the animation controller with a forward method. We will also set the duration of the animation to the one preset for the Lottie file using `composition.duration;` as shown below:

```dart
onLoaded: (composition) {
  lottieController.forward();
  lottieController.duration = composition.duration;
}
```

We will create an `initState()` method and `dispose()` method which will initialize the animation and in on completion dispose it.

#### 1. initState() method

We will add `SingleTickerProviderStateMixin` to our state like this:

```dart
class _LottieScreenState extends State<LottieScreen> with SingleTickerProviderStateMixin{
  late AnimationController lottieController;

  @override
  void initState() {
    super.initState();

    lottieController = AnimationController(
      vsync: this,
    );

    lottieController.addStatusListener((status) async {
      if (status == AnimationStatus.completed) {
        Navigator.pop(context);
        lottieController.reset();
      }
    });
  }
```

We are using `SingleTickerProviderStateMixin` because we are only using one animation controller for our project. We will call our controller inside the initState which then allows us to use the `vsync: this` parameter which is used to synchronize our animation frame rate through our animation controller as shown above.

To close the dialog automatically once the animation has completed, we added a status listener which listens to the animation controller if the animation is complete as shown in the above code. If the animation is complete then the dialog closes. This is because of the `Navigator.pop(context);` code. After the dialog is closed then the animation controller is reset, `lottieController.reset();`. This is to reset the animation so that it would replay the next time we click the button.

Next, create the dispose() method as shown in the code below. Add `lottieController.dispose();` code which will destroy the animation controller and remove it from the widget tree.

```dart
  @override
  void dispose() {
    lottieController.dispose();
    super.dispose();
  }
```

When our application is run, We will get a result like this:

![Flutter Lottie Implementation](/engineering-education/using-lottie-animations-in-flutter/app.gif)

This is the full code of the Flutter application that we have created:

```dart
class LottieScreen extends StatefulWidget {
  const LottieScreen({Key? key}) : super(key: key);

  @override
  _LottieScreenState createState() => _LottieScreenState();
}

class _LottieScreenState extends State<LottieScreen> with SingleTickerProviderStateMixin{
  late AnimationController lottieController;

  @override
  void initState() {
    super.initState();

    lottieController = AnimationController(
      vsync: this,
    );

    lottieController.addStatusListener((status) async {
      if (status == AnimationStatus.completed) {
        Navigator.pop(context);
        lottieController.reset();
      }
    });
  }

  @override
  void dispose() {
    lottieController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Lottie Implementation"),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Lottie.asset("assets/cards.json",
            height: 300,
            width: 300,
              animate: true
            ),
            const SizedBox(height: 24,),
            ElevatedButton(
                onPressed: () => showSuccessfulDialog(),
                child: const Text("Update Transactions"),
            )
          ],
        ),

      ),
    );
  }
  void showSuccessfulDialog() => showDialog(
      context: context,
      builder: (context) => Dialog(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Lottie.asset("assets/transaction-completed.json",
                repeat: false,
                height: 200,
                width: 200,
              controller: lottieController,
              onLoaded: (composition) {
                lottieController.duration = composition.duration;
                lottieController.forward();
              }
            ),
            const Center(
              child: Text("Done!", style: TextStyle(
                  color: Colors.green,
                  fontSize: 24,
                  fontWeight: FontWeight.bold
                  ),),
            ),
            const SizedBox(height: 21),
          ]
        ),
      )
  );
}
```

### Conclusion

Lottie animations are simple and easy to implement in a Flutter application. We have gone through implementing these Lottie animations in our app. We have also used an animation controller to control the state of our animation. This knowledge can be used in other ways in creating interactive UIs for your projects. Hope the tutorial will be useful.

Happy Coding!
