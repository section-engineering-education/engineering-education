---
layout: engineering-education
status: publish
published: true
url: /exception-handling-in-windows-forms/
title: Exception Handling in Windows Forms
description: In this tutorial, we will manage a variety of errors and issues that would occur when using windows forms. We will use exception handling to prevent these errors and guide the user to use the application properly.
author: mohamed-alghadban
date: 2021-09-23T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/exception-handling-in-windows-forms/hero.png
    alt: Exception Handling in Windows Forms Hero Image
---
Windows forms are one of the best tools used in making applications. It provides a drag and drop functionality for a variety of pre-built objects such as buttons, textbox, drop-down selections, and many other useful tools.
<!--more-->
However, how do we manage the inputs from the user?.

In this tutorial, we will manage a variety of errors and issues that would occur when using windows forms. We will use exception handling to prevent these errors and guide the user to use the application properly.

### Prerequisites
- A basic understanding of the C# programming language.
- A basic understanding of Windows forms.
- Visual Studio installed on your system.

### Installation guide
- Check [this article](https://www.geeksforgeeks.org/setting-environment-c-sharp/) on how to set up the C# environment in Visual Studio.
- If you are new to Windows forms, you can check [this](https://www.section.io/engineering-education/getting-started-with-windows-forms-using-c-sharp/) tutorial to help you understand the basic concepts.

### Exception handling
Sometimes, during runtime, a program may face some errors that interfere with its process or flow. This is where the concept of exception handling comes in.

With exception handling, we can test and fix all kinds of errors in order to maintain the flow of the program.

We have three main keywords that we will be using when handling a piece of code in exception handling:
- **Try** - This scope is used for the piece of code that might produce an error. It could also be used to throw an error intentionally to test out the code and see how it reacts to the error.
- **Catch** - This scope is used to catch the error and explain the issue to the user. We use it to show a message box or request a data refill for the form. It could also be used to walk the user through the steps that would be used repair the program. Sometimes, we use it to change the value of an object or a variable.
- **Finally** - This scope is optional to use and will occur anyway, even if the code doesn't produce any error.

### Outside the code (Form)
The following example will evaluate the division of two numbers:
- 3 TextBoxes, 2 of them for the input (numerator & denominator).
- 2 Labels to name the operations ( ÷ & =).
- 1 Button to start the operation.

![Exception form](/engineering-education/exception-handling-in-windows-forms/exception-form.png)

In the code below, we take two inputs from the user using the TextBoxes. We then parse the inputs from `String` to `Int` and back to String after evaluating the answer using the button.

```c#
private void button1_Click(object sender, EventArgs e)
        {
            int numerator = Convert.ToInt32(textBox1.Text);
            int denominator = Convert.ToInt32(textBox2.Text);

           int Answer = numerator / denominator;

            textBox3.Text = Answer.ToString();
        }
```

The code above will only work in a best-case scenario. This is because we have 2 known issues:
- Any input besides numbers will cause an error since we only accept numbers.
- The denominator has the value zero yet we can't divide any number by zero.

### Fixing the issues
To fix the code and resolve the issues, we will use exception handling. The `Try` scope will take care of both issues and notify any following `Catch` scopes.

The first catch scope will resolve the invalid inputs from the two text boxes. The second catch will resolve the issue of having zero as a value of the denominator.

The Finally scope is optional as mentioned before, but we can use it here to reset the value of the two text boxes for the next operation.

```c#
  private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                int numerator = Convert.ToInt32(textBox1.Text);
                int denominator = Convert.ToInt32(textBox2.Text);

                int Answer = numerator / denominator;

                textBox3.Text = Answer.ToString();
            }
            catch(FormatException)
            {
                MessageBox.Show("Invalid input enter two numbers please");
            }
            catch (DivideByZeroException divideByZeroException)
            {
                MessageBox.Show(divideByZeroException.Message,"Can't divide by zero");

            }
            finally
            {
                textBox1.Text = "";
                textBox2.Text = "";
            }
        }
```

This is how the message box will appear when an issue occurs:

![Error output](/engineering-education/exception-handling-in-windows-forms/error-output.png)

> 💡Tip: Only use the tools of exception handling when you need them.

For example, the code below requires the date of birth of a user:

```c#
 private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                int day = Convert.ToInt32(Daybox.Text);
                int year = Convert.ToInt32(Yearbox.Text);
                string month = Monthbox.Text;


            }
            catch (FormatException)
            {
                MessageBox.Show("Invalid input, enter a valid form of date please");
            }
            finally
            {
                Daybox.Text = "";
                Monthbox.Text = "";
                Yearbox.Text = "";
            }
        }
```

Result:

![Date normal](/engineering-education/exception-handling-in-windows-forms/date-normal.png)

The program above will run without any errors. This is because we used exception handling.

However, we could just use the _DateTimePicker_ tool from the Toolbox.

![Date tool](/engineering-education/exception-handling-in-windows-forms/date-tool.png)

In this case, you don't need to use any of the exception handling tools because the user is not allowed to enter anything from the keyboard. Therefore, the input will always be valid.

```c#
private void button1_Click(object sender, EventArgs e)
        {
            string Alldate = dateTimePicker1.Text;
            MessageBox.Show(Alldate);
        }
```

### Conclusion
In this tutorial, we have built a form that divides two numbers and learned about Exception handling and how we can use its properties and methods. We have also used an example to show how errors can occur and how we fix them using the Try/Catch methods.

Don't forget to test the code to fully understand how it works.

### Further reading
- [Exception handling](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/exception-handling)
- [Exceptions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/)
- [Using Exceptions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/using-exceptions)

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
