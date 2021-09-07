Databases hold a lot of critical and highly sensitive data for various organizations. For this reason, it is crucial to monitor them and hence make sure they are securely accessed.

The article will enlighten the reader on how to monitor a Microsoft SQL Server database using Solar Winds Database Performance Analyzer (Self-Managed).

This is a software offered by Solar Winds and is very useful in attaining the security of a database.

By the end of this tutorial, the user will understand how to:
- Install Database Performance Analyzer on Windows.
- How to register a MySQL server for monitoring on Solar winds.
- How to register database instances for monitoring.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installing the DPA on windows](#installing-the-dpa-on-windows)
- [How to register MySQL Server for Monitoring](#how-to-register-mysql-server-for-monitoring)
- [How to register the database instances for monitoring](#how-to-register-the-database-instances-for-monitoring)
- [Best practices](#best-practices)
- [Conclusion](#conclusion)

### Prerequisites
1. Correct system requirements
2. A powerful server where the DPA (Database performance analyzer) will be installed.
3. A repository database
4. Customer portal account to help access licenses and downloads. The customer portal can be accessed using this [link](https://customerportal.solarwinds.com/).
5. A local administrator account to be used by the server hosting DPA.
6. Updated operating system.
7. Open the following ports on the server and firewall: `8124`, `8123`, `8127`, `443`, `80`, and `587`.
8. Exclude the DPA directory from antivirus scanning to ensure smooth installation: `C:\Program Files\SolarWinds\DPA`

> Note: DPA is short for Database Performance Analyzer.

### Phase 1
### Installing the DPA on windows
- If you're installing a trial version, [click here](https://www.solarwinds.com/database-performance-analyzer) or the SolarWinds Customer Portal to get the installation file.
- Log in to the Windows server using the administrator account.
- Extract the ZIP file you downloaded into a traceable folder.

![File Extraction](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/file-extraction.png)

- Open SolarWindsDPASetup-x64.exe and run it. Click next once the installer has started.

![Installation](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/installation.png)

- Select "I accept the terms in the License Agreement" if you agree to the conditions of the license agreement.

![Accept License](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/accept-license.png)

- To install DPA in a different location, go to change and enter the new location.

![Change Directory](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/change-directory.png)

- If the “Do you wish to configure Microsoft Defender check” box appears, select it to create an exception that prevents Microsoft Defender from scanning the Find SQL indexes folder.

![No Configuration](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/no-configuration.png)

- This option can help prevent CPU spikes if the Find SQL feature is enabled. After the installation, you can manually generate an exception.
Note: This check box is not visible if there is a Microsoft Defender exception or the antivirus is disabled.
- To begin the installation, click Next, then Install.
- Click Finish after the installation is finished.

![DPA Finish](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/dpa-finish.png)
Note: After a successful installation, access URLs are displayed as shown below.

![URLs](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/urls.png)

### Phase 2

### How to register MySQL Server for Monitoring
#### Step 1
Select Microsoft SQL in the window shown below.

![SQL Selection](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/sql-selection.png)

#### Step 2
Enter the database connection details below

![DB details](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/db-details.png)

#### Step 3
Select the type of user to be used to log into the DPA account and also for the creation of the DPA repository.
Note: Creating a new user account is recommended

![Repository Admin User](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/repository-admin-user.png)

#### Step 4:
Confirm the details entered and then click "create a repository".

![Repository Creation](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/repository-creation.png)

#### Step 5:
If the process completes successfully, the green message below will be displayed.

![Success-Message](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/success-message.png)

### Phase 3
### How to register the database instances for monitoring.
Identifying the privileged user
	The privileged can create a monitoring user or assigns the needed rights to an existing user who now becomes a monitoring user.
	The privileged account can create a monitoring user or assigns the needed rights to an existing user.
	Note: The privileged user's credentials are not stored by the DPA.
	The privileged user must have the following privileges for self-managed SQL Server database instances: SYSADMIN (system administrator).

#### Stage 1: Process Initiation
Tap the button for “Register DB Instance for Monitoring” on DPA homepage.

![Select Register Instance](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/select-register-instance.png)

#### Stage 2 : Database selection
Click Microsoft SQL Server under Self-Managed.

![SQL Self-mananged](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/sql-self-managed.png)

#### Stage 3 : Input connection information
- Select Next and finish the other steps as described below:
- Input the connection information for the Monitored Database Instance enter the following connection information.
- When service for SQL Server Browser is available, enter the IP address or hostname as well as name of the instance, in the following format: Server\Instance.
- See the [Note](Note-:-Each-instance-must-be-registered-separately) below for a guide to register replicas if the registered instance has additional groups.  
- Otherwise, input the name of the server or its IP address, as well as the port number, if necessary.

> Note: Each instance must be registered separately

- Choose the authentication method you want to use. You can choose any option if Mixed Mode was selected during SQL Server installation.
- DPA can use the SYSADMIN login to register instances.
- In the SYSADMIN User field, type DOMAIN>username> for Windows authentication.
- Enter the credentials for authenticating SQL server.
- By default, SSL is requested. For server that do not support SSL, a simple connection is used.
![Connection to SQL details](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/connection-to-sql-details.png)

#### Stage 4: Enter the Monitoring User
- Create or define the account that will be used by DPA to collect data. A new account is recommended by Solar Winds. This ensures that enough rights are allocated.

![Monitoring User](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/monitoring-user.png)

- Click Yes to start a new account.
- As the authentication method, choose SQL Server.  Give the new account a user name and password, or leave them blank.
- To specify an existing account, select “let DPA configure an existing user” and then select any authentication method.

#### Stage 5: Verify input information
After you've double-checked the information, click the "Register Database Instance" button.

![Summary](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/summary.png)

#### Stage 6: Confirm registration.
- Return to the DPA's main page by clicking "Finish".
- After successful creation, the page below is displayed.

![Confirmation](/engineering-education/monitoring-microsoft-sql-server-using-solar-windows-database-analyzer/confirmation.png)

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
