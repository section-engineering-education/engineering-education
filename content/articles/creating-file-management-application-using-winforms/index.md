---
layout: engineering-education
status: publish
published: true
url: /creating-file-management-application-using-winforms/
title: How to Create a File Management Application using WinForms
description: This tutorial will walk the reader through how to create a file management application using WinForms.
author: sir-maina
date: 2022-03-22T00:00:00-15:25
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-file-management-application-using-winforms/hero.jpg
    alt: How to Create a File Management Application using WinForms Hero Image
---
File management encompasses everything from generating and editing files to deleting them from a computer's hard drive.
<!--more-->
It is important to learn this when it comes to data that needs to be handled with care and stored for security reasons.

In this tutorial, we will learn how to create files and folders, write them in your preferred formats, read the memory data, delete the initially recorded files, and view all data using WinForms.

### Table of contents
- [Prerequisites](#prerequisites)
- [Step 1. Visual Studio setup](#step-1-visual-studio-setup)
- [Step 2. Designing the WinForm](#step-2-designing-the-winform)
  - [Modifying the form name](#modifying-the-form-name)
  - [Using controls to construct the form](#using-controls-to-construct-the-form)
  - [1. File browsing controls](#1-file-browsing-controls)
  - [2. Create, write, read, and delete controls](#2-create-write-read-and-delete-controls)
- [Step 3. Writing the C# code](#step-3-writing-the-c-code)
  - [Including the necessary namespace](#including-the-necessary-namespaces)
  - [Setting up the file path](#setting-up-the-file-path)
  - [Coding the controls](#coding-the-controls)
- [Step 4. Debugging the application](#step-4-debugging-the-application)
- [Conclusion](#conclusion)

### Prerequisites
- A basic background knowledge in C# programming language and .NET framework.
- [Visual Studio](https://visualstudio.microsoft.com/vs/community/) installed on your computer.

Let's get started!!

### Step 1. Visual Studio setup
Open Visual Studio and select `create new project` in the get started window.

![Creating a new project](/engineering-education/creating-file-management-application-using-winforms/create-a-new-project.jpg)

Next, click on `Visual C#` and select then `Windows Desktop` from its rows data.

At the right side of the window, select `Windows Forms App (.Net Framework)` as the default template for this project.

Go to the bottom of the window, and rename the project to `File manager`, you can also change the project location by clicking the browse button and choosing where the project will be saved. 
Once you're done, click `OK` to finish setting up the project

![Configuring the project settings](/engineering-education/creating-file-management-application-using-winforms/configuring-the-project.jpg)

### Step 2. Designing the WinForm
Here we will modify the form by adding controls such as labels, buttons, e.t.c., which will help the user interact with the application.

#### Modifying the form name
First, we need to rename the form from `Form 1` to `File manager` by changing its text property, as shown in the image below.

The start position property of the form is optional to modify since it just sets its position on the device screen during its run-time, which is not that important.

![Renaming the form application](/engineering-education/creating-file-management-application-using-WinForms/changing-the-name-of-the-form.jpg)

#### Using controls to construct the form
We will be using standard tabs in our project windows such as `ToolBox` and the `Properties` to modify the form structure.

To access the ToolBox, go to the upper row of the visual studio window, click ` View -> ToolBox`, a tab will pop up at the left side of the main window.

To access the properties window, click ` View -> Properties` or right-click on the control you need to change its properties in the form; choose option property in the dialogue box that appears.

We will design the user interface into two parts to avoid complexity.

#### 1. File browsing controls
First, we will design the UI to navigate and access the internal storage files. To get started, follow the below steps;

- From the `Toolbox` search for a `PictureBox`. Drag and drop it to the left upper side of the form. Under its properties, set the name as `pictureBox1` and change the size mode to `stretch mode`, enabling the picture you will load to fit the size of the pictureBox1. 
To load a picture in the PictureBox, click the `bold forward label` in the picture box control, and a dialogue box will appear. Under PictureBox Tasks, click on `choose image -> local resources -> import -> choose image -> open -> OK`. A picture will be loaded in control PictureBox.

- Drag and drop two buttons and align them horizontally in the PictureBox. Name the first button as `btnPrevious` and change its `text` to `<-` in its properties. To the second button, do the same by changing its name to `btnNext` and its `text` to `->`.

- Next, drag and drop a label to the form and align it horizontally to the buttons added in the previous step, then change the labels’ `text` property to `Path.`

- Drag and drop a text box into the form and align it horizontally to the label path. Under its properties, set the name to `txtPath` and leave the text as `null(empty)`.

- Drag and drop another button and align it horizontally with the text box. Change its name property to `btnOpen` and the text property to `Open`.

- Finally, drag and drop a web browser just below the picture box. Under its properties, leave the default name as `web browser` and set the web browser size to (594,270), or set the size to your preferred dimensions. 

Your final design should look like the image below.

![File browsing controls](/engineering-education/creating-file-management-application-using-winforms/files-browsing-controls.jpg)

#### 2. Create, write, read, and delete controls
Apart from the file browsing controls, we will design a UI that will help us create a new file, write files, read the files initially recorded, and delete the files created. Follow the steps below to create the UI.

- First, we need a menu strip to hold some file items that we will code later. Drag and drop a menu strip into the form from the toolbox. 
The menu strip jumps outside and just below the form. 

In the menu strip properties, set the name as `menustrip1`, back color as `Active caption`, Dock as `Bottom`, and Text direction as `Horizontal`.

- To add menu items, click the menu control and edit the item's row from left to right as `File exploitation`. You can add the rest of the rows according to the manipulation of the file management. In our case, we will only work in the first row. 

Add the following items in the file's column exploitation row; `create the file`, `read a file, and `delete the file.`

- Next, drag and drop a panel just below the web browser. Change the back color to `Active caption` in the panel properties and set the size property to `(300,130)`.

- We will add the rest of the controls inside the panel.

- First, drag and drop four labels in the panel and arrange them vertically to each other. Change their text property to; `Name,` `Email`, `Gender`, and `Phone`, respectively.

- Next, drag and drop three text boxes and arrange them vertically and horizontally to the name, email, and phone labels. Name the text boxes as `NameTb`, `EmailTb`, `PhoneTb` respectively under their name properties.

- Drag and drop a Combobox and align it horizontally to the gender label. In the items property of the Combobox, double click to add collections of items which will be selected and populated as default value when recording student details. 

Add the following collection of items; Male and Female. Set the Dropdown style of the Combobox to `Dropdown list`.

Drag and drop two buttons on the panel and align them vertically and horizontally to the gender combo and phone text boxes. Change the name property of the first button to `AddStudentbtn` and set its text property to `Write/Add Student.` Also, change the second button's name property to `Clearbtn` and set its text property to `Clear.`

Your design should look like the image below.

![Create, write, delete, and read operetions](/engineering-education/creating-file-management-application-using-winforms/create-write-read-delete-operations.jpg)

Your final form design should look like the one below:

![Complete file manager](/engineering-education/creating-file-management-application-using-winforms/complete-file-manager.jpg)

### Step 3. Writing the C# code
To write the `C#` code, double click on the form design, the file `manager.cs` will be loaded.

#### Including the necessary namespaces

```C#
using System;
using System.IO;//File and data stream types are included, as are those that facilitate basic file and directory operations.
using System.Windows.Forms;//Programs built using these classes can take advantage of the Version of Windows's rich UI.
```

#### Setting up the file path
This is important because we will create a folder where the written data will reside in the memory in a precise manner. We can also specify the format that it will be written in, for this project all our data will be stored in `.txt files`.

Write the following code snippet.

```C#
 string path = Environment.CurrentDirectory + "/" + "Students.txt";// The path where files will be written as a txt file.
```

#### Coding the controls
> Note: To code within a method, we need first double-click on the control for the file `manager.cs` to load.

In the `<-` (button previous) button, we add the following code that will undo a file browsing in the web browser.

```C#
 private void btnPrevious_Click(object sender, EventArgs e)
        {
            if (webBrowser.CanGoBack)
                webBrowser.GoBack();
        }
```

In the `->` (button next) button, we add the following code below. The code will be able to redo the file browsing.

```C#
   private void btnNext_Click(object sender, EventArgs e)
        {
            if (webBrowser.CanGoForward)
                webBrowser.GoForward();
        }
```
In the button ` Open`, add the following code that will help to navigate the files in the memory disk.

In the code below, the open file dialog box is displayed once the open button is clicks.
The description will give more information on what we are supposed to do, i.e., select the folder we want to see its content.
The web browser displays the contents if the exact file path is selected.

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

Add the following code in the `createFile` menu. The create file item code will create a new file every time a user needs to create a new student record if the file doesn't exist in the memory.

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
The StreamReader reads a text file line-by-line from the start to the end.

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

In the ` Delete file` menu item, add the following code that will help you to delete files initially created using the file path.
We will use the if statement to check the text file exists in the memory. If it does, then it can be automatically deleted.

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

In the `Add student/Write` button inside the panel, add the following code. It can permanently record the data of the student that they typed in the textboxes.
The StreamWriter is a class in charge of writing data to a stream.

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

In the `Clear` button in the panel, add the following code, this code will help delete the data in the text boxes and edit new a student data.

```C#
  private void Clearbtn_Click(object sender, EventArgs e)// To clear data initially in the textboxes
        {
            NameTb.Text = "";
            EmailTb.Text = "";
            GenderCb.Text = "";
            PhoneTb.Text = "";
        }
```

We will add the code below to ensure that the user doesn't quit the application without knowing. A dialogue box will pop up asking you to select "Yes" or "No", if they want to leave or stay on the application.

The form exiting activity terminates when you choose `No` using the `e.cancel = true;` statements. To access the form closing method, navigate to form properties, and under the `Formclosing`, double click to load and write the following code below.

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

### Step 4. Debugging the application
Run the application and enter the information you need to record and access.
You can start the app by simply clicking the `Start` button on the toolbar.

![Running the application](/engineering-education/creating-file-management-application-using-winforms/the-start-button.jpg)

The image below shows how my application is executing my files. I hope you achieve the same result.

![Working application](/engineering-education/creating-file-management-application-using-winforms/working-file-manager.jpg)

### Conclusion
We have created a file manager using WinForms. We also learned how to implement data files by creating, writing, reading, and deleting them. You can add more controls involving file management and publishing your application.

Happy coding!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
