---
layout: engineering-education
status: publish
published: true
url: /building-a-webpage-ui-with-compose-web/
title: Building a Webpage UI with Compose Web
description: This tutorial will take the reader through the process of building a webpage UI with Compose Web.
author: robert-muriithi
date: 2022-04-19T00:00:00-09:56
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-webpage-ui-with-compose-web/hero.png
    alt: Building a Webpage UI with Compose Web Hero Image
---
Compose web has enabled accelerated development of Web UI using the stable DOM API. Furthermore, with lots of features like Kotlin/JS API support, built-in CSS-in-JS support, SVGs support, etc., you can now build dynamic webpages using Compose.
<!--more-->
This is advantageous because it can run on all browsers.

In this tutorial, we will learn how we can create a simple web UI with Compose for the web.
Let's get started :)

### Prerequisites
To follow along with this tutorial, you will need to:
- Have installed the latest version of [IntelliJ IDEA](https://www.jetbrains.com/idea/download/#section=windows).
- Have an understanding of the [Kotlin](https://kotlinlang.org/) programming language.
- Have some knowledge in [CSS](https://www.w3schools.com/css/)
- Install [JDK 11](https://www.oracle.com/java/technologies/downloads/) or higher.

### Goals
By the end of this tutorial, you will have an understanding of:
- Getting Started with Compose Web
- Building Web UI
- Handling Events
- Controlled and uncontrolled inputs
- Using Domain-Specific Language(DSL) style in Compose

### Getting started with Compose web
Compose web is part of the Compose Multi-platform, which was recently released. The Compose multi-platform has simplified development since it allows code exchange between Web, Desktop, and Android applications.

Using Compose web increases the performance of the web applications, reduces memory usage, and makes it easier for developers to iterate on features.

Let's see how we can create a Compose Web project using the IntelliJ IDEA.

### Step 1: Creating a Compose Web project
Open the IntelliJ IDEA and click on `New` then `Project` to create a project. From the menu, head down to `Gradle` and check the `Kotlin\Multiplatform` checkbox. Also, tick on `Kotlin DSL build script` and then click next. Give your project a suitable name and hit finish. Wait for Gradle build to finish.

![Create project](/engineering-education/building-a-webpage-ui-with-compose-web/create-project.png)

Also, if you don't want to create a new project, you can use the template [here](https://github.com/JetBrains/compose-jb/tree/master/templates/web-template).

### Step 2: Update settings.gradle.kts file
Paste the following in `settings.gradle.kts`:

```bash
pluginManagement {
    repositories {
        gradlePluginPortal()
        maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
    }
}
```

![settings.gradle.kts](/engineering-education/building-a-webpage-ui-with-compose-web/settings-gradle-kts.png)

### Step 3: Update build.gradle.kts file
Open `build.gradle.kts` on the left pane and paste the following code:

```bash
// Add compose gradle plugin
plugins {
    kotlin("multiplatform") version "1.6.10"
    id("org.jetbrains.compose") version "1.1.0"
}

// Add maven repositories
repositories {
    mavenCentral()
    maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
    google()
}

// Enable JS(IR) target and add dependencies
kotlin {
    js(IR) {
        browser()
        binaries.executable()
    }
    sourceSets {
        val jsMain by getting {
            dependencies {
                implementation(compose.web.core)
                implementation(compose.runtime)
            }
        }
    }
}
```

This appears as follows:

![build.gradle.kts](/engineering-education/building-a-webpage-ui-with-compose-web/build-gradle-kts-first.png)

![build.gradle.kts](/engineering-education/building-a-webpage-ui-with-compose-web/build-gradle-kts-second.png)

### Step 4: Add the following directories to the project

```txt
src/jsMain/kotlin
```

### Building Web UI components
First, create `Main.kt` inside the kotlin folder. The `Main.kt` file will be used to deploy our logic and handle events.

Let's understand what we place in `Main.kt`.

#### Starting point
Before working with Compose web, you'll need to have an HTML base station referred to as a node. This serves as the composition's root. It is from the node that Compose will handle its DOM tree.

```kotlin
renderComposable(rootElementId = "root"){
    ...
}
```

#### HTML tags
Compose's DOM DSL Composable isn't yet supported for all HTML tags on the web. However, we can directly access the most often used HTML tags.

Let's use a `Div` for an illustration:

```kotlin
fun main() {
    renderComposable(rootElementId = "root") {
        Div(attrs = { style { backgroundColor(blue) } }) {
            Span(attrs = { style { backgroundColor(blue) } }
            ) {
                //this is where the body of the `Div` container falls in
                Text("This is my first text in compose for web")
            }
        }
    }
}
```

> NOTE: Most HTML tags of this nature will use this signature.

Let us look at another example. We will use `Input` to show some additional signatures of such elements:

```kotlin
fun main() {
    renderComposable(rootElementId = "root") {
        Div(attrs = { style { backgroundColor(blue) } }) {
            Input(type = InputType.Submit)
            {
                //do something
            }
        }
    }
}
```

You can use elements like `Span` as containers to wrap `Text` to apply styles:

```kotlin
fun main() {
    renderComposable(rootElementId = "root") {
        Span(attrs = {style { backgroundColor(blue) }}
        ) {
            Text("This is my first text in compose for web")
        }
    }
}
```

In HTML, this corresponds to:

```html
<span style="background-color: blue;">This is my first text in compose for web</span>
```

#### Common Compose attributes

Let us have a look at some attributes that can be used with compose:

```kotlin
attrs = {
    id("elementId")
    classes("class1", "class2")
    title("Compose Web")
    lang("en")
    contentEditable(true)
}
```

To specify links using `A`, we do as follows:

```kotlin
A(
    attrs = {
        href("https://localhost:8080/next_page")
        target(ATarget.Blank)
        rel(ARel.Next)
        hreflang("en")
    }
) {
    Text("Some text here")
}
```

The `Main.kt` sample is as follows:

```kotlin
fun main() {
    renderComposable(rootElementId = "root") {
        Div({ style { padding(25.px) } }) {
            Span(style { color(Color.blue) }) {
                Text("Blue text")
            }
        }
    }
}
```

### Handling events
An event is a signal received by a program due to user actions. Event handling is the mechanism by which these events control what should happen after they occur. For example, when a user clicks a mouse, an action is triggered, and the program responds.

Handling `Button` clicks can be done as follows:

```kotlin
fun main() {
    renderComposable(rootElementId = "root") {
        Button(attrs = { onClick { print("You clicked the button") } }) {
            Text("Click me")
        }
    }
}
```

> Note: We use `onClick` to handle events on a button.

To handle `onInput` events, we do as follows:

```kotlin
val text = remember { mutableStateOf("") }
TextArea(
    value = text.value,
    attrs = {
        onInput { it->
            text.value = it.value
        }
    }
)
```

This will listen for inputs made by a user in a `TextArea`.

You can use `addEventListener` with the name of the event for those events with no configuration function in the `attrs` block:

```kotlin
Form(attrs = { form ->
    this.addEventListener("submit") {
        form.preventDefault()
    }
})
```

### Controlled and uncontrolled inputs
The main difference between controlled and uncontrolled inputs is that controlled inputs get inputs from a single source of truth. Furthermore, these inputs are optional, which we can focus on but not change.

For uncontrolled inputs, the browser handles the user inputs. Invoking `value()` is a must to make it "controlled":

```kotlin
// Controlled
Input(type = InputType.Text) {
    value("Value One") // required
    onInput { event -> print(event.value) }
}

// Uncontrolled
Input(type = InputType.Text) {
    defaultValue("Value Two") // optional
    onInput { event -> print(event.value) }
}
```

Both controlled and uncontrolled inputs receive an `event` inside the `onInput{}`.For controlled inputs, if you type anything, it won't be shown. Instead, only the "Value Two" will be shown.

For uncontrolled inputs, typing a value will make corresponding changes.

We can conclude that controlled input content can only be modified by the external state, while uncontrolled input values can change independently.

### Style DSL
In this section, we'll look at how to style UI components. For styling these components, we'll use the style Domain-Specific Language.

Style sheets, which you can use in Kotlin code to specify CSS rules, are unaffected by DSL. Depending on the nature of your application, it can also be used to alter styling.

We can style the components using `inline` styling or `external stylesheets` as done in HTML. 
In HTML, `inline` styling is done as follows:

```html
<div> <h1 style = "color:red;">This is a heading</h2> </div>
```

In Compose web, we can do it as follows:

```kotlin
fun main() {
    renderComposable(rootElementId = "root") {
        Div (attrs = {
            style {
                display(DisplayStyle.Block)
                fontStyle("bold")
                fontSize(3.em)
                fontFamily("Arial, Helvetica, sans-serif" )
                border(3.em)
            }}){
                Text("This is an example of a Heading ")
        }

    }
}
```

Alternatively, you can use `stylesheets`. The stylesheet that we define will contain the styling rules.

Here is a simple example:

```kotlin
object AppStylesheet : StyleSheet() {
    val box by style { 
        display(DisplayStyle.Block)
        margin(20.px, 10.px, 20.px, 10.px)
        padding(10.px, 10.px, 10.px, 10.px)
        boxSizing("border-box")
        property("font-family", "Arial, Helvetica, sans-serif")
    }
}

@Composable
fun holder(content: @Composable () -> Unit) {
    Div(
        attrs = { classes(AppStylesheet.box) }
    ) {
        content()
    }
}
```

Make sure you reference your `stylesheet`. This is done in the `Main.kt` as follows:

```kotlin
fun main() {
    renderComposable(rootElementId = "root") {
        Style(AppStylesheet)
        holder {
            // The rest of code here
        }
    }
}
```

You can read more about selectors [here](https://github.com/JetBrains/compose-jb/tree/master/tutorials/Web/Style_Dsl#selectors-examples). Also, for more understanding about styling in Compose Web, you can get samples from [this guide](https://github.com/JetBrains/compose-jb/tree/master/examples/web-landing/src/jsMain/kotlin/com/sample).

### Running the web on the browser
You can run the project using commands on the terminal or launch it from the IDE. To use the commands, open the terminal and type the following commands:

```bash
./gradlew jsBrowserRun
```

You can add `--continuous` to continuously compile the program instead of running it every time:

```bash
./gradlew jsBrowserRun --continuous
```

To run it on the IDE, click `gradle` on the rightmost pane and double click on `jsBrowserRun`.

![Run project](/engineering-education/building-a-webpage-ui-with-compose-web/run-project.png)

The web page will open in the browser at `localhost:8080`.

### Conclusion
Like HTML, you can use Kotlin Multi-platform to construct a program that runs both on browsers and desktops. Styling is done in almost the same manner but way much easier. With Compose Web, you can build web UI rapidly and handle events more efficiently using the Kotlin language.

Compose Multi-platform is at its early age and stable now. Read more of this from [here](https://blog.jetbrains.com/kotlin/2021/12/compose-multiplatform-1-0-is-going-live/). 

Keep composing :)

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
