---
layout: engineering-education
status: publish
published: true
url: /implementing-android-jetpack-preferences/
title: Implementing Android Jetpack Preferences
description: This article will cover the use of the Android Preference Library (JetPack) in our project by developing a simple setting screen.
author: mercy-nyakio
date: 2022-03-16T00:00:00-09:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-android-jetpack-preferences/hero.png
    alt: Implementing Android Jetpack Preferences Hero Image
---
We now have a preferences window in almost every software we use, enabling users to tailor their settings to their specifications. For example, apps like YouTube enable users to choose between dark and bright mode, pick the download quality, control notifications, and other parameters with a single click. This is an excellent way to enhance the user experience, and it's getting more popular. Therefore, we need to find the most straightforward and effective way to include preferences in your application. Using the Android Preference Library, let us create a simple setup screen!

### Table of contents
- [Prerequisites](#prerequisites)
- [Step 1 Creating the project](#step-1-creating-the-project)
- [Step 2 Adding a menu to the MainActivity](#step-2-adding-a-menu-to-the-main-activity)
- [Step 3 Adding the second activity](#step-3-adding-the-second-activity)
- [Step 4 Working with MainActivity.kt](#step-4-working-with-mainactivitydotkt)
- [Step 5 Working with SettingActivity.kt](#step-5-working-with-settingactivitydotkt)
- [Step 6 Running the application](#step-6-running-the-application)
- [Conclusion](#conclusion)

### Prerequisites
The reader is advised to have the following to follow along with this tutorial;
- Basic knowledge in Android development.
- Basic knowledge in Kotlin programming language.
- Have basic knowledge of [preferences](https://developer.android.com/reference/android/preference/Preference)
- Have [Android Studio](https://developer.android.com/studio?gclid=CjwKCAjwlcaRBhBYEiwAK341jU5iIV3l1WRlsYriVsAVDhHovlGtHMmWJJAL2MwlC015p-KO-cUWIRoCy0IQAvD_BwE&gclsrc=aw.ds) installed.

#### Step one: Creating the project
Open Android Studio and select New Project -> Empty activity as your project template and then click next to proceed to the next steps. Configure the application name and enter your own. In this case, we will call it **Android Preferences**. For this project, we will use `Kotlin` as our programming language, so select `Kotlin` as your default language. Leave everything else as default and click Finish and wait a few seconds for it to build up your project.
   
#### Step two: Adding a menu to the MainActivity
The menu enables us to add a menu item(s) into it that will help us navigate to the `SettingActivity`. We will achieve that by adding a click listener to each item(s):

To add a menu resource, click the project folder on the left side of the `IDE` or simply `alt+1` -> app -> res folder. Right-click the `res` folder to add a new resource file -> new -> Android resource file. After navigating to `Android resource file,` enter the file name as menu and the resource type select Menu and click `OK` to finish. Inside the menu package, navigate by right-clicking -> new -> menu resource file and then set the file name as `setting_menu` and finish.

Add the following code snippet to the setting_menu.XML to add an item to the menu.

```kotlin
<item
       android:id="@+id/setting"
       android:icon="@drawable/ic_settings"
       android:visible="true"
       android:contentDescription="@string/my_setting"
       app:showAsAction="ifRoom"
       android:title="@string/settings"/>
```

To ensure the menu bar is visible to the user's application, add the following code to the `MainActivity.kt` file.

```Kotlin
 override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.settings_menu, menu)
        return true
    }
```

It will just inflate the setting_menu that we created earlier.

#### Step three: Adding the second activity
Add another activity to our main project by double-click app file -> java file ->  application package name(com._.androidprefernces). Right-click the file -> new -> `activity` -> `Settings activity`. After creating a new activity, new android activity dialog, leave everything as default and finish. The final step is to wait for the project to build.

> NOTE: The new settings activity comes with files in it. Such files include:
   >1. Default settings XML layout in the layout folder 
   >2. An android resource file is known as XML. Inside the resource file, there is a layout called root preferences. This is where all the settings will be represented. Inside the root preference, several preference categories will hold a particular group of settings.
   >3. A new value resource file called arrays. This contains entries and values that will be visible to the user for selection. Mainly common for preferences such as list preferences, multi-select list preferences, and checkbox preferences.

- We need to include our new arrays for our settings preferences. Hence we need to delete the default arrays and edits our new array values as follows.

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

We will have theme values and entries for our list preferences in the general preference category. Entries will be displayed to the users to choose which theme and download size of the file they need to set for the application.
We will use the theme and download entries to set the default value displayed before making changes. The entries will also help us in writing the Kotlin code.

- Include the following code in the root preferences layout and inside the preference screen, which is the root tag of all the preferences. 
This will contain all the preferences we will use in our application, i.e., list preference, checkbox preference, seek bar preference, e.t.c.

>Note; using drawables is optional, and you need to ignore the icon(s) code snippet in the code below. If you have to use drawable, you can add your own best from the vector assets.

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
            android:summary="That was all we had for today. Feel free to add more android preferences in your application before we meet next time.
Thank you."
            />
    </PreferenceCategory>
```
Below are the critical attributes in the root preferences. They will help you understand their usage in each preference in our application.

1. `app: key` - This allows you to make additional adjustments to the preference anytime, i.e., during runtime, another preference can depend on another by referring to the key of the referenced preference.
2. `app: summary` - a string that describes a particular preference.
3. `app: title`  and `dialog: title` show a particular preference or category preference heading. While the dialogue title will be of a particular dialog once popped up.
4. `default: value` - setting preferences with more choices must be included as a default value. This indicates that before the user changes the application, the developer makes the initial setting.
5. `Summary: on` - mostly used it switches. It indicates the string that will be set when switched to on.
6. `Summary: off` - a string is set when a switch is set off.
7. `app: dependency` indicates that a particular setting preference depends on another preference for its functionality. The depended must be set to true for the dependent to function; otherwise will be inactive.

### Step 4 Working with MainActivitydotkt
We need to ensure we have capabilities to navigate within the two activities. We need to set an intention for the main activity to do so.
Add the following code to the MainActivity.kt file.

```Kotlin
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
The above code uses the menu item by calling it by its id. Then we display a toast once clicked, and we pass the intent of the activity we need to navigate to.

To navigate back to the main activity using the back button in the toolbar of the setting activity, add the following code snippet within the setting activity in the manifest.xml file.

```Kotlin
android:parentActivityName=".MainActivity"
```
The code above is just notifying the current activity(child) that once the back button is clicked, it should go to the main activity, which is its parent.

### Step 5 Working with SettingActivitydotkt
We need to make our settings abit functional. We shall be using [shared preferences](https://developer.android.com/reference/android/content/SharedPreferences). We will design so that a user selects a theme; a new theme will be loaded, i.e., light, dark, and system theme.

Ensure the activity class have the extra code snippet separated with a comma as shown below;

```Kotlin
class SettingsActivity : AppCompatActivity(), SharedPreferences.OnSharedPreferenceChangeListener{
       //Other codes.
}
```
To register our shared preferences, add the following code below the line `support action bar?.set........` that always defaults in this activity.

```Kotlin
supportActionBar?.setDisplayHomeAsUpEnabled(true)
        PreferenceManager.getDefaultSharedPreferences(this)
            .registerOnSharedPreferenceChangeListener(this)
```
We now need to code our theme to change, as stated earlier. We override a function `onSharedPreferenceChanged,` as shown below, which will be within our class `SettingActivity.`

```
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
The code above uses the if statement to check if we are on the right preferences using its key. In this case, we check if we are on the list preference of the general preference category.
If the key is equal, we use the `when` control flow to set each value to the correct theme when clicked.

We also need to destroy the shared preferences that we registered because we have completed using it or save the memory space that the preference is occupying.
Add the below code to unregister the shared preferences;
```
 override fun onDestroy() {
        super.onDestroy()
        PreferenceManager.getDefaultSharedPreferences(this)
            .unregisterOnSharedPreferenceChangeListener(this)
    }
```
### Step 6 Running the application
You can run the application to a virtual device(emulator) or a physical device with an `SDK` version upper than the set one during app configuration.

### Conclusion
Hopefully, you've gotten the hang of Android Preferences and how they may be used. To understand more about using the android preference library, create or add more settings to the project.

Happy coding!
