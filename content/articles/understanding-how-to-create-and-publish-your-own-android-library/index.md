---
layout: engineering-education
status: publish
published: true
url: /how-to-create-and-publish-your-own-android-library/
title: How to Create and Publish your own Android Library
description: This tutorial will take the reader through the process of creating and publishing an Android Library. A library is a collection of classes that can be used by Android applications as dependencies.
author: joel-kanyi
date: 2021-11-12T00:00:00-04:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-create-and-publish-your-own-android-library/hero.png
    alt: How to Create and Publish your own Android Library hero image
---

Every Android developer considers how they can reuse their code rather than rewriting it from scratch. By developing a library, developers also contribute to the open-source ecosystem by having their code used by other developers.
<!--more-->
No developer can work without libraries because they are such important components of the development process. They allow you to speed up your development by leveraging a pre-built solution rather than creating all of the code yourself.

### Prerequisites
To follow along make sure you have the following:
- Android Studio installed.
- Solid understanding of how to create and run Android apps.
- A basic understanding of the [Kotlin](https://kotlinlang.org/) programming language. 

### What is an Android Library?
A library is a collection of classes that can be used by Android applications as dependencies. Libraries are often used to provide common functionalities that can be reused by other applications.

The structure of an Android library is the same as that of an Android app module. Among other things, the library can include source code, resource files, and an Android manifest. Instead of an APK that runs on a device, it compiles into an Android Archive (AAR) file that can be used as a dependency for an Android app module.

### Step 1 - Creating a project
Create an empty Android Studio project as illustrated below: 

![New Project](/engineering-education/how-to-create-and-publish-your-own-android-library/create_project.png)

### Step 2 - Create Library Module
In this step, in your Android Studio:
Switch to `project` and right-click on your project name to create a new module: 

![Switch Module](/engineering-education/how-to-create-and-publish-your-own-android-library/switch_module.png)

A module creates independence, whereby we can specify our dependencies for our library and any other resources which are all independent of the app module.

When creating a library, you can either choose `Android Library` or `Java or Kotlin Library`

- Android Library - can contain Android dependencies.
- Java or Kotlin Library - A library that only needs Kotlin or Java code, it does not need any dependency.

![New Module](/engineering-education/how-to-create-and-publish-your-own-android-library/new_module.png)

After creating our module, a gradle file for our module is created.

In that gradle file, we can remove the auto added dependencies because we don't need them for now. In other cases, your library may depend on some libraries, so you need to include them in the module's gradle file.

### Step 3 - Create a Class or file containing your Library logic
In this step, create a class or a file that contains the code that you want to share as a library.

In other cases, your library may be adding more features to the default Android classes, creating a custom view or adding functions with useful code that you want to share.

In our case, inside the newly created module, we'll create a class that contains some functions to list `Kenyan counties`. 

```kotlin
class Kenya {
    companion object {
        private val counties: HashMap<String, String> = hashMapOf(
            "Mombasa" to "001",
            "Kwale" to "002",
            "Kilifi" to "003",
            "Tana River" to "004",
            "Lamu" to "005",
            "Taita Taveta" to "006"
        )

        fun getCounties(): HashMap<String, String> {
            return counties
        }

        fun getCountyName(code: String): String {
            var county: String? = null
            counties.forEach {
                if (it.value == code) {
                    county = it.key
                }
            }
            return county ?: "not found"
        }

        fun getCountyCode(name: String): String {
            var code: String? = null
            counties.forEach {
                if ((it.key).lowercase() == name.lowercase()) {
                    code = it.value
                }
            }
            return code ?: "not found"
        }
    }
}  
```

### Step 3 - Using the Library locally
If you want to use the library locally in your project (where you have created the library), include this in your app-level `build.gradle`:

```gradle
implementation project(':MODULE_NAME')
```

You should replace the name in the parenthesis with the name of the module that you created and it should be prepended with a colon.

After a successful sync, try using the library on your project Activities or Fragments, it should work as expected.

### Step 4 - Publishing the library
For now, the library can only be used locally in our project. If we want to share the library so that other developers can use it on their projects, we have to publish it to a remote repository.

You can publish libraries to either:
- [Jitpack](https://jitpack.io/)
- [Maven Central](https://search.maven.org/)

For this tutorial, we will publish our library to Jitpack which requires us to push our code to Github. There is an amazing plugin that can  make it easier to push our library on Github.

Add this plugin to your library module gradle file:

```gradle
plugins {
    ...
    id 'maven-publish'
}
```

Let us configure the plugin by pasting the following inside the library module gradle file and modifying it correctly:
- Replace the `groupId` with your Github username.
- change the `artifactId` with the name that you want your project to be called.
- You can also modify the `version`.

```gradle
afterEvaluate {
    publishing {
        publications {
            release(MavenPublication) {
                from components.release

                groupId = 'com.github.JoelKanyi'
                artifactId = 'kenyan-counties'
                version = '1.0.0'
            }
        }
    }  
}
```

#### Adding a configuration file for Jitpack
Switch from Android to Project mode and, in your root folder, create a file called `jitpack.yml`.

![Jitpack File](/engineering-education/how-to-create-and-publish-your-own-android-library/jitpack_file.png)

This file specifies that Jitpack should use `openjdk11` to build our library.

```bash
jdk:
  - openjdk11
before_install:
  - ./scripts/prepareJitpackEnvironment.sh
```

### Pushing our code to Github
In this step, commit your work using git, then `Share` the Project to Github.

![Push Github](/engineering-education/how-to-create-and-publish-your-own-android-library/share_project_github.png)

> Make sure the project is public and note that the name that you'll pass while sharing the project will be used in the library dependency link.

#### Creating a release
To make our library functional, we need to create a release on Github. Go to your newly created repository and on your right side, click on `create a new release`. 

Releases will determine the version of our library.

Click on `Choose a tag` and enter your initial version of the library and click `Enter`. Also, enter the title of your release and a description of the library. Finally, click on `Publish release` to publish.

![Release](/engineering-education/how-to-create-and-publish-your-own-android-library/release.png)

#### Finalizing with Jitpack.io
First of all, copy the URL of your repository - for this case, my URL is `https://github.com/JoelKanyi/KenyanCounties`.

Go to [Jitpack](https://search.maven.org/) and search for your `repository` URL.

If the lookup is successful, [Jitpack](https://search.maven.org/) will display a version of your library. You can go ahead and click `Get it`. Wait until the logs finish running to see if your code has any errors.

If all goes well and the logs display a blue file icon, congratulations, the library has been published to [Jitpack](https://search.maven.org/).

If you scroll down the page for Jitpack, you will see some information on how we can include the library in other projects.

![Share Library](/engineering-education/how-to-create-and-publish-your-own-android-library/share.png)

That is it, you can go ahead and test the library in your project.

### Conclusion
In this tutorial, we have learned what a library is, the steps followed in creating a library, and finally, we have seen how to publish a library to [Jitpack](https://search.maven.org/). Keep exploring and creating amazing Android libraries. You can check out the whole project here [Kenyan Counties](https://github.com/JoelKanyi/KenyanCounties).

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
