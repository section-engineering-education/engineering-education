Animations are very important in every mobile application. They make the user interface of apps appealing. Animations are difficult to implement in apps, that's where Lottie animations come in. Lottie animation files are JSON-based. Throughout the platform, Lottie animation can be used both as a static asset and a network asset. Animation controllers give us high-level control over our animations in Flutter. We will be using animation controllers to control the state of Lottie animation in our Flutter app.

In this article, we will implement Lottie animation in a flutter application. We can get a Lottie animation JSON file from http://www.lottiefiles.com/.

### Prerequisites

    1. Basic knowledge of Flutter widgets
    2. Basic knowledge of using animation controllers

Let us jump right into it!

### Implementation

#### Adding Lottie dependency to your Project

Goto the terminal in your editor and run this command:

```
flutter pub add lottie
```

A line like this will be added to the pubspec.yaml file of your project:

```
dependencies:
  lottie: ^1.2.1
```

#### Importing

Once the lottie dependency has been added to your project, you can import it to your dart code by adding this on the `main.dart` file:

```
import 'package:lottie/lottie.dart';
```

#### Adding Assets

We will create an assets folder in our project directory. Here we will add the lottie JSON file which we will implement.

We will add our assets folder in the pubspec.yaml file in our project as shown below and run `flutter pub get` :

```
assets:
 - assets/
```

#### Implementing Lottie animation

First, we will create a new stateful widget class called LottieScreen which will return a Scaffold. Our screen contains an app bar with a title, Lottie implementation.

a. Network Lottie

To add a network lottie animation, goto to the lottie files website and copy the URL of the lottie file of your choice.

Add a `Lottie.network('')` child widget inside a Center widget in the body. Paste the Lottie URL in the quotes as shown below:

```
body: Center(
    child: Lottie.network("https://assets8.lottiefiles.com/packages/lf20_xxjvkrex.json",
    animate: true
    ),
),
```

When the application is run, the animation plays automatically. This can be changed by adding `animate: false` property inside the lottie widget. The lottie animation becomes a static image.

b. Asset Lottie

The `Lottie.asset('')` allows lottie JSON files which are stored locally in the assets folder. 
this is how it is done:

```
body: Center(
  child: Lottie.asset("assets/transaction-completed.json"),
),
```

### Animation Controllers

In this article, to comprehensively explain the use of animation controllers in Flutter, we will implement an animation controller using the lottie asset animation that we added to our project above.

We will create a button such that, when pressed, a dialog box appears containing a lottie asset which notifies a user that a the command has been executed successfully.

This is the code for the button:

```
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

When the button is pressed, the showSuccessfulDialog method is executed. This method is the one that shows the dialog box.

This is the showSuccessfulDialog method code:

```
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

As from the code above, we have created a dialog box which will appear when the button is clicked and disappear after lottie animation is complete.

We set the `repeat: false` property on the lottie to make the animation only play once and not on loop.

To start the lottie animation, we add the onloaded property where we will call the animation controller with a forward method. We will set the duration of the animation to the one preset for the lottie files using `composition.duration;` As shown below:

```
onLoaded: (composition) {
  controller.forward();
  controller.duration = composition.duration;
}
```

We will create a new animation controller inside our state as shown below:

```
late AnimationController lottieController;
```

Then add a controller for the lottie animation which will be the animation controller we created shown in the showSuccessfulDialog method.

We will create an initState and dispose methods which will initialize the animation and in on completion dispose it.

We will add SingleTickerProviderStateMixin to our state like this:

```
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

This is because we are using only one animation controller for our project. We then call our controller inside the initState which then allows us to use the `vsync: this` parameter which is used to sychronize our animation frame rate through our animation controller as shown above.

Because we want to close the dialog automatically when the animation is complete, we added a status listener which listens to the animation controller if the animation is complete as shown in the above code. After the dialog is closed then the animation controller is reset, `lottieController.reset();`. This is to reset the animation so that it would replay the next time we click the button.

Next, to our dispose method, we will add `lottieController.dispose();` this will destroy the animation controller and remove it from the widget tree. As shown below:

```
  @override
  void dispose() {
    lottieController.dispose();
    super.dispose();
  }
```

This is the full code of the Flutter application that we have created:

```
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

We will get a result like this:

![Flutter Lottie Implemetation](/engineering-education/using-lottie-animations-in-flutter/app.gif)

### Conclusion

Lottie animations are simple and easy to implement in a Flutter application. We have gone through implementing these lottie animations in our app. We have also used an animation controller to control the state of our animation. This knowledge can be used in other ways in creating interactive UIs for your projects. Hope tutorial this will be useful.

Happy Coding!
