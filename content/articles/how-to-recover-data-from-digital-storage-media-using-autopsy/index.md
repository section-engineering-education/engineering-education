---
layout: engineering-education
status: publish
published:
url: /how-to-recover-data-from-digital-storage-media-using-autopsy/
title: How to Recover Data from Digital Storage Media using Autopsy
description: This article will outline some of the tools used in data recovery and give the reader a walk through the process of data recovery using autopsy as a digital forensics data recovery tool.
author: ruth-mare
date: 2021-12-19T01:00:00-17:40
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-recover-data-from-digital-storage-media-using-autopsy/hero.jpg
    alt: Storage media Hero Image
---
Data recovery is simply restoring data that had otherwise been lost by the owner or author due to many reasons.
<!--more-->

### Table of contents
- [Prerequisites](#prerequisites)
- [Causes of data loss](#causes-of-data-loss)
- [Tools used in data recovery](#tools-used-in-data-recovery)
- [Prerequisites of data recovery](#prerequisites-of-data-recovery)
- [Step by step process of data recovery](#step-by-step-process-of-data-recovery)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this tutorial, the reader should have:
1. General knowledge about digital data storage media.
2. A rough knowledge of [what disk imaging is](https://www.easeus.com/backup-recovery/disk-imaging.html).


### Causes of data loss

Data loss can be caused by several reasons, some of which are as follows:
1. Storage media theft – when computers, laptops, hard drives, or USB drives are stolen from the owner, the data stored within it is equally considered stolen and therefore lost.
2. Liquid spillage -spilling liquid on a laptop, Hard drive, USB drive, or computer can cause a short circuit, making recovery of the computer functionalities difficult, not to talk of the data stored inside.
3. Natural Disasters – Disasters such as fire, floods, and earthquakes can happen when they are least expected and pose devastating impacts on business. They can destroy computers and the data stored altogether.
4. Computer software corruption – When software shuts down unexpectedly or improperly, serious issues for data may occur such as corruption or deletion of data, wasting time, and causing loss of valuable data.
5. Hard drive formatting – When hard drives are accidentally formatted, instant data loss may occur.
6. Bad actors – When unauthorized people get access to data on a network, they can cause serious damage to, deletion of, and steal the data.
7. Human Mistakes – Human mistakes cannot be avoided completely, however, they can cause the unintentional deletion of data files.
8. Computer viruses and malware - Computer viruses can steal and delete data.
9. Hard drive damage - The majority of data losses are caused by hardware malfunctions.
10.Power Loss – Power loss not only can result in the loss of unsaved data but can also cause existing files to be corrupted as a result of improper shutdown procedures.

### Tools used in data recovery
There are various tools used in data recovery, some are free, and others are paid for.
The following are some of the commonly used tools:
- [Autopsy](https://www.autopsy.com/)
- [SysTools Hard Drive Data Recovery](https://www.systoolsgroup.com/hard-drive-data-recovery.html)
- [Stellar Data Recovery](https://www.stellarinfo.com/)
- [EaseUs](https://www.easeus.com/)
- [Disk Drill](https://www.cleverfiles.com/data-recovery-software.html)
- [Advanced Disk Recovery](https://www.systweak.com/advanced-disk-recovery)
- [Minitool Power Data Recovery](https://www.minitool.com/data-recovery-software/free-for-windows.html)
- [Recuva](https://www.ccleaner.com/recuva)
- [UndeleteMyFiles Pro](https://download.cnet.com/UndeleteMyFiles-Pro/3000-2248_4-10807826.html)

### Prerequisites of data recovery
1. Create an image of the drive whose data is to be recovered to preserve data in case anything goes wrong during the recovery attempt.
The created image will be the source from which we recover data.
The following is an example disk image created using [Access Data FTK imager](https://accessdata.com/product-download/ftk-imager-version-4-5).

![ftk disk imaging](/how-to-recover-data-from-digital-storage-media-using-autopsy/ftk-imaging.jpg)

2. Have enough storage to which the recovered data is exported because sometimes the recovered data is larger than the disk default capacity.

### Step by step process of data recovery
In this tutorial, we will show how to use Autopsy as a data recovery software.

Autopsy is the Graphical User Interface for the Sleuth kit program.

As a forensic tool, it only performs analysis and does not support the functionality of imaging storage media, this means that an image of the original media needs to be have been created using another software tool.

#### Step 1: Creating a case file
Files to be analyzed and data recovered from are called cases in Autopsy.
Open Autopsy software and click create a new case as shown below:

![Creating a new case](/how-to-recover-data-from-digital-storage-media-using-autopsy/create-new-case.jpg)
[image source](Sleuthkit.org)

> NOTE: If you don't have autopsy installed you can download and install from [Autopsy.com](https://www.autopsy.com/download/).

Key in the case details as you wish in the dialog box shown below:

![New case information](/how-to-recover-data-from-digital-storage-media-using-autopsy/new-case-info.jpg)
[image source](sleuthkit.org)

The additional information is not necessary if you're not recovering data under law enforcement, so you can fill any number and name in the field under additional information.
Click finish, the next dialog box pops up:

![Data Source created](/how-to-recover-data-from-digital-storage-media-using-autopsy/data-source.jpg)
[image source](Datascience.foundation)

#### Step 2: Selecting Data source

Select logical disk from the dropdown list then select the targeted drive image whose data is to be recovered.

Click next to proceed to the second step of modules, leave everything as default then click next.

The next step indicates whether a data source has been added and that analysis has begun.

Click Finish to close the above dialog box and let analysis proceed.

The analysis will take a while and when it's done it will indicate 100% completed.

The data is displayed in different categories, the major ones being:
- *Data sources* – this shows the image from which the data under analysis is stored.
- *Views* – this contains the display of the files of the image. They are classified by file size, file type, and deleted files from the device.
- *Results* – this contains the classification of the findings of the analysis classified as; extracted content, keyword hits, HashSet hits, E-mail messages, interesting items, and accounts.
- *Tags and reports* - contain a summary of the analysis in excel format.

#### Step 3: Data restoration
Open the folder of the files you'd want to be recovered; in this case, we want to restore deleted files as shown below:

![Data Recovery Window](/how-to-recover-data-from-digital-storage-media-using-autopsy/data-recovery.jpg)

We will right-click on the data we want to restore and select export.

Choose a location to export the data to, then click save.

This data can be viewed in the folder to which it has been exported without any difficulties.

### Conclusion
Most of the time data analysis and recovery is performed by law enforcement agencies that are after cybercriminals, though you could recover personal or business data lost accidentally.

### References
- [10 common causes of data loss](https://consoltech.com/blog/10-common-causes-of-data-loss/)
- [Autopsy](sleuthkit.org)

---
