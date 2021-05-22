---
layout: engineering-education
status: publish
published: true
url: /introduction-to-data-integration-in-tos/
title: Introduction to Data Integration in Talend Open Studio
description: This article will provide a step-by-step explanation of how Talend Open Studio application can be installed and provides an overview of data integration.
author: onesmus-mbaabu
date: 2020-12-06T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-data-integration-in-tos/hero.jpg
    alt: Data Integration in Talend Open Studio example image
---
Data integration developers need open source tools to synchronize massive data collected from various platforms in the current data-driven world. Talent Open Studio (TOS) is an open-source application that provides user-friendly and cost-effective solutions for data integration. We need this application in organizations to enhance data accuracy and improved decision making. 
<!--more-->
This article summarizes data integration in Talend Open Studio. It starts by introducing readers to Talend Open Studio and Talend data integration. The article provides a step-by-step explanation of how this application can be installed. We will explain various features to understand the basics of data integration in TOS.  

### Introduction to Talend Open Studio
Talend Open Studio is an open-source application developed by Talend, a software integration vendor that provides big data, data quality, data preparation, and data integration solutions. 

It's one of the three main products offered by Talend. The other two products include Talend Platforms and Talend Enterprise. Talend Platforms provides solutions such as hybrid cloud and data services. Talend Enterprise provides Enterprise Service Bus (ESB) solutions. 

In Talend Open Studio, data can be combined easily, converted, and updated in different locations. TOS supports data integration, big data, ESB, and ETL (extract, transform, load) implementations. 

