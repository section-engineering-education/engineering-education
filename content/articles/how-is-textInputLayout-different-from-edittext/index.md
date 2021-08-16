In this tutorial, we are going to focus on how TextInputLayout different from EditText.

### Prerequisites
To understand this tutorial, the reader should:
-   Have Android Studio installed
-   Have an understanding XML.
-   Be familiar with Android studio. 

### Goal
At the end of this tutorial, the reader should;
-   Have an overview of  what  is TextInputLayout.
-   Know the different between TextInputLayout and EditText.
-   The ability to create and work with different text field .

### Introduction
When Working with EditText in android applications.Developers finds it somehow tricky to do customization.To solve this problem. Developers have come up with TextInputLayout which have more and better features compared to the normal EditText. In this article we will discuss about TextInputLayout.

### What is TextInputLayout
TextInputLayout is a layout that is use to add some features to EditText. It acts as a wrapper for edit text and it has some features like floating hint animation that you can  disable or enable, error labels that display error messages when an error occurs, character counter that counts the number of characters that the user is entering, password visibility toggle and their customization for EditText and also it extends LinearLayout.
In a nutshell, TextInputLayout is an improvement of existing EditText.

### How TextInputLayout different from EditText
The main difference between TextInputLayout and EditText is that:
TextInputLayout extends LinearLayout and it must have or contain TextInputEditText which extends EditText.
This is because TextInputEditText works inside TextInputLayout and if you substitute TextInputEditText with EditText and work with normal EditText inside TextInputLayout it might work but you will get a warning. This is because TextInputEditText provides accessibility support for the text field and allows TextInputLayout to have a greater control over the visual aspects of the input text. 

### Text field
A text field is a standard entry widget (single line) that when a user touches it, it places a cursor on it and displays a keyboard hence allowing user to type text into your app.  
To add a text field to your layout we use EditText object.

### Using text field
To use text field in your android application.
First, Import or add the new material components dependency.

### Filled text field
According to official documentation, filled text field have more visual emphasis than outlined text field and hence making them stand out when surrounded by other content and components.
It has two height variants, that is it consist of standard and dense text fields.
Filled text field is the default styles if the style is not set.

### Outlined text field
 In outlined text field we apply styles on the TextInputLayout. As a result we will  get the outlined look text field.
Like filled text field, outlined text field has two height variants. that is, it consists of standard and dense text fields.
We have attributes that you can use to set the outlined look (like corner radius outline and stroke color outline) of a text field.

### Theming text field
In theming text field, we use material theming in text fields. You can be customize  text field in term of color, topography and shape.
Like to filled text field and outlined text filled, theming text field has two height variants, that is, it consists of standard and dense text fields.

### Adding TextInputLayout to our android app.
Now, I am going to create a new project to show you how to work with TextInputLayout in an android application.I will be using a single activity application and we will do  all cool stuff inside activity_main.

### Step 1:
Creating Project
First you have to open a new project in your android studio. Then open your build.gradle . Add material dependency and click sync now.

### Step 2: Adding material dependency
```gradle 
//Material  dependency 
implementation 'com.google.android.material:material:1.4.0'
``` 

### Step 3: Adding TextInputLayout to your activity_main file
Then we reach to the activity_main file and delete the default TextView add TextInputLayout as a child layout inside ConstraintLayout and constraint it and give it some margin.
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:layout_editor_absoluteX="1dp">
    </com.google.android.material.textfield.TextInputLayout>
</androidx.constraintlayout.widget.ConstraintLayout>

```
### Step 4: Adding TextInputEditText into TextInputLayout
Inside TextInputLayout create TextInputEditText, where user can input or edit the data.
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:layout_editor_absoluteX="1dp">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>
    </com.google.android.material.textfield.TextInputLayout>
</androidx.constraintlayout.widget.ConstraintLayout>

```

