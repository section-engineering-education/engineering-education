### Introduction
Windows Presentation Foundation (WPF) and Windows Forms Applications (WinForms) are two terms that are often used interchangeably. In this article, we will discuss the differences between the two technologies and how they can be used to create a more robust and powerful application.

We will create a simple WinForms and WPF application to add two numbers. We will use it to point out the differences between the two techniques.

### Prerequisites
- Basic knowledge of WPF and WinForms.
- Basic knowledge of C#.
- [Visual Studio](https://visualstudio.microsoft.com/) installed.

### Table of contents
- [Creating a WinForms application](#creating-a-winforms-application)
- [What is WPF](#what-is-wpf)
- [Creating a WPF application](#creating-a-wpf-application)


### What is WinForms
WinForms is a graphical library in the .Net framework that lets the developer build rich client applications with the event-driven design that can be used on Windows desktop operating systems.

### Creating a WinForms Application
Assuming we have installed [Visual Studio](https://visualstudio.microsoft.com/), we can create a new project in the solution explorer by choosing the WinForms application from the list. You can change the name of the form as you desire. In our case, it will remain as `Form1.cs`. After creating the project, we can note that Visual Studio created the `Form1.cs` file and generated `Program.cs` file:

![Visual Studio Window](/engineering-education/wpf-vs-winforms/visual-studio.png)

From our toolbox window, we can drag and drop a textbox, label, and a button:
![window-after buttons](/engineering-education/wpf-vs-winforms/add-window.png)

By double-clicking the add button, let's add the following code:
```cs
//code to add to the add button
private void button1_Click(object sender, EventArgs e)
{
    var y = Convert.ToInt32(textBox1.Text);
    var x = Convert.ToInt32(textBox2.Text);
    var z = y + x;
    textBox3.Text = z.ToString();
}
```
From the above code, we have declared two vaiables that take the two inputs, adds the two numbers and displays the result in a textbox.

When we run the application, it prompts for two numbers and after clicking the add button, it displays the results.

![Results after adding two numbers](/engineering-education/wpf-vs-winforms/results.png)

Controls are readily employed in Windows forms, making them easy to use but when designing is necessary, Windows forms should not be utilized.

### What is WPF
WPF (Windows Presentation Foundation) is a graphical library developed by Microsoft. WPF allows developers to create event-driven rich client applications for usage on Windows desktop operating systems. It can be used to develop and design both windows applications and web applications while WinForms can only be used to develop and design windows applications.  

WPF uses XAML (Extensible Application Markup Language) to design a WPF application's user interface. It is a declarative language that describes the user interface of a WPF application. 

### Creating WPF application
Let's start by creating a new project in the solution explorer. Here, we shall choose WPF from the list. Visual Studio creates two XAML files (App.xaml and MainWindow.xaml) and two corresponding C# files (App.xaml.cs and MainWindow.xaml.cs) for you:

![creating wpf project](/engineering-education/wpf-vs-winforms/wpf-window.png)

Note that we can manually add a textbox, label, and button to the associated XAML file. For example, we can add a textbox, label and button in WPF by using the following code in the `MainWindow.xaml` file:

```xml
<Window>
        <TextBox x:Name = "firstnumber" HorizontalAlignment="Left" Margin="200,113,0,0" TextWrapping="Wrap" VerticalAlignment="Top" Width="200" Height="34" Grid.ColumnSpan="2"/>
        <TextBox x:Name = "secondnumber" HorizontalAlignment="Left" Margin="200,168,0,0" TextWrapping="Wrap" VerticalAlignment="Top" Width="200" Height="34" Grid.ColumnSpan="2"/>
        <Button x:Name = "add_click" Content="Add" HorizontalAlignment="Left" Margin="254,217,0,0" VerticalAlignment="Top" Height="35" Width="92" Grid.ColumnSpan="2"/>
        <Label Content="First number" HorizontalAlignment="Left" Margin="104,121,0,0" VerticalAlignment="Top" Grid.ColumnSpan="2"/>
        <Label Content="Second Number" HorizontalAlignment="Left" Margin="104,168,0,0" VerticalAlignment="Top" RenderTransformOrigin="0.492,2.809" Grid.ColumnSpan="2"/>
        <TextBox x:Name = "result" HorizontalAlignment="Left" Margin="200,293,0,0" Text="Results" TextWrapping="Wrap" VerticalAlignment="Top" Width="200" Height="34" Grid.ColumnSpan="2"/>
</Window>
```

 In reality, we can also drag and drop controls into the designer window, the relevant XAML file is changed as well. Let's add a textbox, label, and button to the XAML file:

```xml
<Window>
        <TextBox x:Name = "firstnumber" HorizontalAlignment="Left" Margin="200,113,0,0" TextWrapping="Wrap" VerticalAlignment="Top" Width="200" Height="34" Grid.ColumnSpan="2"/>
        <TextBox x:Name = "secondnumber" HorizontalAlignment="Left" Margin="200,168,0,0" TextWrapping="Wrap" VerticalAlignment="Top" Width="200" Height="34" Grid.ColumnSpan="2"/>
        <Button x:Name = "add_click" Content="Add" HorizontalAlignment="Left" Margin="254,217,0,0" VerticalAlignment="Top" Height="35" Width="92" Grid.ColumnSpan="2"/>
        <Label Content="First number" HorizontalAlignment="Left" Margin="104,121,0,0" VerticalAlignment="Top" Grid.ColumnSpan="2"/>
        <Label Content="Second Number" HorizontalAlignment="Left" Margin="104,168,0,0" VerticalAlignment="Top" RenderTransformOrigin="0.492,2.809" Grid.ColumnSpan="2"/>
        <TextBox x:Name = "result" HorizontalAlignment="Left" Margin="200,293,0,0" Text="Results" TextWrapping="Wrap" VerticalAlignment="Top" Width="200" Height="34" Grid.ColumnSpan="2"/>
</Window>
```

In WPF, we have to add a click event handler to the button while in WinForms, it is not required. Read more about the click event handler [here](https://www.tutorialspoint.com/xaml/xaml_event_handling.htm).

When the user selects the add button, the sum of the values supplied by the user in the top two TextBox controls should be shown in the third TextBox control.

Add the following code to the button event handler:

```cs
//code to add to the add button
int results = Int32.Parse(firstnumber.Text) + Int32.Parse(secondnumber.Text);
result.Text = results.ToString();
```

![after adding two numbers in wpf](/engineering-education/wpf-vs-winforms/wpf-add.png)

Unlike WinForms, WPF is primarily used to create an application's user interface (UI), and it includes security capabilities.

### Conclusion
In this article, We covered the fundamental differences between WinForms and WPF in this course by constructing a basic application in each. WPF has a number of advantages over Winforms, including improved graphical user interfaces, animation, 2D and 3D visualization capabilities, Web application compatibility, quicker acceleration, and cross-platform support.
