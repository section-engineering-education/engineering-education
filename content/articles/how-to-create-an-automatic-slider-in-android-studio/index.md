---
layout: engineering-education
status: publish
published: true
url: /how-to-create-an-automatic-slider-in-android-studio/
title: How to Create an Automatic Slider in Android Studio
description: This article explains how to implement Automatic Sliders in Android. These components provide extra space that developers can use to present information to the user.
author: joseph-chege
date: 2021-04-02T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/how-to-create-an-automatic-slider-in-android-studio/hero.jpg
    alt: Introduction to Bottom Sheets in Android
---
Sliders are found on cross-platforms such as website pages, desktop, and mobile apps. They are usually used to highlight important features on home screens.
<!--more-->
A perfect use-case is an e-commerce app. As a developer, you want to show off new products without messing with the user's interactions. 

Slides are an excellent way to display such items to the consumer.

### Goal
This tutorial will teach you how to create and implement sliders in Android Studio.

### Overview
The following principles would be used to create a Slider.
- The `PagerAdapter` to populate an `ArrayList` of slides into a `ViewPager`.
- A tabbed interface to build a list of slide presentations.
- Set a timer task to control the flow of the slides.

### Prerequisites
To follow this tuorial along, it would be helpful to have a basic understanding of Android [ViewPager](https://developer.android.com/training/animation/screen-slide), [PagerAdapters](https://developer.android.com/reference/kotlin/androidx/viewpager/widget/PagerAdapter), and [TabLayout](https://developer.android.com/reference/com/google/android/material/tabs/TabLayout).

### Getting Started
Launch Android Studio and create a new empty project. Note that I have modified the predefined parent theme. To do the same, navigate to the `res` directory → `values` → `style.xml` and adjust the style theme to the one shown below.

```xml
<resources 
<style name="Theme.AnAutomaticAndroidSlider" parent="Theme.AppCompat.Light.DarkActionBar"></style>
</resources>
```

### Putting the slider in place
Go ahead and create the `items_layout.xml` file inside the Layout directory. Two major elements make up the slide. 

They include:
- The TextView shows a caption or the tagline of a slide.
- The ImageView shows an image to the user.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        tools:ignore="ContentDescription,MissingConstraints"
        android:layout_width="match_parent"
        android:layout_height="245dp"
        android:scaleType="centerCrop"
        android:id="@+id/my_featured_image"
        android:src="@drawable/item1" />

    <ImageView
        android:layout_width="match_parent"
        android:layout_height="100dp"
        app:srcCompat="@drawable/the_slider_background"
        app:layout_constraintBottom_toBottomOf="@+id/my_featured_image"
        tools:ignore="ContentDescription"
        android:id="@+id/slider_background"/>

    <TextView
        android:id="@+id/my_caption_title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="The Caption Title"
        android:textColor="#ffffff"
        android:textSize="26sp"
        tools:layout_editor_absoluteX="91dp"
        tools:layout_editor_absoluteY="164dp"
        android:textAlignment="center"
        app:layout_constraintBottom_toBottomOf="@+id/slider_background"
        tools:ignore="MissingConstraints" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

> This [GitHub repository](https://github.com/kimkimani/An_Auto_Android_Slider) includes all of the drawable resources used in this project. Go over and check any assets and code fragments listed in this tutorial.

[RecyclerView](https://www.youtube.com/watch?v=HtwDXRWjMcU) uses a `list_item` layout. The same concept applies here. An item layout represents a single row of the list items. 

In our case, a row will represent a single view of one slide. The item layouts are reused by setting up adapter objects that will display the data sets dynamically.

### Setting a ViewPager and TabLayout
The application's main layout includes a `ViewPager` and `TabLayout`, as shown in the XML code below.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:background="@drawable/the_slider_background"
    android:layout_height="match_parent">

    <androidx.viewpager.widget.ViewPager
        android:id="@+id/my_pager"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_width="0dp"
        android:layout_height="245dp"
        app:layout_constraintStart_toStartOf="parent"/>

    <com.google.android.material.tabs.TabLayout
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:tabGravity="center"
        android:id="@+id/my_tablayout"
        app:tabBackground="@drawable/indicator_selector"
        app:tabIndicatorHeight="0dp"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toBottomOf="@+id/my_pager">
    </com.google.android.material.tabs.TabLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```

We'll populate the slider layout items into a `ViewPager`. The `ViewPager` is a layout widget that hosts several children's views. 

It also controls the slides' movement. An individual slide represents each child's view. These items will be displayed once we link up the `ViewPager` to a `PagerAdapter`.

### Setting up PagerAdapter
`ViewPager` and `TabLayout` depend on one another. `TabLayout` controls the movement between sliders. It also provides an overview of all the slides.

`ViewPager` gets its data from a `PagerAdapter`. The `PagerAdapter` stores the slides in the memory, making it lightning fast to switch between already loaded slides.

Before we implement the `PagerAdapter`, we need a model class.

### Setting up a model class
A model class is made up of a collection of data objects that we will feed into the adapter. These are the header image and the slider caption. Create a model class and name it `The_Slide_Items_Model_Class.java`. 

In this file, we will:
- Declare an integer for the hero image and a string for the slider title (variables).
- Generate the respective constructor, getters, and setters.

```java
public class The_Slide_Items_Model_Class {

    private int featured_image;
    private String the_caption_Title;

    public The_Slide_Items_Model_Class(int hero, String title) {
        this.featured_image = hero;
        this.the_caption_Title = title;
    }

    public int getFeatured_image() {
        return featured_image;
    }

    public String getThe_caption_Title() {
        return the_caption_Title;
    }

    public void setFeatured_image(int featured_image) {
        this.featured_image = featured_image;
    }

    public void setThe_caption_Title(String the_caption_Title) {
        this.the_caption_Title = the_caption_Title;
    }
}
```

### Create a custom PagerAdapter
Create a new class and name it `The_Slide_items_Pager_Adapter.java`. This class should extend `PagerAdapter`.

```java
public class The_Slide_items_Pager_Adapter extends PagerAdapter {
}
```

`PagerAdapter` controls the actual swiping between the different slides.

To implement the `PagerAdapter`, use the mouse to hover over `The_Slide_items_Pager_Adapter extends PagerAdapter`, then `right-click`, and navigate to `generate and import`.

1. A Constructor of `The_Slide_items_Pager_Adapter` with parameters `Context` and `List<The_Slide_Items_Model_Class>` and set the parameter globals using `this` keyword.

```java
public The_Slide_items_Pager_Adapter(Context Mcontext, List<The_Slide_Items_Model_Class> theSlideItemsModelClassList) {
    this.Mcontext = Mcontext;
    this.theSlideItemsModelClassList = theSlideItemsModelClassList;
}
```

2. Override methods - import the following override methods.

- `instantiateItem`
Inflates the `slider root items` layout and initialize each item in the layout by the `item id`. This sets the position of the respective `ViewGroups` by mapping the data objects to respective view items. The `instantiateItem` method will add this item list into the parent `ViewGroup`

- `getCount`
Overriding `getCount` will return the number of slides in the list. This will return the slide at each position.

- `isViewFromObject`
This method is required by the `instantiateItem` method. `instantiateItem` returns an `Object` as the `key` when the slider pager changes to another slider pager. This `key` becomes the `View` (the current displaying slider). `isViewFromObject` will check if the `View == Object` and return a boolean value. If `true`, the `View` will be displayed as the current slide.

- `destroyItem`
`PagerAdapter` saves every slide it creates in a memory. This makes it faster to switch between one slider to another. However, this can take a lot of memory, especially if you have a larger number of slides. It becomes a heavy and expensive task for the `PagerAdapter` to manage. The `destroyItem` override method solves this problem by destroying and recreating the slides as needed.

Here is the complete `The_Slide_items_Pager_Adapter` code:

```java
public class The_Slide_items_Pager_Adapter extends PagerAdapter {

    private Context Mcontext;
    private List<The_Slide_Items_Model_Class> theSlideItemsModelClassList;

    public The_Slide_items_Pager_Adapter(Context Mcontext, List<The_Slide_Items_Model_Class> theSlideItemsModelClassList) {
        this.Mcontext = Mcontext;
        this.theSlideItemsModelClassList = theSlideItemsModelClassList;
    }

    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {

        LayoutInflater inflater = (LayoutInflater) Mcontext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View sliderLayout = inflater.inflate(R.layout.the_items_layout,null);

        ImageView featured_image = sliderLayout.findViewById(R.id.my_featured_image);
        TextView caption_title = sliderLayout.findViewById(R.id.my_caption_title);

        featured_image.setImageResource(theSlideItemsModelClassList.get(position).getFeatured_image());
        caption_title.setText(theSlideItemsModelClassList.get(position).getThe_caption_Title());
        container.addView(sliderLayout);
        return sliderLayout;
    }
    
    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        container.removeView((View)object);
    }
    
    @Override
    public int getCount() {
        return theSlideItemsModelClassList.size();
    }
    
    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object o) {
        return view == o;
    }
}
```

### Hook everything together
Declare the following variables in your `MainActivity` class.

```java
private List<The_Slide_Items_Model_Class> listItems;
private ViewPager page;
private TabLayout tabLayout;
```

Create an instance of `viewPager` and `tabLayoutIndicator` inside the `onCreate` method.

```java
page = findViewById(R.id.my_pager) ;
tabLayout = findViewById(R.id.my_tablayout);
```

### Preparing the slider adapter
This consists of:
- An ArrayList of the slider items, an image, and a title describing each slide. 

Check image resources(`drawable`) in this [GitHub](https://github.com/kimkimani/An_Auto_Android_Slider/tree/master/app/src/main/res/drawable) repository.

```java
// Make a copy of the slides you'll be presenting.
listItems = new ArrayList<>() ;
listItems.add(new The_Slide_Items_Model_Class(R.drawable.item1,"Slider 1 Title"));
listItems.add(new The_Slide_Items_Model_Class(R.drawable.item2,"Slider 2 Title"));
listItems.add(new The_Slide_Items_Model_Class(R.drawable.item3,"Slider 3 Title"));
listItems.add(new The_Slide_Items_Model_Class(R.drawable.item4,"Slider 4 Title"));
listItems.add(new The_Slide_Items_Model_Class(R.drawable.item5,"Slider 5 Title"));
listItems.add(new The_Slide_Items_Model_Class(R.drawable.item6,"Slider 6 Title"));
listItems.add(new The_Slide_Items_Model_Class(R.drawable.item7,"Slider 7 Title"));
listItems.add(new The_Slide_Items_Model_Class(R.drawable.item8,"Slider 8 Title"));
listItems.add(new The_Slide_Items_Model_Class(R.drawable.item9,"Slider 9 Title"));
listItems.add(new The_Slide_Items_Model_Class(R.drawable.item10,"Slider 10 Title"));
```

- Hook the Viewpager to the `The_Slide_items_Pager_Adapter` (`PagerAdapter`) using `setAdapter`.

```java
The_Slide_items_Pager_Adapter itemsPager_adapter = new The_Slide_items_Pager_Adapter(this, listItems);
page.setAdapter(itemsPager_adapter);
```

This will populate the available list of slides into pager views.

- Hooking up a `TabLayout` to the `ViewPager` `setupWithViewPager`. You need a single method (`setupWithViewPager`) to set the `TabLayout` into the `ViewPager`. With that, you get a sliding view with a tabular indicator.

```java
tabLayout.setupWithViewPager(page,true);
```

You can now run the application to test if everything is working.

![SLIDERS](/engineering-education/how-to-create-an-automatic-slider-in-android-studio/sliders.gif)

Swiping on the screen will change the displaying slide, and tapping on the slide's tab will change the slide pages - as you'd expect.

### Setting up the timer
Create a method named `SliderTimer` that extends `TimerTask`.

```java
public class The_slide_timer extends TimerTask {
}
```

Hover over it → right-click → generate → implement methods → `run():void` and include the following code block.

```java
public class The_slide_timer extends TimerTask {
    @Override
    public void run() {

        MainActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (page.getCurrentItem()< listItems.size()-1) {
                    page.setCurrentItem(page.getCurrentItem()+1);
                }
                else
                    page.setCurrentItem(0);
            }
        });
    }
}
```

Initialize the `Timer` task and set the `delay` and `period` parameters in milliseconds within the `onCreate` method.

```java
// The_slide_timer
java.util.Timer timer = new java.util.Timer();
timer.scheduleAtFixedRate(new The_slide_timer(),2000,3000);
```

Here is the MainActivity full code.

```java
public class MainActivity extends AppCompatActivity {
    private List<The_Slide_Items_Model_Class> listItems;
    private ViewPager page;
    private TabLayout tabLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        page = findViewById(R.id.my_pager) ;
        tabLayout = findViewById(R.id.my_tablayout);

