---
layout: engineering-education
status: publish
published: true
url: /learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/
title: Learn how to create pdf file in C# using ironPDF
description: In this tutorial, we will look at how to create pdf file in the C# language using ironPDF. IronPDF integrates PDF in your application by automating the conversion of formatted documents to PDF.
author: bernard-mburu
date: 2021-12-26T00:00:00-19:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/hero.png
    alt: Learn how to create pdf file in C# using ironPDF Hero Image
---

IronPDF integrates PDF in your application by automating the conversion of formatted documents to PDF.

### Table of contents
- [Prerequisites](#prerequisites)
- [Merits of IronPDF](#merits-of-ironpdf)
- [Contrasting iText 7 and IronPDF](#contrasting-itext-7-and-ironpdf)
- [Objectives](#objectives)
- [Develop and configure a project in Visual Studio](#develop-and-configure-a-project-in-visual-studio)
- [IronPdf establishment in Visual Studio](#ironpdf-establishment-in-visual-studio)
- [Design Window form](#design-window-form)
- [Activating save button](#activating-save-button)
- [Activating clear and close button](#activating-clear-and-close-button)
- [Carry out the example](#carry-out-the-example)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To comprehend this article effectively, the following is required:
- C# Programming language nuts and bolts.
- Working of C# GUI Controls.
- HTML fundamentals - which will be key in generating the PDF File.

### Merits of IronPDF
By using ironPDF, we are entitled to the following:
1. PDF conversion of web forms, local HTML pages, and other web pages.
2. Documents can be downloaded, emailed, or saved in the cloud.
3. It enables the creation of various types of paperwork such as invoices, reports, contracts, and much more.
4. Compatibility with other programming environments and frameworks, such as ASP.NET, web forms, MVC, and.NET Core web APIs.

### Contrasting iText 7 and IronPDF
`iText 7` can be an alternative to ` IronPDF,` and it is, therefore, paramount to understand the differences between the two and get to know which one to use where appropriate.

#### IronPdf
1. It is `.NET` flavored.
2. It is not open source and that brings to pricing and in-purchases.
3. It renders PDF's from HTML and therefore a developer need not know how a PDF works.
4. IronPdf is an excellent tool for PDF generation that can get your job done.

#### iText
1. It is `java` flavored.
2. It is open source; hence no in-purchases incorporated.
3. It renders PDFs using a programming-based API on how PDFs work internally.
4. It's best suited for free projects and academic activities.

### Objectives
By reading this article, learners are expected to:
1. Contrast `iText 7` and `IronPDF`.
2. Understand the merits of using IronPDF.
3. Develop and configure a project in any visual studio version.
4. Install and configure Nuget Package for IronPDF.
5. Develop and add a C# backend code to a button to save a file in the computer.
6. Develop and add a C# backend code to a button that will be responsible for the following:
   - Clearing text, and
   - Exiting from an application.

### Develop and configure a project in Visual Studio
In this article, we will use Visual Studio 2019 to clarify the bit by bit exercises included to accomplish our objectives but, you are not restricted to using any version of Visual studio. To begin with, start your Visual Studio, and the following should pop-up.

![start-visual-studio](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/start-visual-studio.png)

On the right-hand side of the window, select `create a new project,` and the following will be displayed.

![new-project](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/new-project.png)

Choose `windows form App` and click `Next` from the template. An accompanying window, as shown below, will appear.

The next task is to name your project, for example, `create Pdf using IronPdf` will be my project name.

![configure-project](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/configure-project.png)

Click `next` to choose `.Net Core 3.1` as the target framework from the displayed dropdown.

![traget-framework](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/target-framework.png)

A project will be generated when the `create` button is clicked and you should get a result as demonstrated below.

![form-design](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/form-design.png)

### IronPdf establishment in Visual Studio
To introduce ironPdf, go to the `menu bar` and pick `project,` which will raise a dropdown list. Select Manage `NuGet Packages` from the dropdown menu and the window displayed underneath will show up.

![nuget-package](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/nuget-package.png)

Choose the browse tab in the current window and the following should be displayed.

![browse-nuget-package](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/browse-nuget-package.png)

To install ironPdf, enter `IronPdf` in the search box and hit enter. The window displayed underneath will be shown.

![ironpdf-install](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/ironpdf-install.png)

From the searched result, be sure to click `iron pdf` as shown below.

![ironpdf-install-2](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/ironpdf-install-2.png)

Wait for the installation procedure to finish after clicking the `install` button. If the procedure was successful, the following window should appear.

![finish-install-ironpdf](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/finish-install-ironpdf.png)

You will be set to go once you hit the `ok` button, and a `Readme.txt` file will launch.

![readme-txt](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/readme-txt.png)

Click on the links in the 'Readme.txt' file to learn more about this library.

### Design Window form
Now that we've installed the Nuget package bundle for ironPDF in Visual Studio, the following step is to create a window form that will allow users to enter text and save the text as a PDF file.

- Open Form1 Design

On the left-hand side of the current window, click on the `Toolbar` button.

![toolbox](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/toolbox.png)

We will need a label to name our application, so click the toolbar button, search for a label, and drag and drop it onto the form design. Give the label a different name, such as `C# Create Pdf Using IronPdf.`

![label](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/label.png)

The next task is to create a new label in our design application and name it `write text here`, a rich text box, and three buttons that will serve the following functions will be displayed:
- Button 1 - Save the text as a pdf file.
- Button 2 - Removes text.
- Button 3 - Closes the window.

![label-2](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/label-2.png)

### Activating save button
Now that you have a save button in your application, double click it, and the following will appear.

```c#
 private void button1_Click(object sender, EventArgs e)
        {

        }
```

The next step is to include the 'ironPdf' namespace in our code, as shown below.

```c#
using IronPdf;
```

From here, we will need to save our file, which means we will need a file path to our newly created PDF file. A dialogue box will accomplish this by prompting the user to enter the `file path` and the `file name`.

We will have the following code on `button 1`, which we chose as our save button.

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
A dialogue box will appear to specify where we want to save our file. The default drive was set to `E,` but you can change it to whatever drive you want.

We can only save files as PDFs, so we set the default extension to only accept PDF files. The code inside the `if` condition is the actual code for generating a PDF, and as you can see, only two lines of code are required.

### Activating clear and close button
When you double-click on your design's `clear` button, you should see the following:

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

As has been usual, double-click your `close` button, and you will see the following code:

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
Holding down `Ctrl + F5` will result in the appearance of a corresponding window, as shown below.

![run-example](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/run-example.png)

In the TextBox, you will type your text. For example, I've used HTML tags to include the text below.

```html
<h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
<p>Harum vitae possimus cumque, pariatur minus</p>
<p>Inventore magnam quaerat perferendis nesciunt molestiae pariatur? Animi?</p>
```

![text-to-save-as-pdf](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/text-to-save-as-pdf.png)

When you click the save button, you should see a window similar to the one shown below.

![save-file](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/save-file.png)

Select your preferred folder and name your file as desired in this window. After pressing the save button, a message box should appear indicating that the file was successfully saved.

![file-successfully-saved](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/file-successfully-saved.png)

As displayed below, a file is created.

![output-file-saved](/engineering-education/learn-how-to-create-pdf-file-in-c-sharp-using-ironpdf/output-file-saved.png)

### Conclusion
With the above knowledge, this brings the guide to a close. I hope you found it simple to follow and comprehend. You can get the project [here](https://github.com/fabulousDesigns/how-to-create-pdf-file-in-c-sharp-using-ironpdf).

### Further reading
- PDF creation using [iTextSharp](https://www.c-sharpcorner.com/uploadfile/f2e803/basic-pdf-creation-using-itextsharp-part-i/).

Happy Coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)