The tutorial is suitable for beginners. If you have recently started learning android programming using Kotlin, then you are in the perfect place. Every app needs to follow certain architectural principles. Failure to adhere to this requirement results in low-quality apps. Users will be disappointed in such applications, and the number of uninstalls will be high.

## Introduction to MVVM Architecture

Okay, let&#39;s start by evaluating what android architectures existed before MVVM. The first component is Model View Presenter denoted by MVP. Though this architecture separates the business logic from the app UI, it isn&#39;t easy to implement. In the long-run, this can translate into high development costs. The second android architecture is [MVC](https://openclassrooms.com/en/courses/4661936-develop-your-first-android-application/4679186-learn-the-model-view-controller-pattern#:~:text=Most%20Android%20developers%20use%20a,apply%20to%20our%20TopQuiz%20application.). Just like MVP, it is also quite complex and not suitable for small projects. MVVM (Model-View-ViewModel) was introduced by Google to help resolve these challenges. By separating code into smaller chunks, MVVM simplifies the debugging process. Through this article, you will understand MVVM architecture and implement it easily into your apps. Furthermore, the article will teach you how to debug errors resulting from this architecture. You can learn more about MVVM [here](https://developer.android.com/topic/libraries/architecture/viewmodel?gclid=Cj0KCQiA7qP9BRCLARIsABDaZzhDtIsNoyAcuVYiA3F3smhaKd4THplNIp1nDr-KGB_XWkzZxiIvrVAaAjYKEALw_wcB&gclsrc=aw.ds). Okay, let&#39;s implement this architecture in an android app.


### **Prerequisites**

1. Android studio
2. You must be familiar with [Kotlin](https://developer.android.com/kotlin/campaign/learn?gclid=Cj0KCQiA7qP9BRCLARIsABDaZzh1wodOJn7w8kKTtWq8yNFlx9xoqzEE_cU2KkCO2Ecdyyr2frGOVjQaAlSuEALw_wcB&gclsrc=aw.ds)
3. Install [lifecycle](https://developer.android.com/jetpack/androidx/releases/lifecycle) dependencies
4. Download the start code from [here](https://github.com/WanjaMIKE/MVVMExample)

**The goal of the tutorial**

By the end of this tutorial, you will create an app that takes input and displays it on a recycler view. A screenshot of the app is shown below.

### Step 1 – Launching Android Studio.

Launch Android Studio and create a new project, as shown below. Make sure that you select Kotlin as your preferred programming language. If you do not have Android Studio, you can install it from [here](https://developer.android.com/studio?gclid=Cj0KCQiA7qP9BRCLARIsABDaZzieBJWjBnokDdH6b0gQchoqudRXNohAGp_noSqALLuSlYuwA6EB5T4aAntwEALw_wcB&gclsrc=aw.ds)

![getting started](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/getting-started.png)

### Step 2 – Creating the model.

Create the app model. This is also referred to as the data class. To avoid confusion, create a package named model inside the java folder. Then, create a data class named Blog in the model package as shown below. For simplicity, the data class will only have one variable (title). In Kotlin, there is no need to use the get and set keywords. These functionalities are added to the data class automatically.

![model](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/model.png)

### Step 3 – Creating the view.

The view is what the user sees on the screen. The UI, therefore, needs to be well structured to minimize confusion and dissatisfaction.

Open the *activity\_main.xml* file and change the layout from constraint to linear layout. Ensure that the orientation is set to vertical. This ensures that the UI components such as buttons and text views are arranged vertically. For our app, the primary widgets are Edittext, button, and a recyclerview. Ensure that all of these widgets have IDs since they will be required at a later stage. The layout design and code are shown in the image below. The section with a list showing items 0 to 9 is the recyclerview. Whatever we type in the app will be displayed in that section once the submit button is clicked.

![view](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/view.png)

### Step 4 – Creating the view.

Still, on the layout, we need to create the design of the element that will be shown in the recyclerview. Therefore, create a file named item.xml and add the code shown in the image below. The design is simple since only one attribute from the data class will be displayed to the user.

![itemview](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/itemview.png)

### Step 5 – Create a RecyclerView Adapter

A RecyclerView adapter is responsible for binding the *item.xml* layout to the RecyclerView. It also takes in a list of items and displays them to the user. The code for the RecyclerView adapter is shown below.

![recyclerviewadapter](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/recycleradapter.png)

### Step 6 – Creating a ViewModel

Create a package named ViewModel. Inside this folder, create a Kotlin class and name it MainViewModel. The class should extend android ViewModel. You might face an error if you failed to add lifecycle dependencies from Jetpack. The MainViewModel will have a mutable livedata item that holds the array list. It is vital to use livedata since it notifies the UI in case of any data changes. The MainViewModel code is shown below.

![viewmodel](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/viewmodel.png)

### Step 7 – Create a ViewModel factory.

The purpose of a ViewModel factory is to instantiate the ViewModel. This prevents the app from crashing in case an activity is no found. The guideline for the MainViewModelFactory is shown below.

![viewmodelfactory](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/viewmodelfactory.png)

### Step 8 – MainActivity (Connecting the code)

We have created the model, ViewModel, ViewModelfactory, and RecyclerView. These components need to be instantiated in this class for the application to work.

Start by declaring the RecyclerView and instantiating it. Make sure the layout manager for the RecyclerView is set as LinearLayoutManager.

![mainactivity](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/mainactivity.png)

### Step 9 – Results

If there are no errors in your code, it should compile and show the UI in the image below. Whatever you type in the EditText field should display in the recyclerview once the submit button is clicked.

![results](/engineering-education/implementing-mvvm-architecture-in-android-using-kotlin/result.png)

## Conclusion

MVVM architecture has made it easy to build complex applications. As shown, it&#39;s easier to identify bugs due to the separation of business logic from the UI code. The architecture also prevents data loss, especially when the orientation of the screen changes. Ensure that all dependencies are installed before using MVVM. The measure helps prevent runtime errors.

## References
[JetPack](https://developer.android.com/jetpack/guide)
