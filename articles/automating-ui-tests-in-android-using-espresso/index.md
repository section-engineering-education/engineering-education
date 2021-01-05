### Introduction
Other than writing unit tests, developers also have to write User Interface tests to ensure their UI works as expected. Many a times, developers find themselves doing these tests manually. Well, it is not much of a disadvantage on a small project. However, manually running UI test on a big project is a huge disadvantage. It is tiresome and time consuming. Imagine repeating the same test process every time you add a feature or fix bugs. This takes away time that could be used for other important activities. Not to mean that testing is not a priority, it is, but it has to be done in a smart way. 

Well, how can we do these test in a smart way? `Espresso` framework is here to help. This framework gives an android developer the ability to automate these tests. You just tell it the activity you want to open, which views you want to click on, which views you want to add text to, and all that is done for you. Fascinating, right? That's exactly what we are going to cover in this article.

### Prerequisites
To follow through, you will need to:
  1. Have [Android Studio](https://developer.android.com/studio) installed.
  2. Have a basic knowledge of building Android applications.
  3. Have a basic understanding of the [Kotlin](/engineering-education/kotlin-collections/) programming language.

Let's get started!

### Step 1 — Setting up Espresso
We are going to write tests for a To-Do list application that I created in a previous [article](engineering-education/introduction-to-room-db). The application has no test code in it.

First, open android studio and select `Get from version control`. Paste the following URL in the URL section.
```
https://github.com/kayere/To-do.git
```

Wait for project build to finish.

After build finishes, open the app-level `build.gradle` file and check whether the following dependencies are present. 
```Gradle
testImplementation 'junit:junit:4.13.1'
androidTestImplementation 'androidx.test:runner:1.3.0'
androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
```

The Espresso framework is part of the `androidx` library. Add and sync the dependencies if they are missing. These dependencies are added by default to any new project that targets API 15.

Go through the project to get a grip of what is going on.

Lastly, turn off animations on the test device. Animations slow down device's performance which may lead to unexpected results during testing. To turn off animations, go to developer options in settings, go to the `Drawing` section and turn off the
- Window animation scale.
- Transition animation scale, and
- Animator duration scale.

We are all set, let's get to testing.

### Step 2 — Writing UI Tests With Espresso
Espresso is like a robot that should be told what to do to the UI. The developer needs to specify the actions that the framework should perform on the views. The framework has three basic steps to writing UI tests. 
 1. Find a view - Tell the framework what view to find. We use the `ViewMatcher` class to find a view.
 2. Perform an action - Tell the framework what to do on the view. We use the `ViewAction` class to perform an action on a view.
 3. Assert the results - Check whether the result reflects the expected one. We use the `ViewAssertion` class for assertions.

Let's write our firs test.

We are going to test the process of adding a To-Do item in our app. Open `MainActivity` class. Our first test will be to check whether clicking the Floating Action Button opens up the alert dialog. To create the test class, right-click on the class name and select `Generate` then `Test`. Select JUnit4 as the testing library, leave the class name as it is and press `OK`. Select the android test source set and press `OK`.

Add the following annotations at the top of the class.
```Kotlin
@RunWith(AndroidJUnit4::class)
@LargeTest
```

Then add an activity rule inside the test class.
```Kotlin
@get:Rule
    val activityRule = ActivityScenarioRule(MainActivity::class.java)
```

This rule launches the target activity before any test is run and before any function annotated with the `@Before` annotation is run. It then closes the activity when the all the tests have run and when functions annotated with the `@After` annotations are run.

Now to the first test. Create a function as shown
```Kotlin
@Test
fun fab_is_clicked(){

}
```

Add the following code inside the function.
```Kotlin
onView(withId(R.id.fab))
    .perform(click())
onView(withId(R.id.materialTextView))
    .check(matches(isDisplayed()))
```

Let's see what goes on in the function. `onView` is a function in the Espresso class. `withId` is a function in the `ViewMatcher` class that finds a view with the specified id. There are many other functions in the `ViewMatcher` class such us `withText`, `withTagKey`, `withTagValue`, etc. `perform` is a method in the `ViewAction` class that performs the action specified as the parameter. Other actions are `doubleClick`, `longClick`, `pressBack`, `openLink`, etc. `check` method is used to assert. It takes in the `matches` function which is a method in the `ViewAssertion` class. The function then takes in the function to assert. For our case we assert whether the the view is displayed. To the test, right-click on the class name and select `Run`.

### Step 3 — Finishing up The Test
Our main aim is to test the process of adding a To-Do item. The test we have written above is part of the process. However, it was just an example. Let's modify the function to achieve our desired output. We are supposed to add logic that adds text to the material TextView and presses save. We then have to check whether the recycler view has the item we have just saved. 

Change the test name to `test_add_to-do` and add the following code.
```Kotlin
onView(withId(R.id.item))
    .perform(typeText("This is a test To-do"))
onView(withText("Save"))
    .perform(click())
onView(withId(R.id.textView))
    .check(matches(withText("This is a test To-do")))
```

As you can see, the flow is just as described. Find the view, perform an action on the view and finally assert. Here, we find the edit text with the id `item` then add text to it. Since the `Save` button is on the alert dialog and not on the layout, we instead find it with the `withText` function. On finding it we click it to save the to-do item. We then check whether the text view in the recycler view view holder matches the text we have added. 

And that's it. Lets run our test. Right-click on the test class name and select `Run`.

This is how the app test should run.

![Test result](/engineering-education/automating-ui-tests-in-android-using-espresso/result.gif)

### Conclusion
With that, you have seen how automated tests are written and how they run. Another perk of espresso is that it observes the activity lifecycle. Therefore, you don't have to write additional logic to handle them since espresso does it for you. Go ahead and automate your UI tests. It will save some time for you and hopefully, you will be more productive. Happy Testing!