### Understanding How to Create and Publish Your Own Android Library
Every Android developer considers how they may reuse their code rather than rewriting it from scratch. By developing a library, developers also contribute to the open-source ecosystem by having their code used by other developers.

No developer can envision working without libraries because they are such an important component of the development process.
They allow you to speed up your development by orders of magnitude by allowing you to leverage a pre-built solution rather than creating all of the code yourself. 

### Prerequisites
To follow along: 
- Make sure you have the following Android Studio installed.
- Solid understanding of how to create and run Android apps.
- A basic understanding of the [Kotlin](https://kotlinlang.org/) programming language is required. 

### What is an Android Library
The structure of an Android library is the same as that of an Android app module. Among other things, the library can include source code, resource files, and an Android manifest. Instead of an APK that runs on a device, it compiles into an Android Archive (AAR) file that you may use as a dependency for an Android app module. 

### Step 1 - Creating Project
Create an empty Android Studio project at this stage, as illustrated below: 

[!New Project](engineering-education/understanding-how-to-create-and-publish-your-own-android-library/create_project.png)

### Step 2 - Create Library Module
- In this step, in your Android Studio: 
Switch to Project and right-click on your Project name to create a new module: 

[!Switch Module](engineering-education/understanding-how-to-create-and-publish-your-own-android-library/switch_module.png)

A module creates independence, whereby we can specify our dependencies for our library and any other resources which are all independent of the app module.

When creating a library, you can either choose `Android Library` or `Java or Kotlin Library`

- Android Library - can contain Android dependencies
- Java or Kotlin Library - A library that only needs Kotlin or Java code, it does not need any dependency.

[!New Module](engineering-education/understanding-how-to-create-and-publish-your-own-android-library/new_module.png)

After creating our module, a gradle file for our module is created. 
In that gradle file, we can remove the dependencies that have come by default because we don't need them for now. In other cases, your library may be dependent on some libraries, so you need to include them in the module's gradle file.

### Step 3 - Create a Class or File Containing Your Library Logic
In this step, create a class or a file that contains the code that you want to share as a library.
In other cases, your library may be adding more code to the default Android Views, it may be creating a custom view or it may be having some functions that have some useful codes that you want to share.

In our case, inside the newly created module, I have created a class that contains some functions to list Kenyan counties. 

> I have truncated some functions, otherwise, the article will be very long.

 ```Kotlin
class Kenya {
    companion object {

        private val counties = arrayListOf("Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta", "Garissa",...)

        private val countyCodes = arrayListOf("001","002","003","004","005", "006", "007",...)

        fun counties(): List<String> {
            return counties
        }

        fun countyCodes(): List<String> {
            return countyCodes
        }

        fun getCountyCode(county: String): String {
            return when (county) {
                counties[0] -> {
                    return countyCodes[0]
                }
                counties[1] -> {
                    return countyCodes[1]
                }
                counties[2] -> {
                    return countyCodes[2]
                }

                ...
            }
        }

        fun getCountyName(countyCode: String): String {
            return when (countyCode) {
                countyCodes[0] -> {
                    return counties[0]
                }
                countyCodes[1] -> {
                    return counties[1]
                }
                countyCodes[2] -> {
                    return counties[2]
                }

                ...
            }
        }

         fun countiesWithCodes(): List<County> {
            return arrayListOf(
                County(counties[0], countyCodes[0]),
                County(counties[1], countyCodes[1]),
                County(counties[2], countyCodes[2]),
                
                ...
            )
         }
 ```

### Step 3 - Using the Library Locally
If you want to use the library locally in your project (Where you have created the library)

Include this in your app-level `build.gradle`:

 `implementation project(':MODULE_NAME')`

You should replace the name in the parenthesis with the name of the module that you created and it should be prepended with a colon.

After a successful sync, try using the Library on your project Activities or Fragments, it should work well.

### Step 4 - Publishing the Library
For now, the library can only be used locally in our project, if we want to share the library so that other developers can use it on their projects, we have to publish it to a remote repository.

You can publish libraries to either:
 - [Jitpack](https://jitpack.io/)
 - [Maven Central](https://search.maven.org/)

For this tutorial, we will publish our library to Jitpack which requires us to push our code to Github. There is an amazing plugin that can simplify and make our lives easier when pushing our library code to Github.

Add this plugin to your library module gradle file. 
 
```Gradle
plugins {
    ...
    id 'maven-publish'
}
```

Let us configure the plugin by pasting this file inside the library module gradle and modifying it correctly:
 - Replace the `groupId` with your Github username.
 - change the `artifactId` with the name that you want your project to be called.
 - You can also modify the `version`

```Gradle
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

#### Adding a Configuration file for Jitpack
Switch from Android to Project Mode and, in your root folder, create a file called `jitpack.yml`.

[!Jitpack File](engineering-education/understanding-how-to-create-and-publish-your-own-android-library/jitpack_file.png)

This file will specify that Jitpack should use `openjdk11` to build our library.

```
jdk:
  - openjdk11
before_install:
  - ./scripts/prepareJitpackEnvironment.sh
```

### Pushing our code to Github
In this step, commit your work using git, then `Share` the Project to Github.

[!Push Github](engineering-education/understanding-how-to-create-and-publish-your-own-android-library/share_project_github.png)

> Make sure the project is public and note that the name that you'll pass there while sharing the project will be used in the library dependency link.

#### Creating a release
To make our library functional, we need to create a release on Github. Go to your newly created repository and on your right side, click on `create a new release`. Releases will determine the version of our library. 

Click on `Choose a tag` and enter your initial version of the library and click Enter. Also, enter the title of your release and a description of the library. Finally, click on `Publish release` to publish.

[!Release](engineering-education/understanding-how-to-create-and-publish-your-own-android-library/release.png)

#### Finalizing with Jitpack.io
First of all, copy the URL of your repository - for this case, my URL is `https://github.com/JoelKanyi/KenyanCounties`

Go to [Jitpack](https://search.maven.org/) and search for your `repository` URL.

If the lookup is successful, [Jitpack](https://search.maven.org/) will display a version of your library. You can go ahead and click "Get it". Wait until the logs finish running to see if your code has any errors. If all goes well and the logs display a blue file icon; congratulations, the library has been published to [Jitpack](https://search.maven.org/).

If you scroll down the page for Jitpack, you will see some information on how we can include the library in other projects.

[!Share Library](engineering-education/understanding-how-to-create-and-publish-your-own-android-library/share.png)

That is it, you can go ahead and test the library in your project.

### Conclusion
In this tutorial, we have learned about what a library is, the steps followed in creating a library, and finally, we have seen how to publish a library to [Jitpack](https://search.maven.org/). Keep exploring and creating amazing Android libraries. You can check out the whole project here [KenyaCounties](https://github.com/JoelKanyi/KenyanCounties).

Happy coding!

### References: 
[Android Documention](https://developer.android.com/studio/projects/android-library)
