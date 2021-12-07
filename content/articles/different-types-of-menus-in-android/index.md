---
layout: engineering-education
status: publish
published: true
url: /different-types-of-menus-in-android/
title: Different Types of Menus in Android
description: This tutorial will guide the reader through the process of creating different types of menus in Android. Menus are fundamental UI elements that are frequently used to hold actions that could otherwise be buried.
author: benta-odek
date: 2021-11-24T00:00:00-20:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/different-types-of-menus-in-android/hero.png
    alt: Different types of Menus in Android Hero Image
---
Menus are fundamental user interface elements that are frequently used to hold actions that could otherwise be buried.
<!--more-->
These hidden elements could be accessed by:
- Clicking a button.
- Using gestures such as long-pressing an image.

### Reasons for having menus as a user interface component
- To free up screen space.
- To perform operations that are mostly required by users who are not directly represented on the screen.
- To provide a capability that allows shifting to various parts of the application that are not easily available in the presence of user interface display.

### Prerequisites
To follow this tutorial, the reader will need to:
- Have Android Studio installed on your machine.
- Have a basic understanding of the Kotlin programming language.
- Have a basic knowledge of Android app development.

### Types of Menus Used in Android
Based on the different contexts and content of the application, different types of menus are used. Here are the various types of menus.

#### Options menu
Options menus are menus that present actions and other options that are directly relevant to the application's current activity or context.
The following are some examples of choices menus:
- Settings
- Share
- Search
- Copy link
- Help
- History
- Privacy

![Options menu](/engineering-education/different-types-of-menus-in-android/options-menu.png)

### Creating options menu
On the resource folder, create a menu directory and within the directory create an options menu file and include the following code to build your menu items.

```xml
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

        <item
            android:id="@+id/settings"
            android:icon="@drawable/ic_baseline_settings_24"
            android:title="Settings"
            app:showAsAction="always" />

        <item
            android:id="@+id/share"
            android:title="Share"
            />

        <item
            android:id="@+id/history"
            android:title="History"
            />

        <item
            android:id="@+id/help"
            android:title="Help"
            />

        <item
            android:id="@+id/logout"
            android:title="logout"
            />
</menu>
```

#### Explanation
- `<menu>` - This is an element that provides the basis for creating menu items and groups.
- `<item>` - Items are used to represent the single elements to be displayed in the menu. It provides the capability to build several menu items.
- `<group>` - Group allows you to categorize menu items that are said to be sharing the same properties for example active state and visibility.

#### Handling clicks on menu items
To handle clicks on menu items, you first need to inflate the menu resource file.

```kotlin
override fun onCreateOptionsMenu(menu: Menu?): Boolean {
    menuInflater.inflate(R.menu.options_menus, menu)
    return true
}
```

The `onOptionsItemSelected` method handles each element within the menu and the operations to be performed when clicked.

```kotlin
//handling click events in an options menu items click

override fun onOptionsItemSelected(item: MenuItem): Boolean {
    when (item.itemId) {
        R.id.settings -> {
            Toast.makeText(this, "This is settings", Toast.LENGTH_SHORT).show()
            return true
        }
        R.id.share -> {
            Toast.makeText(this, "This is share", Toast.LENGTH_SHORT).show()
            return true
        }
        R.id.history -> {
            Toast.makeText(this, "This is history", Toast.LENGTH_SHORT).show()
            return true
        }
        R.id.help -> {
            Toast.makeText(this, "This is is help", Toast.LENGTH_SHORT).show()
            return true
        }
        R.id.logout -> {
            Toast.makeText(this, "logged out", Toast.LENGTH_SHORT).show()
            return true
        }
        else -> {
            return super.onOptionsItemSelected(item)
        }
    }
}
```

The `when` statement is used to evaluate the value of the `itemId`. If its value is equal to the value of the `R.id.<item_id>`, the `Toast.makeText` method is called with the message showing the clicked item. This indicates that the menu is working. We can therefore perform the desired action.

#### Contextual Menus
Contextual menus are utilized when actions connected to a certain item or context frame are presented on the current screen. Examples of such menus are shown when one long presses an image. 

Contextual menus are of two types:
- Floating contextual menus.
- Contextual action menus.

#### Floating contextual menus
When one long presses (press and hold) on an item, this menu appears as a floating list of menu items. Support for floating contextual menu should be declared. This menu allows actions to be performed on one item at a time.

