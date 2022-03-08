---
layout: engineering-education
status: publish
published: true
url: /working-with-system-information-in-c-sharp-windows-form-application/
title: Working With System Information in C# Windows Form Application
description: This article will explain how to use the Management namespace and the Environment class to retrieve information about the computer and the operating system.
author: kipkopus-samuel
date: 2022-03-08T00:00:00-04:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/working-with-system-information-in-c-sharp-windows-form-application/hero.png
    alt: Working With System Information in C Sharp Windows Form Application
---
System Information (msinfo32) is a program that allows users to see all of their computers information.
<!--more-->
The term "system" refers to the computer components that work together to accomplish a specific task, such as the operating system, the RAM installed in a computer, the OS version, and so on. On the other hand, information is the summarization of data and how it is conveyed to the user in the form of output.

In this article, we will go over how to check the system information and the classes that can be used to do so, as well as write a C# program to demonstrate it.

We will also look at how to use the `Management` namespace and `Environment` in C# to get access to various system data.

The `Environment` class is a static class that gives information on the current environment and methods for manipulating it. The `Management` namespace is a namespace that comprises numerous classes that provide access to management information, system events, devices, and so on.

### Objectives
By the end of this tutorial, you should be able to use the `Environment` class and the `Management` namespace to check system information.

### Prerequisites
In this tutorial, we will assume you are familiar with the fundamentals of developing Windows Forms applications in `C#`. We will also assume that you have some understanding of `C#` programming.

Additionally, you are required to have Visual Studio installed on your computer.

