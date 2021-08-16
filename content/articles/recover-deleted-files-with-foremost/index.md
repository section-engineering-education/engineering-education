### **Recovering deleted files using foremost**

Unintentional deletion of important files can be catastrophic. This has led to operating systems having a restore point. For example, in Linux, the restore point is the *trash* while in Windows, the restore point is the *recycle bin*. Sometimes we also delete these files in the restore points which leaves us with no option but to visit data recovery centers or buy expensive data recovery software.

### Introduction

[**Foremost**](https://pkgs.org/download/foremost) is a free data recovery software available for download on the internet. It works on Linux-based operating systems. Throughout this tutorial, we will be using Kali Linux. Anyone using any other Linux distribution can follow through.

In this tutorial, we will learn how to use **foremost** to recover deleted files from a pen drive. We will then learn how to recover deleted files from a whole hard disk drive. Finally, we will learn how to recover deleted files from a  specific partition of a hard drive.

### Prerequisites

To understand this article a reader needs to have:

- Kali Linux or any other Linux distribution installed.
- A basic understanding of the Linux terminal.

If not, refer to the following article.
[Getting started with kali linux](https://www.section.io/engineering-education/getting-started-with-kali-linux/)

### Installing foremost in Kali Linux

Foremost comes pre-installed in most Linux distributions. For cases where it is missing, type the following command in the terminal to install it.

```bash
sudo apt install foremost
```

### Tools included in the foremost package

The following tools are included in the foremost package:

- **-V** displays copyright information and exits.
- **-t** specifies the file type.  (jpeg, mp4).
- **-d** turns on indirect block detection. (for UNIX file-systems).
- **-i** specifies input file.
- **-a** Write all headers, perform no error detection (corrupted files).
- **-w** Only write the audit file, do not write any detected files to the disk.
- **-o** set output directory.
- **T** use when the output directory is not empty.
- **-c** set configuration file to use (defaults to foremost.conf)
- **-q** enables quick mode.
- **-Q** Suppress output messages.
- **-v** verbose mode. Logs all messages to screen.

### 1. Recovering files from a USB drive

Attach the USB to the computer. List drives to determine the path of your USB drive with the following command.

```bash
sudo fdisk -l
```

The above command gives the following output.

![List Drives](/engineering-education/recover-deleted-files-with-foremost/drives.png)

Scroll down to where your USB is located and copy the file path. Use the following command to start file recovery.

```bash
sudo foremost -v -t jpg,pdf,mp4,exe -q -i /dev/sdc -o /home/Desktop/recover -T
```

`-t` flag specifies the file types to be recovered as shown earlier. Type the file types you would like to recover. `-o` flag specifies the output file path. `-i` specifies the drive you want to recover files from. Replace the USB path with yours.
The command gives the following output.

![start recovery](/engineering-education/recover-deleted-files-with-foremost/recover.png)

After the recovery process is complete, the recovered files will be saved in the output file path. Be patient as the process may take some time depending on the drive's size. Below is the output file.

![Output](/engineering-education/recover-deleted-files-with-foremost/output.png)

### 2. Recovering files from a hard disk drive

Use the following command to list the drives attached to your computer.

```bash
sudo fdisk -l
```

The above command will list the drives attached to your computer and all their partitions. The diagram below shows it's output.

![List Drives](/engineering-education/recover-deleted-files-with-foremost/drive.png)

**Recovery of files from a hard drive can be done in two ways:**

- Recover files from the entire hard drive. i.e **foremost** will recover files from all partiton of a hard drive. This process will take more time.
- Recover files from a specific partition. i.e You can specify the partition from which **foremost** will recover the files. This is applicable where you know from which partition your deleted files were located.

**To recover files from the entire hard drive use the following command.**

```bash
sudo foremost -v -t png,mp4,pdf  -i /dev/sda -o /home/Desktop/recover -T
```

Replace the hard drive path with your own. You will find the path in the output of the command used to list drives. The above command will display the following output.

![Start recovery](/engineering-education/recover-deleted-files-with-foremost/disk.png)

Be patient as this process will take some time.

**To recover files from a single partition use the following command.**

```bash
sudo foremost -v -t png,mp4,pdf -i /dev/sda1  -o /home/Desktop/recover -T
```

Replace the partition path with your own. This process will take time depending on the size of your partition. For larger partitions, be patient as this process may take some time.

### Recovering files of all types

To recover all the file types that foremost supports, use the following command.

```bash
sudo foremost -v  -q -i /dev/sdc 
```

Replace the drive path above with the one you would like to recover files from.

The above command will automatically generate an output folder called output. The folder will be located in your home directory. The output folder is shown in the picture below.

![Output](/engineering-education/recover-deleted-files-with-foremost/all.png)

### Conclusion

We have discussed the various ways you can use **foremost** to recover your deleted files. There is no limitation to what you can do with **foremost**. Use the tools we discussed above to your preference.
