Unit testing is a key feature in software development. It also brings about a development paradigm known as Test-Driven-Development(TDD). These tests normally test the business logic of applications. In Test-Driven-Development, the developer writes tests that define what a specific function should do by pointing out the expected results. After the tests are properly structured, the developer then goes on to write the implementation of the function.

### Introduction
Android developers also write unit tests. The most popular library used to write these unit tests is JUnit4 and the Assert class. However, there is an alternative to the Assert class. The Truth library from google. This library does relatively the same function as the Assert class but with a more readable code. Unit tests run on the Java virtual machine(JVM). For this reason, tests run faster, and one does not have to wait for the emulator or physical device to start in order to test the logic implemented. This article goes through writing local unit tests in android using Kotlin programming language.

### Prerequisites
To follow through this tutorial, you will need to:
  1. Have [Android Studio](https://developer.android.com/studio) installed.
  2. Have a basic understanding of Kotlin programming language.

Let's get started

### Step 1 — Creating an Android Project
In this step, we're going to create our application. Open Android Studio and start a new project using the empty activity template. On the next page, give the application a name and keep the default settings.

![app name](/engineering-education/building-local-unit-tests-in-android-kotlin/app-name.png)

Click `Finish` and wait for the project build process to finish.

After build finishes, go to the app level `build.gradle` file and add the following dependencies.

```Gradle
testImplementation 'junit:junit:4.13.1'
testImplementation "com.google.truth:truth:1.1"
```

By default, the `JUnit` dependency is available in any newly created project. However, add it if it is not included. As you can see, we have added the dependencies with the keyword `testImplementation` and not the normal `implementation` keyword. What that means is that the dependency only applies to the test source set. We will go into the source set details later in the article.

### Step 2 — Creating the Test class
As mentioned earlier, we are going to practice the test-driven-development in android. So first, we are going to declare our expected results before writing the actual implementation.

Let's go through what is expected of our function. We are going to create a util class that holds authentication functions. The class will have a function to simulate the sign-up feature. This is the function we are going to focus on through this article. The function should validate the input we pass to it. Let's list down the behavior of the function.

The function should:
  1. return false when the username or password is empty.
  2. return false when the username is already taken. For this, we are going to create a sample list of usernames that have been taken.
  3. return false when the password and repeat password don't match.
  4. return false when the password is less than 2 digits.

In order to write tests for our function, we first have to create the function since we can't call a function that does not exist. To do this, create a kotlin object and give it the name `AuthUtil`.

![class name](/engineering-education/building-local-unit-tests-in-android-kotlin/class-name.png)

We make it an object so that we can access the function without creating an instance of the class. Add the following code to the class.

```Kotlin
val users = listOf("Peter", "John", "Smith")

fun signUp(
    userName: String,
    password: String,
    repeatPassword: String
): Boolean{
    return true
}
```

Here, we add a sample list of users and create the signUp function. The function takes in the necessary string parameters. It also returns a default value(true). We add the return value to avoid errors. Now that we have our test subject. Let's go ahead and create the tests.

To create the test class, write click on the class name and select `generate` then click `Test`. On the next screen, select `JUnit4` as the testing library. Leave the other fields to default values and click `OK`.

![new test image](/engineering-education/building-local-unit-tests-in-android-kotlin/test.png)

The next dialog box that appears prompts you to select the test source set. There are two types of test source set. One is the test source set and the other one is the android test source set. The test source set is where we write the business logic tests. On the other hand, the android test source set is where we write tests for functions that entirely depend on the android platform. An example of this type of test is the UI test. 

For our case, we select the test source set since our function does not depend on the android platform.

![test source set](/engineering-education/building-local-unit-tests-in-android-kotlin/test-source.png)

And that's it our test class has been created. Now let's go ahead and write the tests.

### Step 3 — Writing Tests.
By default, creating the test class using this approach opens up the class. Before we write our first test, let's look at a common test naming convention. To make test names more readable, developers use backticks to name their test functions. This allows one to add spaces and other special characters to the function name. However, this naming convention should only be used in test functions and not in normal functions.

Let's now write our first test

First, add the following imports at the top of the class.

```Kotlin
import org.junit.Test
import com.google.common.truth.Truth.*
```

As listed earlier, our first test should check whether the function returns false when the user passes an empty username or password. Add the following code to implement this.

```Kotlin
@Test
fun `signUp function returns false when username or password is empty`(){
    val userName = ""
    val password = ""
    val repeatPassword = ""
    assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
}
```

We use the `@Test` annotation to declare a function as a test. To test the behavior, we have passed in empty strings to the signUp function. We have then used the `assetThat` function to check whether the return value is false since that is what we expect. Check out this [link](https://truth.dev/) for more details about the `assertThat` function. 

To run the test individually, right-click on the test name and select `run`. The test should fail since we set the `signUp` function to return true.

On to the next test. The second test should check whether the user name entered already exists. If it exists the function should return false. Write the code below to implement this.

```Kotlin
@Test
fun `signUp function returns false when username is taken`(){
    val userName = "Peter"
    val password = "12345"
    val repeatPassword = "12345"
    assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
}
```
We pass in an already taken user name to test this behavior. The expected result is false but our function returns true so the test will fail when run.

For the third test, we are going to pass in different values for password and repeat password. This test should return false. Add the following code to implement this.

```Kotlin
@Test
fun `signUp function returns false when password and repeat password don't match`(){
    val userName = "James"
    val password = "12345"
    val repeatPassword = "67890"
    assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
}
```

And now the last test. The function should not allow passwords that are less than two characters. For this, we pass in a one-character password. We expect it to return false so the test should fail when run. Add the test implementation as follows.

```Kotlin
@Test
fun `signUp function returns false when password is less than two characters`(){
    val userName = "Brian"
    val password = "1"
    val repeatPassword = "1"
    assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
}
```
That's all the tests we need. To run all the tests at once, right-click on the test class name and select `Run`. All the tests should fail.

### Step 4 — Writing the funtion implementation
Now that our tests are all set, let's go ahead and write the actual function implementation. The function should fulfill all the test cases. Add the following code inside the `signUp` method.

```Kotlin
return when {
    userName.isEmpty() || password.isEmpty() -> false
    users.contains(userName) -> false
    password != repeatPassword -> false
    password.length < 2 -> false
    else -> true
}
```
We use the when statement to validate the values. All four statements create the behavior required for the function. When non of them evaluate to true, we pass return true meaning the input has passed all the tests. Navigate to the `AuthUtiTest` class and run the tests. The tests should pass.

This is the expected output from the `run` window.

![output](/engineering-education/building-local-unit-tests-in-android-kotlin/output.png)

### Conclusion
With that information, you can now write your unit tests. Unit tests fasten the software development process. This is because one declares the behavior before implementing it. In doing so, one does not have to worry about other components of the application. The focus is on only the function being implemented and tested. Also, you don't need to run the whole application so as to test a single function.