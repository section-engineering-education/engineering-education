---
layout: engineering-education
status: publish
published: true
url: /develop-google-add-on/
title: Developing a Google Add-on
description: This article will go through creating a Google add-on by using apps script which is a javascript based scripting language created by google to make automation a reality and make third-party services and information available.
author: peter-ndegwa
date: 2021-01-17T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/develop-google-add-on/hero.png
    alt: Google add-on example image
---
Google offers online services through applications such as Doc, Sheet, Forms, etc. The services collect, hold, and/or store data that need to be shared, processed, or even analyzed. Google has also provided a scripting language that allows automation and interaction with its applications. Apps Script is a Javascript cloud language by Google to that make automation a reality and make third-party services or information available.
<!--more-->
### Introduction
The language is useful in building web apps, desktop, and Android add-ons for Sheets, Docs, and Forms applications. There are two types of add-ons: Google Workspace that works for cross applications and Editor Add-on that works with a single application. 

Developers can benefit a lot by knowing how to create add-ons. This provides a channel to conveniently offer services to Google applications users, using a server-less platform.

### Discussion
To access the App Script programming interface, open Google sheet and navigate to Tools > Script Editor.

![Access Script Editor](/engineering-education/develop-google-add-on/apps-script-access.png)

The Apps Script displays a programming interface as shown below.

![Apps Script Editor](/engineering-education/develop-google-add-on/apps-script-editor.png)

We will now head straight to the features and development.

#### 1. Menu creation
The aim is to add on the Google sheet menu our functions for users to click and execute a script. The script remains invisible for users, hence the need to have menu buttons to enable interaction and execution. 

To create a menu, an `onOpen()` function is used with reference to the spreadsheet's user interface being made in the body. A `createMenu('Menu')` function is called and provided with a suitable name for the add-on top Menu. 

To add items on the menu, the `addItem('Item')` function is used with a suitable name provided. Items in a menu can be separated by calling a function `addSeparator()` that does not take any parameter. 

To add a submenu, the `addSubMenu()` function is called with a reference to the spreadsheet's user interface and a call to the `createMenu()` function supplied with the submenu name. The function `addToUi()` is used  to add the menu in the spreadsheet's user interface.

```javascript
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('Menu')

              .addSubMenu(SpreadsheetApp.getUi().createMenu('SubMenu1')
              .addItem('Show SideBar', 'showSideBar')
              .addItem('Helper Functions', 'helperFunction'))

  .addSeparator()

              .addSubMenu(SpreadsheetApp.getUi().createMenu('SubMenu2')
              .addItem('Item 1', 'item1function')
              .addItem('Item 2', 'item2function'))

  .addSeparator()


               .addSubMenu(SpreadsheetApp.getUi().createMenu('SubMenu3')
              .addItem('Item 1', 'item1function')
              .addItem('Item 2', 'item2function'))

             .addToUi();
}
```

![Create menu](/engineering-education/develop-google-add-on/menu.png)

#### 2. User Interface (UI) development
On top of the spreadsheet's user interface, Google enriches it with popups, sidebars, dialogue boxes, alerts, among others. They help improve the interaction between the client and the backend systems by providing information on progress, prompting users to give more information, or even giving feedback. 

There are custom dialogues for Apps Script projects that take HTML input that are built to open like modal items and interrupt the user from doing anything else before batting it. 

File-open dialogues allow the user to pick/choose a file from the drive, computer, or other location.  We will provide a case for a sidebar that takes HTML as input and requires a title.

```javascript
function showSideBar() {
  var htmlOutput = HtmlService
    .createHtmlOutput('<p>This is the body in HTML</p>')
    .setTitle('SideBar Header');
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}
```

![Side bar](/engineering-education/develop-google-add-on/side-bar.png)

#### 3. Interaction with external features such as CSS and JQuery
Apps Script provides a way to use external libraries to make use of the existing CSS and Javascript libraries. Below is an example of how to link to the JQuery library in the header section.

```html
<head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <?!=content?>
...
</head>
<body>
```

