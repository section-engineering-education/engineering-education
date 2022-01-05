---
layout: engineering-education
status: publish
published: true
url: /localization-and-internationalization-in-android/
title: Localization and Internationalization in Android
description: This article will go through the Android localization process in great depth and how to apply best practices to your translation efforts.
author: vivian-odhiambo
date: 2022-01-05T00:00:00-12:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/localization-and-internationalization-in-android/hero.jpg
    alt: Localization and Internationalization in Android Hero Image
---
### Introduction
Localization is the process of modeling applications to a specific locale, market, or device. Localization can also be regarded as language translation.
<!--more-->
Globalization is a term used in a wide variety of contexts such as transport and trade. 

In the field of technology, globalization is defined as the process of building and developing a software product that functions in multiple cultures and locales. In other words, the software can serve a diverse group of people.

Internationalization is the process of localizing and globalizing your application.

### Table of contents
 - [Introduction](#introduction)
 - [Prerequisites](#prerequisites)
 - [Goals](#goals)
 - [Configuration types and qualifiers values](#configuration-types-and-qualifiers-values )
 - [Syntax to specify qualifier values](#syntax-to-specify-qualifier-values)
 - [Localization resources in Android](#localization-resources-in-android)
 - [How the SDK handles localized resources](#how-the-SDK-handles-localized-resources)
 - [Localizing strings](#localizing-strings)
 - [Localizing images ](#localizing-images )
 - [Media files](#media-files)
 - [Best practices for localization](#best-practices-for-localization)
 - [Precautions when localizing your application](#precautions-when-localizing-your-application)
 - [Conclusion](#conclusion)
 - [Reference](#reference)

### Prerequisites
- Have [Android Studio](https://developer.android.com/studio?gclid=Cj0KCQiAk4aOBhCTARIsAFWFP9HLlfZnjvuyknAbHQ8WOk8iH2_k3M6rEnIEPkca8LdDnvA3HXbQiKAaAhMbEALw_wcB&gclsrc=aw.ds) IDE installed.
- Basic knowledge of Extensible Markup Language (XML).
- Have an understanding of the Android Studio project structure.

### Goals
At the end of the tutorial, the reader should understand the localization process in Android applications.

### Configuration types and qualifiers values
#### Configuration types
Configuration types are the factors to consider when localizing your application. They include:

- Language and region - The context in which the application is being utilized.
- Mobile country code and Mobile network code - This is a three-digit number that is always specific for a given country and network provider.
- Layout direction can be vertical or horizontally oriented.
- Time - You can use specific features for a different time range.
- Screen pixel density.
- Navigation key available.
- Primary text input method.
- Platform version.
- UI mode.

#### Qualifiers values
Qualifier values are the communication paths in Android that notify the system the different factors to react to by providing alternate resources.

#### Syntax to specify qualifier values
`<resource_name> - <config-qualifiers>`
- `drawable-fr` - fr is a configuration qualifier for french.
- `layout-sw` - sw is a configuration qualifier for swahili.

### Localization resources in Android
The resource directory (`res`) is the parent folder to all resources in Android. Each resource is placed in a specific subdirectory.

These subdirectories are:-
- `animator` - This is an XML file that defines animation properties.
- `anim` - It is an XML file that defines tween animations.
- `color` - This is an XML file that defines a list of colors.
- `drawable` - It is a Bitmap file (png, jpg, gif) or XML file which holds pictures.
- `mipmap` - This is a drawable file for different launcher icon densities.
- `layout` - It is an XML file that defines a user interface layout.
- `menu` - It defines the application menus.
- `raw` - It holds arbitrary files that are saved in raw form.
- `values` - It is an XML that contains simple values such as strings, integers, and color.
- `xml` - This holds arbitrary XML files that can be read at runtime, by calling the `resource.getXml()` method.

To understand how each resource is localized, it's crucial to know the resource groups.

How to access the resources:

##### 1. In a `Class`  
`[<res_directory>].<resource-type>.<Resource_name>`

Examples:
- `R.layout.activity-main`
- `R.String.main`

##### 2. XML file
`@<resource-type>/<resource-name>`

Examples:
- `@String/word`
- `@color/blue`

### How the SDK handles localized resources
Android selects localized resources to use based on the current device settings. The procedure is as follows:

- The SDK eliminates qualifiers that contradict the device settings.
- Then identifies the next qualifier in the order. If no resource subdirectory uses the qualifier, the subdirectory is also eliminated.
- The process is repeated until the desired resource is left.

### Localizing strings
To localize strings appropriately, do not hard code them. Instead, use `string-resource` files to create strings value. 

Follow the procedure below to localize a string:

#### Step 1 - Creating a string file
`Right-click` on resource `subdirectory values`, go to `new`, and select `resource files`.

#### Step 2 - Naming string files
Name the file similar to the available `string.xml` file on the wizard that appears. Then select `locale` on the available `qualifier` and navigate to the path below:

![Create_string_file](/engineering-education/localization-and-internationalization-in-android/create_string_file.png)

#### Step 3 - Choosing the language to localize your string
Choose the language that you wish to localize on the same wizard. You can specify the region if required, then hit `OK`. An empty `string.xml` file will be generated.

If you check the `string-resource` subdirectory, you will notice there are two `string.xml` files, with one having the specified language symbols.

#### Step 4 - Writing to the newly created string file
Finally, open your main `string.xml` file, copy the available strings, and paste them into the new `string.xml` file. 

Once you have added the code, please do not change the `string name` to the original strings in the main file.

You should instead change the string value to your desired language.

### Localizing images 
Its vital for an image to display the right content according to the context it is being utilized. For this reason, localization of images should be considered.

This feature can be implemented as follows:

#### Step 1 - Creating a new image subdirectory
`Right-click` on the `resource` folder and navigate to the new `select android resource` directory.

#### Step 2 - Naming newly created image subdirectory
To avoid confusion the image subdirectory names should be similar.Name the subdirectory similar to the available image subdirectory and select `drawable` on the resource type on the wizard that appears under the `available qualifier`. 

Select locale hit the forward arrows to choose the appropriate qualifier, and then press ok. You will notice that the directory name is appended with the specified qualifier symbol, as shown below.

![create_drawable_file](/engineering-education/localization-and-internationalization-in-android/create_drawable_file.png)

#### Step 3 - Opening the created drawable subdirectory in your computer file
Right-click on the resource folder and open it in your files

#### Step 4: Locate the drawable subdirectory in your files and add the required image
Locate the newly created `drawable` subdirectory and add an image you wish to display for the specified locale. Ensure the image added within the new drawable folder has a similar name as that within the original `drawable folder`.

![image_files](/engineering-education/localization-and-internationalization-in-android/image_files.png)

#### Step 5 - Running your localized application
When you run your application, expect the below output.

![english](/engineering-education/localization-and-internationalization-in-android/english.png)

![swahili](/engineering-education/localization-and-internationalization-in-android/swahili.png)


### Media files
There are always two types of media files in the Android application:
-Text-to-Speech is audio that speaks out any text within the `string.xml` or hardcoded in the application. 

It uses text-to-speech audio, which speaks out any text provided, which handles the localization process effectively as it speaks out its text.

### Best Practices for localization
- Provide a complete set of all the default resources to localize the application.
- Do not think of the localization process at the final application development stage. Instead, think of the localization process at the design stage of the application, which makes it easy to localize.
- Ensure that the qualifier naming rule is followed. The best way to stick to this naming rule is by creating an alternate resource directory using the new resource directory wizard and not doing it manually.
- In cases where you want to use the same resource but with another name within your application. Avoid duplication of resources but rather use aliases instead, which reduces the growth of APK size.
- When doing translation of strings, use professional translation services. To make sure the correct meaning is conveyed when each string is displayed.
- Avoid translation engines that could give you the wrong output of the string you want to localize. However, instead, use professional translation services.
- Do not over-localize your application. Ensure you select the resources you want to localize according to the configuration type and not all the available resources
- Think of localization in the early stage of application development.

### Conclusion
In this tutorial, we have learned localization, globalization, and internationalization. How Android SDK deals with localized resources. We also learned the localization of strings and images. Best practices to follow when localizing your application.

To get the full implementation of the project, visit this [GitHub Repository](https://github.com/nia-vee/LocalizationInternationalizationDemo)

### Reference
[Localization and internationalization in android](https://developer.android.com/guide/topics/resources/localization)

Happy learning!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
