### Introduction
JavaFX is suitable for desktop application development and other applications. It is a set of graphics and media packages that make it easier to design, create, debug, test, and deploy applications that can run steadily on almost any platform, from Windows to Android to the Mac operating system. Through interaction with the desktop application user interface, data can be saved in a database (MySQL) for processing or any other manipulation. i.e., future retrieval.

In this article, we will learn how JavaFX scene builder can be used to design a desktop application that can connect to the MySQL database. I will demonstrate how to design and create a simple graphical user interface using the JavaFX scene builder. The user will input database connection strings, save the connection strings in an XML file, retrieve them from the file, and connect to the database. In this case, it will not be necessary to change the connection string from the code section but the UI. It makes the deployment of applications that use the MySQL database tool as a storage resource easier.

### Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [JavaFX Overview](#javafx-overview)
4. [JavaFX Scene builder overview](#javafx-scene-builder-overview)
5. [FXML](#fxml)
6. [Overview of the MySQL Java Connection](#overview-of-the-mysql-java-connection)
7. [User Interface Design using JavaFX scene builder](#user-interface-design-using-javafx-scene-builder)
8. [Creating CSS file](#creating-css-file)
9. [Binding CSS file](#binding-css-file)
10. [Final design preview](#final-design-preview)
11. [Design FXML File](#design-fxml-file)
12. [Design Description](#design-description)
13. [Event handler code](#event-handler-code)
14. [Conclusion](#conclusion)

### Prerequisites
1. [JDK](https://www.oracle.com/java/technologies/downloads/) installed
2. [NetBeans](https://netbeans.apache.org/download/index.html) IDE
3. [JavaFX Scene builder](https://www.oracle.com/java/technologies/javafxscenebuilder-1x-archive-downloads.html) 
4. Java coding basics
5. [MySQL](https://www.mysql.com/downloads/) installed

### JavaFX Overview
JavaFX is defined as a set of graphics and media packages that enable designers, developers, and testers to design, create, debug, and deploy client applications on diverse operating system platforms.

Because the JavaFX library is purely written as a Java API, JavaFX applications can reference any API from the Java library. That is, applications done in JavaFX can use any of the Java API libraries to access native system capabilities.

The JavaFX application's look and feel can be customized using a cascading style sheet. Designers can easily change the appearance of the application through the use of CSS. This makes it possible to separate the user interface from the back-end logic of the application. Designers can do UIs in the FXML scripting language and use Java code for the business application logic.

The JavaFX APIs are readily available as a fully integrated JRE and JDK. It does not require separate installation but activation in the IDE to get started developing JavaFX applications.

### JavaFX Scene builder overview
It is a tool that allows designers to design JavaFX applications' user interfaces without hard coding the application's user interface. It allows drag and drop of the user interface components to the working area to modify their properties and apply style sheets to the components. The UI design with the scene builder will automatically create an FXML code file for the design. The JavaFX scene builder is handy since it helps developers and designers separate the UI design from the application's business logic. The JavaFX scene builder can easily be integrated with the Java IDE because it is a stand-alone development tool. You can read more about the JavaFX scene builder [here.](https://docs.oracle.com/javase/8/scene-builder-2/get-started-tutorial/overview.htm#JSBGS164)

### FXML
It is an XML-based language that is designed to help build UI for mainly JavaFX-based applications. It can be used to build an entire JavaFX scene or just part of it. FXML is very important for designers and developers since it helps to separate the application's UI logic from the application's business logic. The JavaFX scene is a hierarchical structure of Java objects and elements. FXML helps to build this graphical representation of the scene. The resultant file is an FXML file, an XML file format representing the JavaFX UI when using the scene builder.

### Overview of the MySQL Java Connection 
MySQL provides a connection to Java applications through the MySQL connector, i.e., a driver implementing the Java database connectivity API. Several framework methods can be applied to connect to the MySQL database. These include Hibernate, spring's JDBC templates, and MyBatis SQL Maps.

The MySQL JDBC interface allows connection to the MySQL Database and performs SQL operations, issues queries, updates data and results from the database queries.

This article will design and develop a UI that will help connect to the MySQL database. To connect to the database, we need to provide a connection string provided in the code. This makes it challenging to deploy the application since it will need to match the database credentials with the ones in the code. The interface will allow entry of these credentials and save them in a file format that the application can otherwise access and use for a connection to avoid the above.

### User Interface Design using JavaFX scene builder
We will create a new application using NetBeans IDE.

Open NetBeans IDE.  From the file menu, choose a new project and select JavaFX. On the projects pane, select JavaFX FXML Application as shown in figure below;

![Figure 1](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure1.PNG)

Click next and give the project name as MySQLConnection, figure below and then click finish.

![Figure 2](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure2.PNG)

MySQLConnection JavaFX application is created inside mysqlconnection subpackage within the main source package as shown in figure below.

![Figure 3](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure3.PNG)

We need to install JavaFX scene builder. Follow how to install scene builder [here](https://docs.oracle.com/javase/8/scene-builder-2/installation-guide/jfxsb-installation_2_0.htm). Once the scene builder is installed, right-click on the FXML file in the project from the IDE and click open. The file opens with scene builder as shown in figure below;

![Figure 4](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure4.PNG)

The left side of the scene builder has the components library, which can be dragged and dropped into the scene in the middle of the window. The right side shows the properties of the component library, which has been selected from the scene. The document pane of the scene builder shows components hierarchy and control. The hierarchy shows the layout of the components in the order in which they were added to the scene, whereas the controller pane shows the control class, which contains the business logic codes for performing actions and events. 

In our article, our result UI should be as shown in figure below. In our case, we will need to use some CSS code to achieve the interface. 

![Figure 5](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure5.PNG)

We drag and drop our scene components from the control panel on the left side, before adding CSS file to our design, it appears like in figure below;

![Figure 6](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure6.PNG)

### Creating CSS file
Right-click on our main application in the NetBeans IDE, choose other, and on the projects pane, select cascading style sheet as shown in figure below and name it mainCascadeStyleSheet, then click finish.

![Figure 7](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure7.PNG)

The following is our CSS code

```css
.background {
    -fx-background-color: #ffffff;
}

.label{
    -fx-margin-bottom: 0;
    -fx-font-size: inherit;
    -fx-line-height: 1.5;
    -fx-font-size: 11pt;
    -fx-font-family: "Segoe UI Semibold";
    -fx-text-fill: black;
    -fx-opacity: 1;
}
.label-bright {
    -fx-font-size: 11pt;
    -fx-font-family: "Segoe UI Semibold";
    -fx-text-fill: blueviolet;
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
     
    -fx-outline: 1pt;
    -fx-outline: 5pt;
    -fx-margin: 0;
    -fx-font-family: inherit;
    -fx-font-size: inherit;
    -fx-line-height: inherit;
}

.button:hover {
    /*-fx-background-color: #3a3a3a;*/
    -fx-background-color: #9fcdff;
}

.button:pressed, .button:default:hover:pressed {
  -fx-background-color: white;
  -fx-text-fill: #1d1d1d;
}

.button:focused {
    -fx-outline: 1px;
    -fx-outline: 5px;
}

.button:disabled, .button:default:disabled {
    -fx-opacity: 0.4;
    -fx-background-color: #1d1d1d;
    -fx-text-fill: white;
}

.button:default {
    -fx-background-color: -fx-focus-color;
    -fx-text-fill: #ffffff;
}

.button:default:hover {
    -fx-background-color: derive(-fx-focus-color,30%);
}
```
### Binding CSS file
To add the CSS file to our scene design, go to the scene builder, select the main ArchorPane which forms our main scene from the hierarchy, on the inspector side on the right side of the scene builder, which contains the properties, layout, and code, select on the drop-down properties section and scroll down to Stylesheets and chose our CSS file which we created before, as below:

![Figure 8](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure8.PNG)

### Final design preview
In the scene builder menu, click on Preview and select show preview. Our design looks like the figure below;

![Figure 9](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure9.PNG)

### Design FXML File
Scene builder automatically generates an FXML file for the UI design. Below is the FXML file code generated for the design.

### Design Description
The main fields for our design include the following;

#### Text fields
1. **Database name text field-** this allows users to give the name of the database with which the application should communicate. The database name should be provided in this field as it is written in the database application.
2. **Username text field**- allows the users to provide the database username which connects to the databases. If the database admin was to connect and log into the database, what name could he use to log in. this is the name provided for the user name.
3. **Password**- this is the database password for the user-provided. It will allow the application to be authenticated and authorized to access the given database.
4. **Server**- this is the main location where the database storage is hosted. It could be a local host or remote server.

#### Buttons
1. **Save**- the button fires an event on click to store the text fields' information provided in a file format. The code behind getting this information creates an XML file and saves this file in the root lib folder.
2. **Get connection string**- action event for this button reads the files saved, accesses the connection information in the file, gets this information, and displays them in their respective text fields. Users can check, verify and make changes before saving again. If the file had no connection string values, the empty string would be returned, and the text field will therefore be empty.
3. **Test the connection**-action event for this button to communicate with the database to check if the connection strings provided are correct and if the application can communicate with the database.

### Event handler code
#### Creating connection string code XML File

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

        TransformerFactory factory = TransformerFactory.newInstance();
        Transformer transformer = factory.newTransformer();
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");

        StringWriter sw = new StringWriter();
        StreamResult result = new StreamResult(sw);
        DOMSource source = new DOMSource(doc);
        transformer.transform(source, result);
        String xmlString = sw.toString();

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

            dbFactory = DocumentBuilderFactory.newInstance();
            dBuilder = dbFactory.newDocumentBuilder();
            doc = dBuilder.parse(file);
            doc.getDocumentElement().normalize();
            NodeList nList = doc.getElementsByTagName("dbConnectionFile");
            
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

#### Connecting to database code

```java
   public void dbConnectionMethod() {

        readDbConnectionFile();//Calls the method which reads the file and set the values to the components

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
### Final GUI Application

![Figure 10](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/figure10.PNG)

On click of save button, the method to create XML file and saves it to the folder is called.

![Figure 11](/engineering-education/mysql-connection-graphical-user-interface-design-using-javafx-and-scene-builder/test.PNG)

On click, the application reads the XML files, gets the connection strings and try to connect with MySQL database, if the connection is successful it displays connected to the database as indicated in the screenshot above.

### Conclusion
JavaFX is a set of graphics and media packages that enable designers, developers, and testers to design, create, debug, and deploy client applications on diverse operating system platforms. Through interaction with the desktop application user interface, data can be saved in a database (MySQL) for processing or any other manipulation. In this article, we have learned how JavaFX scene builder can design a desktop application that can connect to the database.
The code snippets used in this guide can be accessed at my [GitHub Repo](https://github.com/JosephAyoma/JavaFX-scenebuilder-for-mysql-connection).