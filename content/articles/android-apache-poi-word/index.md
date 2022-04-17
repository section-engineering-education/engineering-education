---
layout: engineering-education
status: publish
published: true
url: /android-apache-poi-word/
title: Creating and manipulating word(.docx) documents in android using Kotlin and the Apache POI library
description: This article will introduce the reader to the basics of creating and manipulating word documents in android using the Apache POI library
author: sandra-moringa
date: 2022-04-17T00:00:00-13:10
topics: [Android]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-apache-poi-word/hero.jpg
    alt: Creating and manipulating word(.docx) documents using Apache POI library Hero Image
---

As android developers, we may get ourselves in situations where handling a .docx file is easier and faster than doing it using other platforms. In this article, we will look at how to create a Word document, format it, and most importantly, extract text from it. Again, we will be using Kotlin.

### What you need for this tutorial

Since we are doing a tutorial, it makes sense to start by pointing out the tools and configurations we need.
1. First, you need an Android Integrated Development Environment, e.g. Android Studio or IntellijIDEA.
2. Java Development Kit 8 or higher installed in our machines. However, you get this one automatically when you install Android Studio. However, if you are using IntellijIDEA, you must install it separately since it does not come with JDK preinstalled.
3. Knowledge of Kotlin and the general OOP concepts is needed.
4. Basic hands-on android app-building skills. An understanding of the Android ecosystem is also needed.

For the library configuration, we will have a dedicated section walking through it.

### What we will be doing
We will use the Apache POI library to create a Word(**.docx**) document. We will start by looking at the library’s components for creating Word documents. Next, we will have a walkthrough on setting up the library in our Gradle files. After that, we will create a Word document, add a paragraph, add text, format the text, insert headers and footers, and then insert a table to the document. Finally, we will extract the text from the document we just created. Let’s dig in.

### Apache POI Word
Apache POI is a Java library used to create Office documents such as Spreadsheets, Word, and Publisher files. Since Kotlin works perfectly in the Java ecosystem, we can use this library to create these files in Android.

For manipulating Word documents, the library provides us with these components:
1. **XML Word Processor Format(XWPF)**- This component provides classes and methods for processing .docx format files. It enables us to achieve text extraction from the documents, text formatting, headers and footers insertion, and processes.
2. **Horrible Word Processor Format(HWPF)**- It’s the same as XWPF. The difference is that this is used to process .doc format files.
3. **Horrible Property Set Format(HPSF)**- As the name suggests, it is used for property sets extraction from MS Office documents. We won't be using this component for our article.

