### Introduction
IronPDF is credited with integrating PDF into your application by automating the conversion of formatted documents to PDF.

#### Merits of IronPDF
> By utilizing ironPDF in our projects, users can realize the following

1. PDF conversion of web forms, local HTML pages, and other web pages.
2. Documents can be downloaded, emailed, or saved in the cloud.
3. Enables the creation of various types of paperwork such as invoices, reports, contracts, and much more.
4. Compatibility with other programming environments and frameworks, such as ASP.NET, web forms, MVC, and.NET Core web APIs.
   
#### Contrasting iText 7 and IronPDF 
`iText 7` can be an alternative to ` IronPDF,` and it is, therefore, paramount to understand the differences between the two and get to know which one to use where appropriate.

**IronPdf:**

1. It is `.NET` flavored.
2. Not open source, and that brings to pricing and in-purchases.
3. Renders PDFs from HTML, and therefore a developer need not know how a PDF works. 
4. IronPdf is an excellent tool for PDF generation that can get your job done.
   
**iText:**

1. It is `java` flavored.
2. Opensource; hence no in-purchases incorporated.
3. Renders PDFs using a programming API based on how PDFs work internally.
4. Best suited for Free projects and academic activities.

#### Essential Knowledge
To comprehend this article effectively, the following is essential and required:-
- C# Programming language nuts and bolts
- Working of C# GUI Controls
- Fundamental designing of HTML for the pdf File.
  
### Objectives
**By reading this article, learners are expected to:**

1. Develop and configure a project in any visual studio code version.
2. Install and configure Nuget Package for IronPDF.
3. Add a backEnd code to a button to save the computer file.
4. Add a backEnd code to a button, clear text, and exit from an application.
5. Contrasting `iText` 7 and `IronPDF`.
6. Merits of using IronPDF.
   
