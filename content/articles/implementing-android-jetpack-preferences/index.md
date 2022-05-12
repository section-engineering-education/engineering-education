---
layout: engineering-education
status: publish
published: true
url: /implementing-android-jetpack-preferences/
title: Implementing Android Jetpack Preferences
description: This article will guide the reader on how to implement Android preferences in an application.
author: mercy-nyakio
date: 2022-04-12T00:00:00-06:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-android-jetpack-preferences/hero.png
    alt: Implementing Android Jetpack Preferences Hero Image
---
A settings page gives users the ability to customize their interaction within an app. It is an excellent method for improving the overall user experience.
<!--more-->
For example, apps like YouTube allow users to choose between dark and light modes, pick the video quality, regulate notifications, as well as other characteristics with a single click.

The setting screen enhances users' experience by allowing them to declare their preferences. 

Therefore, we need to find the most straightforward and effective way to include preferences in our application. 

In this article, we will create a simple setup screen using the JetPack preference library.

### Table of contents
- [Prerequisites](#prerequisites)
- [Step 1 - Creating the project](#step--1-creating-the-project)
- [Step 2 - Adding a menu to the MainActivity](#step--2-adding-a-menu-to-the-main-activity)
- [Step 3 - Adding the second activity](#step--3-adding-the-second-activity)
- [Step 4 - Working with MainActivity.kt](#step--4-working-with-mainactivity.kt)
- [Step 5 - Working with SettingActivity.kt](#step--5-working-with-settingactivity.kt)
- [Step 6 - Running the application](#step--6-running-the-application)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need to have:
- A basic knowledge of Android development.
- Some knowledge of Kotlin programming language.
- Basic knowledge of [Android preferences](https://developer.android.com/reference/android/preference/Preference)
- [Android Studio](https://developer.android.com/studio?gclid=CjwKCAjwlcaRBhBYEiwAK341jU5iIV3l1WRlsYriVsAVDhHovlGtHMmWJJAL2MwlC015p-KO-cUWIRoCy0IQAvD_BwE&gclsrc=aw.ds) installed.

#### Step 1 - Creating a new project
Open Android Studio and select *New Project -> Empty activity* as your project template, and then click `next`. 

Give the application any name. In my case, I will name this project **Android Preferences**.  

We will use `Kotlin` as our programming language for this project. Leave everything else as default and click `Finish`. Then wait a few seconds for Android Studio to build up the project.
   
#### Step 2 - Adding a menu to the MainActivity
The menu enables users to add a menu item(s) that will help navigate to the `SettingActivity`. 

We will achieve this functionality by adding a `click listener` to each item(s). Follow the steps below to add a `menu` resource file:

In the `project` directory, right-click the `res` folder to add a `new resource file -> new -> Android resource file`.

Next, navigate to the Android resource file, enter the file name and the resource type as `menu` then click `OK` to finish.

Inside the `menu` package, select the `new -> menu resource` file and then name it as `setting_menu` and click `finish`.

Add the following lines of code in the `settings_menu` file:

```xml
<item
       android:id="@+id/setting"
       android:icon="@drawable/ic_settings"
       android:visible="true"
       android:contentDescription="@string/my_setting"
       app:showAsAction="ifRoom"
       android:title="@string/settings"/>
```

To ensure that the menu bar is visible, add the following code to the `MainActivity.kt` file.

```kt
 override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.settings_menu, menu)
        return true
    }
```

#### Step 3 - Adding the second activity
In this step, we will add the Settings activity to the project. Navigate to the main folder and add a new activity. Remember to select a `Settings activity` in the confirmation dialog. -

Several files will be generated along with the Settings activity. They include:

- A default `settings.xml` file in the `layout` folder. When you open the resource file, there is a layout called `root preferences`, where all the settings will be represented. Several `preference categories` will hold a particular group of settings.

- A new value resource file called `arrays`. It contains entries and values that will be visible to the user.  

We need to include new values in the array for our settings preferences. Therefore, we should delete the `default` arrays and add new array values, as shown below:

```xml
<resources>
    <string-array name="theme_entries">
        <item>Light</item>
        <item>Dark</item>
        <item>Use system theme</item>
    </string-array>

    <string-array name="theme_values">
        <item>1</item>
        <item>2</item>
        <item>3</item>
    </string-array>
    <string-array name="download_entries">
        <item>Default (100MB)</item>
        <item>1.0 MB</item>
        <item>4.7 MB</item>
        <item>10.6 MB</item>
        <item>32 MB</item>
        <item>50 MB</item>
        <item>Disable</item>
    </string-array>
    <string-array name="download_values">
        <item>default(100_mb)</item>
        <item>1.0_mb</item>
        <item>4.7_mb</item>
        <item>10.6_mb</item>
        <item>32_mb</item>
        <item>50_mb</item>
        <item>disable</item>
    </string-array>
</resources>
```

We will have `theme` values and entries for our list preferences in the general preference category. 

Users will choose their preferred theme and download size when setting up the application. 

> Note that using drawables is optional. However, you can add your drawables from the vector assets.

Add the code below in the root preferences layout. It will contain all the preferences we will use in our application.

```xml
<PreferenceCategory app:title="Personal details"
    app:icon="@drawable/ic_person_pin">// It is the holder of a particular group of settings

    <EditTextPreference
        app:key="myEditText"
        app:title="Enter your name"
        app:useSimpleSummaryProvider="true" />
    <CheckBoxPreference
        app:title="Mood check"
        app:summary="Check the text box if you like our design layout"
        app:key="pref"
        app:defaultValue="true"
        />
    <SeekBarPreference
        app:title="Rate this app"
        app:showSeekBarValue="true"
        app:icon="@drawable/ic_baseline_star"
        app:summary="Rate this app in a scale of 0 -> 5"
        app:key="rating_bar"
        android:max="5"
        app:min="0"
        app:defaultValue="3"
        app:dependency="pref"
        />

</PreferenceCategory>

<PreferenceCategory app:title="General"
    app:icon="@drawable/ic_baseline_color_lens">
    <ListPreference
        app:dialogTitle="Theme"
        app:defaultValue="1"
        app:entryValues="@array/theme_values"
        app:entries="@array/theme_entries"
        app:key="theme"
        app:useSimpleSummaryProvider="true"
        app:title="Choose your Theme"/>

</PreferenceCategory>

<PreferenceCategory app:title="Chat features"
    app:icon="@drawable/ic_baseline_app_settings">
    <SwitchPreferenceCompat
        app:key="chat_features"
        app:summary="Use Wi-Fi or data for messaging when available"
        app:title="Enable chat features"/>

    <SwitchPreferenceCompat
        app:dependency="chat_features"
        app:key="attachment"
        app:summaryOff="Let others know you have read their message "
        app:summaryOn="Other people will see you have read their text automatically"
        app:title="Send read receipts" />
    <SwitchPreferenceCompat
        app:dependency="chat_features"
        app:key="attachment"
        app:title="Show type indicators"
        app:summaryOff="Let others know your are typing"
        app:summaryOn="Other people will see whenever you are typing"
        />
    <ListPreference
        app:defaultValue="default(100_mb)"
        app:entries="@array/download_entries"
        app:entryValues="@array/download_values"
        app:key="default(100_mb)"
        app:title="Auto-download files you receive over mobile data"
        app:useSimpleSummaryProvider="true"
        app:dependency="chat_features"/>

</PreferenceCategory>
<PreferenceCategory app:title="Others"
    app:icon="@drawable/ic_read_more">
    <Preference
        app:title="Android Preferences"
        android:summary="That was all we had for today. Feel free to add more Android preferences in your application before we meet next time.
Thank you."
        />
</PreferenceCategory>
```

Below are the critical attributes in the root preferences. They are crucial in understanding their usage in each preference in the application:

- `app: key` - It allows developers to make additional adjustments to the preference.
- `app: summary` - A string that describes a particular preference.

- `app: title`  and `dialog: title` - They show a particular preference or category preference heading. The `dialog title`, on the other hand, is tied to a particular dialog that pops up on the screen.

- `default: value` - This setting preference has more choices and must be included as a default value. It indicates that the developer makes the initial setting before the user changes the application.

- `summary: on` - Mostly used in switches. It highlights the string that will be set when switched on.

- `summary: off` - A string is set when a switch is set to off.

- `app: dependency` - It indicates that a particular setting preference depends on another preference for its functionality. The dependent must be set to true for other functions to work.

### Step 4 - Working on the MainActivity.kt
We need to implement the ability to navigate between the two activities. Therefore, we should add an intent in the `MainActivity`.

To implement this functionality, add the following code to the `MainActivity.kt` file:

```kotlin
override fun onOptionsItemSelected(item: MenuItem): Boolean {
    when (item.itemId) {
        R.id.setting -> {
            Toast.makeText(this,"You are getting ready for android preferences",Toast.LENGTH_LONG).show()
            val intent = Intent(this, SettingsActivity::class.java)
            startActivity(intent)
        }
    }
    return super.onOptionsItemSelected(item)
}
```

The above code invokes the menu `item` using its `id`. We then display a toast message once clicked. Next, we pass the intent of the activity that we need to navigate to. 

To navigate back to the `MainActivity` using the back button in the toolbar of the `setting activity`, add the following code within the setting activity in the `manifest.xml` file:

```xml
android:parentActivityName=".MainActivity"
```

The code above notifies the current `activity(child)` that once the back button is clicked, it should go to the `MainActivity`.

### Step 5 - Working on the SettingActivity.kt
We need to make our settings functional. We shall be using [shared preferences](https://developer.android.com/reference/android/content/SharedPreferences). 

A user will be able to choose from a light, dark, or system default theme. To add this feature, include the code below in the SettingsActivity:

```kotlin
class SettingsActivity : AppCompatActivity(), SharedPreferences.OnSharedPreferenceChangeListener{
       //Other codes.
}
```

To register our shared preferences, add the following code below the line `support action bar?.set`:

```kotlin
supportActionBar?.setDisplayHomeAsUpEnabled(true)
        PreferenceManager.getDefaultSharedPreferences(this)
            .registerOnSharedPreferenceChangeListener(this)
```

We need to ensure that the app adopts a new theme. We override the `onSharedPreferenceChanged,` in the `SettingActivity` class.

```kotlin
override fun onSharedPreferenceChanged(sharedPreferences: SharedPreferences?, key: String?) {
        if (key == "theme"){
            val pref = sharedPreferences?.getString(key,"1")

            when(pref?.toInt()){
                1 ->{
                    AppCompatDelegate.setDefaultNightMode(
                        AppCompatDelegate.MODE_NIGHT_NO)
                }
                2 ->{
                    AppCompatDelegate.setDefaultNightMode(
                        AppCompatDelegate.MODE_NIGHT_YES)
                }
                3 ->{
                    AppCompatDelegate.setDefaultNightMode(
                        AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
                }
            }
        }
    }
```

In the above code, the `if` statement checks if we are on the right preferences using its key. 

In this case, we check if we are on the list preference of the general preference category. 

If the key is correct, we use the `when` control flow to set each value to the correct theme when clicked.

We also need to destroy the shared preferences that we registered because we have completed using them. This saves memory space. To unregister the shared preferences, use the following code:

```kotlin
 override fun onDestroy() {
        super.onDestroy()
        PreferenceManager.getDefaultSharedPreferences(this)
            .unregisterOnSharedPreferenceChangeListener(this)
    }
```

### Step 6 - Running the application
You can run the application on a virtual device(emulator) or a physical device.

The full code can be found on this [GitHub repository](https://github.com/mercie-nyakio/Android-preferences).

### Conclusion
In this article, we have discussed how to use Android Preferences in an application.

You can, therefore, use this knowledge to craft more beautiful and quality applications.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)