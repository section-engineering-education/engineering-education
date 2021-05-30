---
layout: engineering-education
status: publish
published: true
url: /connecting-basic4android-b4a-application-with-php-and-mysql-database/
title: Connecting Basic4Android (B4A) Application to PHP and MySQL Database
description: This article will go over creating a B4A application that communicates with the database using PHP from the article. We will also install Xampp, create a database, create a simple B4A application.
author: sylvester-tamba
date: 2021-02-09T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/hero.jpg
    alt:  example image
---
There are many tools for Android application development. Some of these tools are [Android Studio](https://developer.android.com/studio), [basic4android](https://www.b4x.com/b4a.html) (B4A), [Unity 3D](https://unity.com/). B4A is a tool for rapid application development developed by [Anywhere Software](https://www.b4x.com). B4A is free and can be downloaded and installed from the [official website](https://www.b4x.com/b4a.html).
<!--more-->
### Introduction
There has been an increase in [mobile devices across the world](https://www2.deloitte.com/global/en/pages/technology-media-and-telecommunications/articles/gx-global-mobile-consumer-trends.html). Organizations are now concentrating more on mobile application development to get more users or clients. This growth in mobile development means that information needs to be stored in more databases. 

With stored data, there is easier service delivery from organization to their clients. B4A is an integrated development environment (IDE) used when developing Android mobile applications. B4A is based on visual basic coding techniques. PHP is a programming language used when developing server-side applications. MySQL is a relational database management tool (RDMS), that helps with database management.

### Prerequisites
Before we begin, it would be useful for the reader to have the following:
- A basic knowledge in SQL, PHP, and B4A programming.
- A B4A application installed on a Windows computer. Follow the instructions in this [article](/introduction-to-android-app-development-basic4android-b4a-part1/) on how to install and configure B4A.
- PHP and MySQL development environment: In this case, we will use Xampp.

### Installing B4A
- Kindly follow this [tutorial](/introduction-to-android-app-development-basic4android-b4a-part1/).

### Installing Xampp
- Download Xampp from the [official website](https://www.apachefriends.org/index.html).
- Click on the downloaded file and continue with the installation.

![initializing-installation-window](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/xampp-first-installation.PNG)

- Pick the components that we will use: MySQL and phpMyAdmin, and click Next.

![Pick components](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/xampp-second-pick-components.PNG)

- Select the folder you would like to install Xampp, and click Next.

![Installation folder](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/xampp-third-folder-selection.PNG)

- Select the language, and click next.

![Language](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/xampp-fourth-language-selection.PNG)

- Click next, as shown in the screenshot below.

![Features window](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/xampp-fifth-window.PNG)

![Ready to install window](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/xampp-sixth-window.PNG)

- Wait for the installation process.

![Installation window](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/xampp-seventh-installation-process.PNG)

- PHP files are kept in the Xampp directory in a folder called `htdocs`. For this application, we will create a folder called `B4A-PHP`. In the folder, we will store our PHP files inside Xampp htdocs folder.

- Access the Xampp folder we have created in a network by getting a computer IP address with a folder name. In this case, to get the computer IP, we will run the following Windows CMD command.

```bash
ipconfig
```

![Installation window](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/ipconfig-b4a.png)

`URL: http://192.168.100.118/B4A-PHP/api.php` this `URL` needs to be changed to match yours.

- We will use the URL above to connect our B4A application to the server (Xampp) for data exchange. The computer acting as the server and the phone should be on the same network.

![URL](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/url-php-api.png)

### B4A application
So far, we have our development environment ready.

From B4A Application, click on `File -> New -> Default` to create a new project.

![New B4A application](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/b4a-create-new-default-application.png)

- Choose a project path and enter the project name.

![Project name](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/project-path.PNG)

### B4A CRUD operations
- Let's add a HTTP library that will enable connection to the host computer. The library is added through a window called Library manager. The Library manager is in the right corner of the B4A application.

![Library manager](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/add-http-library.PNG)

- The application will do CRUD operations. We will create a layout with an editText and button, which we use to create CRUD operations.

![Add layout](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/button-editText-design.png)

### Save data in MySQL from the B4A application

### B4A code
- Add the code below to the manifest file to allow a network connection on Android 8 and above. This code will enable the network connection. For more details, check on this [article](https://www.b4x.com/android/forum/threads/manifest-editor.13818/).

```basic
   SetApplicationAttribute(android:usesCleartextTraffic, "true")
```

- Let's add a button in the design view and name it `save`. Right-click on the button in the design view to generate the Click event. The following code will be generated in the Main class.

```basic
Sub Save_Click
End Sub
```

- Declare the HTTP, EditText, and URL variable in Global function, as shown below.

```basic
Sub Globals
    Dim savedata As HttpJob
    Private EditText1 As EditText
    Dim URL As String
End Sub
```

- Initialize layout and URL.

```basic
Activity.LoadLayout("Layout")
'Link to where PHP file will be located
'Change URL to match yours
URL="http://192.168.100.118/B4A-PHP/api.php"
```

`URL is the IP address with a PHP file or domain name with a PHP file to be accessed in the server.`

- Add the code below to initialize the `HTTP` variable in B4A. The code will communicate with the server or host where PHP files are kept.

**Note:** Two variables are posted `save` to indicate to PHP which code function will be executed. In this case, the `save` functionality will be executed. The editTextData variable carries the data to be saved in the database. The variable can be renamed to suit your naming format.

```basic
Sub Save_Click
    savedata.Initialize("savedata", Me)
    savedata.PostString(URL,"save=&editTextData="&EditText1.Text)
End Sub
```

- Let's add code to check if the connection is a success. The code captures the response from the specific request.

```basic
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
- Start the Xampp application, then click on Apache and MySQL. Once the port numbers appear, it will show the two services are running.
- Click Admin under MySQL to start phpMyAdmin over the browser.
- By default, it will not request for MySQL username and password.
- Create a new database in phpMyadmin and name it `b4a-php-db`. This can be done by clicking the `New`, entering the database name, and clicking the `Create` button. 

See the highlighted areas in the screenshot below.

`Our database will be called b4a-php-db`

![Create Database](/engineering-education/connecting-basic4android-b4a-application-with-php-and-mysql-database/create-database.png)

- We need to create a table named `student_name` in the database `b4a-php-db`. With the database selected, navigate to the `SQL` tab in phpMyadmin and run the command below. This creates a new table named `student_name`.

`Our table is called student_name`

```sql
CREATE TABLE `b4a-php-db`.`student_name` ( `id` INT(10) NOT NULL AUTO_INCREMENT , `name` VARCHAR(20) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
```

- Create a PHP file to connect to the database and execute the insert SQL statement.

```php
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
    $sql = "INSERT INTO student_name (name) VALUES ('".$_POST['editTextData']."' )";
    // execute to insert data
    if ($conn->query($sql) === TRUE) {
        die("Data saved");
    } else {
        die("Error: " . $sql . "<br>" . $conn->error);
    }
    $conn->close();
}
?>
```

- When you click the button in the B4A application, the data is inserted into the database.

### Read data from MySQL to B4A application
- The code below is used to fetch data from the MySQL database to the B4A application. In this case, we will fetch only one entry. This is the first entry that was inserted into the table.

### PHP code

```php
<?php
// change details below to fit your details
$servername = "localhost";      // Computer host
$username = "root";             // MySQL username
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
- Add the HTTP variable to support fetching data in global function.

```basic
Sub Globals
    Dim readdata As HttpJob
    Dim savedata As HttpJob
    Private EditText1 As EditText
    Dim URL As String
End Sub
```

- Add another button in the designer and name it `Read.`
- Right-click on the view and generate a click event.

```basic
Private Sub Read_Click

End Sub
```

- The code below will be used to initialize the `HTTP` library in B4A. Through the library, B4A can communicate with the server or host where PHP files are located. The code will be executed when the Read button is clicked.

**Note:** One variable is posted to indicate the read function is executed in PHP.

```basic
Private Sub Read_Click
    readdata.Initialize("readdata", Me)
    readdata.PostString(URL,"fetch=")
End Sub
```

- The code below will give a response on the connection status. Each request made to the server will have its response. Since we were saving information through our request, the saving PHP functionality will be executed.

```basic
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

### Update data from B4A application

### B4A code
- Add the HTTP variable to support any updating of the data in global function.

```bash
Sub Globals
    Dim updatedata As HttpJob
    Dim readdata As HttpJob
    Dim savedata As HttpJob
    Private EditText1 As EditText
    Dim URL As String
End Sub
```

- Add another button in the designer and name it `Update.`
- Right-click on the view and generate a click event.

```basic
Private Sub Update_Click

End Sub
```

- Add a variable called `prevData` to store fetched data in the global function.

```basic
Sub Globals
    Dim updatedata As HttpJob
    Dim readdata As HttpJob
    Dim savedata As HttpJob
    Private EditText1 As EditText
    Dim URL As String
    Dim prevData As String
End Sub
```

- The code below will initialize the `HTTP` variable in B4A. The code will also communicate with the server or host. The code will be executed when the Read button is clicked.

**Note:** Three variables are posted. One indicates the Update function will be executed in PHP. The editTextData new data that has been entered in the edittext. The prevData to be replaced in the database.

```basic
Private Sub Update_Click
    updatedata.Initialize("updatedata", Me)
    updatedata.PostString(URL,"update=&editTextData="&EditText1.Text&"&prevdata="&prevData)
End Sub
```

- Let's add code to check if the connection was a success. The code captures the response from the specific request. It has combined with the saving execution.

```basic
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

```php
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

### Delete data from B4A application

### B4A code
- Add the HTTP variable to support any deleting of data in a global function.

```basic
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

- Add another button in the designer and name it `Delete.`
- Right-click on the view and generate a click event.

```basic
Private Sub Delete_Click

End Sub
```

- The code below will initialize the `HTTP` library. With library initialized, B4A communicates with the server or host. When the delete button is clicked, the delete functionality will be executed.

**Note:** Two variables are posted. One variable that indicates the delete function will be executed in PHP. The editTextData data that has been entered in the EditText1. Text is data to be deleted in the database.

```basic
Private Sub Delete_Click
    deletedata.Initialize("deletedata", Me)
    deletedata.PostString(URL,"delete=&editTextData="&EditText1.Text)
End Sub
```

- Add this code snippet to check if the connection was a success. The code captures the response from the specific request.

```basic
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

```php
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

You can find the complete source code on [GitHub](https://github.com/tambastar/B4A-PHP). You can also find more example projects in the [B4A community](https://www.b4x.com/android/forum/).

### Conclusion
In this article we have looked at creating a B4A application that communicates with the database using PHP from the article.
We also have:

- Installed Xampp.
- Created a database.
- Created a simple B4A application.
- Stored data into the database.
- Fetched data from the database.
- Created a PHP script that communicates with the database.

---
Peer Review Contributions by: [Benson Kariuki](/engineering-education/authors/benson-kariuki/)
