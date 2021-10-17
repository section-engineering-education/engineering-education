### Introduction.
You may either utilize PyQt's Qt Designer or write your own GUI in Python. You have two choices: either improve your productivity significantly, or get full control over the source code of the program.

A main window and a number of dialog boxes are common features of graphical user interface (GUI) apps. Use Qt Designer to quickly and simply design these graphical components. 

### The following are the objectives:
- Installation of Qt Designer.
- Whenever feasible, utilize Qt Designer instead of hand-coding.
- How to create a main window GUI with Qt Designer.

### Qt Designer Overview
Qt Designer is a WYSIWYG editor for PyQt GUIs. Just put QWidget components into blank forms to create a user interface. To create a unified user interface, you may then utilize a variety of GUI designing tools.

Testing your user interface across resolutions, styles, etc. is easy using Qt Designer.

Qt Designer runs on all platforms and languages. It produces rather than generates code. UIFiles: You'll need these XML files to create Qt-based user interfaces.

PyQt has a command-line utility named pyuic5 for converting files quickly and easily.

Files from the user interface are converted to Python code. The Python code may be used in GUI apps. UI files can be imported into your GUI rather than read.

#### Qt Designer Installation and Use
When it comes to installing Qt Designer, it all comes down to what kind of platform you're running and how you want to get it. Run the following commands from the terminal on Windows or Linux:

```bash
$ python3 -m venv ./venv
$ source venv/bin/activate
(venv) $ pip install pyqt5 pyqt5-tools
```
Install pyqt5-tools after activating your Python virtual environment. pyqt5-tools also includes Qt Designer, which is part of the Qt Tools distribution.

On Debian and Ubuntu systems, use the system package manager and the command: to install Qt Designer.

```bash
sudo apt install qttools5-dev-tools
```

After executing this command, you'll be asked for your administrator password. Clicking on the Qt Designer icon in your file manager or system menu will open it.

To use Qt Designer, you must first install it using one of the aforementioned ways. After the installation, you will see two windows:

![Output](/engineering-education/using-qt-designer-and-python-to-create-main-windows/output.png)

The main window now has a shortcut to Qt Designer's New Form dialog. The primary Qt Designer window is in the distance. 

#### Using the New Form Dialog in Qt Designer
After starting Qt Designer, a New Form dialog will display. This dialog box has five distinct GUI templates. Everything you need to get started is included in the package. Widget, Main Window, Dialog with Buttons Bottom, Dialog without Buttons and Dialog with Buttons Right are some examples of these templates.

When Qt Designer is started, the New Form dialog appears automatically. Select New from the toolbar in Qt Designer. You may also use the main menu's File New or Ctrl+N.

Use the New Form dialog box's templates to get started, then click Create to finish.

To build a new form, choose a Qt Designer template from the New Form menu and press Create or Alt+R.

Toggle between the predefined buttons in the first two dialog forms. QDialogButtonBox's default buttons. This class keeps your buttons in the same order across platforms.

On Linux and macOS, Cancel and OK are in the same sequence. On Windows, the button sequence is reversed, so OK comes first, followed by Cancel.

### Using the Main Window of Qt Designer
To store and manage forms, change forms, layout and preview forms, tweak app settings and access help documentation.

The main window features a toolbar with frequently used options. Almost all of these options are useful when altering your form's layout. These options are in the main menu in the File, Edit, and Form menus.

The primary Qt Designer window contains many dock windows, each with its own set of tools.

- Object Inspector
- Property Editor
- Widget Box
- Signal/Slot Editor
- Resource Browser
- Action Editor

Layout managers, spacers, standard widgets, and other items are available in the Widget Box.

The Box window has a filter on top. The search box allows you to easily locate a widget or item by entering its name into the search bar.

Drag and drop widgets from the Widget Box into a form to begin configuring the graphical user interface.

For input devices, Box provides a Scratchpad at the bottom of the window. This category has a part dedicated to helpful items that may be sorted by kind or function. You may drag and drop widgets from the Widget Box onto the Scratchpad. For removal, right-click the Scratchpad widget and select Remove.

Object Inspector navigation by tree. Object Inspector's search filter box lets you discover objects quickly. It can edit the form's name and other components. Right-clicking a widget offers the following options:

Property Editor dock window in Qt Designer main window. Here, a two-column table displays the selected item's attributes and values. It changes an object's value for any number of attributes.

Three tab-shaped dock windows appear in the lower right of your screen.

Access icon, translation, picture and other binary assets in Resource Browser.

To create actions, use the Action Editor tool.

Utilize the Signal/Slot Editor to connect signals and slots.

### A simple demo to creating main windows using Python and Qt Designer
PyQt employs standard window and dialog layouts for desktop programs. In addition, there's a status bar at the top and a navigation bar.

