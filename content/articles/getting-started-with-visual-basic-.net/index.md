Visual Basic.net is a multi-paradigm , object-oriented programming language .We implement it in the [.NET Framework](https://dotnet.microsoft.com/download/dotnet-framework/net45) developed by Microsoft .Visual Basic was invented in 2001 to replace Visual Basic 6 .

Visual Basic.Net is pronounced as "Visual basic dot net " . We commonly abbreviate it as VB.NET .

Although VB.NET is an evolved version of Visual Basic 6 ,it is not compatible with it , i.e. code written in Visual Basic 6 cannot be compiled under VB.NET

### Why VB.NET?
- VB.NET is a simple languge that is easy to understand for both novice and advanced programmers.
- With VB.NET you can create web applications with mordern features like performance counters ,file system and event logs.
- Since we implement VB.NET using the .NET framework , we can connect our applications to others created in languages that run on the same framework .
- You will enjoy drag and drop capabilities to replace any elements that you may need.
- The language is not case sensitive .

Although VB.NET may have a couple of advantages , it also has some drawbacks associated with it .They include :
- VB.NET is not able to handle pointers directly.
- Since VB.NET is an intermediate language , there is a large number of libraries required for the Just In Time compiler to interpret the application.


To get started, you will need an IDE (Integrated Development Environment) to write and compile code. We will be using [Visual Studio](https://visualstudio.microsoft.com/vs/community/) as our text editor.

### Installing Visual Basic.Net 

After you have selected Visual Studio , choose .NET desktop develop and click *Modify*.

![vscode](/engineering-education/getting-started-with-visual-basic-.net/visualstuio1.jpg)

After the installation, click *Launch* to get started.  

On the new window, choose *Create a new project*.

![newproject](/engineering-education/getting-started-with-visual-basic-.net/visualtudio2.png)

Once you have selected *Create a new project*, choose *"Install more tools and features"* then click *Next*.

![createproject](/engineering-education/getting-started-with-visual-basic-.net/newproject1.png)

From the drop down menu , pick  *Visual basic* then  select *Console Application* from the list and click *Next*.

![picktemplate](/engineering-education/getting-started-with-visual-basic-.net/newproject.png)

Enter your preferred project name and click *Next*. In this case, I will name my file *helloworld*.

![pickname](/engineering-education/getting-started-with-visual-basic-.net/newproject2.png)

After selecting the target framework you desire , click *Create*.

Visual Code will automatically generate some VB.NET  code for you.

![project](/engineering-education/getting-started-with-visual-basic-.net/newproject3.png)

Let's look at the code.

We have the code that will be generated below. It's a *Hello World* program.
```vb  
Imports System

Module Program
    Sub Main(args As String())
        Console.WriteLine("Hello World!")
    End Sub
End Module 

```
Press the *F5* key on your keyboard,to run your program, .
This will compile and run your code. 

A console window will open with the following output:
```bash
Hello World!

C:\Users\sa\source\repos\helloworld\helloworld\bin\Debug\netcoreapp3.1\helloworld.exe (process 6544) exited with code 0.
To automatically close the console when debugging stops, enable Tools->Options->Debugging->Automatically close the console when debugging stops.
Press any key to close this window . . .

```
