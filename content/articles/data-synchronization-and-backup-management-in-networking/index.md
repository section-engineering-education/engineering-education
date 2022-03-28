---
layout: engineering-education
status: publish
published: true
url: /data-synchronization-and-backup-management-in-networking/
title: Data synchronization and backup management in Networking
description: This article will cover data synchonization an backup management in Networking.
author: gladwel-kieya
date: 2022-03-28T00:00:00-09:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-synchronization-and-backup-management-in-networking/hero.jpg
    alt: Data synchronization and backup management in Networking Hero Image
---
Data backup is creating a copy of data and storing it in cloud-based software for recovery in case the original data gets lost. 
<!--more-->
The data synchronization process establishes consistency between two or more devices and updates changes between them. Data backup and synchronization are used for protecting data. Mostly, we get advised to keep our files backed up so that if they are lost, one can retrieve them.

### Table of contents 
- [Synchronization process](#Synchronization-Process) 
- [Patterns of data synchronization](#Patterns-of-Data-Synchronization)
- [Offline synchronization patterns](#Offline-synchronization-patterns) 
- [Maintaining data backup](#Maintaining-data-backup)
- [Cloud backup vs. synchronization](#Cloud-Backup-vs-Synchronization) 
- [Common backup methods](#Common-Backup-Methods)
- [Why should you back up files?](#Why-should-you-back-up-files?) 
- [Tools for data synchronization](#Tools-for-Data-Synchronization)
- [Conclusion](#Conclusion)

### Synchronization process
As we all know, data synchronization is the process of establishing consistency between two or more devices and updating changes between them. Types of synchronization are:
- Server-client, which is one too many.
- Node to node/many to many here, all systems can push data.
- Sync 2-way, which is between the mobile node and a PC.
- Server-altered sync: here, the server tells the client to request data that the client pulls, e.g., email.
- Client-initiated: The client sends data, e.g., device configuration changes.

In data synchronization, `Sync-ML` is a framework that provides protocols, tools, and a markup language for synchronization, which WAP `2.0` makes use of.

### Patterns of data synchronization
Synchronization pattern characteristics
-What kinds of data entities will be involved in the synchronization?
-What kind of local storage entities are these on both sides? Are they similar or duplicate entities, or do they have different types of structures that must be met?
- Metadata is needed to keep track of other information about the synchronization.
- Some local storage entities get modified to include metadata attributes to track how frequently that entity has changed or what type of change has occurred.
- Updating data depends on the network status, whether online or offline.
- What steps will we need to synchronize the data to the server? It depends on what pattern gets used.

### Offline synchronization patterns
#### Read-Only data
Here, the server can update data in the database. The device does not change data in the local storage area, and if it does, changes are not sent to the server. 
- Synchronization is accomplished by the client calling the server to get data. 
- The server returns all the data, and the client deletes the current local storage and creates a new local storage entity. 
- Its advantage is that it sends data every time, although it is insufficient for large data sets.

#### Read-Only data optimization
Here, the device changes the data, but now it is optimized, giving the data that has changed. Only the server will be able to update the database. The device will not change any of the data, and if it does, changes are not sent to the server. The synchronization steps followed are:

- it is accomplished by the client calling the server with the last sync time and the server checking for all the context that has been changed since the last sync date. 
- It looks for contacts that have been deleted and sets its findings to a list and then sends it to the client as an output. 
- The client then updates the list to the current local storage entities and then updates the last sync time. 
- This pattern is more efficient since it only sends changed data.

#### Read-Write Data
In read-write scenarios, whenever the last update occurs, it is going to push it to the database and that will be the correct data.

Synchronization steps:

- The client on the device side will retrieve all the entities that have changed, i.e., added, updated, and deleted entities. 
- The client calls the server with a list of changes, and the server updates the data and then returns the updated list of data. 
- The client then deletes the current local storage entities. All data gets returned with each synchronization. 
- This pattern is simple but not sufficient for larger datasets.

#### Read-Write with Conflict Detection
This pattern helps to solve the problem of detecting conflicts that may have occurred when multiple people update the same piece of data. When one of the servers goes ahead and updates something that has already changed, the pattern detects the conflict and resolves it.

Synchronization steps:

- The client checks if there are any unresolved conflicts, and if there are any, it aborts the synchronization process. 
- It then retrieves changed entities and calls the server with a list of changes using the last sync time. 
- The server checks data for conflicting changes, creates a list of conflicts and then updates the data.
- The server returns an updated list of data and the list of conflicts checked by the client. 
- The client then deletes current local storage and creates new local storage entities, resolving pending conflicts.

### Maintaining data backup
1. Use of Remote Storage
It involves backing up your data on removable media, like compact disks, flash disks, external drives, etc. These devices store files in large and small volumes and are portable.

2. Use of hardware appliances
Because there are numerous storage and backup apps available for smartphones and tablets, they get used for backup services. The backed-up files are easily accessed.

3. Use of backup software
Other people use software installed on their computers for backups, like Microsoft OneDrive, IDrive, Carbonite, pCloud, etc. They are more flexible since they offer free storage, and one can pay for platinum services for more storage. They also allow you to select the data you want to backup, making it easy to access.

3. Use of cloud backup services 
There are numerous backup software packages available that offer cloud backup services. The data that has backed up can be accessed from different computers as long as there is internet connectivity which makes it flexible because you don't have to keep on carrying your devices everywhere you go.
 
### Cloud Backup vs Synchronization

Thanks to cloud sync, client devices, and cloud storage both have the same set of files and directories. One-way sync automatically uploads files to the cloud as they are edited, and users can manually download them. 

A cloud is an intermediate storage with two-way sync. When modified files are submitted, they get downloaded by all clients. Two-way sync is deployed in Google Drive and Dropbox. To understand cloud sync, you can think of it in this way: if you access a file on your computer from home via a sync service in the morning, make changes, and then go to work or a friend's house, you can view the same file with all of the modifications made on the other machine. You can even share the file with another person, who can edit it from their computer, and the changes will appear on yours. In any case, the file is always in sync, regardless of where you view it.

Cloud backup works with cloud storage, which is the act of storing data on the cloud. Cloud storage gives users access to folders and can share as much data as they require. It provides security as the information is saved repeatedly, making it accessible in practically any situation.

The cloud is the most popular storage medium as it is more widely available and affordable. Data loss gets avoided by using cloud backup. Even with cloud storage, your data can be lost due to common cyber-attacks e.g. ransomware. 

In the event of a disaster, one can restore their lost data as cloud backup offers a solution where a copy of your data is kept in a different storage location. Cloud backup is a service that automates and simplifies the transfer of data to cloud storage based on a set of specified settings, while cloud synchronization enables users to share files and synchronize data across many devices.

### Common Backup Methods

- Full backup-In full backup the software completely takes the backup, suppose you have a system with 180GB data in it then the complete 180GB data will be backed-up.
- Incremental back up- It will take only the changes after the last successful backup.
- Differential backups- In differential backup it takes changed files since the last full backup was run.


### Why should you back up files?

- Users are assured their information is safe since it prevents data loss.
- With cloud backup services, you can check your backup status anytime and anywhere.
And even with permission, somebody else can access your data using a different device.
- Data loss may happen at any point in time.
- It provides you with a sense of data security. As a result, you won't worry about the different circumstances that frequently result in data loss.

### Tools for Data Synchronization
Data synchronization tools guarantee that modifications to your data are updated according to the criteria established by your security requirements.
Examples of data synchronization tools
- SpiderOak Secure Sync.
- 2BrightSparks SyncBackPro
- Grig Software Synchronize It!
- ZumoDrive.
- Wuala.

 [More on data synchronization tools](https://redmondmag.com/articles/2010/05/01/data-synchronization-tools.aspx)

### Conclusion
Finally, data synchronization ensures data consistency across numerous databases, while backup management aids in database recovery in the event of a breakdown. Synchronization is the process of making data or information from multiple locations identical, whereas backup is the process of creating duplicate copies of the same material. Mostly we are advised to keep our files backed up in case they are lost one can recover them.