        // Make a copy of the slides you'll be presenting.
        listItems = new ArrayList<>() ;
        listItems.add(new The_Slide_Items_Model_Class(R.drawable.item1,"Slider 1 Title"));
        listItems.add(new The_Slide_Items_Model_Class(R.drawable.item2,"Slider 2 Title"));
        listItems.add(new The_Slide_Items_Model_Class(R.drawable.item3,"Slider 3 Title"));
        listItems.add(new The_Slide_Items_Model_Class(R.drawable.item4,"Slider 4 Title"));
        listItems.add(new The_Slide_Items_Model_Class(R.drawable.item5,"Slider 5 Title"));
        listItems.add(new The_Slide_Items_Model_Class(R.drawable.item6,"Slider 6 Title"));
        listItems.add(new The_Slide_Items_Model_Class(R.drawable.item7,"Slider 7 Title"));
        listItems.add(new The_Slide_Items_Model_Class(R.drawable.item8,"Slider 8 Title"));
        listItems.add(new The_Slide_Items_Model_Class(R.drawable.item9,"Slider 9 Title"));
        listItems.add(new The_Slide_Items_Model_Class(R.drawable.item10,"Slider 10 Title"));

        The_Slide_items_Pager_Adapter itemsPager_adapter = new The_Slide_items_Pager_Adapter(this, listItems);
        page.setAdapter(itemsPager_adapter);

        // The_slide_timer
        java.util.Timer timer = new java.util.Timer();
        timer.scheduleAtFixedRate(new The_slide_timer(),2000,3000);
        tabLayout.setupWithViewPager(page,true);
    }

    public class The_slide_timer extends TimerTask {
        @Override
        public void run() {

            MainActivity.this.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (page.getCurrentItem()< listItems.size()-1) {
                        page.setCurrentItem(page.getCurrentItem()+1);
                    }
                    else
                        page.setCurrentItem(0);
                }
            });
        }
    }
}
```

Run the app on your mobile phone to see if this works.

![Automatic slider timer](/engineering-education/how-to-create-an-automatic-slider-in-android-studio/automatic-slider-timer.gif)

### Conclusion
I hope this guide helped you to create and implement sliders in your app. For further reference, download or clone this project from [here](https://github.com/kimkimani/An_Auto_Android_Slider).

Happy coding!

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)
