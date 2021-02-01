### Connect Basic4Android(B4A) Android application to MySQL Database Using PHP

There are many tools for android application development. Some of the tools are [Android Studio](https://developer.android.com/studio), [basic4android](https://www.b4x.com/b4a.html)(B4A), [Unity 3D](https://unity.com/). B4A is a tool for rapid application development developed by [Anywhere Software](https://www.b4x.com). B4A is free and can be downloaded and installed from the [official website](https://www.b4x.com/b4a.html).

### Introduction

There is an increase in mobile devices in the world. Organizations are concentrating on mobile application development to get more users or clients. This growth means that information needs to be stored in databases. With stored data, there is easy service delivery from organization to clients. B4A is an integrated development environment(IDE) for developing Android mobile applications. B4A bases on visual basic coding techniques. PHP is a programming language for developing server-side applications. MySQL is a relational database management tool(RDMS) that helps in database management.

### Prerequisites

* Have prior SQL, PHP, and B4A programming language.
* B4A application installation on a Windows computer. If not installed, follow the instruction in this [article](https://www.section.io/introduction-to-android-app-development-basic4android-b4a-part1/) on how to install and configure.
* PHP and MySQL development environment: In this case, we will use Xampp.

### Installing B4A

* Kindly follow this [Tutorial](https://www.section.io/introduction-to-android-app-development-basic4android-b4a-part1).

### Installing Xampp

* Download Xampp from the [official website](https://www.apachefriends.org/index.html).
* Click on the downloaded file and continue with the installation.

![initializing-installation-window](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/xampp-first-installation.png)

* Pick on the components that we will use: MySQL and phpMyAdmin, and click Next.

![Pick components](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/xampp-second-pick-components.png)

* Select the folder where to install  Xampp, and click Next.

![Installation folder](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/xampp-third-folder-selection.png)

* Select the language, and click next.

![Language](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/xampp-fourth-language-selection.png)

* Click next for the below windows.

![Features window](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/xampp-fifth-window.png)

![Ready to install window](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/xampp-sixth-window.png)

* Wait for the installation process.

![Installation window](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/xampp-seventh-installation-process.png)

-PHP files are kept in the Xampp directory in a folder called `htdocs`. For this application, we will create a folder called `B4A-PHP`. In the folder, we will store our PHP files inside Xampp htdocs folder.

- Access the Xampp folder we have created in a network by getting a computer IP address with a folder name. In this case, to get the computer IP, we will run the following Windows CMD command.

``` bash
ipconfig
```

![Installation window](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/ipconfig-b4a.png)

`URL: http://192.168.100.118/B4A-PHP/api.php` Change to match yours.

- We will use the URL above to connect our B4A application to the server (Xampp) for data exchange. The computer acting as the server and the phone should be on the same network.

![URL](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/url-php-api.png)

### B4A Android application

From the two stages above, we will have a Xampp environment that will support PHP. B4A which will support rapid android application development.

From B4A Application, click on File -> New -> Default to create a new project.

![New B4A application](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/b4a-create-new-default-application.png)

* Chose a project path and assign the project name.

![Project name](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/project-path.png)

### B4A Android CRUD Operation

* Add HTTP library that will enable connection to host computer. The library is added through a window called Library manager. The Library manager is in the right corner of the B4A application.

![Library manager](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/add-http-library.png)

* The application will do a CRUD operation. We will create a layout with an editText and button, which we use to create CRUD operations.

![Add layout](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/button-editText-design.png)

### Save data in MySQL from the B4A Android application.

### B4A code

* Add button in design view and name it `Save`. Right-click on the button in the design view to generate the Click event. The following code will be generated in the Main class.

``` basic
Sub Save_Click
End Sub
```

* Declare HTTP, EditText, and URL variable in Global function as shown below.

``` basic
Sub Globals
    Dim savedata As HttpJob
    Private EditText1 As EditText
    Dim URL As String
End Sub
```

* Initialize layout and URL.

``` basic
Activity.LoadLayout("Layout")
'Link to where PHP file will be located
'Change URL to match yours
URL="http://192.168.100.118/B4A-PHP/api.php"
```

`URL is the IP address with a PHP file or domain name with a PHP file to be accessed in the server.`

* Add the code to initialize and communicate with the server or host.
**Note** two variables are posted save to indicate PHP that data is supposed to be saved. The editTextData variable carries the data to be saved in the database.

``` basic
Sub Save_Click
    savedata.Initialize("savedata", Me)
    savedata.PostString(URL,"save=&editTextData="&EditText1.Text)
End Sub
```

* Add code to check if the connection is a success. The code captures the response from the specific request.


``` basic
Sub JobDone (job As HttpJob)
'save data
Select job
        Case savedata
            If job.Success Then
                'success message
                ToastMessageShow("Saved",False)
                'Clear text in editText
                EditText1.Text=""
            Else

                ToastMessageShow("Check your internet connection",False)
            End If

            savedata.Release
        End Select
End Sub
```

### PHP code

* Start Xampp application, then click on Apache and MySQL. Once the port numbers appear, it will show the two services are running.
* Click Admin under MySQL to start phpMyAdmin over the browser.
* By default, it will not request for MySQL username and password.
* Create a database in  phpMyadmin by Clicking new, then put database name, then click create.

`Our database will be called b4a-php-db`

![Create Database](/engineering-education/Connect-Basic4Android-BAndroid-development-too--to-MySQL-Database-Using-PHP/create-database.png)

* Create a table in the database to store data with the command below under the SQL tab in phpMyadmin.

`Our table is called student_name`

``` sql
CREATE TABLE `b4a-php-db`.`student_name` ( `id` INT(10) NOT NULL AUTO_INCREMENT , `name` VARCHAR(20) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
```

* Create a PHP file to connect to the database and execute the insert SQL statement.

``` php
<?php

// change details below to fit your details

$servername = "localhost";      // Computer host
$username = "root";             // MySql username
$password = "";                  // MySQL password
$dbname = "b4a-php-db";          // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check which function to execute
if(isset($_POST['save'])) {

//sql statement to insert data
$sql = "INSERT INTO student_name (name) VALUES ('".$_POST['editTextData']."', )";

// execute to insert data
if ($conn->query($sql) === TRUE) {
  die("Data saved");
} else {
  die("Error: " . $sql . "<br>






" . $conn->error);
}

$conn->close();
}
?>
```

* When you click the button in the B4A android application, the data is inserted into the database.

### Read Data from MySQL to B4A Android application.

* This is the fetching of data from the MySQL database to the B4A android application. In this case, we will fetch the fast data in the MySQL database table to be added.

### PHP code

``` php
<?php

// change details below to fit your details

$servername = "localhost";      // Computer host
$username = "root";             // MySql username
$password = "";                  // MySQL password
$dbname = "b4a-php-db";          // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check which function to execute
if(isset($_POST['fetch'])) {

//sql statement to select data
$sql = "SELECT name from student_name limit 1 ";

// execute to select data
$result = $conn->query($sql);


if ($result->num_rows > 0) {
  // output data 
  while($row = $result->fetch_assoc()) {
    die($row["name"]);
  }
} else {
  die("No Data");
}
$conn->close();
}
?>
```

### B4A code

* Add HTTP variable to support fetching of data in global function.

``` basic
Sub Globals
    Dim readdata As HttpJob
    Dim savedata As HttpJob
    Private EditText1 As EditText
    Dim URL As String
End Sub
```

* Add another button in the designer and name it `Read.`
* Right-click on the view and generate a click event.

``` basic
Private Sub Read_Click

End Sub
```

* Add the following code to initialize and communicate with the server or host. The code will be executed when the Read button is clicked.
**Note** one variable is posted to indicate function read is executed in PHP.

``` basic
Private Sub Read_Click
    readdata.Initialize("readdata", Me)
    readdata.PostString(URL,"fetch=")
End Sub
```

* Add code to check if the connection is a success. The code captures the response from the specific request. It has combined with saving execution.

``` basic
Sub JobDone (job As HttpJob)
Select job

    'save data
        Case savedata
            If job.Success Then
                'success message
                ToastMessageShow("Saved",False)
                'Clear text in editText
                EditText1.Text=""
            Else

                ToastMessageShow("Check your Internet connection",False)
            End If

            savedata.Release
    'fetch data
        Case readdata
            If job.Success Then
                ' check if there is data from the response.
                If job.GetString.Length < 1 Then
                    'No data message
                    ToastMessageShow("No Data available",False)
                    Return
                End If
                'success message
                ToastMessageShow("Fetched",False)
                'set editText value to the one fetched from the database
                EditText1.Text=job.GetString
            Else

                ToastMessageShow("Check your Internet connection",False)
            End If

            readdata.Release
        End Select
End Sub
```

### Update Data from B4A Android Application

### B4A code

* Add HTTP variable to support updating of data in global function.

``` basic
Sub Globals
    Dim updatedata As HttpJob
    Dim readdata As HttpJob
    Dim savedata As HttpJob
    Private EditText1 As EditText
    Dim URL As String
End Sub
```

* Add another button in the designer and name it `Update.`
* Right-click on the view and generate a click event.

``` basic
Private Sub Update_Click

End Sub
```

* Add a variable called `prevData` to store fetched data in the global function.

``` basic
Sub Globals
    Dim updatedata As HttpJob
    Dim readdata As HttpJob
    Dim savedata As HttpJob
    Private EditText1 As EditText
    Dim URL As String
    Dim prevData As String
End Sub
```

* Add the following code to initialize and communicate with the server or host. The code will be executed when the Read button is clicked.
**Note** three variables are posted. One indicates function Update is to be executed in PHP. The  editTextData new data that has been entered in the edittext. The prevData to be replaced in the database.

``` basic
Private Sub Update_Click
    updatedata.Initialize("updatedata", Me)
    updatedata.PostString(URL,"update=&editTextData="&EditText1.Text&"&prevData="&prevData)
End Sub
```

* Add code to check if the connection is a success. The code captures the response from the specific request. It has combined with saving execution.

``` basic
Sub JobDone (job As HttpJob)
Select job

    'save data
        Case savedata
            If job.Success Then
                'success message
                ToastMessageShow("Saved",False)
                'Clear text in editText
                EditText1.Text=""
            Else

                ToastMessageShow("Check your Internet connection",False)
            End If

            savedata.Release
    'fetch data
        Case readdata
            If job.Success Then
            ' check if there is data from the response
                If job.GetString.Length < 1 Then
                    'No data message
                    ToastMessageShow("No Data available",False)
                    Return
                End If
                'success message
                ToastMessageShow("Fetched",False)
                'set editText value to the one fetched from the database
                EditText1.Text=job.GetString
                prevData= EditText1.Text
            Else

                ToastMessageShow("Check your Internet connection",False)
            End If

            readdata.Release

            'update data
        Case updatedata
            If job.Success Then
                'success message
                ToastMessageShow("Updated",False)
            Else

                ToastMessageShow("Check your Internet connection",False)
            End If

            updatedata.Release
        End Select
End Sub
```

### PHP code

``` php
<?php

// change details below to fit your details

$servername = "localhost";      // Computer host
$username = "root";             // MySql username
$password = "";                  // MySQL password
$dbname = "b4a-php-db";          // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check which function to execute
if(isset($_POST['update'])) {

//sql statement to select data
$sql = "UPDATE student_name SET name='".$_POST['editTextData']."' WHERE name='".$_POST['prevData']."'";

//execute update statement
if ($conn->query($sql) === TRUE) {
  die ("Updated");
} else {
  die( "Error: " . $conn->error);
}

$conn->close();
}
?>
```

### Delete data from B4A Android Application

### B4A Code

* Add HTTP variable to support deleting of data in global function.

``` basic
Sub Globals
    Dim deletedata As HttpJob
    Dim updatedata As HttpJob
    Dim readdata As HttpJob
    Dim savedata As HttpJob
    Private EditText1 As EditText
    Dim URL As String
    Dim prevData As String
End Sub
```

* Add another button in the designer and name it `Delete.`
* Right-click on the view and generate a click event.

``` basic
Private Sub Delete_Click

End Sub
```

* Add the code below to initialize and communicate with the server or host. In the server, the PHP files are located when the Read button is clicked.
**Note** two variables are posted. One variable that indicates function delete is to be executed in PHP. The editTextData data that has been entered in the  EditText1.Text is to be deleted from the database.

``` basic
Private Sub Delete_Click
    deletedata.Initialize("deletedata", Me)
    deletedata.PostString(URL,"delete=&editTextData="&EditText1.Text)
End Sub
```

* Add code to check if the connection is a success. The code captures the response from the specific request.


``` basic
Sub JobDone (job As HttpJob)
Select job

    'save data
        Case savedata
            If job.Success Then
                'success message
                ToastMessageShow("Saved",False)
                'Clear text in editText
                EditText1.Text=""
            Else

                ToastMessageShow("Check your Internet connection",False)
            End If

            savedata.Release
    'fetch data
        Case readdata
            If job.Success Then


                ' check if there is data from the response
                If job.GetString.Length < 1 Then
                    'No data message
                    ToastMessageShow("No Data available",False)
                    Return
                End If
                'success message
                ToastMessageShow("Fetched",False)
                'set editText value to the one fetched from the database
                EditText1.Text=job.GetString
                prevData= EditText1.Text
            Else

                ToastMessageShow("Check your Internet connection",False)
            End If

            readdata.Release

            'update data
        Case updatedata
            If job.Success Then
                'success message
                ToastMessageShow("Updated",False)
            Else

                ToastMessageShow("Check your Internet connection",False)
            End If

            updatedata.Release
            'delete data
        Case deletedata
            If job.Success Then
                'success message
                ToastMessageShow("Deleted",False)
            Else

                ToastMessageShow("Check your Internet connection",False)
            End If

            deletedata.Release
        End Select
End Sub
```

### PHP code

``` php
<?php

// change details below to fit your details.

$servername = "localhost";      // Computer host
$username = "root";             // MySql username
$password = "";                  // MySQL password
$dbname = "b4a-php-db";          // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check which function to execute
if(isset($_POST['delete'])) {

//sql statement to select data
$sql = "Delete from student_name where name='".$_POST['editTextData']."'";

//execute delete statement
if ($conn->query($sql) === TRUE) {
  die("Deleted");
} else {
  die("Error: " . $conn->error);
}

$conn->close();
}
?>
```

You can find the complete source code on [Github](https://github.com/tambastar/B4A-PHP). You can also find more example projects in the [B4A community](https://www.b4x.com/android/forum/).

### Conclusion

With the PHP file kept in the Apache server host, the B4A Android application is connected via the URL. The android application would be in communication with the computer as a host server. This will then lead to having several functions within the application. B4A rapid development has helped in fast android application development. This is an example of achieving a faster connection to the database and query database.