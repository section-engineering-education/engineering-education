---
layout: engineering-education
status: publish
published: true
url: /introduction-to-neumorphism-components-in-android-studio/
title: Introduction to Neumorphism in Android Studio
description: This article will introduce the reader to neumorphism in Android Studio. Neumorphism is a popular user design concept. Neumorphism allows you to implement floating UI objects. This concept is almost identical to material design.
author: edwin-wachira
date: 2021-11-20T00:00:00-08:48
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-neumorphism-components-in-android-studio/hero.jpg
    alt: Neumorphism in Android Studio Hero Image
---
Neumorphism is a design concept used to make soft widgets based on object shadows. It uses highlights and shadows to create elements that appear to be floating above the surface.
<!--more-->
In other words, the object seems to extrude from the background. Its aesthetic is made to implement actual Android components.

The following image shows a calculator app created using the neumorphic design:

![Neumorphism music player](/engineering-education/introduction-to-neumorphism-components-in-android-studio/neumorphism-music-player.png)

[Image Source](https://play.google.com/store/apps/details?id=com.ayush.musical)

Skeuomorphism elements resemble real-life objects. The following example showcases skeuomorphic elements.

![Instagram new logo design illustration](/engineering-education/introduction-to-neumorphism-components-in-android-studio/instagram-new-logo-design-illustration.jpg)

[Image Source](https://smithhousedesign.com/new-logo-instagram-marks-beginning-end-flat-design/)

Here are other examples of skeuomorphism:

![Apple example](/engineering-education/introduction-to-neumorphism-components-in-android-studio/apple-example.png)

[Image Source](https://dribbble.com/shots/12910101-Apple-not-flat)

![Telegram mail example](/engineering-education/introduction-to-neumorphism-components-in-android-studio/telegram-mail-example.png)

[Image Source](https://dribbble.com/shots/14389278-Mail-Icon)

Check this [link](https://dribbble.com/tags/skeuomorphic) for more skeuomorphic design concepts.

### Background
Neumorphism relies heavily on layers, shadows, and angles to dictate hierarchy and context while embracing minimalism. Neumorphism began from numerous concepts posted on Dribbble. One of these elements was posted by [Alexander Plyuto](https://dribbble.com/shots/8557373-Skeuomorph-Mobile-Banking-Dark-Mode).

In this guide, we will look at how to implement neumorphism designs in Android Studio. Here are some screens implemented using the Neumorphic concept.

![Neumorphism example](/engineering-education/introduction-to-neumorphism-components-in-android-studio/example2.png)

[Image Source](https://dribbble.com/shots/10000695-Neumorphism-Sweet-Mix)

![Neumorphism example](/engineering-education/introduction-to-neumorphism-components-in-android-studio/example3.png)

[Image Source](https://dribbble.com/shots/9527558-Freebie-Neumorphic-UX-UI-Elements)

### How neumorphism works
Neumorphism design structure relies on a shadowing system. This approach elevates an object above the base layer. As a result, it creates realistic and unique-looking elements.

For example, consider an object with a source of light at one corner. The object will have two layers of box shadows. One layer is darker which acts as a shadow while the other area is lighter.

Therefore, this means that if there is a light source:
- There will be a white box-shadow in the direction of the light.
- There will also be a black box-shadow in the opposite direction.

Neumorphism will show the following shadows and highlights depending on the light source.

![neumorphism-light-source](/engineering-education/introduction-to-neumorphism-components-in-android-studio/light-source.jpg)

[Image Source](https://github.com/fornewid/neumorphism#lightsource)

The following shapes can be implemented using neumorphism:

![neumorphism-shape-type](/engineering-education/introduction-to-neumorphism-components-in-android-studio/shape-type.jpg)

[Image Source](https://github.com/fornewid/neumorphism#shapetype)

### Prerequisites
To follow along with this guide, prior knowledge of Java is essential. You should also be familiar with Android Studio.

### Getting started
To implement neumorphism in Android Studio, we need to install a `neumorphism` library. 

Go ahead and start a new project. 

Then include the following library in your `app.gradle` file:

```java
implementation 'com.github.fornewid:neumorphism:0.2.1'
```

This library transforms UI components to neumorphic views in an Android app without creating customized patterns. 

### General implementation
Neumorphism allows you to implement floating UI objects. This concept is almost identical to material design. 

The main difference between the two is that neumorphic objects are extruded from the background while material design components cast a shadow while blocking the light source.

### Usage
The parent neumorphic view (element) should always be set to false (`android:clipChildren="false"`). This is important to prevent the clipping of shadows. If this solution doesn't work (depending on the view group such as `Relativelayout`), use `android:padding`.

An object should have the same color as your background. It's vital to have a matching background color to create the aesthetic framed shadows.

Let's create a few views using the neumorphic pattern. We will create a sign-in page to demonstrate how to convert views to a neumorphic effect.

Add the following color attributes in your `color.xml` file:

```xml
<resources>
    <color name="text_color">#1E4175</color>
    <color name="background_color">#ecf0f3</color>
    <color name="highlight">#ffffff</color>
    <color name="shadow_color">#d9dbde</color>
</resources>
```

Neumorphism supports `views` such as `Button`, `TextView`, `Image`, `ImageButton` and `FloatingActionButton`, as well as `ViewGroups` such as `CardView`.

To implement neumorphism in Android Studio, import the necessary widgets and define the preferred shape types such as `FLAT`, `BASIN`, and `PRESSED`.

Here is a simple example of a sign-in user interface:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:tools="http://schemas.android.com/tools"
    android:background="@color/background_color">

    <LinearLayout
        android:layout_width="match_parent"
        android:orientation="vertical"
        android:layout_height="match_parent">
    <TextView
        android:layout_width="wrap_content"
        android:text="Welcome"
        android:textStyle="bold"
        android:layout_height="wrap_content"
        android:textSize="40sp"
        android:textColor="@color/text_color"
        android:layout_marginTop="10dp"
        android:layout_gravity="center"
        android:transitionName="textview" />
    <TextView
        android:layout_width="wrap_content"
        android:text="Let's get started"
        android:layout_height="wrap_content"
        android:textSize="20sp"
        android:layout_gravity="center"
        android:textColor="@color/text_color"
        android:layout_marginStart="10dp"/>

    <soup.neumorphism.NeumorphCardView
        android:layout_width="match_parent"
        android:id="@+id/layout_email"
        android:layout_height="wrap_content"
        app:neomorph_view_type="rectangular"
        app:neomorph_shadow_type="outer"
        android:layout_above="@+id/layout_pass"
        app:neomorph_corner_radius="10dp"
        app:neomorph_elevation="6dp"
        app:neomorph_background_color="@color/background"
        app:neomorph_shadow_color="@color/shadow_color"
        app:neomorph_highlight_color="@color/highlight">

        <EditText
            android:layout_width="match_parent"
            android:gravity="center"
            android:textColor="@color/text_color"
            android:layout_height="match_parent"
            android:textColorHint="@color/text_color"
            android:padding="14dp"
            android:inputType="textEmailAddress"
            android:paddingEnd="10dp"
            android:hint=" Email"
            android:autofillHints="" />
    </soup.neumorphism.NeumorphCardView>

    <soup.neumorphism.NeumorphCardView
        android:id="@+id/layout_pass"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:neomorph_view_type="rectangular"
        app:neomorph_shadow_type="outer"
        app:neomorph_elevation="6dp"
        app:neomorph_corner_radius="10dp"
        app:neomorph_background_color="@color/background"
        app:neomorph_shadow_color="@color/shadow_color"
        app:neomorph_highlight_color="@color/highlight">

        <EditText
            android:gravity="center"
            android:padding="14dp"
            android:paddingEnd="10dp"
            android:layout_width="match_parent"
            android:id="@+id/password"
            android:layout_height="match_parent"
            android:hint="Password"
            android:inputType="textPassword"
            android:textColor="@color/text_color"
            android:autofillHints=""
            android:textColorHint="@color/text_color"
            tools:ignore="RtlSymmetry" />
    </soup.neumorphism.NeumorphCardView>

    <soup.neumorphism.NeumorphButton
        android:layout_width="200dp"
        android:textSize="16dp"
        android:layout_height="wrap_content"        
        android:layout_gravity="center"
        android:layout_marginTop="10dp"
        android:text="Sign In"
        android:textColor="@color/text_color"
        style="@style/Widget.Neumorph.Button">
    </soup.neumorphism.NeumorphButton>
</LinearLayout>
</RelativeLayout>
```

![neumorphism-login-ui](/engineering-education/introduction-to-neumorphism-components-in-android-studio/neumorphism-login-ui.jpg)

Each of the above elements can be modified. Check this [guide](https://github.com/fornewid/neumorphism#usage) to learn more about neumorphism.

In the code above, you should remember to:
- Specify your light source as `app:neumorph_lightSource="leftTop|leftBottom|rightTop|rightBottom`".
- Add shadow elevation and highlight colors.
- Predefine ViewGroup or View types (style="@style/Widget.Neumorph.Button")
- Specify the preferred shape and appearance.

The above example can be replicated to a different shape type such as `PRESSED` by specifying `app:neumorph_shapeType="pressed"`.

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/background_color">

    <LinearLayout
        android:layout_width="match_parent"
        android:orientation="vertical"
        android:layout_height="match_parent">

        <TextView
            android:layout_width="wrap_content"
            android:text="Welcome"
            android:textStyle="bold"
            android:layout_height="wrap_content"
            android:textSize="40sp"
            android:textColor="@color/text_color"
            android:layout_marginTop="10dp"
            android:layout_gravity="center" />
        <TextView
            android:layout_width="wrap_content"
            android:text="Let's get started"
            android:layout_height="wrap_content"
            android:textSize="20sp"
            android:layout_gravity="center"
            android:textColor="@color/text_color"
            android:layout_marginStart="10dp"/>

        <soup.neumorphism.NeumorphCardView
            android:layout_width="match_parent"
            android:layout_height="80dp"
            android:layout_marginTop="10dp"
            android:layout_marginStart="10dp"
            android:layout_marginEnd="10dp"
            style="@style/Widget.Neumorph.CardView"
            app:neumorph_shapeType="pressed">

            <EditText
                android:gravity="center"
                android:textColor="@color/text_color"
                android:hint=" Email"
                android:inputType="textEmailAddress"
                android:layout_width="match_parent"
                android:paddingEnd="10dp"
                android:layout_height="match_parent"
                android:padding="14dp"
                android:textColorHint="@color/text_color"
                android:autofillHints="" />
        </soup.neumorphism.NeumorphCardView>

        <soup.neumorphism.NeumorphCardView
            android:layout_width="match_parent"
            android:layout_height="80dp"
            android:layout_marginTop="10dp"
            android:layout_marginStart="10dp"
            android:layout_marginEnd="10dp"
            style="@style/Widget.Neumorph.CardView"
            app:neumorph_shapeType="pressed">

            <EditText
                android:textColor="@color/text_color"
                android:inputType="textPassword"
                android:gravity="center"
                android:id="@+id/password"
                android:padding="14dp"
                android:layout_width="match_parent"
                android:paddingEnd="10dp"
                android:layout_height="match_parent"
                android:hint="Password"
                android:autofillHints=""
                android:textColorHint="@color/text_color"
                tools:ignore="RtlSymmetry" />
        </soup.neumorphism.NeumorphCardView>

        <soup.neumorphism.NeumorphButton
            android:layout_marginTop="10dp"
            android:layout_width="200dp"
            android:layout_gravity="center"
            android:layout_height="wrap_content"
            android:textSize="16dp"
            android:text="Sign In"
            android:textColor="@color/text_color"
            style="@style/Widget.Neumorph.Button">
        </soup.neumorphism.NeumorphButton>
    </LinearLayout>
</RelativeLayout>
```

![neumorphism-pressed-login-ui](/engineering-education/introduction-to-neumorphism-components-in-android-studio/neumorphism-pressed-login-ui.jpg)

### Final notes
Neumorphism is not a very versatile design. At times it is not clear, especially when using buttons. This is because the change of state is not visible enough. This poses a challenge to people with visual impairments or mobile phones with low-quality screens. One of the best use cases of neumorphism is when using cards.

Check out the following [modern dashboard design](https://github.com/Wachira48/NeumorphismAndroidUI/blob/master/app/src/main/res/layout/activity_dashboard_u_i.xml) implemented using Neumorphism.

![neumorphism-dashboard-ui-design](/engineering-education/introduction-to-neumorphism-components-in-android-studio/neumorphism-dashboard-ui-design.jpg)

You can access the complete code from this [GitHub repository](https://github.com/Wachira48/NeumorphismAndroidUI).

The best way to use Neumorphism is to interact with different design elements to get a feel for what works and what doesn't. 

Neumorphism can be applied well in:
- Single-page apps and small projects.
- Where user interaction is pretty straightforward.

### Further reading
- [Weather forecast app](https://play.google.com/store/apps/details?id=com.barcelonacodeschool.neumorphismweather)
- [Todo tasks and schedule](https://play.google.com/store/apps/details?id=com.flutter.bananavolt.neumorphism.neo.todo)
- [Neumorphism calculator](https://play.google.com/store/apps/details?id=dev.littleforest.calculator_app)
- [Neumorphic calculator](https://play.google.com/store/apps/details?id=dev.luhluh.neucalcu)
- [Music Player](https://play.google.com/store/apps/details?id=com.ayush.musical)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)