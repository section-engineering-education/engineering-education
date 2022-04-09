---
layout: engineering-education
status: publish
published: true
url: /php-bulk-operations/
title: PHP Bulk Operations with XAMPP and FPDF Library
description: This article will help the reader understand bulk insert and bulk export concepts in PHP. 
author: samuel-zabastian
date: 2021-11-01T00:00:00-00:56
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/php-bulk-operations/hero.jpg
  alt: Php bulk operations image
---
Bulk insert and bulk export are some of the most valuable functionalities when dealing with dynamic database records. 
<!--more-->
A bulk insert is appropriate when data recorded in Excel Sheets or CSV needs to be added into a database.

### Benefits of bulk operations
Bulk export works well when database records need to be retrieved from a separate document. 

For instance, a company may generate its sales, employees, profit per product, and assets in stock reports. 

This case means that all the database records are organized in a particular way, formatted, then printed in a readable format.

PHP developers should be aware of bulk export and import concepts when dealing with dynamic databases. 

These two methods are helpful when performing system overhaul or when migrating from one system to another. 

### Goal
This article will help readers understand how to implement bulk insert and bulk export in PHP. 

We will build a unique project that uses these two functionalities.

### Project overview
We will have a simple employee management system that supports bulk insert and bulk export. 

We will export the data into Excel and PDF. Note that this project will use a MySQL database, PHP and Bootstrap.

