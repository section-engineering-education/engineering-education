# Exception-handling-in-windows-forms

### Introduction
Windows forms are one of the best tools used in making applications, it provides a drag & drop functionality for a variety of pre-built objects such as buttons, textbox, drop-down selections, and many other useful tools, but how do we manage the inputs from the user?

In this tutorial, we will manage a variety of errors & issues that would occur when using windows forms. We will use exception handling to prevent these errors and guide the user to use the application properly.

### Prerequisites
- A basic understanding of the C# programming language.
- A basic understanding of Windows forms.
- Visual Studio installed on your system.

### Installation guide
- To install Visual Studio and set up the work environment, you can check [this](https://www.geeksforgeeks.org/setting-environment-c-sharp/) article on how to set up the C# environment in Visual Studio.
- If you are new to Windows forms, you can check [this](https://www.section.io/engineering-education/getting-started-with-windows-forms-using-c-sharp/) tutorial, which will help you understand the basic concepts.

### Exception handling 
Sometimes the program during runtime faces some errors that would ruin the process or the flow of the program, and here comes the concept of exception handling. With exception handling, we can test and fix all kinds of errors and return the flow to the program.

We have three main keywords that we will be using when handling a piece of code in exception handling.
- **Try:** scope is used for the piece of code that might possibly produce an error. It could also be used to throw an error intentionally to test out the code and see how it reacts to the error.
- **Catch:** scope is used to catch the error and explain the issue to the user, and we use it to show a message box or request a data refill for the form. It could also be used to walk the user through the steps that would repair the program or maintain the issue, and sometimes we use it to change the value of an object or a variable.
- **Finally:** scope is optional to use and will occur anyway, even if the code doesn't produce any error. 

### Outside the code (Form)
The following example will evaluate the division of two numbers.
- 3 Textboxes, 2 of them for the input (numerator & denominator).
- 2 Labels to name the operations ( ÷ & =).
- 1 Button to start the operation.

![Exceptionform](/engineering-education/exception-handling-in-windows-forms/Exceptionform.png)

### The code
The following code will take two inputs from the user using the textboxes, then we parse the inputs from String to Int and back to String after evaluating the answer using the button.
```c#
private void button1_Click(object sender, EventArgs e)
        {
            int numerator = Convert.ToInt32(textBox1.Text);
            int denominator = Convert.ToInt32(textBox2.Text);

           int Answer = numerator / denominator;

            textBox3.Text = Answer.ToString();
        }
```
The previous code will only work in a best-case scenario because we have 2 issues:
- Any input besides numbers will cause an error since we only accept numbers
- Denominator has the value of 0 because we can't divide by zero

### Fixing the code
In order to fix the code and resolve the previous issues, we will use exception handling. The Try scope will take care of both of the issues and notify any following Catch scopes, the first catch scope will resolve the invalid inputs from the two text boxes and the second catch will resolve the issue of having zero as a value of the Denominator. The Finally scope is optional as mentioned before, but we can use it here to reset the value of the two text boxes for the next operation.
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

![Erroroutput](/engineering-education/exception-handling-in-windows-forms/Erroroutput.png)

### Useful tip
Only use the tools of exception handling when you need them, for example, the following code requires the date of birth of a user.

![datenormal](/engineering-education/exception-handling-in-windows-forms/datenormal.png)

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
the previous piece of code will run the code correctly without any errors because we used exception handling, but instead, we could just use the *DateTimePicker* tool from the Toolbox.

![datetool](/engineering-education/exception-handling-in-windows-forms/datetool.png)

In this case, you don't need to use any of the exception handling tools because the user is not allowed to enter anything from the keyboard and therefore the input will always be valid.
```c#
private void button1_Click(object sender, EventArgs e)
        {
            string Alldate = dateTimePicker1.Text;
            MessageBox.Show(Alldate);
        }
```        
### Conclusion
In this tutorial, we have built a form that divides two numbers and learned about Exception handling and how we can use its properties and methods, we have also used an example to show how errors can occur and how do we fix them using the Try & Catch methods. Don't forget to test out the code to fully understand how it works.

### Further reading
- https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/exception-handling
- https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/
- https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/using-exceptions