[Here](https://poi.apache.org/components/document/) is its official page.

### Setting up the library
To avoid build errors, it’s best to add the dependencies separately instead of the single Apache POI library dependency. Therefore, we will start by modifying the project-level `build.gradle` file by adding this line to the repositories section.

```kotlin
dependencies {
    ....
    implementation group: 'org.apache.poi', name: 'poi-ooxml', version: '3.17'
    implementation group: 'org.apache.xmlbeans', name: 'xmlbeans', version: '3.1.0'
    implementation 'javax.xml.stream:stax-api:1.0'
    implementation 'com.fasterxml:aalto-xml:1.2.2'
}
```

Next, we will add these lines to the dependencies section of the project-level `build.gradle` file.

```kotlin
repositories {
    ...
    maven { url 'https://jitpack.io' }
}
```

Do a Gradle sync after this modification and wait for the build process to finish.

Before writing the code, we need to add file access permissions to the manifest using these lines.

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

Let’s begin writing the code.

### The Kotlin code
We will write these codes to the `MainActivity.kt` file. Instead of writing the whole code and explaining it after that, we will begin by breaking each method step by step and then unleash the complete code. We are now good to go.

#### Creating an empty document object
To add items to a document, we first have to create a document(XWPFDocument) object. This object will provide us with all the necessary methods for manipulating the Word documents. To do that, we will use this method.

```kotlin
    //initializing an empty word document
    private fun createWordDoc():XWPFDocument {
        val ourWordDoc = XWPFDocument()
        return ourWordDoc
    }
```

It creates the object and then returns it. Finally, we will pass the returned object to other methods, as we will see.

#### Adding a paragraph to the created document
We will create an `addParagraph()` method and then pass it into the document object as a parameter. 

```kotlin
    private fun addParagraph(targetDoc:XWPFDocument){
        //creating a paragraph in our document and setting its alignment
        val paragraph1 = targetDoc.createParagraph()
        paragraph1.alignment = ParagraphAlignment.LEFT

        //creating a run for adding text
        val sentenceRun1 = paragraph1.createRun()

        //format the text
        sentenceRun1.isBold = true
        sentenceRun1.fontSize = 15
        sentenceRun1.fontFamily = "Comic Sans MS"
        sentenceRun1.setText("First sentence run starts here. It's such an honour too see you here :-)")
        //add a sentence break
        sentenceRun1.addBreak()

        //add another run
        val sentenceRun2 = paragraph1.createRun()
        sentenceRun2.fontSize = 12
        sentenceRun2.fontFamily = "Comic Sans MS"
        sentenceRun2.setText("Second sentence run starts here. We love Apache POI. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dui consectetur euismod ultrices. Aenean et enim pulvinar purus scelerisque dapibus. Duis euismod lorem nec justo viverra ornare. Aliquam est erat, mollis at iaculis eu, ultricies aliquet risus. Proin lacinia ligula sed quam elementum, congue tincidunt lorem iaculis. Nulla facilisi. Praesent faucibus metus eu nisi tincidunt rhoncus vitae et ligula. Pellentesque quam dui, pellentesque vitae placerat eu, tempor ut lectus.")
        sentenceRun2.addBreak()

    }
```

- We get a paragraph(XWPFParagraph) object returned from the `createParagraph()` method. Note how we set the paragraph text alignment to the left using the alignment property. This paragraph object lets us create text regions using runs. We get a run(XWPFRun) object using the `createRun()` method.
- Using run objects, we can format the text using properties such as *isBold* for boldening, 8fontFamily* for setting the typeface, adding sentence breaks, etc. You can explore other properties on your own. We add text to the run using the `setText()` method.

#### Inserting a table
This is easily done the same way we did for adding a paragraph. A table(XWPFTable) object is returned from the `createTable()` method.

```kotlin
    //creating a table
    private fun addTable(targetDoc:XWPFDocument){
        val ourTable = targetDoc.createTable()

        //Creating the first row and adding cell values
        val row1 = ourTable.getRow(0)
        row1.getCell(0).text = "Code"
        row1.addNewTableCell().text = "Item"

        //Creating the second row
        val row2 = ourTable.createRow()
        row2.getCell(0).text = "0345"
        row2.getCell(1).text = "Benz"

        //creating the third row
        val row3 = ourTable.createRow()
        row3.getCell(0).text = "48542"
        row3.getCell(1).text = "Eng-Ed"
    }
```

- Using the table object, we can create rows, add cells, and add values to them. There is a catch here, though. The first row is created differently from the rest of the rows. When we try to create it the same way as the rest of the rows, we get an error. We must get the row in the first position using the `getRow(0)` method. We pass in 0 to set it as a first row. Next, we get the first cell position using the `getCell(0)`. After that, we can add other cells using the `addNewTableCell()` method. Finally, we add values to the cells using the text property. This doesn’t look like a clean way. Unfortunately, this is the only way we can create the first row. If I get a cleaner way of doing it, I will share it in the comment section below.
- To create another row, we use the `createRow()` method which returns a row(XWPFTableRow) object. We can add cells using the `getCell(position)` method using the returned row object.

#### Inserting headers and footers
We will use a method called `addHeaderAndFooter()`. 

```kotlin
    //adding a header and a footer
    private fun addHeaderAndFooter(targetDoc:XWPFDocument){
        //initializing the header
        val docHeader = targetDoc.createHeader(HeaderFooterType.DEFAULT)

        //creating a run for the header. This is for setting the header text and stylings
        val headerRun = docHeader.createParagraph().createRun()
        headerRun.setText("This is the header!")
        headerRun.fontFamily = "Copperplate Gothic"
        headerRun.isBold = true
        headerRun.color = "00ff00"

        //initializing the footer
        val docFooter = targetDoc.createFooter(HeaderFooterType.DEFAULT);

        //creating a run for the footer. This sets the footer text and stylings
        val footerRun = docFooter.createParagraph().createRun()
        footerRun.fontFamily = "Copperplate Gothic"
        footerRun.isBold = true
        footerRun.setText("This is the footer!")
    }
```

- To add a header, we use a header(XWPFHeader) object returned by the `createHeader()` method. We use a footer(XWPFFooter) object returned by the `createFooter()` method for the footer. We pass in the default header and footer style. There are three types: DEFAULT, EVEN, and FIRST. Feel free to explore and test them. 
- To add text to the headers and footers, we create runs and then format them the same way we did for paragraphs.

#### Saving the document
When creating a document, we need to save it. So, we first check whether it exists or not. 

```kotlin
    //saving the word document
    private fun saveOurDoc(targetDoc:XWPFDocument){
        val ourAppFileDirectory = filesDir
        //Check whether it exists or not, and create one if it does not exist.
        if (ourAppFileDirectory != null && !ourAppFileDirectory.exists()) {
            ourAppFileDirectory.mkdirs()
        }

        //Create a word file called test.docx and save it to the file system
        val wordFile = File(ourAppFileDirectory, "myDoc.docx")
        try {
            val fileOut = FileOutputStream(wordFile)
            targetDoc.write(fileOut)
            fileOut.close()
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
```

- If it doesn’t exist, we create one in our app’s file directory. Then, you can choose any other storage location you wish to save your file. The rest of the code is for saving and exception-handling, which we won't explore because that isn’t the cope of this article.

#### Extracting the text
We first have to load the document. So we will create a method called `loadDoc(`) for that.