#### Handling clicks on floating contextual menu items
Just like options menus, floating contextual menus click listeners also needs to be handled to provide a relevant and appropriate action required by the user. 

This click listener is handled in the following method after the creation of the menu:

```kotlin
 //Float contextual menu
override fun onCreateContextMenu(
    menu: ContextMenu?,
    v: View?,
    menuInfo: ContextMenu.ContextMenuInfo?
) {
    super.onCreateContextMenu(menu, v, menuInfo)
    menuInflater.inflate(R.menu.float_contextual_menu, menu)
}
```

The following method handles the floating contextual menu clicks:

```kotlin
//handling click events in an float context menu items clicks
override fun onContextItemSelected(item: MenuItem): Boolean {
    when (item.itemId) {
        R.id.color -> {
            var textView = findViewById<TextView>(R.id.textHappyCoding)
            textView.setTextColor(Color.parseColor("#FF0000"))
            Toast.makeText(this, "color changed", Toast.LENGTH_SHORT).show()
            return true
        }
        R.id.font -> {
            var textView = findViewById<TextView>(R.id.textHappyCoding)
            textView.setTextSize(TypedValue.COMPLEX_UNIT_PX, 32F)
            Toast.makeText(this, "size increased", Toast.LENGTH_SHORT).show()

            return true
        }
        else -> {
            return super.onContextItemSelected(item)
        }
    }
}
```

![Floating contextual menu](/engineering-education/different-types-of-menus-in-android/floating-contextual.png)

#### Contextual action menu
This is a type of contextual menu that is usually used to display the operations based on the long clicked item. Several methods are often used to manipulate the contextual action mode menu. The methods are explained below.

The first method is used to create the contextual action mode menu:

```kotlin
private val mActionCallback = object : ActionMode.Callback {
    override fun onCreateActionMode(mode: ActionMode, menu: Menu): Boolean {
        // assuming we have a menu resource file named actionmode_contextual_menu
        menuInflater.inflate(R.menu.actionmode_contextual_menu, menu)
        return true
    }
```

To prepare the contextual action mode menu, we can use this method below to perform that action.

```kotlin
override fun onPrepareActionMode(mode: ActionMode, menu: Menu): Boolean {
        return false
    }
```

There is also a method that is used to update the action mode menu and even update the operations when required.

```kotlin
override fun onDestroyActionMode(mode: ActionMode) {
        //perform any update you will require
    }
```

To handle the clicks of the action mode and implement the required operation on each menu item, the following code is used.

```kotlin
override fun onActionItemClicked(mode: ActionMode, item: MenuItem): Boolean {
            return when (item.itemId) {
                R.id.name -> {
                    Toast.makeText(this@MainActivity, "Name selected", Toast.LENGTH_SHORT).show()
                    mode.finish()
                    return true
                }
                R.id.description -> {
                    Toast.makeText(this@MainActivity, "This is description", Toast.LENGTH_SHORT).show()
                    mode.finish()
                    return true
                }
                else -> false
            }
        }
```

![Action mode](/engineering-education/different-types-of-menus-in-android/action-mode.png)

#### Differences between contextual action mode menu and floating contextual menu
- Unlike the Floating contextual menu, contextual action mode shows the action and operation bar at the top of the screen that affects the selected item.
- Contextual action mode menu gives a capability to perform various actions on multiple items simultaneously. For example, one can select multiple items and perform a delete action.

#### Popup menus
These menus are similar to floating contextual menus, it comprises actions and operations in a floating dialog just as floating contextual menu.

Popup menus vary from floating contextual menus in that they do not alter the chosen item and are used to give a more extensive set of menu actions.

```kotlin
fun showPopupMenu(view: View) {
    val popup = PopupMenu(this, view)
    popup.setOnMenuItemClickListener(this)
    popup.inflate(R.menu.popup_menu)
    popup.show()
}
```

To inflate and handle the clicks of the popup menu, the following approach is used.

```kotlin
override fun onMenuItemClick(item: MenuItem): Boolean {
    return when (item.itemId) {
        R.id.background -> {
            var background = findViewById<ConstraintLayout>(R.id.layoutBackground)
            background.setBackgroundColor(Color.parseColor("#3c3f41"))
            true
        }
        R.id.description -> {
            var textView = findViewById<TextView>(R.id.textHappyCoding)
            textView.text = "From Hello world to changing the world"
            true
        }
        R.id.delete -> {
            var textView = findViewById<TextView>(R.id.textHappyCoding)
            textView.text = ""
            true
        }
        else -> false
    }
}
```

