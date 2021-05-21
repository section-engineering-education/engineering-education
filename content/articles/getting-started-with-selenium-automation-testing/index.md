---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-selenium-automation-testing/
title: Getting Started with Selenium Automation Testing
description: This article will help the readers set up Selenium with Java and write their first test using Selenium. It also explains how Selenium WebDriver can be configured with Eclipse.
author: onesmus-mbaabu
date: 2021-01-26T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-selenium-automation-testing/hero.jpg
    alt: Automation Testing Image
---
Selenium is a popular automation tool web developers can use that to test their applications. The article [An Overview on Automation Testing With Selenium](/automation-testing-in-selenium/) provides the basic concepts of automation testing with Selenium. These include the importance of Selenium, its components, and how it works.
<!--more-->
This article is an extension of the article mentioned above. This article will provide an overview of how developers can get started with automation testing in Selenium with Java. It will also explain how Selenium WebDriver can be configured with Eclipse.

### Introduction
Selenium is a resourceful tool used in the automation testing of web applications. Many developers are using this software because it is open source and supports various browsers and operating systems. Many programming languages are supported by Selenium. 

Developers typically choose an appropriate language based on factors like their usability, how the frameworks are tested, and the how the application will be tested. Java is a very popular programming language among developers when it comes to automation testing. This language is preferred by many web developers while doing Selenium automation testing because it is compatible with other applications and it is easy to use.

### Prerequisites
To follow this article along you should have the following:
- Stable internet connection.

- Basic knowledge of Java.

- A browser (for example, Google Chrome or Mozilla Firefox).
  
### Step 1: Install Java
A Java Development Kit (JDK) will be needed to write and run Java Programs. During the installation, JDK comes with a JRE (Java Runtime Environment). Java can be downloaded from [here](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html). Download the file that corresponds to the operating system of your computer. 

After installing Java, ensure you have set the environment variables. You can verify the success of the installation process by typing ***java --version*** in the command prompt. This will generate information regarding the installed version of Java.

![Java Command Prompt](/engineering-education/getting-started-with-selenium-automation-testing/java-command-prompt.png)

