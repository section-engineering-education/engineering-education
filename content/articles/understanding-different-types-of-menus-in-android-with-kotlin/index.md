### [Android] Understanding Different Types of Menus in Android with Kotlin.
#### Introduction
Menus are fundamental user interface elements that are frequently used to store actions that would otherwise be buried.
These hidden commands could be accessible by:
- Click a button.
- Using gestures such as long-pressing an image.
#### Reasons of having menus as a user interface component
- To free up screen space.
- To perform operations that are mostly required by users who are not directly represented on the screen.
- To provide a capability that allows shifting to various parts of the application that are not easily available in the presence of user interface display.
#### Prerequisites
- Have android studio installed
- Have basic knowledge of kotlin programming language.
- Have a basic knowledge of Android.

#### Types of Menus Used in Android
Based on the different contexts and content of the application, Different menu types are explained which are used to provide the best user experience. Here are the types of menus.

1. Options menu

Options menus are menus that present actions and other options that are directly relevant to the application's current activity or context.
The following are some examples of choices menus:
- Settings
- Share
- Search
- Copy link
- Help
- History
- Privacy

#### Creating options menu
On the resource, the folder creates a menu directory and within the directory create an options menu file the includes the following implementation to build your menu items.
```XML
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

what is the meaning of the following

- `<menu>` This an element that provides the basis of creating menu items and even groups

- `<item>` items are always used to represent the single menu items that are to be shown on the user interface It provide a capability to build several menu items.

- `<group>` Group provides the capability to categorize menu items that are said to be sharing the same properties example active state and visibility.


#### Keeping track of what happens when a user selects an option from a menu.

To handle the user's actions on the selected menus there are some methods used to make it a success.
The below code is used to create the options menu and link it with the resource file created earlier.
```kotlin
    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.options_menus, menu)
        return true
    }
```
So the below code now handles each element within the menu and the operations to be performed when user clicks on the menu item.
```kotlin
   //handling click events in an options menu items clicks
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
2. Contextual Menus

Contextual menus are always utilized when actions connected to a certain item or context frame are presented on the current screen.
Examples of such menus are shown when one long presses an image 

Contextual menus are always of two types that are
- Floating contextual menus

When one long press (press and hold) on an item on the current screen, this menu appears as a floating list of menu items. Support for floating contextual menu is always declared. This menu allows actions to be performed on one item at a time 

#### Taking care of the click listener for floating contextual menus
Just as options menus floating contextual menus click listeners also needs to be handled to provide a relevant and appropriate action required by the user this click listener is always handled in the following method after the creation of the menu within the below method
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

 A method which handles the floating contextual menu click listener
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
- Contextual Action menus

This is a type of contextual menu that is majorly used to display the operations which are considered by the item on the screen which has been long pressed.
 Several methods are often used to manipulate the contextual action mode menu. The methods are explained below.

 The first method is used to create the contextual action mode menu.That is the below implementation
 ```kotlin
 private val mActionCallback = object : ActionMode.Callback {
        override fun onCreateActionMode(mode: ActionMode, menu: Menu): Boolean {
            menuInflater.inflate(R.menu.actionmode_contextual_menu, menu)
            return true
        }
 ```
To prepare the contextual action mode menu the below method is always appropriate to be used to perform that action.
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
To handle the click listener of the action mode and implement the required operation on each menu item the below code explains how it is implemented.
```kotlin
override fun onActionItemClicked(mode: ActionMode, item: MenuItem): Boolean {
            return when (item.itemId) {
                R.id.name -> {
                    Toast.makeText(this@MainActivity, "Name selected", Toast.LENGTH_SHORT).show()
                    mode.finish()
                    return true
                }
                R.id.description -> {
                    Toast.makeText(this@MainActivity, "This is description", Toast.LENGTH_SHORT)
                        .show()
                    mode.finish()
                    return true
                }
                else -> false
            }
        }
```

#### Difference between contextual action mode menu and floating contextual menu
- Contextual action mode shows the action and operation bar at the top of the screen that affects the selected item.
- Contextual action mode menu gives a capability to perform several actions on multiple items at once example is selecting multiple items in a list and performing the action on them at once which is deleting chats on the what's up to page.

3. Popup menus

These menus are always similar to floating contextual menus, it comprises actions and operations in a floating dialog just as floating contextual menu.

