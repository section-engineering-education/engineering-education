---
layout: engineering-education
status: publish
published: true
url: /securing-data-with-h2o/
title: Securing Data with H2o
description:  H2o is a library that is used to analyze descriptive and predictive trends in the field of data science. In this article we go over how H2o is uniquely suited to secure data.
author: priya-kalyanakrishnan
date: 2021-06-23T00:00:00-11:30
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/securing-data-with-h2o/hero.jpg
    alt: H2o Data Security
---
H<sub>2</sub>O is a library that is compatible with many coding languages including Python. This library can be used to analyze descriptive and predictive trends.
<!--more-->
It is similar to other machine learning libraries in Python. The option to include security is a hidden advantage that many Python libraries may not include.

Read on to find out how security can be implemented throughout the data analysis cycle when using H<sub>2</sub>O with Python.  

### Introduction
Security in the data analytical space is important to consider internally and externally.

While surrounding a network with cybersecurity protection increases stability, data within the coding program appears to remain vulnerable. Cyberthreats and attacks are unpredictable, however, this tutorial shows one of several security precautions to be considered prior to starting, during, and after data access.

In this tutorial, a module in Python programming called H<sub>2</sub>O and bash commands are both introduced. Remember, this tutorial is written at `root`. 

This tutorial uses H<sub>2</sub>O as a module in relation to the data analysis cycle and considers security from various stages of data analysis cycle. Security considers the following: the H<sub>2</sub>O instance, data file, and database.   

