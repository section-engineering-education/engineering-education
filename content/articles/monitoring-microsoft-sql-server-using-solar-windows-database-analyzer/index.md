### Introduction
Databases hold a lot of critical and highly sensitive data for various organizations. For this reason, it is crucial to monitor them and hence make sure they are securely accessed. The article will aim at enlightening the reader on how to monitor a Microsoft SQL Server database using Solar Winds Database Performance Analyzer (Self-Managed). This is a software offered by Solar Winds and is very useful in attaining the security of a database.

### Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installing the DPA on windows](#installing-the-dpa-on-windows)
- [How to register MySQL Server for Monitoring](#how-to-register-mysql-server-for-monitoring)
- [How to register the database instances for monitoring](#how-to-register-the-database-instances-for-monitoring)
- [Best practices](#best-practices)
- [Conclusion](#conclusion)
### Prerequisites
1.	Correct and needed credentials
2.	Correct system requirements
3.	A powerful server where the DPA (Database performance analyzer) will be installed.
4.	A repository database
5.	Customer portal account to help access licenses and downloads. The customer portal can be accessed using this [link](https://customerportal.solarwinds.com/).
6.	A local administrator account to be used by the server hosting DPA.
7.	Updated operating system.
8.	Open the following ports on the server and firewall: 8124, 8123, 8127, 443, 80, and 587.
9.	Exclude the DPA directory from antivirus scanning to ensure smooth installation: C:\Program Files\SolarWinds\DPA

Note: DPA is short for Database Performance Analyzer.

### Phase 1

### Installing the DPA on windows
1.	If you're installing a trial version, [click here](https://www.solarwinds.com/database-performance-analyzer) or the SolarWinds Customer Portal to get the installation file.
2.	Log in to the Windows server using the administrator account.
3.	Extract the ZIP file you downloaded into a traceable folder.

![File Extraction](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/File Extraction.png)

4.	Open SolarWindsDPASetup-x64.exe and run it. Click next once the installer has started.

![Installation](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/Installation.png)

5.	Select "I accept the terms in the License Agreement" if you agree to the conditions of the license agreement.

![Accept License](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/Accept License.png)

6.	To change the default installation directory, go to change and enter the new location.

![Change Directory](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/Change Directory.png)

7.	If the “Do you wish to configure Microsoft Defender check” box appears, select it to create an exception that prevents Microsoft Defender from scanning the Find SQL indexes folder.

![No Configuration](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/No Configuration.png)

8.	This option can help prevent CPU spikes if the Find SQL feature is enabled. After the installation, you can manually generate an exception.
Note: If an exception already exists or if Microsoft Defender is not enabled, this check box is not visible.
9.	To begin the installation, click Next, then Install.
10.	Click Finish after the installation is finished.

![DPA Finish](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/DPA Finish.png)
Note: After a successful installation, access URLs are displayed as shown below.

![URLs](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/URLs.png)

### Phase 2

### How to register MySQL Server for Monitoring
#### Step 1
Select Microsoft SQL in the window shown below.

 ![SQL Selection](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/SQL Selection.png)

#### Step 2
Enter the database connection details below

![DB details](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/DB details.png)

#### Step 3
Select the type of user to be used to log into the DPA account and also for the creation of the DPA repository.
Note: Creating a new user account is recommended

![Repository Admin User](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/Repository Admin User.png)

#### Step 4:
Confirm the details entered and then click "create a repository".

![Repository Creation](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/Repository Creation.png)

#### Step 5:
If the process completes successfully, the green message below will be displayed.

![Success-Message](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/Success-Message.png)

### Phase 3

### How to register the database instances for monitoring.
Identifying the privileged user
	The privileged can create a monitoring user or assigns the needed rights to an existing user who now becomes a monitoring user.
	The privileged account can create a monitoring user or assigns the needed rights to an existing user.
	Note: The privileged user's credentials are not stored by the DPA.
	The privileged user must have the following privileges for self-managed SQL Server database instances: SYSADMIN (system administrator).

#### Stage 1: Process Initiation
Click Register DB Instance for Monitoring on the DPA homepage.

![Select Register Instance](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/Select Register Instance.png)

#### Stage 2 : Database selection
Click Microsoft SQL Server under Self-Managed.

![SQL Self-mananged](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/SQL Self-mananged.png)

#### Stage 3 : Input connection information
1. Select  Next and complete the wizard panels as outlined in the options below:
2. Input the connection information for the Monitored Database Instance enter the following connection information.
3. If the SQL Server Browser service is running, use the following syntax to input the IP address or server name and the name of the instance: Server\Instance.
4. See the [Note](Note-:-Each-instance-must-be-registered-separately) below for information on how to register primary and secondary replicas if the instance has additional groups.  
5. Otherwise, input the name of the server or its IP address, as well as the port number, if necessary.

#### Note : Each instance must be registered separately

1. Choose the authentication method you want to use. You can choose any option if Mixed Mode was selected during SQL Server installation.
2. DPA can use the SYSADMIN login to register instances.
3. In the SYSADMIN User field, type DOMAIN>username> for Windows authentication.
4. Enter the credentials that you entered on the Connect to Server dialog in SQL Server Management Studio for SQL Server authentication (with Database Engine as the Server type).
5. By default, SSL is requested. A simple connection is utilized if the server does not support SSL.

![Connection to SQL details](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/Connection to SQL details.png)

#### Stage 4: Enter the Monitoring User
1. Create or define the account that will be used by DPA to collect data. SolarWinds recommends creating a new account to guarantee that the account has the required rights.

![Monitoring User](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/Monitoring User.png)

2. Click Yes to start a new account.
3. As the authentication method, choose SQL Server.  Give the new account a user name and password, or leave them blank.
3. To specify an existing account, select “let DPA configure an existing user” and then select any authentication method.

#### Stage 5: Verify input information
After you've double-checked the information, click the "Register Database Instance" button.

![Summary](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/Summary.png)

#### Stage 6: Confirm registration.
1. Return to the DPA's main page by clicking "Finish".
2. After successful creation, you should be able to see the page below.

![Confirmation](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/Confirmation.png)

### Best practices

The best practice for the installation and configuration process is as follows:

- Enable AES 256 encryption and use a unique passcode.
- Make sure the HTTP connector is turned on.
- Disable insecure protocols and make sure that CA server certificates are used.
### Conclusion

Monitoring of the database is an important component of any application's upkeep. Early detection of database issues can help keep the resource healthy and accessible. Database outages can go undiscovered until it's too late, resulting in a loss of money and clients if there's no solid monitoring in place. This is precisely why organizations should use a database monitoring tool.

### Relevant Resources
- [SQL Database Monitoring Software](https://www.solarwinds.com/database-performance-analyzer/use-cases/sql-database-monitor)
- [SolarWinds Unites the Features of Database Performance Analyzer and SQL Sentry](https://www.dbta.com/Editorial/News-Flashes/SolarWinds-Unites-the-Features-of-Database-Performance-Analyzer-and-SQL-Sentry-147362.aspx)
- [SolarWinds Database Performance Analyzer Reviews](https://www.trustradius.com/products/solarwinds-database-performance-analyzer/reviews)
