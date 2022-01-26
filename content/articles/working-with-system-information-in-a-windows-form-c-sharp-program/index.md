System Information is a program that allows users to see all of their computer's information. It is made up of two terms, namely: system and information.

The term "system" refers to the computer components that work together to accomplish a specific task, such as the operating system, the RAM installed in a computer, the OS version, and so on. On the other hand, information is the summarization of data and how it is conveyed to the user in the form of output.

In this article, we will go over how to check system information and the classes that can be used to do so, as well as write a C# program to demonstrate it. This article will be 70% practical, which will necessitate a lot of coding.

In this post, we will look at how to use the Management Namespace and Environment in C# to get access to various system data. The Environment class is a static class that gives information on the current environment and methods for manipulating it, whereas the Management Namespace is a namespace that comprises numerous classes that provide access to management information, system events, devices, and so on.


### Objective
By the end of this article, you should be able to use the `Environment` class and the `Management` namespace to check system information.
### Prerequisites
Before reading this tutorial, we will presume you are familiar with the fundamentals of developing Windows Forms applications in `C#` and have a basic understanding of `C#` programming. You need also to have any version of Visual Studio installed on your computer.
### Table of content
- [Objective](#objective)
- [Prerequisites](#prerequisites)
- [Table of content](#table-of-content)
- [Part 1: Using Environment class](#part-1-using-environment-class)
  - [Steps to be followed](#steps-to-be-followed)
  - [Step 1: Design a Windows Form page as shown below](#step-1-design-a-windows-form-page-as-shown-below)
  - [Step 2: Naming TextBox Cotrols](#step-2-naming-textbox-cotrols)
  - [Step 3: Coding](#step-3-coding)
  - [Complete code](#complete-code)
- [Part 2: Using Management Namespace](#part-2-using-management-namespace)
  - [Steps to be followed](#steps-to-be-followed-1)
  - [Step 1: Design a Windows Form page as shown below](#step-1-design-a-windows-form-page-as-shown-below-1)
  - [Step 2: Naming TextBox Cotrols](#step-2-naming-textbox-cotrols-1)
  - [Step 3: Coding](#step-3-coding-1)
  - [Complete code](#complete-code-1)
- [Conclusion](#conclusion)


### Part 1: Using Environment class
In this section, we will check the following system information using the `Environment` class:
. Get Machine name 
. User name
. Operating System
. Check the processor if it is an x64-based processor or x32 based processor and System type:

In this scenario, we will make a basic Windows Form Application to demonstrate how to examine the system information mentioned above.

#### Steps to be followed

#### Step 1: Design a Windows Form page as shown below
Use four TextBox controls for display, four labels, and two buttons, one for checking system information and the other for exiting, while making this Form page, as shown below.

![Environment class Design page](/engineering-education/working-with-system-information-in-a-windows-form-c-sharp-program/environment.png)

#### Step 2: Naming TextBox Cotrols
When naming text boxes in this Form, C# naming standards must be observed, and they should be named differently. The Textboxes were given the names `txtComputerName`, `txtUserName`, `txtOperatingSystem`, and `txtSytemBit` in my case.

#### Step 3: Coding
This is the final step, in which we should offer the code that will assist in getting system information, which will be coded within a function of the two buttons as follows:

1. Check the system information button

  -  Copy the code below and paste it into the check system information button after double-clicking it.

   ```C#
            txtComputerName.Enabled = true;
            txtOperstingSystem.Enabled = true;
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
                txtSytemBit.Text = " 64-bit operating system,  x64-based processor".ToString();
            }
            else
            {
                txtSytemBit.Text = " 32-bit operating system, x32-based processor".ToString();
            }

             String q5 =  (Environment.OSVersion.ToString());
            txtOperstingSystem.Text = Convert.ToString(q5);
            String q6 = Environment.OSVersion.Platform.ToString();

   ```

   2. Exit button
   
- Copy the code below and paste it into the Exit button after double-clicking it.

```C#
            const string message = "Do you what to exit?";
            const string caption = "Closing the page";
            var results = MessageBox.Show(message, caption, MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (results == DialogResult.Yes)
            {
                Application.Exit();
            }
```
#### Complete code
```C#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace UsingEnvironmentClass
{
    public partial class Form1: Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void txtComputerName_MaskInputRejected(object sender, MaskInputRejectedEventArgs e)
        {

        }

        private void button5_Click(object sender, EventArgs e)
        {
            
            txtComputerName.Enabled = true;
            txtOperstingSystem.Enabled = true;
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
            txtOperstingSystem.Text = Convert.ToString(q5);
            String q6 = Environment.OSVersion.Platform.ToString();
           
            
        }

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

        private void groupBox1_Enter(object sender, EventArgs e)
        {

        }
    }
}

```

### Part 2: Using Management Namespace

`System. Management` 

It comprises various classes that cover the fundamentals of system management objects and management events about the system. Examples of this classes includes `ManagementBaseObject`, `ManagementClass`, `ManagementObjectSearcher`, `ManagementScope`, and so on. Visit the [Microsoft](https://docs.microsoft.com/en-us/dotnet/api/system.management?view=dotnet-plat-ext-6.0) official website to learn more about the `Management` namespace, classes, and Methods.

We will use the `ManagementClass` class and `ManagementObjectCollection` class in this section to check the following hardware information:
. Processor id 
. BIOS Maker Serial Number
. Physical Memory Serial Number
. Motherboard Serial Number

#### Steps to be followed

#### Step 1: Design a Windows Form page as shown below
Four TextBox controls for display, four labels, and two buttons, one for checking hardware information and the other for exiting, are required when designing this Form page, as shown below.

![Management namespace Design page](/engineering-education/working-with-system-information-in-a-windows-form-c-sharp-program/managementnamespace.png)

#### Step 2: Naming TextBox Cotrols
As I previously stated, naming conventions must be followed, and textBoxes should be named differently. Textboxes were named `txtProcessorId`, `txtBIOSMaker`, `txtPhysicalMemory`, and `motherboard` in my case.

#### Step 3: Coding
This is the final step, in which we should offer the code that will assist in getting hardware information, which will be coded within a function of the two buttons as follows:

1. Check the system information button

  -  Copy the code below and paste it into the check system information button after double-clicking it.
  
  ```C#
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
                txtPhaysicalMemory.Text= mngObject3.Properties["SerialNumber"].Value.ToString();
                break;
            }


            // Check Motherboard
            ManagementClass management4 = new ManagementClass("Win32_BaseBoard");
            ManagementObjectCollection managementobject4 = management4.GetInstances();

            foreach (ManagementObject mngObject4 in managementobject4)
            {
                motherboard.Text = mngObject4.Properties["SerialNumber"].Value.ToString();
                break;
            }

  ```
2. Exit button
  - Copy the code below and paste it into the Exit button after double-clicking it.

```C#
            const string message = "Do you what to exit?";
            const string caption = "Closing the page";
            var results = MessageBox.Show(message, caption, MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (results == DialogResult.Yes)
            {
                Application.Exit();
            }
```

#### Complete code

```C#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Management;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ManagementNamespaceClass
{
    public partial class Form1: Form
    {

    

        
    public Form1()
        {
            InitializeComponent();
        }

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
                txtPhaysicalMemory.Text= mngObject3.Properties["SerialNumber"].Value.ToString();
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

        private void groupBox1_Enter(object sender, EventArgs e)
        {

        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

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
    }
}

```
### Conclusion

In part 1 of this article, we used the Environment class to check the Machine name, User name, Operating System, Check the processor if it is an x64-based CPU or an x32-based processor, and the System type.
We have also learned how to use the Management namespace to display various hardware data, such as the BIOS serial number, Motherboard serial number, Processor id, and physical RAM serial number in part 2.