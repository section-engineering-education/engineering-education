---
layout: engineering-education
status: publish
published: true
url: /implement-a-collapsible-view-using-a-cardview/
title: Implementing a Collapsible View Using a Card View in Android
description: This article will cover the Card View and how to style and customize it in android. We will implement a collapsible view that expands to reveal more information and folds when an image in a card is clicked.
author: love-otudor
date: 2021-10-20T00:00:00-09:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implement-a-collapsible-view-using-a-cardview/hero.png
    alt: Implementing a Collapsible View using a Card View in Android Cover Image
---
A CardView is useful for displaying data in containers. It may contain content and actions about a single object. A CardView can display a moderate amount of data in a way that is easy to visualize.
<!--more-->
Cards help present a large number of objects on the same page. The card's elevation gives a 3-dimensional look to your mobile app, thus enriching its look and feel.

In this article, you will learn about CardView and how to style and customize it. You will implement a collapsible view that can expand to reveal more information when you click an image on the card.

### Prerequisites
Before you begin, you should have:
- Basic knowledge of Android development using Java programming language.
- An Android IDE. I am using [Android Studio](https://developer.android.com/studio).
- Migrate your project to use AndroidX libraries. If not, [here](https://developer.android.com/jetpack/androidx/migrate) is how you can migrate your project.

#### Step One: Create a new Android Studio project
Create a new Android Studio project using an Empty activity template. Name the project **Collapsing Card View**. Select _Java_ as the language and _API 21_ as the minimum SDK and click _finish_.

#### Step Two: Adding the required dependencies
To use the `CardView`, you must add the CardView dependency. To add the `CardView` dependency, you need to add Google’s Maven repository to your project.

In your project-level `build.gradle` file, add Google's Maven Repository:

```gradle
buildscript {
   repositories {
       google()
   }
}
```

To Add the material CardView dependency, add the dependency below in your app level `build.gradle` file:

```gradle
dependencies {
   implementation 'com.google.android.material:material:1.4.0'
}
```

You can get the latest version of the material CardView library [here](https://maven.google.com/web/index.html#com.google.android.material:material).

#### Step Three: Creating the root layout
Change your root layout to a `constraint` layout. Inside the constraint layout, add the `CardView`.

> Note: Constrain the card view to the parent's top and bottom and the parent's start and end.

#### Step Four: Styling the card view
Give the CardView a height and width of 0dp. In constraint layout, this makes the view match its constraint size. In our case, The width of the `CardView` would be as large as the parent.

Give the CardView a horizontal Margin of 16dp, and a corner radius of 5dp. Lastly, you will make the CardView a parent layout to other views. To do this, give the card view a start and end tag.

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

Great Work!

#### Step Five: Add views to the CardView layout
Within the `CardView`, add a constraint layout. Set its width to match parent, and height to wrap content. You are going to add views inside this constraint layout.

Your code should look like this:

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

Before you begin adding some more views, here is a little tip:

> To make use of the design mode easy, change all wrap content parent views to match parent. This way, you can see the exact positioning of an element. However, do not forget to change it back to wrap content😊.

Within the constraint layout, add guidelines to the four sides of the view. Make each of them 16dp away from the view.

**Guidelines** are helpers used in designing layouts. It is most helpful if you have the same margin values for many items in the same layout. One feature I find pretty interesting about guidelines is that they can be a percentage of the screen.

Here is how you can create a guideline:

![How to create guidelines](/engineering-education/implement-a-collapsible-view-using-a-cardview/create-guidelines.gif)

This is how the guidelines code should look like:

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

#### Step Six: Designing the UI of the collapsed card
Next, we will build the UI of the collapsed card.

Add an ImageView to represent an info icon. Use a TextView for the label. Finally, a show-more icon, which would expand or collapse the card when clicked.

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

This is how the layout would look like:

![Collapsed card](/engineering-education/implement-a-collapsible-view-using-a-cardview/collapsed-card.png)

#### Step Seven: Design the UI for the expanded card view
In this step, we will add more views to the card. This view would represent what the card looks like in its expanded state.

Use a View element of height `1dp` and background `#CECECE` (or any of your choice) to achieve the straight line which divides the title text from the other collapsible views.

Constrain its top to the bottom of the TextView and give it a top margin of `16dp`. Horizontally constrain the view to the start and end guidelines and give it a width of `0dp` so it would be as wide as the card.

Beneath this view, add a TextView and some bullet points. You could use ImageViews as the bullets. Feel free to add whatever you want.

Here is what the code looks like:

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
               android:text="It's no magic bullet, but the benefits of water are many."
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

Whew! The layout should look like this when you run the project:

![Expanded card](/engineering-education/implement-a-collapsible-view-using-a-cardview/expanded-card.png)

When the card is collapsed, you would want to hide these views. Here is the qualm. Controlling the visibility of every one of these 12 views would be burdensome and repetitive.

Now, this is where groups come in. With a Group, you can group all these views and handle their visibility as one view. You can set the visibility of all 12 views by just setting the visibility of the group.

#### Step Eight: Create a group for the hidden views
Here is how to create groups:

![How to create groups](/engineering-education/implement-a-collapsible-view-using-a-cardview/create-groups.gif)

Cool, right?

Now give the group an id `card_group`.

Your entire layout code should look like this:

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

You are all set! Now time for some java.

#### Step nine: Add OnClick listener to the ImageView
In this step, we will set an `onClick` listener to the show `imageView`.

In your `MainActivity.java` file, add the following lines of code:

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

Let us debunk this code:

First, we referenced the views performing actions. These views are the `base_cardView`, `show` ImageView, and the `card_group`. Remember that you do not need to reference all 12 views anymore. This is because you have grouped them into the `card_group`.

Next, set an `onClickListener` on the `show` ImageView. When this image is clicked, you would want to either show or hide the `card_group`.

Inside the `onClickListener`, pass the `CardView` as the root view to run the transition, which would make the collapsing and expanding of the card a lot nicer and give it an animation effect.

Finally, check if the group’s visibility is visible. If it is, you set its visibility to gone and change the image resource of the ImageView to `arrow_down_float`. Which kind of looks like a show-more icon.

Else, if the group is not visible, then you would want to show it. Thus change the visibility of the group to Visible. Set the image resource of the ImageView to `arrow_up_float`, which looks like a show-less icon.

Nice work!

Let us run our app. Our collapsible CardView should look like this:

![Collapsing Card View](/engineering-education/implement-a-collapsible-view-using-a-cardview/expanded-card.png)

You can find this project's code on [Github](https://github.com/Lamouresparus/CollapsingCardView) or download the APK [here](https://drive.google.com/file/d/1-2fMOcxtCaCs6xus0DWjvQN1kwOvJ4ZA/view?usp=sharing).

### Conclusion
The CardView enriches the look of your application's UI. The default implementation of the shadow and rounded corners is a big plus. However, the CardView is designed to hold one child view within itself.

You could add another layout within the card view to manage the child views, just like we did here.

Cheers!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
