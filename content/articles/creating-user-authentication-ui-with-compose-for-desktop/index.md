---
layout: engineering-education
status: publish
published: true
url: /creating-user-authentication-ui-with-compose-for-desktop/
title: Creating User Authentication UI with Compose for Desktop
description: This tutorial will help the reader create a user authentication UI with compose for Desktop.
author: collince-okeyo
date: 2022-07-04T00:00:00-19:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-user-authentication-ui-with-compose-for-desktop/hero.jpg
    alt: Creating User Authentication UI with Compose for Desktop Hero Image
---
Desktop applications are used almost everywhere. For example, in a school management system. Before Jetpack Compose, the Java SWING library was used to develop most desktop applications. 
<!--more-->
With the introduction of Compose for Desktop, we now have a choice of which technology to use when we want to develop a desktop app.

Compose for Desktop allows us to develop desktop apps with lovely user interfaces like the ones in Android apps. This framework can be used to create desktop applications for Windows, macOS, or Linux platforms. 

Kotlin multi-platform also allows users to build Compose Web Applications, as well as Multi-platform Applications.

### Table of contents
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Step 1 - Creating project](#step-1-creating-project)
- [Step 2 - Understanding Compose Desktop Application Project Structure](#step-2-understanding-compose-desktop-application-project-structure)
- [Step 3 - User Login class](#step-3-user-login-class)
- [Step 4 - User Registration class](#step-4-user-registration-class)
- [Step 5 - Main class](#step-5-main-class)
- [Conclusion](#conclusion)

### Prerequisites
To best understand this tutorial, the reader must have:
- [IntelliJ](https://www.jetbrains.com/idea/download/#section=windows) IDEA installed.
- [JDK version 11](https://www.oracle.com/java/technologies/downloads/) or later installed.
- Basic knowledge in [Jetpack Compose](https://developer.android.com/jetpack/compose).

### Getting started
In this tutorial, we will learn how to use Compose for Desktop by building simple user authentication screens. We will create some basic views like `TextField` and `Button` in a Compose Desktop app.

IntelliJ IDEA has built-in Kotlin plugins and Compose for Desktop libraries. Therefore, there is no need to add them manually. 

### Step 1 - Creating the project
To create a Compose Desktop application, open your IntelliJ IDEA then follow the steps below:
1. Right-click on `Files`.
2. Select `New Project`.
3. Choose `Kotlin` programming language on the left pane.
4. Assign a name to your project. 
5. Select `Compose Desktop Application` in the `Project Template`.
6. Click the `Next` button.

![creating project](/engineering-education/creating-user-authentication-ui-with-compose-for-desktop/creating-project1.png)

> Ensure that the JDK is at least JDK 11, then click on `Finish` to create your project. 

![JDK version](/engineering-education/creating-user-authentication-ui-with-compose-for-desktop/creating-project2.png)

### Step 2 - Understanding Compose Desktop application project structure
To get us started, we will first look at the project structure of a typical Compose project. After you have created the app successfully, you will realize that JetBrains compose plugins and libraries are included in the `build.gradle.kts` file by default.

```bash
id("org.jetbrains.compose") version "1.0.0"
```

You will also realize that a directory is created with the name that you assigned to your project. Inside the directory, there are various sub-directories like `.gradle`, `.idea`, `build`, `gradle` and `src`. These directories contain libraries useful when building a Compose desktop app.

The `src` directory is where we will write our code. This directory has a sub-directory `main` that has two sub-directories which are `kotlin` and `test`. 

The `kotlin` directory has a file named `Main.kt`. This is the file that contains the App Composable and the Main function from which the execution of the program begins.

```kotlin
// App composable
@Composable
@Preview
fun App() {
    // A variable for holding the field state
    var text by remember { mutableStateOf("Hello, World!") }
    MaterialTheme {
        Button(onClick = {
            text = "Hello, Desktop!"
        }) {
            Text(text)
        }
    }
}
// Main funtion where the execution of the program begins
fun main() = application {
    Window(onCloseRequest = ::exitApplication) {
        App()
    }
}
```

### Step 3 - User Login class
In this step, we will learn how to create a Compose Desktop screen with views. Right-click on the `kotlin` folder then select `New` and then `Kotlin Class/File` to create a new class and name it `LoginScreen`. 

This class will act as our login screen interface where the user can enter login details.

```kotlin
class LoginScreen {
    @Composable
    fun LoginScreen(){
        val scaffoldState = rememberScaffoldState()
        var textFieldStateEmail by remember {
            mutableStateOf("")
        }
        var textFieldStatePassword by remember {
            mutableStateOf("")
        }
        val scope = rememberCoroutineScope()
        Scaffold(
            modifier = Modifier.fillMaxSize(),
            scaffoldState = scaffoldState
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center,
                modifier = Modifier.fillMaxSize().padding(horizontal = 24.dp)
            ){
                TextField(
                    value = textFieldStateEmail,
                    label = {
                        Text("Enter your Email")
                    },
                    onValueChange = {
                        textFieldStateEmail = it
                    },
                    keyboardOptions = KeyboardOptions(
                        capitalization = KeyboardCapitalization.None,
                        autoCorrect = false,
                        keyboardType = KeyboardType.Email,
                        imeAction = ImeAction.Next
                    ),
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(16.dp))
                TextField(
                    value = textFieldStatePassword,
                    label = {
                        Text("Enter your Password")
                    },
                    onValueChange = {
                        textFieldStatePassword = it
                    },
                    // Enable user input from the keyboard
                    keyboardOptions = KeyboardOptions(
                        capitalization = KeyboardCapitalization.None,
                        autoCorrect = false,
                        keyboardType = KeyboardType.Password,
                        imeAction = ImeAction.Next
                    ),
                    // Enable password input type by showing dots for password security
                    visualTransformation = PasswordVisualTransformation(),
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = {
                    scope.launch {
                        scaffoldState.snackbarHostState.showSnackbar("Button Clicked $textFieldStateEmail")
                    }
                }){
                    Text("Login")
                }
            }
        }
    }
}
```

This class has a single composable function `LoginScreen` that implements the login screen layout.

- `Scaffold` - Compose layout that allows for already existing material design components like a `ToolBar`.
- `Column` - Composable that allows views to be arranged on top of each other.
- `TextField` - Composable that allows us to create a text input field.
- `Spacer` - Composable for creating a space between views.
- `Button` - Composable for creating a button.
- `Text` - Composable for holding texts.

These Composable have different functions that allow unique actions when triggered. For instance, the `onClick` function in the button triggers a click listener when the button is clicked.

> Note: The function is annotated by the `@Composable` that shows that we are using JetBrains compose for desktop.

![login-screen](/engineering-education/creating-user-authentication-ui-with-compose-for-desktop/login-screen.jpg)

### Step 4 - User Registration class
In this class, we will create a Composable function `RegisterScreen` to implement the register screen interface.

```kotlin
class RegisterScreen {
    @Composable
    fun RegisterScreen(){
        var scaffoldStateRegister = rememberScaffoldState()
        var textFieldStateFName by remember {
            mutableStateOf("")
        }
        var textFieldStateLName by remember {
            mutableStateOf("")
        }
        var textFieldStatePhone by remember {
            mutableStateOf("")
        }
        var textFieldStateREmail by remember {
            mutableStateOf("")
        }
        var textFieldStatePassword by remember {
            mutableStateOf("")
        }
        var scope = rememberCoroutineScope()
        Scaffold(
            modifier = Modifier.fillMaxSize(),
            scaffoldState = scaffoldStateRegister
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center,
                modifier = Modifier.fillMaxSize().padding(horizontal = 24.dp)
            ){
                TextField(
                    value = textFieldStateFName,
                    label = {
                        Text("Enter your First Name")
                    },
                    onValueChange = {
                        textFieldStateFName = it
                    },
                    keyboardOptions = KeyboardOptions(
                        capitalization = KeyboardCapitalization.None,
                        autoCorrect = false,
                        keyboardType = KeyboardType.Text,
                        imeAction = ImeAction.Next
                    ),
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(16.dp))
                TextField(
                    value = textFieldStateLName,
                    label = {
                        Text("Enter your Last Name")
                    },
                    onValueChange = {
                        textFieldStateLName = it
                    },
                    keyboardOptions = KeyboardOptions(
                        capitalization = KeyboardCapitalization.None,
                        autoCorrect = false,
                        keyboardType = KeyboardType.Text,
                        imeAction = ImeAction.Next
                    ),
                    singleLine = true, modifier = Modifier.fillMaxWidth(),
                )
                Spacer(modifier = Modifier.height(16.dp))
                TextField(
                    value = textFieldStateREmail,
                    label = {
                        Text("Enter your Email")
                    },
                    onValueChange = {
                        textFieldStateREmail = it
                    },
                    keyboardOptions = KeyboardOptions(
                        capitalization = KeyboardCapitalization.None,
                        autoCorrect = false,
                        keyboardType = KeyboardType.Number,
                        imeAction = ImeAction.Next
                    ),
                    singleLine = true, modifier = Modifier.fillMaxWidth(),
                )
                Spacer(modifier = Modifier.height(16.dp))
                TextField(
                    value = textFieldStatePhone,
                    label = {
                        Text("Enter your Phone Number")
                    },
                    onValueChange = {
                        textFieldStatePhone = it
                    },
                    keyboardOptions = KeyboardOptions(
                        capitalization = KeyboardCapitalization.None,
                        autoCorrect = false,
                        keyboardType = KeyboardType.Number,
                        imeAction = ImeAction.Next
                    ),
                    singleLine = true, modifier = Modifier.fillMaxWidth(),
                )
                Spacer(modifier = Modifier.height(16.dp))
                TextField(
                    value = textFieldStatePassword,
                    label = {
                        Text("Enter your Password")
                    },
                    onValueChange = {
                        textFieldStatePassword = it
                    },
                    keyboardOptions = KeyboardOptions(
                        capitalization = KeyboardCapitalization.None,
                        autoCorrect = false,
                        keyboardType = KeyboardType.Password,
                        imeAction = ImeAction.Next
                    ),
                    visualTransformation = PasswordVisualTransformation(),
                    singleLine = true, modifier = Modifier.fillMaxWidth(),
                )
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = {
                    scope.launch {
                        scaffoldStateRegister.snackbarHostState.showSnackbar("Button Clicked $textFieldStatePassword")
                    }
                }){
                    Text("Register")
                }
            }
        }
    } 
}
```

The Register class implementation is just the same as the `LoginScreen` but with more text fields. We will, therefore, use the same explanation.

![register-screen](/engineering-education/creating-user-authentication-ui-with-compose-for-desktop/register-screen.jpg)

#### Step 5 - Main class
In this class, we will create the objects of our classes and use the objects to invoke the composable methods.

```kotlin
@Composable
@Preview
fun App() {
    MaterialTheme {
        // LoginScreen object
        val login = LoginScreen()
        login.LoginScreen()
        // RegisterScreen object
        val register = RegisterScreen()
        register.RegisterScreen()
    }
}
fun main() = application {
    Window(onCloseRequest = ::exitApplication) {
        App()
    }
}
```

Kotlin is considered a multi-platform language. This means you can build an app that runs on multiple platforms.

This project can be downloaded from this [GitHub repository](https://github.com/Collince-Okeyo/UserAuthentication).  

### Conclusion
In this tutorial, we learned how to build desktop apps using Jetpack Compose and Kotlin.

To supplement the content from this article you can follow up on some of the links listed below.

Happy coding!

### Further reading
- [Jetpack Compose](https://github.com/JetBrains/compose-jb/tree/master/tutorials/Getting_Started)
- [Getting Started with Jetpack Compose](/engineering-education/getting-started-with-jetpack-compose-in-android/)
- [How to Create a Collapsible Bottom Navigation Bar using Jetpack Compose](/engineering-education/collapsible-bottom-navigation-bar-using-jetpack-compose-navigation/)
- [Building Scrollable and Lazy Components in Jetpack Compose](/engineering-education/building-scrollable-and-lazy-components-in-jetpack-compose/)
- [Advanced Form Operations in Jetpack Compose](/engineering-education/jetpack-compose-forms/)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)