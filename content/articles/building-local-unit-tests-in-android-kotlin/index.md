---
layout: engineering-education
status: publish
published: true
url: /building-local-unit-tests-in-android-kotlin/
title: Building Local Unit Tests in Android Kotlin
description: This article shows you how to create and implement local unit tests in Android Studio using Kotlin. The most popular library used to write these unit tests is JUnit4 and the Assert class.
author: peter-kayere
date: 2021-01-10T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-local-unit-tests-in-android-kotlin/hero.jpg
    alt: Local unit tests example image
---
Unit testing is a crucial feature of software development. It brings about a development paradigm known as Test Driven Development (TDD). These tests typically test the business logic of applications. In Test Driven Development, the developer writes tests that define what a specific function should do by pointing out the expected results. After the tests are appropriately structured, the developer then writes the implementation of the function.
<!--more-->
### Introduction
Android developers also write and use unit tests. The most popular library used to write these unit tests is JUnit4 and the Assert class. The Truth library from Google is an alternative to the Assert class.  

This library does relatively the same function as the Assert class but with a more readable code. Unit tests run on the Java virtual machine (JVM). For this reason, tests run faster, and one does not have to wait for the emulator or physical device to boot up to test the logic implemented. This article will serve as a guide on how to write local unit tests in Android using Kotlin.

