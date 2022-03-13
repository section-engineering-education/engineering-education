---
layout: engineering-education
status: publish
published: true
url: /android-excel-apachepoi/
title: Manipulating Excel Files in Android using the Apache POI Library
description: This tutorial takes the reader through the process of creating an Excel file, opening it, and performing common statistical functions in Android using the Apache POI Library.
author: vincent-ngunzulu
date: 2022-02-11T00:00:00-01:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-excel-apachepoi/hero.jpg
    alt: Manipulating Excel Files in Android using the Apache POI Library Hero Image
---
When processing data for a custom on-device model or creating your spreadsheet app, you need to know how to manipulate spreadsheet format files. In this article, we will look at creating a spreadsheet file, opening it, and performing common statistical functions in it.
<!--more-->
We will simulate student names and scores. The process would require a lot of code and research when done from scratch since Java does not have support for Excel file formats. Luckily, we have the **Apache POI** library.

Apache POI is an open-source library that provides a Java API for manipulating file formats based on the Office Open XML (OOXML) and OLE2 standards from Microsoft. Apache POI releases are available under the Apache License (V2.0).

Based on the definition, we get a clue that this library can also be used to manipulate Word and PowerPoint (slide) file formats.

Apache POI has two formats for manipulating Excel (Spreadsheet) files:
- Horrible Spreadsheet Format (HSSF)
- XML Spreadsheet Format (XSSF)

HSSF is used for `.xls` formats while XSSF is used for `.xlsx` formats. We will be using XSSF in this tutorial.

> NOTE: I will be using the words Excel and Spreadsheet interchangeably.

### Prerequisites
- An understanding of Kotlin. A pre-exposure to working with the file system is a plus.
- A basic understanding of Excel/Spreadsheets. One should be well versed with terminologies like cells, values, workbooks, sheets, etc.
- Working with Android development environments and the general ecosystem. Though not so necessary, working knowledge of the Gradle may come in handy as we will be adding dependencies using the Gradle files.

### Getting started
After creating your app, modify the app-level and project-level Gradle files as follows:

#### App-level build.gradle
In the `dependencies` section, add the following lines:

```kotlin
dependencies {
    ....
    implementation group: 'org.apache.poi', name: 'poi-ooxml', version: '3.17'
    implementation group: 'org.apache.xmlbeans', name: 'xmlbeans', version: '3.1.0'
    implementation 'javax.xml.stream:stax-api:1.0'
    implementation 'com.fasterxml:aalto-xml:1.2.2'
}
```

#### Project-level build.gradle
Add this to the `repositories` section:

```kotlin
repositories {
    ...
    maven { url 'https://jitpack.io' }
}
```

After the build process is done, we proceed to write the logic for creating and reading the Spreadsheet files in the `MainActivity` class.

### Storage Permissions
Don't forget to add these permissions in your `AndroidManifest` file:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### Creating and adding data to the Spreadsheet
To achieve this, we follow the following steps:
1. Create a Spreadsheet in the app's directory.
2. Add a workbook to the Spreadsheet. At this step, we will also look at creating worksheets.
3. Create cells for the worksheets.
4. Add data to the cells.

#### 1. Creating a Spreadsheet
We will use a function called `createExcelFile(ourWorkbook: Workbook)`. It accepts a workbook object which we will discuss in the next step. First, we get to access our app's directory. Next, we check whether it exists. If it does not exist, we create a directory:

```kotlin
//get our app file directory
val ourAppFileDirectory = filesDir
//Check whether it exists or not, and create one if it does not exist.
if (ourAppFileDirectory != null && !ourAppFileDirectory.exists()) {
            ourAppFileDirectory.mkdirs()
}
```

Thereafter, we create an Excel file named `test.xlsx` and write our workbook to the file using a file output stream. You can give it a name of your choice:

