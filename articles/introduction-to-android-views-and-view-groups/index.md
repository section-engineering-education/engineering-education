---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-android-views-and-view-groups/
title: Introduction to Android Views and Viewgroups
description: In this article we will go through creating views and viewgroups. We will also see some of the attributes associated with our views and viewgroups, where they are used and what they are used for.
author: dawe-daniel
date: 2021-01-09T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-android-views-and-view-groups/hero.png
    alt: Android Views and Viewgroups example image
---
All user’s interaction with an Android application is via the [user interface](https://www.studytonight.com/android/introduction-to-views) (UI). Knowing the fundamentals of the Android application’s user interface is essential. The UI of an Android application is made up of a collection of views and [view groups](https://www.programmersought.com/article/47124971866/). This article will go through commonly used views, view groups, and the attributes associated with them.
<!--more-->

### Prerequisites
You will need the following to go through this article:
- Have [Android Studio](https://developer.android.com/studio) installed.
- Have a basic understanding of building Android applications.

### Views
A view is a rectangular block on the screen used to create UI components. It refers to the `android.view.View ` class, which is the foundation class of all views for the GUI elements.

The attributes `android:layout_width` and `android:layout_height` is mandatory for every view and view group. They will take two types that display attributes of wrap-content (adjust height and width to the content) and match-parent (adjust height and width to the maximum size of the parent container). They can also take specific density pixel values (dp/dip).

Some commonly used views in Android applications are:
- TextView
- EditText
- Buttons
- ImageView

**TextView**
This view is for displaying text. It is used with other views. For example, when creating forms, it can be used alongside the `EditText` view to mention information required from the user.

An example of `TextView` in XML:
```Xml
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:gravity="center"
    android:text="hello world"
    android:textColor="#df3e4c"
    android:textSize="20sp"/>
```

![Output screen](/engineering-education/introduction-to-android-views-and-view-groups/screenshot-text-view.png)

We open the view with the tag with `<`and type `TextView`, to indicate that we are creating a `TextView` that will get displayed by the app. The same structure is used in the other views and viewgroups we'll later discuss.

Let's define the attributes stated above:

- `android:gravity=”center”` – This attribute defines the direction of the contents in a view. In this, our content “Hello world” will be aligned at the center.
- `android:text=” hello world”` – This attribute specifies the text to display. "hello world" will be the text displayed.
- `android:textColor=”#df3e4c”` – The color of the text is set by this attribute. `"#df3e4c"` is a color code that can be accessed from material design websites.
- `android:textSize=”20sp”` – This attribute is used to set the text size. Scale pixel (sp) is for text size scaled by the user's font performance. Density pixel (dp) is used for everything else.

**NOTE:** Android provides many different attributes that can be applied to manage various properties [Android attributes](https://www.xspdf.com/resolution/50853945.html). Therefore, the developer is not limited to the examples above only.

**EditText**
It is a widget that allows the user to enter text. The `android:inputType` attribute is not a must since it has a default value of text.

An example of `EditText` in XML:
```Xml
<EditText
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:hint="Enter your Name"
    android:textColorHint="#df3e4c"
    android:textColor="#df3e4c"
    android:inputType="text"
    android:maxLength="10"/>
```
![Output screen](/engineering-education/introduction-to-android-views-and-view-groups/screenshot-edit-text.png)

The attributes we stated above will be broken down as follows:
- `android:hint=” Enter your Name”` - It is used to display the hint when the view is empty. The user will see the hint as “Enter your Name”.
- `android:textColor=”#de4f3e” ` - It is used to set the color of the text.
- `android:textColorHint=”#de4f3e” ` - This attribute sets the hint text's color.
- `android:inputType=”text” `- It is used to specify the type of input that the view should accept.
- `android:maxLength=”10”` - Defines the maximum digit of characters that should be accepted by the view. In this instance, it only accepts 10 characters.

**Button**
It is a user interface feature that contains a text or an icon that the user can tap or click to act. It extends `TextView`.

An example of Button in XML:

```Xml  
<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="click me"
    android:backgroundTint="#df3e4c"/>
```

![Output screen](/engineering-education/introduction-to-android-views-and-view-groups/screenshot-button.png)

The attributes are defined as follows:
- `android:backgroundTint=”#de4f3e”` - It sets the background color of the button.
- `android:text=”click me”` - Is the text that will be displayed on the button.

**ImageView**
This is a widget used to display images and bitmaps in Android applications. Image files supported by Android are in three formats:

- `.png`: preferred
- `.jpg`: acceptable
- ` .gif`: discouraged

An example of `ImageView` in XML:

```Xml
<ImageView
    android:layout_width="160dp"
    android:layout_height="140dp"
    android:src="@drawable/ic_campaign"/>
```
![Output screen](/engineering-education/introduction-to-android-views-and-view-groups/screenshot-image-view.png)

The attribute above is defined as follows:

`android:src=”@drawable/ic_campaign” />` - Sets the drawable as the `ImageView` content.
A drawable resource is a general term for a graph that can be drawn on the screen and can be retrieved by adding attributes such as `android:drawable` and `android:icon` to another XML resource <[drawable resource](http://web.archive.org/web/20201119081656/https://developer.android.com/guide/topics/resources/drawable-resource.).

Android also provides other views such as Spinners, `CheckBox` and `RadioButtons` for more user input/
output screens.

#### ViewGroups
A `ViewGroup` is a view that holds [other views](https://www.xspdf.com/resolution/52346774.html.). Views use `LayoutParams` that serves to inform the parent class how to lay them out. 

For an easier understanding of viewgroups, we'll use the views we discussed to illustrate how we can align each of them in the same viewgroup. Some of the layout parameters take boolean values i.e. "true" or "false".

Some of the commonly used `Viewgroups` are:
- RelativeLayout
- LinearLayout
- ConstraintLayout
- FrameLayout

**RelativeLayout**
`RelativeLayout` displays views relatively to one another. The view position has some relation to the sibling. `RelativeLayout` substitutes many nested `LinearLayout` groups while keeping the hierarchy of the layout flat and improving performance.

An example of `RelativeLayout` in XML:

```Xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="hello world"
        android:textColor="#df3e4c"
        android:textSize="20sp"/>

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentEnd="true"
        android:hint="Enter your Name"
        android:textColorHint="#df3e4c"
        android:textColor="#df3e4c"
        android:inputType="text"
        android:maxLength="10"/>
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentEnd="true"
        android:layout_alignParentBottom="true"
        android:text="click me"
        android:backgroundTint="#df3e4c"/>
    <ImageView
        android:layout_width="160dp"
        android:layout_height="140dp"
        android:layout_alignParentBottom="true"
        android:src="@drawable/ic_campaign"/>

</RelativeLayout>
```

![Output screen](/engineering-education/introduction-to-android-views-and-view-groups/screenshot-relative-layout.png)

The attributes are defined as follows:

- `android:layout_alignParentEnd="true"` - It makes the end edge of this view match the end edge of the parent when the boolean value is true. In this case, the `EditText` view will align to the end edge of the parent.
- `android:layout_alignParentEnd="true"` - True, makes the end edge of the button view match the end edge of the parent.
- `android:layout_alignParentBottom="true"` - True, makes the bottom edge of the button view match the bottom edge of the parent.
- `android:layout_alignParentBottom="true"` - True, makes the bottom edge of the `ImageView` match the bottom edge of the parent.

**LinearLayout**
Views are arranged in a linear format either vertically or horizontally. `LinearLayout` children are stacked one by one, so no matter how large they are, a vertical list will only have one child per row and a horizontal list will only [be one row long](https://stackoverflow.com/questions/64747509/android-layout-0dp-shows-suspicious-size-error).

An example of `LinearLayout` in XML:

```Xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="hello world"
        android:textColor="#df3e4c"
        android:textSize="20sp"/>

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:hint="Enter your Name"
        android:textColorHint="#df3e4c"
        android:textColor="#df3e4c"
        android:inputType="text"
        android:maxLength="10"/>
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="click me"
        android:backgroundTint="#df3e4c"/>
    <ImageView
        android:layout_width="160dp"
        android:layout_height="140dp"
        android:src="@drawable/ic_campaign"/>

</LinearLayout>
```

![Output screen](/engineering-education/introduction-to-android-views-and-view-groups/screenshot-linear-layout.png)

The attributes above can be defined as follows:
-`android:gravity="center"`-  This controls how it positions all the views it contains in the viewgroup. In this case, the views will align at the center.
-`android:orientation="vertical"` - This determines the arrangement direction. We use "vertical" for a column" and "horizontal" for a row. In this instance, the views are aligned in a column.

**ConstraintLayout**
It allows developers to position and size widgets in a [flexible way](https://www.xspdf.com/resolution/54152766.html). One of the fundamental building blocks of layout formation in `ConstraintLayout` is [relative positioning](https://www.techtravelhub.com/guide-on-android-layouts). 

This enables you to place a given view relative to another one. A view will restrict to the horizontal and vertical axes. The general idea is to constrain a specific side of a widget to another side of some other widget.

An example of `ConstraintLayout` in XML:

```Xml
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:text="hello world"
        android:textColor="#df3e4c"
        android:textSize="20sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentEnd="true"
        android:layout_marginEnd="20dp"
        android:layout_marginRight="20dp"
        android:hint="Enter your Name"
        android:inputType="text"
        android:maxLength="10"
        android:textColor="#df3e4c"
        android:textColorHint="#df3e4c"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentEnd="true"
        android:layout_alignParentBottom="true"
        android:layout_marginStart="20dp"
        android:layout_marginLeft="20dp"
        android:backgroundTint="#df3e4c"
        android:text="click me"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ImageView
        android:layout_width="160dp"
        android:layout_height="140dp"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="20dp"
        android:src="@drawable/ic_campaign"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
![Output screen](/engineering-education/introduction-to-android-views-and-view-groups/screenshot-constraint-layout.png)

The attributes above are defined as shown below:

- `android:id="@id/textView"`- This attribute allows you to define for each view a specific resource identifier. In this case the resource identified is a `TextView`.
- `android:layout_marginTop="20dp"` - Sets the distance from top between the constraints to 20dp.
- `app:layout_constraintEnd_toEndof="parent"` - This attribute constraints the end of the `TextView` to an end of another view which in this case is the parent.
- `app:layout_constraintStart_toStartof="parent"` -  This attribute constraints the start of the `TextView` to the start of another view which in this case is the parent.
- `app:layout_constraintTop_toTopof="parent"` - This attribute constraints the top of the view to the top of another view which in this case is the parent.
- `app:layout_constraintEnd_toEndof="parent"` - This attribute constraints the end of the `TextView` to the end of another view which in this case is the parent.
- `android:id="@id/editText"` - The resource identified is an `EditText`.
- `android:layout_marginEnd="20dp"` -  Sets the distance from end between the constraints to 20dp.
- `android:layout_marginRight="20dp"` - Sets the distance from right between the constraints to 20dp.
- `app:layout_constraintBottom_toBottomof="parent"` - This attribute constraints the bottom of the `EditText` to the end of another view which in this case is the parent.
- `app:layout_constraintEnd_toEndof="parent"` - This attribute constraints the end of the `EditText` to the end of another view which in this case is the parent.
- `app:layout_constraintTop_toTopof="parent"` - This attribute constraints the top of the `EditText` to the top of another view which in this case is the parent.
- `android:layout_marginStart="20dp"` - Sets the distance from start between the constraints to 20dp.
- `android:layout_marginLeft="20dp"` - Sets the distance from left between the constraints to 20dp
- `android:layout_marginTop="20dp"` - Sets distance from top between the constraints to 20dp
- `app:layout_constraintStart_toStartof="parent"` - This attribute constraints the start of the button to the start of another view which in this case is the parent.
- `app:layout_constraintTop_toTopof="+@id/editText"` - This attribute constraints the top of the button to the top of another view which in this case is the `EditText`.
- `android:layout_marginBottom="20dp"` - Sets the bottom distance between the constraints to 20dp.
- `app:layout_constraintBottom_toBottomof="parent"` - This attribute constraints the bottom of the `ImageView` to the bottom of another view which in this case is the parent.
- `app:layout_constraintEnd_toEndof="parent"` - This attribute constraints the end of the `ImageView` to the end of another view which in this case is the parent.
- `app:layout_constraintStart_toStartof="parent"` - This attribute constraints the start of the `ImageView` to the start of another view which in this case is the parent.


**FrameLayout**
`FrameLayout` holds a single child view. It is designed to block out a region on the screen to view a single item.

```Xml
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_marginTop="20dp"
        android:text="hello world"
        android:textColor="#df3e4c"
        android:textSize="20sp" />


</FrameLayout>
```
![Output screen](/engineering-education/introduction-to-android-views-and-view-groups/screenshot-frame-layout.png)

The attributes above are defined as follows:
- `android:layout_marginTop="20dp` - Specifies extra space at the top of a view. Hence, the extra space is set to "20dp"
- `android:layout_gravity="center"` - Controls how frame layout aligns the view it contains. Inside a single column or row, the value you set influences the horizontal and vertical orientation of the child's view. In this instance, the view will be aligned at the center.

Android also provides more viewgroups such as `GridLayout` and `TableLayout` for more user input/output screens.

#### Conclusion
In this article, we've looked at creating views and viewgroups. We have also seen some of the attributes associated with our views and viewgroups, where they are used and what they are used for. This helps developers build android applications with a better user experience.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
