Tables are of extreme importance when it comes to data entry and display in applications. Table views support the tabular format display. This kind of format makes it easy to correct and check data patterns.- Ever since the creation of this kind of data display format, and well illustration in Sheet apps e.g. Excel, developers prefer it in TPS and MIS systems.

JavaFX, being focused on UI, has ways to represent data in tabular format. The problem is that one can only view but not edit each cell individually since they aren't editable. This article has solutions to this issue. By the end of the article, the reader will be able to create an editable Table View. That will enable easy data updates directly on the Table being displayed.

### Table of Contents

- [Key takeaways](#key-takeaways)
- [Pre-requisites](#pre-requisites)
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

At the article's tip, the reader will be able to do the following:

- Create a TableView
- Format the Table
- Add data items on the TableView
- Make the TableView editable through the use of its controller
- Get the edited items

### Pre-requisites

This is an intermediate-level Java user article. For one to easily follow up with the article, the following are the
needed skills and tools:

- A good Java IDE. The recommendation is the use of the latest IntelliJ Ultimate version.
- A good internet connection
- Java SDK installed on the machine. JDK 17 was used for the screenshots.

> **NOTE**: The system requirements and specifications may change over time. Make sure to be watching out for new ones and how to implement them in the project.

### Article structure

In the article, the following steps will be followed to accomplish the points noted in
the [Key TakeAways](#key-takeaways) section:

- Project initialization
- Table creation and design
- Adding dummy data to the table
- Make the Table data editable
- Fetch the contents edited

Let's begin with the first step:

### Project initialization

To set up a new JavaFX project, do the following:

- Open the IDE and click on the '**New Project**' button
- Select JavaFX as the Framework
- Set the following in the window:
    - **Name**: editable-tableview
    - **Group**: com.table
    - **Artifact**: editabletableview

This is shown below:

![New JavaFX editable tableview project](new-javafx-editable-tableview-project.png "New JavaFX editable tableview project")

- Click '**Next**'. In the **Dependencies** section, set the dependencies shown below and click on the '**Finish**'
  button:

![Project dependencies](new-javafx-editable-tableview-project-dependencies.png "Project dependencies")

#### Initial Project Structure

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

#### New Project Structure

- Create a new folder in the `java/com/table/editabletableview` path and name it `model`. It will hold the dummy data.
- Create another folder named `controller` in the same path.
- Change the location of the `HelloController.java` file to the new 'controller' folder created. This can be simply done by right-clicking on the file and pasting it to the new location.
- In the 'model' folder, create a new file named `User.java`.

The resulting folder structure looks as follows:

```shell
.
├── src
│   ├── main
│       ├── java
│          ├── com.table.editabletableview
│               ├── controller
│                   └── HelloController.java
│               └── model
│                   └── User.java
│               └── HelloApplication.java
│          └── module-info.java
│       └── resources
│          └── com.table.editabletableview
│             └── hello-view.fxml
├── editable-tableview.iml
└── pom.xml
```

### Set up the project, tools, and development environment

To achieve this, do the following:

- Open the FXML file found in the `resources/com/table/editabletableview` path.
- The IDE will produce a prompt notification at the top of the file to install JavaFX SDK. Just allow it and the IDE
  will automatically set it up and configure it for the project.
- On the bottom left area near the status bar click on the 'SceneBuilder' option to view and develop the application using the SceneBuilder.
- If it is the first time to create a JavaFX project using the IDE on the machine, it will give prompt notification to install the SceneBuilder. Just click on the 'Install' option and the IDE will download it and set it up.
- Restart the IDE if it does not automatically load to the SceneBuilder view.

### Table creation and design

- In the SceneBuilder view, delete the 'VBox' holding the 'Hello' button by simply right-clicking on it and selecting the Delete option. The code below will be deleted. This can be viewed in the 'Text' view.

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

- Open the _Controller_ and delete the following code:

```java
@FXML
private Label welcomeText;

@FXML
protected void onHelloButtonClick(){
        welcomeText.setText("Welcome to JavaFX Application!");
        }
```

- In the `HelloApplication.java` file, change the width and height of the Scene created to 800 by 600 as shown in the
  line of code below:

```java
Scene scene=new Scene(fxmlLoader.load(),800,600);
```

Once done, that removes the default example code generated during project initialization. Now proceed to the next steps
as follows:

- Open the FXML file and drag-and-drop a BorderPane from the left-side panel, under the **Containers** section into the
  center of the design page.
- On the Layout section under the right-side panel set the following for the BorderPane so that it can fit with the
  Scene created:
    - `Pref Width`: 800
    - `Pref Height`: 600

- Drag-and-drop a TableView control from the left-side panel into the 'center' section of the BorderPane. The results
  look as follows:

![New TableView](new-tableview.png "New TableView")

- Double-click on the `C1` header and change it to `id`. do the same for the `C2` header and make it read `name`.
- To add other columns, head over to the 'Controls' section and select the 'TableColumn' option. Drag-and-drop it next to the other columns and size it appropriately. Its name will be `email`.
- Add other two columns to the TableView named `notes` and `edit` respectively. Adjust the sizes appropriately so that the columns fit the TableView.

The SceneBuilder will generate the following code:

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

> Notice that the controller location is well shown out in the application.

The results are as follows:

![Created a table layout](created-a-table-layout.png "Created a table layout")

### Add data items on the TableView

#### Define Users model

In the '**User.java**' file, do the following:

- Add the strings and button to be used for the app:

```java
/*Add the strings and buttons to be used in the application*/
String id,name,email,notes;

        Button update;
```

- Generate their constructor. It looks as shown below:

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

- Inside the constructor, create a function that makes the '**update**' button. The button will display the results of the row when clicked. This allows one to see the results, hence, determine if the results are as expected.

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
        }
        }
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

#### Setup the controller

For the '**HelloController.java**' file, do the following:

- Make the class implement '**Initializable**'. This is shown below:

```java
public class HelloController implements Initializable {
    /* Line of code */

}
```

- Import the controls that will be used in the application. Look at it in the code below:

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

- Under the imported controls, use the code below to do initialization of a controller after the controller's root element has been processed completely. It will also execute two functions that will be defined later on. These are
  the `initializeCols()` and the `loadData()` functions.

```java
@Override
public void initialize(URL url,ResourceBundle resourceBundle){
        table_info_app=table_info;

        initializeCols();
        loadData();
        }
```

> **NOTE**: The `location` parameter is used in the resolving of the relative paths for the root objects if it is known while the `resources` does localization for the root object.

- Elaborate more on the functions of the `initializeCols()` function. It shall be pointing out that the values entered for specific row cells are of a particular set of datatype as defined in the 'User' model. For example all values
  in the _column_id_ section are for all IDs.

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

- Create another function named `loadData()` that creates dummy data for the application through iteration. Copy-paste
  the following code into the file.

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

- Run the application through the 'Main' class. The output looks like this:

![Uneditable TableView](uneditable-tableview.png "Uneditable TableView")

- Try to double-click on a cell and see if the contents can be modified.

As noted, it can only select it but can't allow editing of the contents.

### Make the Table cells editable

Now in the Controller, do the following:

- Add a function, that is the `editableCols()` method to make the cell have a 'Text Field's' property that not only allows displaying the message but also editing properties. It also changes the value of the cell once a commit is done. A commit is done when the value is changed and the Enter button is pressed.

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
```

- To use the above function, call it inside the `initializeCols()` function, under the `col_update` line using the line below:

```java
editableCols();
```

- Re-run the application and try again. Notice that now the updates happen when the changes are done and the Enter key is pressed to commit the changes.
On pressing the Update button, the outputs are sent to the terminal as configured before.

![Final Result](final-output.png "Final Result")

The content updates can be fetched for updating the content in the database.

****

### Conclusion

At this point, the reader has learned and known how to:

- Start a JavaFX project
- Table creation and design
- Adding dummy data to the table
- Make the Table data editable
- Fetch the contents edited in the console

### References

- [Initializable Interface](https://docs.oracle.com/javase/8/javafx/api/javafx/fxml/Initializable.html) JavaFX documentation.
- [PropertyValueFactory](https://docs.oracle.com/javase/8/javafx/api/javafx/scene/control/cell/PropertyValueFactory.html) class JavaFX documentation.
