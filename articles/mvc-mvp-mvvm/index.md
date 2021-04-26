### What are Architectural Patterns in Android?

### Introduction

We use various mobile and web applications in our day-to-day life. These applications are aimed to make our computational experience simple and seamless. Some of these applications are compatible with mobile operating systems such as Android, iOS and some are compatible with desktop operating systems such as Windows, macOS, Linux, etc and some of these even may be cross-platform (applications that can be operated on more than one operating system).

Even though these applications may differ in aspects such as what they do, how they work, how it is built, etc.., one thing that remains the same -- that is their **unique architecture and User Interface**. These elements can serve as a key component to the overall application creation process. Having a better and unique UI can make a huge difference in how great an application is. The UI is solely not based on the developers' imagination, but also on the consumer who may be using it. The interface must be user-friendly so that it will be easier for the user to grasp the visual changes taking place in the application while using it.

### Importance of Architectural Patterns

A typical native android application (applications that are only compatible with Android OS) will run only on mobile devices. Now compared to desktops and laptops, mobile phones are smaller in size. So not all the content of the android app can be viewed on a single small screen. Different parts of the app are equipped in different [fragments](https://developer.android.com/guide/fragments). The app may need certain specific commands which will access these parts when the user wishes to access them. When they are accessed the whole app has to update its interface with the new data. Hence, android architecture patterns are implemented to modify these crucial parts of the code. This article deals with such architectural patterns which can be implemented to improve the overall project design.

There are many benefits for an application by adding design patterns. It makes the whole source code cleaner and easier to maintain and manage. It simplifies complex codes since many functions will be nested in different classes. It also helps in covering all unit tests. This article will briefly discuss the three most popular patterns: MVC, MVP, and MVVM.

### Types of Patterns

- MVC - [Model View Controller](#model-view-controller)
- MVP - [Model View Presenter](#model-view-presenter)
- MVVM - [Model View View-Model](#model-view-view-model)

Let us take a look at these three types one by one.

#### Model View Controller

[MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern was first developed in 1970. As the name describes itself, this pattern has three components - Model, View, and Controller. The **Model** holds the main logic and rules for how the data is changed and manipulated. View and Controller both depend on the Model. **View** refers to the UI layer. It allows you to see the data that is stored in the model. The **Controller** acts as a request handler. It handles all the incoming requests from the user and updates the model to show what kind of data the user wants to see. Then the view displays it on the screen. If the view follows the [single responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) then its main part is to display the data from the model for every user event handled by the controller.

Here the developers can work on different parts of the pattern separately. Hence, work can be completed a lot quicker. This pattern can come in handy if multiple views are required for the application. Many of the elements function together and coordinate with other components. However, since they all rely on each other, if one of the components fails, it may pose a problem for the whole application.

#### Model View Presenter

Here the controller part is replaced by the presenter. The **Presenter** is responsible for accepting all the incoming inputs/requests from the user. It then transfers them to the **Model**. The model accesses the data the user wants and sends it back as a result to the **View**. Hence, the key task of the presenter is to deal with all the UI events so that users can retrieve their data. The role of model and view in [MVP](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter) is the same as in MVC. One of the assisting factors to the application while using MVP is that the view is submissive. Its sole purpose is to approve all user activities and transfer the rest of the work to the presenter. Additionally, since all three parts are separated, debugging becomes simpler because unit testing can be done when other parts are still being developed.

#### Model View View-Model

In [MVVM](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel), the view is independent of the model. This means that the UI part is separated from the core logic of the application. It's the job of the view model to retrieve the data from the model and present them in the view. Also, the view model carries out the computational work of the view by handling the user events and updating the UI. This is because in MVVM the view is responsible for notifying the view-model about all the user action. As a result, we can assume that View and View-Model has a two-way data binding relationship.

### Mind Map

Since the above architectural designs are based around the idea of collaborating with their own structure to achieve a positive outcome, each component has its own set of responsibilities. Model and View are shared by all of the patterns mentioned above. The third aspect is what distinguishes them from one another. As a result, here is a simplified mind map to help you visualize what each pattern represents.

![Architectural Patterns](/engineering-education/mvc-mvp-mvvm/img.jpg)

### Summary

So, in this article, we went through three architecture patterns that can be used while designing Android apps. While using design patterns in your apps is not mandatory, implementing them will definitely make the UI interface more user-friendly and will benefit in managing various functions and classes. This contributes to giving the application a modular structure. Often, implementing patterns can be time-consuming because each component must be built first and then unit tested before being released completely into the source code. Although the developer team must be meticulous in their future supervision and management because a single flaw or bug in the pattern may be harmful to the coherence of the architecture. Even so, one thing is certain: the code becomes less messy and more readable and it also performs efficiently in A/B testing. No one pattern is considered the best of the three; it essentially depends on the users' demand, developers' decision, and the needs of the application.

### Additional Resources

- Comparison: [MVP vs MVC vs MVVM](https://yourstory.com/mystory/mvp-vs-mvc-vs-mvvm)
- Further Information: [Android Architectural Patterns](https://www.geeksforgeeks.org/android-architecture-patterns/)
- Detailed explanation on Individual Patterns: [MVP](https://medium.com/android-news/architecture-patterns-in-android-abf99f2b6f70) | [MVC](https://www.tutorialspoint.com/mvc_framework/mvc_framework_introduction.htm) | [MVVM](https://blog.mindorks.com/mvvm-architecture-android-tutorial-for-beginners-step-by-step-guide)
  