### Table of contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Instance Internal Security](#instance-internal-security)
- [Data File Security](#data-file-security)
- [Database Security](#database-security)

### Prerequisites
1. Linux computer Operating System (OS) or Linux container with `root` authorization (this tutorial uses [Kali Linux](https://kali.org/).
2. Basic Bash knowledge.
3. Python (preferably 3.3+, tutorial uses 3.9).
4. Prior knowledge on [how to install H<sub>2</sub>O](http://docs.h2o.ai/h2o/latest-stable/h2o-docs/downloading.html#install-in-python), [how to create H<sub>2</sub>O instances](http://docs.h2o.ai/h2o/latest-stable/h2o-docs/starting-h2o.html#from-python), and [how to create security files](https://h2o-release.s3.amazonaws.com/h2o/rel-xu/3/docs-website/h2o-docs/security.html?highlight=security)
5. Bash installations: H<sub>2</sub>O, Java, `keytools`, and a Linux text editor.
6. Python installation of H<sub>2</sub>O.
7. Some Java coding knowledge.
8. Internet access to internet browser.

### Installation
This section is to emphasize on the fact that Bash is appropriate for this tutorial.

It is understandable that individuals may not have a Linux OS. One of several solutions for this compatibility issue is to complete a successful installation of a container. There are options available such as Ubuntu LTS or Kali Linux. 

Both options are capable of functioning, however, certain ones are used for specific purposes. Kali Linux is known for ethical pen-testing while Ubuntu LTS is a version generally used among individuals.  

For any security mechanism to become stable, the generation of authentication files is necessary. Refer to the instructions at the [H<sub>2</sub>O documentation](https://h2o-release.s3.amazonaws.com/h2o/rel-xu/3/docs-website/h2o-docs/security.html?highlight=security) website to generate `keystore` and `truststore` authentication files.  

### Instance internal security
One noticeable SSL internode security change is when false becomes true as shown below.  

![Connection without internal security: false](/engineering-education/securing-data-with-h2o/false.jpg)    

*Connection without internal security.*

After following Standalone/AWS and Java instructions, a message with a specific URL dedicated to H<sub>2</sub>O appears and can be used for `h2o.init()`.  

![Connection with internal security: true](/engineering-education/securing-data-with-h2o/true.jpg)    

*Connection with internal security.*  

Data access is not universal. If a database is used, permissions can also limit who can gain specific data access when logging in and during active state.  

### Data file security
File permission is one of several options to access a data file.

Reading, writing, and executing are all default settings that can be implemented. Password protection is also another file protector that can be distributed based on roles. As a reminder, the code below is one of many methods to enforce permissions.

The code below specifies group permission for reading:

```python
import os, sys, stat
os.chmod(“./filename.csv”,  stat.S_IRGRP)
```

This code below can move filename.csv to an offline folder and can no longer be accessible online at any time. 

Moving a file to a different online folder location without general access is another option:

```bash
mv ./filename.csv ./offline/
```

[Quantitative security measurements](https://www.edx.org/microbachelors/nyux-cybersecurity-fundamentals) can depend on the dataset value associated with recovery, loss, and technology costs. 

### Database security
While most experts are aware that 100% of security and prevention techniques are not constantly possible, some simple preventative solutions are available before discontinuing online services.

SQL with its many variations can appear to become a well-known database language. SQL injection can become a cyberattack technique to gain access and control, of dataset tables inside databases. A simple solution is to limit user input.  

Before a data file is read inside a H<sub>2</sub>O instance, it is very likely the data file originated from a database.  

For example, the following if-then statement can detect frequently used SQL keywords and combinations. 

If a database written in Java is connected to H<sub>2</sub>, this code below can detect and refuse basic SQL injection attacks:

```Java
import static java.lang.System.in;
import java.util.Scanner;
public class Check
{
    public static void main(String[] args)
    {
      Scanner scnr = new Scanner(in);
      String input;
      String alter;
      String drop;
      String insert;
          System.out.println(“Please enter input: “);
          input = scnr.nextLine().toLowerCase();
          if (!input.contains(“alter “) && !input.contains(“drop”) && !input.contains(“insert”) && !input.contains(“select”)) {
                System.out.println("Valid input. Thank you.");
                }
                // Continue with processing data.
            else {
                System.out.println("Invalid input. Try again.");
                // Discontinue procedure to process data.
            }
    }
}
```  

This Java application can be used in a real SQL injection scenario. Input with any spacing combination mentioned with `alter`, `drop`, and `insert` can result in an error message. 

For example, retrieving data with `select`.

#### Input:  
`select table`

#### Output:  
`Invalid input. Try again.`

It is beneficial to include all SQL-oriented commands to stop each attempt of negative impact. Another helpful tip is to conduct further research on libraries such as evaluating source codes. 

There is a possibility of libraries with built-in codes incorporating malicious activities such as [memory issues](https://www.edx.org/microbachelors/nyux-cybersecurity-fundamentals).  

### Conclusion
Technological cyberattacks can (and will) increase as technological complexities allow vulnerabilities.

There are a number of mechanisms to secure and protect data. When attacks are successful, it is ideal to keep alternative options available to manage risk and recover from impact. 

Protecting data is one approach to keeping data safe.  

### Takeaways
- Increasing security can start when the coding program begins.
- H<sub>2</sub>O allows security options.
- Cyberattacks can be preventable with countermeasures.
- Impact should be considered to recover from cyberattacks.
- Linux systems and Linux containers can include security and protection.

Happy coding!  

### References
1. [H<sub>2</sub>O documentation](https://h2o-release.s3.amazonaws.com/h2o/rel-xu/3/docs-website/h2o-docs/index.html)  
2. [How to create H<sub>2</sub>O instances](http://docs.h2o.ai/h2o/latest-stable/h2o-docs/starting-h2o.html#from-python)  
3. [How to create security files](https://h2o-release.s3.amazonaws.com/h2o/rel-xu/3/docs-website/h2o-docs/security.html?highlight=security)  
4. [How to install H<sub>2</sub>O](http://docs.h2o.ai/h2o/latest-stable/h2o-docs/downloading.html#install-in-python)  
5. [Educational References](https://www.edx.org/microbachelors/nyux-cybersecurity-fundamentals)  
6. [Linux Container Option 1](https://ubuntu.com/download/desktop)  
7. [Linux Container Option 2](https://kali.org/)

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
