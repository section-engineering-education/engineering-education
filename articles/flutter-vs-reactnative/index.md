---
layout: engineering-education
status: publish
published: true
url: /engineering-education/flutter-vs-reactnative/
title: Flutter vs React Native - Which is a better cross platform framework
description:
author:
date: 2020-10-18T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/flutter-vs-reactnative/hero.jpg
    alt:
---
Companies today are not just making products, but ecosystems. A gamut of services which can prove to be a steady revenue stream. It is only natural for them to try to get apps to run across devices within those ecosystems. How about being able to do that with a single codebase? Wishful thinking? That may have been true 20 years ago, but not today.
<!--more-->
#### Take 1: One bytecode to rule ‘em all
The dream of a cross-platform was first braved by Java. It devised the paradigm of [Write Once Run Anywhere (WORA)](https://en.wikipedia.org/wiki/Write_once,_run_anywhere). It was successful to a major extent, according to the Java installer at least.

![](/engineering-education/flutter-vs-reactnative/installer.jpeg)

Things went south when companies started making their own Java implementations for exclusivity. Oracle turned licenses and usage rights upside down. Hundreds of products like J2ME, J2EE, Open JDK, Jakarta etc. popped up. Java became too fragmented to be universal.

#### Take 2: A glorified webpage
Mobile devices became more powerful, more compact, and more connected. They were getting more attention than our humble PC or laptops did. So companies were looking to develop for mobile while supporting PC software applications. Due to mobile being the future, but the PC market still having one of the largest user base. The thought process was to present a webpage wrapped in an app. Frameworks like ionic, PhoneGap, and Cordova tried to do it but the performance was not on par.

#### Take 2.5 - Enter React Native
React is a front end framework for the web. What React Native did was extend the functionality of React to native Android and iOS platforms. The developer got to code the UI as React components.

The developer could use the same code used in their React web app for some UI elements. Later React Native would replace those web elements with the corresponding native elements. For example, `<span>` primitive is replaced with TextView in the native build and UI View in iOS build.

This was better than the earlier approach because:
1. Web developers could dive into mobile app development without a steep learning curve.
2. Code can be reused to a large extent.
3. It offered better performance than a web app wrapper as it ran closer to metal.

#### Take 3: A Blank canvas
Let's take a look at mobile game development frameworks like [Unity](https://unity.com/). They don't have anything like the Native UI component. All they provide is a blank 2D canvas or an empty 3D space. You are free to show anything you want in that space, irrespective of the mobile platform you are on.

Flutter works the same way, unlike other app development frameworks. The platform is just concerned with rendering a canvas (Skia canvas). Once the canvas is created, Flutter paints on that canvas 60 times a second.

That way it does not have to deal with platform-specific components. What prevents Flutter from supporting another platforms is its inability to run the [Skia canvas](https://skia.org/user/api/skcanvas_overview) on that platform.

#### What Flutter gets right
##### Hot Reload - The MVP of Flutter
Flutter hot reloads are super fast. Developers can make changes and view them on the fly within milliseconds. Want to try out which color suits the app? You can keep changing the color and it’ll show up in the app near instantly! This is great for rapid prototyping and creating an MVP.

##### 1 codebase - multiple platforms
Painting on canvas, makes the user feel like the Bob Ross of while working with frameworks! Due to the all the platforms that exist for users.

A user can work with:
- Android
- iOS,
- Web
- Windows
- MacOS
- Linux
- Smartwatches
- IoT.

##### Smooth UI, rendered at 60fps
Flutter works more like a gaming engine, than an app framework you may be used to. As already explained, the UI is built and rendered on a Skia Canvas as it changes. Flutter updates the UI at 60fps, and uses the GPU for most of the work.

While this doesn’t affect how we build an app, it is the reason the Flutter UI is buttery smooth. Dart based application code will continue to run via the CPU, and in the specialized UI Thread, when touching UI related components.

##### A UI first framework
Flutter has a wide range of widgets built right in.  Want to change height, width, color, alignment etc.? Just wrap in an AnimatedContainer and you’re done.

Imagine doing all that in any other framework. Flutter widgets are platform agnostic. Hence it's possible to show iOS style translucent dialog boxes within Android in Flutter using the Cupertino package.

#### What React gets right
##### Oh yes, JS!
JS is one of the most popular languages among developers. That makes the transition for a web developer into mobile app development smoother.

##### One codebase for mobile, web, and desktop apps
JS facilitates developers to share code with web apps by creating abstraction components that can compile to target platforms. The world is your oyster in React! For example, Skype developed ReactXp to have a largely single codebase for Android, iOS, web and windows 10 UWP apps.

##### More mature and a community far and wide
No amount of money and resources can substitute maturity, and React is the most mature framework that is out there. You’ll find it difficult to encounter a question that has not already been answered in Stack Overflow. Anything you need to make your application over the top and rest assured you’ll find a 3rd party library for it.

#### React vs Flutter, fight!
##### Performance
Nothing comes close to pure native apps in terms of performance. React Native and Flutter is no exception. But when we compare the two though, Flutter comes on top, because of how it achieves cross-platform. React Native has to use a JS bridge to communicate with native APIs, hence slowing things down. Flutter on the other hand compiles C/C++ library to Dart, since it's closer to metal and it can be consumed faster.

##### Components out of the box
Many of the common components that you’d need as a developer are not supplied in React Native. You’ll have to hunt down 3rd party libraries to achieve the desired task. Flutter on the other hand, supports a whole ranger of widgets (components). Material design and Cupertino design (Apple’s design philosophy) are supported. There are over 375 official widgets out of the box, and many more being added all the time.

##### App sizes
One of the bigger tradeoffs with the cross-platform is the final build size of the app. It will always be more than an app built with vanilla Java/Kotlin/Swift. React Native and Flutter apps are no different. But on a comparative basis, React Native apps on average are smaller than Flutter apps. This is not a rule of thumb though.

##### Documentation
React has decent documentation. The only problem is that it is more focused towards the web developers and not app developers. Flutter’s 280-page documentation, is one of the best documentation you will ever find. Flutter also has a very active YouTube Channel, showcasing tips and tricks.

##### Code reusability
You cannot run React Native code directly on browsers or desktop. What you can do though is reuse parts of the code between let’s say React Native and React web. Flutter, on the other hand, allows you to use the same code and compile builds for whatever platforms it supports. This, of course, is dependent if all 3rd party dependencies are platform-agnostic or not. You just need to adjust the UI for various screen orientations!!

##### CI/CD support
React Native documentation does not have anything regarding CI/CD. You will have to use a third-party service like Fastlane or Codemagic to automate the deliveries. Flutter has a well-covered documentation and a rich CLI tool as well.

##### The Future?
Just a week ago Flutter announced an alpha release of Flutter for Windows. This means you can now make UWP apps with the Flutter framework. So the same app that runs on your iPad can also run on an Xbox or even a Hololens for that matter, so cool!

The list of possibilities just keeps on increasing. Still, it is quite clear that Flutter is playing catch up React, but it’s getting there fast.
React has maturity as an ecosystem. It also has the bases covered in terms of platforms supported.

What they are doing is working on an ambitious project called [Fabric](https://www.qed42.com/blog/react-native-fabric-why-am-i-so-excited). It is rewiring the JS framework from the ground up, aiming to make native API calls easier, support async rendering, and new threading models.

#### Conclusion
I am more excited about Flutter than React Native (mainly because I’m not a web developer). But it would be unwise to declare either React or Flutter as a winner. Each one has its pros and cons.

What framework is used should be decided solely by the use case and developer preference. Because the truth is both technologies are here to stay. If someone says Flutter is Dead on Arrival or React is doomed after the arrival of Flutter, it is more of a clickbait than the truth because *one framework does not have to be evil for the other to be good*.
