---
layout: engineering-education
status: publish
published: true
url: /declarative-vs-imperative-ui-android/
title: Declarative vs Imperative UI in Android
description: In this article, we are going to have a look at the two types of UI frameworks, declarative and imperative. We will look at their difference and have a short introduction to jetpack compose.
author: linus-muema
date: 2021-04-19T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/declarative-vs-imperative-ui-android/hero.jpg
    alt: declarative UI image example
---
Every application has a UI framework behind it. These frameworks play a huge part in how the applications are created and their performance as well. They also have different ways of operation but can be summarized into two: `declarative` and `imperative`. 
<!--more-->
This article aims to help you understand the two and provide a short introduction to Jetpack compose.

### Definitions
- **Imperative UI**
This is the most common paradigm. It involves having a separate prototype/model of the application's UI. This design focuses on the `how` rather than the `what`. A good example is XML layouts in Android. We design the widgets and components which are then rendered for the user to see and interact with.

- **Declarative UI**
This pattern is an emerging trend that allows the developers to design the user interface based on the data received. This on the other hand focuses on the `what`. This design paradigm makes use of one programming language to create an entire application.

There are several declarative UI frameworks like [Flutter](https://flutter.dev/), [React native](https://reactnative.dev/), [SwiftUI](https://developer.apple.com/tutorials/swiftui/) and [Jetpack compose](https://developer.android.com/jetpack/compose).

Jetpack compose is a UI toolkit that makes use of declarative UI paradigm to create Android application's UI.

### Differences in Android
Let's take a look at some of the differences between Jetpack compose and the old XML layout system.

#### 1. Language
In the imperative UI system, we had both XML files and the Java/Kotlin files working together to bring about the entire application. In Jetpack compose however, there is only one language used for everything: `Kotlin`. The business logic and the user interface are created in the Kotlin classes and files. *Pretty neat if you ask me!* 😉

#### 2. Theming
Before Jetpack compose, themes were set in the manifest files. The various style attributes were declared in the resources folder in XML files too. You also had Material design classes for the themes.

Jetpack compose also comes with a pre-configured Material design theme. You can customize this theme to meet your own demands in an easier way. It provides properties like shapes, typography and colors in the `MaterialTheme` composable.

#### 3. State management
In imperative UI, state management was not as easy as in declarative UI. Since the user interface was created using a tree of widgets, it became more error prone as the tree grew. To reflect a change in the data, you had to go through the widget tree to find the specific widget to update. And each of the widgets provided getters and setters for us to manipulate the views. This would ultimately change the state of the tree.

With Jetpack compose however, since we focus more on the data, it is easier to make changes. The framework checks whichever element that needs to be changed and applies the desired effect by `recompositon`. This leads to a better way of state management.

#### 4. Dynamism
Since Jetpack compose makes use of Kotlin, it has access to it's powerful arsenal of features. You can make use of control structures to manipulate the drawing of the user interface. This makes your user interface more dynamic when compared to the ones created using XML layouts.

### Getting started with Jetpack compose
> **NOTE**: At the time of writing this article, Jetpack compose can only be used in Android Studio Canary versions. This is because Jetpack compose is still in beta.

In Jetpack compose, we heavily rely on composables to create the UI. A composable is a normal kotlin function annotated with `@Composable` annotation. This function does not have a return value. Its contents are added to the screen on rendering.

You can create your own composables and make use of the provided composables to create various UI components. We shall take a look at some of the most common ones.

To start with, our activity class must extend `ComponentActivity` as from version `beta-01`. We then use the `setContent` function to start creating our composables and loading them on the screen. 

I have created a custom theme called `EatsTheme` that overrides some Material theme properties to give the application it's own special theme.

![component](/engineering-education/declarative-vs-imperative-ui-android/component.png)

We then create a composable called `Screen` that will hold all other composables for this screen.

![composable](/engineering-education/declarative-vs-imperative-ui-android/composable.png)

1. **Composable:** this annotation denotes that the function is used to create a UI element, i.e, a composable.

2. **Column & Row:** a column is a composable used to arrange items in a vertical manner. It behaves the same way a `LinearLayout` would but in a vertical orientation. A `Row` is the opposite of a `Column`. It arranges items in a horizontal orientation.

3. **Modifier:** this object is used to define properties for our composables. It makes use of the builder pattern to set the properties. This means that changes are applied in the order of which they were set in the modifier object. This should be a great consideration when using the Modifier class.

4. **Text:** just as the name says, this is used to add a text-based UI element.

5. **Styles:** Jetpack compose allows us to set custom themes and styles for the entire application. We can change styles by overriding the default `MaterialTheme` styles.

6. **LazyColumn & LazyRow:** these composables are the equivalent of recyclerView in Jetpack compose. The are scrollable and only compose the view when the item is visible on the screen.

With that small code snippet, the resulting UI is shown below:

![layout](/engineering-education/declarative-vs-imperative-ui-android/layout.jpg)

A more complex UI is like the one below. You can find the code on [GitHub](https://github.com/LinusMuema/compose/tree/section)

![complex](/engineering-education/declarative-vs-imperative-ui-android/complex.jpg)

### Conclusion
That is the difference between the old imperative programming and declarative UI. You should now get deeper into learning how to use the declarative format as it is more flexible and easier to use.

Have fun coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)