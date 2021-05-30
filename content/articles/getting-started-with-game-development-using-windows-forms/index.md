---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-game-development-windows-forms/
title: Getting Started with Game Development using Windows Forms
description: This tutorial will go over the basics of Windows forms using C# and Visual Studio. We will create a basic calculator using windows forms. 
author: mohamed-alghadban
date: 2021-02-24T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-game-development-windows-forms/hero.jpg
    alt: Windows Forms C# example image 
---
Playing video games is always fun, but what about making one? In this tutorial, we will go through the steps of making a small puzzle game called Mastermind using windows forms. Mastermind is a puzzle game that tests the memory and the ability of the player to determine the exact output between all the possibilities.
<!--more-->
### Prerequisites
Before we begin, it would help you as the reader to have the following:

- A basic understanding of the C# programming language.

- A basic understanding of Windows forms.

- Visual Studio installed on your system.

If you don’t have Visual Studio installed on your computer, you can check this article on how to set up the C# environment in Visual Studio [here](https://www.geeksforgeeks.org/setting-environment-c-sharp/), and if you are new to 
Windows forms you can check this tutorial that would help you understand the basics of it [here](/getting-started-with-windows-forms-using-c-sharp/).

### How to play
The system of Mastermind will randomly produce 4 colors between 6 colors (allowing duplicate colors). The colors will remain invisible to the player until he wins or losses the game.
- The player will have to guess the 4 colors produced by the system.
- The player will have 10 chances to guess the colors before losing the game, and each round will give you a hint.
- If the player chooses one of the colors included in one of the digits produced by the system but not in the right place it will glow red.
- If the color is included in one of the digits & at the right place it will glow black.
- To win the player must have all the colors in right place.

### Building the game
We will use the toolbox to select the controls that we need in this game. First of all, we will add 10 labels for each round, and for each label, we will add 4 buttons for the colors one button for the check, and 4 buttons for the hints. Finally 1 button for the start (GO) 4 buttons for the hidden colors produced by the system and 1 one button for the win or loss statement.

This is how the form should look like after building the form, and remember that you can always change the fonts & the colors to whatever suits your taste!

![mastermind_form](/engineering-education/getting-started-with-game-development-windows-forms/mastermind_form.png)

This is the table of the Texts & names of all the controls used in this form.

Text | Name
---- | ----
 1 | Label1
 2 | Label2
 3 | Label3
...
10 | Label10
empty | Col1
empty | Col2
empty | Col3
...
empty | Col40
Check | ch1
Check | ch2
Check | ch3
...
Check | ch10
empty | Show1
empty | Show2
empty | Show3
...
empty | Show40
GO    |   GO
empty | cool1
empty | cool2
empty | cool3
empty | cool4
empty | VIC

### Let’s start coding
First of all, we need to define the method that will change the color of all the buttons (Col1, Col2, Col3,...).

To do so we need to change the color of the button each time the player clicks on it, and after it finishes all the colors,
it will reset the counter (i) and show the colors again with each click.

```c#
 int i = 0;
        void Changecolor(Button x)
        {
            i++;
            if (i == 1)
                x.BackColor = Color.Blue;
            if (i == 2)
                x.BackColor = Color.Red;
            if (i == 3)
                x.BackColor = Color.Green;
            if (i == 4)
                x.BackColor = Color.Yellow;
            if (i == 5)
                x.BackColor = Color.Pink;
            if (i == 6)
                x.BackColor = Color.Purple;
            if (i == 7)
                i = 0;
          }
```

On each (Col1, Col2, Col3,...) button we double click on it and use this method on its button instead of x.

```c#
private void Col1_Click(object sender, EventArgs e)
        {
            Changecolor(Col1);
        }
private void Col2_Click(object sender, EventArgs e)
        {
            Changecolor(Col2);
        }
        
 // Repeat for all the buttons ...
 
 private void Col40_Click(object sender, EventArgs e)
        {
            Changecolor(Col40);
        }
```

Now we need to define the GO method that will start the game and produce the 4 random colors. First, we define a random object from the random class, then we use it to produce 4 random numbers from 1 to 6, and each color will have a value.

```c#
 private void GO_Click(object sender, EventArgs e)
        {
            Random rnd = new Random();
            int a = rnd.Next(1, 7);
            int b = rnd.Next(1, 7);
            int c = rnd.Next(1, 7);
            int d = rnd.Next(1, 7);
            int blue = 1, red = 2, green = 3, yellow = 4, pink = 5, purple = 6;
```

After that, we need to check what the random method produced for each digit, and thus we need to check the `a` 6 times for each color.

