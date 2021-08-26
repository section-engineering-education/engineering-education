---
layout: engineering-education
status: publish
published: true
url: /how-is-textinputlayout-different-from-edittext/
title: Replacing EditTexts with TextInputLayouts in Android
description: This tutorial will take the reader through the process of replacing EditTexts with TextInputLayouts in Android. TextInputLayout have more and better features compared to the normal EditText and is a better fit for most use cases.
author: washington-lokala
date: 2021-08-26T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-is-textinputlayout-different-from-edittext/hero.jpg
    alt: Replacing EditTexts with TextInputLayouts in Android image
---
When working with EditText in Android applications, developers may have found it tricky to customize. To address this problem, developers came up with `TextInputLayout` that has more and better features, when compared to the normal `EditText`. In this tutorial, we will discuss `TextInputLayout` and focus on how it differs from `EditText`.
<!--more-->
### Prerequisites
To follow through this tutorial, the reader should:
- Have [Android Studio](https://developer.android.com/studio/index.html) installed.
- Have a good understanding of `XML`.
- Be familiar with Android Studio.

### Goal
By the end of this tutorial, the reader should:
- Have an overview of what `TextInputLayout` is.
- Know the difference between `TextInputLayout` and `EditText`.
- Be able to create and work with different text fields.

### What is TextInputLayout?
TextInputLayout is a view container that is used to add more features to an EditText. It acts as a wrapper for EditText and has some features like:
- Floating hint.
- Animation that can be disabled or enabled.
- Error labels that display error messages when an error occurs.
- Character counter that displays the number of characters that the user enters.
- Password visibility toggle.
- It also extend LinearLayout.

In a nutshell, TextInputLayout is an improvement of the existing EditText.

### How TextInputLayout is different from EditText
The main difference between a TextInputLayout and an EditText is that TextInputLayout extends LinearLayout and it must contain TextInputEditText which extends EditText.

This is so because TextInputEditText works when enclosed in a TextInputLayout. If you substitute TextInputEditText with an EditText, it works but you will get a warning. 

This is because TextInputEditText provides accessibility support for the text field and allows TextInputLayout to have a greater control over the visual aspects of the input text.

### Text field
A text field is a standard entry widget (single line) that when a clicked, a cursor is placed on it and a keyboard pops up allowing the user to type text into the field. To add a text field to your layout we use EditText element.

#### Using text field
To use text field in your app, first, add the new material components dependency.

### Filled text field
According to the official documentation, filled text field has more visual emphasis than outlined text field hence making them stand out when surrounded by other content and components.

It has two height variants, that is, it consist of standard and dense text fields. Filled text field is the default styles if the style is not set.

### Outlined text field
In an outlined text field, we apply styles on the TextInputLayout. As a result we get the outlined look text field.

Like the filled text field, outlined text field has two height variants. We have attributes that we can use to set the outlined look (like corner-radius outline and stroke color outline) of a text field.

### Theming text field
In theming, we use a material theme in text fields. You can customize text field in terms of color, topography, and shape.

Like in FilledTextField and OutlinedTextField, theming text field has two height variants, that is, it consists of standard and dense text fields.

### Adding TextInputLayout in an Android app
At this point, we are going to create a new project to practically learn how to work with TextInputLayout in an Android application. We will be using a single activity project and we will be working with `activity_main.xml` file.

### Step 1: Creating a project
First you have to open a new project in your Android Studio. Then open your app level `build.gradle` file, add material dependency, and click `sync now`.

### Step 2: Adding material dependency

```gradle 
// Material dependency 
implementation 'com.google.android.material:material:1.4.0'
``` 

### Step 3: Adding 'TextInputLayout' to your 'activity_main' file
Delete the default `TextView`, add TextInputLayout as a child layout inside the `ConstraintLayout`, and align it as shown below.

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
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">
    </com.google.android.material.textfield.TextInputLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Adding TextInputEditText into TextInputLayout
Inside TextInputLayout, create TextInputEditText - where users can enter and edit the data.

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
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">
        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>
    </com.google.android.material.textfield.TextInputLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 5: Adding hint attribute into TextInputEditText
Add hint attribute `android:hint="Enter your name"` to your TextInputEditText as shown below.

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
Since we have a FilledTextField, we can add boxBackgroundMode attribute `app:boxBackgroundMode="outline"` to our TextInputLayout and it will have a box outline appearance.

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

### Step 7: Styling FilledTextField (Changing FilledTextField to OutlinedTextField)
You can style your FilledTextField to change box outline appearance to OutlinedTextField using `style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"`.

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

### Step 8: Adding boxCornerRadius attributes into TextInputLayout (This is optional)
You can also add boxCornerRadius attributes to your TextInputLayout to change the corner radius of the box outline.

```xml
<com.google.android.material.textfield.TextInputLayout
app:boxCornerRadiusTopEnd="16dp"
app:boxCornerRadiusTopStart="16dp"
app:boxCornerRadiusBottomStart="16dp"
app:boxCornerRadiusBottomEnd="16dp" />
```

The above are the available boxCornerRadius attributes.

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

### Step 9: Adding HelperText into TextInputLayout (This is optional)
Helper text provides additional information about a field's input, such as how it will be utilized.

You can enable or disable helper-text using the attribute `app:helperText="This is an helper-text"`.

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
        app:helperText="This is an helper text"
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

### Step 10: Adding text counter into TextInputLayout and maximum length into TextInputEditText (This is optional)
You can add a counter by enabling it, using the attribute `app:counterEnabled="true"` and setting the maximum length of the user input using counterMaxLength attribute `app:counterMaxLength="20"`.

MaxLength attribute `android:maxLength="20"` is added to prevent the user from exceeding maximum number of input (characters) specified in the counterMaxLength value.

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
TextInputLayout is a powerful layout that is easy to use and has awesome features like floating hint animation, error labels, character counter, password visibility toggle that are not available in normal EditTexts. 

As a developer, TextInputLayout features allow you to create or design nice TextFields that can either be a filled text field, outlined text field or themed text field.

Happy coding!

### References
- [Android Developer Documentation](https://developer.android.com/reference/com/google/android/material/textfield/TextInputLayout)
- [Material Design](https://material.io/components/text-fields/android#filled-text-field.)

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
