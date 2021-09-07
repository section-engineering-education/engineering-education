JavaFX is an open-source Java framework. It's used to create, develop, and deliver portable hardware-accelerated user interfaces. JavaFX creates GUI's for Rich Internet Applications (RIA), Web, desktop, and embedded and mobile applications. For example, one use for it would be for login and sign-up forms. These have a unique design that makes the site presentable and of a unique design.

In this article, you will learn how to build a JavaFX Login and Sign-up User Interface(UI).

### Table of Content

- [Key takeaways](#key-takeaways)
- [Pre-requisites](#pre-requisites)
- [What is JavaFX](#what-is-javafx)
- [JavaFX Libraries](#javafx-libraries)
- [Set Up a JavaFX project](#set-up-a-javafx-project)
  - [Simple JavaFX "Hello" application](#simple-javafx-hello-application)
  - [Folder Structure](#folder-structure)
  - [Set up a JavaFX Scene Builder](#set-up-a-javafx-scene-builder)
- [Build the Login and Sign-Up form](#build-the-login-and-sign-up-form)
  - [Change the stage appearance](#change-the-stage-appearance)
  - [Customize the User Interface](#customize-the-user-interface)
    - [Aside](#aside)
    - [A Header](#a-header)
    - [Login Section](#login-section)
    - [Line break](#line-break)
    - [Sign Up Section](#sign-up-section)
    - [Footer](#footer)
- [Run the Application](#run-the-application)
- [Conclusion](#conclusion)
- [Further your understanding](#further-your-understanding)
- [References](#references)

### Key takeaways

At the end of this article, you will have gained the following knowledge:

- What is JavaFX
- JavaFX libraries
- Setting up a JavaFX project
- Designing the Login and Sign-up form
- Running the application

### Pre-requisites

The basics of the article include the following:

- Java language knowledge and use.
- A Java IDE is set up in your machine. I recommend IntelliJ IDEA Community Edition which is free and very interactive.
  The ultimate version also supports JavaFX.
- A stable internet connection.

### What is JavaFX

As stated above, the main reason it is built is for the creation of User Interfaces for use in WIMP (Windows, Icons, Menus, and Pointers) based systems. It is suitable for Java applications with User Interfaces. It is easy to use, and it has several tools and aids used during the design process and testing. The UI can be designed in Java or XML.
**FXML** files are a type of XML files that are used in designing and building user interfaces separate from the main application logic. This enables you to distinguish quickly between the User Interface files and those of the main app. In the tutorial, you shall interact with it to come up with a visual interface for your application.

### JavaFX Libraries

Libraries in JavaFX provide one with the needed controls, menus, containers, and needed elements without including additional elements and attributes that are unnecessary. This reduces the application's space since it has only what is needed.

Some of these libraries and their functionality include:

- **ControlsFX**: Provides the developer with controls such as buttons, checkboxes, radio buttons, labels, text, and password fields among many more.
- **BootstrapFX**: This provides the program with CSS styling for the application designed specifically for a JavaFX application. It formats the controls and other elements put in the application.
- **FormsFX**: It helps in the quick creation and design of forms. It contains features such as validation, predefined controls, localization tools to reduce the time taken to create methods to validate arguments in the form.
- **Ikonli**: Has a list of Icon packs for easy access in your application.
- **TilesFX**: It enables the designer to use tiles for enhancing the appearance of the application e.g. on Dashboards.
- **ValidatorFX**: This makes forms made in your application super easy.
- **FXGL**: This is for game developers. It has tools used to easily develop games.
- **Charts**: This is recommended when you want to create scientific charts. It has very beautiful chart templates for your use through quick manipulation.

### Set Up a JavaFX project

#### Simple JavaFX "Hello" application

Open the IDE and click on create a new project. Choose JavaFX on the left-hand side of the window opened.

In the text fields, fill them as follows:

- `Name`: loginform
- `Group`: login
- `Artifact`: loginform

This is shown in the image below:

![Create a new JavaFX project](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/JavaFX-newProject.png)

Click 'Next' to go to the next window. In the dependencies window, choose BootstrapFX, ControlsFx, and FormsFX. This is as shown in the image below:

![JavaFX dependencies](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/JavaFX-dependencies.png)

Create a new project when done.

#### Folder Structure

The project's folders will look as shown below:

```shell
.
├── src
│   └── main
│       ├── java
│          └── com.login.loginform
│               ├── HelloApplication.java
│               └── HelloController.java
│       └── resources
│          └── com.login.loginform
│               └── hello-view.fxml
├── loginform.iml
└── pom.xml
```

Open the `HelloApplication.java` file found inside the "src/main/java/com/login/loginform/". Run it using `Shift + F10`. This opens a new "Hello!" window where clicking the button displays text. It looks as follows:

![Hello JavaFX Window](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/hello-JavaFX.png)

You shall modify it to fit the application you want.

#### Set up a JavaFX Scene Builder

Close the window opened and head over to the "resources" folder and in the subsequent subfolder open the `hello-view.fxml`. On the bottom of the window choose Scene Builder to view the file using JavaFX ScreenBuilder.

In case of errors due to missing the Scene Builder, just click on "Download Scene Builder" as shown in the image below. Wait as it completes the process.

![Download Screen Builder](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/download_screen_builder.png)

After a few moments, it shall open up the Scene Builder and a view of how the application shall look like when run. It looks as shown below:

![Scene Builder](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/Scene-Builder.png)

> **NOTE**: Scene Builder can also be installed separately from the IntelliJ IDEA environment.

### Build the Login and Sign-Up form

#### Change the stage appearance

First, you shall change the title of the window then increase its size. In the "HelloApplication.java" file, replace its title from "Hello!" to "Login or Sign-Up Form!". Change the size to 1000 by 700, that is, the width, and the height respectively. It shall look like shown below:

```java
package com.login.loginform;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class HelloApplication extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(HelloApplication.class.getResource("hello-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 1000, 700);
        stage.setTitle("Login or Sign-Up Form!");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}
```

#### Customize the User Interface

In the "hello-view.fxml" file, view it using the Scene Builder. On the left-hand side, delete the VBox which contains the label and button you saw in the application.

![Delete VBox](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/Delete-VBox.png "Delete VBox")

Add a border pane by just dragging and dropping it from the containers section to the window where the VBox was. A border pane allows one to keep controls in the Top, Left, Right, Center, and Bottom of the window easily. This will aid in dividing the window.

Now drag and drop an AnchorPane from the containers section into the left side of the border pane. Here you shall later place your Logo. On the right-hand side, on the properties window, in the style enter the CSS style attribute to be `-fx-background-color` and next to it place the value to be `#A9A9A9`.

In the layout tab, set `Pref Width` and `Pref Height` to 400 and 700 respectively.

##### Aside

Head over to the "controls" tab found on the left-hand side and drag and drop an ImageView control into the AnchorPane. On the Layout tab under the Properties tab set its `Fit Width` and `Fit Height` to 400 and 400 respectively. To move it to be at almost the center of the AnchorPane, set the `Layout X` and `Layout Y` values to 0 and 180. Download the logo
and other images in the repository found in [this](https://github.com/RisoriTofa/A-JavaFX-Login-and-Sign-Up-Form) link. Copy the images into the resource folder where the "hello-view.fxml" file is found. In the properties tab, set the image name to "logo.png".

Now head over to the right side of the BorderPane and drag and drop another AnchorPane in it. Set its `Pref Width` and `Pref Height` to 600 and 700 respectively. This makes the left and right BorderPane parts fit the initial height perfectly.

Inside the AnchorPane, add the following:

##### A Header

- **An ImageView control**: shall carry in it a small cart logo. In its properties tab, set the image name to "cart.png". It has the following layout settings: `Fit Width` of 100, `Fit Height` of 55, `Layout X` of 120, `Layout Y` of 5.
- **Label:** with the following properties `Text` of SHOP NOW, `Font` of Sans Serif 25px, the following `Style`: `-fx-background-color of transparent`, and `-fx-text-fill` of #24a0ed. To add more styles, just click on the addition button in the Style section. It also contains the following Layouts: `Pref Width` of 263, `Pref Height` of 57, `Layout X` of 203, and `Layout Y` of 1.
- **A Button**: In Properties tab: `Text` is Cancel, `Font` of SanSerif 15px, the following `Style`: `-fx-background-color`:  transparent, `-fx-text-fill`:  #A9A9A9, `-fx-border-width`: 2, `-fx-border-color`:  #A9A9A9, `-fx-border-radius`: 5. Its layouts are: `Layout X`: 502, and `Layout Y`: 13.

##### Login Section

- **Label**: Properties are: `Text`: Login, `Font`: SanSerif 30px, the following `Style`: `-fx-text-fill`:  #A9A9A9. The following Layouts: `Pref Width`: 90, `Pref Height`: 30, `Layout X`: 244, `Layout Y`: 60.
- **ImageView**: Properties are: `Image`: users.png. The following Layouts: `Fit Width`: 35, `Fit Height`: 40, `Layout X`: 110, `Layout Y`: 100.
- **TextField**: Properties are: `Prompt Text`: Username / Email, `Font`: SanSerif 14px; the following `Style`: `-fx-border-width`: 2, `-fx-border-color`:  #A9A9A9, `-fx-border-radius`: 5. The Layouts are: `Pref Width`: 300, `Pref Height`: 30, `Layout X`: 150, and `Layout Y`: 100.
- **PasswordField**: Properties are: `Promp Text`: Password, `Font`: SanSerif 14px, the following `Style`: `-fx-border-width`: 2, `-fx-border-color`:  #A9A9A9, `-fx-border-radius`: 5. The Layouts are: `Pref Width`: 300, `Pref Height`: 30, `Layout X`: 150, and `Layout Y`: 140.
- **ImageView**: Properties are: `Image`: lock.png. The following Layouts: `Fit Width`: 35, `Fit Height`: 40, `Layout X`: 110, `Layout Y`: 140.
- **CheckBox**: Properties are: `Text`: Remember Me, `Font`: SanSerif 15px, the following `Style`: `-fx-text-fill`: #A9A9A9. The Layouts are: `Layout X`: 150, and `Layout Y`: 195.
- **Button**: Properties are: `Text`: Login, `Font`: SanSerif 15px, the following `Style`: `-fx-background-color`: #24a0ed, `-fx-text-fill`: White, `-fx-border-radius`: 5, `-fx-border-width`: 2, `-fx-border-color`:  #24a0ed. The Layouts are: `Layout X`: 335, and `Layout Y`: 195.
- **Button**: Properties are: `Text`: Forgot your Password?, `Font`: SanSerif 15px, the following `Style`: `-fx-background-color`:   transparent, `-fx-text-fill`: #A9A9A9. The Layouts are: `Layout X`: 190, and `Layout Y`: 235.

##### Line break

- **Line** from the Shapes section: Properties are: `Fill`: DARKGRAY, Check the Smooth option, set the `Stroke` to #a8a8a8 for it to fade. The Layouts are: `Layout X`: 0, `Layout Y`: -110, `Start X`: 100, `Start Y`: 380, `End X`: 500, and `End Y`: 380.

##### Sign Up Section

- **Label**: Properties are: `Text`: Sign-Up, `Font`: SanSerif 30px, the following `Style`: `-fx-text-fill`:  #A9A9A9. The following Layouts: `Pref Width`: 130, `Pref Height`: 36, `Layout X`: 230, `Layout Y`: 275.
- **ImageView**: Properties are: `Image`: users.png. The following Layouts: `Fit Width`: 35, `Fit Height`: 40, `Layout X`: 110, `Layout Y`: 320.
- **TextField**: Properties are: `Prompt Text`: Username, `Font`: SanSerif 14px; the following `Style`: `-fx-border-width`: 2, `-fx-border-color`:  #A9A9A9, `-fx-border-radius`: 5. The Layouts are: `Pref Width`: 300, `Pref Height`: 30, `Layout X`: 155, and `Layout Y`: 320.
- **ImageView**: Properties are: `Image`: email.png. The following Layouts: `Fit Width`: 35, `Fit Height`: 40, `Layout X`: 110, `Layout Y`: 360.
- **TextField**: Properties are: `Prompt Text`: Email, `Font`: SanSerif 14px; the following `Style`: `-fx-border-width`: 2, `-fx-border-color`:  #A9A9A9, `-fx-border-radius`: 5. The Layouts are: `Pref Width`: 300, `Pref Height`: 30, `Layout X`: 155, and `Layout Y`: 360.
- **PasswordField**: Properties are: `Promp Text`: Password, `Font`: SanSerif 14px, the following `Style`: `-fx-border-width`: 2, `-fx-border-color`:  #A9A9A9, `-fx-border-radius`: 5. The Layouts are: `Pref Width`: 300, `Pref Height`: 30, `Layout X`: 155, and `Layout Y`: 400.
- **ImageView**: Properties are: `Image`: lock.png. The following Layouts: `Fit Width`: 35, `Fit Height`: 40, `Layout X`: 110, `Layout Y`: 400.
- **PasswordField**: Properties are: `Promp Text`: Repeat Password, `Font`: SanSerif 14px, the following `Style`: `-fx-border-width`: 2, `-fx-border-color`:  #A9A9A9, `-fx-border-radius`: 5. The Layouts are: `Pref Width`: 300, `Pref Height`: 30, `Layout X`: 150, and `Layout Y`: 440.
- **Label**: Properties are: `Text`: Date of Birth, `Font`: SanSerif 15px, the following `Style`: `-fx-text-fill`:  #A9A9A9. The following Layouts: `Pref Width`: 105, `Pref Height`: 20, `Layout X`: 130, `Layout Y`: 480.
- **DatePicker**: Properties are: `Prompt Text`: mm/dd/yyyy, Enable the `Editable` and `Show Week number` checkboxes to allow one to directly enter data into the field without using the date picker and also to show week numbers respectively. The Layouts are: `Layout X`: 250, and `Layout Y`: 480.
- **Label**: Properties are: `Text`: Gender, `Font`: SanSerif 15px, the following `Style`: `-fx-text-fill`:  #A9A9A9. The following Layouts: `Pref Width`: 90, `Pref Height`: 20, `Layout X`: 130, `Layout Y`: 515.
- **RadioButton**: Properties are: `Text`: Male, `Font`: SanSerif 14px, check the `Selected` checkbox, and in the `Toggle Group` key in Gender. This shall group the radio buttons of the same group hence only one is selected per instance. The following Layouts: `Layout X`: 300, `Layout Y`: 515.
- **RadioButton**: Properties are: `Text`: Female, `Font`: SanSerif 14px, and in the `Toggle Group` key in Gender. This shall group the radio buttons of the same group hence only one is selected per instance. The following Layouts: `Layout X`: 390, `Layout Y`: 515.
- **CheckBox**: Properties are: `Text`: I have read the Terms and Conditions, check the `Selected` checkbox, `Font`: SanSerif 15px, the following `Style`: `-fx-text-fill`: #A9A9A9. The Layouts are: `Layout X`: 160, and `Layout Y`: 545.
- **Button**: Properties are: `Text`: Sign-Up, `Font`: SanSerif 15px, the following `Style`: `-fx-background-color`: #24a0ed, `-fx-text-fill`: White, `-fx-border-radius`: 5, `-fx-border-width`: 2, `-fx-border-color`:  #24a0ed. The Layouts are: `Pref Width`: 130, `Pref Height`: 33, `Layout X`: 230, and `Layout Y`: 615.
- **Button**: Properties are: `Text`: Terms and Conditions, `Font`: SanSerif 15px, the following `Style`: `-fx-background-color`:   transparent, `-fx-text-fill`: #A9A9A9. The Layouts are: `Layout X`: 200, and `Layout Y`: 660.

##### Footer

In the footer section, you shall add your copyright. Drag and drop a Label control into the Bottom section of your main BorderPane.

This label shall have the following Property attributes: `Text`: Shop © 2021, the following `Style`: `-fx-text-fill`:  #B9a9a9; It shall have the following Layouts: `Pref Width`: 107, `Pref Height`: 16

The fxml Code shall look as shown below:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!-- Main Borderpane start -->

<?import javafx.geometry.*?>
<?import javafx.scene.*?>
<?import javafx.scene.control.*?>
<?import javafx.scene.image.*?>
<?import javafx.scene.layout.*?>
<?import javafx.scene.shape.*?>
<?import javafx.scene.text.*?>

<BorderPane maxHeight="-Infinity" maxWidth="-Infinity" minHeight="-Infinity" minWidth="-Infinity" prefHeight="700.0" prefWidth="1000.0" xmlns="http://javafx.com/javafx/11.0.2" xmlns:fx="http://javafx.com/fxml/1" fx:controller="com.login.login.HelloController">

    <!-- Beginning of the left part of the Borderpane -->
    <left>

        <!-- An AnchorPane in the Left BorderPane -->
        <AnchorPane prefHeight="700.0" prefWidth="400.0" style="-fx-background-color: #A9A9A9;" BorderPane.alignment="CENTER">
            <children>

                <!-- Logo -->
                <ImageView fitHeight="400.0" fitWidth="400.0" layoutY="180.0" pickOnBounds="true" preserveRatio="true">
                    <image>
                        <Image url="@logo.png" />
                    </image>
                </ImageView>
            </children>
        </AnchorPane>
    </left>
    <!-- Ending of the left part of the Borderpane -->

    <!-- Beginning of the right part of the Borderpane -->
    <right>
        <AnchorPane prefHeight="700.0" prefWidth="600.0" BorderPane.alignment="CENTER">
            <children>

                <!-- The Beginning of Logo -->
                <ImageView fitHeight="55.0" fitWidth="100.0" layoutX="120.0" layoutY="5.0" pickOnBounds="true" preserveRatio="true">
                    <image>
                        <Image url="@cart.png" />
                    </image>
                </ImageView>
                <Label layoutX="203.0" layoutY="1.0" prefHeight="57.0" prefWidth="263.0" style="-fx-background-color: transparent; -fx-text-fill: #24a0ed;" text="SHOP TODAY">
                    <font>
                        <Font name="SansSerif Regular" size="25.0" />
                    </font>
                </Label>
                <!-- The End of Logo -->

                <!-- The Beginning of Login form -->
                <Label layoutX="244.0" layoutY="60.0" prefHeight="30.0" prefWidth="90.0" style="-fx-text-fill: #A9A9A9;" text="Login">
                    <font>
                        <Font name="SansSerif Regular" size="30.0" />
                    </font>
                </Label>
                <Button fx:id="cancelButton" layoutX="502.0" layoutY="13.0" mnemonicParsing="false" style="-fx-background-color: transparent; -fx-text-fill: #A9A9A9; -fx-border-width: 2; -fx-border-color: #A9A9A9; -fx-border-radius: 5;" text="Cancel">
                    <font>
                        <Font name="SansSerif Regular" size="15.0" />
                    </font>
                </Button>
                <TextField fx:id="loginUsernameTextField" layoutX="150.0" layoutY="100.0" prefHeight="30.0" prefWidth="300.0" promptText="Username / Email" style="-fx-border-width: 2; -fx-border-color: #A9A9A9; -fx-border-radius: 5;">
                    <font>
                        <Font name="SansSerif Regular" size="14.0" />
                    </font>
                    <cursor>
                        <Cursor fx:constant="TEXT" />
                    </cursor>
                </TextField>
                <ImageView fitHeight="40.0" fitWidth="35.0" layoutX="110.0" layoutY="100.0" pickOnBounds="true" preserveRatio="true">
                    <image>
                        <Image url="@users.png" />
                    </image>
                </ImageView>
                <PasswordField fx:id="loginPasswordPasswordField" layoutX="150.0" layoutY="140.0" prefHeight="30.0" prefWidth="300.0" promptText="Password" style="-fx-border-width: 2; -fx-border-color: #A9A9A9; -fx-border-radius: 5;">
                    <font>
                        <Font name="SansSerif Regular" size="14.0" />
                    </font>
                </PasswordField>
                <ImageView fitHeight="40.0" fitWidth="35.0" layoutX="110.0" layoutY="140.0" pickOnBounds="true" preserveRatio="true">
                    <image>
                        <Image url="@lock.png" />
                    </image>
                </ImageView>
                <CheckBox layoutX="150.0" layoutY="195.0" mnemonicParsing="false" style="-fx-text-fill: #A9A9A9;" text="Remember Me">
                    <font>
                        <Font name="SansSerif Regular" size="15.0" />
                    </font>
                </CheckBox>
                <Button layoutX="190.0" layoutY="235.0" mnemonicParsing="false" style="-fx-background-color: transparent; -fx-text-fill: #Aac9A9A9;" text="Forgot your Password?" underline="true">
                    <font>
                        <Font size="15.0" />
                    </font>
                </Button>
                <Label fx:id="invalidLoginCredentials" alignment="CENTER" contentDisplay="CENTER" layoutX="150.0" layoutY="175.0" prefHeight="16.0" prefWidth="300.0" textAlignment="CENTER" textFill="RED">
                    <opaqueInsets>
                        <Insets />
                    </opaqueInsets>
                </Label>
                <Button fx:id="LoginButton" layoutX="335.0" layoutY="195.0" mnemonicParsing="false" style="-fx-background-color: #24a0ed; -fx-text-fill: white; -fx-border-radius: 5; -fx-border-width: 2; -fx-border-color: #24a0ed;" text="Login">
                    <font>
                        <Font size="15.0" />
                    </font>
                </Button>
                <!-- End of Login Form -->

                <!-- A simple line Separator -->
                <Line endX="500.0" endY="380.0" fill="DARKGRAY" layoutY="-110.0" opacity="0.5" startX="100.0" startY="380.0" stroke="#a8a8a8ad" strokeLineJoin="BEVEL" strokeWidth="3.0" />


                <!-- The Beginning of Signup form -->
                <Label layoutX="230.0" layoutY="275.0" prefHeight="36.0" prefWidth="130.0" style="-fx-text-fill: #A9A9A9;" text="Sign-Up">
                    <font>
                        <Font name="SansSerif Regular" size="30.0" />
                    </font>
                </Label>
                <TextField fx:id="signUpUsernameTextField" layoutX="155.0" layoutY="320.0" prefHeight="30.0" prefWidth="300.0" promptText="Username" style="-fx-border-width: 2; -fx-border-color: #A9A9A9; -fx-border-radius: 5;">
                    <font>
                        <Font name="SansSerif Regular" size="14.0" />
                    </font>
                    <cursor>
                        <Cursor fx:constant="TEXT" />
                    </cursor>
                </TextField>
                <ImageView fitHeight="40.0" fitWidth="35.0" layoutX="110.0" layoutY="320.0" pickOnBounds="true" preserveRatio="true">
                    <image>
                        <Image url="@users.png" />
                    </image>
                </ImageView>
                <TextField fx:id="signUpEmailTextField" layoutX="155.0" layoutY="360.0" prefHeight="30.0" prefWidth="300.0" promptText="Email" style="-fx-border-width: 2; -fx-border-color: #A9A9A9; -fx-border-radius: 5;">
                    <font>
                        <Font name="SansSerif Regular" size="14.0" />
                    </font>
                    <cursor>
                        <Cursor fx:constant="TEXT" />
                    </cursor>
                </TextField>
                <ImageView fitHeight="40.0" fitWidth="35.0" layoutX="110.0" layoutY="360.0" pickOnBounds="true" preserveRatio="true">
                    <image>
                        <Image url="@email.png" />
                    </image>
                </ImageView>
                <PasswordField fx:id="signUpPasswordPasswordField" layoutX="155.0" layoutY="400.0" prefHeight="30.0" prefWidth="300.0" promptText="Password" style="-fx-border-width: 2; -fx-border-color: #A9A9A9; -fx-border-radius: 5;">
                    <font>
                        <Font name="SansSerif Regular" size="14.0" />
                    </font>
                </PasswordField>
                <ImageView fitHeight="40.0" fitWidth="35.0" layoutX="110.0" layoutY="400.0" pickOnBounds="true" preserveRatio="true">
                    <image>
                        <Image url="@lock.png" />
                    </image>
                </ImageView>
                <PasswordField fx:id="signUpRepeatPasswordPasswordField" layoutX="155.0" layoutY="440.0" prefHeight="30.0" prefWidth="300.0" promptText="Repeat Password" style="-fx-border-width: 2; -fx-border-color: #A9A9A9; -fx-border-radius: 5;">
                    <font>
                        <Font name="SansSerif Regular" size="14.0" />
                    </font>
                </PasswordField>
                <Label layoutX="130.0" layoutY="480.0" prefHeight="20.0" prefWidth="105.0" style="-fx-text-fill: #A9A9A9;" text="Date of Birth">
                    <font>
                        <Font name="SansSerif Regular" size="15.0" />
                    </font>
                </Label>
                <DatePicker fx:id="signUpDateDatePicker" layoutX="250.0" layoutY="480.0" promptText="mm/dd/yyyy" showWeekNumbers="true" />
                <Label layoutX="130.0" layoutY="515.0" prefHeight="20.0" prefWidth="90.0" style="-fx-text-fill: #A9A9A9;" text="Gender">
                    <font>
                        <Font name="SansSerif Regular" size="15.0" />
                    </font>
                </Label>
                <RadioButton layoutX="300.0" layoutY="515.0" mnemonicParsing="false" selected="true" text="Male" textFill="DARKGRAY">
                    <toggleGroup>
                        <ToggleGroup fx:id="Gender" />
                    </toggleGroup>
                    <font>
                        <Font size="14.0" />
                    </font>
                </RadioButton>
                <RadioButton layoutX="390.0" layoutY="515.0" mnemonicParsing="false" text="Female" textFill="DARKGRAY" toggleGroup="$Gender">
                    <font>
                        <Font size="14.0" />
                    </font>
                </RadioButton>
                <CheckBox fx:id="termsConditionsCheckbox" layoutX="160.0" layoutY="545.0" mnemonicParsing="false" selected="true" style="-fx-text-fill: #A9A9A9;" text="I have read the Terms and Conditions">
                    <font>
                        <Font name="SansSerif Regular" size="15.0" />
                    </font>
                </CheckBox>
                <Label fx:id="invalidSignupCredentials" alignment="CENTER" contentDisplay="CENTER" layoutX="160.0" layoutY="580.0" prefHeight="16.0" prefWidth="300.0" textAlignment="CENTER" textFill="RED">
                    <opaqueInsets>
                        <Insets />
                    </opaqueInsets>
                </Label>
                <Button fx:id="signUpButton" layoutX="230.0" layoutY="615.0" mnemonicParsing="false" prefHeight="33.0" prefWidth="130.0" style="-fx-background-color: #24a0ed; -fx-text-fill: white; -fx-border-radius: 5; -fx-border-width: 2; -fx-border-color: #24a0ed;" text="Sign-Up">
                    <font>
                        <Font size="15.0" />
                    </font>
                </Button>
                <Button layoutX="200.0" layoutY="660.0" mnemonicParsing="false" style="-fx-background-color: transparent; -fx-text-fill: #A9A9A9;" text="Terms and Conditions" underline="true">
                    <font>
                        <Font size="15.0" />
                    </font>
                </Button>
                <!-- The End of Signup form -->

            </children>
        </AnchorPane>
    </right>
    <!-- Ending of the left part of the Borderpane -->

    <!-- Beginning of the bottom part of the Borderpane -->
    <bottom>

        <!-- Simple Copyright -->
        <Label prefHeight="16.0" prefWidth="107.0" style="-fx-text-fill: #B9a9a9;" text="Shop © 2021" BorderPane.alignment="CENTER" />
    </bottom>
    <!-- Ending of the bottom part of the Borderpane -->

</BorderPane>

```

> **NOTE**: Paths may vary depending on Project Name and with your machine.
>
> In case you add controls and other elements manually using code, make sure you import them into the project.

### Run the Application

Run the application as before using the `Shift + F10` shortcut. The results are as shown below:

![Final Product](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/Final-product.png "Final Product")

You can find the source code and files in [this](https://github.com/RisoriTofa/A-JavaFX-Login-and-Sign-Up-Form) repository.

### Conclusion

JavaFX is a very stable User Interface for developers developing computer pieces of software. It is not only interactive but more efficient and secure since one only uses elements they need and the User Interface files are separated from the System files hence there is no intermixing which may bring confusion.

On reaching here, you have gained the following knowledge:

- What is JavaFX
- JavaFX libraries
- Setting up a simple JavaFX project
- Designing the Login and Sign-Up form
- Running the application

### Further your understanding

- Explore the JavaFX community found [here](https://openjfx.io/ "JavaFX website") for some of the latest JavaFX projects which are interesting and promising due to their trends.
- Try using some JavaFX libraries for other projects such as scientific calculators, modelers, and games.

### References

- [JavaFX libraries](https://www.educba.com/javafx-libraries/ "JavaFX libraries")
- [JavaFX website](https://openjfx.io/ "JavaFX website")
