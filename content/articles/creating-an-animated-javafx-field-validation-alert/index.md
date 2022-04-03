---
layout: engineering-education
status: publish
published: true
url: /creating-an-animated-javafx-field-validation-alert/
title: Creating an Animated JavaFX Field Validation Alert
description: This article will show you how to animate form inputs to enhance user interaction.
author: justus-mbuvi
date: 2021-10-12T00:00:00-14:36
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-an-animated-javafx-field-validation-alert/hero.png
    alt: Animated javafx field validation image
---
A good interface is important because it enhances the interaction between the user and software. Animations improve the quality of an application. It is also a fun way of providing feedback.
 <!--more-->
Modern authentication forms have evolved from ancient static types to more interactive types.

Today, they include aspects such as validation, styling, and animations. These features improve the interaction process.

In this article, we will discuss input validations, effects, and animations based on user interaction.

### Table of Content
- [Pre-requisites](#pre-requisites)
- [Create a new project](#create-a-new-project)
  - [Folder Structure](#folder-structure)
- [Create the Login form](#create-the-login-form)
  - [Modify the Scene](#modify-the-scene)
- [Design the view](#design-the-view)
- [Adding form validation](#adding-form-validation)
- [Animating the user interface](#animating-the-user-interface)
- [Conclusion](#conclusion)
- [Further learning](#further-learning)

### Pre-requisites
To follow along, you should have:

- Some basic understanding of the Java programming language
- Java SDK installed on the machine
- A Java IDE is installed on the machine. I recommend using the latest [IntelliJ IDEA Community]((https://www.jetbrains.com/idea/download)) version.

### Create a new project
Open the IDE and then create a new project. Under the `project type` options, select `JavaFX`.

Add the following settings in the right-hand side window:

- `Name`: Login
- `Group`: authentication
- `Artifact`: Login
- `Project SDK`: You can set the latest SDK version installed on your system.

These are shown in the image below:

![new javafx project](/engineering-education/creating-an-animated-javafx-field-validation-alert/new-javafx-project.png)

Click on the `Next` button, then select the `BootstrapFX`, `ControlsFX`, and `FormsFX` checkboxes on the dependencies window. `BootstrapFX` helps in styling the form. 

The styling is similar to CSS. `ControlsFX` enables certain controls in the project. These include TextFields, PasswordFields, Labels, DatePickers, and many others. Finally, `FormFX` allows one to design forms easily.

The above steps are highlighted in the image below:

![Dependencies](/engineering-education/creating-an-animated-javafx-field-validation-alert/dependencies.png)

The newly created project has the following folder structure:

#### Folder Structure

```shell
.
├── src
│   ├── main
│       ├── java
│          └── authentication
│             └── login
│                 ├── HelloApplication.java
│                 └── HelloController.java
│       └── resources
│          └── authentication
│             └── login
│                 └── hello-view.fxml
├── login.iml
└── pom.xml
```

Open the `hello-view.fxml` file, which contains the contents of the page to be displayed. Near the status bar, there is a button adjacent to the Text button. 

Click on it to view the FXML file using `Scene Builder`. If it displays the `Failed to open the file in Scene Builder` error, click on `Download SceneBuilder`.

![Download the Scene Builder](/engineering-education/creating-an-animated-javafx-field-validation-alert/download-scene-builder.png)

![Project view in scene builder](/engineering-education/creating-an-animated-javafx-field-validation-alert/project-view-in-scene-builder.png)

When you run the application, it will open a new application window. In this UI, there is a button that returns a new text when clicked.

The image below shows the output:

![Running the first project](/engineering-education/creating-an-animated-javafx-field-validation-alert/running-the-first-project.png)

> lose the application for the next steps.

### Create the Login form

#### Modify the Scene

In the `HelloApplication.java` file, add the following:

- Change the Title of the window to 'Login Form'.
- Ensure that the width of the scene is `400 by 600 pixels`.
- Add an icon in the title tab of the JavaFX project. Download the `icon` file [here](https://github.com/justusmbuvi/Creating-an-Animated-JavaFX-field-Validation-alert/raw/main/src/main/resources/authentication/login/icon.png).

These changes are shown below:

```java
package authentication. login;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;

import java.io.IOException;

public class HelloApplication extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(HelloApplication.class.getResource("hello-view.fxml"));
        
        // Set the scene width and height to 400 and 600 respectively
        Scene scene = new Scene(fxmlLoader.load(), 400, 600);
        
        // Set the name of the window to 'Login Form'
        stage.setTitle("Login Form");
        
        // Add an Icon to the title bar
        stage.getIcons().add(new Image(HelloApplication.class.getResourceAsStream("icon.png")));
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}
```

### Designing the view
Open up the `hello-view.fxml` file using the Scene Builder. Delete the `VBOX` and the element in it. 

Then, drag and drop an AnchorPane where the VBox was deleted. This new AnchorPane will hold other controls. The AnchorPane will have the following:

**Style**

`fx-text-fill`:  #8ecae6
`Pref Width`: 400
`Pref Height`: 600

The above layout allows it to fit perfectly in the scene. Drag and drop a label from the controls tab into the AnchorPane in the centre of the SceneBuilder. The label will have the following:

**Properties**

`Text`: LOGIN
`Font`: System 25px Bold

**Style**

`-fx-text-fill`:  #219ebc

**Layout**

`Pref Width`: 100
`Pref Height`: 20
`Layout X`: 150
`Layout Y`: 40

When viewed using the 'Text' view, the following code will be generated automatically:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<?import javafx.geometry.*?>
<?import javafx.scene.control.*?>
<?import javafx.scene.image.*?>
<?import javafx.scene.layout.*?>
<?import javafx.scene.shape.*?>
<?import javafx.scene.text.*?>

<AnchorPane maxHeight="-Infinity" maxWidth="-Infinity" minHeight="-Infinity" minWidth="-Infinity" prefHeight="600.0" prefWidth="400.0" style="-fx-background-color: #8ecae6;" xmlns="http://javafx.com/javafx/11.0.2" xmlns:fx="http://javafx.com/fxml/1" fx:controller="authentication.login.HelloController">
  <!-- Contents inside the XML file -->
   <children>
     <!-- Title -->
      <Label layoutX="150.0" layoutY="40.0" prefHeight="20.0" prefWidth="100.0" style="-fx-text-fill: #219ebc;" text="LOGIN">
         <font>
            <Font name="System Bold" size="25.0" />
         </font></Label>
   </children>
</AnchorPane>
```

Navigate to this [link](https://github.com/justusmbuvi/Creating-an-Animated-JavaFX-field-Validation-alert/blob/main/src/main/resources/authentication/login/panda.png) and download the panda image. The image will be placed in the scene to beautify it. 

Once downloaded, copy and paste the image into the folder containing the FXML file. Then, drag and drop an ImageView into the AnchorPane. This control will hold or load the image. 

Next, add the following properties to the ImageView:

**Properties**

`Image`: panda.png
`Font`: System 25px Bold

**Layout**

`Fit Width`: 300
`Fit Height`: 300
`Layout X`: 90
`Layout Y`: 57

The `Scene Builder` generates the code shown below:

```xml
<ImageView fitHeight="300.0" fitWidth="300.0" layoutX="90.0" layoutY="57.0" pickOnBounds="true" preserveRatio="true">
   <image>
      <Image url="@panda.png" />
   </image>
   <viewport>
      <Rectangle2D />
   </viewport>
</ImageView>
```

Now, add a Rectangle from the `Shapes` category. It should have the following properties:

**Properties**

`Arc Width`: 5
`Fill`: #b9eaf8
`Stroke`: #a3a3a3
`Stroke Width`: 2
`Stroke Line Cap`: Round
`Fill`: BEVEL

**Layout**

`Width`: 370
`Height`: 320
`Layout X`: 15
`Layout Y`: 260

The above rectangle will distinguish the input region from other areas on the form. The generated rectangle code is shown below:

```xml
<Rectangle arcHeight="5.0" arcWidth="5.0" fill="#b9eaf8" height="320.0" layoutX="15.0" layoutY="260.0" stroke="#a3a3a3" strokeLineCap="ROUND" strokeLineJoin="BEVEL" strokeType="INSIDE" strokeWidth="2.0" width="370.0" />
```

Add a `Label` using the following properties:

```xml
<!-- A label to show the start of inputs -->
<Label layoutX="120.0" layoutY="290.0" text="Enter your details below" textFill="#023047">
   <font>
      <Font name="System Bold" size="14.0" />
   </font>
</Label>
```

Add a `TextField` for the username and email. It has the following configurations:

**Properties**

`Prompt Text`: Username / Email
`Font`: System 15px

**Layout**

`Pref Width`: 245
`Pref Height`: 35
`Layout X`: 80
`Layout Y`: 345
`fx:id`: usernameTextField

Each element in the form or scene should have a unique id.

```xml
<!-- Inputs and their icons -->
<TextField fx:id="usernameTextField" layoutX="80.0" layoutY="345.0" prefHeight="35.0" prefWidth="245.0" promptText="Username / Email">
   <font>
      <Font size="15.0" />
   </font>
</TextField>
```

We need to add an icon for the username TextField. It can be downloaded [here](https://github.com/justusmbuvi/Creating-an-Animated-JavaFX-field-Validation-alert/blob/main/src/main/resources/authentication/login/users.png). 

Add an ImageView that will hold the image:

**Properties**

`Image`: users.png

**Layout**

`Fit Width`: 35
`Fit Height`: 35
`Layout X`: 80
`Layout Y`: 345
`fx:id`: usersIcon

```xml
<ImageView fx:id="usersIcon" fitHeight="35.0" fitWidth="35.0" layoutX="40.0" layoutY="345.0" pickOnBounds="true" preserveRatio="true">
   <image>
      <Image url="@users.png" />
   </image>
</ImageView>
```

Add a `PasswordField` to capture the user password. It has the following properties:

**Properties**

`Prompt Text`: Password
`Font`: System 15px

**Layout**

`Pref Width`: 245
`Pref Height`: 35
`Layout X`: 80
`Layout Y`: 400
`fx:id`: userPassword

```xml
<PasswordField fx:id="userPassword" layoutX="80.0" layoutY="400.0" prefHeight="35.0" prefWidth="245.0" promptText="Password">
   <font>
      <Font size="15.0" />
   </font>
</PasswordField>
```

We need to add an icon for the above PasswordField. It can be downloaded from [here](https://github.com/justusmbuvi/Creating-an-Animated-JavaFX-field-Validation-alert/blob/main/src/main/resources/authentication/login/lock.png).

After downloading it, add an ImageView to hold it, as shown below:

**Properties**

`Image`: lock.png
`Fit Width`: 35
`Fit Height`: 35
`Layout X`: 40
`Layout Y`: 400
`fx:id`: passwordIcon

The SceneBuilder generated code is as follows:

```xml
<ImageView fx:id="passwordIcon" fitHeight="35.0" fitWidth="35.0" layoutX="40.0" layoutY="400.0" pickOnBounds="true" preserveRatio="true">
   <image>
      <Image url="@lock.png" />
   </image>
</ImageView>
```

Another Label is required to display the error or success messages. The label will not have any content on it.

**Properties**

`Font`: System 12px
`Text Fill`: RED

**Layout**

`Pref Width`: 245
`Layout X`: 80
`Layout Y`: 445
`fx:id`: invalidDetails

```xml
<!-- A label to display error and success messages -->
<Label fx:id="invalidDetails" layoutX="88.0" layoutY="446.0" prefWidth="245.0" textFill="RED" />
```

We will need `Buttons` for various actions. We should first create a `cancel button` which will close the scene or window when clicked. 

Go ahead and add a button from the `controls` section. The button will have the following properties:

**Properties**

`Text`: Cancel
`Font`: System 14px
`Text Fill`: #a3a3a3

**Style**

`fx-background-color`:  transparent
`fx-border-width`:  2
`fx-border-color`:  #a5a5a5

**Layout**

`Pref Width`: 90
`Pref Height`: 30
`Layout X`: 85
`Layout Y`: 480
`fx:id`: cancelButton
`On Action`: onCancelButtonClick

The `onAction` property binds the button to a function. 

Next, create a `login button` using the following attributes:

**Properties**

`Text`: Login
`Font`: System 15px
`Text Fill`: #a3a3a3
`fx-background-color`: #0077b6
`fx-border-radius`:  5
`Pref Width`: 90
`Pref Height`: 30
`Layout X`: 225
`Layout Y`: 480
`fx:id`: loginButton
`On Action`: onLoginButtonClick

It's code is shown below:

```xml
<Button fx:id="loginButton" layoutX="225.0" layoutY="480.0" mnemonicParsing="false" onAction="#onLoginButtonClick" prefHeight="30.0" prefWidth="90.0" style="-fx-background-color: #0077b6; -fx-border-radius: 5;" text="Login" textFill="WHITE">
   <font>
      <Font size="15.0" />
   </font>
</Button>
```

Add a `reset password button`, as demonstrated below:

**Properties**

`Text`: Login
`Font`: System 12px
`Text Fill`: #a3a3a3
`fx-background-color`: transparent
`fx-border-radius`:  5
`Pref Width`: 140
`Pref Height`: 25
`Layout X`: 120
`Layout Y`: 530
`fx:id`: forgotButton

```xml
<Button fx:id="forgotButton" layoutX="120.0" layoutY="533.0" mnemonicParsing="false" prefHeight="25.0" prefWidth="141.0" style="-fx-background-color: transparent;" text="Forgot Password?" textFill="#a3a3a3" />
```

You should see the following output when you run the app:

![The final design](/engineering-education/creating-an-animated-javafx-field-validation-alert/final-design.png)

### Adding form validation
Head over to the `HelloController.java` file. This file contains functions required in the form. Delete the generated `onHelloButtonClick` function and `welcomeText`. The remaining code should look as shown below:

```java
package authentication. login;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.stage.Stage;

public class HelloController {
    
}
```

First, import the controls that we added to the form in the previous steps. This is done using the following code:

```java
@FXML
private TextField usernameTextField;

@FXML
private PasswordField userPassword;

@FXML
private Label invalidDetails;

@FXML
private Button cancelButton, loginButton, forgotButton;

@FXML
private ImageView usersIcon, passwordIcon;
```

Add a function to exit the form when the `close button` is clicked.

```java
// Close form
@FXML
protected void onCancelButtonClick() {
    Stage stage = (Stage) cancelButton.getScene().getWindow();
    stage.close();
}
```

The `cancel button` will invoke the `onCancelButtonClick` function. This event closes the window immediately. 

Next, add some variables inside the `HelloController` method. They will hold styling that will be reused in the project.

```java
  // Strings which hold css elements to easily re-use in the application
  protected
  String successMessage = String.format("-fx-text-fill: GREEN;");
  String errorMessage = String.format("-fx-text-fill: RED;");
  String errorStyle = String.format("-fx-border-color: RED; -fx-border-width: 2; -fx-border-radius: 5;");
  String successStyle = String.format("-fx-border-color: #A9A9A9; -fx-border-width: 2; -fx-border-radius: 5;");
```

Now, add a function that will be invoked when the `Login` button is clicked on, as highlighted below:

```java
  // On the login button click
  @FXML
  protected void onLoginButtonClick() throws InterruptedException {
    
  }
```

In the function, do the following:

- Check if the:
  - Username and password are blank
  - Password has less than four characters

Here is the code:

```java
// In case the Username and Password fields are left blank then display the error message
if (usernameTextField.getText().isBlank() || userPassword.getText().isBlank()) {
  invalidDetails.setStyle(errorMessage);

// When the username and password are blank
if (usernameTextField.getText().isBlank() || userPassword.getText().isBlank()) {
    invalidDetails.setText("The Login fields are required!");
    usernameTextField.setStyle(errorStyle);
    userPassword.setStyle(errorStyle);
    

} else // When only the username is blank
if (usernameTextField.getText().isBlank()) {
    usernameTextField.setStyle(errorStyle);
    invalidDetails.setText("The Username or Email is required!");
    userPassword.setStyle(successStyle);
    
          
} else // When only the password is blank
    if (userPassword.getText().isBlank()) {
        userPassword.setStyle(errorStyle);
        invalidDetails.setText("The Password is required!");
        usernameTextField.setStyle(successStyle);
        
        
    }
} else // Check if password is less than four characters, if so display error message
  if (userPassword.getText().length() < 4) {
      invalidDetails.setText("The Password can't be less than 4 characters!");
      invalidDetails.setStyle(errorMessage);
      userPassword.setStyle(errorStyle);
      
      
  }
// If all login details are entered as required then display success message
else {
    invalidDetails.setText("Login Successful!");
    invalidDetails.setStyle(successMessage);
    usernameTextField.setStyle(successStyle);
    userPassword.setStyle(successStyle);
    
    
}
```

When you run the application, and there is no input, the project looks as shown below:

![When there is no input](/engineering-education/creating-an-animated-javafx-field-validation-alert/no-input.png)

When the username is blank, the program will show the following error:

![When there is no username input](/engineering-education/creating-an-animated-javafx-field-validation-alert/no-username-input.png)

When there is no password, the error looks as shown below:

![When there is no password input](/engineering-education/creating-an-animated-javafx-field-validation-alert/no-password-input.png)

When the password is less than four characters, the error appears as follows:

![When the password is less than four](/engineering-education/creating-an-animated-javafx-field-validation-alert/password-less-than-4-characters.png)

When the username and password are meet the outline criteria, the following output is shown:

![When the login is successful](/engineering-education/creating-an-animated-javafx-field-validation-alert/on-success-message.png)

### Animating the user interface
The `AnimateFX` library is required to add animations in the JavaFX project. First, check out AnimateFx's supported animations [here](https://github.com/Typhon0/AnimateFX/tree/master/animatefx/src/main/java/animatefx/animation). 

Check the dependencies installed or used in the project by clicking on the `Dependencies` button near the status bar, then search for `AnimateFX` and add it to the project:

![AnimateFX dependency](/engineering-education/creating-an-animated-javafx-field-validation-alert/animateFX-dependency.png)

Wait for a few minutes for the download to complete then reload the file or IDE. To determine if it was installed, check the `Dependencies` tab. 

After this process, navigate to the `HelloController.java` file. In the `onLoginButtonClick()` function and add the code below:

```java
new animatefx.animation.Shake(usernameTextField).play();
new animatefx.animation.Wobble(usersIcon).play();
new animatefx.animation.Shake(userPassword).play();
new animatefx.animation.Wobble(passwordIcon).play();
```

This code will add a 'Shake' animation to the inputs when there is an error. It also adds a 'Wobble' animation to the images. 

In the procedure that checks if the username is blank, add the following code to it:

```java
new animatefx.animation.Shake(usernameTextField).play();
new animatefx.animation.Pulse(usersIcon).play();
```

The code adds the 'Pulse' and 'Shake' effect to the `input` and `icon`, respectively. 

In the procedure that checks if the username is blank, add the following code:

```java
new animatefx.animation.Shake(userPassword).play();
new animatefx.animation.Wobble(passwordIcon).play();
```

In the function that checks if the password is less than four characters, add a slightly gentle effect, as illustrated below:

```java
new animatefx.animation.FadeIn(userPassword).play();
new animatefx.animation.Wobble(passwordIcon).play();
```

It adds a 'FadeIn' and a 'Wobble' effect to the PasswordField, respectively. Finally, add a small `Tada` animation to the `invalidDetails` label in the final' else' statement. That animation shows that the process is successful. 

Here is the code:

```java
new animatefx.animation.Tada(invalidDetails).play();
```

The final product is as shown below:

<iframe width="478" height="269" src="https://www.youtube.com/embed/ss0pM1wEMII" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The code for this article can be found in [this](https://github.com/justusmbuvi/Creating-an-Animated-JavaFX-field-Validation-alert).

### Conclusion
In the article, we have learned:
- How to create a JavaFX login form.
- How to apply styling to the application.
- How to perform input validation.
- How to add animations on the controls.

### Further learning
- [Animations](https://github.com/Typhon0/AnimateFX/tree/master/animatefx/src/main/java/animatefx/animation)
- [ValidatorFX](https://github.com/effad/ValidatorFX)
- [Coolor.co](https://coolors.co/palettes/trending)

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
