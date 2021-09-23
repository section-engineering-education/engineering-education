---
layout: engineering-education
status: publish
published: true
url: /implementing-a-splash-screen-and-introduction-sliders-in-android/
title: Implementing a Splash screen and Introduction Sliders in Android
description: This article will illustrate how to add a splash screen and introduction sliders in an Android application.
author: briana-nzivu
date: 2021-02-15T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-a-splash-screen-and-introduction-sliders-in-android/hero.jpg
    alt: Splash screen and Introduction Sliders in Android example image
---
A splash screen is an introduction screen in an application once it is launched. Splash screens are vital since they are the first interaction a user has with an application. Most splash screens either contain a company's logo, an animation, an image, or many other features.
<!--more-->
### Introduction
Splash screens are essential since it allows for the adequate time needed for data to be fetched and also identifies an application. Introduction sliders in Android applications give instructions or display features offered by an application. Introduction sliders come in handy, especially in applications that are quite complex and have many functionalities.

### Uses of a Splash screen and introduction slides
- A splash screen gives adequate time for data to be fetched.
- Introduction sliders are used to illustrate the functions of an application.

### Useful terminology
- Splash screen - This refers to an introduction screen in an application once it has been launched.
- Introduction sliders - A 'slideshow' in Android applications that gives instructions or display features offered by an application.
- View pager - A class in Android applications that permit a user to flip left or right to view data in an application. 
- Pager Adapter - This refers to a base class providing the adapter to populate pages inside of a `ViewPager`.

