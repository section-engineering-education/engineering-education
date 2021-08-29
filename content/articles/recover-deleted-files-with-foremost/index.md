### **Recovering deleted files using foremost**

Unintentional deletion of important files can be tragic. This has led to operating systems having a restore point. In Linux, the restore point is the trash. In Windows, the restore point is the recycle bin. Sometimes we delete these files in the restore points too. At this point, we opt to visit data recovery centers or buy expensive data recovery software.

### Introduction

[**Foremost**](https://pkgs.org/download/foremost) is a free data retrieval software. You can download it on the internet. It operates on Linux operating systems. Throughout this tutorial, we will be using Kali Linux. Anyone using any other Linux distribution can follow through.

### What we will learn

In this tutorial, we shall be looking at:
- Installation of **foremost** in Kali Linux.
- Tools included in the **foremost** package and their use.
- Use of **foremost** in data recovery of lost/deleted files from a USB drive.
- Recovering deleted files from a whole hard disk. 
- Recovering deleted files from a particular partition of a hard drive.
- Recovering files of all types.

### Prerequisites

To understand this article a reader needs to have:

- Kali Linux or any other Linux distribution installed.
- Prior knowledge of the basic commands in the Linux terminal.

Check the following article to understand the prerequisites.
[Getting started with kali linux](/engineering-education/getting-started-with-kali-linux/)

### Installing foremost in Kali Linux

Foremost comes pre-installed in most Linux distributions. To check whether it is installed in yours, type in the following command:
```bash
$ dpkg -s foremost
```
If it is not installed, type the following command in the terminal. After executing the command **foremost** will be installed.

```bash
sudo apt install foremost
```

### Foremost package tools

**Foremost** package includes some flags. A flag is a value which acts as a signal for a process. It determines what a program will do next. We use the following command to display flags included in the foremost package.

```bash
foremost -h
```

The command displays all the flags included and their use. Below is a screenshot of its display.

![Tools](/engineering-education/recover-deleted-files-with-foremost/tools.png)

### 1. Recovering files from a USB drive

Attach the USB to the computer. List the drives on your computer to determine the path of your USB drive with the following command.

```bash
sudo fdisk -l
```

The above command gives the following output.

![List Drives](/engineering-education/recover-deleted-files-with-foremost/drives.png)

Scroll down to where your USB is located and copy the file path. To start the file recovery process, use the command below:

```bash
sudo foremost -v -t jpg,pdf,mp4,exe -q -i /dev/sdc -o /home/Desktop/recover -T
```

-t flag specifies the file types to be recovered as shown earlier. Type the file types you would like to recover. -o flag specifies the output file path. -i specifies the drive you want to recover files from. Replace the USB path with yours.
The command gives the following output.

![start recovery](/engineering-education/recover-deleted-files-with-foremost/recover.png)

The output shows the files being recovered in real time. They are the same files that will be saved in the output path.

After the recovery process has run to completion, the recovered files will be saved in the output file path. You may need to practice some patience as the process may take longer than usual depending on the drive's size. Below is the output file.

![Output](/engineering-education/recover-deleted-files-with-foremost/output.png)

The above output shows a folder named recover. All the files that the program recovered will be saved inside this folder.

### 2. Recovering files from a hard disk

To list the drives attached to your machine, use the command below:

```bash
sudo fdisk -l
```

The above command will list the drives attached to your computer and all their partitions. The diagram below shows its output.

![List Drives](/engineering-education/recover-deleted-files-with-foremost/drive.png)

**Recovery of files from a hard drive can be done in two ways:**

- Recover files from the entire hard drive i.e., **foremost** will recover files from all partitions of a hard drive. This process will take more time.
- Recover files from a specific partition i.e., you can specify the partition from which **foremost** will recover the files. This is applicable where you know from which partition your deleted files were located.

**To recover files from the entire hard drive use the following command:**

```bash
sudo foremost -v -t png,mp4,pdf  -i /dev/sda -o /home/Desktop/recover -T
```

Replace the hard drive path with your own. You will find the path in the output of the command used to list drives. Below is an output of the command above.

![Start recovery](/engineering-education/recover-deleted-files-with-foremost/disk.png)

Be patient as this process will take a while.

**To recover files from a single partition, use the following command:**

```bash
sudo foremost -v -t png,mp4,pdf -i /dev/sda1  -o /home/Desktop/recover -T
```

Replace the partition path with your own. This process will take a while depending on the size of the partition. For larger partitions, be patient as this process may take some time.

### Recovering files of all types

To recover all the files that foremost supports, use the following command.

```bash
sudo foremost -v  -q -i /dev/sdc 
```

Replace the drive path above with the one you would like to recover files from.

The above command will automatically generate an output folder called output. The location of the folder will be in the home directory. The output folder is shown in the picture below.

![Output](/engineering-education/recover-deleted-files-with-foremost/all.png)

### Conclusion

In this tutorial,we have discussed the numerous ways you can use **foremost** to recover your deleted files. You now have all the skills you need to use this powerful free data recovery software. You can now recover your deleted files from the comfort of your home saving you time and money.

Happy data recovery experience!
