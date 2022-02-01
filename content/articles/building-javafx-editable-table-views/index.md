---
layout: engineering-education
status: publish
published: true
url: /building-javafx-editable-table-views/
title: Building JavaFX Editable Table Views
description: In this article we will go through how to setup and create TableView in JavaFX. We will also learn how to make these views editable.
author: prosper-grateful-juma
date: 2021-11-18T00:00:00-13:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-javafx-editable-table-views/hero.png
    alt: Building JavaFX Editable Table Views Hero Image
---
Tables are significant for data entry and displays in applications. Table views support the tabular format display. This kind of format makes it easier to correct and check data patterns.
<!--more-->
Since this kind of data display format was created in sheet applications like Microsoft Excel, developers have preferred it in [Transaction processing systems (TPS)](https://en.wikipedia.org/wiki/Transaction_processing_system) and [Management information systems (MIS)](https://en.wikipedia.org/wiki/Management_information_system).

With focus on the user interface, JavaFX represents data in a tabular format. However, one can only view, but not edit each cell individually.

This article will provide solutions when addressing this issue. By the end of this article, the reader will learn to create an editable table view that enables easier data updates directly on the table.

### Table of contents
- [Key takeaways](#key-takeaways)
- [Prerequisites](#prerequisites)
- [Article structure](#article-structure)
- [Project initialization](#project-initialization)
  - [Initial Project Structure](#initial-project-structure)
  - [New Project Structure](#new-project-structure)
- [Set up the project, tools, and development environment](#set-up-the-project-tools-and-development-environment)
- [Table creation and design](#table-creation-and-design)
- [Add data items on the TableView](#add-data-items-on-the-tableview)
  - [Define Users model](#define-users-model)
  - [Setup the controller](#setup-the-controller)
- [Make the Table cells editable](#make-the-table-cells-editable)
- [Conclusion](#conclusion)
- [References](#references)

### Key takeaways
By the end of the article, the reader will be able to do the following:
- Create a [TableView](https://docs.oracle.com/javafx/2/api/javafx/scene/control/TableView.html).
- Format the table.
- Add data items on the `TableView`.
- Make the `TableView` editable through the use of its controller.
- Get the edited items.

### Prerequisites
This article is an intermediate-level article on JavaFX.

If you're new to JavaFX, start with a simple hands-on project by going through this [article](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/).

To easily follow up with the article's content, here are the needed skills and tools:
- A good Java IDE. The recommendation will be to use the latest IntelliJ version.
- A good internet connection.
- Java SDK installed on the machine. We will be using JDK 17.

> **NOTE**: The system requirements and specifications may change over time. Make sure to be watching out for new ones and how to implement them in the project.

### Article structure
In the article, the following steps will be followed to accomplish the points noted in the [key takeaways](#key-takeaways) section:
- Project initialization.
- Table creation and design.
- Adding dummy data to the table.
- Make the Table data editable.
- Fetch the contents edited.

Let us begin with the first step:

### Project initialization
To set up a new JavaFX project, do the following:
- Open the IDE and click on the '**New Project**' button.
- Select JavaFX as the framework.
- Set the following in the window:
  - **Name**: editable-tableview
  - **Group**: com.table
  - **Artifact**: editabletableview

![New JavaFX editable tableview project](/engineering-education/building-javafx-editable-table-views/new-javafx-editable-tableview-project.png)

- Click '**Next**'.
- In the **Dependencies** section, set the dependencies as shown below and click on the '**Finish**' button:

![Project dependencies](/engineering-education/building-javafx-editable-table-views/new-javafx-editable-tableview-project-dependencies.png)

#### Initial project structure
The application generated has the following structure:

```shell
.
├── src
│   ├── main
│       ├── java
│          ├── com.table.editabletableview
│                 ├── HelloApplication.java
│                 └── HelloController.java
│          └── module-info.java
│       └── resources
│          └── com.table.editabletableview
│             └── hello-view.fxml
├── editable-tableview.iml
└── pom.xml
```

#### New project structure
- Create a new folder in the `java/com/table/editabletableview` path and name it `model`. It will hold the dummy data.
- Create another folder named `controller` in the same path.
- Change the location of the `HelloController.java` file to the new `controller` folder created. This step can be done by right-clicking the file and pasting it to the new location.
- In the `model` folder, create a new file named `User.java`.

The resulting folder structure looks as follows:

```shell
.
├── src
│   ├── main
│       ├── java
│          ├── com. table.editabletableview
│               ├── controller
│                   └── HelloController.java
│               └── model
│                   └── User.java
│               └── HelloApplication.java
│          └── module-info.java
│       └── resources
│          └── com. table.editabletableview
│             └── hello-view.fxml
├── editable-tableview.iml
└── pom.xml
```

### Set up the project, tools, and development environment
To achieve this, do the following:
- Open the FXML file found in the `resources/com/table/editabletableview` path.
- The IDE will produce a prompt notification at the top of the file to install `JavaFX SDK`. Just allow it, and the IDE will automatically set it up and configure it for the project.
- On the bottom left area near the status bar, click on the `SceneBuilder` option to view and develop the application using the [SceneBuilder](https://www.oracle.com/java/technologies/javase/javafxscenebuilder-info.html).
- If this is the first time creating a JavaFX project using the IDE on the machine, it will give a prompt notification to install the SceneBuilder. Just click on the 'Install' option, and the IDE will download it and set it up.
- Restart the IDE, if it does not automatically load to the SceneBuilder view.

### Table creation and design
- In the SceneBuilder view, delete the `VBox` holding the `Hello` button by simply right-clicking on it and selecting the Delete option.

The code shown below will be deleted. 

This step can be viewed in the `Text` view here:

```xml
<VBox alignment="CENTER" spacing="20.0" xmlns:fx="http://javafx.com/fxml"
      fx:controller="com.table.editabletableview.HelloController">
  <padding>
    <Insets bottom="20.0" left="20.0" right="20.0" top="20.0"/>
  </padding>

  <Label fx:id="welcomeText"/>
  <Button text="Hello!" onAction="#onHelloButtonClick"/>
</VBox>
```

- Open the *Controller* and delete the following code:

```java
@FXML
private Label welcomeText;

@FXML
protected void onHelloButtonClick(){
        welcomeText.setText("Welcome to JavaFX Application!");
}
```

- In the `HelloApplication.java` file, change the width and height of the `Scene` created to `800` by `600`, as shown in the
line of code below:

```java
Scene scene=new Scene(fxmlLoader.load(),800,600);
```

On doing that, it removes the default example code generated during project initialization. 

Now, proceed to the next steps as follows:
- Open the FXML file and drag-and-drop a `BorderPane` from the left-side panel, under the **Containers** section into the
center of the design page.
- On the layout section under the right-side panel, set the following for the `BorderPane` so that it can fit with the Scene created:
  - `Pref Width`: 800
  - `Pref Height`: 600
- Drag-and-drop a `TableView` control from the left-side panel into the 'center' section of the BorderPane. 

The results should look as follows:

![New TableView](/engineering-education/building-javafx-editable-table-views/new-tableview.png)

- Double-click on the `C1` header and change it to `id`. Do the same for the `C2` header and edit it as `name`.
- To add other columns, head over to the `Controls` section and select the `TableColumn` option. Then, drag-and-drop it next to the other columns and size it appropriately. Its name will be `email`.
- Add other two columns to the `TableView` named `notes` and `edit`, respectively. Adjust the sizes appropriately so that the columns fit the TableView.

The `SceneBuilder` will generate the following code:

```xml
<!--The application's controller is well pointed out-->
<BorderPane maxHeight="-Infinity" maxWidth="-Infinity" minHeight="-Infinity" minWidth="-Infinity" prefHeight="600.0"
            prefWidth="800.0" xmlns="http://javafx.com/javafx/11.0.2" xmlns:fx="http://javafx.com/fxml/1"
            fx:controller="com.table.editabletableview.controller.HelloController">
  <center>
    <TableView fx:id="table_info" prefHeight="600.0" prefWidth="800.0" BorderPane.alignment="CENTER">
      <columns>
        <TableColumn fx:id="col_id" prefWidth="75.0" text="id"/>
        <TableColumn fx:id="col_name" prefWidth="132.0" text="name"/>
        <TableColumn fx:id="col_email" prefWidth="167.0" text="email"/>
        <TableColumn fx:id="col_notes" prefWidth="249.0" text="notes"/>
        <TableColumn fx:id="col_update" prefWidth="176.0" text="edit"/>
      </columns>
    </TableView>
  </center>
</BorderPane>
```

> Notice that, the controller location is well shown out in the application.

The results are as follows:

![Created a table layout](/engineering-education/building-javafx-editable-table-views/created-a-table-layout.png)

### Add data items on the TableView
#### Define Users model
In the '**User.java**' file, do the following:

- Add the strings and button to be used for the app:

```java
/*Add the strings and buttons to be used in the application*/
String id,name,email,notes;
Button update;
```

- Generate their constructor. 

It should looks as shown below:

```java
/* Constructors */
public User(String id,String name,String email,String notes,Button update){
    this.id=id;
    this.name=name;
    this.email=email;
    this.notes=notes;
    this.update=update;
}
```

- Inside the constructor, create a function that makes the '**update**' button. The button will display the results of the row when clicked. This button allows one to see the results, hence, determining if the results are as expected.

On **update** button click:

- Get id by calling on `getId()`
- Get name by calling on `getName()`
- Get email by calling on `getEmail()`
- Get notes by calling on `getNotes()`

```java
update.setOnAction(e->{
    /* Print the values of the row selected */
    ObservableList<User> users=HelloController.table_info_app.getSelectionModel().getSelectedItems();

    /* It outputs the value in the terminal */
    for(User user:users){
        if(user.getUpdate()==update){
            System.out.println("id: "+user.getId());
            System.out.println("name: "+user.getName());
            System.out.println("email: "+user.getEmail());
            System.out.println("notes: "+user.getNotes());
    }}
});
```

- Set getters and setters outside the constructor as shown below:

```java
/* Getters and setters */
public String getId(){
  return id;
}
public void setId(String id){
  this.id=id;
}
public String getName(){
  return name;
}
public void setName(String name){
  this.name=name;
}
public String getEmail(){
  return email;
}
public void setEmail(String email){
  this.email=email;
}
public String getNotes(){
  return notes;
}
public void setNotes(String notes){
  this.notes=notes;
}
public Button getUpdate(){
  return update;  
}
```

This code sets up getters and setters for:
- Id
- Name
- Email
- Notes
- Update button

#### Setup the controller
For the '**HelloController.java**' file, do the following:

- Make the class implement '**Initializable**'. 

This class is shown below:

```java
public class HelloController implements Initializable {
  /* Line of code */
}
```

> **Initializable**, is a JavaFX interface that enables use of the **initialize** method.

This method helps resolve root element relative paths.

- Import the controls that will be used in the application. 

It is shown in the code below:

```java
public static TableView<User> table_info_app;
public static ObservableList<User> data_table;
@FXML
private TableView<User> table_info;
@FXML
private TableColumn<User, String> column_id,column_name,column_email,column_notes;
@FXML
private TableColumn<User, Button> col_update;
```

The code above imports:
- TableView: table_info
- Table Columns: column_id,column_name,column_email,column_notes
- Button: col_update

- Under the imported controls, use the code below to initialize a controller after the controller's root element has been processed completely.
- It executes two functions that will be defined later on. These are the `initializeCols()` and the `loadData()` functions.

```java
@Override
public void initialize(URL url,ResourceBundle resourceBundle){
    table_info_app=table_info;

    initializeCols();
    loadData();
}
```

> **NOTE**: The `location` parameter is used to resolve the relative paths for the root objects if it is known, while the `resources` does localization for the root object.

- To elaborate more on the functions of the `initializeCols()` function. It will be pointing out that the values entered for specific row cells are of a particular set of datatype as defined in the 'User' model. For example, all values in the *column_id* section are for all IDs.

```java
private void initializeCols(){
  // User.java ==>> id, name, email, notes;
  column_id.setCellValueFactory(new PropertyValueFactory<>("id"));
  column_name.setCellValueFactory(new PropertyValueFactory<>("name"));
  column_email.setCellValueFactory(new PropertyValueFactory<>("email"));
  column_notes.setCellValueFactory(new PropertyValueFactory<>("notes"));
  col_update.setCellValueFactory(new PropertyValueFactory<>("update"));
}
```

As previously stated, each column in the table is associated with a datatype:
- `column_id` to carry IDs(id)
- `column_name` for names(name)
- `column_email` for email
- `column_notes` for notes
- `column_update` for update button(button)

- Create another function named `loadData()` that creates dummy data for the application through iteration. Copy-paste the following code into the file.

```java
private void loadData(){
    data_table=FXCollections.observableArrayList();

    for(int x=1;x< 12;x++){

    /* Generates the data items in the table */
    data_table.add(new User(String.valueOf(x),"name "+x,"email "+x,"notes "+x,new Button("update")));
    }

    table_info.setItems(data_table);
}
```

This code above produces the outcome as records are stored in the system.

- Run the application through the 'Main' class. 

The output should look like this:

![Uneditable TableView](/engineering-education/building-javafx-editable-table-views/uneditable-tableview.png)

- Try to double-click on a cell and see if the contents can be modified.

As mentioned earlier, we can only select it, but cannot edit the contents.

### Make the table cells editable
Now, in the Controller, do the following:
- Add a function `editableCols()` to make the cell have a `Text Field` property that allows us to display the message and editing properties.
- It also changes the value of the cell once a commit is done. A commit is done when the value is changed, and the Enter button is pressed.

```java
private void editableCols(){
    column_id.setCellFactory(TextFieldTableCell.forTableColumn());
    column_id.setOnEditCommit(e->e.getTableView().getItems().get(e.getTablePosition().getRow()).setId(e.getNewValue()));

    column_name.setCellFactory(TextFieldTableCell.forTableColumn());
    column_name.setOnEditCommit(e->e.getTableView().getItems().get(e.getTablePosition().getRow()).setName(e.getNewValue()));

    column_email.setCellFactory(TextFieldTableCell.forTableColumn());
    column_email.setOnEditCommit(e->e.getTableView().getItems().get(e.getTablePosition().getRow()).setEmail(e.getNewValue()));

    column_notes.setCellFactory(TextFieldTableCell.forTableColumn());
    column_notes.setOnEditCommit(e->e.getTableView().getItems().get(e.getTablePosition().getRow()).setNotes(e.getNewValue()));

    /* Allow for the values in each cell to be changable */
    table_info.setEditable(true); 
}
```

The above code does the following:
- Makes the `TableView` with all the cells editable.
- Get the specific cell whether, on the IDs, names, email, and notes column when doubled clicked on.

To use the above function, call it inside the `initializeCols()` function, under the `col_update` line using the line below:

```java
/*Call 'editableCols()' function*/
editableCols();
```

- Re-run the application and try again. Notice that, now the updates happen when changes are done, and the Enter key is pressed to commit the changes.

The outputs are sent to the terminal as configured before on the Update button press.

![Final Result](/engineering-education/building-javafx-editable-table-views/final-output.png)

The content updates can be fetched when updating the content in the database.

You can find the full code [here](https://github.com/prograte/JavaFX-editable-table-view).

### Conclusion
The tabular format is a very appealing form of data representation. It is easy to understand and use. It is also effortless to edit and update the content.

JavaFX allows one to view and update the content in a tabular form. It also allows stylings to be applied to the tables created.

By now the reader has learned how to:
- Start a JavaFX project.
- Create table and design them.
- Add dummy data to the table.
- Make the table data editable.
- Fetch the contents edited in the console.
- Manipulate the edited data.

### References
- [Initializable Interface](https://docs.oracle.com/javase/8/javafx/api/javafx/fxml/Initializable.html) JavaFX documentation.
- [PropertyValueFactory](https://docs.oracle.com/javase/8/javafx/api/javafx/scene/control/cell/PropertyValueFactory.html)

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
