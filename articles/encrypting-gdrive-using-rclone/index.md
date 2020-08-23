# How to Encrypt Google Drive using Rclone

Summary: This is a how-to guide on setting up Rclone to create an encrypted folder where users can store data on Google Drive which will be encrypted before upload.
Key Takeaways: Readers will understand how to install Rclone, add a Google Drive remote, obtain a Google Client ID, how to manage files on the local filesystem and Google Drive (copy, move, sync and mount) and create an encrypted remote.

## Introduction

Rclone is a command-line tool used on Linux operating systems in order to connect remotes (cloud storage providers) to the local filesystem. This tool is vital for remotes where Linux isn’t natively supported, and it also provides advanced functionality such as syncing which Google Drive doesn’t support for Linux. This work instruction will detail how to setup Rclone and configure a Google Drive remote.

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