Talend Open Studio for data integration is an [Eclipse](https://en.wikipedia.org/wiki/Eclipse_(software))-based tool. In this application, components can be dragged from the palette section of the Graphical User Interface (GUI) and connected to run ETL jobs. 

This tool enhances the automatic creation of Java codes for jobs. It's connected to various data sources such as Excel, Relational Database Management System (RDBMS), and Dropbox. 

### Talend data integration
Talend data integration is a process in which we combine data from various sources to provide meaningful information. Data integration in Talend Open Studio enhances the cleaning of data through some transformation. We then send the cleaned data to a data warehouse. Various aspects of businesses can be improved by analyzing the integrated data.  

The data integration tool in Talend Open Studio facilitates ETL testing and enables users to perform ETL tasks. This tool consists of open and scalable architecture. It provides a fast way of deploying and developing jobs. 

In Talend data integration, organizations collect data from various platforms or applications and generate a unified view. We then analyze the new form of data to improve decision-making.

Let’s take an example of a large telecommunication company that wants to integrate massive amounts of data about its customers. The company sells sim cards to customers. They would employ big data in integration because the data is enormous. Data collected from one of the customers could be provided as follows.

Customer A purchases a sim card using a passport or government identification card.

His name is given as KL M

The Address has been given as Houston, Houston.

The phone number has been given as 2815091234

The information collected from all the customers (including Customer A) can be cleaned to provide meaningful information. In this case, Customer A’s new data form will look as follows.

Given Name: KL

Surname: M

Address: Houston, Texas

Phone Number: +1 281-509-1234

### Benefits of data integration in TOS
- It helps businesses analyze their trends.
- It allows users to combine data into a unified form.
- It's efficient and time-saving.
- It enables users to generate reports quickly.
- It enhances the quality of data. This is because data is transformed into meaningful information. 
- Talend Open Studio has a user-friendly GUI, that enables users to perform data integration effectively. 
  
### How to install Talend Open Studio for data integration
**Prerequisites:**
- Ensure you have downloaded and installed [Java Development Kit](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html).
- You should make sure that environment variables have been set.
- Also ensure that you have a stable internet connection.

The following steps will enable you to download Talend Open Studio for data integration. 

**Step 1:** Visit this website to start the process: https://www.talend.com/download/.

**Step 2:** On that page, click on free products.

![Step 2](/engineering-education/introduction-to-data-integration-in-tos/step-2.jpg)

**Step 3:** After clicking on free products, you will find various options such as open studio for data integration, open studio for big data, and open studio for ESB. On the 'Open Studio for Data Integration' option, choose the operating system suitable for your device and click on it.

![Step 3](/engineering-education/introduction-to-data-integration-in-tos/step-3.jpg)

**Step 4:** A dialogue box will appear. Click on 'save file' to download the setup file.

![Step 4](/engineering-education/introduction-to-data-integration-in-tos/step-4.jpg)

**Step 5:** When the download is complete, go to the 'downloads' folder and double click on the setup file. 

![Step 5](/engineering-education/introduction-to-data-integration-in-tos/step-5.jpg)

**Step 6:** The installation folder will open. Click on ‘Browse’ to choose the destination folder. 

![Step 6](/engineering-education/introduction-to-data-integration-in-tos/step-6.jpg)

**Step 7:** Select the destination folder and click ‘OK’. 

![Step 7](/engineering-education/introduction-to-data-integration-in-tos/step-7.jpg)

**Step 8:** Click on 'Install' to begin the installation process. 

![Step 8](/engineering-education/introduction-to-data-integration-in-tos/step-8.jpg)

**Step 9:** When the setup process is complete, click on ‘Close’.

![Step 9](/engineering-education/introduction-to-data-integration-in-tos/step-9.jpg)

**Step 10:** Open the destination folder that you chose. Open the installed folder. 

**Step 11:** In the installed folder, click on the file **'TOS_DI-win-x86_64'**.

![Step 11](/engineering-education/introduction-to-data-integration-in-tos/step-11.jpg)

**Step 12:** In the user license agreement, click on ‘I accept’. 

![Step 12](/engineering-education/introduction-to-data-integration-in-tos/step-12.jpg)

**Step 13:** A new dialogue box will appear. Click on ‘Create a New Project’ and then click on ‘Finish’.

![Step 13](/engineering-education/introduction-to-data-integration-in-tos/step-13.jpg)

**Step 14:** When the welcome message appears, click on ‘Close’.

![Step 14](/engineering-education/introduction-to-data-integration-in-tos/step-14.png)

**Step  15:** You will then find the GUI that consists of all the tools needed for data integration. 

![Step 15](/engineering-education/introduction-to-data-integration-in-tos/step-15.png)

### The Graphical User Interface (GUI) for Talend Open Studio
There are four sections or parts in the GUI of Talend Open Studio. These are the repository, design window, palette, and configuration tab. These sections perform specific functions during data integration. The following diagram highlights these sections. 

![The GUI of TOS](/engineering-education/introduction-to-data-integration-in-tos/the-gui-of-tos.jpg)

#### The repository
The repository displays a tree structure of all the technical items used to design jobs or describe business models. It's situated at the top left side of the GUI. 

Some of the things that can be accessed through the repository include job designs, documentation, database connections, business models, and reusable routines. 

It's merely a central store for items that are important for business modeling or job design in a project.

If you want to create your first job in TOS, you should click on ‘Job Design’ in the repository section and then ‘Create Job’. 

![Creating A New Job](/engineering-education/introduction-to-data-integration-in-tos/creating-a-new-job.jpg)

This will generate a table that requires you to fill in the job's name, purpose, and description.

![Adding A New Job](/engineering-education/introduction-to-data-integration-in-tos/adding-a-new-job.jpg)

When you finish creating the job, the Talend integration components (discussed in the next section) will be available in the palette section. 

In the following diagram, various components can be chosen from the listed folders in the palette section. 

For example, the ‘Databases’ folder consists of components such as **tMysqlInput** and **tMysqlConnection**. The required component can be dragged into your workspace.

![Dragging A Component](/engineering-education/introduction-to-data-integration-in-tos/dragging-a-component.jpg)

#### The design window
This part consists of three main features.
1. **Workspace:** This is a working area used to lay down business models or job designs. This part is situated in the top middle section. 
2. **Designer tab:** This is a tab that provides a graphical display of a job. It opens automatically when a job is created.
3. **Code tab:** This tab is used to review the code and highlight any language errors. 
  
#### Palette
This part is situated on the top right corner of the GUI. It enables users to draw models that correspond to their workflow requirements. 

In this section, various technical items can be dragged and dropped into the design workspace. This depends on the business model or job. 

#### Configuration tabs
This part is below the design workspace. Some of the configuration tabs in the Talend Open Studio include the job tab, context tab, component tab, and run tab. 

- **Job tab:** This tab provides important information regarding the current job. This includes creation date, creation time, name, and version.
- **Context tab:** Context variables are set using this tab. A context tab sets different contexts that will be used in the job design.
- **Component tab:** This tab shows or displays the parameters needed in the components' configuration.
- **Run tab:** This tab displays logs such as error, start, and end messages. It shows the progress of a job that is being executed.
  
### Components of Talend data integration
There are over 800 components in Talend Open Studio. 

The following are some of the essential elements of Talend data integration:
- **tFileList:** Folder files are listed by this component with a specific mask pattern. 
- **tMySQLConnection:** This component provides a connection to the MySQL database, which is an open-source solution for database management.
- **tMySQLInput:** This component is used to run queries (including MySQL database query) and generate columns or tables. 
- **tMySQLOutput:** Data is inserted or updated in the MySQL database using this component.
- **tPrejob:** This component triggers a task that is necessary for the execution of jobs.
- **tPostjob:** This component triggers a task after a job has been executed. 
- **tLogcatcher:** It catches the errors and warnings in existing jobs. 
- **tRowGenerator:** This is used to generate fields and rows using random values collected from a list. 

### Examples of companies that use Talend data integration
The following are some of the companies that have used Talend data integration.

#### Air France-KLM
[Air France-KLM](https://en.wikipedia.org/wiki/Air_France%E2%80%93KLM) is an airline company formed in 2004 after the merger of KLM and Air France. This airline has offices in France and the Netherlands. Air France-KLM uses Talend to streamline information and improve the quality of customer data. 

#### Bayer
[Bayer](https://en.wikipedia.org/wiki/Bayer) is a large pharmaceutical company that provides healthcare and agricultural products. Its headquarters are in Leverkusen, Germany.

This company uses Talend data integration to integrate its various databases into the data hub. Talend has also enabled the company to obtain clean clinical data, that expedites establishing the right dosage. 
  
### Conclusion
Talend Open Studio is an innovative software application that provides organizations with various features for data integration. Using this application, we can convert jobs to Java code automatically without manual coding. It’s also cost-effective and easy to use. 

Organizations should practice continuous data integration to improve business processes and decision-making. With increased technological advancements, Talent Open Studio will comprise new and exciting features that will revolutionize organizations' data management. 

### Resources
[Tutorials Point](https://www.tutorialspoint.com/talend/talend_talend_open_studio.htm)

[Mind Majix](https://mindmajix.com/talend/introduction-and-general-principles)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
