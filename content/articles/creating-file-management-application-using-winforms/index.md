### Introduction
File management encompasses everything from generating and editing files to deleting them from a computer's hard drive.

It is crucial to consider when it comes to data that needs to be handled with care and recorded for other purposes such as security and future references.

We shall demonstrate how you can create files and folders, write data to them in your interested formats, read the memory data, delete the initially recorded files, and view all data using WinForms.

### Prerequisites
1. Basic c# programming language and .NET framework.
2. A machine with [Visual Studio](https://visualstudio.microsoft.com/vs/community/) running.

### Table of contents
- [Prerequisites](#prerequisites).
- [Visual Studio setup](#step-1-visual-studio-setup).
- [Designing the WinForm](#step-2-designing-the-winform).
- [Including the necessary namespace](#including-the-necessary-namespace).
- [Writting the C# code](#step-3-writting-c#-code)
- [Debugging the application](#step-4-debugging-the-application).
- [Conclusion](#conclusion).

Let's get started!!

### Step 1. Visual studio setup
- Open visual studio on your device.
- Select *`create new project`* in the Get Started window.

![Creating a new project](engineering-education/creating-file-management-application-using-winforms/create-a-new-project.jpg)

- Click *Visual C#* and select *` Windows Desktop`* from its rows data.
- On the right side of the window, select *`Windows Forms App (.Net Framework)`* as the default template for this project.
- On the bottom of the window, rename the project solution to *File manager*.
- You can change the project location by clicking the browse button and choosing where the project will be saved. Otherwise, let it remain in its default.
- Click *`OK`* to finish setting up the project solution.

![Configuring the project settings](engineering-education/creating-file-management-application-using-winforms/configuring-the-project.jpg)

### Step 2. Designing the WinForm
Here we shall be modifying the form by adding controls such as labels, buttons, e.t.c., which will help the user interact with the application.

#### Modifying the form name
First, we need to rename the form from *Form 1* to *File manager* by changing its text property, as shown in the image below.

The start position property of the form is optional to modify since it just sets its position on the device screen during its run-time, which is not that important.

![Renaming the form application](engineering-education/creating-file-management-application-using-WinForms/changing-the-name-of-the-form.jpg)

#### Using controls to construct the form
We shall be using common tabs in our project windows such as `ToolBox` and the `Properties` to modify the form structure.

To access the ToolBox, on the upper row of the Visual Studio window, click *` View -> ToolBox`*, and the tab will pop up on the left side of the main window.

To access the properties window, click *` View -> Properties`* or right-click on the control you need to change its properties in the form, in the dialogue box that will appear choose property.

#### 1. File browsing controls
- Open the Toolbox and search for a `PictureBox.` Drag and drop it to the form. Under its properties, let the name property remain default as *pictureBox1* and change the size mode to *stretchMode* to enable the picture you will load to fit the size of the pictureBox1. To load a picture in the PictureBox, click the *bold forward label* in the picture box, and a dialogue box will appear. Under PictureBox Tasks click *chooseImage -> local resources -> import -> choose image -> open -> OK*.
- Drag and drop two buttons from the toolbox. The first button name it *btnPrevious* and change its *text* to `<-` under its property. The second button name it as *btnNext8 and its *text* as `->.` These buttons will help us to navigate back and forth the web browser.
- Drag and drop a label and change its *text* property to `Path.`
- Drop a text box to the form name it *txtPath* and let the text remain *null(empty)*. It will help us access a file if you know the exact location of a file.
- Add another button to the form and name it *btnOpen*, and the text change to `Open.` This will be given the privileges to access the memory files and navigate between them to select a file that we need to project on the web browser. 
- Add a web browser from the toolBox to help us view all our files from memory. Under its name property, let it remain default as a web browser and set the size to (594,270). The size is optional, and you can set your size according to your desired dimensions. 

See the image below and compare it to your output design.

![File browsing controls](engineering-education/creating-file-management-application-using-winforms/files-browsing-controls.jpg)

#### 2. Create, write, read, and delete controls
- Open the toolbox, Drag, and drop a menu strip to the form. 
- In the menu strip properties set the name -> *menustrip1*, backColor -> *ActiveCaption*, Dock -> *Bottom*, TextDirection -> *Horizontal*.
- Edit the menu items row from left to right as `File exploitation`; the rest rows can be added according to the manipulation of the file management. For this case, we will only work with the first row.
- Add the following items in the column of the file exploitation row; `create the file,` `read a file,` `delete the file.`
- Drag and drop a panel to the form from the toolBox. Under the Backcolor property, choose ActiveCaption and set the size to (300,130)`.
- Inside the panel, add the following controls that will help manipulate the data written to the file path.
- Drag and drop four labels and change their text to; `Name,` `Email,` `Gender,` and `Phone,` respectively.
- Drag and drop three text boxes and arrange them vertically and horizontally to the name, email, and phone labels. Name the text boxes as *NameTb*, *EmailTb*, *PhoneTb* respectively under their name properties.
- Drag and drop a Combobox and align it horizontally to the gender label. Under the items property of the Combobox, we double click to add collections of items as Male and Female, where the user can choose the gender of the student when recording his details. Set the DropDownStyle of the Combobox -> *DropDownList*.
- We add two buttons to the panel. In the first button name property, we change its name to *AddStudentbtn* and set the text to `Write/Add Student.` We also changed to *Clearbtn* in the second button name property and set the text to `Clear.`

See the image below and compare it to your output design.

![Create, write, delete, and read operetions](engineering-education/creating-file-management-application-using-winforms/create-write-read-delete-operations.jpg)

Now you should have a similar form design to the one below.

![Complete file manager](engineering-education/creating-file-management-application-using-winforms/complete-file-manager.jpg)

### Step 3. Writing the C# code
To write the `C#` code, we double click on the form design, and the file manager.cs will be loaded.

#### Including the necessary namespace

```C#
using System;
using System.IO;//File and data stream types are included, as are those that facilitate basic file and directory operations.
Using System.Windows.Forms;//Programs built using these classes can take advantage of the Version of Windows's rich UI.
```
#### Setting up the file path
This is crucial in this project solution since it will create a folder where the written data will reside in the memory in a precise manner. We can also specialize in the format that it will be written with; in this project, all our data will be stored in *`.txt files`*.

Write the following code snippet.
```C#
 string path = Environment.CurrentDirectory + "/" + "Students.txt";// The path where files will be written and recorded as a txt file
```
#### Coding the controls
> Note: To begin coding within a method, we need first double-click on the appropriate control for the filemanger.cs to load.

In the **`<-`** (button previous) button, we add the following code that will be able to undo a file browsing in the web browser.

```C#
 private void btnPrevious_Click(object sender, EventArgs e)
        {
            if (webBrowser.CanGoBack)
                webBrowser.GoBack();
        }
```
In the **`->`** (button next) button, we add the following code below. The code will be able to redo the file browsing.
```C#
   private void btnNext_Click(object sender, EventArgs e)
        {
            if (webBrowser.CanGoForward)
                webBrowser.GoForward();
        }
```
In the button **` Open`**, we add the following code that will help to navigate the files in the memory disk.
The code below, openFile dialog box will be displayed once the open button is clicked.
Description will give more information on what the we are supposed to do i.e, select the folder we want to see its content.
If the exact file path was selected, then the contents are displayed to the webBrowser.

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

We add the following code in the **`createFile`** menu. The create file item code will create a new file every time a user needs to create a new student record if and only if the file dosent exist in the memory.

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

In the **` Read file`** menu item, add the following code to help view the data record via the web browser.
StreamReader reads a text file line-by-line, from the start to the end.

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
In the **` Delete file`** menu item, add the following code that will help you to delete files initially created using the file path.
We shall use if statement to check the text file is existing in the memory. If it exist, then it can be automatically deleted.

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
In the **`Addstudent/Write`** button inside the panel, add the following code snippet to help execute the operation. It is able to parmanently record the data of the student that he/she keyed in the textboxes. 
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
In the **`Clear`** button in the panel, add the following code, which will help delete the data in the text boxes and edit new student data. 

```C#
  private void Clearbtn_Click(object sender, EventArgs e)// To clear data initially in the textboxes
        {
            NameTb.Text = "";
            EmailTb.Text = "";
            GenderCb.Text = "";
            PhoneTb.Text = "";
        }
```
To ensure that the user dont quit the application without his knowledge, we will add the code below. This will pop a dialogue box that will select yes if he needs to quit the application or select no if he dont want to quit the application. The form exiting activity terminates when you select *No* using the *`e.cancel = true;`* statements. To access the form closing method, navigate to form properties, and under the *Formclosing*, you have to double click to load and write the code.

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
Run the application and implement the information you need to record and access. 
You may start the app with a simple click of the ***`Start`*** button on the toolbar.

![Running the application](engineering-education/creating-file-management-application-using-winforms/the-start-button.jpg)

This is how my application is executing my files. Hope you achieve the same objective. Thankyou. See the image below.

![Working application](engineering-education/creating-file-management-application-using-winforms/working-file-manager.jpg)

### Conclusion
In this tutorial, we have created a precise file manager using WinForms. We have learned how to implement data files by creating them, writing to the files, reading the files, and deleting them.

You can go ahead and add more controls involving file management and publishing your application.

That's it!! You have leveled your skills!!
