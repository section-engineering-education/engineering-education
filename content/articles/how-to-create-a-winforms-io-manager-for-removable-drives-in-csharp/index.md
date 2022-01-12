---
layout: engineering-education
status: publish
published: true
url: /how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/
title: How to Manage Removable Drives in C#
description: This article will help readers understand how to manage USB devices in C#. This feature is important when granting read/write permissions to removable drives.
author: donel-mwangi
date: 2022-01-12T00:00:00-09:12
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/hero.jpg
    alt: How to Manage Removable Drives in C# Hero Image
---
We use removable IO devices now and then to transfer files to and from our PCs, as well as to store files. 
<!--more-->
However, we need a tool to manage these devices and how they interact with our computers for security, privacy, and other reasons.

In this tutorial, we will create a `.NET` desktop tool that shall enable us to manage USB ports on a windows computer. We will be able to change the read/write permissions of removable drives. 

We shall start by going through a detailed guide to creating the user interface and then work on the code behind the read/write operations.

### Table of contents
- [Prerequisites](#prerequisites)
- [Creating the project](#step-1-creating-the-project)
- [Designing the user interface](#step-2-designing-the-user-interface)
- [Adding code to the form](#step-3-adding-code-to-the-form)
- [Adding the manifest file](#step-4-adding-the-manifest-file)
- [Testing](#testing)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you will need:
1. [Visual Studio](https://visualstudio.microsoft.com/downloads/) with the `.NET` framework.
2. Basic knowledge in C# and the `.NET` framework.
3. A flash disk or any other removable drives for testing purposes.

### Step 1 - Creating the project
We shall start by opening Visual Studio and selecting `create new project` from the `Get started` options.

On the next window (`Create a new project`), we will select the `Windows Forms App` template then click on `Next`.

![creating a new winforms project](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/create-a-new-project.jpg)
  
In the next window (`Configure your new project`), we shall rename our project to `IOManager` and leave the other fields with their default values and click on the `Next` button.

![configure your new project](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/configure.jpg)

In the `Additional information` window, we shall leave it with the default value and hit `Create`.

![Additional information](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/additional-info.jpg)

After loading the project, you should see something similar to this:

![Initial window](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/initial-window.jpg)

### Step 2 - Designing the user interface

#### Renaming the form title
To rename the form title, click on  `Form 1` and in the `properties`  sidebar under `Text`, change to `I/O Manager`.

![Renaming Form1](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/renaming-form1.jpg)

#### Changing the background color
Click on the `I/O Manager` form and in the `Properties` sidebar under `BackColor`, change the background color to `Teal`.

![Changing form1 background color](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/form1-bgcolor.jpg)

#### Changing form border
This property changes how the border of our form shall look. For example, it removes the `maximize` and `minimize` buttons. 

To do it, click on the `I/O Manager` form and in the `Properties`  sidebar under `FormBorderStyle`, select `FixedToolWindow`.

![Form border style](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/form-border-style.jpg)

#### Add instructions label
From the `Toolbox`, drag and drop a `label` at the `top center` of the form. Click on the `label` and in its properties under `Text`, change to `Please unplug then plug all USB devices`. 

Also, change the font size to `14` and set bold to `True`.

![Label1 properties](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/label1.jpg)

#### Adding USB ports controls 
From the `Toolbox`, drag and drop a `groupbox` just below the `instruction label` and set its dimensions to `560, 150` under its `size` property. 

Change the `groupBox1` text to `Enable/Disable`, then change its `background color` to a more compatible color. We shall change ours to the color `ActiveCaption`.

Next, drag and drop two `radio buttons` into the groupbox and change their `text` properties to `Enable USB Ports` and `Disable USB Ports`.

By now you should have something like this:

![Groupbox1](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/groupbox1.jpg)

#### Adding Read/Write controls
In this step, we will drag and drop another `groupbox` just below the first one (make sure you align them for a better design) then change the `text` property to `Read/Write`.

We also need to set its dimensions to `560, 150` under the size property. It's advisable to match its background color with the first groupbox (ActiveCaption). 

Let's add two radio buttons into this groupbox and change their text properties to `Activate read only for removable drives` and `Clear read only for removable drives` respectively.

![Both radioButtons](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/both-radiobuttons.jpg)

#### Adding the control buttons
To complete the UI, we need to add our control buttons. Drag and drop a button and place it just below the `Read/Write` groupbox. 

Then set the following properties for the button:
- Backcolor to `Black`.
- FlatStyle to `Popup`.
- Font name to `Perpetua Titling MT`. 
- Font size to `12`. 
- Forecolor to `White`.
- Size property to `100, 40`.


![Button properties](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/btn-properties.jpg)

Copy the button and paste it twice in a horizontal line (next to each other below the groupbox).

Then edit their `Text` properties to `OK`, `Cancel` and `Close` respectively. The final result should look like this:

![With all buttons](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-csharp/with-all-buttons.jpg)

### Step 3 - Adding code to the form
#### Adding required namespaces
To edit the form's code, right-click on the form (the teal background), then select `view code`. Visual Studio will load `Form1.cs`. 

Now, we can add the namespaces commented `new` just below the default ones:

```c#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Win32;                  // new
using System.Runtime.InteropServices;   // new
``` 

Our newly added namespaces:
- `Microsoft.Win32` - It provides us with a class that handles events that manipulate the system registry.

- `System.Runtime.InteropServices` - It provides support for COM interop and platform-invoke services.

#### Declaring and initializing variables
Just below the `Form1()` constructor, add the following code:

```c#
RegistryKey registryKey_1, registryKey_2;
Int32 rbtn_Value1, rbtn_Value2, usb_Ports_Status, read_write_Status;
string registryPath = "System\\CurrentControlSet\\Services\\USBSTOR";
string ReadAndWriteRegistryPath_1 = "System\\CurrentControlSet\\Control\\StorageDevicePolicies";
string ReadAndWriteRegistryPath_2 = "System\\CurrentControlSet\\Control";
bool isUserAdmin;
[DllImport("shell32")]static extern bool IsUserAnAdmin();
```

The strings in the above snippet contain paths to windows operating system device configurations (ie: windows registry).

####  On loading the form
In this section, we will add the code that will be executed immediately after our form starts.

In the `Form1` design, `double-click` on the `teal` background. You will be directed to the `Form1_Load()` method.

> To add code for the form loading event, double click the form itself and let it create the `Form_Load()` method for you. Copy pasting the whole method might cause your application to malfunction.

In the `Form_Load()` method, add the following code:
 
```C#
private void Form1_Load(object sender, EventArgs e)
        {
            isUserAdmin = IsUserAnAdmin();
            if (isUserAdmin == false) // If user is not an admin
            {
                MessageBox.Show("You don't have admin privileges", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error); // Show message
            }
            else
            {
                registryKey_1 = Registry.LocalMachine.OpenSubKey(registryPath, true);
                usb_Ports_Status = Convert.ToInt32(registryKey_1.GetValue("Start"));
                //check the current state of the usb ports,whether they are enabled or disabled
                // 3 for enabled & 4 for Disabled
                if (usb_Ports_Status == 3){
                    radioButton1.Checked = true;
                }else if (usb_Ports_Status == 4){
                    radioButton2.Checked = true;
                }registryKey_2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegistryPath_1, true);
                
                try{
                    read_write_Status = Convert.ToInt32(registryKey_2.GetValue("WriteProtect"));
                    //check the current state of the removable drive,whether its are write protected or not
                    // 1 for write protected & 0 for not write protected
                    if (read_write_Status == 1)
                    {
                        radioButton3.Checked = true;
                    }
                    else if (read_write_Status == 0)
                    {
                        radioButton4.Checked = true;
                    }
                }
                catch (NullReferenceException) { }
            }

        }
```

When the form loads, the above method checks if the current user running the program has admin privileges. It also assesses the status of the USB ports, then the read/write status of the plugged in removable drives. 

It then checks the `radio buttons` based on the status of the USB ports and the removable drives. ie: if the USB ports are already enabled, it checks the `enable USB ports` radio button option.

#### Radio buttons 
In our form, the radio buttons are in the order of 1 to 4 (ie: `radioButton1` to `radioButton4`).

The first two radiobuttons hold the values used to change the status of the USB ports. If the value is `3`, then they are `enabled`, and if it's `4` then they are `disabled`. 

The last two radiobuttons hold values for enabling/disabling `Read/Write` permissions for the removable drives. If the value is `1`, `readonly` is enabled, and if its `0` then `readonly` is disabled.

> NB: to add code for each radiobutton, double click the radiobutton and let it create the `radioButton_CheckedChanged()` method for you. Copy pasting the whole method might lead to errors.

Here is the code for all the radio buttons:

```c#
private void radioButton1_CheckedChanged(object sender, EventArgs e){
    groupBox1.Enabled = true;
    rbtn_Value1 = 3;
}

private void radioButton2_CheckedChanged(object sender, EventArgs e){
    groupBox1.Enabled = true;
    rbtn_Value1 = 4;
}

private void radioButton3_CheckedChanged(object sender, EventArgs e){
    rbtn_Value2 = 1;
}

private void radioButton4_CheckedChanged(object sender, EventArgs e){
    rbtn_Value2 = 0;
}
```

#### Buttons
We will use the `Click()` method to check if the buttons in our form have been pressed.

We will utilize `button1` (OK) to change the USB ports status and removable drives `read/write` permissions based on the values set by the radio buttons.

> NB: To add code for each button, double-click the button and let it create the `button_Click()` method for you. Copy pasting the whole method might lead to malfunctioning of your application

Here is the code for our `OK` button:

```c#
private void button1_Click(object sender, EventArgs e){
            try{
                registryKey_1 = Registry.LocalMachine.OpenSubKey(registryPath, true);
                registryKey_1.SetValue("Start", rbtn_Value1);
                if (groupBox1.Enabled == true)
                {
                    registryKey_2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegistryPath_2, true);
                    registryKey_2.CreateSubKey("StorageDevicePolicies");
                    registryKey_2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegistryPath_1, true);
                    registryKey_2.SetValue("WriteProtect", rbtn_Value2);
                }
            }
            catch (Exception ex){
               // In case of an error
            }
            if ((rbtn_Value1 == 3) && (rbtn_Value2 == 1)){
                MessageBox.Show("USB Ports and Readonly Enabled");
            }
            else if ((rbtn_Value1 == 3) && (rbtn_Value2 == 0)){
                MessageBox.Show("USB Ports Enabled \n     and \n Readonly Disabled");
            }else{
                MessageBox.Show("USB Port are disabled");
            }
        }
```

The `Cancel` button (button1) is used to `uncheck` the `checked radiobuttons` using the `Checked` property, as shown below:

```c#
private void button2_Click(object sender, EventArgs e)
    {
        radioButton1.Checked = false;
        radioButton2.Checked = false;
        radioButton3.Checked = false;
        radioButton4.Checked = false;
    }
```

The `Close` button (button3) is used to exit the application:

```c#
private void button3_Click(object sender, EventArgs e)
        {
            this.Close();
        }
```

### Step 4 - Adding the Manifest file
Our WinForms application will require `Admin` privileges to be able to make changes to the USB ports and the removable drives. 

This functionality requires us to add a `manifest` file that will help our application request admin privileges.

In the `Solution Explorer` sidebar, right-click on `IOManager` then `Add> New Item> Application Manifest File (Windows Only)> Add`  then open the generated `app.manifest` file. 

Modify the following line inside the `<security>` tag:

```xml
<requestedExecutionLevel level="asInvoker" uiAccess="false" />
```

With this :

```XML
<requestedExecutionLevel  level="requireAdministrator" uiAccess="false" />
```
This tells Windows to ensure that the app user is an admin.

Our `Form1.cs` file should look as shown below:

```c#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using Microsoft.Win32;                  // new
using System.Runtime.InteropServices;   // new

namespace IOManager
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        RegistryKey registryKey_1, registryKey_2;
        Int32 rbtn_Value1, rbtn_Value2, usb_Ports_Status, read_write_Status;
        string registryPath = "System\\CurrentControlSet\\Services\\USBSTOR";
        string ReadAndWriteRegistryPath_1 = "System\\CurrentControlSet\\Control\\StorageDevicePolicies";
        string ReadAndWriteRegistryPath_2 = "System\\CurrentControlSet\\Control";
        bool isUserAdmin;
        [DllImport("shell32")]static extern bool IsUserAnAdmin();

        private void Form1_Load(object sender, EventArgs e)
        {
            isUserAdmin = IsUserAnAdmin();
            if (isUserAdmin == false)
            {
                MessageBox.Show("You don't have admini privileges", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            else
            {
                registryKey_1 = Registry.LocalMachine.OpenSubKey(registryPath, true);
                usb_Ports_Status = Convert.ToInt32(registryKey_1.GetValue("Start"));
                //check the current state of the usb ports,whether they are enabled or disabled
                // 3 for enabled & 4 for Disabled
                if (usb_Ports_Status == 3)
                {
                    radioButton1.Checked = true;
                }
                else if (usb_Ports_Status == 4)
                {
                    radioButton2.Checked = true;
                }
                registryKey_2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegistryPath_1, true);
                try
                {
                    read_write_Status = Convert.ToInt32(registryKey_2.GetValue("WriteProtect"));
                    //check the current state of the removable drive,whether its are write protected or not
                    // 1 for write protected & 0 for not write protected
                    if (read_write_Status == 1)
                    {
                        radioButton3.Checked = true;
                    }
                    else if (read_write_Status == 0)
                    {
                        radioButton4.Checked = true;
                    }
                }
                catch (NullReferenceException) { }
            }

        }

        
        private void radioButton1_CheckedChanged(object sender, EventArgs e)
        {
            groupBox1.Enabled = true;
            rbtn_Value1 = 3;
        }

        private void radioButton2_CheckedChanged(object sender, EventArgs e)
        {
            groupBox1.Enabled = true;
            rbtn_Value1 = 4;
        }

        private void radioButton3_CheckedChanged(object sender, EventArgs e)
        {
            rbtn_Value2 = 1;
        }

        private void radioButton4_CheckedChanged(object sender, EventArgs e)
        {
            rbtn_Value2 = 0;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                registryKey_1 = Registry.LocalMachine.OpenSubKey(registryPath, true);
                registryKey_1.SetValue("Start", rbtn_Value1);
                if (groupBox1.Enabled == true)
                {
                    registryKey_2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegistryPath_2, true);
                    registryKey_2.CreateSubKey("StorageDevicePolicies");
                    registryKey_2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegistryPath_1, true);
                    registryKey_2.SetValue("WriteProtect", rbtn_Value2);
                }
            }
            catch (Exception ex)
            { }
            if ((rbtn_Value1 == 3) && (rbtn_Value2 == 1))
            {
                MessageBox.Show("USB Ports and Readonly Enabled");
            }
            else if ((rbtn_Value1 == 3) && (rbtn_Value2 == 0))
            {
                MessageBox.Show("USB Ports Enabled \n     and \n Readonly Disabled");
            }
            else
            {
                MessageBox.Show("USB Port are disabled");
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            radioButton1.Checked = false;
            radioButton2.Checked = false;
            radioButton3.Checked = false;
            radioButton4.Checked = false;
        }

        private void button3_Click(object sender, EventArgs e)
        {
            this.Close();
        }
        
    }
}
```

### Testing
We can now run and test the application. Remember to unplug and then re-plug USB devices after checking the `radiobuttons` and pressing `OK`.

> Note that when you run the app in Visual Studio, it will need to restart to access admin privileges. Therefore, grant the app permission to make changes.

### Conclusion
In this tutorial, we have learned how to design a Winforms application, work with USB ports, as well as read/write permissions on removable drives. 

We have also looked at how to enable admin privileges in our application. Feel free to add more functionalities to the app.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)