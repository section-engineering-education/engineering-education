---
layout: engineering-education
status: publish
published: true
url: /jetpack-compose-forms/
title: Advanced Form Operations in Jetpack Compose
description: In this article, we will be looking at a dry approach to working with textfields in Jetpack compose such as advanced form operations.
author: linus-muema
date: 2021-12-08T00:00:00-10:30
topics: []
excerpt_separator: <!--more-->
images:

- url: /engineering-education/jetpack-compose-forms/hero.jpg
  alt: jetpack compose forms image
---
When developing an application, it is always a good idea to write code that is not repetitive. This principle is known as [DRY](https://en.Wikipedia.org/wiki/Don't_repeat_yourself). It works hand in hand with code decoupling.
<!--more-->
These two ensure that code is easily scalable, as a change in one part of the application does not affect other unrelated areas. A modification is done uniformly across the components/modules.

In this article, we will look at a DRY approach to working with text fields in Jetpack compose.

By the end of the article, you should:
- Know how to work with text fields in Jetpack compose. This involves state management and validation.
- Know how to decouple text field operations.
- Know how to abstract the various `form` activities.

### Prerequisites
In order to follow up with this tutorial comfortably, you will need:
- Android studio 4.2 (Arctic Fox) and above.
- Knowledge of Kotlin language.
- Knowledge in Jetpack compose.
- Physical device or emulator to run the application.

### Step 1: Setup
To get started, open up Android Studio and create a new project using the "Empty Compose activity" template. Give it any name you would like. You can go ahead to customize the theme to your liking.

### Step 2: Form operations
When developing mobile applications, we are likely to come across `Forms` or some form of input to collect data from users. With Jetpack compose, we have the `TextField` composable from Material.

Go ahead and add it to your screen.

```kotlin
@Composable
fun Screen(){
    Column {
        TextField(value = "", onValueChange = {})
    }
}
```

Once you run your application, you will notice no change as you type in the input field. This is because you are not updating the state of the field in the `onValueChange` callback.

You can read more about state management on the [official documentation](https://developer.android.com/jetpack/compose/state). So go ahead and update the `Form` composable.

```kotlin
@Composable
fun Screen(){
    var name by remember { mutableStateOf("") }
    Column {
        TextField(value = name, onValueChange = { value -> name = value })
    }
}
```

As you can see, you are managing the state of the field by defining a `State<String>` then updating it as the value changes. Let us go ahead and add another field to get the email address and button to submit our details.

```kotlin
@Composable
fun Screen(){
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }

    Column {
        TextField(
            value = name,
            modifier = Modifier.padding(10.dp),
            onValueChange = { value -> name = value }
        )
        TextField(
            value = email,
            modifier = Modifier.padding(10.dp),
            onValueChange = { value -> email = value },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
        )
        Button(onClick = { toast(message = "Form: name is $name and email is $email")}) {
            Text("Submit")
        }
    }
}

// the toast extension function
fun Context.toast(message: String){
    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}
```

It is common to run validations after submission to ensure data validity. For our case, we can run one to check that the `name` field is not empty and the `email` field matches the required regex.

We also need to show the required errors to notify the users of the issues. Let's go ahead and modify the `Form` composable as shown below:

```kotlin
@Composable
fun Screen(){
    var name by remember { mutableStateOf("") }
    var nameHasError by remember { mutableStateOf(false) }
    var nameLabel by remember { mutableStateOf("Enter your name") }

    var email by remember { mutableStateOf("") }
    var emailHasError by remember { mutableStateOf(false) }
    var emailLabel by remember { mutableStateOf("Enter your email address") }

    Column {
        TextField(
            value = name,
            isError = nameHasError,
            label = { Text(text = nameLabel) },
            modifier = Modifier.padding(10.dp),
            onValueChange = { value -> name = value }
        )
        TextField(
            value = email,
            isError = emailHasError,
            label = { Text(text = emailLabel) },
            modifier = Modifier.padding(10.dp),
            onValueChange = { value -> email = value },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
        )
        Button(onClick = {}) {
            Text("Submit")
        }
    }
}
```

In the button's onClick lambda, add the following:

```kotlin
when {
    name.isEmpty() -> {
        nameHasError = true
        nameLabel = "Name cannot be empty"
    }
    !Patterns.EMAIL_ADDRESS.matcher(email).matches() -> {
        emailHasError = true
        emailLabel = "Invalid email address"
    }
    else -> toast(message = "All fields are valid!")
}
```

That is a simple validation process for our fields. However, we have a lot of code for only two input fields. Imagine if we had ten fields, each with different validation processes. It would be worse if we had forms on different screens, as is common in most applications.

A workaround would be to create a form composable that handles form validation. We can create a state for the `Form` composable that handles all the fields we pass into it.

Let us go ahead and implement that.

### Step 3: Validators
We can start with validators. They are all similar in terms of how they work. They return booleans based on whether the value passed meets specific criteria. Go ahead and create a sealed interface called `Validator`. All of our validators will be of this type.

```kotlin
private const val EMAIL_MESSAGE = "invalid email address"
private const val REQUIRED_MESSAGE = "this field is required"
private const val REGEX_MESSAGE = "value does not match the regex"

sealed interface Validator
open class Email(var message: String = EMAIL_MESSAGE): Validator
open class Required(var message: String = REQUIRED_MESSAGE): Validator
open class Regex(var message: String, var regex: String = REGEX_MESSAGE): Validator
```

Each of these will receive an optional message. This will allow us to pass in custom messages if we would like. Otherwise, we will show the default message.

We have a `regex` validator that receives the regex that we will use to compare with the form field value.

### Step 4: Creating state for the fields
This step will create an internal state that will validate the individual input field. It will also be in charge of updating the field as the user types.

We will add more functions to help us manage the field, such as clearing the textfield, getting the value from the field, and showing/hiding errors.

```kotlin
class Field(val name: String, val label: String = "", val validators: List<Validator>){
    var text: String by mutableStateOf("")
    var lbl: String by mutableStateOf(label)
    var hasError: Boolean by mutableStateOf(false)

    fun clear(){ text = "" }

    private fun showError(error: String){
        hasError = true
        lbl = error
    }

    private fun hideError(){
        lbl = label
        hasError = false
    }

    @Composable
    fun Content(){
        TextField(
            value = text,
            isError = hasError,
            label = { Text(text = lbl) },
            modifier = Modifier.padding(10.dp),
            onValueChange = { value ->
                hideError()
                text = value
            }
        )
    }

    fun validate(): Boolean {
        return validators.map {
            when (it){
                is Email -> true
                is Required -> true
                is Regex -> true
            }
        }.all { it }
    }
}
```

We have created a class that receives three arguments. The `name` will be used to associate the field to the value later. The `label` will be used to set the field's label and error message. `validators` will list all the validators specified for that field.

The composable function `Content` will draw the field in the `Form`. The function `validate` will return a boolean to denote whether the field's value is valid or not. It will loop through the validators, checking if the value is correct based on the validator and returning true or false.

> Once the user starts editing the form field, we clear the errors, so the field goes back to an invalidated state. Add the following implementations for the validators.

```kotlin
fun validate(): Boolean {
    return validators.map {
        when (it){
            is Email -> {
                if (!Patterns.EMAIL_ADDRESS.matcher(text).matches()){
                    showError(it.message)
                    return@map false
                }
                true
            }
            is Required -> {
                if (text.isEmpty()){
                    showError(it.message)
                    return@map  false
                }
                true
            }
            is Regex -> {
                if (!it.regex.toRegex().containsMatchIn(text)){
                    showError(it.message)
                    return@map false
                }
                true
            }
        }
    }.all { it }
}
```

The function should return the matching boolean from the validation process.

### Step 5: Creating state for the form
This form state will draw our form fields and validate all the fields passed into it. Go ahead and create a class called `FormState`.

```kotlin
class FormState {
    var fields: List<Field> = listOf()
        set(value) { field = value }

    fun validate(): Boolean {
        var valid = true
        for (field in fields) if (!field.validate()) {
            valid = false
            break
        }
        return valid
    }

    fun getData(): Map<String, String> = fields.map { it.name to it.text }.toMap()
}
```

The `validate` function here also returns a boolean if any of the fields' validation does not pass. We break the loop at that point to save on resources. The `getData` function maps the form field names to the corresponding values for easy management on the receiving end.

### Step 6: Putting it all together
Create a `Form` composable that receives two arguments.
- **state:** This will be an instance of the `FormState` class we just created above.
- **fields:** This will be a list of the form fields with their respective validators.

```kotlin
@Composable
fun Form(state: FormState, fields: List<Field>){
    state.fields = fields

    Column {
        fields.forEach {
            it.Content()
        }
    }
}
```

We set the state's fields using the setter method. We then display the form fields in a column by calling the field's `Content` composable function. With that, our form is complete 😁. To use it in your application, modify your UI as below.

```kotlin
@Composable
fun Screen(){
    val state by remember { mutableStateOf(FormState()) }

    Column {
        Form(
            state = state,
            fields = listOf(
                Field(name = "username", validators = listOf(Required())),
                Field(name = "email", validators = listOf(Required(), Email()))
            )
        )
        Button(onClick = { if (state.validate()) toast("Our form works!") }) {
            Text("Submit")
        }
    }
}
```

Once you run your application, everything should work as expected. To get the data, call the `state.getData` method, and you will receive a map of your form.

### Conclusion
As you have seen, working with forms individually can lead to a lot of repetitive code. But with this approach, you encapsulate your form functions into different classes and composables, making your work easier and your code cleaner.

However, this approach has some drawbacks. For instance, it does not take care of the custom arrangement of the fields. You are restricted to a column, while you might want some fields on a row. It also does not allow modification of the fields' properties.

You can find the complete source code of the application on [GitHub](https://github.com/LinusMuema/Formzy). If you have a solution to the issues facing this approach or a suggestion, feel free to open an issue.

Have fun with compose!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
