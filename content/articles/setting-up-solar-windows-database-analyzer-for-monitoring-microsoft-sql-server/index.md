---
layout: engineering-education
status: publish
published: true
url: /setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/
title: Setting up Solar Winds Database Analyzer for Monitoring Microsoft SQL Server
description: This article will be an introduction to setting up and installing Solar Winds DB analyzer for monitoring Microsoft SQL server 
author: ruphus-muita
date: 2021-09-17T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/hero.jpg
    alt: Solar Winds DBA Analyzer example image
---
Databases hold a lot of critical and highly sensitive data for various organizations. It is crucial to monitor them and make sure they are accessed securely.
<!--more-->
This article will enlighten the reader on how to monitor a Microsoft SQL Server database using Solar Winds Database Performance Analyzer (Self-Managed).

This software is offered by Solar Winds and is very useful in attaining the security of a database.

By the end of this tutorial, the user will understand how to:
- Install Database Performance Analyzer on Windows.
- How to register a MySQL server for monitoring on Solar winds.
- How to register database instances for monitoring.

### Table of contents
- [Prerequisites](#prerequisites)
- [Installing the DPA on windows](#installing-the-dpa-on-windows)
- [How to register MySQL Server for Monitoring](#how-to-register-mysql-server-for-monitoring)
- [How to register the database instances for monitoring](#how-to-register-the-database-instances-for-monitoring)
- [Monitoring Database using Solar Winds DBA](#monitoring-database-using-solar-winds-dba)
- [Best practices](#best-practices)
- [Conclusion](#conclusion)

### Prerequisites
1. A powerful server where the DPA (Database Performance Analyzer) can be installed.
2. A repository database.
3. Customer portal account to help access licenses and downloads. The customer portal can be accessed [here](https://customerportal.solarwinds.com/).
4. A local administrator account to be used by the server hosting DPA.
5. Updated operating system.
6. Open the following ports on the server and firewall: `8124`, `8123`, `8127`, `443`, `80`, and `587`.
7. Exclude the DPA folder directory from antivirus scanning to ensure a smooth installation.

### Installing the DPA on Windows
- If you're installing a trial version, [click here](https://www.solarwinds.com/database-performance-analyzer) or the SolarWinds Customer Portal to get the installation file.
- Log in to the Windows server using the administrator account.
- Extract the ZIP file that you downloaded into a traceable folder.

![File Extraction](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/file-extraction.png)

- Open `SolarWindsDPASetup-x64.exe` and run it.
- Click `Next` once the installer has started.

![Installation](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/installation.png)

- Select `I accept the terms in the License Agreement` if you agree to the conditions of the license agreement.

![Accept License](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/accept-license.png)

- To install DPA in a different location, go to `Change` and enter the new location.

![Change Directory](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/change-directory.png)

- If the `Do you wish to configure Microsoft Defender check` box appears, select it to create an exception that prevents Microsoft Defender from scanning the `Find` SQL indexes folder.

![No Configuration](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/no-configuration.png)

- This option can help prevent CPU spikes if the `Find` SQL feature is enabled. After the installation, you can manually generate an exception.

> Note: This check box will not be visible if there is a Microsoft Defender exception or you have the antivirus disabled.

- To begin the installation, click `Next`, then `Install`.
- Click `Finish` after the installation is finished.

![DPA Finish](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/dpa-finish.png)

>Note: After a successful installation, access URLs are displayed as shown below.

![URLs](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/urls.png)

### How to register MySQL server for monitoring
#### Step 1
Select Microsoft SQL in the window shown below:

![SQL Selection](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/sql-selection.png)

#### Step 2
Enter the database connection details.

![DB details](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/db-details.png)

#### Step 3
Select the type of user that will be used for logging into the DPA account and creating the DPA repository.

> Note: Creating a new user account is recommended

![Repository Admin User](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/repository-admin-user.png)

#### Step 4
Confirm the details entered and then click `Create Repository`.

![Repository Creation](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/repository-creation.png)

#### Step 5
If the process completes successfully, the green message below will be displayed.

![Success-Message](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/success-message.png)

### How to register the database instances for monitoring
Identifying the privileged user:
- The privileged user can create a new monitoring user or grant access to an existing user who can monitor.

> Note: The privileged user's credentials are not stored by the DPA.

- The privileged user must be a system administrator for self-managed SQL server database instance: SYSADMIN (system administrator).

#### Stage 1: Process initiation
Tap the button for `Register DB Instance for Monitoring` on the DPA homepage.

![Select Register Instance](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/select-register-instance.png)

#### Stage 2: Database selection
Click Microsoft SQL Server under `Self-Managed`.

![SQL Self-mananged](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/sql-self-managed.png)

#### Stage 3: Input connection information
Select `Next` and finish the other steps as described below:
- Input the connection information for the Monitored DB instance.
- When the service for SQL server browser is available, enter the IP address or hostname along with the name of the instance, in the following format: `Server\Instance`.
- Otherwise, input the name of the server or its IP address, along with the port number, if necessary.

> Note: Each instance must be registered separately.

- Choose the authentication method.
- DPA can use the SYSADMIN login to register instances.
- In the SYSADMIN user field, type the domain username that was used for Windows authentication.
- Enter the credentials for authenticating the SQL server.
- By default, SSL is requested.

![Connection to SQL details](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/connection-to-sql-details.png)

#### Stage 4: Enter the monitoring user
- Create or define the account that will be used by DPA to collect data. A new account is recommended by Solar Winds. This ensures that enough rights are allocated.

![Monitoring User](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/monitoring-user.png)

- Click `Yes` to start a new account.
- As the authentication method, choose SQL Server. Give the new account a username and password, or leave them blank.
- To specify an existing account, select `Let DPA configure an existing user` and then select any authentication method.

#### Stage 5: Verify input information
After you've double-checked the information, click the `Register Database Instance` button.

![Summary](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/summary.png)

#### Stage 6: Confirm registration
- Return to the DPA's main page by clicking `Finish`.
- After successful creation, the page below should be displayed.

![Confirmation](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/confirmation.png)


### Monitoring Database using Solar Winds DBA
Now that we have successfully installed the Database Performance Analyzer, we can now look at the most useful features of the solution. 

In the section below, we will take a look at five most important features and functions that database administrators would find very useful.

These functions include:

#### Database performance optimization
![Database performance optimization](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/optimization.png)

With Solarwinds, it is possible to identify bottlenecks and pinpoint exactly where the problem is arising. This in turn help the database administrator make the necessary adjustment and solve the problem as fast as possible. 

In addition to that, the solution offers direct visibility into issues of poorly performing applications long before they can cause huge errors.

Through the solution’s machine learning-powered anomaly detection, it becomes very easy to know exactly what needs to be tuned for the database to be at optimum performance. 

This particular function helps in the identification of inefficient workloads and heavy queries that affect overall database performance.

#### Resource usage
![Resource Usage](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/resources.png)

Resource utilization and allocation form a big part of database performance and it is, therefore, crucial to keep track of this information. DPA offers the user high-level visibility into how resources are utilized. With Solar Winds DPA, the database administrator has access to computation metrics such as disk, CPU, memory, and network usage. 

#### Detailed issue analysis reports
![Analysis Reports](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/reports.png)

Solar winds DPA offers a multidimensional performance analysis of the database with a central view of all variables related to the database. DPA identifies all faults within a database including inefficient queries and poorly scripted SQL statements. This kind of visibility is what’s needed for seamless and efficient database administration. 

#### Automated notifications
![Notifications](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/notifications.png)
 
The Solar winds DBA tool has an automated notification system that enables the system administrator and other responsible parties to be notified of any critical alerts. Further, these reports can be customized to suit the organization and user needs.

#### Query tuning advice
![Query Advisor](/engineering-education/setting-up-solar-windows-database-analyzer-for-monitoring-microsoft-sql-server/query_advisor.png)
 
Solar winds database performance analyzer uses information acquired to provide the user with insight and predictions through a feature known as table tuning advisor.

### Best practices
The best practice for the installation and configuration process is as follows:
- Enable AES 256 encryption and use a unique passcode.
- Make sure the HTTP connector is turned on.
- Disable insecure protocols and make sure that CA server certificates are used.
  
### Conclusion
Monitoring of the database is important to any application's upkeep. Early detection of database issues can help keep the resource healthy and accessible. 

Database outages can go undiscovered until it's too late, resulting in a loss of money and clients if there's no solid monitoring in place. This is precisely why organizations should use a database monitoring tool.

Happy coding!

### Relevant resources
- [SQL Database Monitoring Software](https://www.solarwinds.com/database-performance-analyzer/use-cases/sql-database-monitor)
- [SolarWinds Unites the Features of Database Performance Analyzer and SQL Sentry](https://www.dbta.com/Editorial/News-Flashes/SolarWinds-Unites-the-Features-of-Database-Performance-Analyzer-and-SQL-Sentry-147362.aspx)
- [SolarWinds Database Performance Analyzer Reviews](https://www.trustradius.com/products/solarwinds-database-performance-analyzer/reviews)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