#### 4. Availability of helper functions
Apps Script provides functions that give quick access to spreadsheets and data during processing. `SpreadsheetApp.getActiveSpreadsheet()` is a function used to instruct the Spreadsheet application to return the spreadsheet in use. It can be concatenated with `.getSheetByName`, `getSheetByUrl`, among others to return a particular sheet. 

The `getRange()` function is used with range parameters to return a particular section of the sheet. It can be used together with a `getValues()` function to return the values of the selected range. Other inbuilt functions include `getMaxRows()`, `getNumRows()`, `getNumColumns()`, etc.

```javascript
function helperFunction() {
  var spreadsheet = SpreadsheetApp.getActive();
  sheet = spreadsheet.getSheetByName('Sheet1');
  range = sheet.getRange('B2:C5');
  data = range.getValues();
  text = '';
  for (v in data) {
    text = text +'<p>'+data[v]+'</p>';
  }

  var htmlOutput = HtmlService
    .createHtmlOutput(text)
    .setTitle('Returned Data');
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}
```

![Helper function](/engineering-education/develop-google-add-on/helper-function.png)

#### 5. Triggers
Add-ons are capable of using three types of triggers:
1. Simple triggers that run on performing a certain function like the `onOpen()` that is called when the spreadsheet is opened;
2. Installable triggers that are called after being installed like the form-submit; and
3. Time-driven triggers that are time-dependent.

In this section, we will illustrate the time-based triggers which are defined mostly by the user. They let the script execute at a particular time at most once an hour. 

You specify the hour you want and the script to execute, but the script may randomly choose the appropriate time within that hour for it to execute i.e. if you choose to execute at 8 am, the script may choose between 8 am and 9 am.

```javascript
function createTimeDrivenTriggers() {
  // Trigger every 30 minutes.
  ScriptApp.newTrigger('helperFunction')
      .timeBased()
      .everyMinutes(30)
      .create();
}
```

![Triggers](/engineering-education/develop-google-add-on/triggers.png)

#### 6. Storage
Apps Script supports both Properties and JDBC services to facilitate data storage. Properties service is mostly used to store key-value pairs for simple strings with a scope of one script, one user of the script, or the document within which the add-on is used. 

The `getScriptProperties()`, `getUserProperties()` and `getDocumentProperties()` functions return similar Properties objects that define the access levels. All data is stored as strings, if not a string, it is converted. JDBC allows you to connect to an external database such as Cloud SQL instance, Mysql, Oracle, etc.

This makes it the best choice for robust applications. To establish the connection, one is required to ensure that the database accepts Apps Script IP addresses that are provided by Google. Whereas, for own databases, JDBC should run in port 1025 and above.

```javascript
// Cloud SQL
var ip = 'DB_ip';
var root_pass = 'root_pass';
var db_user = 'db_user';
var db_user_pass = 'db_user_pass';
var db = 'db_name';

var root = 'root';
var instance_ip = 'jdbc:mysql://' + ip;
var db_url = instance_ip + '/' + db;

// Create a new database instance.
function createDatabase() {
  var connection = Jdbc.getConnection(instance_ip, root, root_pass);
  connection.createStatement().execute('CREATE DATABASE ' + db);
}
```

```javascript
// Replace the variables in this block with real values.
var ip = 'db_ip';
var db_user = 'db_user';
var db_user_pass = 'user_password';
var db = 'db_name';

var db_url = 'jdbc:mysql://' + ip + '/' + db;

// Write one row of data to a table.
function writeFirstRecord() {
  var connection = Jdbc.getConnection(db_url, db_user, db_user_pass);

  var stmt = connection.prepareStatement('INSERT INTO items '
      + '(itemName, desc) values (?, ?)');
  stmt.setString(1, 'First Item');
  stmt.setString(2, 'Male, 5.7ft');
  stmt.execute();
}
```

#### 7. Logging/debugging
Apps Script does provides a way to log and debug when the add-on is in the development phase. The `clear()`, `getLog()`, and `log()` functions are useful when logging errors. Syntax errors are detected immediately they occur and the page does not allow saving. 

Runtime errors are slightly hard to detect thus only reported during code execution. Apps Script saves execution scripts that record each call to services thus helping show the point the error occurred. 