```kotlin
    //retrieving the document from the file system
    private fun loadDoc():File?{
        val ourDirectory = filesDir
        ourDirectory?.let {

            //Check if file exists or not
            if (it.exists()) {
                //check the file in the directory called "myDoc.docx"
                var retrievedDoc = File(ourDirectory, "myDoc.docx")
                //return the file
                return retrievedDoc
            }
        }
        return null
    }
```

- We only retrieve the file when it exists. We check its existence using the if conditional block. If it is present in the directory, we retrieve and return it at the end of the method.

We use a method called `readDoc()` for the extraction. 

```kotlin
    //reading the document's text
    private fun readDoc(){
        loadDoc()?.let {
            try {
                //Reading it as stream
                val docStream = FileInputStream(it)
                val targetDoc = XWPFDocument(docStream)

                //creating a constructor object for extracting text from the word document
                val wordExtractor = XWPFWordExtractor(targetDoc)
                val docText = wordExtractor.text
                //displaying the text read from the document
                textView.setText(docText)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
```

- In this method, we first read the file using an input stream. We then create a document object by passing the stream to the XWPFDocument constructor. Next, we create a Word extractor(XWPFWordExtractor) object for extracting text from the Word document. The text property is used for accessing the extracted text. Finally, we display the text read from the document in a TextView.

#### The full code
Here’s the full `MainActivity.kt` code.

