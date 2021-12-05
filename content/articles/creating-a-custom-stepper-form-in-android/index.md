---
layout: engineering-education
status: publish
published: true
url: /creating-a-custom-stepper-form-in-android/
title: Creating a Custom Stepper Form in Android
description: This tutorial will guide the reader through the process of creating a custom stepper form in Android. A stepper displays the user’s progress through a series of steps.
author: feswal-salim
date: 2021-11-27T00:00:00-11:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-custom-stepper-form-in-android/hero.png
    alt: Creating a Custom Stepper Form in Android Hero Image
---
When creating forms in Android apps, you may want to present all the information in the available screen space. This approach is a bit cumbersome as not everything can fit in one screen.
<!--more-->
To improve consistency, the user interface, and make the app more interactive, a stepper is implemented.

### Prerequisites
To follow along:
- Make sure you have Android Studio installed.
- You need a good understanding of how to create and run Android applications.
- Knowledge of the [Kotlin](https://kotlinlang.org/) programming language and `ViewBinding` is required.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Goals](#goals)
- [Introduction](#introduction)
- [Application of Stepper forms](#application-of-stepper-forms)
- [Step 1 - Creating an Android project](#step-1---creating-an-android-project)
- [Step 2 - Setting up the project](#step-2---setting-up-the-project)
- [Step 3 - Define step titles](#step-3---define-step-titles)
- [Step 4 - App layout](#step-4---app-layout)
  - [Define StepView](#define-stepview)
  - [Explanation](#explanation)
- [Define form layouts](#define-form-layouts)
  - [Personal details form](#personal-details-form)
  - [Location details form](#location-details-form)
  - [Usage details form](#usage-details-form)
  - [Employment details form](#employment-details-form)
  - [Loan details form](#loan-details-form)
  - [Navigation button](#navigation-button)
- [Step 5 - Navigating to the next step](#step-5---navigating-to-the-next-step)
  - [Explanation](#explanation-1)
- [Step 6 - Handling back navigation](#step-6---handling-back-navigation)
  - [Explanation](#explanation-2)
- [Conclusion](#conclusion)

### Goals
By the end of this tutorial, the reader will be able to:
- Understand what a stepper form is.
- Know various applications of stepper forms.
- Learn how to create a stepper form.

### Introduction
Steppers display progress through a sequence of logical and numbered steps. They may also be used for navigation and displaying transient feedback message when a step is saved.

Stepper divides the current screen into different views and the contents are distributed over all of them. Users can navigate through these views.

Steppers keep users informed about their progress by indicating what step they’re on and how many steps they have left. This could otherwise be a challenge due to the limited screen space.

### Application of Stepper forms
Stepper Forms can be used in:
- Loan apps whereby a user needs to fill in a lot of details.
- Applications where when a user is registering, they need to fill in more information that cannot fit on a single screen.

In this tutorial, we will create a form for a loan application that asks the user to fill in details such as names, location details, how he/she will use the loan, current employment details, and finally, the loan amount in the last form.

### Step 1 - Creating an Android project
Launch Android Studio and create an empty android project.

![project](/engineering-education/creating-a-custom-stepper-form-in-android/project.png)

### Step 2 - Setting up the project
In this step, copy the following dependency and paste it into your app-level `build.gradle` file.

```gradle
dependencies {
    implementation 'com.shuhart.stepview:stepview:1.5.1'
}
```

### Step 3 - Define step titles
In the `res` directory, open `string.xml` and add the following array. This is the list of titles that will appear at the top of each step.

```xml
<array name="details">
    <item>Personal</item>
    <item>Location</item>
    <item>Usage</item>
    <item>Employment</item>
    <item>Loan</item>
</array>
```

### Step 4 - App layout
At this point, we are going to define a layout that will define how the different steps will be displayed.

#### Define StepView
In the `res` directory, open your layout file and add the following code.

```xml
    <com.shuhart.stepview.StepView
    android:id="@+id/step_view"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_gravity="center"
    android:layout_marginStart="8dp"
    android:layout_marginTop="16dp"
    android:layout_marginEnd="8dp"
    android:padding="8dp"
    app:sv_animationDuration="1"
    app:sv_animationType="Line"
    app:sv_doneCircleColor="@color/primaryLightColor"
    app:sv_doneCircleRadius="20dp"
    app:sv_doneStepLineColor="@color/primaryLightColor"
    app:sv_doneStepMarkColor="@android:color/black"
    app:sv_doneTextColor="@android:color/darker_gray"
    app:sv_nextStepLineColor="@color/colorGray"
    app:sv_nextTextColor="@color/colorGray"
    app:sv_selectedCircleColor="@color/primaryDarkColor"
    app:sv_selectedCircleRadius="12dp"
    app:sv_selectedStepNumberColor="@color/colorLightGrayMore"
    app:sv_selectedTextColor="@color/primaryDarkColor"
    app:sv_stepLineWidth="1dp"
    app:sv_stepNumberTextSize="12sp"
    app:sv_stepPadding="4dp"
    app:sv_stepViewStyle="@style/StepView"
    app:sv_steps="@array/details"
    app:sv_stepsNumber="3"
    app:sv_textSize="12sp"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.5"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"/>
```

#### Explanation
In this View:
- We have added the attribute `app:sv_steps="@array/details"` that contains the steps that we defined in strings.

> You can play around with the different attributes available to come up with a stepper of your preferred appearance. I.e changing the different color and size properties.

### Define form layouts
To achieve the different forms in different steps, we will create layouts and hide them, then displaying them at the right step.

We will also define a `Button` at the bottom of the layout. This button will be used to navigate from one form to another.

#### Personal details form
The following will be the layout for this step:

```xml
<androidx.constraintlayout.widget.ConstraintLayout
    android:id="@+id/personal_details"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="visible"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="1.0"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/step_view">

<!--  YOUR_VIEWS -->

</androidx.constraintlayout.widget.ConstraintLayout>
```

![step 1](/engineering-education/creating-a-custom-stepper-form-in-android/step1.png)

#### Location details form

```xml
<androidx.constraintlayout.widget.ConstraintLayout
    android:id="@+id/location"
    android:layout_width="match_parent"
    android:layout_height="530dp"
    android:visibility="gone"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="1.0"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/step_view">

    <!-- YOUR_VIEWS -->

</androidx.constraintlayout.widget.ConstraintLayout>
```

![step 2](/engineering-education/creating-a-custom-stepper-form-in-android/step2.png)

#### Usage details form

```xml
<androidx.constraintlayout.widget.ConstraintLayout
    android:id="@+id/usage"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="gone"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.0"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/step_view">

    <!-- YOUR_VIEWS -->

</androidx.constraintlayout.widget.ConstraintLayout>
```

![step 3](/engineering-education/creating-a-custom-stepper-form-in-android/step3.png)

#### Employment details form

```xml
<androidx.constraintlayout.widget.ConstraintLayout
    android:id="@+id/employment"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:visibility="gone"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.0"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/step_view">

    <!-- YOUR_VIEWS -->

</androidx.constraintlayout.widget.ConstraintLayout>
```

![step 4](/engineering-education/creating-a-custom-stepper-form-in-android/step4.png)

#### Loan details form

```xml
<androidx.constraintlayout.widget.ConstraintLayout
    android:id="@+id/repayment"
    android:layout_width="match_parent"
    android:layout_height="600dp"
    android:visibility="gone"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.0"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/step_view">

    <!-- YOUR_VIEWS -->

</androidx.constraintlayout.widget.ConstraintLayout>
```

![step 5](/engineering-education/creating-a-custom-stepper-form-in-android/step5.png)

#### Navigation button
Finally, lets add a button that will help us in navigating through the five forms.

```xml
<com.google.android.material.button.MaterialButton
    android:id="@+id/button"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_marginStart="16dp"
    android:layout_marginEnd="16dp"
    android:layout_marginBottom="64dp"
    android:padding="12dp"
    android:text="Next"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent" />
```

> NOTE: Except for the first form, set the other forms' visibility to `gone`. This will ensure that only one form is visible at a time.

### Step 5 - Navigating to the next step
After defining our layouts, what remains is to add some logic to our `MainActivity.kt` to help us navigate through different forms.

Define a variable that will hold the position of each form:

```kotlin
private var position = 0
```

Also, to make sure that our StepView always starts at step one, inside `onCreate` method, add this line of code:

```kotlin
binding.stepView.done(false)
```

Next, we need to add a `ClickListener` to the `Next Button` to display and hide the respective form(s) based on the position.

```kotlin
binding.button.setOnClickListener {
    when (position) {
        0 -> {
            binding.personalDetails.visibility = View.GONE
            binding.location.visibility = View.VISIBLE
            position = 1
            binding.stepView.done(false)
            binding.stepView.go(position, true)
            binding.button.text = "Next"
        }
        1 -> {
            binding.location.visibility = View.GONE
            binding.usage.visibility = View.VISIBLE
            position = 2
            binding.stepView.done(false)
            binding.stepView.go(position, true)
        }
        2 -> {
            binding.usage.visibility = View.GONE
            binding.employment.visibility = View.VISIBLE
            position = 3
            binding.stepView.done(false)
            binding.stepView.go(position, true)
        }
        3 -> {
            binding.employment.visibility = View.GONE
            binding.repayment.visibility = View.VISIBLE
            position = 4
            binding.stepView.done(false)
            binding.stepView.go(position, true)
            binding.button.text = "Submit"
        }

        else -> {
            position = 0
            binding.stepView.done(true)
            binding.stepView.go(it, true)

            // Go to another Activity or Fragment
        }
    }
}
```

#### Explanation
Inside the `onClickListener` of the button, we are switching positions, whereby, for each position:
- We hide the current layout/form and make the next one visible.
- We increment the position to the corresponding layout.
- We make sure the `binding.stepView.done` is false so that the StepView will show the current step as not done, except for the last step.
- We then make the `StepView` go to the incremented position - `binding.stepView.go(position, true)`.
- Finally, for the first three layouts, we change the `Button` text to "Next". In the fourth step, we change the text to "Submit".

In the `else` part, we set the position to "0" and call the `StepView`'s `done` method.

In this `else` clause, we can add code to either navigate a user to another `Activity` or `Fragment`

### Step 6 - Handling back navigation
It is good to add a feature that allows a user to navigate to the previous step. To do so, we will implement the `onBackPressed` method.

```kotlin
override fun onBackPressed() {
    when (position) {
        0 -> {
            // exit the app
            super.onBackPressed()
        }

        1 -> {
            binding.location.visibility = View.GONE
            binding.personalDetails.visibility = View.VISIBLE
            position = 0
            binding.stepView.done(false)
            binding.stepView.go(position, true)
            binding.button.text = "Next"
        }
        2 -> {
            binding.usage.visibility = View.GONE
            binding.location.visibility = View.VISIBLE
            position = 1
            binding.stepView.done(false)
            binding.stepView.go(position, true)
        }
        3 -> {
            binding.employment.visibility = View.GONE
            binding.usage.visibility = View.VISIBLE
            position = 2
            binding.stepView.done(false)
            binding.stepView.go(position, true)
        }
        else -> {
            binding.repayment.visibility = View.GONE
            binding.employment.visibility = View.VISIBLE
            position = 3
            binding.stepView.done(false)
            binding.stepView.go(position, true)
            binding.button.text = "Next"
        }
    }
}
```

#### Explanation
`onBackPressed`:
- If the position is "0" the app exits.
- For the other positions, we hide the current layout and make the preceding layout visible together with its position.

That's all, you have created a customizable Stepper form.

### Conclusion
In this tutorial, we have learned what a stepper is, what are its applications, and how to create a stepper form using `StepView`. Go ahead and use this awesome feature in your apps.

For a full implementation of the Stepper form, check out [this Github repository](https://github.com/feswalsalim/StepperFormDemo.git).

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
