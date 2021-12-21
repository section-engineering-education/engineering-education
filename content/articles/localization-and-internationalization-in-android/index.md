---
layout: engineering-education
status: publish
published: true
url: /localization-and-internationalization-in-android/
title: Localization and internationalization in Android
description: This article will go through the Android localization process in great depth and how to apply best practices to your translation efforts.
author: vivian-odhiambo
date: 2021-12-18T00:00:00-12:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/localization-and-internationalization-in-android/hero.jpg
    alt: Localization and internationalization in Android Hero Image
---
### Introduction
Localization is the process of modeling applications to a specific locale, market, or device. Localization is said to be translation.
<!--more-->
Globalization is the process of building and developing a software product that functions in multiple cultures and locales.

Internationalization is the process of localizing and globalizing your application.

### Table of contents
 - [Introduction](#introduction)
 - [Prerequisites](#prerequisites)
 - [Goals](#goals)
 - [Configuration Types and Qualifiers Values](#configuration-types-and-qualifiers-values )
 - [Syntax to Specify Qualifier Values](#syntax-to-specify-qualifier-values)
 - [Localization Resources in Android](#localization-resources-in-android)
 - [How the SDK Handles Localized Resources](#how-the-SDK-handles-localized-resources)
 - [Localizing Strings](#localizing-strings)
 - [Localizing Images ](#localizing-images )
 - [Media Files](#media-files)
 - [Best Practices for Localization](#best-practices-for-localization)
 - [Precautions Taken When Localizing Your Application](#precautions-taken-when-localizing-your-application)
 - [Conclusion](#conclusion)
 - [Reference](#reference)

### Prerequisites
- Have [Android Studio](https://developer.android.com/studio?gclid=Cj0KCQiAk4aOBhCTARIsAFWFP9HLlfZnjvuyknAbHQ8WOk8iH2_k3M6rEnIEPkca8LdDnvA3HXbQiKAaAhMbEALw_wcB&gclsrc=aw.ds) IDE installed.
- Know the fundamentals of Extensible Markup Language (XML).
- Have an understanding of the Android Studio project structure.

### Goals
At the end of the tutorial, the reader should understand localization processes with all the creation followed when localizing your android application.

### Configuration types and qualifiers values
#### Configuration types
Configuration types are the factors to consider when localizing your application. These are the several factors considered when localizing your application:
- Language and Region - The context in which the application is being utilized.
- Mobile country code and Mobile network code - This is a three-digit number that is always specific for a given country and even network provider.
- Layout Direction can be vertical or horizontally oriented.
- Time - You can use specific features for a different time range.
- Screen pixel density.
- Navigation key available.
- Primary text input method.
- Platform version.
- UI mode.

#### Qualifiers values
Qualifier values are the communication paths in an android system that tells the system the different factors to react to by providing alternate resources.

#### Syntax to specify qualifier values
`<resource_name> - <config-qualifiers>` Example:-
- drawable-fr - fr is configuration qualifier for french
- layout-sw - sw is configuration qualifier for swahili

### Localization resources in android
The resource directory (res) is the parent to all resources in android where all the resources are placed. Each resource is placed in a specific subdirectory.

These subdirectories are:-
- `animator` - This is an XML file that defines animation properties
- `anim` - It is an XML file that defines tween animations
- `color` - This is an XML file that defines a state list of colors
- `drawable` - It is a Bitmap file (png, jpg, gif) or XML file which holds pictures.
- `mipmap` - This is a drawable file for different launcher icon densities.
- `layout` - It is an XML file that defines a user interface layout.
- `menu` - It defines the application menus.
- `raw` - It holds arbitrary files that are saved in raw form.
- `values` - It is an XML that contains simple values, for example, strings, integers, color.
- `xml` - This holds arbitrary XML files that can be read at runtime,by calling resource.getXml() method.

To understand how each resource is localized, it is appropriate to know the resource groups and be familiarized with all it contains.

How to access the resources:
##### 1. In a `Class`  
`[<res_directory>].<resource-type>.<Resource_name>`

Examples:-
- R.layout.activity-main
- R.String.main

##### 2. XML file
`@<resource-type>/<resource-name>`

Examples:-
- @String/word
- @color/blue

### How the SDK handles localized resources
Android selects the resources to use based on the current device settings. There is a process followed to get hold of this localized resource. The procedure is as follows:
- The SDK eliminates qualifiers that contradict the device settings.
- Then identifies the next qualifier in the order. If no resource subdirectory uses the qualifier, the subdirectory is eliminated.
- The process is repeated until the desired resource is left.

### Localizing strings
To localize strings appropriately, do not complex code the strings; instead, use string resource files to create strings value. Follow the procedure below to localize a string.

#### Step 1 - Creating a string file
Right-click on resource subdirectory values, go to new, and select resource files.

#### Step 2 - Naming the string file similar to the existing string file and specifying the locale.
Write the file name similar to the available string.xml file on the wizard that appears. For instance, if `string.xml` is named as a string, the name of your file is also as a string.

Select locale on the available qualifier and hit the forward arrows, which will then take you to this path.

![create_string_file](/engineering-education/localization-and-internationalization-in-android/create_string_file.png)

#### Step 3 - Choosing the language to localize your string
Choose the language you want to localize your application on the same wizard. You can specify the region if required, then hit ok. An empty string.XMl file is generated, and if you check the string resource subdirectory, you will notice there are two string.xml files, with one having the specified language symbols.

#### Step 4 - Writing to the newly created string file
Finally, go to your main `string.xml` file, copy the available string, and paste them into the new `string.xml` file. Once you have pasted, please do not change the string name to the original strings in the main file but change the string value to the specified language you are localizing it.

### Localizing images 
It is always meaningful when an image displays the right content according to the context it is being utilized. For this reason, localization of images would be considered when one is developing an application for a different context.

Localization of images is done as follows:

#### Step 1 - Creating new image subdirectory
Right-click on the resource folder go to the new select android resource directory.

#### Step 2 - Naming newly created image subdirectory
Name the directory similar to the available image directory and select drawable on the resource type on the wizard that appears under the available qualifier. Select locale hit the forward arrows to choose the appropriate qualifier, and hit ok. You will notice that the directory name is appended with the specified qualifier symbol, as shown below.

![create_drawable_file](/engineering-education/localization-and-internationalization-in-android/create_drawable_file.png)

#### Step 3 - Opening the created drawable subdirectory in your computer file
Right-click on the resource folder and open it in your files

#### Step 4: Locate the drawable subdirectory in your files and add the required image
Locate the newly created drawable subdirectory and add an image you would wish to display for the specified locale. Ensure the image added within the new drawable folder has a similar name as that within the original drawable folder

![image_files](/engineering-education/localization-and-internationalization-in-android/image_files.png)

#### Step 5 - Running your localized application
When you run your application, expect the below output.

![english](/engineering-education/localization-and-internationalization-in-android/english.png)

![swahili](/engineering-education/localization-and-internationalization-in-android/swahili.png)


### Media files
There are always two types of media files in the android application:
-Text-to-Speech is audio that speaks out any text within the string.xml or hardcoded in the application. It uses text to speech engine, which speaks out any text provided, which handles the localization process effectively as it speaks out its text.
- Recorded Audio files - These are any audio file example, MP3, which is embedded in your application and played at different times.

### Best Practices for Localization
- Provide a complete set of all the default resources to localize the application.
- Do not think of the localization process at the final application development stage. Instead, think of the localization process at the design stage of the application, which makes it easy to localize.
- Ensure that the qualifier naming rule is followed. The best way to follow this naming rule is by creating an alternate resource directory using the new resource directory wizard and not doing it manually.
- In cases where you want to use the same resource but with another name within your application. Avoid duplication of resources but rather use aliases instead, which reduces the growth of APK size
- When doing translation of strings, use professional translation services. To make sure the correct meaning is conveyed when each string is displayed.

### Precautions taken when localizing your application
- Avoid translation engines that could give you the wrong output of the string you want to localize. However, instead, use professional translation services.
- Do not over-localize your application. Ensure you select the resources you want to localize according to the configuration type and not all the available resources
- Think of localization in the early stage of application development.

### Conclusion
In this tutorial, we have learned localization, globalization, and internationalization. How the Android SDK deals with localized resources. We also learned the localization of strings and images. Best practices to follow when localization and precautions are taken when localizing your application.

To get the full implementation of the project, visit this [GitHub Repository](https://github.com/nia-vee/LocalizationInternationalizationDemo)

### Reference
[Localization and internationalization in android](https://developer.android.com/guide/topics/resources/localization)
