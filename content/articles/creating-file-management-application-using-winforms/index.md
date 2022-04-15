---
layout: engineering-education
status: publish
published: true
url: /creating-file-management-application-using-winforms/
title: How to Create a File Management Application using WinForms
description: This tutorial will walk the reader through how to create a file management application using WinForms.
author: maina-davis
date: 2022-04-13T00:00:00-09:25
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-file-management-application-using-winforms/hero.jpg
    alt: How to Create a File Management Application using WinForms Hero Image
---
File management encompasses everything from generating and editing files to deleting them from a computer's hard drive.
<!--more-->
It is important to learn this functionality when it comes to data that needs to be handled with care and stored for security reasons.

In this tutorial, we will learn how to create files and folders, write them in different formats, read the memory data, delete the initially recorded files, and view all data using WinForms.

### Table of contents
- [Prerequisites](#prerequisites)
- [Step 1 - Visual Studio setup](#step--1-visual-studio-setup)
- [Step 2 - Designing the WinForm](#step--2-designing-the-winform)
  - [Modifying the form name](#modifying-the-form-name)
  - [Using controls to construct the form](#using-controls-to-construct-the-form)
- [Step 3 - Writing the C# code](#step--3-writing-the-c-code)
  - [Including the necessary namespace](#including-the-necessary-namespaces)
  - [Setting up the file path](#setting-up-the-file-path)
  - [Coding the controls](#coding-the-controls)
- [Step 4 - Debugging the application](#step--4-debugging-the-application)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, you need:
- A basic background knowledge in C# programming language and .NET framework.
- [Visual Studio](https://visualstudio.microsoft.com/vs/community/) installed on your computer.

Let's get started!

### Step 1 - Visual Studio setup
Open Visual Studio and select `create new project` in the `get started` window.

![Creating a new project](/engineering-education/creating-file-management-application-using-winforms/create-a-new-project.jpg)

Next, click on `Visual C#` and select `Windows Desktop` from its `rows` data.

On the right side of the window, select `Windows Forms App (.Net Framework)` as the default template for this project.

Navigate to the bottom of the window, and rename the project to `File manager`, you can also change the project location by clicking the browse button and choosing where the project will be saved. 

Once you're done, click `OK` to finish setting up the project

![Configuring the project settings](/engineering-education/creating-file-management-application-using-winforms/configuring-the-project.jpg)

### Step 2 - Designing the WinForm
Here we will modify the form by adding controls such as labels, buttons, e.t.c., which will help the user interact with the application.

#### Modifying the form name
First, we need to rename the form from `Form 1` to `File manager`. We do this by changing its text property, as shown in the image below.

> The start position property of the form is optional to modify since it just sets its position on the device during its run-time.

![Renaming the form application](/engineering-education/creating-file-management-application-using-winforms/changing-the-name-of-the-form.jpg)

#### Using controls to construct the form
We will be using standard tabs in our project windows such as `ToolBox` and the `Properties` to modify the form structure.

To access the `ToolBox`, go to the upper row of the Visual Studio window, click ` View -> ToolBox`, and a tab will pop up on the left side of the main window.

To access the properties window, click ` View -> Properties` or right-click on the control you need to change its properties in the form; choose option property in the dialogue box that appears.

We will design the user interface into two parts to avoid complexity.

#### 1. File browsing controls
First, we will design the UI to navigate and access the internal storage files. 

To get started, follow the steps below:

From the `Toolbox` search for a `PictureBox`. Drag and drop it to the left upper side of the form. 

Under its `properties`, set the name as `pictureBox1` and change the size mode to `stretch mode`. This enables the picture you will load to fit the size of the pictureBox1. 

To load a picture in the PictureBox, click the `bold forward label` in the picture box control, and a dialogue box will appear. 

Under `PictureBox Tasks`, click on `choose image -> local resources -> import -> choose image -> open -> OK`. A picture will be loaded in `control PictureBox`.

The next step is to drag and drop two buttons and align them horizontally in the PictureBox. Name the first button as `btnPrevious` and change its `text` to `<-` in its properties. 

For the second button, change its name to `btnNext` and its `text` to `->`.

Drag and drop a label to the form and align it horizontally to the buttons added in the previous step, then change the labels' `text` property to `Path.`

Drag and drop a `text box` into the form and align it horizontally to the label path. Under its properties, set the name to `txtPath` and leave the text as `null(empty)`.

Drag and drop another button and align it horizontally with the text box. Change its name property to `btnOpen` and the text property to `Open`.

Finally, drag and drop a web browser just below the picture box. Under its properties, leave the default name as `web browser` and set the web browser size to (594,270), or input your preferred dimensions. 

Your final design should look as shown below.

![File browsing controls](/engineering-education/creating-file-management-application-using-winforms/files-browsing-controls.jpg)

#### 2. Create, write, read, and delete controls
Apart from the file browsing controls, we will design a UI that will help us create a new file, write files, read stored files, and delete generated files. 

Follow the steps below to create the UI:

First, we need a menu strip to hold some file items that we will code later. Drag and drop a menu strip into the form from the toolbox. The menu strip is positioned outside and just below the form. 

In the menu strip properties, set the name as `menustrip1`, back color as `Active caption`, Dock as `Bottom`, and Text direction as `Horizontal`.

To add menu items, click the menu control and edit the item's row from left to right as `File exploitation`. 

You can add the rest of the rows according to the file management functions. In our case, we will only work in the first row. 

Add the following items in the file's column exploitation row; `create the file`, `read a file`, and `delete the file`.

Next, drag and drop a panel just below the web browser. Change the back color to `Active caption` in the panel properties and set the size property to `(300,130)`.

We will add the rest of the controls inside the panel, as discussed below:

First, drag and drop four labels in the panel and arrange them vertically to each other. Change their text property to; `Name,` `Email`, `Gender`, and `Phone`, respectively.

Next, drag and drop three text boxes and arrange them vertically and horizontally to the `name, email, and phone` labels. Name the text boxes as `NameTb`, `EmailTb`, `PhoneTb` respectively under their name properties.

Drag and drop a `Combobox` and align it horizontally to the gender label. In the `items` property of the Combobox, double-click to add collections of items that will be selected and populated as default values when recording student details. 

Add the collection of items as *Male and Female*. Set the Dropdown style of the Combobox to `Dropdown list`.

Drag and drop two buttons on the panel and align them vertically and horizontally to the gender combo and phone text boxes. 

Change the name property of the first button to `AddStudentbtn` and set its text property to `Write/Add Student.` 

Also, change the second button's name property to `Clearbtn` and set its text property to `Clear.`

Your design should appear as follows:

![Create, write, delete, and read operetions](/engineering-education/creating-file-management-application-using-winforms/create-write-read-delete-operations.jpg)

The final form design is shown below:

![Complete file manager](/engineering-education/creating-file-management-application-using-winforms/complete-file-manager.jpg)

### Step 3 - Writing the C# code
To write the `C#` code, double-click on the form design, and the file `manager.cs` will be loaded.

#### Including the necessary namespaces

```C#
using System;
using System.IO;//File and data stream types are included, as are those that facilitate basic file and directory operations.
using System.Windows.Forms;//Programs built using these classes can take advantage of the Version of Windows's rich UI.
```

#### Setting the file path
This is important because we will create a folder where the written data will reside in the memory. 

We can also specify the format that it will be written in, for this project all our data will be stored in `.txt` files.

Add the following code:

```C#
 string path = Environment.CurrentDirectory + "/" + "Students.txt";// The path where files will be written as a txt file.
```

#### Coding the controls
> Note: To code within a method, we first need to double-click on the control for the file `manager.cs` to load.

In the `<-` (button previous) button, we add the following code to undo a file browsing in the web browser:

```C#
 private void btnPrevious_Click(object sender, EventArgs e)
        {
            if (webBrowser.CanGoBack)
                webBrowser.GoBack();
        }
```

In the `->` (button next) button, we add the code below to enable file browsing:

```C#
   private void btnNext_Click(object sender, EventArgs e)
        {
            if (webBrowser.CanGoForward)
                webBrowser.GoForward();
        }
```

In the button ` Open`, add the following code to navigate the files in the memory disk.

In the code below, the open file dialog box is displayed once the `open` button is clicked.

The description will give more information on what we are supposed to do, i.e., select the folder we want to see its content. The web browser displays the contents if the exact file path is selected.

```C#
  private void btnOpen_Click(object sender, EventArgs e)
        {
            using(FolderBrowserDialog fd = new FolderBrowserDialog() { Description = "Choose path here" })
            {
                if (fd.ShowDialog() == DialogResult.OK)
                {
                    webBrowser.Url = new Uri(fd.SelectedPath);
                    txtPath.Text = fd.SelectedPath;
                }
            }
        }
```

Add the code below in the `createFile` menu. This code will create a new file every time a user needs to create a `new student` record and the file doesn't exist in the memory.

```C#
 private void createFileToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (File.Exists(path))
            {
                File.CreateText(path);
                MessageBox.Show("File Created Successfully");
            }
        }
```

In the `Read file` menu item, add the following code to help view the data record via the web browser.

The `StreamReade`r reads a text file line-by-line from the start to the end.

```C#
  private void readFileToolStripMenuItem_Click(object sender, EventArgs e)
        {
            using (StreamReader sr = new StreamReader(Application.StartupPath + "\\Students\\"
                + NameTb.Text + "" + EmailTb.Text + "" + GenderCb.Text + "" + PhoneTb.Text + ".txt"))// To read a separate file for each student
            {
                webBrowser.DocumentText = sr.ReadToEnd();
                sr.Close();
            }
        }
```

In the ` Delete file` menu item, add the code below to delete files that were initially created using the file path.

We will use the if statement to check if the text file exists in the memory. If it does, then it can be automatically deleted.

```C#
private void deleteFileToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (File.Exists(path))
            {
                File.Delete(Application.StartupPath + "\\Students\\"
                + NameTb.Text + "" + EmailTb.Text + "" + GenderCb.Text + "" + PhoneTb.Text + ".txt");// Will delete record initially written in the folder student
                MessageBox.Show(" Are You Sure to Delete file?");
            }
        }
```

In the `Add student/Write` button inside the panel, add the following code. It will record student data that was typed in the textboxes.

The `StreamWriter` class writes data to a stream.

```C#
  private void AddStudentbtn_Click(object sender, EventArgs e)
        {
            using (StreamWriter sw = new StreamWriter(Application.StartupPath +"\\Students\\"
                + NameTb.Text + "" + EmailTb.Text+"" +GenderCb.Text +"" + PhoneTb.Text + ".txt"))//Write on a separate file for each Student
            {
                sw.WriteLine(label2.Text + "" + NameTb.Text);
                sw.WriteLine(label3.Text + "" + EmailTb.Text);
                sw.WriteLine(label4.Text + "" + GenderCb.Text);
                sw.WriteLine(label5.Text + "" + PhoneTb.Text);
                sw.Close();
            }
        }
```

In the `Clear` button in the panel, add the following code. It will allow us to delete existing data in the text boxes, as well as edit new student data.

```C#
  private void Clearbtn_Click(object sender, EventArgs e)// To clear data initially in the textboxes
        {
            NameTb.Text = "";
            EmailTb.Text = "";
            GenderCb.Text = "";
            PhoneTb.Text = "";
        }
```

We will add the code below to ensure that the user doesn't quit the application without knowing. 

A dialogue box will pop up asking them to confirm whether or not they should exist the application.

The activity terminates when you choose `No` using the `e.cancel = true;` statements. 

To access the form closing method, navigate to `form properties`, and under the `Formclosing`, double-click to load and write the following code:

```C#
 private void File_Mananger_FormClosing(object sender, FormClosingEventArgs e)
        {
            const string messages = "Please confirm closing the File Manager";
            const string caption = "Application Closing";
            var results = MessageBox.Show(messages, caption, MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            //If the button was proposed
            if (results == DialogResult.No)
            {
                e.Cancel = true;// cancel the closure of the form
            }
        }
```

### Step 4 - Debugging the application
Run the application and enter the information you need to record and access. You can start the app by simply clicking the `Start` button on the toolbar.

![Running the application](/engineering-education/creating-file-management-application-using-winforms/the-start-button.jpg)

The image below shows how the application is managing files.

![Working application](/engineering-education/creating-file-management-application-using-winforms/working-file-manager.jpg)

### Conclusion
In this tutorial, we have created a file manager using WinForms. We also learned how to implement data files by creating, writing, reading, and deleting them. 

You can now add more file management controls in other applications.

Happy coding!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)