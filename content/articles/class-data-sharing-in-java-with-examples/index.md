### Introduction

When using the feature of Class Data Sharing JVM, many Java Virtual Machines might share loaded classes in shared memory. The Sun JVM includes a CDS since Java 1.5. It was seldom used since it only pertained to system classes and serial garbage collectors. Oracle JDK 9 included more GC mechanisms and application classes, which helped. Until JDK 10, this was a premium feature. Using CDS, classes are cached in a memory-mapped file. Because this file (and its RAM) may be shared by several JVMs, class loading from the internal representation is faster.

### Table of contents

- [What is data class sharing?](#what-is-data-class-sharing)
- [Application Class Data Sharing in Java Platform](#application-class-data-sharing-in-java-platform)
- [Process of Application Class Data Sharing](#process-of-application-class-data-sharing)
- [ Ways of renewing the shared archive across every platform](#ways-of-renewing-the-shared-archive-across-every-platform)
- [Controlling the Sharing of Class Data Manually](#controlling-the-sharing-of-class-data-manually)

### What is data class sharing?
We can operate many Java virtual machines by using class information or data sharing (CDS).
Default classes are loaded as soon as there is an installation of Oracle Java Runtime Environment(JRE). After then, there is the storage of a copy of everything in a central location. You do not need to have the JRE installed before building the shared archive.

Memory is mapped to the shared archive so that the data in the JVM can only access it when the JVM runs. Downloading the shared archive rather than the individual classes saves time.

Parallelism may be divided into three different types: serial The G1 garbage collector's choices for transferring class data include using OldGC or any other garbage collection method. You can only use class data sharing if you're using the G1 garbage collector and shared strings.

The responsiveness of Java SE improvement is by including CDS. The faster your software runs, the less memory it will consume.

#### Reducing the new JVM instances' environmental impact
- JVM processes running on a single machine can only access a small part of the shared archive. It takes longer for our JVM instances to start now that we don't have to duplicate data throughout them.
- For Java Hotspot VM to function, there is saving of the class data in the shared archive in a certain manner. It saves RAM space as compared to utilizing the conventional class information. Memory savings allow for the execution of more programs at once on the same system. Increase the memory footprint by changing the number of Windows application pages assigned to the process' address space. Because of this improvement, the modular image's runtime components use less RAM (inside Windows). Once the goal of reducing one's carbon footprint has been set, there would be no going back for the foreseeable future.

### Application Class Data Sharing in Java Platform
A speedier runtime start thanks to the ability to archive application classes is a huge benefit. By sharing memory across several JVM processes, AppCDS reduces the runtime footprint of many JVM processes.

You may save application classes on a networked storage device using this feature. All Java processes share class information, which means different Java processes can share the same class information. Classloading is possible with either AppCDS or the standard system class loader; but, only AppCDS supports archives. A single archive file may be shared by several Java virtual machines (JVMs), saving both space and time.

### Process of Application Class Data Sharing
Application Class Data Sharing is the ability to save application classes in a shared archive (ACDS).
Aside from the needed library classes, AppCDS allows Class Information Sharing from:
- Runtime image classes for platforms.
- Programs from the image's runtime.
- Classes from the classpath used by the applications.
- Module path-based application classes.
> Utilize CDS across application classes because of the Application Class Information Sharing, which we will depict in more detail underneath.

This method is partitioned into three sections: 
1. In the `1st` file, monitor each class your program has stacked. 
2. Make a file called Shared Dump for each class you instruct.
3. Utilize the Shared Dump while the program is running.

**Step 1:Recording all the classes:**
`AppClassDataSharing.java`, our Java class, will convert into a runnable container called `AppCDS.jar`, which we can obtain here. This is possible due to AppCDS not unloading level classes. This order will create a `1st` file for us: to use AppCDS, use the following order: 

`java -XX:UnlockCommercialFeatures-XX:UseAppCDS-XX:DumpLoadedClassList=LoadedClasses.lst -jar AppCDS.jar.`

We would not want to mess with the JRE files therefore we will create this file .

![Creating a file in custom location](engineering-education/class-data-sharing-in-java-with-examples/custom.jpg)

It's easy to observe that the created file `LoadedClasses.lst` has an entry for our class AppClassDataSharing in the preceding illustration.

![Entry for our own class AppClassDataSharing](engineering-education/class-data-sharing-in-java-with-examples/app.jpg)

**Step 2 The shared dump file for the aforementioned classes should be created.**
The dump will be made at a similar spot as before utilizing this lst record:
The subsequent arguments and commands should be included into a customized shared archive file:

`java -XX:+UnlockCommercialFeatures -Xshare:dump -XX:+UseAppCDS -XX:SharedClassListFile=LoadedClasses.lst -XX:SharedArchiveFile=CustomSharedArchive.jsa -cp AppCDS.jar`

We might create our own `CusomSharedArchive.jsa` record, and we'll utilize it in the subsequent step to load classes from it when we launch our application.

**Step 3 Utilize the Shared Dump when starting app.**
The `CustomSharedArchive.jsa` file and the commands and parameters specified will be utilized to launch our application.
AppClassDataSharing and the arbitrary(random) number generator holder are presently loaded from a sharing item document that contains their shared data.

To perceive how `- Xshare:on` and `- Xshare:off` influence execution, utilize the time command, we can essentially prefix time before our command. The data may not be measurably critical because of the little size of the application. git bash was utilized since the time order couldn't be utilized in the cmd terminal.

![Difference of Xshare:on and xshare:off](engineering-education/class-data-sharing-in-java-with-examples/xshare.jpg)

We can use Program Class Data Sharing because our software is now smaller and takes less time to operate.

###  Ways of renewing the shared archive across every platform
It's possible to rebuild the shared archive on any supported platform, including Linux.
Many library classes will now be available in the default JRE installation. Would it be workable to add more classes to the document if important? Given an improvement, which dumps all loaded library classes from your framework's class loading tracer or running applications, you might develop a rundown of class members.

```java
java -XX:DumpLoadedClassList=<class_list_file>
```

To create the shared archive, start with the class list created from the profiling data.

To locate the JVM archive and shared library, go to the following directories:
1. It's stored in a directory on each of the three operating systems.

```
/lib/[arch]/server/classes.jsa
```

2. There are many puts on Windows frameworks where you might get to the downloadable file:

```
/bin/server/classes.jsa
```

It overwrites any earlier forms of the file record if the indistinguishable archive file name is now in its presence. Another file might be made by just overwriting the current one.
A new archive file may be created by logging in as an administrator (s). Sign in using a computer that resembles the Java SE establishment in a highly networked environment. If you can't make changes in the installation directory, check your permissions.

Type the following command to use the given class list to reconstruct the archive:

```Java
java -XX:SharedClassListFile=<class_list_file> -Xshare:dump
```

Diagnostic data is made accessible each time an archive is produced.

### Controlling the Sharing of Class Data Manually
Data exchange across classes is allowed by default. You have the option of manually enabling and deactivating this function.

Here are some more command-line parameters to aid with troubleshooting and diagnostics:
- `Xshare:off` is the default setting.
Sets whether or not class data may be shared.
- `Xshare:on` signifies that the file is available for sharing. To enable the exchange of class information. If you are unable to activate the class data sharing feature, an error message will be shown, and the software will shut down .
- `Xshare:on` This option can only be used for testing purposes due to the operating system's usage of address space layout randomization. Do not depend upon it to avoid occasional failures. There is a danger of data loss when using this option in production settings.
- The auto-sharing feature of `Xshare`.To default to class data sharing. Enable student data sharing across classes wherever workable.

### Conclusion
This tutorial demonstrated how the Java data class sharing feature speeds up startup while using less memory (JVM). We have also looked at processes of data class sharing, application data sharing and how to manually control data sharing.

Happy Coding!