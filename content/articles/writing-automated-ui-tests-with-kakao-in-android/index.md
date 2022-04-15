---
layout: engineering-education
status: publish
published: true
url: /writing-automated-ui-tests-with-kakao-in-android/
title: Writing Automated UI Tests with Kakao in Android
description: This tutorial will show the reader how to write automated UI tests with Kakao in Android.
author: judy-wangari
date: 2022-04-15T00:00:00-02:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/writing-automated-ui-tests-with-kakao-in-android/hero.jpg
    alt: Writing Automated UI tests with Kakao in Android
---
Instrumented tests ensure that an app functions correctly and as expected. This reduces the number of instances where an application fails during production.
<!--more-->
We can perform manual testing, in which we test every feature of our app. However, the manual method is time-consuming and we may fail to test certain components.

### Prerequisites
To follow along, you should have:
- Basic knowledge of Android instrument tests.
- Some basics with Espresso.
- Android Studio installed on your computer.
- Good knowledge of creating and running Android apps.
- Basic knowledge of the Kotlin programming language.

### Introduction
Espresso is a testing framework that allows developers to write instrumented tests in Android. 

To understand more on how to write tests with Espresso, please check out this article - [Automating UI Tests in Android Using Espresso](https://www.section.io/engineering-education/automating-ui-tests-in-android-using-espresso/).

Although Espresso is great, it has its downfalls. For instance, it reduces code readability and results in a lot of boilerplate code. This is where Kakao comes in.

[Kakao](https://github.com/agoda-com/Kakao) is built on top of Espresso and allows one to write more powerful UI tests.

### Getting started
In this tutorial, we will write UI tests with Kakao for three `Activities`.

### Step 1 - Setting up the project
Create an empty Android project and give it a name of your choice.

Open your app-level `build.gradle` and add the following dependencies:

```bash
// Kakao
androidTestImplementation 'io.github.kakaocup:kakao:3.0.6'
```

> Make sure the following dependencies are already included, if not, just add them:

```bash
androidTestImplementation 'androidx.test.ext:junit:1.1.3'
androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
```

### Step 2 - The user interfaces
Because we'll write automated UI tests, we need multiple UIs to test. Go ahead and design and add the logic of the following layouts:

> You can check out the complete code in this Github repository - [UI Testing With Kakao Demo](https://github.com/codewithjudy/UITestingWithKakaoDemo).

> The repository contains the full implementation of the code. We will focus on testing the user interfaces to make sure they work as expected.

#### MainActivity

![main layout](/engineering-education/writing-automated-ui-tests-with-kakao-in-android/layout-main.png)

#### RegisterActivity

![register layout](/engineering-education/writing-automated-ui-tests-with-kakao-in-android/layout-register.png)

#### SearchActivity

![search layout](/engineering-education/writing-automated-ui-tests-with-kakao-in-android/layout-search.png)

### Step 3 - Declaring screens
Kakao uses `Screens` that contain all the views that a given layout holds. To reference `Views` from the actual user interface, Kakao uses support views such as `KTextView,` `KImageView,` `KButton,` `KRecyclerView` and many more.

To create a `Screen`, create a class that extends `Screen`, as shown below:

```kotlin
class TestScreen : Screen<TestScreen>(){
    ...
}
```

To reference `Views`, declare a variable and use `withId` to find the `id` of the actual view:

```kotlin
val testTextview = KTextView{
    withId(R.id.textViewTest)
}
```

Now, let's define all the screens that we will test.

Since UI tests (Instrumented tests) involve using Android components, we will write our test in the `androidTest` source set. Navigate to the `androidTest` section and create a new package called `screens`.

#### MainScreen
We will create a `Screen` with two `TextViews`, `ImageView` and a `Button`:

```kotlin
class MainScreen : Screen<MainScreen>(){
    val titleTextview = KTextView{
        withId(R.id.textViewTitle)
    }
    val androidImageView = KImageView {
        withId(R.id.androidImageView)
    }
    val changeButton  = KButton {
        withId(R.id.changeTextButton)
    }
    val changedTextView = KTextView {
        withId(R.id.textViewChangedText)
    }
}
```

#### RegisterScreen
This layout contains several `EditTexts`, a `Button`, and a `Snackbar`:

```kotlin
class RegisterScreen : Screen<RegisterScreen>(){
    val emailEditText = KEditText{
        withId(R.id.edtEmail)
    }
    val nameEditText = KEditText{
        withId(R.id.edtName)
    }
    val phoneEditText = KEditText{
        withId(R.id.edtPhone)
    }
    val passwordEditText = KEditText{
        withId(R.id.edtPassword)
    }
    val registerButton = KButton{
        withId(R.id.registerButton)
    }
    val snackbar = KSnackbar()
}
```

#### SearchScreen
This layout contains a search `EditText`, `Button`, and a `RecyclerView`. To define a `RecyclerView`, you use a `KRecyclerView` and for the ViewHolder, use `KRecyclerItem`:

```kotlin
class SearchScreen : Screen<SearchScreen>() {
    val searchEditText = KEditText {
        withId(R.id.searchEditText)
        withHint("Search...")
    }
    val searchButton = KButton {withId(R.id.searchButton)}
    val snackbar = KSnackbar()

    val carsRecyclerview = KRecyclerView(
        builder = { withId(R.id.carsRecyclerview)},
        itemTypeBuilder = {itemType(SearchScreen::Item)}
    )

    internal class Item(parent: Matcher<View>) : KRecyclerItem<Item>(parent){
        val name: KTextView = KTextView(parent) {withId(R.id.textViewCarName)}
        val price: KTextView = KTextView(parent) {withId(R.id.textViewCarPrice)}
        val type: KTextView = KTextView(parent) {withId(R.id.textViewCarType)}
    }
}
```

### Step 4 - Writing tests with Kakao
First, let's write tests for the `MainActivity` layout. The layout contains:
- A `TextView` with a  title.
- An `ImageView` with an image.
- A `Button` that, when clicked, should change the text.
- A `TextView` whose text should change when the `Button` is clicked.

Create a new class called `MainActivityTests` and annotate it with `@RunWith(AndroidJUnit4::class)`. Next, add the function below to launch the `MainActivity`:

```kotlin
@RunWith(AndroidJUnit4::class)
class MainActivityTests {
    @Before
    fun setup(){
        launch(MainActivity::class.java)
    }
    ...
}
```

As demonstrated below, Kakao is quite simple to implement. We use the `onScreen<>` to write our assertions:

```kotlin
onScreen<TestScreen> {
    ...
}
```

We can now test to see if our first `TextView` contains the right `title` and that it is displayed correctly:

```kotlin
@Test
fun test_if_title_textview_is_displayed_and_has_correct_title(){
    onScreen<MainScreen> {
        titleTextview.isDisplayed()
        titleTextview.hasText("Testing with Kakao is awesome")
    }
}
```

Next, test if the first `ImageView` contains the right image and it is displayed:

```kotlin
@Test
fun test_if_android_image_is_displayed_and_the_right_one(){
    onScreen<MainScreen> {
        androidImageView.isDisplayed()
        androidImageView.hasDrawable(R.drawable.android)
    }
}
```

Check if our first `TextView` changes texts when the `Button` is clicked:

```kotlin
@Test
fun test_if_text_is_changed_on_button_click(){
    onScreen<MainScreen> {
        changeButton.click()
        changedTextView.hasNoText("Text to be changed")
        changedTextView.hasText("Something else")
    }
}
```

Let's test the second activity that simulates a sign-up form. We will test if the correct errors are shown when fields are left blank.

Create a new test class called `RegisterActivityTests`. Write the setup function below to launch it.

We use the following code to test if an error is set to the `EditText` when it is left blank:

```kotlin
@Test
fun test_if_email_edittext_when_empty_returns_an_error(){
    onScreen<RegisterScreen>{

        emailEditText.replaceText("") // empty text
        nameEditText.replaceText("zf") // random text
        phoneEditText.replaceText("zdf")
        passwordEditText.replaceText("zdfs")

        registerButton{
            click()
        }
        emailEditText{
            view.check(matches(hasErrorText("Email field cannot be empty")))
        }
    }
}
```

> You can use the above code to test other `EditTexts`.

Test to see if a `Snackbar` is shown when all fields are filled correctly:

```kotlin
@Test
fun test_that_a_snackbar_is_shown_when_all_fields_filled(){
    onScreen<RegisterScreen>{
        emailEditText.replaceText("test@test.com")
        nameEditText.replaceText("John Doe")
        phoneEditText.replaceText("0712345678")
        passwordEditText.replaceText("12345678")

        registerButton.click()

        snackbar.text.hasText("Registering...")
    }
}
```

Finally, let's go ahead and write tests for our `SearchScreen`.

Create a new class named `SearchActivityTests`. Here, we will see if the `Recyclerview` displays the correct items and that when we search, our `Snackbar` displays the respective content.

Testing whether a `Snackbar` appears when the search `EditText` is left blank:

```kotlin
@Test
fun test_if_search_edittext_is_empty_shows_a_snackbar(){
    onScreen<SearchScreen>{
        searchButton.click()
        searchEditText.replaceText("")
        snackbar.text{
            hasText("Empty search field")
        }
    }
}
```

Testing if the `RecyclerView` item contains the correct content:

```kotlin
@Test
fun first_recylerview_item_has_correct_name_price_and_type(){
    onScreen<SearchScreen> {
        carsRecyclerview {
            firstChild<SearchScreen.Item> {
                isVisible()
                name {hasText("Audi")}
                price {hasText("15000000")}
                type {hasText("Q3")}
            }
        }
    }
}
```

Testing if the `Recyclerview` has the correct number of items.

```kotlin
@Test
fun test_the_size_of_the_recyclerview_list_is_14(){
    onScreen<SearchScreen> {
        carsRecyclerview {
            hasSize(14)
        }
    }
}
```

### Demo
When you run the tests, they should all pass as shown below unless you have any errors:

![test pass](/engineering-education/writing-automated-ui-tests-with-kakao-in-android/test-pass.png)

### Conclusion
In this tutorial, we have discussed how Kakao outperforms Espresso. We've also learned how to integrate Kakao into an Android Project.

Finally, we wrote tests for our user interfaces using Kakao.

You can read more about Kakao for Jetpack Compose [Here](https://github.com/kakaocup/compose). 

The complete code can be found on this [GitHub repository](https://github.com/codewithjudy/UITestingWithKakaoDemo).

### Further reading
- [KakaoCup Github](https://github.com/KakaoCup/Kakao)
- [Espresso Docs](https://developer.android.com/training/testing/espresso)

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)