Navigate to Executions to view the records. Apps Script also allows users to run code in debug mode by choosing a breakpoint at which the execution stops.

```javascript
// Generate a log, then email it to the person who ran the script.
 var my_files = DriveApp.getFiles();
 while (my_files.hasNext()) {
   Logger.log(my_files.next().getName());
 }
//  Get logs and send them to email
 MailApp.sendEmail(Session.getActiveUser().getEmail(), 'List of Files in Google Drive', Logger.getLog());
```

![Logging / Debugging](/engineering-education/develop-google-add-on/debugging.png)

#### 8. Authorization
On install and addition of new services, Apps Script requires that the user authorize the application to execute from their spreadsheet application. 

After it has acquired the necessary permission, the add-on can access private data in the scopes defined. Permissions on an add-on can be revoked at any time by navigating to Account > Security > View all and clicking revoke access on the add-on.

![Review permissions](/engineering-education/develop-google-add-on/review-permissions.png)

![Choose account](/engineering-education/develop-google-add-on/choose-account.png)

![Allow permissions](/engineering-education/develop-google-add-on/allow-permission.png)

#### 9. Scopes
Scope refers to the services the add-on has access to and are viewed by navigating to Overview.

```javascript
//      https://www.googleapis.com/auth/script.send_mail send mail scope
 MailApp.sendEmail(Session.getActiveUser().getEmail(), 'List of Files in Google Drive', Logger.getLog());

// https://www.googleapis.com/auth/drive.readonly Google Drive scope
 var myfiles = DriveApp.getFiles();

//  https://www.googleapis.com/auth/spreadsheets   https://www.googleapis.com/auth/script.container.ui Spreadsheet and UI scope
SpreadsheetApp.getUi()
```

![Scopes](/engineering-education/develop-google-add-on/scopes.png)

#### 10. API
Apps Script provides mechanisms by which spreadsheets can connect to other Google applications like Docs, Drive, Calendar, Gmail, and Youtube. Further, it provides a mechanism to interface with External APIs by use of `UrlFetchApp.fetch(URL)`, `XML.parse(XML, true)` and `JSON.parse(JSON)` functions.

```javascript
// Google Drive
 DriveApp;

//  Doc
 DocumentApp;
```

#### 11. Publishing
This is the last step. It allows developers to make the add-on available to the public or targeted group. The add-on should be properly tested for the specified type i.e. Workspace or Editors add-on. The project version is created on the platform while verifying collaborators.

![Deployment](/engineering-education/develop-google-add-on/deployment.png)

Published add-on

![Published Add-on](/engineering-education/develop-google-add-on/published.png)

Access published add-on

![Access published add-on](/engineering-education/develop-google-add-on/access-published.png)

### Conclusion
Innovations shared in the Google Marketplace go deep into improving service delivery, their efficiency, and effectiveness. Developers can make use of the existing features in Apps Script to come up with robust add-ons to enhance Google Applications and services. 

Apps Script is a versatile programming language that provides collection, storage, manipulation, and data availability in a role-based manner. 

Add-ons user interfaces are customizable thus developers' information is available to the public. Add-ons may have a subscription that requires the user to pay some amount before using it. This guide was meant to empower developers with the necessary tools to create add-ons and publish them for use.

### References
1. [https://railsware.com/blog/](https://railsware.com/blog/google-apps-script-gotchas-to-develop-an-add%E2%80%91on/)
2. [https://ctrlq.org/google.apps.script](https://ctrlq.org/google.apps.script/docs/add-ons/index.html)
3. [https://medium.com/@factoryhr/google-sheets-add-on](https://medium.com/@factoryhr/google-sheets-add-on-tutorial-exporting-key-value-column-pairs-to-json-56107e82b4ca)
4. [https://support.google.com/docs/](https://support.google.com/docs/answer/2942256?co=GENIE.Platform%3DDesktop&hl=en)
5. [https://www.add-in-express.com/creating-addins-blog/](https://www.add-in-express.com/creating-addins-blog/2014/03/27/extending-google-spreadsheets-apps-script/)
6. [https://developers.google.com/gsuite/add-ons/](https://developers.google.com/gsuite/add-ons/overview)

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