![Pop up menu](/engineering-education/different-types-of-menus-in-android/popup-menu.png)

#### Checkable Menus 
Checkable menus are frequently used to execute specific tasks, such as activating and deactivating features. For several executable actions, a check box or a radio button can be used.

A checkable menu can be designed as follows. Create a menu resource file and add the following elements.

```xml
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <group android:checkableBehavior="single">
        <item
            android:id="@+id/checkbox"
            android:title="checkable_one" android:checked="false"/>
        <item
            android:id="@+id/checkbox2"
            android:title="checkable_two"
            android:checked="false"/>
        <item
            android:id="@+id/checkbox3"
            android:title="checkable_three"
            android:checked="false"/>
    </group>
    <group android:id="@+id/intent_based">

    </group>

</menu>
```

#### Explanation
`checkablebehaviour` is a property that can be used to indicate the check behavior and actions on checkable menu items. It can be specified in the following ways:
- `all` - This is used to demonstrate that all of the options may be selected, and a checkbox is used to facilitate this operation.
- `single` - This is used to show that just one item may be picked, and the radio button is used to do so.
- `none` - It is used to indicate no menu item is selected.

Just like the options menu, checkable menus click listeners are also handled within the `onOptionsItemSelected` method as shown below:

```kotlin
override fun onOptionsItemSelected(item: MenuItem): Boolean {
        item.isChecked = !item.isChecked
        return when (item.itemId) {
            R.id.checkbox -> {
                Toast.makeText(this, "checkable_one", Toast.LENGTH_SHORT).show()
                true
            }
            R.id.checkbox2 -> {
                Toast.makeText(this, "checkable_Two", Toast.LENGTH_SHORT).show()
                true
            }
            R.id.checkbox3 -> {
                Toast.makeText(this, "checkable_Three", Toast.LENGTH_SHORT).show()
                true
            }
            else -> false
        }
    }
```

![Checkable menu](/engineering-education/different-types-of-menus-in-android/checkable.png)

If a menu item is clicked, it is first examined to see if it is checked, then updated using this code `item.isChecked = !item.isChecked`.

#### Intent-based menus
In contrast to intent-based menus, other menus are created sorely using a menu resource file. Menus based on intent are dynamically added based on the application.

Within the checkable menu resource file add the following implementation which is used as the intent-based menu item.

```xml
<group android:id="@+id/intent_based">

</group>
```

Then within the `onCreateOptionsMenu` method, add the implementation below to integrate the intent-based menu.

```kotlin
//Intent based menu
val  intent= Intent(android.content.Intent.ACTION_SEND)
intent.setType("text/plain")
intent.putExtra(android.content.Intent.EXTRA_TEXT,"Hello am intent based menu")

menu!!.addIntentOptions(
    R.id.intent_based, 0, 0, this.componentName, null, intent, 0, null
)
```

### Design guidelines and best practices for menus
Based on the different types of menus, there are design guidelines and best practices to be followed.
- The best place to issue a command: Think of the command and how it performs its actions. Does it apply to specific selection or the entire activity?
- Ordering of menu items: When arranging menu items, place the actions that are always used often and first first.
- Recoverability of menu items: Don't position menu items where users can't readily access contextual or popup menus by long-pressing a specific item on the screen.
- First context menu item: The first context menu option should always be the pick of the most straightforward action, for example, open.
- Identify selected items with a context menu: This is always done with the help of popup or action mode in that one should take care of the item user-selected. Otherwise, the user is likely to forget. Therefore, it is appropriate to identify the item selected to provide a context menu. Doing so helps the user recall the action they were to perform.
- Fix the most important commands: This is accomplished on the choices menu by placing an icon on the menu item to guarantee that it is always fixed and accessible to users as shown below:

```xml
<item
    android:id="@+id/settings"
    android:icon="@drawable/ic_baseline_settings_24"
    android:title="Settings"
    app:showAsAction="always" />
```

### Conclusion
In this article, we have learned what menus are used in Android, the different types of menus, the difference between menu types and design guidelines together with the best practices when handling menus. You can get the full implementation on [GitHub](https://github.com/benta-odek/MenusDemo.git).

### Reference
Unlock the potential to explore more on [Menus](https://developer.android.com/guide/topics/ui/menus).

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
