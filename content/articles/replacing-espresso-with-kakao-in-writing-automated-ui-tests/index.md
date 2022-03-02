When writing UI tests, Instrumented tests make sure that our app functions correctly and as expected, this reduces the scenarios where the app goes and misbehaves when it is in production. We can do manual testing where we test every feature of our app by hand. This manual method might have its repercussions as we might miss testing some parts.

### Prerequisites
To follow along, you should have:
- Basic knowledge of what Instrument tests are in Android.
- Some basics with Espresso.
- Android Studio installed on your computer.
- Good knowledge of creating and running Android apps.
- Basic knowledge of the Kotlin.

### Introduction
Espresso is a testing framework that helps us write instrumented tests in Android. To understand how to write tests with Espresso, please check out this article - [Automating UI Tests in Android Using Espresso](https://www.section.io/engineering-education/automating-ui-tests-in-android-using-espresso/). Though Espresso is great, it has its downfalls such as having code tests that are not easily readable and a lot of boilerplate code. And this is where Kakao comes in.

Kakao is built on top of Espresso and makes writing UI tests great.

### Getting started
In this tutorial, we will write some UI tests with Kakao for some three `Activities` that I have prepared.

### Step 1 - Setting up everything
Create an empty Android project and give it a name of your choice

Open you app-level `build.gradle` and add the following dependencies:

```gradle
// Kakao
androidTestImplementation 'io.github.kakaocup:kakao:3.0.6'
```

> Make sure the following dependencies are already included, if not, just add them:

```gradle
androidTestImplementation 'androidx.test.ext:junit:1.1.3'
androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
```

### Step 2 - User interfaces
Because we will write automated UI tests, we need the different UIs that we will test. Go ahead and design and add the logic of the following layouts. If you need to follow along, you can check out the complete code in this Github repository - [UI Testing With Kakao Demo](https://github.com/codewithjudy/UITestingWithKakaoDemo).

The repository contains the full implementation of the code. We will focus on testing the user interfaces to make sure they work as expected.

##### MainActivity
![layout-main](/engineering-education/implementdatabase-driven-push-notifications-in-android-with-firebase/layout-main.png)

##### RegisterActivity
![layout-register](/engineering-education/implementdatabase-driven-push-notifications-in-android-with-firebase/layout-register.png)

##### SearchActivity
![layout-search](/engineering-education/implementdatabase-driven-push-notifications-in-android-with-firebase/layout-search.png)

### Step 3 -Declaring screens
 Kakao uses `Screens` containing all the views that a given layout holds. To reference `Views` from the actual user interface, Kakao has different supports views such as `KTextView,` `KImageView,` `KButton,` `KRecyclerView` and many more.

To create a `Screen,` you make a class that extends `Screen` and passes the screen you create.

 ```kotlin
class TestScreen : Screen<TestScreen>(){
    ...
}
 ```

 To reference Views, declare a variable and use `withId` to find the `id` of the actual view.

 ```kotlin
val testTextview = KTextView{
    withId(R.id.textViewTest)
}
 ```

Now, let us define all the screens that we will test. 

Because UI tests (Instrumented tests) involve using Android components, we will write our test in the `androidTest` source set. Open it and create a new package called 'screens.'

#### MainScreen
Create a `Screen` with two `TextViews,` `ImageView` and a `Button.`

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
This layout contains several `EditTexts,` `Button,` and a `Snackbar.`

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
This layout contains a search `EditText,` `Button,` and a `RecyclerView.` To define a `RecyclerView,` you use a `KRecyclerView` and for the ViewHolder, use `KRecyclerItem.`

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
First, let us write tests for the `MainActivity` layout. The layout contains:
 - A `TextView` with a  title.
 - An `ImageView` with an image.
 - A `Button` that, when clicked, will change the text.
 - A `TextView` that will change text when the `Button` is clicked.


Create a new class called `MainActivityTests` and make sure you have annotated it `@RunWith(AndroidJUnit4::class)`. Then, write the function to launch the `MainActivity.`

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

With Kakao, it is straightforward; you use the `onScreen` and then write your assertions inside there.

```kotlin
onScreen<TestScreen> {
    ...
}
```

Test to see if our first `TextView` contains the right title and  that it is displayed. 
```kotlin
@Test
fun test_if_title_textview_is_displayed_and_has_correct_title(){
    onScreen<MainScreen> {
        titleTextview.isDisplayed()
        titleTextview.hasText("Testing with Kakao is awesome")
    }
}
```

Test to see if our first `ImageView` contains the right image and it is displayed. 
```kotlin
    @Test
    fun test_if_android_image_is_displayed_and_the_right_one(){
        onScreen<MainScreen> {
            androidImageView.isDisplayed()
            androidImageView.hasDrawable(R.drawable.android)
        }
    }
```

Test to see if our first `TextView` changes texts when the `Button` is clicked. 
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

Let's test the second activity that simulates a signup form. We will test if correct errors are shown when fields are left blank. Create a new test class called `RegisterActivityTests` and make sure you write the setup function to launch it.


Test to see if an error is set to the `EditText`, when it is left blank. 
```kotlin
    @Test
    fun test_if_email_edittext_when_empty_returns_an_error(){
        onScreen<RegisterScreen>{

            emailEditText.replaceText("")
            nameEditText.replaceText("zf")
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

> You can write the other test for the other `EditTexts,` similar to the first test, just some minor tweaks.

Test to see if a `Snackbar` is shown when all fields are filled correctly.
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
}
```

Finally, let us go ahead and write tests for our `SearchScreen.` Create a new class, and call it `SearchActivityTests.` Here, we will see if the `Recyclerview` displays correct items and that when we search, our `Snackbar` displays the respective content.

Testing if when the search `EditText` is left blank, it display a `Snackbar`
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

Testing if the `RecyclerView` item contains the correct content.
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

Testing if the `Recyclerview` has the correct size of items.
```kotlin
    @Test
    fun test_the_size_of_the_recyclerview_list_is_14(){
        onScreen<SearchScreen> {
            carsRecyclerview {
                hasSize(14)
            }
        }
    }
}
```

### Demo
And that is all, and when you run the tests, they should all pass.

![test-pass](/engineering-education/implementdatabase-driven-push-notifications-in-android-with-firebase/test-pass.gif)

### Conclusion
With that, you now know what Kakao is and how it outperforms Espresso, you understand how to integrate Kakao in an Android Project, knowledge of what are screens and how to create them, finally we went ahead. We wrote tests for our three user interfaces with Kakao. Keep exploring more about Kakao and checkout [Kakao for Compose](https://github.com/kakaocup/compose). Also, you can visit this Github repo to get the complete code plus tests - [UI Testing With Kakao Demo](https://github.com/codewithjudy/UITestingWithKakaoDemo).

### Further reading
- [KakaoCup Github](https://github.com/KakaoCup/Kakao)
- [Espresso Docs](https://developer.android.com/training/testing/espresso)

Happy coding!
