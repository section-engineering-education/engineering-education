### Introduction
When using the Class Data Sharing(CDS) JVM capability, several Java Virtual Machines may share the memory of loaded classes. From Java 1.5, the Sun JVM has included a CDS. Because it only applied to system classes and serial trash collectors, it was seldom used.
There were additional GC techniques and application classes in Oracle JDK 9 that made a big difference. This was a paid functionality before JDK 10. Classes are stored in a memory-mapped file when utilizing CDS. The internal representation of this class is quicker to load since it may be shared by several JVMs.

### Table of contents
- [What is data class sharing](#what-is-data-class-sharing)
- [Process of Application Class Data Sharing](#process-of-application-class-data-sharing)
- [ Ways of renewing the shared archive across every platform](#ways-of-renewing-the-shared-archive-across-every-platform)
- [Controlling the Sharing of Class Data Manually](#controlling-the-sharing-of-class-data-manually)

### What is data class sharing
We can operate many Java virtual machines using class information or data sharing (CDS).
Default classes are loaded as soon as there is an Oracle Java Runtime Environment(JRE) installation. After that, there is a copy of everything in a central location. Therefore, you do not need to install the JRE before building the shared archive.

Memory is planned to the common file with the goal that the information in the JVM can get to it when the JVM runs. Thus, downloading the common file instead of the singular classes saves time.

Parallelism may be divided into three different types: serial The G1 garbage collector's choices for transferring class data include using OldGC or any other garbage collection method. The G1 garbage collector and shared strings are the only ways to utilize class data sharing.

The responsiveness of Java SE improvement is by including CDS. The faster your software runs, the less memory it will consume.

#### Reducing the new JVM instances' environmental impact
- JVM processes running on a single machine can only access a small part of the shared archive. It takes longer for our JVM instances to start now that we do not duplicate data throughout them.
- For Java Hotspot VM to operate, the class information must be saved in a specified manner. It saves RAM space as compared to using the traditional class data. Storage savings allow many applications to operate within the same computer at the same time. Increase the memory footprint by changing the number of Windows application pages assigned to the process' address space. Because of this improvement, the modular image's runtime components use less RAM (inside Windows). Once the goal of reducing one's carbon footprint has been set, there would be no going back for the foreseeable future.

### Process of Application Class Data Sharing
A speedier runtime start thanks to the ability to archive application classes is a huge benefit. AppCDS minimizes the runtime footprint of numerous JVM processes by sharing memory amongst many JVM processes.

You may save application classes on a networked storage device using this feature. All Java processes share class information, which means different Java processes can share the same class information.AppCDS is the only class loader that supports archives; the normal system class loader does not. Thus, several Java virtual machines (JVMs) may share a single archive file, saving both space and time.

A shared archive of application classes is what we mean by `Application Class Data Sharing` (ACDS).
AppCDS provides Class Information Sharing from the following classes:
- Runtime image classes for the platform.
- Running applications from the image's runtime.
- Applications rely on classpath classes.
- Classes based on a module's route.

> It is possible to apply CDS across application classes because of Application Class Information Sharing (ACIS).
There are three components to this method:
1. In the first file, keep track of every class your application has stacked.
2. For each class, create a file with the name Shared Dump.
3. The Shared Dump may be used while the program is still running.

**Step 1: Making a list of every single class.**
In order to launch our Java program, `AppClassDataSharing.java,` we will need to download the `AppCDS.jar` file. This is possible due to AppCDS not unloading level classes. For us, this order will generate a `first` file: To utilize AppCDS, go through the steps in this order:

`java -XX:UnlockCommercialFeatures-XX:UseAppCDS-XX:DumpLoadedClassList=LoadedClasses.lst -jar AppCDS.jar.`

We do not want to interfere with the JRE files to make this file instead.

![Creating a file in custom location](engineering-education/class-data-sharing-in-java-with-examples/custom.jpg)

In the image below, our class AppClassDataSharing is listed in the newly created file LoadedClasses.lst.

![Entry for our own class AppClassDataSharing](engineering-education/class-data-sharing-in-java-with-examples/app.jpg)

**Step 2: Create a file with the name shared dump for the above classes.**
At the same time, this lst record generates a dump.
A shared archive file may be created by running command and selecting the appropriate options as shown below:

`java -XX:+UnlockCommercialFeatures -Xshare:dump -XX:+UseAppCDS -XX:SharedClassListFile=LoadedClasses.lst -XX:SharedArchiveFile=CustomSharedArchive.jsa -cp AppCDS.jar`

Utilize `CusomSharedArchive.jsa` when loading classes while the app is started.

**Step 3: When launching the app, choose Shared Dump from the menu.**
CustomSharedArchive.jsa should be executed with the specified commands and arguments to utilize our app.

The arbitrary random no-generator holder and AppClassDataSharing are now loaded from a sharing item document that holds their shared data.

We may use the time function to examine how `- Xshare:on` and `- Xshare:off` impact execution. However, the data may not be meaningful due to the app's modest size. So we used git bash since we could not use cmd.

![Difference of Xshare:on and xshare:off](engineering-education/class-data-sharing-in-java-with-examples/xshare.jpg)

Our software is now smaller and requires less time to execute, so that we may use Program Class Data Sharing.

###  Ways of renewing the shared archive across every platform
It is possible to rebuild the shared archive on any supported platform, including Linux.
The default JRE installation now includes a large number of library classes. Would it be workable to add more classes to the document if necessary? Given an improvement, which dumps all loaded library classes from your framework's class loading tracer or running applications, you might develop a rundown of class members.

```java
java -XX:DumpLoadedClassList=<class_list_file>
```

Create the shared archive using the class list you got from the profiling data.
It is possible to locate the shared JVM library and archive in the following locations:

1. It is stored in a directory on each of the three operating systems.

```bash
/lib/[arch]/server/classes.jsa
```

2. There are many puts on Windows frameworks where you might get to the downloadable file:

```bash
/bin/server/classes.jsa
```

It overwrites any earlier forms of the file record if the indistinguishable archive file name is now in its presence. Thus, another file might be made by just overwriting the current one.
A new archive file may be created by logging in as an administrator(s). Sign in using a computer that resembles the Java SE establishment in a highly networked environment. If you cannot make changes in the installation directory, check your permissions.
To re-create the archive using the supplied classes, type:

```Java
java -XX:SharedClassListFile=<class_list_file> -Xshare:dump
```

Every time an archive is created, diagnostic data is made available.

### Controlling the Sharing of Class Data Manually
Data exchange across classes is allowed by default. You have the option of manually enabling and deactivating this function.
Here are some more command-line parameters to aid with troubleshooting and diagnostics:
- `Xshare:off` is the default setting.
Sets whether or not class data may be shared.
- `Xshare:on` signifies that the file is available for sharing. To enable the exchange of class information. If you cannot activate the class data sharing feature, an error message will be shown, and the software will shut down.
- `Xshare:on` Due to the operating system's use of address space layout randomization, this option can only be used for testing. Do not depend upon it to avoid occasional failures. Data loss is dangerous when using this option in production settings.
- The auto-sharing feature of `Xshare`.To default to class data sharing. Enable student data sharing across classes wherever workable.

### Conclusion
This tutorial demonstrated how the Java data class sharing feature speeds up startup while using less memory (JVM). We have also looked at data class sharing, application data sharing, and how to control data sharing manually.

Happy Coding!
