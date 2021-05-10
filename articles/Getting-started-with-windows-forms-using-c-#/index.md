---
layout: engineering-education
status: publish
published: true
url: /engineering-education/getting-started-with-windows-forms-using-c-sharp/
title: Getting Started with Windows Forms Using C#
description: This tutorial will go over the basics of Windows forms using C# and Visual Studio. We will create a basic calculator using windows forms. 
author: mohamed-alghadban
date: 2020-12-29T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-windows-forms-using-c-sharp/hero.jpg
    alt: Windows Forms C# example image 
---
Windows forms allow the programmers to create a graphical user interface (GUI) that allows the user to interact with the program visually. According to [Microsoft](https://docs.microsoft.com/en-us/dotnet/desktop/winforms/overview/?view=netdesktop-5.0), it provides one of the most productive ways to create desktop apps based on the visual designer provided in Visual Studio.
<!--more-->
Functionality like the drag-and-drop placement of controls makes it easier for the programmers to build the GUI.

With *windows forms*, you can make basic applications, from a simple calculator to high-level applications such as a library database management application that requires a database connection.

### Prerequisites
Before we begin it would help the you as the reader to have the following:
- A basic understanding of C# programming language.
- Visual studio installed on your system.

If you don't have Visual Studio installed on your computer, you can check this article on how to set up the C# environment in Visual Studio [here](https://www.geeksforgeeks.org/setting-environment-c-sharp/).

### Make a new project
In this tutorial, we will make a simple calculator. We can start by opening a new project in Visual Studio, click on File -> New -> Project -> Visual C# -> Windows desktop and choose Windows Forms App (.NET Framework).

### ToolBox
The *Toolbox* window provides you with all the controls that will help you build the form. To display the Toolbox click on View -> Toolbox, or you can press Ctrl+Alt+X. To use one of the controls double click on one of them or simply drag and drop it.

### Properties window
The *Properties* window is used to edit the properties of the form or the control (button, textbox, etc.) that you click on. To open the properties window, you can click on View -> Properties window or you can simply click F4.   

![properties_window_and_toolbox](/engineering-education/getting-started-with-windows-forms-using-c-sharp/properties_window_and_toolbox.png)

### Building the form with the controls
First of all, let's start with the form and change the text to My calculator and the name to Cal_Form using the properties window.

**Note**: Changing the name of a control or the form will only change the name of the object inside the code. This will make it easier to figure out which button or which textbox you are using or editing at that moment. On the other hand, changing the text of a control will only change what is displayed to the user.

![Form_name_text](/engineering-education/getting-started-with-windows-forms-using-c-sharp/Form_name_text.png)

Now let's begin by adding the numbers and the operations as buttons. Then we will add the textbox that will show the answer. To add a control, you can drag & drop it from the toolbox to the form or simply double click on it. Repeat this with the remaining controls.

![Controls_display](/engineering-education/getting-started-with-windows-forms-using-c-sharp/Controls_display.png)

The following table will show you the text & the name of all the controls.

| Text | Name |
| ---- | ---- |
|   0  | Num0 |
|   1  | Num1 |
|   2  | Num2 |
|   3  | Num3 |
|   C  | Cbut |
|   .  | Dot  |
|   *  | Multi|
|   /  | Div  |
|   +  | Sum  |
|   -  | Minus|
| Pow 2| Pow  |
| Sqrt | Sqrt |
|Calculate|Calculate|
|TextBox (empty)|Output|

This is how the form should look like after adding all the controls.

![First_look1](/engineering-education/getting-started-with-windows-forms-using-c-sharp/First_look1.png).

### Let's start coding

Let's start with the numbers. When you click a button, the value of the button must get appended to the text box's value, that we will use later for calculating. 

**Note**: You have to double click on each control to start coding inside its method. Do this with all the following controls.

```c#
private void Num0_Click(object sender, EventArgs e)
{
    Output.Text += "0";
}
private void Num1_Click(object sender, EventArgs e)
{
    Output.Text += "1";
}
private void Num2_Click(object sender, EventArgs e)
{
    Output.Text += "2";
}
private void Num3_Click(object sender, EventArgs e)
{
    Output.Text += "3";
}
```

Repeat this step with all the buttons that produce numbers.

Now, for the dot, we should handle the case of multiple dots inside the method. To fix this problem, we should check the `Output.Text` for a dot at the end. If it has a dot already. we will prevent the user from adding another dot. If not, we can add a dot to the text.

```c#
private void Dot_Click(object sender, EventArgs e)
{
    string w = Output.Text.ToString();
    int len= w.Length;
    if (Output.Text[--len] != '.')
    {
        Output.Text += ".";
    }
}
```

To clear the `Output.Text` we simply set the output to an empty string.

```c#
private void Cbut_Click(object sender, EventArgs e)
{
    Output.Text="";
}
```

Now let's move to the operations.

```c#
private void Sum_Click(object sender, EventArgs e)
{
    Output.Text += "+";
}
private void Minus_Click(object sender, EventArgs e)
{
    Output.Text += "-";
}
private void Multi_Click(object sender, EventArgs e)
{
    Output.Text += "*";
}
private void Div_Click(object sender, EventArgs e)
{
    Output.Text += "/";
}
```

Let's deal with the `Sqrt()` & the `Pow()` methods. We will also use the `try` & `catch` blocks to prevent the user from doing any invalid operations.

**Note:** In order to use the Pow & Sqrt methods you need to import the Math class as follows `using static System.Math;`.

```c#
 private void Sqrt_Click(object sender, EventArgs e)
{              
    try
    {
        double ans = Sqrt(Double.Parse(Output.Text));
        Output.Text = ans.ToString();
    }
    catch(Exception E)
    {
        MessageBox.Show(E.Message);
    }

}

private void Pow_Click(object sender, EventArgs e)
{
    try
    {
        double ans = Pow(Double.Parse(Output.Text), 2);
        Output.Text = ans.ToString();
    }
    catch (Exception E)
    {
        MessageBox.Show(E.Message);
    }
}
```

Finally, we will work on the calculate button to evaluate the string expression and check for invalid operations or inputs.

```c#
 private void Calculate_Click(object sender, EventArgs e)
{
    try
    {
        DataTable Calc = new DataTable();
        var ans = Calc.Compute(Output.Text, "");
        Output.Text = ans.ToString();
    }
    catch (Exception E)
    {
        MessageBox.Show(E.Message);
    }
}
```

### Final touches
Let's change some colors and fonts using the properties window.

![Final_touch_example](/engineering-education/getting-started-with-windows-forms-using-c-sharp/Final_touch_example.png).

- Change the BackColor of the form from Apearance -> BackColor -> Grey.
- Change the BackColor of all the buttons from Apearance -> BackColor -> Black.
- Set the font of all the buttons from Apearance -> Fontstyle -> Bold, size -> 12 & change the Forecolor to white.
- Set the font of the Output.Text from Apearance -> Fontstyle -> Bold, size -> 14 & from Behavior Enabled -> False.

Remember that you can change the fonts & colors to suit your taste!

![Final_look](/engineering-education/getting-started-with-windows-forms-using-c-sharp/Final_look.png).

### Conclusion
In this tutorial, we created a basic calculator using windows forms. We have learned how easy it is to build various applications when using *Controls*.

This is not over! We will build more applications using windows forms in the upcoming tutorials. Don’t forget to test out the code to fully understand how it works.

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)

