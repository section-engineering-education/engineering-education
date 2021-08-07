The WPF menu, also referred to as the main menu because only one generally exists in the program, is one of the most common elements of a Windows application. The menu is useful because it provides a lot of options in a little amount of space, and while Microsoft is promoting the Ribbon as a solution for the good old menu and toolbars, they still have a place in any competent developer's toolbox.

The menu is a nice control that comes with WPF for constructing menus. It's quite easy to add things to it; simply add MenuItem components to it, and each MenuItem can have many sub-items, enabling you to construct hierarchical menus similar to those seen in many Windows applications.

### Prerequisites
1. [Visual studio 2019](https://visualstudio.microsoft.com/downloads/)
2. Basic knowledge of the WPF

### Table of contents
- [Creating a WPF application project](#creating-a-wpf-application-project)
- [Creating a WPF Menu](#creating-a-wpf-menu)
- [Setting WPF Menu control properties](#setting-wpf-menu-control-properties)
- [Adding WPF Menu items](#adding-wpf-menu-items)
- [Adding icons and checkboxes to the MenuItem](#adding-icons-and-checkboxes-to-the-menuitem)
- [Adding an event handler to a MenuItem](#adding-an-event-handler-to-a-menuitem)
- [Creating a WPF Menu control at run-time](#creating-a-wpf-menu-control-at-run-time)

### Creating a WPF application project
Open your Visual Studio 2019 and search for WPF Application:

![wpf application](/engineering-education/wpf-menus/wpf-application.png)

Click **next** and name your project.

### Creating a WPF Menu
In XAML, we use the `Menu` element to create a Menu control. The Menu control displays a list of elements that define an application's commands or preferences:

```cs
<Menu Name="myMenu" Height="25" Width="250" />
```
The height and width properties are used to adjust the height and width of the menu respectively while the name property is used to give the menu a name.

Our menu is located at the centre of the application by defalt but we can position it into our own desired position. Here, we shall use the margin, verticle and horizontal alignment to set the menu where we want. We shall use background property to set the background color of our menu:

```cs
<Menu Name="myMenu" Height="25" Width="250" Margin="5, 5" VerticalAlignment="Top" HorizontalAlignment="left" Background="green">
</Menu>
```
### Setting WPF Menu control properties
There are three ways to customize the attributes of a menu control. You may utilize the Properties windows, manually set properties in XAML, or use WPF code to set properties at runtime.

Let's look at how to set the properties using the Properties window:

![Set Properties](/engineering-education/wpf-menus/setProperties.png)

From the image above, we can see that we can set all the properties of a Menu control through the Properties window. For example, we can modify the width of the menu, height, margin, background color, and so on.  

If we change some properties in the Properties window, the XAML file changes automatically. 

Let's alter the text property by adding the `FontFamily` and the `FontSize` in the Properties window. As we can see the XAML file changed to:

```cs
 <Menu Name="myMenu" Height="25" Width="250" Margin="5, 5" VerticalAlignment="Top" HorizontalAlignment="left" Background="green" FontFamily="Century Gothic" FontSize="14">
    </Menu>
```

### Adding WPF Menu items
A menu item is simply what we add to our menu as a heading. When you click a MenuItem, it usually opens a sub-menu or prompts a program to execute a command.

### Syntax

```cs
<MenuItem Header="Name of the Menu Item" />
```

A menu item is added to the main menu using the `MenuItem` element. A MenuItem can contain additional MenuItem elements as sub menus and can have many layers. The code below creates three sub menu items from the initial menu item:

```cs
<MenuItem Header="Account">
            <MenuItem Header="Deposit" />
            <MenuItem Header="Withdraw" />
            <MenuItem Header="Send" />
        </MenuItem>
```
We shall have an output that looks like this:

![Menu Items](/engineering-education/wpf-menus/menuItem.png)

Incase we have different categories of sub-menu items, we use  `<Separator/>` element to seperate the two categories:

```cs
<Separator/>
<MenuItem Header="Savings">
</MenuItem>
```

We can still add more sub menu items to our sub menus as shown below:

```cs
<Separator/>
<MenuItem Header="Savings">
    <MenuItem Header="Current Account"/>
    <MenuItem Header="Fixed Account">
     </MenuItem>
</MenuItem>
```
We shall have an output that looks like this:

![Sub Menu Items](/engineering-education/wpf-menus/SubMenuItems.png)

### Adding icons and checkboxes to the MenuItem
Menu icons are important in identifying menu items easily. It saves time to spot an item and know what it does. Checkboxes, on the other hand, can toggle some features of the menu items on and off.

Let's look at an example of how to add an Icon and checkboxes:

```cs
<MenuItem Header="Account">
    <MenuItem Header="Deposit" IsCheckable="true"/>
        <MenuItem.Icon>
            <Image Source="../image-location/image.png" />
            </MenuItem.Icon>
            </MenuItem>
        <MenuItem Header="Withdraw" IsCheckable="true"/>
    <MenuItem Header="Send" IsCheckable="true"/>
</MenuItem>
```

From the code above, the `Icon` property helps us to add an icon to our menu item. The `IsCheckable` property is used to check if the item is checked and it checks if it is unchecked. We can use the `IsChecked` property to check our item by default.

### Adding an Event Handler to a MenuItem
The event handler "listens" to the elements and responds when they're clicked. For example, we can add a Click event to show a certain message when a certain menu item is clicked:

```cs
private void myMenu_Click(object sender, EventArgs e)   
{  
    MessageBox.Show("You have clicked a menu item");  
}
```
From the code above, the message is displayed when the user clicks the menu item.

### Creating a WPF Menu control at run-time
In this section, we first create an instance of a class called Menu:
```cs
Menu myMenu = new Menu();
```

We can now add the properties of the menu:

``` 
myMenu.Height = 25;  
myMenu.Width = 250;
myMenu.Background = Green; 
```
To add MenuItem, we need to create an instance of a class called MenuItem:

```cs
MenuItem myItem = new MenuItem();  
```
We can now add the properties of the MenuItem as shown in the code below:

```cs
myItem.Width = 50;  
myItem.Header = "Item1";  
myMenu.Items.Add(myItem); //it adds the menu Item to the Main Menu
```

### Conclusion
In this article, we looked at how to construct menus in a WPF application using the `Menu` and `MenuItem` controls. We have also looked at how to set the menu properties, adding icons and checkboxes, and adding menu items.
