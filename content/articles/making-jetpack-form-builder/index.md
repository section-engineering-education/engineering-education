---
layout: engineering-education
status: publish
published: true
url: /making-jetpack-form-builder/
title: The Making of Jetpack Compose Form Builder Library
description: In this article, we will discuss how we made the Form builder library, how we solved the issues with the previous idea, as well as how to use the library.
author: linus-muema
date: 2022-03-18T00:00:00-02:33
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/making-jetpack-form-builder/hero.jpg
  alt: Jetpack Compose Forms Hero Image
---
A form builder provides an abstraction layer over Form operations in our applications. Just like the Room database, the library intends to provide a simple way of working with form fields and their data.
<!--more-->
In the previous [article](/engineering-education/jetpack-compose-forms/), we learned how to create external states for both the text fields and the form as a whole. 

However, we faced some challenges such as how to draw the UI and how to retrieve the data from the fields.

At the moment of writing this article, there is a published library that implements the same concept but with a more flexible approach.

In this tutorial, we will go through how we made the [Form builder library]([repo](https://github.com/jkuatdsc/form-builder)), how we solved the issues with the previous idea, and how to use the library.

### Prerequisites
To follow along with this article, you will need:
- A basic understanding of Android development with Jetpack compose.
- Some advanced knowledge in Kotlin, especially generics and reflection.
- Android Studio IDE.

### Getting started
The first step is to solve the easiest problem we were facing, i.e, the UI. After several discussions and inquiries, we came to the conclusion that we didn't actually have to draw the UI.

I know, that sounds a bit funny 😂.

You'd now ask, *But how will we give the user the text fields?*, and that's fine. Here's the thing, to allow flexibility in drawing of the UI, we would not touch anything in the composables.

This is because, if you take a closer look at what our library should do, i.e, to provide an abstraction over the components, we only need to manage the state of the fields; the data.

Just like the way Room doesn't provide you with the actual database but rather an easier way to interact with the SQLite database.

So we only need to provide ways for the user to access the data and change it. And if possible, transform it however they like (spoiler alert! new feature... 😆).

With that in mind, our work became easier.

### The TextField states
The new implementation would be similar to the previous iteration, only without the composable and related fields.

```kt
class TextFieldState(
    val name: String,
    initial: String = "",
    val validators: List<Validators> = listOf(),
) {

    var text: String by mutableStateOf(initial)
    var errorMessage: String by mutableStateOf("")
    var hasError: Boolean by mutableStateOf(false)

    fun change(value: String) {
        hideError()
        text = value
    }

    fun showError(error: String) {
        hasError = true
        errorMessage = error
    }

    fun hideError() {
        errorMessage = ""
        hasError = false
    }
}
```

As for the validators, we just moved the implementations outside the lambda functions.

```kt
    fun validate(): Boolean {
        val validations = validators.map {
            when (it) {
                is Validators.Email -> validateEmail(it.message)
                is Validators.Required -> validateRequired(it.message)
                is Validators.Custom -> validateCustom(it.function, it.message)
                is Validators.MinChars -> validateMinChars(it.limit, it.message)
                is Validators.MaxChars -> validateMaxChars(it.limit, it.message)
                is Validators.MaxValue -> validateMaxValue(it.limit, it.message)
                is Validators.MinValue -> validateMinValue(it.limit, it.message)
            }
        }
        return validations.all { it }
    }

    private fun validateCustom(function: (String) -> Boolean, message: String): Boolean {
        val valid = function(text)
        if (!valid) showError(message)
        return valid
    }

    private fun validateEmail(message: String): Boolean {
        val valid = Patterns.EMAIL_ADDRESS.matcher(text).matches()
        if (!valid) showError(message)
        return valid
    }

    private fun validateRequired(message: String): Boolean {
        val valid = text.isNotEmpty()
        if (!valid) showError(message)
        return valid
    }

    private fun validateMaxChars(limit: Int, message: String): Boolean {
        val valid = text.length <= limit
        if (!valid) showError(message)
        return valid
    }

    private fun validateMinChars(limit: Int, message: String): Boolean {
        val valid = text.length >= limit
        if (!valid) showError(message)
        return valid
    }

    private fun validateMinValue(limit: Int, message: String): Boolean {
        val valid = text.isNumeric() && text.toDouble() >= limit
        if (!valid) showError(message)
        return valid
    }

    private fun validateMaxValue(limit: Int, message: String): Boolean {
        val valid = text.isNumeric() && text.toDouble() <= limit
        if (!valid) showError(message)
        return valid
    }
```

The message parameter will allow us to accept and use custom error messages from the developers.

```kt
// Validators.kt

private const val EMAIL_MESSAGE = "invalid email address"
private const val REQUIRED_MESSAGE = "this field is required"

sealed interface Validators {
    class Email(var message: String = EMAIL_MESSAGE) : Validators
    class MinValue(var limit: Int, var message: String): Validators
    class MaxValue(var limit: Int, var message: String): Validators
    class MinChars(var limit: Int, var message: String) : Validators
    class MaxChars(var limit: Int, var message: String) : Validators
    class Required(var message: String = REQUIRED_MESSAGE) : Validators
    class Custom(var message: String, var function: (String) -> Boolean): Validators
}
```

- **MaxValue**: checks if the provided value is less than or equal to the provided limit.
- **MinValue**: checks if the value is more than or equal to the provided limit.
- **MaxChars**: this is a string validator that checks if the number of characters in the field is less than or equal to the limit.
- **MinChars**: suitable for passwords. This checks if the number of characters is more than or equal to the specified limit
- **Custom**: this was a new and powerful validator. It allows one to pass in a custom implementation of their validation. It also provides the string value of the text field. You can, therefore, validate it in your own way. Since it's a lambda function, you just need to ensure that the last statement evaluates to a `Boolean`.

With the state working, we wanted to add more functionality to the library. Suppose you had a field that requires the user to input their age. You would most probably want the value as an integer at the end of the validation.

So we wanted to add a transformation function that allows one to change the value to whatever type they would like. And this is where generics come in.

The nature of this function would be `(String) -> T` where you specify the type manually, or it is directly inferred from the return type of the transformer.

So we went ahead and changed our text field class as follows:

```kt
class TextFieldState<T>(
    ...
    val transform: ((String) -> T)? = null,
) {
```

With this, the user can pass in their transformation functions like `String.toInt()` or even `String.trim()`. It does not limit you to Kotlin standard types only. You can pass in your own class too.

We'll get to the transformations in the form state. Speaking of, let's see how we modified it.

### The form state
We were setting the fields using the setter method. This was the first to go. We moved the states to the constructor for ease of operations.

```kt
class FormState(val fields: List<TextFieldState<*>>) {}

// Star projection to allow for all types to be used.
```

Then we went ahead to create a getter method of some sort. It gets a single text field using the name of the state.

```kt
fun getState(name: String): TextFieldState<*> = fields.first { it.name == name }
```

The validate function was more or less the same, i.e, running through all the fields and validating each one of them.

```kt
fun validate(): Boolean = fields.map { it.validate() }.all { it }
```

Now we get to the fun part, accessing the data. Remember the new transformation feature we added? Well, it makes another appearance here.

The basic idea was to receive the data in the form collectively. We were using `Map<String, String>` before. This isn't really flexible and will fail if we apply the transformations. Also, a map? really? We can do better than that.

And by better I mean, what if the user can specify the type they want, and we provide it to them. In Kotlin we use a lot of data classes. So wouldn't it be nice if someone can provide a data class and get data mapped in that class?

To begin with, we needed to convert all the fields in the form to the format `Map<String, Any?>`. Any? is the supertype of all types so when we apply transformations, nothing breaks. And with that map, we can change it to whatever class is specified.

The second hurdle to overcome was how to convert the map to the class. The initial solution was to convert the map to `JSON`, then use a serialization library to convert the json to our class.

But here's the thing, I personally prefer the Kotlin serialization library, but not every developer feels the same. Others use *Gson, Moshi*, etc. So this wasn't a good approach. The next solution was to use *reflection*.

*Reflection* is a bit controversial in the development community for various reasons. But in this case, we wouldn't be dealing with the controversial issues of access modifiers, etc. We only needed the constructor so we can create the class because that is what constructors are for.

```kt
fun <T : Any> getData(dataClass: KClass<T>) : T {
    val map: Map<String, Any?> = fields.associate {
        val value = if (it.transform == null) it.text else it.transform!!(it.text)
        it.name to value
    }

    val constructor = dataClass.constructors.first()
    val args = constructor.parameters.associateWith { map[it.name] }
    return constructor.callBy(args)
}
```

We specify that the function receives a class type *T* or whatever the developer specifies. We call the transform function on each field, if applicable. Then we get the *constructor*, associate the *parameters names* with our *form values*, and return the class.

This worked quite well at first until I decided to annotate my data class with `@Serializable`. At this point is where I learned that annotations support the changing of class constructors. 

After several logs and observations, I saw that the original constructor was the last in the list so, we changed the code to:

```kt
val constructor = dataClass.constructors.last()
```

And with that, our form builder was complete.

Some extra features, more validators, and a better way of providing the user's data.

### Example
To install the library, go through the docs on this [GitHub repo](https://github.com/jkuatdsc/form-builder). 

To use the library, you can first hold the form state in your ViewModel.

```kt
val formState = FormState(
    fields = listOf(
        TextFieldState(
            name = "email",
            transform = { it.trim().lowercase() },
            validators = listOf(Validators.Email()),
        ),
        TextFieldState(
            name = "password",
            validators = listOf(Validators.Required())
        ),
    )
)
```

In the example above, we transform our email address by removing any trailing spaces and changing it to lowercase.

In your *composables*, you can access and update the form field states, as shown below:

```kt
val formState = remember { viewmodel.formState }

val emailState = formState.getState("email")
val passwordState = formState.getState("password")

OutlinedTextField(
    value = emailState.text,
    isError = emailState.hasError,
    label = { Text("Email address") },
    onValueChange = { emailState.change(it) }
)
if (emailState.hasError) Text(emailState.errorMessage, color = Color.Red)

Spacer(modifier = Modifier.height(20.dp))

OutlinedTextField(
    value = passwordState.text,
    isError = passwordState.hasError,
    label = { Text("Password") },
    onValueChange = { passwordState.change(it) }
)
if (passwordState.hasError) Text(passwordState.errorMessage, color = Color.Red)
```

We have access to errors and error messages, so we can show them accordingly. You can validate the whole form in the *ViewModel*, or you can validate individual fields.

```kt
data class Credentials(val email: String, val password: String)

if (formState.validate()) {
    val data = formState.getData(Credentials::class)
    Log.d("Data", "submit: data from the form $data")
}
```

And that is an easy example of how to use the form builder library. You can get more details about the classes and methods in this [repo](https://github.com/jkuatdsc/form-builder).

### Conclusion
With the Form builder library, you can perform various form operations easily while maintaining clean code. 

It is also customizable and has new features such as the *transformation* and *getData* functions.

There are more improvements going on in the library (no spoilers this time 😆) so keep an eye out on the repo and the changelogs.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
