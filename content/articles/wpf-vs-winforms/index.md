---
layout: engineering-education
status: publish
published: true
url: /wpf-vs-winforms/
title: WPF vs WinForms
description: This article explains the differences between the Windows Presentation Foundation (WPF) and the Windows Forms (WinForms) graphical user interface builders.
author: alice-wangari
date: 2022-01-11T00:00:00-13:30
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/wpf-vs-winforms/hero.jpg
    alt: WPF vs WinForms
---
W.P.F stands for Windows Presentation Foundation and WinForms stands for Windows Forms Applications. Both these are Windows application graphical user interfaces that developers may use to construct Windows desktop programs.
<!--more-->
The objective of this article is to describe the fundamental distinctions between the two technologies for designing Windows desktop applications that might be more useful in today's systems development. To point out the differences between the two technologies, we will create a simple WinForms and WPF application to add two numbers.

### Prerequisites
- Some knowledge of C#.
- [Visual Studio](https://visualstudio.microsoft.com/) installed.

### Table of contents
- [What is WinForms?](#what-is-winforms)
- [Creating a WinForms application](#creating-a-winforms-application)
- [What is WPF?](#what-is-wpf)
- [Creating a WPF application](#creating-a-wpf-application)

### What is WinForms?
In February 2002, Microsoft announced WinForms as a GUI-based alternative to the .NET Framework. WinForms in general, enables a developer to drag and drop controls onto a Windows Form and modify these components using a code-behind file written in C#, VB.NET, or any other.NET language.

Because WinForms is a wrapper for a collection of C++ classes, each WinForms control is an instance of that class. Developers may quickly drag and drop controls from a toolbox in Microsoft's Visual Studio, making workarounds with WinForms simpler.

WinForms is a graphical library in the .NET framework that lets the developer build rich client applications with event-driven design. WinForms is a simple concatenation of Windows Forms Applications.
<!--  -->
### Creating a WinForms application
Assuming we have installed [Visual Studio](https://visualstudio.microsoft.com/), we can create a new project in the solution explorer by choosing the WinForms application from the list. You can change the name of the form as you desire. In our case, it will remain as `Form1.cs`. After creating the project, we can note that Visual Studio created the `Form1.cs` file and generated the `Program.cs` file:

![Visual Studio Window](/engineering-education/wpf-vs-winforms/visual-studio.png)

From our toolbox window, we can drag and drop a textbox, label, and a button:
![window-after buttons](/engineering-education/wpf-vs-winforms/add-window.png)

By double-clicking the add button, let's add the following code:

```csharp
private void button1_Click(object sender, EventArgs e)
{
    var y = Convert.ToInt32(textBox1.Text);
    var x = Convert.ToInt32(textBox2.Text);
    var z = y + x;
    textBox3.Text = z.ToString();
}
```

From the code above, we have declared two variables that take the two inputs, adds them, and display the result in a textbox. When taking inputs, we have to convert the string to an integer.

When we run the application, it prompts for two numbers and after clicking the add button, it displays the results:

![Results after adding two numbers](/engineering-education/wpf-vs-winforms/results.png)

Controls are readily employed in Windows Forms, making them easy to use but when designing is necessary, Windows forms should not be utilized. This is because the code for each event and procedure in WinForms, is firmly tied with the UI element. Even if you utilized the visual designer in WinForms, the designer extension component of your form had layout code created in the language of your choice (for example, C#, VB.NET, or C++). Without that code, you wouldn't be able to construct the form individually. This means that in order to create the UI, you have to be familiar with the language.
<!--  -->
### What is WPF?
After Microsoft introduced Windows Presentation Foundation (WPF) in 2007, which replaced Windows Form, the creation of desktop applications has altered considerably.

WPF is another graphical library developed by Microsoft. WPF allows developers to create event-driven rich client applications for usage on Windows desktop operating systems. It can be used to develop and design both **Windows applications and web applications** while WinForms can only be used to develop and design **Windows applications**.

XAML (Extensible Application Markup Language) is used by WPF to define the user interface of a WPF application. It is a declarative language that describes the UI of a WPF application.

In WPF, the user interface and the code can be created and organised separately. The UI in WPF is based on XAML, which is extensible and allows you to design a specific UI without knowing whether it will be written in C# or VB.NET. As a result, the full UI design can (but is not required) be completed by someone who is unfamiliar with the programming language to be used.

WPF comes with support for a wide range of video formats, records, 3D material, and a lot of built-in animation while WinForms does not offer much rich, interactive, animated, hardware accelerated, vector 2D, and 3D capabilities as compared to WPF.

### Creating a WPF application
Let's start by creating a new project in the solution explorer. Here, we shall choose WPF from the list. Visual Studio creates two XAML files `(App.xaml` and `MainWindow.xaml`) and two corresponding C# files (`App.xaml.cs` and `MainWindow.xaml.cs`) for you:

![creating wpf project](/engineering-education/wpf-vs-winforms/wpf-window.png)

The layout of a WPF application is shown above, with the XAML file beside the Designer. There is a distinction between WinForms and WPF here: WPF utilizes XAML to define a WPF application's user interface while WinForms provides access to the native windows library of common controls.

Note that we can manually add a textbox, label, and button to the associated XAML file. For example, we can add a button in WPF using the following code in the `MainWindow.xaml` file:

```xml
<Window x:Class="addingTwoNumbers.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:addingTwoNumbers"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <Grid HorizontalAlignment="Left" Width="815">
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="0*"/>
            <ColumnDefinition/>
        </Grid.ColumnDefinitions>
        <Button x:Name = "add_click" Content="Add" HorizontalAlignment="Left" Margin="254,217,0,0" VerticalAlignment="Top" Height="35" Width="92" Grid.ColumnSpan="2"/>
    </Grid>
</Window>
```

In reality, we can also drag and drop controls into the designer window. The relevant XAML file will be updated as well. Let's add a textbox, a label, and a button to the XAML file:

```xml
<Window x:Class="addingTwoNumbers.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:addingTwoNumbers"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <Grid HorizontalAlignment="Left" Width="815">
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="0*"/>
            <ColumnDefinition/>
        </Grid.ColumnDefinitions>
        <TextBox x:Name = "firstnumber" HorizontalAlignment="Left" Margin="200,113,0,0" TextWrapping="Wrap" VerticalAlignment="Top" Width="200" Height="34" Grid.ColumnSpan="2"/>
        <TextBox x:Name = "secondnumber" HorizontalAlignment="Left" Margin="200,168,0,0" TextWrapping="Wrap" VerticalAlignment="Top" Width="200" Height="34" Grid.ColumnSpan="2"/>
        <Button x:Name = "add_click" Content="Add" HorizontalAlignment="Left" Margin="254,217,0,0" VerticalAlignment="Top" Height="35" Width="92" Grid.ColumnSpan="2"/>
        <Label Content="First number" HorizontalAlignment="Left" Margin="104,121,0,0" VerticalAlignment="Top" Grid.ColumnSpan="2"/>
        <Label Content="Second Number" HorizontalAlignment="Left" Margin="104,168,0,0" VerticalAlignment="Top" RenderTransformOrigin="0.492,2.809" Grid.ColumnSpan="2"/>
        <TextBox x:Name = "result" HorizontalAlignment="Left" Margin="200,293,0,0" Text="Results" TextWrapping="Wrap" VerticalAlignment="Top" Width="200" Height="34" Grid.ColumnSpan="2"/>
    </Grid>
</Window>
```

In WPF, XAML makes it easy to create and edit your GUI and allows the work to be split between a designer (XAML) and a program (C#) unlike in WinForms where the design and the program are not separeted.

In WPF, we have to add a click event handler to the button while in WinForms, it is not required. Read more about the click event handler [here](https://www.tutorialspoint.com/xaml/xaml_event_handling.htm).
<!--  -->

When the user selects the add button, the sum of the values supplied by the user in the top two TextBox controls should be shown in the third TextBox control.

Add the following code to the button event handler:

```cs
using System.Windows;
namespace addingTwoNumbers
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        private void add_click(object sender, RoutedEventArgs e)
        {
            int results = Int32.Parse(firstnumber.Text) + Int32.Parse(secondnumber.Text);
            result.Text = results.ToString();
        }
    }
}
```

![after adding two numbers in wpf](/engineering-education/wpf-vs-winforms/wpf-add.png)

Unlike WinForms, WPF is primarily used to create an application's user interface (UI), and it includes security capabilities.

### Conclusion
In this tutorial, we have learned the major differences between WinForms and WPF by creating a simple application in both instances. Improved graphical user interfaces, animation, 2D and 3D visualization capabilities, web application compatibility, faster acceleration, and cross-platform support are all characteristics of WPF over Winforms.

WPF is the most common development platform for native Windows programs, thus you should use it if you're making new applications.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