### Prerequisites
Besides having basic web development skills, the reader should have an idea about:
- Working with MySQL database.
- Basics of PHP programming language.
- Working with Bootstrap 4.
- [XAMPP](https://www.apachefriends.org/index.html).

### Project setup
Create a project folder with a name of your choice. In this folder, add the following components:
- A folder named `files` to store the imported files from the system.
- A `Database.php` file. It will contain the login for our desired operations.
- An `index.php` will present information or UI to the user.

### The user interface
We will use basic bootstrap styling to customize our tables and buttons.

The web application will have a navigation bar and container. It will also have a form for selecting the type of file to import into the database. 

```html
   <form method= "post"  enctype = "multipart/form-data" class="form-inline my-2 my-lg-0">
        <div class="sm-3">
            <input class="form-control mr-sm-2" type="file" name="file">
            <input type="submit"  name= "submit" value="Import" class="btn btn-success my-2" style="background-color: #02a86b;">
        </div>
    </form>
```

The table has two buttons in a form to export all records to Excel or PDF, as shown below:

```html
<form method= "post" class="form-inline my-2 my-lg-0">
    <input type="submit"  class="btn btn-primary my-2" name="excel" value="Export to excel"><hr>
    <input type="submit" class="btn btn-primary my-2" name="pdf" value="Export to pdf">
</form>
```

We also have a table showing the list of employees' names, departments, and age:

```php
<thead>
    <tr>
    <th scope="col"></th>
    <th scope="col">FIRST NAME</th>
    <th scope="col">LAST NAME</th>
    <th scope="col">DEPARTMENT</th>
    <th scope="col">AGE</th>
    </tr>
</thead>
<tbody>
    $database->getRecords();
</tbody>
```

Note that the above code for the user interface is written in the `index.php` file. 

In the `index.php` file, we need to `include` the `Database.php` file and instantiate the `Database` class.

```php
<?php
include('Database.php');
$database = new Database();
```

### Working on the Database class
The Database class contains the application's driver code. 

It also has a constructor for the database class and highlights the various functions that we need to perform on the system. 

Before starting this section, add these snippets below the instantiated database class. 

```php
if(isset($_POST['submit'])){
    $database->importFile($_FILES['file']['tmp_name']);
}

if(isset($_POST['excel'])){
    $database->exportToExcel();
}

if(isset($_POST['pdf'])){
    $database->exportToPdf();
}
```

The above code allows us to determine which button is pressed and then invokes the respective method in the database class. 

The app will then import CSV files, export the records to excel or PDF as specified by the user.

#### Connection to the database
The `Database` class extends `mysqli`. In the class constructor, we specify the `server`, `username`, `password`, and `type of database`. 

Doing this ensures that a connection to the database is called whenever the database class is instantiated.

```php
class Database extends mysqli{
    private $state = false;
    private $server = "localhost";
    private $databaseUser = "root";
    private $userPassword = "";
    private $databaseName = "bulk-op"
    private $state = false;

    public function __construct(){
        parent::__construct($server, $databaseUser, $userPassword, $databaseName);
        if($this->connect_error){
            echo "Cannont connect to the database becauser : ".$this->connect_error;
        }
    }
}
```

#### The bulk import function
The bulk import function works by reading data from an Excel file, converting it to an array, then running through the array and inserting every element into the database. 

The first step of performing the bulk import is opening an Excel file in reading mode. While reading a single row, we separate the data entries by a comma(`,`) using the `implode()` function. 

We then call the `SQL INSERT` query to add the data into the respective database fields. 

If a query fails, the private variable `state` is set to `false`, and an error is thrown showing that the import procedure was not successful. Otherwise, a success alert is sent to the user.

```php
public function importFile($fileToImport){
    //open file in reading mode
    $fileToImport = fopen(fileToImport, 'r');

    // read the file row by row separating the column elements by comma
    while($record = fgetcsv(fileToImport)){
        $valuesExtracted = "'". implode("','", $record)."'";

        //call the insert mysql query
        $sql = "INSERT INTO employee(fname, lname, department, age) VALUES(".$valuesExtracted.")";

        //confirm is the query is executed
        if($this->query($sql)){
            $state = true;
        }else{
            $state = false;
        }
    }

    if($state = true){
        echo "Succefully imported records!";
    }else{
        echo "There was in erro fetching the records. Check and try again";
    }
}
```

#### Retrieving database records
When working with the user interface, we called the method `$database->getRecords()`. 

In this step, we will write the code that will be executed when this function is invoked.

First, we use a MySql query to select everything from the employees' table and order it in a descending manner. 

Then, for every row of the result, we extract the column element and assign it to a variable corresponding to the column name on the table.

```php
public function getRecords(){
    $count = 0;
    $query = "SELECT * FROM employee ORDER BY ID DESC";
    $result = $this->query($query);
    while ($record = $result->fetch_assoc()) {
        $fname = $record['fname'];
        $lname = $record['lname'];
        $dpt = $record['department'];
        $age = $record['age'];
        $count +=1;
    
    ?>
        <tr>
            <th scope="row"><?php echo $count ?></th>
            <td><?php echo $fname ?></td>
            <td><?php echo $lname ?></td>
            <td><?php echo $dpt ?></td>
            <td><?php echo $age ?></td>
        </tr>
    <?php
    }
}
```

#### Bulk export to Excel
In the export to Excel function, we select the values that we wish to export. 

Next, we open a file in reading mode, then write to the file row by row as fetched from the employees' table.

Note that we also create a unique name for every file that we export to differentiate them.

Each file will be prefixed with `records` and a `CSV` extension at the end.

```php
public function exportToExcel(){
    $this->state = false;

    //select the desired fielfs from db
    $sql = "SELECT t.fname, t.lname, t.department, t.age FROM employee as t";

    //query the database
    $temp = $this->query($sql);

    //check if the querry returned data and the rows fetched is greater than 0
    if(!empty($temp) && $temp->num_rows > 0){

        //create a new filename 
        $filename = "records".uniqid().".csv";

        //open the file in the files directory of the project in writing mode
        $file = fopen("files/".$filename, "w");

        //loop the records fetched and write them to the file opened
        while($row = $temp->fetch_array(MYSQLI_NUM)){
            if(fputcsv($file, $row)){
                //if success, set state to true
                $this->state = true;
            }else{
                //set state to flase
                $this->state = false;
            }
        }

        //send success message if state is true
        if($state = true){
            echo "Succefully exported records!";
        }else{
            echo "There was in error fetching the records. Check and try again";
        }
        //close the file 
        fclose($file);
    }else{
        //the querry returned no data or the database is emplty
        echo "NO data fecthed".$this->error;
    }
}
```

### Bulk export to PDF
PDF stands for portable document format. It is one of the popular formats for presenting documents and minimizing edits. 

To export our database records to PDF, we need to use a small library called [fpdf](http://www.fpdf.org/). 

Download and extract the [library](http://www.fpdf.org/en/dl.php?v=184&f=zip) in a new `folder` named `fpdf` in your project. 

On top of the `Database.php` file,  add the following code:

```php
require('fpdf/fpdf.php');
```

Most of the library's configurations can be found in the [official documentation](http://www.fpdf.org/en/tutorial/index.php). However, you can copy my configuration and edit it to suit your needs. 

To export data using this library, we first select the records and assign every row element to the respective cell that should appear. 

We also specify the document's name and format of view. We can state whether we need the file to be downloaded or shown in a browser. 

In my case, I called my file `records.pdf` and displayed it in a browser.

```php
public function exportToPdf(){
    //getting recods form the database
    $query = "SELECT * FROM employee ORDER BY ID DESC";
    $result = $this->query($query);
    $count = 0;

    //creating a new instance of the fpdf class for our data
    $pdf = new Fpdf();
    $pdf-> AddPage();
    $pdf->SetFont('Arial','',9);
    $pdf->Cell(15,8,"S/NO",1);
    $pdf->Cell(45,8,"First Name",1);
    $pdf->Cell(40,8,"Last Name",1);
    $pdf->Cell(40,8,"Department",1);
    $pdf->Cell(40,8,"Age",1);

    //writing every row fecthed to the pdf file
    while ($record = $result->fetch_assoc()){
        $count +=1;
        $pdf->Ln();
        $pdf->Cell(15,8,$count,1,0,'C');
        $pdf->Cell(45,8,$record['fname'],1);
        $pdf->Cell(40,8,$record['lname'],1);
        $pdf->Cell(40,8,$record['department'],1);
        $pdf->Cell(40,8,$record['age'],1,0,'C');
        
    }
    
    //specify the output file name and view formar
    $pdf->output('records.pdf', 'I');
}
```

### Creating a database and running the application
Open `phpmyadmin` then create a new database called `bulk_up`. This is the same name we specified while writing the constructor in the `Database.php` file. 

In the `bulk_up` database, create a table called `teammember` with the following properties:
- id
- fname
- lname
- department
- age

Migrate the project folder into the `htdocs` folder found in the `XAMPP` installation directory. 

Next, start MySQL and Apache servers, then navigate to your browser to view the project.

![App user interface](/engineering-education/php-bulk-operations/interface.png)

![Data exported to PDF](/engineering-education/php-bulk-operations/pdf-export.png)

### Conclusion
This article guided readers on how to perform bulk operations in PHP using MySQL database. Bulk operations are helpful when dealing with large amounts of data. 

We have built a project that lists employees' information. It also allows one to import and export records to Excel and PDF. 

We have also discussed how to set up the `fpdf library` and use it to export data into PDF formats. 

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