### Step 5: Adding  hint into  TextInputEditText attribute
Add hint attribute ``` android:hint="Enter your name" ``` to your TextInputEditText.
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="16dp"
        app:boxBackgroundMode="outline"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Enter your name" />
    </com.google.android.material.textfield.TextInputLayout>
</androidx.constraintlayout.widget.ConstraintLayout>

```

### Step 6: Adding boxBackgroundMode into TextInputLayout
Since we have filled text field, you can add boxBackgroundMode attribute ``` app:boxBackgroundMode="outline" ``` to your TextInputLayout and you will have a box outline look text field.
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="16dp"
        app:boxBackgroundMode="outline"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Enter your name" />
    </com.google.android.material.textfield.TextInputLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```
### Step 7: Styling filled text field (Changing filled text field to outlined text field)
Then you can style your filled text field to change box outline look and change it to outlined text field using ``` style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox" ``` .
now you will have an outlined text field.
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="16dp"
        app:boxBackgroundMode="outline"
        style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Enter your name" />
    </com.google.android.material.textfield.TextInputLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```
### Step 8: Adding boxCornerRadius attributes into TextInputLayout (This is Optional)
You can also add boxCornerRadius attributes to your TextInputLayout to change corner radius of your box outline look.
```
   app:boxCornerRadiusTopEnd="16dp"
   app:boxCornerRadiusTopStart="16dp"
   app:boxCornerRadiusBottomStart="16dp"
   app:boxCornerRadiusBottomEnd="16dp"
```
above are the available boxCornerRadius attributes.
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="16dp"
        app:boxBackgroundMode="outline"
        style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
        app:boxCornerRadiusTopEnd="16dp"
        app:boxCornerRadiusTopStart="16dp"
        app:boxCornerRadiusBottomStart="16dp"
        app:boxCornerRadiusBottomEnd="16dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Enter your name" />
    </com.google.android.material.textfield.TextInputLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```
### Step 9: Adding helpertext into TextInputLayout (This is Optional)
You can enable or disable helpertext using helpertext attribute ``` app:helperText="This is an helpertext" ```.
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="16dp"
        app:boxBackgroundMode="outline"
        app:helperText="This is an helpertext"
        style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
        app:boxCornerRadiusTopEnd="16dp"
        app:boxCornerRadiusTopStart="16dp"
        app:boxCornerRadiusBottomStart="16dp"
        app:boxCornerRadiusBottomEnd="16dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Enter your name" />
    </com.google.android.material.textfield.TextInputLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```
### Step 10: Adding counter into TextInputLayout and maximum length into TextInputEditText
 (This is Optional)
You can add a counter by enabling counter using counterEnable attribute ``` app:counterEnabled="true" ``` and set maximum length using counterMaxLength attribute ``` app:counterMaxLength="20" ``` to count the maximum length of users input required. maxLength attribute ``` android:maxLength="20" ``` is added to TextInputEditText to prevent the user from exceeding maximum number of users input (characters) specified in  the counterMaxLength attribute in the TextInputLayout .
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="16dp"
        app:boxBackgroundMode="outline"
        style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
        app:boxCornerRadiusTopEnd="16dp"
        app:boxCornerRadiusTopStart="16dp"
        app:boxCornerRadiusBottomStart="16dp"
        app:boxCornerRadiusBottomEnd="16dp"
        app:counterEnabled="true"
        app:counterMaxLength="20"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:maxLength="20"
            android:hint="Enter your name" />
    </com.google.android.material.textfield.TextInputLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```
### Conclusion

TextInputLayout is a powerful layout that is easy to use and it has awesome features like floating hint animation,error labels, character counter, password visibility toggle which are not there in normal EditText.As a developer,TextInputLayout awesome features will allow you to create or design nice textfields that can be a filled text field, outlined text field or themed text field. 

### References
[Android Developer Documentation](https://developer.android.com/reference/com/google/android/material/textfield/TextInputLayout)

[Material Design](https://material.io/components/text-fields/android#filled-text-field.)