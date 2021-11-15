---
layout: engineering-education
status: publish
published: true
url: /multilanguage-translator-using-streamlit-and-gettext/
title: Introduction to Neumorphism Components in Android Studio
description: This article will help the reader understand how to develop a translation application using Streamlit and Gettext. We will create a simple iOS app that can translate sentences.
author: johnnie-mbugua
date: 2021-11-14T00:00:00-12:48
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/multilanguage-translator-using-streamlit-and-gettext/hero.jpg
    alt: Multilanguage Translator using Streamlit and Gettext Hero Image
---
Translation is the process of changing text from one language to another. This process is useful when you are communicating with people who speak different languages. 
<!--more-->




Neumorphism is a design concept used to make soft widgets based on object shadows. It uses highlights and shadows to create elements that appear to be floating above the surface. 

In other words, the object seems to extrude from the background. Its aesthetic is made to implement actual Android components.

Skeuomorphism elements resemble real-life objects. The following example showcases skeuomorphic elements.

![instagram-new-logo-design-illustration](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/instagram-new-logo-design-illustration.jpg)

[***Image Source***](https://smithhousedesign.com/new-logo-instagram-marks-beginning-end-flat-design/)

Here are other examples of skeuomorphism:

![apple-example](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/apple-example.png)

[***Image Source***](https://dribbble.com/shots/12910101-Apple-not-flat)

![telegram-mail-example](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/telegram-mail-example.png)

[***Image Source***](https://dribbble.com/shots/14389278-Mail-Icon)

Check this [link](https://dribbble.com/tags/skeuomorphic) for more skeuomorphic design concepts.

### Background
Neumorphism relies heavily on layers, shadows, and angles to dictate hierarchy and context while embracing minimalism.

Neumorphism began from numerous concepts posted on Dribbble. One of these elements was posted by [Alexander Plyuto](https://dribbble.com/shots/8557373-Skeuomorph-Mobile-Banking-Dark-Mode).

In this guide, we will look at how to implement neumorphism designs in Android Studio.

Here are some screens implemented using the Neumorphic Elements concept.

![Neumorphism-example](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/example2.png)

[***Image Source***](https://dribbble.com/shots/10000695-Neumorphism-Sweet-Mix)

![Neumorphism-example](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/example3.png)

[***Image Source***](https://dribbble.com/shots/9527558-Freebie-Neumorphic-UX-UI-Elements)

### How neumorphism works
Neumorphism design structure relies on a shadowing system. This approach elevates an object above the base layer. 

As a result, it creates realistic and unique-looking elements.

For example, consider an object with a source of light at one corner.

The object will have two layers of box shadows. One layer is darker which is like a shadow while the other area is lighter.

Therefore, this means that if there is a light source:
- There will be a white box-shadow in the direction of the light.
- There will also be a black box-shadow on the opposite direction.

Neumorphism will show the following shadows and highlights depending on the light source.

![neumorphism-light-source](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/light-source.jpg)

[***Image Source***](https://github.com/fornewid/neumorphism#lightsource)

The following shapes can be implemented using neumorphism:

![neumorphism-shape-type](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/shape-type.jpg)

[***Image Source***](https://github.com/fornewid/neumorphism#shapetype)

### Prerequisites
To follow along with this guide, prior knowledge of Java is essential. You should also be familiar with Android Studio.

### Getting started
To implement neumorphism in Android Studio, we need to install a library. Go ahead and start a new project. 

Include the following library in your `app.gradle` file;

This library transforms UI components to the Neumorphic pattern view in the Android app without creating customized drawable views. The library will help us build Neumorphic android user interfaces that look as if they were floating above the surface of your mobile screen.

### General implementation
Neumorphism allows you to implement floating. This concept is almost identical to material designs. The main difference between the two is that Neumorphic designed objects tend to be extruded from the background. On the other hand, the material design objects cast a shadow while blocking the sources of light.

### Usage
- To build a unified view of the android elements of your Neumorphic app, the following matters. The parent Neumorphic view (element) should always be include `android:clipChildren="false"`. It is important to prevent the clipping of shadows. And if this doesn’t work (depending on the view type and different View groups, such as `Relativelayout` being the parent Neumorphic view), use attribute `android:padding`, and the Neumorphic views will work as expected.

- Your object has to have the same color as your background. It is important to have a matching background color and the design element's color (object). This helps create the aesthetic framed shadows.

It is important to have the background of the card or whatever you're using this for; they need to match. The card color and the background color in this example are the same that helps create this look.

Let's implement a few android studio views using the Neumorphism patterns. I will use a sign-in page to demonstrate how we can convert the respective views to create a Neumorphic effect.

Add the following color attributes in your `color.xml` file.

```xml
<resources>
    <color name="text_color">#1E4175</color>
    <color name="background_color">#ecf0f3</color>
    <color name="highlight">#ffffff</color>
    <color name="shadow_color">#d9dbde</color>
</resources>
```

Neumorphism supports different android widgets. This include

- `Views` such as `Button`, `TextView`, `Image`, `ImageButton` and `FloatingActionButton`
- `ViewGroups` such as `CardView`.

To implement Neumorphism in the android studio, import the necessary widgets and set the preferred shape types such as `FLAT`, `BASIN`, and `PRESSED`.

Here is a simple example of a sign-in User interface.

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

![neumorphism-login-ui](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/neumorphism-login-ui.jpg)

Each of the above elements can be modified. Check this [guide](https://github.com/fornewid/neumorphism#usage) to learn more and get the attributes that fit your design pattern, such

- specifying your light soucrce `app:neumorph_lightSource="leftTop|leftBottom|rightTop|rightBottom`"
- shandows elevation and highlight colors
- predifined ViewGroup or View stpe such as

  - `style="@style/Widget.Neumorph.Button"`
  - `style="@style/Widget.Neumorph.CardView"`
  - `style=">@style/Widget.Neumorph.TextView"` , etc

- Specifying preferred shape type of shape appearance

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

![neumorphism-pressed-login-ui](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/neumorphism-pressed-login-ui.jpg)

### Final notes
Neumorphism is not a very versatile design. At times it is not clear, especially when using buttons. This is because the change of state is not visible enough. This poses a visibility challenge to people with visual impairments or mobile phones with lower-quality screens or lower screen contrast.

One of the best use cases on Neumorphism is when using cards.

Check out the below [Modern Dashboard Design](https://github.com/Wachira48/NeumorphismAndroidUI/blob/master/app/src/main/res/layout/activity_dashboard_u_i.xml) implemented using Neumorphism.

![neumorphism-dashboard-ui-design](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/neumorphism-dashboard-ui-design.jpg)

Check the whole code used to implement the above android home Dashboard on [GitHub](https://github.com/Wachira48/NeumorphismAndroidUI).

The best way to use Neumorphism is to interact with different design elements to get a feel for what works and what doesn't. Neumorphism can be well applied on

- Single-page apps and small projects.
- When you're working with a design project that has a relatively small scope.
- Where user interaction is pretty straightforward.

For more reference, check the code on [GitHub](https://github.com/Wachira48/NeumorphismAndroidUI).

### Further readings
Neumorphism is a concept that you can choose to implement in any of your android inspired projects. Here are some handy Neumorphic android applications that you can use as an example to build your own Neumorphic inspired applications.

- Neumorphism [weather forecast app](https://play.google.com/store/apps/details?id=com.barcelonacodeschool.neumorphismweather)

![neumorphism-weather-forecast-app](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/neumorphism-weather-forecast-app.png)

[***Image Source***](https://play.google.com/store/apps/details?id=com.barcelonacodeschool.neumorphismweather)

- Neomorphism [todo for tasks and schedule](https://play.google.com/store/apps/details?id=com.flutter.bananavolt.neumorphism.neo.todo) manager

![neumorphism-todo-manager.png](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/neumorphism-todo-manager.png)

[***Image Source***](https://play.google.com/store/apps/details?id=com.flutter.bananavolt.neumorphism.neo.todo)

- [Neumorphism calculator](https://play.google.com/store/apps/details?id=dev.littleforest.calculator_app)

![neumorphism-calculator](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/neumorphism-calculator.png)

[***Image Source***](https://play.google.com/store/apps/details?id=dev.littleforest.calculator_app)

- Flutter [inspired Neumorphic calculator](https://play.google.com/store/apps/details?id=dev.luhluh.neucalcu)

![flutter-inspired-neumorphic-calculator](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/flutter-inspired-neumorphic-calculator.png)

[***Image Source***](https://play.google.com/store/apps/details?id=dev.luhluh.neucalcu)

- Neumorphism [music player](https://play.google.com/store/apps/details?id=com.ayush.musical)

![neumorphism-music-player](/engineering-education/an-introduction-to-neumorphism-components-in-android-studio/neumorphism-music-player.png)

[***Image Source***](https://play.google.com/store/apps/details?id=com.ayush.musical)

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)