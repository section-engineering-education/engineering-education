### Flutter vs React Native : Which is a better cross platform framework
![hero-image](/engineering-education/flutter-vs-reactnative/hero.jpg)
Photo by [Michał Parzuchowski](https://unsplash.com/@mparzuchowski) on [Unsplash](https://unsplash.com/photos/dmH3NWhYTHQ)

Today, companies are not just making products, but ecosystems. A gamut of services which can prove to be a steady revenue stream. So it is only natural for them to try getting apps to run across devices in the ecosystem. How about being able to do that with a single codebase? Wishful thinking? It may be true 20 years ago, but not today.

#### Take #1: One bytecode to rule ‘em all
The dream of a cross-platform was first braved by Java. It devised the paradigm of Write Once Run Anywhere(WORA). It was successful to a major extent, according to the Java installer at least.
![Java Installer](/engineering-education/flutter-vs-reactnative/installer.jpeg)
Things went south when companies started making their own Java implementations for exclusivity. Oracle turned licenses and usage rights upside down. Hundreds of products like J2ME, J2EE, Open JDK, Jakarta etc popped up. Java became too fragmented to be universal. 

#### Take 2: A glorified webpage
Mobiles became more powerful, more compact, more connected. They were getting more attention than our humble PC or laptop did. So companies were looking for developing for mobile while supporting the PC. For the mobile was the future, but the PC still was the largest user base. The thought process was to present a webpage wrapped in an app. Frameworks like ionic, PhoneGap, Cordova tried to do it but the performance was not on par. 

#### Take #2.5- Enter React Native
React is a front end framework for the web. What React Native did was extend the functionality of React to native Android and iOS. The developer got to code the UI as React components. The developer could use the same code used in their React web app for some UI elements. Later React Native would replace those web elements with the corresponding native elements. For eg ``` <span> ``` primitive is replaced with TextView in the native build and UI View in iOS build. This was better than the earlier approach because
1. Web developers could dive into mobile app development without a steep learning curve.
2. Code can be reused to a large extent.
3. It offers better performance than a web app wrapper as it runs closer to metal.

#### Take #3: A Blank canvas
Let's take a look at mobile game development frameworks like Unity. They don't have anything like the Native UI component. All they provide is a blank 2D canvas or an empty 3D space. You are free to show anything you want in that space, irrespective of the mobile platform you are on. Flutter works in the same way, unlike other app development frameworks. The platform is just concerned with rendering a canvas(Skia canvas). Once the canvas is created, Flutter paints on that canvas 60 times a second. That way it does not have to deal with platform-specific components. What prevents flutter from supporting another platform is its inability to run the Skia canvas on that platform. If you get that running and you have gotten yourself another platform flutter now supports, yay!

#### What Flutter gets right

##### Hot Reload-The MVP of flutter
Flutter hot reloads are super fast. Developers can make changes and view them on the fly within milliseconds. Want to try out which colour suits the app? You can keep changing the colour and it’ll show up in the app near instantly! Great for rapid prototyping and creating an MVP.

##### 1 codebase- multiple platforms
Android, iOS, web, Windows, macOS, Linux, smartwatches, IoT. That’s all the platforms existing for users. (Painting on canvas, basically the Bob Ross of frameworks!)

##### Smooth UI, rendered at 60fps
Because Flutter is painting stuff, there's visual processing involved. This gets the GPU takes a generous load off the processors. So achieving 60 fps rendering is not a telling task for the framework.

##### A UI first framework
Flutter has a wide gamut of widgets built right in.  Want to change height, width, colour, alignment etc? Just wrap in an AnimatedContainer and you’re done. Imagine doing all that in any other framework. Flutter widgets are platform agnostic. Hence it is possible to show iOS style translucent dialog box in android in Flutter using the Cupertino package. 

#### What React gets right

##### Oh yes, JS!
JS is one of the most popular languages among developers. That makes the transition for a web developer into mobile app development smooth.

##### One codebase for mobile, web and desktop apps
JS facilitates developers to share code with web apps by creating abstraction components that can compile to target platforms. The world is your oyster in react! For eg Skype developed ReactXp to have a largely single codebase for Android, iOS, web and windows 10 UWP apps

##### More mature and a community far and wide
No amount of money and resources can substitute maturity, and React is the most mature that is out there. You’ll find it difficult to encounter a question is not already been answered in Stack Overflow. Anything you need over the top and rest assured you’ll find a 3rd party library for it.

#### React vs Flutter, fight!

##### Performance
Nothing comes close to pure native apps in terms of performance. React Native and Flutter is no exception. But when we compare the two though, Flutter comes on top, because of how it achieves cross-platform. React Native has to use a JS bridge to communicate with native APIs, hence slowing things down. Flutter on the other hand compiles C/C++ library to dart, hence closer to metal and consumed faster.

##### Components out of the box
Many of the common components that you’d need as a developer are not supplied in React Native. You’ll have to hunt down 3rd party libraries to achieve the task. Flutter meanwhile supports a whole gamut of widgets(components). Material design and Cupertino design(Apple’s design philosophy) are supported. There are over 375 official widgets out of the box, and many more being added over time.

##### Software architecture and state management
React native has a mature ecosystem around this. The developers have the freedom to choose which navigation package, global state management package they want without them worrying about how widely adopted it is. Flutter has only a handful of such packages, with each package not having widespread knowledge. For eg- I use a package called stacked for state management, but it is hardly known in the community till now. This problem will surely go away in the future though with the rising adoption of flutter as a framework.

##### App sizes
One of the bigger tradeoffs with the cross-platform is the app size, it is bound to be larger than native apps. But in this respect, it is usually seen that react apps are relatively smaller than flutter apps.

##### Documentation
React has decent documentation. The only problem is that it is more focused towards the web developers and not app developers. Flutter’s 280-page documentation though, is one of the best documentation you will ever find. Flutter also has a very active Youtube Channel, showcasing tips and tricks.

##### Code reusability
You cannot run React Native code directly on browsers or desktop. What you can do though is reuse parts of the code between let’s say React Native and React web. Flutter, on the other hand, allows you to use the same code and compile builds for whatever platforms it supports. This, of course, is dependent if all 3rd party dependencies are platform-agnostic or not. You just need to adjust the UI for various screen orientations !!

##### CI/CD support
React Native documentation does not have anything on CI/CD. You will have to use a third-party service like Fastlane or Codemagic to automate the deliveries. Flutter has a well-covered documentation and a rich CLI tool for same.

##### The Future?
Just a week ago Flutter announced an alpha release of Flutter for Windows. It means you can now make UWP apps with the flutter framework. So the same app that runs on your iPad can also run on an Xbox or even a Hololens for that matter, so cool! The list of possibilities just goes in increasing. Still, it is quite clear that Flutter is playing catch up here with React though, but it’s getting there fast.
React has a maturity as an ecosystem. It also has the bases covered in terms of platforms supported. What they are doing is working on an ambitious project called Fabric. It is rewiring the JS framework ground up, aiming to make native API calls easier, support async rendering and new threading models.

#### Conclusion
I am more excited about Flutter than React Native(mostly because I’m not a web dev). But if one was to think wisely, it is just unwise to declare either React or Flutter as a winner. Each one has its pros and cons. What framework is used should be decided solely on the use case and developer preference. Because the truth is both technologies are here to stay. If someone says Flutter is Dead on Arrival or React is doomed after the arrival of Flutter, it is more of a clickbait than the truth because *one does not have to be evil for the other to be good*.