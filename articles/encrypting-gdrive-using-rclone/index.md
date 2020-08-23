# How to Encrypt Google Drive using Rclone

Summary: This is a how-to guide on setting up Rclone to create an encrypted folder where users can store data on Google Drive which will be encrypted before upload.
Key Takeaways: Readers will understand how to install Rclone, add a Google Drive remote, obtain a Google Client ID, how to manage files on the local filesystem and Google Drive (copy, move, sync and mount) and create an encrypted remote.

## Introduction

Rclone is a command-line tool used on Linux operating systems in order to connect remotes (cloud storage providers) to the local filesystem. This tool is vital for remotes where Linux isn’t natively supported, and it also provides advanced functionality such as syncing which Google Drive doesn’t support for Linux. This work instruction will detail how to setup Rclone and configure a Google Drive remote.

## Table of Contents

(Insert Table of Contents - See FCC article)

## Installing Rclone

Next, you will need to download Rclone. Using the command below, will automatically install the latest version of Rclone and the one that is correct for your distribution and architecture of your machine. (Craig-Wood, 2014)1

There are security implications of installing Rclone this way because the script could be malicious but it’s much easier to do so because you don’t have figure out the architecture your computer is running on, download the correct version, unzip the file and move it to the correct location.

Type in curl https://rclone.org/install.sh | sudo bash and press enter

## Creating Your First Rclone Remote

Now you need to configure rclone. There are two ways to do this. You can create a config file with all the relevant parameters or use the interactive mode where it will provide default options and prompt you for the relevant information. 

Since the interactive mode is easier, that is the way this guide will follow.

Type in rclone config to start the interactive configurator.

Since you’ve never installed Rclone before, there won’t be anything configured so you need to make a new remote.

Instruction

Press n to create a new remote

Next, you need to name the remote. This is just for the purposes of differentiating it from other remotes you may create in the future so it can be anything you want.

Instruction

Type in the new of the remote and press enter

Rclone supports many storage providers so you need to specifically choose Google Drive.

In the example below, 13 is the correct number, though this can change when Rclone adds support for more remotes

### Create Google Drive Client ID

Rclone provides a default Client ID for Google Drive but it is susceptible to rate limiting because so many users use it instead of creating their own. Having your own Client ID is best practise so this guide will show you how to do so.

Open up a web browser such as Mozilla Firefox and enter this URL, https://console.developers.google.com/ (Craig-Wood, 2014)3

In order to get a Client ID, you need to create a project to attach it to.

Instruction

Click Create A New Project, fill in the project name with a title such as Rclone and click the blue Create button. 

Once the Google API project has been created, you now need to enable the Google Drive API because that’s what you’re trying to connect to.

Instruction

Click Enable APIs & Services, search for Google Drive, click Google Drive API and then click the blue Enable button.

Now that the Google API project has been connected to Google Drive, the credentials (including the Client ID) can be created.

Instruction

Click Credentials in the sidebar, then OAuth Consent Screen. Select Internal as the Application type, enter anything you prefer for the Application name and click the blue Save button.

Go back to the Credentials page and click Create Credentials and OAuth Client ID. Set the Application type as Other, name it however you like and click the blue Create button.

## Continuing Rclone Configuration

Now you have your Google Drive API Credentials, you can continue to configure your Google Drive remote in Rclone.

The scope of Rclone defines the permissions that Rclone has to read and write your files on Google Drive.

The root folder id and service account file are advanced options that you can leave as default and you don’t need to edit the advanced config.

Instruction

Copy and paste your Client ID into the terminal windows. Press enter and do the same for your Client Secret. 

When you are prompted for the scope, type 1 and then press enter.

For the next two options, press enter.

When asked if you want to edit advanced config, type n and press enter.

### Allow Rclone Access to Your Google Drive

Now you are prompted where to use auto config or not. If you are using a GUI system (had to open the terminal at the start of this guide), then you should type y and press enter. If you didn’t or are connecting remotely to a computer, then you should type n and press enter. This is because the following steps require an internet browser.

Since the test machine for this guide is a remote computer, the following instructions will follow a non-auto config.

Instruction

Type n and press enter. 

Copy and paste the link into your web browser. If you used a keyboard shortcut (CTRL + C) and as a result exited the process, repeat steps 1-6 and 11.

Next, you need to give Rclone permission to access your Google Drive and copy and paste the verification code back in the terminal window.

Instruction

Click the blue Allow button, copy and paste the verification code into the terminal and press enter.

### Finish Remote Setup and Test

Is the Google Drive a team drive (shared drive) or your own personal drive? If someone set it up for you, then it’s a team drive (now called shared drive), otherwise it’s not. (Google, n.d.)4

Once you’ve done that then your Google Drive Remote has been setup.

To test this, you can list the files and folders you have in Google Drive.

Instruction

If you’re setting up a team drive, type y and press enter.

If not, type n and press enter.

Then, type y and then enter.

To test, type q and then enter to exit the configuration editor. Finally, type rclone lsd (name of remote):

## Uploading and Syncing Files to A Remote

Syncing is a vital feature because it allows data to be accessed offline which is necessary if your data needs to be available at all times. This work instruction will show how to upload files to Google Drive using Rclone. It will also cover syncing since the commands are similar.

### Copy/Move/Sync Files

Now you just need to upload the files. Depending on whether you want to retain the files in the local filesystem, you can copy or move them using rclone copy (Craig-Wood, 2014)5 or rclone move. (Craig-Wood, 2014)6