### Prerequisites
To follow through with this tutorial, you will need:
  1. [Android Studio](https://developer.android.com/studio) installed.
  2. A basic understanding of Kotlin programming language.

Let's get started

### Step 1 — Creating an Android project
In this step, we're going to create our application. Open Android Studio and start a new project using the empty activity template. On the next page, give the application a name and keep the default settings.

![app name](/engineering-education/building-local-unit-tests-in-android-kotlin/app-name.png)

Click `Finish` and wait for the project build process to complete.

After the build finishes, go to the app level `build.gradle` file and add the following dependencies.

```bash
testImplementation 'junit:junit:4.13.1'
testImplementation "com.google.truth:truth:1.1"
```

By default, the `JUnit` dependency is available in any newly created project. However, add it if it is not included. As you can see, we have added the dependencies with the keyword `testImplementation` and not the standard `implementation` keyword. What that means is that the dependency only applies to the test source set. We will go into the source set details later in the article.

### Step 2 — Creating the Test class
As mentioned earlier, we are going to practice the Test-Driven-Development approach in Android. We, therefore, need to declare our expected results before writing the actual implementation.

Let's go through what is expected of our function. We are going to create a util class that holds authentication functions. The class will have a method to simulate the sign-up feature. This is the function we are going to focus on through this article. The function should validate the input we pass to it. 

Let's list down the behavior of the function.

The function should:
- Return false when the username or password is empty.
- Return false when the username is already taken. For this, we are going to create a sample list of usernames that have been taken.
- Return false when the password and repeat password don't match.
- Return false when the password is less than two digits.

To write tests for our function, we first have to create the method. We can not call a function that does not exist. To do this, create a Kotlin object and name it `AuthUtil`.

![class name](/engineering-education/building-local-unit-tests-in-android-kotlin/class-name.png)

We make it an object to allow us to access the function without creating an instance of the class. Add the following code to the class.

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

Here, we add a sample list of users and create the signUp function. The function takes in the necessary string parameters. It also returns a default value (true). We add the return value to avoid errors. Now that we have our test subject. Let's go ahead and create the tests.

To create the test class:
Right-click on the class name and select `generate` then click `Test`.
On the next screen, select `JUnit4` as the testing library.
Leave the other fields to default values and click `OK`.

![new test image](/engineering-education/building-local-unit-tests-in-android-kotlin/test.png)

The next dialog box that appears prompts you to select the test source set. There are two types of test source sets. One is the test source set, and the other one is the Android test source set. 

The test source set is where we write business logic tests. On the other hand, the Android test source set is where we write tests for functions that entirely depend on the Android platform. An example of this type of test is the UI test. 

For our case, we select the test source set since our function does not depend on the Android platform.

![test source set](/engineering-education/building-local-unit-tests-in-android-kotlin/test-source.png)

That's it, our test class has been created. Now let's go ahead and write the tests.

### Step 3 — Writing tests
By default, creating the test class using this approach opens up the class. Before we write our first test, let's look at a standard test naming convention. To make test names more readable, developers use backticks to name their test functions. 

This allows one to add spaces and other special characters to the function name. However, this naming convention should only be used in test functions and not in normal functions.

Let's now write our first test.

First, add the following imports at the top of the class.

```Kotlin
import org.junit.Test
import com.google.common.truth.Truth.*
```

The first test should check whether the function returns `false` when the user passes an empty `username` or `password`. Add the following code to implement this.

```Kotlin
@Test
fun `signUp function returns false when username or password is empty`(){
    val userName = ""
    val password = ""
    val repeatPassword = ""
    assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
}
```

We use the `@Test` annotation to declare a function as a test. To test the behavior, we have passed in empty strings to the signUp function. 

We have then used the `assetThat` function to check whether the return value is false since that is what we expect. Check out this [link](https://truth.dev/) for more details about the `assertThat` function. 

To run the test individually, right-click on the test name and select `run`. The test should fail since we had set the `signUp` function to return `true`.

The second test should check whether the `username` entered already exists. If it exists, the function should return `false`. 

Write the code below to implement this.

```Kotlin
@Test
fun `signUp function returns false when username is taken`(){
    val userName = "Peter"
    val password = "12345"
    val repeatPassword = "12345"
    assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
}
```

We pass in an already taken `username` to test this behavior. The expected result is false, but our function returns true, so the test will fail when we run it

For the third test, we are going to pass in different values for password and repeat password. This test should return `false`. 

Add the following code to implement this.

```Kotlin
@Test
fun `signUp function returns false when password and repeat password don't match`(){
    val userName = "James"
    val password = "12345"
    val repeatPassword = "67890"
    assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
}
```

Now, the last test. The function should not allow `passwords` that are less than two characters. For this, we pass in a one-character password. We expect it to return false, so the test should fail when we run it. 

Add the test implementation as follows.

```Kotlin
@Test
fun `signUp function returns false when password is less than two characters`(){
    val userName = "Brian"
    val password = "1"
    val repeatPassword = "1"
    assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
}
```

That's all the tests we need. This is how the full test class should look.

```Kotlin
class AuthUtilTest{

    @Test
    fun `signUp function returns false when username or password is empty`(){
        val userName = ""
        val password = ""
        val repeatPassword = ""
        assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
    }

    @Test
    fun `signUp function returns false when username is taken`(){
        val userName = "Peter"
        val password = "12345"
        val repeatPassword = "12345"
        assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
    }

    @Test
    fun `signUp function returns false when password and repeat password don't match`(){
        val userName = "James"
        val password = "12345"
        val repeatPassword = "67890"
        assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
    }

    @Test
    fun `signUp function returns false when password is less than two characters`(){
        val userName = "Brian"
        val password = "1"
        val repeatPassword = "1"
        assertThat(AuthUtil.signUp(userName, password,repeatPassword)).isFalse()
    }
}
```

To run all the tests at once, right-click on the test class name and select `Run`. 

All the tests should fail.

### Step 4 — Writing the funtion implementation
Now that our tests are all set let's go ahead and write the actual function implementation. The function should fulfill all the test cases. 

Add the following code inside the `signUp` method.

```Kotlin
return when {
    userName.isEmpty() || password.isEmpty() -> false
    users.contains(userName) -> false
    password != repeatPassword -> false
    password.length < 2 -> false
    else -> true
}
```

As a result, the `AuthUtil` object should look as shown.

```Kotlin
object AuthUtil {
    private val users = listOf("Peter", "John", "Smith")

    fun signUp(
        userName: String,
        password: String,
        repeatPassword: String
    ): Boolean{
        return when {
            userName.isEmpty() || password.isEmpty() -> false
            users.contains(userName) -> false
            password != repeatPassword -> false
            password.length < 2 -> false
            else -> true
        }
    }
}
```

We use the `when` statement to validate the values. All four statements create the behavior required for the function. When none of them are successful, we return true. This means that the input has passed all the tests. Navigate to the `AuthUtiTest` class and run the tests. The tests should pass.

This is the expected output from the `run` window.

![output](/engineering-education/building-local-unit-tests-in-android-kotlin/output.png)

### Conclusion
With that information, you can now write your unit tests. Unit tests fasten the software development process. This is because one declares the behavior before implementing it. 

In doing so, one does not have to worry about other components of the application. The focus should be on the function being implemented and tested. You also don't need to run the whole application to test a single method.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)