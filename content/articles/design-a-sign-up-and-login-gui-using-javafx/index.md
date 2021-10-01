---
layout: engineering-education
status: publish
published: true
url: /design-a-sign-up-and-login-gui-using-javafx/
title: Design a Signup and Login GUI Using JavaFX
description: In this tutorial, the reader will learn how to build a login and signup form with JavaFX. JavaFX is an open-source Java framework that is used for creating, developing, and delivering portable hardware-accelerated user interfaces.
author: roy-kibet
date: 2021-10-01T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/design-a-sign-up-and-login-gui-using-javafx/hero.png
    alt: Javafx login and signup gui
---
JavaFX is an open-source Java framework that is used for creating, developing, and delivering portable hardware-accelerated user interfaces. JavaFX creates GUIs for rich internet applications (RIA).
<!--more-->
It is for web, desktop, embedded, and mobile applications. For example, one use for it would be for login and sign-up forms. These have a unique design that makes the site presentable and of a unique design.

In this article, you will learn how to build a JavaFX login and sign-up user interface (UI).

### Table of contents
- [Key takeaways](#key-takeaways)
- [Pre-requisites](#pre-requisites)
- [What is JavaFX](#what-is-javafx)
- [JavaFX libraries](#javafx-libraries)
- [Set up a JavaFX project](#set-up-a-javafx-project)
  - [Simple JavaFX "Hello" application](#simple-javafx-hello-application)
  - [Folder structure](#folder-structure)
  - [Set up a JavaFX Scene Builder](#set-up-a-javafx-scene-builder)
- [Build the login and sign-up form](#build-the-login-and-sign-up-form)
  - [Change the stage appearance](#change-the-stage-appearance)
  - [Customize the user interface](#customize-the-user-interface)
    - [Aside](#aside)
    - [A Header](#a-header)
    - [Login section](#login-section)
    - [Line break](#line-break)
    - [Signup Section](#signup-section)
    - [Footer](#footer)
- [Run the application](#run-the-application)
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

### Prerequisites
The basics of the article include the following:
- Knowledge and use of the Java language.
- A Java IDE is set up in the machine. I recommend the latest version of IntelliJ IDEA Community Edition, which is free and very interactive. Download it [here](https://www.jetbrains.com/idea/download/). The latest ultimate version also supports JavaFX.
- A stable internet connection.

> Screenshot images found in the article are of the Intellij Ultimate `2021.2.2` version.

### What is JavaFX
As stated above, JavaFX is a framework for creating user interfaces for use in WIMP (Windows, Icons, Menus, and Pointers) based systems.

It is suitable for Java applications with user interfaces. It is easy to use, and it has several tools and aids used during the design process and testing.

The UI is designed in Java or XML.

**FXML** files are XML files used to design and build user interfaces separate from the main application logic. This separation enables one to distinguish between the user interface files and those of the main app.

In the tutorial, you will interact with it to develop a visual interface for your application.

### JavaFX libraries
Libraries in JavaFX provide one with the needed controls, menus, containers, and other elements.

This provision is without the inclusion of unnecessary extra elements and attributes.

The application's storage space is small since it only has what is needed.

Some of these libraries and their functionalities include:
- **ControlsFX**: Provides the developer with controls such as buttons, checkboxes, radio buttons, labels, text, password fields, etc.
- **BootstrapFX**: Provides the program with CSS styling, designed for a JavaFX application. It formats the controls and other elements put in the application.
- **FormsFX**: It helps in the quick creation and design of forms. It contains features such as validation, predefined controls, and localization tools. These are to reduce the time taken to create methods to validate arguments in the form.
- **Ikonli**: Has a list of icon packs for easy access in the application.
- **TilesFX**: It enables the designer to use tiles to enhance the application's appearance, e.g. on dashboards.
- **ValidatorFX**: This makes forms made in the application super easy.
- **FXGL**: This is for game developers. It has tools used to develop games.
- **Charts**: This is recommended when one wants to create scientific charts. It has stunning chart templates for one's use through quick manipulation.

### Set up a JavaFX project
#### Simple JavaFX Hello application
Open the IDE and click on _create a new project_. Next, choose _JavaFX_ on the left-hand side of the window opened.

In the text fields, fill them as follows:
- `Name`: loginform
- `Group`: login
- `Artifact`: loginform

This step is shown in the image below:

![Create a new JavaFX project](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/java-fx-new-project.png)

Click _Next_ to go to the next window. In the dependencies window, choose BootstrapFX, ControlsFx, and FormsFX.

This step is as shown in the image below:

![JavaFX dependencies](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/java-fx-dependencies.png)

Create a new project when done.

#### Folder structure
The project's folders will look as shown below:

```bash
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

Open the `HelloApplication.java` file found inside _src/main/java/com/login/loginform/_. Run it using `Shift + F10`.

This combination opens a new _Hello!_ window where clicking the button displays text.

It looks as follows:

![Hello JavaFX Window](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/hello-java-fx.png)

Modify it to fit the application of choice.

#### Set up a JavaFX Scene builder
Close the window opened and head over to the _resources_ folder.

In the subsequent subfolder, open the `hello-view.fxml`.

At the bottom of the window, choose _Scene Builder_ to view the file using JavaFX ScreenBuilder.

In case of errors due to missing the Scene Builder, click _Download Scene Builder_, as shown in the image below. Wait as it completes the process.

![Download Screen Builder](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/download-screen-builder.png)

After a few moments, it will open up the Scene Builder and view how the application will look when run.

It looks as shown below:

![Scene Builder](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/java-fx-scene-builder.png)

> **NOTE**: Scene Builder can also be installed separately from the IntelliJ IDEA environment.

### Build the login and signup form
#### Change the stage appearance
First, change the title of the window, then increase its size.

In the `HelloApplication.java` file, replace its title from _Hello!_ to _Login or Sign-Up Form!_.

Change the size to 1000 by 700, that is, the width and the height.

It will look like shown below:

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

#### Customize the user interface
In the `hello-view.fxml` file, view it using the scene builder. On the left-hand side, delete the VBox that contains the label and button as seen in the application:

![Delete VBox](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/delete-v-box.png "Delete VBox")

Add a border pane by dragging and dropping it from the containers section to the window where the VBox was. A border pane allows one to easily keep controls in the top, left, right, center, and bottom of the window. This step will aid in dividing the window.

Now drag and drop an AnchorPane from the containers section into the left side of the border pane.

On the right-hand side, on the properties window, in _Style_, enter the CSS style attribute. It will be `-fx-background-color` and place the value to be `#A9A9A9` next to it.

In the layout tab, set `Pref Width` and `Pref Height` to 400 and 700 respectively.

##### Aside
Head over to the _controls_ tab found on the left-hand side.

Drag and drop an ImageView control into the AnchorPane.

On the layout tab under the properties tab, set its `Fit Width` and `Fit Height` to 400.

To move it to be almost at the center of the AnchorPane, set the `Layout X` and `Layout Y` values to 0 and 180 respectively.

Download the logo and other images in the repository found in [this](https://github.com/RisoriTofa/A-JavaFX-Login-and-Sign-Up-Form) link.

Copy the images into the resource folder to the location of the `hello-view.fxml` file. In the properties tab, set the image name to _logo.png_.

Now head over to the right side of the BorderPane and drag and drop another AnchorPane in it. Set its `Pref Width` and `Pref Height` to 600 and 700 respectively. This step makes the left and right BorderPane parts fit the initial height.

The code shall look as shown when viewed:

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

        </AnchorPane>
    </right>
    <!-- Ending of the right part of the Borderpane -->

    <!-- Beginning of the bottom part of the Borderpane -->
    <bottom>


    </bottom>
    <!-- Ending of the bottom part of the Borderpane -->

</BorderPane>
```

Inside the AnchorPane, add the following:

##### A Header

**ImageView**

This control will carry in it a small cart logo:

- **Properties:**
  - `Image`: cart.png
- **Layouts:**
  - `Fit Width`: 100
  - `Fit Height`: 55
  - `Layout X`: 120
  - `Layout Y`: 5

**Label**

- **Properties:**
  - `Text`: SHOP NOW
  - `Font`: SanSerif 25px
- **Style:**
  - `-fx-background-color`: transparent
  - `-fx-text-fill`: #24a0ed

> To add more styles, click on the addition button in the Style section.

- **Layouts:**
  - `Pref Width`: 263
  - `Pref Height`: 57
  - `Layout X`: 203
  - `Layout Y`: 1

**Button**

- **Properties:**
  - `Text`: Cancel
  - `Font`: SanSerif 15px
- **Style:**
  - `-fx-background-color`: transparent
  - `-fx-text-fill`: #A9A9A9
  - `-fx-border-width`: 2
  - `-fx-border-color`: #A9A9A9
  - `-fx-border-radius`: 5
- **Layouts:**
  - `Layout X`: 502
  - `Layout Y`: 13

It results in the following code:

```xml
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


        </children>
    </AnchorPane>
</right>
```

##### Login Section

**Label**

- **Properties:**
  - `Text`: Login
  - `Font`: SanSerif 30px
- **Style:**
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Pref Width`: 90
  - `Pref Height`: 30
  - `Layout X`: 244
  - `Layout Y`: 60

**ImageView**

- **Properties:**
  - `Image`: users.png
- **Layouts:**
  - `Fit Width`: 35
  - `Fit Height`: 40
  - `Layout X`: 110
  - `Layout Y`: 100

**TextField**

- **Properties:**
  - `Prompt Text`: Username / Email
  - `Font`: SanSerif 14px
- **Style:**
  - `-fx-border-width`: 2
  - `-fx-border-color`: #A9A9A9
  - `-fx-border-radius`: 5
- **Layouts:**
  - `Pref Width`: 300
  - `Pref Height`: 30
  - `Layout X`: 150
  - `Layout Y`: 100

**PasswordField**

- **Properties:**
  - `Prompt Text`: Password
  - `Font`: SanSerif 14px
- **Style:**
  - `-fx-border-width`: 2
  - `-fx-border-color`: #A9A9A9
  - `-fx-border-radius`: 5
- **Layouts:**
  - `Pref Width`: 300
  - `Pref Height`: 30
  - `Layout X`: 150
  - `Layout Y`: 140

**ImageView**

- **Properties:**
  - `Image`: lock.png
- **Layouts:**
  - `Fit Width`: 35
  - `Fit Height`: 40
  - `Layout X`: 110
  - `Layout Y`: 140

**CheckBox**

- **Properties:**
  - `Text`: Remember Me
  - `Font`: SanSerif 15px
- **Style:**
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Layout X`: 150
  - `Layout Y`: 195

**Button**

- **Properties:**
  - `Text`: Login
  - `Font`: SanSerif 15px
- **Style:**
  - `-fx-background-color`: 24a0ed
  - `-fx-text-fill`: White
  - `-fx-border-radius`: 5
  - `-fx-border-width`: 2
  - `-fx-border-radius`: 5
  - `-fx-border-color`: _#24a0ed_
- **Layouts:**
  - `Layout X`: 335
  - `Layout Y`: 195

**Button**

- **Properties:**
  - `Text`: Forgot your Password?
  - `Font`: SanSerif 15px
- **Style:**
  - `-fx-background-color`: transparent
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Layout X`: 190
  - `Layout Y`: 235

The scene builder produces the following code:

```xml
<!-- The Beginning of Login form -->
<Label layoutX="244.0" layoutY="60.0" prefHeight="30.0" prefWidth="90.0" style="-fx-text-fill: #A9A9A9;" text="Login">
    <font>
        <Font name="SansSerif Regular" size="30.0" />
    </font>
</Label>

    <!-- Cancel Button -->
<Button fx:id="cancelButton" layoutX="502.0" layoutY="13.0" mnemonicParsing="false" style="-fx-background-color: transparent; -fx-text-fill: #A9A9A9; -fx-border-width: 2; -fx-border-color: #A9A9A9; -fx-border-radius: 5;" text="Cancel">
    <font>
        <Font name="SansSerif Regular" size="15.0" />
    </font>
</Button>

    <!-- Inputs -->
<TextField fx:id="loginUsernameTextField" layoutX="150.0" layoutY="100.0" prefHeight="30.0" prefWidth="300.0" promptText="Username / Email" style="-fx-border-width: 2; -fx-border-color: #A9A9A9; -fx-border-radius: 5;">
    <font>
        <Font name="SansSerif Regular" size="14.0" />
    </font>
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

    <!-- Forgot your password button -->
<Button layoutX="190.0" layoutY="235.0" mnemonicParsing="false" style="-fx-background-color: transparent; -fx-text-fill: #Aac9A9A9;" text="Forgot your Password?" underline="true">
    <font>
        <Font size="15.0" />
    </font>
</Button>

<!-- Login Button -->
<Button fx:id="LoginButton" layoutX="335.0" layoutY="195.0" mnemonicParsing="false" style="-fx-background-color: #24a0ed; -fx-text-fill: white; -fx-border-radius: 5; -fx-border-width: 2; -fx-border-color: #24a0ed;" text="Login">
    <font>
        <Font size="15.0" />
    </font>
</Button>
<!-- End of Login Form -->
```

##### Line break

**Line**

This element is from the shapes section

- **Properties:**
  - `Fill`: DARKGRAY
  - `Stroke`: #a8a8a8
  - `Smooth` option: Check

This property is for a fade effect.

- **Style:**
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Layout X`: 0
  - `Layout Y`: -110
  - `Start X`: 100
  - `Start Y`: 380
  - `End X`: 500
  - `End Y`: 380

Its code produced is as shown:

```xml
<!-- A simple line Separator -->
<Line endX="500.0" endY="380.0" fill="DARKGRAY" layoutY="-110.0" startX="100.0" startY="380.0" style="-fx-text-fill: #A9A9A9;" strokeWidth="3.0" />

```

##### Sign up section

**Label**

- **Properties:**
  - `Text`: Sign-Up
  - `Font`: SanSerif 30px
- **Style:**
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Pref Width`: 130
  - `Pref Height`: 36
  - `Layout X`: 230
  - `Layout Y`: 275

**ImageView**

- **Properties:**
  - `Image`: users.png
- **Layouts:**
  - `Fit Width`: 35
  - `Fit Height`: 40
  - `Layout X`: 110
  - `Layout Y`: 320

**TextField**

- **Properties:**
  - `Prompt Text`: Username
  - `Font`: SanSerif 14px
- **Style:**
  - `-fx-border-width`: 2
  - `-fx-border-color`: #A9A9A9
  - `-fx-border-radius`: 5
- **Layouts:**
  - `Pref Width`: 300
  - `Pref Height`: 30
  - `Layout X`: 155
  - `Layout Y`: 320

**ImageView**

- **Properties:**
  - `Image`: email.png
- **Layouts:**
  - `Fit Width`: 35
  - `Fit Height`: 40
  - `Layout X`: 110
  - `Layout Y`: 360

**TextField**

- **Properties:**
  - `Prompt Text`: Email
  - `Font`: SanSerif 14px
- **Style:**
  - `-fx-border-width`: 2
  - `-fx-border-color`: #A9A9A9
  - `-fx-border-radius`: 5
- **Layouts:**
  - `Pref Width`: 300
  - `Pref Height`: 30
  - `Layout X`: 155
  - `Layout Y`: 360

**PasswordField**

- **Properties:**
  - `Prompt Text`: Password
  - `Font`: SanSerif 14px
- **Style:**
  - `-fx-border-width`: 2
  - `-fx-border-color`: #A9A9A9
  - `-fx-border-radius`: 5
- **Layouts:**
  - `Pref Width`: 300
  - `Pref Height`: 30
  - `Layout X`: 155
  - `Layout Y`: 400

**ImageView**

- **Properties:**
  - `Image`: lock.png
- **Layouts:**
  - `Fit Width`: 35
  - `Fit Height`: 40
  - `Layout X`: 110
  - `Layout Y`: 400

**PasswordField**

- **Properties:**
  - `Prompt Text`: Repeat Password
  - `Font`: SanSerif 14px
- **Style:**
  - `-fx-border-width`: 2
  - `-fx-border-color`: #A9A9A9
  - `-fx-border-radius`: 5
- **Layouts:**
  - `Pref Width`: 300
  - `Pref Height`: 30
  - `Layout X`: 150
  - `Layout Y`: 440

**Label**

- **Properties:**
  - `Text`: Date of Birth
  - `Font`: SanSerif 15px
- **Style:**
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Pref Width`: 105
  - `Pref Height`: 20
  - `Layout X`: 130
  - `Layout Y`: 480

**DatePicker**

- **Properties:**
  - `Prompt Text`: mm/dd/yyyy
  - `Editable` checkbox: Check
  - `Show Week number` checkbox: Check

Enabling them allows one to enter data into the field without using the date picker. It also shows week numbers.

- **Style:**
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Layout X`: 250
  - `Layout Y`: 480

**Label**

- **Properties:**
  - `Text`: Gender
  - `Font`: SanSerif 15px
- **Style:**
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Pref Width`: 90
  - `Pref Height`: 20
  - `Layout X`: 130
  - `Layout Y`: 515

**RadioButton**

- **Properties:**
  - `Text`: Male
  - `Font`: SanSerif 14px
  - `Selected` checkbox: Check
  - `Toggle Group`: Gender

This step will group the radio buttons of the same group; hence only one is selected per instance.

- **Style:**
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Layout X`: 300
  - `Layout Y`: 515

**RadioButton**

- **Properties:**
  - `Text`: Female
  - `Font`: SanSerif 14px
  - `Toggle Group`: Gender

This step groups the radio buttons of the same group; hence only one can be selected per instance.

- **Style:**
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Layout X`: 390
  - `Layout Y`: 515

**CheckBox**

- **Properties:**
  - `Text`: I have read the Terms and Conditions
  - `Font`: SanSerif 15px
- **Style:**
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Layout X`: 160
  - `Layout Y`: 545

**Button**

- **Properties:**
  - `Text`: Sign-Up
  - `Font`: SanSerif 15px
- **Style:**
  - `-fx-background-color`: #24a0ed
  - `-fx-text-fill`: White
  - `-fx-border-radius`: 5
  - `-fx-border-width`: 2
  - `-fx-border-color`: #24a0ed
- **Layouts:**
  - `Pref Width`: 130
  - `Pref Height`: 33
  - `Layout X`: 230
  - `Layout Y`: 615

**Button**

- **Properties:**
  - `Text`: Terms and Conditions
  - `Font`: SanSerif 15px
- **Style:**
  - `-fx-background-color`: transparent
  - `-fx-text-fill`: #A9A9A9
- **Layouts:**
  - `Layout X`: 230
  - `Layout Y`: 660

Its code is shown below:

```xml
<!-- The Beginning of Signup form -->
<Label layoutX="230.0" layoutY="275.0" prefHeight="36.0" prefWidth="130.0" style="-fx-text-fill: #A9A9A9;" text="Sign-Up">
    <font>
        <Font name="SansSerif Regular" size="30.0" />
    </font>
</Label>

<!-- User Inputs -->
<TextField fx:id="signUpUsernameTextField" layoutX="155.0" layoutY="320.0" prefHeight="30.0" prefWidth="300.0" promptText="Username" style="-fx-border-width: 2; -fx-border-color: #A9A9A9; -fx-border-radius: 5;">
    <font>
        <Font name="SansSerif Regular" size="14.0" />
    </font>
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
<RadioButton layoutX="300.0" layoutY="515.0" mnemonicParsing="false" selected="true" text="Male" style="-fx-text-fill: #A9A9A9;">
    <toggleGroup>
        <ToggleGroup fx:id="Gender" />
    </toggleGroup>
    <font>
        <Font name="SansSerif Regular" size="14.0" />
    </font>
</RadioButton>
<RadioButton layoutX="390.0" layoutY="515.0" mnemonicParsing="false" text="Female" style="-fx-text-fill: #A9A9A9;" toggleGroup="$Gender">
    <font>
        <Font name="SansSerif Regular" size="14.0" />
    </font>
</RadioButton>
<CheckBox fx:id="termsConditionsCheckbox" layoutX="160.0" layoutY="545.0" mnemonicParsing="false" selected="true" style="-fx-text-fill: #A9A9A9;" text="I have read the Terms and Conditions">
    <font>
        <Font name="SansSerif Regular" size="15.0" />
    </font>
</CheckBox>

<!-- Sign up button -->
<Button fx:id="signUpButton" layoutX="230.0" layoutY="615.0" mnemonicParsing="false" prefHeight="33.0" prefWidth="130.0" style="-fx-background-color: #24a0ed; -fx-text-fill: white; -fx-border-radius: 5; -fx-border-width: 2; -fx-border-color: #24a0ed;" text="Sign-Up">
    <font>
        <Font name="SansSerif Regular" size="15.0" />
    </font>
</Button>
<Button layoutX="230.0" layoutY="660.0" mnemonicParsing="false" style="-fx-background-color: transparent; -fx-text-fill: #A9A9A9;" text="Terms and Conditions" underline="true">
    <font>
        <Font size="15.0" />
    </font>
</Button>
<!-- The End of Signup form -->
```

##### Footer
In the footer section, you will add your copyright. Drag and drop a label control into the bottom section of your main BorderPane.

This label will have the following property attributes: `Text`: _Shop © 2021_.

Set the following styles: `-fx-text-fill`: _#B9a9a9_.

It will have the following layouts: `Pref Width`: 107, `Pref Height`: 16.

The FXML Code will look as shown below:

```xml
<!-- Beginning of the bottom part of the Borderpane -->
<bottom>

    <!-- Simple Copyright -->
    <Label prefHeight="16.0" prefWidth="107.0" style="-fx-text-fill: #B9a9a9;" text="Shop © 2021" BorderPane.alignment="CENTER" />
</bottom>
<!-- Ending of the bottom part of the Borderpane -->
```

> **NOTE**: Paths may vary depending on your project name and machine. If controls and other elements have been added using code, make sure to import them into the project.

### Run the application
Run the application as before using the `Shift + F10` shortcut. The results are as shown below:

![Final Program](/engineering-education/design-a-sign-up-and-login-gui-using-javafx/final-program.png)

Find the source code and files in [this](https://github.com/RisoriTofa/A-JavaFX-Login-and-Sign-Up-Form) repository.

### Conclusion
In this guide, you have learned:
- What is JavaFX
- JavaFX libraries
- Setting up a simple JavaFX project
- Designing the Login and Sign-Up form
- Running the application

### Further your understanding
- Explore the JavaFX community found [here](https://openjfx.io/). This site is for some of the latest JavaFX projects. These are interesting and promising due to their trends.
- Try using some JavaFX libraries for other projects. Such include scientific calculators, modelers, and games.

### References
- [JavaFX libraries](https://www.educba.com/javafx-libraries/)
- [JavaFX website](https://openjfx.io/)

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)