Popup menus vary from floating contextual menus in that they do not alter the chosen item and are used to give a more extensive set of menu actions.

The implementation of this type of menus is handeld in the below show methods The below method is used to create a click listener for when a popup menu appears, as well as tying the menu to the appropriate resource file that includes the essential elements.
```kotlin
    fun showPopupMenu(view: View) {
        val popup = PopupMenu(this, view)
        popup.setOnMenuItemClickListener(this)
        popup.inflate(R.menu.popup_menu)
        popup.show()

    }
```
To handle popup menu click listener and implement the operations to be done when a menu item is selected the below method is used.
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
4. Checkable Menus 

Checkable menus are frequently used in user interfaces to execute specific tasks, such as activating and deactivating features. For several executable actions, a check box or even a radio button can be used.

checkable menu can be designed as follow in the resource file with the all required properties.
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
`checkablebehaviour` 

is a property that can be used to indicate the check behavior and actions on checkable menu items. It can be specified in the following way.
- `all`  
This is used to demonstrate that all of the things may be selected, and a checkbox is used to facilitate this operation.
- `single`
This is used to show that just one item may be picked, and the radio button is used to do so.
- `none`
It is used to indicate no menu item is selected.

just like options menu checkable menus click listeners are also handled within the `onOptionsItemSelected` method and it is done as shown below
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
If a menu item is checked, it is first examined to see if it is checked, then unchecked so that the other may be checked using this code. `item.isChecked = !item.isChecked`

5. Intent-Based menus

In contrast to intent-based menus, other menus are created using a menu resource file or even source code. Menus based on intent are always dynamically added based on the application.

Within the checkable menu resource file add the following implementation which is used as the intent based menu item.
```XML
  <group android:id="@+id/intent_based">

    </group>
```
Then within the `nCreateOptionsMenu` method add the below implementation to integreat the intent based menu.
```kotlin
      //Intent based menu
      val  intent= Intent(android.content.Intent.ACTION_SEND)
        intent.setType("text/plain")
        intent.putExtra(android.content.Intent.EXTRA_TEXT,"Hello am intent based menu")

        menu!!.addIntentOptions(
            R.id.intent_based,
            0,
            0,
            this.componentName,
            null,
            intent,
            0,
            null
        )
```
### Design Guidelines and best practices for menus.
Based on the different types of menus there are design guidelines and best practices to be followed.
- The best place to issue a command.
Think of the command on how it performs its actions does it apply to specific selection or the entire activity
- Ordering of menu items.
When arranging menu items, place the actions that are always used often and first by the user first, such as open first and remove last.
- Discoverability of menu items
Don't position menu items where users can't readily access contextual or popup menus by long-pressing a specific item on the screen.
- First Context menu item.
The first context menu option should always be the pick of the most straightforward command, for example, open. 
- Identify selected items with a context menu.
This is always done with the help of popup or action mode in that one should take care of the item user-selected because if one does not, the user is likely to forget. Therefore, it is appropriate to identify the item selected to provide a context menu by doing so helps the user recall the action he was to conduct.
- Fix the most important commands
This is accomplished on the choices menu by placing an icon on the menu item to guarantee that it is always fixed and accessible to users. as show below
```xml
<item
            android:id="@+id/settings"
            android:icon="@drawable/ic_baseline_settings_24"
            android:title="Settings"
            app:showAsAction="always" />
```
### The types of menus explained above

#### Options menu
![demo](/engineering-education/understanding-different-types-of-menus-in-android-with-kotlin/options-menu.png)
#### popup menu
![demo](/engineering-education/understanding-different-types-of-menus-in-android-with-kotlin/popup-menu.png)
#### Action mode menu
![demo](/engineering-education/understanding-different-types-of-menus-in-android-with-kotlin/action-mode.png)
#### Checkable menu
![demo](/engineering-education/understanding-different-types-of-menus-in-android-with-kotlin/checkable.png)
#### Floating contextual menus
![demo](/engineering-education/understanding-different-types-of-menus-in-android-with-kotlin/floating-contextual.png)

### Conclusion
To wrap up the entire content covered in this article, we have learned what is menus as used in android, The different types of menus, the difference between menu types and design guidelines together with the best practices when handling menus, and get the full implementation on [github](https://github.com/benta-odek/MenusDemo.git).

### Reference
Don't lock the potential to explore more on [menus](https://developer.android.com/guide/topics/ui/menus).
