---
layout: engineering-education
status: publish
published: true
url: /build-your-first-spark-web-application/
title: How to Build a Simple Spark Web Application
description: This article will explain how to build a web application using the Spark Java web framework and IntelliJ.
author: moses-mwangi
date: 2022-04-27T00:00:00-12:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-your-first-spark-web-application/hero.jpg
    alt: Build Your First Spark Web Application
---
Spark is a lightweight web framework that allows developers to create web applications with robust Java back-ends. 
<!--more-->
Spark is responsible for creating user interfaces for applications that can be viewed in a web browser. It also helps in handling interactions between user interfaces and the back-end logic.

### Goal
To get a general sense of how Spark works, we will create a website that displays a simple letter to our friends.

### Prerequisites
To understand the content of this article, you should have the following:
- Some knowledge of Java programming.
- [IntelliJ](https://www.jetbrains.com/help/idea/installation-guide.html) installed.

### Table of contents
- [Project setup](#project-setup)
- [Creating a web application](#creating-a-web-application)
- [Spark Routes](#spark-routes)
- [Integrating HTML into Spark](#integrating-html-into-spark)
- [Adding Resources to Spark](#adding-resources-to-spark)
- [Creating a Root Path](#creating-a-root-path)
- [Conclusion](#conclusion)

### Project setup
First, create a new project in IntelliJ, choose *Maven*, and click *next*:

![maven](/engineering-education/build-your-first-spark-web-application/maven.png)

Use "friendly-letter" for the `GroupId` as well as the `ArtifactId`, then click *finish*:

![projectsetup](/engineering-education/build-your-first-spark-web-application/projectsetup.png)

After the project is done loading, open the `pom.xml` file, and add the following lines:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.section</groupId>
    <artifactId>SparkTutorial</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>1.7.21</version>
        </dependency>

        <dependency>
            <groupId>com.sparkjava</groupId>
            <artifactId>spark-core</artifactId>
            <version>2.9.3</version>
        </dependency>
    </dependencies>
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>
</project>
```

Great! The compiler may prompt you to download the files that make up `spark-core`, `spark-template-handlebars`, and `slf4j-simple` (a logging tool that provides better error messaging). 

You can also do this manually by navigating to [SparkJava](https://search.maven.org/artifact/com.sparkjava/spark-core/2.9.3/jar) and downloading the `spark-core-2.9.3.jar` file. 

After the download is complete, add the file to the project dependencies. To do this, launch IntelliJ then navigate to **File**-> **Project Structure** -> **Modules** -> **Dependencies**.

Click on the *add (+)* button and select the file you downloaded. Finally, click the *OK* button:

![add depedency](/engineering-education/build-your-first-spark-web-application/add-dependency.png)

For more information on adding a dependency, see [this guide](https://www.jetbrains.com/help/idea/working-with-module-dependencies.html#remove-dependency).

Next, create a `Main.java` file by right-clicking on the `src/main/java` directory and adding a Java class called `Main.java`.

### Creating a web application
Let's set up our `Main.java` file. With Spark, `Main.java` will be responsible for our user interfaces, but the code will look different from a console program. 

We'll need to use the format and methods expected by the Spark framework.

Let's add the following code to `Main.java`:

```java
import static spark.Spark.*;

public class Main {
  public static void main(String[] args) {
    get("/hello", (request, response) -> "Hello World!");
  }
}
```

> Note: If you see an error message that reads: `Cannot resolve symbol 'spark'` make sure you have included Spark dependencies in your `pom.xml` file.

The line: `import static spark.Spark.*` imports *Spark* into our application.

### Spark routes
Let's take a look at the line below:

```java
get("/hello", (request, response) -> "Hello Friend!");
```

The line above creates a `/hello` route that returns a string. Routes are the essential building elements of a Spark application. A route is comprised of three individual pieces:

- A **verb** depicting what the route is doing. In our route, this verb is `get()`. The `get()` method represents a HTTP GET request. A HTTP GET request is responsible for getting information from a web server to return to the client.

- A **path**. It represents what part of the web application the verb is interacting with. In the case of the example above, we see: `get("/hello ", request, response)`. This line means that we're executing an HTTP GET request to our server to retrieve the content for the`/hello` route of our site.

- A **callback**. That is the `(request, response) -> ...` portion. This is the code executed when you hit this route. When a client requests the specific web page's resources located at `/hello`, the server will return the string `"Hello Friend!"` back to the client in the HTTP response body.

When our browser makes an HTTP request to our Spark application, Spark matches it to the first route in the `Main.java` file that matches the request.

Please, note that if you have multiple similar routes, Spark will map the request to the first route matching the request. We probably won't encounter this until our applications get much larger, but keep this in mind for the future.

### Launching Spark applications
Here, we'll launch our application. To do this, we'll click the *run button* in the top right corner of the IntelliJ window.

The first time we run this project, it may take a while to launch it. The project needs to download and install all dependencies from the `pom.xml` file, which can take additional time. After downloading dependencies during our first run, subsequent builds will be much faster.

After building, a message informs us that our Spark application has been successfully launched, or "ignited" in Spark's terminology, and it's 'located' at <http://0.0.0.0:4567>. We can visit <http://localhost:4567/hello> in the browser to see our "Hello World!" message:

![hello world](/engineering-education/build-your-first-spark-web-application/hello-world.png)

Congratulations, you just wrote your first Spark application!

### Integrating HTML into Spark
Let's write a letter using HTML:

```java
import static spark.Spark.*;

public class Main {
  public static void main(String[] args) {
    get("/hello", (request, response) ->
        "<!DOCTYPE html>" +
         "<html>" +
         "<head>" +
           "<title>Hello Section Engineering!</title>" +
           "<link rel='stylesheet' + href='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'>" +
         "</head>" +
        "<body>" +
           "<h1>Hello Section Engineering!</h1>" +
           "<p>Dear Friend,</p>" +
           "<p>How are you? I'm vacationing in Nyeri while I learn programming! </p>" +
           "<p>Friend, you would not believe how cold it is here. I should have gone to Kenya instead.</p>" +
           "<p>But I like programming a lot, so I've got that going for me. </p>" +
           "<p>Looking forward to seeing you soon. I'll bring you back a surprise. </p>" +
           "<p>Cheers,</p>" +
           "<p>Travel Enthusiast Moses</p>" +
         "</body>" +
       "</html>"
    );
  }
}
```

When adding HTML to a route like this, it needs to be one long String. However, to make it read like an HTML file, we concatenate multiple strings across multiple lines with the `+` operator.

### Updating a Spark applications during development
After making changes, we need to recompile and restart the server to ensure the new content is present in the compiled code that Spark is referencing.

Let's do that now.

Either select *Run > Stop 'Main'* from the main menu or hit the red square in the top right corner or bottom left corner. If you look at the menu in the bottom left corner, you can also choose *Rerun Main*.

Refresh <http://localhost:4567/hello> in the browser to see our updated HTML letter:

![letter](/engineering-education/build-your-first-spark-web-application/letter.png)

### Adding resources to Spark
At this point, our website is still plain, even with the added HTML. Let's add images to spruce things up!

First, we'll need to create a directory to house our images and other resources.

In the` src/main` folder, create another subdirectory called `resources` (If IntelliJ did not generate it). This folder will store any non-Java files required to run your application, such as CSS, HTML, images, videos, music files, and others.

In `resources`, create another folder called `public`. The `public` folder is where we'll place content that should be visible to the outside world. That is, things that users should be able to see. Like the images we want to display in our app.

Finally, in the `public` folder, create an `images` folder. This folder is where our images will reside.

Once complete, your project directory should look like this:

```
SparkTutorial
├── pom.xml
└── src
    └── main
        ├── java
        │   └── Main.java
        └── resources
            └── public
                └── images
```

#### Adding images
Next, let's add some image files to our new `SparkTutorial/src/main/resources/public/images` directory. [Unsplash](https://unsplash.com/) is an excellent source of images. Pick out a few images to use in your project.

The project directory should now look something like this:

```
SparkTutorial
├── pom.xml
└── src
    └── main
        ├── java
        │   └── Main.java
        └── resources
            └── public
                └── images
                    ├── image1.jpg
                    └── image2.jpg
```

#### Using image resources
Now, let's use these new images in our application! We'll create another new route in `Main.java` to do this. 

We can create a new page in our app by adding a new "entry" with another instance of Spark's `get()` method:

```java
import static spark.Spark.*;

public class Main {
  public static void main(String[] args) {
    get("/hello", (request, response) ->
       "<!DOCTYPE html>" +
        "<html>" +
        "<head>" +
          "<title>Hello Section Engineering!</title>" +
          "<link rel='stylesheet' + href='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'>" +
        "</head>" +
       "<body>" +
          "<h1>Hello Section Engineering!</h1>" +
           "<p>Dear Friend,</p>" +
           "<p>How are you? I'm vacationing in Nyeri while I learn programming! </p>" +
           "<p>Friend, you would not believe how cold it is here. I should have gone to Kenya instead.</p>" +
           "<p>But I like programming a lot, so I've got that going for me. </p>" +
           "<p>Looking forward to seeing you soon. I'll bring you back a surprise. </p>" +
           "<p>Cheers,</p>" +
           "<p>Travel Enthusiast Moses</p>" +
        "</body>" +
      "</html>"
   );

   get("/photos", (request, response) ->
    "<!DOCTYPE html>" +
      "<html>" +
      "<head>" +
        "<title>Hello Friend!</title>" +
        "<link rel='stylesheet'  href='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'>" +
      "</head>" +
      "<body>" +
       "<h1>Favorite Traveling Photos</h1>" +
          "<ul>" +
            "<li><img src='/images/image1.jpg' alt='A photo of a Golden Retriever.'/></li>" + "<li><img src='/images/image2.jpg' alt='A photo of a white dog.'/></li>" + 
          "</ul>" + 
        "</body>" + 
      "</html>" );
  } 
} 
```

If your image files are named something different, make sure the file path in your `<img>` tags reflects your unique images. 

If we quit the server and re-launch the application, we should now visit <http://localhost:4567/photos>. Our web app now has multiple pages.

### Specifying static file locations
As you might have noted, the images aren't showing up!

![images](/engineering-education/build-your-first-spark-web-application/images.png)

This is because we need to explicitly instruct Spark to look in the `public` directory to locate all static files (like our images). 

We can do this by including the line `staticFileLocation("/public");` in the `main()` method. This function will let Spark know it should always look for additional resource links in the `/public` directory.

We'll add this line to the very top of the `main()` method:

```java
import static spark.Spark.*;

public class Main {
  public static void main(String[] args) {
    staticFileLocation("/public");

    get("/hello", (request, response) ->
        //code here
    );
  }
}
```

Now, if we re-launch the application, we should be able to navigate to <http://localhost:4567/photos> and see our images.

### Creating a root path
So far, we have two routes that represent two different pages in our web application. But what if we wanted our `/hello` page to be the 'home page' for our website? 

After all, we don't want our users to have to manually type `/hello` at the end of our website's URL to reach the homepage; they should arrive there automatically whenever they visit our site.

Let's create a root path. A *root path* sometimes referred to as a home route, is simply the route or area of your application that functions as the homepage.

We'll do this by changing the first argument of the first `get()` method, like this:

```java
import static spark.Spark.*;

public class Main {
  public static void main(String[] args) {
    staticFileLocation("/public");

    get("/", (request, response) ->
        //code here
       "<p><a href='/photos'>Check out my favorite photos here.</a></p>" +
     //code here
    );

    get("/photos", (request, response) ->
    //code here
    );

  }
}
```

All we did was change `/hello` to `/`. We also added the line `"<p><a href='/photos' >Check out my favorite photos here.</a></p>"` that create a link from this page to our photos page.

Notice we used `/photos` when creating the link. When creating links in Spark, we only need to refer to the URL path provided in the route. 

Our favorite photos entry in `Main.java` begins with `get("/photos", (request, response) ->`, so to link to this page we only use the `/photos` path.

You can check to make sure this worked by quitting and recompiling/re-launching the application, then visiting <http://localhost:4567>.

![Final-application](/engineering-education/build-your-first-spark-web-application/final-application.png)

The code used in this tutorial can be found on my [GitHub Repo](https://github.com/mosesmwangi442/first-spark-application).

### Conclusion
The goal of this tutorial was to show you how to put up a real-world web app using a variety of different Spark components.

We've covered the basics of Spark, how to create a web app, and how to use the various components of Spark. We've also covered some of the more advanced features of Spark, such as how to use static files, and how to create a root path.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)