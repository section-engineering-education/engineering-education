---
layout: engineering-education
status: publish
published: true
url: /submitting-data-to-a-google-form-in-android/
title: Submitting data to a Google form in Android
description: This article aims to demonstrate how to submit data to a Google form from an android application using Retrofit.
author: calvin-ombati
date: 2022-04-07T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/submitting-data-to-a-google-form-in-android/hero.jpg
    alt: Submitting data to Google form in android Hero Image
--- 

Surveys and questionnaires have been conducted manually for a long time. However, this tends to be tiresome and sometimes does not reach out to many people. 
<!--more-->
Google forms come in handy for conducting surveys as people from different regions can fill them simultaneously. However, these forms can only be accessed via browsers limiting Android and IOS users unless they use mobile browsers. 

This article takes care of this by designing a form from the official website and then coming up with an Android application that uses Retrofit to make POST requests to the form to submit data.

### Table of contents
- [Prerequisites](#prerequisites)
- [What is a google form](#what-is-a-google-form)
- [Creating a Google form](#creating-google-forms)
- [Obtaining entry IDs](#obtaining-entry-ids)
- [Creating an android project](#creating-an-android-project)
- [Adding the project dependencies](#adding-the-project-dependencies)
- [Creating the User Interface](#creating-the-user-interface)
- [Creating the API service](#creating-the-api-service)
- [Submitting data to google form](#submitting-data-to-google-form)
- [Application Demo](#application-demo)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you should have:
- Any IDE for Android development, but Android studio is preferred.
-  Android programming and debugging.
- Fundamentals of Kotlin.
-  Making network requests with Retrofit in Android.

### What is a Google form
Google Forms is a Google product that assists in conducting online surveys efficiently and faster. Different people can fill out the forms, and the responses are sent to one person for analysis.

### Creating Google Forms
Follow [this link](https://docs.google.com/forms/u/0/) to the official google form website, then select blank form.

![blank-form](/engineering-education/submitting-data-to-a-google-form-in-android/blank-form.png)

Create your questions like below:

![define-questions](/engineering-education/submitting-data-to-a-google-form-in-android/define-questions.png)

Click on view to see the final form.

![final-form](/engineering-education/submitting-data-to-a-google-form-in-android/final-form.png)

### Obtaining entry IDs
The simplest way to obtain the questions entry IDs is; while still on the page you used to create your questions, head over to the top right corner of the page, then on the options menu, select `Get pre-filled-link.`

![pre-filled-link](/engineering-education/submitting-data-to-a-google-form-in-android/pre-filled-link.png)

This will open in a different tab. Fill in all the details as you would have done if you filled out the form, and then click on get `Get link`.

Copy and paste the generated link somewhere to extract the entry IDs of the different questions in your form. Here is mine :
```bash
https://docs.google.com/forms/d/e/1FAIpQLSfY8nzs8rqyBBv4slBUxu8RLKNTe6yYu4lCgmRPY_mrnee0vw/viewform?usp=pp_url&entry.1487586230=Calvin+Omati&entry.167627252=calvombati@gmail.com&entry.2059565087=Male&entry.1673881430=https://github.com/calvinombati&entry.124829766=Kotlin&entry.124829766=Java&entry.124829766=Dart
```
Our IDs are the parts that start with `entry`  followed by a given number. So, for example, if I break mine down, I will have the following as my final content:

- entry.1487586230=Calvin+Omati
- entry.167627252=calvombati@gmail.com
- entry.2059565087=Male
- entry.1673881430=https://github.com/calvinombati
- entry.124829766=Kotlin
- entry.124829766=Java
- entry.124829766=Dart

> For the checkboxes, you need to get all the IDs of those options as a question can have multiple answers.

### Creating an Android Project
Launch your IDE and create a new Android project with a proper name with Kotlin as its primary language.

![new-project](/engineering-education/submitting-data-to-a-google-form-in-android/new-project.png)

### Adding the project dependencies
Navigate to your project app-level `build.gradle` file and add the `Retrofit` and `Gson` dependencies.

```gradle
// Retrofit and Gson
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```

### Creating the User Interface
We will create a user interface containing several `TextViews, `Radio Button`, and `Checkboxes` because we want to test sending answers to several types of questions, i.e. Short text questions, multi-choice questions, and checkboxes.

If you have difficulties coming up with the UI, please check it out in this Github repository [Retrofit-GoogleFormDemo](https://github.com/calvinombati/Retrofit-GoogleFormDemo).

![ui](/engineering-education/submitting-data-to-a-google-form-in-android/ui.png)

> Take note that I have created the UI and the questions in correspondence with the questions on the google form.

###  Creating the API service
Create an `Interface` and create a function to submit the data.

```kotlin
interface ApiService {
    @POST("1FAIpQLSfY8nzs8rqyBBv4slBUxu8RLKNTe6yYu4lCgmRPY_mrnee0vw/formResponse")
    @FormUrlEncoded
    fun submitResponse(
        @Field("entry.167627252") emailAddress: String,
        @Field("entry.1487586230") fullName: String,
        @Field("entry.1673881430") github: String,
        @Field("entry.2059565087") gender: String,
        @Field("entry.124829766") kotlin: String?,
        @Field("entry.124829766") java: String?,
        @Field("entry.124829766") dart: String?,
        @Field("entry.124829766") swift: String?,
    ): Call<Void>
}
```

The function takes the Retrofit's POST annotation and the endpoint to the form. The `BASE_URL` is the link to the form as below.
```bash
https://docs.google.com/forms/d/e/1FAIpQLSfY8nzs8rqyBBv4slBUxu8RLKNTe6yYu4lCgmRPY_mrnee0vw/viewform
```
The first part to the "e/" is our `BASE_URL`. So, for instance, mine is  "https://docs.google.com/forms/d/e/".

Our endpoint is from that part to the part that ends with "/viewform". Make sure you append it with a "/formResponse" and remove "viewform"). For instance, the endpoint will be "1FAIpQLSfY8nzs8rqyBBv4slBUxu8RLKNTe6yYu4lCgmRPY_mrnee0vw/formResponse" from my link.

We need to pass the IDs extracted from the form using the `@Field` annotation to the `submitResponse` function.

> For the questions which had checkboxes, we need to pass all the entry IDs and make them nullable so the user can select none, some, or all.

Go ahead and create an instance of the API service using Retrofit and the BASE_URL that we have extracted. We will use this instance to make the network calls.

You can check out the one I have created in the demo app for reference. - [Retrofit-GoogleFormDemo](https://github.com/calvinombati/Retrofit-GoogleFormDemo)

###  Submitting data to google form
In the  `MainActivity`  inside the `onCreate` function,  we will link the API to the data entered on the form. 

We will get the data entered in the `EditText` fields, the selected gender from the `RadioButton`, and checked `CheckBox`es for favorite languages. Then, we will send the data through the instance of the `FormApi`.

```kotlin
binding.buttonSubmit.setOnClickListener {

    // Get selected radio button from radioGroup
    val selectedId: Int = binding.radioSex.checkedRadioButtonId

    // Find the radiobutton by returned id
    val gender = (findViewById<RadioButton>(selectedId)).text.toString()

    // CheckBoxes
    val kotlin = binding.kotlinCheckBox.isChecked
    val java = binding.javaCheckBox.isChecked
    val dart = binding.dartCheckBox.isChecked
    val swift = binding.swiftCheckbox.isChecked
            
    FormApi.api.submitResponse(
        binding.edtEmail.text.toString(),
        binding.edtFullName.text.toString(),
        binding.edtGithub.text.toString(),
        gender,
        if (kotlin) {
            "Kotlin"
        } else null,
        if (java) {
            "Java"
        } else null,
        if (dart) {
            "Dart"
        } else null,
        if (swift) {
            "Swift"
        } else null,
    ).enqueue(object : Callback<Void> {

        override fun onResponse(call: retrofit2.Call<Void>, response: Response<Void>) {
            Toast.makeText(
                applicationContext,
                "Form submitted successfully",
                Toast.LENGTH_SHORT
            ).show()
        }

        override fun onFailure(call: retrofit2.Call<Void>, t: Throwable) {
            Toast.makeText(
                applicationContext,
                t.localizedMessage,
                Toast.LENGTH_SHORT
            ).show()
        }

    })
}
```

### Application Demo
Suppose you have followed the steps correctly,  then the application should submit the data from the phone to the Google form like below. 

![demo](/engineering-education/database-driven-push-notifications-in-android-with-firebase/demo.gif)

When you access your form in edit mode, you should see the response that you just made from your Android phone.

![form-response](/engineering-education/submitting-data-to-a-google-form-in-android/form-response.png)

### Conclusion
In this tutorial, we have learned what a Google form is, how to create one, and extract our form questions' entry IDs. 

We then created a simple Android application that sends a POST request to the form with the help of Retrofit. Check out [this Github repository](https://github.com/calvinombati/Retrofit-GoogleFormDemo).

Happy learning!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
