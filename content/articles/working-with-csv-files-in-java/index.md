---
layout: engineering-education
status: publish
published: true
url: /working-with-csv-files-in-java/
title: Working with CSV Files in Java
description: In this tutorial the reader will learn how to create, read, and write into CSV files in Java.
author: teresia-wambui
date: 2022-01-03T00:00:00-11:05
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/working-with-csv-files-in-java/hero.png
    alt: Working with CSV files in Java
---
CSV stands for Comma-Separated Values. It is a document design utilized to keep information in an accounting page or dataset in a straightforward text structure. A delimiter is used to recognize and isolate information in comma-separated values.
<!--more-->
### Introduction
The CSV record design moves structured information between programs that locally work on incongruent organizations.

### Prerequisites
To follow along, the reader should:
- Have a basic knowledge of Java.
- Have an IDE of your choice installed. I'll be using [Eclipse](https://www.eclipse.org/downloads/download.php?file=/oomph/epp/2021-09/R/eclipse-inst-jre-win64.exe&mirror_id=1281) IDE.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Creating a CSV file](#creating-a-csv-file)
  - [Microsoft Excel office](#microsoft-excel-office)
  - [Notepad](#notepad)
- [Java String.split() technique](#java-stringsplit-technique)
- [Java scanner class](#java-scanner-class)
- [Using openCSV API](#using-opencsv-api)
  - [Important OpenCSV classes](#important-opencsv-classes)
- [Reading CSV files in Java](#reading-csv-files-in-java)
- [Conclusion](#conclusion)


### Creating a CSV file
#### Microsoft Excel office
- First, open the Excel office on your computer.
- Second, open a blank workbook. Then feed the information beneath into the Excel document.

![microsoft-excel-csv](/engineering-education/working-with-csv-files-in-java/microsoftexcelcsv.png)

- Save the excel file as CSV (comma delimited). Name the document as comma-separated, and finish saving it.

![excelsave](/engineering-education/working-with-csv-files-in-java/excel-save.png)

#### Notepad
- Let's get started by opening Notepad.
- Second, feed in the information as displayed below. Remember to separate each data with a comma.

```bash
Student Name,Faculty,Registration No,Fees Balance,Campus
Stanley Kuria,Education,37916808,3150,Main
Davidson Kanyua,Computing,38094044,8500,Meru
Tess Wambui,Engineering,21666504,13500,Nairobi
Esther Njoroge,Health,37809504,5500,Nakuru
```

- Then save the file as `commaseperated.csv`. The file we created should look like the one below.

![notepadcsv](/engineering-education/working-with-csv-files-in-java/notepad-csv.png)

### Java String.split() technique
`String.split`, applied to break string around matches of the given standard articulation.
In the code below, we imported `BufferedReader`. `BufferedReader` reads the file line by line to the end.

```Java
import java.io.FileReader;
import java.io.IOException;//signals an exception of some kind has occurred
import java.io.BufferedReader;//Reads text from a character-input stream
class readcsv
{
    public static void main(String[] args)
    {
        String sample = ",";
        String mystring;
        try
        {
            BufferedReader brdrd = new BufferedReader(new FileReader("C:\\Users\\davis\\eclipse-workspace\\CSVdocuments\\commaseperated.csv"));
            while ((mystring = brdrd.readLine()) != null)  //Reads a line of text
            {
                String[] student = mystring.split(sample);//utilized to split the string
                System.out.println("Name: " + student[0] + ",Faculty: " + student[1] + ", Registration No: " + student[2] + ", Fees Balance: " + student[3] + ", Campus:  " + student[4] +"");
            }
        }
        catch (IOException e)//catches exception in the try block
        {
            e.printStackTrace();//Prints this throwable and its backtrace
        }
    }
}
```

The output of the code is as shown below:

```bash
Name: Student Name,Faculty: Faculty, Registration: Registration No, Fees Balance: Fees Balance, Campus:  Campus
Name: Stanley Kuria,Faculty: Education, Registration: 37916808, Fees Balance: 3150, Campus:  Main
Name: Davidson Kanyua,Faculty: Computing, Registration: 38094044, Fees Balance: 8500, Campus:  Meru
Name: Tess Wambui,Faculty: Engineering, Registration: 21666504, Fees Balance: 13500, Campus:  Nairobi
Name: Esther Njoroge,Faculty: Health, Registration: 37809504, Fees Balance: 5500, Campus:  Nakuru
```

### Java scanner class
This is a class in the `Java.util` bundle, used to get input from the user. It breaks information into tokens, utilizing the delimiter pattern. It is the most straightforward method to read input in Java code.

We used the scanner class to read CSV files in Java in the code below:

```Java
import java.util.Scanner;//contains scanner class
import java.io.*;
class mycsvread
{
    public static void main(String[] args) throws FileNotFoundException //This exception will be thrown when a file with the specified pathname does not exist
    {
        Scanner myscanner = new Scanner(new File("C:\\Users\\davis\\eclipse-workspace\\CSVdocuments\\commaseperated.csv"));//Creates a new File
        myscanner.useDelimiter(", ");   //Sets the delimiter
        while (myscanner.hasNext())  //Returns a boolean(true) if this scanner has another token in its input
        {
            System.out.println(myscanner.next());//next complete scanner is returned here
        }
        myscanner.close();  //myscanner is closed
    }
}
```

The output is as shown below:

```bash
Student Name,Faculty,Registration No,Fees Balance,Campus
Stanley Kuria,Education,37916808,3150,Main
Davidson Kanyua,Computing,38094044,8500,Meru
Tess Wambui,Engineering,21666504,13500,Nairobi
Esther Njoroge,Health,37809504,5500,Nakuru
```

### Using openCSV API
OpenCSV is an outsider API utilized to peruse different adaptations of the comma-separated document. It supports all basic Comma-separated operations. OpenCSV is used since Java does not provide native support to read Comma-Separated values.

#### Important OpenCSV classes
- `CSVWrite` -  enables writing data into a CSV file.
- `CSVToBean` - utilized to populate Java Application with CSV data.
- `BeanToCSV` - applied to export information from JavaBean to Comma-seperated value file.

Comma-separated values are read in two ways, mainly:
- By line: In this case, the comma-separated values are consecutively read from one line to another.
- All data: utilizes `readAll()` technique to peruse all records at once.

`Example: List allData = csvReader.readAll();`

The syntax for open CSV: `public CSVReader(Reader reader, char separator) `

### Reading CSV files in Java
#### Step 1
Create two folders in eclipse-workspace and name them `CSVDoc` and `CSVdocuments`. In the `CSVdocuments` folder, move the CSV files that you will use. In this case, we will use comma-separated and semicolon-separated files. 

Then in the `CSVDoc` folder paste `opencsv-5.5.2` and `commons-lang3-3.1` jar files. If you don't have them, download them by clicking [opencsv5.5.2](https://repo1.maven.org/maven2/com/opencsv/opencsv/5.5.2/opencsv-5.5.2.jar) and [commonlangs3-3.1](https://repo1.maven.org/maven2/org/apache/commons/commons-lang3/3.1/commons-lang3-3.1.jar)

![csvdoc](/engineering-education/working-with-csv-files-in-java/csvdoc.png)

#### Step 2
Open Eclipse, and create a Java project. Name the project as `CSVOperation` and click next.

![createproject](/engineering-education/working-with-csv-files-in-java/createproject.png)

#### Step 3
Click `Libraries` and select `Classpath`. Then select `add external Jars` and add jars from CSVDoc in the Eclipse-workspace folder. Then click finish.

![libraries](/engineering-education/working-with-csv-files-in-java/libraries.png)

![jars](/engineering-education/working-with-csv-files-in-java/jars.png)

![externaljars](/engineering-education/working-with-csv-files-in-java/externaljars.png)

#### Step 4
After that, create a Java class. Right-click on the project CSVOperation and select new, then select class.

![class](/engineering-education/working-with-csv-files-in-java/class.png)

#### Step 5
Name the class as `ReadCSVExample` and click finish.

![nameclass](/engineering-education/working-with-csv-files-in-java/nameclass.png)

#### Step 6
Then copy the code sample beneath and paste. Run the program.

```Java
import com.opencsv.CSVReader;//external library
import java.io.FileReader; //Reads text from character files using a default buffer size
public class ReadCSVExample
{
private static String LOCATION_OF_THE_FILE="C:\\Users\\davis\\eclipse-workspace\\CSVdocuments\\commaseperated.csv";//file location
public static void main(String[] args)
{
    LineByLine(LOCATION_OF_THE_FILE);
        }
    public static void LineByLine(String myfile)
      {
       try
           {
           FileReader freader= new FileReader(myfile);//created an object of freader class
        @SuppressWarnings("resource")
        CSVReader creader= new CSVReader(freader);// created creader object by parsing freader as a parameter
           String [] nextRecord;// created an array of type String
         //read data line by line
        while((nextRecord = creader.readNext())!=null)
           {
               for(String token: nextRecord)
               System.out.println(token +"\t"); //will bring the value of cell seperated by tab space
           }
           System.out.println();
           }
          catch(Exception e) //to catch any exception inside try block
       {
          e.printStackTrace();//used to print a throwable class along with other dataset class
  }

}

}
```

The output should resemble the one below:

```bash
Student Name
Faculty
Registration No
Fees Balance
Campus
Stanley Kuria
Education
37916808
3150
Main
Davidson Kanyua
Computing
38094044
8500
Meru
Tess Wambui
Engineering
21666504
13500
Nairobi
Esther Njoroge
Health
37809504
5500
Nakuru

```

You will note the absence of commas. This is because when using open CSV API, the commas are ignored.

Let's implement a program to read a CSV file not separated by commas. Instead, it's separated with semi-colons(;).

The CSV file that we are going to read is shown below:

![semi-colon-seperated](/engineering-education/working-with-csv-files-in-java/semi-colon-seperated.png)

Copy the program below and paste and run it.

```Java
import com.opencsv.CSVReader;//external library
import java.io.FileReader; //Reads text from character files using a default buffer size
public class ReadCSVExample
{
private static String LOCATION_OF_THE_FILE="C:\\Users\\davis\\eclipse-workspace\\CSVdocuments\\semicolonseperated.csv";//file location
public static void main(String[] args)
{
    LineByLine(LOCATION_OF_THE_FILE);
        }
    public static void LineByLine(String myfile)
      {
       try
           {
           FileReader freader= new FileReader(myfile);//created an object of freader class
        @SuppressWarnings("resource")
        CSVReader creader= new CSVReader(freader);// created creader object by parsing freader as a parameter
           String [] nextRecord;// created an array of type String
         //read data line by line
        while((nextRecord = creader.readNext())!=null)
           {
               for(String token: nextRecord)
               System.out.println(token +"\t"); //will bring the value of cell seperated by tab space
           }
           System.out.println();
           }
          catch(Exception e) //to catch any exception inside try block
       {
          e.printStackTrace();//used to print a throwable class along with other dataset class
  }

}

}
```

The output is shown below:

```bash
Student Name;Faculty;Registration No;Fees Balance;Campus
Stanley Kuria;Education;37916808;3150;Main
Davidson Kanyua;Computing;38094044;8500;Meru
Tess Wambui;Engineering;21666504;13500;Nairobi
Esther Njoroge;Health;37809504;5500;Nakuru

```

In the output above, you will note the presence of semi-colon separators. This is because OpenCSV ignores commas, but other separators are recognized.

### Conclusion
This article focused on various techniques to create CSV files in Java. We also learned different methods of reading Comma Separated Values (CSV) in Java. Finally, we used open CSV API to read CSV files.

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
