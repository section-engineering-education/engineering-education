---
layout: engineering-education
status: publish
published: true
url: /mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/
title: MySQL Connection GUI Design using JavaFX and Scene Builder
description: In this article we will study how JavaFX scene builder can be used to design and develop an application that can connect to a MySQL database. We will look at how to design and create a simple GUI using the JavaFX scene builder.
author: ayoma-joseph
date: 2021-11-18T00:00:00-17:55
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/hero.png
    alt: MySQL Connection Graphical User Interface design Using JavaFX and Scene builder Hero Image
---
JavaFX is suitable for desktop application development and other applications. It is a set of graphics and media packages that make it easier to design, create, debug, test, and deploy applications. 
<!--more-->
These applications can run steadily on almost any platform, from Windows to Android to the Mac operating system. Through interaction with the desktop application UI, data can be saved in a (MySQL) database for processing or any other manipulation. 

In this article, we will study how the JavaFX scene builder can be used to design and develop an application that can connect to the MySQL database. We will look at how to design and create a simple GUI using the JavaFX scene builder. 

The user will input database connection strings, save the connection strings in an XML file, and retrieve them from the file. Afterwards, connect to the database. 

In this case, it will not be necessary to change the connection string from the code section but the UI. This makes the deployment of applications that use the MySQL database tool as a storage resource easier.

