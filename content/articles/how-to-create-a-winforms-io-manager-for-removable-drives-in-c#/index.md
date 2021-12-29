We use removable IO devices now and then to transfer files to and from our PCs and to also store files. Sometimes we might need a tool to manage these devices and how they interact with our computers for security, privacy, and other reasons.

In this tutorial, we will create a .NET desktop tool that shall enable us to enable or disable USB ports on a windows computer and also change the Read/Write permissions of the removable drives. We shall start by going through a detailed guide of creating the user interface, then we shall work on the code behind the above operations.

### Table of contents
- [Prerequisites](#prerequisites)
- [Creating the project](#step-1---creating-the-project)
- [Designing the user interface](#step-2---designing-the-user-interface)
- [Adding code to the form](#step-3---adding-code-to-the-form)
- [Adding the manifest file](#step-4---adding-the-manifest-file)
- [Testing](#testing)
- [Conclusions](#conclusions)

### Prerequisites
To be able to follow through this tutorial, you will need:
1. [Visual Studio](https://visualstudio.microsoft.com/downloads/) with the .NET framework.
2. Basic knowledge in C# and the .NET framework.
3. A flash disk or any other removable drives for testing purposes.

### Step 1 - Creating the project
We shall start by opening Visual Studio and selecting `create new project` from the `Get started` options.
On the next window(Create a new project), we will select the `Windows Forms App` template then select `Next`.

![creating a new winforms project](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/create-a-new-project.jpg)
  
In the next window(Configure your new project), we shall rename our project to `IOManager`, leave the other fields with their default values and select `Next`.
![configure your new project](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/configure.jpg)

In the `Additional information` window, we shall leave it to the default value and hit `Create`.

![Additional information](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/additional-info.jpg)

After loading the project, you should see something similar to this:

![initial window](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/initial-window.jpg)

### Step 2 - Designing the user interface

#### 2.1 -Renaming the form title
To rename the form title, click on  `Form 1` and in the `properties`  sidebar under `Text`, change to `I/O Manager`:

![renaming Form1](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/renaming-form1.jpg)

#### 2.2 - Changing the background color
Click the `I/O Manager` form and in the `Properties`  sidebar under `BackColor`, change the background color. In this case, we shall change ours to the color `Teal`

![changing form1 background color](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/form1-bgcolor.jpg)

#### 2.3 - Changing form border
This changes how the border of our form shall look: ie removes the `maximize` and `minimize` buttons. To do it, click the `I/O Manager` form and in the `Properties`  sidebar under `FormBorderStyle`, select `FixedToolWindow`:

![form border style](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/form-border-style.jpg)

#### 2.4 - Add instructions label
From the `Toolbox`, drag and drop a label at the top center of the form. Click on the label and in its properties under `Text`, change to `Please unplug then plug all USB devices`.  While still in its properties, change the font size to `14` and set bold to `True` :

![label1 properties](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/label1.jpg)

#### 2.5 - Adding the USB ports controls 
From the `Toolbox`, drag and drop a groupbox just below the instruction label and set its dimensions to `560, 150` under its size property. Change the `groupBox1` text to `Enable/Disable`, then change its background color to a more compatible color. We shall change ours to the color `ActiveCaption`.

Let's drag and drop two radio buttons into the groupbox and change their `text` properties to `Enable USB Ports` and `Disable USB Ports` :
By now you should have something like this :

![groupbox1](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/groupbox1.jpg)

#### 2.6 - Adding the Read/Write controls
In this step, we will drag and drop another groupbox just below the first one(make sure you align them for a better design) then change its text property to `Read/Write`, and set its dimensions to `560, 150` under its size property.
It is also advisable to match its background color with the other one(ActiveCaption). We will also go on and add two radio buttons into this groupbox and change their text properties to `Activate readonly for removable drives` and `Clear readonly for removable drives` respectively :

![both radioButtons](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/both-radiobuttons.jpg)

#### 2.7 - Adding the control buttons
Now what is left for the UI to be complete is the addition of the control buttons. For these, we shall drag and drop a button and place it just below the `Read/Write` groupbox. Then set the following properties for the button:
-  Backcolor to `Black`
- FlatStyle to `Popup` 
- Font name to `Perpetua Titling MT` 
- Font size to `12` 
- Forecolor to `White`
- it's size property to `100, 40`


![button properties](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/btn-properties.jpg)

Now copy the button and paste it twice in a horizontal line(next to each other below the groupbox)
Then edit their `Text` properties to `OK`, `Cancel` and `Close` respectively. Our final result should look like this :

![with all buttons](/engineering-education/how-to-create-a-winforms-io-manager-for-removable-drives-in-c#/with-all-buttons.jpg)

### Step 3 - Adding code to the form
#### 3.1 Adding required namespaces
To edit the form's code, right-click on the form(the teal background), then select `view code`, and Visual Studio will load `Form1.cs` for you. 

Now we can add the namespaces commented `new` just below the default ones :
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

using Microsoft.Win32;                  // new
using System.Runtime.InteropServices;   // new
``` 

Our newly added namespaces:
- `Microsoft.Win32` - it provides us with a class that handles events that manipulate the system registry.

- `System.Runtime.InteropServices` - it provides us support for COM interop and platform invoke services.

#### 3.2 - Declaring and initializing variables
Just below the `Form1()` constructor, add the following code:
```C#
RegistryKey Regkey, RegKey2;
Int32 rbtn_Value1, rbtn_Value2, usb_Ports_Status, read_write_Status;
string Regpath = "System\\CurrentControlSet\\Services\\USBSTOR";
string ReadAndWriteRegPath2 = "System\\CurrentControlSet\\Control";
string ReadAndWriteRegPath = "System\\CurrentControlSet\\Control\\StorageDevicePolicies";
bool isAdmin;
[DllImport("shell32")]static extern bool IsUserAnAdmin();
```
The strings in the above snippet contain paths to windows operating system device configurations ie: windows registry.

#### 3.3 - On loading the form
Now we are going to add the code that will be executed immediately after our form starts. In the Form1 design, double-click on the teal background and you will be taken to the `Form1_Load()` method.

> NB: to add code for the form loading event, double click the form itself and let it create the `Form_Load()` method for you. Copy pasting the whole method might lead to malfunctioning of your application

In this method add the following code :
 
```C#
private void Form1_Load(object sender, EventArgs e)
        {
            isAdmin = IsUserAnAdmin();
            if (isAdmin == false)
            {
                MessageBox.Show("You don't have admini privileges", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            else
            {
                Regkey = Registry.LocalMachine.OpenSubKey(Regpath, true);
                usb_Ports_Status = Convert.ToInt32(Regkey.GetValue("Start"));
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
                RegKey2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegPath, true);
                try
                {
                    read_write_Status = Convert.ToInt32(RegKey2.GetValue("WriteProtect"));
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
When the form loads, the above method checks if the current user running the programm has admin privillages, the status of the USB ports, then the read/write status of the pluged in removable drives. It then checks the radio buttons based on the status of the USB ports and the removable drives. ie: if the USB ports are already enabled, it checks the `enable usb ports` radio button option.

#### 3.4 - Radio buttons 
In our form, the radio buttons are in the order of 1 to 4 ie: `radioButton1` . . . `radioButton4`. 

The first two radiobuttons hold the values used to change the status of the USB ports. If the value is `3`, then they are `enabled`, and if it's `4` then they are `Disabled`. 

The last two radiobuttons hold values for enabling/disabling `Read/Write` permissions for the removable drives. If the value is `1`, `readonly` is enabled, and if its `0` then `readonly` is disabled.

> NB: to add code for each radiobutton, double click the radiobutton and let it create the `radioButton_CheckedChanged()` method for you. Copy pasting the whole method might lead to malfunctioning of your application

Here is the code for all the radio buttons :

```C#
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

```

#### 3.5 - Buttons
We will use the `Click()` method to check if the buttons in our form are clicked.

The `OK` button being `button1`, we will use this button to change the USB ports status and removable drives read/write permissions based on the values that are set by the radio buttons.

> NB: to add code for each button, double click the button and let it create the ` button_Click()` method for you. Copy pasting the whole method might lead to malfunctioning of your application

Here is the code for our `OK` button:

```C#
private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                Regkey = Registry.LocalMachine.OpenSubKey(Regpath, true);
                Regkey.SetValue("Start", rbtn_Value1);
                if (groupBox1.Enabled == true)
                {
                    RegKey2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegPath2, true);
                    RegKey2.CreateSubKey("StorageDevicePolicies");
                    RegKey2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegPath, true);
                    RegKey2.SetValue("WriteProtect", rbtn_Value2);
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
                MessageBox.Show("USB Ports Enabled /n Readonly Disabled");
            }
            else
            {
                MessageBox.Show("USB Port are disabled");
            }
        }
```
The `Cancel` button(button1) is used to uncheck the checked radiobuttons using the `Checked` property . Here is its code:
```C#
private void button2_Click(object sender, EventArgs e)
    {
        radioButton1.Checked = false;
        radioButton2.Checked = false;
        radioButton3.Checked = false;
        radioButton4.Checked = false;
    }
```
The `Close` button(button3) is used to exit the application. Here is the code:
```C#
private void button3_Click(object sender, EventArgs e)
        {
            this.Close();
        }
```

### Step 4 - Adding the Manifest file
Our WinForms application will require `Admin privileges to be able to make changes to the USB ports and the removable drives. This requires us to add a manifest file that will help our application request admin privileges to run.

In the `Solution Explorer` sidebar, right-click on `IOManager` then `Add >New Item >Application Manifest File(Windows Only) >Add`  then open the `app.manifest` file. Inside the ```<security>``` tags, replace the below line :

```XML 
<requestedExecutionLevel level="asInvoker" uiAccess="false" />
```
with this :
```XML
<requestedExecutionLevel  level="requireAdministrator" uiAccess="false" />
```
This tells windows to ensure that the one running the application is an admin.

Here how our `Form1.cs` file should look like:
> NB: Avoid copy-pasting the whole snippet, you should double click a form element to create its method. Use this to compare and verify the structuring of your code.

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
        RegistryKey Regkey, RegKey2;
        Int32 rbtn_Value1, rbtn_Value2, usb_Ports_Status, read_write_Status;
        string Regpath = "System\\CurrentControlSet\\Services\\USBSTOR";
        string ReadAndWriteRegPath2 = "System\\CurrentControlSet\\Control";
        string ReadAndWriteRegPath = "System\\CurrentControlSet\\Control\\StorageDevicePolicies";
        bool isAdmin;
        [DllImport("shell32")]static extern bool IsUserAnAdmin();

        private void Form1_Load(object sender, EventArgs e)
        {
         isAdmin = IsUserAnAdmin();
         if (isAdmin == false)
         {
          MessageBox.Show("You don't have admin privilleges","Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
         }
         else
            {
                Regkey = Registry.LocalMachine.OpenSubKey(Regpath, true);
                usb_Ports_Status = Convert.ToInt32(Regkey.GetValue("Start"));
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
                RegKey2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegPath, true);
                try
                {
                    read_write_Status = Convert.ToInt32(RegKey2.GetValue("WriteProtect"));
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
                Regkey = Registry.LocalMachine.OpenSubKey(Regpath, true);
                Regkey.SetValue("Start", rbtn_Value1);
                if (groupBox1.Enabled == true)
                {
                    RegKey2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegPath2, true);
                    RegKey2.CreateSubKey("StorageDevicePolicies");
                    RegKey2 = Registry.LocalMachine.OpenSubKey(ReadAndWriteRegPath, true);
                    RegKey2.SetValue("WriteProtect", rbtn_Value2);
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
                MessageBox.Show("USB Ports Enabled /n Readonly Disabled");
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
Run the application now and remember to unplug then plug in the USB devices after checking the radiobuttons and pressing OK.
> NB: Note that when you run the app in Visual Studio, it will need to restart with admin privileges to run the app. So when it asks you for permission to make changes, allow it.

### Conclusions
In this tutorial, we have learned how to design a Winforms application, work with USB ports and read/write permissions on removable drives. We have also looked at changing the permission level of our app to run with admin privileges.
Feel free to add more functionalities to the app and implement the above ideas.