### Step 2: Install Eclipse IDE
Eclipse is an IDE used by Java developers to write and run code. It can be downloaded from [here]( https://www.eclipse.org/downloads/). You should first download the Eclipse installer. This will enable you to download other Eclipse tools. 

Once you have downloaded the installer, run it to select the desired Eclipse tool.

![Eclipse Installer](/engineering-education/getting-started-with-selenium-automation-testing/eclipse-installer.jpg)

Select **Eclipse IDE for Java developers** to install it.

![Eclipse IDE](/engineering-education/getting-started-with-selenium-automation-testing/eclipse-ide.jpg)

Click on **Install**. 

![Installing Eclipse IDE](/engineering-education/getting-started-with-selenium-automation-testing/installing-eclipse-ide.png)

### Step 3: Download Selenium client driver
Selenium WebDriver is one of the most preferred component of Selenium by developers. This component supports various languages such as Java, PHP, Ruby, and C#. Every programming language has a unique client driver. 

We will download the client driver that corresponds to Java. In our case, we will download the Selenium Java Client Driver. This can be downloaded from [here](https://www.selenium.dev/downloads/). Scroll downwards to the section **Selenium Client**. Go to Java and click on **download**.

![Downloading Selenium Client](/engineering-education/getting-started-with-selenium-automation-testing/downloading-selenium-client.jpg)

### How to configure Selenium WebDriver with Eclipse
Follow these next steps to configure Selenium WebDriver with Eclipse.

**Step 1:** Double click on the Eclipse icon.

![Step 1](/engineering-education/getting-started-with-selenium-automation-testing/step-1.jpg)

**Step 2:** Create a new workspace. Click on **Launch**.

![Step 2-1](/engineering-education/getting-started-with-selenium-automation-testing/step-2-1.jpg)

This will lead you to the following interface. 

![Step 2-2](/engineering-education/getting-started-with-selenium-automation-testing/step-2-2.png)

**Step 3:** Go to *File*, then *New* -> *Java Project* to create a new project. 

![Step 3-1](/engineering-education/getting-started-with-selenium-automation-testing/step-3-1.jpg)

This will generate a pop-up window that requires you to fill in a few details, such as the project name, save location, execution JRE, and layout option. You can name it ***newproject*** and click on **Finish**. 

![Step 3-2](/engineering-education/getting-started-with-selenium-automation-testing/step-3-2.jpg)

**Step 4:** The new project will appear in the top left corner. The next step is to create a new package for the newly created project. To do this, right-click on the folder named ‘src’. Select 'New', and then 'Package'. 

![Step 4](/engineering-education/getting-started-with-selenium-automation-testing/step-4.jpg)

A new window will pop-up requiring you to fill in the name of the package. You can name it **newpackage**. Click on 'Finish'.

**Step 5:** Right-click on the **newpackage** to generate a Java class. Select *New* and click on **Class**. 

![Step 5-1](/engineering-education/getting-started-with-selenium-automation-testing/step-5-1.jpg)

This will generate a pop-up window that requires you to fill in the name of the class. Click on *Finish* when done. After creating the class, the Eclipse interface will appear as follows.

![Step 5-2](/engineering-education/getting-started-with-selenium-automation-testing/step-5-2.png)

**Step 6:** The next step involves adding Selenium Jars to the newly created project. Right-click on the folder **newproject** and click on *properties*. 

![Step 6-1](/engineering-education/getting-started-with-selenium-automation-testing/step-6-1.jpg)

This will generate a pop-up window. On this window, click on *Java Build Path* and select *Libraries*. 

![Step 6-2](/engineering-education/getting-started-with-selenium-automation-testing/step-6-2.jpg)

**Step 7:** Click on *Add External JARS* to add Selenium JARS. 

![Step 7](/engineering-education/getting-started-with-selenium-automation-testing/step-7.jpg)

**Step 8:** Search for the folder containing the downloaded Selenium Client Driver. Click on the folder *libs* in the downloaded Selenium folder. 

![Step 8-1](/engineering-education/getting-started-with-selenium-automation-testing/step-8-1.jpg)

Highlight all the jar files and click *open*. Highlight the two jar files outside the lib folder and click *open*. 

![Step 8-2](/engineering-education/getting-started-with-selenium-automation-testing/step-8-2.png)

**Step 9:** Click on *Apply and Close*. 

![Step 9](/engineering-education/getting-started-with-selenium-automation-testing/step-9.jpg)

**Step 10:** Check whether the following two library folders appear on your Eclipse dashboard. If this is the case, then you have successfully configured Selenium WebDriver with Eclipse.

![Step 10](/engineering-education/getting-started-with-selenium-automation-testing/step-10.jpg)

### Running the first test in Selenium WebDriver
Let’s test whether a specific URL such as `google.com` functions well. We will conduct this test using the Chrome browser. Every browser used in Selenium testing has a unique browser driver. In our case, we need to download the Chrome driver. This can be downloaded from [here]( https://sites.google.com/a/chromium.org/chromedriver/). Select the Chrome driver that corresponds to your operating system.

![Chrome Driver](/engineering-education/getting-started-with-selenium-automation-testing/chrome-driver.png)

After downloading the chrome driver, you need to create a class file and add import statements for the necessary classes like WebDriver and ChromeDriver from Selenium. 

```Java
import org.openqa.selenium.By;  
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;  
import org.openqa.selenium.chrome.ChromeDriver; 
```

You should write the test within the main function.

```Java
public class FirstTest {
  public static void main(String[] args) {
    // Test code goes here
  }
}   
```

The next step involves setting the path of the downloaded executable file. The following is an example of how the property can be set.

```Java
System.setProperty("webdriver.chrome.driver", "D:\\ChromeDriver\\chromedriver.exe");
```

The following snippet is used to instantiate the driver. 

```Java
WebDriver driver = new ChromeDriver();
```

Launching the Google website requires setting its correct URL. In our case, the URL for Google is `www.google.com`. The corresponding snippet will be as follows.

```Java
driver.get("http://www.google.com/"); 
```

Let’s assume that we want to search for something on the website. The following snippet will help us to run the search. 

```Java
driver.findElement(By.name("q")).sendKeys("cheese" + Keys.ENTER); 
```

The following is the full code snippet we will use when running the first test in the Selenium WebDriver. Each code block consists of embedded comments to provide an explanation. 

```Java
import org.openqa.selenium.By;  
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;  
import org.openqa.selenium.chrome.ChromeDriver;  

public class FirstTest {
  public static void main(String[] args) {

    //property setting
    System.setProperty("webdriver.chrome.driver", "D:\\ChromeDriver\\chromedriver.exe");

    //instantiating the driver
    WebDriver driver = new ChromeDriver();

    //launching the website
    driver.get("http://www.google.com/"); 

    //running a search
    driver.findElement(By.name("q")).sendKeys("cheese" + Keys.ENTER); 
  }
}    
```

After writing the required codes, right-click on the Eclipse interface and select *run as*. Click on *Java application*. This will open Google in the Chrome browser. If the web application is functioning well, the browser will run the intended search and generate the output. 

### Conclusion
Selenium automation testing with Java provides a cost-effective and quick way of executing test cases. This type of automation testing has helped developers reduce human errors related to manual testing. 

The popularity of Java among developers has enabled it to be integrated with many applications, including Selenium. Selenium testing with Java provides a strong foundation for the development of effective and innovative web applications. 

### Resources
- [An Overview on Automation Testing With Selenium](https://www.section.io/engineering-education/automation-testing-in-selenium/)

- [Selenium](https://www.selenium.dev/documentation/en/getting_started/quick/)

- [Testing Experts](https://www.testingxperts.com/blog/5-best-practices-for-web-application-testing#:~:text=The%20methodology%20of%20web%20application%20testing%20successfully%20helps,maintains%20a%20quality%20application.%20Secures%20App%20from%20vulnerabilities%3A)


---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