### Table of contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [JavaFX Overview](#javafx-overview)
4. [Introduction to the JavaFX Scene Builder](#introduction-to-the-javafx-scene-builder)
5. [FXML](#fxml)
6. [Overview of the MySQL Java Connection](#overview-of-the-mysql-java-connection)
7. [User Interface Design using JavaFX Scene Builder](#user-interface-design-using-javafx-scene-builder)
8. [Creating CSS file](#creating-css-file)
9. [Binding CSS file](#binding-css-file)
10. [Final design preview](#final-design-preview)
11. [Design FXML File](#design-fxml-file)
12. [Design Description](#design-description)
13. [Event handler code](#event-handler-code)
14. [Conclusion](#conclusion)

### Prerequisites
In order to follow along the reader will need the following:
- Have [JDK](https://www.oracle.com/java/technologies/downloads/) installed.
- [NetBeans](https://netbeans.apache.org/download/index.html) IDE.
- [JavaFX Scene builder](https://www.oracle.com/java/technologies/javafxscenebuilder-1x-archive-downloads.html).
- Java coding basics.
- Have [MySQL](https://www.mysql.com/downloads/) installed.

### JavaFX overview
JavaFX is defined as a set of graphics and media packages that enable designers, developers, and testers to design, create, debug, and deploy client applications on diverse operating system platforms.

Because the JavaFX library is purely written as a Java API, JavaFX applications can reference any API from the Java library. That is, any application done in JavaFX can use any of the Java API libraries to access and communicate with native system capabilities.

The JavaFX application's appearance and behavior can be customized using a cascading style sheet (CSS). Designers can change the look and feel of the application through the use of CSS. 

This makes it possible to separate the UI design from the back-end logic of the application. Designers can design user interfaces in the FXML language and use Java code for the main actions and events in the business application logic.

The JavaFX APIs are readily available as fully integrated JRE and JDK. They do not need separate installation, but will need activation in the IDE to get started with developing JavaFX applications.

### Introduction to the JavaFX Scene Builder
Scene builder is a designers’ application tool that allows designers to plan, prototype, and design JavaFX applications' UIs. This is done without hard coding the application's user interface. It allows drag and drop of the user interface components to the working area to change their properties. And, apply style sheets to the components.

When the designer drags and drops the components to the working area, the scene builder will create a separate FXML code for the design. This helps the designers and developers separate the designing of the user interface from the system business logic of the application’s actions and events. 

The JavaFX scene builder can be easily integrated with the Java IDE because it is a stand-alone development tool. You can read more about the JavaFX scene builder [here](https://docs.oracle.com/javase/8/scene-builder-2/get-started-tutorial/overview.htm#JSBGS164).

### FXML
FXML as the name suggests it is an XML-based scripting language. It is designed to help build applications’ user interfaces for JavaFX-based applications. It can be used to build an entire JavaFX scene or just part of it. 

An FXML file is created automatically in scene builder when the components are dragged and dropped in the working area. This makes FXML essential for designers since it eliminates the hard coding of the design. 

It also helps separate the UI design from the main action and event coding of the application. This makes the entire process easier. 

FXML helps to build a JavaFX graphical representation of the UI which is called scene. The resultant file is an FXML file. An XML file format representing the JavaFX UI when using the scene builder.

### Overview of the MySQL Java connection 
MySQL provides a connection to Java applications through the MySQL connector. For example, a driver implementing the Java database connectivity API. Several framework methods can be applied to connect to the MySQL database. These include Hibernate, spring's JDBC templates, and MyBatis SQL Maps.

The MySQL JDBC interface allows connection to the MySQL Database. It performs SQL operations, issues queries, updates data, and results from the database queries.

This article will design and develop a UI that will help connect to the MySQL database. We need to provide a connection string provided in the code. This makes it challenging to deploy the application since it will need to match the database credentials with the ones in the code. 

The interface will allow entry of these credentials and save them in a file format that the application can otherwise access. Which can used for a connection to avoid the above.

### User interface design using JavaFX Scene Builder
We will create a new application using NetBeans IDE. 

Open NetBeans IDE.  

From the file menu, choose a new project and select JavaFX. 

On the projects pane, select JavaFX FXML application as shown in the figure below:

![Figure 1](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure1.png)

Click next and give the project name as MySQLConnection, as shown in the figure below and then click finish.

![Figure 2](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure2.png)

The MySQLConnection JavaFX application is created inside the mysqlconnection subpackage within the main source package as shown in the figure below:

![Figure 3](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure3.png)

We need to install the JavaFX scene builder. Follow how to install scene builder [here](https://docs.oracle.com/javase/8/scene-builder-2/installation-guide/jfxsb-installation_2_0.htm). 

Once the scene builder is installed, right-click on the FXML file in the project from the IDE and click open. 

The file opens with a scene builder as shown in the figure below:

![Figure 4](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure4.png)

The left side of the scene builder has the components library which can be dragged and dropped into the scene in the middle of the window. The right side shows the properties of the component library which have been selected from the scene. 

The document pane of the scene builder shows components hierarchy and control. The hierarchy shows the layout of the components in the order in which they were added to the scene. Whereas, the controller pane shows the control class. This class contains the business logic codes for performing actions and events.

Our result UI should be as shown in the figure below. In our case, we will need to use some CSS code to achieve the interface. 

![Figure 5](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure5.png)

We drag and drop our scene components from the control panel on the left side, before adding a CSS file to our design. 

It should appears as shown in the figure below:

![Figure 6](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure6.png)

### Creating CSS file
Right-click on our main application in the NetBeans IDE, choose other, and on the projects pane, select cascading style sheet as shown in the figure below. Name it `mainCascadeStyleSheet`, then click finish.

![Figure 7](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure7.png)

The following is our CSS code:

```css
 .background {
    -fx-background-color: #ffffff;
}

.label{
    -fx-margin-bottom: 2pt;
    -fx-font-size: inherit;
    -fx-line-height: 1.5pt;
    -fx-font-size: 12pt;
    -fx-font-family: "Segoe UI Black";
    -fx-text-fill: black;
    -fx-opacity: 1;
}
.label-bright {
    -fx-font-size: 12pt;
    -fx-font-family: "Segoe UI Black";
    -fx-text-fill: #9999ff;
    -fx-opacity: 1;
}
 .textfield {
    -fx-font-size: 12pt;
    -fx-padding:inherit;
    -fx-font-family: "Segoe UI Semibold";
}

.password-field {
    -fx-font-size: 12pt;
    -fx-padding:inherit;
    -fx-font-family: "Segoe UI Semibold";
}
 .button {
     
    -fx-outline: 1.5pt;
    -fx-outline: 6pt;
    -fx-margin: 1pt;
    -fx-font-family: inherit;
    -fx-font-size: inherit;
    -fx-line-height: inherit;
}

.button:hover {

    -fx-background-color: #9fcdff;
}

.button:pressed, .button:default:hover:pressed {
  -fx-background-color: white;
  -fx-text-fill: #9fcdff;
}

.button:focused {
    -fx-outline: 1px;
    -fx-outline: 5px;
}

.button:disabled, .button:default:disabled {
    -fx-opacity: 0.5;
    -fx-background-color: #9fcdff;
    -fx-text-fill: #ffffff;
}

.button:default {
    -fx-background-color: -fx-focus-color;
    -fx-text-fill: #ffffff;
}
.button:default:hover {
    -fx-background-color: derive(-fx-focus-color,32%);
}
```

### Binding CSS file
To add the CSS file to our scene design, go to the scene builder, select the main ArchorPane which forms our main scene from the hierarchy. On the inspector side on the right side of the scene builder, which contains the properties, layout, and code, select the drop-down properties section and scroll down to Stylesheets. 

Choose the CSS file which we created before, as shown below:

![Figure 8](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure8.png)

### Final design preview
In the scene builder menu, click on `preview` and select `show preview`. 

Our design should look like the figure below:

![Figure 9](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure9.png)

### Design FXML file
The Scene Builder automatically generates an FXML file for the UI design. Below is the FXML file code generated for the design.

```xml

<?xml version="1.0" encoding="UTF-8"?>

<?import javafx.scene.paint.*?>
<?import javafx.scene.effect.*?>
<?import javafx.scene.text.*?>
<?import java.lang.*?>
<?import java.util.*?>
<?import javafx.scene.*?>
<?import javafx.scene.control.*?>
<?import javafx.scene.layout.*?>

<AnchorPane id="AnchorPane" fx:id="main" focusTraversable="true" prefHeight="308.0" prefWidth="506.0" stylesheets="@mainCascadeStyleSheet.css" xmlns="http://javafx.com/javafx/8" xmlns:fx="http://javafx.com/fxml/1" fx:controller="mysqlconnection.FXMLDocumentController">
    <children>
        <Label fx:id="label" alignment="CENTER" layoutY="40.0" minHeight="16" minWidth="69" prefHeight="37.0" prefWidth="524.0" styleClass="label-bright" />
      <Button id="submit" fx:id="submit" layoutX="129.0" layoutY="248.0" mnemonicParsing="false" onAction="#handleButtonAction" text="Save" />
      <Label alignment="CENTER_RIGHT" layoutY="93.0" prefHeight="44.0" prefWidth="127.0" text="Database name" />
      <Label alignment="CENTER_RIGHT" layoutX="4.0" layoutY="130.0" prefHeight="37.0" prefWidth="120.0" text="Username" />
      <Label alignment="CENTER_RIGHT" layoutY="165.0" prefHeight="44.0" prefWidth="120.0" text="Password" />
      <Label alignment="CENTER_RIGHT" layoutX="1.0" layoutY="205.0" prefHeight="37.0" prefWidth="120.0" text="Server" />
      <PasswordField fx:id="txtdbPassword" alignment="CENTER" layoutX="129.0" layoutY="167.0" prefHeight="44.0" prefWidth="380.0" />
      <TextField fx:id="txtdbName" alignment="CENTER" layoutX="129.0" layoutY="94.0" prefHeight="37.0" prefWidth="380.0" />
      <TextField fx:id="txtdbUserName" alignment="CENTER" layoutX="129.0" layoutY="130.0" prefHeight="37.0" prefWidth="380.0" />
      <TextField fx:id="txtdbServer" alignment="CENTER" layoutX="129.0" layoutY="211.0" prefHeight="37.0" prefWidth="380.0" />
      <Button fx:id="bntConString" layoutX="187.0" layoutY="248.0" mnemonicParsing="false" onAction="#getString" text="Get Connection String" />
      <Button fx:id="bntTest" layoutX="370.0" layoutY="248.0" mnemonicParsing="false" onAction="#testConnectionAction" text="Test Connection" />
      <Label alignment="CENTER" contentDisplay="CENTER" layoutX="-1.0" layoutY="6.0" prefHeight="21.0" prefWidth="524.0" text="MySQL CONNECTION GRAPHICAL USER INTERFACE" textAlignment="RIGHT" textFill="#cfcee4" wrapText="true">
         <font>
            <Font size="14.0" />
         </font>
      </Label>
    </children>
   <effect>
      <DisplacementMap>
         <mapData>
            <FloatMap />
         </mapData>
      </DisplacementMap>
   </effect>
   <styleClass>
      <String fx:value="background" />
      <String fx:value="label-bright" />
      <String fx:value="password-field" />
      <String fx:value="textfield" />
   </styleClass>
</AnchorPane>

```

### Design description
The main fields for our design include the following:

#### Text fields
1. **Database name text field** - This allows users to give the name of the database with which the application should communicate. The database name should be provided in this field as it is written in the database application.
2. **Username text field** - This allows users to provide the database username which connects to the databases. The database username for login is given in this field to allow our application to sign into the database.
3. **Password** - This is the database password provided for the user to access the given database. It will allow the application to be authenticated and authorized.
4. **Server** - This is the main location where the database storage is hosted. It could be a local host or remote server.

#### Buttons
1. **Save**- The button fires an event on click to store the text fields' information provided in a file format. The code behind getting this information creates an XML file and saves this file in the `root lib` folder.
2. **Get connection string** - The action event for this button reads the files saved. It accesses the connection information in the file, gets this information, and displays them in their respective text fields. Users can check, verify and make changes before saving again. If the file had no connection string values, the empty string would be returned, and the text field will be empty.
3. **Test the connection** - The action event for this button is to communicate with the database to check if the connection strings provided are correct and if the application can communicate with the database.

### Event handler code
#### Creating the connection string code XML file
The code creates an XML file which stores the MySQL connection credentials.

```java
 public void createDbConnectionXmlFile(Document doc, String user, String database, String password, String serverName) throws Exception {
        Element root = doc.createElement("dbConnectionFile");
        doc.appendChild(root);
        Element dbuser = doc.createElement("user");
        root.appendChild(dbuser);
        Text text1 = doc.createTextNode(user);
        dbuser.appendChild(text1);

        Element dbName = doc.createElement("database");
        root.appendChild(dbName);
        Text text2 = doc.createTextNode(database);
        dbName.appendChild(text2);

        Element dbPassword = doc.createElement("password");
        root.appendChild(dbPassword);
        Text text3 = doc.createTextNode(password);
        dbPassword.appendChild(text3);

        Element dbServer = doc.createElement("server");
        root.appendChild(dbServer);
        Text text4 = doc.createTextNode(serverName);
        dbServer.appendChild(text4);
         //Creating transformer object to perform our document file transformation
        TransformerFactory Tfactory = TransformerFactory.newInstance();
        Transformer Tformer = Tfactory.newTransformer();
        Tformer.setOutputProperty(OutputKeys.INDENT, "yes");
        //Contructing string outputs to the file
        StringWriter StringW = new StringWriter();
        StreamResult result = new StreamResult(StringW);
        
        DOMSource Dsource = new DOMSource(doc);
        Tformer.transform(Dsource, result);
        String xmlString = StringW.toString();

        try (
                BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file, true)))) {
            bw.write(xmlString);
            bw.flush();
        }
    }

```

#### Reading from the XML code

```java
public void readDbConnectionFile() {
        try {

            dbuilder_Factory = DocumentBuilderFactory.newInstance();
            document_Builder = dbuilder_Factory.newDocumentBuilder();
            document = document_Builder.parse(file);
            document.getDocumentElement().normalize();
            NodeList nList = document.getElementsByTagName("dbConnectionFile");
            
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {

                    Element eElement = (Element) nNode;
                    //Using the setters to set the values of the components read from the connection file
                    txtdbUserName.setText(eElement.getElementsByTagName("user").item(0).getTextContent());
                    txtdbName.setText(eElement.getElementsByTagName("database").item(0).getTextContent());
                    txtdbPassword.setText(eElement.getElementsByTagName("password").item(0).getTextContent());
                    txtdbServer.setText(eElement.getElementsByTagName("server").item(0).getTextContent());
                }
            }
        } catch (ParserConfigurationException | SAXException | IOException | DOMException e) {

        }
    }

```

#### Connecting to the database code

```java
   public void dbConnectionMethod() {

        readDbConnectionFile(); //Calls the method which reads the file and sets the values to the components

        //Using the components getter methods to get the values and assign the connection required strings
        pass = txtdbPassword.getText();
        url = "jdbc:mysql://" + txtdbServer.getText() + ":3306/" + txtdbName.getText();
        user = txtdbUserName.getText();
        pass = txtdbPassword.getText();

        try { //sets the connection to the database
            conect = DriverManager.getConnection(url, user, pass);
            state = conect.createStatement();
            label.setText("CONNECTED TO THE DATABASE");
            
        } catch (SQLException e) {
            label.setText("NOT CONNECTED TO THE DATABASE" + " " + e);
             
        }

    }

```
### Final GUI application

![Figure 10](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure10.png)

With on click of the save button, the method to create an XML file and save to the folder is called.

![Figure 11](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/test.png)

On click, the application reads the XML files, gets the connection strings, and tries to connect with the MySQL database. If the connection is successful it displays "connected" to the database as indicated in the screenshot above.

### Conclusion
In this article we learned how JavaFX scene builder can design a desktop application that can connect to the database. Through interaction with the desktop application user interface, data can be saved in the database (MySQL) for processing or any other manipulation. 

We also learned how JavaFX scene builder automates FXML code for the UI making the design very simple. We were able to learn how MySQL connection strings can be input from a user interface, saved in an XML file format, and later called any time we need our application to communicate to the database. 

The code parts used in this article can be found in my [GitHub Repo](https://github.com/JosephAyoma/JavaFX-scenebuilder-for-mysql-connection).

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)