### H<sub>2</sub>O Security Implementation

#### Introduction

Security in the data analytical space is important to consider internally and externally. While surrounding a network with cybersecurity protection increases stability, data within the coding program appears to remain vulnerable. Cyberthreats and attacks are unpredictable, however, this tutorial shows one of several security precautions to consider prior to starting, during, and after data access. In this tutorial, a module in Python Programming called H<sub>2</sub>O and bash commands are both introduced. Remember, this tutorial is written at `root`.  

#### Table of Contents

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Identify Change](#identify-change)
* [Allocating Data to Lower Risk](#allocating-data-to-lower-risk)

#### Prerequisites

* Linux computer Operating System (OS) or Linux container with `root` authorization (this tutorial uses [Kali Linux](https://kali.org/).
* Basic Bash knowledge.
* Python (preferably 3.3+, tutorial uses 3.9).
* Read [H<sub>2</sub>O documentation](https://h2o-release.s3.amazonaws.com/h2o/rel-xu/3/docs-website/h2o-docs/index.html)
* Bash installations: H<sub>2</sub>O, Java, `keytools`, and a Linux text editor.
* Python installation of H<sub>2</sub>O.
* Some Java coding knowledge.
* Internet access to internet browser.

#### Installation

This section is to emphasize on the fact that Bash is appropriate for this tutorial. It is understandable when individuals may not have a Linux OS. One of several solutions for this compatibility issue is to complete a successful installation of a container. There are options available such as Ubuntu LTS or Kali Linux. Both options are capable of functioning, however, certain ones are used for specific purposes. Kali Linux is known for ethical pen-testing while Ubuntu LTS is a version generally used among individuals.  

For any security mechanism to become stable, generation of authentication files is necessary. Refer to the instructions at the [H<sub>2</sub>O documentation](https://h2o-release.s3.amazonaws.com/h2o/rel-xu/3/docs-website/h2o-docs/index.html) website to generate `keystore` and `truststore` authentication files.  

#### Identify Change

One noticeable SSL internode security change is when false becomes true as shown below.  

![false](/engineering-education/content/articles/h2o-security-implementation/false.jpg)    
_Connection without internal security._  

After following Standalone/AWS and Java instructions, a message with a specific URL dedicated to H<sub>2</sub>O appears and can be used for `h2o.init()`.  

![true](/engineering-education/content/articles/h2o-security-implementation/true.jpg)    
_Connection with internal security._  

Data access is not universal. If a database is used, permissions can also limit who can gain specific data access when logging in and during active state.  

#### Allocating Data to Lower Risk

File permission is one of several options to access a data file. Reading, writing, and executing are all default settings that can be implemented. Password protection is also another file protector that can be distributed based on roles. As a reminder, the code below is one of many methods to enforce permissions. The code below specifies group permission for reading.  

```python
import os, sys, stat
os.chmod(“./filename.csv”,  stat.S_IRGRP)
```
This code below can move filename.csv to an offline folder and can no longer be accessible online at any time. Moving a file to a different online folder location.  

```bash
mv ./filename.csv ./offline/
```

[Quantitative security measurements](https://www.edx.org/microbachelors/nyux-cybersecurity-fundamentals) can depend on the dataset value associated with recovery, loss, and technology costs.  

#### Cyberattack Prevention

While most experts are aware that 100% of security and prevention techniques are not constantly possible, some simple preventative solutions are available before discontinuing online services. SQL with its many variations can appear to become a well-known database language. SQL injection can become a cyberattack technique to gain access and control of dataset tables inside databases. A simple solution is to limit user input.  

For example, the following Java application can detect SQL keywords and combinations. If a java-based relational database is preferred, this code below can detect and refuse basic SQL injection attacks.  

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
            else {
                System.out.println("Invalid input. Try again.");
            }
    }
}
```  


This Java application can be used in a real SQL injection scenario. Input with any spacing combination mentioned with `alter`, `drop`, and `insert` can result in an error message. For example, retrieving data with `select`.

**Input**:  
select table  

**Output**:  
Invalid input. Try again.  

It is beneficial to include all SQL-oriented commands to stop each attempt of negative impact. Another helpful tip is to conduct further research on libraries such as evaluating source codes. There is a possibility of libraries with built-in codes incorporating malicious activities such as [memory issues](https://www.edx.org/microbachelors/nyux-cybersecurity-fundamentals).  

#### Conclusion

Technological cyberattacks can increase as technological complexities allow vulnerabilities. There are a number of mechanisms to secure and protect data. When attacks are successful, it is ideal to keep alternative options available to manage risk and recover from impact. Protecting data is one approach to keeping data safe.  

#### Takeaways

* Increasing security can start when the coding program begins.
* H<sub>2</sub>O allows security options.
* Cyberattacks can be preventable with countermeasures.
* Impact should be considered to recover from cyberattacks.
* Linux systems and Linux containers can include security and protection.

Happy Coding!  

#### References

[Linux Container Option 1](https://www.zdnet.com/article/minimal-ubuntu-for-containers-and-clouds/#:~:text=While%20that%20release%20is%20useful%20mostly%20for%20hobbyists%2C,the%20standard%20Docker%20Hub%20Ubuntu%2018.04%20LTS%20image.)  
[Linux Container Option 2](https://kali.org/)  
[H<sub>2</sub>O documentation](https://h2o-release.s3.amazonaws.com/h2o/rel-xu/3/docs-website/h2o-docs/index.html)  
[Educational References](https://www.edx.org/microbachelors/nyux-cybersecurity-fundamentals)  