```c#
 if (a == blue)
                cool1.BackColor = Color.Blue;
            if (a == red)
                cool1.BackColor = Color.Red;
            if (a == green)
                cool1.BackColor = Color.Green;
            if (a == yellow)
                cool1.BackColor = Color.Yellow;
            if (a == pink)
                cool1.BackColor = Color.Pink;
            if (a == purple)
                cool1.BackColor = Color.Purple;
                
                if (b == blue)
                cool2.BackColor = Color.Blue;
            if (b == red)
                cool2.BackColor = Color.Red;
            if (b == green)
                cool2.BackColor = Color.Green;
            if (b == yellow)
                cool2.BackColor = Color.Yellow;
            if (b == pink)
                cool2.BackColor = Color.Pink;
            if (b == purple)
                cool2.BackColor = Color.Purple;

 //Repeat this with the rest of the digits c & d.   
 
 ch1.Visible = true;
 //The previous line will turn the first Check button to Visible to start the first round.
        }        
```

**NOTE:** That you need to repeat the previous piece of code with `c` and `d` before closing the method.

Now we need to define the Check method that will check the colors chosen by the player and compare them with the colors produced by the system.

The method will take the four colors chosen by the player the 4 colors produced by the system and the 4 hint digits as parameters.

The first condition will check if the four-color digits are fully clicked by the user. If the buttons got clicked, it will turn the second Check button on, if not it will let the player know that he hasn't picked four colors to finish the round.

```c#
 void Check_button(Button Col1, Button Col2, Button Col3, Button Col4,
                   Button cool1, Button cool2, Button cool3, Button cool4,
                   Button Show1, Button Show2, Button Show3, Button Show4)
        {
            int q = 0;
            int w = 0;
            VIC.Text = "";
            if (Col1.BackColor != Color.Gainsboro && Col2.BackColor != Color.Gainsboro && Col3.BackColor != Color.Gainsboro && Col4.BackColor != Color.Gainsboro)
                ch2.Visible = true;
            else
                VIC.Text = "ENTER SOME COLORS DUMMY";
```

The next snippet will increase the (q) counter by 1 each time it finds one of the colors chosen by the player in one of the digits produced by the system (but not in the right place). 

```c#
            if (Col1.BackColor == cool1.BackColor || Col1.BackColor == cool2.BackColor || Col1.BackColor == cool3.BackColor || Col1.BackColor == cool4.BackColor)
                q++;
            if (Col2.BackColor == cool1.BackColor || Col2.BackColor == cool2.BackColor || Col2.BackColor == cool3.BackColor || Col2.BackColor == cool4.BackColor)
                q++;
            if (Col3.BackColor == cool1.BackColor || Col3.BackColor == cool2.BackColor || Col3.BackColor == cool3.BackColor || Col3.BackColor == cool4.BackColor)
                q++;
            if (Col4.BackColor == cool1.BackColor || Col4.BackColor == cool2.BackColor || Col4.BackColor == cool3.BackColor || Col4.BackColor == cool4.BackColor)
                q++;
```

This counter will decide how many red buttons will glow from the 4 hint buttons.

```c#
if (q == 1)
                Show1.BackColor = Color.Red;
            else if (q == 2)
            {
                Show1.BackColor = Color.Red;
                Show2.BackColor = Color.Red;
            }
            else if (q == 3)
            {
                Show1.BackColor = Color.Red;
                Show2.BackColor = Color.Red;
                Show3.BackColor = Color.Red;
            }
            else if (q == 4)
            {
                Show1.BackColor = Color.Red;
                Show2.BackColor = Color.Red;
                Show3.BackColor = Color.Red;
                Show4.BackColor = Color.Red;
            }
```

The next piece of code will check how many buttons chosen by the player that has the same **color** and **digit** produced by the system. The first line of code will give the w counter the number 3 if 3 of the buttons chosen by the player have the same color and digit produced by the system and so on.

