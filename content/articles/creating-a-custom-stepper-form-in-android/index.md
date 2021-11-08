### Creating a Custom Stepper Form in Android
When a user wants to fill out a form, sometimes you need to present all the information on a single screen. This process is a bit cumbersome. To improve the user interface and make the app more interactive, a stepper is implemented in the app. Implementing this would also improve consistency.

### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [Introduction](#introduction)
- [Application Areas of Step Forms](#application-areas-of-step-forms)
- [Creating an Android Project](#step-1---creating-an-android-project)
- [Setting up Project](#step-2---setting-up-project)
- [Define Steps Titles](#step-3---define-steps-titles)
- [App Layout](#step-4---app-layout)
- [Navigating to the Next Form](#step-5---navigating-to-the-next-form)
- [Handling Navigating Back](#step-6---handling-navigating-back)
- [Demo](#demo)
- [Conclusion](#conclusion)

### Prerequisites
To follow along: 
- Make sure you have Android Studio installed.
- Good understanding of how to create and run Android applications.
- A knowledge of the [Kotlin](https://kotlinlang.org/) programming language is required.
- An understanding of how to use `ViewBinding`.

### Goals
At the end of this tutorial, the reader should have:
- What a stepper form is.
- Applications for stepper form.
- Learned how to create a stepper form.

### Introduction
Steppers display progress through a sequence of logical and numbered steps. They may also be used for navigation and also display a transient feedback message after a step is saved.

Stepper divides the current screen into different views and the contents are distributed over all of them. Users can navigate through these views.

Steppers keep users informed about their progress by indicating what step they’re on and how many steps they have left. Displaying steppers on mobile phones is a challenge due to the limited screen space. 

### Application Areas for Stepper Forms
Step Forms can be used in:
- Loan apps whereby a user needs to fill in a lot of details.
- Steps can be used in applications where when a user is registering they need to fill in more information that cannot fit on a single screen.


In this tutorial, we will create a form for a loan application that asks the user to fill in details such as Personal details, location details, how he/she will use the loan, current employment details, and finally, the loan amount in the last form.

### Step 1 - Creating an Android Project
Launch Android Studio and create an empty Android Project.

![project](/engineering-education/creating-a-custom-stepper-form-in-android/project.jpg)

### Step 2 - Setting up Project
In this step, copy the following dependency and paste it into your app-level `build.gradle`
```Gradle
dependencies {
    ...
    implementation 'com.shuhart.stepview:stepview:1.5.1'
}
```

### Step 3 - Define Step Titles
In the `res` directory, open `string.xml` and add the following array. This is the list of titles that will be at the top of each step. 

```
    <array name="details">
        <item>Personal</item>
        <item>Location</item>
        <item>Usage</item>
        <item>Employment</item>
        <item>Loan</item>
    </array>
```

### Step 4 - App Layout
At this point, we are going to define a layout that will define how the different steps will be displayed.

1. #### Define `StepView`
    ```Xml
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

    ##### Explanation
    In this View:
    - We have added the attribute `app:sv_steps="@array/details"` that contains the steps that we defined in strings
    
    > You can play with the different attributes available so to come up with a stepper that is of the look and feel of your choice i.e changing the different color properties.

2. #### Define Forms Layouts
   To achieve the different forms in different steps, we will be creating layouts and hiding them, then displaying them at the right moment. 

   We will also define a `Button` at the bottom of the layout. This button will be used for navigating from one form to another.

   ##### Form One - Personal Details
   This will be the layout for this step
   ```Xml
       <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/personal_details"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:visibility="visible"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="1.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/step_view">

    ... YOUR_VIEWS


    </androidx.constraintlayout.widget.ConstraintLayout>
   ```

   ##### Forms Two - Location
   ```Xml
       <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/location"
        android:layout_width="match_parent"
        android:layout_height="530dp"
        android:visibility="gone"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="1.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/step_view">

    ... YOUR_VIEWS


    </androidx.constraintlayout.widget.ConstraintLayout>     
   ```

   ##### Forms Three - Usage Details
   ```Xml
       <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/usage"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:visibility="gone"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/step_view">

       ... YOUR_VIEWS

    </androidx.constraintlayout.widget.ConstraintLayout>       
   ```

   ##### Forms Four - Employment Details
   ```Xml
       <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/employment"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:visibility="gone"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/step_view">

       ... YOUR_VIEWS

    </androidx.constraintlayout.widget.ConstraintLayout>    
   ```

   ##### Forms Five - Loan Details
   ```Xml
       <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/repayment"
        android:layout_width="match_parent"
        android:layout_height="600dp"
        android:visibility="gone"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/step_view">

           ... YOUR_VIEWS

    </androidx.constraintlayout.widget.ConstraintLayout>       
   ```

   #### Navigation Button
   Finally, lets define a button that will help us in navigating through the 5 forms.
   ```Xml
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

   > Except for the first Form, with the other Forms, make their `visibility` to be gone.     

### Step 5 - Navigating to the Next Form
After defining our layouts, what remains is to add some logic to our `MainActivity` to help us navigate through different forms.

Define a variable that will hold the position of each form:

`private var position = 0`

Also, to make sure that our StepView always starts at step one, inside `onCreate` add this line of code 

`binding.stepView.done(false)`

Next, we add on `onClickListener` to the Next `Button` and define some code:

```Kotlin
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
                    binding.button.text = "Next"
                }
                2 -> {
                    binding.usage.visibility = View.GONE
                    binding.employment.visibility = View.VISIBLE
                    position = 3
                    binding.stepView.done(false)
                    binding.stepView.go(position, true)
                    binding.button.text = "Next"
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
                    binding.stepView.go(5, true)

                    // Go to another Activity or Fragment
                }
            }
        }
    }
```

#### Explanation
Inside the `onClickListener` of the button, we are switching positions, whereby, for each `position`:
- We hide the current Layout and make the next Layout visible
- We then increment the position to the corresponding layout
- We make sure the `binding.stepView.done(false)` is false
- We then make the `StepView` to go to the incremented position number - `binding.stepView.go(position, true)`
- Finally, for the first three layouts, we change the `Button` text to "Next". In the fourth one, we change the `Button` text to "Submit"

In the `else` part, we set the position to "0" and call the `StepView`'s method `done`

`binding.stepView.done(true)`

We then make our `StepView` go to step 5

`binding.stepView.go(5, true)`

> In this `else` clause, we can add code to either navigate a user to another `Activity` or `Fragment`

### Step 6 - Handling Navigating Back
It is good to add a capability whereby a user can navigate to a previous step, to do so, we will implement the `onBackPressed` method

```Kotlin
    override fun onBackPressed() {
        when (position) {
            0 -> {
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
                binding.button.text = "Next"
            }
            3 -> {
                binding.employment.visibility = View.GONE
                binding.usage.visibility = View.VISIBLE
                position = 2
                binding.stepView.done(false)
                binding.stepView.go(position, true)
                binding.button.text = "Next"
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
- For the other positions, we hide the current layout and make the preceding layout visible together with its position

That's all, you have created a customizable Stepper form.

### Demo
![step1](/engineering-education/creating-a-custom-stepper-form-in-android/step1.png)

![step2](/engineering-education/creating-a-custom-stepper-form-in-android/step2.png)

![step3](/engineering-education/creating-a-custom-stepper-form-in-android/step3.png)

![step4](/engineering-education/creating-a-custom-stepper-form-in-android/step4.png)

![step5](/engineering-education/creating-a-custom-stepper-form-in-android/step5.png)

###  Conclusion
In this tutorial, we have learned what is a stepper, what are its applications, how to create a stepper using `StepView`. Go ahead and use this awesome feature in your Apps. For a full implementation of the Stepper form, check out this Github repository - [StepperFormDemo](https://github.com/feswalsalim/StepperFormDemo.git)

Happy coding!!!
