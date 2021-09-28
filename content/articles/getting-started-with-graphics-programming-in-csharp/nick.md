### Introduction
Graphics play a critical role in any program you build. Create a paint program or a code editor with color and font dialog box features, for example. Text from software form fields might need to be printed from time to time. For a variety of reasons, you may be compelled to embellish your writing or arrange it in a rectangle or circle. Instead of starting from scratch, utilize an existing image as a background. Imaginations go wild when there are so many options. Only by carefully and judiciously utilizing the proper principles are these adaptations possible. This article uses the C# programming language to describe the concepts given out in the Microsoft.NET Framework.

### Prerequisites
- Visual Studio 2019 application.
> check your operating system requirements specifications before downloading.
- Windows operating system since .NET windows based.
- Some basic knowledge of C# language.

### Table of content
- [Overview of graphical programming](#overview-of-graphical-programming)
 - [How to change the unit of Measurement](#how-to-change-the-unit-of-measurement)
- [Working with ColorDialog Box](#working-with-colordialog-box)
- [Working with FontDialog Box](#working-with-fontdialog-box)
- [How to use SystemdotDrawingdotDrawing2D Namespace](#how-to-use-systemdotdrawingdotdrawing2d-namespace)
- [Work with Pen objects](#work-with-pen-objects)
- [Working with Dialog boxes](#working-with-dialog-boxes)
- [Working with Brush objects](#working-with-brush-objects)
- [Conclusion](#conclusion)


### Overview of graphical programming
The availability of namespaces, classes, methods, and events in C# facilitates class-based development. The Visuals class is used to show graphics on the System. It's possible to draw shapes and print text on a form when using the drawing namespace.

EventHandler is PaintEventHandler, and the related event is called Paint in this example. The event handling technique is required to render pictures in a C# program. This is seen in Listing 1 by printing "Welcome C#" on a WinForm. The form's text is shown in a raised typeface in this example.

**listing one**

```C#
using System;  
using System.Windows.Forms;  
using System.Drawing;   
public class Hello: Form {  
    public Hello() {  
        this.Paint += new PaintEventHandler(f1_paint);  
    }  
    private void f1_paint(object sender, PaintEventArgs e) {  
        Graphics g = e.Graphics;  
        g.DrawString("Hello C#", new Font("Verdana", 20), new SolidBrush(Color.Tomato), 40, 40);  
        g.DrawRectangle(new Pen(Color.Pink, 3), 20, 20, 150, 100);  
    }  
    public static void Main() {  
        Application.Run(new Hello();

```

Listing 1 lists the parameters to the DrawString() function. The font, size, and color of the first parameter in this function can be specified after the printed text. The next two parameters imply the form's X and Y coordinates.

When using the Graphics class' methods, keep in mind that you must first construct an object of the class's Type to utilize its methods. You may easily add new code to the preceding program to render more graphical shapes like rectangles and ellipses. It's as simple as using the methods you've learned. In the forthcoming meeting, these tactics will be explored in further detail.

### How to change the unit of Measurement.
As you may be aware, the default graphic unit is the Pixel. The PageUnit attribute, as seen below, allows you to alter the measuring unit from Pixels to Inches, Millimeters, and so on.

```C#
Graphics g = e.Graphics;  
g.PageUnit = GraphicsUnit.Inch
```

### Working with ColorDialog Box.
If you've ever programmed in Visual Basic, you'll recognize preconfigured dialog boxes like ColorDialog and FontDialog. Using the ColorDialog class in C#, you may pick a color. Follow the steps in the example below to create a ColorDialog instance.

```C#
ColorDialog cd = new ColorDialog();
```

When the ShowDialog() function is used on the previous object, a dialog box with color pickers will be shown. Turn on the Color property and make the necessary modifications as indicated in Listing 2.

**listing two**

```C#
using System;  
using System.Drawing;  
using System.Windows.Forms;  
public class Clr: Form {  
    Button b1 = new Button();  
    TextBox tb = new TextBox();  
    ColorDialog clg = new ColorDialog();  
    public Clr() {  
        b1.Click += new EventHandler(b1_click);  
        b1.Text = "OK";  
        tb.Location = new Point(50, 50);  
        this.Controls.Add(b1);  
        this.Controls.Add(tb);  
    }  
    public void b1_click(object sender, EventArgs e) {  
        clg.ShowDialog();  
        tb.BackColor = clg.Color;  
    }  
    public static void Main() {  
        Application.Run(new Clr());  
    }  
```

The backdrop color of the form changes as you make color selections in the dialog box.

### Working with FontDialog Box.
Selecting font attributes like size, style, and the name is easy with FontDialog boxes. The techniques in the preceding listing may be used to construct a font selection dialog box with a few small alterations.

![font dialog box](/engineering-education/getting-started-with-graphics-programming-in-csharp/image-1.png)

### How to use SystemdotDrawingdotDrawing2D Namespace
Using the system. Drawing. Drawing2D New methods for managing Pen and Brush objects are introduced in the Namespace extension. Lines may be given a new appearance and feel with the DashStyle Enumerator (like Dash, DashDot, etc).
Brush classes such as SolidBrush, HatchStyleBrush, and others can be used to alter the look of filled objects. To fill a rectangle, utility lines such as vertical and horizontal ones. FillXXX() methods take a Brush class parameter instead of a Pen class argument when creating a normal form (with DrawXXX()).

### Work with Pen objects
A pen is a tool for drawing a line and describing the characteristics of that line. Pens let you choose things like color, line width, and even line style (solid, dashed, and so on). This hour is almost entirely devoted to sketching methods that employ pens.

You may build your own pen in Visual C# or select from a library of pre-defined pens. Build your pen with the following syntax:

```bash
penvariable = new Pen(color, width);
```

You may customize the look of a pen by setting its attributes after it's been produced. Pen objects have the DashStyle property, which is a great illustration of this.

- **Dash**- Sets a dashed line as the separator.

- **DashDot**- Defines a line with a dot-and-dash pattern.

- **DashDotDot**- To use, draw an alternating dash and double dot line.

- **Dot**- Specified a dot-filled line.

- **Solid**- A solid line is specified.

- **Custom**- Sets the style of the dash to something specific. The custom line may be defined using the Pen object's attributes.

The namespace Drawing.Drawing2D contains the DashStyle enumeration. For example, the code below creates a dark blue pen that uses the dot method to draw an intersecting line.

```c#
Pen objMyPen = new Pen(System.Drawing.Color.DarkBlue, 3); objMyPen.DashStyle = System.Drawing.Drawing2D.DashStyle.Dot;
```
> You wouldn't have to use the fully qualified names of System.Drawing was specified with a using statement.


The width of the pen is specified in pixels by the third parameter, which is supplied to construct a new Pen.

In Visual C#, there is a slew of standard pens accessible through the System.Drawing.Pens class for example

```bash
objPen = System.Drawing.Pens.DarkBlue;
```

You can utilize bespoke pens or system-defined pens while sketching with the techniques.

### Working with Dialog boxes
Any GUI-based program would be incomplete without dialog boxes. When you open a file, save a file, choose fonts or colors, or anything else like that, you'll see these dialog windows. These boxes have already been set up in advance. The .NET runtime does the rest of the work for you; all you have to do is apply the appropriate code. A unique approach to make a decision!

Dialog boxes can be customized as well. A custom dialog box is what you'd get if you created one like this.

Dialog boxes are non-resizable special forms. They can also be used to show the user's messages. Error messages, password confirmations, deletion confirmations, and Find-Replace word utilities are examples of possible messages. Standard dialog boxes are available for opening and saving files, selecting a folder, printing documents, and changing the font or color of text, among other things.

The MessageBox class is employed to provide the user with messages. Showing a message box with the provided text, caption, buttons, and icon is done with the show() function. Other types of overloads are also offered.

The code below shows a message dialog box:

```c#
DialogResult res = MessageBox.Show("Are you sure you want to delete", "Are you sure you want to confirm", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);  
if (res == DialogResult.OK) {  
    MessageBox.Show("You've pressed the OK button.");  
}  
if (res == DialogResult.Cancel) {  
    MessageBox.Show("You've pressed the Cancel Button.");  
}   
```

### Working with Brush objects
System.Drawing and System.Drawing.Drafwing2D are the namespaces in the.NET Framework Library where brush-related functionality is specified. The Structure. The Drawing namespace identifies classes and features relevant to brushes in general and the System as a whole. The Drawing.Drawing2D namespace contains functionality related to 2D brushes that is more sophisticated. Classes such as Brush, TextureBrush, and SolidBrush are defined in the system. In the Drawing namespace, the classes HatchBrush and GradientBrush reside in the System namespace. Namespace Drawing.Drawing2D for two-dimensional drawings.

Brushes may only be used in applications that have the relevant namespace included. As an alternative, you may prefix the class with the namespace, such as System.Drawing. If you don't want to use the System.Drawing namespace, you may use Brush instead.

The code below shows how to build a red SolidBrush object and then use it to draw a rectangle using the MATLAB programming language. Code for the paint event handler of a form was written. A brush is created by first getting the form's Graphics object, and then utilizing it to fill a rectangle with color using the SolidBrush class. Finally, the SolidBrush object is disposed of away.

```c#
 Graphics g = e.Graphics;
        SolidBrush redBrush = new SolidBrush (Color.Red);
        Rectangle rect = new Rectangle (150, 80, 200, 140);
        g.FillRectangle(redBrush, rect);
        redBrush.Dispose();
        
```
The code above is used to create a solid brash

### Conclusion
Text painting was the focus of this article. To test with alternative fonts, sizes, and colors, you can make alterations to the lists above. You've seen a wide range of approaches and implementations so far. As a result, you'll be able to use these strategies in your applications today. You also studied a few of the.NET Framework's built-in dialog boxes. Learned a lot about the system throughout the tutorial. Drawing2D is an advanced namespace in the.NET Framework.