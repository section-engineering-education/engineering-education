Survey and questionaires have been conducted manually for a long time, this tends to be tiresome and sometines it does not reach out to many people. Google forms comes in handy as the forms can be filled with many people from different regions.

The problem with these forms is that they are only designed to work on web, those using apps on IOS or Android cannot use the forms directly unless they do so via their browsers.

In this article, we will design our form from the official website and then come up with an Android application that uses Retrofit to make POST requests to the form in order to submit data.

### Table of contents
- [Prerequisites](#prerequisites)
- [A google form](#a-google-form)
- [Designing a form](#designing-a-form)
- [Obtaining entry IDs](#step-1---obtaining-entry-ids)
- [Creating an android project](#step-2---creating-an-android-project)
- [Adding all necessary dependencies](#step-3---adding-all-necessary-dependencies)
- [Creating a UI](#step-4---creating-a-ui)
- [Creating an API service](#step-5---creating-an-api-service)
- [Submitting data to google form](#step-6---submitting-data-to-google-form)
- [Demo](#demo)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you should have:
- Any IDE for Android development but Android studio is preferred.
- Skilled in creating and debugging an Android app.
- Fundamentals of Kotlin.
- Some basic knowledge in making network requests with Retrofit in Android.

### A google form
Google Forms is a product of Google that helps us in conducting online surveys easily and in a faster way. The forms can be filled by different people and the responses are sent to one person who can analyze the data.

### How do I create a google form?
Follow this link and it will take you to the official google form website -  https://docs.google.com/forms/u/0/

Select blank form

![blank-form](/engineering-education/submitting-data-to-a-google-form-in-android/blank-form.png)

Create your questions, as I have done below:

![define-questions](/engineering-education/submitting-data-to-a-google-form-in-android/define-questions.png)

Click on view to see the final form

![final-form](/engineering-education/submitting-data-to-a-google-form-in-android/final-form.png)

### Step 1 - Obtaining entry IDs
There is no direct way to get the entry IDs of our questions, so the simplest way which does not entail inspecting the web is:

While still on that page which you used to create your questions, on the top right corner of the page, on the options menu, select `Get pre-filled-link`

![pre-filled-link](/engineering-education/submitting-data-to-a-google-form-in-android/pre-filled-link.png)

It will open in a different tab, fill in all the details as you would have done if you were filling the actual form, and then click on get `Get link`.
A link will be generated and you will be prompted to copy the link. Copy and paste it somewhere so that we can extract the entry IDs of the different questions that you have in your form. Here is mine :

"https://docs.google.com/forms/d/e/1FAIpQLSfY8nzs8rqyBBv4slBUxu8RLKNTe6yYu4lCgmRPY_mrnee0vw/viewform?usp=pp_url&entry.1487586230=Calvin+Omati&entry.167627252=calvombati@gmail.com&entry.2059565087=Male&entry.1673881430=https://github.com/calvinombati&entry.124829766=Kotlin&entry.124829766=Java&entry.124829766=Dart"

From the link, as you can see, there are those parts that start with "entry" then are followed by a given number, those are our IDs. If I can break mine down, I will have the following as my final content:

- entry.1487586230=Calvin+Omati
- entry.167627252=calvombati@gmail.com
- entry.2059565087=Male
- entry.1673881430=https://github.com/calvinombati
- entry.124829766=Kotlin
- entry.124829766=Java
- entry.124829766=Dart

> For the checkboxes, you need to get all the IDs of those options as that questions can have multiple answers, so I have gone and checked `Swift` to get its ID - "entry.124829766=Swift"

### Step 2 - Creating an android project
Launch your IDE and create a new Android project with a suitable name and choose Kotlin as its primary language.

![new-project](/engineering-education/submitting-data-to-a-google-form-in-android/new-project.png)

### Step 3 - Adding all necessary dependencies
Navigate to your project's app-level `build.gradle` file and add the `Retrofit` and `Gson` dependencies.

```gradle
// Retrofit and Gson
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```

### Step 4 - Creating a UI
Because we want to test sending answers to several types of questions i.e. Short text questions, multi-choice questions, and checkboxes questions, we will create a user interface that contains several `TextViews, `Radio Button` and `Checkboxes`. 

This is how the layout should look like. If you are having difficulties in coming up with the UI, please feel free to check it out in this Github repository - [Retrofit-GoogleFormDemo](https://github.com/calvinombati/Retrofit-GoogleFormDemo).

![ui](/engineering-education/submitting-data-to-a-google-form-in-android/ui.png)

> Take note that I have created the UI and the questions in correspondence with the questions that I created on the google form.

### Step 5 - Creating an API service
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

The function takes the Retrofit's POST annotation and then we pass the endpoint to the form. 

To get this endpoint and the BASE_URL from your form Url in the browser, just copy it as I have done below: 

"https://docs.google.com/forms/d/e/1FAIpQLSfY8nzs8rqyBBv4slBUxu8RLKNTe6yYu4lCgmRPY_mrnee0vw/viewform"

The first part to where it ends with "e/", that is our BASE URL - "https://docs.google.com/forms/d/e/"

From that part to where it ends with "/viewform", the content in between is our endpoint (make sure you append it with a "/formResponse" and remove that "viewform") - "1FAIpQLSfY8nzs8rqyBBv4slBUxu8RLKNTe6yYu4lCgmRPY_mrnee0vw/formResponse"

For the parameters of our `submitResponse` function, we need to pass the IDs that we extracted from our form - use the `@Field` annotation, and inside it, make sure you pass the correct entry ID corresponding to the data you will pass there when calling that function. For instance, for the 'fullName', its ID was "entry.1487586230"

> For the questions which had checkboxes, we need to pass all the entry IDs and make them nullable and the user can select none, some, or all.

Go ahead and create an instance of the API service using Retrofit and the BASE_URL that we have extracted. This instance is the one that we will use to make the network calls.

For reference, you can checkout this one that I have created in the demo app. - [Retrofit-GoogleFormDemo](https://github.com/calvinombati/Retrofit-GoogleFormDemo)

### Step 6 - Submitting data to google form
Finally, to join all the pieces, navigate to your `MainActivity` and inside the `onCreate` function, on the click of the submit `Button` is where we will link up everything. We will get the data entered in the `EditText`s, the selected gender from the `RadioButton`s and checked `CheckBox`es for favorite languages. Then we will send the data through the instance of the `FormApi`.

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

### Demo
If you have followed the steps correctly and run your app when you enter data and submit it, it should be submitted to our google form.

![demo](/engineering-education/database-driven-push-notifications-in-android-with-firebase/demo.gif)

When you go to your form in edit mode, you should the response that you just made from your Android phone.

![form-response](/engineering-education/submitting-data-to-a-google-form-in-android/form-response.png)

### Conclusion
In this tutorial, we have learned what a google form is, how to create one, and then learned how to extract the entry IDs of our form questions. We then went ahead and created a simple Android application that sends a POST request to the form with the help of Retrofit. For a full implementation of the demo, check out this Github repository - [Database driven push notifications](https://github.com/calvinombati/Retrofit-GoogleFormDemo).

Happy learning!