```kotlin
//Create an excel file called test.xlsx
val excelFile = File(ourAppFileDirectory, "test.xlsx")

//Write a workbook to the file using a file outputstream
try {
    val fileOut = FileOutputStream(excelFile)
    ourWorkbook.write(fileOut)
    fileOut.close()
    } catch (e: FileNotFoundException) {
    e.printStackTrace()
    } catch (e: IOException) {
    e.printStackTrace()
}
```

The full method code is as follows:

```kotlin
private fun createExcelFile(ourWorkbook: Workbook) {

    //get our app file directory
    val ourAppFileDirectory = filesDir
    //Check whether it exists or not, and create one if it does not exist.
    if (ourAppFileDirectory != null && !ourAppFileDirectory.exists()) {
        ourAppFileDirectory.mkdirs()
    }

    //Create an excel file called test.xlsx
    val excelFile = File(ourAppFileDirectory, "test.xlsx")

    //Write a workbook to the file using a file outputstream
    try {
        val fileOut = FileOutputStream(excelFile)
        ourWorkbook.write(fileOut)
        fileOut.close()
    } catch (e: FileNotFoundException) {
        e.printStackTrace()
    } catch (e: IOException) {
        e.printStackTrace()
    }
}
```

#### 2. Adding a workbook
In this method, we create a workbook object from the `XSSFWorkbook` class. A worksheet named _statSheet_ is added to the workbook. The `addData()` method is then called to populate the sheet with data. We will look at this function later.

The newly created workbook is returned after the method `createWorkbook()` finishes executing. For the worksheet creation, Apache POI's method called `createSheet()` is used:

```kotlin
private fun createWorkbook(): Workbook {
    // Creating a workbook object from the XSSFWorkbook() class
    val ourWorkbook = XSSFWorkbook()

    //Creating a sheet called "statSheet" inside the workbook and then add data to it
    val sheet: Sheet = ourWorkbook.createSheet("statSheet")
    addData(sheet)

    return ourWorkbook
}
```

#### 3. Creating cells for the worksheets.
Three parameters are passed in:
1. `sheetRow` - The row where data is added.
2. `columnIndex` - The column number where a value is added.
3. `cellValue` - The value to be added to the cell.

In the `createCell()` method, we create a cell at a passed-in index and add the value to it. The library's `setCellValue(value)` method is used in adding values to cells.

```kotlin
private fun createCell(sheetRow: Row, columnIndex: Int, cellValue: String?) {
    //create a cell at a passed in index
    val ourCell = sheetRow.createCell(columnIndex)
    //add the value to it
    //a cell can be empty. That's why its nullable
    ourCell?.setCellValue(cellValue)
}
```

#### 4. Adding data to the cells
This method is quite simple. We create rows and add data to them in the worksheet passed in as a parameter:

```kotlin
private fun addData(sheet: Sheet) {

    //Creating rows at passed in indices
    val row1 = sheet.createRow(0)
    val row2 = sheet.createRow(1)
    val row3 = sheet.createRow(2)
    val row4 = sheet.createRow(3)
    val row5 = sheet.createRow(4)
    val row6 = sheet.createRow(5)
    val row7 = sheet.createRow(6)


    //Adding data to each  cell
    createCell(row1, 0, "Mike")
    createCell(row1, 1, "470")

    createCell(row2, 0, "Montessori")
    createCell(row2, 1, "460")

    createCell(row3, 0, "Sandra")
    createCell(row3, 1, "380")

    createCell(row4, 0, "Moringa")
    createCell(row4, 1, "300")

    createCell(row5, 0, "Torres")
    createCell(row5, 1, "270")

    createCell(row6, 0, "McGee")
    createCell(row6, 1, "420")

    createCell(row7, 0, "Gibbs")
    createCell(row7, 1, "510")
}
```

