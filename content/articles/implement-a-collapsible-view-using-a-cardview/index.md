---
layout: engineering-education
status: publish
published: true 
url: /implement-a-collapsible-view-using-a-cardview/
title: Implementing a Collapsible View using a Card View in Android
description: IThis article will cover the Card View and how to style and customize it. We will implement a collapsible view that expands to reveal more information and folds when an image in a card is clicked.
author: love-otudor
date: 2021-09-29T00:00:00-03:13
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implement-a-collapsible-view-using-a-cardview/hero.png
    alt: Implementing a Collapsible View using a Card View in Android Cover Image 
---
### Introduction
In this article, you will learn about the CardView and how to style and customize it. You will implement a collapsible view that can expand to reveal more information when you click an image on the card.
 
 A CardView is useful for displaying data in similarly styled containers. It may contain content and actions about a single object.
 A CardView can display a moderate amount of data in a way that is easy to visualize. Cards are useful in presenting a large number of objects on the same page. The Card’s elevation gives a 3-dimensional look to your mobile app, thus enriching its look and feel.


### Prerequisite
Before you begin, you should have:
* Basic knowledge of android development with java.
* A Laptop.
* An Android IDE. I am using Android Studio
* Migrate your project to use AndroidX libraries. If not, here is how you can migrate your project here.
* Good spirits!


### Create the project and add the required dependencies
**Step 1:** Create a new project in android studio. Use an empty activity. Name the project Collapsing Card View.

**Step 2:** Select Java as the language and API 21 as the minimum SDK and click finish.
To use the CardView, you must add the CardView dependency. To add the CardView dependency, you need to add Google’s Maven repository to your project.

**Step 3:** Add the Google Maven repository. In your top-level build.gradle file's repositories section, add Google's Maven Repository `google()`:

```java
buildscript {
   repositories {
       google()
   
   }  
}
```

**Step 4:** To Add the material Cardview dependency, add the dependency below in your build.gradle file. To get there Navigate to Gradle Scripts then build.gradle(app):

```java
dependencies {

   implementation 'com.google.android.material:material:1.4.0'
  
}
```

