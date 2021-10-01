Organizations always want to keep users' info in their systems. This info helps them follow up on users' feedback, follow-ups, statistics, and product advertisements. Users, on the other hand, sometimes find the sign-up and login form boring. This process deters some from the data-entry process. To deal with this issue, developers have added interactive features.

Modern login and sign-up forms have continuously evolved from the ancient static types to more interactive types. They have included validations, style effects, and animations. They are making the interaction with them exciting. These additions capture the user's attention till the data entry of personal information is over.

In this article, you shall be able to do some input validations, effects, and animations based on the outcome on the form.

### Table of Content

- [Key takeaways](#key-takeaways)
- [Pre-requisites](#pre-requisites)
- [Create a new project](#create-a-new-project)
  - [Folder Structure](#folder-structure)
- [Create the Login form](#create-the-login-form)
  - [Modify the Scene](#modify-the-scene)
  - [Design the view](#design-the-view)
- [Add some validations to the form](#add-some-validations-to-the-form)
- [Add animations to the project](#add-animations-to-the-project)
- [Further learning](#further-learning)
- [Conclusion](#conclusion)

### Key takeaways
At the end of the article, you will have done the following:
- Create a JavaFX login form
- Apply styling to the application
- Create an input validation method
- Add effects based on the outcomes of the validation
- Add animations on the controls

### Pre-requisites
The basics needed to follow up with the tutorial quickly include:
- Familiarity with Java language
- Java SDK installed on the machine
- A JavaFX IDE is installed on the machine. I recommend using the latest IntelliJ IDEA Community version. It is free and enables developers to create a JavaFX project quickly. Find it in this [link](https://www.jetbrains.com/idea/download). The latest Ultimate version also supports JavaFX projects.
- A good internet connection for installing additional dependencies.
Once all the above pre-requisites are met, follow the steps below to accomplish the goals:

### Create a new project

- Open the IDE and click on create a new project. Under the project type options, select JavaFX.
  Set the following on the right-hand side window:

- `Name`: Login
- `Group`: authentication
- `Artifact`: Login
- `Project SDK`: You can set the latest version or that which you are using.

These are shown in the image below:

![new javafx project](/engineering-education/creating-an-animated-javafx-field-validation-alert/new-javafx-project.png "New-JavaFX project")

- Click on the `Next` button. Select the `BootstrapFX`, `ControlsFX`, and `FormsFX` checkboxes on the dependencies window. BootstrapFX helps in styling the form using JavaFX styling. The styling is similar to CSS styling. 

ControlsFX is for allowing controls to be available in the project. These include TextFields, PasswordFields, Labels, DatePickers, and many others. Finally, FormFX allows one to design forms easily.

Look at the image below to see the above steps:

![Dependencies](/engineering-education/creating-an-animated-javafx-field-validation-alert/dependencies.png "dependencies")

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

- Open the `hello-view.fxml` file, which contains the contents of the page to be displayed.
- Near the status bar, there is a button adjacent to the Text button. Click on it to see the FXML file visually using Scene Builder.
- If it displays the `Failed to open the file in Scene Builder` error, click on `Download SceneBuilder`.
- Click also on the `Download JavaFX` if it also brings an additional Pop-up.

![Download the Scene Builder](/engineering-education/creating-an-animated-javafx-field-validation-alert/download-scene-builder.png "Download the Scene Builder")

- Once done, just view the application as it will be displayed when run.

![Project view in scene builder](/engineering-education/creating-an-animated-javafx-field-validation-alert/project-view-in-scene-builder.png "Project view in scene builder")

- Run the application. It opens a new Java window of the application. In it, there is a button that, when clicked, returns a new text in the window. The image below shows the output:

![Running the first project](/engineering-education/creating-an-animated-javafx-field-validation-alert/running-the-first-project.png "Running the first project")

- Close the application for the next steps.

### Create the Login form

#### Modify the Scene
Open the `HelloApplication.java` file. In it, perform the following:
- change the Title of the window to 'Login Form'.
- Ensure that the width of the scene is 400 by 600 pixels.
- Add an icon in the title tab of the JavaFX project. Download the `icon.png` file [here](https://github.com/justusmbuvi/Creating-an-Animated-JavaFX-field-Validation-alert/raw/main/src/main/resources/authentication/login/icon.png).

These are shown below:

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

### Design the view
Open up the `hello-view.fxml` file using the Scene Builder. In the file,

- Delete the VBOX and the element in it. Do this by right-clicking on it and selecting delete in the left tab.
- Drag and drop an AnchorPane where the VBox was deleted. It loads a new AnchorPane that holds other controls in it.

The AnchorPane will have the following:

- **Style**
- - `-fx-text-fill`:  #8ecae6
- **Layout**
- - `Pref Width`: 400
- - `Pref Height`: 600

The layout makes it fit perfectly with the scene initially created.

- Drag and drop a label from the controls tab into the AnchorPane in the centre of the SceneBuilder.

The label will have the following:

- **Properties**
- - `Text`: LOGIN
- - `Font`: System 25px Bold
- **Style**
- - `-fx-text-fill`:  #219ebc
- **Layout**
- - `Pref Width`: 100
- - `Pref Height`: 20
- - `Layout X`: 150
- - `Layout Y`: 40

When viewed using the '**Text**' view, the following code will be found to be automatically generated:

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

- Head over to this [link](https://github.com/justusmbuvi/Creating-an-Animated-JavaFX-field-Validation-alert/blob/main/src/main/resources/authentication/login/panda.png) and download the panda image. This will be placed to beautify the scene.
- Once downloaded, copy and paste it into the location of the FXML file.
- Drag and drop an ImageView control into the AnchorPane. The control will hold the image.
- Set the following to the ImageView control:


- **Properties**
- - `Image`: panda.png
- - `Font`: System 25px Bold
- **Layout**
- - `Fit Width`: 300
- - `Fit Height`: 300
- - `Layout X`: 90
- - `Layout Y`: 57

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

- Now, add a Rectangle from the Shapes category. It shall have the following:

- **Properties**
   - `Arc Width`: 5
   - `Fill`: #b9eaf8
   - `Stroke`: #a3a3a3
   - `Stroke Width`: 2
   - `Stroke Line Cap`: Round
   - `Fill`: BEVEL
- **Layout**
   - `Width`: 370 
   - `Height`: 320
   - `Layout X`: 15
   - `Layout Y`: 260

The rectangle will easily distinguish the input region from the whole form. The rectangles code is shown below:

```xml
<Rectangle arcHeight="5.0" arcWidth="5.0" fill="#b9eaf8" height="320.0" layoutX="15.0" layoutY="260.0" stroke="#a3a3a3" strokeLineCap="ROUND" strokeLineJoin="BEVEL" strokeType="INSIDE" strokeWidth="2.0" width="370.0" />
```

- Add a Label control with the properties as shown in the code below:

```xml
<!-- A label to show the start of inputs -->
<Label layoutX="120.0" layoutY="290.0" text="Enter your details below" textFill="#023047">
   <font>
      <Font name="System Bold" size="14.0" />
   </font>
</Label>
```

- Add a TextField control to allow the input of the username and email. It has the following configurations:


- **Properties**
  - `Prompt Text`: Username / Email
  - `Font`: System 15px
- **Layout**
  - `Pref Width`: 245
  - `Pref Height`: 35
  - `Layout X`: 80
  - `Layout Y`: 345
- **Code**
  - `fx:id`: usernameTextField

The id is for identifying it as a unique element in the form.

```xml
<!-- Inputs and their icons -->
<TextField fx:id="usernameTextField" layoutX="80.0" layoutY="345.0" prefHeight="35.0" prefWidth="245.0" promptText="Username / Email">
   <font>
      <Font size="15.0" />
   </font>
</TextField>
```

- Add the `users.png` icon for the username TextField can be downloaded [here](https://github.com/justusmbuvi/Creating-an-Animated-JavaFX-field-Validation-alert/blob/main/src/main/resources/authentication/login/users.png). Add an ImageView control that will hold the image. It will have the following:

- **Properties**
  - `Image`: users.png
- **Layout**
  - `Fit Width`: 35
  - `Fit Height`: 35
  - `Layout X`: 80
  - `Layout Y`: 345
- **Code**
  - `fx:id`: usersIcon

```xml
<ImageView fx:id="usersIcon" fitHeight="35.0" fitWidth="35.0" layoutX="40.0" layoutY="345.0" pickOnBounds="true" preserveRatio="true">
   <image>
      <Image url="@users.png" />
   </image>
</ImageView>
```

- Add a PasswordField control to capture the password. It has the following:


- **Properties**
  - `Prompt Text`: Password
  - `Font`: System 15px
- **Layout**
  - `Pref Width`: 245
  - `Pref Height`: 35
  - `Layout X`: 80
  - `Layout Y`: 400
- **Code**
- - `fx:id`: userPassword

```xml
<PasswordField fx:id="userPassword" layoutX="80.0" layoutY="400.0" prefHeight="35.0" prefWidth="245.0" promptText="Password">
   <font>
      <Font size="15.0" />
   </font>
</PasswordField>
```

- Add the `lock.png` icon for the above PasswordField can be downloaded [here](https://github.com/justusmbuvi/Creating-an-Animated-JavaFX-field-Validation-alert/blob/main/src/main/resources/authentication/login/lock.png). After downloading it, add an ImageView control to hold it. The control has the following:


- **Properties**
  - `Image`: lock.png
- **Layout**
  - `Fit Width`: 35
  - `Fit Height`: 35
  - `Layout X`: 40
  - `Layout Y`: 400
- **Code**
  - `fx:id`: passwordIcon

The SceneBuilder generated code is as follows:

```xml
<ImageView fx:id="passwordIcon" fitHeight="35.0" fitWidth="35.0" layoutX="40.0" layoutY="400.0" pickOnBounds="true" preserveRatio="true">
   <image>
      <Image url="@lock.png" />
   </image>
</ImageView>
```

- Add a Label control is required to display the errors generated or if successful. Add it by adding a Label control to the form. The label will not have any content on it. Instead, it will have this content when the checks are done. The label will have the following:


- **Properties**
  - `Font`: System 12px
  - `Text Fill`: RED
- **Layout**
  - `Pref Width`: 245
  - `Layout X`: 80
  - `Layout Y`: 445
- **Code**
  - `fx:id`: invalidDetails

```xml
<!-- A label to display error and success messages -->
<Label fx:id="invalidDetails" layoutX="88.0" layoutY="446.0" prefWidth="245.0" textFill="RED" />
```

Buttons will be required to check if the inputs are entered as required or not, close the form, and reset the password. Start by creating a **cancel button**. This closes the scene or window when clicked. Add a button from the controls. The button will have the following properties:

- **Properties**
  - `Text`: Cancel
  - `Font`: System 14px
  - `Text Fill`: #a3a3a3
- **Style**
  - `-fx-background-color`:  transparent
  - `-fx-border-width`:  2
  - `-fx-border-color`:  #a5a5a5
- **Layout**
  - `Pref Width`: 90
  - `Pref Height`: 30
  - `Layout X`: 85
  - `Layout Y`: 480
- **Code**
  - `fx:id`: cancelButton
  - `On Action`: onCancelButtonClick

The `On Action` property identifies the button to a function. The button is the trigger. Create a **login button** that has the following attributes:
- **Properties**
  - `Text`: Login
  - `Font`: System 15px
  - `Text Fill`: #a3a3a3
- **Style**
  - `-fx-background-color`: #0077b6
  - `-fx-border-radius`:  5
- **Layout**
  - `Pref Width`: 90
  - `Pref Height`: 30
  - `Layout X`: 225
  - `Layout Y`: 480
- **Code**
  - `fx:id`: loginButton
  - `On Action`: onLoginButtonClick

Its code is as shown below:

```xml
<Button fx:id="loginButton" layoutX="225.0" layoutY="480.0" mnemonicParsing="false" onAction="#onLoginButtonClick" prefHeight="30.0" prefWidth="90.0" style="-fx-background-color: #0077b6; -fx-border-radius: 5;" text="Login" textFill="WHITE">
   <font>
      <Font size="15.0" />
   </font>
</Button>
```

Add a **reset password button**. It has the following:

- **Properties**
  - `Text`: Login
  - `Font`: System 12px
  - `Text Fill`: #a3a3a3
- **Style**
  - `-fx-background-color`: transparent
  - `-fx-border-radius`:  5
- **Layout**
  - `Pref Width`: 140
  - `Pref Height`: 25
  - `Layout X`: 120
  - `Layout Y`: 530
- **Code**
  - `fx:id`: forgotButton

```xml
<Button fx:id="forgotButton" layoutX="120.0" layoutY="533.0" mnemonicParsing="false" prefHeight="25.0" prefWidth="141.0" style="-fx-background-color: transparent;" text="Forgot Password?" textFill="#a3a3a3" />
```

Run the project. The outcome, when run, is as shown in the image below:

![The final design](/engineering-education/creating-an-animated-javafx-field-validation-alert/final-design.png "The final design")

### Adding form validation
Head over to the `HelloController.java` file. This file contains functions that have procedures performed on the form. Delete the available `onHelloButtonClick` function. This was of the `Hello button` that was there during project generation. Additionally, delete the `welcomeText` label too. The code remaining is as follows:

```java
package authentication. login;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.stage.Stage;

public class HelloController {
    
    
}
```

First, import the controls needed that are in the form. Do this by adding the following code to the file:

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

Add a function to close the form when the close button is clicked.

```java
// Creation of methods that are activated on events in the forms

// Close form
@FXML
protected void onCancelButtonClick() {
    Stage stage = (Stage) cancelButton.getScene().getWindow();
    stage.close();
}
```

The cancel button invokes the `onCancelButtonClick` function. This is because the `On Action` property is set to `onCancelButtonClick`. This event closes the window immediately.

- Try it out by running the program and clicking on the Cancel button.
- Add some variables inside the `HelloController` function. These will hold styling that will be reused in the code instead of rewriting them over again. For example, just above the code for importing the controls into the controller, add the following code:

```java
  // Strings which hold css elements to easily re-use in the application
  protected
  String successMessage = String.format("-fx-text-fill: GREEN;");
  String errorMessage = String.format("-fx-text-fill: RED;");
  String errorStyle = String.format("-fx-border-color: RED; -fx-border-width: 2; -fx-border-radius: 5;");
  String successStyle = String.format("-fx-border-color: #A9A9A9; -fx-border-width: 2; -fx-border-radius: 5;");
```

Now, add a function to be executed when the `Login` button is clicked on. Its code will look as follows:

```java
  // On the login button click
  @FXML
  protected void onLoginButtonClick() throws InterruptedException {
  
    
  }
```

In the function, do the following:

- Check if the username and password are blank
- Check if the username is blank
- Check if the password is blank
- Check if the password has less than four characters

The code looks as follows:

```java
// In case the Username and Password fields are left blank then display the error message
if (usernameTextField.getText().isBlank() || userPassword.getText().isBlank()) {
  invalidDetails.setStyle(errorMessage);

// When the username and password are blank
if (usernameTextField.getText().isBlank() && userPassword.getText().isBlank()) {
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

Run the application. The outputs are as shown below. However, When there is no input, the project looks as shown below:

![When there is no input](/engineering-education/creating-an-animated-javafx-field-validation-alert/no-input.png "When there is no input")

- When the username is blank, the program will produce the following error seen in the image below:

![When there is no username input](/engineering-education/creating-an-animated-javafx-field-validation-alert/no-username-input.png "When there is no username input")

- When there is no password, the error produced looks as seen below:

![When there is no password input](/engineering-education/creating-an-animated-javafx-field-validation-alert/no-password-input.png "When there is no input")

- When the password is less than four characters, it appears as shown below:

![When the password is less than four](/engineering-education/creating-an-animated-javafx-field-validation-alert/password-less-than-4-characters.png "When the password is less than four")

- When the username and password are supplied as required:

![When the login is successful](/engineering-education/creating-an-animated-javafx-field-validation-alert/on-success-message.png "When the login is successful")

### Animating the user interface
To add animations in the JavaFX project, the `AnimateFX` dependency is required.

> `AnimateFX` is a JavaFX library that provides animations for a JavaFX project.

AnimateFX animations for JavaFX controls include:

- Bounce
- BounceIn
- FadeIn
- Flash
- Flip
- GlowText
- Jello
- LightSpeedIn
- Pulse
- RollIn
- RotateOut
- RubberBand
- SlideOutRight
- Swing
- Wobble
- ZoomOut

Check out for additional animations [here](https://github.com/Typhon0/AnimateFX/tree/master/animatefx/src/main/java/animatefx/animation).

- Check the dependencies installed or used in the project by clicking on the `Dependencies` button near the status bar. It opens up the Dependencies tab. For example, search for `AnimateFX` and add it to the project. When searched, it looks as shown below:

![AnimateFX dependency](/engineering-education/creating-an-animated-javafx-field-validation-alert/animateFX-dependency.png "animateFX-dependency")

- Wait for a few minutes for the download to complete. Once done, reload the file or IDE by closing and re-opening it. Then, check if it has been installed in the same Dependencies tab.

- Once installed, head over to the `HelloController.java` file.
- Inside the `onLoginButtonClick()` function, find the procedure checking if the username and password are blank. In it, add the code below:

```java
new animatefx.animation.Shake(usernameTextField).play();
new animatefx.animation.Wobble(usersIcon).play();
new animatefx.animation.Shake(userPassword).play();
new animatefx.animation.Wobble(passwordIcon).play();
```

This code will add a '**Shake**' animation to the inputs when there is an error. It also adds a '**Wobble**' animation to the images.

- In the procedure that checks if the username is blank, add the following code to it:

```java
new animatefx.animation.Shake(usernameTextField).play();
new animatefx.animation.Pulse(usersIcon).play();
```

The code adds the '**Pulse**' and '**Shake**' effect to the input and icon, respectively.

- In the procedure that checks if the username is blank, add the following code:

```java
new animatefx.animation.Shake(userPassword).play();
new animatefx.animation.Wobble(passwordIcon).play();
```

The code also does as the previous one but now to the PasswordField and its icon.

- In the procedure that checks if the password is less than four characters, add a slightly gentle effect. 

```java
new animatefx.animation.FadeIn(userPassword).play();
new animatefx.animation.Wobble(passwordIcon).play();
```

It adds a '**FadeIn**' and a '**Wobble**' effect to the PasswordField and its icon, respectively.

Finally, add a small `Tada` animation to the `invalidDetails` label in the final' else' statement. That animation shows that the process is successful. The code to add is shown below:

```java
new animatefx.animation.Tada(invalidDetails).play();
```

The final product is as shown in the GIF below:

![Validation Animations](/engineering-education/creating-an-animated-javafx-field-validation-alert/Animations.gif "Validation Animations")

The code for this article can be found in [this](https://github.com/justusmbuvi/Creating-an-Animated-JavaFX-field-Validation-alert) repository.

### Further learning
- Add more animations to the project to tailor it as needed. Choose any animation from the [link](https://github.com/Typhon0/AnimateFX/tree/master/animatefx/src/main/java/animatefx/animation) to see which is best.
- Add more complex validations by using [ValidatorFX](https://github.com/effad/ValidatorFX) library.
- Choose more colourful templates for the project from the [Coolor.co](https://coolors.co/palettes/trending) site. The site is free and has some cool templates.

### Conclusion
In the article, the following have been accomplished:
- Create a JavaFX login form.
- Apply styling to the application.
- Create an input validation method.
- Add effects based on the outcomes of the validation.
- Add animations on the controls.
- Learnt more types of animations available for JavaFX projects.
