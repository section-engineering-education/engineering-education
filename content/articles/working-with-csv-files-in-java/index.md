### Introduction
The CSV represents Comma-Separated Values. It is a basic document design that is utilized to store plain information in a straightforward text structure like an accounting page or data set. The archives in the CSV association can be imported to and conveyed from programs (Microsoft Excel) that store information in tabular form. The CSV document utilized a delimiter to recognize and isolate various information units in a record. The CSV record design is utilized when we move plain information between programs that locally work on incongruent organizations.
### Prerequisites
To follow along you should
- Have a basic knowledge of java.
- Have [Eclipse](https://www.eclipse.org/downloads/download.php?file=/oomph/epp/2021-09/R/eclipse-inst-jre-win64.exe&mirror_id=1281) IDE in your computer.
### Table of contents
- [Step by step instructions to make CSV document, utilizing notepad and Microsoft Excel.](#Step-by-step-instructions-to-make-CSV-document-utilizing-notepad-and-Microsoft-Excel.)
- [Java String.split() technique.](#Java-String.split()-technique.)
- [Java scanner class.](#Java-scanner-class.)
- [Using open CSV API.](#Using-open-CSV-API.)
### Step by step instructions to make CSV document, utilizing notepad and Microsoft Excel.
#### **Microsoft Excel office.**
- First, open the Excel office on your computer.
- Second, open a blank workbook. Then fed the information beneath into the excel document.

![microsoft-excel-csv](/engineering-education/working-with-CSV-files-in-java/microsoft-excel-csv.png)
- Have you fed the data? I guess yes. Save the excel file as CSV(comma delimited). Name the document as results-comma-separator, and finish saving it.

![excelsave](/engineering-education/working-with-CSV-files-in-java/excel-save.png)
#### **Notepad**
- let's get started, first we open our Notepad.
- Second, fed in the information as displayed below. Remember to separate each data with a comma(,).

Student Name,Faculty,Registration No,Fees Balance,Campus
Stanley Kuria,Education,37916808,3150,Main
Davidson Kanyua,Computing,38094044,8500,Meru
Tess Wambui,Engineering,21666504,13500,Nairobi
Esther Njoroge,Health,37809504,5500,Nakuru

- Done with inputting data? I guess yes. Then save the file as results-comma-seperator.csv
The file we created should look like the one below.

![notepadcsv](/engineering-education/working-with-csv-files-in-java/notepadcsv.png)
### Java String.split() technique.
String.split technique, used to break a given string around matches of the given standard articulation.
After splitting is done, this method returns a character array.
#### syntax
`public String [] split(String, regex)`
In the code below we imported BufferedReader. BufferedReader reads the file line by line to the end.
```Java
import java.io.IOException;
import java.io.FileReader;
import java.io.BufferedReader;
public class splitting
{
    public static void main(String[] args)
    {
        String sample = ",";
        String string;
        try
        {
         //parses a CSV file into BufferedReader
            BufferedReader bufferedReader = new BufferedReader(new FileReader("C:\\results-comma-seperator.csv"));
            while ((string = bufferedReader.readLine()) != null)   //returns a Boolean value
            {
                String[] student = string.split(sample);    // use comma as separator
                System.out.println("Student [Name=" + student[0] + ",Faculty=" + student[1] + ", Registration=" + student[2] + ", Fees Balance= " + student[3] + ", Campus= " + student[4] +"]");
            }
        }
        catch (IOException e)//catches exceptions in the try block
        {
            e.printStackTrace();
        }
    }
}
```
The output of the code is as shown below.
```
Student [Name=Student Name,Faculty=Faculty, Registration=Registration No, Fees Balance= Fees Balance, Campus= Campus]
Student [Name=Stanley Kuria,Faculty=Education, Registration=37916808, Fees Balance= 3150, Campus= Main]
Student [Name=Davidson Kanyua,Faculty=Computing, Registration=38094044, Fees Balance= 8500, Campus= Meru]
Student [Name=Tess Wambui,Faculty=Engineering, Registration=21666504, Fees Balance= 13500, Campus= Nairobi]
Student [Name=Esther Njoroge,Faculty=Health, Registration=37809504, Fees Balance= 5500, Campus= Nakuru]
```
### Java scanner class.
Is a class in Java.util bundle, used to get input from the user. Breaks information into tokens, utilizing the delimiter pattern. It is the most straightforward method to read input in java code.
Beneath is a code sample, to show the use of the scanner class to read CSV files in Java.
```Java
import java.util.Scanner; //contains scanner class
import java.io.*;
public class scanner
{
    public static void main(String[] args) throws FileNotFoundException 
    {
       //parse CSV file into the Scanner
        Scanner scanner = new Scanner(new File("C:\\results-comma-seperator.csv"));
        scanner.useDelimiter(", ");   //delimiter pattern is set here
        while (scanner.hasNext())  //boolean value is returned here
        {
            System.out.print(scanner.next());  //finds and returns the adjacent total expression from this scanner
        }
        scanner.close();  //closes the scanner
    }
}

``` 
Output.
```
Student Name,Faculty,Registration No,Fees Balance,Campus
Stanley Kuria,Education,37916808,3150,Main
Davidson Kanyua,Computing,38094044,8500,Meru
Tess Wambui,Engineering,21666504,13500,Nairobi
Esther Njoroge,Health,37809504,5500,Nakuru
```
### Using openCSV API.
Open CSV is an outsider API, which gives standard libraries to peruse different adaptations of comma-separated values(CSV) document.
OpenCSV supports all basic CSV-type operations you are likely to do.
Java does not provide any native support to read CSV files. Hence we use open CSV for reading CSV files.

**Some helpful classes of open CSV**
- CSVWrite -  enables writing data into a CSV file.
- CSVToBean - when you wish to populate your Javabeans with data from a CSV file. You'll use this class.
- BeanToCSV - enables exporting data from a Java application to a CSV file.
Example: `List allData = csvReader.readAll();`

CSV files can be read in a variety of ways.
- Read line by line: We develop and introduce the CSVReader object by passing the file reader object of the CSV record.
Then, at that point, we call readNext() technique for CSVReader to peruse information line by line.
- Reading all data at a go: CSVReader gives a technique called readAll() to peruse every one of the records without a moment's delay into a rundown.
`Example: List allData = csvReader.readAll();`

The syntax for open CSV: `public CSVReader(Reader reader, char separator) `

**Reading CSV file using Eclipse**

**step1**

create a new folder in eclipse-workspace and name it CSVDoc. In that folder, paste the CSV files that you are going to use. In this case, we are going to use, comma-separator and semicolon-separator files. Also in the same folder paste `opencsv-5.5.2` and `commons-lang3-3.1` jar files.
If you don't have them, download them by clicking [opencsv5.5.2](https://repo1.maven.org/maven2/com/opencsv/opencsv/5.5.2/opencsv-5.5.2.jar) and [commonlangs3-3.1](https://repo1.maven.org/maven2/org/apache/commons/commons-lang3/3.1/commons-lang3-3.1.jar)

![csvdoc](/engineering-education/working-with-csv-files-in-java/csvdoc.png)

**step2**

Open Eclipse, and create a java project. Name the project as CSVOperation and click next.

![createproject](/engineering-education/working-with-csv-files-in-java/createproject.png)

**step3**

Then click Libraries and select Classpath. Then select add external Jars and add jars from CSVDoc in the Eclipse-workspace folder. 
And click finish.

![libraries](/engineering-education/working-with-csv-files-in-java/libraries.png)

![jars](/engineering-education/working-with-csv-files-in-java/jars.png)

![externaljars](/engineering-education/working-with-csv-files-in-java/externaljars.png)

**Step4**

After that, open a java class. Right-click on the project CSVOperation and select new then select class.

![class](/engineering-education/working-with-csv-files-in-java/class.png)

**step5**

Name the class as ReadCSVExample and click finish.

![nameclass](/engineering-education/working-with-csv-files-in-java/nameclass.png)

**step6**

 Then copy the code sample beneath and paste. Run the program.
```Java
import java.io.FileReader;  
import com.opencsv.CSVReader;  
public class ReadCSVExample  
{ 
private static final String CSV_FILE_PATH="C:\\Users\\davis\\eclipse-workspace\\CSVDoc\\results-comma-seperator.csv";//file location
public static void main(String[] args)  
{  
    readLineByLine(CSV_FILE_PATH);//method name
        }
    public static void readLineByLine(String file)
      {
       try 
           {
           FileReader freader= new FileReader(file);//created an object of freader class
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
          catch(Exception e) //to any exception inside try block
       {
          e.printStackTrace();//used to print a throwable class along with other dataset class
  }

}

}
```

Output
```
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
In the output above you will note the absence of commas(,). This is because when using open CSV API, the commas are ignored.
Let's use implement a program to read a CSV file that is not separated by commas.
It's separated with semi-colons(;).
The CSV file that we are going to read is shown below.

![semi-colon-seperated](/engineering-education/working-with-csv-files-in-java/semi-colon-seperated.png)

Copy the program below and paste, and run it.

```Java
import java.io.FileReader;  
import com.opencsv.CSVReader;  
public class ReadCSVExample  
{ 
private static final String CSV_FILE_PATH="C:\\Users\\davis\\eclipse-workspace\\CSVDoc\\results-semi-colon-seperator.csv";//file location
public static void main(String[] args)  
{  
    readLineByLine(CSV_FILE_PATH);//method name
        }
    public static void readLineByLine(String file)
      {
       try 
           {
           FileReader freader= new FileReader(file);//created an object of freader class
        @SuppressWarnings("resource")
        CSVReader creader= new CSVReader(freader);// created creader object by parsing freader as a parameter
           String [] nextRecord;// created an array of type String
         //reads data line by line 
        while((nextRecord = creader.readNext())!=null)
           {
               for(String token: nextRecord)
               System.out.println(token +"\t"); //will bring the value of cell seperated by tab space
           }
           System.out.println();   
           }
          catch(Exception e) //to catch any exception inside try block
       {
          e.printStackTrace();//used to print a throwable class along with other dataset classes
  }

}

}
```
output
```
Student Name;Faculty;Registration No;Fees Balance;Campus    
Stanley Kuria;Education;37916808;3150;Main  
Davidson Kanyua;Computing;38094044;8500;Meru    
Tess Wambui;Engineering;21666504;13500;Nairobi  
Esther Njoroge;Health;37809504;5500;Nakuru  

```
In the output above you will note the presence of semi-colon(;) separators. Open CSV ignores commas(,) as separators, but recognizes other separators.
### Conclusion
In this article, you have learned various techniques for creating CSV files in Java. Also, you learned different methods of reading Comma Separated Values(CSV) in Java. Lastly, we used open CSV API to read CSV files.  Happy coding!
