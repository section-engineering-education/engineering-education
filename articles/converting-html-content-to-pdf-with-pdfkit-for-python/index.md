---
layout: engineering-education
status: publish
published: true
url: /engineering-education/converting-html-content-to-pdf-with-pdfkit-for-python
title: Converting HTML content to PDF with pdfkit for Python
description: This article will provide a guide on how to convert HTML content from a weburl, string, and external file to a PDF file. 
author: anita-achu
date: 2021-03-30T00:00:00-12:00
topics: []
excerpt_separator: 
images:

  - url: /engineering-education/converting-html-content-to-pdf-with-pdfkit-for-python/hero.jpg
    alt: python example image
---
HTML **(HyperText Markup Language)** is a standard markup language used to create web pages. It provides users with information and details of a web page. A standard web page text is created and information of users is viewed on a page using HTML.
<!--more-->
### Outline
- Introduction
- Libraries and tools to convert HTML to PDF in python
- What is PDFKIT
- Installing PDFKIT library
- Installing WKHTMLTOPDF (Windows and Ubuntu)
- *Brief explanation of what WKHTMLTOPDF is*
- Adding WKHTMLTOPDF path to environment variable.
- How to generate  to PDF from HTML
  - Generate from weburls
  - Generate from external HTML file
  - Generate from string
- Conclusion

### Introduction
In recent times, web pages contained documents such as reports, contracts, questionnaires, etc. which may have required downloading. Though these documents are written in HTML, they cannot be downloaded successfully in HTML.

A more suitable format for this action is converting these text files to PDF. **PDF** which stands for Portable Document Format has become one of the most used format for saving and transferring documents. 

Web pages make use of documents and HTML data contained in these pages, HTML files and strings are therefore rendered to PDF document using a PDF converter and there are various PDF converters in Python.

However, in this article our focus will be on python-pdfkit (a PDF converter library), how it is installed, and how to generate pdfdocument from a local HTML file, web URLs, and a string.

### Libraries and tools to convert HTML to PDF in Python
There are several libraries and tools to convert HMTL to PDF in Python which over time are preferred rather than printing from a printer without a third-party tool. 

Though using a printer may seem easy, there are a few lapses of using a printer, some of these lapses include the display of the header and footer of the web page, there are also web pages that are not printer-friendly.

For more convenience, you may use free libraries in Python which offer more control. Let us have a look at these open source libraries in python.