If you want to sync files from the cloud to your local filesystem, then use rclone sync (Craig-Wood, 2014)7 instead.

The -v flag sets the logging level to verbose, so you know what’s going on. Optionally, you can move logging to a file using the –log-file flag with the parameter of a file location such as /opt/rclone.log. 

The –progress flag lets you see the progress of the file transfer.
The process is the exact same for uploading folders.

Instruction

Type rclone copy/move/sync (depending of which you want) -v –progress (location of the file you want to upload) (remote name):(folder you want the file to be uploaded to).

`rclone copy -v --progress ~/folder/file.txt gdrive:test`

Rclone starts to upload the files/folders you have chosen, and you can see the progress as shown in the image above or a log file has been created if you have specified so.

### Check the Files Have Transferred

You can check that the files have transfers either through viewing the log or listing the files in the remote.

Instruction

If you have set the logging to be output to a file. Type cat and the path to the log file e.g. cat /opt/rclone.log.

To check that the files have uploaded in the remote. Type rclone lsf remotename:folder and press enter. (Craig-Wood, 2014)8

`rclone lsf gdrive:test`

## Encrypt Your Google Drive Remote with Rclone

This work instruction will show how to encrypt your files using Rclone by setting up a folder with everything’s encrypted to securely store the files that need it while still being able to access your other files freely through the web interface.

### Create A Crypt Remote

To encrypt your files, you need to create another remote which will do the encryption process. There are different encryption settings you can choose from and this guide will implement the strongest available.  (Craig-Wood, 2014)9

The remote to encrypt/decrypt should be the name of the remote you created in Work Instruction – Setting up Rclone and the path should be the name of the folder you want to store the encrypted files e.g. encrypted or secret. All your encrypted files will be stored there and can only be decrypted if you setup Rclone on the device with the same credentials.

Instruction

Type rclone config and press enter.

Type n and press enter.

Type a name for the remote and press enter. Common names are crypt or secret.

Type the number for encrypt/decrypt a remote and press enter.

The location should be the name of the remote you created in the Work Instruction – Setting up Rclone, followed by a colon and the name of the encrypted folder you want to create and then press enter.

Type 1 and press enter.

Type 1 and press enter.

Type g and press enter.

Type 1024 and press enter.

Make sure to copy the password to a secure location otherwise you won’t be able to unencrypt your files on another device or if you delete Rclone.
Type y and press enter.

Similar to the process above, repeat the last four instructions.

Type y and press enter.

Finally, type q and press enter to exit the configurator.

### Upload Files to the Crypt Remote

Now that the crypt remote has been created, you need to upload some files to it.

This is a similar process as Work Instruction – Upload/Move/Sync Files to Google Drive using Rclone.

Instruction

Type rclone copy (file-name) (encrypted-remote name): and press enter. 

`rclone copy test.txt secret:`

The specified file has been moved to the encrypted remote

### Check Files Have Been Uploaded to the Encrypted Remote

There are two ways to check if files have been uploaded to the encrypted remote. 
You can use the normal gdrive remote and look into the encrypted folder which will show the encrypted version of the files.

If you want to view the unencrypted files, then you would need to search the encrypted remote.

This again is a similar process as Work Instruction – Upload/Move/Sync Files to Google Drive using Rclone.

Instruction

To view the encrypted files, type rclone lsf (remote-name):(remote-path) and press enter.

To view the unencrypted files, type rclone lsf (encrypted remote-name): and press enter.

`rclone lsf gdrive:secret`

## Mount A Google Drive Folder Using Rclone

This tool is vital for remotes where Linux isn’t natively supported, and it also provides advanced functionality such as mounting which Google Drive doesn’t support for Linux. Mounting is a vital feature because it allows you to access your Google Drive files as if they were local ones. This is similar to Windows’ mapped network drives (Microsoft, n.d.)10 but superior because Linux doesn’t classify it as a network drive and prohibit as Windows does.

### Creating the Rclone Mount

You need to create a folder on the local filesystem to store your cloud files in. 

Make sure to give the appropriate permissions so you can access the folder.

Instruction

Type mkdir (folder-name) and press enter.

Then type chmod 755 (folder-name) and press enter.

```bash
mkdir gdrive
chmod 755 gdrive
```

Now the mounted folder has been created, you can now start the mount command.

The parameters used in the mount command are ones that work best for this particular setup. It’s best to experiment and try out different ones. For example, if you have gigabit upload speed, you might need to limit the maximum data transferred to prevent rate limiting (Google stops you transferring data if you do too much in one day.) (Craig-Wood, 2014)11

Instruction

Type:

```bash
rclone mount --dir-cache-time 96h --cache-info-age 100h --vfs-cache-mode writes --allow-other --log-level DEBUG --log-file /(folder-name)/rclone.log (remote-name): / /(local mount folder) and press enter.
```

### Testing the Rclone Mount

Since the mount command is running, you need to open a new terminal window.

Finally, the last step is to check it has worked. The process is the exact same as you would list files in a local folder.

Instruction

Type cd (path to the mounted folder) and press enter.

Type ls and press enter.

```bash
cd gdrive
ls
```

## Uninstalling Rclone

If you no longer need Rclone, uninstalling it is just as easy as installing it. The process only takes two commands. 

Type:

```bash
sudo rm /usr/bin/rclone

sudo rm /usr/local/share/man/man1/rclone.1
```