This template lets you create a main window GUI rapidly. Use the default template to create a form and then:

- Creating the main menu
- Adding and populating toolbars
- Laying out widgets

![UI file](/engineering-education/using-qt-designer-and-python-to-create-main-windows/ui-file.png)

Qt Designer saves forms as.UI files. To rebuild your application's GUI, you'll require XML files (GUI).

If you're building the main window from scratch, keep Qt Designer open.

### Build the Main Menu
Main Window template of Qt Designer may be modified. The Menu Editor may extend the main menu bar. In applications, drop-down menus are usually lists of alternatives. Open Qt Designer and the new window you created. Type Start typing in the form's menu bar.

Enter your first menu item's name. To verify you've input the correct menu name, just press Enter. The picture below demonstrates how the process is carried out.

> For example, hitting Alt+F after inserting an ampersand before the F will bring up the File menu. You may reach the New option by pressing N after the File menu has been opened if you place a & before the N in New.

A menu choice may have a submenu. Choose Open Recent from the menu and then click Create Submenu. This adds a submenu to the Open Recent menu.

Before submitting your form, use Form Preview or Ctrl+R to preview it.

When your text editor creates a new menu, like the File menu, it creates a QMenu object. Making a menu option creates an action. It allows users to create, edit, and manage activities. The tool's capabilities allow you to fine-tune your actions:

![Action Editor](/engineering-education/using-qt-designer-and-python-to-create-main-windows/tools.png)

The Action Editor allows fine-tuning or altering the following settings:

- The description of the action that appears in the toolbar and on the menu
This name will be used to refer to the action object in your code.
- These symbols will appear in your programs' menus and toolbars.
- The attribute of the action may be verified.
Use of keyboard shortcuts will make things simpler for the user.



![Main menu](/engineering-education/using-qt-designer-and-python-to-create-main-windows/menu.png)

Some options are shortened by adding an ellipsis (...) at the end of their name if they don't take immediate action, but instead create a pop-up window where you may perform further actions.

If icons are not provided in your application as distinct files, a.qrc files (resources files) will be generated. Visit the following website and save the icons and other resources you'll need for this example to your computer: The source codes may be downloaded by clicking [here](https://realpython.com/bonus/qt-designer-code/).

Resources directories are where you'll find the icons if you're using the default settings in your main window.

a user interface (UI) file Repent and then add this symbol to each of your actions: Once again, we find ourselves in the middle of the Action Editor.

![Adding icons to the action bar](/engineering-education/using-qt-designer-and-python-to-create-main-windows/icons.png)

Add another menu, such as the 'Edit menu' or other menus for layout, by following the same process.

#### Building the toolbar
It is possible to add many toolbars to Qt Designer's main window. Right-click the form and choose Add Toolbar. The top toolbar is gone. Select Add Tool Bar to Another Location: to move the toolbar. Plan your workspace and toolbar placement.

Once established, the toolbar can be expanded. Actions replace Widget Box toolbar buttons here. Simple to use Action Editor to add actions to toolbars.

![Populating tools bars](/engineering-education/using-qt-designer-and-python-to-create-main-windows/tool-bar.png)

To reuse actions generated when filling menus, just drag & drop them into the toolbar. Add actions to the toolbar by dragging them from the Action Editor. Right-click the toolbar and select Add Separators from the pop-up menu.

#### Setting up widgets on the screen
Qt Designer makes use of QMainWindow to build a Main Window template from scratch. This class can build a status bar, menu bar, toolbar, and dock widget in a few lines of code. On the Main Window template, Qt Designer produces a QWidget object.

Use it as the main widget on the GUI for the main window if you wish to stack one or more QWidget objects.

Use a single widget in your text editor so users can enter, copy, paste, and update information easily. A QTextEdit widget's layout may be used to add a vertical (or horizontal) layout.

Your primary window's core widget may be a collection of widgets in a specific arrangement. Create your own widget arrangement and use it as the template's top-level layout, which has a QWidget object as its center widget.

As illustrated above, Qt Designer's layout managers let you arrange your widgets. Following these steps will allow you to build a compound widget layout for your main window's GUI:

- To organize the widgets on your form, just drag & drop them from one location to another.
- Make a decision on which widgets go in which arrangement.
- To apply layouts, utilize Qt Designer's toolbar, main menu, or context menu.

### Conclusion
PyQt programs often have a primary window and many dialog boxes. Handwriting the GUI will take a long time to build these panels and dialogs. Qt's instance of Qt Designer, a powerful tool for swiftly building GUIs with a user-friendly graphical interface, enables this.

Qt Designer lets you quickly create a GUI by dragging widgets into an empty form. The GUIs are in this

Happy coding!






