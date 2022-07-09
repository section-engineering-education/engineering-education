---
layout: engineering-education
status: publish
published: true
url: /data-synchronization-and-backup-management-in-networking/
title: Data Synchronization and Backup Management in Networking
description: This article will cover data synchonization and backup management in Networking.
author: gladwel-kieya
date: 2022-05-09T00:00:00-22:30
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-synchronization-and-backup-management-in-networking/hero.jpg
    alt: Data synchronization and backup management in Networking Hero Image
---
Data backup is the process of creating a copy of data and storing it in cloud-based software for recovery if the original data gets lost.
<!--more-->
The data synchronization process establishes consistency between two or more devices and updates changes between them. Data backup and synchronization protect data. It is primarily advisable to keep files backed up so that one can retrieve them if they are lost.

### Table of contents 
- [Synchronization process](#synchronization-process) 
- [Patterns of data synchronization](#patterns-of-data-synchronization)
- [Offline synchronization patterns](#offline-synchronization-patterns) 
- [Maintaining data backup](#maintaining-data-backup)
- [Cloud backup vs. synchronization](#cloud-backup-vs-synchronization) 
- [Common backup methods](#common-backup-methods)
- [Why should you back up files?](#why-should-you-back-up-files) 
- [Tools for data synchronization](#tools-for-data-synchronization)
- [Conclusion](#conclusion)

### Synchronization process
Data synchronization establishes consistency between two or more devices and updates changes between them. 

Types of synchronization are:
- Server-client, which is one too many.
- Node to node/many to many here, all systems can push data.
- Sync 2-way, which is between the mobile node and a PC.
- Server-altered sync: The server tells the client to request data that the client pulls, for example, email.
- Client-initiated: The client sends data, e.g., device configuration changes.

In data synchronization, `SyncMLallows` different devices, such as cell phones, portable music players, desktops, and others, to synchronize various contact and scheduling information to keep each device up to date.

### Patterns of data synchronization
Some synchronization pattern characteristics may include:
- The kinds of data entities that will be involved in the synchronization.
- What kind of local storage entities are these on both sides? Are they similar or duplicate entities, or do they have different types of structures that must be met?
- Metadata is needed to keep track of other information about the synchronization.
- Some local storage entities get modified to include metadata attributes to track how frequently that entity has changed or what type of change has occurred.
- Updating data depends on the network status, whether online or offline.
- What steps will we need to synchronize the data to the server? It depends on what pattern gets used.

### Offline synchronization patterns
#### Read-Only data
Here, the server can update data in the database. The device does not change data in the local storage area, and if it does, changes are not sent to the server. Synchronization is accomplished by the client calling the server to get data. The server returns all the data, and the client deletes the current local storage and creates a new local storage entity. Its advantage is that it sends data every time, although it is insufficient for large data sets.

#### Read-Only data optimization
Here, the device changes the data, but now it is optimized, to give changed data. Only the server will be able to update the database. The device will not change any of the data, and if it does, changes are not sent to the server. 

The synchronization steps followed here are:
- The client calls the server with the last sync time and the server checks for all the context changes since the last sync date.
- Next, a search for deleted contacts is conducted. It sets its findings to a list and then sends them to the client.
- The client then updates the list to the current local storage entities and updates the last sync time.

This pattern is more efficient since it only sends changed data.

#### Read-Write Data
In read-write scenarios, whenever the last update occurs, it will push it to the database making it the correct data. 

The synchronization steps followed are:
- The client on the device side will retrieve all the changed entities, that is, added, updated, and deleted entities.
- The client calls the server with a list of changes, and the server updates the data and then returns the updated list of data. 
- The client then deletes the current local storage entities. All data gets returned with each synchronization. 
- This pattern is simple but not sufficient for larger datasets.

#### Read-Write with Conflict Detection
This pattern helps solve the problem of detecting conflicts that may have occurred when multiple people update the same piece of data. When one of the servers goes ahead and updates something that has already changed, the pattern detects the conflict and resolves it. 

The synchronization steps here are as followed:
- The client calls the server with the last sync time and the server checks for all the context changes since the last sync date.
- Next, a search for deleted contacts is conducted. It sets its findings to a list and then sends them to the client.
- The client then updates the list to the current local storage entities and updates the last sync time.
This pattern is more efficient since it only sends changed data.

### Maintaining data backup
1. Remote Storage: It involves backing up your data on removable media, like compact disks, flash disks, external drives, and many more. These devices store files in large and small volumes and are portable.
2. Use of hardware appliances: Numerous storage and backup apps are available for smartphones and tablets. They get used for backup services. The backed-up files are easily accessed.
3. Use of backup software: Other people use software installed on their computers for backups, like Microsoft OneDrive, IDrive, Carbonite, pCloud, and others. They are more flexible since they offer free storage, and one can pay for more storage. They also allow you to select the data you want to backup, making it easier to access.
4. Use of cloud backup services: Numerous backup software packages offer cloud backup services. The data backed up can be accessed from different computers as long as there is internet connectivity. This makes it flexible because you do not have to keep carrying your devices everywhere you go.
 
### Cloud backup vs. synchronization
A cloud backup is a service that automates and simplifies data transfer to cloud storage based on specified settings. In contrast, cloud synchronization enables users to share files and synchronize data across many devices. Thanks to cloud sync, client devices, and cloud storage may have duplicate files and directories. One-way sync automatically uploads files to the cloud as they are edited, and users can manually download them.

Cloud is intermediate storage with two-way sync. When modified files are submitted, they get downloaded by all clients. Two-way sync is deployed in Google Drive and Dropbox. To understand cloud sync, you can think of it in this way: if you access a file on your computer from home via a sync service in the morning, make changes, and then go to work or a friend's house, you can view the same file with all of the modifications made on the other machine. 

You can even share the file with another person, who can edit it from their computer, and the changes will appear on yours. In any case, the file is always in sync, regardless of where you view it.

Cloud backups work with cloud storages, storing data in the cloud. Cloud storage gives users access to folders and can share as much data as required. It provides security as the information is saved repeatedly, making it accessible in practically any situation. The cloud is the most popular storage medium as it is more widely available and affordable. Data loss can be avoided by using cloud backup. 

Even with a cloud storage, data can be lost due to common cyber-attacks, for example due to a ransomware attack. During a disaster, one can restore lost data as cloud backup offers a solution where the storage of a copy of your data is kept in a different storage location. 

### Common backup methods
- Full backup: This is a complete backup process; suppose you have a system with 180GB of data in it, then the complete 180GB of data will be backed-up.
- Incremental backup: This will take only the changes after the last successful backup.
- Differential backups: This backup takes changed files since the last full backup.

### Why should you back up files?
- Assurance that information is safe, since it prevents data loss.
- You can check your backup status anytime and anywhere with cloud backup services. Moreover, somebody else can access your data using a different device, with permission.
- It provides you with a sense of data security. As a result, you will not worry about the different circumstances that frequently result in data loss.

### Tools for data synchronization
Data synchronization tools guarantee that modifications to your data are updated according to the criteria established by your security requirements.

Examples of data synchronization tools include:
- SpiderOak Secure Sync.
- 2BrightSparks SyncBackPro
- Grig Software Synchronize It!
- ZumoDrive.
- Wuala.

### Conclusion
Data synchronization ensures data consistency across numerous databases, while backup management aids in database recovery in the event of a breakdown. Synchronization is making data or information from multiple locations identical, whereas backup is the process of creating duplicate copies of the same material. 

It is advisable to keep files backed up in case they are lost; one can recover them. You can read [more on data synchronization tools](https://redmondmag.com/articles/2010/05/01/data-synchronization-tools.aspx) in this article.

Happy learning!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