```kotlin
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import org.apache.poi.wp.usermodel.HeaderFooterType
import org.apache.poi.xwpf.extractor.XWPFWordExtractor
import org.apache.poi.xwpf.usermodel.*
import java.io.*


class MainActivity : AppCompatActivity() {
    lateinit var textView:TextView
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        textView = findViewById<TextView>(R.id.textView)

        var targetDoc = createWordDoc()

        addParagraph(targetDoc)
        addTable(targetDoc)
        addHeaderAndFooter(targetDoc)
        saveOurDoc(targetDoc)
        readDoc()
    }

    //initializing an empty word document
    private fun createWordDoc():XWPFDocument {
        val ourWordDoc = XWPFDocument()
        return ourWordDoc
    }

    private fun addParagraph(targetDoc:XWPFDocument){
        //creating a paragraph in our document and setting its alignment
        val paragraph1 = targetDoc.createParagraph()
        paragraph1.alignment = ParagraphAlignment.LEFT

        //creating a run for adding text
        val sentenceRun1 = paragraph1.createRun()

        //format the text
        sentenceRun1.isBold = true
        sentenceRun1.fontSize = 15
        sentenceRun1.fontFamily = "Comic Sans MS"
        sentenceRun1.setText("First sentence run starts here. It's such an honour too see you here :-)")
        //add a sentence break
        sentenceRun1.addBreak()

        //add another run
        val sentenceRun2 = paragraph1.createRun()
        sentenceRun2.fontSize = 12
        sentenceRun2.fontFamily = "Comic Sans MS"
        sentenceRun2.setText("Second sentence run starts here. We love Apache POI. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia dui consectetur euismod ultrices. Aenean et enim pulvinar purus scelerisque dapibus. Duis euismod lorem nec justo viverra ornare. Aliquam est erat, mollis at iaculis eu, ultricies aliquet risus. Proin lacinia ligula sed quam elementum, congue tincidunt lorem iaculis. Nulla facilisi. Praesent faucibus metus eu nisi tincidunt rhoncus vitae et ligula. Pellentesque quam dui, pellentesque vitae placerat eu, tempor ut lectus.")
        sentenceRun2.addBreak()

    }

    //creating a table
    private fun addTable(targetDoc:XWPFDocument){
        val ourTable = targetDoc.createTable()

        //Creating the first row and adding cell values
        val row1 = ourTable.getRow(0)
        row1.getCell(0).text = "Code"
        row1.addNewTableCell().text = "Item"

        //Creating the second row
        val row2 = ourTable.createRow()
        row2.getCell(0).text = "0345"
        row2.getCell(1).text = "Benz"

        //creating the third row
        val row3 = ourTable.createRow()
        row3.getCell(0).text = "48542"
        row3.getCell(1).text = "Eng-Ed"
    }

    //adding a header and a footer
    private fun addHeaderAndFooter(targetDoc:XWPFDocument){
        //initializing the header
        val docHeader = targetDoc.createHeader(HeaderFooterType.DEFAULT)

        //creating a run for the header. This is for setting the header text and stylings
        val headerRun = docHeader.createParagraph().createRun()
        headerRun.setText("This is the header!")
        headerRun.fontFamily = "Copperplate Gothic"
        headerRun.isBold = true
        headerRun.color = "00ff00"

        //initializing the footer
        val docFooter = targetDoc.createFooter(HeaderFooterType.DEFAULT);

        //creating a run for the footer. This sets the footer text and stylings
        val footerRun = docFooter.createParagraph().createRun()
        footerRun.fontFamily = "Copperplate Gothic"
        footerRun.isBold = true
        footerRun.setText("This is the footer!")
    }

    //saving the word document
    private fun saveOurDoc(targetDoc:XWPFDocument){
        val ourAppFileDirectory = filesDir
        //Check whether it exists or not, and create one if it does not exist.
        if (ourAppFileDirectory != null && !ourAppFileDirectory.exists()) {
            ourAppFileDirectory.mkdirs()
        }

        //Create a word file called test.docx and save it to the file system
        val wordFile = File(ourAppFileDirectory, "myDoc.docx")
        try {
            val fileOut = FileOutputStream(wordFile)
            targetDoc.write(fileOut)
            fileOut.close()
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    //retrieving the document from the file system
    private fun loadDoc():File?{
        val ourDirectory = filesDir
        ourDirectory?.let {

            //Check if file exists or not
            if (it.exists()) {
                //check the file in the directory called "myDoc.docx"
                var retrievedDoc = File(ourDirectory, "myDoc.docx")
                //return the file
                return retrievedDoc
            }
        }
        return null
    }

    //reading the document's text
    private fun readDoc(){
        loadDoc()?.let {
            try {
                //Reading it as stream
                val docStream = FileInputStream(it)
                val targetDoc = XWPFDocument(docStream)

                //creating a constructor object for extracting text from the word document
                val wordExtractor = XWPFWordExtractor(targetDoc)
                val docText = wordExtractor.text
                //displaying the text read from the document
                textView.setText(docText)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

}
```

We get this on running the app.

![App screenshot](/engineering-education/android-apache-poi-word/screen.png)

To access the word document created, open the Device Explorer using your IDE and then navigate to your app’s data location(`View Tab -> Tool Windows -> Device File Explorer -> data > your-package-name -> files`). It resembles this screenshot.

![Doc screenshot](/engineering-education/android-apache-poi-word/shot-doc.png)

Check this [GitHub repository](https://github.com/munubi254/apache-word-android) for the code.

### Conclusion
That was it. This library contains many methods that only a dedicated book can exhaust. You can add footnotes, a table of contents, and almost everything you can get in an MS Office Word application. Although this library has many functionalities, it doesn’t have very clear documentation. You have to explore them on your own. The IDEs I pointed out initially have intelligent capabilities that allow you to check the library's classes, methods, and descriptions. You only have to hover on the method, and a pop-up is displayed. There’s a localhost link section which you can click, and a browser tab is opened, giving you all the methods and classes for the code you hovered through. Check the screenshot below.

![popup](/engineering-education/android-apache-poi-word/shot-conc.png)

Happy coding!

---
Peer review contribution by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
