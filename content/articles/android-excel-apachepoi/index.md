When trying to preprocess data for a custom on-device model or creating your spreadsheet app, you first have to know how to manipulate spreadsheet format files. In this article, we will look at creating a spreadsheet file, opening it, and then performing common statistical functions in it. We will simulate student names and scores. The process when done from scratch would require a lot of code and research since Java does not have support for Excel file formats. Luckily for us, we have the **Apache POI** library. 

Apache POI is an open-source library providing a Java API for manipulating file formats based on the Office Open XML (OOXML) and OLE2 standards from Microsoft. Apache POI releases are available under the Apache License (V2.0).

> This is a definition based on this [GeeksForGeeks](https://www.geeksforgeeks.org/apache-poi-introduction/) blog. 

Based on the definition, we get a clue that this library can also be used to manipulate Word and PowerPoint(slide) file formats. 

For Excel(Spreadsheet) files, Apache POI has two formats for manipulating them:
1. Horrible Spreadsheet Format (**HSSF**)
2. XML Spreadsheet Format (**XSSF**)

HSSF is used for **.xls** formats while XSSF is used for **.xlsx** formats. We will be using XSSF in this tutorial.

> NOTE: I will be using the words Excel and Spreadsheet interchangeably.

### Prerequisites
1. An understanding of Kotlin. A preexposure to working with the file system is a plus.
2. A basic understanding of Excel/Spreadsheets. One should be well versed with terminologies like cells, values, workbooks, sheets, etc.
3. Working with android development environments and the general ecosystem. Though not so necessary, working knowledge of the Gradle may come in handy; we will be adding dependencies using the Gradle files.

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
> You can try adding this line to the *settings.gradle* file if met with an error.

Add this to the `repositories` section:

```kotlin
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
```

After the build process is done, we proceed to write the logic for creating and reading the Spreadsheet files in the MainActivity class.

### Storage Permissions
Don't forget to add these permissions in your `AndroidManifest` file.

```xml
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### Creating and adding data to the Spreadsheet
To achieve this, we follow these steps:
1. Create a Spreadsheet in the app's file directory.
2. Add a workbook to the Spreadsheet. At this step, we will also look at creating worksheets.
3. Create cells for the worksheets.
4. Add data to the cells.

#### 1. Creating a Spreadsheet
We will use a function called `createExcelFile(ourWorkbook: Workbook)`. It is passed in a workbook object which we will discuss in the next step. First, we get to access our app's directory. Next, we check if it exists or not. If it does not exist, we create a directory.

```kotlin
//get our app file directory
val ourAppFileDirectory = filesDir
//Check whether it exists or not, and create if does not exist.
if (ourAppFileDirectory != null && !ourAppFileDirectory.exists()) {
            ourAppFileDirectory.mkdirs()
}
```

Thereafter, we create an Excel file called *test.xlsx* and write our workbook to the file using a file output stream. You can name it a name of your choice.

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

The full method code:

```kotlin
    private fun createExcelFile(ourWorkbook: Workbook) {

        //get our app file directory
        val ourAppFileDirectory = filesDir
        //Check whether it exists or not, and create if does not exist.
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
In this method, we create a workbook object from the `XSSFWorkbook` class. A worksheet named *statSheet* is added to the workbook. The `addData()` method is then called to populate the sheet with data. We will look at this function later. The created workbook is returned after the method `createWorkbook()` finishes executing. For the worksheet creation, Apache POI's method called `createSheet(sheetname)` is used.

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

In the `createCell()` method, we create a cell at a passed-in index and add the value to it. The library's `setCellValue(value)` method is used to add value to a cell.

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
This method is quite simple. We create rows and add data to them in the worksheet passed in as a parameter.

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

> Check out [this blog](https://faraztariq21.medium.com/a-simple-way-to-work-with-excel-in-android-app-94c727e9a138) which explains about adding headers and setting header styles.

### Reading the Excel file and performing statistical computations
Just like creating and populating data to the Spreadsheet, we will follow these steps:
1. Retrieve the Excel file from the app's directory.
2. Retrieve the workbook.
3. Select the worksheet we will be working on.
4. Perform statistical computations on the data.

#### 1. Retrieving the Excel file
We use a function called `getExcelFile()`. In the `let` scope, we check if the file exists and return it if it does. The function may return null since a file may not be present. That's why it is made nullable.

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
Here, we read the workbook from the loaded spreadsheet as an input stream and then return the workbook.

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
We use the library's `getSheetAt(position)` method for this. After the selection, we return it. Since a worksheet may not be present, it may return a null value.

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

Let's have a look at them.

#### 1. Mean
We sum all the values then divide the total value by the number of students. An array from which we will get the values is passed in as a parameter.

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
Squared difference from the mean. The logic will then be subtracting each value from the mean, squaring it, and then finding an average. Therefore, our function will have two parameters:- the values array and the mean.

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
This is the square root of the variance.

```kotlin
 var stdDeviation: Double = Math.sqrt(variance)
```

> The Apache POI library also provides built-in Excel functions such as SUMIF, COUNTIF, etc. If interested, check them out [here](https://poi.apache.org/apidocs/dev/org/apache/poi/ss/formula/functions/package-summary.html).

### Full MainActivity code
Here is the full code:

```kotlin

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import org.apache.poi.ss.usermodel.*
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import java.io.*


class MainActivity : AppCompatActivity() {
    private lateinit var textView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        textView = findViewById(R.id.textView)
        val ourWB = createWorkbook()
        createExcelFile(ourWB)
        compute()

    }

    private fun createWorkbook(): Workbook {
        // Creating a workbook object from the XSSFWorkbook() class
        val ourWorkbook = XSSFWorkbook()

        //Creating a sheet called "statSheet" inside the workbook and then add data to it
        val sheet: Sheet = ourWorkbook.createSheet("statSheet")
        addData(sheet)

        return ourWorkbook
    }

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

    //function for creating a cell.
    private fun createCell(sheetRow: Row, columnIndex: Int, cellValue: String?) {
        //create a cell at a passed in index
        val ourCell = sheetRow.createCell(columnIndex)
        //add the value to it
        ourCell?.setCellValue(cellValue)
    }

    private fun createExcelFile(ourWorkbook: Workbook) {

        //get our app file directory
        val ourAppFileDirectory = filesDir
        //Check whether it exists or not, and create if does not exist.
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

    //function for reading the workbook from the loaded spreadsheet file
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

        return null
    }

    //function for selecting the sheet
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

    //function to compute the statistical functions
    private fun compute() {
        //get sheet
        selectSheet()?.let { sheet ->
            //finding the total number of rows
            val totalRows = sheet.physicalNumberOfRows
            val scoreArray = Array<Int>(totalRows) { 0 }
            for (i in 0 until totalRows) {
                scoreArray[i] = (sheet.getRow(i).getCell(1)).toString().toInt()
            }

            var mean = findMean(scoreArray)
            var variance = findVariance(scoreArray, mean)
            var stdDeviation: Double = Math.sqrt(variance)

            //formatting to 2 decimal places
            var meanTo2dp: String = String.format("%.2f", mean)
            var stdDeviationTo2dp = String.format("%.2f", stdDeviation)
            var varianceTo2dp: String = String.format("%.2f", variance)

            //displaying the text to the textview
            textView.setText("From the Spreadsheet, we get these:\n\n MEAN: " + meanTo2dp + "\n VARIANCE: " + varianceTo2dp + "\n STD DEVIATION: " + stdDeviationTo2dp)
        }

    }

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
}
```

### Output
After running the code, we will get the following output:

![screen](/engineering-education/android-excel-apachepoi/shot-one.png)

The Excel file will resemble this:

![excel](/engineering-education/android-excel-apachepoi/excel-sheet.png)

You can access the Excel file in your Device Explorer using your IDE. To access your app's file, follow these steps: **View** -> **Tool Windows** -> **Device File Explorer** -> **data** > **your-package-name** -> **files**.

![device](/engineering-education/android-excel-apachepoi/device.png)

The GitHub repository is found [here](https://github.com/vinstex/androidExcelTest) and the APK file [here](https://drive.google.com/file/d/1ShuOV-lJ5mnDMYrUEpG7tz_QAneSrlly/view?usp=sharing).

### Conclusion
We looked at creating an Excel file, reading the file, and performing common statistical functions on the data in the file. I hope you found this article insightful. You can customize the code and do more with it. For example, you can add dynamic input, create recycler adapters for data in the Excel files, etc.

Happy Coding!