```c#
            if (Col1.BackColor == cool1.BackColor && Col2.BackColor == cool2.BackColor && Col3.BackColor == cool3.BackColor && Col4.BackColor != cool4.BackColor)
                w = 3;
            if (Col1.BackColor == cool1.BackColor && Col2.BackColor == cool2.BackColor && Col3.BackColor != cool3.BackColor && Col4.BackColor == cool4.BackColor)
                w = 3;
            if (Col1.BackColor == cool1.BackColor && Col2.BackColor != cool2.BackColor && Col3.BackColor == cool3.BackColor && Col4.BackColor == cool4.BackColor)
                w = 3;
            if (Col1.BackColor != cool1.BackColor && Col2.BackColor == cool2.BackColor && Col3.BackColor == cool3.BackColor && Col4.BackColor == cool4.BackColor)
                w = 3;
            if (Col1.BackColor == cool1.BackColor && Col2.BackColor == cool2.BackColor && Col3.BackColor != cool3.BackColor && Col4.BackColor != cool4.BackColor)
                w = 2;
            if (Col1.BackColor != cool1.BackColor && Col2.BackColor != cool2.BackColor && Col3.BackColor == cool3.BackColor && Col4.BackColor == cool4.BackColor)
                w = 2;
            if (Col1.BackColor != cool1.BackColor && Col2.BackColor == cool2.BackColor && Col3.BackColor == cool3.BackColor && Col4.BackColor != cool4.BackColor)
                w = 2;
            if (Col1.BackColor == cool1.BackColor && Col2.BackColor != cool2.BackColor && Col3.BackColor != cool3.BackColor && Col4.BackColor == cool4.BackColor)
                w = 2;
            if (Col1.BackColor != cool1.BackColor && Col2.BackColor == cool2.BackColor && Col3.BackColor != cool3.BackColor && Col4.BackColor == cool4.BackColor)
                w = 2;
            if (Col1.BackColor == cool1.BackColor && Col2.BackColor != cool2.BackColor && Col3.BackColor == cool3.BackColor && Col4.BackColor != cool4.BackColor)
                w = 2;
            if (Col1.BackColor == cool1.BackColor && Col2.BackColor != cool2.BackColor && Col3.BackColor != cool3.BackColor && Col4.BackColor != cool4.BackColor)
                w = 1;
            if (Col1.BackColor != cool1.BackColor && Col2.BackColor == cool2.BackColor && Col3.BackColor != cool3.BackColor && Col4.BackColor != cool4.BackColor)
                w = 1;
            if (Col1.BackColor != cool1.BackColor && Col2.BackColor != cool2.BackColor && Col3.BackColor == cool3.BackColor && Col4.BackColor != cool4.BackColor)
                w = 1;
            if (Col1.BackColor != cool1.BackColor && Col2.BackColor != cool2.BackColor && Col3.BackColor != cool3.BackColor && Col4.BackColor == cool4.BackColor)
                w = 1;
            if (Col1.BackColor == cool1.BackColor && Col2.BackColor == cool2.BackColor && Col3.BackColor == cool3.BackColor && Col4.BackColor == cool4.BackColor)
                w = 4;
```

After that, we will use the w counter to determine how many black hint buttons will glow, and if it's 4 then you have won the game!

```c#
if (w == 1)
                Show1.BackColor = Color.Black;
            else if (w == 2)
            {
                Show1.BackColor = Color.Black;
                Show2.BackColor = Color.Black;
            }
            else if (w == 3)
            {
                Show1.BackColor = Color.Black;
                Show2.BackColor = Color.Black;
                Show3.BackColor = Color.Black;
            }
            else if (w == 4)
            {
                Show1.BackColor = Color.Black;
                Show2.BackColor = Color.Black;
                Show3.BackColor = Color.Black;
                Show4.BackColor = Color.Black;
                VIC.Text = "VICTORY !";
                cool1.Visible = true;
                cool2.Visible = true;
                cool3.Visible = true;
                cool4.Visible = true;
            }
        }
 ```
Finally, we will use this method with all the 10 check buttons.

```c#
 private void ch1_Click(object sender, EventArgs e)
        {
            Check_button(Col1,Col2,Col3,Col4,cool1,cool2,cool3,cool4,Show1,Show2,Show3,Show4);
            GO.Visible=false;
        }
  private void ch2_Click(object sender, EventArgs e)
        {
            Check_button(Col5,Col6,Col7,Col8,cool1,cool2,cool3,cool4,Show5,Show6,Show7,Show8);
            ch3.Visible = true;
        }
 private void ch3_Click(object sender, EventArgs e)
        {
            Check_button(Col9, Col10, Col11, Col12, cool1, cool2, cool3, cool4, Show9, Show10, Show11, Show12);
            ch4.Visible = true;
        }
        
        //Repeat for all the Check buttons...
```

The final check button will have an extra code because reaching the final round without winning means that you have lost the game.

```c#
        private void ch10_Click(object sender, EventArgs e)
        {
            Check_button(Col37, Col38, Col39, Col40, cool1, cool2, cool3, cool4, Show37, Show38, Show39, Show40);
            if(VIC.Text!= "VICTORY !")
            VIC.Text = "YOU HAVE LOST DUMMY !";
            ch1.Visible = false;
            ch2.Visible = false;
            ch3.Visible = false;
            ch4.Visible = false;
            ch5.Visible = false;
            ch6.Visible = false;
            ch7.Visible = false;
            ch8.Visible = false;
            ch9.Visible = false;
            ch10.Visible = false;
           
            cool1.Visible = true;
            cool2.Visible = true;
            cool3.Visible = true;
            cool4.Visible = true;
        }
```

### Conclusion
In this tutorial, we have created a puzzle game called Mastermind using windows forms. We have used the controls & the properties window to create the form of it, and then we connected these controls with the methods inside of it. To double the fun, try to challenge your friends with Mastermind! Don't forget to test out the code to fully understand how it works.

---
Peer Review Contributions by: [Sylvester Tamba](/engineering-education/authors/sylvester-tamba/)





