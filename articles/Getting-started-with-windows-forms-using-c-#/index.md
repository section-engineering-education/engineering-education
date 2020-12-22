**Windows forms** allow the programmers to create a graphical user interface (GUI) that allows the interaction with the program visually. According to [Microsoft](https://docs.microsoft.com/en-us/dotnet/desktop/winforms/overview/?view=netdesktop-5.0), It provides one of the most productive ways to create desktop apps based on the visual designer provided in Visual Studio. Functionality such as drag-and-drop placement of visual controls makes it easy to build desktop apps.

With *windows forms*, you can make basic applications like a calculator to high-level applications such as a library database management application that requires a connection to the database from the application.
### Prerequisites
1. A basic understanding of c# programming language.
2. Visual studio installed on your system.

If you don't have Visual Studio installed on your computer. you can download it from [Here](https://visualstudio.microsoft.com/downloads/).

### Make a new project
In this tutorial, we will make a simple calculator! Make a new project by opening the visual studio, then click on File -> New -> Project -> Visual c# -> Windows desktop and choose Windows Forms App (.NET Framework).

### ToolBox
The *Toolbox* window provides you with all the controls that help you build your project inside the form. to display the Toolbox click on View -> Toolbox, or you can press Ctrl+Alt+X. To use one of the controls double click on one of them or simply drag and drop it.

### Properties window
The *Properties window* is used to show the properties of the form or the control that you click on, you can manipulate the properties of any control used in your form. To display the window you can click on View -> properties window or you can simply click F4.   

![properties window and toolbox](properties window and toolbox.png)

### Building the form with the controls
First of all, let's start with the form and change the text to My calculator and the name to Cal_Form from the properties window.

![Form_name_text](Form_name_text.png).


**NOTE** that changing the name of a Control or the form will only change the name of the object inside the code, and that makes it easier to figure out which button or witch textbox you are using or editing right now, on the other hand changing the text of a Control will only change what appears to the user.

Now let's begin by adding the buttons and the textbox. First, we will add the numbers as buttons then we will add the C button the Calculating button the Operation buttons, and finally, the Textbox that will show the answer. To add a Control, you can drag & drop it from the toolbox to the form or simply double click on it. Repeat this with remaining controls.

![Controls_display](Controls_display.png).

Don't forget to change both the controls *Texts* to numbers & operations and the *Name* of buttons & textbox that will change the object name inside the code like we previously did with the form.

![First_look1](First_look1.png).

### Let's start coding
You can double click on any of the buttons and it will take you to the method where you can write your code inside of it, let's start with the numbers.
Each one of these buttons will display a number on the textbox that we previously added.

**NOTE** that the textbox's *Name* is changed to `Output.Text`.

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

Repeat this piece of code with all the buttons that produce numbers.

Inside the `Dot_Click` we should handle the case of multiple dots. To fix this problem, we should check the `Output.Text` if it has a dot already, we will prevent the user from adding another dot, if not, we can normally add a dot to the text. **NOTE** that we use the `try()` & `catch()` In order To prevent the user from doing invalid operations.

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

To clear the `Output.Text` we simply do this.

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

In this piece of code, we will deal with the `Sqrt()` & the `Pow()` methods.
**NOTE**: To use the Pow & Sqrt methods you need to import the Math class as follows `using static System.Math;`.
We will also use the `try()` & `catch()` to prevent the user from doing invalid operations.

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

Finally, we will work on the Calculate button to evaluate the string expression, and don't forget to check for invalid operations or inputs.

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
Let's change some colors and fonts using the properties window!

![Final_touch_example](Final_touch_example.png).

1. Change the BackColor of the Form from Apearance -> BackColor -> Grey.
1. Change the BackColor of all the buttons from Apearance -> BackColor -> Black.
1. Set the Font of all the buttons from Apearance -> fontstyle -> Bold, size -> 12 & change the Forecolor to white.
1. Set the Font of the Output.Text from Apearance -> fontstyle -> Bold, size -> 14 & from Behavior Enabled -> False.

Remember that you can change the fonts & colors to suit your taste!


![Final_look](Final_look.png).

### Conclusion
In this tutorial, we created a basic calculator using windows forms, we have learned how easy it is to build various applications with it using very flexible Controls,then we learned how to connect these Controls to the code inside of it. However, this is not over! We will build more applications using windows forms in the upcoming tutorials. Don’t forget to test out the code to fully understand how it works.


