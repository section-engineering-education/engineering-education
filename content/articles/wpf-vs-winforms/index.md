### Introduction
W.P.F stands for Windows Presentation Foundation, and WinForms stands for Windows Forms Applications concatenated together. Both are Windows Application Graphical User Interfaces that developers may use to construct Windows desktop programs.

The objective of this article is to describe the fundamental distinctions between the two techniques to designing Windows desktop applications that might be more useful in today's systems development. We will create a simple WinForms and WPF application to add two numbers and we will use it to point out the differences between the two techniques.

### Prerequisites
- Basic knowledge of WPF and WinForms
- Basic knowledge of C#
- [Visual Studio](https://visualstudio.microsoft.com/) 

### Table of contents
- [What is WinForms](#what-is-winforms)
- [Creating a WinForms application](#creating-a-winforms-application)
- [What is WPF](#what-is-wpf)
- [Creating a WPF application](#creating-a-wpf-application)


### What is WinForms
In February 2002, Microsoft announced WinForms as a GUI-based alternative to the.Net Framework. WinForms, in general, enables a developer to drag and drop controls onto a Windows Form and modify these components using a code-behind file written in C#, VB.NET, or any other.NET language. Because WinForms is a wrapper for a collection of C++ classes, each WinForms control is an instance of that class. Developers may quickly drag and drop controls from a Toolbox in Microsoft's Visual Studio, making workarounds with WinForms simpler.

WinForms is a graphical library in the .Net framework that lets the developer build rich client applications with the event-driven design that can be used on Windows desktop operating systems. It is a simple concatenation of Windows Forms Applications.

### Creating a WinForms Application
Assuming we have installed [Visual Studio](https://visualstudio.microsoft.com/), we can create a new project in the solution explorer by choosing the WinForms application from the list. After creating the project, we can note that Visual Studio generated the `Form1.cs` file and `Program.cs` file:

![Visual Studio Window](/engineering-education/wpf-vs-winforms/visual-studio.png)

From our toolbox window, we can drag and drop a textbox, label, and a button:
![window-after buttons](/engineering-education/wpf-vs-winforms/add-window.png)

By double-clicking the add button, let's add the following code:
```cs
using System;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        //code to add to the add button
        private void button1_Click(object sender, EventArgs e)
        {
           var y = Convert.ToInt32(textBox1.Text);
           var x = Convert.ToInt32(textBox2.Text);
           var z = y + x;
            textBox3.Text = z.ToString();
        }
    }
}

```
From the above code, we have added a button that adds two numbers and displays the result in a textbox.

When we run the application, it prompts for two numbers and after clicking the add button, it displays the results.

![Results after adding two numbers](/engineering-education/wpf-vs-winforms/results.png)

Controls are readily employed in Windows forms, making them easy to use but when designing is necessary, Windows forms should not be utilized.

### What is WPF
The development of desktop applications has changed dramatically after Microsoft released Windows Presentation Foundation (WPF) in 2007 replacing Windows Form.

Windows Presentation Foundation (WPF) is a graphical library in the .Net framework that lets the developer build rich client applications with the event-driven design that can be used on Windows desktop operating systems.

WPF makes use of XAML (Extensible Application Markup Language), which is utilized to define a WPF application's user interface. It is a declarative language that describes the user interface of a WPF application. 

WPF comes with a wide range of video formats, records, 3D material, and a lot of built-in animation.

### Creating WPF application
Let's start by creating a new project in Solution Explorer. Here, we shall choose WPF from the list. Visual Studio creates two XAML files (App.xaml and MainWindow.xaml) and two corresponding C# files (App.xaml.cs and MainWindow.xaml.cs) for you:

![creating wpf project](/engineering-education/wpf-vs-winforms/wpf-window.png)

The layout of a WPF application is seen above, with the XAML file beside the Designer. There is a distinction between WinForms and WPF here: WPF utilizes XAML to define a WPF application's user interface.

Note that we manually add a textbox, label, and button to the associated XAML file. In reality, we can also drag and drop controls into the designer window, the relevant XAML file is changed as well. If you open the MainWindow.xaml file's code now. The following markup will appear:


```xml
<Window 
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
Unlike Winforms, here, we can add or change the attributes like height, width, and much more of the textbox, label, and button.

In WPF, we have to add a click event handler to the button. Read more about the click event handler [here](https://www.tutorialspoint.com/xaml/xaml_event_handling.htm).

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
In this tutorial, we have learned the major differences between WinForms and WPF by creating a simple application in both instances. Improved graphical user interfaces, animation, 2D and 3D visualization capabilities, Web application compatibility, faster acceleration, and cross-platform support are all characteristics of WPF over Winforms.


WPF is the most common development platform for native window programs, thus you should use it if you're making a new applications.