### Prerequisites 
- Make sure you have [Android](https://developer.android.com/studio) Studio installed.
- The reader should have a basic level understanding of Java and XML.
- The reader should have a basic understanding of building Android applications.

### A) Splash screen
As described earlier, a splash screen is an introduction screen in an application once it is launched.

There are various ways of creating a splash screen:
1. Using the Launcher Theme. (The best)
2. Using a Launcher Theme with a Splash activity. (The okay-ish)
3. Using Timers. (The bad)
4. Using Smart Timers. (The ugly)

In this section, we will create a splash screen for our application using the launcher theme.

### Step 1 – Create a new Android Studio Project
Open Android Studio and select an Empty Activity. We shall name our project **SplashnSlides**. Click *Finish* and wait for the project to build.

![Creating an Android Studio project](/engineering-education/implementing-a-splash-screen-and-introduction-sliders-in-android/new.jpg)

### Step 2 – Designing the Splash screen
For this project, we will use an image as our splash screen. Alternatively, one can decide to import a [vector](https://blog.mindorks.com/using-svg-vector-drawables-in-android) asset or use [clipart](https://developer.android.com/studio/write/image-asset-studio). 

First, create a layout resource file. Right-click the drawable folder under the res directory, click New - > Drawable Resource File. 

We shall name our file **splash_image.xml.**

Click *ok.*

This file will set our image as a drawable, which will act as our splash screen.

Add the following code in the splash_image.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/splash" android:gravity="center"/>
</layer-list>
```
**Note: We are using the `<layer-list>` tag in order to specify the different layers one wants to have in their splash drawable.**

### Step 3 – Update themes.xml
In our **themes.xml** in the *themes* directory, we will add a style for our splash screen. In this style, we will set the `windowbackground` to be our drawable and the status bar color to be the same as our drawable's background color.

Add the following code in your themes.xml.

```xml
<style name="splashScreen" parent="Theme.MaterialComponents.Light.NoActionBar">
    <item name="android:windowBackground">@drawable/splash</item>
    <item name="android:statusBarColor" tools:ignore="NewApi">@color/colorPrimary</item>
</style>
```

### Step 4 - Update the Android Manifest
Open the AndroidManifest.xml and update the theme under the `<application>` tag to the style we have created in our themes.xml.

```bash
android:theme="@style/splashScreen">
```

### Step 4 – Update MainActivity.java
Finally, we will set the main theme in our **theme.xml** file to run before our MainActivity. In our `onCreate` method, add the following line of code:

```java
setTheme(R.style.Theme_SplashnSlides);
```

**Note: This should be done before the setContentView statement.**

That is it. Simple right?

Let us run the app. We have a splash screen. Let us now work on getting introduction sliders.

![Spash screen](/engineering-education/implementing-a-splash-screen-and-introduction-sliders-in-android/splash.jpg)

### B) Introduction Sliders
Introduction sliders in Android applications are customarily used to give instructions or display features offered by an application. In this section, we shall implement introduction sliders in our application.

### Step 1 – Design the UI for our intro sliders
In our MainActivity layout resource file, we will add a `ViewPager` that allows the user to flip through the different sliders. We will also add a `linear layout` that will contain the dots showing the different slides, and finally, two buttons used to access the next or previous slide.

Add the following code in the activity_main.xml file.
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <androidx.viewpager.widget.ViewPager
        android:id="@+id/view_pager"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
    <LinearLayout
        android:id="@+id/layoutDots"
        android:layout_width="match_parent"
        android:layout_height="30dp"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="22dp"
        android:gravity="center"
        android:orientation="horizontal">
    </LinearLayout>
    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:alpha=".5"
        android:layout_above="@id/layoutDots"
        android:background="@android:color/white" />
    <Button
        android:id="@+id/btn_next"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_alignParentRight="true"
        android:background="@null"
        android:text="NEXT"
        android:textColor="@android:color/white" />
    <Button
        android:id="@+id/btn_skip"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_alignParentLeft="true"
        android:background="@null"
        android:text="SKIP"
        android:textColor="@android:color/white" />
</RelativeLayout>
```
Next, we will create layout resource files for our sliders. Right-click the layout folder under the res directory. Select new - > Layout Resource File, name the file **slider_1.xml** and select ok.

For the UI layout of the slider, import a drawable, and set it as a background. 

Repeat the same process till we get three sliders in total.

This is the code in our slider layout resource files.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/slider_1">
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 2 – Create an Intromanager class
Create a new Java class and name it **Intomanager.** This class will use the `SharedPreferences` class, which keeps the preference name and a Boolean state 'true' displaying the introduction sliders if the app is launched for the first time.

Add the following code in the Intromanager.java

```java
public class Intromanager {
    SharedPreferences pref;
    SharedPreferences.Editor editor;
    Context context;
    public Intromanager(Context context)
    {
        this.context=context;
        pref=context.getSharedPreferences("first",0);
        editor = pref.edit();
    }
    public void setFirst(boolean isFirst)
    {
        editor.putBoolean("check",isFirst);
        editor.commit();
    }
    public boolean Check()
    {
        return pref.getBoolean("check",true);
    }
}
```
### Step 3 – Adding functionality to our intro sliders
In our MainActivity, we will add lines of code to perform the following tasks:
- Import our `Intromanager` class, which will check if an application is launched for the first time.
- Adding functionality to the navigating buttons (previous and next).
- Creating an `addBottomDots` method that sets functionality to the dots for our introduction sliders.
- Creating the `getItem` method in which we will specify some functions for each slide.
- Extending a `PagerAdapter` class that populates pages inside of a `ViewPager`.

Add the following code in MainActivity.java;
```java
public class MainActivity extends AppCompatActivity {

    private ViewPager viewPager;
    private Intromanager intromanager;
    private ViewPagerAdapter viewPagerAdapter;
    private TextView[] dots;
    Button next,skip;
    private LinearLayout dotsLayout;
    private int[] layouts;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setTheme(R.style.Theme_SplashnSlides);
        setContentView(R.layout.activity_main);

    // Importing the intromanager class, which will check if this is the first time the application has been launched.
        intromanager = new Intromanager(this);
        if(!intromanager.Check())
        {
            intromanager.setFirst(false);
            Intent i = new Intent(MainActivity.this,Home.class);
            startActivity(i);
            finish();
        }
        if(Build.VERSION.SDK_INT>=21)
        {
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE|View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
        }
        setContentView(R.layout.activity_main);

    //Objects
        viewPager = (ViewPager)findViewById(R.id.view_pager);
        dotsLayout=(LinearLayout)findViewById(R.id.layoutDots);
        skip=(Button)findViewById(R.id.btn_skip);
        next = (Button)findViewById(R.id.btn_next);
        layouts = new int[]{R.layout.slider_1,R.layout.slider_2,R.layout.slider_3};
        addBottomDots(0);
        changeStatusBarColor();
        viewPagerAdapter = new ViewPagerAdapter();
        viewPager.setAdapter(viewPagerAdapter);
        viewPager.addOnPageChangeListener(viewListener);

    //For the next and previous buttons
        skip.setOnClickListener(view -> {
            Intent i = new Intent(MainActivity.this,Home.class);
            startActivity(i);
            finish();
        });

        next.setOnClickListener(view -> {
            int current = getItem(+1);
            if(current<layouts.length)
            {
                viewPager.setCurrentItem(current);
            }
            else
            {
                Intent i = new Intent(MainActivity.this,Home.class);
                startActivity(i);
                finish();
            }
        });

    }

    //Giving the dots functionality
    private void addBottomDots(int position)
    {

        dots = new TextView[layouts.length];
        int[] colorActive = getResources().getIntArray(R.array.dot_active);
        int[] colorInactive = getResources().getIntArray(R.array.dot_inactive);
        dotsLayout.removeAllViews();
        for(int i=0; i<dots.length; i++)
        {
            dots[i]=new TextView(this);
            dots[i].setText(Html.fromHtml("&#8226;"));
            dots[i].setTextSize(35);
            dots[i].setTextColor(colorInactive[position]);
            dotsLayout.addView(dots[i]);
        }
        if(dots.length>0)
            dots[position].setTextColor(colorActive[position]);
    }

    private int getItem(int i)
    {
        return viewPager.getCurrentItem() + i;
    }
    ViewPager.OnPageChangeListener viewListener = new ViewPager.OnPageChangeListener()
    {

        @Override
        public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

        }

        @Override
        public void onPageSelected(int position) {

            addBottomDots(position);
            if(position==layouts.length-1)
            {
                next.setText("PROCEED");
                skip.setVisibility(View.GONE);
            }
            else
            {
                next.setText("NEXT");
                skip.setVisibility(View.VISIBLE);
            }
        }

        @Override
        public void onPageScrollStateChanged(int state) {

        }
    };

    private void changeStatusBarColor()
    {
        if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.LOLLIPOP)
        {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.TRANSPARENT);
        }
    }
    //PagerAdapter class which will inflate our sliders in our ViewPager
    public class ViewPagerAdapter extends PagerAdapter
    {
        private LayoutInflater layoutInflater;

        @Override
        public Object instantiateItem(ViewGroup myContainer, int mPosition) {
            layoutInflater = (LayoutInflater)getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View v = layoutInflater.inflate(layouts[mPosition],myContainer,false);
            myContainer.addView(v);
            return v;
        }

        @Override
        public int getCount() {
            return layouts.length;
        }

        @Override
        public boolean isViewFromObject(View mView, Object mObject) {
            return mView==mObject;
        }

        @Override
        public void destroyItem(ViewGroup mContainer, int mPosition, Object mObject) {
            View v =(View)mObject;
            mContainer.removeView(v);
        }
    }
```

**Note: One can implement the methods required by clicking Alt+Enter and selecting implement methods.**

That is it! Let us run our app.

![Introduction sliders](/engineering-education/implementing-a-splash-screen-and-introduction-sliders-in-android/intro.gif)

### To wrap up
We have learned about splash screens, we had an introduction to sliders, and how we implement them in an Android application. We have learned the uses and the importance of both. Read more and practice how to implement a splash screen and introduction sliders in mobile applications. 

Remember, practice makes perfect.

One can access the tutorial's code on [GitHub](https://github.com/BrianaNzivu/EngineeringEducation/tree/main/SplashnSlides). You can also download the sample APK and files used in the application on [Google Drive](https://drive.google.com/drive/folders/17N1m7tkaDeuPWkKrrlrdzCj827BHBpwf?usp=sharing).

For any query or clarification, do not hesitate to raise an issue in this [repository](https://github.com/BrianaNzivu/EngineeringEducation/tree/main/SplashnSlides).

Till next time! Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