### Table of contents
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Part 1: Using environment class](#part-1-using-environment-class)
  - [Step 1: Designing a windows form page](#step-1-designing-a-windows-form-page)
  - [Step 2: Naming TextBox controls](#step-2-naming-textbox-controls)
  - [Step 3: Adding code](#step-3-adding-code)
    - [Button 1: Check system information](#button-1-check-system-information)
    - [Button 2: Exit](#button-2-exit)
- [Part 2: Using Management namespace](#part-2-using-management-namespace)
  - [Step 1: Designing a Windows Form page](#step-1-designing-a-windows-form-page-1)
  - [Step 2: Naming TextBox controls](#step-2-naming-textbox-controls-1)
  - [Step 3: Adding the code](#step-3-adding-the-code)
    - [Button 1: Check the system information](#button-1-check-the-system-information)
- [Conclusion](#conclusion)

### Part 1: Using environment class
In this section, we will check the following system information using the `Environment` class:
1. Machine name
2. Username
3. Operating system details
4. Whether the processor is x64-based or x32 based

We will now create a simple Windows Form Application to demonstrate how to examine the system information mentioned above.

#### Step 1: Designing a windows form page
Use four `TextBox` controls for display, four `labels`, and two `buttons`. One for checking system information and the other for exiting, as shown below.

![Environment class Design page](/engineering-education/working-with-system-information-in-c-sharp-windows-form-application/environment.png)

#### Step 2: Naming TextBox controls
When naming text boxes in this Form, `C#` naming standards must be observed, and they should be named differently. The Textboxes were given the names `txtComputerName`, `txtUserName`, `txtOperatingSystem`, and `txtSytemBit` in my case.

#### Step 3: Adding code
This is the final step, in which we should offer the code that will assist in getting system information, which will be coded within a function of the two buttons as follows:

##### Button 1: Check system information
Change the name of the system information button to `button5`, double-click it, and add the code below:

```c#
private void button5_Click(object sender, EventArgs e)
{
    txtComputerName.Enabled = true;
    txtOperatingSystem.Enabled = true;
    txtSytemBit.Enabled = true;
    txtUserName.Enabled = true;
    txtSytemBit.Enabled = true;

    // Checking name of the computer used
    String q1 = Environment.MachineName;
    txtComputerName.Text = q1;
    // Checking name of the user to this computer
    String q2 = Environment.UserName;
    txtUserName.Text = q2;
    // Checking if the operating system installed is 64 bits or not
    bool q4 = Environment.Is64BitOperatingSystem;

    if (q4 == true)
    {
        txtSytemBit.Text = " 64-bit operating system, x64-based processor".ToString();
    }
    else
    {
        txtSytemBit.Text = " 32-bit operating system, x32-based processor".ToString();
    }

    String q5 =  (Environment.OSVersion.ToString());
    txtOperatingSystem.Text = Convert.ToString(q5);
    String q6 = Environment.OSVersion.Platform.ToString();
}
```

We utilized the `Environment` class to access some of the system's information in the code snippet above. The `Environment` class is a static class, which means that its methods and attributes can only be accessed by using the class name and cannot be instantiated.

The `Environment` class has several properties that help us perform various functions. We simply call each property by its class name using the syntax below:

```c#
ClassName.propert_name

// eg. Environment.UserName
```

The properties used in the code snippet above are listed below:
- `MachineName`
- `UserName`
- `Is64BitOperatingSystem`
- `OSVersion.Platform`

The `MachineName` property is used to access the NetBIOS name of the current computer in use. The `UserName` is used to get the name of the currently logged in user. `Is64BitOperatingSystem` is used to determine if the operating system is 64 bits or not, and `OSVersion` is used to determine the OS version platform.

##### Button 2: Exit
Change the name of the exit button to `button9`, double-click it, and add the code below:

```c#
private void button9_Click(object sender, EventArgs e)
{
    const string message = "Do you what to exit?";
    const string caption = "Closing the page";
    var results = MessageBox.Show(message, caption, MessageBoxButtons.YesNo, MessageBoxIcon.Question);

    if (results == DialogResult.Yes)
    {
        Application.Exit();
    }
}
```

The `Application.Exit()` method in the code above executes the exit action when a user clicks the `Exit` button. Because the `Application` class is a static class that cannot be instantiated, this method will only be accessed or called by the class name as shown:

```c#
Application.Exit();
```

### Part 2: Using Management namespace
`System.Management` comprises various classes that cover the fundamentals of system management objects and management events about the system. Examples of this classes includes:
- `ManagementBaseObject`
- `ManagementClass`
- `ManagementObjectSearcher`
- `ManagementScope`, and so on.

Visit the [Microsoft](https://docs.microsoft.com/en-us/dotnet/api/system.management?view=dotnet-plat-ext-6.0) official website to learn more about the `Management` namespace, classes, and Methods.

We will use the `ManagementClass` class and `ManagementObjectCollection` class in this section to check the following hardware information:
- Processor id
- BIOS Maker Serial number
- Physical Memory Serial number
- Motherboard Serial number

#### Step 1: Designing a Windows Form page
Use Four `TextBox` controls for display, four `labels`, and two `buttons`, one for checking hardware information and the other for exiting, as shown below:

![Management namespace Design page](/engineering-education/working-with-system-information-in-c-sharp-windows-form-application/managementnamespace.png)

#### Step 2: Naming TextBox controls
As I previously stated, naming conventions must be followed, and textBoxes should be named differently. TextBoxes are named `txtProcessorId`, `txtBIOSMaker`, `txtPhysicalMemory`, and `txtMother` in my case.

#### Step 3: Adding the code
This is the final step, in which we should offer the code that will assist in getting hardware information, which will be coded within a function of the two buttons as follows:

##### Button 1: Check the system information
Change the name of the system information button to `button5`, double-click it, and add the code below:

```c#
private void button5_Click(object sender, EventArgs e)
{
    ManagementClass management = new ManagementClass("Win32_Processor");
    ManagementObjectCollection managementobject = management.GetInstances();

    foreach (ManagementObject mngObject in managementobject)
    {
        txtProcessorId.Text= mngObject.Properties["ProcessorId"].Value.ToString();
        break;
    }

    // Check BIOS cheker
    ManagementClass management2 = new ManagementClass("Win32_BIOS");
    ManagementObjectCollection managementobject2 = management2.GetInstances();
    foreach (ManagementObject mngObject2 in managementobject2)
    {
        txtBIOSMaker.Text= mngObject2.Properties["SerialNumber"].Value.ToString();
        break;
    }

    // Check physical memory serial number
    ManagementClass management3 = new ManagementClass("Win32_PhysicalMedia");

    ManagementObjectCollection managementobject3 = management3.GetInstances();
    foreach (ManagementObject mngObject3 in managementobject3)
    {
        txtPhysicalMemory.Text= mngObject3.Properties["SerialNumber"].Value.ToString();
        break;
    }


    // Check Motherboard
    ManagementClass management4 = new ManagementClass("Win32_BaseBoard");
    ManagementObjectCollection managementobject4 = management4.GetInstances();

    foreach (ManagementObject mngObject4 in managementobject4)
    {
        txtMother.Text = mngObject4.Properties["SerialNumber"].Value.ToString();
        break;
    }
}
```

The `ManagementClass` is used to examine hardware information such as Processor id, BIOS Maker Serial Number, Physical Memory Serial Number, and Motherboard Serial Number in our case, as shown in the code sample above.

To access the `ManagementClass` properties, we must first build the `ManagementClass` class object as well as the `ManagementObjectCollection` class object.

The value attributes provided by the classes above assist us in displaying the value of specific installed hardware.

The exit button for this part uses the same code as the previous part. Feel free to copy and paste the code from the previous part.

### Conclusion
In the first part of this article, we used the `Environment` class to check the Machine name, Username, Operating System, the System type and whether the processor is x64-based or x32-based.

We have also learned how to use the `Management` namespace to display various hardware data, such as the BIOS serial number, Motherboard serial number, Processor id, and physical RAM serial number in part 2.

Happy coding!

---

Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
