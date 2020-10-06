---
layout: engineering-education
status: publish
published: true
url: /engineering-education/kotlin-extensions/
title: Kotlin Extensions
description: This article will show a developer how to use Kotlin extensions, understanding when and how to use them.
author: linus-muema
date: 2020-10-01T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/kotlin-extensions/hero.jpg
    alt: kotlin extensions image
---
When Kotlin was introduced into Android, it came along with new features. One of the features was Kotlin extensions. Extensions solved a large problem that developers faced: code redundancy. It is not a good practice to have code repeating itself. On a larger scale, this would lead to slower performance. At which point the code can become dirty and unscalable.
<!--more-->

This article will go over how to use Kotlin extensions. It will help a developer understand how and when to use them.

The entire code for this tutorial can be found on [Github](https://github.com/LinusMuema/kotlin/tree/extensions). A basic understanding of Kotlin & Android will also be needed.

### How to use extensions in Kotlin
Kotlin extensions allow you to extend a specific class. You do this without inheriting or changing the class itself. This means that you can add new functionality to a class without changing the class.

Take this case for instance. You have 10 `ImageView` classes that need to have images from a URL. We could assume that you would use [Glide](https://bumptech.github.io/glide/) or any other library. The most common way would be to write the code for each one of the images.

```Kotlin
Glide.with(context).load(url).into(imageView)
```

This results in 10 different lines of code. A good solution would be to create an object with a method to load the image. That method receives the `url`, `context`, and `imageView` then loads the URL to the image.

 ```Kotlin
 object ImageLoader {

   fun load(url: String, view: ImageView, context: Context){
     Glide.with(context).load(url).into(view)
   }

 }


//In your activity
 ImageLoader.load(url, imageView, this)
 ```

But again, this code is not the best option. The code is still not as clean as it could be.

This is where extension functions come in handy. We can create a function that extends from the `ImageView` class to load our image.

```Kotlin
fun ImageView.loadUrl(url: String){
    Glide.with(this.context).load(url).into(this)
}

//In your activity
imageView.loadUrl(url)

```

From this, we can get the `context` and `target`(view) from the extended class. This code is much cleaner and easier to read than the object. You can also pass in the `int` id's of resources from your application.

```Kotlin
fun ImageView.loadDrawable(id: Int) {
    Glide.with(this.context).asDrawable().load(id).into(this)
}

//In your activity
imageView.loadDrawable(R.drawable.ic_android)
```

The xml for the two images are shown below:

```xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="10dp">

    <androidx.appcompat.widget.AppCompatImageView
        android:id="@+id/url_image"
        android:layout_width="0dp"
        android:layout_height="100dp"
        android:layout_margin="10dp"
        android:layout_weight="1" />

    <androidx.appcompat.widget.AppCompatImageView
        android:id="@+id/drawable_image"
        android:layout_width="0dp"
        android:layout_height="100dp"
        android:layout_margin="10dp"
        android:layout_weight="1" />

</LinearLayout>
```

With that, you get only one line of code that can be reused. This also improves performance by creating only one function to do all the work. We can also extend other view classes like `TextView`. We can use it to make changes to a specific TextView.

```Kotlin
private val chars = ('a'..'Z') + ('A'..'Z') + ('0'..'9')
private fun random() = List(5) { chars.random() }.joinToString("")

fun TextView.randomText(){
    this.text = random()
}
```

In the code above, we first created a string of characters from A-Z in both cases. Then we also concatenate the numbers from 0 to 9. This is done using the range operator in Kotlin. You can read more about the operator in the [official documentation](https://kotlinlang.org/docs/reference/ranges.html). This reduces the lines of code we would have written if we used the loop structures.

We then create a list with 5 items. Then get random characters from the string. Use the `joinToString` function to create a new string of 5 characters. None of them are meant to have any semantic meaning. We are using it to populate the TextView. The extension function `randomText` adds the random string to our TextView.

```xml
<!-- activity_main.xml -->

<com.google.android.material.textview.MaterialTextView
    android:id="@+id/random"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="center" />
```

```kotlin
random.randomText()
```

We can also use it to make it easier to perform specific actions in activities and fragments. Any component that has access to the context can show `Toast`. `Snackbars` are also a common feature to display messages and short pieces of information. To create the extension classes for them below:

```kotlinlang
fun Context.showToast(){
    Toast.makeText(this, "Random characters: ${random()}", Toast.LENGTH_SHORT).show()
}

fun showSnackbar(view: View){
    Snackbar.make(view,"Random characters: ${random()}", Snackbar.LENGTH_LONG).show()
}
```

We created an extension function for the `Context` class. As you can see, the Toast line is long and could get messy if repeated multiple times in an activity. The extension function can be used to clean our code. The `showSnackbar` function however needs the parent view to show in the appropriate activity. Similar to Toast, it is long and can easily make the code unreadable.

To show them, I have created two buttons:

```xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="10dp">

    <Button
        android:id="@+id/toast"
        style="@style/Widget.MaterialComponents.Button.OutlinedButton"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:layout_weight="1"
        android:text="Toast"
        android:textAllCaps="false" />

    <Button
        android:id="@+id/snackbar"
        style="@style/Widget.MaterialComponents.Button.OutlinedButton"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:layout_weight="1"
        android:text="Snackbar"
        android:textAllCaps="false" />

</LinearLayout>
```

Then we set the `OnClickListeners` in the activity file and show the specific items.

```kotlin
toast.setOnClickListener { showToast() }
snackbar.setOnClickListener { showSnackbar(parent_view) }
```

### Conclusion
As you can see from the various examples above, Kotlin extensions make it easier to work with different classes. They help us to write cleaner and better code. Organized code allows us to be able to change various parts, for example, move from `Glide` to `Picasso`. We only need to change the nature of the function and everything in the code changes accordingly 😎.  It also ensures scalability. You can go ahead and try them out with other classes like `String`, `Button` and even `Fragment` classes.

Feel free to raise any PR on GitHub or issue. The sample apk for this can be found [here](https://drive.google.com/file/d/1kyY_hm-SSqrYbIqEWJlccRVBobIw_5dv/view?usp=sharing)