### Table of contents
- [Introduction](#introduction)
  - [Merits of IronPDF](#merits-of-ironpdf)
  - [Contrasting iText 7 and IronPDF](#contrasting-itext-7-and-ironpdf)
  - [Essential Knowledge](#essential-knowledge)
- [Objectives](#objectives)
- [Table of contents](#table-of-contents)
- [Develop and configure a Project in Visual Studio](#develop-and-configure-a-project-in-visual-studio)
- [IronPdf establishment in Visual Studio](#ironpdf-establishment-in-visual-studio)
- [Design Window Form](#design-window-form)
- [Activating Save Button](#activating-save-button)
- [Activating Clear and Close Button](#activating-clear-and-close-button)
- [Carry out the example](#carry-out-the-example)
- [Conclusion](#conclusion)
  
### Develop and configure a Project in Visual Studio
In this article, we will utilize Visual Studio 2019 to clarify the bit by bit exercises included to accomplish our objective but, you are not restricted to utilizing any adaptation of Visual studio. To begin with, boot up your Visual Studio, and the following should pop up.

![start-visual-studio](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/start-visual-studio.png)

on the right-hand side of the window, select `create a new project,` and the following will b.e displayed

![new-project](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/new-project.png)

Choose `windows form App` and click `Next` from the template. An accompanying window, as shown below, will appear. The next task is to name your project; for example, I'll create Pdf using IronPdf` as the project name.

![configure-project](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/configure-project.png)

Click `next` to choose `.Net Core 3.1` as the target framework from the displayed dropdown.

![traget-framework](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/target-framework.png)

A project will be generated when the `create` button is clicked, and you should get a result as demonstrated below.

![form-design](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/form-design.png)

### IronPdf establishment in Visual Studio
To introduce iron pdf, go to the menu bar and pick `project,` which will raise a dropdown list. Select Manage `NuGet Packages` from the dropdown menu, and the window displayed underneath will show up.

![nuget-package](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/nuget-package.png)

Choose the Browse tab in the current window, and the following should display. 

![browse-nuget-package](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/browse-nuget-package.png)

To install ironPdf, enter `IronPdf` in the Search Box and hit Enter. The window displayed underneath will show.

![ironpdf-install](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/ironpdf-install.png)

From the searched result, be sure to click iron pdf as shown below. 

![ironpdf-install-2](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/ironpdf-install-2.png)

Wait for the installation procedure to finish after clicking the `install` button. If the procedure was successful, the following window should appear.

![finish-install-ironpdf](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/finish-install-ironpdf.png)

When will you open a `Readme.txt` document once you hit the `ok` button?

![readme-txt](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/readme-txt.png)

### Design Window Form
Now that we've installed the Nuget package bundle in Visual Studio, the following step is to create a window form that will allow users to enter text and save the text as a PDF file.
- Open Form1 Design
  
On the left-hand side of the current window, click on the `Toolbar` button.

![toolbox](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/toolbox.png)

We'll need a label to name our application, so click the toolbar button, search for the label, and drag and drop it onto the form design. Give the label a different name, such as `C# Create Pdf Using IronPdf.`

![label](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/label.png)

The next task is to create a new label in our design application and name it `write text here,` a rich text box, and three buttons that will serve the following functions:
- Button 1 - Save the text as a pdf file.
- Button 2 - removes text.
- Button 3 - closes the window.

![label-2](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/label-2.png)

### Activating Save Button
Now that you have a save button in your application, double click it, and the following should appear.

```c#
 private void button1_Click(object sender, EventArgs e)
        {

        }
```
The next step is to include the 'ironPdf' namespace in our code, as shown below.

```c#
using IronPdf;
```
From here, we'll need to save our file, which means we'll need a file path to our newly created PDF file. A dialogue box will accomplish this by using a dialogue box that will prompt the user to enter the file path and file name. We will have the following code on `button 1`, which we chose as our save button.

```c#
private void button1_Click(object sender, EventArgs e)
        {
            SaveFileDialog dialogueBox = new SaveFileDialog();
            dialogueBox.InitialDirectory = @"E:\";
            dialogueBox.Title = "Save Pdf File";
            dialogueBox.DefaultExt = "pdf";
            dialogueBox.Filter = "Pdf files (*.pdf)|*.pdf|All files (*.*)|*.*";
            dialogueBox.FilterIndex = 2;
            dialogueBox.RestoreDirectory = true;
            if (dialogueBox.ShowDialog() == DialogResult.OK)
            {
                string fName = dialogueBox.FileName;
                var Hline = new HtmlToPdf();
                Hline.RenderHtmlAsPdf(PdfText.Text).SaveAs(fName);
                MessageBox.Show("Your file was Successfully saved!");
            }
        }
```
**Code Explanation**

A dialogue box will appear to specify where they want to save their file. The default drive was set to `E,` but you can change it to whatever drive you want. We can only save files as PDFs, so set the Default extension to accept only PDF files. The code inside the `if` condition is the actual code for generating a PDF, and as you can see, only two lines of code are required.

### Activating Clear and Close Button
When you double-click on your design's `button2_click` button, you should see the following:

```c#
private void button2_Click(object sender, EventArgs e)
        {

        }
```
We will add the following code to the 'button2 click' function to clear the text fields. 
```c#
  private void button2_Click(object sender, EventArgs e)
        {
            PdfText.Text = "";
        }
```
As has been usual, double-click your `close` button, and you should see the following code:
```c#
 private void button3_Click(object sender, EventArgs e)
        {

        }
```
Insert the following code into the `button3 Click` function to enable the close button, as shown below.

```c#
 private void button3_Click(object sender, EventArgs e)
        {
            this.Dispose();
        }
```
### Carry out the example
Holding down 'Ctrl + F5' will result in the appearance of a corresponding window, as shown below.

![run-example](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/run-example.png)

In TextBox, you will type your text. For example, I've used HTML tags to include the text below. 

```html
    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
    <p>Harum vitae possimus cumque, pariatur minus </p>
    <p> Inventore magnam quaerat perferendis nesciunt molestiae pariatur? Animi?</p>
```
![text-to-save-as-pdf](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/text-to-save-as-pdf.png)

When you click the save button, you should see a window similar to the one shown below.

![save-file](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/save-file.png)

Select your preferred Folder and name your file as desired in this window. After pressing the save button, a message box should appear indicating that s successfully created the PDF file. 

![file-successfully-saved](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/file-successfully-saved.png)

As displayed underneath, a file is created.

![output-file-saved](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/output-file-saved.png)

### Conclusion
With the above knowledge, this brings the guide to a close. I hope you found it simple to follow and comprehend. 
Get the project [here](https://github.com/fabulousDesigns/how-to-create-pdf-file-in-c-sharp-using-ironpdf).