Check out [this blog](https://faraztariq21.medium.com/a-simple-way-to-work-with-excel-in-android-app-94c727e9a138) which explains about adding headers and setting header styles.

### Reading the Excel file and performing statistical computations
Just like creating and populating data to the Spreadsheet, we will follow these steps:
1. Retrieve the Excel file from the app's directory.
2. Retrieve the workbook.
3. Select the worksheet we will be working on.
4. Perform statistical computations on the data.

#### 1. Retrieving the Excel file
We use a function called `getExcelFile()`. In the `let` scope, we check if the file exists and return it if it does. The function may return null since a file may not be present. That's why it is made nullable:

```kotlin
private fun getExcelFile(): File? {

    val ourAppFileDirectory = filesDir
    ourAppFileDirectory?.let {

        //Check if file exists or not
        if (it.exists()) {
            //check the file in the directory called "test.xlsx"
            var retrievedExcel = File(ourAppFileDirectory, "test.xlsx")
            //return the file
            return retrievedExcel
        }
    }
    return null
}
```

#### 2. Retrieving the workbook
Here, we read the workbook from the loaded spreadsheet as an input stream and then return the workbook:

```kotlin
private fun retrieveWorkbook(): Workbook? {

    //Reading the workbook from the loaded spreadsheet file
    getExcelFile()?.let {
        try {

            //Reading it as stream
            val workbookStream = FileInputStream(it)

            //Return the loaded workbook
            return WorkbookFactory.create(workbookStream)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
    //the workbook may not exist
    return null
}
```

#### 3. Selecting the worksheet
We use the library's `getSheetAt(position)` method for this. After the selection, we return it. Since a worksheet may not be present, this method may return a null value:

```kotlin
private fun selectSheet(): Sheet? {

    //choosing the workbook
    retrieveWorkbook()?.let { workbook ->

        //Checking the existence of a sheet
        if (workbook.numberOfSheets > 0) {

            //Return the first sheet
            return workbook.getSheetAt(0)
        }
    }

    return null
}
```

### Performing the statistical computations
Three basic statistical functions are done:
1. Mean
2. Variance
3. Standard deviation

Let's have a look at them:

#### 1. Mean
We sum all the values then divide the total value by the number of students. An array from which we will get the values is passed in as a parameter:

```kotlin
private fun findMean(arrayArg: Array<Int>): Double {
    var total = 0.0
    var i = 0
    for (a in arrayArg) {
        total += arrayArg[i]
        i++
    }
    var avg = total / arrayArg.size
    return avg
}
```

#### 2. Variance
Squared difference from the mean. The logic will then be subtracting each value from the mean, squaring it, and then finding an average. Therefore, our function will have two parameters, the values array and the mean:

```kotlin
private fun findVariance(arrayArg: Array<Int>, mean: Double): Double {
    var indexVariance = 0.0
    var i = 0
    for (a in arrayArg) {
        indexVariance += Math.pow(((arrayArg[i].toDouble()) - mean), 2.0)
        i++
    }
    var avgVariance = indexVariance / arrayArg.size
    return avgVariance
}
```

#### 3. Standard variation
This is the square root of the variance:

```kotlin
var stdDeviation: Double = Math.sqrt(variance)
```

The Apache POI library also provides built-in Excel functions such as SUMIF, COUNTIF, etc. If interested, check them out [here](https://poi.apache.org/apidocs/dev/org/apache/poi/ss/formula/functions/package-summary.html).

### Output
After running the app, we should get the following output:

![screen](/engineering-education/android-excel-apachepoi/shot-one.png)

The Excel file will resemble the one below:

![excel](/engineering-education/android-excel-apachepoi/excel-sheet.png)

You can access the Excel file in your Device Explorer via the IDE by following these steps: _View -> Tool Windows -> Device File Explorer -> data > your-package-name -> files._

![device](/engineering-education/android-excel-apachepoi/device.png)

The GitHub repository can be found [here](https://github.com/vinstex/androidExcelTest) and the APK file [here](https://drive.google.com/file/d/1ShuOV-lJ5mnDMYrUEpG7tz_QAneSrlly/view?usp=sharing).

### Conclusion
In this tutorial, We have looked at creating an Excel file, reading the file, and performing common statistical functions on the data in the file. I hope you found this article insightful. You can customize the code and do more with it. For example, you can add dynamic input, create recycler adapters for data in the Excel files, etc.

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
