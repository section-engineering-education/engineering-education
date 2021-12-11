### Introduction
CSV addresses Comma-Separated Values. Is a document design utilized to keep information in an accounting page or dataset, in a straightforward text structure. A delimiter is utilized to recognize and isolate information in comma-separated values. The CSV record design is utilized when we move plain information between programs that locally work on incongruent organizations.
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
- Have you fed the data? I guess yes. Save the excel file as CSV(comma delimited). Name the document as commaseparated, and finish saving it.

![excelsave](/engineering-education/working-with-CSV-files-in-java/excel-save.png)
#### **Notepad**
- let's get started, first we open our Notepad.
- Second, fed in the information as displayed below. Remember to separate each data with a comma(,).

```
Student Name,Faculty,Registration No,Fees Balance,Campus
Stanley Kuria,Education,37916808,3150,Main
Davidson Kanyua,Computing,38094044,8500,Meru
Tess Wambui,Engineering,21666504,13500,Nairobi
Esther Njoroge,Health,37809504,5500,Nakuru
```

- Done with inputting data? I guess yes. Then save the file as commaseperated.csv
The file we created should look like the one below.

![notepadcsv](/engineering-education/working-with-csv-files-in-java/notepadcsv.png)
### Java String.split() technique.
String.split, applied to break string around matches of the given standard articulation.
After splitting is done, this method returns a character array.
In the code below we imported BufferedReader. BufferedReader reads the file line by line to the end.
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
The output of the code is as shown below.
```
Name: Student Name,Faculty: Faculty, Registration: Registration No, Fees Balance: Fees Balance, Campus:  Campus
Name: Stanley Kuria,Faculty: Education, Registration: 37916808, Fees Balance: 3150, Campus:  Main
Name: Davidson Kanyua,Faculty: Computing, Registration: 38094044, Fees Balance: 8500, Campus:  Meru
Name: Tess Wambui,Faculty: Engineering, Registration: 21666504, Fees Balance: 13500, Campus:  Nairobi
Name: Esther Njoroge,Faculty: Health, Registration: 37809504, Fees Balance: 5500, Campus:  Nakuru
```
### Java scanner class.
Is a class in Java.util bundle, used to get input from the user. Breaks information into tokens, utilizing the delimiter pattern. It is the most straightforward method to read input in java code.
In the code below, we used the scanner class to read CSV files in Java.
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
The output is as shown below.
```
Student Name,Faculty,Registration No,Fees Balance,Campus
Stanley Kuria,Education,37916808,3150,Main
Davidson Kanyua,Computing,38094044,8500,Meru
Tess Wambui,Engineering,21666504,13500,Nairobi
Esther Njoroge,Health,37809504,5500,Nakuru
```
### Using openCSV API.
OpenCSV is an outsider API, utilized to peruse different adaptations of the comma-separated document. It supports all basic Comma-separated operations.
OpenCSV is used since Java does not provide native support to read Comma-Separated values.

**Important classes of OpenCSV**
- CSVWrite -  enables writing data into a CSV file.
- CSVToBean - utilized to populate Java Application with CSV data.
- BeanToCSV - applied to export information from JavaBean to Comma-seperated value file.
Comma-separated values are read in two ways, namely:
- By line: In this case, the comma-separated values are read from one line to another consecutively.
- All data: utilizes readAll() technique to peruse all records at once. 
`Example: List allData = csvReader.readAll();`

The syntax for open CSV: `public CSVReader(Reader reader, char separator) `

**Reading CSV file using Eclipse**

**step1**

create two folders in eclipse-workspace and name them CSVDoc and CSVdocuments. In the CSVdocuments folder, move the CSV files that you are going to use. In this case, we are going to use, comma-separated and semicolon-separated files. Then in the CSVDoc folder paste `opencsv-5.5.2` and `commons-lang3-3.1` jar files.
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
The output should resemble, the one below.
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
The output is shown below.
```
Student Name;Faculty;Registration No;Fees Balance;Campus    
Stanley Kuria;Education;37916808;3150;Main  
Davidson Kanyua;Computing;38094044;8500;Meru    
Tess Wambui;Engineering;21666504;13500;Nairobi  
Esther Njoroge;Health;37809504;5500;Nakuru  

```
In the output above you will note the presence of semi-colon(;) separators. Commas are ignored by OpenCSV, but other separators are recognized.
### Conclusion
In this article, you have learned various techniques for creating CSV files in Java. Also, you learned different methods of reading Comma Separated Values(CSV) in Java. Lastly, we used open CSV API to read CSV files.  Happy coding!
