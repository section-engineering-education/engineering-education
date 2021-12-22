---
layout: engineering-education
status: publish
published: true
url: /creating-custom-expandable-fab/
title: Creating Custom Extendable and Expandable Floating Action Button in Android Using Kotlin
description: This tutorial will guide the reader through creating a custom extendable and expandable FAB in Android using kotlin. A FAB is a circular button that usually floats on the screen.
author: omondi-alex
date: 2021-11-26T00:00:00-23:15
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-custom-expandable-fab/hero.png
    alt: How to create a custom FAB in Android Hero Image
---
This tutorial will cover how to create a custom Expandable Floating Action Button (FAB) in Android. This involves using the Animation class.
<!--more-->
Animations show a change of state in the button when clicked.

### What is a Floating Action Button?
A Floating Action Button (FAB) is a circular button that usually floats on the screen and displays the primary action of an application.

Expandable Floating Actions Button is a FAB that can animate when clicked or when the user scrolls the contents on the screen.

### Table of Contents
- [What is a Floating Action Button?](#what-is-a-floating-action-button)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [Designing Custom Expandable FAB](#designing-custom-expandable-fab)
- [Creating Custom FAB Animations](#creating-custom-fab-animations)
  - [Explanation:](#explanation)
- [Initializing The Animations](#initializing-the-animations)
- [Designing Extendable Floating Action Button](#designing-extendable-floating-action-button)
- [Creating the Message Recycler Adapter](#creating-the-message-recycler-adapter)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial, the reader should:
- Have a basic understanding of [Material components](https://material.io/components/buttons-floating-action-button#anatomy).
- Be conversant with the [Kotlin](https://kotlinlang.org/) programming language and `ViewBinding`.
- Have [Android Studio](https://developer.android.com/studio/index.html) installed.

### Goals
In this tutorial, we will:
- Design a custom extendable floating action button.
- Design an expandable floating action button.
- Learn how to handle FAB clicks.

### Designing Custom Expandable FAB
After creating a new Android project, go to the `drawable` folder and import drawable icons from vector assets. These icons will be placed at the center of the FAB. To add icons, right-click on `drawable`, select `new`, then select `Vector Asset` and choose an icon from `Clip Art`.

This tutorial will choose the `add`, `call`, and `message` icons. Therefore, we are going to create a custom FAB with three buttons.

Paste the following code into the `activity_main.xml` file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

  <com.google.android.material.floatingactionbutton.FloatingActionButton
      android:id="@+id/floatingActionButtonAdd"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_marginEnd="24dp"
      android:layout_marginBottom="24dp"
      android:clickable="true"
      android:focusable="true"
      android:backgroundTint="@color/purple_700"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintEnd_toEndOf="parent"
      app:srcCompat="@drawable/ic_add" />

  <com.google.android.material.floatingactionbutton.FloatingActionButton
      android:id="@+id/floatingActionButtonCall"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_marginBottom="16dp"
      android:clickable="true"
      android:focusable="true"
      android:tint="@color/white"
      android:visibility="invisible"
      app:layout_constraintBottom_toTopOf="@+id/floatingActionButtonAdd"
      app:layout_constraintEnd_toEndOf="@+id/floatingActionButtonAdd"
      app:srcCompat="@drawable/ic_call" />

  <com.google.android.material.floatingactionbutton.FloatingActionButton
      android:id="@+id/floatingActionButtonMessage"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_marginBottom="16dp"
      android:clickable="true"
      android:focusable="true"
      android:tint="@color/white"
      android:visibility="invisible"
      app:layout_constraintBottom_toTopOf="@+id/floatingActionButtonCall"
      app:layout_constraintEnd_toEndOf="@+id/floatingActionButtonCall"
      app:srcCompat="@drawable/ic_message_white_24dp" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

Initially, the `Call` and `Message` buttons are set invisible. They will appear when the `Add` button is clicked.

### Creating Custom FAB Animations
We will now create animations that apply to the other two buttons (`Call` and `Message`) when the `Add` button is clicked.

To create animations, go to the resource manager and select Animation, then click on (+) to add `Animation Resource File`.

We will have two animation resource files for the `Add` button, one for rotating it when opening and the other when closing.

Buttons `Call` and `Message` will have two animation resource files for animating from top to bottom of the `Add` button.

1. `rotate_open_animation.xml`:
This rotates the button from 0 to 45 degrees.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true">

    <rotate
        android:fromDegrees="0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:toDegrees="45"
        android:duration="300"/>

</set>
```

2. `rotate_close_animation.xml`:
Animates the `Add` button by rotating it from 45 to 0 degrees.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true">

    <rotate
        android:fromDegrees="45"
        android:pivotX="50%"
        android:pivotY="50%"
        android:toDegrees="0"
        android:duration="300"/>

</set>
```

3. `from_bottom_animation.xml`:
This animates buttons from the bottom. Here, `Call` and `Message` buttons are translated from bottom to top.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:fillAfter="true">

    <translate
        android:duration="300"
        android:fromYDelta="300%"
        android:toYDelta="0%" />

    <scale
        android:pivotY="50%"
        android:pivotX="50%"
        android:toXScale="0.9"
        android:toYScale="0.9"/>

    <alpha
        android:fromAlpha="0"
        android:toAlpha="1"
        android:duration="800"/>

</set>
```

#### Explanation:
- `translate` tag is useful in moving buttons along the X and Y-axis.
- `scale` is used in scaling buttons along the X and/or Y-axis.
- `pivot` tag shows the center of rotation along the X and Y-axis.
- `alpha` tag represents the opacity of the animation. It is set from 0 to 1 with a duration of 800ms.

1. `to_bottom_animation.xml`:
Animates the buttons from top to bottom.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"

    android:fillAfter="true">
    <translate
        android:duration="300"
        android:fromYDelta="0%"
        android:toYDelta="300%" />

    <scale
        android:pivotY="50%"
        android:pivotX="50%"
        android:fromYScale="0.9"
        android:fromXScale="0.9"
        android:toXScale="0.9"
        android:toYScale="0.9"/>

    <alpha
        android:fromAlpha="1"
        android:toAlpha="0"
        android:duration="150"/>

</set>
```

Here is the explanation of the attributes used in animation:
- `fromXDelta` - Change in X coordinate to apply at the start of the animation.
- `toXDelta`   - Change in X coordinate to apply at the end of the animation.
- `fromYDelta` - Change in Y coordinate to apply at the start of the animation.
- `toYDelta`   - Change in Y coordinate to apply at the end of the animation.
- `fromDegrees` - The angle at which the rotation begins.
- `toDegrees` - The angle at which the rotation stops.
- `duration` - The period during which the animation plays measured in milliseconds.
- The `pivotX` and `pivotY` form the central point of the animation.

### Initializing The Animations
In the `MainActivity.kt`, add the following code to initialize the animations globally:

```kotlin
private val rotateOpenAnimation: Animation by lazy {AnimationUtils.loadAnimation(this, R.anim.rotate_open_animation)}
private val rotateCloseAnimation: Animation by lazy {AnimationUtils.loadAnimation(this, R.anim.rotate_close_animation)}
private val fromBottomAnimation: Animation by lazy {AnimationUtils.loadAnimation(this, R.anim.from_bottom_animation)}
private val toBottomAnimation: Animation by lazy {AnimationUtils.loadAnimation(this, R.anim.to_bottom_animation)}
```

Below is the complete implementation of the `MainActivty.kt` class:

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var addButtonClicked = false

    // Initializing the animations
    private val rotateOpenAnimation: Animation by lazy {AnimationUtils.loadAnimation(this, R.anim.rotate_open_animation)}
    private val rotateCloseAnimation: Animation by lazy {AnimationUtils.loadAnimation(this, R.anim.rotate_close_animation)}
    private val fromBottomAnimation: Animation by lazy {AnimationUtils.loadAnimation(this, R.anim.from_bottom_animation)}
    private val toBottomAnimation: Animation by lazy {AnimationUtils.loadAnimation(this, R.anim.to_bottom_animation)}

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.floatingActionButtonAdd.setOnClickListener {
            onAddButtonClicked()
        }
        binding.floatingActionButtonCall.setOnClickListener {
            Toast.makeText(this, "Call Button Clicked", Toast.LENGTH_SHORT).show()
        }
        binding.floatingActionButtonMessage.setOnClickListener {
            val intent = Intent(this, MessageActivity::class.java)
            startActivity(intent)
        }
    }
    private fun onAddButtonClicked() {
        setVisibility(addButtonClicked)
        setAnimation(addButtonClicked)
        buttonSetClickable()

        if (!addButtonClicked){
            addButtonClicked = true
        }else{
            addButtonClicked = false
        }
    }

    //Setting call and message buttons visible
    private fun setVisibility(buttonClicked: Boolean) {
        if (!buttonClicked){
            binding.floatingActionButtonCall.visibility = VISIBLE
            binding.floatingActionButtonMessage.visibility = VISIBLE
        }else{
            binding.floatingActionButtonCall.visibility = INVISIBLE
            binding.floatingActionButtonMessage.visibility = INVISIBLE
        }
    }

    //Setting the animation on the buttons
    private fun setAnimation(buttonClicked: Boolean) {
        if (!buttonClicked){
            binding.floatingActionButtonCall.startAnimation(fromBottomAnimation)
            binding.floatingActionButtonMessage.startAnimation(fromBottomAnimation)
            binding.floatingActionButtonAdd.startAnimation(rotateOpenAnimation)
        }else{
            binding.floatingActionButtonCall.startAnimation(toBottomAnimation)
            binding.floatingActionButtonMessage.startAnimation(toBottomAnimation)
            binding.floatingActionButtonAdd.startAnimation(rotateCloseAnimation)
        }
    }

    //Checking if the add button is clicked
    private fun buttonSetClickable() {
        if (!addButtonClicked){
            binding.floatingActionButtonCall.isClickable = true
            binding.floatingActionButtonMessage.isClickable = true
        }else{
            binding.floatingActionButtonCall.isClickable = false
            binding.floatingActionButtonMessage.isClickable = false
        }
    }
}
```

### Designing Extendable Floating Action Button
For the Extendable FAB, we are going to use a third-party library. So, in the `settings.gradle`, add the _jitpack_ library inside the `repositories`.

```gradle
maven { url 'https://jitpack.io' }
```

In the `build.gradle` project-level file, add the following dependency:

```gradle
implementation 'com.github.imtuann:FloatingActionButtonExpandable:1.1.2'
```

After syncing the project, you are now set to design the button. The library has all the functions for animating the button whenever the `RecyclerView` is scrolled.

Extendable FAB is mainly used in messaging applications to add chats like in the Google messages app. It, therefore, requires us to use a `RecyclerView`. A `RecyclerView` is used to display a list of data. It consists of the following components:

 - `RecyclerRow` - This is the View declared in your activity. It's where the list of data will be displayed.
 - `Layout Manager` - It defines how the list should organize our data. It could be horizontal, vertical, or a grid layout.
 - `Adapter` - This connects our data, usually a list, to our `RecyclerView`. It also observes changes in the list and updates the `RecyclerView`.
 - `ViewHolder` - This holds the View onto which we display the data.

We will create a recycler row item named `message_recycler_row.xml` and add the following XML code.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:cardElevation="10dp"
    android:layout_margin="8dp"
    app:cardCornerRadius="10dp">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/chatsTextView"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:padding="20dp"
            android:text="Hello!"
            android:textSize="20sp"
            android:textColor="@color/black"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</androidx.cardview.widget.CardView>
```

In the `activity_message.xml` add the following code to create the Extendable FAB button and the `RecyclerView`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MessageActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerRow"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:layout_editor_absoluteX="1dp"
        tools:listitem="@layout/message_recycler_row" />

    <com.tuann.floatingactionbuttonexpandable.FloatingActionButtonExpandable
        android:id="@+id/expandableFAB"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginBottom="24dp"
        app:fab_content="Start a Chat"
        app:fab_duration="300"
        app:fab_expanded="true"
        app:fab_icon="@drawable/ic_message_white_24dp"
        app:fab_padding="15dp"
        app:fab_padding_text_icon="20dp"
        app:fab_text_size="20sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Creating the Message Recycler Adapter
An Adapter connects our data, usually a list, to our `RecyclerView`. It also observes changes in the list and updates the `RecyclerView`. Inside the Adapter, we have a `ViewHolder` class that holds the View to display the data. 

An Adapter requires that you implement the following methods:
- `onCreateViewHolder()` - The RecyclerView invokes this method to create a `ViewHolder`.
- `onBindView.Holder()`- This method binds data on the `ViewHolder` provided as an argument.
- `getItemCount()` - Returns the number of items in the `RecyclerView`.

In the `MessageAdapter.kt` class, add the following code to create the Adapter class:

```kotlin
class MessageAdapter(private var text: List<String>): RecyclerView.Adapter<MessageAdapter.MyViewHolder>() {
    // ViewHolder class for holding the view
    inner class MyViewHolder(val binding: MessageRecyclerRowBinding): RecyclerView.ViewHolder(binding.root){

        init {
            binding.chatsTextView.setOnClickListener {
                val position: Int = adapterPosition
                Toast.makeText(binding.chatsTextView.context, "$position", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        return MyViewHolder(MessageRecyclerRowBinding.inflate(LayoutInflater.from(parent.context), parent, false))
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        holder.binding.chatsTextView.text = text[position]
    }
  
    override fun getItemCount(): Int {
        return text.size
    }
}
```

To read more about `RecyclerView`, check out [this article](https://www.section.io/engineering-education/android-recyclerviews/).

Finally, add the following code in the `MessageActivity.kt` class:

```kotlin
class MessageActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMessageBinding
    private var chatLists = mutableListOf<String>()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMessageBinding.inflate(layoutInflater)
        setContentView(binding.root)
        addToChatList()
        binding.recyclerRow.adapter = MessageAdapter(chatLists)
        setUpFloatingActionButton()

    }

    private fun setUpFloatingActionButton() {
        binding.expandableFAB.setOnClickListener {
            Toast.makeText(applicationContext, "FAB button clicked", Toast.LENGTH_SHORT).show()
        }
        // Detect a scroll and respond based on the direction
        binding.recyclerRow.addOnScrollListener(object : RecyclerView.OnScrollListener(){
            override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
                if (dy > 0){ // Scrolling down
                    binding.expandableFAB.collapse()
                }else{ // Scrolling up
                    binding.expandableFAB.expand()
                }
            }
        })
    }
    // Add data to the list
    private fun addToChatList() {
        for (i in 0..50){
            chatLists.add("Hello, Happy Coding. Let's have a chat even as we code.")
        }
    }
}
```

The class above have methods for setting a listener to the Floating Action Button. When the FAB button is clicked, it will expand and toast a text to show that the button is clicked.

The `RecyclerView` is set up to detect changes in scroll position. When scrolling, the button will expand hence the name Expandable Floating Action Button.

![Project Demo](/engineering-education/creating-custom-expandable-fab/custom-expandable-fab.gif)

### Conclusion
In this tutorial, we have learned how to create a custom _Expandable Floating Action Button_ and an _Extendable Floating Action Button_. The code provided helps in creating the FAB but also help in learning how to implement clicks and scroll listeners on the `RecyclerView`.

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