You can get the latest version of the material CardView library [here](https://maven.google.com/web/index.html#com.google.android.material:material)

### Creating the Root Layout
**Step 1:** In your activity_main.xml file, delete the default hello world TextView.
 
**Step 2:** Change your root layout to a constraint layout. It should look like this:

```xml

<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
   xmlns:android="http://schemas.android.com/apk/res/android"
   xmlns:tools="http://schemas.android.com/tools"
   xmlns:app="http://schemas.android.com/apk/res-auto"
   android:layout_width="match_parent"
   android:layout_height="match_parent"
   tools:context=".MainActivity">
 

 </androidx.constraintlayout.widget.ConstraintLayout>
```

### Adding The Card View
**Step1:** Inside the constraint layout, add the CardView.
 
**Step 2:** Give the card view an Id of base_cardView.
 
**Step 3:** Constrain the card view to the top and bottom of the parent, and the start and end of the parent.


### Styling The Card View
**Step 1:** Make the card view to wrap its content height and width of 0dp. In constraint layout, this makes the view match its constraint size. In our case, The width of the CardView would be as large as the parent.
 
**Step 2:** Give the CardView a horizontal Margin of 16dp.
 
**Step 3:** Give the card view a corner radius of 5dp
 
**Step 4:** Give the card a stroke width of 2dp and a stroke color of `@color/teal_200`
 
The Card view should look this way in code:

```xml
<com.google.android.material.card.MaterialCardView
   android:id="@+id/base_cardview"
   android:layout_width="0dp"
   android:layout_height="wrap_content"
   app:cardCornerRadius="5dp"
   app:layout_constraintBottom_toBottomOf="parent"
   app:layout_constraintEnd_toEndOf="parent"
   app:layout_constraintStart_toStartOf="parent"
   app:layout_constraintTop_toTopOf="parent"
app:strokeColor="@color/teal_200"
android:layout_marginHorizontal="16dp"
   app:strokeWidth="2dp" />

```

Great Work!
 
Next, you are going to make the card view a parent layout to other views, to do this, give the card view a start and end tag.
 
It should look this way:
```xml
<com.google.android.material.card.MaterialCardView
   android:id="@+id/base_cardview"
   android:layout_width="0dp"
   android:layout_height="wrap_content"
   app:cardCornerRadius="5dp"
   app:layout_constraintBottom_toBottomOf="parent"
   app:layout_constraintEnd_toEndOf="parent"
   app:layout_constraintStart_toStartOf="parent"
   app:layout_constraintTop_toTopOf="parent"
app:strokeColor="@color/teal_200"
android:layout_marginHorizontal="16dp"
   app:strokeWidth="2dp" >
  
</com.google.android.material.card.MaterialCardView>
```

### Add Views To The Card View Layout
**Step 1:** Within the CardView, add a constraint layout. Make its width to match its parent, and height to wrap content.

You are going to add views inside this constraint layout. Your code should look like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
   xmlns:app="http://schemas.android.com/apk/res-auto"
   xmlns:tools="http://schemas.android.com/tools"
   android:layout_width="match_parent"
   android:layout_height="match_parent"
   tools:context=".MainActivity">


   <com.google.android.material.card.MaterialCardView
       android:id="@+id/base_cardview"
       android:layout_width="0dp"
       android:layout_height="wrap_content"
android:layout_marginHorizontal="16dp"
       app:cardCornerRadius="5dp"
       app:layout_constraintBottom_toBottomOf="parent"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toTopOf="parent"
app:strokeColor="@color/teal_200"
       app:strokeWidth="2dp">

       <androidx.constraintlayout.widget.ConstraintLayout
           android:layout_width="match_parent"
           android:layout_height="wrap_content">

         


       </androidx.constraintlayout.widget.ConstraintLayout>

   </com.google.android.material.card.MaterialCardView>


</androidx.constraintlayout.widget.ConstraintLayout>
```
Before you begin adding some more views here is a little tip:
 
To make use of the design mode with ease. I usually change all my wrap content parent views to match parent. This way, I could see where exactly I am positioning my element. You could try the same. But don't forget to change it back to wrap content😊.
 
**Step 2:** Within the constraint layout, add guidelines to the four sides of the view. Make each of them 16dp away from the view.
 
***Guidelines*** are helpers used in designing layouts. It is most useful if you have the same margin values for a lot of items in the same layout. One feature I find quite interesting about guidelines is that they can be a percentage of the screen.
 
Here’s how you can create a guideline:

[![How to create guidelines]({/engineering-education/implement-a-collapsible-view-using-a-cardview/create_guidelines.png})]({/engineering-education/implement-a-collapsible-view-using-a-cardview/create_guidelines.mp4} "Create Guidelines")

This is what the guidelines should look like:

```xml
<androidx.constraintlayout.widget.ConstraintLayout
   android:layout_width="match_parent"
   android:layout_height="wrap_content">

   <androidx.constraintlayout.widget.Guideline
       android:id="@+id/guideline1"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:orientation="vertical"
       app:layout_constraintGuide_begin="16dp" />

   <androidx.constraintlayout.widget.Guideline
       android:id="@+id/guideline2"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:orientation="vertical"
       app:layout_constraintGuide_end="16dp" />

   <androidx.constraintlayout.widget.Guideline
       android:id="@+id/guideline3"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:orientation="horizontal"
       app:layout_constraintGuide_begin="16dp" />

   <androidx.constraintlayout.widget.Guideline
       android:id="@+id/guideline4"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:orientation="horizontal"
       app:layout_constraintGuide_end="16dp" />
  

</androidx.constraintlayout.widget.ConstraintLayout>
```
**Step 3:** Build the UI of the collapsed card. You are going to build the layout of the collapsed card.

```xml
<ImageView
   android:id="@+id/imageView2"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"
   app:layout_constraintBottom_toTopOf="@+id/guideline4"
   app:layout_constraintStart_toStartOf="@+id/guideline1"
   app:layout_constraintTop_toTopOf="@+id/guideline3"
   app:layout_constraintVertical_bias="0.0"
   app:srcCompat="@android:drawable/ic_menu_info_details"
   app:tint="@color/teal_200" />

<TextView
   android:id="@+id/textView14"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"
   android:layout_marginStart="8dp"
   android:text="Why should you drink water?"
   android:textColor="#00255E"
   android:textSize="14sp"
   app:layout_constraintBottom_toBottomOf="@+id/imageView2"
   app:layout_constraintStart_toEndOf="@+id/imageView2"
   app:layout_constraintTop_toTopOf="@+id/imageView2"
   app:layout_constraintVertical_bias="0.5" />

<ImageView
   android:id="@+id/show"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"
   android:layout_marginEnd="4dp"
   android:padding="4dp"
   app:layout_constraintBottom_toBottomOf="@+id/textView14"
   app:layout_constraintEnd_toStartOf="@+id/guideline2"
   app:layout_constraintHorizontal_bias="1.0"
   app:layout_constraintStart_toEndOf="@+id/textView14"
   app:layout_constraintTop_toTopOf="@+id/textView14"
   app:srcCompat="@android:drawable/arrow_down_float"
   app:tint="@color/teal_200" />
   ```

   Notice how I constrain the views to the guidelines.
 
When you click the imageView with id `show`, the card view will expand, revealing more details.
 
This is what the layout would look like:

![Collapsed card](/engineering-education/implement-a-collapsible-view-using-a-cardview/collapsed_card.png)

**Step 4:** Build the UI for the expanded card view:
 
Here’s what the code looks like:

```xml
<androidx.constraintlayout.widget.ConstraintLayout
           android:layout_width="match_parent"
           android:layout_height="wrap_content">

           <androidx.constraintlayout.widget.Guideline
               android:id="@+id/guideline1"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:orientation="vertical"
               app:layout_constraintGuide_begin="16dp" />

           <androidx.constraintlayout.widget.Guideline
               android:id="@+id/guideline2"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:orientation="vertical"
               app:layout_constraintGuide_end="16dp" />

           <androidx.constraintlayout.widget.Guideline
               android:id="@+id/guideline3"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:orientation="horizontal"
               app:layout_constraintGuide_begin="16dp" />

           <androidx.constraintlayout.widget.Guideline
               android:id="@+id/guideline4"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:orientation="horizontal"
               app:layout_constraintGuide_end="16dp" />

<ImageView
   android:id="@+id/imageView2"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"
   app:layout_constraintBottom_toTopOf="@+id/guideline4"
   app:layout_constraintStart_toStartOf="@+id/guideline1"
   app:layout_constraintTop_toTopOf="@+id/guideline3"
   app:layout_constraintVertical_bias="0.0"
   app:srcCompat="@android:drawable/ic_menu_info_details"
   app:tint="@color/teal_200" />

           <TextView
               android:id="@+id/textView14"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginStart="8dp"
               android:text="Why should you drink water?"
               android:textColor="#00255E"
               android:textSize="14sp"
               app:layout_constraintBottom_toBottomOf="@+id/imageView2"
               app:layout_constraintStart_toEndOf="@+id/imageView2"
               app:layout_constraintTop_toTopOf="@+id/imageView2"
               app:layout_constraintVertical_bias="0.5" />

           <ImageView
               android:id="@+id/show"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginEnd="4dp"
               android:padding="4dp"
               app:layout_constraintBottom_toBottomOf="@+id/textView14"
               app:layout_constraintEnd_toStartOf="@+id/guideline2"
               app:layout_constraintHorizontal_bias="1.0"
               app:layout_constraintStart_toEndOf="@+id/textView14"
               app:layout_constraintTop_toTopOf="@+id/textView14"
               app:srcCompat="@android:drawable/arrow_down_float"
               app:tint="@color/teal_200" />

           <View
               android:id="@+id/view3"
               android:layout_width="0dp"
               android:layout_height="1dp"
               android:layout_marginTop="16dp"
               android:background="#CECECE"
               app:layout_constraintEnd_toStartOf="@+id/guideline2"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toBottomOf="@+id/textView14" />

           <TextView
               android:id="@+id/textView15"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginTop="16dp"
               android:text="It's no magic bullet, but the benefits of water are many.
"
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toBottomOf="@+id/view3" />

           <ImageView
               android:id="@+id/imageView9"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               app:layout_constraintBottom_toBottomOf="@+id/textView16"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toTopOf="@+id/textView16"
               app:srcCompat="@android:drawable/presence_invisible"
               app:tint="@color/teal_200" />

           <TextView
               android:id="@+id/textView16"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginStart="8dp"
               android:layout_marginTop="12dp"
               android:text="Maintain the Balance of Body Fluids."
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintStart_toEndOf="@+id/imageView9"
               app:layout_constraintTop_toBottomOf="@+id/textView15" />

           <ImageView
               android:id="@+id/imageView10"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               app:layout_constraintBottom_toBottomOf="@+id/textView17"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toTopOf="@+id/textView17"
               app:srcCompat="@android:drawable/presence_invisible"
               app:tint="@color/teal_200" />

           <TextView
               android:id="@+id/textView17"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginStart="8dp"
               android:layout_marginTop="12dp"
               android:text="Energize Muscles"
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintStart_toEndOf="@+id/imageView10"
               app:layout_constraintTop_toBottomOf="@+id/textView16" />

           <ImageView
               android:id="@+id/imageView11"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               app:layout_constraintBottom_toBottomOf="@+id/textView18"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toTopOf="@+id/textView18"
               app:srcCompat="@android:drawable/presence_invisible"
               app:tint="@color/teal_200" />

           <TextView
               android:id="@+id/textView18"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginStart="8dp"
               android:layout_marginTop="12dp"
               android:text="Keep Skin Looking Good"
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintStart_toEndOf="@+id/imageView11"
               app:layout_constraintTop_toBottomOf="@+id/textView17" />


           <TextView
               android:id="@+id/textView19"
               android:layout_width="0dp"
               android:layout_height="wrap_content"
               android:layout_marginTop="12dp"
               android:text="If you think you need to be drinking more, here are some tips to increase your fluid intake and reap the benefits of water:"
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintEnd_toStartOf="@+id/guideline2"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toBottomOf="@+id/textView18" />

           <View
               android:id="@+id/view4"
               android:layout_width="0dp"
               android:layout_height="1dp"
               android:layout_marginTop="16dp"
               android:background="#CECECE"
               app:layout_constraintEnd_toStartOf="@+id/guideline2"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toBottomOf="@+id/textView19" />

           <ImageView
               android:id="@+id/imageView12"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toTopOf="@+id/textView20"
               app:srcCompat="@android:drawable/presence_invisible"
               app:tint="@color/teal_200" />

           <TextView
               android:id="@+id/textView20"
               android:layout_width="0dp"
               android:layout_height="wrap_content"
               android:layout_marginStart="8dp"
               android:layout_marginTop="12dp"
               android:text="Have a beverage with every snack or meal, Eat more fruits and vegetables, and Keep a bottle of water with you.
"
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintBottom_toTopOf="@+id/guideline4"
               app:layout_constraintEnd_toStartOf="@+id/guideline2"
               app:layout_constraintStart_toEndOf="@+id/imageView12"
               app:layout_constraintTop_toBottomOf="@+id/view4" />
           <androidx.constraintlayout.widget.Group
               android:id="@+id/card_group"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:visibility="visible"
               app:constraint_referenced_ids="textView15,view3,imageView9,textView16,imageView10,textView17,imageView11,textView18,textView19,view4,imageView12,textView20" />


       </androidx.constraintlayout.widget.ConstraintLayout>
```

Whew! The layout should look this way when you run the project:

![Expanded card](/engineering-education/implement-a-collapsible-view-using-a-cardview/expanded_card.png)

Nice! This is what the expanded card would look like. When the card is collapsed, you would want to hide these views. Here is the qualm. Controlling the visibility of every one of these 12 views would be burdensome and repetitive. Now, this is where groups come in. With a Group, you can group all these views, and handle their visibility as though they were one view. You can set the visibility of all 12 views by just setting the visibility of the group.
 
**Step 5:** Create a group for the hidden views
 
Here is how to create groups:

[![How to create groups]({/engineering-education/implement-a-collapsible-view-using-a-cardview/create_groups.png})]({/engineering-education/implement-a-collapsible-view-using-a-cardview/create_groups.mp4} "Create Groups")


Cool right?
 
Now give the group an id `card_group`.
 
Nice! You are all set. Your entire layout code should look like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
   xmlns:app="http://schemas.android.com/apk/res-auto"
   xmlns:tools="http://schemas.android.com/tools"
   android:layout_width="match_parent"
   android:layout_height="match_parent"
   tools:context=".MainActivity">


   <com.google.android.material.card.MaterialCardView
       android:id="@+id/base_cardview"
       android:layout_width="0dp"
       android:layout_height="wrap_content"
       android:layout_marginHorizontal="16dp"
       app:cardCornerRadius="5dp"
       app:layout_constraintBottom_toBottomOf="parent"
       app:layout_constraintEnd_toEndOf="parent"
       app:layout_constraintStart_toStartOf="parent"
       app:layout_constraintTop_toTopOf="parent"
       app:strokeColor="@color/teal_200"
       app:strokeWidth="2dp">

       <androidx.constraintlayout.widget.ConstraintLayout
           android:layout_width="match_parent"
           android:layout_height="wrap_content">

           <androidx.constraintlayout.widget.Guideline
               android:id="@+id/guideline1"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:orientation="vertical"
               app:layout_constraintGuide_begin="16dp" />

           <androidx.constraintlayout.widget.Guideline
               android:id="@+id/guideline2"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:orientation="vertical"
               app:layout_constraintGuide_end="16dp" />

           <androidx.constraintlayout.widget.Guideline
               android:id="@+id/guideline3"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:orientation="horizontal"
               app:layout_constraintGuide_begin="16dp" />

           <androidx.constraintlayout.widget.Guideline
               android:id="@+id/guideline4"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:orientation="horizontal"
               app:layout_constraintGuide_end="16dp" />

           <ImageView
               android:id="@+id/imageView2"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               app:layout_constraintBottom_toTopOf="@+id/guideline4"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toTopOf="@+id/guideline3"
               app:layout_constraintVertical_bias="0.0"
               app:srcCompat="@android:drawable/ic_menu_info_details"
               app:tint="@color/teal_200" />

           <TextView
               android:id="@+id/textView14"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginStart="8dp"
               android:text="Why should you drink water?"
               android:textColor="#00255E"
               android:textSize="14sp"
               app:layout_constraintBottom_toBottomOf="@+id/imageView2"
               app:layout_constraintStart_toEndOf="@+id/imageView2"
               app:layout_constraintTop_toTopOf="@+id/imageView2"
               app:layout_constraintVertical_bias="0.5" />

           <ImageView
               android:id="@+id/show"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginEnd="4dp"
               android:padding="4dp"
               app:layout_constraintBottom_toBottomOf="@+id/textView14"
               app:layout_constraintEnd_toStartOf="@+id/guideline2"
               app:layout_constraintHorizontal_bias="1.0"
               app:layout_constraintStart_toEndOf="@+id/textView14"
               app:layout_constraintTop_toTopOf="@+id/textView14"
               app:srcCompat="@android:drawable/arrow_down_float"
               app:tint="@color/teal_200" />

           <View
               android:id="@+id/view3"
               android:layout_width="0dp"
               android:layout_height="1dp"
               android:layout_marginTop="16dp"
               android:background="#CECECE"
               app:layout_constraintEnd_toStartOf="@+id/guideline2"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toBottomOf="@+id/textView14" />

           <TextView
               android:id="@+id/textView15"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginTop="16dp"
               android:text="It's no magic bullet, but the benefits of water are many.
"
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toBottomOf="@+id/view3" />

           <ImageView
               android:id="@+id/imageView9"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               app:layout_constraintBottom_toBottomOf="@+id/textView16"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toTopOf="@+id/textView16"
               app:srcCompat="@android:drawable/presence_invisible"
               app:tint="@color/teal_200" />

           <TextView
               android:id="@+id/textView16"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginStart="8dp"
               android:layout_marginTop="12dp"
               android:text="Maintain the Balance of Body Fluids."
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintStart_toEndOf="@+id/imageView9"
               app:layout_constraintTop_toBottomOf="@+id/textView15" />

           <ImageView
               android:id="@+id/imageView10"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               app:layout_constraintBottom_toBottomOf="@+id/textView17"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toTopOf="@+id/textView17"
               app:srcCompat="@android:drawable/presence_invisible"
               app:tint="@color/teal_200" />

           <TextView
               android:id="@+id/textView17"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginStart="8dp"
               android:layout_marginTop="12dp"
               android:text="Energize Muscles"
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintStart_toEndOf="@+id/imageView10"
               app:layout_constraintTop_toBottomOf="@+id/textView16" />

           <ImageView
               android:id="@+id/imageView11"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               app:layout_constraintBottom_toBottomOf="@+id/textView18"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toTopOf="@+id/textView18"
               app:srcCompat="@android:drawable/presence_invisible"
               app:tint="@color/teal_200" />

           <TextView
               android:id="@+id/textView18"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:layout_marginStart="8dp"
               android:layout_marginTop="12dp"
               android:text="Keep Skin Looking Good"
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintStart_toEndOf="@+id/imageView11"
               app:layout_constraintTop_toBottomOf="@+id/textView17" />


           <TextView
               android:id="@+id/textView19"
               android:layout_width="0dp"
               android:layout_height="wrap_content"
               android:layout_marginTop="12dp"
               android:text="If you think you need to be drinking more, here are some tips to increase your fluid intake and reap the benefits of water:"
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintEnd_toStartOf="@+id/guideline2"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toBottomOf="@+id/textView18" />

           <View
               android:id="@+id/view4"
               android:layout_width="0dp"
               android:layout_height="1dp"
               android:layout_marginTop="16dp"
               android:background="#CECECE"
               app:layout_constraintEnd_toStartOf="@+id/guideline2"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toBottomOf="@+id/textView19" />

           <ImageView
               android:id="@+id/imageView12"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               app:layout_constraintStart_toStartOf="@+id/guideline1"
               app:layout_constraintTop_toTopOf="@+id/textView20"
               app:srcCompat="@android:drawable/presence_invisible"
               app:tint="@color/teal_200" />

           <TextView
               android:id="@+id/textView20"
               android:layout_width="0dp"
               android:layout_height="wrap_content"
               android:layout_marginStart="8dp"
               android:layout_marginTop="12dp"
               android:text="Have a beverage with every snack or meal, Eat more fruits and vegetables, and Keep a bottle of water with you.
"
               android:textColor="#838383"
               android:textSize="12sp"
               app:layout_constraintBottom_toTopOf="@+id/guideline4"
               app:layout_constraintEnd_toStartOf="@+id/guideline2"
               app:layout_constraintStart_toEndOf="@+id/imageView12"
               app:layout_constraintTop_toBottomOf="@+id/view4" />

           <androidx.constraintlayout.widget.Group
               android:id="@+id/card_group"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:visibility="gone"
               app:constraint_referenced_ids="textView15,view3,imageView9,textView16,imageView10,textView17,imageView11,textView18,textView19,view4,imageView12,textView20"
               tools:visibility="gone" />


       </androidx.constraintlayout.widget.ConstraintLayout>

   </com.google.android.material.card.MaterialCardView>


</androidx.constraintlayout.widget.ConstraintLayout>
```

You are all set. Now time for some java.


### Add OnClick Listener to the image view
Here you would Set onClick listeners to the show imageView.
 
In your Main Activity.java file, write this code:

```java
public class MainActivity extends AppCompatActivity {
   CardView cardView;
   ImageView arrow;
   Group hiddenGroup;

   @Override
   protected void onCreate(Bundle savedInstanceState) {
       super.onCreate(savedInstanceState);
       setContentView(R.layout.activity_main);
       cardView = findViewById(R.id.base_cardview);
       arrow = findViewById(R.id.show);
       hiddenGroup = findViewById(R.id.card_group);

       arrow.setOnClickListener(view -> {
           if(hiddenGroup.getVisibility() == View.VISIBLE){
               TransitionManager.beginDelayedTransition(cardView, new AutoTransition());
               hiddenGroup.setVisibility(View.GONE);
               arrow.setImageResource(android.R.drawable.arrow_down_float);
           }
           else {
               TransitionManager.beginDelayedTransition(cardView, new AutoTransition());
               hiddenGroup.setVisibility(View.VISIBLE);
               arrow.setImageResource(android.R.drawable.arrow_up_float);
           }
       });

   }
}
```

Now here is what this code does:
 
Firstly, reference the views you would be performing actions on. These views are the `base_cardView`, `show` ImageView, and the `card_group`. Remember that you do not need to reference all 12 views anymore. This is because you have grouped them into the `card_group`.
 
Next, set an onClickListener on the `show` ImageView. When this image is clicked, you would want to either show or hide the `card_group`.
 
Inside the onClickListerner, pass the CardView as the root view to run the transition on. This would make the collapsing and expanding of the card a lot nicer, and give it an animation effect.
 
Finally , check if the group’s visibility is visible. If it is, you set its visibility to gone and change the image resource of the ImageView to `arrow_down_float`. Which kind of looks like a show-more icon.
 
Else, if the group is not visible, then you would want to show it. Thus change the visibility of the group to Visible. Set the image resource of the ImageView to `arrow_up_float`, which looks like a show-less icon.
 
Nice work!
 
You are all done. Running the code, our collapsable card view should look this way:

[![Collapsing Card View]({engineering-education/implement-a-collapsible-view-using-a-cardview/expanded_card.png})]({/engineering-education/implement-a-collapsible-view-using-a-cardview/collapsable_cardview.mp4} "Collapsing Card View")

Nice right?
  
### Conclusion
The CardView enriches the look of your application's UI. The default implementation of the shadow and rounded corners is a big plus. Although the Cardview is designed to hold one child view within itself. You could add within the card view another layout to manage the child views, just like we did here.


Cheers!


### Source


 [6 Reasons to Drink Water](https://www.webmd.com/diet/features/6-reasons-to-drink-water#3)
 

