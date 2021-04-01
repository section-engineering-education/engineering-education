---
layout: engineering-education
status: publish
published: true
url: /engineering-education/encrypting-gdrive-using-rclone/
title: How to Encrypt Google Drive using Rclone
description: A how-to guide on setting up Rclone to create an encrypted folder where users can store data on Google Drive which will be encrypted before upload.
author: louise-findlay
date: 2020-08-27T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/encrypting-gdrive-using-rclone/hero.png
    alt: rclone gdrive header image
---
This is a how-to guide on setting up Rclone to create an encrypted folder where users can store data on Google Drive which will be encrypted before upload.
Readers will understand how to install Rclone, add a Google Drive remote, obtain a Google Client ID, how to manage files on the local filesystem and Google Drive (copy, move, sync, and mount) and create an encrypted remote.
<!--more-->

### Table of Contents
* [Introduction](#introduction)
* [Installing Rclone](#installing-rclone)
* [Creating Your First Rclone Remote](#creating-your-first-rclone-remote)
  * [Create Google Drive Client ID](#create-google-drive-client-id)
  * [Continuing Rclone Configuration](#continuing-rclone-configuration)
  * [Allow Rclone Access to Your Google Drive](#allow-rclone-access-to-your-google-drive)
  * [Finish Remote Setup and Test](#finish-remote-setup-and-test)
* [Uploading Files to A Remote (Copying, Moving & Syncing)](#uploading-files-to-a-remote-copying-moving-and-syncing)
  * [Copy/Move/Sync Files](#copy-move-sync-files)
  * [Check the Files Have Transferred](#check-the-files-have-transferred)
* [Mount A Google Drive Folder Using Rclone](#mount-a-google-drive-folder-using-rclone)
  * [Creating the Rclone Mount](#creating-the-rclone-mount)
  * [Testing the Rclone Mount](#testing-the-rclone-mount)
* [Encrypt Your Google Drive Remote with Rclone](#encrypt-your-google-drive-remote-with-rclone)
  * [Create A Crypt Remote](#create-a-crypt-remote)
  * [Upload Files to the Crypt Remote](#upload-files-to-the-crypt-remote)
  * [Check Files Have Been Uploaded to the Encrypted Remote](#check-files-have-been-uploaded-to-the-encrypted-remote)
* [Uninstalling Rclone](#uninstalling-rclone)

### Introduction
Rclone is a cross-platform command-line tool that connects remotes (cloud storage providers) with the local filesystem. Similar to [rsync](https://en.wikipedia.org/wiki/Rsync) but for cloud storage, this tool is vital for remotes where some operating systems aren’t natively supported and it provides advanced functionality such as syncing and mounting. While Rclone is available for Windows, Mac and Linux, this guide should be followed on Mac or Linux because the Windows version works in a slightly different way.

It's also a great way of encrypting cloud storage. Using Rclone, you can create an encrypted folder to store all your important files. **Warning**: If you decide to encrypt your files, encrypted files can only be decrypted on a computer with Rclone and encryption configured.

### Installing Rclone
First, we need to download Rclone. Using the command below, this will automatically install the latest version of Rclone and the one that is correct for your distribution and architecture of your machine.

```bash
curl https://rclone.org/install.sh | sudo bash
```

There are security implications on installing Rclone this way because the script could be malicious but this way is far simpler because you don’t have to figure out the architecture your computer is running on, download the correct version, unzip the file and move it to the correct location. Visit [Rclone's documentation](https://rclone.org/install) to learn about alternative installation methods.

### Creating Your First Rclone Remote
Second, we need to add our first remote (cloud storage provider). There are two ways to do this. You can create a config file with all the relevant parameters or use the interactive mode where it will provide default options and prompt you for the relevant information. Because we’ve never used our Google account with Rclone before, we need to go the interactive route to authorize it.

Type `rclone config` to start the interactive configurator. Since you’ve never installed Rclone before, there won’t be anything configured so you need to make a new remote. Type `n` to do so.

Next, you need to name the remote. This is just for the purposes of differentiating it from other remotes you may create in the future so it can be anything you want.

Rclone supports many storage providers (remotes) so you need to specifically choose Google Drive.

In the example below, 13 is the correct number, though this can change when Rclone adds support for more remotes.

![Rclone Storage Providers](/engineering-education/encrypting-gdrive-using-rclone/storage-providers.png)


### Create Google Drive Client ID
Rclone provides a default Client ID for Google Drive but it is susceptible to rate limiting (slowing down) because so many users use it instead of creating their own. Having your own Client ID is best practice so we’ll create one.

Go to the [Google Developer Console](https://console.developers.google.com/) and click Create A New Project. Fill in the project name with a title such as Rclone and click the blue Create button.

![Creating A Project](/engineering-education/encrypting-gdrive-using-rclone/creating-project.png)

Once the Google API project has been created, you now need to enable the Google Drive API because that’s what you’re trying to connect to.

Click Enable APIs & Services, search for Google Drive, click Google Drive API, and then click the blue Enable button.

![Enable Google Drive API](/engineering-education/encrypting-gdrive-using-rclone/gdrive-api.png)

Now that the Google API project has been connected to Google Drive, the credentials (including the Client ID) can be created.

Click Credentials in the sidebar, then OAuth Consent Screen. Select Internal as the Application type, enter an Application name, and click the blue Save button.

![OAuth Client](/engineering-education/encrypting-gdrive-using-rclone/oauth-client.png)

Go back to the Credentials page and click Create Credentials and OAuth Client ID. Set the Application type as Other, name it however you like, and finally click the blue Create button.

### Continuing Rclone Configuration

![Before Auto Config](/engineering-education/encrypting-gdrive-using-rclone/auto-config.png)

Now you have your Google Drive API Credentials, you can continue to configure your Google Drive remote in Rclone.

Copy and paste your Client ID into the terminal window and do the same for your Client Secret.

The scope of Rclone defines the permissions that Rclone has to read and write your files on Google Drive so when you are prompted for the scope, choose 1. For the following two options, just press enter.

The root folder id and service account file are advanced options that you can leave as default and you don’t need to edit the advanced config so when asked if you want to edit advanced config, type `n` for no.

### Allow Rclone Access to Your Google Drive

![GDrive Access](/engineering-education/encrypting-gdrive-using-rclone/gdrive-access.png)

Now, you are prompted to use auto config or not. If you are using your own computer locally, type `y`. If you are using a remote computer (such as SSHing into one) then type `n`. This is because the following steps require an internet browser.

Since the test machine for this guide is a remote computer, the following instructions will follow a non-auto config.

Copy and paste the link into a web browser. You need to agree to give Rclone permission to access your Google Drive by clicking the blue Agree button and then copy and paste the verification code back in the terminal window.

### Finish Remote Setup and Test
Finally, we are at the last step of connecting Google Drive to Rclone. The last question we need to answer is whether your Google Drive is a team drive (shared drive) or your own personal drive. If someone set it up for you, then it’s a team drive (now called shared drive), otherwise, it’s a personal one.

Once you’ve confirmed the configuration, press `q` to quit the rclone config process. Congratulations, you’ve added your first Rclone remote.

To test, you can list the files and folders in the remote i.e. Google Drive.

Type `rclone lsd (name of remote):` to do so.

### Uploading Files to A Remote (Copying, Moving & Syncing)
Now that you can access Google Drive using Rclone, you’ll want to learn how to upload new files. The advantage of using Rclone instead of the Google Drive client is that it will better maximize your internet connection for faster downloads and uploads.

It also supports syncing similar to [Rsync](https://en.wikipedia.org/wiki/Rsync) which on some platforms like Linux, Google Drive don’t natively support. Syncing is a vital feature because it allows data to be accessed offline which is necessary if your data needs to be available at all times.

### Copy/Move/Sync Files
Depending on whether you want to retain the files in the local filesystem, you can copy or move them using `rclone copy` or `rclone move`. If you want to sync files from the cloud to your local filesystem, then use `rclone sync` instead.

The `-v` flag sets the logging level to verbose, so you know exactly what’s going on. Optionally, you can move logging to a file using the `–log-file` flag with the parameter of a file location such as `/opt/rclone.log`.

The `–progress` flag lets you see the progress of the file transfer.

Type `rclone copy/move/sync (depending of which you want) -v –progress (location of the file you want to upload) (remote name):(folder you want the file to be uploaded to)`.

An example command is below:

`rclone copy -v --progress ~/folder/file.txt gdrive:test`

![Rclone Copy Progress](/engineering-education/encrypting-gdrive-using-rclone/rclone-copy.png)

Rclone will start to upload the files/folder you have chosen, and you can see the progress as shown in the image above or through the log file if you have specified one.

### Check the Files Have Transferred
You can check that the files have transfers either through viewing the log or listing the files in the remote.

If you have set the logging to be output to a file.

Type `cat` and the path to the log file e.g. `cat /opt/rclone.log`.

To check that the files have uploaded in the remote.

Use `rclone lsf remotename:folder` instead.

Here’s an example:  `rclone lsf gdrive:test`

### Mount A Google Drive Folder Using Rclone
Another great Rclone feature is mounting remotes. Mounting a remote allows you to access your Google Drive files as if they were local ones. This is similar to [Windows’ mapped network drives](https://support.microsoft.com/en-us/help/4026635/windows-map-a-network-drive) but superior because Linux doesn’t classify it as a network drive like Windows does and thus limits functionality.

### Creating the Rclone Mount
First, we need to create a folder on the local filesystem to store your cloud files. Make sure to give the appropriate permissions so you can access the folder. `mkdir` followed by the folder name will create the folder and `chmod 775` followed by the folder name will apply, read, and write permissions. Here’s an example below:

```bash
mkdir gdrive
chmod 755 gdrive
```

Now that the mounted folder has been created, you can now start the mount command.

The parameters used in the mount command are ones that work best for this particular setup. It’s best to experiment and try out different ones. For example, if you have gigabit upload speed, you might need to limit the maximum data transferred to prevent rate-limiting (Google stops you from transferring data if you do too much in one day).

```bash
rclone mount --dir-cache-time 96h --cache-info-age 100h --vfs-cache-mode writes --allow-other --log-level DEBUG --log-file /(folder-name)/rclone.log (remote-name): / /(local mount folder)
```

### Testing the Rclone Mount
Since the mount command is running, you need to open a new terminal window. Finally, the last step is to check it has worked. The process is the exact same as you would list files in a local folder.

Type `cd (path to the mounted folder)` and then `ls`

```bash
cd gdrive
ls
```

### Encrypt Your Google Drive Remote with Rclone
Finally, we can encrypt our files. We will set up an encrypted folder to securely store the files that need it whilst still being able to freely access your unencrypted files. Remember, encrypted files can only be decrypted on a computer with Rclone and the encrypted remote.

#### Create A Crypt Remote
To encrypt your files, you'll need to create another remote which will do the encryption process. There are different encryption settings you can choose from and this guide will implement the strongest available.

The location of the remote should be the name of the Google Drive remote you created earlier and the path should be the name of the folder you want to store the encrypted files e.g. encrypted or secret. It should look like: `gdrive:encrypted`

![Encrypt Remote Path](/engineering-education/encrypting-gdrive-using-rclone/encrypt-remote.png)

You want to generate a strong password and use the strongest encryption which is 1024. Make sure to copy the password to a secure location otherwise you won’t be able to unencrypt your files on another device or if you delete Rclone.

Once complete, type `q` to exit the configurator.

### Upload Files to the Crypt Remote
Now that the crypt remote has been created, you need to upload some files to it which is exactly the same process as the file upload we did earlier.

`rclone copy (file-name) (encrypted-remote name):`.

For example:

`rclone copy test.txt encrypted:`

The specified file has been copied to the encrypted remote.

### Check Files Have Been Uploaded to the Encrypted Remote
There are two ways to check if files have been uploaded to the encrypted remote.
You can use the normal gdrive remote and look into the encrypted folder that will show the encrypted version of the files

 `rclone lsf (remote-name):(remote-path)`

 or swap out the remote name for the encrypted remote to see the unencrypted files.

### Uninstalling Rclone
If you no longer need Rclone, uninstalling it is just as easy as installing it. The process only takes two commands.

```bash
sudo rm /usr/bin/rclone

sudo rm /usr/local/share/man/man1/rclone.1
```

### What we've learned
Congratulations, you've installed Rclone, created your first remote, learned how to copy/movie/sync files, and mount folders. You've also created your first encrypted remote and learned how to manipulate files within it.
