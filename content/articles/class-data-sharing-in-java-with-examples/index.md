---
layout: engineering-education
status: publish
published: true
url: /class-data-sharing-in-java-with-examples/
title: Data Sharing in Java
description: This article will explore data sharing in Java. It will also discuss how Java Virtual Machines use this concept to improve memory usage.
author: bancy-wangui
date: 2021-11-30T00:00:00-01:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/class-data-sharing-in-java-with-examples/hero.jpg
    alt: Data sharing in Java Image
---
When using the Class Data Sharing(CDS), several Java Virtual Machines may share the memory of loaded classes. 
<!--more-->
From Java 1.5, the Sun JVM has included a CDS. However, it was rarely used because it only applied to system classes and serial trash collectors.

Additional GC techniques and application classes in Oracle JDK 9 made a big difference. This was a paid functionality before JDK 10. 

Classes are stored in a memory-mapped file when utilizing CDS. The internal representation of this class is quicker to load since it is shared by several JVMs.

### Table of contents
- [What is data class sharing](#what-is-data-class-sharing)
- [Application Class Data Sharing](#application-class-data-sharing)
- [Ways of renewing the shared archive across every platform](#ways-of-renewing-the-shared-archive-across-every-platform)
- [Controlling the sharing of Class Data Manually](#controlling-the-sharing-of-class-data-manually)

### What is data class sharing
We can operate many Java virtual machines using class information or data sharing (CDS). Default classes are loaded as soon as there is an Oracle Java Runtime Environment(JRE) installation. 

After that, everything is copied and stored in a central location. Therefore, you do not need to install the JRE before building the shared archive.

Memory is allocated to the common file with the goal that the information in the JVM can be accessed when the JVM runs. 

Therefore, the common file will be downloaded instead of the singular classes which save time.

Parallelism may be divided into three different types. The G1 garbage collector's choices for transferring class data include using OldGC or any other garbage collection method. 

Note that the G1 garbage collector and shared strings are the only ways to utilize class data sharing.

CDS helps to improve the responsiveness of Java SE. The faster your software runs, the less memory it will consume.

#### Reducing the environmental impact of new JVM instances
JVM processes running on a single machine can only access a small part of the shared archive. It takes longer for our JVM instances to start since we do not duplicate data.

For Java Hotspot VM to operate, the class information must be saved in a specified manner. This saves RAM space as compared to using the traditional class data. 

Storage savings allow many applications to run on the computer simultaneously. 

The memory footprint can be increased by changing the number of applications assigned to the process' address space. Due to this improvement, the modular image's runtime components use less RAM (inside Windows). 

### Application Class Data Sharing
Archived application classes facilitate a faster runtime which is a huge benefit. In addition, AppCDS minimizes the runtime footprint of numerous JVM processes by allowing them to share memory. 

You may, therefore, save application classes on a networked storage device using this feature. 

All Java processes share class information. This means that different Java processes can share the same class information.

AppCDS is the only class loader that supports archives; the normal system class loader does not. Thus, several Java virtual machines (JVMs) may share a single archive file which saves time and space.

`Application Class Data Sharing` (ACDS) refers to a shared archive of application classes.

AppCDS provides Class Data Sharing from the following classes:
- Runtime image classes for the platform.
- Running applications from the image's runtime.
- Classpath classes.
- Classes based on a module's route.

> It is possible to apply CDS across application classes because of Application Class Information Sharing (ACIS).

The two activities associated with this method are:
1. Keeping track of every class the application has stacked.
2. Creating a file with the name `Shared Dump` for each class. The Shared Dump may be used while the program is still running.

### Step 1: Making a list of every single class
To launch our `AppClassDataSharing.java` file, we will need to download the `AppCDS.jar` file using the command below:

`java -XX:UnlockCommercialFeatures-XX:UseAppCDS-XX:DumpLoadedClassList=LoadedClasses.lst -jar AppCDS.jar.`

Note that we do not want to interfere with the JRE resources. So, we need to create a new file as demonstrated below:

![Creating a file in custom location](/engineering-education/class-data-sharing-in-java-with-examples/custom.jpg)

In the following image, the `AppClassDataSharing` class is listed in the newly created `LoadedClasses.lst`.

![Entry for our own class AppClassDataSharing](/engineering-education/class-data-sharing-in-java-with-examples/app.jpg)

### Step 2: Create a file with the name shared dump 
A shared archive file may be created by running a new command and selecting the appropriate options as shown below:

`java -XX:+UnlockCommercialFeatures -Xshare:dump -XX:+UseAppCDS -XX:SharedClassListFile=LoadedClasses.lst -XX:SharedArchiveFile=CustomSharedArchive.jsa -cp AppCDS.jar`

Utilize `CustomSharedArchive.jsa` when loading classes when the app is initialized.

### Step 3: Selecting the Shared Dump file from the menu
`CustomSharedArchive.jsa` should be executed with the specified commands and arguments to utilize our app.

The arbitrary random `no-generator` holder and `AppClassDataSharing` are now loaded from a sharing item document. This component stores crucial data.

We may use the time function to examine how `- Xshare: on` and `- Xshare: off` impact execution. However, the data may not be meaningful due to the app's modest size. 

![Difference of Xshare:on and xshare:off](/engineering-education/class-data-sharing-in-java-with-examples/xshare.jpg)

Our software is now smaller and requires less time to execute.

###  Renewing the shared archive across every platform
It is possible to rebuild the shared archive on any supported platform, including Linux. The default JRE installation now includes a large number of library classes. 

Due to an improvement that dumps all loaded library classes from your framework's loading tracer, you might develop a rundown of class members.

```java
java -XX:DumpLoadedClassList=<class_list_file>
```

Create the shared archive using the class list you retrieved from the profiling data. It is possible to locate the shared JVM library and archive using the following commands:

```bash
/lib/[arch]/server/classes.jsa
```

For Windows:

```bash
/bin/server/classes.jsa
```

The JVM library overwrites the file if the same archive file is located. Therefore, another file might be made by just overwriting the current one.

A new archive file may be created by logging in as an administrator. Sign in using a computer that resembles the Java SE establishment in a highly networked environment. 

Use the following command to re-create the archive using the supplied classes:

```java
java -XX:SharedClassListFile=<class_list_file> -Xshare:dump
```

Diagnostic data is made available each time an archive is created.

### Controlling the sharing of Class Data Manually
Data exchange across classes is allowed by default. However, you can enable and deactivate this function manually.

Here are some more command-line parameters to aid with troubleshooting and diagnostics:

- `Xshare: off` is the default setting. It determines whether or not class data may be shared.

- `Xshare: on` signifies that the file is available for sharing. If you cannot activate the class data sharing feature, an error message will be shown, and the software will shut down. This option can only be used for testing due to space layout randomization. 


### Conclusion
This tutorial demonstrated how the Java data class sharing feature speeds up startup while using less memory (JVM). 

We have also looked at data class sharing using `Xshare: off` and `Xshare: on` commands.


---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