### Pdfmake
**[Pdfmake](http://pdfmake.org/#/)** is an open-source library for converting web documents to PDF, it uses paragraphs, columns, lists, tables, canvas, etc... Also allows users to declare their styles, use custom fonts, build a DSL and extend the framework.

However, the pdfmake converts the document from scratch rather than from the existing HTML text, *i.e.* the user providers data for the header, content, footer, etc. This makes the configuration of pdfmake more difficult compared to other libraries.

### Pypdf
Asides pdfmake, there are other libraries such as **[pyPdf](https://pypi.org/project/pyPdf/)**. Pypdf is a Pure-Python library built as a PDF toolkit capable of splitting, merging, cropping, and transforming the pages of PDF files. It can also add custom data, viewing options, and passwords to PDF files. It can retrieve text and metadata from PDFs as well as merge entire files together. However, with pypdf text might not be ordered logically, it is bested used for simpler and small documents as the document becomes larger, text ordering might become complex.

### Pdfcrowd
Pdfcrowd is an open-source API that is capable of converting PDF from dynamic and static HTML in various environments. It also generates PDFs and screenshots from web pages and HTML documents. However, pdfcrowd unlike other libraries is not completely free it comes with a paid browser license to unlock a series of advanced options, like controlling the page size, password-protecting the PDF, and preventing printing and copying.

**Pdfminer**, **PyMuPDF**, etc are also libraries for converting HTML to PDF in python. However, in this article, we will be using **pdfkit**. Pdfkit is one of the better approaches as, it renders HTML into PDF with various image formats, HTML forms, and other complex printable documents.

**N.B:** There are also libraries and tools for converting PDF in Django and JavaScript.

### What is pdfkit?
Pdfkit is an open-source library that generates HTML from web URLs, local files a string and converts this text to PDF format. Web apps often contain tables, charts, and graphs asides text. Export these data professional, PDF converters are the best options, and pdfit converts data regardless of the format, either image, table, graphs, HTML forms, and other complex printable documents.

We will be using **[wkhtmltopdf](https://wkhtmltopdf.org/)** alongside pdfkit to achieve perfect work. Wkhtmltopdf is an open-source command-line tool that renders HTML into PDF and various image formats.

First thing first, let's begin by installing pdfkit.

### Installing pdfkit
Pdfkit is installed using the pip command in your terminal.

```bash
pip install pdfkit

```

![pdfkit-installation](/engineering-education/python-projects-for-beginners/pdfkit.png)

*Pdfkit is successfully installed as shown in this image*

We also need an additional library, *wkhtmltopdf*. Wkhtmltopdf is an open-source command-line tool that renders HTML into PDF and various image formats using the Qt WebKit rendering engine. These run entirely "headless" and do not require a display or display service. In simpler words, wkhtmltopdf enables pdfkit to work convert images and other formats.  Wkhtmltopdf is usually referred to as python wrapper to convert Html to pdfdocument for python 2 and python 3.

Wkhtmltopdf can be installed on windows and Linux servers such as debian and ubuntu. You can also install directly from the [github page](https://github.com/JazzCore/python-pdfkit/wiki/Installing-wkhtmltopdf).

Firstly, let's install on ubuntu using the *apt-ge*t command

```bash
sudo apt-get install wkhtmltopdf
```

For windows users, this is easily done. You can download wkhtmltopdf directly from the official page, download it h[ere.](https://wkhtmltopdf.org/downloads.html)

Once this is downloaded, open in folder and manually install it.

![wkhtmltopdf-installation](/engineering-education/python-projects-for-beginners/wkhtmltopdf.png)

*As shown in this image, click install and manually install wkhtmltopdf in file path* 

### Adding Wkhtmltopdf path to the environment variable

Next step, we add the installed tool path to our environment variable. Firstly copy the path of the wkhtmltopdf.exe. Notice from our above image, the file path is **C:\Program Files\wkhtmltopdf\bin.** To do this in your system, go to *file explorer > This PC> windows (C:) > Program files.*

![wkhtmltopdf-installation](/engineering-education/python-projects-for-beginners/path.png)

*Highlight file path as shown in this image*

Copy the highlighted file path, search for environment variables in your system > open page and click on environment variable. In environment variable go to *system variable >click on path > edit >* *new* and add copied file path.

![wkhtmltopdf-installation](/engineering-education/python-projects-for-beginners/filepath2.png)

*Environment variable in windows*

![wkhtmltopdf-installation](/engineering-education/python-projects-for-beginners/filepath.png)

*System variable in windows*

I know this may be a bit tricky, if you are doing this for the first time, try following the steps carefully. I hope you followed through successfully.
Once this is done, we move to our code editor to generate PDF.

I know this may be a bit tricky, if you are doing this for the first time, try following the steps carefully. I hope you followed through successfully.
Once this is done, we move to our code editor to generate PDF.

### Generate PDF from web URLs

To get a PDF from a web URL, in your code editor, import the already installed python-pdfkit and add these lines of code

```bash
import pdfkit 

#Get PDF from web url
pdfkit.from_url("https://en.wikipedia.org/wiki/Serena_Williams", "site.pdf")
```

Run code in your terminal

![wkhtmltopdf-installation](/engineering-education/python-projects-for-beginners/weburl.png)

*As shown in this image, "py ./(filename)" is used to run the program*

**N.B**: *'htmltopdf.py*' is my file name. 

Once this is done, a ***string.pdf*** file will be created in your editor automatically, right? if yes, good job 👍🏼 and if you have an error, ensure to check you have your libraries installed and ***'wkhtmltopdf'*** path properly added to your environment variables.

Let's proceed

### Generate from string

PDF can also be generated from a string. To do this, in your code editor add the following lines of code:

```bash
import pdfkit 

#Get PDF from string
pdfkit.from_string("hello world","string.pdf")
```

In the same way, a *string.pdf* file is automatically created in both the code editor and the local folder.

### Generate from external HTML file
A PDF file can as well be generated from an HTML file. To get  a PDF from HTML add the following code:

```bash
import pdfkit 

#Get PDF from html
pdfkit.from_file("index.html","file.pdf")
```

I have an index.html file locally stored within the same folder.

Successfully done? 😃
Good job converting to PDF using pydfit in python!

### Conclusion
File documents have become easier to save and transfer with the use of these tools. With simple steps in this article using the libraries and programming language used above, you can successfully convert HTML to PDF from a URL, string, and HTML file  from the homepage to the end without hindrances. It is also important to note that there are other libraries and languages this can be done asides from the ones used in this article.

I hope this tutorial was of help. 

Happy coding!
