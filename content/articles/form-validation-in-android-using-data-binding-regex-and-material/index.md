---
layout: engineering-education
status: publish
published: true
url: /form-validation-using-data-binding-regex-and-material-in-android/
title: Form Validation using Data Binding, Regex, and Material in Android
description: This tutorial provides a step-by-step guide on how to validate forms using data binding, regex, and material in Android. 
author: moses-chege
date: 2022-02-20T00:00:00-13:56
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/form-validation-using-data-binding-regex-and-material-in-android/hero.jpg
    alt: Form Validation Data Binding, Regex, Material in Android
---
When building an application that requires users to submit information, you need to verify this data before sending it into your application. This is where the concept of form validations comes in.
<!--more-->
When a user fills in an email, the application should be able to check if the user has provided an email input. If not, inform the user accordingly to fill in the right email format. There are many values and specific data that an application requires from a user. This guide aims to help you understand how to achieve such concepts using Android studio.

### Prerequisites
To get started with this tutorial, ensure you have the following essentials:
- Ensure you have Android Studio installed on your computer.
- Basic understanding of running Kotlin with android studio.
- Basic understanding of using the [Android material design library](https://codelabs.developers.google.com/codelabs/mdc-101-kotlin#0).

### Setting up an Android project
To get started, go ahead and create a new Android Studio project with an empty activity. Ensure you select Kotlin as the language you want to run your application with.

![new-android-project](/engineering-education/form-validation-using-data-binding-regex-and-material-in-android/new-android-project.png)

We are going to use [Android material design library](https://codelabs.developers.google.com/codelabs/mdc-101-kotlin#0) to set up basic Android forms. Therefore, you need to make this library accessible for your project. Go to your `build.gradle` file and add the following library inside the `dependencies {}`.

```bash
implementation 'com.google.android.material:material:1.5.0'
```

Once you have added this library, `Sync` your project to download and make the library ready to be used within your project.

### Create and add basic validation to a material form
Android material design helps you build an interactive and consistent set of principles designs. It has many components that allow you to realize your greatest design potential.

Material has necessary components that allow you to create any Android forms while ensuring consistency across your application. We will create a basic login material form that has material form validations. Head over to your `activity_main.xml` file and set up XML components.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <TextView
        android:text="WELCOME BACK"
        android:textColor="@color/purple_700"
        android:layout_weight="0.2"
        android:layout_width="match_parent"
        android:gravity="center"
        android:layout_height="0dp"
        android:textSize="28sp"/>

    <LinearLayout
        android:layout_weight="0.4"
        android:layout_width="match_parent"
        android:orientation="vertical"
        android:layout_height="wrap_content">
    </LinearLayout>
</LinearLayout>
```

We will create our login form inside the child `LinearLayout`. A basic login form has `InputText` fields such as email passwords and phone numbers. In this case, let's say we want to add an email field to our app. We'd use an `EditText` component to do so. However, we need to ensure that the input text that a user enters is an email.

Below is how you would add an email `EditText` using the material design:

```xml
<com.google.android.material.textfield.TextInputLayout
    android:id="@+id/login_emailContainer"
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="8dp"
    app:errorEnabled="true"
    app:helperText="Required"
    app:helperTextTextColor="@color/design_default_color_error">

<com.google.android.material.textfield.TextInputEditText
    android:hint="Email"
    android:layout_width="match_parent"
    android:id="@+id/login_email"
    android:layout_height="wrap_content"
    android:inputType="textEmailAddress"/>
</com.google.android.material.textfield.TextInputLayout>
```

Here we have a `TextInputLayout` that holds a `TextInputEditText` of type Email. We can perform basic form validation to these fields with the material attributes. For example, since the `TextInput` should be of type `Email`, we can;

- Add an `android:inputType="textEmailAddress"` attribute that will check if the text input format resembles that of an email.
- An `android:hint="Email"` to show the user that this field requires an email input.
- An `app:helperText="Required"` shows the user that this field is always required before submitting the form.
- `app:errorEnabled="true"` shows the user an error hint whenever the specified field doesn't have the necessary valid input associated with the field.

We can go ahead and add more fields to our application:

```xml
<com.google.android.material.textfield.TextInputLayout
    app:counterMaxLength="16"
    android:id="@+id/login_passwordContainer"
    android:layout_margin="8dp"
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
    app:counterEnabled="true"
    android:layout_width="match_parent"
    app:helperText="Required"
    android:layout_height="wrap_content"
    app:helperTextTextColor="@color/design_default_color_error"
    app:errorEnabled="true"
    app:passwordToggleEnabled="true">

<com.google.android.material.textfield.TextInputEditText
    android:layout_height="wrap_content"
    android:id="@+id/login_password"
    android:layout_width="match_parent"
    android:maxLength="16"
    android:hint="Password"
    android:inputType="textPassword"
    android:lines="1"
    />
</com.google.android.material.textfield.TextInputLayout>

<com.google.android.material.textfield.TextInputLayout
    app:counterEnabled="true"
    android:id="@+id/login_phoneContainer"
    app:counterMaxLength="10"
    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
    android:layout_margin="8dp"
    android:layout_width="match_parent"
    app:errorEnabled="true"
    android:layout_height="wrap_content"
    app:helperText="Required"
    app:helperTextTextColor="@color/design_default_color_error">

<com.google.android.material.textfield.TextInputEditText
    
    android:layout_width="match_parent"
    android:id="@+id/login_phone"
    android:layout_height="wrap_content"
    android:inputType="number"
    android:hint="Phone Number"
    android:lines="1"/>
</com.google.android.material.textfield.TextInputLayout>
```

Here, we have added two more fields: password and phone number. We have added more `TextInput` validation checks that ensure your application input has input data consistency. 

For example:
- `android:inputType="textPassword"` and `android:inputType="number"` thats shows that each input field takes in a password and a number respectively.
- The attribute `android:maxLength="16"` only allows users to enter the exact number of characters. When the counter check and the maximum character have been achieved, the user will be able to add more characters to that field.
- `app:helperText="Required"` to show the user they need to fill out this field before submitting the form.
- `app:errorEnabled="true"` to catch input errors and text mismatch.
- We have also added an `app:counterMaxLength`. This checks the maximum number of characters that a single `TextInput` should take. `app:counterEnabled="true"` will hold count and display this character so that the users can have an idea of the maximum characters they can add to a single field.

Let's now add a button that will help us handle the complex validation logic using the Kotlin code.

```xml
<com.google.android.material.button.MaterialButton
    android:layout_marginTop="60dp"
    android:layout_width="290dp"
    android:layout_margin="4dp"
    android:text="Login"
    android:layout_gravity="center"
    android:layout_height="62dp"
    android:id="@+id/login_button"/>
```

You can run your application to check if the above form is correctly set up.

![form](/engineering-education/form-validation-using-data-binding-regex-and-material-in-android/form.png)

### Validation with data binding
We have used material to create and perform basic form validations. Let's now use data binding to validate form inputs before the user submits these inputs.

Data binding is the mechanism that allows you to connect values that are in different sources. It allows you to bind user interface (UI) components in your XML layout to the data sources. This allows you to tie the UI components to the application logic.

We can use the concept of data binding to check form validations. A form involves adding values to text fields. Thus, we can connect the form UI to the application domain objects to automatically update the UI based on the user inputs.

To set up data binding in your Kotlin project, head over to the `build.gradle` file and add the following plugin:

```bash
plugins {
    id 'kotlin-kapt'
}
```

Then add the following data binding `buildFeatures` inside the `android {}`.

```bash
buildFeatures{
    viewBinding = true
}
```

Head over to `MainActivity.kt` and initialize the `dataBinding`. First `ActivityMainBinding` that reflects to the XML layout context as specified by the `tools:context=".MainActivity"`. Add the following right below `AppCompatActivity()`.

```kotlin
private lateinit var activityMainBinding: ActivityMainBinding
```

Then initialize `ActivityMainBinding` inside the `onCreate()` method. Here we will replace the usual `setContentView(R.layout.activity_main)` with the following two lines of code:

```kotlin
activityMainBinding = ActivityMainBinding.inflate(layoutInflater)
setContentView(activityMainBinding.root)
```

Now we can start validating our form using data binding. We will check and validate each field.

#### Check if password is valid
We will create a function `validPassword()` and use the following checks to validate if the password input is valid based on the password we want the user to submit.

```kotlin
private fun validPassword(): String? {
    val passwordText = activityMainBinding.loginPassword.text.toString()
    if(passwordText.length < 8) {
        return "Minimum 8 Character Password"
    }
    if(!passwordText.matches(".*[A-Z].*".toRegex())) {
        return "Must Contain 1 Upper-case Character"
    }
    if(!passwordText.matches(".*[a-z].*".toRegex())) {
        return "Must Contain 1 Lower-case Character"
    }
    if(!passwordText.matches(".*[@#\$%^&+=].*".toRegex())) {
        return "Must Contain 1 Special Character (@#\$%^&+=)"
    }

    return null
}
```

This is a simple check. When the user enters a password, it must have at least eight characters. Otherwise, this will trigger an error, and the user will be required to enter a password that has at least eight characters.

On the other end, the password character counter will only accept a password of a maximum of 16 characters as specified by the `app:counterMaxLength="16"`.

For a standard password, it's advisable to add special characters and mix lowercase and uppercase letters. In this case, we are using `Regex` to verify if the input password has such characters. If not, each password validation check will throw an error to the user end and inform them what to add based on the current password value.

#### Check if email is valid
We will create a function `checkIfEmailIsValid()` and check if the password input is valid based on the email value we want the user to submit.

```kotlin
private fun checkIfEmailIsValid(): String? {

    val emailInputText = activityMainBinding.loginEmail.text.toString()
    activityMainBinding.loginEmail.doOnTextChanged { text, start, before, count ->
        if(!Patterns.EMAIL_ADDRESS.matcher(emailInputText).matches()){
            activityMainBinding.loginEmail.error = "Invalid Email Address"
        }
        else{
            activityMainBinding.loginEmail.error = null
        }
    }
}
```

Here we will use the custom `EMAIL_ADDRESS` pattern. This will check the email input and ensure it matches a valid email. If the user enters an incorrect email, this will return `"Invalid Email Address"`.

#### Check if phone number is valid
We will create a function `checkValidPhoneNumber()` and validate if the phone number input is valid:

```kotlin
private fun checkValidPhoneNumber(): String? {
    val phoneText = activityMainBinding.loginPhone.text.toString()
    if(!phoneText.matches(".*[0-9].*".toRegex())){
        return "Must be all Digits"
    }
    if(phoneText.length != 10){
        return "Must be 10 Digits"
    }
    return null
}
```

Here, a phone number must be digits. We hand specified `android:inputType="number"` using material. This will only allow the user to enter input of type number. However, we can add a Regex to our data binding to update the UI based on the user input. We also specified `app:counterMaxLength="10"`. Thus, a phone number must be at least ten digits. However, if a user enters more than ten digits, we want to return that as an error and inform the user that the field phone number `"Must be 10 Digits"`.

#### Handle form submission
This validation will be handled when the user clicks the login button. Let's now add `setOnClickListener` to the `loginButton`. We will create a function `login()` that returns a valid form and an error for invalid form submission.

```kotlin
private fun login() {
    activityMainBinding.loginEmailContainer.helperText = checkIfEmailIsValid()
    activityMainBinding.loginPasswordContainer.helperText = validPassword()
    activityMainBinding.loginPhoneContainer.helperText = checkValidPhoneNumber()

    val checkIfEmailIsValid = activityMainBinding.loginEmailContainer.helperText == null
    val validPassword = activityMainBinding.loginPasswordContainer.helperText == null
    val checkValidPhoneNumber = activityMainBinding.loginPhoneContainer.helperText == null

    if (checkIfEmailIsValid && validPassword && checkValidPhoneNumber) {
        Toast.makeText(this,"Valid Form", Toast.LENGTH_SHORT).show()
        resetForm()

    }

    else
        Toast.makeText(this, "Invalid Form", Toast.LENGTH_SHORT).show()
}
```

Here we will bind the already added input values to our application domain and check if every value is valid. This check will occur when the user clicks the login button. Go ahead and add the following `setOnClickListener` inside the `onCreate()` method.

```kotlin
activityMainBinding.loginButton.setOnClickListener { login() }
```

When the user clicks `loginButton` while all the input values are valid, a toast message `Valid Form` will be shown. Otherwise, the `Invalid Form` message will be shown.

When a user has successfully submitted valid values, we want to reset the form inputs. Go ahead and create a `resetForm()` function as shown below:

```kotlin
private fun resetForm() {

    activityMainBinding.loginEmail.text = null
    activityMainBinding.loginPassword.text = null
    activityMainBinding.loginPhone.text = null

    activityMainBinding.loginPasswordContainer.helperText = "Required"
    activityMainBinding.loginEmailContainer.helperText = "Required"
    activityMainBinding.loginPhoneContainer.helperText = "Required"
}
```

This will clear out the inputs and reset them to default with a `"Required"` helper text.

Every field will display a message to the user based on the incorrect inputs. For example, if the email is invalid, we want to update the UI and show the user that the email value is an `"Invalid Email Address"`.

To do this, add a `setOnFocusChangeListener` to all the form domain functions. This way, each incorrect input will update UI with the right error message. Go ahead and add the following `setOnFocusChangeListener` functions and bind them to the XML UI based on the view ids:

```kotlin
private fun passwordInputTextOnFocusListener() {
    activityMainBinding.loginPassword.setOnFocusChangeListener { _, focused ->
        if(!focused){
            activityMainBinding.loginPasswordContainer.helperText = validPassword()
        }
    }
}

private fun emailInputTextOnFocusListener() {
    activityMainBinding.loginEmail.setOnFocusChangeListener { _, focused ->
        if(!focused){
            activityMainBinding.loginEmailContainer.helperText = checkIfEmailIsValid()
        }
    }
}

private fun phoneInputTextOnFocusListener() {
    activityMainBinding.loginPhone.setOnFocusChangeListener { _, focused ->
        if(!focused){
            activityMainBinding.loginPhoneContainer.helperText = checkValidPhoneNumber()
        }
    }
}
```

Finally, call these functions inside the `onCreate()` method.

```kotlin
emailInputTextOnFocusListener()
passwordInputTextOnFocusListener()
phoneInputTextOnFocusListener()
```

Our application validation checks are complete. You can run them to test if everything works correctly.

Try adding values to the text fields and click the login button to verify them.

![invalid-form](/engineering-education/form-validation-using-data-binding-regex-and-material-in-android/invalid-form.png)

If you submit the correct inputs based on the form validation, this will reset the form and show you the values that you submitted are valid.

### Conclusion
In this tutorial, we have covered and demonstrated the basics of form validation in Android studio. It's quite straightforward to set what you need from users. This ensures data consistency and reduces production errors.

I hope you found these tools useful, simple to test, and easy to build applications with.

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
